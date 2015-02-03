module platui {
    /**
     * @name Modal
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} for showing a templated and animated overlay.
     */
    export class Modal extends plat.ui.BindablePropertyControl implements IUIControl {
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
        protected _utils: plat.Utils = plat.acquire(__Utils);

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
        protected _compat: plat.Compat = plat.acquire(__Compat);

        /**
         * @name _modalElement
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTML element representing the content of the modal.
         */
        protected _modalElement: HTMLElement;

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
         * @name _loaded
         * @memberof platui.Modal
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
         * @memberof platui.Modal
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

                modalContainer = this._modalElement = <HTMLElement>fragment.firstChild;
                while (childNodes.length > 0) {
                    modalContainer.appendChild(childNodes.shift());
                }

                element.appendChild(fragment);
                return;
            }

            modalContainer = this._modalElement = <HTMLElement>this.element.firstElementChild;

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
                transition = options.transition;

            // in case of cloning
            this._modalElement = this._modalElement || <HTMLElement>this.element.firstElementChild;
            this._loaded = true;

            if (!this._utils.isString(transition) || transition === 'none') {
                this.dom.addClass(this._modalElement, __Plat + 'no-transition');
                if (this._preloadedValue) {
                    this._utils.postpone(() => {
                        this._show();
                    });
                }
                return;
            } else if (!this._transitionHash[transition]) {
                var _Exception = this._Exception;
                _Exception.warn('Custom transition: "' + transition + '" defined for "' + this.type +
                    '." Please ensure the transition is defined to avoid errors.', _Exception.CONTROL);
            }

            this._transitionEnd = this._compat.animationEvents.$transitionEnd;
            this.dom.addClass(this._modalElement, __Plat + transition + ' ' + __Plat + 'modal-transition');
            if (this._preloadedValue) {
                this._utils.postpone(() => {
                    this._show();
                });
            }
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
                this.propertyChanged(true);
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
                this.propertyChanged(false);
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
         * @name setProperty
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any, oldValue?: any): void {
            if (!this._loaded) {
                this._preloadedValue = newValue;
                return;
            }

            if (this._utils.isBoolean(newValue)) {
                if (newValue) {
                    if (this._isVisible) {
                        return;
                    }
                    this._show();
                    return;
                }

                if (this._isVisible) {
                    this._hide();
                }
            }
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
            this._utils.defer(() => {
                dom.addClass(this._modalElement, __Plat + 'activate');
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

            dom.removeClass(this._modalElement, __Plat + 'activate');
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
                remove = this.addEventListener(element, this._transitionEnd, () => {
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
