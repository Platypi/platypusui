module platui {
    var __drawerControllerInitEvent = '__platDrawerControllerInit',
        __drawerControllerFetchEvent = '__platDrawerControllerFetch',
        __drawerFoundEvent = '__platDrawerFound';

    /**
     * A Template Control that acts as a global drawer.
     */
    export class Drawer extends plat.ui.TemplateControl {
        $utils: plat.IUtils = plat.acquire(plat.IUtils);

        /**
         * The plat-options for the Drawer.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;

        private __currentDirection: string;

        /**
         * Check for a direction and initialize event handling.
         */
        loaded(): void {
            var element = this.element,
                $utils = this.$utils,
                optionObj = this.options,
                options = $utils.isObject(optionObj) ? optionObj.value : <IDrawerOptions>{},
                direction = this.__currentDirection = options.direction || 'right',
                name = options.name,
                templateUrl = options.templateUrl;

            this.dom.addClass(element, direction);
            if ($utils.isString(templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, templateUrl).then((template) => {
                    this.innerTemplate = template;
                    this.__initializeEvents(name, direction);
                });
                return;
            }

            this.__initializeEvents(name, direction);
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
         * Changes the placement and implied direction of the drawer.
         */
        _changeDirection(direction: string): void {
            if (this.$utils.isNull(direction) || direction === this.__currentDirection) {
                return;
            }

            var dom = this.dom,
                element = this.element;

            dom.removeClass(element, this.__currentDirection);
            dom.addClass(element, direction);

            this.__currentDirection = direction;
        }

        private __initializeEvents(name: string, direction: string): void {
            var $utils = this.$utils,
                element = this.element,
                isString = $utils.isString,
                innerTemplate = this.innerTemplate,
                DIRECT = plat.events.EventManager.DIRECT;

            this.on(__drawerControllerFetchEvent,
                (event: plat.events.IDispatchEventInstance, controllerArg: IDrawerHandshakeEvent) => {
                if (isString(name) && isString(controllerArg.name) && name !== controllerArg.name) {
                    return;
                } else if (isString(controllerArg.direction)) {
                    direction = controllerArg.direction;
                    this._changeDirection(direction);
                }

                this.dispatchEvent(__drawerFoundEvent, DIRECT, {
                    name: name,
                    direction: direction,
                    element: element,
                    template: $utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null
                });
            });
        }
    }

    plat.register.control('plat-drawer', Drawer);

    /**
     * A Template Control that manipulates and controls a global drawer.
     */
    export class DrawerController extends plat.ui.TemplateControl {
        $utils: plat.IUtils = plat.acquire(plat.IUtils);
        $compat: plat.ICompat = plat.acquire(plat.ICompat);
        $document: Document = plat.acquire(plat.Document);

        /**
         * The plat-options for the DrawerController.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;

        /**
         * A boolean value indicating whether the drawer is currently open.
         */
        isOpen = false;

        /**
         * The direction of control for this DrawerController.
         */
        _direction: string;

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
        private __removeSwipeOpen: plat.IRemoveListener;
        private __removeSwipeClose: plat.IRemoveListener;
        private __removePrimaryTrack: plat.IRemoveListener;
        private __removeSecondaryTrack: plat.IRemoveListener;
        private __rootElement: HTMLElement;
        private __templateUrl: string;
        private __directionHash: plat.IObject<string> = {
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
                optionObj = this.options,
                options = this.$utils.isObject(optionObj) ? optionObj.value : <IDrawerOptions>{},
                direction = options.direction,
                name = options.name;

            this.__templateUrl = options.templateUrl;
            this.__initializeEvents(name, direction);
        }

        /**
         * Remove the transition class off the root element.
         */
        dispose(): void {
            var dom = this.dom,
                rootElement = this.__rootElement;

            dom.removeClass(rootElement, 'plat-drawer-transition');
            dom.removeClass(rootElement, 'plat-drawer-transition-prep');
        }

        /**
         * Opens the drawer.
         */
        open(): void {
            var elementToMove = this.__rootElement,
                drawerElement = this._drawerElement,
                isNode = this.$utils.isNode;

            if (!isNode(elementToMove) || !isNode(drawerElement)) {
                return;
            }

            this.dom.addClass(elementToMove, 'plat-drawer-transition');

            var translation: string,
                direction = this._direction;
            switch (direction) {
                case 'up':
                    translation = 'translate3d(0,' + (-drawerElement.offsetHeight) + 'px,0)';
                    break;
                case 'down':
                    translation = 'translate3d(0,' + drawerElement.offsetHeight + 'px,0)';
                    break;
                case 'left':
                    translation = 'translate3d(' + (-drawerElement.offsetWidth) + 'px,0,0)';
                    break;
                case 'right':
                    translation = 'translate3d(' + drawerElement.offsetWidth + 'px,0,0)';
                    break;
                default:
                    return;
            }

            elementToMove.style[<any>this._transform] = translation;
            if (this.isOpen) {
                return;
            }

            this.isOpen = true;
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

            this.dom.addClass(elementToMove, 'plat-drawer-transition');

            elementToMove.style[<any>this._transform] = '';
            if (!this.isOpen) {
                return;
            }

            this.isOpen = false;
        }

        /**
         * Toggles the drawer's open/closed state.
         */
        toggle(): void {
            if (this.isOpen) {
                this.close();
                return;
            }

            this.open();
        }

        /**
         * Resets the drawer to it's current open/closed state.
         */
        reset(): void {
            if (this.isOpen) {
                this.open();
                return;
            }

            this.close();
        }

        /**
         * Adds swipe events to the controller element.
         * 
         * @param direction The direction of opening for the drawer.
         */
        _addSwipeEvents(direction: string): void {
            var openEvent = '$swipe' + direction,
                closeEvent = '$swipe' + this.__directionHash[direction],
                element = this.element;

            this.__removeSwipeOpen = this.addEventListener(element, openEvent, () => {
                this.__hasSwiped = true;
                this.open();
            });

            this.__removeSwipeClose = this.addEventListener(element, closeEvent, () => {
                this.__hasSwiped = true;
                this.close();
            });
        }

        /**
         * Adds primary and secondary tracking events to the controller element.
         * 
         * @param direction The direction of opening for the drawer.
         */
        _addEventListeners(direction: string): void {
            var element = this.element,
                primaryTrack = '$track' + direction,
                secondaryTrack = '$track' + this.__directionHash[direction],
                trackFn = this._track.bind(this);

            this._direction = direction;

            // remove event listeners first in case we want to later be able to dynamically change direction of drawer.
            this._removeEventListeners();
            this.__removePrimaryTrack = this.addEventListener(element, primaryTrack, trackFn);
            this.__removeSecondaryTrack = this.addEventListener(element, secondaryTrack, trackFn);
            this._addSwipeEvents(direction);

            if (this.$utils.isNull(this._lastTouch)) {
                this._lastTouch = { x: 0, y: 0 };
                this.addEventListener(element, '$touchstart', (ev: plat.ui.IGestureEvent) => {
                    this._lastTouch = {
                        x: ev.clientX,
                        y: ev.clientY
                    };
                });
                this.addEventListener(this.$document, '$touchend', this._touchEnd.bind(this));
            }
        }

        /**
         * Removes all event listeners.
         */
        _removeEventListeners(): void {
            var isFunction = this.$utils.isFunction;
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
         * The $touchend event handler.
         * 
         * @param ev The touch event.
         */
        _touchEnd(ev: plat.ui.IGestureEvent): void {
            if (this.__hasSwiped) {
                this.__hasSwiped = false;
                return;
            }

            var drawerElement = this._drawerElement,
                $utils = this.$utils;

            var distanceMoved: number,
                totalDistance: number;
            switch (this._direction) {
                case 'up':
                case 'down':
                    totalDistance = drawerElement.offsetHeight;
                    distanceMoved = ev.clientY - this._lastTouch.y;
                    break;
                case 'left':
                case 'right':
                    totalDistance = drawerElement.offsetWidth;
                    distanceMoved = ev.clientX - this._lastTouch.x;
                    break;
                default:
                    return;
            }

            if (Math.abs(distanceMoved) > Math.ceil(totalDistance / 2)) {
                this.toggle();
                return;
            }

            this.reset();
        }

        /**
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions  
         * depending on the defined 'direction.'
         * 
         * @param ev The $tracking event.
         */
        _track(ev: plat.ui.IGestureEvent): void {
            var elementToMove = this.__rootElement,
                drawerElement = this._drawerElement,
                $utils = this.$utils;

            var distanceMoved: number,
                translation: string;
            switch (this._direction) {
                case 'up':
                    distanceMoved = this.isOpen ?
                        (-drawerElement.offsetHeight) + ev.clientY - this._lastTouch.y :
                        ev.clientY - this._lastTouch.y;
                    translation = 'translate3d(0,' + distanceMoved + 'px,0)';
                    break;
                case 'down':
                    distanceMoved = this.isOpen ?
                        drawerElement.offsetHeight + ev.clientY - this._lastTouch.y :
                        ev.clientY - this._lastTouch.y;
                    translation = 'translate3d(0,' + distanceMoved + 'px,0)';
                    break;
                case 'left':
                    distanceMoved = this.isOpen ?
                        (-drawerElement.offsetWidth) + ev.clientX - this._lastTouch.x :
                        ev.clientX - this._lastTouch.x;
                    translation = 'translate3d(' + distanceMoved + 'px,0,0)';
                    break;
                case 'right':
                    distanceMoved = this.isOpen ?
                        drawerElement.offsetWidth + ev.clientX - this._lastTouch.x :
                        ev.clientX - this._lastTouch.x;
                    translation = 'translate3d(' + distanceMoved + 'px,0,0)';
                    break;
                default:
                    return;
            }

            elementToMove.style[<any>this._transform] = translation;
        }

        private __initializeEvents(name: string, direction: string): void {
            var element = this.element,
                $utils = this.$utils,
                isString = $utils.isString,
                needsDirection = !isString(direction);

            this.__setTransform();

            var eventRemover = this.on(__drawerFoundEvent,
                (event: plat.events.IDispatchEventInstance, drawerArg: IDrawerHandshakeEvent) => {
                if (isString(name) && isString(drawerArg.name) && name !== drawerArg.name) {
                    return;
                }

                eventRemover();

                this._drawerElement = drawerArg.element;

                if (needsDirection) {
                    if (isString(drawerArg.direction)) {
                        direction = drawerArg.direction;
                    } else {
                        var Exception = plat.acquire(plat.IExceptionStatic);
                        Exception.warn('Direction is incorrectly defined for "plat-drawer" or "plat-drawer-controller."' +
                            ' Please ensure it is a string.');
                        return;
                    }
                }

                if (!this.__controllerIsValid(direction)) {
                    return;
                }

                this._addEventListeners(direction.toLowerCase());
                this.__determineTemplate(drawerArg.template);
            });

            this.dispatchEvent(__drawerControllerFetchEvent, plat.events.EventManager.DIRECT, {
                name: name,
                direction: direction
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

        private __controllerIsValid(direction: string): boolean {
            var isNull = this.$utils.isNull,
                Exception: plat.IExceptionStatic,
                rootElement = this.__rootElement = this.root.element,
                dom = this.dom;

            if (isNull(this.__directionHash[direction])) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Incorrect direction: "' + direction + '" defined for "plat-drawer" or "plat-drawer-controller"');
                return false;
            } else if (isNull(this._drawerElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Could not find a corresponding plat-drawer for this "plat-drawer-controller"');
                return false;
            } else if (isNull(rootElement)) {
                var parent = this.root.parent;
                if (isNull(parent) || isNull(parent.element)) {
                    Exception = plat.acquire(plat.IExceptionStatic);
                    Exception.warn('Cannot have a "plat-drawer-controller" inside a root control with a null element.');
                    return false;
                }
                rootElement = this.__rootElement = parent.element;
            }

            dom.addClass(rootElement, 'plat-drawer-transition-prep');
            this.addEventListener(rootElement, this.$compat.animationEvents.$transitionEnd, () => {
                dom.removeClass(rootElement, 'plat-drawer-transition');
            });

            return true;
        }
    }

    plat.register.control('plat-drawer-controller', DrawerController);

    /**
     * The drawer options capable of being placed on the 'plat-drawer' and/or the 
     * 'plat-drawer-controller' as 'plat-options.'
     */
    export interface IDrawerOptions {
        /**
         * The name of the drawer / drawer-controller pair.
         */
        name?: string;

        /**
         * The direction of drawer opening.
         */
        direction?: string;

        /**
         * The url of the drawer's intended template.
         */
        templateUrl?: string;
    }

    /**
     * An interface for the drawer's event object used during the 
     * drawer / drawer-controller handshake.
     */
    interface IDrawerHandshakeEvent {
        /**
         * The name of the drawer / drawer-controller pair.
         */
        name?: string;
        /**
         * The direction of drawer opening.
         */
        direction?: string;
        /**
         * The global drawer element.
         */
        element?: HTMLElement;
        /**
         * The intended template of the global drawer element.
         */
        template?: Node;
    }
}
