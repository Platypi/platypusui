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
            //'<div class="indicator"></div>' +
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
        setTemplate(): void {
            var slider = this._sliderElement = <HTMLElement>this.element.firstElementChild.firstElementChild;
            this._knobElement = <HTMLElement>slider.firstElementChild;
        }

        /**
         * Determine the button type and apply the proper classes.
         */
        loaded(): void {
            var dom = this.dom,
                element = this.element,
                optionObj = this.options || <plat.observable.IObservableProperty<IRangeOptions>>{},
                options = optionObj.value || <IRangeOptions>{},
                type = options.type || 'primary',
                direction = options.direction || 'right';

            dom.addClass(element, type);
            dom.addClass(element, direction);
            this._initializeEvents(direction);
        }

        /**
         * Initialize the proper tracking events.
         */
        _initializeEvents(direction: string): void {
            var knob = this._knobElement,
                trackBack: string,
                trackForward: string;

            switch (direction) {
                case 'right':
                    trackBack = __$track + 'left';
                    trackForward = __$track + 'right';
                    break;
                case 'left':
                    trackBack = __$track + 'right';
                    trackForward = __$track + 'left';
                    break;
                case 'up':
                    trackBack = __$track + 'down';
                    trackForward = __$track + 'up';
                    break;
                case 'down':
                    trackBack = __$track + 'up';
                    trackForward = __$track + 'down';
                    break;
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    Exception.warn('Invalid direction "' + direction + '" for "' + __Range + '."');
                    return;
            }

            this.addEventListener(knob, trackBack, this._trackBack, false);
            this.addEventListener(knob, trackForward, this._trackForward, false);
        }

        /**
         * Track the backwards knob movement.
         * 
         * @param ev The $track event object.
         */
        _trackBack(ev: plat.ui.IGestureEvent): void {

        }

        /**
         * Track the forwards knob movement.
         * 
         * @param ev The $track event object.
         */
        _trackForward(ev: plat.ui.IGestureEvent): void {

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

        /**
         * The direction of the range.
         */
        direction: string;
    }
}
