/// <reference path="../references.d.ts" />

module platui {
    /**
     * @name DrawerController
     * @memberof platui
     * @kind class
     *
     * @extends {plat.ui.BindControl}
     *
     * @description
     * An {@link plat.ui.BindControl|BindControl} that manipulates and controls a global drawer.
     */
    export class DrawerController extends plat.ui.BindControl {
        protected static _inject: any = {
            _document: __Document,
            _window: __Window,
            _compat: __Compat,
            _animator: __Animator,
            _Promise: __Promise
        };

        /**
         * @name options
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<platui.IDrawerOptions>}
         *
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IDrawerControllerOptions>;

        /**
         * @name _compat
         * @memberof platui.DrawerController
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
         * @name _window
         * @memberof platui.DrawerController
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
         * @memberof platui.DrawerController
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
         * @name _animator
         * @memberof platui.DrawerController
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
         * @name _Promise
         * @memberof platui.DrawerController
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
         * @name _position
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The position of the global {@link platui.Drawer|Drawer} associated
         * with this control.
         */
        protected _position: string;

        /**
         * @name _drawerElement
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {HTMLElement}
         *
         * @description
         * The HTMLElement of the global {@link platui.Drawer|Drawer} associated
         * with this control.
         */
        protected _drawerElement: HTMLElement;

        /**
         * @name _drawer
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {platui.Drawer}
         *
         * @description
         * The global {@link platui.Drawer|Drawer} associated
         * with this control.
         */
        protected _drawer: Drawer;

        /**
         * @name _transform
         * @memberof platui.DrawerController
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
         * @name _preTransform
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The value of the inline transform property prior to the Drawer manipulating it.
         */
        protected _preTransform: string;

        /**
         * @name _lastTouch
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {plat.ui.IPoint}
         *
         * @description
         * The last touch start recorded.
         */
        protected _lastTouch: plat.ui.IPoint;

        /**
         * @name _hasSwiped
         * @memberof platui.DrawerController
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
         * @name _hasTapped
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the user has tapped.
         */
        protected _hasTapped: boolean = false;

        /**
         * @name _isOpen
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the {@link platui.Drawer|Drawer} is open.
         */
        protected _isOpen: boolean = false;

        /**
         * @name _isElastic
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the {@link platui.Drawer|Drawer} is elastic.
         */
        protected _isElastic: boolean;

        /**
         * @name _touchState
         * @memberof platui.DrawerController
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
         * @name _isVertical
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether the corresponding {@link platui.Drawer|Drawer} is vertical or horizontal.
         */
        protected _isVertical: boolean = false;

        /**
         * @name _useContext
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not to use this control's inherited context.
         */
        protected _useContext: boolean;

        /**
         * @name _removeTap
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function for removing the tap event listener.
         */
        protected _removeTap: plat.IRemoveListener;

        /**
         * @name _removeSwipeOpen
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function for removing the swipe open event listener.
         */
        protected _removeSwipeToggle: plat.IRemoveListener;

        /**
         * @name _removeTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function for removing the primary tracking event listeners.
         */
        protected _removeTrack: plat.IRemoveListener;

        /**
         * @name _openTapRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function for removing the tap event listener on the open {@link platui.Drawer|Drawer}.
         */
        protected _openTapRemover: plat.IRemoveListener;

        /**
         * @name _openSwipeRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function for removing the swipe event listeners on the open {@link platui.Drawer|Drawer}.
         */
        protected _openSwipeRemover: plat.IRemoveListener;

        /**
         * @name _openTrackRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function for removing the swipe event listeners on the open {@link platui.Drawer|Drawer}.
         */
        protected _openTrackRemover: plat.IRemoveListener;

        /**
         * @name _rootElement
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {HTMLElement}
         *
         * @description
         * The root element to translate.
         */
        protected _rootElement: HTMLElement;

        /**
         * @name _clickEater
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {HTMLElement}
         *
         * @description
         * An HTMLElement to eat clicks when the {@link platui.Drawer|Drawer} is open.
         */
        protected _clickEater: HTMLElement;

        /**
         * @name _removeClickEaterListener
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function for removing the click eater scroll listening event.
         */
        protected _removeClickEaterListener: plat.IRemoveListener = noop;

        /**
         * @name _type
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The type of {@link platui.Drawer|Drawer}
         * (i.e. the method by which the {@link platui.Drawer|Drawer} opens and closes).
         */
        protected _type: string;

        /**
         * @name _templateUrl
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * A URL that points to the HTML template.
         */
        protected _templateUrl: string;

        /**
         * @name _directionalTransitionPrep
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * A class name that is used to set styling based on the transition direction.
         */
        protected _directionalTransitionPrep: string;

