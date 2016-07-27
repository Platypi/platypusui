/// <reference path="../references.d.ts" />

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
            _document: __Document
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
        templateString: string =
        '<div class="plat-toggle-container">\n' +
        '    <div class="plat-knob"></div>\n' +
        '</div>\n';

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
        isActive: boolean = false;

        /**
         * @name _document
         * @memberof platui.Checkbox
         * @kind property
         * @access protected
         *
         * @type {Document}
         *
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document;

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
        protected _targetType: string = 'slide';

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
            this.dom.addClass(element || this.element, `${__Toggle} ${(className || '')}`);
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
         * @memberof platui.Checkbox
         * @kind function
         * @access public
         *
         * @description
         * Adds the inner template to the DOM making sure to wrap text nodes in spans.
         *
         * @returns {void}
         */
        setTemplate(): void {
            let isNull = this.utils.isNull,
                innerTemplate = this.innerTemplate;

            if (isNull(innerTemplate)) {
                return;
            }

            let _document = this._document,
                element = this.element,
                childNodes = Array.prototype.slice.call(innerTemplate.childNodes),
                childNode: Node,
                span: HTMLSpanElement,
                match: Array<string>;

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (match !== null && match.length > 0) {
                        span = _document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                } else {
                    element.insertBefore(childNode, null);
                }
            }
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
            let element = this.element;
            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
            this._convertChecked();
        }

        /**
         * @name toggle
         * @memberof platui.Toggle
         * @kind function
         * @access public
         *
         * @description
         * Toggles the active state of the control.
         *
         * @returns {void}
         */
        toggle(): void {
            this._toggle(true);
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
            } else if (setProperty === true && this.utils.isNull(newValue)) {
                this.inputChanged(this.isActive);
                return;
            }

            let isActive = !!newValue;
            if (isActive === this.isActive) {
                return;
            }

            this._toggle(setProperty);
        }

        /**
         * @name _convertChecked
         * @memberof platui.Toggle
         * @kind function
         * @access protected
         *
         * @description
         * A function for checking "checked" attributes and handling them accordingly.
         *
         * @param {any} newValue The newValue of the attribute to convert.
         * @param {any} oldValue? The oldValue of the attribute to convert.
         *
         * @returns {void}
         */
        protected _convertChecked(): void {
            let element = this.element;

            if (!this.utils.isNull(this.attributes[__CamelChecked])) {
                this._convertAttribute(this.attributes[__CamelChecked]);
                this.attributes.observe(this._convertAttribute, __CamelChecked);
            } else if (element.hasAttribute('checked')) {
                this._convertAttribute(true);
            }
        }

        /**
         * @name _convertAttribute
         * @memberof platui.Toggle
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
                return this._setBoundProperty(newValue, oldValue, null, true);
            } else if (!utils.isString(newValue)) {
                return;
            }

            this._setBoundProperty(newValue === 'true', oldValue === 'true', null, true);
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
            let domEvent: plat.ui.DomEvent = plat.acquire(__DomEventInstance);
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
            let wasActive = this.isActive,
                isActive = !wasActive,
                element = this.element;

            this._activate(this._targetElement || (this._targetElement = element.firstElementChild));
            this.isActive = (<HTMLInputElement>element).checked = isActive;
            if (isActive) {
                element.setAttribute('checked', 'checked');
            } else {
                element.removeAttribute('checked');
            }

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
