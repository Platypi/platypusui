module platui {
    /**
     * A Template Control that standardizes the HTML5 radio button.
     */
    export class Radio extends Checkbox {
        /**
         * The Radio's template string.
         */
        templateString =
        '<div class="plat-radio-container">' +
            '<div class="mark"></div>' +
        '</div>';

        /**
         * The radio groups name if a radio group is present.
         */
        groupName = '';
        
        /**
         * The check type to be placed in the element.
         */
        _targetType = 'radio';

        /**
         * Adds a listener for the tap event and checks for a 
         * radio group.
         */
        initialize(): void {
            var element = this.element;

            if (element.hasAttribute('name')) {
                this.groupName = element.getAttribute('name');
            } else if (element.hasAttribute(__Bind)) {
                this.groupName = element.getAttribute(__Bind);
            } else if (element.hasAttribute('data-' + __Bind)) {
                this.groupName = element.getAttribute('data-' + __Bind);
            }

            this.setClasses(__Radio);
        }
        
        /**
         * The function called when the bindable property is set externally.
         * 
         * @param newValue The new value of the bindable property.
         * @param oldValue The old value of the bindable property.
         * @param setProperty A boolean value indicating whether we should set 
         * the property if we need to toggle the check mark value.
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
         * Checks if the radio has been selected and only notifies of a bindable 
         * property changed if it has.
         * 
         * @param newValue The new value of the property after the change.
         * @param oldValue The old value of the property prior to the change.
         */
        propertyChanged(newValue: any, oldValue?: any): void {
            if (this.isActive) {
                super.propertyChanged(this._getValue());
            }
        }

        /**
         * The callback for a tap event. Only fires the event if the radio 
         * has been selected.
         * 
         * @param ev The tap event object.
         */
        _onTap(ev: plat.ui.IGestureEvent): void {
            if (this.isActive) {
                return;
            }

            super._onTap(ev);
        }

        /**
         * Toggles the mark and updates the bindable property if needed.
         * 
         * @param setProperty A boolean value stating whether the bindable 
         * property should be updated.
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
         * A function for handling the attribute value conversion for updating the 
         * bound property.
         * 
         * @param newValue The newValue of the attribute to convert.
         * @param oldValue The oldValue of the attribute to convert.
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
         * Grabs the value of this radio buttons bindable property. It first checks for 
         * the "value" attribute, and defaults to the elements textContent if it's unavailable.
         */
        _getValue(): string {
            var element = this.element;
            return element.hasAttribute('value') ? element.getAttribute('value') : element.textContent;
        }
    }

    plat.register.control(__Radio, Radio);
}
