module platui {
    /**
     * A Template Control that standardizes an HTML5 input[type="range"].
     */
    export class Range extends plat.ui.BindablePropertyControl implements IUIControl {
        $document: Document = plat.acquire(__Document);
        $utils: plat.IUtils = plat.acquire(__Utils);
        $animator: plat.ui.IAnimator = plat.acquire(__Animator);

        /**
         * The template string for the Range control.
         */
        templateString =
        '<div class="plat-range-container">' +
            '<div class="slider">' +
                '<div class="knob"></div>' +
            '</div>' +
        '</div>';

        /**
         * The plat-options for the Button.
         */
        options: plat.observable.IObservableProperty<IRangeOptions>;

        /**
         * The current value of the range.
         */
        value: number;

        /**
         * The min value of the range.
         */
        min: number;

        /**
         * The max value of the range.
         */
        max: number;

        /**
         * The HTMLElement representing the slider.
         */
        _sliderElement: HTMLElement;

        /**
         * The HTMLElement representing the knob.
         */
        _knobElement: HTMLElement;

        /**
         * The last touch start recorded.
         */
        _lastTouch: plat.ui.IPoint;

        private __sliderOffset = 0;
        private __maxOffset: number;
        private __increment: number;
        private __loaded = false;
        private __inTouch = false;
        private __usingBind: boolean;
        private __transition: string;
        private __lengthProperty: string;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Range);

