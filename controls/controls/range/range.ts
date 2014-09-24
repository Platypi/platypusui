module platui {
    /**
     * @name Range
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An extension of the {@link platui.Range|Range} control that allows for a lower and upper value, 
     * thus creating a variable range of values.
     */
    export class Range extends plat.ui.TemplateControl implements IUIControl {
        /**
         * @name $document
         * @memberof platui.Range
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
         * @memberof platui.Range
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
         * @memberof platui.Range
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
         * @name context
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {platui.IRangeContext}
         * 
         * @description
         * The specifically defined context for this control.
         */
        context: IRangeContext;

        /**
         * @name templateString
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-range-container">' +
            '<div class="plat-slider-offset">' +
                '<div class="plat-lower-knob"></div>' +
                '<div class="plat-upper-knob"></div>' +
            '</div>' +
        '</div>';

        /**
         * @name options
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IRangeOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IRangeOptions>;

        /**
         * @name lower
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The current lower value of the {@link platui.Range|Range}.
         */
        lower: number;

        /**
         * @name upper
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The current upper value of the {@link platui.Range|Range}.
         */
        upper: number;

        /**
         * @name min
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The min value of the {@link platui.Range|Range}.
         */
        min: number;

        /**
         * @name max
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max value of the {@link platui.Range|Range}.
         */
        max: number;

        /**
         * @name _slider
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the slider element.
         */
        _slider: HTMLElement;

        /**
         * @name _lowerKnob
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the lower knob.
         */
        _lowerKnob: HTMLElement;

        /**
         * @name _upperKnob
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the second knob of the {@link platui.Range|Range}.
         */
        _upperKnob: HTMLElement;

        /**
         * @name _lastTouch
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IPoint}
         * 
         * @description
         * The last touch start recorded.
         */
        _lastTouch: IKnobPosition;

        /**
         * @name _maxOffset
         * @memberof platui.Range
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
         * @memberof platui.Range
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
         * @memberof platui.Range
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
         * @memberof platui.Range
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
         * @name _lowerKnobOffset
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current lower knob offset.
         */
        _lowerKnobOffset: number;

        /**
         * @name _upperKnobOffset
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current upper knob offset.
         */
        _upperKnobOffset: number;

        /**
         * @name _inTouch
         * @memberof platui.Range
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
         * @memberof platui.Range
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
         * @name _positionProperty
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes whether we're using left, right, top, or bottom as the position of the slider.
         */
        _positionProperty: string;
        
        /**
         * @name _isSelf
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value specifying that this control is the one modifying the observed context values.
         */
        _isSelf = false;

        /**
         * @name setClasses
         * @memberof platui.Range
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
            this.dom.addClass(element || this.element, __Range + ' ' + (className || ''));
        }
        
        /**
         * @name contextChanged
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Handles the context object being externally changed.
         * 
         * @returns {void}
         */
        contextChanged(): void {
            var context = this.context,
                $utils = this.$utils;
            if (!$utils.isObject(context)) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + __Range + '\'s" context should be an object that implements the platui.IRangeContext interface.');
                return;
            }

            var lower = context.lower,
                upper = context.upper,
                isNumber = $utils.isNumber;

            this.setLower(isNumber(lower) ? lower : 0);
            this.setUpper(isNumber(upper) ? upper : this.max);
        }

        /**
         * @name initialize
         * @memberof platui.Range
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
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Grab both knob and slider elements.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var rangeContainer = this.element.firstElementChild,
                slider = this._slider = <HTMLElement>rangeContainer.firstElementChild;

            this._lowerKnob = <HTMLElement>slider.firstElementChild;
            this._upperKnob = <HTMLElement>slider.lastElementChild;
        }

        /**
         * @name loaded
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Determine the button type and apply the proper classes.
         * 
         * @returns {void}
         */
        loaded(): void {
            var context = this.context || <IRangeContext>{},
                dom = this.dom,
                element = this.element,
                $utils = this.$utils,
                isNumber = $utils.isNumber,
                optionObj = this.options || <plat.observable.IObservableProperty<ISliderOptions>>{},
                options = optionObj.value || <ISliderOptions>{},
                optionLower = Number(options.lower),
                optionUpper = Number(options.upper),
                optionMin = options.min,
                optionMax = options.max,
                step = options.step,
                style = options.style || 'primary',
                transition = this._transition = options.transition || 'right',
                Exception: plat.IExceptionStatic;

            dom.addClass(element, style + ' ' + transition);

            var contextLower = context.lower,
                contextUpper = context.upper,
                min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0,
                max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100,
                lower = isNumber(contextLower) ? contextLower : isNumber(optionLower) ? optionLower : min,
                upper = isNumber(contextUpper) ? contextUpper : isNumber(optionUpper) ? optionUpper : max;

            // reset value to minimum in case context is already set to a value
            this.lower = min;
            this.upper = max;
            this._step = isNumber(step) ? (step > 0 ? step : 1) : 1;

            if (min >= max) {
                Exception = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + __Range + '\'s" min is greater than or equal to its max. Setting max to min + 1.');
                this.max = min + 1;
            }

            this._setPositionAndLength();

            if (!this._maxOffset) {
                this._setOffsetWithClone();
            }

            this._setLowerKnob(min);
            this._setIncrement();
            this._initializeEvents(transition);

            if (!$utils.isObject(this.context)) {
                Exception = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + __Range + '\'s" context should be an object that implements the platui.IRangeContext interface.');
                return;
            }

            this.setLower(lower);
            this.setUpper(upper);
            this._watchContext();
        }

        /**
         * @name setLower
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Set the lower value of the {@link platui.Range|Range}. If an invalid value is passed in 
         * nothing will happen.
         * 
         * @param {number} value The value to set the {@link platui.Range|Range} to.
         * 
         * @returns {void}
         */
        setLower(value: number): void {
            var $utils = this.$utils;
            if (!$utils.isObject(this.context)) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('Cannot set the lower value of a "' + __Range + '" whose context has ' +
                    'not yet been set to an object.');
                return;
            } else if (!$utils.isNumber(value)) {
                return;
            }

            this._setLower(value, true);
        }

        /**
         * @name setUpper
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Set the upper value of the {@link platui.Range|Range}. If an invalid value is passed in 
         * nothing will happen.
         * 
         * @param {number} value The value to set the {@link platui.Range|Range} to.
         * 
         * @returns {void}
         */
        setUpper(value: number): void {
            var $utils = this.$utils;
            if (!$utils.isObject(this.context)) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('Cannot set the upper value of a "' + __Range + '" whose context has ' +
                    'not yet been set to an object.');
                return;
            } else if (!$utils.isNumber(value)) {
                return;
            }

            this._setUpper(value, true);
        }
        
        /**
         * @name _watchContext
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Observe the necessary context values.
         * 
         * @returns {void}
         */
        _watchContext(): void {
            var context = this.context;
            this.observe(context, 'lower', (newValue: number, oldValue: number) => {
                if (this._isSelf || newValue === oldValue) {
                    return;
                }

                this.setLower(newValue);
            });

            this.observe(context, 'upper', (newValue: number, oldValue: number) => {
                if (this._isSelf || newValue === oldValue) {
                    return;
                }

                this.setUpper(newValue);
            });
        }

        /**
         * @name _initializeEvents
         * @memberof platui.Range
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
            var lowerKnob = this._lowerKnob,
                upperKnob = this._upperKnob,
                track: string,
                reverseTrack: string,
                touchstart = this._touchStart,
                touchEnd = this._touchEnd,
                trackLower = this._trackLower,
                trackUpper = this._trackUpper;

            switch (transition) {
                case 'right':
                case 'left':
                    track = __$track + 'right';
                    reverseTrack = __$track + 'left';
                    break;
                case 'up':
                case 'down':
                    reverseTrack = __$track + 'down';
                    track = __$track + 'up';
                    break;
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    Exception.warn('Invalid direction "' + transition + '" for "' + __Range + '."');
                    return;
            }

            this.addEventListener(lowerKnob, __$touchstart, touchstart, false);
            this.addEventListener(upperKnob, __$touchstart, touchstart, false);
            this.addEventListener(lowerKnob, track, trackLower, false);
            this.addEventListener(lowerKnob, reverseTrack, trackLower, false);
            this.addEventListener(upperKnob, track, trackUpper, false);
            this.addEventListener(upperKnob, reverseTrack, trackUpper, false);
            this.addEventListener(lowerKnob, __$trackend, touchEnd, false);
            this.addEventListener(upperKnob, __$trackend, touchEnd, false);
            this.addEventListener(lowerKnob, __$touchend, touchEnd, false);
            this.addEventListener(upperKnob, __$touchend, touchEnd, false);
        }

        /**
         * @name _touchStart
         * @memberof platui.Range
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
            if (ev.touches.length > 1) {
                return;
            }

            var target = <HTMLElement>ev.currentTarget,
                lastTouch = this._lastTouch;
            if (!this.$utils.isNull(lastTouch)) {
                if (lastTouch.target !== target) {
                    lastTouch.target.style.zIndex = '0';
                    target.style.zIndex = '1';
                }
            } else {
                target.style.zIndex = '1';
            }

            this._inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY,
                target: target
            };
        }

        /**
         * @name _touchEnd
         * @memberof platui.Range
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
            var lastTouch = this._lastTouch,
                target = ev.currentTarget;

            if (!this._inTouch ||
                this.$utils.isNull(lastTouch) ||
                (lastTouch.target !== target)) {
                return;
            }

            this._inTouch = false;

            var isLower = target === this._lowerKnob,
                newOffset = this._calculateOffset(ev, isLower);

            if (isLower) {
                this._setLowerOffset(newOffset);
                return;
            }

            this._setUpperOffset(newOffset);
        }
        
        /**
         * @name _setLowerOffset
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the lower slider's offset to the given value.
         * 
         * @param {number} offset The new offset.
         * 
         * @returns {number} The new lower offset.
         */
        _setLowerOffset(offset: number): number {
            var maxOffset = this._maxOffset || this._setPositionAndLength(),
                upperOffset = this._upperKnobOffset;

            if (offset < 0) {
                return (this._lowerKnobOffset = 0);
            } else if (offset > upperOffset) {
                return (this._lowerKnobOffset = upperOffset);
            }

            return (this._lowerKnobOffset = offset);
        }

        /**
         * @name _setUpperOffset
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the upper slider's offset to the given value.
         * 
         * @param {number} offset The new offset.
         * 
         * @returns {number} The new upper offset.
         */
        _setUpperOffset(offset: number): number {
            var maxOffset = this._maxOffset || this._setPositionAndLength(),
                lowerOffset = this._lowerKnobOffset;

            if (offset > maxOffset) {
                return (this._upperKnobOffset = maxOffset);
            } else if (offset < lowerOffset) {
                return (this._upperKnobOffset = lowerOffset);
            }

            return (this._upperKnobOffset = offset);
        }

        /**
         * @name _trackLower
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Track the lower knob movement.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track event object.
         * 
         * @returns {void}
         */
        _trackLower(ev: plat.ui.IGestureEvent): void {
            var maxOffset = this._maxOffset,
                upperOffset = this._upperKnobOffset,
                position = this._calculateOffset(ev, true),
                value: number;

            if (position < 0) {
                value = this.min;
                if (value - this.lower >= 0) {
                    return;
                }
                position = 0;
            } else if (position >= upperOffset) {
                value = this.upper;
                if (value - this.lower <= 0) {
                    return;
                }
                position = upperOffset;
            } else {
                value = this._calculateValue(position, true);
            }

            var style = this._slider.style;

            this._setLower(value, false);
            style[<any>this._positionProperty] = position + 'px';
            style[<any>this._lengthProperty] = (upperOffset - position) + 'px';
        }

        /**
         * @name _trackUpper
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Track the upper knob movement.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track event object.
         * 
         * @returns {void}
         */
        _trackUpper(ev: plat.ui.IGestureEvent): void {
            var maxOffset = this._maxOffset,
                lowerOffset = this._lowerKnobOffset,
                length = this._calculateOffset(ev, false),
                value: number;

            if (length <= lowerOffset) {
                value = this.lower;
                if (value - this.upper >= 0) {
                    return;
                }
                length = lowerOffset;
            } else if (length > maxOffset) {
                value = this.max;
                if (value - this.upper <= 0) {
                    return;
                }
                length = maxOffset;
            } else {
                value = this._calculateValue(length, false);
            }

            this._setUpper(value, false);
            this._slider.style[<any>this._lengthProperty] = (length - lowerOffset) + 'px';
        }

        /**
         * @name _calculateValue
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the current value based on knob position and slider width.
         * 
         * @param {number} width The current width of the slider.
         * @param {boolean} isLower Whether the current knob is the lower or the upper knob.
         * 
         * @returns {number} The current value of the {link platui.Range|Range}.
         */
        _calculateValue(width: number, isLower: boolean): number {
            var step = this._step;
            return (this.min + Math.round(width / this._increment / step) * step);
        }

        /**
         * @name _calculateOffset
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the new offset of the slider based on the old offset and the distance moved.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track or $trackend event object.
         * @param {boolean} isLower Whether the current knob is the lower or the upper knob.
         * 
         * @returns {number} The current position of the knob in pixels.
         */
        _calculateOffset(ev: plat.ui.IGestureEvent, isLower: boolean): number {
            switch (this._transition) {
                case 'right':
                    return (isLower ? this._lowerKnobOffset : this._upperKnobOffset) + ev.clientX - this._lastTouch.x;
                case 'left':
                    return (isLower ? this._lowerKnobOffset : this._upperKnobOffset) + this._lastTouch.x - ev.clientX;
                case 'up':
                    return (isLower ? this._lowerKnobOffset : this._upperKnobOffset) + this._lastTouch.y - ev.clientY;
                case 'down':
                    return (isLower ? this._lowerKnobOffset : this._upperKnobOffset) + ev.clientY - this._lastTouch.y;
            }

            return 0;
        }

        /**
         * @name _calculateKnobPosition
         * @memberof platui.Range
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
            return (value - this.min) * this._increment;
        }

        /**
         * @name _setLower
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the lower value of the {@link platui.Range|Range}.
         * 
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * 
         * @returns {void}
         */
        _setLower(newValue: number, setKnob: boolean): void {
            var lower = this.lower,
                context = this.context || <IRangeContext>{};

            if (newValue === lower) {
                if (context.lower !== lower) {
                    this._isSelf = true;
                    context.lower = lower;
                    this._isSelf = false;
                }
                return;
            } else if (newValue >= this.max) {
                newValue = this.max;
            } else if (newValue <= this.min) {
                newValue = this.min;
            } else if (newValue >= this.upper) {
                newValue = this.upper;
            } else if (Math.abs(newValue - lower) < this._step) {
                return;
            }

            this._isSelf = true;
            this.lower = context.lower = newValue;
            this._isSelf = false;
            if (setKnob) {
                this._setLowerKnob();
            }
        }

        /**
         * @name _setUpper
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the value of the {@link platui.Range|Range}.
         * 
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * 
         * @returns {void}
         */
        _setUpper(newValue: number, setKnob: boolean): void {
            var upper = this.upper,
                context = this.context || <IRangeContext>{};

            if (newValue === upper) {
                if (context.upper !== upper) {
                    this._isSelf = true;
                    context.upper = upper;
                    this._isSelf = false;
                }
                return;
            } else if (newValue >= this.max) {
                newValue = this.max;
            } else if (newValue <= this.min) {
                newValue = this.min;
            } else if (newValue <= this.lower) {
                newValue = this.lower;
            } else if (Math.abs(newValue - upper) < this._step) {
                return;
            }

            this._isSelf = true;
            this.upper = context.upper = newValue;
            this._isSelf = false;
            if (setKnob) {
                this._setUpperKnob();
            }
        }

        /**
         * @name _setIncrement
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the increment for sliding the {link platui.Range|Range}.
         * 
         * @returns {number} The slider's increment value.
         */
        _setIncrement(): number {
            return (this._increment = this._maxOffset / (this.max - this.min));
        }

        /**
         * @name _setPositionAndLength
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the properties to use for length and position and sets the max length of the slider.
         * 
         * @param {string} transition The control's transition direction.
         * 
         * @returns {number} The length of the slider.
         */
        _setPositionAndLength(element?: HTMLElement): number {
            element = element || this._slider.parentElement;
            switch (this._transition) {
                case 'right':
                    this._positionProperty = 'left';
                    this._lengthProperty = 'width';
                    return (this._maxOffset = element.offsetWidth);
                case 'left':
                    this._positionProperty = 'right';
                    this._lengthProperty = 'width';
                    return (this._maxOffset = element.offsetWidth);
                case 'up':
                    this._positionProperty = 'bottom';
                    this._lengthProperty = 'height';
                    return (this._maxOffset = element.offsetHeight);
                case 'down':
                    this._positionProperty = 'top';
                    this._lengthProperty = 'height';
                    return (this._maxOffset = element.offsetHeight);
                default:
                    return 0;
            }
        }

        /**
         * @name _setLowerKnob
         * @memberof platui.Range
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
        _setLowerKnob(value?: number): void {
            var animationOptions: plat.IObject<string> = {},
                upperKnobOffset = this._upperKnobOffset,
                upperOffset = this.$utils.isNumber(upperKnobOffset) ? upperKnobOffset :
                    this._setUpperOffset(this._calculateKnobPosition(this.upper)),
                position = this._calculateKnobPosition((value || this.lower));

            animationOptions[this._positionProperty] = position + 'px';
            animationOptions[this._lengthProperty] = (upperOffset - position) + 'px';
            this.$animator.animate(this._slider, __Transition, animationOptions);
            this._lowerKnobOffset = position;
        }

        /**
         * @name _setUpperKnob
         * @memberof platui.Range
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
        _setUpperKnob(value?: number): void {
            var animationOptions: plat.IObject<string> = {},
                length = this._calculateKnobPosition((value || this.upper));

            animationOptions[this._lengthProperty] = (length - this._lowerKnobOffset) + 'px';
            this.$animator.animate(this._slider, __Transition, animationOptions);
            this._upperKnobOffset = length;
        }

        /**
         * @name _setOffsetWithClone
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Creates a clone of this element and uses it to find the max offset.
         * 
         * @returns {void}
         */
        _setOffsetWithClone(): void {
            var clone = <HTMLElement>this.element.cloneNode(true),
                style = clone.style,
                body = this.$document.body;

            style.position = 'absolute';
            style.display = 'block';
            style.visibility = 'hidden';
            body.appendChild(clone);
            this._setPositionAndLength(<HTMLElement>clone.firstElementChild);
            body.removeChild(clone);
        }
    }

    plat.register.control(__Range, Range);

    /**
     * @name IRangeOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Range|Range} control.
     */
    export interface IRangeOptions {
        /**
         * @name style
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The style of {@link platui.Range|Range}. 
         * Defaults to "primary".
         * 
         * @remarks
         * - "primary"
         * - "secondary"
         */
        style?: string;

        /**
         * @name transition
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The transition direction of the {@link platui.Range|Range}. 
         * Defaults to "right".
         * 
         * @remarks
         * - "right"/"left" - horizontal control.
         * - "up"/"down" - vertical control.
         */
        transition?: string;

        /**
         * @name lower
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The lower set value of the {@link platui.Range|Range}.
         */
        lower?: number;

        /**
         * @name upper
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The upper set value of the {@link platui.Range|Range}.
         */
        upper?: number;

        /**
         * @name min
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The min value of the {@link platui.Range|Range}.
         */
        min?: number;

        /**
         * @name max
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max value of the {@link platui.Range|Range}.
         */
        max?: number;

        /**
         * @name step
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The incremental step value of the {@link platui.Range|Range}.
         */
        step?: number;
    }
    
    /**
     * @name IRangePoint
     * @memberof platui
     * @kind interface
     * 
     * @description
     * A point representing a potential knob position.
     */
    export interface IKnobPosition extends plat.ui.IPoint {
        /**
         * @name target
         * @memberof platui.IKnobPosition
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The target element located at the x-y coordinate.
         */
        target?: HTMLElement;
    }
    
    /**
     * @name IRangeContext
     * @memberof platui
     * @kind interface
     * 
     * @description
     * Defines the expected context of the {@link platui.Range|Range} control.
     */
    export interface IRangeContext {
        /**
         * @name lower
         * @memberof platui.IRangeContext
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The lower set value of the {@link platui.Range|Range} control.
         */
        lower: number;

        /**
         * @name lower
         * @memberof platui.IRangeContext
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The upper set value of the {@link platui.Range|Range} control.
         */
        upper: number;
    }
}
