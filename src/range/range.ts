/// <reference path="../references.d.ts" />

module platui {
    /**
     * @name Range
     * @memberof platui
     * @kind class
     *
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl}
     *
     * @description
     * A {@link plat.ui.BindControl|BindControl} that allows for a lower and upper value,
     * thus creating a variable range of included values.
     */
    export class Range extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any = {
            _document: __Document,
            _window: __Window,
            _Promise: __Promise,
            _animator: __Animator
        };

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
        templateString: string =
        '<div class="plat-range-container">\n' +
        '    <div class="plat-range-track">\n' +
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
        protected _window: Window;

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
        protected _document: Document;

        /**
         * @name _Promise
         * @memberof platui.Range
         * @kind property
         * @access protected
         *
         * @type {plat.async.IPromise}
         *
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: plat.async.IPromise;

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
        protected _animator: plat.ui.animations.Animator;

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
         * @name _isVertical
         * @memberof platui.Range
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether the control is vertical or horizontal.
         */
        protected _isVertical: boolean = false;

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
         * @name _lowerIdentifier
         * @memberof platui.Range
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The lower identifier for setting the value of the bound object.
         */
        protected _lowerIdentifier: string;

        /**
         * @name _upperIdentifier
         * @memberof platui.Range
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The upper identifier for setting the value of the bound object.
         */
        protected _upperIdentifier: string;

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
         * @name _touchState
         * @memberof platui.Range
         * @kind property
         * @access protected
         *
         * @type {number}
         *
         * @description
         * An enum denoting the current touch state of the user.
         */
        protected _touchState: number = 0;

        /**
         * @name _removeVisibilityListener
         * @memberof platui.Range
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function that will stop listening for visibility if applicable.
         */
        protected _removeVisibilityListener: plat.IRemoveListener = noop;

        /**
         * @name _rangeVisible
         * @memberof platui.Range
         * @kind property
         * @access protected
         *
         * @type {plat.async.Promise<void>}
         *
         * @description
         * A Promise that indicates {@link platui.Range|Range} visibility.
         */
        protected _rangeVisible: plat.async.Promise<void>;

        /**
         * @name _forceFirstTime
         * @memberof platui.Range
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * A boolean value that forces a one-time trigger upon the first bound value change.
         */
        protected _forceFirstTime = false;

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
            this.dom.addClass(element || this.element, `${__Range} ${(className || '')}`);
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
            let element = this.element,
                slider = this._slider = <HTMLElement>element.firstElementChild.firstElementChild,
                isNumber = this.utils.isNumber,
                optionObj = this.options || <plat.observable.IObservableProperty<IRangeOptions>>{},
                options = optionObj.value || <IRangeOptions>{},
                optionLower = Number(options.lower),
                optionUpper = Number(options.upper),
                identifiers = options.identifiers || <{ lower: string; upper: string; }>{},
                optionMin = options.min,
                optionMax = options.max,
                step = options.step,
                reversed = this._reversed = (options.reverse === true),
                min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0,
                max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100,
                lower = isNumber(optionLower) ? Math.round(optionLower) : min,
                upper = isNumber(optionUpper) ? Math.round(optionUpper) : max,
                className = __Plat + this._validateOrientation(options.orientation);

            this._lowerKnob = <HTMLElement>slider.firstElementChild;
            this._upperKnob = <HTMLElement>slider.lastElementChild;
            this._lowerIdentifier = identifiers.lower || 'lower';
            this._upperIdentifier = identifiers.upper || 'upper';

            // if it's a reversed direction, swap knobs.
            if (reversed) {
                let lowerKnob = this._lowerKnob;
                this._lowerKnob = this._upperKnob;
                this._upperKnob = lowerKnob;
                className += __Reversed;
            }

            this.dom.addClass(element, className);

            // reset value to minimum in case context is already set to a value
            this.lower = min;
            this.upper = max;
            this._step = isNumber(step) ? (step > 0 ? Math.round(step) : 1) : 1;

            if (min >= max) {
                this._log.debug(`"${this.type}'s" min is greater than or equal to its max. Setting max to min + 1.`);
                this.max = min + 1;
            }