        /**
         * @name _isTap
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * A value specifying whether the {@link platui.Drawer|Drawer} is waiting for a tap
         * for opening and closing.
         */
        protected _isTap: boolean;

        /**
         * @name _isSwipe
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * A value specifying whether the {@link platui.Drawer|Drawer} is waiting for a swipe
         * for opening and closing.
         */
        protected _isSwipe: boolean;

        /**
         * @name _isTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * A value specifying whether the {@link platui.Drawer|Drawer} is being tracked
         * for opening and closing.
         */
        protected _isTrack: boolean;

        /**
         * @name _toggleDelay
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function to remove the toggle delay if present.
         */
        protected _toggleDelay: plat.IRemoveListener = noop;

        /**
         * @name _animationThenable
         * @memberof platui.DrawerController
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
         * @name _isInitialized
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the this control has been paired with a corresponding {@link platui.Drawer|Drawer}.
         */
        protected _isInitialized: boolean = false;

        /**
         * @name _preInitializedValue
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * A bound value that may have come through prior to initialization.
         */
        protected _preInitializedValue: boolean;

        /**
         * @name initialize
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         *
         * @description
         * Sets the class name on the element.
         *
         * @returns {void}
         */
        initialize(): void {
            this.dom.addClass(this.element, __DrawerController);
        }

        /**
         * @name loaded
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         *
         * @description
         * Initialize the track events on the element.
         *
         * @returns {void}
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IDrawerControllerOptions>>{},
                options = optionObj.value || <IDrawerControllerOptions>{},
                position = options.position,
                id = options.id || '';

            this._type = options.type || 'tap track';
            this._isElastic = options.elastic;
            this._useContext = options.useContext === true;
            this._templateUrl = options.templateUrl;
            this._initializeEvents(id, position);
        }

        /**
         * @name dispose
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         *
         * @description
         * Remove the transition classes off the root element and reset the position and
         * zIndex properties if modified and only if this is the last {@link platui.DrawerController|DrawerController}
         * referencing this {@link platui.Drawer|Drawer}.
         *
         * @returns {void}
         */
        dispose(): void {
            super.dispose();

            var utils = this.utils,
                isNode = utils.isNode,
                drawer = this._drawer,
                rootElement = this._rootElement,
                clickEater = this._clickEater;

            if (!isNode(rootElement)) {
                return;
            }

            if (isNode(clickEater)) {
                this._removeClickEater();
            }

            if (utils.isNull(drawer)) {
                return;
            }

            drawer.spliceController(this);
            if (drawer.controllerCount() > 0) {
                return;
            }

            this.dom.removeClass(rootElement, __Drawer + '-root ' + this._directionalTransitionPrep);

            var storedStyle = drawer.storedProperties;
            if (!utils.isObject(storedStyle)) {
                return;
            }

            var rootElementStyle = rootElement.style,
                parent = rootElement.parentElement,
                overflow = storedStyle.parentOverflow;

            rootElementStyle.position = storedStyle.position;
            rootElementStyle.zIndex = storedStyle.zIndex;
            if (utils.isObject(overflow) && utils.isNode(parent)) {
                parent.style[<any>overflow.key] = overflow.value;
            }

            delete drawer.storedProperties;
            this._drawerElement.setAttribute(__Hide, '');
        }

        /**
         * @name open
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         *
         * @description
         * Opens the {@link platui.Drawer|Drawer}.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        open(): plat.async.IThenable<void> {
            var wasClosed = !this._isOpen,
                utils = this.utils;

            this._toggleDelay();

            var promise = new this._Promise<void>((resolve): void => {
                this._toggleDelay = utils.requestAnimationFrame((): void => {
                    this._open().then(resolve);
                });
            });

            if (wasClosed) {
                var drawer = this._drawer;

                this.inputChanged(true);
                if (!utils.isNull(drawer)) {
                    drawer.inputChanged(true);
                }
            }

            return promise;
        }

        /**
         * @name close
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         *
         * @description
         * Closes the {@link platui.Drawer|Drawer}.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        close(): plat.async.IThenable<void> {
            var wasOpen = this._isOpen,
                utils = this.utils;

            this._toggleDelay();

            var promise = new this._Promise<void>((resolve): void => {
                this._toggleDelay = utils.requestAnimationFrame((): void => {
                    this._close().then(resolve);
                });
            });

            if (wasOpen) {
                var drawer = this._drawer;

                this.inputChanged(false);
                if (!utils.isNull(drawer)) {
                    drawer.inputChanged(false);
                }
            }

            return promise;
        }

        /**
         * @name toggle
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         *
         * @description
         * Toggles the {@link platui.Drawer|Drawer's} open/closed state.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves
         * when the {@link platui.Drawer|Drawer's} state is toggled and the animation is complete.
         */
        toggle(): plat.async.IThenable<void> {
            if (this._isOpen) {
                return this.close();
            }

            return this.open();
        }

