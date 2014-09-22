module platui {
    /**
     * @name Slider
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes an HTML5 input[type="range"].
     */
    export class Slider extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name $document
         * @memberof platui.Slider
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
         * @name $utils
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);
        /**
         * @name $animator
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $animator: plat.ui.animations.IAnimator = plat.acquire(__Animator);

        /**
         * @name templateString
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-slider-container">' +
            '<div class="plat-slider-offset">' +
                '<div class="plat-knob"></div>' +
            '</div>' +
        '</div>';
        
        /**
         * @name options
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.ISliderOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<ISliderOptions>;
        
        /**
         * @name value
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The current value of the {@link platui.Slider|Slider}.
         */
        value: number;
        
        /**
         * @name min
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The min value of the {@link platui.Slider|Slider}.
         */
        min: number;
        
        /**
         * @name max
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max value of the {@link platui.Slider|Slider}.
         */
        max: number;
        
        /**
         * @name _slider
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the slider.
         */
        _slider: HTMLElement;
        
        /**
         * @name _knob
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the knob.
         */
        _knob: HTMLElement;
        
        /**
         * @name _lastTouch
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IPoint}
         * 
         * @description
         * The last touch start recorded.
         */
        _lastTouch: plat.ui.IPoint;

        /**
         * @name _maxOffset
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The maximum slider offset.
         */
        _maxOffset: number;

        /**
         * @name _increment
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The slider's pixel based increment value.
         */
        _increment: number;

        /**
         * @name _step
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * Denotes the incremental step value of the {@link platui.Slider|Slider's} value property.
         */
        _step: number;

        /**
         * @name _transition
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The transition direction of this control.
         */
        _transition: string;
        
        /**
         * @name _sliderOffset
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current slider offset.
         */
        _sliderOffset = 0;

        /**
         * @name _loaded
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the slider has already been loaded. Useful for when 
         * the {@link plat.controls.Bind|Bind} tries to set a value.
         */
        _loaded = false;
        /**
         * @name _inTouch
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is currently touching the screen.
         */
        _inTouch = false;
        /**
         * @name _lengthProperty
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes whether we're using height or width as the length of the slider.
         */
        _lengthProperty: string;
        
        /**
         * @name setClasses
         * @memberof platui.Slider
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
            this.dom.addClass(element || this.element, __Slider + ' ' + (className || ''));
        }
        
        /**
         * @name initialize
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * Set the proper classes for the control.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }
        
        /**
         * @name setTemplate
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * Grab the knob element.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var slider = this._slider = <HTMLElement>this.element.firstElementChild.firstElementChild;
            this._knob = <HTMLElement>slider.firstElementChild;
        }
        
        /**
         * @name loaded
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * Determine the button type and apply the proper classes.
         * 
         * @returns {void}
         */
        loaded(): void {
            var dom = this.dom,
                element = this.element,
                $utils = this.$utils,
                isNumber = $utils.isNumber,
                optionObj = this.options || <plat.observable.IObservableProperty<ISliderOptions>>{},
                options = optionObj.value || <ISliderOptions>{},
                optionValue = Number(options.value),
                optionMin = options.min,
                optionMax = options.max,
                step = options.step,
                style = options.style || 'primary',
                transition = this._transition = options.transition || 'right',
                length = this._getLength(transition);

            dom.addClass(element, style + ' ' + transition);

            var bindValue = this.value,
                value = isNumber(bindValue) ? bindValue : isNumber(optionValue) ? optionValue : min,
                min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0,
                max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100;

            // reset value to minimum in case Bind set it to a value
            this.value = min;
            this._maxOffset = length;
            this._step = isNumber(step) ? (step > 0 ? step : 1) : 1;

            if (min >= max) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + __Slider + '\'s" min is greater than or equal to its max. Setting max to min + 1.');
                this.max = min + 1;
            }

            this._setIncrement();
            this._initializeEvents(transition);
            this.setValue(value);
            this._loaded = true;
        }
        
        /**
         * @name setProperty
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the {@link platui.Slider|Slider's} bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any, oldValue?: any): void {
            if (newValue === oldValue || newValue === this.value) {
                return;
            } else if (!this.$utils.isNumber(newValue)) {
                newValue = this.min;
            }

            if (this._loaded) {
                this._setValue(newValue, true, false);
                return;
            }

            this.value = newValue;
        }
        
        /**
         * @name setValue
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * Set the value of the {@link platui.Slider|Slider}.
         * 
         * @param {number} value The value to set the {@link platui.Slider|Slider} to.
         * 
         * @returns {void}
         */
        setValue(value: number): void {
            if (!this.$utils.isNumber(value)) {
                value = this.min;
            }

            this._setValue(value, true, true);
        }
        
        /**
         * @name _touchStart
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Log the first touch.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event object.
         * 
         * @returns {void}
         */
        _touchStart(ev: plat.ui.IGestureEvent): void {
            this._inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        }
        
        /**
         * @name _touchEnd
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Set the new slider offset.
         * 
         * @param {plat.ui.IGestureEvent} ev The $trackend event object.
         * 
         * @returns {void}
         */
        _touchEnd(ev: plat.ui.IGestureEvent): void {
            if (!this._inTouch) {
                return;
            }

            this._inTouch = false;

            var newOffset = this._calculateOffset(ev),
                maxOffset = this._maxOffset || (this._maxOffset = this._getLength(this._transition));
            if (newOffset < 0) {
                this._sliderOffset = 0;
                return;
            } else if (newOffset > maxOffset) {
                this._sliderOffset = maxOffset;
                return;
            }

            this._sliderOffset = newOffset;
        }
        
        /**
         * @name _track
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Track the knob movement.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track event object.
         * 
         * @returns {void}
         */
        _track(ev: plat.ui.IGestureEvent): void {
            var length = this._calculateOffset(ev),
                value: number,
                maxOffset = this._maxOffset || (this._maxOffset = this._getLength(this._transition));

            if (length < 0) {
                value = this.min;
                if (value - this.value >= 0) {
                    return;
                }
                length = 0;
            } else if (length > maxOffset) {
                value = this.max;
                if (value - this.value <= 0) {
                    return;
                }
                length = maxOffset;
            } else {
                value = this._calculateValue(length);
            }

            this._setValue(value, false, true);
            this._slider.style[<any>this._lengthProperty] = length + 'px';
        }

        /**
         * @name _initializeEvents
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Initialize the proper tracking events.
         * 
         * @param {string} transition The transition direction of the control.
         * 
         * @returns {void}
         */
        _initializeEvents(transition: string): void {
            var knob = this._knob,
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
                    Exception.warn('Invalid direction "' + transition + '" for "' + __Slider + '."');
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
         * @name _calculateValue
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the current value based on knob position and slider width.
         * 
         * @param {number} width The current width of the slider.
         * 
         * @returns {number} The current value of the {link platui.Slider|Slider}.
         */
        _calculateValue(width: number): number {
            var increment = this._increment || this._setIncrement(),
                step = this._step;

            return (this.min + Math.round(width / increment / step) * step);
        }
        
        /**
         * @name _calculateKnobPosition
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates knob position based on current value.
         * 
         * @param {number} value The current value of the {link platui.Slider|Slider}.
         * 
         * @returns {number} The current position of the knob in pixels.
         */
        _calculateKnobPosition(value: number): number {
            var increment = this._increment || this._setIncrement();
            return (value - this.min) * increment;
        }
        
        /**
         * @name _calculateOffset
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the new offset of the slider based on the old offset and the distance moved.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track or $trackend event object.
         * 
         * @returns {number} The current position of the knob in pixels.
         */
        _calculateOffset(ev: plat.ui.IGestureEvent): number {
            switch (this._transition) {
                case 'right':
                    return this._sliderOffset + ev.clientX - this._lastTouch.x;
                case 'left':
                    return this._sliderOffset + this._lastTouch.x - ev.clientX;
                case 'up':
                    return this._sliderOffset + this._lastTouch.y - ev.clientY;
                case 'down':
                    return this._sliderOffset + ev.clientY - this._lastTouch.y;
            }
        }
        
        /**
         * @name _getLength
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Gets the property to use for and the current length of the slider.
         * 
         * @param {string} transition The control's transition direction.
         * 
         * @returns {number} The length of the slider.
         */
        _getLength(transition: string): number {
            switch (transition) {
                case 'right':
                case 'left':
                    this._lengthProperty = 'width';
                    return this._slider.parentElement.offsetWidth;
                case 'up':
                case 'down':
                    this._lengthProperty = 'height';
                    return this._slider.parentElement.offsetHeight;
                default:
                    return 0;
            }
        }
        
        /**
         * @name _setIncrement
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the increment for sliding the {link platui.Slider|Slider}.
         * 
         * @returns {number} The slider's increment value.
         */
        _setIncrement(): number {
            return (this._increment = this._maxOffset / (this.max - this.min));
        }
        
        /**
         * @name _setValue
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the value of the {@link platui.Slider|Slider}.
         * 
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * @param {boolean} setProperty Whether or not we need to fire a propertyChanged event.
         * 
         * @returns {void}
         */
        _setValue(newValue: number, setKnob: boolean, setProperty: boolean): void {
            var value = this.value;
            if (newValue === value) {
                return;
            } else if (newValue >= this.max) {
                newValue = this.max;
            } else if (newValue <= this.min) {
                newValue = this.min;
            } else if (Math.abs(newValue - value) < this._step) {
                return;
            }

            this.value = newValue;
            if (setKnob) {
                this._setKnob();
            }

            if (setProperty) {
                this.propertyChanged(newValue, value);
            }
        }
        
        /**
         * @name _setKnob
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Animates and sets the knob position.
         * 
         * @param {number} value? The value to use to calculate the knob position. If no value is 
         * specified, the current {@link platui.Slider|Slider's} value will be used.
         * 
         * @returns {void}
         */
        _setKnob(value?: number): void {
            var animationOptions: plat.IObject<string> = {},
                length = this._calculateKnobPosition((value || this.value));

            animationOptions[this._lengthProperty] = length + 'px';
            this.$animator.animate(this._slider, __Transition, animationOptions);
            this._sliderOffset = length;
        }
    }

    plat.register.control(__Slider, Slider);
    
    /**
     * @name ISliderOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Slider|Slider} control.
     */
    export interface ISliderOptions {
        /**
         * @name style
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The style of {@link platui.Slider|Slider}. 
         * Defaults to "primary".
         * 
         * @remarks
         * - "primary"
         * - "secondary"
         */
        style?: string;
        
        /**
         * @name transition
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The transition direction of the {@link platui.Slider|Slider}. 
         * Defaults to "right".
         * 
         * @remarks
         * - "right" - the minimum is all the way to the left and the maximum is all the way to the right.
         * - "left" - the minimum is all the way to the right and the maximum is all the way to the left.
         * - "up" - the minimum is at the bottom and the maximum is at the top.
         * - "down" - the minimum is at the top and the maximum is at the bottom.
         */
        transition?: string;
        
        /**
         * @name value
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The current value of the {@link platui.Slider|Slider}.
         */
        value?: number;
        
        /**
         * @name min
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The min value of the {@link platui.Slider|Slider}.
         */
        min?: number;
        
        /**
         * @name max
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max value of the {@link platui.Slider|Slider}.
         */
        max?: number;

        /**
         * @name step
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The incremental step value of the {@link platui.Slider|Slider}.
         */
        step?: number;
    }
}