            if (this.$utils.isString(className)) {
                dom.addClass(element, className);
            }
        }

        /**
         * Check if using context or using bind.
         */
        initialize(): void {
            var element = this.element;
            this.__usingBind = element.hasAttribute(__Bind) || element.hasAttribute('data-' + __Bind);
            this.setClasses();
        }

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
                $utils = this.$utils,
                isNumber = $utils.isNumber,
                optionObj = this.options || <plat.observable.IObservableProperty<IRangeOptions>>{},
                options = optionObj.value || <IRangeOptions>{},
                optionValue = Number(options.value),
                optionMin = options.min,
                optionMax = options.max,
                type = options.type || 'primary',
                transition = this.__transition = options.transition || 'right',
                length = this.__getLength(transition);

            dom.addClass(element, type);
            dom.addClass(element, transition);

            var bindValue = this.value,
                value = isNumber(bindValue) ? bindValue : isNumber(optionValue) ? optionValue : min,
                min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0,
                max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100;

            // reset value to minimum in case Bind set it to a value
            this.value = min;
            this.__maxOffset = length;

            if (min >= max) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + __Range + '\'s" min is greater than or equal to its max. Setting max to min + 1.');
                this.max = min + 1;
                return;
            }

            this.__increment = length / (max - min);
            this._initializeEvents(transition);
            this.setValue(value);
            this.__loaded = true;
        }

        /**
         * The function called when the Range's bindable property is set externally.
         * 
         * @param newValue The new value of the bindable property.
         * @param oldValue The old value of the bindable property.
         */
        setProperty(newValue: any, oldValue?: any): void {
            if (newValue === oldValue || newValue === this.value) {
                return;
            } else if (!this.$utils.isNumber(newValue)) {
                newValue = this.min;
            }

            if (this.__loaded) {
                this.__setValue(newValue, true, false);
                return;
            }

            this.value = newValue;
        }

        /**
         * Set the value of the range.
         * 
         * @param value The value to set the Range to.
         */
        setValue(value: number): void {
            if (!this.$utils.isNumber(value)) {
                value = this.min;
            }

            this.__setValue(value, true, true);
        }

        /**
         * Initialize the proper tracking events.
         * 
         * @param transition The transition direction specified 
         * in the plat-options.
         */
        _initializeEvents(transition: string): void {
            var knob = this._knobElement,
                trackBack: string,
                trackForward: string,
                track: EventListener = this._track;

            switch (transition) {
                case 'right':
                    trackBack = __$track + 'left';
                    trackForward = __$track + 'right';
                    track = this._track;
                    break;
                case 'left':
                    trackBack = __$track + 'right';
                    trackForward = __$track + 'left';
                    track = this._track;
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
                    Exception.warn('Invalid direction "' + transition + '" for "' + __Range + '."');
                    return;
            }

            this.addEventListener(knob, __$touchstart, this._touchStart, false);
            this.addEventListener(knob, trackBack, track, false);
            this.addEventListener(knob, trackForward, track, false);

            var touchEnd = this._touchEnd;
            this.addEventListener(knob, __$trackend, touchEnd, false);
            this.addEventListener(knob, __$touchend, touchEnd, false);
        }

        /**
         * Log the first touch.
         * 
         * @param ev The touch event object.
         */
        _touchStart(ev: plat.ui.IGestureEvent): void {
            this.__inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        }

        /**
         * Set the new slider offset.
         * 
         * @param ev The $track event object.
         */
        _touchEnd(ev: plat.ui.IGestureEvent): void {
            if (!this.__inTouch) {
                return;
            }

            this.__inTouch = false;

            var newOffset = this.__calculateOffset(ev);
            if (newOffset < 0) {
                this.__sliderOffset = 0;
                return;
            } else if (newOffset > this.__maxOffset) {
                this.__sliderOffset = this.__maxOffset;
                return;
            }

            this.__sliderOffset = newOffset;
        }

        /**
         * Track the knob movement.
         * 
         * @param ev The $track event object.
         */
        _track(ev: plat.ui.IGestureEvent): void {
            var length = this.__calculateOffset(ev),
                value: number;

            if (length < 0) {
                value = this.min;
                if (value - this.value >= 0) {
                    return;
                }
                length = 0;
            } else if (length > this.__maxOffset) {
                value = this.max;
                if (value - this.value <= 0) {
                    return;
                }
                length = this.__maxOffset;
            } else {
                value = this.__calculateValue(length);
            }

            this.__setValue(value, false, true);
            this._sliderElement.style[<any>this.__lengthProperty] = length + 'px';
        }

        private __calculateValue(width: number): number {
            return (this.min + Math.round(width / this.__increment));
        }

        private __calculateKnobPosition(value: number): number {
            return (value - this.min) * this.__increment;
        }

        private __calculateOffset(ev: plat.ui.IGestureEvent): number {
            switch (this.__transition) {
                case 'right':
                    return this.__sliderOffset + ev.clientX - this._lastTouch.x;
                case 'left':
                    return this.__sliderOffset + this._lastTouch.x - ev.clientX;
                case 'up':
                    return this.__sliderOffset + this._lastTouch.y - ev.clientY;
                case 'down':
                    return this.__sliderOffset + ev.clientY - this._lastTouch.y;
            }
        }

        private __getLength(transition: string): number {
            switch (transition) {
                case 'right':
                case 'left':
                    this.__lengthProperty = 'width';
                    return this._sliderElement.parentElement.offsetWidth;
                case 'up':
                case 'down':
                    this.__lengthProperty = 'height';
                    return this._sliderElement.parentElement.offsetHeight;
                default:
                    return 0;
            }
        }

        private __setValue(newValue: number, setKnob: boolean, setProperty: boolean): void {
            var value = this.value;
            if (newValue === value) {
                return;
            } else if (newValue > this.max) {
                newValue = this.max;
            } else if (newValue < this.min) {
                newValue = this.min;
            }

            this.value = newValue;
            if (setKnob) {
                this.__setKnob(newValue);
            }

            if (setProperty) {
                this.propertyChanged(newValue, value);
            }
        }

        private __setKnob(value: number): void {
            var animationOptions: plat.IObject<string> = {},
                length = this.__calculateKnobPosition(value);

            animationOptions[this.__lengthProperty] = length + 'px';
            this.$animator.animate(this._sliderElement, __Transition, animationOptions);
            this.__sliderOffset = length;
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
        transition: string;

        /**
         * The current value of the range.
         */
        value: number;

        /**
         * The min value of the range.
         */
        min: number;

        /**
         * The max value of the range.
         */
        max: number;
    }
}