        /**
         * @name isOpen
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         *
         * @description
         * Indicates whether the {@link platui.Drawer|Drawer} is currently open.
         *
         * @returns {boolean} Whether or not the {@link platui.Drawer|Drawer} is currently open.
         */
        isOpen(): boolean {
            return this._isOpen;
        }

        /**
         * @name bindTemplate
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         *
         * @description
         * Binds the added HTML template to this control's inherited context and
         * places the node into the {@link platui.Drawer|Drawer}.
         *
         * @param {string} name The template name to bind.
         * @param {Node} node The node to add as a bindable template.
         *
         * @returns {plat.async.IThenable<void>} A promise that fulfills when the template has been bound and inserted.
         */
        bindTemplate(name: string, node: Node): plat.async.IThenable<void> {
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            return bindableTemplates.bind(name).then((template): void => {
                var element = this._drawerElement;
                this.dom.clearNode(element);
                element.appendChild(template);
            }).catch((error): void => {
                this._log.debug('Error binding template for ' + this.type + ': ' + error);
            });
        }

        /**
         * @name observeProperties
         * @memberof platui.DrawerController
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
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the bindable property is set externally.
         *
         * @param {boolean} drawerState The new value of the control's state.
         * @param {boolean} oldValue The old value of the bindable control state.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         *
         * @returns {void}
         */
        protected _setBoundProperty(drawerState: boolean, oldValue: boolean, identifier: void, firstTime?: boolean): void {
            var utils = this.utils;
            if (firstTime === true && utils.isNull(drawerState)) {
                this.inputChanged(this._isOpen);
                return;
            }

            if (utils.isBoolean(drawerState)) {
                if (!this._isInitialized) {
                    this._preInitializedValue = drawerState;
                    return;
                }

                if (drawerState) {
                    if (this._isOpen) {
                        return;
                    }

                    this._toggleDelay();
                    this._toggleDelay = utils.requestAnimationFrame((): void => {
                        this._open();
                    });
                    return;
                }

                if (this._isOpen) {
                    this._toggleDelay();
                    this._toggleDelay = utils.requestAnimationFrame((): void => {
                        this._close();
                    });
                }

                return;
            }

            this._log.debug('Attempting to bind ' + this.type +
                ' with a value that is something other than a boolean.');
        }

        /**
         * @name _open
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Opens the {@link platui.Drawer|Drawer}.
         *
         * @param {boolean} reset? Whether the open is being called to reset the open state.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        protected _open(reset?: boolean): plat.async.IThenable<void> {
            var rootElement = this._rootElement,
                isNode = this.utils.isNode,
                isOpen = this._isOpen,
                offset = this._getOffset();

            if ((isOpen && !reset) || !(offset && isNode(rootElement) && isNode(this._drawerElement))) {
                return this._Promise.resolve();
            }

            var translation: string;
            switch (this._position) {
                case 'left':
                    translation = 'translate3d(' + offset + 'px,0,0)';
                    break;
                case 'right':
                    translation = 'translate3d(' + (-offset) + 'px,0,0)';
                    break;
                case 'top':
                    translation = 'translate3d(0,' + offset + 'px,0)';
                    break;
                case 'bottom':
                    translation = 'translate3d(0,' + (-offset) + 'px,0)';
                    break;
                default:
                    return this._Promise.resolve();
            }

            this._isOpen = true;
            this.dom.addClass(rootElement, this._directionalTransitionPrep);

            if (!isOpen) {
                this._addClickEater();
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = translation;

            return this._animationThenable = this._animator.animate(rootElement, __Transition, {
                properties: animationOptions
            }).then((): void => {
                this._animationThenable = null;
                this._drawerElement.removeEventListener('selectstart', this._preventDefault, false);
            });
        }

        /**
         * @name _close
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Closes the {@link platui.Drawer|Drawer}.
         *
         * @param {boolean} reset? Whether the open is being called to reset the open state.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        protected _close(reset?: boolean): plat.async.IThenable<void> {
            var rootElement = this._rootElement,
                isNode = this.utils.isNode,
                isClosed = !this._isOpen;

            if ((isClosed && !reset) || !(isNode(rootElement) && isNode(this._drawerElement))) {
                return this._Promise.resolve();
            }

            this._isOpen = false;

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._preTransform;

            return this._animationThenable = this._animator.animate(rootElement, __Transition, {
                properties: animationOptions
            }).then((): void => {
                this._animationThenable = null;
                this._drawerElement.removeEventListener('selectstart', this._preventDefault, false);
                if (this._isOpen) {
                    return;
                } else if (this._touchState < 2) {
                    this._removeClickEater();
                }
            });
        }

        /**
         * @name _reset
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Resets the {@link platui.Drawer|Drawer} to it's current open/closed state.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves
         * when the {@link platui.Drawer|Drawer's} state is reset and the animation is complete.
         */
        protected _reset(): plat.async.IThenable<void> {
            if (this._isOpen) {
                return this._open(true);
            }

            return this._close(true);
        }

