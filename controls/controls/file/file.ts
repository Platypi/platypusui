/// <reference path="../../references.d.ts" />

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
    export class File extends plat.ui.BindControl implements IUiControl, IFormControl {
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
        '<div class="plat-file-container">\n' +
        '    <input type="file" class="plat-file-hidden" />\n' +
        '    <input type="text" class="plat-file-input" />\n' +
        '    <button plat-control="plat-button"></button>\n' +
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
         * @name priority
         * @memberof platui.Input
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
         * @name _hiddenInput
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {HTMLInputElement}
         * 
         * @description
         * The HTMLInputElement for hidden input functionality.
         */
        protected _hiddenInput: HTMLInputElement;

        /**
         * @name _visibleInput
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {HTMLInputElement}
         * 
         * @description
         * A secondary HTMLInputElement for visible control input.
         */
        protected _visibleInput: HTMLInputElement;

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
            this.dom.addClass(element || this.element, __File + ' ' + (className || ''));
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
                input = <HTMLInputElement>element.firstElementChild.firstElementChild.nextElementSibling,
                attributes = this.attributes,
                keys = Object.keys(attributes),
                length = keys.length,
                controlInjectors = plat.dependency.injectors.control,
                hasPlaceholder = false,
                attrRegex = /plat-(?:control|hide|context)|class|style/,
                _utils = this.utils,
                isNull = _utils.isNull,
                delimit = _utils.delimit,
                isString = _utils.isString,
                key: string,
                name: string,
                value: string;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                name = delimit(key, '-');
                value = attributes[key];
                if (!isString(value) || attrRegex.test(name) || !isNull(controlInjectors[name])) {
                    continue;
                } else if (name === 'placeholder') {
                    hasPlaceholder = true;
                    input.placeholder = value;
                } else {
                    input.setAttribute(name, value);
                }
            }

            if (hasPlaceholder || _utils.isNull(this.innerTemplate)) {
                return;
            }

            var placeholder = this.innerTemplate.textContent.replace(/\r|\n/g, '');
            if (!_utils.isEmpty(placeholder)) {
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
                element = this.element;
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
            return !this.utils.isEmpty(this._hiddenInput.value);
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
            return this._hiddenInput.value;
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
            binder.observeProperty(this._setBoundProperty);
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
            //var value = this._inputElement.value;
            //if (this.utils.isNull(newValue)) {
            //    newValue = '';

            //    if (firstTime === true) {
            //        if (this.utils.isNull(value)) {
            //            this._onInputChanged(newValue);
            //        }
            //        return;
            //    }
            //} else if (newValue === value) {
            //    return;
            //}

            //this._onInputChanged(newValue);
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
        protected _addEventListeners(event: string): void {
        }
    }

    plat.register.control(__File, File);

    /**
     * @name IFileOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.File|File} control.
     */
    export interface IFileOptions {
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
