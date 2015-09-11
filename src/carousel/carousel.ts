/// <reference path="../references.d.ts" />

module platui {
    /**
     * @name Carousel
     * @memberof platui
     * @kind class
     *
     * @extends {plat.ui.controls.ForEach}
     * @implements {plat.observable.ISupportTwoWayBinding, platui.IUIControl}
     *
     * @description
     * An extension of the {@link plat.ui.controls.ForEach|ForEach} that acts as a HTML template carousel
     * and can bind the selected index to a value.
     */
    export class Carousel extends plat.ui.controls.ForEach implements plat.observable.ISupportTwoWayBinding, IUiControl {
        protected static _inject: any = {
            _document: __Document,
            _window: __Window,
            _compat: __Compat,
            _TemplateControlFactory: __TemplateControlFactory
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
        templateString: string =
        '<div class="plat-carousel-viewport">\n' +
        '    <div class="plat-carousel-container"></div>\n' +
        '</div>\n';

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
         * @name _compat
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {plat.Compat}
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
         * @name _TemplateControlFactory
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {plat.ui.ITemplateControlFactory}
         *
         * @description
         * Reference to the {@link plat.ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
         */
        protected _TemplateControlFactory: plat.ui.ITemplateControlFactory;

        /**
         * @name _listeners
         * @memberof plat.ui.BindControl
         * @kind property
         * @access protected
         *
         * @type {Array<plat.IPropertyChangedListener<any>>}
         *
         * @description
         * The set of functions added externally that listens
         * for property changes.
         */
        protected _listeners: Array<plat.IPropertyChangedListener<any>> = [];

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
        protected _isVertical: boolean = false;

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
        protected _hasSwiped: boolean = false;

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
        protected _inTouch: boolean = false;

        /**
         * @name _hasMoved
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the user is currently touching the screen and has moved.
         */
        protected _hasMoved: boolean = false;

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
        protected _loaded: boolean = false;

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
        protected _index: number = -1;

        /**
         * @name _previousIndex
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {number}
         *
         * @description
         * The previous index of the {@link platui.Carousel|Carousel} in relation to the item nodes.
         */
        protected _previousIndex: number = -1;

        /**
         * @name _nextIndex
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {number}
         *
         * @description
         * The next index of the {@link platui.Carousel|Carousel} in relation to the item nodes.
         */
        protected _nextIndex: number = -1;

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
        protected _currentOffset: number = 0;

        /**
         * @name _viewport
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {HTMLElement}
         *
         * @description
         * Denotes the viewing window of the control.
         */
        protected _viewport: HTMLElement;

        /**
         * @name _container
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {HTMLElement}
         *
         * @description
         * Denotes the sliding element and item container contained within the control.
         */
        protected _container: HTMLElement;

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
        protected _isAuto: boolean = false;

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
        protected _isPaused: boolean = false;

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
        protected _selfPause: boolean = false;

        /**
         * @name _itemNodes
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {Array<Node>}
         *
         * @description
         * An Array of all the current nodes in the control.
         */
        protected _itemNodes: Array<Node> = [];

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
         * @name _outerStart
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the start outer item node has been initialized.
         */
        protected _outerStart: boolean = false;

        /**
         * @name _outerEnd
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the end outer item node has been initialized.
         */
        protected _outerEnd: boolean = false;

        /**
         * @name _goToIntervalConstant
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         *
         * @type {number}
         *
         * @description
         * An interval constant used to regulate the speed of the auto scroll
         * when the goToIndex function is called and is not direct.
         */
        protected _goToIntervalConstant: number = 125;

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
            this.dom.addClass(element || this.element, `${__Carousel} ${(className || '')}`);
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
        contextChanged(newValue: Array<any>, oldValue: Array<any>): void {
            let utils = this.utils;

            if (utils.isFunction(this._onLoad)) {
                if (utils.isArray(newValue)) {
                    this._setListener();
                } else {
                    this._log.debug(`${this.type} context set to something other than an Array.`);
                    newValue = [];
                }

                this._executeEvent([{
                    object: newValue,
                    type: 'splice'
                }]);

                this._initializeIndex(0);
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
            let itemContainer = this._document.createElement('div');

            itemContainer.className = `${__Carousel}-item`;
            itemContainer.appendChild(this.innerTemplate);
            this.bindableTemplates.add('item', itemContainer);
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
            let utils = this.utils,
                context = this.context;

            if (!utils.isArray(context)) {
                this._log.warn(`The context of a ${this.type} must be an Array.`);
                return;
            }

            // since we're extending the ForEach, we must set this animate to false as it refers to item manipulation.
            this._animate = false;

            let optionObj = this.options || <plat.observable.IObservableProperty<ICarouselOptions>>{},
                options = optionObj.value || <ICarouselOptions>{},
                index = options.index,
                isNumber = utils.isNumber,
                orientation = this._validateOrientation(options.orientation),
                interval = options.interval,
                intervalNum = this._interval = isNumber(interval) ? Math.abs(interval) : 3000,
                suspend = options.suspend,
                viewport = this._viewport = <HTMLElement>this.element.firstElementChild;

            this._container = <HTMLElement>viewport.firstElementChild;
            this._type = options.type || 'track swipe';
            this._isInfinite = options.infinite === true;
            this._suspend = Math.abs(isNumber(suspend) ? intervalNum - suspend : intervalNum - 3000);

            this.dom.addClass(this.element, __Plat + orientation);

            this._onLoad = (): void => {
                let setIndex = this._index;

                index = isNumber(index) && index >= 0 ? index < context.length ? index : (context.length - 1) : null;
                this._index = 0;
                this._initializeIndex(index === null ? setIndex : index);
                this._addEventListeners();
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
         * @returns {plat.async.IThenable<boolean>} A promise that resolves when the next index has been
         * reached and the animation is complete. The promise resolves with true if successful.
         */
        goToNext(): plat.async.IThenable<boolean> {
            return this._goToNext(false);
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
         * @returns {plat.async.IThenable<boolean>} A promise that resolves when the previous index has been
         * reached and the animation is complete. The promise resolves with true if successful.
         */
        goToPrevious(): plat.async.IThenable<boolean> {
            return this._goToPrevious(false);
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
         * @param {boolean} direct? If true, will go straight to the specified index without transitioning.
         *
         * @returns {plat.async.IThenable<boolean>} A promise that resolves when the index has been
         * reached and the animation is complete. The promise resolves with true if successful.
         */
        goToIndex(index: number, direct?: boolean): plat.async.IThenable<boolean> {
            return this._goToIndex(index, false, direct);
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
            this._listeners = [];
            this._removeEventListeners();
        }

        /**
         * @name onInput
         * @memberof plat.ui.BindControl
         * @kind function
         * @access public
         *
         * @description
         * Adds a listener to be called when the bindable property changes.
         *
         * @param {plat.IPropertyChangedListener<any>} listener The function that acts as a listener.
         *
         * @returns {plat.IRemoveListener} A function to stop listening for property changes.
         */
        onInput(listener: (newValue: any, oldValue: any) => void): plat.IRemoveListener {
            let listeners = this._listeners;

            listeners.push(listener);

            return (): void => {
                let index = listeners.indexOf(listener);
                if (index === -1) {
                    return;
                }

                listeners.splice(index, 1);
            };
        }

        /**
         * @name inputChanged
         * @memberof plat.ui.BindControl
         * @kind function
         * @access public
         *
         * @description
         * A function that signifies when this control's bindable property has changed.
         *
         * @param {any} newValue The new value of the property after the change.
         * @param {any} oldValue? The old value of the property prior to the change.
         *
         * @returns {void}
         */
        inputChanged(newValue: any, oldValue?: any): void {
            if (newValue === oldValue) {
                return;
            }

            let listeners = this._listeners,
                length = listeners.length;

            for (let i = 0; i < length; ++i) {
                listeners[i](newValue, oldValue);
            }
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
            let utils = this.utils;

            if (utils.isNull(index)) {
                if (firstTime === true) {
                    this._index = 0;
                    this.inputChanged(0, index);
                    return;
                }
            } else if (!utils.isNumber(index)) {
                index = Number(index);
                if (!utils.isNumber(index)) {
                    this._log.debug(`${this.type} has it's index bound to a property that cannot be interpreted as a Number.`);
                    return;
                }
            } else if (index < 0) {
                this._index = 0;
                this.inputChanged(0, index);
                this._initializeIndex(0);
                return;
            }

            if (!this._loaded) {
                this._index = index;
                return;
            }

            this._goToIndex(index, true, firstTime === true);
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
            let animationOptions: plat.IObject<string> = {};
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
            let context = this.context,
                index = this._index;

            if (!this.utils.isArray(context) || context.length === 0) {
                if (!this.utils.isUndefined(index)) {
                    this.inputChanged((this._index = undefined), index);
                }
                this._container.style[<any>this._transform] = this._calculateStaticTranslation(-this._currentOffset);
                this._removeEventListeners();
                this._checkArrows();
                return;
            }

            let maxIndex = context.length - 1;
            if (index > maxIndex) {
                this.goToIndex(maxIndex);
                return;
            }

            this._checkArrows();
        }

        /**
         * @name _setIndexWindow
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Sets the previous and next indices in relation to item nodes according to the current index.
         *
         * @returns {void}
         */
        protected _setIndexWindow(): void {
            let index = this._index,
                lastIndex = this._itemNodes.length - 1;

            if (lastIndex < 0) {
                this._previousIndex = this._nextIndex = lastIndex;
            } else if (index >= lastIndex) {
                if (index > lastIndex) {
                    index = this._index = lastIndex;
                }
                this._previousIndex = index - 1;
                this._nextIndex = this._isInfinite ? 0 : -1;
            } else if (index <= 0) {
                if (index < 0) {
                    index = this._index = 0;
                }
                this._previousIndex = this._isInfinite ? lastIndex : -1;
                this._nextIndex = index + 1;
            } else {
                this._previousIndex = index - 1;
                this._nextIndex = index + 1;
            }
        }

        /**
         * @name _goToNext
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Advances the position of the {@link platui.Carousel|Carousel} to the next state.
         *
         * @param {boolean} inputChanged Whether or not this was the result of a bound input change.
         *
         * @returns {plat.async.IThenable<boolean>} A promise that resolves when the next index has been reached.
         * Resolves with true if successful.
         */
        protected _goToNext(inputChanged: boolean): plat.async.IThenable<boolean> {
            return this._Promise.all(this._addQueue).then((): plat.async.IThenable<boolean> => {
                let index = this._index,
                    reset = false;

                if ((index >= this._itemNodes.length - 1) && !(reset = this._isInfinite)) {
                    if (this._isAuto && !this._isPaused) {
                        this.pause();
                        this._selfPause = true;
                    }

                    return this._Promise.resolve(false);
                }

                let length = this._getLength();
                if (!length) {
                    return this.goToIndex(this._nextIndex, true);
                }

                return this._cancelCurrentAnimations().then((): plat.async.IThenable<boolean> => {
                    if (!this._outerEnd) {
                        this._initializeOuterNodes();
                    }

                    let animationOptions: plat.IObject<string> = {};
                    animationOptions[this._transform] = this._calculateStaticTranslation(-length);

                    let animation = this._initiateAnimation({ properties: animationOptions }),
                        nextIndex: number;

                    if (reset) {
                        this._index = nextIndex = 0;
                    } else {
                        nextIndex = ++this._index;
                    }

                    if (!inputChanged) {
                        this.inputChanged(this._index, index);
                    }

                    return animation.then((): boolean => {
                        this._handleNext(nextIndex, length);
                        this._checkArrows();
                        return true;
                    });
                });
            });
        }

        /**
         * @name _goToPrevious
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Changes the position of the {@link platui.Carousel|Carousel} to the previous state.
         *
         * @param {boolean} inputChanged Whether or not this was the result of a bound input change.
         *
         * @returns {plat.async.IThenable<boolean>} A promise that resolves when the previous index has been
         * reached and the animation is complete. The promise resolves with true if successful.
         */
        protected _goToPrevious(inputChanged: boolean): plat.async.IThenable<boolean> {
            return this._Promise.all(this._addQueue).then((): plat.async.IThenable<boolean> => {
                let index = this._index,
                    reset = false;

                if (index <= 0 && !(reset = this._isInfinite)) {
                    return this._Promise.resolve(false);
                } else if (this._selfPause) {
                    this.resume();
                }

                let length = this._getLength();
                if (!length) {
                    return this.goToIndex(this._previousIndex, true);
                }

                return this._cancelCurrentAnimations().then((): plat.async.IThenable<boolean> => {
                    if (!this._outerStart) {
                        this._initializeOuterNodes();
                    }

                    let animationOptions: plat.IObject<string> = {};
                    animationOptions[this._transform] = this._calculateStaticTranslation(length);

                    let animation = this._initiateAnimation({ properties: animationOptions }),
                        previousIndex: number;

                    if (reset) {
                        this._index = previousIndex = this._itemNodes.length - 1;
                    } else {
                        previousIndex = --this._index;
                    }

                    if (!inputChanged) {
                        this.inputChanged(this._index, index);
                    }

                    return animation.then((): boolean => {
                        this._handlePrevious(previousIndex, -length);
                        this._checkArrows();
                        return true;
                    });
                });
            });
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
         * @param {boolean} inputChanged Whether or not this was the result of a bound input change.
         * @param {boolean} direct? If true, will go straight to the specified index without transitioning.
         *
         * @returns {plat.async.IThenable<boolean>} A promise that resolves when the index has been
         * reached and the animation is complete. The promise resolves with true if successful.
         */
        protected _goToIndex(index: number, inputChanged: boolean, direct?: boolean): plat.async.IThenable<boolean> {
            return this._Promise.all(this._addQueue).then((): plat.async.IThenable<boolean> => {
                let oldIndex = this._index;

                if (this.utils.isUndefined(oldIndex)) {
                    this._initializeIndex(0);
                    this.inputChanged(this._index, index);

                    if (!this._isInfinite) {
                        if (index < this.context.length - 1) {
                            if (this._selfPause) {
                                this.resume();
                            }
                        } else if (this._isAuto && !this._isPaused) {
                            this.pause();
                            this._selfPause = true;
                        }
                    }

                    return this._Promise.resolve(true);
                } else if (index === oldIndex) {
                    return this._Promise.resolve(false);
                } else if (direct === true) {
                    this._initializeIndex(index);
                    this.inputChanged(this._index, index);

                    if (!this._isInfinite) {
                        if (index < this.context.length - 1) {
                            if (this._selfPause) {
                                this.resume();
                            }
                        } else if (this._isAuto && !this._isPaused) {
                            this.pause();
                            this._selfPause = true;
                        }
                    }

                    return this._Promise.resolve(true);
                } else if (index - oldIndex > 0 && index === this._nextIndex) {
                    return this._goToNext(inputChanged);
                } else if (index === this._previousIndex) {
                    return this._goToPrevious(inputChanged);
                }

                return this._handleGoToIndex(index, inputChanged);
            });
        }

        /**
         * @name _handleGoToIndex
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Changes the position of the {@link platui.Carousel|Carousel} to the state
         * specified by the input index.
         *
         * @param {number} index The new index of the {@link platui.Carousel|Carousel}.
         * @param {boolean} inputChanged Whether or not this was the result of a bound input change.
         *
         * @returns {plat.async.IThenable<boolean>} A promise that resolves when the index has been reached.
         * Resolves with true if successful.
         */
        protected _handleGoToIndex(index: number, inputChanged: boolean): plat.async.IThenable<boolean> {
            let oldIndex = this._index;

            if (index === oldIndex || index < 0 || index >= this.context.length) {
                return this._Promise.resolve(false);
            } else if (this._selfPause) {
                this.resume();
            }

            if (!this._getLength()) {
                this._initializeIndex(index);
                return this._Promise.resolve(true);
            }

            let _Promise = this._Promise,
                defer = this.utils.defer,
                move: (inputChanged: boolean) => plat.async.IThenable<boolean>,
                diff: number,
                reverseDiff: number;

            if (index > oldIndex) {
                move = this._goToNext;
                diff = index - oldIndex;

                if (this._isInfinite) {
                    reverseDiff = this._itemNodes.length - index + oldIndex;

                    if (reverseDiff < diff) {
                        move = this._goToPrevious;
                        diff = reverseDiff;
                    }
                }
            } else {
                move = this._goToPrevious;
                diff = oldIndex - index;

                if (this._isInfinite) {
                    reverseDiff = this._itemNodes.length - oldIndex + index;

                    if (reverseDiff < diff) {
                        move = this._goToNext;
                        diff = reverseDiff;
                    }
                }
            }

            move = move.bind(this);
            let promises = <Array<plat.async.IThenable<boolean>>>[],
                removeListeners = this._removeListeners,
                constant = this._goToIntervalConstant,
                interval = 0,
                mover = (resolve: (value: any) => any): void => {
                    let remove = defer((): void => {
                        let removeIndex = removeListeners.indexOf(remove);
                        if (removeIndex !== -1) {
                            removeListeners.splice(removeIndex, 1);
                        }

                        resolve(move(inputChanged));
                    }, interval += Math.round(constant / diff));
                    removeListeners.push(remove);
                };

            while (--diff > 0) {
                promises.push(new _Promise<any>(mover));
            }

            promises.push(move(inputChanged));
            return _Promise.all(promises).then((results): boolean => {
                let result = false;
                while (results.length > 0) {
                    result = result || results.pop();
                    if (result) {
                        break;
                    }
                }

                return result;
            });
        }

        /**
         * @name _handleNext
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Handles swapping and translating nodes for a "next" operation.
         *
         * @param {number} index The new index at the time of the animation.
         * @param {number} length The length to statically transition back to.
         *
         * @returns {void}
         */
        protected _handleNext(index: number, length: number): void {
            let isInfinite = this._isInfinite,
                itemNodes = this._itemNodes,
                nodeLength = itemNodes.length,
                isNode = this.utils.isNode;

            if (isInfinite && (nodeLength < 3 || isNode(this._preClonedNode) || isNode(this._postClonedNode))) {
                this._initializeIndex(index);
                return;
            }

            let container = this._container;
            if (this._outerStart) {
                if (isInfinite || index > 1) {
                    this.dom.insertBefore(itemNodes[this._previousIndex], Array.prototype.slice.call(container.childNodes, 0, 3));
                    container.style[<any>this._transform] = this._calculateStaticTranslation(length);
                    this._forceRepaint(container);
                }
            } else {
                this._outerStart = true;
            }

            this._setIndexWindow();

            if (!(isInfinite || index < nodeLength - 1)) {
                return;
            }

            container.insertBefore(itemNodes[this._nextIndex], null);
        }

        /**
         * @name _handlePrevious
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Handles swapping and translating nodes for a "previous" operation.
         *
         * @param {number} index The new index at the time of the animation.
         * @param {number} length The length to statically transition back to.
         *
         * @returns {void}
         */
        protected _handlePrevious(index: number, length: number): void {
            let isInfinite = this._isInfinite,
                itemNodes = this._itemNodes,
                nodeLength = itemNodes.length,
                isNode = this.utils.isNode;

            if (isInfinite && (nodeLength < 3 || isNode(this._preClonedNode) || isNode(this._postClonedNode))) {
                this._initializeIndex(index);
                return;
            }

            let container = this._container;
            if (this._outerEnd) {
                if (isInfinite || index < nodeLength - 2) {
                    this.dom.insertBefore(itemNodes[this._nextIndex], Array.prototype.slice.call(container.childNodes, -3));
                }
            } else {
                this._outerEnd = true;
            }

            this._setIndexWindow();

            if (!(isInfinite || index > 0)) {
                return;
            }

            container.insertBefore(itemNodes[this._previousIndex], container.firstChild);
            container.style[<any>this._transform] = this._calculateStaticTranslation(length);
            this._forceRepaint(container);
        }

        /**
         * @name _clearInnerNodes
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Clears all the inner nodes of the control.
         *
         * @returns {boolean} Whether or not the removal was a success.
         */
        protected _clearInnerNodes(): boolean {
            this._removeClones();
            this._outerStart = this._outerEnd = false;

            let itemNodes = this._itemNodes;
            if (itemNodes.length === 0) {
                return false;
            }

            let childNodes: Array<Node> = Array.prototype.slice.call(this._container.childNodes),
                insertBefore = this.dom.insertBefore;

            switch (childNodes.length) {
                case 9:
                    insertBefore(itemNodes[this._previousIndex], childNodes.splice(0, 3));
                    insertBefore(itemNodes[this._nextIndex], childNodes.splice(-3, 3));
                    insertBefore(itemNodes[this._index], childNodes);
                    break;
                case 6:
                    let next = this._nextIndex,
                        index = this._index;

                    if (next < 0 || next === index) {
                        insertBefore(itemNodes[index], childNodes.splice(-3, 3));
                        insertBefore(itemNodes[index === 0 ? this._previousIndex + 1 : index - 1], childNodes);
                        break;
                    }

                    insertBefore(itemNodes[next], childNodes.splice(-3, 3));
                    insertBefore(itemNodes[index], childNodes);
                    break;
                case 3:
                    insertBefore(itemNodes[this._index], childNodes);
                    break;
            }

            return true;
        }

        /**
         * @name _initializeIndex
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Initializes item nodes at the given index.
         *
         * @param {number} index The new index at the time of the animation.
         *
         * @returns {boolean} Whether or not initialization was a success.
         */
        protected _initializeIndex(index: number): boolean {
            let innerNodesCleared = this._clearInnerNodes();

            if (this._itemNodes.length === 0) {
                index = -1;
            } else if (index < 0) {
                index = 0;
            }

            this._index = index;
            this._setIndexWindow();

            if (!innerNodesCleared) {
                return false;
            }

            let container = this._container;
            container.insertBefore(this._itemNodes[index], null);
            container.style[<any>this._transform] = this._calculateStaticTranslation(-this._currentOffset);
            this._forceRepaint(container);

            this._initializeOuterNodes();
            this._checkArrows();
            return true;
        }

        /**
         * @name _initializeOuterNodes
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Initializes pre and post item nodes for the current index.
         *
         * @returns {void}
         */
        protected _initializeOuterNodes(): void {
            let length = this._getLength();
            if (!length) {
                this._outerStart = this._outerEnd = false;
                return;
            }

            let itemNodes = this._itemNodes,
                container = this._container,
                nodeLength = itemNodes.length,
                nodeToInsert: Node;

            if (nodeLength <= 1) {
                if (this._isInfinite) {
                    this._cloneForInfinite(-length);
                    return;
                }
            } else {
                let isNode = this.utils.isNode;
                if (!this._outerEnd) {
                    nodeToInsert = itemNodes[this._nextIndex];
                    if (isNode(nodeToInsert)) {
                        container.insertBefore(nodeToInsert, null);
                        this._outerEnd = true;
                    }
                }

                if (nodeLength > 2) {
                    if (!this._outerStart && (this._isInfinite || this._index > 0)) {
                        nodeToInsert = itemNodes[this._previousIndex];
                        if (isNode(nodeToInsert)) {
                            container.insertBefore(nodeToInsert, container.firstChild);
                            container.style[<any>this._transform] = this._calculateStaticTranslation(-length);
                            this._forceRepaint(container);
                            this._outerStart = true;
                        }
                    }
                } else if (this._isInfinite) {
                    this._cloneForInfinite(-length);
                }
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
         * @returns {plat.async.IThenable<void>} A promise that resolves when the animation is complete.
         */
        protected _initiateAnimation(animationOptions: plat.ui.animations.ISimpleCssTransitionOptions): plat.async.IThenable<void> {
                return this._animationThenable =
                    <plat.ui.animations.IAnimationThenable<any>>this._animator.animate(this._container, __Transition, animationOptions);
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
            let addQueue = this._addQueue,
                itemCount = this.context.length;

            this._setAliases();

            let addPromise = this._addItems(0, itemCount, 0).then((): void => {
                let index = addQueue.indexOf(addPromise);
                if (index !== -1) {
                    addQueue.splice(index, 1);
                }

                this._onLoad();
            }).catch((): void => {
                this._log.debug(`An error occurred while processing the ${this.type}. Please ensure you're context is correct.`);
                this._loaded = false;
                return;
            });

            addQueue.push(addPromise);

            this._setListener();
            this._setTransform();
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
            let types = this._type.split(' ');

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
            let removeListeners = this._removeListeners;
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
         * @name _cloneForInfinite
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Create the clones case where item length is less than 3.
         *
         * @param {number} length The length to translate the offset clone.
         *
         * @returns {void}
         */
        protected _cloneForInfinite(length: number): void {
            this._removeClones();

            let context = this.context;
            if (!this.utils.isArray(context) || context.length === 0) {
                return;
            }

            let outerStart = this._outerStart,
                outerEnd = this._outerEnd;

            if (outerStart && outerEnd) {
                return;
            }

            let container = this._container;
            if (!outerEnd) {
                let postClone = this._postClonedNode = <HTMLElement>container.firstElementChild.cloneNode(true);
                container.insertBefore(postClone, null);
                this._outerEnd = true;
            }

            if (!outerStart) {
                let preClone = this._preClonedNode = <HTMLElement>container.lastElementChild.cloneNode(true);
                container.insertBefore(preClone, container.firstChild);
                container.style[<any>this._transform] = this._calculateStaticTranslation(length);
                this._forceRepaint(container);
                this._outerStart = true;
            }
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
            let container = this._container,
                preClone = this._preClonedNode,
                postClone = this._postClonedNode,
                isNode = this.utils.isNode;

            if (isNode(preClone) && container.contains(preClone)) {
                container.removeChild(preClone);
            }

            if (isNode(postClone) && container.contains(postClone)) {
                container.removeChild(postClone);
            }

            this._preClonedNode = this._postClonedNode = null;
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
            this._removeInterval = this.utils.setInterval(this.goToNext, this._interval, null, this);
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

            this._removeSuspend = this.utils.defer((): void => {
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
            if (!this.utils.isNode(this._forwardArrow)) {
                this._createArrowElements();
            }

            let removeListeners = this._removeListeners;
            removeListeners.push(this.addEventListener(this._backArrow, __$tap,(): void => {
                this._suspendInterval();
                this.goToPrevious();
            }, false));
            removeListeners.push(this.addEventListener(this._forwardArrow, __$tap,(): void => {
                this._suspendInterval();
                this.goToNext();
            }, false));

            this._checkArrows();
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
            let _document = this._document,
                viewport = this._viewport,
                backArrowContainer = this._backArrow = _document.createElement('div'),
                forwardArrowContainer = this._forwardArrow = _document.createElement('div'),
                backArrow = _document.createElement('span'),
                forwardArrow = _document.createElement('span');

            if (this._isVertical) {
                backArrow.className = `${__Plat}icon-arrow-up`;
                forwardArrow.className = `${__Plat}icon-arrow-down`;
            } else {
                backArrow.className = `${__Plat}icon-arrow-left`;
                forwardArrow.className = `${__Plat}icon-arrow-right`;
            }

            backArrowContainer.className = `${__Plat}back-arrow`;
            forwardArrowContainer.className = `${__Plat}forward-arrow`;
            backArrowContainer.appendChild(backArrow);
            forwardArrowContainer.appendChild(forwardArrow);
            viewport.appendChild(backArrowContainer);
            viewport.appendChild(forwardArrowContainer);
        }

        /**
         * @name _checkArrows
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Checks the validity of the visibility of the forward and back arrows.
         *
         * @returns {void}
         */
        protected _checkArrows(): void {
            let utils = this.utils,
                isNode = utils.isNode;
            if (this._isInfinite || !(isNode(this._forwardArrow) && isNode(this._backArrow))) {
                return;
            }

            let contextLength = this.context.length,
                index = this._index;

            if (utils.isNull(index)) {
                this._backArrow.setAttribute(__Hide, '');
                this._forwardArrow.setAttribute(__Hide, '');
                return;
            }

            if (index <= 0) {
                this._backArrow.setAttribute(__Hide, '');
            } else {
                this._backArrow.removeAttribute(__Hide);
            }

            if (index >= contextLength - 1) {
                this._forwardArrow.setAttribute(__Hide, '');
            } else {
                this._forwardArrow.removeAttribute(__Hide);
            }
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
            let container = this._viewport,
                swipeFn = this._handleSwipe,
                swipe: string,
                reverseSwipe: string;

            if (this._isVertical) {
                swipe = `${__$swipe}up`;
                reverseSwipe = `${__$swipe}down`;
            } else {
                swipe = `${__$swipe}left`;
                reverseSwipe = `${__$swipe}right`;
            }

            let removeListeners = this._removeListeners;
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
            let viewport = this._viewport,
                trackFn = this._track,
                touchEnd = this._touchEnd,
                track: string,
                reverseTrack: string;

            if (this._isVertical) {
                track = `${__$track}up`;
                reverseTrack = `${__$track}down`;
            } else {
                track = `${__$track}left`;
                reverseTrack = `${__$track}right`;
            }

            let removeListeners = this._removeListeners;
            removeListeners.push(this.addEventListener(viewport, track, trackFn, false));
            removeListeners.push(this.addEventListener(viewport, reverseTrack, trackFn, false));
            removeListeners.push(this.addEventListener(viewport, __$touchstart, this._touchStart, false));
            removeListeners.push(this.addEventListener(viewport, __$trackend, touchEnd, false));
            removeListeners.push(this.addEventListener(viewport, __$touchend, touchEnd, false));
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
            let direction = ev.direction.primary,
                hasSwiped = false;

            switch (direction) {
                case 'left':
                    if (!this._isVertical && (this._isInfinite || this._index < this.context.length - 1)) {
                        this._suspendInterval();
                        hasSwiped = true;
                        this.goToNext();
                    }
                    break;
                case 'right':
                    if (!this._isVertical && (this._isInfinite || this._index > 0)) {
                        this._suspendInterval();
                        hasSwiped = true;
                        this.goToPrevious();
                    }
                    break;
                case 'up':
                    if (this._isVertical && (this._isInfinite || this._index < this.context.length - 1)) {
                        this._suspendInterval();
                        hasSwiped = true;
                        this.goToNext();
                    }
                    break;
                case 'down':
                    if (this._isVertical && (this._isInfinite || this._index > 0)) {
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
            this._hasMoved = false;
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
            let inTouch = this._inTouch,
                hasMoved = this._hasMoved,
                hasSwiped = this._hasSwiped;

            this._inTouch = this._hasSwiped = this._hasMoved = false;
            if (!inTouch || hasSwiped) {
                return;
            } else if (this._isAuto && !this._isPaused) {
                this._initiateInterval();
            }

            if (!hasMoved) {
                return;
            }

            let distanceMoved = this._isVertical ? (ev.clientY - this._lastTouch.y) : (ev.clientX - this._lastTouch.x),
                length = this._getLength();

            if (!length) {
                this._reset();
                return;
            } else if (Math.abs(distanceMoved) > Math.ceil(length / 2)) {
                if (distanceMoved < 0) {
                    this.goToNext().then((success): void => {
                        if (!success) {
                            this._reset();
                        }
                    });
                    return;
                }

                this.goToPrevious().then((success): void => {
                    if (!success) {
                        this._reset();
                    }
                });
                return;
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
            if (!this._inTouch) {
                return;
            } else if (!this._hasMoved) {
                this._cancelCurrentAnimations().then((): void => {
                    if (!(this._outerStart && this._outerEnd)) {
                        this._initializeOuterNodes();
                    }
                });
            }

            this._hasMoved = true;
            this.utils.requestAnimationFrame((): void => {
                let translation = this._calculateDynamicTranslation(ev);
                if (translation === null) {
                    return;
                }

                this._container.style[<any>this._transform] = translation;
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
            return this._isVertical ? `translate3d(0,${(this._currentOffset += interval)}px,0)` :
                `translate3d(${(this._currentOffset += interval)}px,0,0)`;
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
            let offset: number;
            if (this._isVertical) {
                offset = ev.clientY - this._lastTouch.y;
                if (Math.abs(offset) > this._getLength()) {
                    this._touchEnd(ev);
                    return null;
                }

                return `translate3d(0,${(this._currentOffset + offset)}px,0)`;
            }

            offset = ev.clientX - this._lastTouch.x;
            if (Math.abs(offset) > this._getLength()) {
                this._touchEnd(ev);
                return null;
            }

            return `translate3d(${(this._currentOffset + offset)}px,0,0)`;
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
            let style = this._container.style,
                isUndefined = this.utils.isUndefined;

            let vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(style[<any>(`${vendorPrefix.lowerCase}Transform`)])) {
                this._transform = `${vendorPrefix.lowerCase}Transform`;
            } else if (!isUndefined(style[<any>(`${vendorPrefix.upperCase}Transform`)])) {
                this._transform = `${vendorPrefix.upperCase}Transform`;
            } else {
                this._transform = 'transform';
            }
        }

        /**
         * @name _getLength
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Gets the interval length of the sliding container.
         *
         * @returns {number} The length of the sliding container.
         */
        protected _getLength(): number {
            return this._isVertical ? this._viewport.offsetHeight : this._viewport.offsetWidth;
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

        /**
         * @name _appendItems
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Adds an Array of items to the element without animating.
         *
         * @param {Array<Node>} items The Array of items to add.
         *
         * @returns {void}
         */
        protected _appendItems(items: Array<Node>): void {
            this._itemNodes = this._itemNodes.concat(items);

            if (this._loaded) {
                let index = this._index;

                // if no remove listeners exist we know that we had previously removed them.
                if (this._removeListeners.length === 0) {
                    this._addEventListeners();
                    this._initializeIndex(0);
                    this.inputChanged(0, index);

                    return;
                }

                if (index >= this._itemNodes.length - 2) {
                    this._initializeIndex(index);
                }
            }
        }

        /**
         * @name _removeItems
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Removes items from the control's element.
         *
         * @param {number} index The index to start disposing from.
         * @param {number} numberOfItems The number of items to remove.
         *
         * @returns {void}
         */
        protected _removeItems(index: number, numberOfItems: number): void {
            let dispose = this._TemplateControlFactory.dispose,
                controls = this.controls,
                itemNodes = this._itemNodes,
                last = index + numberOfItems;

            while (last-- > index) {
                dispose(controls[last]);
                itemNodes.pop();
            }

            this._updateResource(controls.length - 1);
            this._verifyLength();
        }

        /**
         * @name _cancelCurrentAnimations
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Cancels the current animation.
         *
         * @returns {plat.async.IThenable<any>} A promise that resolves when the animation is canceled.
         */
        protected _cancelCurrentAnimations(): plat.async.IThenable<any> {
            if (this.utils.isNull(this._animationThenable)) {
                return this._Promise.resolve();
            }

            return this._animationThenable.cancel();
        }

        /**
         * @name _forceRepaint
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         *
         * @description
         * Forces a repaint / reflow.
         *
         * @param {HTMLElement} element The element to force the repaint / reflow on.
         *
         * @returns {void}
         */
        protected _forceRepaint(element: HTMLElement): void {
            let style = element.style,
                display = style.display,
                none = 'none';

            if (style.display === none) {
                element.offsetWidth;
                return;
            }

            style.display = none;
            element.offsetWidth;
            style.display = display;
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
         * The default behavior is "track swipe".
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
         * The default value is "horizontal".
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
         * Enables infinite scrolling when set to true.
         */
        infinite?: boolean;
    }
}