        /**
         * @name _addClickEater
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Adds a click eater when tracking and closing an open {@link platui.Drawer|Drawer}.
         *
         * @returns {void}
         */
        protected _addClickEater(): void {
            var clickEater = this._clickEater,
                style = clickEater.style,
                rootElement = this._rootElement;

            if (rootElement.contains(clickEater)) {
                return;
            }

            // align clickEater to fill the rootElement
            style.top = rootElement.scrollTop + 'px';
            style.left = rootElement.scrollLeft + 'px';

            rootElement.insertBefore(clickEater, null);
            this.dom.addClass(this._rootElement, this._directionalTransitionPrep);

            var removeScroll: plat.IRemoveListener,
                removeRequest: plat.IRemoveListener = noop,
                ready = true;

            removeScroll = this.addEventListener(rootElement, 'scroll', (): void => {
                if (!ready) {
                    return;
                }

                ready = false;
                removeRequest = this.utils.requestAnimationFrame((): void => {
                    var style = clickEater.style;
                    ready = true;

                    // align clickEater to fill the rootElement
                    style.top = rootElement.scrollTop + 'px';
                    style.left = rootElement.scrollLeft + 'px';
                });
            });

            this._removeClickEaterListener = (): void => {
                removeRequest();
                removeScroll();
            };
        }

        /**
         * @name _removeClickEater
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Removes the click eater after closing an open {@link platui.Drawer|Drawer}.
         *
         * @returns {void}
         */
        protected _removeClickEater(): void {
            var rootElement = this._rootElement,
                clickEater = this._clickEater;

            this._removeClickEaterListener();

            if (rootElement.contains(clickEater)) {
                rootElement.removeChild(clickEater);
            }

            this.dom.removeClass(rootElement, this._directionalTransitionPrep);
        }

        /**
         * @name _addSwipeToggle
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Adds swipe events to the controller element.
         *
         * @returns {void}
         */
        protected _addSwipeToggle(): void {
            var element = this.element,
                removeSwipeOpen = this.addEventListener(element, __$swipe + __transitionNegate[this._position], (): void => {
                    this._hasSwiped = true;
                    this.open();
                }, false),
                removeSwipeClose = this.addEventListener(element, __$swipe + this._position, (): void => {
                    this._hasSwiped = true;
                    this.close();
                }, false);

            this._removeSwipeToggle = (): void => {
                removeSwipeOpen();
                removeSwipeClose();
            };
        }

        /**
         * @name _addSwipeClose
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Adds swipe close event to the root element.
         *
         * @returns {void}
         */
        protected _addSwipeClose(): void {
            this._openSwipeRemover = this.addEventListener(this._clickEater, __$swipe + this._position, (): void => {
                this._hasSwiped = true;
                this.close();
            }, false);
        }

        /**
         * @name _addTapToggle
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Adds tap toggle event to the controller element.
         *
         * @returns {void}
         */
        protected _addTapToggle(): void {
            this._removeTap = this.addEventListener(this.element, __$tap, (): void => {
                this._hasTapped = true;
                this.toggle();
            }, false);
        }

        /**
         * @name _addTapClose
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Adds tap close event to the root element.
         *
         * @returns {void}
         */
        protected _addTapClose(): void {
            this._openTapRemover = this.addEventListener(this._clickEater, __$tap, (): void => {
                this._hasTapped = true;
                this.close();
            }, false);
        }

