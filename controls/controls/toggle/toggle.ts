module platui {
    /**
     * @name Select
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.IBindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that simulates a toggle switch.
     */
    export class Toggle extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name $utils
         * @memberof platui.Toggle
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
         * @name templateString
         * @memberof platui.Toggle
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-toggle-container">' +
        '    <div class="knob"></div>' +
        '</div>';

        /**
         * @name isActive
         * @memberof platui.Toggle
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value indicating whether the control is actively selected.
         */
        isActive = false;

        /**
         * @name _targetType
         * @memberof platui.Toggle
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The type of the control's activated element.
         */
        _targetType = 'slide';

        /**
         * @name _targetElement
         * @memberof platui.Toggle
         * @kind property
         * @access protected
         * 
         * @type {Element}
         * 
         * @description
         * The element used to create the targeted effect.
         */
        _targetElement: Element;

        /**
         * @name setClasses
         * @memberof platui.Toggle
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
            this.dom.addClass(element || this.element, __Toggle + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Toggle
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
         * @memberof platui.Toggle
         * @kind function
         * @access public
         * 
         * @description
         * Adds a listener for the tap event.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var element = this.element;
            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
        }

        /**
         * @name setProperty
         * @memberof platui.Toggle
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * @param {boolean} setProperty? A boolean value indicating whether we should set 
         * the property if we need to toggle the activated state.
         * 
         * @returns {void}
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
         * @name _onTap
         * @memberof platui.Toggle
         * @kind function
         * @access protected
         * 
         * @description
         * The callback for a tap event.
         * 
         * @param {plat.ui.IGestureEvent} ev The tap event object.
         * 
         * @returns {void}
         */
        _onTap(ev: plat.ui.IGestureEvent): void {
            var domEvent = plat.acquire(plat.ui.IDomEventInstance);

            this._toggle(true);

            domEvent.initialize(this.element, 'change');
            domEvent.trigger();
        }

        /**
         * @name _toggle
         * @memberof platui.Toggle
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
            var wasActive = this.isActive,
                isActive = !wasActive;

            this._activate(this._targetElement);
            this.isActive = (<HTMLInputElement>this.element).checked = isActive;
            if (setProperty === true) {
                this.propertyChanged(isActive, wasActive);
            }
        }

        /**
         * @name _activate
         * @memberof platui.Toggle
         * @kind function
         * @access protected
         * 
         * @description
         * A function to activate the given element by toggling the 
         * class specified as the target type.
         * 
         * @param {Element} element The element to activate.
         * 
         * @returns {void}
         */
        _activate(element: Element): void {
            this.dom.toggleClass(element, this._targetType);
        }
    }

    plat.register.control(__Toggle, Toggle);
}
