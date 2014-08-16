module platui {
    /**
     * A Template Control that standardizes the HTML5 checkbox.
     */
    export class Checkbox extends Toggle {
        $document: Document = plat.acquire(__Document);

        /**
         * The Checkbox's template string.
         */
        templateString =
        '<div class="plat-checkbox-container">' +
            '<span class="mark"></span>' +
        '</div>';

        /**
         * The plat-options for this control.
         */
        options: plat.observable.IObservableProperty<ICheckboxOptions>;

        /**
         * Initializes the mark and adds a listener for the tap event.
         */
        initialize(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<ICheckboxOptions>>{},
                options = optionObj.value || <ICheckboxOptions>{},
                mark = this._targetType = options.mark || 'check',
                type = options.type || 'primary';

            switch (mark.toLowerCase()) {
                case 'check':
                case 'x':
                    break;
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    Exception.warn('Invalid mark option specified for' + __Checkbox + '. Defaulting to checkmark.');
                    break;
            }

            this.dom.addClass(this.element, type);
        }

        /**
         * Adds the inner template to the DOM making sure to wrap text nodes in spans.
         */
        setTemplate(): void {
            super.setTemplate();

            var isNull = this.$utils.isNull,
                innerTemplate = this.innerTemplate;

            if (isNull(innerTemplate)) {
                return;
            }

            var $document = this.$document,
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
         * Checks for checked attributes and handles them accordingly.
         */
        loaded(): void {
            var element = this.element;
            if (element.hasAttribute('checked') || element.hasAttribute('data-checked')) {
                this._convertAttribute(true);
            } else if (element.hasAttribute(__Checked)) {
                this._convertAttribute(element.getAttribute(__Checked));
                this.attributes.observe(__CamelChecked, this._convertAttribute);
            } else if (element.hasAttribute('data-' + __Checked)) {
                this._convertAttribute(element.getAttribute('data-' + __Checked));
                this.attributes.observe(__CamelChecked, this._convertAttribute);
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
                return this.setProperty(newValue, oldValue, true);
            } else if (!$utils.isString(newValue)) {
                return;
            }

            this.setProperty(newValue === 'true', oldValue === 'true', true);
        }
    }

    plat.register.control(__Checkbox, Checkbox);

    /**
     * The plat-options interface for the Checkbox control.
     */
    export interface ICheckboxOptions {
        /**
         * The type of mark to place in the checkbox.
         */
        mark: string;

        /**
         * The type of checkbox (i.e. - primary, secondary, etc).
         */
        type: string;
    }
}
