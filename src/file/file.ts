﻿/// <reference path="../references.d.ts" />

module platui {
    /**
     * @name File
     * @memberof platui
     * @kind class
     *
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl, platui.IFormControl}
     *
     * @description
     * An {@link plat.ui.BindControl|BindControl} that standardizes and styles
     * an HTML input[type="file"] element.
     */
    export class File extends plat.ui.BindControl implements IUiControl, IFormControl {
        protected static _inject: any = {
            _compat: __Compat
        };

        /**
         * @name templateString
         * @memberof platui.File
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The HTML template represented as a string.
         */
        templateString: string =
        '<div class="plat-file-container">\n' +
        '    <input type="file" class="plat-file-hidden" />\n' +
        '    <input type="text" class="plat-file-input" plat-keydown="_onKeyDown" />\n' +
        '    <button class="plat-file-button" plat-tap="_selectFiles"></button>\n' +
        '</div>\n';

        /**
         * @name _compat
         * @memberof platui.File
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
         * @name _hiddenInput
         * @memberof platui.File
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
         * @memberof platui.File
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
         * @name _removeListener
         * @memberof platui.File
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function for removing the 'change' event listener.
         */
        protected _removeListener: plat.IRemoveListener = noop;

        /**
         * @name setClasses
         * @memberof platui.File
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
            this.dom.addClass(element || this.element, `${__File} ${(className || '')}`);
        }

        /**
         * @name initialize
         * @memberof platui.File
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
         * @memberof platui.File
         * @kind function
         * @access public
         *
         * @description
         * Set all HTMLElement references and potential attribute controls.
         *
         * @returns {void}
         */
        setTemplate(): void {
            let element = this.element,
                hiddenInput = this._hiddenInput = <HTMLInputElement>element.firstElementChild.firstElementChild,
                visibleInput = this._visibleInput = <HTMLInputElement>hiddenInput.nextElementSibling,
                buttonInput = <HTMLButtonElement>visibleInput.nextElementSibling,
                attributes = this.attributes,
                keys = Object.keys(attributes),
                length = keys.length,
                controlInjectors = plat.dependency.injectors.control,
                attrRegex = /plat-(?:control|hide|context)|class|style/,
                hasMultiple = false,
                utils = this.utils,
                isNull = utils.isNull,
                delimit = utils.delimit,
                isString = utils.isString,
                key: string,
                name: string,
                value: string;

            for (let i = 0; i < length; ++i) {
                key = keys[i];
                name = delimit(key, '-');
                value = attributes[key];
                if (!isString(value) || attrRegex.test(name) || !isNull(controlInjectors[name])) {
                    if (name === __Disabled) {
                        hiddenInput.setAttribute(name, value);
                        visibleInput.setAttribute(name, value);
                        buttonInput.setAttribute(name, value);
                    }
                    continue;
                } else if (name === 'id') {
                    element.removeAttribute(name);
                    hiddenInput.setAttribute(name, value);
                } else if (name === 'multiple') {
                    hasMultiple = true;
                    hiddenInput.setAttribute(name, value);
                } else if (name === 'disabled') {
                    hiddenInput.setAttribute(name, value);
                    visibleInput.setAttribute(name, value);
                    buttonInput.setAttribute(name, value);
                } else {
                    hiddenInput.setAttribute(name, value);
                }
            }

            if (isNull(this.innerTemplate)) {
                buttonInput.textContent = hasMultiple ? 'Select files' : 'Select a file';
                return;
            }

            let buttonText = this.innerTemplate.textContent.replace(/\r|\n/g, '');
            if (utils.isEmpty(buttonText)) {
                buttonInput.textContent = hasMultiple ? 'Select files' : 'Select a file';
                return;
            }

            buttonInput.textContent = buttonText;
        }

        /**
         * @name loaded
         * @memberof platui.File
         * @kind function
         * @access public
         *
         * @description
         * Set the style and initialize the action.
         *
         * @returns {void}
         */
        loaded(): void {
            let hiddenInput = this._hiddenInput = this._hiddenInput || <HTMLInputElement>this.element.firstElementChild.firstElementChild;
            this._visibleInput = this._visibleInput || <HTMLInputElement>hiddenInput.nextElementSibling;

            this._addChangeListener();
        }

        /**
         * @name validate
         * @memberof platui.File
         * @kind function
         * @access public
         *
         * @description
         * A function to validate the user's input. Returns true if the input is not empty.
         *
         * @returns {boolean} Whether or not the user's input is valid.
         */
        validate(): boolean {
            return !this.utils.isEmpty(this._hiddenInput.value);
        }

        /**
         * @name clear
         * @memberof platui.File
         * @kind function
         * @access public
         *
         * @description
         * Clears the user's input.
         *
         * @returns {void}
         */
        clear(): void {
            let hiddenInput = this._hiddenInput;

            if (this.utils.isEmpty(hiddenInput.value)) {
                return;
            }

            hiddenInput.value = null;

            let clone = this._hiddenInput = <HTMLInputElement>hiddenInput.cloneNode(true);

            this.element.firstElementChild.replaceChild(clone, hiddenInput);
            this._addChangeListener();
            this._visibleInput.value = '';
            this.inputChanged(null);
            this._trigger('change');
        }

