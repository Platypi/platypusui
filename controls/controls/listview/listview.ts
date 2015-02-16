module platui {
    /**
     * @name Listview
     * @memberof platui
     * @kind class
     * 
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} for creating a complex list of items with 
     * extensive functionality.
     */
    export class Listview extends plat.ui.TemplateControl implements IUIControl {
        protected static _inject: any = {
            _document: __Document,
            _window: __Window,
            _utils: __Utils,
            _compat: __Compat,
            _animator: __Animator,
            _Promise: __Promise,
            _TemplateControlFactory: __TemplateControlFactory
        };

        /**
         * @name templateString
         * @memberof platui.Listview
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-listview-viewport">\n' +
        '    <div class="plat-scroll-container">\n' +
        '        <div class="plat-container"></div>\n' +
        '    </div>\n' +
        '</div>\n';

        /**
         * @name options
         * @memberof platui.Listview
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IListviewOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IListviewOptions>;

        /**
         * @name context
         * @memberof platui.Listview
         * @kind property
         * @access public
         * 
         * @type {Array<any>}
         * 
         * @description
         * The required context of the control (must be of type Array).
         */
        context: Array<any>;

        /**
         * @name priority
         * @memberof platui.Listview
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
         * @name controls
         * @memberof platui.Listview
         * @kind property
         * @access public
         * 
         * @type {Array<plat.ui.TemplateControl>}
         * 
         * @description
         * The child controls of the control. All will be of type {@link plat.ui.TemplateControl|TemplateControl}.
         */
        controls: Array<plat.ui.TemplateControl>;

        /**
         * @name itemsLoaded
         * @memberof platui.Listview
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
         * @name _window
         * @memberof platui.Listview
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        protected _window: Window;

        /**
         * @name _document
         * @memberof platui.Listview
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
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.Animator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.Animator|Animator} injectable.
         */
        protected _animator: plat.ui.animations.Animator;

        /**
         * @name _Promise
         * @memberof platui.Listview
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
         * @name _utils
         * @memberof platui.Listview
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
         * @memberof platui.Listview
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
         * @name _TemplateControlFactory
         * @memberof platui.Listview
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
         * @name _aliases
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.controls.IForEachAliasOptions}
         * 
         * @description
         * Used to hold the alias tokens for the built-in aliases. You 
         * can overwrite these with the {@link platui.IListviewOptions|options} for 
         * the {@link platui.Listview|Listview} control. 
         */
        protected _aliases: IListviewAliasOptions = {
            index: __listviewAliasOptions.index,
            even: __listviewAliasOptions.even,
            odd: __listviewAliasOptions.odd,
            first: __listviewAliasOptions.first,
            last: __listviewAliasOptions.last,
            group: __listviewAliasOptions.group
        };

        /**
         * @name _container
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The container to which items will be added.
         */
        protected _container: HTMLElement;

        /**
         * @name _viewport
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * An element wrapping the scrollable container to be used for pull-to-refresh.
         */
        protected _viewport: HTMLElement;

        /**
         * @name _scrollContainer
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * An element wrapping the item container for scrolling purposes.
         */
        protected _scrollContainer: HTMLElement;

        /**
         * @name _templates
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * An object containing the node names of the {@link platui.Listview|Listview's} defined templates.
         */
        protected _templates: plat.IObject<boolean> = {};

        /**
         * @name _isVertical
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the control is vertical or horizontal.
         */
        protected _isVertical = true;

        /**
         * @name _itemTemplate
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The normalized node name / item template key if a single item template is being used.
         */
        protected _itemTemplate: string;

        /**
         * @name _templateSelector
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {(item: any, index: number) => string|plat.async.IPromise}
         * 
         * @description
         * The selector function used to obtain the template key for each item.
         */
        protected _templateSelector: (item: any, index: number) => any;

        /**
         * @name _templateSelectorPromise
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.async.IThenable<any>}
         * 
         * @description
         * A promise that denotes that items are currently being rendered.
         */
        protected _templateSelectorPromise: plat.async.IThenable<any>;

        /**
         * @name _templateSelectorKeys
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.IObject<plat.IObject<string>>}
         * 
         * @description
         * An object containing template keys of groups associated with an index.
         */
        protected _templateSelectorKeys: plat.IObject<plat.IObject<string>>;

        /**
         * @name _isLoading
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is currently performing a load operation.
         */
        protected _isLoading = false;

        /**
         * @name _loading
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes how the items in the list should load. Infinite scrolling will call a function whenever more items 
         * are being requested due to the list being 80% scrolled. Returning false will end all item requests. 
         * Returning a promise will pause all other item requests until the promise resolves. Incremental loading 
         * will call a function whenever more items are being requested due to the user requesting more items by 
         * pulling past the end of the list. Returning false will end all item requests. 
         * Returning a promise will pause all other item requests until the promise resolves.
         */
        protected _loading: string;

        /**
         * @name _requestItems
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {() => any}
         * 
         * @description
         * A function that will be called when more items should be added to the list (e.g. - "infinite" and "incremental" loading).
         */
        protected _requestItems: () => any;

        /**
         * @name _loadingProgressRing
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The progress ring used to indicate the loading of items. If the "loading" option is set to "infinite" it is an 
         * infinite scrolling progress ring that is shown when a promise is returned from the _requestItems function and 
         * the infiniteScrollingRing option is not set to false. If the "loading" option is set to "incremental" it is a 
         * progress ring that is shown when the user scrolls past the bottom of the list.
         */
        protected _loadingProgressRing: HTMLElement;

        /**
         * @name _scrollPosition
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current scroll position of the container.
         */
        protected _scrollPosition = 0;

        /**
         * @name _removeScroll
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function that removes the scroll event listener.
         */
        protected _removeScroll: plat.IRemoveListener;

        /**
         * @name _isRefreshing
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is currently performing a refresh operation.
         */
        protected _isRefreshing = false;

        /**
         * @name _refresh
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {() => any}
         * 
         * @description
         * A function that is called when the user pulls the list to refresh its content. 
         * A promise can be returned.
         */
        protected _refresh: () => any;

        /**
         * @name _refreshProgressRing
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * A loading ring that is shown when the user pulls the list to refresh its contents.
         */
        protected _refreshProgressRing: HTMLElement;

        /**
         * @name _touchState
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * An enumeration value signifying the current touch state.
         */
        protected _touchState = 0;

        /**
         * @name _hasMoved
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the user is tracking in a fashion that attempts to refresh the list.
         */
        protected _hasMoved = false;

        /**
         * @name _lastTouch
         * @memberof platui.Listview
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
         * @name _transform
         * @memberof platui.Listview
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
         * @memberof platui.Listview
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
         * @name _touchAnimationThenable
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimationThenable<void>}
         * 
         * @description
         * The most recent touch animation thenable. Used to cancel the current animation if another needs 
         * to begin.
         */
        protected _touchAnimationThenable: plat.ui.animations.IAnimationThenable<void>;

        /**
         * @name _animationThenable
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimationThenable<void>}
         * 
         * @description
         * The most recent item animation thenable.
         */
        protected _animationThenable: plat.async.IThenable<void>;

        /**
         * @name _nodeNormalizeRegex
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression for normalizing a node name by removing potential special characters.
         */
        protected _nodeNormalizeRegex = /-|\.|_/g;

        /**
         * @name _isGrouped
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the select is grouped.
         */
        protected _isGrouped = false;

        /**
         * @name _groups
         * @memberof platui.Listview
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<platui.IGroupHash>}
         * 
         * @description
         * An object that keeps track of unique groups.
         */
        protected _groups: plat.IObject<IGroupHash>;

        /**
         * @name _groupHeaderTemplate
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The normalized node name of the group header template.
         */
        protected _groupHeaderTemplate: string;

        /**
         * @name _groupHeaderTemplatePromise
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * A promise that resolves when the group template has been created.
         */
        protected _groupHeaderTemplatePromise: plat.async.IThenable<void>;

        /**
         * @name _currentAnimation
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimationThenable<any>}
         * 
         * @description
         * The current animation in progress.
         */
        protected _currentAnimation: plat.ui.animations.IAnimationThenable<any>;

        /**
         * @name __listenerSet
         * @memberof platui.Listview
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the main Array listener has been set.
         */
        private __listenerSet = false;

        /**
         * @name __resolveFn
         * @memberof platui.Listview
         * @kind property
         * @access private
         * 
         * @type {() => void}
         * 
         * @description
         * The resolve function for the itemsLoaded promise.
         */
        private __resolveFn: () => void;

        /**
         * @name constructor
         * @memberof platui.Listview
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link platui.Listview|Listview}. Creates the itemsLoaded promise.
         * 
         * @returns {platui.Listview} A {@link platui.Listview|Listview} instance.
         */
        constructor() {
            super();
            this.itemsLoaded = new this._Promise<void>((resolve): void => {
                this.__resolveFn = resolve;
            });
        }

        /**
         * @name setClasses
         * @memberof platui.Listview
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
            this.dom.addClass(element || this.element, __Listview + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Listview
         * @kind function
         * @access public
         * 
         * @description
         * Check for templateUrl and set if needed.
         * 
         * @returns {void}
         */
        initialize(): void {
            var optionObj = this.options || (this.options = <plat.observable.IObservableProperty<IListviewOptions>>{}),
                options = optionObj.value || (optionObj.value = <IListviewOptions>{});

            this.templateUrl = this.templateUrl || options.templateUrl;
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Listview
         * @kind function
         * @access public
         * 
         * @description
         * Parse the innerTemplate and add it to the control's element.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            if (!this._utils.isString(this.templateUrl)) {
                return;
            }

            var fragment = this.dom.serializeHtml(this.templateString),
                element = this.element;

            this.innerTemplate = this.dom.appendChildren(element.childNodes);
            element.appendChild(fragment);
        }

        /**
         * @name contextChanged
         * @memberof platui.Listview
         * @kind function
         * @access public
         * 
         * @description
         * Re-syncs the {@link platui.Listview|Listview} child controls and DOM with the new 
         * array.
         * 
         * @param {Array<any>} newValue? The new Array
         * @param {Array<any>} oldValue? The old Array
         * 
         * @returns {void}
         */
        contextChanged(newValue?: Array<any>, oldValue?: Array<any>): void {
            var _utils = this._utils;
            if (_utils.isEmpty(newValue)) {
                this._removeItems(this.controls.length, this);
            } else if (!_utils.isArray(newValue)) {
                var _Exception = this._Exception;
                _Exception.warn(this.type + ' context must be an Array.', _Exception.CONTEXT);
                return;
            }

            this._setListener();
            this._executeEvent([{
                object: newValue || [],
                type: 'splice'
            }]);

            if (this._isGrouped) {
                this._handleGroupedContextChange(newValue, oldValue);
            }
        }

        /**
         * @name loaded
         * @memberof platui.Listview
         * @kind function
         * @access public
         * 
         * @description
         * Determine item templates and kick off rendering.
         * 
         * @returns {void}
         */
        loaded(): void {
            var options = this.options.value,
                _utils = this._utils,
                isString = _utils.isString,
                viewport = this._viewport = <HTMLElement>this.element.firstElementChild,
                scrollContainer = this._scrollContainer = <HTMLElement>viewport.firstElementChild,
                loading = this._loading = options.loading,
                requestItems = options.onItemsRequested,
                refresh = options.onRefresh,
                itemTemplate = options.itemTemplate,
                _Exception: plat.IExceptionStatic;

            this._container = <HTMLElement>scrollContainer.firstElementChild;
            this.dom.addClass(this.element, __Plat + this._validateOrientation(options.orientation));

            if (!isString(itemTemplate)) {
                _Exception = this._Exception;
                _Exception.warn('No item template or item template selector specified for ' + this.type + '.', _Exception.TEMPLATE);
                return;
            }

            this._parseInnerTemplate();
            this._determineTemplates(itemTemplate, options.groupHeaderTemplate);

            var isLoading = false,
                isRefreshing = false;
            if (isString(loading)) {
                if (isString(requestItems)) {
                    isLoading = true;
                    this._determineLoading(requestItems, options.infiniteProgress !== false);
                } else {
                    _Exception = this._Exception;
                    _Exception.warn(this.type + ' loading type specified as "' + loading +
                        '" but no option specifying an onItemsRequested handler.', _Exception.CONTROL);
                }
            }

            if (isString(refresh)) {
                isRefreshing = true;
                this._initializeRefresh(refresh);
            }

            this._initializeTracking(isLoading, isRefreshing);

            if (!_utils.isArray(this.context)) {
                if (!_utils.isNull(this.context)) {
                    _Exception = this._Exception;
                    _Exception.warn(this.type + '\'s context must be an Array.', _Exception.CONTEXT);
                }
                return;
            }

            this._setAliases();
            this.render();
            this._setListener();
        }

        /**
         * @name dispose
         * @memberof platui.Listview
         * @kind function
         * @access public
         * 
         * @description
         * Removes any potentially held memory.
         * 
         * @returns {void}
         */
        dispose(): void {
            this.__resolveFn = null;
        }

        /**
         * @name render
         * @memberof platui.Listview
         * @kind function
         * @access public
         * 
         * @description
         * Blow out the DOM starting at the index, determine how to render, and render the count accordingly.
         * 
         * @param {number} index? The starting index to render. If not specified, it will start at currentCount.
         * @param {number} count? The number of items to render. If not specified, the whole context 
         * from the specified index will be rendered.
         * @param {platui.IGroupHash} group? The group we're rendering.
         * 
         * @returns {void}
         */
        render(index?: number, count?: number, group?: IGroupHash): void {
            var isNumber = this._utils.isNumber,
                details = this._getGroupDetails(group),
                control = details.control,
                context = this === control ? this.context : control.context.items;

            if (!isNumber(index)) {
                index = 0;
            }

            var maxCount = context.length - index,
                itemCount = isNumber(count) && maxCount >= count ? count : maxCount;

            this._createItems(index, itemCount, group, false);
        }

        /**
         * @name rerender
         * @memberof platui.Listview
         * @kind function
         * @access public
         * 
         * @description
         * Blow out all the DOM, determine how to render, and render accordingly.
         * 
         * @param {platui.IGroupHash} group? The group we're rerendering.
         * 
         * @returns {void}
         */
        rerender(group?: IGroupHash): void {
            this.render(0, null, group);
        }

        /**
         * @name _childContextChanged
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Re-syncs the {@link platui.Listview|Listview} child items and DOM with the new items 
         * array.
         * 
         * @param {string} groupName The group name of the currently changing Array.
         * @param {any} newValue? The new child array of items
         * @param {any} oldValue? The old child array of items
         * 
         * @returns {void}
         */
        protected _childContextChanged(groupName: string, newValue?: Array<any>, oldValue?: Array<any>): void {
            this._executeChildEvent(groupName, [{
                object: newValue || [],
                type: 'splice'
            }]);
        }

        /**
         * @name _handleGroupedContextChange
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Re-syncs the {@link platui.Listview|Listview} child controls and DOM with the new 
         * context object.
         * 
         * @param {any} newValue? The new context
         * @param {any} oldValue? The old context
         * 
         * @returns {void}
         */
        protected _handleGroupedContextChange(newValue?: any, oldValue?: any): void {
            this._Promise.resolve(this._animationThenable).then((): void => {
                var groups = this._groups,
                    keys = Object.keys(groups),
                    length = keys.length,
                    key: string,
                    group: IGroupHash,
                    control: plat.ui.TemplateControl;

                for (var i = 0; i < length; ++i) {
                    key = keys[i];
                    control = groups[key].control;
                    this._childContextChanged(key, control.context.items);
                }
            });
        }

        /**
         * @name _setListener
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Sets a listener for the changes to the array.
         * 
         * @returns {void}
         */
        protected _setListener(): void {
            if (!this.__listenerSet) {
                this.observeArray(this._executeEvent);
                this.__listenerSet = true;
            }
        }

        /**
         * @name _setAliases
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the alias tokens to use for all the items in the {@link platui.Listview|Listview} context array.
         * 
         * @returns {void}
         */
        protected _setAliases(): void {
            var aliases = this.options.value.aliases,
                _utils = this._utils;

            if (!_utils.isObject(aliases)) {
                return;
            }

            var _aliases = this._aliases,
                isString = _utils.isString,
                keys = Object.keys(_aliases),
                length = keys.length,
                value: string;

            for (var i = 0; i < length; ++i) {
                value = aliases[keys[i]];

                if (isString(value)) {
                    _aliases[keys[i]] = value;
                }
            }
        }

        /**
         * @name _determineItemTemplate
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Determine the proper item template or method of item template selection.
         * 
         * @param {string} itemTemplate The property for indicating either the item template or the 
         * item template selector.
         * @param {string} groupHeaderTemplate The property for indicating the group header template.
         * 
         * @returns {void}
         */
        protected _determineTemplates(itemTemplate: string, groupHeaderTemplate: string): void {
            var _Exception: plat.IExceptionStatic,
                _utils = this._utils,
                templateKey = this._normalizeTemplateName(itemTemplate);

            if (_utils.isString(groupHeaderTemplate)) {
                this._isGrouped = true;

                var groupTemplateKey = this._normalizeTemplateName(groupHeaderTemplate);
                if (this._templates[groupTemplateKey] === true) {
                    this._groupHeaderTemplate = groupTemplateKey;
                } else {
                    _Exception = this._Exception;
                    _Exception.warn(__Listview + ' group header template "' + groupHeaderTemplate +
                        '" was not a template defined in the DOM.', _Exception.TEMPLATE);
                }

                this._groupHeaderTemplatePromise = this._createGroupTemplate();
            }

            if (this._templates[templateKey] === true) {
                this._itemTemplate = templateKey;
                return;
            }

            var controlProperty = this.findProperty(itemTemplate) || <plat.IControlProperty>{};
            if (!_utils.isFunction(controlProperty.value)) {
                _Exception = this._Exception;
                _Exception.warn(__Listview + ' item template "' + itemTemplate +
                    '" was neither a template defined in the DOM nor a template selector function in its control hiearchy.',
                    _Exception.TEMPLATE);
                return;
            }

            this._templateSelector = (<Function>controlProperty.value).bind(controlProperty.control);
            this._templateSelectorKeys = {};
        }

        /**
         * @name _createGroupTemplate
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Construct the group template and add it to bindable templates.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when 
         * the group template has been added to bindable templates.
         */
        protected _createGroupTemplate(): plat.async.IThenable<void> {
            var _document = this._document,
                _utils = this._utils,
                options = this.options.value,
                bindableTemplates = this.bindableTemplates,
                groupHeaderTemplate = this._groupHeaderTemplate,
                groupHeader = this._templates[groupHeaderTemplate],
                listviewGroup = __Listview + '-group',
                group = _document.createElement('div'),
                itemContainer = _document.createElement('div'),
                headerPromise: plat.async.IThenable<void>;

            group.className = listviewGroup;
            itemContainer.className = __Listview + '-items';
            if (_utils.isString(groupHeaderTemplate)) {
                headerPromise = bindableTemplates.templates[groupHeaderTemplate].then((headerTemplate): void => {
                    group.insertBefore(headerTemplate.cloneNode(true), null);
                });
            }

            return this._Promise.resolve(headerPromise).then((): void => {
                group.insertBefore(itemContainer, null);
                bindableTemplates.add(listviewGroup, group);
            }).then(null, (error): void => {
                var _Exception = this._Exception;
                _Exception.warn(this.type + ' error: ' + error, _Exception.COMPILE);
            });
        }

        /**
         * @name _addGroups
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Adds new groups to the control's element when items are added to 
         * the context.
         * 
         * @param {number} numberOfGroups The number of groups to add.
         * @param {number} index The point in the array to start adding groups.
         * @param {boolean} animate? Whether or not to animate the new groups.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when all groups have been added to the DOM.
         */
        protected _addGroups(numberOfGroups: number, index: number, animate?: boolean): plat.async.IThenable<void> {
            var _utils = this._utils,
                context = this.context,
                initialIndex = index,
                max = +(index + numberOfGroups);

            var promises = <Array<plat.async.IThenable<DocumentFragment>>>[],
                fragment: DocumentFragment,
                i: number;

            while (index < max) {
                promises.push(this._bindGroup(index++));
            }

            return this._Promise.all(promises).then((fragments): void => {
                var length = fragments.length;
                for (i = 0; i < length; ++i) {
                    this._addGroup(i + initialIndex, fragments[i]);
                }
            });
        }

        /**
         * @name _addGroup
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Adds new group to the control's element.
         * 
         * @param {number} index The index of the group.
         * @param {DocumentFragment} fragment The group fragment to add to the DOM.
         * 
         * @returns {void}
         */
        protected _addGroup(index: number, fragment: DocumentFragment): void {
            var context = this.context,
                groups = this._groups || (this._groups = <plat.IObject<IGroupHash>>{}),
                group: IListviewGroup = context[index],
                name = group.group,
                groupContainer = <HTMLElement>fragment.childNodes[1],
                control = this.controls[index],
                groupHash = groups[name] = {
                    name: name,
                    index: index,
                    element: groupContainer,
                    control: control
                },
                items = 'items',
                removeArrayListener: plat.IRemoveListener,
                removeMutationListener: plat.IRemoveListener;

            control.dispose = (): void => {
                super.dispose();
                delete groups[name];
            };

            control.observe((newValue?: IListviewGroup, oldValue?: IListviewGroup): void => {
                var newName = newValue.group;
                if (newName === name || !this._utils.isObject(newValue)) {
                    return;
                }

                var temp = groups[name];
                delete groups[name];
                temp.name = newName;
                groups[newName] = temp;

                removeArrayListener();
                removeMutationListener();
                removeArrayListener = control.observe(this._childContextChanged.bind(this, newName), items);
                removeMutationListener = control.observeArray(this._executeChildEvent.bind(this, newName), items);
            });
            removeArrayListener = control.observe(this._childContextChanged.bind(this, name), items);
            removeMutationListener = control.observeArray(this._executeChildEvent.bind(this, name), items);

            this._createItems(0, (group.items || []).length, groupHash, false);
            this._container.insertBefore(fragment, null);
        }

        /**
         * @name _bindGroup
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handle binding of a single group.
         * 
         * @param {number} index The index of the group in context.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>}
         */
        protected _bindGroup(index: number): plat.async.IThenable<DocumentFragment> {
            return this.bindableTemplates.bind(__Listview + '-group', index, this._getAliases(this.context, index));
        }

        /**
         * @name _createItems
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Creates a specified number of items.
         * 
         * @param {number} index The index to start creating items.
         * @param {number} count The number of items to create.
         * @param {platui.IGroupHash} group? The group for which we're creating items.
         * @param {boolean} animate? Whether or not to animate the new items.
         * 
         * @returns {void}
         */
        protected _createItems(index: number, count: number, group?: IGroupHash, animate?: boolean): void {
            var _utils = this._utils,
                details = this._getGroupDetails(group),
                control = details.control;

            if (this._isGrouped && this === control) {
                this._groupHeaderTemplatePromise.then((): void => {
                    this._addGroups(count, index);
                }).then(null, (error): void => {
                    var _Exception = this._Exception;
                    _Exception.warn(this.type + ' error: ' + error, _Exception.CONTROL);
                });

                return;
            }

            if (_utils.isFunction(this._templateSelector)) {
                var promises: Array<plat.async.IThenable<void>> = [];
                while (count-- > 0) {
                    promises.push(this._renderUsingFunction(index++, group, animate));
                }
                this.itemsLoaded = <plat.async.IThenable<any>>this._Promise.all(promises);
                return;
            }

            var key = this._itemTemplate;
            if (_utils.isUndefined(this.bindableTemplates.templates[key])) {
                return;
            }

            this._disposeFromIndex(index, group);
            this._addItems(count, index, group, animate);
        }

        /**
         * @name _addItems
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Adds new items to the control's element when items are added to 
         * the array.
         * 
         * @param {number} numberOfItems The number of items to add.
         * @param {number} index The point in the array to start adding items.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         * @param {boolean} animate? Whether or not to animate the new items.
         * 
         * @returns {plat.async.IThenable<void>} The itemsLoaded promise.
         */
        protected _addItems(numberOfItems: number, index: number, group?: IGroupHash, animate?: boolean): plat.async.IThenable<void> {
            var details = this._getGroupDetails(group),
                control = details.control,
                container = details.itemContainer,
                max = +(index + numberOfItems),
                promises: Array<plat.async.IThenable<DocumentFragment>> = [],
                itemTemplate = this._itemTemplate,
                bindableTemplates = control.bindableTemplates,
                initialIndex = index,
                identifier: string,
                context: any;

            if (this === control) {
                identifier = '';
                context = this.context;
            } else {
                identifier = 'items.';
                context = control.context.items;
            }

            while (index < max) {
                promises.push(bindableTemplates.bind(itemTemplate, identifier + index, this._getAliases(context, index++)));
            }

            if (promises.length > 0) {
                this.itemsLoaded = this._Promise.all(promises).then<void>((templates): void => {
                    if (animate === true) {
                        var length = templates.length;
                        for (var i = 0; i < length; ++i) {
                            this._appendAnimatedItem(templates[i], __Enter, container);
                        }
                    } else {
                        this._appendItems(templates, container);
                    }

                    this._updateResource(initialIndex - 1, control);

                    if (this._utils.isFunction(this.__resolveFn)) {
                        this.__resolveFn();
                        this.__resolveFn = null;
                    }
                }).catch((error: any): void => {
                    this._utils.postpone((): void => {
                        var _Exception = this._Exception;
                        _Exception.warn(error, _Exception.BIND);
                    });
                });
            } else {
                if (this._utils.isFunction(this.__resolveFn)) {
                    this.__resolveFn();
                    this.__resolveFn = null;
                }
                this.itemsLoaded = new this._Promise<void>((resolve): void => {
                    this.__resolveFn = resolve;
                });
            }

            return this.itemsLoaded;
        }

        /**
         * @name _renderUsingFunction
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Render items using a defined render function starting at a given index and continuing 
         * through for a set number of items. If undefined or null is returned from the function, 
         * rendering will stop.
         * 
         * @param {number} index The starting index to render.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         * @param {boolean} animate? Whether or not to animate the new items.
         * 
         * @returns {plat.async.IThenable<any>} The promise that fulfills when all items have been rendered.
         */
        protected _renderUsingFunction(index: number, group?: IGroupHash, animate?: boolean): plat.async.IThenable<void> {
            var _Promise = this._Promise,
                _utils = this._utils,
                details = this._getGroupDetails(group),
                control = details.control,
                identifier: any,
                context: any;

            if (this === control) {
                identifier = index;
                context = this.context;
            } else {
                identifier = 'items.' + index;
                context = control.context.items;
            }

            return _Promise.resolve(this._templateSelectorPromise).then((): plat.async.IThenable<any> => {
                return this._templateSelectorPromise = _Promise.resolve<string>(this._templateSelector(context[index], index));
            }).then((selectedTemplate): plat.async.IThenable<any> => {
                var bindableTemplates = control.bindableTemplates,
                    templates = bindableTemplates.templates,
                    controls = <Array<plat.ui.TemplateControl>>control.controls,
                    key = this._normalizeTemplateName(selectedTemplate),
                    name = details.name,
                    templateKeys = this._templateSelectorKeys[name],
                    controlExists = index < controls.length;

                if (_utils.isUndefined(templateKeys)) {
                    templateKeys = this._templateSelectorKeys[name] = <plat.IObject<string>>{};
                }

                if (!_utils.isUndefined(templates[key])) {
                    if (controlExists) {
                        if (key === templateKeys[index]) {
                            return;
                        }

                        templateKeys[index] = key;
                        return <plat.async.IThenable<any>>bindableTemplates.replace(index, key, identifier,
                            this._getAliases(context, index));
                    }

                    templateKeys[index] = key;
                    return bindableTemplates.bind(key, identifier, this._getAliases(context, index));
                } else if (controlExists) {
                    this._TemplateControlFactory.dispose(controls[index]);
                }
            }).then((node): void => {
                if (_utils.isNull(node) || _utils.isArray(node)) {
                    return;
                } else if (animate === true) {
                    this._animator.enter(node, __Enter, details.itemContainer);
                    return;
                }

                details.itemContainer.insertBefore(node, null);
            }).then(null, (error): void => {
                var _Exception = this._Exception;
                _Exception.warn(this.type + ' error: ' + error, _Exception.CONTROL);
            });
        }

        /**
         * @name _updateResources
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Updates the control's children resource objects when 
         * the array changes.
         * 
         * @param {number} index? The index to begin updating.
         * @param {number} count? The number of resources to update.
         * @param {plat.ui.TemplateControl} control The control whose resources are to be updated.
         * 
         * @returns {void}
         */
        protected _updateResource(index: number, control: plat.ui.TemplateControl): void {
            var controls = <Array<plat.ui.TemplateControl>>control.controls;
            if (index < 0 || index >= controls.length) {
                return;
            }

            controls[index].resources.add(this._getAliases(this === control ? this.context : control.context.items, index));
        }

        /**
         * @name _getAliases
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Returns a resource alias object for an item in the array. The 
         * resource object contains index:number, even:boolean, odd:boolean, 
         * first:boolean, and last:boolean.
         * 
         * @param {any} context The context to get the aliases for.
         * @param {number} index The index used to create the resource aliases.
         * 
         * @returns {plat.IObject<plat.ui.IResource>} An object consisting of {@link plat.ui.IResource|Resources}.
         */
        protected _getAliases(context: any, index: number): plat.IObject<plat.ui.IResource> {
            var isEven = (index & 1) === 0,
                aliases: plat.IObject<plat.ui.IResource> = {},
                _aliases = this._aliases,
                type = __LITERAL_RESOURCE;

            aliases[_aliases.index] = {
                value: index,
                type: type
            };

            aliases[_aliases.even] = {
                value: isEven,
                type: type
            };

            aliases[_aliases.odd] = {
                value: !isEven,
                type: type
            };

            aliases[_aliases.first] = {
                value: index === 0,
                type: type
            };

            aliases[_aliases.last] = {
                value: index === (context.length - 1),
                type: type
            };

            return aliases;
        }

        /**
         * @name _getGroupAliases
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Returns a resource alias object for an item in the array. The 
         * resource object contains index:number, even:boolean, odd:boolean, 
         * first:boolean, last:boolean, and group:string.
         * 
         * @param {number} index The index used to create the resource aliases.
         * 
         * @returns {plat.IObject<plat.ui.IResource>} An object consisting of {@link plat.ui.IResource|Resources}.
         */
        //protected _getGroupAliases(index: number): plat.IObject<plat.ui.IResource> {
        //    var aliases: plat.IObject<plat.ui.IResource> = this._getAliases(this.context, index),
        //        _aliases = this._aliases;

        //    aliases[_aliases.group] = {
        //        value: this.context[index].group,
        //        type: __LITERAL_RESOURCE
        //    };

        //    return aliases;
        //}

        /**
         * @name _appendItems
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Adds an Array of items to the element without animating.
         * 
         * @param {Array<Node>} items The Array of items to add.
         * @param {Element} container THe container to add the items to.
         * 
         * @returns {void}
         */
        protected _appendItems(items: Array<Node>, container: Element): void {
            this.dom.appendChildren(items, container);
        }

        /**
         * @name _appendAnimatedItem
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Adds an item to the control's element animating its elements.
         * 
         * @param {DocumentFragment} item The HTML fragment representing a single item.
         * @param {string} key The animation key/type.
         * @param {Element} container THe container to add the items to.
         * 
         * @returns {void}
         */
        protected _appendAnimatedItem(item: DocumentFragment, key: string, container: Element): void {
            if (!this._utils.isNode(item)) {
                return;
            }

            this._animator.enter(item, key, container);
        }

        /**
         * @name _removeItems
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Removes items from the control's element.
         * 
         * @param {number} numberOfItems The number of items to remove.
         * @param {plat.ui.TemplateControl} control The control whose child controls we are to remove.
         * 
         * @returns {void}
         */
        protected _removeItems(numberOfItems: number, control: plat.ui.TemplateControl): void {
            var dispose = this._TemplateControlFactory.dispose,
                controls = <Array<plat.ui.TemplateControl>>control.controls;

            while (numberOfItems-- > 0) {
                dispose(controls.pop());
            }

            this._updateResource(controls.length - 1, control);
        }

        /**
         * @name _disposeFromIndex
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Dispose of the controls and DOM starting at a given index.
         * 
         * @param {number} index The starting index to dispose.
         * @param {platui.IGroupHash} group? The group for which we're disposing items.
         * 
         * @returns {void}
         */
        protected _disposeFromIndex(index: number, group?: IGroupHash): void {
            var controls = <Array<plat.ui.TemplateControl>>this._getGroupDetails(group).control.controls,
                dispose = this._TemplateControlFactory.dispose;

            for (var i = controls.length - 1; i >= index; --i) {
                dispose(controls[i]);
            }
        }

        /**
         * @name _determineLoading
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Find and determine the proper loading function.
         * 
         * @param {string} requestItems The property for indicating the function for requesting more items.
         * @param {boolean} hideRing? Whether or not to hide the progress ring for "incremental" loading.
         * 
         * @returns {void}
         */
        protected _determineLoading(requestItems: string, showRing: boolean): void {
            var controlProperty = this.findProperty(requestItems) || <plat.IControlProperty>{};
            if (!this._utils.isFunction(controlProperty.value)) {
                var _Exception = this._Exception;
                _Exception.warn(__Listview + ' onItemsRequested function "' + requestItems +
                    '" was not found.', _Exception.CONTROL);
                return;
            }

            this._requestItems = (<Function>controlProperty.value).bind(controlProperty.control);

            var progressRingContainer: HTMLElement;
            switch (this._loading) {
                case 'infinite':
                    this._removeScroll = this.addEventListener(this._scrollContainer, 'scroll', this._onScroll, false);

                    if (showRing) {
                        progressRingContainer = this._loadingProgressRing = this._document.createElement('div');
                        progressRingContainer.className = 'plat-infinite';
                        progressRingContainer.insertBefore(this._generateProgressRing(), null);
                    }

                    this.itemsLoaded.then((): void => {
                        this._handleScroll();
                    });
                    break;
                case 'incremental':
                    progressRingContainer = this._loadingProgressRing = this._document.createElement('div');
                    progressRingContainer.className = 'plat-incremental';
                    progressRingContainer.setAttribute(__Hide, '');
                    progressRingContainer.insertBefore(this._generateProgressRing(), null);
                    this.element.insertBefore(progressRingContainer, null);
                    break;
                default:
                    break;
            }
        }

        /**
         * @name _onScroll
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * The scroll event listener.
         * 
         * @param {Event} ev The scroll event object.
         * 
         * @returns {void}
         */
        protected _onScroll(ev?: Event): void {
            var scrollContainer = this._scrollContainer,
                scrollPos = this._scrollPosition,
                scrollPosition = this._isVertical ?
                    scrollContainer.scrollTop + scrollContainer.offsetHeight :
                    scrollContainer.scrollLeft + scrollContainer.offsetWidth;

            if (scrollPos > scrollPosition) {
                this._scrollPosition = scrollPosition;
                return;
            } else if (scrollPos + 5 > scrollPosition) {
                // debounce excessive scroll event calls
                return;
            }

            this._scrollPosition = scrollPosition;
            this._handleScroll();
        }

        /**
         * @name _handleScroll
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if the scrolling has hit the proper threshold and requests more items if it has.
         * 
         * @returns {void}
         */
        protected _handleScroll(): void {
            // infinite scrolling set to load items at 80% of scroll length
            var scrollContainer = this._scrollContainer,
                scrollLength = 0.8 * (this._isVertical ? scrollContainer.scrollHeight : scrollContainer.scrollWidth),
                _utils = this._utils;

            if (scrollLength === 0) {
                return;
            } else if (this._scrollPosition >= scrollLength) {
                var itemsRemain = this._requestItems();
                if (itemsRemain === false) {
                    this._removeScroll();
                } else if (_utils.isPromise(itemsRemain)) {
                    var progressRing = this._loadingProgressRing,
                        showProgress = !_utils.isNull(progressRing),
                        container = this._container;

                    this._removeScroll();
                    if (showProgress) {
                        _utils.requestAnimationFrame((): void => {
                            container.insertBefore(progressRing, null);
                        });
                    }

                    itemsRemain.then((moreItemsRemain: boolean): void => {
                        if (showProgress) {
                            _utils.requestAnimationFrame((): void => {
                                container.removeChild(progressRing);
                            });
                        }

                        if (moreItemsRemain === false) {
                            return;
                        }

                        this._removeScroll = this.addEventListener(scrollContainer, 'scroll', this._onScroll, false);
                    });
                }
            }
        }

        /**
         * @name _initializeRefresh
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Find and determine the pull-to-refresh function.
         * 
         * @param {string} pullRefresh The property for indicating the pull-to-refresh function.
         * 
         * @returns {void}
         */
        protected _initializeRefresh(refresh: string): void {
            var controlProperty = this.findProperty(refresh) || <plat.IControlProperty>{};
            if (!this._utils.isFunction(controlProperty.value)) {
                var _Exception = this._Exception;
                _Exception.warn(__Listview + ' onRefresh function "' + refresh +
                    '" was not found.', _Exception.CONTROL);
                return;
            }

            this._refresh = (<Function>controlProperty.value).bind(controlProperty.control);
            var progressRingContainer = this._refreshProgressRing = this._document.createElement('div');
            progressRingContainer.className = 'plat-refresh';
            progressRingContainer.setAttribute(__Hide, '');
            progressRingContainer.insertBefore(this._generateProgressRing(), null);
            this.element.insertBefore(progressRingContainer, null);
        }

        /**
         * @name _initializeTracking
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes the proper tracking events.
         * 
         * @param {boolean} loading Whether or not to initialize the loading tracking events.
         * @param {boolean} refresh Whether or not to initialize the refresh tracking events.
         * 
         * @returns {void}
         */
        protected _initializeTracking(loading: boolean, refresh: boolean): void {
            if (!(loading || refresh)) {
                return;
            }

            this._setTransform();

            var track: string,
                reverseTrack: string;
            if (this._isVertical) {
                track = __$track + 'down';
                reverseTrack = __$track + 'up';
            } else {
                track = __$track + 'right';
                reverseTrack = __$track + 'left';
            }

            var viewport = this._viewport,
                touchEnd: EventListener,
                trackFn: EventListener;

            this.addEventListener(viewport, __$touchstart, this._touchStart, false);

            if (loading) {
                touchEnd = this._touchEndLoad;
                trackFn = this._trackLoad;
                this.addEventListener(viewport, __$touchend, touchEnd, false);
                this.addEventListener(viewport, __$trackend, touchEnd, false);
                this.addEventListener(viewport, track, trackFn, false);
                this.addEventListener(viewport, reverseTrack, trackFn, false);
            }

            if (refresh) {
                touchEnd = this._touchEndRefresh;
                trackFn = this._trackRefresh;
                this.addEventListener(viewport, __$touchend, touchEnd, false);
                this.addEventListener(viewport, __$trackend, touchEnd, false);
                this.addEventListener(viewport, track, trackFn, false);
                this.addEventListener(viewport, reverseTrack, trackFn, false);
            }
        }

        /**
         * @name _touchStart
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * The touch start event listener for when looking for a refresh.
         * 
         * @param {plat.ui.IGestureEvent} ev The $touchstart event object.
         * 
         * @returns {void}
         */
        protected _touchStart(ev: plat.ui.IGestureEvent): void {
            if (this._touchState !== 0) {
                return;
            }

            this._touchState = 1;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };

            if (!this._utils.isNull(this._touchAnimationThenable)) {
                this._touchAnimationThenable.cancel().then((): void => {
                    this._touchAnimationThenable = null;
                    this._touchState = 2;
                });
                return;
            }

            this._touchState = 2;
        }

        /**
         * @name _touchEndLoad
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * The touch end event listener for when looking for an incremental load.
         * 
         * @param {plat.ui.IGestureEvent} ev The $touchend event object.
         * 
         * @returns {void}
         */
        protected _touchEndLoad(ev: plat.ui.IGestureEvent): void {
            var isLoading = this._isLoading;
            this._isLoading = false;
            if (!isLoading) {
                return;
            }

            var scrollContainer = this._scrollContainer,
                scrollLength: number,
                threshold: number;

            if (this._isVertical) {
                scrollLength = scrollContainer.scrollTop + scrollContainer.offsetHeight;
                threshold = scrollContainer.scrollHeight;
            } else {
                scrollLength = scrollContainer.scrollLeft + scrollContainer.offsetWidth;
                threshold = scrollContainer.scrollWidth;
            }

            if (scrollLength < threshold) {
                return;
            }

            this._touchEnd(ev, false);
        }

        /**
         * @name _touchEndRefresh
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * The touch end event listener for when looking for a refresh.
         * 
         * @param {plat.ui.IGestureEvent} ev The $touchend event object.
         * 
         * @returns {void}
         */
        protected _touchEndRefresh(ev: plat.ui.IGestureEvent): void {
            var isRefreshing = this._isRefreshing;
            this._isRefreshing = false;

            if (!isRefreshing || (this._isVertical ? this._scrollContainer.scrollTop : this._scrollContainer.scrollLeft) > 0) {
                return;
            }

            this._touchEnd(ev, true);
        }

        /**
         * @name _touchEnd
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * A common touch end event listener for both refresh and incremental loading.
         * 
         * @param {plat.ui.IGestureEvent} ev The $touchend event object.
         * @param {boolean} refreshing Whether this translation is for refresh or incremental loading.
         * 
         * @returns {void}
         */
        protected _touchEnd(ev: plat.ui.IGestureEvent, refreshing: boolean): void {
            var state = this._touchState,
                hasMoved = this._hasMoved;

            this._hasMoved = false;
            if (state < 2 || !hasMoved) {
                return;
            }

            var animationOptions: plat.IObject<string> = {},
                dom = this.dom,
                viewport = this._viewport,
                progressRing = refreshing ? this._refreshProgressRing : this._loadingProgressRing,
                isActionState = state === 3,
                nextTranslation: string;

            if (isActionState) {
                var offset: number;
                if (this._isVertical) {
                    offset = refreshing ? progressRing.offsetHeight : -progressRing.offsetHeight;
                    nextTranslation = 'translate3d(0,' + offset + 'px,0)';
                } else {
                    offset = refreshing ? progressRing.offsetWidth : -progressRing.offsetWidth;
                    nextTranslation = 'translate3d(' + offset + 'px,0,0)';
                }
            } else {
                nextTranslation = this._preTransform;
            }

            animationOptions[this._transform] = nextTranslation;
            this._touchAnimationThenable = this._animator.animate(viewport, __Transition, {
                properties: animationOptions
            }).then((): plat.async.IThenable<void> => {
                this._touchState = 4;
                this._hasMoved = false;
                this._touchAnimationThenable = null;
                if (isActionState) {
                    return this._Promise.resolve(refreshing ? this._refresh() : this._requestItems());
                }

                dom.removeClass(viewport, 'plat-manipulation-prep');
                progressRing.setAttribute(__Hide, '');
                return this._Promise.resolve();
            }).then((): plat.ui.animations.IAnimationThenable<void> => {
                if (!isActionState) {
                    this._touchState = 0;
                    return;
                }

                dom.removeClass(progressRing, 'plat-play');
                animationOptions[this._transform] = this._preTransform;
                return this._touchAnimationThenable = this._animator.animate(viewport, __Transition, {
                    properties: animationOptions
                }).then((): void => {
                    this._touchState = 0;
                    this._touchAnimationThenable = null;
                    dom.removeClass(viewport, 'plat-manipulation-prep');
                    progressRing.setAttribute(__Hide, '');
                });
            }).then(null, (error): void => {
                var _Exception = this._Exception;
                _Exception.warn(this.type + 'error: ' + error, _Exception.CONTROL);
            });
        }

        /**
         * @name _trackLoad
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * The tracking event listener for looking for a load.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track[direction] event object.
         * 
         * @returns {void}
         */
        protected _trackLoad(ev: plat.ui.IGestureEvent): void {
            if (!this._isLoading) {
                var scrollContainer = this._scrollContainer,
                    scrollLength: number,
                    threshold: number;

                if (this._isVertical) {
                    if (ev.direction.y !== 'up') {
                        return;
                    }
                    scrollLength = scrollContainer.scrollTop + scrollContainer.offsetHeight;
                    threshold = scrollContainer.scrollHeight;
                } else {
                    if (ev.direction.x !== 'left') {
                        return;
                    }
                    scrollLength = scrollContainer.scrollLeft + scrollContainer.offsetWidth;
                    threshold = scrollContainer.scrollWidth;
                }

                if (scrollLength < threshold) {
                    return;
                }

                this._isLoading = true;
            }

            this._track(ev, false);
        }

        /**
         * @name _trackRefresh
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * The tracking event listener for looking for a refresh.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track[direction] event object.
         * 
         * @returns {void}
         */
        protected _trackRefresh(ev: plat.ui.IGestureEvent): void {
            if (!this._isRefreshing) {
                if (this._isVertical) {
                    if (ev.direction.y !== 'down' || this._scrollContainer.scrollTop > 0) {
                        return;
                    }
                } else  if (ev.direction.x !== 'right' || this._scrollContainer.scrollLeft > 0) {
                    return;
                }

                this._isRefreshing = true;
            }

            this._track(ev, true);
        }

        /**
         * @name _track
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handles the translation of the viewport while tracking.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track[direction] event object.
         * @param {boolean} refreshing Whether this translation is for refresh or incremental loading.
         * 
         * @returns {void}
         */
        protected _track(ev: plat.ui.IGestureEvent, refreshing: boolean): void {
            var touchState = this._touchState;
            if (!(touchState === 2 || touchState === 3)) {
                return;
            }

            this._utils.requestAnimationFrame((): void => {
                this._viewport.style[<any>this._transform] = this._calculateTranslation(ev, refreshing);
            });
        }

        /**
         * @name _calculateTranslation
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the translation value for setting the transform value during tracking.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * @param {boolean} refreshing Whether this translation is for refresh or incremental loading.
         * 
         * @returns {string} The translation value.
         */
        protected _calculateTranslation(ev: plat.ui.IGestureEvent, refreshing: boolean): string {
            var isVertical = this._isVertical,
                progressRing = refreshing ? this._refreshProgressRing : this._loadingProgressRing,
                diff: number,
                threshold: number;

            if (isVertical) {
                diff = ev.clientY - this._lastTouch.y;
                threshold = progressRing.offsetHeight;
            } else {
                diff = ev.clientX - this._lastTouch.x;
                threshold = progressRing.offsetWidth;
            }

            if ((refreshing && diff < 0) || (!refreshing && diff > 0)) {
                diff = 0;
            } else if (!this._hasMoved) {
                this._hasMoved = true;
                this.dom.addClass(this._viewport, 'plat-manipulation-prep');
                progressRing.removeAttribute(__Hide);
            } else if (Math.abs(diff) >= threshold) {
                if (this._touchState < 3) {
                    this._touchState = 3;
                    this.dom.addClass(progressRing, 'plat-play');
                }
            } else if (this._touchState === 3) {
                this._touchState = 2;
                this.dom.removeClass(progressRing, 'plat-play');
            }

            if (isVertical) {
                return 'translate3d(0,' + diff + 'px,0)';
            }
            return 'translate3d(' + diff + 'px,0,0)';
        }

        /**
         * @name _setTransform
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Obtains the current browser's transform property value.
         * 
         * @returns {void}
         */
        protected _setTransform(): void {
            var style = this._viewport.style,
                isUndefined = this._utils.isUndefined;

            if (!isUndefined(this._preTransform = style.transform)) {
                this._transform = 'transform';
            }

            var vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(this._preTransform = style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            } else if (!isUndefined(this._preTransform = style[<any>(vendorPrefix.upperCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
        }

        /**
         * @name _parseTemplates
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Clones and parses thes innerTemplate and creates the templates object.
         * 
         * @returns {void}
         */
        protected _parseInnerTemplate(): void {
            var templates = this._templates,
                bindableTemplates = this.bindableTemplates,
                slice = Array.prototype.slice,
                appendChildren = this.dom.appendChildren,
                childNodes: Array<Node> = slice.call(this.innerTemplate.childNodes),
                length = childNodes.length,
                childNode: Node,
                templateName: string,
                fragment: DocumentFragment;

            while (childNodes.length > 0) {
                childNode = childNodes.pop();
                if (childNode.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }

                fragment = appendChildren(childNode.childNodes);
                templateName = this._normalizeTemplateName(childNode.nodeName);
                bindableTemplates.add(templateName, fragment);
                templates[templateName] = true;
            }
        }

        /**
         * @name _getGroupDetails
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Takes in a group and returns its associated control and its item container. If the group is 
         * null or undefined, it will return this control's details.
         * 
         * @param {platui.IGroupHash} group? The group from which we're trying to get details.
         * 
         * @returns {{ name: string; control: plat.ui.TemplateControl; itemContainer: Element; }} Important details concerning the group.
         */
        protected _getGroupDetails(group?: IGroupHash): { name: string; control: plat.ui.TemplateControl; itemContainer: Element; } {
            if (this._utils.isNull(group)) {
                return {
                    name: 'this',
                    control: this,
                    itemContainer: this._container
                };
            }

            return {
                name: group.name,
                control: group.control,
                itemContainer: group.element.lastElementChild
            };
        }

        /**
         * @name _executeEvent
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Receives an event when a method has been called on an array and maps the array 
         * method to its associated method handler.
         * 
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _executeEvent(changes: Array<plat.observable.IArrayChanges<any>>): void {
            var method = '_' + changes[0].type;
            if (this._utils.isFunction((<any>this)[method])) {
                (<any>this)[method](changes);
            }
        }

        /**
         * @name _executeChildEvent
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Adds new group to the control's element.
         * 
         * @param {string} groupName The group name of the currently changing Array.
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * 
         * @returns {void}
         */
        protected _executeChildEvent(groupName: string, changes: Array<plat.observable.IArrayChanges<any>>): void {
            var method = '_' + changes[0].type;
            if (this._utils.isFunction((<any>this)[method])) {
                (<any>this)[method](changes, this._groups[groupName]);
            }
        }

        /**
         * @name _push
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * First checks if the push will do anything, then handles items being pushed into the array.
         * 
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         * 
         * @returns {void}
         */
        protected _push(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void {
            var change = changes[0];
            this._createItems(change.index, change.addedCount, group, true);
        }

        /**
         * @name _pop
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handles items being popped off the array.
         * 
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         * 
         * @returns {void}
         */
        protected _pop(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void {
            var change = changes[0];
            if (change.removed.length === 0) {
                return;
            }

            var details = this._getGroupDetails(group),
                start = change.object.length;
            this.itemsLoaded.then((): void => {
                this._animateItems(start, 1, __Leave, details.itemContainer, true);
                this._removeItems(1, details.control);
            });
        }

        /**
         * @name _unshift
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handles items being unshifted into the array.
         * 
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         * 
         * @returns {void}
         */
        protected _unshift(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void {
            if (this._utils.isFunction(this._templateSelector)) {
                this.rerender(group);
                return;
            }

            var change = changes[0],
                addedCount = change.addedCount;
            this._createItems(change.object.length - addedCount, addedCount, group, false);
        }

        /**
         * @name _shift
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handles items being shifted off the array.
         * 
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         * 
         * @returns {void}
         */
        protected _shift(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void {
            this.itemsLoaded.then((): void => {
                this._removeItems(1, this._getGroupDetails(group).control);
            });
        }

        /**
         * @name _splice
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handles adding/removing items when an array is spliced.
         * 
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         * 
         * @returns {void}
         */
        protected _splice(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void {
            var _utils = this._utils,
                change = changes[0],
                addCount = change.addedCount;

            if (_utils.isNull(addCount)) {
                var control: plat.ui.TemplateControl = this._getGroupDetails(group).control,
                    newLength = change.object.length;
                this.itemsLoaded.then((): void => {
                    var currentLength = control.controls.length;
                    if (newLength > currentLength) {
                        if (_utils.isFunction(this._templateSelector)) {
                            if (_utils.isNull(change.index)) {
                                this.rerender(group);
                            } else {
                                this.render(change.index, newLength - currentLength, group);
                            }
                            return;
                        }

                        this._createItems(currentLength, newLength - currentLength, group);
                    } else if (currentLength > newLength) {
                        this._removeItems(currentLength - newLength, control);
                    }
                });
                return;
            }

            var removeCount = change.removed.length;
            if (addCount > removeCount) {
                if (_utils.isFunction(this._templateSelector)) {
                    if (_utils.isNull(change.index)) {
                        this.rerender(group);
                    } else {
                        this.render(change.index, addCount, group);
                    }
                    return;
                }

                this._createItems(change.object.length - addCount, addCount - removeCount, group, true);
            } else if (removeCount > addCount) {
                this.itemsLoaded.then((): void => {
                    this._removeItems(removeCount - addCount, this._getGroupDetails(group).control);
                });
            }
        }

        /**
         * @name _sort
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handles when the array is sorted.
         * 
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * 
         * @returns {void}
         */
        //protected _sort(changes: Array<plat.observable.IArrayChanges<any>>): void { }

        /**
         * @name _reverse
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handles when the array is reversed.
         * 
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * 
         * @returns {void}
         */
        //protected _reverse(changes: Array<plat.observable.IArrayChanges<any>>): void { }

        /**
         * @name _calculateBlockLength
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Grabs the blocklength of the specified items.
         * 
         * @param {number} startIndex The starting index of items to count.
         * @param {number} numberOfItems The number of consecutive items to count.
         * 
         * @returns {plat.ui.async.IThenable<void>} A promise that resolves when all animations are complete.
         */
        protected _calculateBlockLength(startIndex: number, numberOfItems: number): number {
            return 0;
        }

        /**
         * @name _animateItems
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Animates the indicated items.
         * 
         * @param {number} startIndex The starting index of items to animate.
         * @param {number} numberOfItems The number of consecutive items to animate.
         * @param {string} key The animation key/type.
         * @param {Element} container The container that holds the elements to animate.
         * @param {boolean} clone? Whether to clone the items and animate the clones or simply animate the items itself.
         * @param {boolean} cancel? Whether or not the animation should cancel all current animations. 
         * Defaults to true.
         * 
         * @returns {plat.ui.async.IThenable<void>} A promise that resolves when all animations are complete.
         */
        protected _animateItems(startIndex: number, numberOfItems: number, key: string, container: Element, clone?: boolean,
            cancel?: boolean): plat.async.IThenable<void> {
            var blockLength = this._calculateBlockLength(startIndex, numberOfItems);
            if (blockLength === 0) {
                return this._Promise.resolve();
            }

            var start = startIndex * blockLength;
            return this._initiateAnimation(start, numberOfItems * blockLength + start, key, container, clone, cancel);
        }

        /**
         * @name _initiateAnimation
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Animates a block of elements.
         * 
         * @param {number} startNode The starting childNode of the ForEach to animate.
         * @param {number} endNode The ending childNode of the ForEach to animate.
         * @param {string} key The animation key/type.
         * @param {Element} container The container that holds the elements to animate.
         * @param {boolean} clone? Whether to clone the items and animate the clones or simply animate the items itself.
         * @param {boolean} cancel? Whether or not the animation should cancel all current animations. 
         * Defaults to true.
         * 
         * @returns {plat.ui.async.IThenable<void>} A promise that resolves when all animations are complete.
         */
        protected _initiateAnimation(startNode: number, endNode: number, key: string, container: Element, clone?: boolean,
            cancel?: boolean): plat.async.IThenable<void> {
            if (cancel === false || this._utils.isNull(this._currentAnimation)) {
                return this.__handleAnimation(startNode, endNode, key, container, clone);
            }

            return this._currentAnimation.cancel().then((): plat.ui.animations.IAnimationThenable<any> => {
                return this.__handleAnimation(startNode, endNode, key, container, clone);
            });
        }

        /**
         * @name __handleAnimation
         * @memberof platui.Listview
         * @kind function
         * @access private
         * 
         * @description
         * Handles the animation of a block of elements.
         * 
         * @param {number} startNode The starting childNode of the ForEach to animate
         * @param {number} endNode The ending childNode of the ForEach to animate
         * @param {string} key The animation key/type
         * @param {Element} container The container that holds the elements to animate.
         * @param {boolean} clone Whether to clone the items and animate the clones or simply animate the items itself.
         * 
         * @returns {plat.animations.IAnimationThenable<any>} The last element node's animation promise.
         */
        private __handleAnimation(startNode: number, endNode: number, key: string, container: Element,
            clone: boolean): plat.ui.animations.IAnimationThenable<any> {
            var slice = Array.prototype.slice,
                nodes: Array<Node> = slice.call(container.childNodes, startNode, endNode);

            if (nodes.length === 0) {
                return this._animator.resolve();
            } else if (clone === true) {
                var referenceNode = nodes[nodes.length - 1].nextSibling,
                    animatedNodes = <DocumentFragment>this.dom.appendChildren(nodes),
                    clonedNodes = animatedNodes.cloneNode(true),
                    removeNodes = slice.call(clonedNodes.childNodes);

                container.insertBefore(clonedNodes, referenceNode);
                return this._currentAnimation = this._animator.animate(removeNodes, key).then((): void => {
                    while (removeNodes.length > 0) {
                        container.removeChild(removeNodes.pop());
                    }
                    container.insertBefore(animatedNodes, referenceNode);
                });
            }

            return this._currentAnimation = this._animator.animate(nodes, key);
        }

        /**
         * @name _normalizeTemplateName
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Normalizes template names by removing special characters.
         * 
         * @param {string} templateName The name to normalize.
         * 
         * @returns {string} The normalized template name.
         */
        protected _normalizeTemplateName(templateName: string): string {
            if (this._utils.isString(templateName)) {
                return templateName.toLowerCase().replace(this._nodeNormalizeRegex, '');
            }
        }

        /**
         * @name _generateProgressRing
         * @memberof platui.Listview
         * @kind function
         * @access private
         * 
         * @description
         * Creates a progress ring element.
         * 
         * @returns {HTMLElement} The progress ring element.
         */
        protected _generateProgressRing(): HTMLElement {
            var _document = this._document,
                control = _document.createElement('div'),
                container = _document.createElement('div'),
                ring = _document.createElement('div');

            ring.className = 'plat-animated-ring';
            container.insertBefore(ring, null);
            container.className = 'plat-progress-container';
            control.insertBefore(container, null);
            control.className = 'plat-ring';

            return control;
        }

        /**
         * @name _validateOrientation
         * @memberof platui.Listview
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
                return 'vertical';
            }

            var validOrientation: string;
            if (orientation === 'vertical') {
                validOrientation = orientation;
            } else if (orientation === 'horizontal') {
                validOrientation = orientation;
                this._isVertical = false;
            } else {
                var _Exception = this._Exception;
                _Exception.warn('Invalid orientation "' + orientation + '" for ' + this.type + '. Defaulting to "vertical."',
                    _Exception.CONTROL);
                validOrientation = 'vertical';
            }

            return validOrientation;
        }
    }

    plat.register.control(__Listview, Listview);

    /**
     * @name IListviewOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Listview|Listview} control.
     */
    export interface IListviewOptions extends plat.ui.controls.IForEachOptions {
        /**
         * @name aliases
         * @memberof plat.ui.controls.IListviewOptions
         * @kind property
         * 
         * @type {platui.IListviewAliasOptions}
         * 
         * @description
         * Used to specify alternative alias tokens for the built-in {@link platui.Listview|Listview} aliases.
         */
        aliases?: IListviewAliasOptions;

        /**
         * @name orientation
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The orientation (scroll direction) of the {@link platui.Listview|Listview}. 
         * Defaults to "vertical".
         * 
         * @remarks
         * - "vertical"
         * - "horizontal"
         */
        orientation?: string;

        /**
         * @name itemTemplate
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string|(item?: any, index?: number) => string}
         * 
         * @description
         * The node name of the desired item template or a defined item template selector function.
         */
        itemTemplate?: any;

        /**
         * @name groupHeaderTemplate
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The node name of the desired group template or a defined group template selector function.
         */
        groupHeaderTemplate?: any;

        /**
         * @name loading
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Indicates a special type of loading. Available options are "infinite" or "incremental".
         * 
         * @remarks
         * - "infinite" - denotes infinite scrolling where items are continuously requested when the user scrolls the container 
         * past 80% to add to the list until false is returned from the function.
         * - "incremental" - denotes giving the user the ability to pull the list when its fully scrolled to indicate adding more items. 
         * Returning false indicates no more items.
         */
        loading?: string;

        /**
         * @name onItemsRequested
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The function that will be called when more items are being requested to add to the list.
         */
        onItemsRequested?: string;

        /**
         * @name infiniteProgress
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not to show an infinite scrolling progress ring whenever the loading type is set to 
         * "infinite" and a promise is returned from the onItemsRequested function. Defaults to true.
         */
        infiniteProgress?: boolean;

        /**
         * @name templateUrl
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The url of the {@link platui.Listview|Listview's} intended template if not using 
         * innerHTML.
         * 
         * @remarks
         * This URL must be a static string and cannot be a bound item on a parent control's context.
         */
        templateUrl?: string;

        /**
         * @name onRefresh
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The function that will be called when the user pulls to refresh.
         * 
         * @remarks
         * When the {@link platui.Listview|Listview's} orientation is vertical the motion will 
         * be to pull down when the list is scrolled all the way to the top, when horizontal the motion 
         * will be to pull right when the list is scrolled all the way to the left.
         */
        onRefresh?: string;
    }

    /**
     * @name IGroupHash
     * @memberof platui
     * @kind interface
     * 
     * @description
     * Defines the properties for the {@link platui.Listview|Listview's} grouping hash.
     */
    export interface IGroupHash {
        /**
         * @name name
         * @memberof platui.IGroupHash
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The name of the group.
         */
        name: string;

        /**
         * @name index
         * @memberof platui.IGroupHash
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The index of the group.
         */
        index: number;

        /**
         * @name element
         * @memberof platui.IGroupHash
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The primary group element.
         */
        element: HTMLElement;

        /**
         * @name control
         * @memberof platui.IGroupHash
         * @kind property
         * @access public
         * 
         * @type {plat.ui.TemplateControl}
         * 
         * @description
         * The control associated with this group.
         */
        control: plat.ui.TemplateControl;
    }

    /**
     * @name IListviewGroup
     * @memberof platui
     * @kind interface
     * 
     * @description
     * Defines the necessary key-value pairs for a {@link platui.Listview|Listview} group that makes up 
     * a grouped {@link platui.Listview|Listview's} context.
     */
    export interface IListviewGroup {
        /**
         * @name group
         * @memberof platui.IListviewGroup
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The group name.
         * 
         * @remarks
         * Will be available in the groupHeaderTemplate as @group.
         */
        group: string;

        /**
         * @name items
         * @memberof platui.IListviewGroup
         * @kind property
         * @access public
         * 
         * @type {Array<any>}
         * 
         * @description
         * The items contained in each group.
         */
        items: Array<any>;
    }

    /**
     * @name IListviewAliasOptions
     * @memberof platui
     * @kind interface
     * 
     * @extends {plat.IObject<string>}
     * 
     * @description
     * The alias tokens for the {@link plat.ui.controls.IListviewOptions|Listview options} object for the 
     * {@link platui.Listview|Listview} control.
     */
    export interface IListviewAliasOptions extends plat.ui.controls.IForEachAliasOptions {
        /**
         * @name group
         * @memberof platui.IListviewAliasOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The group name of the current group.
         * 
         * @remarks
         * Only can be used in grouped {@link platui.Listview|Listviews}.
         */
        group?: string;
    }
}
