﻿module platui {
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
         * @name $window
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        $window: Window = plat.acquire(__Window);
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
        '    <div class="plat-slider-offset">' +
        '        <div class="plat-knob"></div>' +
        '    </div>' +
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
         * @name _knobOffset
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current knob offset.
         */
        _knobOffset = 0;

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
         * @name _cloneAttempts
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current number of times we checked to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        _cloneAttempts = 0;

        /**
         * @name _maxCloneCount
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * The max number of times we'll check to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        _maxCloneAttempts = 25;

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
                slider = this._slider = <HTMLElement>element.firstElementChild.firstElementChild,
                isNumber = this.$utils.isNumber,
                optionObj = this.options || <plat.observable.IObservableProperty<ISliderOptions>>{},
                options = optionObj.value || <ISliderOptions>{},
                optionValue = Number(options.value),
                optionMin = options.min,
                optionMax = options.max,
                step = options.step,
                style = options.style || 'primary',
                transition = this._transition = options.transition || 'right';

            this._knob = <HTMLElement>slider.firstElementChild;
            dom.addClass(element, __Plat + style + ' ' + __Plat + transition);

            var bindValue = this.value,
                min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0,
                max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100,
                value = isNumber(bindValue) ? bindValue : isNumber(optionValue) ? optionValue : min;

            // reset value to minimum in case Bind set it to a value
            this.value = min;
            this._step = isNumber(step) ? (step > 0 ? step : 1) : 1;

            if (min >= max) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + __Slider + '\'s" min is greater than or equal to its max. Setting max to min + 1.');
                this.max = min + 1;
            }

            this._setLength();
            if (!this._maxOffset) {
                this._setOffsetWithClone();
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
         * 
         * @returns {void}
         */
        setProperty(newValue: any): void {
            if (newValue === this.value) {
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
         * Set the value of the {@link platui.Slider|Slider}. If an invalid value is passed in 
         * nothing will happen.
         * 
         * @param {number} value The value to set the {@link platui.Slider|Slider} to.
         * 
         * @returns {void}
         */
        setValue(value: number): void {
            if (!this.$utils.isNumber(value)) {
                return;
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
            var newOffset = this._calculateOffset(ev),
                maxOffset = this._maxOffset;

            if (newOffset < 0) {
                this._knobOffset = 0;
                return;
            } else if (newOffset > maxOffset) {
                this._knobOffset = maxOffset;
                return;
            }

            this._knobOffset = newOffset;
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
                maxOffset = this._maxOffset,
                value: number;

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
                trackFn: EventListener = this._track,
                track: string,
                reverseTrack: string;

            switch (transition) {
                case 'right':
                case 'up':
                    track = __$track + transition;
                    reverseTrack = __$track + __transitionHash[transition];
                    break;
                case 'left':
                case 'down':
                    track = __$track + __transitionHash[transition];
                    reverseTrack = __$track + transition;
                    break;
                default:
                    return;
            }

            this.addEventListener(knob, __$touchstart, this._touchStart, false);
            this.addEventListener(knob, track, trackFn, false);
            this.addEventListener(knob, reverseTrack, trackFn, false);
            this.addEventListener(knob, __$trackend, this._touchEnd, false);
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
            var step = this._step;
            return (this.min + Math.round(width / this._increment / step) * step);
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
            return (value - this.min) * this._increment;
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
                    return this._knobOffset + ev.clientX - this._lastTouch.x;
                case 'left':
                    return this._knobOffset + this._lastTouch.x - ev.clientX;
                case 'up':
                    return this._knobOffset + this._lastTouch.y - ev.clientY;
                case 'down':
                    return this._knobOffset + ev.clientY - this._lastTouch.y;
            }

            return 0;
        }

        /**
         * @name _setLength
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the property to use for length and sets the max length of the slider.
         * 
         * @param {HTMLElement} element? The element to use to obtain the max length.
         * 
         * @returns {number} The length of the slider.
         */
        _setLength(element?: HTMLElement): number {
            element = element || this._slider.parentElement;
            switch (this._transition) {
                case 'right':
                case 'left':
                    this._lengthProperty = 'width';
                    return (this._maxOffset = element.offsetWidth);
                case 'up':
                case 'down':
                    this._lengthProperty = 'height';
                    return (this._maxOffset = element.offsetHeight);
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    Exception.warn('Invalid direction "' + this._transition + '" for "' + __Slider + '."');
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
            this._knobOffset = length;
        }

        /**
         * @name _setOffsetWithClone
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Creates a clone of this element and uses it to find the max offset.
         * 
         * @returns {void}
         */
        _setOffsetWithClone(): void {
            var element = this.element,
                body = this.$document.body;

            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    (<plat.ui.ITemplateControlFactory>plat.acquire(__TemplateControlFactory)).dispose(this);
                    return;
                }

                this.$utils.postpone(this._setOffsetWithClone, null, this);
                return;
            }

            this._cloneAttempts = 0;

            var clone = <HTMLElement>element.cloneNode(true),
                style = clone.style,
                regex = /\d+(?!\d+|%)/,
                $window = this.$window,
                width: string;

            while (!regex.test(width = $window.getComputedStyle(element).width)) {
                element = element.parentElement;
            }

            clone.style.width = width;
            style.position = 'absolute';
            style.display = 'block';
            style.visibility = 'hidden';
            body.appendChild(clone);
            this._setLength(<HTMLElement>clone.firstElementChild);
            body.removeChild(clone);
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
