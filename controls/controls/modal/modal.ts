/// <reference path="../../references.d.ts" />

module platui {
    /**
     * @name Modal
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.BindControl|BindControl} for showing a templated and animated overlay.
     */
    export class Modal extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any = {
            _utils: __Utils,
            _compat: __Compat
        };

        /**
         * @name templateString
         * @memberof platui.Modal
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString = '<div class="plat-modal-container"></div>\n';

        /**
         * @name options
         * @memberof platui.Modal
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IModalOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IModalOptions>;

        /**
         * @name priority
         * @memberof platui.Modal
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The load priority of the control (needs to load before a {@link plat.controls.Bind|Bind} control).
         */
        priority = 120;

        /**
         * @name _utils
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.Utils|Utils} injectable.
         */
        protected _utils: plat.Utils;

        /**
         * @name _compat
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: plat.Compat;

        /**
         * @name _container
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTML element representing the content of the modal.
         */
        protected _container: HTMLElement;

        /**
         * @name _isVisible
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the modal is currently visible.
         */
        protected _isVisible = false;

        /**
         * @name _transitionEnd
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The browser's "transitionend" event.
         */
        protected _transitionEnd: string;

        /**
         * @name _transitionHash
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * A hash for validating available transitions.
         */
        protected _transitionHash: plat.IObject<boolean> = {
            up: true,
            down: true,
            left: true,
            right: true,
            fade: true
        };

        /**
         * @name setClasses
         * @memberof platui.Modal
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
            this.dom.addClass(element || this.element, __Modal + ' ' + __Hide + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Check for templateUrl and set if needed then hide the control.
         * 
         * @returns {void}
         */
        initialize(): void {
            var optionObj = this.options || (this.options = <plat.observable.IObservableProperty<IModalOptions>>{}),
                options = optionObj.value || (optionObj.value = <IModalOptions>{});

            this.templateUrl = options.templateUrl;
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Add the innerTemplate to the control's element.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var _utils = this._utils,
                modalContainer: HTMLElement;

            if (_utils.isString(this.templateUrl)) {
                var fragment = this.dom.serializeHtml(this.templateString),
                    element = this.element,
                    childNodes: Array<Node> = Array.prototype.slice.call(element.childNodes);

                modalContainer = this._container = <HTMLElement>fragment.firstChild;
                while (childNodes.length > 0) {
                    modalContainer.appendChild(childNodes.shift());
                }

                element.appendChild(fragment);
                return;
            }

            modalContainer = this._container = <HTMLElement>this.element.firstElementChild;

            var innerTemplate = this.innerTemplate;
            if (_utils.isNode(innerTemplate)) {
                modalContainer.appendChild(innerTemplate);
            }
        }

        /**
         * @name loaded
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Check for a transition and initialize it if necessary.
         * 
         * @returns {void}
         */
        loaded(): void {
            var options = this.options.value,
                transition = options.transition,
                _Exception: plat.IExceptionStatic;

            // in case of cloning
            this._container = this._container || <HTMLElement>this.element.firstElementChild;

            if (!this._utils.isString(transition) || transition === 'none') {
                this.dom.addClass(this._container, __Plat + 'no-transition');
                return;
            } else if (!this._transitionHash[transition]) {
                _Exception = this._Exception;
                _Exception.warn('Custom transition: "' + transition + '" defined for "' + this.type +
                    '." Please ensure the transition is defined to avoid errors.', _Exception.CONTROL);
            }

            var animationEvents = this._compat.animationEvents;
            if (this._utils.isNull(animationEvents)) {
                _Exception = this._Exception;
                _Exception.warn('This browser does not support CSS3 animations.', _Exception.COMPAT);
                this.dom.addClass(this._container, __Plat + 'no-transition');
                return;
            }

            this._transitionEnd = animationEvents.$transitionEnd;
            this.dom.addClass(this._container, __Plat + transition + ' ' + __Plat + 'modal-transition');
        }

        /**
         * @name show
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Shows the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        show(): void {
            var wasHidden = !this._isVisible;
            this._show();
            if (wasHidden) {
                this.inputChanged(true);
            }
        }

        /**
         * @name hide
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Hides the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        hide(): void {
            var wasVisible = this.isVisible;
            this._hide();
            if (wasVisible) {
                this.inputChanged(false);
            }
        }

        /**
         * @name toggle
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Toggles the visibility of the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        toggle(): void {
            if (this._isVisible) {
                this.hide();
                return;
            }

            this.show();
        }

        /**
         * @name isVisible
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Whether or not the {@link platui.Modal|Modal} is currently visible.
         * 
         * @returns {boolean} True if the {@link platui.Modal|Modal} is currently open 
         * and visible, false otherwise.
         */
        isVisible(): boolean {
            return this._isVisible;
        }

