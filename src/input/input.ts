/// <reference path="../references.d.ts" />

module platui {
    /**
     * @name Input
     * @memberof platui
     * @kind class
     *
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl, platui.IFormControl}
     *
     * @description
     * An {@link plat.ui.BindControl|BindControl} that standardizes and styles
     * an HTML input element of various types.
     */
    export class Input extends plat.ui.BindControl implements IUiControl, IFormControl {
        protected static _inject: any = {
            _compat: __Compat,
            _regex: __Regex
        };

        /**
         * @name element
         * @memberof platui.Input
         * @kind property
         * @access public
         *
         * @type {HTMLInputElement}
         *
         * @description
         * The {@link platui.Input|Input Control}'s element type.
         */
        element: HTMLInputElement;

        /**
         * @name replaceWith
         * @memberof platui.Input
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Replaces the control's element with an HTMLInputElement.
         */
        replaceWith: string = 'input';

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
         * @name value
         * @memberof platui.Input
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The current value.
         */
        value: string = '';

        /**
         * @name _compat
         * @memberof platui.Input
         * @kind property
         * @access protected
         *
         * @type {plat.Compat}
         *
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: plat.Compat;

        /**
         * @name _regex
         * @memberof platui.Input
         * @kind property
         * @access protected
         *
         * @type {plat.expressions.IRegex}
         *
         * @description
         * Reference to the {@link plat.expressions.Regex|Regex} injectable.
         */
        protected _regex: plat.expressions.Regex;

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
        protected _type: string;

        /**
         * @name _pattern
         * @memberof platui.Input
         * @kind property
         * @access protected
         *
         * @type {RegExp}
         *
         * @description
         * A regular expression string to regulate what text is allowed to be entered on input.
         */
        protected _pattern: RegExp;

        /**
         * @name _validation
         * @memberof platui.Input
         * @kind property
         * @access protected
         *
         * @type {RegExp}
         *
         * @description
         * A regular expression string used to validate input upon calling the "validate" function.
         */
        protected _validation: RegExp;

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
            this.dom.addClass(element || this.element, `${__Input} ${(className || '')}`);
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
            this.dom.clearNode(this.element);
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
            let optionObj = this.options || <plat.observable.IObservableProperty<IInputOptions>>{},
                options = optionObj.value || <IInputOptions>{},
                pattern = options.pattern,
                validation = options.validation,
                isString = this.utils.isString;

            this._type = this.attributes['type'] || options.type || 'text';

            if (isString(pattern) && pattern !== '') {
                if (pattern[0] === '/' && pattern[pattern.length - 1] === '/') {
                    pattern = pattern.slice(1, -1);
                }

                this._pattern = new RegExp(pattern);
            }

            if (isString(validation) && validation !== '') {
                if (validation[0] === '/' && validation[validation.length - 1] === '/') {
                    validation = validation.slice(1, -1);
                }

                this._validation = new RegExp(validation);
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
            return this._validation.test(this.element.value);
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
            let element = this.element,
                value = element.value;

            if (value === '') {
                return;
            }

            element.value = this.value = '';
            this.inputChanged(this.value, value);
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
            this.element.focus();
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
            this.element.blur();
        }

