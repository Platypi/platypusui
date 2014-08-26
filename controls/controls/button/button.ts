module platui {
    /**
     * A Template Control for standardizing an HTML5 button.
     */
    export class Button extends plat.ui.BindablePropertyControl implements IUIControl {
        $document: Document = plat.acquire(__Document);

        /**
         * The element to replace the button control with.
         */
        replaceWith = 'button';

        /**
         * The plat-options for the Button.
         */
        options: plat.observable.IObservableProperty<IButtonOptions>;

        /**
         * The radio groups name if a radio group is present.
         */
        groupName = '';

        /**
         * Boolean value showing the selected state of this Button.
         */
        _isSelected: boolean;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className The class name to set on the button element.
         */
        setClasses(className: string): void {
            this.dom.addClass(this.element, className);
        }
        
        /**
         * Adds a listener for the tap event and checks for a 
         * radio group.
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

            this.setClasses(__Button);
        }

        /**
         * Wrap all inner text nodes in spans.
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
         * Determine the button type and apply the proper classes.
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IButtonOptions>>{},
                options = optionObj.value || <IButtonOptions>{},
                type = options.type || 'primary';

            this.dom.addClass(this.element, type);
        }

        /**
         * Add event listeners for selection.
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
         * Place the pushed button in a selected state.
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
     * An interface defining the plat-options for the Button control.
     */
    export interface IButtonOptions {
        /**
         * The type of Button.
         */
        type: string;
    }
}
