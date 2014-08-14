module platui {
    export class Button extends plat.ui.TemplateControl {
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
                type = options.type;

            if (!type) {
                return;
            }

            this.dom.addClass(this.element, type);
        }
    }

    plat.register.control(__Button, Button);

    export interface IButtonOptions {
        type: string;
    }
}
