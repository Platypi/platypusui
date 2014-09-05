module platui {
    /**
     * @name Drawer
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that acts as a global drawer.
     */
    export class Drawer extends plat.ui.TemplateControl implements IUIControl {
        /**
         * @name $utils
         * @memberof platui.Drawer
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);
        
        /**
         * @name options
         * @memberof platui.Drawer
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IDrawerOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;
        
        /**
         * @name __currentTransition
         * @memberof platui.Drawer
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The transition direction of the {@link platui.Drawer|Drawer}.
         */
        private __currentTransition: string;
        /**
         * @name __useContext
         * @memberof platui.Drawer
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not to use the inherited context of this global {@link platui.Drawer|Drawer}.
         */
        private __useContext: boolean;
        
        /**
         * @name setClasses
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Sets the proper class name on this control.
         * 
         * @param {string} className? The class name to set on the button element.
         * @param {Element} element? The element to set the class on. Defaults to this 
         * control's element.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Drawer);
            dom.addClass(element, className);
        }
        
        /**
         * @name initialize
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Removes the innerHTML from the DOM and saves it.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var childNodes = Array.prototype.slice.call(this.element.childNodes);
            if (childNodes.length > 0) {
                this.innerTemplate = this.dom.appendChildren(childNodes);
            }
        }
        
        /**
         * @name loaded
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Check for a transition direction and initialize event handling.
         * 
         * @returns {void}
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
         * @name _changeDirection
         * @memberof platui.Drawer
         * @kind function
         * @access protected
         * 
         * @description
         * Changes the placement and implied transition direction of the {@link platui.Drawer|Drawer}.
         * 
         * @param {string} transition The new transition direction to change to.
         * 
         * @returns {void}
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
        
        /**
         * @name __initializeEvents
         * @memberof platui.Drawer
         * @kind function
         * @access private
         * 
         * @description
         * Initializes and dispatches pub sub events.
         * 
         * @param {string} id The ID of this {@link platui.Drawer|Drawer} if used.
         * @param {string} transition The transition direction.
         * @param {boolean} isElastic Whether or not the {@link platui.Drawer|Drawer} has an 
         * elastic transition effect.
         * 
         * @returns {void}
         */
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
        
        /**
         * @name __bindTemplate
         * @memberof platui.Drawer
         * @kind function
         * @access private
         * 
         * @description
         * Binds the added HTML template to this control's inherited context.
         * 
         * @returns {void}
         */
        private __bindTemplate(): void {
            this.bindableTemplates.bind('drawer').then((template) => {
                this.element.appendChild(template);
            });
        }
    }

    plat.register.control(__Drawer, Drawer);
    
    /**
     * @name DrawerController
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that manipulates and controls a global drawer.
     */
    export class DrawerController extends plat.ui.TemplateControl {
        /**
         * @name $utils
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);
        /**
         * @name $compat
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $compat: plat.ICompat = plat.acquire(__Compat);
        /**
         * @name $document
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $document: Document = plat.acquire(__Document);
        /**
         * @name $animator
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $animator: plat.ui.animations.IAnimator = plat.acquire(__Animator);
        
        /**
         * @name options
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IDrawerOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;
        
        /**
         * @name _transition
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The transition direction of the global {@link platui.Drawer|Drawer} associated 
         * with this control.
         */
        _transition: string;
        
        /**
         * @name _drawerElement
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement of the global {@link platui.Drawer|Drawer} associated 
         * with this control.
         */
        _drawerElement: HTMLElement;
        
        /**
         * @name _transform
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The current browser's CSS3 transform property.
         */
        _transform: string;
        
        /**
         * @name _lastTouch
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IPoint}
         * 
         * @description
         * The last touch start recorded.
         */
        _lastTouch: plat.ui.IPoint;
        
        /**
         * @name __hasSwiped
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user has swiped.
         */
        private __hasSwiped = false;
        /**
         * @name __isOpen
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link platui.Drawer|Drawer} is open.
         */
        private __isOpen = false;
        /**
         * @name __isElastic
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link platui.Drawer|Drawer} is elastic.
         */
        private __isElastic: boolean;
        /**
         * @name __inTouch
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is currently touching the screen.
         */
        private __inTouch: boolean;
        /**
         * @name __useContext
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not to use this control's inherited context.
         */
        private __useContext: boolean;
        /**
         * @name __maxOffset
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {number}
         * 
         * @description
         * The max offset to transform the {@link platui.Drawer|Drawer's} element.
         */
        private __maxOffset: number;
        /**
         * @name __removeTap
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the tap event listener.
         */
        private __removeTap: plat.IRemoveListener;
        /**
         * @name __removeSwipeOpen
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the swipe open event listener.
         */
        private __removeSwipeOpen: plat.IRemoveListener;
        /**
         * @name __removeSwipeClose
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the swipe close event listener.
         */
        private __removeSwipeClose: plat.IRemoveListener;
        /**
         * @name __removePrimaryTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the primary track (open) event listener.
         */
        private __removePrimaryTrack: plat.IRemoveListener;
        /**
         * @name __removeSecondaryTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the secondary track (close) event listener.
         */
        private __removeSecondaryTrack: plat.IRemoveListener;
        /**
         * @name __rootElement
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The root element to translate.
         */
        private __rootElement: HTMLElement;
        /**
         * @name __type
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The type of {@link platui.Drawer|Drawer} 
         * (i.e. the method by which the {@link platui.Drawer|Drawer} opens and closes).
         */
        private __type: string;
        /**
         * @name __templateUrl
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * A URL that points to the HTML template.
         */
        private __templateUrl: string;
        /**
         * @name __transitionHash
         * @memberof platui.DrawerController
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * An object to quickly access the transition close direction based on a transition open direction.
         */
        private __transitionHash: plat.IObject<string> = {
            right: 'left',
            left: 'right',
            up: 'down',
            down: 'up'
        };
        
        /**
         * @name loaded
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Initialize the track events on the element.
         * 
         * @returns {void}
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
         * @name dispose
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Remove the transition classes off the root element.
         * 
         * @returns {void}
         */
        dispose(): void {
            var dom = this.dom,
                rootElement = this.__rootElement;
            dom.removeClass(rootElement, 'plat-drawer-transition-prep');
            dom.removeClass(rootElement, 'plat-drawer-transition-' + this._transition);
        }
        
        /**
         * @name open
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Opens the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
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
         * @name close
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Closes the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
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
         * @name toggle
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Toggles the {@link platui.Drawer|Drawer's} open/closed state.
         * 
         * @returns {void}
         */
        toggle(): void {
            if (this.__isOpen) {
                this.close();
                return;
            }

            this.open();
        }
        
        /**
         * @name reset
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Resets the {@link platui.Drawer|Drawer} to it's current open/closed state.
         * 
         * @returns {void}
         */
        reset(): void {
            if (this.__isOpen) {
                this.open();
                return;
            }

            this.close();
        }
        
        /**
         * @name isOpen
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Indicates whether the {@link platui.Drawer|Drawer} is currently open.
         * 
         * @returns {boolean} Whether or not the {@link platui.Drawer|Drawer} is currently open.
         */
        isOpen(): boolean {
            return this.__isOpen;
        }
        
        /**
         * @name _addSwipeEvents
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds swipe events to the controller element.
         * 
         * @param {string} transition The transition direction of opening for the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
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
         * @name _addSwipeEvents
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds primary and secondary tracking events to the controller element.
         * 
         * @param {string} transition The transition direction of opening for the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
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
         * @name _removeEventListeners
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Removes all event listeners.
         * 
         * @returns {void}
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
         * @name _touchStart
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Log when the user touches the {@link platui.DrawerController|DrawerController}.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        _touchStart(ev: plat.ui.IGestureEvent): void {
            this.__inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        }
        
        /**
         * @name _touchEnd
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * The $touchend and $trackend event handler.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
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
         * @name _track
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions  
         * depending on the defined "transition" direction.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {void}
         */
        _track(ev: plat.ui.IGestureEvent): void {
            this.__rootElement.style[<any>this._transform] = this.__calculateTranslation(ev);
        }
        
        /**
         * @name __calculateTranslation
         * @memberof platui.DrawerController
         * @kind function
         * @access private
         * 
         * @description
         * Calculates the translation value for setting the transform value.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {string} The translation value.
         */
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
        
        /**
         * @name __checkElasticity
         * @memberof platui.DrawerController
         * @kind function
         * @access private
         * 
         * @description
         * Checks for elasticity and potentially readjusts the user's 
         * distance moved.
         * 
         * @param {number} distanceMoved The distance the user's finger moved.
         * 
         * @returns {number} The potentially recalcuated distance moved.
         */
        private __checkElasticity(distanceMoved: number): number {
            if (this.__isElastic) {
                return distanceMoved;
            }

            if (distanceMoved < 0) {
                distanceMoved = 0;
            } else if (distanceMoved > this.__maxOffset) {
                distanceMoved = this.__maxOffset;
            }

            return distanceMoved;
        }
        
        /**
         * @name __initializeEvents
         * @memberof platui.DrawerController
         * @kind function
         * @access private
         * 
         * @description
         * Initializes and dispatches pub sub events.
         * 
         * @param {string} id The ID of this {@link platui.DrawerController|DrawerController} if used.
         * @param {string} transition The transition direction.
         * 
         * @returns {void}
         */
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
        
        /**
         * @name __determineTemplate
         * @memberof platui.DrawerController
         * @kind function
         * @access private
         * 
         * @description
         * Determines the proper HTML template, binds it, and inserts it if needed.
         * 
         * @param {Node} fragment? A Node to insert as the {@link platui.Drawer|Drawer's} HTML template 
         * if no templateUrl is present on this {@link platui.DrawerController|DrawerController}.
         * 
         * @returns {void}
         */
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
        
        /**
         * @name __bindTemplate
         * @memberof platui.DrawerController
         * @kind function
         * @access private
         * 
         * @description
         * Binds the added HTML template to this control's inherited context.
         * 
         * @returns {void}
         */
        private __bindTemplate(): void {
            var drawerElement = this._drawerElement;
            this.bindableTemplates.bind('drawer').then((template) => {
                this.dom.clearNode(drawerElement);
                drawerElement.appendChild(template);
            });
        }
        
        /**
         * @name __setTransform
         * @memberof platui.DrawerController
         * @kind function
         * @access private
         * 
         * @description
         * Obtains the current browser's transform property value.
         * 
         * @returns {void}
         */
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
        
        /**
         * @name __controllerIsValid
         * @memberof platui.DrawerController
         * @kind function
         * @access private
         * 
         * @description
         * Checks if this control has all valid properties.
         * 
         * @param {string} transition The transition direction of the {@link platui.Drawer|Drawer}.
         * 
         * @returns {boolean} Whether or not this control is valid.
         */
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
        
        /**
         * @name __getRootElement
         * @memberof platui.DrawerController
         * @kind function
         * @access private
         * 
         * @description
         * Obtains the root element to translate.
         * 
         * @param {plat.ui.ITemplateControl} root The control to start searching at.
         * 
         * @returns {HTMLElement} The root element.
         */
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
        
        /**
         * @name __setOffset
         * @memberof platui.DrawerController
         * @kind function
         * @access private
         * 
         * @description
         * Sets the max offset to translate the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
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
     * @name IDrawerOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Drawer|Drawer} control 
     * and/or the {@link platui.DrawerController|DrawerController} control.
     */
    export interface IDrawerOptions {
        /**
         * @name id
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The unique ID of the {@link platui.Drawer|Drawer} / {@link platui.DrawerController|DrawerController} pair.
         */
        id?: string;
        
        /**
         * @name transition
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The transition direction of {@link platui.Drawer|Drawer} opening.
         */
        transition?: string;
        
        /**
         * @name templateUrl
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The URL of the {@link platui.Drawer|Drawer's} intended template.
         */
        templateUrl?: string;
        
        /**
         * @name useContext
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value stating whether to use the associated control's context or not.
         */
        useContext?: boolean;
        
        /**
         * @name elastic
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the {@link platui.Drawer|Drawer} has an elastic effect while sliding. 
         * Defaults to false.
         */
        elastic?: boolean;
        
        /**
         * @name elastic
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * An option for the {@link platui.DrawerController|DrawerController} specifying how the drawer should 
         * open.
         * 
         * @remarks
         * "tap": The drawer opens when the controller is tapped.
         * "slide": The drawer opens when the controller is dragged.
         * default: The drawer opens either when the controller is tapped or the 
         * controller is slid.
         */
        type?: string;
    }
    
    /**
     * @name IDrawerHandshakeEvent
     * @memberof platui
     * @kind interface
     * @exported false
     * 
     * @description
     * An interface for the {@link platui.Drawer|Drawer's} event object used during the 
     * {@link platui.Drawer|Drawer} / {@link platui.DrawerController|DrawerController} handshake.
     */
    interface IDrawerHandshakeEvent {
        /**
         * @name id
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The unique ID of the {@link platui.Drawer|Drawer} / {@link platui.DrawerController|DrawerController} pair.
         */
        id?: string;
        /**
         * @name transition
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The transition direction of {@link platui.Drawer|Drawer} opening.
         */
        transition?: string;
        /**
         * @name element
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The global {@link platui.Drawer|Drawer} element.
         */
        element?: HTMLElement;
        /**
         * @name template
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {Node}
         * 
         * @description
         * The intended template of the global {@link platui.Drawer|Drawer} element.
         */
        template?: Node;
        /**
         * @name useContext
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value stating whether to use the associated control's context or not.
         */
        useContext?: boolean;
        /**
         * @name elastic
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the {@link platui.Drawer|Drawer} has an elastic effect while sliding. 
         * Defaults to false.
         */
        elastic?: boolean;
    }
}
