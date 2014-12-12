module platui {
    
    /**
     * @name Carousel
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that acts as a HTML template carousel.
     */
    export class Carousel extends plat.ui.TemplateControl implements IUIControl {
        
        /**
         * @name $utils
         * @memberof platui.Carousel
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
         * @name $compat
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $compat: plat.ICompat = plat.acquire(__Compat);
        
        /**
         * @name $document
         * @memberof platui.Carousel
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
         * @name $window
         * @memberof platui.Carousel
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
         * @name $animator
         * @memberof platui.Carousel
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
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString = '<plat-foreach class="plat-carousel-container"></plat-foreach>';

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
         * Used for determining max offset width.
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
         * Used for determining max offset width.
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
            var itemContainer = this.$document.createElement('div');
            itemContainer.className = 'plat-carousel-item';
            itemContainer.appendChild(this.innerTemplate);
            this.element.firstElementChild.appendChild(itemContainer);
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
            var $utils = this.$utils,
                context = this.context;
            if (!$utils.isArray(context)) {
                var Exception = plat.acquire(__ExceptionStatic);
                Exception.warn('The context of a ' + __Carousel + ' must be an Array.');
                return;
            }

            var optionObj = this.options || <plat.observable.IObservableProperty<IDrawerControllerOptions>>{},
                options = optionObj.value || <IDrawerControllerOptions>{},
                orientation = this._orientation = options.orientation || 'horizontal',
                index = options.index;

            this.dom.addClass(this.element, __Plat + orientation);
            index = $utils.isNumber(index) && index >= 0 ? index < context.length ? index : (context.length - 1) : 0;
            this._onLoad = () => {
                this.goToIndex(index);
                this._addEventListeners(orientation);
            };
            this._init();
            this._loaded = true;
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
            if (this._index >= this.context.length - 1) {
                return;
            }

            this._index++;

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(-this._intervalOffset);
            this._initiateAnimation({ properties: animationOptions });
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
            if (this._index <= 0) {
                return;
            }

            this._index--;

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(this._intervalOffset);
            this._initiateAnimation({ properties: animationOptions });
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
            if (index === this._index || index < 0 || index >= this.context.length) {
                return;
            }

            var animationOptions: plat.IObject<string> = {},
                interval = (this._index - index) * this._intervalOffset;

            this._index = index;
            animationOptions[this._transform] = this._calculateStaticTranslation(interval);
            this._initiateAnimation({ properties: animationOptions });
        }

        /**
         * @name reset
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Resets the position of the {@link platui.Carousel|Carousel} to its current state.
         * 
         * @returns {void}
         */
        reset(): void {
            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(0);
            this._initiateAnimation({ properties: animationOptions });
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
            if (!this.$utils.isNull(this._animationThenable)) {
                this._animationThenable = this._animationThenable.cancel().then(() => {
                    this._animationThenable = this.$animator.animate(this._slider, __Transition, animationOptions).then(() => {
                        this._animationThenable = null;
                    });
                });

                return;
            }

            this._animationThenable = this.$animator.animate(this._slider, __Transition, animationOptions).then(() => {
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
            var foreach = <plat.ui.controls.ForEach>this.controls[0];
            this._setTransform();
            this._slider = <HTMLElement>this.element.firstElementChild;

            this.itemsLoaded = foreach.itemsLoaded.then(() => {
                this._setPosition();
                if (!this._intervalOffset) {
                    this._setOffsetWithClone();
                } else {
                    this._onLoad();
                }
            }).catch(() => {
                    var Exception = plat.acquire(__ExceptionStatic);
                    Exception.warn('Error processing ' + __Carousel + '. Please ensure you\'re context is correct.');
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
         * @param {string} orientation The orientation of the {@link platui.Carousel|Carousel}.
         * 
         * @returns {void}
         */
        protected _addEventListeners(orientation: string): void {
            var element = this.element,
                trackFn = this._track,
                touchEnd = this._touchEnd,
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

            this.addEventListener(element, track, trackFn, false);
            this.addEventListener(element, reverseTrack, trackFn, false);
            this.addEventListener(element, __$touchstart, this._touchStart, false);
            this.addEventListener(element, __$trackend, touchEnd, false);
            this.addEventListener(element, __$touchend, touchEnd, false);
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

            if (!this.$utils.isNull(this._animationThenable)) {
                this._animationThenable = this._animationThenable.cancel().then(() => {
                    this._inTouch = true;
                    this._lastTouch = {
                        x: ev.clientX,
                        y: ev.clientY
                    };

                    this._animationThenable = null;
                });
                return;
            }

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

            this.reset();
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
            this._slider.style[<any>this._transform] = this._calculateDynamicTranslation(ev);
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
                isUndefined = this.$utils.isUndefined,
                transform: string;

            if (isUndefined(style.transform)) {
                var vendorPrefix = this.$compat.vendorPrefix;
                if (!isUndefined(style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                    transform = this._transform = vendorPrefix.lowerCase + 'Transform';
                } else if (!isUndefined(style[<any>(vendorPrefix.js + 'Transform')])) {
                    transform = this._transform = vendorPrefix.lowerCase + 'Transform';
                }
            } else {
                transform = this._transform = 'transform';
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
         * @returns {number} The interval length.
         */
        protected _setPosition(element?: HTMLElement): number {
            element = element || <HTMLElement>this.element.firstElementChild;
            switch (this._orientation) {
                case 'vertical':
                    this._positionProperty = 'top';
                    return (this._intervalOffset = element.offsetHeight);
                default:
                    this._positionProperty = 'left';
                    return (this._intervalOffset = element.offsetWidth);
            }
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
         * @returns {void}
         */
        protected _setOffsetWithClone(): void {
            var element = this.element,
                body = this.$document.body;

            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    $exception.warn('Max clone attempts reached before the ' + __Carousel + ' was placed into the ' +
                        'DOM. Disposing of the ' + __Carousel);
                    (<plat.ui.ITemplateControlFactory>plat.acquire(__TemplateControlFactory)).dispose(this);
                    return;
                }

                this.$utils.postpone(this._setOffsetWithClone, null, this);
                return;
            }

            this._cloneAttempts = 0;

            var clone = <HTMLElement>element.cloneNode(true),
                regex = /\d+(?!\d+|%)/,
                $window = this.$window,
                parentChain = <Array<HTMLElement>>[],
                shallowCopy = clone,
                computedStyle: CSSStyleDeclaration,
                width: string;

            shallowCopy.id = '';
            while (!regex.test((width = (computedStyle = $window.getComputedStyle(element)).width))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty('width', width, 'important');
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
            shallowStyle.setProperty('width', width, 'important');
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