        /**
         * @name _addEventListeners
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Adds primary and secondary tracking events to the {@link platui.DrawerController|DrawerController} element.
         *
         * @returns {void}
         */
        protected _addEventListeners(): void {
            var element = this.element,
                isNull = this.utils.isNull,
                types = this._type.split(' '),
                position = this._position;

            // remove event listeners here first if we want to later be able to dynamically change position of drawer.
            // this._removeEventListeners();

            if (this._isTap = (types.indexOf('tap') !== -1)) {
                this._addTapToggle();
                this._addTapClose();
            }

            if (this._isSwipe = (types.indexOf('swipe') !== -1)) {
                this._addSwipeToggle();
                this._addSwipeClose();
            }

            if (this._isTrack = (types.indexOf('track') !== -1)) {
                var trackFn = this._track,
                    trackDirection: string,
                    clickEater = this._clickEater;

                switch (position) {
                    case 'left':
                    case 'right':
                        trackDirection = position;
                        break;
                    case 'top':
                        trackDirection = 'up';
                        break;
                    case 'bottom':
                        trackDirection = 'down';
                        break;
                    default:
                        return;
                }

                var primaryTrack = __$track + __transitionNegate[trackDirection],
                    secondaryTrack = __$track + trackDirection,
                    removePrimaryTrack = this.addEventListener(element, primaryTrack, trackFn, false),
                    removeSecondaryTrack = this.addEventListener(element, secondaryTrack, trackFn, false),
                    openTrackPrimaryRemover = this.addEventListener(clickEater, primaryTrack, trackFn, false),
                    openTrackSecondaryRemover = this.addEventListener(clickEater, secondaryTrack, trackFn, false);

                this._removeTrack = (): void => {
                    removePrimaryTrack();
                    removeSecondaryTrack();
                };

                this._openTrackRemover = (): void => {
                    openTrackPrimaryRemover();
                    openTrackSecondaryRemover();
                };

                if (isNull(this._lastTouch)) {
                    var touchStart = this._touchStart,
                        touchEnd = this._touchEnd;

                    this._lastTouch = { x: 0, y: 0 };
                    this.addEventListener(element, __$touchstart, touchStart, false);
                    this.addEventListener(element, __$touchend, touchEnd, false);
                    this.addEventListener(element, __$trackend, touchEnd, false);

                    this.addEventListener(clickEater, __$touchstart, touchStart, false);
                    this.addEventListener(clickEater, __$trackend, touchEnd, false);
                    this.addEventListener(clickEater, __$touchend, touchEnd, false);
                }
            }
        }

        /**
         * @name _removeEventListeners
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Removes all event listeners.
         *
         * @returns {void}
         */
        protected _removeEventListeners(): void {
            var isFunction = this.utils.isFunction;

            if (this._isTap) {
                if (isFunction(this._removeTap)) {
                    this._removeTap();
                    this._removeTap = null;
                }

                if (isFunction(this._openTapRemover)) {
                    this._openTapRemover();
                    this._openTapRemover = null;
                }
            }

            if (this._isTrack) {
                if (isFunction(this._removeTrack)) {
                    this._removeTrack();
                    this._removeTrack = null;
                }

                if (isFunction(this._openTrackRemover)) {
                    this._openTrackRemover();
                    this._openTrackRemover = null;
                }
            }

            if (this._isSwipe) {
                if (isFunction(this._removeSwipeToggle)) {
                    this._removeSwipeToggle();
                    this._removeSwipeToggle = null;
                }

                if (isFunction(this._openSwipeRemover)) {
                    this._openSwipeRemover();
                    this._openSwipeRemover = null;
                }
            }
        }

        /**
         * @name _touchStart
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Log when the user touches the {@link platui.DrawerController|DrawerController}.
         *
         * @param {plat.ui.IGestureEvent} ev The touch event.
         *
         * @returns {void}
         */
        protected _touchStart(ev: plat.ui.IGestureEvent): void {
            if (this._touchState === 1) {
                return;
            }

            this._touchState = 1;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        }

        /**
         * @name _touchEnd
         * @memberof platui.DrawerController
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
            var noTouch = this._touchState === 0,
                hasSwiped = this._hasSwiped,
                hasTapped = this._hasTapped;

            this._hasSwiped = this._hasTapped = false;
            this._touchState = 0;

            if (hasTapped || noTouch || hasSwiped) {
                return;
            }

            var distanceMoved = this._isVertical ? ev.clientY - this._lastTouch.y : ev.clientX - this._lastTouch.x;
            if (this._isRightDirection(distanceMoved)) {
                var offset = this._getOffset();
                if (!offset) {
                    return;
                } else if (Math.abs(distanceMoved) > Math.ceil(offset / 2)) {
                    this.toggle();
                    return;
                }

                this._reset();
            } else if (this._isElastic) {
                if (Math.abs(distanceMoved) > 0) {
                    this._reset();
                }
            } else if (!this._isOpen) {
                this._removeClickEater();
            }
        }

        /**
         * @name _track
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions
         * depending on the defined position.
         *
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         *
         * @returns {void}
         */
        protected _track(ev: plat.ui.IGestureEvent): void {
            var touchState = this._touchState;
            if (touchState === 0) {
                return;
            } else if (touchState === 1) {
                if (!this.utils.isNull(this._animationThenable)) {
                    this._animationThenable.cancel().then((): void => {
                        this._addClickEater();
                        if (this.utils.isNode(this._drawerElement)) {
                            this._drawerElement.addEventListener('selectstart', this._preventDefault, false);
                        }
                    });
                } else {
                    this._addClickEater();
                    if (this.utils.isNode(this._drawerElement)) {
                        this._drawerElement.addEventListener('selectstart', this._preventDefault, false);
                    }
                }

                this._touchState = 2;
            }

            this.utils.requestAnimationFrame((): void => {
                this._rootElement.style[<any>this._transform] = this._calculateTranslation(ev);
            });
        }