            this._setPositionAndLength();
            // must set this in case the value is not set and lower knob is never positioned due to setLower function.
            this._setLowerKnobPosition(min);
            this._initializeEvents();
            this.setLower(lower);
            this.setUpper(upper);
        }

        /**
         * @name setLower
         * @memberof platui.Range
         * @kind function
         * @access public
         *
         * @description
         * Sets the lower value of the {@link platui.Range|Range}. If an invalid value is passed in
         * nothing will happen.
         *
         * @param {number} value The value to set the {@link platui.Range|Range} to.
         *
         * @returns {void}
         */
        setLower(value: number): void {
            this._setLower(value, true);
        }

        /**
         * @name setUpper
         * @memberof platui.Range
         * @kind function
         * @access public
         *
         * @description
         * Sets the upper value of the {@link platui.Range|Range}. If an invalid value is passed in
         * nothing will happen.
         *
         * @param {number} value The value to set the {@link platui.Range|Range} to.
         *
         * @returns {void}
         */
        setUpper(value: number): void {
            this._setUpper(value, true);
        }

        /**
         * @name observeProperties
         * @memberof platui.Range
         * @kind function
         * @access public
         * @virtual
         *
         * @description
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         *
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         *
         * @returns {void}
         */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void {
            binder.observeProperty(this._setLowerBoundProperty, this._lowerIdentifier);
            binder.observeProperty(this._setUpperBoundProperty, this._upperIdentifier);
        }

        /**
         * @name _setLowerBoundProperty
         * @memberof platui.Range
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the bindable lower value is set externally.
         *
         * @param {number} newValue The new lower value.
         * @param {number} oldValue The old value of the bindable index.
         * @param {string} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         *
         * @returns {void}
         */
        protected _setLowerBoundProperty(newValue: number, oldValue: number, identifier: string, firstTime?: boolean): void {
            this._setLower(newValue, false, firstTime);
        }

        /**
         * @name _setUpperBoundProperty
         * @memberof platui.Range
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the bindable upper value is set externally.
         *
         * @param {number} newValue The new upper value.
         * @param {number} oldValue The old value of the bindable index.
         * @param {string} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         *
         * @returns {void}
         */
        protected _setUpperBoundProperty(newValue: number, oldValue: number, identifier: string, firstTime?: boolean): void {
            this._setUpper(newValue, false, firstTime);
        }

        /**
         * @name _setLower
         * @memberof platui.Range
         * @kind function
         * @access protected
         *
         * @description
         * Sets the lower value of the {@link platui.Range|Range}. If an invalid value is passed in
         * nothing will happen.
         *
         * @param {number} value The value to set the {@link platui.Range|Range} to.
         * @param {boolean} propertyChanged Whether or not the property was changed by the user.
         * @param {boolean} firstTime? Whether or not this is the first call to set the lower value.
         *
         * @returns {void}
         */
        protected _setLower(value: number, propertyChanged: boolean, firstTime?: boolean): void {
            let utils = this.utils;

            if (this._touchState === 2) {
                this._log.debug(`Cannot set the value of the ${this.type}'s lower knob while the user is manipulating it.`);
                return;
            } else if (utils.isNull(value)) {
                value = this.min;
                if (firstTime === true) {
                    this._forceFirstTime = true;
                } else {
                    propertyChanged = true;
                }
            }

            if (!utils.isNumber(value)) {
                let numberVal = Number(value);
                if (utils.isNumber(numberVal)) {
                    value = numberVal;
                    if (firstTime === true) {
                        this._forceFirstTime = true;
                    } else {
                        propertyChanged = true;
                    }
                } else {
                    this._log.warn(`${this.type} has its lower value bound to a property that cannot be interpreted as a Number.`);
                    return;
                }
            }

            this._setLowerValue(value, true, propertyChanged, true);
        }

        /**
         * @name _setUpper
         * @memberof platui.Range
         * @kind function
         * @access protected
         *
         * @description
         * Sets the uppper value of the {@link platui.Range|Range}. If an invalid value is passed in
         * nothing will happen.
         *
         * @param {number} value The value to set the {@link platui.Range|Range} to.
         * @param {boolean} propertyChanged Whether or not the property was changed by the user.
         * @param {boolean} firstTime? Whether or not this is the first call to set the upper value.
         *
         * @returns {void}
         */
        protected _setUpper(value: number, propertyChanged: boolean, firstTime?: boolean): void {
            let utils = this.utils;

            if (this._touchState === 3) {
                this._log.debug(`Cannot set the value of the ${this.type}'s upper knob while the user is manipulating it.`);
                return;
            } else if (utils.isNull(value)) {
                value = this.max;
                propertyChanged = true;
            }

            if (!utils.isNumber(value)) {
                let numberVal = Number(value);
                if (utils.isNumber(numberVal)) {
                    value = numberVal;
                    propertyChanged = true;
                } else {
                    this._log.warn(`${this.type} has its upper value bound to a property that cannot be interpreted as a Number.`);
                    return;
                }
            }

            this._setUpperValue(value, true, propertyChanged || (firstTime === true && this._forceFirstTime), true);
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
         * @returns {void}
         */
        protected _initializeEvents(): void {
            let lowerKnob = this._lowerKnob,
                upperKnob = this._upperKnob,
                touchstart = this._touchStart,
                touchEnd = this._touchEnd,
                trackLower = this._trackLower,
                trackUpper = this._trackUpper,
                track: string,
                reverseTrack: string;

            if (this._isVertical) {
                track = `${__$track}down`;
                reverseTrack = `${__$track}up`;
            } else {
                track = `${__$track}right`;
                reverseTrack = `${__$track}left`;
            }

            this.addEventListener(lowerKnob, __$touchstart, touchstart, false);
            this.addEventListener(upperKnob, __$touchstart, touchstart, false);
            this.addEventListener(lowerKnob, track, trackLower, false);
            this.addEventListener(lowerKnob, reverseTrack, trackLower, false);
            this.addEventListener(upperKnob, track, trackUpper, false);
            this.addEventListener(upperKnob, reverseTrack, trackUpper, false);
            this.addEventListener(lowerKnob, __$touchend, touchEnd, false);
            this.addEventListener(upperKnob, __$touchend, touchEnd, false);
            this.addEventListener(lowerKnob, __$trackend, touchEnd, false);
            this.addEventListener(upperKnob, __$trackend, touchEnd, false);
            this.addEventListener(this._window, 'resize', (): void => {
                if (!this.utils.isNull(this._rangeVisible)) {
                    return;
                }

                this._setPositionAndLength();
                this._setLowerKnobPosition();
                this._setUpperKnobPosition();
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
            let touchState = this._touchState;
            if (touchState === 1 || touchState === 2 || touchState === 3) {
                return;
            }

            this._touchState = 1;

            let target = <HTMLElement>ev.currentTarget,
                lastTouch = this._lastTouch;

            if (this.utils.isNull(lastTouch)) {
                this.dom.addClass(target, `${__Plat}top`);
            } else if (lastTouch.target !== target) {
                let dom = this.dom;
                dom.addClass(target, `${__Plat}top`);
                dom.removeClass(lastTouch.target, `${__Plat}top`);
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
            let touchState = this._touchState;
            if (touchState === 0 || touchState === 4) {
                this._touchState = 0;
                return;
            }

            this._touchState = 4;

            let lastTouch = this._lastTouch,
                target = ev.currentTarget;

            if (this.utils.isNull(lastTouch) || (lastTouch.target !== target)) {
                return;
            }

            this.utils.requestAnimationFrame((): void => {
                this._touchState = 0;

                let isLower = target === this._lowerKnob,
                    newOffset = this._calculateOffset(ev, isLower);

                if (isLower) {
                    if (lastTouch.value !== this.lower) {
                        this._trigger('change');
                    }
                } else if (lastTouch.value !== this.upper) {
                    this._trigger('change');
                }

                this._setOffset(newOffset, isLower);
            });
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
            let maxOffset = this._maxOffset;

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
            let touchState = this._touchState;
            if (touchState !== 2) {
                if (touchState === 1) {
                    this._touchState = 2;
                } else if (touchState === 0 || touchState === 3) {
                    return;
                }
            }

            let maxOffset = this._maxOffset,
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
            let touchState = this._touchState;
            if (touchState !== 3) {
                if (touchState === 1) {
                    this._touchState = 3;
                } else if (touchState === 0 || touchState === 2) {
                    return;
                }
            }

            let maxOffset = this._maxOffset,
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
            this.utils.requestAnimationFrame((): void => {
                let style = this._slider.style;
                style[<any>this._positionProperty] = `${position}px`;
                style[<any>this._lengthProperty] = `${(this._upperKnobOffset - position)}px`;

                if (value === null) {
                    return;
                }

                this._setLowerValue(value, false, true, true);
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
            this.utils.requestAnimationFrame((): void => {
                this._slider.style[<any>this._lengthProperty] = `${(position - this._lowerKnobOffset)}px`;

                if (value === null) {
                    return;
                }

                this._setUpperValue(value, false, true, true);
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
            this.utils.requestAnimationFrame((): void => {
                let style = this._slider.style;
                style[<any>this._positionProperty] = `${position}px`;
                style[<any>this._lengthProperty] = '0px';

                if (value === null) {
                    return;
                }

                this._setLowerValue(value, false, false, false);
                this._setUpperValue(value, false, true, true);
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
            let step = this._step;
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
            let currentOffset = isLower ? this._lowerKnobOffset : this._upperKnobOffset,
                displacement: number;

            if (this._isVertical) {
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
         * @name _setLowerValue
         * @memberof platui.Range
         * @kind function
         * @access protected
         *
         * @description
         * Sets the lower value of the {@link platui.Range|Range}.
         *
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * @param {boolean} propertyChanged Whether or not the property was changed by the user.
         * @param {boolean} trigger Whether or not to trigger the 'input' event.
         *
         * @returns {void}
         */
        protected _setLowerValue(newValue: number, setKnob: boolean, propertyChanged: boolean, trigger: boolean): void {
            let lower = this.lower;
            if (newValue === lower) {
                return;
            } else if (newValue >= this.max) {
                newValue = this.max;
            } else if (newValue <= this.min) {
                newValue = this.min;
            } else if (Math.abs(newValue - lower) < this._step) {
                return;
            }

            this.lower = newValue;

            if (setKnob) {
                this._setLowerKnobPosition();
            }

            if (propertyChanged) {
                this._fireChange();
            }

            if (trigger) {
                this._trigger('input');
            }
        }

        /**
         * @name _setUpperValue
         * @memberof platui.Range
         * @kind function
         * @access protected
         *
         * @description
         * Sets the value of the {@link platui.Range|Range}.
         *
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * @param {boolean} propertyChanged Whether or not the property was changed by the user.
         * @param {boolean} trigger Whether or not to trigger the 'input' event.
         *
         * @returns {void}
         */
        protected _setUpperValue(newValue: number, setKnob: boolean, propertyChanged: boolean, trigger: boolean): void {
            let upper = this.upper;
            if (newValue === upper) {
                return;
            } else if (newValue >= this.max) {
                newValue = this.max;
            } else if (newValue <= this.min) {
                newValue = this.min;
            } else if (Math.abs(newValue - upper) < this._step) {
                return;
            }

            this.upper = newValue;

            if (setKnob) {
                this._setUpperKnobPosition();
            }

            if (propertyChanged) {
                this._fireChange();
            }

            if (trigger) {
                this._trigger('input');
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
         * @returns {void}
         */
        protected _setPositionAndLength(): void {
            let el = this._slider.parentElement;

            if (this._isVertical) {
                this._lengthProperty = 'height';
                this._positionProperty = this._reversed ? 'top' : 'bottom';
                this._maxOffset = el.clientHeight;
            } else {
                this._lengthProperty = 'width';
                this._positionProperty = this._reversed ? 'right' : 'left';
                this._maxOffset = el.clientWidth;
            }

            if (!this._maxOffset) {
                this._rangeVisible = new this._Promise<void>((resolve) => {
                    this._removeVisibilityListener = this.dom.whenVisible((): void => {
                        this._rangeVisible = null;
                        this._setPositionAndLength();
                        resolve();
                    }, el);
                });
                return;
            }

            this._setIncrement();
        }

        /**
         * @name _setLowerKnobPosition
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
        protected _setLowerKnobPosition(value?: number): void {
            this._Promise.resolve(this._rangeVisible).then((): void => {
                let animationOptions: plat.IObject<string> = {},
                    upperKnobOffset = this._upperKnobOffset,
                    upperOffset = this.utils.isNumber(upperKnobOffset) ?
                        upperKnobOffset :
                        this._setOffset(this._calculateKnobPosition(this.upper), false),
                    position = this._calculateKnobPosition((value || this.lower));

                if (position === this._lowerKnobOffset) {
                    return;
                }

                animationOptions[this._positionProperty] = `${position}px`;
                animationOptions[this._lengthProperty] = `${(upperOffset - position)}px`;
                this._animator.animate(this._slider, __Transition, {
                    properties: animationOptions
                });

                this._lowerKnobOffset = position;
            });
        }

        /**
         * @name _setUpperKnobPosition
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
        protected _setUpperKnobPosition(value?: number): void {
            this._Promise.resolve(this._rangeVisible).then((): void => {
                let animationOptions: plat.IObject<string> = {},
                    length = this._calculateKnobPosition((value || this.upper));

                if (length === this._upperKnobOffset) {
                    return;
                }

                animationOptions[this._lengthProperty] = `${(length - this._lowerKnobOffset)}px`;
                this._animator.animate(this._slider, __Transition, {
                    properties: animationOptions
                });

                this._upperKnobOffset = length;
            });
        }

        /**
         * @name _fireChange
         * @memberof platui.Range
         * @kind function
         * @access protected
         *
         * @description
         * Fires an inputChanged event with the new bound value.
         *
         * @returns {void}
         */
        protected _fireChange(): void {
            let newProperty = <plat.IObject<number>>{};
            newProperty[this._lowerIdentifier] = this.lower;
            newProperty[this._upperIdentifier] = this.upper;
            this.inputChanged(newProperty);
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
            let domEvent: plat.ui.DomEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
            domEvent.trigger();
        }

        /**
         * @name _validateOrientation
         * @memberof platui.Range
         * @kind function
         * @access protected
         *
         * @description
         * Checks the orientation of the control and ensures it is valid.
         * Will default to "horizontal" if invalid.
         *
         * @param {string} orientation The element to base the length off of.
         *
         * @returns {string} The orientation to be used.
         */
        protected _validateOrientation(orientation: string): string {
            if (this.utils.isUndefined(orientation)) {
                return 'horizontal';
            }

            let validOrientation: string;
            if (orientation === 'horizontal') {
                validOrientation = orientation;
            } else if (orientation === 'vertical') {
                validOrientation = orientation;
                this._isVertical = true;
            } else {
                this._log.debug(`Invalid orientation "${orientation}" for ${this.type}. Defaulting to "horizontal."`);
                validOrientation = 'horizontal';
            }

            return validOrientation;
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
         * The default value is "horizontal".
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
         * The minimum value of the {@link platui.Range|Range}.
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
         * The maximum value of the {@link platui.Range|Range}.
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

        /**
         * @name identifiers
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         *
         * @type {platui.IRangeIdentifiers<string>}
         *
         * @description
         * The identifiers that will label the lower and upper values set
         * on the bound object (e.g. if bound to an object `foo: { low: number; high: number; }`
         * this identifiers object should be `{ lower: 'low', upper: 'high' }`).
         */
        identifiers?: IRangeIdentifiers<string>;
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
     * @name IRangeIdentifiers
     * @memberof platui
     * @kind interface
     *
     * @description
     * Defines an object describing expected identifiers for a {@link platui.Range|Range} control.
     *
     * @typeparam {any} T The type of each value in the object.
     */
    export interface IRangeIdentifiers<T> {
        /**
         * @name lower
         * @memberof platui.IRangeBinding
         * @kind property
         * @access public
         *
         * @type {T}
         *
         * @description
         * The lower set value of the {@link platui.Range|Range} control.
         */
        lower: T;

        /**
         * @name lower
         * @memberof platui.IRangeBinding
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * The upper set value of the {@link platui.Range|Range} control.
         */
        upper: T;
    }

    /**
     * @name IRangeBinding
     * @memberof platui
     * @kind interface
     *
     * @description
     * Defines the expected bound object of the {@link platui.Range|Range} control
     * (e.g. using {@link plat.controls.Bind|Bind}.
     */
    export interface IRangeBinding extends IRangeIdentifiers<number> { }
}
