module platypusui {
    export class Checkbox extends plat.ui.BindablePropertyControl {
        $utils: plat.IUtils = plat.acquire(plat.IUtils);
        $document: Document = plat.acquire(plat.Document);

        templateString = '<div class="plat-checkbox-container"><span class="mark"></span></div>';

        isChecked = false;
        options: plat.observable.IObservableProperty<ICheckboxOptions>;

        _checkType: string;
        _markElement: Element;

        initialize(): void {
            var options = this.options.value,
                utils = this.$utils,
                mark = this._checkType = (utils.isNull(options) || !utils.isString(options.mark)) ? 'check' : options.mark;

            switch (mark.toLowerCase()) {
                case 'check':
                case 'x':
                    break;
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                    Exception.warn('Invalid mark option specified for plat-checkbox. Defaulting to checkmark.');
                    break;
            }

            this.addEventListener(this.element, '$tap', this._onTap.bind(this));
        }

        setTemplate(): void {
            var $document = this.$document,
                isNull = this.$utils.isNull,
                element = this.element,
                innerTemplate = this.innerTemplate,
                childNodes = Array.prototype.slice.call(innerTemplate.childNodes),
                childNode: Node,
                span: HTMLSpanElement;

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    var match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (!isNull(match) && match.length > 0) {
                        span = $document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                } else {
                    element.insertBefore(childNode, null);
                }
            }
        }

        loaded(): void {
            this._markElement = this.element.firstElementChild.firstElementChild;
        }

        setProperty(newValue: any, oldValue?: any): void {
            if (newValue === oldValue) {
                return;
            }

            var isChecked = !!newValue;
            if (this.isChecked === isChecked) {
                return;
            }

            this._toggleMark();
        }

        _onTap(ev: plat.ui.IGestureEvent): void {
            var domEvent = plat.acquire(plat.ui.IDomEventInstance),
                element = this.element;

            this._toggleMark(true);

            domEvent.initialize(element, 'change');
            domEvent.trigger();
        }

        _toggleMark(setProperty?: boolean): void {
            var isChecked = !this.isChecked,
                element = <HTMLInputElement>this.element,
                markElement = this.$utils.isNull(this._markElement) ?
                element.firstElementChild.firstElementChild :
                this._markElement;

            this.dom.toggleClass(markElement, this._checkType);
            element.checked = isChecked;
            if (setProperty === true) {
                this.propertyChanged(isChecked, this.isChecked);
            }
            this.isChecked = isChecked;
        }
    }

    plat.register.control('plat-checkbox', Checkbox);

    export interface ICheckboxOptions {
        mark: string;
    }
}
