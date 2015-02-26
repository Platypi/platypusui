/// <reference path="../../references.d.ts" />

module platui {
    /**
     * @name Carousel
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.BindControl|BindControl} that acts as a HTML template carousel 
     * and can bind the selected index to a value.
     */
    export class Carousel extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any = {
            _document: __Document,
            _window: __Window,
            _utils: __Utils,
            _compat: __Compat,
            _animator: __Animator
        };

        /**
         * @name templateString
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-carousel-container">\n' +
        '    <' + __ForEach + ' class="plat-carousel-slider"></' + __ForEach + '>\n' +
        '</div>\n';

        /**
         * @name context
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {Array<any>}
         * 
         * @description
         * The mandatory type of context of the {@link platui.Carousel|Carousel}.
         */
        context: Array<any>;

        /**
         * @name options
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.ICarouselOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<ICarouselOptions>;

        /**
         * @name priority
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The load priority of the control (needs to load before a {@link plat.controls.Bind|Bind} control).
         */
        priority = 120;

        /**
         * @name itemsLoaded
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * A Promise that fulfills when the items are loaded.
         */
        itemsLoaded: plat.async.IThenable<void>;

        /**
         * @name index
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * The current index of the {@link platui.Carousel|Carousel}.
         */
        get index(): number {
            return this._index;
        }

        /**
         * @name _utils
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.Utils|Utils} injectable.
         */
        protected _utils: plat.Utils;

        /**
         * @name _compat
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: plat.Compat;

        /**
         * @name _document
         * @memberof platui.Carousel
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
         * @name _window
         * @memberof platui.Carousel
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
         * @name _animator
         * @memberof platui.Carousel
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
         * @name _isVertical
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the control is vertical or horizontal.
         */
        protected _isVertical = false;

        /**
         * @name _type
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The type of the control (i.e. how it is scrolled).
         */
        protected _type: string;

        /**
         * @name _transform
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The current browser's CSS3 transform property.
         */
        protected _transform: string;

        /**
         * @name _hasSwiped
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user has swiped.
         */
        protected _hasSwiped = false;

        /**
         * @name _inTouch
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is currently touching the screen.
         */
        protected _inTouch: boolean;

        /**
         * @name _lastTouch
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IPoint}
         * 
         * @description
         * The last touch start recorded.
         */
        protected _lastTouch: plat.ui.IPoint = { x: 0, y: 0 };

        /**
         * @name _loaded
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the control has been loaded based on its context being an Array.
         */
        protected _loaded = false;

        /**
         * @name _index
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current index seen in the {@link platui.Carousel|Carousel}.
         */
        protected _index = 0;

        /**
         * @name _intervalOffset
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The interval offset to translate the {@link platui.Carousel|Carousel's} sliding element.
         */
        protected _intervalOffset: number;

        /**
         * @name _currentOffset
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current offset of the translated {@link platui.Carousel|Carousel's} sliding element.
         */
        protected _currentOffset = 0;

        /**
         * @name _positionProperty
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes whether we're using left or top as the position of the {@link platui.Carousel|Carousel}.
         */
        protected _positionProperty: string;

        /**
         * @name _container
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * Denotes the interactive container element contained within the control.
         */
        protected _container: HTMLElement;

        /**
         * @name _slider
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * Denotes the sliding element contained within the control.
         */
        protected _slider: HTMLElement;

        /**
         * @name _cloneAttempts
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current number of times we checked to see if the element was placed into the DOM. 
         * Used for determining max offset width or height.
         */
        protected _cloneAttempts = 0;

        /**
         * @name _maxCloneCount
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * The max number of times we'll check to see if the element was placed into the DOM. 
         * Used for determining max offset width or height.
         */
        protected _maxCloneAttempts = 25;

        /**
         * @name _animationThenable
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimationThenable<void>}
         * 
         * @description
         * The most recent animation thenable. Used to cancel the current animation if another needs 
         * to begin.
         */
        protected _animationThenable: plat.ui.animations.IAnimationThenable<void>;

        /**
         * @name _onLoad
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {() => void}
         * 
         * @description
         * A function to call once items are loaded and the {@link platui.Carousel|Carousel} is set.
         */
        protected _onLoad: () => void;

