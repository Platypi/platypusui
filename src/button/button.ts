/// <reference path="../references.d.ts" />

/**
 * @name platui
 * @kind namespace
 * @access public
 *
 * @description
 * The entry point into the platypus UI controls library.
 */
module platui {
    /**
     * @name Button
     * @memberof platui
     * @kind class
     *
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl}
     *
     * @description
     * An {@link plat.ui.BindControl|BindControl} that standardizes an HTML5 button.
     */
    export class Button extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any = {
            _document: __Document
        };

        /**
         * @name replaceWith
         * @memberof platui.Button
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Replaces the <plat-button> node with
         * a <button> node.
         */
        replaceWith: string = 'button';

        /**
         * @name options
         * @memberof platui.Button
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<platui.IButtonOptions>}
         *
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IButtonOptions>;

        /**
         * @name _document
         * @memberof platui.Button
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
         * @name _group
         * @memberof platui.Button
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The button group's name if a button group is present.
         */
        protected _group: string;

        /**
         * @name _isSelected
         * @memberof platui.Button
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * A boolean value showing the selected state of this {@link platui.Button|Button}.
         */
        protected _isSelected: boolean = false;

        /**
         * @name setClasses
         * @memberof platui.Button
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
            this.dom.addClass(element || this.element, `${__Button} ${(className || '')}`);
        }

        /**
         * @name initialize
         * @memberof platui.Button
         * @kind function
         * @access public
         *
         * @description
         * Sets default classes.
         *
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Button
         * @kind function
         * @access public
         *
         * @description
         * Wrap all inner text nodes in spans.
         *
         * @returns {void}
         */
        setTemplate(): void {
            let _document = this._document,
                element = this.element,
                childNodes = Array.prototype.slice.call(element.childNodes),
                childNode: Node,
                span: HTMLSpanElement,
                isEmpty = this.utils.isEmpty;

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    if (!isEmpty(childNode.textContent.trim().match(/[^\r\n]/g))) {
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
         * @memberof platui.Button
         * @kind function
         * @access public
         *
         * @description
         * Determine the button style and apply the proper classes.
         *
         * @returns {void}
         */
        loaded(): void {
            let element = this.element,
                optionObj = this.options || <plat.observable.IObservableProperty<IButtonOptions>>{},
                options = optionObj.value || <IButtonOptions>{},
                group = options.group,
                isString = this.utils.isString;

            if (!isString(group)) {
                group = this.attributes[__CamelBind];
                if (isString(group)) {
                    this._group = group;
                    if (this.dom.hasClass(element, `${__Plat}selected`)) {
                        this._onTap();
                    }
                    this._addEventListeners();
                }
                return;
            }

            this._group = group;
            if (this.dom.hasClass(element, `${__Plat}selected`)) {
                this._onTap();
            }
            this._addEventListeners();
        }

        /**
         * @name observeProperties
         * @memberof platui.Button
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
         * @memberof platui.Button
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the bindable property is set externally.
         *
         * @param {string} newValue The new value of the bindable property.
         * @param {string} oldValue The old value of the bindable property.
         * @param {string} identifier The identifier of the property being observed.
         * @param {boolean} firstTime? A boolean value indicating whether this is the first time its being set.
         *
         * @returns {void}
         */
        protected _setBoundProperty(newValue: string, oldValue: string, identifier: string, firstTime?: boolean): void {
            if (!this.utils.isString(newValue) || newValue !== this.element.textContent) {
                return;
            }

            this._onTap();
        }

        /**
         * @name _addEventListeners
         * @memberof platui.Button
         * @kind function
         * @access protected
         *
         * @description
         * Add event listeners for selection.
         *
         * @returns {void}
         */
        protected _addEventListeners(): void {
            this.addEventListener(this.element, __$tap, this._onTap, false);
            this.on(__ButtonPrefix + this._group, (): void => {
                if (this._isSelected) {
                    this.dom.removeClass(this.element, `${__Plat}selected`);
                    this._isSelected = false;
                }
            });
        }

        /**
         * @name _onTap
         * @memberof platui.Button
         * @kind function
         * @access protected
         *
         * @description
         * Place the pushed button in a selected state.
         *
         * @returns {void}
         */
        protected _onTap(): void {
            if (this._isSelected) {
                return;
            }

            let element = this.element;

            this.dom.addClass(element, `${__Plat}selected`);
            this.dispatchEvent(__ButtonPrefix + this._group, plat.events.EventManager.DIRECT);
            this._isSelected = true;
            this.inputChanged(element.textContent);
        }
    }

    plat.register.control(__Button, Button);

    /**
     * @name IButtonOptions
     * @memberof platui
     * @kind interface
     *
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Button|Button} control.
     */
    export interface IButtonOptions {
        /**
         * @name group
         * @memberof platui.IButtonOptions
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The group name of this {@link platui.Button|Button's} associated button group.
         */
        group?: string;
    }
}
