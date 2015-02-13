module platui {
    /**
     * @name Drawer
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.BindControl|BindControl} that acts as a global drawer.
     */
    export class Drawer extends plat.ui.BindControl implements IUIControl {
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
         * @name storedProperties
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {{ position?: string; zIndex?: string; parentEl?: HTMLElement; parentOverflow?: string }}
         * 
         * @description
         * An object to hold the stored style and element properties so that we can reference and reset them 
         * when all {@link platui.DrawerController|Drawer Controllers} are disposed.
         */
        storedProperties: { position?: string; zIndex?: string; parentEl?: HTMLElement; parentOverflow?: string; };

        /**
         * @name _utils
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.Utils|Utils} injectable.
         */
        protected _utils: plat.Utils = plat.acquire(__Utils);

        /**
         * @name _Promise
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: plat.async.IPromise = plat.acquire(__Promise);

        /**
         * @name _currentPosition
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The current position of the {@link platui.Drawer|Drawer}.
         */
        protected _currentPosition: string;
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
        protected _useContext: boolean;

        /**
         * @name controller
         * @memberof platui.Drawer
         * @kind property
         * @access public
         * 
         * @type {platui.DrawerController}
         * 
         * @description
         * A reference to all the {@link platui.DrawerController|DrawerController} used to control this {@link platui.Drawer|Drawer}.
         */
        protected _controllers: Array<DrawerController> = [];

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
        protected _loaded = false;

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
        protected _preloadedValue = false;

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
         * Set the class name and hides the element and 
         * removes the innerHTML from the DOM and saves it.
         * 
         * @returns {void}
         */
        initialize(): void {
            var childNodes = Array.prototype.slice.call(this.element.childNodes);
            if (childNodes.length > 0) {
                this.innerTemplate = this.dom.appendChildren(childNodes);
            }
            this.setClasses();
        }

        /**
         * @name loaded
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Check for a position and initialize event handling.
         * 
         * @returns {void}
         */
        loaded(): void {
            var element = this.element,
                _utils = this._utils,
                optionObj = this.options || <plat.observable.IObservableProperty<IDrawerOptions>>{},
                options = optionObj.value || <IDrawerOptions>{},
                position = this._currentPosition = options.position || 'left',
                useContext = this._useContext = (options.useContext === true) || !_utils.isUndefined(this.attributes[__CamelContext]),
                id = options.id || '',
                templateUrl = options.templateUrl,
                isElastic = options.elastic === true;

            element.setAttribute(__Hide, '');
            this.dom.addClass(element, __Plat + position);

            if (_utils.isString(templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, templateUrl).then((template) => {
                    this.innerTemplate = template;
                    if (this._useContext) {
                        this.bindTemplate('drawer', template.cloneNode(true));
                        this._checkPreload();
                    }

                    this._initializeEvents(id, position, isElastic);
                });
                return;
            } else if (useContext && _utils.isNode(this.innerTemplate)) {
                this.bindTemplate('drawer', this.innerTemplate.cloneNode(true));
                this._checkPreload();
            }

            this._initializeEvents(id, position, isElastic);
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        open(): plat.async.IThenable<void> {
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to open.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }

            return controller.open();
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        close(): plat.async.IThenable<void> {
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to close.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }

            return controller.close();
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is toggled and the animation is complete.
         */
        toggle(): plat.async.IThenable<void> {
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to toggle.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }

            return controller.toggle();
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is reset and the animation is complete.
         */
        reset(): plat.async.IThenable<void> {
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to reset.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }

            return controller.reset();
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
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to check if open.', _Exception.TEMPLATE);
                return false;
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
         * Adds and binds the added HTML template to this control's inherited context.
         * 
         * @param {string} name The template name to both add and bind.
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
            }).catch((error) => {
                var _Exception = this._Exception;
                _Exception.warn('Error binding template for ' + this.type + ': ' + error, _Exception.BIND);
            });
        }

        /**
         * @name observeProperties
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function that allows this control to observe both the bound property itself as well as 
         * potential child properties if being bound to an object.
         * 
         * @param {(listener: plat.ui.IBoundPropertyChangedListener, identifier: string) => void} observe 
         * A function that allows bound properties to be observed with defined listeners.
         * @param {string} identifier The identifier off of the bound object to listen to for changes.
         * 
         * @returns {void}
         */
        observeProperties(observe: (listener: (newValue: any, oldValue: any, identifier: string, firstTime?: boolean) => void,
            identifier?: string) => void): void {
            observe(this._setBoundProperty);
        }

        /**
         * @name controllerCount
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Returns the number of {@link platui.DrawerController|DrawerControllers} linked to this 
         * {@link platui.Drawer|Drawer}.
         * 
         * @returns {number} The {@link platui.DrawerController|DrawerController} count.
         */
        controllerCount(): number {
            return this._controllers.length;
        }

        /**
         * @name spliceController
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Removes a specified {@link platui.DrawerController|DrawerController} from this control's Array of 
         * linked {@link platui.DrawerController|DrawerControllers}.
         * 
         * @param {platui.DrawerController} controller The {@link platui.DrawerController|DrawerController} 
         * to splice.
         * 
         * @returns {void}
         */
        spliceController(controller: DrawerController): void {
            var controllers = this._controllers,
                index = controllers.indexOf(controller);
            if (index === -1) {
                return;
            }

            controllers.splice(index, 1);
        }

        /**
         * @name _setBoundProperty
         * @memberof platui.Drawer
         * @kind function
         * @access protected
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {boolean} drawerState The new value of the control state.
         * 
         * @returns {void}
         */
        protected _setBoundProperty(drawerState: boolean): void {
            if (!this.loaded) {
                this._preloadedValue = drawerState;
                return;
            }

            var _utils = this._utils,
                controller = this._controllers[0];

            if (_utils.isBoolean(drawerState) && !_utils.isNull(controller)) {
                if (drawerState) {
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
         * Changes the placement and implied position of the {@link platui.Drawer|Drawer}.
         * 
         * @param {string} position The new position to change to.
         * 
         * @returns {void}
         */
        protected _changeDirection(position: string): void {
            if (this._utils.isNull(position) || position === this._currentPosition) {
                return;
            }

            var dom = this.dom,
                element = this.element;

            dom.removeClass(element, __Plat + this._currentPosition);
            dom.addClass(element, __Plat + position);

            this._currentPosition = position;
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
         * @param {string} position The position.
         * @param {boolean} isElastic Whether or not the {@link platui.Drawer|Drawer} has an 
         * elastic transition effect.
         * 
         * @returns {void}
         */
        protected _initializeEvents(id: string, position: string, isElastic: boolean): void {
            var _utils = this._utils,
                isString = _utils.isString,
                isNull = _utils.isNull,
                innerTemplate = this.innerTemplate,
                useContext = this._useContext,
                DIRECT = plat.events.EventManager.DIRECT;

            this.on(__DrawerControllerFetchEvent + '_' + id,
                (event: plat.events.DispatchEvent, controllerArg: IDrawerHandshakeEvent) => {
                    var control = controllerArg.control;
                    if (isNull(control)) {
                        return;
                    }

                    if (isString(controllerArg.position)) {
                        position = controllerArg.position;
                        this._changeDirection(position);
                    }

                    this._controllers.unshift(control);

                    if (!controllerArg.received) {
                        this.dispatchEvent(__DrawerFoundEvent + '_' + id, DIRECT, {
                            control: this,
                            received: true,
                            position: position,
                            useContext: useContext,
                            template: _utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                            elastic: isElastic
                        });
                    }
                });

            this.dispatchEvent(__DrawerFoundEvent + '_' + id, DIRECT, {
                control: this,
                received: false,
                position: position,
                useContext: useContext,
                template: _utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
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
        protected _checkPreload(): void {
            if (this._preloadedValue) {
                var _utils = this._utils;
                _utils.postpone(() => {
                    var controller = this._controllers[0];
                    if (!_utils.isNull(controller)) {
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
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.BindControl|BindControl} that manipulates and controls a global drawer.
     */
    export class DrawerController extends plat.ui.BindControl {
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
         * @name _utils
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.Utils|Utils} injectable.
         */
        protected _utils: plat.Utils = plat.acquire(__Utils);

        /**
         * @name _compat
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: plat.Compat = plat.acquire(__Compat);

        /**
         * @name _window
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        protected _window: Window = plat.acquire(__Window);

        /**
         * @name _document
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document = plat.acquire(__Document);

        /**
         * @name _animator
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.Animator|Animator} injectable.
         */
        protected _animator: plat.ui.animations.Animator = plat.acquire(__Animator);

        /**
         * @name _Promise
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: plat.async.IPromise = plat.acquire(__Promise);

        /**
         * @name _position
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The position of the global {@link platui.Drawer|Drawer} associated 
         * with this control.
         */
        protected _position: string;

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
        protected _drawerElement: HTMLElement;

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
        protected _drawer: Drawer;

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
        protected _transform: string;

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
        protected _preTransform: string;

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
        protected _lastTouch: plat.ui.IPoint;

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
        protected _hasSwiped = false;

        /**
         * @name _hasTapped
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user has tapped.
         */
        protected _hasTapped = false;

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
        protected _isOpen = false;

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
        protected _isElastic: boolean;

        /**
         * @name _touchState
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * An enum denoting the current touch state of the user.
         */
        protected _touchState = 0;

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
        protected _useContext: boolean;

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
        protected _maxOffset: number;

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
        protected _removeTap: plat.IRemoveListener;

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
        protected _removeSwipeOpen: plat.IRemoveListener;

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
        protected _removePrimaryTrack: plat.IRemoveListener;

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
        protected _removeSecondaryTrack: plat.IRemoveListener;

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
        protected _openTapRemover: plat.IRemoveListener;

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
        protected _openSwipeRemover: plat.IRemoveListener;

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
        protected _openTrackRemover: plat.IRemoveListener;

        /**
         * @name _disposeRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the listener for responding to other {@link platui.DrawerController|DrawerControllers} 
         * being disposed.
         */
        protected _disposeRemover: plat.IRemoveListener = () => { };

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
        protected _rootElement: HTMLElement;

        /**
         * @name _clickEater
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * An HTMLElement to eat clicks when the {@link platui.Drawer|Drawer} is open.
         */
        protected _clickEater: HTMLElement;

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
        protected _type: string;

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
        protected _templateUrl: string;

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
        protected _directionalTransitionPrep: string;

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
        protected _loaded = false;

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
        protected _preloadedValue = false;

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
        protected _isTap: boolean;

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
        protected _isSwipe: boolean;

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
        protected _isTrack: boolean;

        /**
         * @name _toggleDelay
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function to remove the toggle delay if present.
         */
        protected _toggleDelay: plat.IRemoveListener;

        /**
         * @name _animationThenable
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimationThenable<void>}
         * 
         * @description
         * The most recent animation thenable. Used to cancel the current animation if another needs 
         * to begin.
         */
        protected _animationThenable: plat.ui.animations.IAnimationThenable<void>;

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
            var optionObj = this.options || <plat.observable.IObservableProperty<IDrawerControllerOptions>>{},
                options = optionObj.value || <IDrawerControllerOptions>{},
                position = options.position,
                id = options.id || '';

            this._type = options.type || 'tap track';
            this._isElastic = options.elastic;
            this._useContext = options.useContext;
            this._templateUrl = options.templateUrl;
            this._initializeEvents(id, position);
        }

        /**
         * @name dispose
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Remove the transition classes off the root element and reset the position and 
         * zIndex properties if modified and only if this is the last {@link platui.DrawerController|DrawerController}  
         * referencing this {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        dispose(): void {
            var _utils = this._utils,
                drawer = this._drawer;
            if (_utils.isNull(drawer)) {
                return;
            }

            drawer.spliceController(this);
            if (drawer.controllerCount() > 0) {
                return;
            }

            var storedStyle = drawer.storedProperties,
                rootElement = this._rootElement,
                disposeRootElement = true;

            this._disposeRemover();
            this.on(__DrawerControllerDisposingFound, (ev: plat.events.DispatchEvent, otherRoot: HTMLElement) => {
                if (!disposeRootElement) {
                    return;
                }

                disposeRootElement = rootElement !== otherRoot;
            });

            _utils.defer(() => {
                if (!disposeRootElement) {
                    return;
                }

                this.dom.removeClass(rootElement, __Drawer + '-open plat-drawer-transition-prep ' + this._directionalTransitionPrep);

                if (_utils.isObject(storedStyle)) {
                    var rootElementStyle = rootElement.style,
                        parent = rootElement.parentElement;

                    rootElementStyle.position = storedStyle.position;
                    rootElementStyle.zIndex = storedStyle.zIndex;
                    if (_utils.isNode(parent)) {
                        parent.style.overflow = storedStyle.parentOverflow;
                    }
                }
            }, 25);

            this.dispatchEvent(__DrawerControllerDisposing, plat.events.EventManager.DIRECT);
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        open(): plat.async.IThenable<void> {
            var wasClosed = !this._isOpen,
                _utils = this._utils;

            if (_utils.isFunction(this._toggleDelay)) {
                this._toggleDelay();
            }

            var promise = new this._Promise<void>((resolve) => {
                this._toggleDelay = _utils.requestAnimationFrame(() => {
                    this._touchState = 0;
                    this._toggleDelay = null;
                    this._open().then(resolve);
                });
            });

            if (wasClosed) {
                if (this._useContext) {
                    this.inputChanged(true);
                } else if (!_utils.isNull(this._drawer)) {
                    this._drawer.inputChanged(true);
                }
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        close(): plat.async.IThenable<void> {
            var wasOpen = this._isOpen,
                _utils = this._utils;

            if (_utils.isFunction(this._toggleDelay)) {
                this._toggleDelay();
            }

            var promise = new this._Promise<void>((resolve) => {
                this._toggleDelay = _utils.requestAnimationFrame(() => {
                    this._touchState = 0;
                    this._toggleDelay = null;
                    this._close().then(resolve);
                });
            });

            if (wasOpen) {
                if (this._useContext) {
                    this.inputChanged(false);
                } else if (!_utils.isNull(this._drawer)) {
                    this._drawer.inputChanged(false);
                }
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is toggled and the animation is complete.
         */
        toggle(): plat.async.IThenable<void> {
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is reset and the animation is complete.
         */
        reset(): plat.async.IThenable<void> {
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
            }).catch((error) => {
                var _Exception = this._Exception;
                _Exception.warn('Error binding template for ' + this.type + ': ' + error, _Exception.BIND);
            });
        }

        /**
         * @name observeProperties
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function that allows this control to observe both the bound property itself as well as 
         * potential child properties if being bound to an object.
         * 
         * @param {(listener: plat.ui.IBoundPropertyChangedListener, identifier: string) => void} observe 
         * A function that allows bound properties to be observed with defined listeners.
         * @param {string} identifier The identifier off of the bound object to listen to for changes.
         * 
         * @returns {void}
         */
        observeProperties(observe: (listener: (newValue: any, oldValue: any, identifier: string, firstTime?: boolean) => void,
            identifier?: string) => void): void {
            observe(this._setBoundProperty);
        }

        /**
         * @name _setBoundProperty
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {boolean} drawerState The new value of the control's state.
         * 
         * @returns {void}
         */
        protected _setBoundProperty(drawerState: boolean): void {
            if (!this.loaded) {
                this._preloadedValue = drawerState;
                return;
            }

            var _utils = this._utils;
            if (_utils.isBoolean(drawerState)) {
                if (drawerState) {
                    if (this._isOpen) {
                        return;
                    }
                    this._toggleDelay = _utils.requestAnimationFrame(() => {
                        this._touchState = 0;
                        this._toggleDelay = null;
                        this._open();
                    });
                    return;
                }

                if (this._isOpen) {
                    this._toggleDelay = _utils.requestAnimationFrame(() => {
                        this._touchState = 0;
                        this._toggleDelay = null;
                        this._close();
                    });
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        protected _open(): plat.async.IThenable<void> {
            var rootElement = this._rootElement,
                drawerElement = this._drawerElement,
                _utils = this._utils,
                isNode = _utils.isNode,
                wasClosed = !this._isOpen;

            if (!(isNode(rootElement) && isNode(drawerElement))) {
                return this._Promise.resolve(null);
            }

            var translation: string;
            switch (this._position) {
                case 'left':
                    translation = 'translate3d(' + this._maxOffset + 'px,0,0)';
                    break;
                case 'right':
                    translation = 'translate3d(' + (-this._maxOffset) + 'px,0,0)';
                    break;
                case 'top':
                    translation = 'translate3d(0,' + this._maxOffset + 'px,0)';
                    break;
                case 'bottom':
                    translation = 'translate3d(0,' + (-this._maxOffset) + 'px,0)';
                    break;
                default:
                    return <any>this._animator.resolve();
            }

            this._isOpen = true;

            drawerElement.removeAttribute(__Hide);

            if (wasClosed) {
                this.dom.addClass(rootElement, __Drawer + '-open ' + this._directionalTransitionPrep);
                this._addEventIntercepts();
            } else {
                this.dom.addClass(rootElement, this._directionalTransitionPrep);
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = translation;
            return this._animationThenable = this._animator.animate(rootElement, __Transition, {
                properties: animationOptions
            }).then(() => {
                this._animationThenable = null;
            });
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
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        protected _close(): plat.async.IThenable<void> {
            var rootElement = this._rootElement,
                drawerElement = this._drawerElement,
                dom = this.dom,
                _utils = this._utils,
                isNode = _utils.isNode;

            if (this._isOpen) {
                this._removeEventIntercepts();
                dom.removeClass(rootElement, __Drawer + '-open');
            }

            this._isOpen = false;

            if (!(isNode(rootElement) && isNode(drawerElement))) {
                return this._Promise.resolve(null);
            }

            var animationOptions: plat.IObject<string> = {},
                transform = <any>this._transform;

            animationOptions[transform] = this._preTransform;
            return this._animationThenable = this._animator.animate(rootElement, __Transition, {
                properties: animationOptions
            }).then(() => {
                this._animationThenable = null;
                if (this._isOpen) {
                    return;
                }

                drawerElement.setAttribute(__Hide, '');
                dom.removeClass(rootElement, this._directionalTransitionPrep);
            });
        }

        /**
         * @name _addEventIntercepts
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds a click eater and all event listeners to the click eater when tracking 
         * and closing an open {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        protected _addEventIntercepts(): void {
            var clickEater = this._clickEater,
                style = clickEater.style,
                rootElement = this._rootElement;

            // align clickEater to fill the rootElement
            style.top = rootElement.scrollTop + 'px';
            style.left = rootElement.scrollLeft + 'px';
            rootElement.insertBefore(clickEater, null);

            if (this._isTap) {
                this._addTapClose();
            }

            if (this._isSwipe) {
                this._addSwipeClose();
            }

            if (this._isTrack) {
                var touchStartRemover = this.addEventListener(clickEater, __$touchstart, this._touchStart, false),
                    trackRemover = this.addEventListener(clickEater, __$track, this._track, false),
                    touchEnd = this._touchEnd,
                    trackEndRemover = this.addEventListener(clickEater, __$trackend, touchEnd, false),
                    touchEndRemover = this.addEventListener(clickEater, __$touchend, touchEnd, false);

                this._openTrackRemover = () => {
                    touchStartRemover();
                    trackRemover();
                    trackEndRemover();
                    touchEndRemover();
                };
            }
        }

        /**
         * @name _removeEventIntercepts
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Removes the click eater and all event intercepts on the click eater when closing an open {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        protected _removeEventIntercepts(): void {
            this._rootElement.removeChild(this._clickEater);

            var isFunction = this._utils.isFunction;
            if (this._isTap && isFunction(this._openTapRemover)) {
                this._openTapRemover();
                this._openTapRemover = null;
            }

            if (this._isTrack && isFunction(this._openTrackRemover)) {
                this._openTrackRemover();
                this._openTrackRemover = null;
            }

            if (this._isSwipe && isFunction(this._openSwipeRemover)) {
                this._openSwipeRemover();
                this._openSwipeRemover = null;
            }
        }

        /**
         * @name _addSwipeOpen
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds swipe events to the controller element.
         * 
         * @returns {void}
         */
        protected _addSwipeOpen(): void {
            this._removeSwipeOpen = this.addEventListener(this.element, __$swipe + __transitionNegate[this._position], () => {
                this._hasSwiped = true;
                this.open();
            }, false);
        }

        /**
         * @name _addSwipeClose
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds swipe close event to the root element.
         * 
         * @returns {void}
         */
        protected _addSwipeClose(): void {
            this._openSwipeRemover = this.addEventListener(this._clickEater, __$swipe + this._position, () => {
                this._hasSwiped = true;
                this.close();
            }, false);
        }

        /**
         * @name _addTapOpen
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds tap close event to the controller element.
         * 
         * @returns {void}
         */
        protected _addTapOpen(): void {
            this._removeTap = this.addEventListener(this.element, __$tap, () => {
                this._hasTapped = true;
                this.open();
            }, false);
        }

        /**
         * @name _addTapClose
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds tap close event to the root element.
         * 
         * @returns {void}
         */
        protected _addTapClose(): void {
            this._openTapRemover = this.addEventListener(this._clickEater, __$tap, () => {
                this._hasTapped = true;
                this.close();
            }, false);
        }

        /**
         * @name _addEventListeners
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds primary and secondary tracking events to the {@link platui.DrawerController|DrawerController} element.
         * 
         * @param {string} position The position of the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        protected _addEventListeners(position: string): void {
            var element = this.element,
                isNull = this._utils.isNull,
                types = this._type.split(' ');

            this._position = position;

            // remove event listeners here first if we want to later be able to dynamically change position of drawer.
            // this._removeEventListeners();

            this.addEventListener(this._window, 'resize', this._setOffset, false);

            if (this._isTap = (types.indexOf('tap') !== -1)) {
                this._addTapOpen();
            }

            if (this._isSwipe = (types.indexOf('swipe') !== -1)) {
                this._addSwipeOpen();
            }

            if (this._isTrack = (types.indexOf('track') !== -1)) {
                var trackFn = this._track,
                    trackDirection: string;

                switch (position) {
                    case 'left':
                    case 'right':
                        trackDirection = position;
                        break;
                    case 'top':
                        trackDirection = 'up';
                        break;
                    case 'bottom':
                        trackDirection = 'down';
                        break;
                    default:
                        var _Exception = this._Exception;
                        _Exception.warn('Incorrect position: "' + position +
                            '" defined for the a control such as "' +
                            __Drawer + '", or "' + this.type + '."', _Exception.CONTROL);
                        return;
                }

                this._removePrimaryTrack = this.addEventListener(element, __$track + __transitionNegate[trackDirection], trackFn, false);
                this._removeSecondaryTrack = this.addEventListener(element, __$track + trackDirection, trackFn, false);

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
        protected _removeEventListeners(): void {
            var isFunction = this._utils.isFunction;

            if (this._isTap && isFunction(this._removeTap)) {
                this._removeTap();
                this._removeTap = null;
            }

            if (this._isTrack) {
                if (isFunction(this._removePrimaryTrack)) {
                    this._removePrimaryTrack();
                    this._removePrimaryTrack = null;
                }

                if (isFunction(this._removeSecondaryTrack)) {
                    this._removeSecondaryTrack();
                    this._removeSecondaryTrack = null;
                }
            }

            if (this._isSwipe && isFunction(this._removeSwipeOpen)) {
                this._removeSwipeOpen();
                this._removeSwipeOpen = null;
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
        protected _touchStart(ev: plat.ui.IGestureEvent): void {
            if (this._touchState === 1) {
                return;
            }

            if (!this._utils.isNull(this._animationThenable)) {
                this._animationThenable.cancel().then(() => {
                    this._animationThenable = null;
                    this._initTouch(ev);
                });
            }

            this._initTouch(ev);
        }

        /**
         * @name _initTouch
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Indicates touch is in progress and sets the initial touch point 
         * when the user touches the {@link platui.DrawerController|DrawerController}.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        protected _initTouch(ev: plat.ui.IGestureEvent): void {
            this._touchState = 1;

            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };

            if (this._isOpen) {
                return;
            }

            this._drawerElement.removeAttribute(__Hide);
            this.dom.addClass(this._rootElement, this._directionalTransitionPrep);
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
        protected _touchEnd(ev: plat.ui.IGestureEvent): void {
            var noTouch = this._touchState !== 1,
                hasSwiped = this._hasSwiped,
                hasTapped = this._hasTapped;

            this._hasSwiped = this._hasTapped = false;
            if (hasTapped || noTouch || hasSwiped) {
                this._touchState = 0;
                return;
            }

            this._touchState = 2;

            var distanceMoved: number;
            switch (this._position) {
                case 'left':
                case 'right':
                    distanceMoved = ev.clientX - this._lastTouch.x;
                    break;
                case 'top':
                case 'bottom':
                    distanceMoved = ev.clientY - this._lastTouch.y;
                    break;
                default:
                    return;
            }

            if (this._isRightDirection(distanceMoved)) {
                if (Math.abs(distanceMoved) > Math.ceil(this._maxOffset / 2)) {
                    this.toggle();
                    return;
                }

                this.reset();
            } else if (this._isElastic) {
                if (Math.abs(distanceMoved) > 0) {
                    this.reset();
                }
            } else if (!this._isOpen) {
                this._drawerElement.setAttribute(__Hide, '');
                this.dom.removeClass(this._rootElement, this._directionalTransitionPrep);
            }
        }

        /**
         * @name _track
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions  
         * depending on the defined position.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {void}
         */
        protected _track(ev: plat.ui.IGestureEvent): void {
            if (this._touchState === 0) {
                return;
            }

            this._utils.requestAnimationFrame(() => {
                this._rootElement.style[<any>this._transform] = this._calculateTranslation(ev);
            });
        }

        /**
         * @name _isRightDirection
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Checks to make sure the user has been tracking in the right direction to 
         * toggle.
         * 
         * @param {number} distanceMoved The distance the user's pointer has moved.
         * 
         * @returns {boolean} Whether or not the user was tracking in the right direction.
         */
        protected _isRightDirection(distanceMoved: number): boolean {
            switch (this._position) {
                case 'left':
                case 'top':
                    return this._isOpen ? distanceMoved < 0 : distanceMoved > 0;
                case 'right':
                case 'bottom':
                    return this._isOpen ? distanceMoved > 0 : distanceMoved < 0;
                default:
                    return false;
            }
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
        protected _calculateTranslation(ev: plat.ui.IGestureEvent): string {
            var distanceMoved: number;
            switch (this._position) {
                case 'left':
                    distanceMoved = this._isOpen ?
                        this._checkElasticity(this._maxOffset + ev.clientX - this._lastTouch.x) :
                        this._checkElasticity(ev.clientX - this._lastTouch.x);
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                case 'right':
                    distanceMoved = this._isOpen ?
                        this._checkElasticity(this._maxOffset + this._lastTouch.x - ev.clientX) :
                        this._checkElasticity(this._lastTouch.x - ev.clientX);
                    return 'translate3d(' + (-distanceMoved) + 'px,0,0)';
                case 'top':
                    distanceMoved = this._isOpen ?
                        this._checkElasticity(this._maxOffset + ev.clientY - this._lastTouch.y) :
                        this._checkElasticity(ev.clientY - this._lastTouch.y);
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'bottom':
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
        protected _checkElasticity(distanceMoved: number): number {
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
         * @param {string} position The position of the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        protected _initializeEvents(id: string, position: string): void {
            var eventRemover = this.on(__DrawerFoundEvent + '_' + id,
                (event: plat.events.DispatchEvent, drawerArg: IDrawerHandshakeEvent) => {
                    eventRemover();

                    var _utils = this._utils,
                        isString = _utils.isString,
                        isUndefined = _utils.isUndefined,
                        drawer = (this._drawer = drawerArg.control) || {},
                        drawerElement = this._drawerElement = drawer.element,
                        useContext = this._useContext;

                    if (!isString(position)) {
                        if (isString(drawerArg.position)) {
                            position = drawerArg.position;
                        } else {
                            var _Exception = this._Exception;
                            _Exception.warn('"position" is incorrectly defined for a control such as "' +
                                __Drawer + '" or "' + this.type + '."' +
                                ' Please ensure it is a string.', _Exception.CONTROL);
                            return;
                        }
                    }

                    if (!this._controllerIsValid(position)) {
                        return;
                    }

                    this._setTransform();
                    this._addEventListeners(position.toLowerCase());
                    this._setOffset();

                    if (isUndefined(this._isElastic)) {
                        this._isElastic = drawerArg.elastic === true;
                    }

                    if (!drawerArg.received) {
                        this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                            control: this,
                            received: true,
                            position: position
                        });
                    }

                    if (useContext === false || (isUndefined(useContext) && drawerArg.useContext === true)) {
                        return;
                    }

                    this._useContext = true;
                    this._determineTemplate(drawerArg.template);

                    if (this._preloadedValue) {
                        this._toggleDelay = _utils.requestAnimationFrame(() => {
                            this._touchState = 0;
                            this._toggleDelay = null;
                            this._open();
                        });
                    }
                });

            this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                control: this,
                received: false,
                position: position
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
        protected _determineTemplate(fragment?: Node): void {
            var _utils = this._utils;

            if (_utils.isString(this._templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, this._templateUrl).then((template) => {
                    this.bindTemplate('drawer', template);
                });
            } else if (_utils.isNode(fragment)) {
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
        protected _setTransform(): void {
            var style = this._rootElement.style,
                isUndefined = this._utils.isUndefined;

            if (!isUndefined(this._preTransform = style.transform)) {
                this._transform = 'transform';
                return;
            }

            var vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(this._preTransform = style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            } else if (!isUndefined(this._preTransform = style[<any>(vendorPrefix.upperCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
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
         * @param {string} position The position of the {@link platui.Drawer|Drawer}.
         * 
         * @returns {boolean} Whether or not this control is valid.
         */
        protected _controllerIsValid(position: string): boolean {
            var isNull = this._utils.isNull,
                _Exception: plat.IExceptionStatic;

            if (isNull(this._drawerElement)) {
                _Exception = this._Exception;
                _Exception.warn('Could not find a corresponding control such as "' + __Drawer +
                    '" for this "' + this.type + '."', _Exception.CONTROL);
                return false;
            }

            var rootElement = this._rootElement = this._getRootElement();
            if (isNull(rootElement)) {
                _Exception = this._Exception;
                _Exception.warn('Cannot have a "' + this.type +
                    '" in a hierarchy above the corresponding control such as "' + __Drawer + '."', _Exception.CONTROL);
                return false;
            }

            this._clickEater = this._document.createElement('div');
            this._clickEater.className = 'plat-clickeater';
            this.dom.addClass(rootElement, 'plat-drawer-transition-prep');
            this._directionalTransitionPrep = 'plat-drawer-transition-' + position;

            this._disposeRemover = this.on(__DrawerControllerDisposing, () => {
                this.dispatchEvent(__DrawerControllerDisposingFound, plat.events.EventManager.DIRECT, rootElement);
            });

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
         * @returns {HTMLElement} The root element.
         */
        protected _getRootElement(): HTMLElement {
            var drawer = this._drawer,
                _utils = this._utils;

            if (!_utils.isNull(drawer.storedProperties)) {
                return drawer.storedProperties.parentEl;
            }

            var isNode = _utils.isNode,
                root = this.root,
                element = _utils.isObject(root) && isNode(root.element) ? root.element : this.element,
                drawerEl = this._drawerElement,
                parent: HTMLElement;

            while (isNode(parent = element.parentElement) && !parent.contains(drawerEl)) {
                element = parent;
            }

            var _window = this._window,
                computedStyle = _window.getComputedStyle(element),
                style = element.style,
                position = computedStyle.position,
                zIndex = Number(computedStyle.zIndex),
                rootElementStyle: { position?: string; zIndex?: string; parentEl?: HTMLElement; parentOverflow?: string } = {
                    parentEl: element
                };

            if (position === 'static') {
                rootElementStyle.position = style.position;
                style.position = 'relative';
            }

            if (!_utils.isNumber(zIndex) || zIndex < 1) {
                rootElementStyle.zIndex = style.zIndex;
                style.zIndex = '1';
            }

            if (isNode(parent)) {
                var parentStyle = parent.style;
                rootElementStyle.parentOverflow = parentStyle.overflow;
                parentStyle.overflow = 'hidden';
            }

            drawer.storedProperties = rootElementStyle;

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
            var drawerElement = this._drawerElement;
            drawerElement.removeAttribute(__Hide);

            switch (this._position) {
                case 'left':
                case 'right':
                    this._maxOffset = this._drawerElement.offsetWidth;
                    break;
                case 'top':
                case 'bottom':
                    this._maxOffset = this._drawerElement.offsetHeight;
                    break;
                default:
                    break;
            }

            drawerElement.setAttribute(__Hide, '');
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
         * @name position
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The position of the {@link platui.Drawer|Drawer}. 
         * Defaults to "left".
         * 
         * @remarks
         * - "left"
         * - "right"
         * - "top"
         * - "bottom"
         */
        position?: string;

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
         * A boolean value specifying whether the handshake is being reciprocated.
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
         * @name position
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The position of the {@link platui.Drawer|Drawer}. 
         */
        position?: string;
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