        /**
         * @name _interval
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The auto scroll interval.
         */
        protected _interval: number;

        /**
         * @name _removeInterval
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * The function used to clear the auto scroll interval.
         */
        protected _removeInterval: plat.IRemoveListener = noop;

        /**
         * @name _suspend
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The auto scroll interval suspension time if user interaction occurs.
         */
        protected _suspend: number;

        /**
         * @name _removeSuspend
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * The function used to clear the suspended auto scroll interval.
         */
        protected _removeSuspend: plat.IRemoveListener = noop;

        /**
         * @name _isInfinite
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not infinite scrolling is enabled.
         */
        protected _isInfinite: boolean;

        /**
         * @name _isAuto
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not automatic scrolling is enabled.
         */
        protected _isAuto = false;

        /**
         * @name _isPaused
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not automatic scrolling is currently paused.
         */
        protected _isPaused = false;

        /**
         * @name _selfPause
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the control is responsible for pausing itself.
         */
        protected _selfPause = false;

        /**
         * @name _preClonedNode
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The index `-1` node used for infinite scrolling.
         */
        protected _preClonedNode: HTMLElement;

        /**
         * @name _preClonedNode
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The index `length` node used for infinite scrolling.
         */
        protected _postClonedNode: HTMLElement;

        /**
         * @name _forwardArrow
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * A reference to the forward arrow element.
         */
        protected _forwardArrow: HTMLElement;

        /**
         * @name _backArrow
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * A reference to the back arrow element.
         */
        protected _backArrow: HTMLElement;

        /**
         * @name _removeListeners
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {Array<plat.IRemoveListener>}
         * 
         * @description
         * A collection of remove listeners to stop listening for events.
         */
        protected _removeListeners: Array<plat.IRemoveListener> = [];

        /**
         * @name setClasses
         * @memberof platui.Carousel
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
            this.dom.addClass(element || this.element, __Carousel + ' ' + (className || ''));
        }

        /**
         * @name contextChanged
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Checks if the control has been initialized, otherwise it does so.
         * 
         * @param {Array<any>} newValue The new array context.
         * @param {Array<any>} oldValue The old array context.
         * 
         * @returns {void}
         */
        contextChanged(newValue: Array<any>, oldvalue: Array<any>): void {
            this._verifyLength();

            var _utils = this._utils;
            if (_utils.isFunction(this._onLoad)) {
                if (_utils.isArray(newValue) && newValue.length > 0) {
                    this.goToIndex(0);
                }
                return;
            }

            this.loaded();
        }

        /**
         * @name initialize
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Inserts the innerHTML of this control into a child {@link plat.ui.controls.ForEach|ForEach} control.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var itemContainer = this._document.createElement('div'),
                container = this._container = <HTMLElement>this.element.firstElementChild;
            itemContainer.className = 'plat-carousel-item';
            itemContainer.appendChild(this.innerTemplate);
            container.firstElementChild.appendChild(itemContainer);
        }

        /**
         * @name loaded
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Checks context and warns if not an Array, then initializes.
         * 
         * @returns {void}
         */
        loaded(): void {
            var _utils = this._utils,
                context = this.context;
            if (!_utils.isArray(context)) {
                var _Exception = this._Exception;
                _Exception.warn('The context of a ' + this.type + ' must be an Array.', _Exception.CONTEXT);
                return;
            }

            var optionObj = this.options || <plat.observable.IObservableProperty<ICarouselOptions>>{},
                options = optionObj.value || <ICarouselOptions>{},
                index = options.index,
                isNumber = _utils.isNumber,
                orientation = this._validateOrientation(options.orientation),
                interval = options.interval,
                intervalNum = this._interval = isNumber(interval) ? Math.abs(interval) : 3000,
                suspend = options.suspend;

            this._type = options.type || 'track swipe';
            this._container = this._container || <HTMLElement>this.element.firstElementChild;
            this._isInfinite = options.infinite === true;
            this._suspend = Math.abs(isNumber(suspend) ? intervalNum - suspend : intervalNum - 3000);

            this.dom.addClass(this.element, __Plat + orientation);
            index = isNumber(index) && index >= 0 ? index < context.length ? index : (context.length - 1) : null;

            this._onLoad = (): void => {
                var setIndex = this._index;
                this._index = 0;
                this.goToIndex(_utils.isNull(index) ? setIndex : index);
                this._addEventListeners();
                this.observeArray(this._verifyLength);
                this._loaded = true;
            };

            this._init();
        }