        /**
         * @name click
         * @memberof platui.File
         * @kind function
         * @access public
         *
         * @description
         * Acts as a programmatic click for file selection.
         *
         * @returns {void}
         */
        click(): void {
            this._selectFiles();
        }

        /**
         * @name value
         * @memberof platui.File
         * @kind function
         * @access public
         *
         * @description
         * Returns the current value of {@link platui.File|File} control.
         *
         * @returns {any} The currently selected file(s) of the {@link platui.File|File} control.
         */
        value(): any {
            let hiddenInput = this._hiddenInput,
                files = hiddenInput.files;

            if (this.utils.isNull(files)) {
                return;
            } else if (!hiddenInput.multiple) {
                return files[0];
            }

            return Array.prototype.slice.call(files);
        }

        /**
         * @name disable
         * @memberof platui.File
         * @kind function
         * @access public
         *
         * @description
         * Disables the control.
         *
         * @returns {void}
         */
        disable(): void {
            let disabled = 'disabled',
                visibleInput = this._visibleInput;

            this._hiddenInput.setAttribute(disabled, disabled);
            visibleInput.setAttribute(disabled, disabled);
            visibleInput.nextElementSibling.setAttribute(disabled, disabled);
            this.element.setAttribute(disabled, disabled);
        }

        /**
         * @name enable
         * @memberof platui.File
         * @kind function
         * @access public
         *
         * @description
         * Enables the control.
         *
         * @returns {void}
         */
        enable(): void {
            let disabled = 'disabled',
                visibleInput = this._visibleInput;

            this._hiddenInput.removeAttribute(disabled);
            visibleInput.removeAttribute(disabled);
            visibleInput.nextElementSibling.removeAttribute(disabled);
            this.element.removeAttribute(disabled);
        }

        /**
         * @name observeProperties
         * @memberof platui.File
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
         * @memberof platui.File
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the bindable text is set externally.
         *
         * @param {any} newValue The new value of the bindable file(s).
         * @param {any} oldValue The old value of the bindable file(s).
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         *
         * @returns {void}
         */
        protected _setBoundProperty(newValue: any, oldValue: any, identifier: void, firstTime?: boolean): void {
            let utils = this.utils;
            if (!utils.isFile(newValue)) {
                this.clear();
                return;
            }

            let hiddenInput = this._hiddenInput,
                files = hiddenInput.files;

            if (utils.isNull(files)) {
                return;
            }

            if (!hiddenInput.multiple) {
                if (newValue !== files[0]) {
                    this.inputChanged(files[0]);
                    this._trigger('change');
                }
                return;
            }

            this.inputChanged(Array.prototype.slice.call(files));
            this._trigger('change');
        }

        /**
         * @name _addChangeListener
         * @memberof platui.File
         * @kind function
         * @access protected
         *
         * @description
         * Adds the 'change' event listener to the hidden input[type=file].
         *
         * @returns {void}
         */
        protected _addChangeListener(): void {
            this._removeListener();
            this._removeListener = this.addEventListener(this._hiddenInput, 'change', this._filesSelected, false);
        }

        /**
         * @name _onKeyDown
         * @memberof platui.File
         * @kind function
         * @access protected
         *
         * @description
         * An event listener to handle a "keydown" event on the visible input.
         *
         * @param {KeyboardEvent} ev The "keydown" event.
         *
         * @returns {boolean} Whether or not to prevent default behavior.
         */
        protected _onKeyDown(ev: KeyboardEvent): boolean {
            let key = ev.keyCode,
                keyCodes = plat.controls.KeyCodes;

            if (key === keyCodes.tab) {
                return true;
            } else if (key === keyCodes.backspace || key === keyCodes.delete) {
                this.clear();
            }

            ev.preventDefault();
            return false;
        }

        /**
         * @name _selectFiles
         * @memberof platui.File
         * @kind function
         * @access protected
         *
         * @description
         * Kicks off the file selection process.
         *
         * @returns {void}
         */
        protected _selectFiles(): void {
            this._hiddenInput.click();
        }

        /**
         * @name _filesSelected
         * @memberof platui.File
         * @kind function
         * @access protected
         *
         * @description
         * An event indicating that files have been selected.
         *
         * @returns {void}
         */
        protected _filesSelected(): void {
            let hiddenInput = this._hiddenInput,
                visibleInput = this._visibleInput,
                files = hiddenInput.files;

            if (this.utils.isEmpty(files)) {
                this.clear();
                return;
            } else if (!hiddenInput.multiple) {
                let file = files[0];

                visibleInput.value = file.name;
                this.inputChanged(file);
            } else {
                let fileNames = <Array<string>>[],
                    length = files.length;

                for (let i = 0; i < length; ++i) {
                    fileNames.push(files[i].name);
                }

                visibleInput.value = fileNames.join(', ');
                this.inputChanged(Array.prototype.slice.call(files));
            }

            this._trigger('change');
        }

        /**
         * @name _trigger
         * @memberof platui.File
         * @kind function
         * @access protected
         *
         * @description
         * Triggers an event starting from this control's element.
         *
         * @param {string} event The event name to trigger.
         *
         * @returns {void}
         */
        protected _trigger(event: string): void {
            let domEvent: plat.ui.DomEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
            domEvent.trigger();
        }
    }

    plat.register.control(__File, File);
}
