module platypusui {
    export class Checkbox extends plat.ui.TemplateControl {
        $utils: plat.IUtils = plat.acquire(plat.IUtils);
        //$document: Document = plat.acquire(plat.Document);

        templateString = '<div class="plat-checkbox-container"></div>';

        isChecked = false;
        checkType: string;
        options: plat.observable.IObservableProperty<ICheckboxOptions>;

        initialize() {
            var options = this.options.value,
                utils = this.$utils,
                mark = this.checkType = (utils.isNull(options) || !utils.isString(options.mark)) ? 'check' : options.mark;

            switch (mark.toLowerCase()) {
                case 'check':
                case 'x':
                    return;
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                    Exception.warn('Invalid mark option specified for plat-checkbox. Defaulting to checkmark.');
            }
        }

        loaded() {
            // check if bound
            var options = this.options.value;

            this.addEventListener(this.element, '$tap', this._onTap.bind(this));
        }

        _onTap(ev: plat.ui.IGestureEvent) {
            var isChecked = !this.isChecked,
                domEvent = plat.acquire(plat.ui.IDomEventInstance),
                element = this.element;

            this.dom.toggleClass(element.firstElementChild, this.checkType);
            (<any>element).checked = isChecked;

            domEvent.initialize(element, 'change');
            domEvent.trigger();

            this.isChecked = isChecked;
        }
    }

    plat.register.control('plat-checkbox', Checkbox);

    export interface ICheckboxOptions {
        mark: string;
    }
}