        protected _preventDefault(ev: Event): void {
            ev.preventDefault();
        }

        /**
         * @name _isRightDirection
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Checks to make sure the user has been tracking in the right direction to
         * toggle.
         *
         * @param {number} distanceMoved The distance the user's pointer has moved.
         *
         * @returns {boolean} Whether or not the user was tracking in the right direction.
         */
        protected _isRightDirection(distanceMoved: number): boolean {
            switch (this._position) {
                case 'left':
                case 'top':
                    return this._isOpen ? distanceMoved < 0 : distanceMoved > 0;
                case 'right':
                case 'bottom':
                    return this._isOpen ? distanceMoved > 0 : distanceMoved < 0;
                default:
                    return false;
            }
        }

        /**
         * @name _calculateTranslation
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Calculates the translation value for setting the transform value.
         *
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         *
         * @returns {string} The translation value.
         */
        protected _calculateTranslation(ev: plat.ui.IGestureEvent): string {
            var offset = this._getOffset(),
                distanceMoved: number;
            if (!offset) {
                return this._preTransform;
            }

            switch (this._position) {
                case 'left':
                    distanceMoved = this._checkElasticity(offset, ev.clientX - this._lastTouch.x);
                    if (distanceMoved === 0) {
                        return this._preTransform;
                    }
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                case 'right':
                    distanceMoved = this._checkElasticity(offset, this._lastTouch.x - ev.clientX);
                    if (distanceMoved === 0) {
                        return this._preTransform;
                    }
                    return 'translate3d(' + (-distanceMoved) + 'px,0,0)';
                case 'top':
                    distanceMoved = this._checkElasticity(offset, ev.clientY - this._lastTouch.y);
                    if (distanceMoved === 0) {
                        return this._preTransform;
                    }
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'bottom':
                    distanceMoved = this._checkElasticity(offset, this._lastTouch.y - ev.clientY);
                    if (distanceMoved === 0) {
                        return this._preTransform;
                    }
                    return 'translate3d(0,' + (-distanceMoved) + 'px,0)';
                default:
                    return this._preTransform;
            }
        }

        /**
         * @name _checkElasticity
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Checks for elasticity and potentially readjusts the user's
         * distance moved.
         *
         * @param {number} maxOffset The maximum distance the corresponding {@link platui.Drawer|Drawer} can translate.
         * @param {number} delta The distance the user's finger moved.
         *
         * @returns {number} The potentially recalcuated distance moved.
         */
        protected _checkElasticity(maxOffset: number, delta: number): number {
            var distanceMoved = this._isOpen ? maxOffset + delta : delta;
            if (this._isElastic) {
                return distanceMoved;
            }

            if (distanceMoved < 0) {
                distanceMoved = 0;
            } else if (distanceMoved > maxOffset) {
                distanceMoved = maxOffset;
            }

            return distanceMoved;
        }

