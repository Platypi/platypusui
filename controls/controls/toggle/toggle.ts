module platui {
    /**
     * A Template Control simulating a toggle switch.
     */
    export class Toggle extends plat.ui.BindablePropertyControl implements IUIControl {
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * The Toggle's template string.
         */
        templateString =
        '<div class="plat-toggle-container">' +
            '<div class="knob"></div>' +
        '</div>';

        /**
         * A boolean value indicating whether the control is actively selected.
         */
        isActive = false;

        /**
         * The type of the control's activated element.
         */
        _targetType = 'slide';

        /**
         * The element used to create the targeted effect.
         */
        _targetElement: Element;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Toggle);

            if (this.$utils.isString(className)) {
                dom.addClass(element, className);
            }
        }

        /**
         * Set the plat-toggle class name.
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * Adds a listener for the tap event.
         */
        setTemplate(): void {
            var element = this.element;
            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
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

            var isActive = !!newValue;
            if (isActive === this.isActive) {
                return;
            }

            this._toggle(setProperty);
        }

        /**
         * The callback for a tap event.
         * 
         * @param ev The tap event object.
         */
        _onTap(ev: plat.ui.IGestureEvent): void {
            var domEvent = plat.acquire(plat.ui.IDomEventInstance);

            this._toggle(true);

            domEvent.initialize(this.element, 'change');
            domEvent.trigger();
        }

        /**
         * Toggles the mark and updates the bindable property if needed.
         * 
         * @param setProperty A boolean value stating whether the bindable 
         * property should be updated.
         */
        _toggle(setProperty?: boolean): void {
            var wasActive = this.isActive,
                isActive = !wasActive;

            this._activate(this._targetElement);
            this.isActive = (<HTMLInputElement>this.element).checked = isActive;
            if (setProperty === true) {
                this.propertyChanged(isActive, wasActive);
            }
        }

        /**
         * A function to activate the given element.
         */
        _activate(element: Element): void {
            this.dom.toggleClass(element, this._targetType);
        }
    }

    plat.register.control(__Toggle, Toggle);
}
