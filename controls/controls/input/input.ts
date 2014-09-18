module platui {
    /**
     * @name Input
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl, platui.IFormControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes and styles 
     * an HTML input element of various types.
     */
    export class Input extends plat.ui.BindablePropertyControl implements IUIControl, IFormControl {
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
         * @name $compat
         * @memberof platui.Input
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
            '<input type="text" />' +
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
         * @name __type
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The control's type (e.g. - "email").
         */
        private __type: string;
        /**
         * @name __pattern
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string to regulate what text is allowed to be entered.
         */
        private __pattern: RegExp;
        /**
         * @name __typeChar
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The control's type character (e.g. - an "x" to delete 
         * input text).
         */
        private __typeChar: string;
        /**
         * @name __typeHandler
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {EventListener}
         * 
         * @description
         * A function to handle the type event.
         */
        private __typeHandler: EventListener;
        /**
         * @name __actionHandler
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {() => void}
         * 
         * @description
         * A function to check the current action state and handle accordingly.
         */
        private __actionHandler: () => void;
        /**
         * @name __inTouch
         * @memberof platui.Input
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the user is currently touching the screen.
         */
        private __inTouch = false;
        
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
            this.dom.addClass(element || this.element, __Input + ' ' + (className || ''));
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
            var element = this.element,
                image = this._imageElement = <HTMLElement>element.firstElementChild.firstElementChild,
                input = this._inputElement = <HTMLInputElement>image.nextElementSibling,
                attributes = element.attributes,
                length = attributes.length,
                attrRegex = /plat-(?!control|hide)/,
                attribute: Attr;

            this._actionElement = <HTMLElement>input.nextElementSibling;

            for (var i = 0; i < length; ++i) {
                attribute = attributes[i];
                if (attrRegex.test(attribute.name)) {
                    input.setAttribute(attribute.name, attribute.value);
                }
            }

            var placeholder = this.innerTemplate.textContent.replace(/\r|\n/g, '');
            if (!this.$utils.isEmpty(placeholder)) {
                input.placeholder = placeholder;
            }
        }
        
        /**
         * @name loaded
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Set the style and initialize the action.
         * 
         * @returns {void}
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IInputOptions>>{},
                options = optionObj.value || <IInputOptions>{},
                dom = this.dom,
                element = this.element,
                style = options.style || 'primary',
                type = this.__type = options.type || 'text',
                pattern = options.pattern;

            dom.addClass(element, style);
            dom.addClass(element, type);

            if (this.$utils.isString(pattern)) {
                if (pattern[0] === '/' && pattern[pattern.length - 1] === '/') {
                    pattern = pattern.slice(1, -1);
                }

                this.__pattern = new RegExp(pattern);
            }

            this._initializeType();
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
            return this.__pattern.test(this._inputElement.value);
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
            var value = this._inputElement.value;
            if (value === '') {
                return;
            }

            var actionElement = this._actionElement;
            this.propertyChanged('', value);
            actionElement.textContent = this.__typeChar = '';
            this.dom.addClass(actionElement, 'hide');
        }
        
        /**
         * @name focus
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Focuses the input.
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
         * Blurs the input.
         * 
         * @returns {void}
         */
        blur(): void {
            this._inputElement.blur();
        }

        /**
         * @name value
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Returns the current value of {@link platui.Input|Input} control.
         * 
         * @returns {string} The current value of the {@link platui.Input|Input} control.
         */
        value(): string {
            return this._inputElement.value;
        }
        
        /**
         * @name _initializeType
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes the type.
         * 
         * @returns {void}
         */
        _initializeType(): void {
            var type = this.__type,
                event = __$tap,
                actionElement = this._actionElement;

            switch (type) {
                case 'email':
                    this.__pattern = this.__pattern || new RegExp('^(([^<>()[\\]\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\.,;:\\s@\\"]+)*)|' +
                        '(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|' +
                        '(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
                    this.__actionHandler = this.__checkEmail.bind(this);
                    this.__typeHandler = this.__handleEmail;
                    break;
                case 'password':
                    var hidePassword = this.__handlePasswordHide;
                    this.__pattern = this.__pattern || /[\S\s]*/;
                    this.__actionHandler = this.__checkPassword.bind(this);
                    this.__typeHandler = this.__handlePasswordShow;
                    this.addEventListener(actionElement, __$touchend, hidePassword);
                    this.addEventListener(actionElement, __$trackend, hidePassword);
                    event = __$touchstart;
                    break;
                case 'tel':
                    this.__pattern = this.__pattern || /^\+|[0-9.-\s]+/;
                    this.__actionHandler = this.__checkText.bind(this);
                    this.__typeHandler = this.__erase;
                    break;
                case 'number':
                    this.__pattern = this.__pattern || /[0-9.,]+/;
                    this.__actionHandler = this.__checkText.bind(this);
                    this.__typeHandler = this.__erase;
                    type = 'tel';
                    break;
                default:
                    this.__pattern = this.__pattern || /[\S\s]*/;
                    this.__actionHandler = this.__checkText.bind(this);
                    this.__typeHandler = this.__erase;
                    break;
            }

            this._inputElement.type = type;

            actionElement.textContent = this.__typeChar = '';
            this.dom.addClass(actionElement, 'hide');
            this.addEventListener(actionElement, event, this.__typeHandler);
            this._addTextEventListener();
        }

        /**
         * @name _addTextEventListener
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Adds a text event listener to the input element.
         * 
         * @returns {void}
         */
        _addTextEventListener(): void {
            var input = this._inputElement,
                $compat = this.$compat,
                $utils = this.$utils,
                composing = false,
                timeout: plat.IRemoveListener,
                eventListener = () => {
                    if (composing) {
                        return;
                    }

                    this.__onInput();
                },
                postponedEventListener = () => {
                    if ($utils.isFunction(timeout)) {
                        return;
                    }

                    timeout = $utils.postpone(() => {
                        eventListener();
                        timeout = null;
                    });
                };

            if ($utils.isUndefined($compat.ANDROID)) {
                this.addEventListener(input, 'compositionstart', () => (composing = true), false);
                this.addEventListener(input, 'compositionend', () => {
                    composing = false;
                    eventListener();
                }, false);
            }

            if ($compat.hasEvent('input')) {
                this.addEventListener(input, 'input', eventListener, false);
            } else {
                this.addEventListener(input, 'keydown', (ev: KeyboardEvent) => {
                    var key = ev.keyCode;

                    if (key === 91 ||
                        key === 92 ||
                        (key > 15 && key < 28) ||
                        (key > 32 && key < 41)) {
                        return;
                    }

                    postponedEventListener();
                }, false);
                this.addEventListener(input, 'cut', postponedEventListener, false);
                this.addEventListener(input, 'paste', postponedEventListener, false);
            }

            this.addEventListener(input, 'change', eventListener, false);
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
         * @name __handlePasswordShow
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * The action handler for the "password" type when showing the 
         * password text.
         * 
         * @returns {void}
         */
        private __handlePasswordShow(): void {
            this.__inTouch = true;
            this._inputElement.type = 'text';
        }

        /**
         * @name __handlePasswordHide
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * The action handler for the "password" type when hiding the 
         * password text.
         * 
         * @returns {void}
         */
        private __handlePasswordHide(): void {
            if (!this.__inTouch) {
                return;
            }
            this.__inTouch = false;

            var inputElement = this._inputElement;
            inputElement.type = this.__type;
            inputElement.focus();
        }
        
        /**
         * @name __handleEmail
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * The action handler for the "email" type.
         * 
         * @returns {void}
         */
        private __handleEmail(): void {
            var inputElement = this._inputElement,
                value = inputElement.value,
                char = this.__typeChar;

            this.propertyChanged(char === 'x' ? '' : value + char, value);
            this.__checkEmail();
            inputElement.focus();
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
            var char = this.__typeChar;

            if (char === 'x') {
                if (this._inputElement.value === '') {
                    this.__typeChar = '';
                }
            } else if (this._inputElement.value !== '') {
                this.__typeChar = 'x';
            }

            var newChar = this.__typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    this.dom.addClass(actionElement, 'hide');
                    return;
                }

                this.dom.removeClass(actionElement, 'hide');
            }
        }

        /**
         * @name __checkPassword
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * Checks the current state of the password action and handles accordingly.
         * 
         * @returns {void}
         */
        private __checkPassword(): void {
            var char = this.__typeChar;

            if (char === '?') {
                if (this._inputElement.value === '') {
                    this.__typeChar = '';
                }
            } else if (this._inputElement.value !== '') {
                this.__typeChar = '?';
            }

            var newChar = this.__typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    this.dom.addClass(actionElement, 'hide');
                    return;
                }

                this.dom.removeClass(actionElement, 'hide');
            }
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
            var value = this._inputElement.value,
                char = this.__typeChar;

            switch (char) {
                case '@':
                    if (value.indexOf('@') !== -1) {
                        if (value.indexOf('.com') !== -1) {
                            this.__typeChar = 'x';
                            break;
                        }
                        this.__typeChar = '.com';
                    }
                    break;
                case '.com':
                    if (value.indexOf('@') === -1) {
                        this.__typeChar = '@';
                    } else if (value.indexOf('.com') !== -1) {
                        this.__typeChar = 'x';
                    }
                    break;
                case 'x':
                    if (value === '') {
                        this.__typeChar = '';
                    } else if (value.indexOf('@') === -1) {
                        this.__typeChar = '@';
                    } else if (value.indexOf('.com') === -1) {
                        this.__typeChar = '.com';
                    }
                    break;
                default:
                    if (value.indexOf('@') === -1) {
                        this.__typeChar = '@';
                    }
                    break;
            }

            var newChar = this.__typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    this.dom.addClass(actionElement, 'hide');
                    return;
                }

                this.dom.removeClass(actionElement, 'hide');
            }
        }

        /**
         * @name __onInput
         * @memberof platui.Input
         * @kind function
         * @access private
         * 
         * @description
         * The event handler upon user text input.
         * 
         * @returns {void}
         */
        private __onInput(): void {
            switch (this.__type) {
                case 'tel':
                case 'number':
                    var input = this._inputElement,
                        value = input.value,
                        last = value.length - 1;

                    if (last >= 0 && (!this.__pattern.test(value[last]) ||
                        !(last === 0 || this.__type !== 'tel' || value[last] !== '+'))) {
                        this.propertyChanged(value.slice(0, -1), value);
                    }
                    break;
            }

            this.__actionHandler();
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
         * @name style
         * @memberof platui.IInputOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The style of {@link platui.Input|Input}. 
         * Defaults to "primary".
         * 
         * @remarks
         * - "primary"
         * - "secondary"
         */
        style?: string;
        
        /**
         * @name type
         * @memberof platui.IInputOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of the {@link platui.Input|Input} control. 
         * Defaults to "text".
         * 
         * @remarks
         * - "text"
         * - "password"
         * - "email"
         * - "number"
         * - "tel"
         */
        type?: string;

        /**
         * @name pattern
         * @memberof platui.IInputOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string to regulate what text is allowed to be entered.
         */
        pattern?: string;
    }
}