        /**
         * @name observeProperties
         * @memberof platui.Modal
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         *
         * @param {plat.observable.IImplementTwoWayBinding} implementer The control that facilitates the
         * databinding.
         *
         * @returns {void}
         */
        observeProperties(implementer: plat.observable.IImplementTwoWayBinding): void {
            implementer.observeProperty(this._setBoundProperty);
        }

        /**
         * @name _setBoundProperty
         * @memberof platui.Modal
         * @kind function
         * @access protected
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {boolean} modalState The new value of the control state.
         * @param {boolean} oldValue The old value of the control state.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         * 
         * @returns {void}
         */
        protected _setBoundProperty(modalState: boolean, oldValue: boolean, identifier: void, firstTime?: boolean): void {
            var _utils = this._utils;
            if (firstTime === true && _utils.isNull(modalState)) {
                this.inputChanged(this._isVisible);
                return;
            }

            if (_utils.isBoolean(modalState)) {
                if (modalState) {
                    if (this._isVisible) {
                        return;
                    }
                    this._show();
                    return;
                }

                if (this._isVisible) {
                    this._hide();
                }

                return;
            }

            var _Exception = this._Exception;
            _Exception.warn('Attempting to show or hide a ' + this.type +
                ' with a bound value that is something other than a boolean.', _Exception.BIND);
        }

        /**
         * @name _show
         * @memberof platui.Modal
         * @kind function
         * @access protected
         * 
         * @description
         * Shows the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        protected _show(): void {
            var dom = this.dom;
            dom.removeClass(this.element, __Hide);
            this._utils.defer((): void => {
                dom.addClass(this._container, __Plat + 'activate');
            }, 25);

            this._isVisible = true;
        }

        /**
         * @name _hide
         * @memberof platui.Modal
         * @kind function
         * @access protected
         * 
         * @description
         * Hides the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        protected _hide(): void {
            var dom = this.dom;
            if (this._utils.isString(this._transitionEnd)) {
                this._addHideOnTransitionEnd();
            } else {
                dom.addClass(this.element, __Hide);
            }

            dom.removeClass(this._container, __Plat + 'activate');
            this._isVisible = false;
        }

        /**
         * @name _addHideOnTransitionEnd
         * @memberof platui.Modal
         * @kind function
         * @access protected
         * 
         * @description
         * Listens for the transition to end and hides the element after it is finished.
         * 
         * @returns {void}
         */
        protected _addHideOnTransitionEnd(): void {
            var element = this.element,
                remove = this.addEventListener(element, this._transitionEnd, (): void => {
                    remove();
                    this.dom.addClass(element, __Hide);
                }, false);
        }
    }

    plat.register.control(__Modal, Modal);

    /**
     * @name IModalOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Modal|Modal} control.
     */
    export interface IModalOptions {
        /**
         * @name style
         * @memberof platui.IModalOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The style of {@link platui.Modal|Modal}. 
         * Defaults to "full".
         * 
         * @remarks
         * - "full" - The {@link platui.Modal|Modal} fills the whole screen.
         * - "halfWidth" - The {@link platui.Modal|Modal} fills the whole screen lengthwise and 
         * half the screen in width. When combined as "halfWidth centered" it will place the 
         * control in the middle of the screen horizontally. Otherwise, its position is specified 
         * by the defined LESS variables.
         * - "halfHeight" - The {@link platui.Modal|Modal} fills half the screen lengthwise and 
         * the whole screen in width. When combined as "halfHeight centered" it will place the 
         * control in the middle of the screen vertically. Otherwise, its position is specified 
         * by the defined LESS variables.
         * - "half" - The {@link platui.Modal|Modal} fills half the screen and its position is 
         * specified by the defined LESS variables. The top and left positioning refer to the midpoint 
         * of the {@link platui.Modal|Modal}. When combined as "half centered" the control will be 
         * placed dead center in the middle of the screen.
         * - "custom" - The {@link platui.Modal|Modal's} size and positioning is specified by the 
         * defined LESS variables. When combined as "custom centered" the top and left positioning 
         * refer to the midpoint of the control.
         */
        //style?: string;

        /**
         * @name transition
         * @memberof platui.IModalOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The transition type/direction the {@link platui.Modal|Modal} will enter with. 
         * Defaults to "none".
         * 
         * @remarks
         * - "none"
         * - "left"
         * - "right"
         * - "up"
         * - "down"
         * - "fade"
         */
        transition?: string;

        /**
         * @name templateUrl
         * @memberof platui.IModalOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The url of the {@link platui.Modal|Modal's} intended template if not using 
         * innerHTML.
         * 
         * @remarks
         * This URL must be a static string and cannot be a bound item on a parent control's context.
         */
        templateUrl?: string;
    }
}
