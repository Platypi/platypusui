module platui {
    /**
     * @name Input
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes and styles 
     * an HTML input[type="text"].
     */
    export class Input extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name $utils
         * @memberof platui.Input
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
         * @name templateString
         * @memberof platui.Input
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-input-container">' +
            '<div class="image"></div>' +
            '<input type="text" plat-keyup="__onKeyup" />' +
            '<div class="action"></div>' +
        '</div>';
        
        /**
         * @name options
         * @memberof platui.Input
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IInputOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IInputOptions>;
        
        /**
         * @name _imageElement
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement for the control's optional image.
         */
        _imageElement: HTMLElement;
        
        /**
         * @name _inputElement
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {HTMLInputElement}
         * 
         * @description
         * The HTMLInputElement for the control's input[type="text"].
         */
        _inputElement: HTMLInputElement;
        
        /**
         * @name _actionElement
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement for the control's action.
         */
        _actionElement: HTMLElement;
        
        /**
         * @name __action
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The control's action (e.g. - "email").
         */
        private __action: string;
        /**
         * @name __actionChar
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The control's action character (e.g. - an "x" to delete 
         * input text).
         */
        private __actionChar: string;
        /**
         * @name __actionRegex
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {RegExp}
         * 
         * @description
         * The control's action regular expression used for validation.
         */
        private __actionRegex: RegExp;
        /**
         * @name __actionHandler
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {EventListener}
         * 
         * @description
         * A function to handle the action event.
         */
        private __actionHandler: EventListener;
        
        /**
         * @name setClasses
         * @memberof platui.Input
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
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Input);
            dom.addClass(element, className);
        }
        
        /**
         * @name initialize
         * @memberof platui.Input
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
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Set all HTMLElement references.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var image = this._imageElement = <HTMLElement>this.element.firstElementChild.firstElementChild,
                input = this._inputElement = <HTMLInputElement>image.nextElementSibling;

            this._actionElement = <HTMLElement>input.nextElementSibling;
        }
        
        /**
         * @name loaded
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Set the type and initialize the action.
         * 
         * @returns {void}
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IInputOptions>>{},
                options = optionObj.value || <IInputOptions>{},
                dom = this.dom,
                element = this.element,
                type = options.type || 'primary',
                action = this.__action = options.action || 'normal';

            dom.addClass(element, type);
            dom.addClass(element, action);
            this.__initializeAction();
        }
        
        /**
         * @name validate
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * A function to validate the user's input. For action="email" it returns 
         * true if the email can be a valid email address. For all other 
         * actions it returns true if the input is not empty.
         * 
         * @returns {boolean} Whether or not the user's input is valid.
         */
        validate(): boolean {
            var value = this._inputElement.value;
            if (this.$utils.isEmpty(value)) {
                return false;
            }

            switch (this.__action) {
                case 'email':
                    return this.__validateEmail(value);
                default:
                    return true;
            }
        }
        
        /**
         * @name clear
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Clears the user's input.
         * 
         * @returns {void}
         */
        clear(): void {
            var inputElement = this._inputElement;
            inputElement.value = '';
            this._actionElement.textContent = this.__actionChar = '';
        }
        
        /**
         * @name focus
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Focuses the input[type="text"].
         * 
         * @returns {void}
         */
        focus(): void {
            this._inputElement.focus();
        }
        
        /**
         * @name blur
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Blurs the input[type="text"].
         * 
         * @returns {void}
         */
        blur(): void {
            this._inputElement.blur();
        }
        
        /**
         * @name __initializeAction
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * Initializes the action.
         * 
         * @returns {void}
         */
        private __initializeAction(): void {
            switch (this.__action) {
                case 'email':
                    this.__actionHandler = this.__handleEmail;
                    this.__actionRegex = new RegExp('^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|' +
                        '(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|' +
                        '(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
                    break;
                default:
                    this.__actionHandler = this.__erase;
                    break;
            }

            var actionElement = this._actionElement;
            actionElement.textContent = this.__actionChar = '';
            this.addEventListener(actionElement, __$tap, this.__actionHandler);
        }
        
        /**
         * @name __erase
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * Clears the user's input and focuses the input element.
         * 
         * @returns {void}
         */
        private __erase(): void {
            this.clear();
            this.focus();
        }
        
        /**
         * @name __handleEmail
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * The action handler for the "email" action.
         * 
         * @returns {void}
         */
        private __handleEmail(): void {
            var inputElement = this._inputElement,
                value = inputElement.value,
                char = this.__actionChar;

            if (char === 'x') {
                inputElement.value = '';
            } else {
                inputElement.value += this.__actionChar;
            }

            this.__checkEmail();
            this.propertyChanged(inputElement.value, value);
            inputElement.focus();
        }
        
        /**
         * @name __checkEmail
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * Checks the current state of the "email" action and handles accordingly.
         * 
         * @returns {void}
         */
        private __checkEmail(): void {
            var value = this._inputElement.value;
            switch (this.__actionChar) {
                case '@':
                    if (value.indexOf('@') !== -1) {
                        if (value.indexOf('.com') !== -1) {
                            this._actionElement.textContent = this.__actionChar = 'x';
                            break;
                        }
                        this._actionElement.textContent = this.__actionChar = '.com';
                    }
                    break;
                case '.com':
                    if (value.indexOf('@') === -1) {
                        this._actionElement.textContent = this.__actionChar = '@';
                    } else if (value.indexOf('.com') !== -1) {
                        this._actionElement.textContent = this.__actionChar = 'x';
                    }
                    break;
                case 'x':
                    if (value === '') {
                        this._actionElement.textContent = this.__actionChar = '';
                    } else if (value.indexOf('@') === -1) {
                        this._actionElement.textContent = this.__actionChar = '@';
                    } else if (value.indexOf('.com') === -1) {
                        this._actionElement.textContent = this.__actionChar = '.com';
                    }
                    break;
                default:
                    if (value.indexOf('@') === -1) {
                        this._actionElement.textContent = this.__actionChar = '@';
                    }
                    break;
            }
        }
        
        /**
         * @name __validateEmail
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * The validate function for the "email" action.
         * 
         * @returns {void}
         */
        private __validateEmail(email: string): boolean {
            return this.__actionRegex.test(email);
        }
        
        /**
         * @name __checkText
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * Checks the current state of the default action and handles accordingly.
         * 
         * @returns {void}
         */
        private __checkText(): void {
            if (this.__actionChar === 'x') {
                if (this._inputElement.value === '') {
                    this._actionElement.textContent = this.__actionChar = '';
                }
            } else {
                if (this._inputElement.value !== '') {
                    this._actionElement.textContent = this.__actionChar = 'x';
                }
            }
        }
        
        /**
         * @name __onKeyup
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * The event handler upon user text input.
         * 
         * @param {KeyboardEvent} ev The "keyup" event object.
         * 
         * @returns {void}
         */
        private __onKeyup(ev: KeyboardEvent): void {
            switch (this.__action) {
                case 'email':
                    this.__checkEmail();
                    break;
                default:
                    this.__checkText();
                    break;
            }
        }
    }

    plat.register.control(__Input, Input);
    
    /**
     * @name IInputOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Input|Input} control.
     */
    export interface IInputOptions {
        /**
         * @name type
         * @memberof platui.IInputOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of {@link platui.Input|Input} (e.g. - "primary", "secondary", etc).
         */
        type?: string;
        
        /**
         * @name action
         * @memberof platui.IInputOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The action of the {@link platui.Input|Input} control (e.g. - "email").
         */
        action?: string;
    }
}
