/// <reference path="../../references.d.ts" />

module platui {
    /**
     * @name Select
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.BindControl|BindControl} that simulates a toggle switch.
     */
    export class Toggle extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any = {
            _utils: __Utils
        };

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
        '<div class="plat-toggle-container">\n' +
        '    <div class="plat-knob"></div>\n' +
        '</div>\n';

        /**
         * @name priority
         * @memberof platui.Toggle
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
         * @name _utils
         * @memberof platui.Toggle
         * @kind property
         * @access protected
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.Utils|Utils} injectable.
         */
        protected _utils: plat.Utils;

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
        protected _targetType = 'slide';

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
        protected _targetElement: Element;

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
         * @name loaded
         * @memberof platui.Toggle
         * @kind function
         * @access public
         * 
         * @description
         * Adds a listener for the tap event.
         * 
         * @returns {void}
         */
        loaded(): void {
            var element = this.element;
            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
        }

        /**
         * @name observeProperties
         * @memberof platui.Toggle
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         *
         * @param {plat.observable.IImplementTwoWayBinding} implementer The control that facilitates the
         * databinding.
         *
         * @returns {void}
         */
        observeProperties(implementer: plat.observable.IImplementTwoWayBinding): void {
            implementer.observeProperty(this._setBoundProperty);
        }

        /**
         * @name _setBoundProperty
         * @memberof platui.Toggle
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
         * the property if we need to toggle the state.
         *
         * @returns {void}
         */
        protected _setBoundProperty(newValue: any, oldValue: any, identifier: string, setProperty?: boolean): void {
            if (newValue === oldValue) {
                return;
            } else if (setProperty === true && this._utils.isNull(newValue)) {
                this.inputChanged(this.isActive);
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
        protected _onTap(ev: plat.ui.IGestureEvent): void {
            this._toggle(true);
            this._trigger('change');
        }

        /**
         * @name _trigger
         * @memberof platui.Toggle
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
            var domEvent: plat.ui.DomEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
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
        protected _toggle(setProperty?: boolean): void {
            var wasActive = this.isActive,
                isActive = !wasActive;

            this._activate(this._targetElement || (this._targetElement = this.element.firstElementChild));
            this.isActive = (<HTMLInputElement>this.element).checked = isActive;
            if (setProperty === true) {
                this.inputChanged(isActive, wasActive);
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
        protected _activate(element: Element): void {
            this.dom.toggleClass(element, __Plat + this._targetType);
        }
    }

    plat.register.control(__Toggle, Toggle);
}
