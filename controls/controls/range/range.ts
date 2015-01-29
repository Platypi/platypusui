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
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that allows for a lower and upper value, 
     * thus creating a variable range of values.
     */
    export class Range extends plat.ui.TemplateControl implements IUIControl {
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
        '<div class="plat-range-container">\n' +
        '    <div class="plat-slider-offset">\n' +
        '        <div class="plat-lower-knob"></div>\n' +
        '        <div class="plat-upper-knob"></div>\n' +
        '    </div>\n' +
        '</div>\n';

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
         * @name _window
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        protected _window: Window = plat.acquire(__Window);

        /**
         * @name _document
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document = plat.acquire(__Document);

        /**
         * @name _utils
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.Utils|Utils} injectable.
         */
        protected _utils: plat.Utils = plat.acquire(__Utils);

        /**
         * @name _animator
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.Animator|Animator} injectable.
         */
        protected _animator: plat.ui.animations.Animator = plat.acquire(__Animator);

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
        protected _slider: HTMLElement;

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
        protected _lowerKnob: HTMLElement;

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
        protected _upperKnob: HTMLElement;

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
        protected _lastTouch: IKnobPosition;

        /**
         * @name _maxOffset
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The maximum slider element offset.
         */
        protected _maxOffset: number;

        /**
         * @name _increment
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The slider element's pixel based increment value.
         */
        protected _increment: number;

        /**
         * @name _step
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * Denotes the incremental step value of the {@link platui.Range|Range's} value property.
         */
        protected _step: number;

        /**
         * @name _orientation
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The orientation of this control.
         */
        protected _orientation: string;

        /**
         * @name _reversed
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the upper and lower knobs have been _reversed.
         */
        protected _reversed: boolean;

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
        protected _lowerKnobOffset: number;

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
        protected _upperKnobOffset: number;

        /**
         * @name _lengthProperty
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes whether we're using height or width as the length of the sliding element.
         */
        protected _lengthProperty: string;

        /**
         * @name _positionProperty
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes whether we're using left, right, top, or bottom as the position of the sliding element.
         */
        protected _positionProperty: string;

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
        protected _isSelf = false;

        /**
         * @name _cloneAttempts
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current number of times we checked to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _cloneAttempts = 0;

        /**
         * @name _maxCloneCount
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * The max number of times we'll check to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _maxCloneAttempts = 25;

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
                _utils = this._utils;
            if (!_utils.isObject(context)) {
                var _Exception = this._Exception;
                _Exception.warn('"' + this.type + '\'s" context should be an object that implements the platui.IRangeContext interface.',
                    _Exception.CONTEXT);
                return;
            }

            var lower = context.lower,
                upper = context.upper,
                isNumber = _utils.isNumber;

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
                element = this.element,
                slider = this._slider = <HTMLElement>element.firstElementChild.firstElementChild,
                _utils = this._utils,
                isNumber = _utils.isNumber,
                optionObj = this.options || <plat.observable.IObservableProperty<IRangeOptions>>{},
                options = optionObj.value || <IRangeOptions>{},
                optionLower = Number(options.lower),
                optionUpper = Number(options.upper),
                optionMin = options.min,
                optionMax = options.max,
                step = options.step,
                orientation = this._orientation = options.orientation || 'horizontal',
                reversed = this._reversed = (options.reverse === true),
                contextLower = context.lower,
                contextUpper = context.upper,
                min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0,
                max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100,
                lower = isNumber(contextLower) ? contextLower : isNumber(optionLower) ? optionLower : min,
                upper = isNumber(contextUpper) ? contextUpper : isNumber(optionUpper) ? optionUpper : max,
                className = __Plat + orientation,
                _Exception: plat.IExceptionStatic;

            this._lowerKnob = <HTMLElement>slider.firstElementChild;
            this._upperKnob = <HTMLElement>slider.lastElementChild;

            // if it's a reversed direction, swap knobs.
            if (reversed) {
                var lowerKnob = this._lowerKnob;
                this._lowerKnob = this._upperKnob;
                this._upperKnob = lowerKnob;
                className += __Reversed;
            }

            this.dom.addClass(element, className);

            // reset value to minimum in case context is already set to a value
            this.lower = min;
            this.upper = max;
            this._step = isNumber(step) ? (step > 0 ? step : 1) : 1;

            if (min >= max) {
                _Exception = this._Exception;
                _Exception.warn('"' + this.type + '\'s" min is greater than or equal to its max. Setting max to min + 1.',
                    _Exception.CONTROL);
                this.max = min + 1;
            }

            this._setPositionAndLength();
            this._setIncrement();
            this._setLowerKnob(min);
            this._initializeEvents(orientation);

            if (!_utils.isObject(this.context)) {
                _Exception = this._Exception;
                _Exception.warn('"' + this.type + '\'s" context should be an object that implements the platui.IRangeContext interface.',
                    _Exception.CONTROL);
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
            var _utils = this._utils,
                isNumber = _utils.isNumber;

            if (!_utils.isObject(this.context)) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set the lower value of a "' + this.type + '" whose context has ' +
                    'not yet been set to an object.', _Exception.CONTROL);
                return;
            } else if (!isNumber(value)) {
                var numberVal = Number(value);
                if (isNumber(numberVal)) {
                    value = numberVal;
                } else {
                    return;
                }
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
            var _utils = this._utils,
                isNumber = _utils.isNumber;

            if (!_utils.isObject(this.context)) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set the upper value of a "' + this.type + '" whose context has ' +
                    'not yet been set to an object.', _Exception.CONTROL);
                return;
            } else if (!isNumber(value)) {
                var numberVal = Number(value);
                if (isNumber(numberVal)) {
                    value = numberVal;
                } else {
                    return;
                }
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
        protected _watchContext(): void {
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
         * @param {string} orientation The orientation of the control.
         * 
         * @returns {void}
         */
        protected _initializeEvents(orientation: string): void {
            var lowerKnob = this._lowerKnob,
                upperKnob = this._upperKnob,
                touchstart = this._touchStart,
                touchEnd = this._touchEnd,
                trackLower = this._trackLower,
                trackUpper = this._trackUpper,
                track: string,
                reverseTrack: string;

            switch (orientation) {
                case 'horizontal':
                    track = __$track + 'right';
                    reverseTrack = __$track + 'left';
                    break;
                case 'vertical':
                    track = __$track + 'down';
                    reverseTrack = __$track + 'up';
                    break;
                default:
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
            this.addEventListener(this._window, 'resize', () => {
                this._setPositionAndLength();
                this._setIncrement();
                this._setLowerKnob();
                this._setUpperKnob();
            }, false);
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
        protected _touchStart(ev: plat.ui.IGestureEvent): void {
            if (ev.touches.length > 1) {
                return;
            }

            var target = <HTMLElement>ev.currentTarget,
                lastTouch = this._lastTouch;
            if (!this._utils.isNull(lastTouch)) {
                if (lastTouch.target !== target) {
                    lastTouch.target.style.zIndex = '0';
                    target.style.zIndex = '1';
                }
            } else {
                target.style.zIndex = '1';
            }

            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY,
                value: target === this._lowerKnob ? this.lower : this.upper,
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
         * Set the new slider element offset.
         * 
         * @param {plat.ui.IGestureEvent} ev The $trackend event object.
         * 
         * @returns {void}
         */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void {
            var lastTouch = this._lastTouch,
                target = ev.currentTarget;

            if (this._utils.isNull(lastTouch) || (lastTouch.target !== target)) {
                return;
            }

            var isLower = target === this._lowerKnob,
                newOffset = this._calculateOffset(ev, isLower);

            if (isLower) {
                if (lastTouch.value !== this.lower) {
                    this._trigger('change');
                }
            } else if (lastTouch.value !== this.upper) {
                this._trigger('change');
            }

            this._setOffset(newOffset, isLower);
        }

        /**
         * @name _setOffset
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the designated knob element's offset to the given value.
         * 
         * @param {number} offset The new offset.
         * @param {boolean} isLower Whether we're setting the lower or upper knob.
         * 
         * @returns {number} The new upper offset.
         */
        protected _setOffset(offset: number, isLower: boolean): number {
            var maxOffset = this._maxOffset;

            if (offset < 0) {
                return isLower ? (this._lowerKnobOffset = 0) :
                    (this._upperKnobOffset = 0);
            } else if (offset > maxOffset) {
                return isLower ? (this._lowerKnobOffset = maxOffset) :
                    (this._upperKnobOffset = maxOffset);
            }

            return isLower ? (this._lowerKnobOffset = offset) :
                (this._upperKnobOffset = offset);
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
        protected _trackLower(ev: plat.ui.IGestureEvent): void {
            var maxOffset = this._maxOffset,
                position = this._calculateOffset(ev, true),
                value: number;

            if (position <= 0) {
                value = this.min;
                if (value - this.lower >= 0) {
                    value = null;
                }
                position = 0;
            } else if (position >= maxOffset) {
                value = this.max;
                if (value - this.lower <= 0) {
                    value = null;
                }
                position = maxOffset;
            } else {
                value = this._calculateValue(position);
                if (value - this.lower === 0) {
                    value = null;
                }
            }

            if (position > this._upperKnobOffset) {
                this._positionTogether(position, value);
                this._setOffset(position, false);
                return;
            }

            this._positionLower(position, value);
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
        protected _trackUpper(ev: plat.ui.IGestureEvent): void {
            var maxOffset = this._maxOffset,
                position = this._calculateOffset(ev, false),
                value: number;

            if (position <= 0) {
                value = this.min;
                if (value - this.upper >= 0) {
                    value = null;
                }
                position = 0;
            } else if (position >= maxOffset) {
                value = this.max;
                if (value - this.upper <= 0) {
                    value = null;
                }
                position = maxOffset;
            } else {
                value = this._calculateValue(position);
                if (value - this.upper === 0) {
                    value = null;
                }
            }

            if (position < this._lowerKnobOffset) {
                this._positionTogether(position, value);
                this._setOffset(position, true);
                return;
            }

            this._positionUpper(position, value);
        }

        /**
         * @name _positionLower
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Positions the slider element and adjusts it's length to account 
         * for lower knob movement.
         * 
         * @param {number} position The new position of the lower knob.
         * @param {number} value? The new value to set if specified.
         * 
         * @returns {void}
         */
        protected _positionLower(position: number, value?: number): void {
            this._utils.requestAnimationFrame(() => {
                var style = this._slider.style;
                style[<any>this._positionProperty] = position + 'px';
                style[<any>this._lengthProperty] = (this._upperKnobOffset - position) + 'px';

                if (value === null) {
                    return;
                }

                this._setLower(value, false);
            });
        }

        /**
         * @name _positionUpper
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Positions the slider element and adjusts it's length to account 
         * for upper knob movement.
         * 
         * @param {number} position The new position of the upper knob.
         * @param {number} value? The new value to set if specified.
         * 
         * @returns {void}
         */
        protected _positionUpper(position: number, value?: number): void {
            this._utils.requestAnimationFrame(() => {
                this._slider.style[<any>this._lengthProperty] = (position - this._lowerKnobOffset) + 'px';

                if (value === null) {
                    return;
                }

                this._setUpper(value, false);
            });
        }

        /**
         * @name _positionTogether
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Positions the slider element and adjusts it's length to account 
         * for synchronized knob movement.
         * 
         * @param {number} position The new position of the knobs.
         * @param {number} value? The new value to set if specified.
         * 
         * @returns {void}
         */
        protected _positionTogether(position: number, value?: number): void {
            this._utils.requestAnimationFrame(() => {
                var style = this._slider.style;
                style[<any>this._positionProperty] = position + 'px';
                style[<any>this._lengthProperty] = '0px';

                if (value === null) {
                    return;
                }

                this._setLower(value, false, false);
                this._setUpper(value, false);
            });
        }

        /**
         * @name _calculateValue
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the current value based on knob position and slider element width.
         * 
         * @param {number} width The current width of the slider element.
         * 
         * @returns {number} The current value of the {link platui.Range|Range}.
         */
        protected _calculateValue(width: number): number {
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
         * Calculates the new offset of the slider element based on the old offset and the distance moved.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track or $trackend event object.
         * @param {boolean} isLower Whether the current knob is the lower or the upper knob.
         * 
         * @returns {number} The current position of the knob in pixels.
         */
        protected _calculateOffset(ev: plat.ui.IGestureEvent, isLower: boolean): number {
            var currentOffset = isLower ? this._lowerKnobOffset : this._upperKnobOffset,
                displacement: number;

            if (this._orientation === 'vertical') {
                displacement = this._reversed ? ev.clientY - this._lastTouch.y : this._lastTouch.y - ev.clientY;
            } else {
                displacement = this._reversed ? this._lastTouch.x - ev.clientX : ev.clientX - this._lastTouch.x;
            }

            return currentOffset + displacement;
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
         * @param {number} value The current value of the {link platui.Range|Range}.
         * 
         * @returns {number} The current position of the knob in pixels.
         */
        protected _calculateKnobPosition(value: number): number {
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
         * @param {boolean} trigger Whether or not to trigger the 'input' event. Defaults to true.
         * 
         * @returns {void}
         */
        protected _setLower(newValue: number, setKnob: boolean, trigger?: boolean): void {
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
            } else if (Math.abs(newValue - lower) < this._step) {
                return;
            }

            this._isSelf = true;
            this.lower = context.lower = newValue;
            this._isSelf = false;
            if (setKnob) {
                this._setLowerKnob();
            }

            if (trigger === false) {
                return;
            }

            this._trigger('input');
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
         * @param {boolean} trigger? Whether or not to trigger the 'input' event. Defaults to true.
         * 
         * @returns {void}
         */
        protected _setUpper(newValue: number, setKnob: boolean, trigger?: boolean): void {
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
            } else if (Math.abs(newValue - upper) < this._step) {
                return;
            }

            this._isSelf = true;
            this.upper = context.upper = newValue;
            this._isSelf = false;
            if (setKnob) {
                this._setUpperKnob();
            }

            if (trigger === false) {
                return;
            }

            this._trigger('input');
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
         * @returns {number} The slider element's increment value.
         */
        protected _setIncrement(): number {
            return (this._increment = this._maxOffset / (this.max - this.min));
        }

        /**
         * @name _setPositionAndLength
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the properties to use for length and position and sets the max length of the sliding element.
         * 
         * @param {HTMLElement} element? The element to base the length off of.
         * 
         * @returns {void}
         */
        protected _setPositionAndLength(element?: HTMLElement): void {
            var isNode = this._utils.isNode(element),
                el = isNode ? element : this._slider.parentElement;

            switch (this._orientation) {
                case 'horizontal':
                    this._lengthProperty = 'width';
                    this._positionProperty = this._reversed ? 'right' : 'left';
                    this._maxOffset = el.offsetWidth;
                    break;
                case 'vertical':
                    this._lengthProperty = 'height';
                    this._positionProperty = this._reversed ? 'top' : 'bottom';
                    this._maxOffset = el.offsetHeight;
                    break;
                default:
                    var _Exception = this._Exception;
                    _Exception.warn('Invalid orientation "' + this._orientation + '" for "' + this.type + '."', _Exception.CONTROL);
                    return;
            }

            if (!(isNode || this._maxOffset)) {
                this._setOffsetWithClone(this._lengthProperty);
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
         * specified, the current {@link platui.Range|Range's} value will be used.
         * 
         * @returns {void}
         */
        protected _setLowerKnob(value?: number): void {
            var animationOptions: plat.IObject<string> = {},
                upperKnobOffset = this._upperKnobOffset,
                upperOffset = this._utils.isNumber(upperKnobOffset) ? upperKnobOffset :
                this._setOffset(this._calculateKnobPosition(this.upper), false),
                position = this._calculateKnobPosition((value || this.lower));

            if (position === this._lowerKnobOffset) {
                return;
            }

            animationOptions[this._positionProperty] = position + 'px';
            animationOptions[this._lengthProperty] = (upperOffset - position) + 'px';
            this._animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
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
         * specified, the current {@link platui.Range|Range's} value will be used.
         * 
         * @returns {void}
         */
        protected _setUpperKnob(value?: number): void {
            var animationOptions: plat.IObject<string> = {},
                length = this._calculateKnobPosition((value || this.upper));

            if (length === this._upperKnobOffset) {
                return;
            }

            animationOptions[this._lengthProperty] = (length - this._lowerKnobOffset) + 'px';
            this._animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._upperKnobOffset = length;
        }

        /**
         * @name _trigger
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Triggers an event starting from this control's element.
         * 
         * @param {string} event The event name to trigger.
         * 
         * @returns {void}
         */
        protected _trigger(event: string): void {
            var domEvent: plat.ui.DomEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
            domEvent.trigger();
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
         * @param {string} dependencyProperty The property that the offset is being based off of.
         *
         * @returns {void}
         */
        protected _setOffsetWithClone(dependencyProperty: string): void {
            var element = this.element,
                body = this._document.body;

            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var _Exception = this._Exception,
                        type = this.type;
                    _Exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' +
                        'DOM. Disposing of the ' + type + '.', _Exception.CONTROL);
                    (<plat.ui.ITemplateControlFactory>plat.acquire(__TemplateControlFactory)).dispose(this);
                    return;
                }

                this._utils.defer(this._setOffsetWithClone, 10, [dependencyProperty], this);
                return;
            }

            this._cloneAttempts = 0;

            var clone = <HTMLElement>element.cloneNode(true),
                regex = /\d+(?!\d+|%)/,
                _window = this._window,
                parentChain = <Array<HTMLElement>>[],
                shallowCopy = clone,
                computedStyle: CSSStyleDeclaration,
                dependencyValue: string;

            shallowCopy.id = '';
            while (!regex.test((dependencyValue = (computedStyle = (<any>_window.getComputedStyle(element)))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, 'important');
                element = element.parentElement;
                shallowCopy = <HTMLElement>element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }

            if (parentChain.length > 0) {
                var curr = parentChain.pop(),
                    currStyle = curr.style,
                    temp: HTMLElement;

                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }

                curr.insertBefore(clone, null);
            }

            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, 'important');
            shallowStyle.setProperty('visibility', 'hidden', 'important');
            body.appendChild(shallowCopy);
            this._setPositionAndLength(<HTMLElement>clone.firstElementChild);
            body.removeChild(shallowCopy);
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
         * @name orientation
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The orientation of the {@link platui.Range|Range}. 
         * Defaults to "horizontal".
         * 
         * @remarks
         * - "horizontal" - horizontal control.
         * - "vertical" - vertical control.
         */
        orientation?: string;

        /**
         * @name reverse
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the upper and lower knobs of the {@link platui.Range|Range} are reversed. 
         * Defaults to false.
         */
        reverse?: boolean;

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
     * @extends {platui.IValuePoint}
     * 
     * @description
     * A point representing a potential knob position.
     */
    export interface IKnobPosition extends IValuePoint {
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
