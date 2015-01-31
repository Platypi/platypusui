module platui {
    /**
     * @name Carousel
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that acts as a HTML template carousel 
     * and can bind the selected index to a value.
     */
    export class Carousel extends plat.ui.BindablePropertyControl implements IUIControl {
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
        '    <plat-foreach class="plat-carousel-slider"></plat-foreach>\n' +
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
        protected _utils: plat.Utils = plat.acquire(__Utils);

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
        protected _compat: plat.Compat = plat.acquire(__Compat);

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
        protected _document: Document = plat.acquire(__Document);

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
        protected _window: Window = plat.acquire(__Window);

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
        protected _animator: plat.ui.animations.Animator = plat.acquire(__Animator);

        /**
         * @name _orientation
         * @memberof platui.Carousel
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
         * @returns {void}
         */
        contextChanged(): void {
            this._verifyLength();

            if (this._loaded) {
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
                orientation = this._orientation = options.orientation || 'horizontal',
                type = options.type || 'track',
                index = options.index;

            this.dom.addClass(this.element, __Plat + orientation);
            index = _utils.isNumber(index) && index >= 0 ? index < context.length ? index : (context.length - 1) : this._index;
            // reset index in case Bind is setting the value
            this._index = 0;
            this._onLoad = () => {
                this.goToIndex(index);
                this._addEventListeners(type);
            };

            this._init();
            this._loaded = true;
        }

        /**
         * @name setProperty
         * @memberof platui.Toggle
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * @param {boolean} firstSet? A boolean value indicating whether this is the first time 
         * the value is being set.
         * 
         * @returns {void}
         */
        setProperty(newValue: any, oldValue?: any, firstSet?: boolean): void {
            if (!this._utils.isNumber(newValue)) {
                newValue = Number(newValue);
                if (!this._utils.isNumber(newValue)) {
                    return;
                }
            }

            if (this._loaded) {
                this.goToIndex(newValue);
                return;
            }

            this._index = newValue;
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
         * @returns {void}
         */
        goToNext(): void {
            var index = this._index;
            if (index >= this.context.length - 1) {
                return;
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(-this._intervalOffset);
            this._initiateAnimation({ properties: animationOptions });

            this.propertyChanged(++this._index, index);
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
         * @returns {void}
         */
        goToPrevious(): void {
            var index = this._index;
            if (index <= 0) {
                return;
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(this._intervalOffset);
            this._initiateAnimation({ properties: animationOptions });

            this.propertyChanged(--this._index, index);
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
         * @returns {void}
         */
        goToIndex(index: number): void {
            var oldIndex = this._index;
            if (index === oldIndex || index < 0 || index >= this.context.length) {
                return;
            }

            var animationOptions: plat.IObject<string> = {},
                interval = (this._index - index) * this._intervalOffset;

            animationOptions[this._transform] = this._calculateStaticTranslation(interval);
            this._initiateAnimation({ properties: animationOptions });

            this.propertyChanged((this._index = index), oldIndex);
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
            var maxIndex = this.context.length - 1,
                maxOffset = maxIndex * this._intervalOffset;

            if (-this._currentOffset > maxOffset) {
                this.goToIndex(maxIndex);
            }
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
         * @returns {void}
         */
        protected _initiateAnimation(animationOptions: plat.ui.animations.ISimpleCssTransitionOptions): void {
            if (!this._utils.isNull(this._animationThenable)) {
                this._animationThenable = this._animationThenable.cancel().then(() => {
                    this._animationThenable = this._animator.animate(this._slider, __Transition, animationOptions).then(() => {
                        this._animationThenable = null;
                    });
                });

                return;
            }

            this._animationThenable = this._animator.animate(this._slider, __Transition, animationOptions).then(() => {
                this._animationThenable = null;
            });
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
                container = this._container || <HTMLElement>this.element.firstElementChild;

            this._slider = <HTMLElement>container.firstElementChild;
            this._setTransform();

            this.itemsLoaded = foreach.itemsLoaded.then(() => {
                if (this._setPosition()) {
                    this._onLoad();
                }
            }).catch(() => {
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
         * @param {string} type The method of change of the {@link platui.Carousel|Carousel}.
         * 
         * @returns {void}
         */
        protected _addEventListeners(type: string): void {
            var types = type.split(' ');

            if (types.indexOf('tap') !== -1) {
                this._initializeTap();
            }

            if (types.indexOf('swipe') !== -1) {
                this._initializeSwipe();
            }

            if (types.indexOf('track') !== -1) {
                this._initializeTrack();
            }

            this.observeArray(this, __CONTEXT, null, this._verifyLength);

            this.addEventListener(this._window, 'resize', () => {
                this._setPosition();
            }, false);
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
            var _document = this._document,
                element = this.element,
                backArrowContainer = _document.createElement('div'),
                forwardArrowContainer = _document.createElement('div'),
                backArrow = _document.createElement('span'),
                forwardArrow = _document.createElement('span');

            backArrowContainer.className = __Plat + 'back-arrow';
            forwardArrowContainer.className = __Plat + 'forward-arrow';
            backArrowContainer.appendChild(backArrow);
            forwardArrowContainer.appendChild(forwardArrow);
            element.appendChild(backArrowContainer);
            element.appendChild(forwardArrowContainer);

            this.addEventListener(backArrowContainer, __$tap, this.goToPrevious, false);
            this.addEventListener(forwardArrowContainer, __$tap, this.goToNext, false);
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

            switch (this._orientation) {
                case 'horizontal':
                    swipe = __$swipe + 'left';
                    reverseSwipe = __$swipe + 'right';
                    break;
                case 'vertical':
                    swipe = __$swipe + 'up';
                    reverseSwipe = __$swipe + 'down';
                    break;
                default:
                    return;
            }

            this.addEventListener(container, swipe, swipeFn, false);
            this.addEventListener(container, reverseSwipe, swipeFn, false);
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

            switch (this._orientation) {
                case 'horizontal':
                    track = __$track + 'left';
                    reverseTrack = __$track + 'right';
                    break;
                case 'vertical':
                    track = __$track + 'up';
                    reverseTrack = __$track + 'down';
                    break;
                default:
                    return;
            }

            this.addEventListener(container, track, trackFn, false);
            this.addEventListener(container, reverseTrack, trackFn, false);
            this.addEventListener(container, __$touchstart, this._touchStart, false);
            this.addEventListener(container, __$trackend, touchEnd, false);
            this.addEventListener(container, __$touchend, touchEnd, false);
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
                    if (this._orientation === 'horizontal' && this.index + 1 < this.context.length) {
                        hasSwiped = true;
                        this.goToNext();
                    }
                    break;
                case 'right':
                    if (this._orientation === 'horizontal' && this.index - 1 >= 0) {
                        hasSwiped = true;
                        this.goToPrevious();
                    }
                    break;
                case 'up':
                    if (this._orientation === 'vertical' && this.index + 1 < this.context.length) {
                        hasSwiped = true;
                        this.goToNext();
                    }
                    break;
                case 'down':
                    if (this._orientation === 'vertical' && this.index - 1 >= 0) {
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
            }

            if (!this._utils.isNull(this._animationThenable)) {
                this._animationThenable = this._animationThenable.cancel().then(() => {
                    this._animationThenable = null;
                    this._initTouch(ev);
                });
                return;
            }

            this._initTouch(ev);
        }

        /**
         * @name _initTouch
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Indicates touch is in progress and sets the initial touch point 
         * when the user touches the {@link platui.Carousel|Carousel}.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        protected _initTouch(ev: plat.ui.IGestureEvent): void {
            this._inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
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
            }

            var distanceMoved = (this._orientation === 'vertical') ? (ev.clientY - this._lastTouch.y) : (ev.clientX - this._lastTouch.x);
            if (Math.abs(distanceMoved) > Math.ceil(this._intervalOffset / 2)) {
                if (distanceMoved < 0) {
                    if (this._index < this.context.length - 1) {
                        this.goToNext();
                        return;
                    }
                } else if (this._index > 0) {
                    this.goToPrevious();
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
            this._utils.requestAnimationFrame(() => {
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
            if (this._orientation === 'vertical') {
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
            if (this._orientation === 'vertical') {
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
            var style = this.element.style,
                isUndefined = this._utils.isUndefined;

            if (isUndefined(style.transform)) {
                var vendorPrefix = this._compat.vendorPrefix;
                if (!isUndefined(style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                    this._transform = vendorPrefix.lowerCase + 'Transform';
                } else if (!isUndefined(style[<any>(vendorPrefix.upperCase + 'Transform')])) {
                    this._transform = vendorPrefix.lowerCase + 'Transform';
                }
            } else {
                this._transform = 'transform';
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

            switch (this._orientation) {
                case 'vertical':
                    this._positionProperty = 'top';
                    dependencyProperty = 'height';
                    this._intervalOffset = el.offsetHeight;
                    break;
                default:
                    this._positionProperty = 'left';
                    dependencyProperty = 'width';
                    this._intervalOffset = el.offsetWidth;
                    break;
            }

            if (!(isNode || this._intervalOffset)) {
                this._setOffsetWithClone(dependencyProperty);
                return false;
            }

            return true;
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
         * It's default behavior is "track".
         * 
         * @remarks
         * "tap": The carousel changes when the markers are tapped.
         * "track": The carousel changes when it is dragged.
         * "swipe": The carousel changes when it is swiped.
         * default: The carousel changes when it is dragged.
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
    }
}
