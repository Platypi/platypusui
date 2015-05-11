/// <reference path="../references.d.ts" />

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
    export class Drawer extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any = {
            _Promise: __Promise
        };

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
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {{ position?: string; zIndex?: string; rootElement?: HTMLElement; parentOverflow?: { key: string; value: string; }; }}
         * 
         * @description
         * An object to hold the stored style and element properties so that we can reference and reset them 
         * when all {@link platui.DrawerController|Drawer Controllers} are disposed.
         */
        storedProperties: {
            position?: string;
            zIndex?: string;
            rootElement?: HTMLElement;
            parentOverflow?: { key: string; value: string; };
        };

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
        protected _Promise: plat.async.IPromise;

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
         * @name _controllers
         * @memberof platui.Drawer
         * @kind property
         * @access public
         * 
         * @type {Array<platui.DrawerController>}
         * 
         * @description
         * References to all the {@link platui.DrawerController|DrawerControllers} used to control this {@link platui.Drawer|Drawer}.
         */
        protected _controllers: Array<DrawerController> = [];

        /**
         * @name _isInitialized
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the this control has been paired with a corresponding {@link platui.Drawer|Drawer}.
         */
        protected _isInitialized: boolean = false;

        /**
         * @name _preInitializedValue
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A bound value that may have come through prior to initialization.
         */
        protected _preInitializedValue: boolean = false;

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
            this.innerTemplate = this.dom.appendChildren(this.element.childNodes);
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
                _utils = this.utils,
                optionObj = this.options || <plat.observable.IObservableProperty<IDrawerOptions>>{},
                options = optionObj.value || <IDrawerOptions>{},
                position = this._currentPosition = options.position || 'left',
                id = options.id || '',
                templateUrl = options.templateUrl,
                isElastic = options.elastic === true;

            element.setAttribute(__Hide, '');
            this.dom.addClass(element, __Plat + position);

            if (_utils.isString(templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, templateUrl).then((template): any => {
                    this.innerTemplate = template;
                    this._initializeEvents(id, position, isElastic);
                });
                return;
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
            if (this.utils.isNull(controller)) {
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
            if (this.utils.isNull(controller)) {
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
            if (this.utils.isNull(controller)) {
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
            if (this.utils.isNull(controller)) {
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
            if (this.utils.isNull(controller)) {
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
         * @returns {plat.async.IThenable<void>} A promise that fulfills when the template has been bound and inserted.
         */
        bindTemplate(name: string, node: Node): plat.async.IThenable<void> {
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            return bindableTemplates.bind(name).then((template): void => {
                var element = this.element;
                this.dom.clearNode(element);
                element.appendChild(template);
            }).catch((error): void => {
                var _Exception = this._Exception;
                _Exception.warn('Error binding template for ' + this.type + ': ' + error, _Exception.BIND);
            });
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
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         *
         * @returns {void}
         */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void {
            binder.observeProperty(this._setBoundProperty);
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
         * @param {boolean} oldValue The old value of the bindable control state.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         * 
         * @returns {void}
         */
        protected _setBoundProperty(drawerState: boolean, oldValue: boolean, identifier: void, firstTime?: boolean): void {
            var _utils = this.utils,
                controller = this._controllers[0];
            if (firstTime === true && _utils.isNull(drawerState)) {
                this.inputChanged(_utils.isNull(controller) ? false : controller.isOpen());
                return;
            }

            if (_utils.isBoolean(drawerState)) {
                if (!this._isInitialized) {
                    this._preInitializedValue = drawerState;
                    return;
                }
                this._preInitializedValue = false;

                if (_utils.isNull(controller)) {
                    return;
                }

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

                return;
            }

            var _Exception = this._Exception;
            _Exception.warn('Attempting to open or close ' + this.type +
                ' with a bound value that is something other than a boolean.', _Exception.BIND);
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
            if (this.utils.isNull(position) || position === this._currentPosition) {
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
            var _utils = this.utils,
                innerTemplate = this.innerTemplate;

            this.on(__DrawerControllerFetchEvent + '_' + id,
                (event: plat.events.DispatchEvent, controllerArg: IDrawerControllerHandshakeEvent): void => {
                    var control = controllerArg.control;

                    if (_utils.isNull(control)) {
                        return;
                    }

                    if (_utils.isString(controllerArg.position)) {
                        position = controllerArg.position;
                        this._changeDirection(position);
                    }

                    this._controllers.unshift(<DrawerController>control);

                    if (!controllerArg.received) {
                        this.dispatchEvent(__DrawerFoundEvent + '_' + id, plat.events.EventManager.DIRECT, <IDrawerHandshakeEvent>{
                            control: this,
                            received: true,
                            position: position,
                            template: _utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                            elastic: isElastic
                        });
                    }

                    this._isInitialized = true;

                    if (!controllerArg.useContext) {
                        this.bindTemplate('drawer', innerTemplate.cloneNode(true)).then((): void => {
                            this._checkPreInit();
                        });
                        return;
                    }

                    this._checkPreInit();
                });

            this.dispatchEvent(__DrawerFoundEvent + '_' + id, plat.events.EventManager.DIRECT, <IDrawerHandshakeEvent>{
                control: this,
                received: false,
                position: position,
                template: _utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                elastic: isElastic
            });
        }

        /**
         * @name _checkPreInit
         * @memberof platui.Drawer
         * @kind function
         * @access protected
         * 
         * @description
         * Checks the pre-initialized value and handles accordingly.
         * 
         * @returns {void}
         */
        protected _checkPreInit(): void {
            if (this._preInitializedValue) {
                var _utils = this.utils;
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
     * @name IHandshakeEvent
     * @memberof platui
     * @kind interface
     * 
     * @description
     * An interface for an event object used during a control-to-control handshake.
     */
    export interface IHandshakeEvent {
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
        received: boolean;
        /**
         * @name control
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {plat.Control}
         * 
         * @description
         * A reference to the corresponding control performing this leg of the handshake.
         */
        control: plat.Control;
    }

    /**
     * @name IDrawerHandshakeEvent
     * @memberof platui
     * @kind interface
     * 
     * @extends {platui.IHandshakeEvent}
     * 
     * @description
     * An interface for the {@link platui.Drawer|Drawer's} event object used during the 
     * {@link platui.Drawer|Drawer} / {@link platui.DrawerController|DrawerController} handshake.
     */
    export interface IDrawerHandshakeEvent extends IHandshakeEvent {
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
        position: string;
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
        template: Node;
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
        elastic: boolean;
    }
}