        /**
         * @name _initializeEvents
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Initializes and dispatches pub sub events.
         *
         * @param {string} id The ID of this {@link platui.DrawerController|DrawerController} if used.
         * @param {string} position The position of the {@link platui.Drawer|Drawer}.
         *
         * @returns {void}
         */
        protected _initializeEvents(id: string, position: string): void {
            var useContext = this._useContext,
                eventRemover = this.on(__DrawerFoundEvent + '_' + id,
                    (event: plat.events.DispatchEvent, drawerArg: IDrawerHandshakeEvent): void => {
                        eventRemover();

                        var utils = this.utils,
                            isString = utils.isString,
                            isUndefined = utils.isUndefined,
                            drawer = (this._drawer = <Drawer>drawerArg.control) || <Drawer>{},
                            drawerElement = this._drawerElement = drawer.element;

                        if (!isString(position)) {
                            if (isString(drawerArg.position)) {
                                position = drawerArg.position;
                            } else {
                                this._log.debug('"position" is incorrectly defined for a control such as "' +
                                    __Drawer + '" or "' + this.type + '."' +
                                    ' Please ensure it is a string.');
                                return;
                            }
                        }

                        drawerElement.removeAttribute(__Hide);
                        if (!this._controllerIsValid(position.toLowerCase())) {
                            return;
                        }

                        this._setTransform();
                        this._addEventListeners();

                        if (isUndefined(this._isElastic)) {
                            this._isElastic = drawerArg.elastic === true;
                        }

                        if (!drawerArg.received) {
                            this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT,
                                <IDrawerControllerHandshakeEvent>{
                                    control: this,
                                    received: true,
                                    position: position,
                                    useContext: useContext
                                });
                        }

                        if (drawerArg.state) {
                            this._isOpen = true;
                            this.inputChanged(true);
                            if (!drawerArg.nextState && utils.isNull(this._preInitializedValue)) {
                                this._preInitializedValue = false;
                            }
                        } else if (drawerArg.nextState && utils.isNull(this._preInitializedValue)) {
                            this._preInitializedValue = true;
                        }

                        var finish = (): void => {
                            this._isInitialized = true;
                            this._checkPreInit();
                        };

                        if (!useContext) {
                            finish();
                            return;
                        }

                        this._determineTemplate(drawerArg.template).then(finish);
                    });

