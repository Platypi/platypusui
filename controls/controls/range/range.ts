module platui {
    /**
     * A Template Control that standardizes an HTML5 input[type="range"].
     */
    export class Range extends plat.ui.BindablePropertyControl {
        /**
         * The template string for the Range control.
         */
        templateString =
        '<div class="plat-range-container">' +
            '<div class="slider">' +
                '<div class="knob"></div>' +
            '</div>' +
            '<div class="indicator"></div>' +
        '</div>';

        /**
         * The plat-options for the Button.
         */
        options: plat.observable.IObservableProperty<IRangeOptions>;

        /**
         * The HTMLElement representing the slider.
         */
        _sliderElement: HTMLElement;

        /**
         * The HTMLElement representing the knob.
         */
        _knobElement: HTMLElement;

        /**
         * Grab the knob element.
         */
        initialize(): void {
            var slider = this._sliderElement = <HTMLElement>this.element.firstElementChild.firstElementChild;
            this._knobElement = <HTMLElement>slider.firstElementChild;
        }

        /**
         * Determine the button type and apply the proper classes.
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IRangeOptions>>{},
                options = optionObj.value || <IRangeOptions>{},
                type = options.type || 'primary';

            this.dom.addClass(this.element, type);
        }
    }

    plat.register.control(__Range, Range);

    /**
     * An interface defining the plat-options for the Range control.
     */
    export interface IRangeOptions {
        /**
         * The type of range.
         */
        type: string;
    }
}