        /**
         * @name goToNext
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Advances the position of the {@link platui.Carousel|Carousel} to the next state.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the next index has been 
         * reached and the animation is complete. Returns null if the state specified by the index is invalid.
         */
        goToNext(): plat.async.IThenable<void> {
            var index = this._index;
            if (this._isInfinite) {
                if (index === this.context.length - 1) {
                    return this._infiniteNext();
                }
            } else if (index >= this.context.length - 1) {
                if (this._isAuto && !this._isPaused) {
                    this.pause();
                    this._selfPause = true;
                }
                return null;
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(-this._intervalOffset);

            var animation = this._initiateAnimation({ properties: animationOptions });
            this.inputChanged(++this._index, index);

            return animation;
        }

        /**
         * @name goToPrevious
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Changes the position of the {@link platui.Carousel|Carousel} to the previous state.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the previous index has been 
         * reached and the animation is complete. Returns null if the state specified by the index is invalid.
         */
        goToPrevious(): plat.async.IThenable<void> {
            var index = this._index;
            if (this._isInfinite) {
                if (index === 0) {
                    return this._infinitePrevious();
                }
            } else if (index <= 0) {
                return null;
            } else if (this._selfPause) {
                this.resume();
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(this._intervalOffset);

            var animation = this._initiateAnimation({ properties: animationOptions });
            this.inputChanged(--this._index, index);

            return animation;
        }

        /**
         * @name goToIndex
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Changes the position of the {@link platui.Carousel|Carousel} to the state 
         * specified by the input index.
         * 
         * @param {number} index The new index of the {@link platui.Carousel|Carousel}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the index has been 
         * reached and the animation is complete. Returns null if the state specified by the index is invalid.
         */
        goToIndex(index: number): plat.async.IThenable<void> {
            var oldIndex = this._index,
                promise = this._goToIndex(index);

            if (promise !== null) {
                this.inputChanged((this._index = index), oldIndex);
            }

            return promise;
        }

        /**
         * @name pause
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Stops auto scrolling if auto scrolling is enabled.
         * 
         * @returns {void}
         */
        pause(): void {
            this._selfPause = false;
            if (!this._isAuto || this._isPaused) {
                return;
            }

            this._isPaused = true;
            this._removeSuspend();
            this._removeSuspend = noop;
            this._removeInterval();
            this._removeInterval = noop;
        }

        /**
         * @name resume
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Resumes auto scrolling if auto scrolling is enabled.
         * 
         * @returns {void}
         */
        resume(): void {
            if (!(this._isAuto && this._isPaused)) {
                return;
            }

            this._isPaused = this._selfPause = false;
            this._initiateInterval();
        }

        /**
         * @name dispose
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Clean up the auto scroll interval if necessary.
         * 
         * @returns {void}
         */
        dispose(): void {
            super.dispose();
            this._removeSuspend();
            this._removeInterval();
        }

        /**
         * @name observeProperties
         * @memberof platui.Carousel
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
            binder.observeProperty(this._setBoundProperty);
        }

        /**
         * @name _setBoundProperty
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * The function called when the bindable index is set externally.
         * 
         * @param {number} index The new value of the bindable index.
         * @param {number} oldValue The old value of the bindable index.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         * 
         * @returns {void}
         */
        protected _setBoundProperty(index: number, oldValue: number, identifier: void, firstTime?: boolean): void {
            var _utils = this._utils;
            if (_utils.isNull(index)) {
                if (firstTime === true) {
                    this.inputChanged(0);
                    return;
                }
            } else if (!_utils.isNumber(index)) {
                index = Number(index);
                if (!_utils.isNumber(index)) {
                    var _Exception = this._Exception;
                    _Exception.warn(this.type + ' has it\'s index bound to a property that cannot be interpreted as a Number.',
                        _Exception.BIND);
                    return;
                }
            }

            if (!this._loaded) {
                this._index = index;
                return;
            }

            if (this._goToIndex(index)) {
                this._index = index;
            }
        }

        /**
         * @name _reset
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Resets the position of the {@link platui.Carousel|Carousel} to its current state.
         * 
         * @returns {void}
         */
        protected _reset(): void {
            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(0);
            this._initiateAnimation({ properties: animationOptions });
        }

        /**
         * @name _verifyLength
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Verifies that the current length of the context aligns with the position of the {@link platui.Carousel|Carousel}.
         * 
         * @returns {void}
         */
        protected _verifyLength(): void {
            var context = this.context,
                _utils = this._utils;
            if (!_utils.isArray(context) || context.length === 0) {
                var index = this._index;
                if (!_utils.isUndefined(index)) {
                    this.inputChanged((this._index = undefined), index);
                }
                this._currentOffset = 0;
                this._removeEventListeners();
                return;
            }

            // if no remove listeners exist we know that we had previously removed them.
            var addListeners = this._removeListeners.length === 0;
            if (addListeners || this._isInfinite) {
                var foreach = <plat.ui.controls.ForEach>this.controls[0],
                    itemsLoaded = (): void => {
                        if (context.length === 0) {
                            foreach.itemsLoaded.then(itemsLoaded);
                            return;
                        } else if (addListeners) {
                            this._addEventListeners();
                            return;
                        }
                        this._cloneForInfinite();
                    };
                foreach.itemsLoaded.then(itemsLoaded);
            }

            var maxIndex = context.length - 1,
                maxOffset = maxIndex * this._intervalOffset;

            if (-this._currentOffset > maxOffset) {
                this.goToIndex(maxIndex);
            }
        }

        /**
         * @name _goToIndex
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Changes the position of the {@link platui.Carousel|Carousel} to the state 
         * specified by the input index.
         * 
         * @param {number} index The new index of the {@link platui.Carousel|Carousel}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the index has been reached. 
         * Returns null if the state specified by the index is invalid.
         */
        protected _goToIndex(index: number): plat.async.IThenable<void> {
            var oldIndex = this._index;
            if (this._utils.isUndefined(oldIndex)) {
                this._index = oldIndex = 0;
            }

            if (index === oldIndex || index < 0 || index >= this.context.length) {
                return null;
            } else if (this._selfPause) {
                this.resume();
            }

            var animationOptions: plat.IObject<string> = {},
                interval = (oldIndex - index) * this._intervalOffset;

            animationOptions[this._transform] = this._calculateStaticTranslation(interval);
            return this._initiateAnimation({ properties: animationOptions });
        }

        /**
         * @name _infiniteNext
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Handles a go-to-next operation when infinite scrolling is enabled.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the scrolling animation is complete.
         */
        protected _infiniteNext(): plat.async.IThenable<void> {
            var index = this._index,
                offset = -this._intervalOffset,
                animationOptions: plat.IObject<string> = {};

            animationOptions[this._transform] = this._calculateStaticTranslation(offset);

            var resetTranslation = this._calculateStaticTranslation(-this._currentOffset + offset),
                animation = this._initiateAnimation({ properties: animationOptions }).then((): void => {
                    var slider = this._slider;
                    slider.style[<any>this._transform] = resetTranslation;
                    // access property to force a repaint
                    this._window.getComputedStyle(slider)[<any>this._transform];
                });

            this.inputChanged((this._index = 0), index);
            return animation;
        }

        /**
         * @name _infinitePrevious
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Handles a go-to-next operation when infinite scrolling is enabled.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the scrolling animation is complete.
         */
        protected _infinitePrevious(): plat.async.IThenable<void> {
            var index = this._index,
                animationOptions: plat.IObject<string> = {},
                maxLength = this.context.length,
                offset = this._intervalOffset,
                maxOffset = maxLength * this._intervalOffset;

            animationOptions[this._transform] = this._calculateStaticTranslation(offset);

            var resetTranslation = this._calculateStaticTranslation(-maxOffset),
                animation = this._initiateAnimation({ properties: animationOptions }).then((): void => {
                    var slider = this._slider;
                    slider.style[<any>this._transform] = resetTranslation;
                    // access property to force a repaint
                    this._window.getComputedStyle(slider)[<any>this._transform];
                });

            this.inputChanged((this._index = maxLength - 1), index);
            return animation;
        }

        /**
         * @name _initiateAnimation
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Animates the carousel with a set of characteristics passed in as an argument.
         * 
         * @param {plat.IObject<string>} animationOptions An object containing key-value pairs 
         * of properties to animate.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the animation is complete.
         */
        protected _initiateAnimation(animationOptions: plat.ui.animations.ISimpleCssTransitionOptions): plat.async.IThenable<void> {
            if (this._utils.isNull(this._animationThenable)) {
                return this._animationThenable =
                    <plat.ui.animations.IAnimationThenable<any>>this._animator.animate(this._slider, __Transition, animationOptions);
            }

            var cancelable = this._animationThenable,
                animationCreation = this._animator.create(this._slider, __Transition, animationOptions),
                animation = this._animationThenable =
                    <plat.ui.animations.IAnimationThenable<any>>animationCreation.current;

            cancelable.cancel().then((): plat.async.IThenable<void> => {
                return animationCreation.previous;
            }).then((): void => {
                animation.start();
            });

            return animation;
        }

        /**
         * @name _init
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes the control and adds all event listeners.
         * 
         * @returns {void}
         */
        protected _init(): void {
            var foreach = <plat.ui.controls.ForEach>this.controls[0],
                container = this._container,
                postLoad = (): void => {
                    if (this._setPosition()) {
                        this._onLoad();
                    }
                },
                itemsLoaded = (): void => {
                    if (this.context.length === 0) {
                        foreach.itemsLoaded.then(itemsLoaded);
                        return;
                    }
                    postLoad();
                };

            this._slider = <HTMLElement>container.firstElementChild;
            this._setTransform();

            this.itemsLoaded = foreach.itemsLoaded.then(itemsLoaded).catch((): void => {
                var _Exception = this._Exception;
                _Exception.warn('An error occurred while processing the ' + this.type + '. Please ensure you\'re context is correct.',
                    _Exception.CONTROL);
                this._loaded = false;
                return;
            });
        }

        /**
         * @name _addEventListeners
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all event listeners on this control's element.
         * 
         * @returns {void}
         */
        protected _addEventListeners(): void {
            var types = this._type.split(' ');

            if (types.indexOf('tap') !== -1) {
                this._initializeTap();
            }

            if (types.indexOf('swipe') !== -1) {
                this._initializeSwipe();
            }

            if (types.indexOf('track') !== -1) {
                this._initializeTrack();
            }

            if (types.indexOf('auto') !== -1) {
                this._initializeAuto();
            }

            if (this._isInfinite) {
                this._initializeInfinite();
            }

            this._removeListeners.push(this.addEventListener(this._window, 'resize', (): void => {
                this._setPosition();
            }, false));
        }

        /**
         * @name _removeEventListeners
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Removes all event listeners on this control's element.
         * 
         * @returns {void}
         */
        protected _removeEventListeners(): void {
            var removeListeners = this._removeListeners;
            while (removeListeners.length > 0) {
                removeListeners.pop()();
            }

            if (this._isAuto) {
                this._removeInterval();
                this._removeInterval = noop;
                this._removeSuspend();
                this._removeSuspend = noop;
            }

            if (this._isInfinite) {
                this._removeClones();
            }
        }

        /**
         * @name _initializeInfinite
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all necessary elements and event listeners to setup auto scroll.
         * 
         * @returns {void}
         */
        protected _initializeInfinite(): void {
            this._removeListeners.push(this.observeArray(this._cloneForInfinite));
            this._cloneForInfinite();
            // offset the newly added clone
            this._utils.requestAnimationFrame((): void => {
                this._slider.style[<any>this._transform] = this._calculateStaticTranslation(-this._intervalOffset);
            });
        }

        /**
         * @name _cloneForInfinite
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Create the clones for infinite scrolling.
         * 
         * @returns {void}
         */
        protected _cloneForInfinite(): void {
            this._removeClones();

            var context = this.context;
            if (this._utils.isNull(context) || context.length === 0) {
                return;
            }

            var slider = this._slider,
                preClone = this._preClonedNode = <HTMLElement>slider.lastElementChild.cloneNode(true),
                postClone = this._postClonedNode = <HTMLElement>slider.firstElementChild.cloneNode(true);

            slider.insertBefore(preClone, slider.firstChild);
            slider.insertBefore(postClone, null);
        }

        /**
         * @name _removeClones
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Removes the clones for infinite scrolling.
         * 
         * @returns {void}
         */
        protected _removeClones(): void {
            var slider = this._slider,
                preClone = this._preClonedNode,
                postClone = this._postClonedNode;

            if (slider.contains(preClone)) {
                slider.removeChild(preClone);
            }

            if (slider.contains(postClone)) {
                slider.removeChild(postClone);
            }
        }

        /**
         * @name _initializeAuto
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all necessary elements and event listeners to setup auto scroll.
         * 
         * @returns {void}
         */
        protected _initializeAuto(): void {
            this._isAuto = true;
            this._initiateInterval();
        }

        /**
         * @name _initiateInterval
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Begins auto scrolling.
         * 
         * @returns {void}
         */
        protected _initiateInterval(): void {
            this._removeInterval = this._utils.setInterval(this.goToNext, this._interval, null, this);
        }

        /**
         * @name _suspendInterval
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Checks for automatic scrolling and suspends if necessary.
         * 
         * @returns {void}
         */
        protected _suspendInterval(): void {
            if (!this._isAuto || this._isPaused) {
                return;
            }

            this._removeSuspend();
            this._removeInterval();

            this._removeSuspend = this._utils.defer((): void => {
                this._initiateInterval();
                this._removeSuspend = noop;
            }, this._suspend);
        }

        /**
         * @name _initializeTap
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all necessary elements and event listeners to handle tap events.
         * 
         * @returns {void}
         */
        protected _initializeTap(): void {
            if (!this._utils.isNode(this._forwardArrow)) {
                this._createArrowElements();
            }

            var removeListeners = this._removeListeners;
            removeListeners.push(this.addEventListener(this._backArrow, __$tap, (): void => {
                this._suspendInterval();
                this.goToPrevious();
            }, false));
            removeListeners.push(this.addEventListener(this._forwardArrow, __$tap, (): void => {
                this._suspendInterval();
                this.goToNext();
            }, false));
        }

        /**
         * @name _createArrowElements
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Creates the arrow elements for type `tap` and places them in the DOM.
         * 
         * @returns {void}
         */
        protected _createArrowElements(): void {
            var _document = this._document,
                element = this.element,
                backArrowContainer = this._backArrow = _document.createElement('div'),
                forwardArrowContainer = this._forwardArrow = _document.createElement('div'),
                backArrow = _document.createElement('span'),
                forwardArrow = _document.createElement('span');

            if (this._isVertical) {
                backArrow.className = __Plat + 'icon-arrow-up';
                forwardArrow.className = __Plat + 'icon-arrow-down';
            } else {
                backArrow.className = __Plat + 'icon-arrow-left';
                forwardArrow.className = __Plat + 'icon-arrow-right';
            }

            backArrowContainer.className = __Plat + 'back-arrow';
            forwardArrowContainer.className = __Plat + 'forward-arrow';
            backArrowContainer.appendChild(backArrow);
            forwardArrowContainer.appendChild(forwardArrow);
            element.appendChild(backArrowContainer);
            element.appendChild(forwardArrowContainer);
        }

        /**
         * @name _initializeSwipe
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all event listeners to handle swipe events.
         * 
         * @returns {void}
         */
        protected _initializeSwipe(): void {
            var container = this._container,
                swipeFn = this._handleSwipe,
                swipe: string,
                reverseSwipe: string;

            if (this._isVertical) {
                swipe = __$swipe + 'up';
                reverseSwipe = __$swipe + 'down';
            } else {
                swipe = __$swipe + 'left';
                reverseSwipe = __$swipe + 'right';
            }

            var removeListeners = this._removeListeners;
            removeListeners.push(this.addEventListener(container, swipe, swipeFn, false));
            removeListeners.push(this.addEventListener(container, reverseSwipe, swipeFn, false));
        }

        /**
         * @name _initializeTrack
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all event listeners to handle tracking events.
         * 
         * @returns {void}
         */
        protected _initializeTrack(): void {
            var container = this._container,
                trackFn = this._track,
                touchEnd = this._touchEnd,
                track: string,
                reverseTrack: string;

            if (this._isVertical) {
                track = __$track + 'up';
                reverseTrack = __$track + 'down';
            } else {
                track = __$track + 'left';
                reverseTrack = __$track + 'right';
            }

            var removeListeners = this._removeListeners;
            removeListeners.push(this.addEventListener(container, track, trackFn, false));
            removeListeners.push(this.addEventListener(container, reverseTrack, trackFn, false));
            removeListeners.push(this.addEventListener(container, __$touchstart, this._touchStart, false));
            removeListeners.push(this.addEventListener(container, __$trackend, touchEnd, false));
            removeListeners.push(this.addEventListener(container, __$touchend, touchEnd, false));
        }

        /**
         * @name _handleSwipe
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Handles a swipe event.
         * 
         * @returns {void}
         */
        protected _handleSwipe(ev: plat.ui.IGestureEvent): void {
            var direction = ev.direction.primary,
                hasSwiped = false;

            switch (direction) {
                case 'left':
                    if (!this._isVertical && this.index + 1 < this.context.length) {
                        this._suspendInterval();
                        hasSwiped = true;
                        this.goToNext();
                    }
                    break;
                case 'right':
                    if (!this._isVertical && this.index - 1 >= 0) {
                        this._suspendInterval();
                        hasSwiped = true;
                        this.goToPrevious();
                    }
                    break;
                case 'up':
                    if (this._isVertical && this.index + 1 < this.context.length) {
                        this._suspendInterval();
                        hasSwiped = true;
                        this.goToNext();
                    }
                    break;
                case 'down':
                    if (this._isVertical && this.index - 1 >= 0) {
                        this._suspendInterval();
                        hasSwiped = true;
                        this.goToPrevious();
                    }
                    break;
                default:
                    return;
            }

            this._hasSwiped = hasSwiped;
        }

        /**
         * @name _touchStart
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Log when the user touches the {@link platui.Carousel|Carousel}.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        protected _touchStart(ev: plat.ui.IGestureEvent): void {
            if (this._inTouch) {
                return;
            } else if (this._isAuto) {
                this._removeInterval();
                this._removeInterval = noop;
            }

            this._inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };

            if (this._utils.isNull(this._animationThenable)) {
                return;
            }

            this._animationThenable.cancel();
        }

        /**
         * @name _touchEnd
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * The $touchend and $trackend event handler.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void {
            var inTouch = this._inTouch,
                hasSwiped = this._hasSwiped;

            this._inTouch = this._hasSwiped = false;
            if (!inTouch || hasSwiped) {
                return;
            } else if (this._isAuto && !this._isPaused) {
                this._initiateInterval();
            }

            var distanceMoved = this._isVertical ? (ev.clientY - this._lastTouch.y) : (ev.clientX - this._lastTouch.x);
            if (Math.abs(distanceMoved) > Math.ceil(this._intervalOffset / 2)) {
                if (distanceMoved < 0) {
                    if (this.goToNext()) {
                        return;
                    }
                } else if (this.goToPrevious()) {
                    return;
                }
            }

            this._reset();
        }

        /**
         * @name _track
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions  
         * depending on the defined orientation.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {void}
         */
        protected _track(ev: plat.ui.IGestureEvent): void {
            this._utils.requestAnimationFrame((): void => {
                this._slider.style[<any>this._transform] = this._calculateDynamicTranslation(ev);
            });
        }

        /**
         * @name _calculateStaticTranslation
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the translation value for setting the transform value during a static index set.
         * 
         * @param {number} interval The interval change.
         * 
         * @returns {string} The translation value.
         */
        protected _calculateStaticTranslation(interval: number): string {
            if (this._isVertical) {
                return 'translate3d(0,' + (this._currentOffset += interval) + 'px,0)';
            }

            return 'translate3d(' + (this._currentOffset += interval) + 'px,0,0)';
        }

        /**
         * @name _calculateDynamicTranslation
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the translation value for setting the transform value during tracking.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {string} The translation value.
         */
        protected _calculateDynamicTranslation(ev: plat.ui.IGestureEvent): string {
            if (this._isVertical) {
                return 'translate3d(0,' + (this._currentOffset + (ev.clientY - this._lastTouch.y)) + 'px,0)';
            }

            return 'translate3d(' + (this._currentOffset + (ev.clientX - this._lastTouch.x)) + 'px,0,0)';
        }

        /**
         * @name _setTransform
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Obtains the current browser's transform property value.
         * 
         * @returns {void}
         */
        protected _setTransform(): void {
            var style = this._slider.style,
                isUndefined = this._utils.isUndefined;

            if (!isUndefined(style.transform)) {
                this._transform = 'transform';
                return;
            }

            var vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            } else if (!isUndefined(style[<any>(vendorPrefix.upperCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
        }

        /**
         * @name _setPosition
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the properties to use for position and sets the interval length of the sliding container.
         * 
         * @param {HTMLElement} element? The element to base the length off of.
         * 
         * @returns {boolean} Whether or not all necessary dimensions were set.
         */
        protected _setPosition(element?: HTMLElement): boolean {
            var isNode = this._utils.isNode(element),
                el = isNode ? element : this._container,
                dependencyProperty: string;

            if (this._isVertical) {
                this._positionProperty = 'top';
                dependencyProperty = 'height';
                this._intervalOffset = el.offsetHeight;
            } else {
                this._positionProperty = 'left';
                dependencyProperty = 'width';
                this._intervalOffset = el.offsetWidth;
            }

            if (!(isNode || this._intervalOffset)) {
                this._setOffsetWithClone(dependencyProperty);
                return false;
            }

            return true;
        }

        /**
         * @name _validateOrientation
         * @memberof platui.Carousel
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
            if (this._utils.isUndefined(orientation)) {
                return 'horizontal';
            }

            var validOrientation: string;
            if (orientation === 'horizontal') {
                validOrientation = orientation;
            } else if (orientation === 'vertical') {
                validOrientation = orientation;
                this._isVertical = true;
            } else {
                var _Exception = this._Exception;
                _Exception.warn('Invalid orientation "' + orientation + '" for ' + this.type + '. Defaulting to "horizontal."',
                    _Exception.CONTROL);
                validOrientation = 'horizontal';
            }

            return validOrientation;
        }

        /**
         * @name _setOffsetWithClone
         * @memberof platui.Carousel
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
            this._setPosition(<HTMLElement>clone.firstElementChild);
            body.removeChild(shallowCopy);
            if (this._loaded) {
                return;
            }

            this._onLoad();
        }
    }

    plat.register.control(__Carousel, Carousel);

    /**
     * @name ICarouselOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Carousel|Carousel} control.
     */
    export interface ICarouselOptions {
        /**
         * @name type
         * @memberof platui.ICarouselOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies how the {@link platui.Carousel|Carousel} should change. Multiple types can be combined by making it space delimited. 
         * It's default behavior is "track swipe".
         * 
         * @remarks
         * "tap": The carousel changes when the markers are tapped.
         * "track": The carousel changes when it is dragged.
         * "swipe": The carousel changes when it is swiped.
         * "auto": The carousel auto scrolls. All other types are ignored.
         * default: The carousel changes when it is dragged or swiped.
         */
        type?: string;

        /**
         * @name orientation
         * @memberof platui.ICarouselOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The swipe direction of the {@link platui.Carousel|Carousel}. 
         * Defaults to "horizontal".
         * 
         * @remarks
         * - "horizontal" - horizontal control.
         * - "vertical" - vertical control.
         */
        orientation?: string;

        /**
         * @name index
         * @memberof platui.ICarouselOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The starting index of the {@link platui.Carousel|Carousel}.
         */
        index?: number;

        /**
         * @name interval
         * @memberof platui.ICarouselOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The interval automatic scroll time (in ms) for when the {@link platui.Carousel|Carousel} 
         * is type "auto". Defaults to 3000 (i.e. 3 seconds).
         */
        interval?: number;

        /**
         * @name suspend
         * @memberof platui.ICarouselOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The amount of time after a user interaction that the {@link platui.Carousel|Carousel} will wait before 
         * restarting its interval automatic scroll time if its type includes "auto" but is not only "auto". 
         * Defaults to 3000 (i.e. 3 seconds).
         */
        suspend?: number;

        /**
         * @name infinite
         * @memberof platui.ICarouselOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Enables infinite scrolling.
         */
        infinite?: boolean;
    }
}
