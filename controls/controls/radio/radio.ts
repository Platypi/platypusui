module platypusui {
    /**
     * A Template Control that standardizes the HTML5 radio button.
     */
    export class Radio extends Checkbox {
        /**
         * The Radio's template string.
         */
        templateString = '<div class="plat-radio-container"><span class="mark"></span></div>';

        /**
         * The radio groups name if a radio group is present.
         */
        groupName = '';
        
        /**
         * The check type to be placed in the element.
         */
        _checkType = 'radio';

        /**
         * Adds a listener for the tap event and checks for a 
         * radio group.
         */
        initialize(): void {
            var element = this.element;

            if (element.hasAttribute('name')) {
                this.groupName = element.getAttribute('name');
            } else if (element.hasAttribute('plat-bind')) {
                this.groupName = element.getAttribute('plat-bind');
            }

            this.addEventListener(element, '$tap', this._onTap.bind(this));
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
                wasChecked = this.isChecked;

            if (isChecked === wasChecked) {
                return;
            }

            this._toggleMark(setProperty);
        }

        /**
         * Checks if the radio has been selected and only notifies of a bindable 
         * property changed if it has.
         * 
         * @param newValue The new value of the property after the change.
         * @param oldValue The old value of the property prior to the change.
         */
        propertyChanged(newValue: any, oldValue?: any): void {
            if (this.isChecked) {
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
            if (this.isChecked) {
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
        _toggleMark(setProperty?: boolean): void {
            super._toggleMark(setProperty);
            if (this.isChecked) {
                var name = this.groupName;
                this.dispatchEvent('__plat-radio-' + name, plat.events.EventManager.DIRECT);
                var remover = this.on('__plat-radio-' + name, () => {
                    this._toggleMark();
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

    plat.register.control('plat-radio', Radio);
}
