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
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes an HTML5 button.
     */
    export class Button extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name $document
         * @memberof platui.Button
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $document: Document = plat.acquire(__Document);

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
        replaceWith = 'button';

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
         * @name groupName
         * @memberof platui.Button
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The button groups name if a button group is present.
         */
        groupName = '';

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
        _isSelected: boolean;

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
            this.dom.addClass(element || this.element, __Button + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Button
         * @kind function
         * @access public
         * 
         * @description
         * Adds a listener for the tap event and checks for a 
         * button group.
         * 
         * @returns {void}
         */
        initialize(): void {
            var element = this.element;

            if (element.hasAttribute('name')) {
                this._addEventListeners(element.getAttribute('name'));
            } else if (element.hasAttribute(__Bind)) {
                this._addEventListeners(element.getAttribute(__Bind));
            } else if (element.hasAttribute('data-' + __Bind)) {
                this._addEventListeners(element.getAttribute('data-' + __Bind));
            }

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
            var $document = this.$document,
                element = this.element,
                childNodes = Array.prototype.slice.call(element.childNodes),
                childNode: Node,
                span: HTMLSpanElement,
                match: Array<string>;

            if (childNodes.length === 0) {
                span = $document.createElement('span');
                element.insertBefore(span, null);
                return;
            }

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (match !== null && match.length > 0) {
                        span = $document.createElement('span');
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
            var optionObj = this.options || <plat.observable.IObservableProperty<IButtonOptions>>{},
                options = optionObj.value || <IButtonOptions>{},
                style = options.style || 'primary';

            this.dom.addClass(this.element, style);
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
        _addEventListeners(name: string): void {
            var element = this.element,
                dom = this.dom;

            this.groupName = name;
            this._isSelected = false;
            this.addEventListener(element, __$tap, this._onTap, false);
            this.on(__ButtonPrefix + name, () => {
                if (this._isSelected) {
                    dom.removeClass(element, 'selected');
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
        _onTap(): void {
            if (this._isSelected) {
                return;
            }

            var element = this.element;
            this.dom.addClass(element, 'selected');
            this.dispatchEvent(__ButtonPrefix + this.groupName, plat.events.EventManager.DIRECT);
            this._isSelected = true;
            this.propertyChanged(element.textContent);
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
         * @name style
         * @memberof platui.IButtonOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The style of {@link platui.Button|Button}. 
         * Defaults to "primary".
         * 
         * @remarks
         * - "primary"
         * - "secondary"
         * - "back"
         * - "confirm"
         * - "cancel"
         */
        style?: string;
    }
}