            this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, <IDrawerControllerHandshakeEvent>{
                control: this,
                received: false,
                position: position,
                useContext: useContext
            });
        }

        /**
         * @name _checkPreInit
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Checks the pre-initialized value and handles accordingly.
         *
         * @returns {void}
         */
        protected _checkPreInit(): void {
            var value = this._preInitializedValue;
            if (this.utils.isNull(value)) {
                return;
            }

            var isOpen = this._isOpen;
            if (isOpen && value || !(isOpen || value)) {
                return;
            }

            this._toggleDelay();
            this._toggleDelay = this.utils.requestAnimationFrame((): void => {
                if (value) {
                    this._open();
                    return;
                }

                this._close();
            });
        }

        /**
         * @name _determineTemplate
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Determines the proper HTML template, binds it, and inserts it if needed.
         *
         * @param {Node} fragment? A Node to insert as the {@link platui.Drawer|Drawer's} HTML template
         * if no templateUrl is present on this {@link platui.DrawerController|DrawerController}.
         *
         * @returns {plat.async.IThenable<void>} A promise that fulfills when the template has been determined.
         */
        protected _determineTemplate(fragment?: Node): plat.async.IThenable<void> {
            var utils = this.utils;

            if (utils.isString(this._templateUrl)) {
                return plat.ui.TemplateControl.determineTemplate(this, this._templateUrl).then((template): plat.async.IThenable<void> => {
                    return this.bindTemplate('drawer', template);
                });
            } else if (utils.isNode(fragment)) {
                return this.bindTemplate('drawer', fragment);
            }

            return this._Promise.resolve();
        }

        /**
         * @name _setTransform
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Obtains the current browser's transform property value.
         *
         * @returns {void}
         */
        protected _setTransform(): void {
            var style = this._rootElement.style,
                isUndefined = this.utils.isUndefined;

            var vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(this._preTransform = style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            } else if (!isUndefined(this._preTransform = style[<any>(vendorPrefix.upperCase + 'Transform')])) {
                this._transform = vendorPrefix.upperCase + 'Transform';
            } else {
                this._transform = 'transform';
            }
        }

        /**
         * @name _controllerIsValid
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Checks if this control has all valid properties.
         *
         * @param {string} position The position of the {@link platui.Drawer|Drawer}.
         *
         * @returns {boolean} Whether or not this control is valid.
         */
        protected _controllerIsValid(position: string): boolean {
            var isNull = this.utils.isNull;

            if (isNull(this._drawerElement)) {
                this._log.debug('Could not find a corresponding control such as "' + __Drawer +
                    '" for this "' + this.type + '."');
                return false;
            }

            switch (position) {
                case 'top':
                case 'bottom':
                    this._isVertical = true;
                case 'left':
                case 'right':
                    this._position = position;
                    break;
                default:
                    this._log.debug('Incorrect position: "' + position +
                        '" defined for the a control such as "' +
                        __Drawer + '", or "' + this.type + '."');
                    return false;
            }

            var rootElement = this._rootElement = this._getRootElement();
            if (isNull(rootElement)) {
               this._log.debug('Cannot have a "' + this.type +
                    '" in a hierarchy above the corresponding control such as "' + __Drawer + '."');
                return false;
            }

            var dom = this.dom;
            dom.addClass(rootElement, __Drawer + '-root');
            dom.addClass(this.element, (this._isVertical ? __Plat + 'vertical' : __Plat + 'horizontal'));
            this._directionalTransitionPrep = __Drawer + '-transition-' + position;

            this._clickEater = this._document.createElement('div');
            this._clickEater.className = __Plat + 'clickeater';

            return true;
        }

        /**
         * @name _getRootElement
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Obtains the root element to translate.
         *
         * @returns {HTMLElement} The root element.
         */
        protected _getRootElement(): HTMLElement {
            var drawer = this._drawer,
                utils = this.utils;

            if (!utils.isNull(drawer.storedProperties)) {
                return drawer.storedProperties.rootElement;
            }

            var isNode = utils.isNode,
                root = this.root,
                element = utils.isObject(root) && isNode(root.element) ? root.element : this.element,
                drawerEl = this._drawerElement,
                parent: HTMLElement;

            while (isNode(parent = element.parentElement) && !parent.contains(drawerEl)) {
                element = parent;
            }

            var _window = this._window,
                computedStyle = _window.getComputedStyle(element),
                style = element.style,
                position = computedStyle.position,
                zIndex = Number(computedStyle.zIndex),
                rootElementStyle: {
                    position?: string; zIndex?: string; rootElement?: HTMLElement;
                    parentOverflow?: { key: string; value: string; }
                } = {
                        rootElement: element
                    };

            if (position === 'static') {
                rootElementStyle.position = style.position;
                style.position = 'relative';
            }

            if (!utils.isNumber(zIndex) || zIndex < 1) {
                rootElementStyle.zIndex = style.zIndex;
                style.zIndex = '1';
            }

            if (isNode(parent)) {
                var parentStyle = parent.style,
                    overflow = parentStyle.overflow;

                if (overflow !== 'hidden') {
                    var computedParentStyle = _window.getComputedStyle(parent),
                        computedDirectionalOverflow: string,
                        key: string;

                    if (this._isVertical) {
                        key = 'overflowY';
                        computedDirectionalOverflow = computedParentStyle.overflowY;
                    } else {
                        key = 'overflowX';
                        computedDirectionalOverflow = computedParentStyle.overflowX;
                    }

                    if (computedDirectionalOverflow !== 'hidden') {
                        rootElementStyle.parentOverflow = {
                            key: key,
                            value: parentStyle[<any>key]
                        };
                        parentStyle[<any>key] = 'hidden';
                    }
                }
            }

            drawer.storedProperties = rootElementStyle;

            return element;
        }

        /**
         * @name _getOffset
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         *
         * @description
         * Sets the max offset to translate the corresponding {@link platui.Drawer|Drawer}.
         *
         * @returns {number} The max offset to translate.
         */
        protected _getOffset(): number {
            return this._isVertical ? this._drawerElement.offsetHeight : this._drawerElement.offsetWidth;
        }
    }

    plat.register.control(__DrawerController, DrawerController);

    /**
     * @name IDrawerControllerOptions
     * @memberof platui
     * @kind interface
     *
     * @extends {platui.IDrawerOptions}
     *
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.DrawerController|DrawerController} control.
     */
    export interface IDrawerControllerOptions extends IDrawerOptions {
        /**
         * @name useContext
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * A boolean value stating whether to use the {@link platui.DrawerController|DrawerController's} context instead of the default
         * {@link platui.Drawer|Drawer's} context.
         */
        useContext?: boolean;

        /**
         * @name type
         * @memberof platui.IDrawerControllerOptions
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Specifies how the {@link platui.Drawer|Drawer} should open. Multiple types can be combined by making it space delimited.
         * The default behavior is "tap track".
         *
         * @remarks
         * "tap": The drawer opens when the controller is tapped.
         * "track": The drawer opens when the controller is dragged.
         * "swipe": The drawer opens when the controller is swiped.
         * default: The drawer opens either when the controller is tapped or the
         * controller is tracked.
         */
        type?: string;
    }

    /**
     * @name IDrawerControllerHandshakeEvent
     * @memberof platui
     * @kind interface
     *
     * @extends {platui.IHandshakeEvent}
     *
     * @description
     * An interface for the {@link platui.DrawerController|DrawerController's} event object used during the
     * {@link platui.Drawer|Drawer} / {@link platui.DrawerController|DrawerController} handshake.
     */
    export interface IDrawerControllerHandshakeEvent extends IHandshakeEvent {
        /**
         * @name position
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The position of the {@link platui.Drawer|Drawer}.
         */
        position: string;
        /**
         * @name useContext
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * A boolean value stating whether to use the {@link platui.DrawerController|DrawerController's} context or not.
         */
        useContext: boolean;
    }
}
