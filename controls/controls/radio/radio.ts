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
        templateString =
        '<div class="plat-radio-container">' +
        '    <div class="mark"></div>' +
        '</div>';

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
        groupName = '';

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
        _targetType = 'radio';

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
        _targetTypeSet = true;

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
            this.dom.addClass(element || this.element, __Radio + ' ' + (className || ''));
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
            var element = this.element;

            if (element.hasAttribute('name')) {
                this.groupName = element.getAttribute('name');
            } else if (element.hasAttribute(__Bind)) {
                this.groupName = element.getAttribute(__Bind);
            } else if (element.hasAttribute('data-' + __Bind)) {
                this.groupName = element.getAttribute('data-' + __Bind);
            }

            this._convertChecked();
        }

        /**
         * @name setProperty
         * @memberof platui.Radio
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * @param {boolean} setProperty? A boolean value indicating whether we should set 
         * the property if we need to toggle the check mark value.
         * 
         * @returns {void}
         */
        setProperty(newValue: any, oldValue?: any, setProperty?: boolean): void {
            if (newValue === oldValue) {
                return;
            }

            var isChecked = newValue === this._getValue(),
                wasChecked = this.isActive;

            if (isChecked === wasChecked) {
                return;
            }

            this._toggle(setProperty);
        }

        /**
         * @name propertyChanged
         * @memberof platui.Radio
         * @kind function
         * @access public
         * 
         * @description
         * Checks if the radio has been selected and only notifies of a bindable 
         * property changed if it has.
         * 
         * @param {any} newValue The new value of the property after the change.
         * @param {any} oldValue? The old value of the property prior to the change.
         * 
         * @returns {void}
         */
        propertyChanged(newValue: any, oldValue?: any): void {
            if (this.isActive) {
                super.propertyChanged(this._getValue());
            }
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
        _onTap(ev: plat.ui.IGestureEvent): void {
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
        _toggle(setProperty?: boolean): void {
            super._toggle(setProperty);
            if (this.isActive) {
                var name = this.groupName;
                this.dispatchEvent(__RadioPrefix + name, plat.events.EventManager.DIRECT);
                var remover = this.on(__RadioPrefix + name, () => {
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
        _convertAttribute(newValue: any, oldValue?: any): void {
            var $utils = this.$utils;
            if ($utils.isBoolean(newValue)) {
                if (newValue) {
                    this.setProperty(this._getValue(), null, true);
                }
                return;
            } else if (!$utils.isString(newValue)) {
                return;
            }

            if (newValue === 'true') {
                this.setProperty(this._getValue(), null, true);
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
        _getValue(): string {
            var element = this.element;
            return element.hasAttribute('value') ? element.getAttribute('value') : element.textContent;
        }
    }

    plat.register.control(__Radio, Radio);
}