        /**
         * @name observeProperties
         * @memberof platui.Input
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
            binder.observeProperty(this._setBoundProperty, null, true);
        }

        /**
         * @name _setBoundProperty
         * @memberof platui.Input
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the bindable text is set externally.
         *
         * @param {string} newValue The new value of the bindable text.
         * @param {string} oldValue The old value of the bindable text.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         *
         * @returns {void}
         */
        protected _setBoundProperty(newValue: string, oldValue: string, identifier: void, firstTime?: boolean): void {
            let value = this.element.value;
            if (this.utils.isNull(newValue)) {
                newValue = '';

                if (firstTime === true) {
                    if (this.utils.isNull(value)) {
                        this._onInputChanged(newValue);
                    }
                    return;
                }
            } else if (newValue === value) {
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
        protected _initializeType(): void {
            let inputType = this._type;

            switch (inputType) {
                case 'text':
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._validation = this._validation || this._pattern;
                    break;
                case 'email':
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._validation = this._validation || this._regex.validateEmail;
                    break;
                case 'password':
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._validation = this._validation || this._pattern;
                    break;
                case 'telephone':
                    inputType = 'tel';
                case 'tel':
                    this._pattern = this._pattern || this._regex.validateTelephone;
                    this._validation = this._validation || this._pattern;
                    break;
                case 'number':
                    this._pattern = this._pattern || /^[0-9\.,]*$/;
                    this._validation = this._validation || this._pattern;
                    inputType = 'tel';
                    break;
                case 'hidden':
                    this.element.setAttribute(__Hide, '');
                    return;
                case 'radio':
                    this._log.debug(`${inputType} is not supported by ${this.type}. Please use a ${__Radio} instead.`);
                    return;
                case 'checkbox':
                    this._log.debug(`${inputType} is not supported by ${this.type}. Please use a ${__Checkbox} instead.`);
                    return;
                case 'range':
                    this._log.debug(`${inputType} is not supported by ${this.type}. Please use a ${__Slider} instead.`);
                    return;
                case 'file':
                    this._log.debug(`${inputType} is not supported by ${this.type}. Please use a ${__File} instead.`);
                    return;
                default:
                    this._log.debug(`${inputType} is not yet fully supported by ${this.type}. Defaulting to type="text".`);
                    inputType = 'text';
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._validation = this._validation || this._pattern;
                    break;
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
        protected _addTextEventListener(): void {
            let input = this.element,
                compat = this._compat,
                utils = this.utils,
                composing = false,
                timeout: plat.IRemoveListener,
                eventListener = (): void => {
                    if (composing) {
                        return;
                    }

                    this._onInput();
                },
                postponedEventListener = (): void => {
                    if (utils.isFunction(timeout)) {
                        return;
                    }

                    timeout = utils.postpone((): void => {
                        eventListener();
                        timeout = null;
                    });
                };

            if (utils.isUndefined(compat.ANDROID)) {
                this.addEventListener(input, 'compositionstart', (): boolean => (composing = true), false);
                this.addEventListener(input, 'compositionend', (): void => {
                    composing = false;
                    eventListener();
                }, false);
            }

            if (compat.hasEvent('input')) {
                this.addEventListener(input, 'input', eventListener, false);
            } else {
                this.addEventListener(input, 'keydown', (ev: KeyboardEvent): void => {
                    let key = ev.keyCode;

                    if (key === 91 ||
                        key === 92 ||
                        (key > 15 && key < 28) ||
                        (key > 32 && key < 41)) {
                        return;
                    }

                    let pattern = this._pattern,
                        char = ev.char;

                    if (!(pattern.test(char) && pattern.test(input.value + char))) {
                        ev.preventDefault();
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
        protected _onInput(): void {
            let element = this.element,
                value = element.value,
                strippedValue = this._stripInput(element.value);

            if (value !== strippedValue) {
                value = element.value = strippedValue;
            }

            if (value === this.value) {
                return;
            }

            this.value = element.value;
            this.inputChanged(this.value);
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
        protected _onInputChanged(newValue: string): void {
            let element = this.element;

            newValue = this._stripInput(newValue);
            element.value = newValue;
            this.value = element.value;
        }

        /**
         * @name _stripInput
         * @memberof platui.Input
         * @kind function
         * @access protected
         *
         * @description
         * Parses the input and strips it of characters that don't fit its pattern.
         *
         * @param {string} value The current value to parse.
         *
         * @returns {string} The final value after its been stripped by the pattern.
         */
        protected _stripInput(value:  string): string {
            let newValue = '',
                revert = newValue,
                char: string,
                pattern = this._pattern,
                length = value.length;

            for (let i = 0; i < length; ++i) {
                char = value[i];
                if (pattern.test(char)) {
                    newValue += char;
                    if (pattern.test(newValue)) {
                        revert = newValue;
                    } else {
                        newValue = revert;
                    }
                }
            }

            return newValue;
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
         * The type of the {@link platui.Input|Input} control.
         * The default value is "text".
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
         * A regular expression string to regulate what text is allowed to be entered during input.
         */
        pattern?: string;

        /**
         * @name validation
         * @memberof platui.IInputOptions
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * A regular expression string used to validate input upon calling the "validate" function.
         */
        validation?: string;
    }
}
