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
         * @name $regex
         * @memberof platui.Input
         * @kind property
         * @access public
         * 
         * @type {plat.expressions.IRegex}
         * 
         * @description
         * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
         */
        $regex: plat.expressions.IRegex = plat.acquire(__Regex);

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
        '<div class="plat-input-container">\n' +
        '    <div class="plat-input-image"></div>\n' +
        '    <input type="text" />\n' +
        '    <div class="plat-input-action"></div>\n' +
        '</div>\n';

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
         * @name _type
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The control's type (e.g. - "email").
         */
        _type: string;

        /**
         * @name _pattern
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string to regulate what text is allowed to be entered.
         */
        _pattern: RegExp;

        /**
         * @name _typeChar
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The control's type character (e.g. - an "x" to delete 
         * input text).
         */
        _typeChar: string;

        /**
         * @name _typeHandler
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {EventListener}
         * 
         * @description
         * A function to handle the type event.
         */
        _typeHandler: EventListener;

        /**
         * @name _actionHandler
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {() => void}
         * 
         * @description
         * A function to check the current action state and handle accordingly.
         */
        _actionHandler: () => void;

        /**
         * @name _inTouch
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the user is currently touching the screen.
         */
        _inTouch = false;

        /**
         * @name _inAction
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the user is currently in the process of performing the {@link platui.Input|Input's} action.
         */
        _inAction = false;

        /**
         * @name _usingBind
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link plat.controls.Bind|Bind} control is being used.
         */
        _usingBind = false;

        /**
         * @name _loaded
         * @memberof platui.Input
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
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * A value specified prior to the control being loaded.
         */
        _preloadedValue = '';

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
         * Set all HTMLElement references and potential attribute controls.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var element = this.element,
                image = this._imageElement = <HTMLElement>element.firstElementChild.firstElementChild,
                input = this._inputElement = <HTMLInputElement>image.nextElementSibling,
                attributes = element.attributes,
                length = attributes.length,
                hasPlaceholder = false,
                attrRegex = /plat-(?!control|hide|options)/,
                attribute: Attr,
                $utils = this.$utils,
                name: string;

            for (var i = 0; i < length; ++i) {
                attribute = attributes[i];
                name = attribute.name;
                if (attrRegex.test(name)) {
                    if (name === __Bind || name === 'data-' + __Bind) {
                        this._usingBind = true;
                    } else {
                        input.setAttribute(name, attribute.value);
                    }
                } else if (name === 'type') {
                    this._type = attribute.value;
                } else if (name === 'placeholder') {
                    input.placeholder = attribute.value;
                    hasPlaceholder = true;
                }
            }

            if (hasPlaceholder) {
                return;
            }

            var placeholder = this.innerTemplate.textContent.replace(/\r|\n/g, '');
            if (!$utils.isEmpty(placeholder)) {
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
                type = this._type = this._type || options.type || 'text',
                pattern = options.pattern;

            dom.addClass(element, __Plat + style + ' ' + __Plat + type);

            this._actionElement = <HTMLElement>this._inputElement.nextElementSibling;
            if (this.$utils.isString(pattern)) {
                if (pattern[0] === '/' && pattern[pattern.length - 1] === '/') {
                    pattern = pattern.slice(1, -1);
                }

                this._pattern = new RegExp(pattern);
            }

            this._initializeType();
            this._loaded = true;
        }

        /**
         * @name dispose
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Sets loaded back to false to avoid acting on input.
         * 
         * @returns {void}
         */
        dispose(): void {
            this._loaded = false;
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
            return this._pattern.test(this._inputElement.value);
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
            var inputElement = this._inputElement,
                value = inputElement.value;

            if (value === '') {
                return;
            }

            var actionElement = this._actionElement;
            this.propertyChanged((inputElement.value = ''), value);
            actionElement.textContent = this._typeChar = '';
            actionElement.setAttribute(__Hide, '');
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
            if (newValue === oldValue) {
                return;
            }

            if (!this._loaded) {
                this._preloadedValue = newValue;
                return;
            }

            this._onInputChanged(newValue);
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
            var type = this._type,
                event = __$tap,
                actionElement = this._actionElement;

            switch (type) {
                case 'email':
                    this._pattern = this._pattern || this.$regex.validateEmail;
                    this._actionHandler = this._checkEmail.bind(this);
                    this._typeHandler = this._handleEmail;
                    break;
                case 'password':
                    var hidePassword = this._handlePasswordHide;
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._actionHandler = this._checkPassword.bind(this);
                    this._typeHandler = this._handlePasswordShow;
                    this.addEventListener(actionElement, __$touchend, hidePassword);
                    this.addEventListener(actionElement, __$trackend, hidePassword);
                    event = __$touchstart;
                    break;
                case 'tel':
                case 'telephone':
                    this._pattern = this._pattern || this.$regex.validateTelephone;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    break;
                case 'number':
                    this._pattern = this._pattern || /^[0-9\.,]*$/;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    type = 'tel';
                    break;
                default:
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    break;
            }

            this._inputElement.type = type;
            actionElement.textContent = this._typeChar = '';
            actionElement.setAttribute(__Hide, '');
            this._addEventListeners(event);
        }

        /**
         * @name _addEventListeners
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all event listeners to the input and action element.
         * 
         * @param {string} event The primary action element's event.
         * 
         * @returns {void}
         */
        _addEventListeners(event: string): void {
            var actionElement = this._actionElement,
                input = this._inputElement,
                actionEnd = () => (this._inAction = false);

            this.addEventListener(actionElement, event, this._typeHandler, false);
            this.addEventListener(actionElement, __$touchstart, () => (this._inAction = true), false);
            this.addEventListener(actionElement, __$touchend, actionEnd, false);
            this.addEventListener(actionElement, __$trackend, actionEnd, false);
            this.addEventListener(input, 'focus', () => {
                if (input.value === '') {
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }, false);
            this.addEventListener(input, 'blur', (ev: Event) => {
                if (this._inAction) {
                    return;
                }
                actionElement.setAttribute(__Hide, '');
            }, false);

            if (this._usingBind) {
                this._checkInput(this._preloadedValue);
            }

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

                    this._onInput();
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
         * @name _erase
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Clears the user's input and focuses the input element.
         * 
         * @returns {void}
         */
        _erase(): void {
            this.clear();
            this.focus();
        }

        /**
         * @name _handlePasswordShow
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The action handler for the "password" type when showing the 
         * password text.
         * 
         * @returns {void}
         */
        _handlePasswordShow(): void {
            this._inTouch = true;
            this._inputElement.type = 'text';
        }

        /**
         * @name _handlePasswordHide
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The action handler for the "password" type when hiding the 
         * password text.
         * 
         * @returns {void}
         */
        _handlePasswordHide(): void {
            if (!this._inTouch) {
                return;
            }
            this._inTouch = false;

            var inputElement = this._inputElement;
            inputElement.type = this._type;
            inputElement.focus();
        }

        /**
         * @name _handleEmail
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The action handler for the "email" type.
         * 
         * @returns {void}
         */
        _handleEmail(): void {
            var inputElement = this._inputElement,
                value = inputElement.value,
                char = this._typeChar;

            this.propertyChanged((inputElement.value = (char === 'x' ? '' : value + char)), value);
            this._checkEmail();
            inputElement.focus();
        }

        /**
         * @name _checkText
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Checks the current state of the default action and handles accordingly.
         * 
         * @returns {void}
         */
        _checkText(): void {
            var char = this._typeChar;

            if (char === 'x') {
                if (this._inputElement.value === '') {
                    this._typeChar = '';
                }
            } else if (this._inputElement.value !== '') {
                this._typeChar = 'x';
            }

            var newChar = this._typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    actionElement.setAttribute(__Hide, '');
                    return;
                }

                actionElement.removeAttribute(__Hide);
            }
        }

        /**
         * @name _checkPassword
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Checks the current state of the password action and handles accordingly.
         * 
         * @returns {void}
         */
        _checkPassword(): void {
            var char = this._typeChar;

            if (char === '?') {
                if (this._inputElement.value === '') {
                    this._typeChar = '';
                }
            } else if (this._inputElement.value !== '') {
                this._typeChar = '?';
            }

            var newChar = this._typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    actionElement.setAttribute(__Hide, '');
                    return;
                }

                actionElement.removeAttribute(__Hide);
            }
        }

        /**
         * @name _checkEmail
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Checks the current state of the "email" action and handles accordingly.
         * 
         * @returns {void}
         */
        _checkEmail(): void {
            var value = this._inputElement.value,
                char = this._typeChar;

            switch (char) {
                case '@':
                    if (value.indexOf('@') !== -1) {
                        if (value.indexOf('.com') !== -1) {
                            this._typeChar = 'x';
                            break;
                        }
                        this._typeChar = '.com';
                    }
                    break;
                case '.com':
                    if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    } else if (value.indexOf('.com') !== -1) {
                        this._typeChar = 'x';
                    }
                    break;
                case 'x':
                    if (value === '') {
                        this._typeChar = '';
                    } else if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    } else if (value.indexOf('.com') === -1) {
                        this._typeChar = '.com';
                    }
                    break;
                default:
                    if (value === '') {
                        this._typeChar = '';
                    } else if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    }
                    break;
            }

            var newChar = this._typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    actionElement.setAttribute(__Hide, '');
                    return;
                }

                actionElement.removeAttribute(__Hide);
            }
        }

        /**
         * @name _onInput
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The event handler upon user text input.
         * 
         * @returns {void}
         */
        _onInput(): void {
            var inputElement = this._inputElement,
                value = inputElement.value;
            switch (this._type) {
                case 'tel':
                case 'number':
                    var last = value.length - 1;
                    if (last >= 0 && (!this._pattern.test(value[last]) ||
                        !(last === 0 || this._type !== 'tel' || value[last] !== '+'))) {
                        value = inputElement.value = value.slice(0, -1);
                    }
                default:
                    this.propertyChanged(value);
                    break;
            }

            this._actionHandler();
        }

        /**
         * @name _onInputChanged
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The event handler upon bound text being changed.
         * 
         * @param {string} newValue The new value of the bound text.
         * 
         * @returns {void}
         */
        _onInputChanged(newValue: string): void {
            var inputElement = this._inputElement;
            if (newValue === inputElement.value) {
                return;
            }

            switch (this._type) {
                case 'tel':
                case 'number':
                    var last = newValue.length - 1;
                    if (last >= 0 && (!this._pattern.test(newValue[last]) ||
                        !(last === 0 || this._type !== 'tel' || newValue[last] !== '+'))) {
                        newValue = inputElement.value = newValue.slice(0, -1);
                        this.propertyChanged(newValue);
                        break;
                    }
                default:
                    inputElement.value = newValue;
                    break;
            }

            this._actionHandler();
        }

        /**
         * @name _checkInput
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Check the initial input and delete if it does not match the pattern.
         * 
         * @param {string} value The value to check as input to the HTMLInputElement.
         * 
         * @returns {void}
         */
        _checkInput(value: string): void {
            switch (this._type) {
                case 'tel':
                case 'number':
                    if (this._pattern.test(value)) {
                        this._inputElement.value = value;
                    } else {
                        if (this._usingBind) {
                            var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                            Exception.warn(__Input + ' control is bound to a value that does not satisfy ' +
                                'the given pattern and/or type. The bound value will be reset to "".');
                        }
                        this.propertyChanged((this._inputElement.value = ''), value);
                    }
                    break;
                default:
                    this._inputElement.value = value;
                    break;
            }

            this._actionHandler();
            this._actionElement.setAttribute(__Hide, '');
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
         * - "tel"/"telephone"
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
