/// <reference path="../references.d.ts" />

module platui {
    /**
     * @name Radio
     * @memberof platui
     * @kind class
     *
     * @extends {platui.Checkbox}
     *
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes the HTML5 radio button.
     */
    export class Radio extends Checkbox {
        /**
         * @name templateString
         * @memberof platui.Radio
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The HTML template represented as a string.
         */
        templateString: string =
        '<div class="plat-radio-container">\n' +
        '    <div class="plat-mark"></div>\n' +
        '</div>\n';

        /**
         * @name groupName
         * @memberof platui.Radio
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The radio groups name if a radio group is present.
         */
        groupName: string = '';

        /**
         * @name _targetType
         * @memberof platui.Radio
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The check type to be placed in the element.
         */
        protected _targetType: string = 'bullet';

        /**
         * @name _targetTypeSet
         * @memberof platui.Radio
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether the target type has been set already or not.
         */
        protected _targetTypeSet: boolean = true;

        /**
         * @name _removeListener
         * @memberof platui.Radio
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function to stop listening for dispatched group events.
         */
        protected _removeListener: plat.IRemoveListener;

        /**
         * @name setClasses
         * @memberof platui.Radio
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
            this.dom.addClass(element || this.element, `${__Radio} ${(className || '')}`);
        }

        /**
         * @name loaded
         * @memberof platui.Radio
         * @kind function
         * @access public
         *
         * @description
         * Checks for a radio group and converts "checked" attributes.
         *
         * @returns {void}
         */
        loaded(): void {
            let element = this.element;

            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);

            if (element.hasAttribute(__NAME_ATTRIBUTE)) {
                this.groupName = element.getAttribute(__NAME_ATTRIBUTE);
            } else if (!this.utils.isNull(this.attributes[__CamelBind])) {
                this.groupName = this.attributes[__CamelBind];
            }

            this._convertChecked();
        }

        /**
         * @name inputChanged
         * @memberof platui.Radio
         * @kind function
         * @access public
         *
         * @description
         * Checks if the radio has been selected and only notifies of a bindable
         * property changed if it has.
         *
         * @param {any} newValue? The new value of the property after the change.
         * @param {any} oldValue? The old value of the property prior to the change.
         *
         * @returns {void}
         */
        inputChanged(newValue?: any, oldValue?: any): void {
            if (this.isActive) {
                super.inputChanged(this._getValue());
            }
        }

        /**
         * @name _setBoundProperty
         * @memberof platui.Radio
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the bindable property is set externally.
         *
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue The old value of the bindable property.
         * @param {string} identifier The identifier of the property being observed.
         * @param {boolean} setProperty? A boolean value indicating whether we should set
         * the property if we need to toggle the mark.
         *
         * @returns {void}
         */
        protected _setBoundProperty(newValue: any, oldValue: any, identifier: string, setProperty?: boolean): void {
            let utils = this.utils;
            if (newValue === oldValue) {
                return;
            } else if (setProperty === true && utils.isNull(newValue)) {
                this.inputChanged();
                return;
            }

            let value = this._getValue(),
                isChecked = newValue === value,
                wasChecked = this.isActive;

            if (isChecked) {
                if (wasChecked) {
                    return;
                }
            } else if (utils.isNull(newValue)) {
                if (!wasChecked) {
                    return;
                }
            } else {
                let newValueStr = utils.isFunction(newValue.toString) ? newValue.toString() : Object.prototype.toString.call(newValue);
                if (wasChecked) {
                    if (newValueStr === value) {
                        return;
                    }
                } else {
                    if (newValueStr !== value) {
                        return;
                    }
                }
            }

            this._toggle(setProperty);
        }

        /**
         * @name _onTap
         * @memberof platui.Radio
         * @kind function
         * @access protected
         *
         * @description
         * The callback for a tap event. Only fires the event if the {@link platui.Radio|Radio}
         * has been selected.
         *
         * @param {plat.ui.IGestureEvent} ev The tap event object.
         *
         * @returns {void}
         */
        protected _onTap(ev: plat.ui.IGestureEvent): void {
            if (this.isActive) {
                return;
            }

            super._onTap(ev);
        }

        /**
         * @name _toggle
         * @memberof platui.Radio
         * @kind function
         * @access protected
         *
         * @description
         * Toggles the mark and updates the bindable property if needed.
         *
         * @param {boolean} setProperty? A boolean value stating whether the bindable
         * property should be updated.
         *
         * @returns {void}
         */
        protected _toggle(setProperty?: boolean): void {
            super._toggle(setProperty);
            if (this.utils.isFunction(this._removeListener)) {
                this._removeListener();
                this._removeListener = null;
            }

            if (this.isActive) {
                let name = this.groupName;
                this.dispatchEvent(__RadioPrefix + name, plat.events.EventManager.DIRECT);
                let remover = this._removeListener = this.on(__RadioPrefix + name, (): void => {
                    this._toggle();
                    remover();
                });
            }
        }

        /**
         * @name _convertAttribute
         * @memberof platui.Radio
         * @kind function
         * @access protected
         *
         * @description
         * A function for handling the attribute value conversion for updating the
         * bound property.
         *
         * @param {any} newValue The newValue of the attribute to convert.
         * @param {any} oldValue? The oldValue of the attribute to convert.
         *
         * @returns {void}
         */
        protected _convertAttribute(newValue: any, oldValue?: any): void {
            let utils = this.utils;
            if (utils.isBoolean(newValue)) {
                if (newValue) {
                    this._setBoundProperty(this._getValue(), null, null, true);
                }
                return;
            } else if (!utils.isString(newValue)) {
                return;
            }

            if (newValue === 'true') {
                this._setBoundProperty(this._getValue(), null, null, true);
            }
        }

        /**
         * @name _getValue
         * @memberof platui.Radio
         * @kind function
         * @access protected
         *
         * @description
         * Grabs the value of this {@link platui.Radio|Radio's} bindable property. It first checks for
         * the "value" attribute, and defaults to the elements textContent if it's unavailable.
         *
         * @returns {string} Returns the bindable value of this control.
         */
        protected _getValue(): string {
            let element = this.element;
            return element.hasAttribute('value') ? element.getAttribute('value').trim() : element.textContent.trim();
        }
    }

    plat.register.control(__Radio, Radio);
}
