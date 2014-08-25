module platui {
    /**
     * A Template Control that acts as a global drawer.
     */
    export class Drawer extends plat.ui.TemplateControl {
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * The plat-options for the Drawer.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;

        private __currentTransition: string;
        private __useContext: boolean;

        /**
         * Check for a transition direction and initialize event handling.
         */
        loaded(): void {
            var element = this.element,
                $utils = this.$utils,
                optionObj = this.options || <plat.observable.IObservableProperty<IDrawerOptions>>{},
                options = optionObj.value || <IDrawerOptions>{},
                transition = this.__currentTransition = options.transition || 'right',
                useContext = this.__useContext =
                    (options.useContext === true) ||
                    element.hasAttribute(__Context) ||
                    element.hasAttribute('data-' + __Context),
                id = options.id,
                templateUrl = options.templateUrl,
                isElastic = options.elastic === true;

            this.dom.addClass(element, transition);
            if ($utils.isString(templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, templateUrl).then((template) => {
                    this.innerTemplate = template;
                    if (this.__useContext) {
                        this.bindableTemplates.add('drawer', template.cloneNode(true));
                        this.__bindTemplate();
                    }
                    this.__initializeEvents(id, transition, isElastic);
                });
                return;
            } else if (useContext && $utils.isNode(this.innerTemplate)) {
                this.bindableTemplates.add('drawer', this.innerTemplate.cloneNode(true));
                this.__bindTemplate();
            }

            this.__initializeEvents(id, transition, isElastic);
        }

        /**
         * Removes the innerHTML from the DOM and saves it.
         */
        setTemplate(): void {
            var childNodes = Array.prototype.slice.call(this.element.childNodes);
            if (childNodes.length > 0) {
                this.innerTemplate = this.dom.appendChildren(childNodes);
            }
        }

        /**
         * Changes the placement and implied transition direction of the drawer.
         */
        _changeDirection(transition: string): void {
            if (this.$utils.isNull(transition) || transition === this.__currentTransition) {
                return;
            }

            var dom = this.dom,
                element = this.element;

            dom.removeClass(element, this.__currentTransition);
            dom.addClass(element, transition);

            this.__currentTransition = transition;
        }

        private __initializeEvents(id: string, transition: string, isElastic: boolean): void {
            var $utils = this.$utils,
                element = this.element,
                isString = $utils.isString,
                innerTemplate = this.innerTemplate,
                useContext = this.__useContext,
                DIRECT = plat.events.EventManager.DIRECT;

            this.on(__DrawerControllerFetchEvent,
                (event: plat.events.IDispatchEventInstance, controllerArg: IDrawerHandshakeEvent) => {
                if (isString(id) && isString(controllerArg.id) && id !== controllerArg.id) {
                    return;
                } else if (isString(controllerArg.transition)) {
                    transition = controllerArg.transition;
                    this._changeDirection(transition);
                }

                this.dispatchEvent(__DrawerFoundEvent, DIRECT, {
                    id: id,
                    transition: transition,
                    element: element,
                    useContext: useContext,
                    template: $utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                    elastic: isElastic
                });
            });

            this.dispatchEvent(__DrawerFoundEvent, DIRECT, {
                id: id,
                transition: transition,
                element: element,
                useContext: useContext,
                template: $utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                elastic: isElastic
            });
        }

        private __bindTemplate(): void {
            this.bindableTemplates.bind('drawer').then((template) => {
                this.element.appendChild(template);
            });
        }
    }

    plat.register.control(__Drawer, Drawer);

    /**
     * A Template Control that manipulates and controls a global drawer.
     */
    export class DrawerController extends plat.ui.TemplateControl {
        $utils: plat.IUtils = plat.acquire(__Utils);
        $compat: plat.ICompat = plat.acquire(__Compat);
        $document: Document = plat.acquire(__Document);
        $animator: plat.ui.IAnimator = plat.acquire(__Animator);

        /**
         * The plat-options for the DrawerController.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;

        /**
         * The transition direction of control for this DrawerController.
         */
        _transition: string;

        /**
         * The DrawerController's corresponding Drawer element.
         */
        _drawerElement: HTMLElement;

        /**
         * The CSS3 transform property.
         */
        _transform: string;

        /**
         * The last touch start recorded.
         */
        _lastTouch: plat.ui.IPoint;

        private __hasSwiped = false;
        private __isOpen = false;
        private __isElastic: boolean;
        private __inTouch: boolean;
        private __useContext: boolean;
        private __maxOffset: number;
        private __removeTap: plat.IRemoveListener;
        private __removeSwipeOpen: plat.IRemoveListener;
        private __removeSwipeClose: plat.IRemoveListener;
        private __removePrimaryTrack: plat.IRemoveListener;
        private __removeSecondaryTrack: plat.IRemoveListener;
        private __rootElement: HTMLElement;
        private __type: string;
        private __templateUrl: string;
        private __transitionHash: plat.IObject<string> = {
            right: 'left',
            left: 'right',
            up: 'down',
            down: 'up'
        };

        /**
         * Initialize the track events on the element.
         */
        loaded(): void {
            var element = this.element,
                optionObj = this.options || <plat.observable.IObservableProperty<IDrawerOptions>>{},
                options = optionObj.value || <IDrawerOptions>{},
                transition = options.transition,
                id = options.id;

            this.__type = options.type;
            this.__isElastic = options.elastic === true;
            this.__useContext = options.useContext === true;
            this.__templateUrl = options.templateUrl;
            this.__initializeEvents(id, transition);
        }

        /**
         * Remove the transition classes off the root element.
         */
        dispose(): void {
            var dom = this.dom,
                rootElement = this.__rootElement;
            dom.removeClass(rootElement, 'plat-drawer-transition-prep');
            dom.removeClass(rootElement, 'plat-drawer-transition-' + this._transition);
        }

        /**
         * Opens the drawer.
         */
        open(): void {
            var elementToMove = this.__rootElement,
                isNode = this.$utils.isNode;

            if (!isNode(elementToMove) || !isNode(this._drawerElement)) {
                return;
            }

            var translation: string;
            switch (this._transition) {
                case 'up':
                    translation = 'translate3d(0,' + (-this.__maxOffset) + 'px,0)';
                    break;
                case 'down':
                    translation = 'translate3d(0,' + this.__maxOffset + 'px,0)';
                    break;
                case 'left':
                    translation = 'translate3d(' + (-this.__maxOffset) + 'px,0,0)';
                    break;
                case 'right':
                    translation = 'translate3d(' + this.__maxOffset + 'px,0,0)';
                    break;
                default:
                    return;
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = translation;
            this.$animator.animate(elementToMove, __Transition, animationOptions);
            this.__isOpen = true;
        }

        /**
         * Closes the drawer.
         */
        close(): void {
            var elementToMove = this.__rootElement,
                drawerElement = this._drawerElement,
                isNode = this.$utils.isNode;

            if (!isNode(elementToMove) || !isNode(drawerElement)) {
                return;
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = 'translate3d(0,0,0)';
            this.$animator.animate(elementToMove, __Transition, animationOptions);
            this.__isOpen = false;
        }

        /**
         * Toggles the drawer's open/closed state.
         */
        toggle(): void {
            if (this.__isOpen) {
                this.close();
                return;
            }

            this.open();
        }

        /**
         * Resets the drawer to it's current open/closed state.
         */
        reset(): void {
            if (this.__isOpen) {
                this.open();
                return;
            }

            this.close();
        }

        /**
         * Indicates whether the drawer is currently open.
         */
        isOpen(): boolean {
            return this.__isOpen;
        }

        /**
         * Adds swipe events to the controller element.
         * 
         * @param transition The transition direction of opening for the drawer.
         */
        _addSwipeEvents(transition: string): void {
            var openEvent = __$swipe + transition,
                closeEvent = __$swipe + this.__transitionHash[transition],
                element = this.element;

            this.__removeSwipeOpen = this.addEventListener(element, openEvent, () => {
                this.__hasSwiped = true;
                this.open();
            }, false);

            this.__removeSwipeClose = this.addEventListener(element, closeEvent, () => {
                this.__hasSwiped = true;
                this.close();
            }, false);
        }

        /**
         * Adds primary and secondary tracking events to the controller element.
         * 
         * @param transition The transition direction of opening for the drawer.
         */
        _addEventListeners(transition: string): void {
            var element = this.element,
                isNull = this.$utils.isNull,
                type = this.__type,
                tapOnly = type === 'tap';

            this._transition = transition;

            // remove event listeners first in case we want to later be able to dynamically change transition direction of drawer.
            this._removeEventListeners();
            if (isNull(type) || tapOnly) {
                this.__removeTap = this.addEventListener(element, __$tap, this.toggle, false);
                if (tapOnly) {
                    return;
                }
            }

            var primaryTrack = __$track + transition,
                secondaryTrack = __$track + this.__transitionHash[transition],
                trackFn = this._track;

            this.__removePrimaryTrack = this.addEventListener(element, primaryTrack, trackFn, false);
            this.__removeSecondaryTrack = this.addEventListener(element, secondaryTrack, trackFn, false);
            this._addSwipeEvents(transition);

            if (isNull(this._lastTouch)) {
                var touchEnd = this._touchEnd;

                this._lastTouch = { x: 0, y: 0 };
                this.addEventListener(element, __$touchstart, this._touchStart, false);
                this.addEventListener(element, __$touchend, touchEnd, false);
                this.addEventListener(element, __$trackend, touchEnd, false);
            }
        }

        /**
         * Removes all event listeners.
         */
        _removeEventListeners(): void {
            var isFunction = this.$utils.isFunction;
            if (isFunction(this.__removeTap)) {
                this.__removeTap();
                this.__removeTap = null;
            }

            if (isFunction(this.__removePrimaryTrack)) {
                this.__removePrimaryTrack();
                this.__removePrimaryTrack = null;
            }

            if (isFunction(this.__removeSecondaryTrack)) {
                this.__removeSecondaryTrack();
                this.__removeSecondaryTrack = null;
            }

            if (isFunction(this.__removeSwipeOpen)) {
                this.__removeSwipeOpen();
                this.__removeSwipeOpen = null;
            }

            if (isFunction(this.__removeSwipeClose)) {
                this.__removeSwipeClose();
                this.__removeSwipeClose = null;
            }
        }

        /**
         * Log when the user touches the drawer controller.
         * 
         * @param ev The touch event.
         */
        _touchStart(ev: plat.ui.IGestureEvent): void {
            this.__inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        }

        /**
         * The $touchend and $trackend event handler.
         * 
         * @param ev The touch event.
         */
        _touchEnd(ev: plat.ui.IGestureEvent): void {
            var inTouch = this.__inTouch;
            this.__inTouch = false;
            if (!inTouch || this.__hasSwiped) {
                this.__hasSwiped = false;
                return;
            } else if (ev.type === __$touchend && this.__type !== 'slide') {
                return;
            }

            var drawerElement = this._drawerElement,
                distanceMoved: number;
            switch (this._transition) {
                case 'up':
                case 'down':
                    distanceMoved = ev.clientY - this._lastTouch.y;
                    break;
                case 'left':
                case 'right':
                    distanceMoved = ev.clientX - this._lastTouch.x;
                    break;
                default:
                    return;
            }

            if (Math.abs(distanceMoved) > Math.ceil(this.__maxOffset / 2)) {
                this.toggle();
                return;
            }

            this.reset();
        }

        /**
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions  
         * depending on the defined 'transition' direction.
         * 
         * @param ev The $tracking event.
         */
        _track(ev: plat.ui.IGestureEvent): void {
            this.__rootElement.style[<any>this._transform] = this.__calculateTranslation(ev);
        }

        private __calculateTranslation(ev: plat.ui.IGestureEvent): string {
            var distanceMoved: number;
            switch (this._transition) {
                case 'up':
                    distanceMoved = this.__isOpen ?
                    this.__checkElasticity((-this.__maxOffset) + ev.clientY - this._lastTouch.y) :
                    this.__checkElasticity(ev.clientY - this._lastTouch.y);
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'down':
                    distanceMoved = this.__isOpen ?
                    this.__checkElasticity(this.__maxOffset + ev.clientY - this._lastTouch.y) :
                    this.__checkElasticity(ev.clientY - this._lastTouch.y);
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'left':
                    distanceMoved = this.__isOpen ?
                    this.__checkElasticity((-this.__maxOffset) + ev.clientX - this._lastTouch.x) :
                    this.__checkElasticity(ev.clientX - this._lastTouch.x);
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                case 'right':
                    distanceMoved = this.__isOpen ?
                    this.__checkElasticity(this.__maxOffset + ev.clientX - this._lastTouch.x) :
                    this.__checkElasticity(ev.clientX - this._lastTouch.x);
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                default:
                    return 'translate3d(0,0,0)';
            }
        }

        private __checkElasticity(distanceMoved: number): number {
            if (this.__isElastic) {
                return distanceMoved;
            }

            if (distanceMoved < 0) {
                distanceMoved = 0;
            } else if (distanceMoved > this.__maxOffset) {
                distanceMoved = this.__maxOffset;
            }

            return distanceMoved
        }

        private __initializeEvents(id: string, transition: string): void {
            var element = this.element,
                $utils = this.$utils,
                isString = $utils.isString,
                needsDirection = !isString(transition);

            this.__setTransform();

            var eventRemover = this.on(__DrawerFoundEvent,
                (event: plat.events.IDispatchEventInstance, drawerArg: IDrawerHandshakeEvent) => {
                if (isString(id) && isString(drawerArg.id) && id !== drawerArg.id) {
                    return;
                }

                eventRemover();

                this._drawerElement = drawerArg.element;

                if (needsDirection) {
                    if (isString(drawerArg.transition)) {
                        transition = drawerArg.transition;
                    } else {
                        var Exception = plat.acquire(plat.IExceptionStatic);
                        Exception.warn('Transition direction is incorrectly defined for "' +
                            __Drawer + '" or "' + __DrawerController + '."' +
                            ' Please ensure it is a string.');
                        return;
                    }
                }

                if (!this.__controllerIsValid(transition)) {
                    return;
                }

                this._addEventListeners(transition.toLowerCase());
                this.__setOffset();

                if ($utils.isUndefined(this.__isElastic)) {
                    this.__isElastic = drawerArg.elastic === true;
                }

                if (!this.__useContext && drawerArg.useContext === true) {
                    return;
                }

                this.__determineTemplate(drawerArg.template);
            });

            this.dispatchEvent(__DrawerControllerFetchEvent, plat.events.EventManager.DIRECT, {
                id: id,
                transition: transition
            });
        }

        private __determineTemplate(fragment?: Node): void {
            var $utils = this.$utils;

            if ($utils.isString(this.__templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, this.__templateUrl).then((template) => {
                    this.bindableTemplates.add('drawer', template);
                    this.__bindTemplate();
                });
            } else if ($utils.isNode(fragment)) {
                this.bindableTemplates.add('drawer', fragment);
                this.__bindTemplate();
            }
        }

        private __bindTemplate(): void {
            var drawerElement = this._drawerElement;
            this.bindableTemplates.bind('drawer').then((template) => {
                this.dom.clearNode(drawerElement);
                drawerElement.appendChild(template);
            });
        }

        private __setTransform(): void {
            var style = this.element.style,
                isUndefined = this.$utils.isUndefined;

            if (isUndefined(style.transform)) {
                var vendorPrefix = this.$compat.vendorPrefix;
                if (!isUndefined(style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                    this._transform = vendorPrefix.lowerCase + 'Transform';
                    return;
                } else if (!isUndefined(style[<any>(vendorPrefix.js + 'Transform')])) {
                    this._transform = vendorPrefix.lowerCase + 'Transform';
                    return;
                }
            }

            this._transform = 'transform';
        }

        private __controllerIsValid(transition: string): boolean {
            var isNull = this.$utils.isNull,
                Exception: plat.IExceptionStatic;

            if (isNull(this.__transitionHash[transition])) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Incorrect transition direction: "' + transition +
                    '" defined for "' + __Drawer + '" or "' + __DrawerController + '."');
                return false;
            } else if (isNull(this._drawerElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Could not find a corresponding "' + __Drawer + '" for this "' + __DrawerController + '."');
                return false;
            }
            
            var rootElement = this.__rootElement = this.__getRootElement(this.root);
            if (isNull(rootElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Cannot have a "' + __DrawerController +
                    '" in a hierarchy above the corresponding "' + __Drawer + '."');
                    return false;
            }

            var dom = this.dom;
            dom.addClass(rootElement, 'plat-drawer-transition-prep');
            dom.addClass(rootElement, 'plat-drawer-transition-' + transition);

            return true;
        }

        private __getRootElement(root: plat.ui.ITemplateControl): HTMLElement {
            var $utils = this.$utils,
                isNode = $utils.isNode;
            if (!$utils.isObject(root)) {
                return null;
            }

            var element = root.element,
                drawer = this._drawerElement,
                parent: HTMLElement;
            while (isNode(element) && !((parent = element.parentElement).contains(drawer))) {
                element = parent;
            }

            return element;
        }

        private __setOffset(): void {
            switch (this._transition) {
                case 'up':
                case 'down':
                    this.__maxOffset = this._drawerElement.offsetHeight;
                    break;
                case 'left':
                case 'right':
                    this.__maxOffset = this._drawerElement.offsetWidth;
                    break;
            }
        }
    }

    plat.register.control(__DrawerController, DrawerController);

    /**
     * The drawer options capable of being placed on the 'plat-drawer' and/or the 
     * 'plat-drawer-controller' as 'plat-options.'
     */
    export interface IDrawerOptions {
        /**
         * The unique ID of the drawer / drawer-controller pair.
         */
        id?: string;

        /**
         * The transition direction of drawer opening.
         */
        transition?: string;

        /**
         * The url of the drawer's intended template.
         */
        templateUrl?: string;

        /**
         * A boolean value stating whether to use this context or not.
         */
        useContext?: boolean;

        /**
         * Whether the drawer has an elastic effect while sliding. 
         * Defaults to false.
         */
        elastic?: boolean;

        /**
         * An option for the drawer-controller specifying how the drawer should 
         * open.
         * 'tap': The drawer opens when the controller is tapped.
         * 'slide': The drawer opens when the controller is dragged.
         * default: The drawer opens either when the controller is tapped or the 
         * controller is slid.
         */
        type?: string;
    }

    /**
     * An interface for the drawer's event object used during the 
     * drawer / drawer-controller handshake.
     */
    interface IDrawerHandshakeEvent {
        /**
         * The unique ID of the drawer / drawer-controller pair.
         */
        id?: string;
        /**
         * The transition direction of drawer opening.
         */
        transition?: string;
        /**
         * The global drawer element.
         */
        element?: HTMLElement;
        /**
         * The intended template of the global drawer element.
         */
        template?: Node;
        /**
         * A boolean value stating whether to use this context or not.
         */
        useContext?: boolean;
        /**
         * Whether the drawer has an elastic effect while sliding. 
         * Defaults to false.
         */
        elastic?: boolean;
    }
}
