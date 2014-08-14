module platui {
    export class ProgressBar extends plat.ui.BindablePropertyControl {
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * The ProgressBar's template string.
         */
        templateString =
        '<div class="plat-progress-container">' +
            '<div class="bar"></div>' +
        '</div>';

        /**
         * The animated bar element.
         */
        _barElement: HTMLElement;

        /**
         * The max value of the bar.
         */
        _barMax: number;

        private __usingPlatBind = false;

        /**
         * Animates the bar on a context changed.
         */
        contextChanged(): void {
            if (this.__usingPlatBind) {
                return;
            }

            this._animateBar();
        }

        /**
         * Checks to make sure the context is correctly set or a plat-bind is being used, 
         * then does the initial animation of the bar.
         */
        loaded(): void {
            var context = this.context,
                element = this.element,
                usingPlatBind = element.hasAttribute(__Bind) || element.hasAttribute('data-' + __Bind);

            if ((!this.$utils.isNumber(context) || context > 1 || context < 0) && !usingPlatBind) {
                var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                Exception.warn('The context of a "' + __ProgressBar + '" control must be a number between 0 and 1, ' +
                    'or a "' + __Bind + '" control must be used.');
                return;
            }

            var barParent = <HTMLElement>element.firstElementChild;
            this._barMax = barParent.offsetWidth;
            this._barElement = <HTMLElement>barParent.firstElementChild;
            this.__usingPlatBind = usingPlatBind;
            if (usingPlatBind) {
                return;
            }

            this._animateBar();
        }

        /**
         * The function called when the bindable property is set externally.
         * 
         * @param newValue The new value of the bindable property.
         * @param oldValue The old value of the bindable property.
         * @param setProperty A boolean value indicating whether we should set 
         * the property if we need to toggle the check mark value.
         */
        setProperty(newValue: any, oldValue?: any, setProperty?: boolean): void {
            if (newValue === oldValue) {
                return;
            }

            this._animateBar(newValue);
        }

        /**
         * Animates the progress bar element.
         */
        _animateBar(value?: boolean): void {
            var barValue = value || this.context,
                barElement = this._barElement || <HTMLElement>this.element.firstElementChild.firstElementChild,
                barMax = this._barMax || barElement.parentElement.offsetWidth;

            barElement.style.width = Math.ceil(barMax * barValue) + 'px';
        }
    }

    plat.register.control(__ProgressBar, ProgressBar);
}
