module platui {
    /**
     * @name Modal
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} for showing a templated and animated overlay.
     */
    export class Modal extends plat.ui.TemplateControl implements IUIControl {
        /**
         * @name $utils
         * @memberof platui.Modal
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
         * @memberof platui.Modal
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
        templateString = '<div class="plat-modal-container"></div>';
        
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
        _modalElement: HTMLElement;

        /**
         * @name __isVisible
         * @memberof platui.Modal
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the modal is currently visible.
         */
        private __isVisible = false;
        /**
         * @name __transitionEnd
         * @memberof platui.Modal
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The browser's "transitionend" event.
         */
        private __transitionEnd: string;
        /**
         * @name __transitionHash
         * @memberof platui.Modal
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * A hash for validating available transitions.
         */
        private __transitionHash: plat.IObject<boolean> = {
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
            this.dom.addClass(element || this.element, __Modal + ' hide ' + (className || ''));
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
            var optionObj = this.options || <plat.observable.IObservableProperty<IModalOptions>>{},
                options = optionObj.value || <IModalOptions>{};

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
            var modal = this._modalElement = <HTMLElement>this.element.firstElementChild,
                innerTemplate = this.innerTemplate;
            if (this.$utils.isNode(innerTemplate)) {
                modal.appendChild(innerTemplate);
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
            var optionObj = this.options,
                $utils = this.$utils,
                isString = $utils.isString,
                dom = this.dom,
                modalElement = this._modalElement,
                options = $utils.isObject(optionObj) ? optionObj.value : <IModalOptions>{},
                transition = options.transition,
                style = isString(options.style) ? options.style.toLowerCase() : 'full';

            if (!isString(transition) || transition === 'none') {
                dom.addClass(modalElement, style + ' plat-no-transition');
                return;
            } else if ($utils.isNull(this.__transitionHash[transition])) {
                var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Custom transition direction: "' + transition +
                    '" defined for "' + __Modal + '." Please ensure a transition is defined to avoid errors.');
            }

            this.__transitionEnd = this.$compat.animationEvents.$transitionEnd;
            dom.addClass(modalElement, transition + ' plat-modal-transition ' + style);
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
            var dom = this.dom;

            dom.removeClass(this.element, 'hide');
            this.$utils.defer(() => {
                dom.addClass(this._modalElement, 'activate');
            }, 25);

            this.__isVisible = true;
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
            var dom = this.dom;

            dom.removeClass(this._modalElement, 'activate');
            if (this.$utils.isString(this.__transitionEnd)) {
                this._addHideOnTransitionEnd();
            } else {
                dom.addClass(this.element, 'hide');
            }

            this.__isVisible = false;
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
            if (this.__isVisible) {
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
            return this.__isVisible;
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
        _addHideOnTransitionEnd(): void {
            var element = this.element,
                dom = this.dom,
                remove = this.addEventListener(element, this.__transitionEnd, () => {
                    remove();
                    dom.addClass(element, 'hide');
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
        style?: string;

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
         */
        templateUrl?: string;
    }
}
