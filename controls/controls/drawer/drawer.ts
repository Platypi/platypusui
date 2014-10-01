module platui {
    /**
     * @name Drawer
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that acts as a global drawer.
     */
    export class Drawer extends plat.ui.BindablePropertyControl implements IUIControl {
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
         * @name _currentTransition
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The transition direction of the {@link platui.Drawer|Drawer}.
         */
        _currentTransition: string;
        /**
         * @name _useContext
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not to use the inherited context of this global {@link platui.Drawer|Drawer}.
         */
        _useContext: boolean;

        /**
         * @name controller
         * @memberof platui.Drawer
         * @kind property
         * @access public
         * 
         * @type {platui.DrawerController}
         * 
         * @description
         * A reference to the {@link platui.DrawerController|DrawerController} used to control this {@link platui.Drawer|Drawer}.
         */
        _controller: DrawerController;

        /**
         * @name _loaded
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link plat.controls.Bind|Bind} control has been loaded.
         */
        _loaded = false;

        /**
         * @name _preloadedValue
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specified prior to the control being loaded.
         */
        _preloadedValue = false;

        /**
         * @name setClasses
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Drawer + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name and hides the element.
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
                transition = this._currentTransition = options.transition || 'right',
                useContext = this._useContext =
                (options.useContext === true) ||
                element.hasAttribute(__Context) ||
                element.hasAttribute('data-' + __Context),
                id = options.id || '',
                templateUrl = options.templateUrl,
                isElastic = options.elastic === true;

            element.setAttribute(__Hide, '');
            this.dom.addClass(element, transition);

            if ($utils.isString(templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, templateUrl).then((template) => {
                    this.innerTemplate = template;
                    if (this._useContext) {
                        this.bindTemplate('drawer', template.cloneNode(true));
                        this._checkPreload();
                    }

                    this._initializeEvents(id, transition, isElastic);
                });
                return;
            } else if (useContext && $utils.isNode(this.innerTemplate)) {
                this.bindTemplate('drawer', this.innerTemplate.cloneNode(true));
                this._checkPreload();
            }

            this._initializeEvents(id, transition, isElastic);
        }

        /**
         * @name open
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Opens the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        open(): plat.ui.animations.IAnimationThenable<void> {
            var controller = this._controller;
            if (this.$utils.isNull(controller)) {
                return;
            } else if (!this._useContext) {
                return controller.open();
            }

            var promise = controller._open();
            this.propertyChanged(true);
            return promise;
        }

        /**
         * @name close
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Closes the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        close(): plat.ui.animations.IAnimationThenable<void> {
            var controller = this._controller;
            if (this.$utils.isNull(controller)) {
                return;
            } else if (!this._useContext) {
                return controller.close();
            }

            var promise = controller._close();
            this.propertyChanged(false);
            return promise;
        }

        /**
         * @name toggle
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Toggles the {@link platui.Drawer|Drawer's} open/closed state.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is toggled and the animation is complete.
         */
        toggle(): plat.ui.animations.IAnimationThenable<void> {
            var controller = this._controller;
            if (this.$utils.isNull(controller)) {
                return;
            } else if (!this._useContext) {
                return controller.toggle();
            }

            var promise: plat.ui.animations.IAnimationThenable<void>;
            if (controller.isOpen()) {
                promise = controller._close();
                this.propertyChanged(false);
                return promise;
            }

            promise = controller._open();
            this.propertyChanged(true);
            return promise;
        }

        /**
         * @name reset
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Resets the {@link platui.Drawer|Drawer} to it's current open/closed state.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is reset and the animation is complete.
         */
        reset(): plat.ui.animations.IAnimationThenable<void> {
            var controller = this._controller;
            if (this.$utils.isNull(controller)) {
                return;
            } else if (!this._useContext) {
                return controller.reset();
            }

            var promise: plat.ui.animations.IAnimationThenable<void>;
            if (controller.isOpen()) {
                promise = controller._open();
                this.propertyChanged(true);
                return promise;
            }

            promise = controller._close();
            this.propertyChanged(false);
            return promise;
        }

        /**
         * @name isOpen
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Indicates whether the {@link platui.Drawer|Drawer} is currently open.
         * 
         * @returns {boolean} Whether or not the {@link platui.Drawer|Drawer} is currently open.
         */
        isOpen(): boolean {
            var controller = this._controller;
            if (this.$utils.isNull(controller)) {
                return;
            }

            return controller.isOpen();
        }

        /**
         * @name bindTemplate
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Binds the added HTML template to this control's inherited context.
         * 
         * @param {string} name The template name to bind.
         * @param {Node} node The node to add as a bindable template.
         * 
         * @returns {void}
         */
        bindTemplate(name: string, node: Node): void {
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            bindableTemplates.bind(name).then((template) => {
                var element = this.element;
                this.dom.clearNode(element);
                element.appendChild(template);
            });
        }

        /**
         * @name setProperty
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any): void {
            if (!this.loaded) {
                this._preloadedValue = newValue;
                return;
            }

            var $utils = this.$utils,
                controller = this._controller;

            if ($utils.isBoolean(newValue) && !$utils.isNull(controller)) {
                if (newValue) {
                    if (controller.isOpen()) {
                        return;
                    }
                    controller.open();
                    return;
                }

                if (controller.isOpen()) {
                    controller.close();
                }
            }
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
            if (this.$utils.isNull(transition) || transition === this._currentTransition) {
                return;
            }

            var dom = this.dom,
                element = this.element;

            dom.removeClass(element, this._currentTransition);
            dom.addClass(element, transition);

            this._currentTransition = transition;
        }

        /**
         * @name _initializeEvents
         * @memberof platui.Drawer
         * @kind function
         * @access protected
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
        _initializeEvents(id: string, transition: string, isElastic: boolean): void {
            var $utils = this.$utils,
                isString = $utils.isString,
                innerTemplate = this.innerTemplate,
                useContext = this._useContext,
                DIRECT = plat.events.EventManager.DIRECT;

            this.on(__DrawerControllerFetchEvent + '_' + id,
                (event: plat.events.IDispatchEventInstance, controllerArg: IDrawerHandshakeEvent) => {
                    if (isString(controllerArg.transition)) {
                        transition = controllerArg.transition;
                        this._changeDirection(transition);
                    }

                    this._controller = controllerArg.control;

                    if (!controllerArg.received) {
                        this.dispatchEvent(__DrawerFoundEvent + '_' + id, DIRECT, {
                            control: this,
                            received: true,
                            transition: transition,
                            useContext: useContext,
                            template: $utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                            elastic: isElastic
                        });
                    }
                });

            this.dispatchEvent(__DrawerFoundEvent + '_' + id, DIRECT, {
                control: this,
                received: false,
                transition: transition,
                useContext: useContext,
                template: $utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                elastic: isElastic
            });
        }

        /**
         * @name _checkPreload
         * @memberof platui.Drawer
         * @kind function
         * @access protected
         * 
         * @description
         * Checks the preloaded value and handles accordingly.
         * 
         * @returns {void}
         */
        _checkPreload(): void {
            if (this._preloadedValue) {
                var $utils = this.$utils;
                $utils.postpone(() => {
                    var controller = this._controller;
                    if (!$utils.isNull(controller)) {
                        controller.open();
                    }
                });
            }
        }
    }

    plat.register.control(__Drawer, Drawer);

    /**
     * @name DrawerController
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that manipulates and controls a global drawer.
     */
    export class DrawerController extends plat.ui.BindablePropertyControl {
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
         * @name $window
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        $window: Window = plat.acquire(__Window);
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
        options: plat.observable.IObservableProperty<IDrawerControllerOptions>;

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
         * @name _drawer
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {platui.Drawer}
         * 
         * @description
         * The global {@link platui.Drawer|Drawer} associated 
         * with this control.
         */
        _drawer: Drawer;

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
         * @name _preTransform
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The value of the inline transform property prior to the Drawer manipulating it.
         */
        _preTransform: string;

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
         * @name _hasSwiped
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user has swiped.
         */
        _hasSwiped = false;

        /**
         * @name _isOpen
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link platui.Drawer|Drawer} is open.
         */
        _isOpen = false;

        /**
         * @name _isElastic
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link platui.Drawer|Drawer} is elastic.
         */
        _isElastic: boolean;

        /**
         * @name _inTouch
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is currently touching the screen.
         */
        _inTouch: boolean;

        /**
         * @name _useContext
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not to use this control's inherited context.
         */
        _useContext: boolean;

        /**
         * @name _maxOffset
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The max offset to transform the {@link platui.Drawer|Drawer's} element.
         */
        _maxOffset: number;

        /**
         * @name _removeTap
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the tap event listener.
         */
        _removeTap: plat.IRemoveListener;

        /**
         * @name _removeSwipeOpen
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the swipe open event listener.
         */
        _removeSwipeOpen: plat.IRemoveListener;

        /**
         * @name _removeSwipeClose
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the swipe close event listener.
         */
        _removeSwipeClose: plat.IRemoveListener;

        /**
         * @name _removePrimaryTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the primary track (open) event listener.
         */
        _removePrimaryTrack: plat.IRemoveListener;

        /**
         * @name _removeSecondaryTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the secondary track (close) event listener.
         */
        _removeSecondaryTrack: plat.IRemoveListener;

        /**
         * @name _openDelayRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the postponed addition of event intercepts.
         */
        _openDelayRemover: plat.IRemoveListener;

        /**
         * @name _openTapRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the tap event listener on the open {@link platui.Drawer|Drawer}.
         */
        _openTapRemover: plat.IRemoveListener;

        /**
         * @name _openSwipeRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the swipe event listeners on the open {@link platui.Drawer|Drawer}.
         */
        _openSwipeRemover: plat.IRemoveListener;

        /**
         * @name _openTrackRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the swipe event listeners on the open {@link platui.Drawer|Drawer}.
         */
        _openTrackRemover: plat.IRemoveListener;

        /**
         * @name _rootElement
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The root element to translate.
         */
        _rootElement: HTMLElement;

        /**
         * @name _rootElementStyle
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {{ position?: string; zIndex?: string; }}
         * 
         * @description
         * An object to hold the _rootElement style so that we can reset it 
         * when the {@link platui.DrawerController|Drawer Controller} is disposed.
         */
        _rootElementStyle: { position?: string; zIndex?: string; };

        /**
         * @name _type
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The type of {@link platui.Drawer|Drawer} 
         * (i.e. the method by which the {@link platui.Drawer|Drawer} opens and closes).
         */
        _type: string;

        /**
         * @name _templateUrl
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * A URL that points to the HTML template.
         */
        _templateUrl: string;

        /**
         * @name _transitionHash
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * An object to quickly access the transition close direction based on a transition open direction.
         */
        _transitionHash: plat.IObject<string> = {
            right: 'left',
            left: 'right',
            up: 'down',
            down: 'up'
        };

        /**
         * @name _directionalTransitionPrep
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * A class name that is used to set styling based on the transition direction.
         */
        _directionalTransitionPrep: string;

        /**
         * @name _loaded
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link plat.controls.Bind|Bind} control has been loaded.
         */
        _loaded = false;

        /**
         * @name _preloadedValue
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specified prior to the control being loaded.
         */
        _preloadedValue = false;

        /**
         * @name _isTap
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specifying whether the {@link platui.Drawer|Drawer} is waiting for a tap 
         * for opening and closing.
         */
        _isTap: boolean;

        /**
         * @name _isSwipe
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specifying whether the {@link platui.Drawer|Drawer} is waiting for a swipe 
         * for opening and closing.
         */
        _isSwipe: boolean;

        /**
         * @name _isTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specifying whether the {@link platui.Drawer|Drawer} is being tracked 
         * for opening and closing.
         */
        _isTrack: boolean;

        /**
         * @name initialize
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Sets the class name on the element.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.dom.addClass(this.element, __DrawerController);
        }

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
                $utils = this.$utils,
                optionObj = this.options || <plat.observable.IObservableProperty<IDrawerControllerOptions>>{},
                options = optionObj.value || <IDrawerControllerOptions>{},
                transition = options.transition,
                id = options.id || '';

            this._type = options.type || 'tap track';
            this._isElastic = options.elastic;
            this._useContext = options.useContext;
            this._templateUrl = options.templateUrl;
            this._initializeEvents(id, transition);
        }

        /**
         * @name dispose
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Remove the transition classes off the root element and reset the position and 
         * zIndex properties if modified.
         * 
         * @returns {void}
         */
        dispose(): void {
            var storedStyle = this._rootElementStyle,
                rootElement = this._rootElement,
                $utils = this.$utils;

            this.dom.removeClass(rootElement, 'plat-drawer-transition-prep ' + this._directionalTransitionPrep);

            if (this.$utils.isObject(storedStyle)) {
                var rootElementStyle = this._rootElement.style;
                $utils.extend(rootElementStyle, storedStyle);
            }
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
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        open(): plat.ui.animations.IAnimationThenable<void> {
            var promise = this._open();
            if (this._useContext) {
                this.propertyChanged(true);
            } else if (!this.$utils.isNull(this._drawer)) {
                this._drawer.propertyChanged(true);
            }
            return promise;
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
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        close(): plat.ui.animations.IAnimationThenable<void> {
            var promise = this._close();
            if (this._useContext) {
                this.propertyChanged(false);
            } else if (!this.$utils.isNull(this._drawer)) {
                this._drawer.propertyChanged(false);
            }
            return promise;
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
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is toggled and the animation is complete.
         */
        toggle(): plat.ui.animations.IAnimationThenable<void> {
            if (this._isOpen) {
                return this.close();
            }

            return this.open();
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
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is reset and the animation is complete.
         */
        reset(): plat.ui.animations.IAnimationThenable<void> {
            if (this._isOpen) {
                return this.open();
            }

            return this.close();
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
            return this._isOpen;
        }

        /**
         * @name bindTemplate
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Binds the added HTML template to this control's inherited context and 
         * places the node into the {@link platui.Drawer|Drawer}.
         * 
         * @param {string} name The template name to bind.
         * @param {Node} node The node to add as a bindable template.
         * 
         * @returns {void}
         */
        bindTemplate(name: string, node: Node): void {
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            bindableTemplates.bind(name).then((template) => {
                var element = this._drawerElement;
                this.dom.clearNode(element);
                element.appendChild(template);
            });
        }

        /**
         * @name setProperty
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any): void {
            if (!this.loaded) {
                this._preloadedValue = newValue;
                return;
            }

            if (this.$utils.isBoolean(newValue)) {
                if (newValue) {
                    if (this._isOpen) {
                        return;
                    }
                    this._open();
                    return;
                }

                if (this._isOpen) {
                    this._close();
                }
            }
        }

        /**
         * @name _open
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Opens the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        _open(): plat.ui.animations.IAnimationThenable<void> {
            var rootElement = this._rootElement,
                drawerElement = this._drawerElement,
                $utils = this.$utils,
                isNode = $utils.isNode;

            if (!isNode(rootElement) || !isNode(drawerElement)) {
                return;
            }

            drawerElement.removeAttribute(__Hide);

            var translation: string;
            switch (this._transition) {
                case 'up':
                    translation = 'translate3d(0,' + (-this._maxOffset) + 'px,0)';
                    break;
                case 'down':
                    translation = 'translate3d(0,' + this._maxOffset + 'px,0)';
                    break;
                case 'left':
                    translation = 'translate3d(' + (-this._maxOffset) + 'px,0,0)';
                    break;
                case 'right':
                    translation = 'translate3d(' + this._maxOffset + 'px,0,0)';
                    break;
                default:
                    return;
            }

            if (!this._isOpen) {
                this._openDelayRemover = $utils.postpone(this._addOpenDrawerIntercepts, null, this);
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = translation;
            this._isOpen = true;
            this.dom.addClass(rootElement, this._directionalTransitionPrep);
            return this.$animator.animate(rootElement, __Transition, animationOptions);
        }

        /**
         * @name _close
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Closes the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        _close(): plat.ui.animations.IAnimationThenable<void> {
            var rootElement = this._rootElement,
                drawerElement = this._drawerElement,
                isNode = this.$utils.isNode;

            if (!isNode(rootElement) || !isNode(drawerElement)) {
                return;
            }

            var animationOptions: plat.IObject<string> = {},
                transform = <any>this._transform;

            animationOptions[transform] = 'translate3d(0,0,0)';
            this._isOpen = false;

            this._removeIntercepts();

            return this.$animator.animate(rootElement, __Transition, animationOptions).then(() => {
                if (this._isOpen) {
                    return;
                }

                rootElement.style[transform] = this._preTransform;
                drawerElement.setAttribute(__Hide, '');
                this.dom.removeClass(rootElement, this._directionalTransitionPrep);
            });
        }

        /**
         * @name _addOpenDrawerIntercepts
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all event listeners to the moving root element for tracking and closing the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        _addOpenDrawerIntercepts(): void {
            var rootElement = this._rootElement;

            if (this._isTrack) {
                var touchStartRemover = this.addEventListener(rootElement, __$touchstart, this._touchStart, false),
                    trackRemover = this.addEventListener(rootElement, __$track, this._track, false),
                    touchEnd = this._touchEnd,
                    trackEndRemover = this.addEventListener(rootElement, __$trackend, touchEnd, false),
                    touchEndRemover = this.addEventListener(rootElement, __$touchend, touchEnd, false);

                this._openTrackRemover = () => {
                    touchStartRemover();
                    trackRemover();
                    trackEndRemover();
                    touchEndRemover();
                };
            }

            if (this._isTap) {
                this._openTapRemover = this.addEventListener(rootElement, __$tap, this._openDrawerTapIntercept, false);
            }

            if (this._isSwipe) {

            }
        }

        /**
         * @name _openDrawerTapIntercept
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds a tap event listener to the moving root element for closing the {@link platui.Drawer|Drawer}.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tap event object.
         * 
         * @returns {void}
         */
        _openDrawerTapIntercept(ev: plat.ui.IGestureEvent): void {
            this._removeIntercepts();
            this.close();
        }

        /**
         * @name _removeIntercepts
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Removes all event listener on the moving root element for closing the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        _removeIntercepts(): void {
            var isFunction = this.$utils.isFunction;

            if (isFunction(this._openDelayRemover)) {
                this._openDelayRemover();
                this._openDelayRemover = null;
            }

            if (this._isTap) {
                if (isFunction(this._openTapRemover)) {
                    this._openTapRemover();
                    this._openTapRemover = null;
                }
            }

            if (this._isTrack) {
                if (isFunction(this._openTrackRemover)) {
                    this._openTrackRemover();
                    this._openTrackRemover = null;
                }
            }

            if (this._isSwipe) {
                if (isFunction(this._openSwipeRemover)) {
                    this._openSwipeRemover();
                    this._openSwipeRemover = null;
                }
            }
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
                closeEvent = __$swipe + this._transitionHash[transition],
                element = this.element;

            this._removeSwipeOpen = this.addEventListener(element, openEvent, () => {
                this._hasSwiped = true;
                this.open();
            }, false);

            this._removeSwipeClose = this.addEventListener(element, closeEvent, () => {
                this._hasSwiped = true;
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
                types = this._type.split(' ');

            this._transition = transition;

            // remove event listeners here first if we want to later be able to dynamically change transition direction of drawer.
            // this._removeEventListeners();

            if (this._isTap = (types.indexOf('tap') !== -1)) {
                this._removeTap = this.addEventListener(element, __$tap, this.open, false);
            }

            if (this._isSwipe = (types.indexOf('swipe') !== -1)) {
                this._addSwipeEvents(transition);
            }

            if (this._isTrack = (types.indexOf('track') !== -1)) {
                var primaryTrack = __$track + transition,
                    secondaryTrack = __$track + this._transitionHash[transition],
                    trackFn = this._track;

                this._removePrimaryTrack = this.addEventListener(element, primaryTrack, trackFn, false);
                this._removeSecondaryTrack = this.addEventListener(element, secondaryTrack, trackFn, false);

                if (isNull(this._lastTouch)) {
                    var touchEnd = this._touchEnd;

                    this._lastTouch = { x: 0, y: 0 };
                    this.addEventListener(element, __$touchstart, this._touchStart, false);
                    this.addEventListener(element, __$touchend, touchEnd, false);
                    this.addEventListener(element, __$trackend, touchEnd, false);
                }
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
            if (isFunction(this._removeTap)) {
                this._removeTap();
                this._removeTap = null;
            }

            if (isFunction(this._removePrimaryTrack)) {
                this._removePrimaryTrack();
                this._removePrimaryTrack = null;
            }

            if (isFunction(this._removeSecondaryTrack)) {
                this._removeSecondaryTrack();
                this._removeSecondaryTrack = null;
            }

            if (isFunction(this._removeSwipeOpen)) {
                this._removeSwipeOpen();
                this._removeSwipeOpen = null;
            }

            if (isFunction(this._removeSwipeClose)) {
                this._removeSwipeClose();
                this._removeSwipeClose = null;
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
            this._inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };

            if (this._isOpen) {
                return;
            }
            this._drawerElement.removeAttribute(__Hide);
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
            var inTouch = this._inTouch;
            this._inTouch = false;
            if (!inTouch || this._hasSwiped) {
                this._hasSwiped = false;
                return;
            }

            var distanceMoved: number;
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

            if (Math.abs(distanceMoved) > Math.ceil(this._maxOffset / 2)) {
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
            this._rootElement.style[<any>this._transform] = this._calculateTranslation(ev);
        }

        /**
         * @name _calculateTranslation
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the translation value for setting the transform value.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {string} The translation value.
         */
        _calculateTranslation(ev: plat.ui.IGestureEvent): string {
            var distanceMoved: number;
            switch (this._transition) {
                case 'right':
                    distanceMoved = this._isOpen ?
                    this._checkElasticity(this._maxOffset + ev.clientX - this._lastTouch.x) :
                    this._checkElasticity(ev.clientX - this._lastTouch.x);
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                case 'left':
                    distanceMoved = this._isOpen ?
                    this._checkElasticity(this._maxOffset + this._lastTouch.x - ev.clientX) :
                    this._checkElasticity(this._lastTouch.x - ev.clientX);
                    return 'translate3d(' + (-distanceMoved) + 'px,0,0)';
                case 'down':
                    distanceMoved = this._isOpen ?
                    this._checkElasticity(this._maxOffset + ev.clientY - this._lastTouch.y) :
                    this._checkElasticity(ev.clientY - this._lastTouch.y);
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'up':
                    distanceMoved = this._isOpen ?
                    this._checkElasticity(this._maxOffset + this._lastTouch.y - ev.clientY) :
                    this._checkElasticity(this._lastTouch.y - ev.clientY);
                    return 'translate3d(0,' + (-distanceMoved) + 'px,0)';
                default:
                    return this._preTransform;
            }
        }

        /**
         * @name _checkElasticity
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Checks for elasticity and potentially readjusts the user's 
         * distance moved.
         * 
         * @param {number} distanceMoved The distance the user's finger moved.
         * 
         * @returns {number} The potentially recalcuated distance moved.
         */
        _checkElasticity(distanceMoved: number): number {
            if (this._isElastic) {
                return distanceMoved;
            }

            if (distanceMoved < 0) {
                distanceMoved = 0;
            } else if (distanceMoved > this._maxOffset) {
                distanceMoved = this._maxOffset;
            }

            return distanceMoved;
        }

        /**
         * @name _initializeEvents
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes and dispatches pub sub events.
         * 
         * @param {string} id The ID of this {@link platui.DrawerController|DrawerController} if used.
         * @param {string} transition The transition direction.
         * 
         * @returns {void}
         */
        _initializeEvents(id: string, transition: string): void {
            this._setTransform();

            var eventRemover = this.on(__DrawerFoundEvent + '_' + id,
                (event: plat.events.IDispatchEventInstance, drawerArg: IDrawerHandshakeEvent) => {
                    eventRemover();

                    var $utils = this.$utils,
                        isString = $utils.isString,
                        isUndefined = $utils.isUndefined,
                        drawer = (this._drawer = drawerArg.control) || {},
                        drawerElement = this._drawerElement = drawer.element,
                        useContext = this._useContext;

                    if (!isString(transition)) {
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

                    if (!this._controllerIsValid(transition)) {
                        return;
                    }

                    drawerElement.removeAttribute(__Hide);
                    this._addEventListeners(transition.toLowerCase());
                    this._setOffset();
                    drawerElement.setAttribute(__Hide, '');

                    if (isUndefined(this._isElastic)) {
                        this._isElastic = drawerArg.elastic === true;
                    }

                    if (!drawerArg.received) {
                        this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                            control: this,
                            received: true,
                            transition: transition
                        });
                    }

                    if (useContext === false || (isUndefined(useContext) && drawerArg.useContext === true)) {
                        return;
                    }

                    this._useContext = true;
                    this._determineTemplate(drawerArg.template);

                    if (this._preloadedValue) {
                        $utils.postpone(() => {
                            this._open();
                        });
                    }
                });

            this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                control: this,
                received: false,
                transition: transition
            });
        }

        /**
         * @name _determineTemplate
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Determines the proper HTML template, binds it, and inserts it if needed.
         * 
         * @param {Node} fragment? A Node to insert as the {@link platui.Drawer|Drawer's} HTML template 
         * if no templateUrl is present on this {@link platui.DrawerController|DrawerController}.
         * 
         * @returns {void}
         */
        _determineTemplate(fragment?: Node): void {
            var $utils = this.$utils;

            if ($utils.isString(this._templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, this._templateUrl).then((template) => {
                    this.bindTemplate('drawer', template);
                });
            } else if ($utils.isNode(fragment)) {
                this.bindTemplate('drawer', fragment);
            }
        }

        /**
         * @name _setTransform
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Obtains the current browser's transform property value.
         * 
         * @returns {void}
         */
        _setTransform(): void {
            var style = this.element.style,
                isUndefined = this.$utils.isUndefined,
                transform: string;

            if (isUndefined(style.transform)) {
                var vendorPrefix = this.$compat.vendorPrefix;
                if (!isUndefined(style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                    transform = this._transform = vendorPrefix.lowerCase + 'Transform';
                } else if (!isUndefined(style[<any>(vendorPrefix.js + 'Transform')])) {
                    transform = this._transform = vendorPrefix.lowerCase + 'Transform';
                }
            } else {
                transform = this._transform = 'transform';
            }

            this._preTransform = style[<any>transform];
        }

        /**
         * @name _controllerIsValid
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if this control has all valid properties.
         * 
         * @param {string} transition The transition direction of the {@link platui.Drawer|Drawer}.
         * 
         * @returns {boolean} Whether or not this control is valid.
         */
        _controllerIsValid(transition: string): boolean {
            var isNull = this.$utils.isNull,
                Exception: plat.IExceptionStatic;

            if (isNull(this._transitionHash[transition])) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Incorrect transition direction: "' + transition +
                    '" defined for "' + __Drawer + '" or "' + __DrawerController + '."');
                return false;
            } else if (isNull(this._drawerElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Could not find a corresponding "' + __Drawer + '" for this "' + __DrawerController + '."');
                return false;
            }

            var rootElement = this._rootElement = this._getRootElement(this.root);
            if (isNull(rootElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Cannot have a "' + __DrawerController +
                    '" in a hierarchy above the corresponding "' + __Drawer + '."');
                return false;
            }

            this.dom.addClass(rootElement, 'plat-drawer-transition-prep');
            this._directionalTransitionPrep = 'plat-drawer-transition-' + transition;

            return true;
        }

        /**
         * @name _getRootElement
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Obtains the root element to translate.
         * 
         * @param {plat.ui.ITemplateControl} root The control to start searching at.
         * 
         * @returns {HTMLElement} The root element.
         */
        _getRootElement(root: plat.ui.ITemplateControl): HTMLElement {
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

            var $window = this.$window,
                computedStyle = $window.getComputedStyle(element),
                style = element.style,
                position = computedStyle.position,
                zIndex = Number(computedStyle.zIndex),
                rootElementStyle: { position?: string; zIndex?: string; };

            if (position === 'static') {
                rootElementStyle = {
                    position: style.position
                };
                style.position = 'relative';
            }

            if (!$utils.isNumber(zIndex) || zIndex > 1) {
                rootElementStyle = rootElementStyle || {};
                rootElementStyle.zIndex = style.zIndex;
                style.zIndex = '1';
            }

            this._rootElementStyle = rootElementStyle;

            return element;
        }

        /**
         * @name _setOffset
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the max offset to translate the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        private _setOffset(): void {
            switch (this._transition) {
                case 'up':
                case 'down':
                    this._maxOffset = this._drawerElement.offsetHeight;
                    break;
                case 'left':
                case 'right':
                    this._maxOffset = this._drawerElement.offsetWidth;
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
     * The available {@link plat.controls.Options|options} for the {@link platui.Drawer|Drawer} control.
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
         * Defaults to "right".
         * 
         * @remarks
         * - "right"
         * - "left"
         * - "up"
         * - "down"
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
    }

    /**
     * @name IDrawerControllerOptions
     * @memberof platui
     * @kind interface
     * 
     * @extends {platui.IDrawerOptions}
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.DrawerController|DrawerController} control.
     */
    export interface IDrawerControllerOptions extends IDrawerOptions {
        /**
         * @name type
         * @memberof platui.IDrawerControllerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies how the {@link platui.Drawer|Drawer} should open. Multiple types can be combined by making it space delimited. 
         * It's default behavior is "tap track".
         * 
         * @remarks
         * "tap": The drawer opens when the controller is tapped.
         * "track": The drawer opens when the controller is dragged.
         * "swipe": The drawer opens when the controller is swiped.
         * default: The drawer opens either when the controller is tapped or the 
         * controller is tracked.
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
         * @name received
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value specifying whether the is being reciprocated.
         */
        received?: boolean;
        /**
         * @name control
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * A reference to either the corresponding {@link platui.DrawerController|DrawerController} or the corresponding 
         * {@link platui.Drawer|Drawer} the  used to control the {@link platui.Drawer|Drawer}.
         */
        control?: any;
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
