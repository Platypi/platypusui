﻿/// <reference path="../references.d.ts" />

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
    export class Listview extends plat.ui.TemplateControl implements IUiControl {
        protected static _inject: any = {
            _document: __Document,
            _window: __Window,
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
        templateString: string;

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
         * @type {plat.async.Promise<void>}
         *
         * @description
         * A Promise that fulfills when the items are loaded.
         */
        itemsLoaded: plat.async.Promise<void>;

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
         * @name _compat
         * @memberof platui.Listview
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
         * @name _animate
         * @memberof platui.Listview
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not to animate Array mutations.
         */
        protected _animate: boolean;

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
         * @type {plat.IObject<HTMLElement>}
         *
         * @description
         * An object containing the node names of the {@link platui.Listview|Listview's} defined templates and
         * their corresponding template node.
         */
        protected _templates: plat.IObject<Node> = {};

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
        protected _isVertical: boolean = true;

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
         * @type {(item: any, index: number, group?: string) => string|plat.async.IPromise}
         *
         * @description
         * The selector function used to obtain the template key for each item.
         */
        protected _templateSelector: (item: any, index: number, group?: string) => any;

        /**
         * @name _templateSelectorPromise
         * @memberof platui.Listview
         * @kind property
         * @access protected
         *
         * @type {plat.async.Promise<any>}
         *
         * @description
         * A promise that denotes that items are currently being rendered.
         */
        protected _templateSelectorPromise: plat.async.Promise<any>;

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
         * @name _scrollReady
         * @memberof platui.Listview
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the scroll function is ready to be handled.
         */
        protected _scrollReady: boolean = true;

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
        protected _isLoading: boolean = false;

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
        protected _scrollPosition: number = 0;

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
        protected _removeScroll: plat.IRemoveListener = noop;

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
        protected _isRefreshing: boolean = false;

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
        protected _touchState: number = 0;

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
        protected _hasMoved: boolean = false;

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
        protected _nodeNormalizeRegex: RegExp = /-|\.|_/g;

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
        protected _isGrouped: boolean = false;

        /**
         * @name _defaultGroup
         * @memberof platui.Listview
         * @kind property
         * @access protected
         *
         * @type {platui.IGroupHash}
         *
         * @description
         * The default group which refers to this control itself.
         */
        protected _defaultGroup: IGroupHash;

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
         * @name _headerTemplate
         * @memberof platui.Listview
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The normalized node name of the group header template.
         */
        protected _headerTemplate: string;

        /**
         * @name _headerTemplatePromise
         * @memberof platui.Listview
         * @kind property
         * @access protected
         *
         * @type {plat.async.Promise<void>}
         *
         * @description
         * A promise that resolves when the group template has been created.
         */
        protected _headerTemplatePromise: plat.async.Promise<void>;

        /**
         * @name _visibilityRemoveListeners
         * @memberof platui.Listview
         * @kind property
         * @access protected
         *
         * @type {Array<plat.IRemoveListener>}
         *
         * @description
         * A set of functions to remove all visibility listeners.
         */
        protected _visibilityRemoveListeners: Array<plat.IRemoveListener> = [];

        /**
         * @name __templateString
         * @memberof platui.Listview
         * @kind property
         * @access private
         *
         * @type {string}
         *
         * @description
         * The private template string used to check for a template overwrite.
         */
        private __templateString: string =
        '<div class="plat-listview-viewport">\n' +
        '    <div class="plat-scroll-container">\n' +
        '        <div class="plat-listview-container"></div>\n' +
        '    </div>\n' +
        '</div>\n';

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
        private __listenerSet: boolean = false;

        /**
         * @name __resolveFn
         * @memberof platui.Listview
         * @kind property
         * @access private
         *
         * @type {() => void}
         *
         * @description
         * The resolve function for the itemsLoaded Promise.
         */
        private __resolveFn: () => void;

        /**
         * @name __rejectFn
         * @memberof platui.Listview
         * @kind property
         * @access private
         *
         * @type {() => void}
         *
         * @description
         * The reject function for the itemsLoaded Promise.
         */
        private __rejectFn: () => void;

        /**
         * @name constructor
         * @memberof platui.Listview
         * @kind function
         * @access public
         *
         * @description
         * The constructor for a {@link platui.Listview|Listview}. Creates the itemsLoaded Promise.
         *
         * @returns {platui.Listview} A {@link platui.Listview|Listview} instance.
         */
        constructor() {
            super();
            this.templateString = this.__templateString;

            this.itemsLoaded = new this._Promise<void>((resolve, reject): void => {
                this.__resolveFn = resolve;
                this.__rejectFn = reject;
            }).catch(noop);
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
            this.dom.addClass(element || this.element, `${__Listview} ${(className || '')}`);
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
            let optionObj = this.options || (this.options = <plat.observable.IObservableProperty<IListviewOptions>>{}),
                options = optionObj.value || (optionObj.value = <IListviewOptions>{});

            this.templateUrl = options.templateUrl || this.templateUrl;
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
            if (this.templateString !== this.__templateString || this.utils.isString(this.templateUrl)) {
                let fragment = this.dom.serializeHtml(this.__templateString),
                    element = this.element;

                this.innerTemplate = <DocumentFragment>this.dom.appendChildren(element.childNodes);
                element.appendChild(fragment);
            }
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
            if (this.utils.isArray(newValue)) {
                this._setListener();
            } else {
                this._log.debug(`${this.type} context set to something other than an Array.`);
                newValue = [];
            }

            this._executeEvent([{
                object: newValue,
                type: 'splice'
            }]);
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
            let options = this.options.value,
                utils = this.utils,
                isString = utils.isString,
                element = this.element,
                viewport = this._viewport = <HTMLElement>element.firstElementChild,
                scrollContainer = this._scrollContainer = <HTMLElement>viewport.firstElementChild,
                loading = this._loading = options.loading,
                animate = this._animate = options.animate === true,
                requestItems = options.onItemsRequested,
                refresh = options.onRefresh,
                itemTemplate = options.itemTemplate,
                scrollElement = options.scrollElement;

            this._container = <HTMLElement>scrollContainer.firstElementChild;

            this.dom.addClass(element, __Plat + this._validateOrientation(options.orientation) +
                (animate ? (` ${__Plat}animated`) : ''));

            if (isString(scrollElement)) {
                scrollElement = <HTMLElement>this._document.querySelector(<any>scrollElement);
            }

            if (utils.isNode(scrollElement)) {
                this._scrollContainer = scrollElement;
                this.dom.addClass(element, `${__Plat}no-scroller`);
            }

            if (!isString(itemTemplate)) {
                this._log.debug(`No item template or item template selector specified for ${this.type}.`);
                return;
            }

            let normalizedItemTemplate = this._normalizeTemplateName(itemTemplate),
                headerTemplate = options.headerTemplate,
                normalizedGroupTemplate = isString(headerTemplate) ? this._normalizeTemplateName(headerTemplate) : null;

            this._parseInnerTemplate(normalizedItemTemplate, normalizedGroupTemplate);
            this._determineTemplates(itemTemplate, normalizedItemTemplate, normalizedGroupTemplate);
            this._defaultGroup = {
                name: null,
                control: this,
                itemContainer: this._container,
                element: element,
                index: null,
                itemCount: 0,
                addQueue: <Array<plat.async.Promise<void>>>[],
                animationQueue: <Array<{ animation: plat.ui.animations.IAnimationThenable<any>; op: string; }>>[]
            };

            let isRefreshing = false;
            if (isString(loading)) {
                if (isString(requestItems)) {
                    this._determineLoading(requestItems, options.infiniteProgress !== false);
                } else {
                    this._log.debug(`${this.type} loading type specified as "${loading}" but no option specifying an onItemsRequested handler.`);
                }
            }

            if (isString(refresh)) {
                isRefreshing = true;
                this._initializeRefresh(refresh);
            }

            this._initializeTracking(loading === 'incremental', isRefreshing);

            if (!utils.isArray(this.context)) {
                if (!utils.isNull(this.context)) {
                    this._log.debug(`${this.type}'s context must be an Array.`);
                }
                return;
            }

            this._setAliases();
            this._setContainerHeight();
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
            let visibilityRemovers = this._visibilityRemoveListeners;
            while (visibilityRemovers.length > 0) {
                visibilityRemovers.pop()();
            }

            this._removeScroll();

            if (this.utils.isFunction(this.__rejectFn)) {
                this.__rejectFn();
                this.__resolveFn = this.__rejectFn = null;
            }
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
            let isNumber = this.utils.isNumber,
                opGroup = group || this._defaultGroup,
                control = opGroup.control,
                context = this === control ? this.context : control.context.items;

            if (!isNumber(index)) {
                index = 0;
            }

            let maxCount = context.length - index,
                itemCount = isNumber(count) && maxCount >= count ? count : maxCount;

            this._createItems(index, itemCount, opGroup, 0);
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
            let aliases = this.options.value.aliases,
                utils = this.utils;

            if (!utils.isObject(aliases)) {
                return;
            }

            let _aliases = this._aliases,
                isString = utils.isString,
                keys = Object.keys(_aliases),
                length = keys.length,
                value: string;

            for (let i = 0; i < length; ++i) {
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
         * @param {string} itemTemplate The pre-normalized property for indicating either the item template or the
         * item template selector.
         * @param {string} itemTemplateKey The normalized property for indicating the item template.
         * @param {string} headerTemplate The property for indicating the group header template.
         *
         * @returns {void}
         */
        protected _determineTemplates(itemTemplate: string, itemTemplateKey: string, headerTemplate: string): void {
            let utils = this.utils,
                bindableTemplates = this.bindableTemplates,
                templates = this._templates,
                template: Node;

            if (utils.isString(headerTemplate)) {
                this._isGrouped = true;
                this.dom.addClass(this._container, `${__Plat}grouped`);

                template = templates[headerTemplate];
                if (utils.isNode(template)) {
                    this._headerTemplate = headerTemplate;
                    this.bindableTemplates.add(headerTemplate, template);
                    delete templates[headerTemplate];
                } else {
                    this._log.debug(`${__Listview} group header template "${headerTemplate}" was not a template defined in the DOM.`);
                }

                this._headerTemplatePromise = this._createGroupTemplate();
            }

            template = templates[itemTemplateKey];
            if (utils.isNode(template)) {
                this._itemTemplate = itemTemplateKey;
                this.bindableTemplates.add(itemTemplateKey, template);
                delete templates[itemTemplateKey];
                return;
            }

            let controlProperty = this.findProperty(itemTemplate) || <plat.IControlProperty>{};
            if (!utils.isFunction(controlProperty.value)) {
                this._log.debug(`${__Listview} item template "${itemTemplate}" was neither a template defined in the DOM nor a template selector function in its control hiearchy.`);
                return;
            }

            this._templateSelector = (<Function>controlProperty.value).bind(controlProperty.control);
            this._templateSelectorKeys = {};
            let keys = Object.keys(templates),
                key: string;
            while (keys.length > 0) {
                key = keys.pop();
                bindableTemplates.add(key, templates[key]);
                delete templates[key];
            }
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
         * @returns {plat.async.Promise<void>} A promise that resolves when
         * the group template has been added to bindable templates.
         */
        protected _createGroupTemplate(): plat.async.Promise<void> {
            let _document = this._document,
                bindableTemplates = this.bindableTemplates,
                headerTemplate = this._headerTemplate,
                listviewGroup = `${__Listview}-group`,
                group = _document.createElement('div'),
                itemContainer = _document.createElement('div'),
                headerPromise: plat.async.Promise<void>;

            group.className = listviewGroup;
            itemContainer.className = `${__Listview}-items`;
            if (this.utils.isString(headerTemplate)) {
                headerPromise = bindableTemplates.templates[headerTemplate].then((headerTemplate): void => {
                    group.insertBefore(headerTemplate.cloneNode(true), null);
                });
            }

            return this._Promise.resolve(headerPromise).then((): void => {
                group.insertBefore(itemContainer, null);
                bindableTemplates.add(listviewGroup, group);
            }).then(null, (error): void => {
                this._log.debug(`${this.type} error: ${error}`);
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
         * @param {number} animateItems The number of groups to animate.
         *
         * @returns {plat.async.Promise<void>} A promise that resolves when all groups have been added to the DOM.
         */
        protected _addGroups(numberOfGroups: number, index: number, animateItems: number): plat.async.Promise<void> {
            let initialIndex = index,
                max = +(index + numberOfGroups),
                promises = <Array<plat.async.Promise<DocumentFragment>>>[];

            while (index < max) {
                promises.push(this._bindGroup(index++));
            }

            return this._Promise.all(promises).then((fragments): void => {
                let length = fragments.length;
                for (let i = 0; i < length; ++i) {
                    this._addGroup(i + initialIndex, fragments[i], i < animateItems);
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
         * @param {boolean} animate Whether or not to animate the group.
         *
         * @returns {void}
         */
        protected _addGroup(index: number, fragment: DocumentFragment, animate: boolean): void {
            let utils = this.utils,
                context = this.context,
                groups = this._groups || (this._groups = <plat.IObject<IGroupHash>>{}),
                group: IListviewGroup = context[index],
                name = group.group,
                groupContainer = <HTMLElement>fragment.childNodes[1],
                itemContainer = <HTMLElement>groupContainer.lastElementChild,
                control = this.controls[index],
                groupHash = groups[name] = {
                    name: name,
                    index: index,
                    element: groupContainer,
                    itemContainer: itemContainer,
                    control: control,
                    itemCount: 0,
                    addQueue: <Array<plat.async.Promise<void>>>[],
                    animationQueue: <Array<{ animation: plat.ui.animations.IAnimationThenable<any>; op: string; }>>[]
                },
                items = 'items',
                removeArrayListener: plat.IRemoveListener,
                removeMutationListener: plat.IRemoveListener;

            control.dispose = (): void => {
                super.dispose();
                delete groups[name];
            };

            control.observe((newValue?: IListviewGroup, oldValue?: IListviewGroup): void => {
                let newName = newValue.group;
                if (newName === name || !utils.isObject(newValue)) {
                    return;
                }

                let temp = groups[name];
                delete groups[name];
                temp.name = newName;
                groups[newName] = temp;

                name = newName;

                removeArrayListener();
                removeMutationListener();
                removeArrayListener = control.observe(this._childContextChanged.bind(this, name), items);
                removeMutationListener = control.observeArray(this._executeChildEvent.bind(this, name), items);
            });
            removeArrayListener = control.observe(this._childContextChanged.bind(this, name), items);
            removeMutationListener = control.observeArray(this._executeChildEvent.bind(this, name), items);

            this._createItems(0, (group.items || []).length, groupHash, 0);

            if (animate) {
                let animationQueue = this._defaultGroup.animationQueue,
                    animation = {
                        animation: this._animator.enter(fragment, __Enter, this._container).then((): void => {
                            let index = animationQueue.indexOf(animation);
                            if (index > -1) {
                                animationQueue.splice(index, 1);
                            }
                            utils.requestAnimationFrame(this._setGroupContainerPadding.bind(this, groupContainer));
                        }),
                        op: <string>null
                    };
                animationQueue.push(animation);
                return;
            }

            this._container.insertBefore(fragment, null);
            utils.requestAnimationFrame(this._setGroupContainerPadding.bind(this, groupContainer));
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
         * @returns {plat.async.Promise<DocumentFragment>}
         */
        protected _bindGroup(index: number): plat.async.Promise<DocumentFragment> {
            return this.bindableTemplates.bind(`${__Listview}-group`, index, this._getAliases(this.context, index));
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
         * @param {platui.IGroupHash} group The group for which we're creating items.
         * @param {number} animateItems The number of items to animate.
         *
         * @returns {void}
         */
        protected _createItems(index: number, count: number, group: IGroupHash, animateItems: number): void {
            let utils = this.utils,
                opGroup = group || this._defaultGroup,
                control = opGroup.control,
                isVertical = this._isVertical,
                isControl = this === control;

            if (isControl) {
                if (this._isGrouped) {
                    this._headerTemplatePromise.then((): void => {
                        this._addGroups(count, index, animateItems);
                    }).then(null, (error): void => {
                        this._log.debug(`${this.type} error: ${error}`);
                    });

                    return;
                }
            }

            let addQueue = opGroup.addQueue,
                addPromise: plat.async.Promise<void>,
                postLoad = (): void => {
                    let indexOf = addQueue.indexOf(addPromise);
                    if (indexOf !== -1) {
                        addQueue.splice(indexOf, 1);
                    }

                    if (isControl) {
                        return;
                    }

                    opGroup.element.removeAttribute(__Hide);
                    if (isVertical || isControl || !this._isGrouped) {
                        return;
                    }

                    // set width for flexbox container
                    utils.requestAnimationFrame(this._setGroupContainerWidth.bind(this, opGroup.itemContainer));
                },
                onError = (error: Error): void => {
                    this._log.debug(`${this.type} error: ${(utils.isString(error.message) ? error.message : error)}`);
                };

            if (utils.isFunction(this._templateSelector)) {
                let promises: Array<plat.async.Promise<any>> = [];
                opGroup.itemCount += count;

                for (let i = 0; i < count; ++i, ++index) {
                    promises.push(this._renderUsingFunction(index, opGroup));
                }

                let itemsLoaded = this.itemsLoaded = <plat.async.Promise<any>>this._Promise.all(promises)
                .then((nodes: Array<any>): void => {
                    let length = nodes.length;
                    for (let ii = 0; ii < length; ++ii) {
                        this._appendRenderedItem(nodes[ii], opGroup, ii < animateItems);
                    }
                }).then(postLoad, onError);
                addQueue.push(itemsLoaded);
                return;
            }

            let key = this._itemTemplate;
            if (utils.isUndefined(this.bindableTemplates.templates[key])) {
                return;
            }

            this._disposeFromIndex(index, opGroup);
            opGroup.itemCount += count;

            addPromise = this._addItems(index, count, opGroup, animateItems).then(postLoad, onError);
            addQueue.push(addPromise);
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
         * @param {number} index The point in the array to start adding items.
         * @param {number} numberOfItems The number of items to add.
         * @param {platui.IGroupHash} group The group that we're performing this operation on.
         * @param {number} animateItems The number of items to animate.
         *
         * @returns {plat.async.Promise<void>} The itemsLoaded promise.
         */
        protected _addItems(index: number, numberOfItems: number, group: IGroupHash, animateItems: number): plat.async.Promise<void> {
            let opGroup = group || this._defaultGroup,
                control = opGroup.control,
                container = opGroup.itemContainer,
                max = +(index + numberOfItems),
                promises: Array<plat.async.Promise<DocumentFragment>> = [],
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
                    if (animateItems > 0) {
                        let length = templates.length;
                        for (let i = 0; i < length; ++i) {
                            if (i < animateItems) {
                                this._appendAnimatedItem(templates[i], opGroup);
                            } else {
                                container.insertBefore(templates[i], null);
                            }
                        }
                    } else {
                        this._appendItems(templates, container);
                    }

                    this._updateResource(initialIndex - 1, control);

                    if (this.utils.isFunction(this.__resolveFn)) {
                        this.__resolveFn();
                        this.__resolveFn = this.__rejectFn = null;
                    }
                }).catch((error: any): void => {
                    this.utils.postpone((): void => {
                        this._log.debug(error);
                    });
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
         *
         * @returns {plat.async.Promise<any>} The promise that fulfills when all items have been rendered.
         */
        protected _renderUsingFunction(index: number, group?: IGroupHash): plat.async.Promise<any> {
            let _Promise = this._Promise,
                utils = this.utils,
                opGroup = group || this._defaultGroup,
                control = opGroup.control,
                identifier: any,
                context: any,
                groupName: string;

            if (this === control) {
                identifier = index;
                context = this.context;
            } else {
                identifier = `items.${index}`;
                context = control.context.items;
                groupName = opGroup.name;
            }

            return _Promise.resolve(this._templateSelectorPromise).then((): plat.async.Promise<any> => {
                return this._templateSelectorPromise = _Promise.resolve<string>(this._templateSelector(context[index], index, groupName));
            }).then((selectedTemplate): plat.async.Promise<any> => {
                let bindableTemplates = control.bindableTemplates,
                    templates = bindableTemplates.templates,
                    controls = <Array<plat.ui.TemplateControl>>control.controls,
                    key = this._normalizeTemplateName(selectedTemplate),
                    name = opGroup.name,
                    templateKeys = this._templateSelectorKeys[name],
                    controlExists = index < controls.length;

                if (utils.isUndefined(templateKeys)) {
                    templateKeys = this._templateSelectorKeys[name] = <plat.IObject<string>>{};
                }

                if (!utils.isUndefined(templates[key])) {
                    if (controlExists) {
                        if (key === templateKeys[index]) {
                            return;
                        }

                        templateKeys[index] = key;
                        return <plat.async.Promise<any>>bindableTemplates.replace(index, key, identifier,
                            this._getAliases(context, index));
                    }

                    templateKeys[index] = key;
                    return bindableTemplates.bind(key, identifier, this._getAliases(context, index));
                } else {
                    this._log.debug(`${this.type} template "${selectedTemplate}" was not found.`);
                    if (controlExists) {
                        this._TemplateControlFactory.dispose(controls[index]);
                    }
                }
            });
        }

        /**
         * @name _appendRenderedItem
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Appends the rendered item from the defined render function.
         *
         * @param {any} node The node to place into the item container if available.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         * @param {boolean} animate? Whether or not to animate the new item.
         *
         * @returns {plat.async.Promise<any>} The promise that fulfills when all items have been rendered.
         */
        protected _appendRenderedItem(node: any, group?: IGroupHash, animate?: boolean): void {
            let utils = this.utils,
                opGroup = group || this._defaultGroup;

            if (utils.isNull(node) || utils.isArray(node)) {
                return;
            } else if (animate === true) {
                let animationQueue = opGroup.animationQueue,
                    animation = {
                        animation: this._animator.enter(node, __Enter, opGroup.itemContainer).then((): void => {
                            let animationIndex = animationQueue.indexOf(animation);
                            if (animationIndex === -1) {
                                return;
                            }

                            animationQueue.splice(animationIndex, 1);
                        }),
                        op: <string>null
                    };
                animationQueue.push(animation);
            } else {
                opGroup.itemContainer.insertBefore(node, null);
            }

            if (utils.isFunction(this.__resolveFn)) {
                this.__resolveFn();
                this.__resolveFn = null;
            }
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
            let controls = <Array<plat.ui.TemplateControl>>control.controls;
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
            let isEven = (index & 1) === 0,
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
         * @param {platui.IGroupHash} group The group items are being added to.
         *
         * @returns {void}
         */
        protected _appendAnimatedItem(item: DocumentFragment, group: IGroupHash): void {
            if (!this.utils.isNode(item)) {
                return;
            }

            let animationQueue = group.animationQueue,
                animation = {
                    animation: this._animator.enter(item, __Enter, group.itemContainer).then((): void => {
                        let index = animationQueue.indexOf(animation);
                        if (index === -1) {
                            return;
                        }

                        animationQueue.splice(index, 1);
                    }),
                    op: <string>null
                };
            animationQueue.push(animation);
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
         * @param {number} index The index to start disposing from.
         * @param {number} numberOfItems The number of items to remove.
         * @param {platui.IGroupHash} group The group for which we're disposing items.
         *
         * @returns {void}
         */
        protected _removeItems(index: number, numberOfItems: number, group: IGroupHash): void {
            let dispose = this._TemplateControlFactory.dispose,
                control = group.control,
                controls = <Array<plat.ui.TemplateControl>>control.controls,
                last = index + numberOfItems,
                controlDisposed = last > index;

            while (last-- > index) {
                dispose(controls[last]);
            }

            this._updateResource(controls.length - 1, control);

            if (this === control) {
                return;
            } else if (controls.length === 0) {
                group.element.setAttribute(__Hide, '');
            } else if (controlDisposed && this._isGrouped && !this._isVertical) {
                this.utils.requestAnimationFrame(this._setGroupContainerWidth.bind(this, group.itemContainer));
            }
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
            let opGroup = group || this._defaultGroup,
                control = opGroup.control,
                controls = <Array<plat.ui.TemplateControl>>control.controls,
                dispose = this._TemplateControlFactory.dispose,
                last = controls.length,
                controlDisposed = last > index;

            while (last-- > index) {
                dispose(controls[last]);
            }

            if (this === control) {
                return;
            } else if (controls.length === 0) {
                group.element.setAttribute(__Hide, '');
            } else if (controlDisposed && this._isGrouped && !this._isVertical) {
                this.utils.requestAnimationFrame(this._setGroupContainerWidth.bind(this, group.itemContainer));
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
            let controlProperty = this.findProperty(requestItems) || <plat.IControlProperty>{};
            if (!this.utils.isFunction(controlProperty.value)) {
                this._log.debug(`${__Listview} onItemsRequested function "${requestItems}" was not found.`);
                return;
            }

            this._requestItems = (<Function>controlProperty.value).bind(controlProperty.control);

            let progressRingContainer: HTMLElement;
            switch (this._loading) {
                case 'infinite':
                    let removeScroll: plat.IRemoveListener,
                        removeRequest: plat.IRemoveListener = noop;

                    removeScroll = this.addEventListener(this._scrollContainer, 'scroll', (): void => {
                        if (!this._scrollReady) {
                            return;
                        }

                        this._scrollReady = false;
                        removeRequest = this.utils.requestAnimationFrame((): void => {
                            this._scrollReady = true;
                            this._onScroll();
                        });
                    }, false);

                    this._removeScroll = (): void => {
                        this._scrollReady = false;
                        removeRequest();
                        removeScroll();
                    };

                    if (showRing) {
                        progressRingContainer = this._loadingProgressRing = this._document.createElement('div');
                        progressRingContainer.className = `${__Plat}infinite`;
                        progressRingContainer.insertBefore(this._generateProgressRing(), null);
                    }

                    this.itemsLoaded.then(this._onScroll.bind(this));
                    break;
                case 'incremental':
                    progressRingContainer = this._loadingProgressRing = this._document.createElement('div');
                    progressRingContainer.className = `${__Plat}incremental`;
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
         * @returns {void}
         */
        protected _onScroll(): void {
            let scrollContainer = this._scrollContainer,
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
            let scrollContainer = this._scrollContainer,
                scrollLength = 0.8 * (this._isVertical ? scrollContainer.scrollHeight : scrollContainer.scrollWidth);

            if (scrollLength === 0) {
                return;
            } else if (this._scrollPosition >= scrollLength) {
                let utils = this.utils,
                    itemsRemain = this._requestItems();

                if (itemsRemain === false) {
                    this._removeScroll();
                } else if (utils.isPromise(itemsRemain)) {
                    let progressRing = this._loadingProgressRing,
                        showProgress = !utils.isNull(progressRing),
                        container = this._container;

                    this._scrollReady = false;

                    if (showProgress) {
                        utils.requestAnimationFrame((): void => {
                            container.insertBefore(progressRing, null);
                        });
                    }

                    itemsRemain.then((moreItemsRemain: boolean): void => {
                        if (showProgress) {
                            utils.requestAnimationFrame((): void => {
                                container.removeChild(progressRing);
                            });
                        }

                        if (moreItemsRemain === false) {
                            return;
                        }

                        this._scrollReady = true;
                    });
                } else {
                    utils.postpone((): void => {
                        this.itemsLoaded.then((): void => {
                            if (this._scrollReady) {
                                this._handleScroll();
                            }
                        });
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
            let controlProperty = this.findProperty(refresh) || <plat.IControlProperty>{};
            if (!this.utils.isFunction(controlProperty.value)) {
                this._log.debug(`${__Listview} onRefresh function "${refresh}" was not found.`);
                return;
            }

            this._refresh = (<Function>controlProperty.value).bind(controlProperty.control);
            let progressRingContainer = this._refreshProgressRing = this._document.createElement('div');
            progressRingContainer.className = `${__Plat}refresh`;
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

            let track: string,
                reverseTrack: string;

            if (this._isVertical) {
                track = `${__$track}down`;
                reverseTrack = `${__$track}up`;
            } else {
                track = `${__$track}right`;
                reverseTrack = `${__$track}left`;
            }

            let viewport = this._viewport,
                touchEnd: EventListener,
                trackFn: EventListener;

            this.addEventListener(viewport, __$touchstart, this._touchStart, false);

            if (loading) {
                touchEnd = this._touchEndLoad;
                trackFn = this._trackLoad;
                this.addEventListener(viewport, __$touchend, touchEnd, false);
                this.addEventListener(viewport, __$trackend, touchEnd, false);
                this.addEventListener(viewport, __$touchcancel, touchEnd, false);
                this.addEventListener(viewport, track, trackFn, false);
                this.addEventListener(viewport, reverseTrack, trackFn, false);
            }

            if (refresh) {
                touchEnd = this._touchEndRefresh;
                trackFn = this._trackRefresh;
                this.addEventListener(viewport, __$touchend, touchEnd, false);
                this.addEventListener(viewport, __$trackend, touchEnd, false);
                this.addEventListener(viewport, __$touchcancel, touchEnd, false);
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
            } else if (!this._isVertical) {
                let pos = Math.ceil(ev.offsetY),
                    // we're going to decrease the threshold by 20 to buffer the scrollbar
                    threshold = this._viewport.offsetHeight - 20;

                if (pos >= threshold) {
                    return;
                }
            }

            this._touchState = 1;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };

            if (!this.utils.isNull(this._touchAnimationThenable)) {
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
            let isLoading = this._isLoading;
            this._isLoading = false;
            if (!isLoading) {
                if (!this._isRefreshing) {
                    this._touchState = 0;
                }
                return;
            }

            let scrollContainer = this._scrollContainer,
                scrollLength: number,
                threshold: number;

            if (this._isVertical) {
                scrollLength = scrollContainer.scrollTop + scrollContainer.offsetHeight;
                threshold = scrollContainer.scrollHeight;
            } else {
                scrollLength = scrollContainer.scrollLeft + scrollContainer.offsetWidth;
                threshold = scrollContainer.scrollWidth;
            }

            // do plus 1 here for browser pixel inconsistency
            if (scrollLength + 1 < threshold) {
                this._touchState = 0;
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
            let isRefreshing = this._isRefreshing;
            this._isRefreshing = false;

            if (!isRefreshing) {
                if (!this._isLoading) {
                    this._touchState = 0;
                }
                return;
            } else if ((this._isVertical ? this._scrollContainer.scrollTop : this._scrollContainer.scrollLeft) > 0) {
                this._touchState = 0;
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
            let state = this._touchState,
                hasMoved = this._hasMoved;

            this._hasMoved = false;
            if (state < 2 || !hasMoved) {
                return;
            }

            let animationOptions: plat.IObject<string> = {},
                dom = this.dom,
                viewport = this._viewport,
                progressRing = refreshing ? this._refreshProgressRing : this._loadingProgressRing,
                isActionState = state === 3,
                nextTranslation: string;

            if (isActionState) {
                let offset: number;
                if (this._isVertical) {
                    offset = refreshing ? progressRing.offsetHeight : -progressRing.offsetHeight;
                    nextTranslation = `translate3d(0,${offset}px,0)`;
                } else {
                    offset = refreshing ? progressRing.offsetWidth : -progressRing.offsetWidth;
                    nextTranslation = `translate3d(${offset}px,0,0)`;
                }
            } else {
                nextTranslation = this._preTransform;
            }

            animationOptions[this._transform] = nextTranslation;
            this._touchAnimationThenable = this._animator.animate(viewport, __Transition, {
                properties: animationOptions
            }).then((): plat.async.Promise<void> => {
                this._touchState = 4;
                this._hasMoved = false;
                this._touchAnimationThenable = null;
                if (isActionState) {
                    return this._Promise.resolve(refreshing ? this._refresh() : this._requestItems());
                }

                dom.removeClass(viewport, `${__Plat}manipulation-prep`);
                progressRing.setAttribute(__Hide, '');
                return this._Promise.resolve();
            }).then((): plat.ui.animations.IAnimationThenable<void> => {
                if (!isActionState) {
                    this._touchState = 0;
                    return;
                }

                dom.removeClass(progressRing, `${__Plat}play`);
                animationOptions[this._transform] = this._preTransform;
                return this._touchAnimationThenable = this._animator.animate(viewport, __Transition, {
                    properties: animationOptions
                }).then((): void => {
                    this._touchState = 0;
                    this._touchAnimationThenable = null;
                    dom.removeClass(viewport, `${__Plat}manipulation-prep`);
                    progressRing.setAttribute(__Hide, '');
                });
            }).then(null, (error): void => {
                this._touchState = 0;
                this._log.debug(`${this.type} error: ${error}`);
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
            if (this._isRefreshing) {
                return;
            }

            if (!this._isLoading) {
                let scrollContainer = this._scrollContainer,
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

                // do plus 1 here for browser pixel inconsistency
                if (scrollLength + 1 < threshold) {
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
            if (this._isLoading) {
                return;
            }

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
            let touchState = this._touchState;
            if (!(touchState === 2 || touchState === 3)) {
                return;
            }

            let translation = this._calculateTranslation(ev, refreshing);
            this.utils.requestAnimationFrame((): void => {
                this._viewport.style[<any>this._transform] = translation;
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
            let isVertical = this._isVertical,
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
                this.dom.addClass(this._viewport, `${__Plat}manipulation-prep`);
                progressRing.removeAttribute(__Hide);
            } else if (Math.abs(diff) >= threshold) {
                if (this._touchState < 3) {
                    this._touchState = 3;
                    this.dom.addClass(progressRing, `${__Plat}play`);
                }
            } else if (this._touchState === 3) {
                this._touchState = 2;
                this.dom.removeClass(progressRing, `${__Plat}play`);
            }

            if (isVertical) {
                return `translate3d(0,${diff}px,0)`;
            }

            return `translate3d(${diff}px,0,0)`;
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
            let style = this._viewport.style,
                isUndefined = this.utils.isUndefined;

            let vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(this._preTransform = style[<any>(`${vendorPrefix.lowerCase}Transform`)])) {
                this._transform = `${vendorPrefix.lowerCase}Transform`;
            } else if (!isUndefined(this._preTransform = style[<any>(`${vendorPrefix.upperCase}Transform`)])) {
                this._transform = `${vendorPrefix.upperCase}Transform`;
            } else {
                this._preTransform = style.transform
                this._transform = 'transform';
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
         * @param {string} itemTemplate The normalized item template name from the options.
         * @param {string} headerTemplate? The normalized group header template name from the options.
         *
         * @returns {void}
         */
        protected _parseInnerTemplate(itemTemplate: string, headerTemplate?: string): void {
            let templates = this._templates,
                slice = Array.prototype.slice,
                appendChildren = this.dom.appendChildren,
                _document = this._document,
                validGroupTemplate = !this.utils.isNull(headerTemplate),
                childNodes: Array<Node> = slice.call(this.innerTemplate.childNodes),
                childNode: Node,
                templateName: string,
                container: Node;

            while (childNodes.length > 0) {
                childNode = childNodes.pop();
                if (childNode.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }

                templateName = this._normalizeTemplateName(childNode.nodeName);
                if (validGroupTemplate && templateName === headerTemplate) {
                    container = _document.createElement('div');
                    (<HTMLElement>container).className = `${__Plat}header`;
                } else {
                    container = _document.createDocumentFragment();
                }

                appendChildren(childNode.childNodes, container);
                templates[templateName] = container;
            }
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
            let method = `_${changes[0].type}`;
            if (this.utils.isFunction((<any>this)[method])) {
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
            let utils = this.utils,
                method = `_${changes[0].type}`;

            if (utils.isFunction((<any>this)[method])) {
                let group = this._groups[groupName];
                if (utils.isNull(group)) {
                    return;
                }
                (<any>this)[method](changes, group);
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
            let change = changes[0],
                addedCount = change.addedCount;
            this._createItems(change.index, addedCount, group, this._animate ? addedCount : 0);
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
            let opGroup = group || this._defaultGroup,
                addQueue = opGroup.addQueue,
                change = changes[0],
                start = change.object.length;
            if (change.removed.length === 0) {
                return;
            }

            let removeIndex = change.object.length;
            if (opGroup.itemCount > 0) {
                opGroup.itemCount--;
            }

            this._Promise.all(addQueue).then((): plat.async.Promise<void> => {
                if (this._animate) {
                    this._animateItems(start, 1, __Leave, opGroup, 'leave', false).then((): void => {
                        this._removeItems(removeIndex, 1, opGroup);
                    });
                    return;
                }
                this._removeItems(removeIndex, 1, opGroup);
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
            if (this.utils.isFunction(this._templateSelector)) {
                this.rerender(group);
                return;
            }

            let opGroup = group || this._defaultGroup,
                change = changes[0],
                addedCount = change.addedCount;

            if (this._animate) {
                let animationQueue = opGroup.animationQueue,
                    animationLength = animationQueue.length;
                this._animateItems(0, addedCount, __Enter, opGroup, null,
                    animationLength > 0 && animationQueue[animationLength - 1].op === 'clone');
            }

            this._createItems(change.object.length - addedCount, addedCount, opGroup, 0);
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
            let opGroup = group || this._defaultGroup,
                addQueue = opGroup.addQueue,
                change = changes[0];
            if (change.removed.length === 0) {
                return;
            } else if (this._animate) {
                if (addQueue.length === 0) {
                    addQueue = addQueue.concat([this._animateItems(0, 1, __Leave, opGroup, 'clone', true)]);
                }
            }

            let removeIndex = change.object.length;
            if (opGroup.itemCount > 0) {
                opGroup.itemCount--;
            }

            this._Promise.all(addQueue).then((): void => {
                this._removeItems(removeIndex, 1, opGroup);
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
            let utils = this.utils,
                change = changes[0],
                opGroup = group || this._defaultGroup,
                addCount = change.addedCount,
                currentLength = opGroup.itemCount,
                control = opGroup.control,
                addQueue = opGroup.addQueue,
                animating = this._animate;

            if (utils.isNull(addCount)) {
                if (animating) {
                    this._cancelCurrentAnimations();
                }

                let newLength = change.object.length,
                    itemCount = currentLength - newLength;

                if (newLength > currentLength) {
                    if (utils.isFunction(this._templateSelector)) {
                        if (utils.isNull(change.index)) {
                            this.rerender(opGroup);
                        } else {
                            this.render(change.index, addCount, opGroup);
                        }
                        return;
                    }

                    // itemCount will be negative
                    this._createItems(currentLength, -itemCount, opGroup, 0);
                } else if (currentLength > newLength) {
                    if (opGroup.itemCount >= itemCount) {
                        opGroup.itemCount -= itemCount;
                    } else {
                        opGroup.itemCount = 0;
                    }

                    this._Promise.all(addQueue).then((): void => {
                        this._removeItems(currentLength - itemCount, itemCount, opGroup);
                    });
                }
                return;
            }

            let removeCount = change.removed.length,
                animationQueue = opGroup.animationQueue;
            if (addCount > removeCount) {
                let itemAddCount = addCount - removeCount,
                    animationCount: number;

                if (utils.isFunction(this._templateSelector)) {
                    if (utils.isNull(change.index)) {
                        this.rerender(opGroup);
                    } else {
                        this.render(change.index, addCount, opGroup);
                    }
                    return;
                }

                if (animating) {
                    animationCount = addCount;

                    let animationLength = animationQueue.length,
                        startIndex = change.index;

                    if (currentLength < addCount - startIndex) {
                        animationCount = currentLength - startIndex;
                    }

                    this._animateItems(startIndex, animationCount, __Enter, opGroup, null,
                        animationLength > 0 && animationQueue[animationLength - 1].op === 'clone');

                    animationCount = addCount - animationCount;
                } else {
                    animationCount = 0;
                }

                this._createItems(change.object.length - itemAddCount, itemAddCount, opGroup, animationCount);
            } else if (removeCount > addCount) {
                let adding = addCount > 0;
                if (animating && !adding && addQueue.length === 0) {
                    addQueue = addQueue.concat([this._animateItems(change.index, removeCount, __Leave, opGroup, 'clone', true)]);
                }

                let deleteCount = removeCount - addCount;
                if (opGroup.itemCount >= deleteCount) {
                    opGroup.itemCount -= deleteCount;
                } else {
                    opGroup.itemCount = 0;
                }

                this._Promise.all(addQueue).then((): void => {
                    if (animating && adding) {
                        let animLength = animationQueue.length;
                        this._animateItems(change.index, addCount, __Enter, opGroup, null,
                            animLength > 0 && animationQueue[animLength - 1].op === 'clone');
                    }
                    this._removeItems(currentLength - deleteCount, deleteCount, opGroup);
                });
            }
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
         * @param {IGroupHash} group The group performing the animation.
         * @param {string} animationOp Denotes animation operation.
         * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
         *
         * @returns {plat.ui.async.Promise<void>} A promise that resolves when all animations are complete.
         */
        protected _animateItems(startIndex: number, numberOfItems: number, key: string, group: IGroupHash, animationOp: string,
            cancel: boolean): plat.async.Promise<void> {
            switch (animationOp) {
                case 'clone':
                    return this._handleClonedContainerAnimation(this._getAnimatedNodes(startIndex, numberOfItems, group),
                        key, group, cancel === true);
                case 'leave':
                    return this._handleLeave(this._getAnimatedNodes(startIndex, numberOfItems, group), key, group);
                default:
                    return this._handleSimpleAnimation(this._getAnimatedNodes(startIndex, numberOfItems, group), key, group, cancel === true);
            }
        }

        /**
         * @name _getAnimatedNodes
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Translates the items to be animated into the nodes to be animated.
         *
         * @param {number} startIndex The starting index of items to animate.
         * @param {number} numberOfItems The number of consecutive items to animate.
         * @param {IGroupHash} group The group performing the animation.
         *
         * @returns {Array<Node>} An Array of the nodes to be animated.
         */
        protected _getAnimatedNodes(startIndex: number, numberOfItems: number, group: IGroupHash): Array<Node> {
            if (this._isGrouped && group === this._defaultGroup) {
                // we are animating a group so block length === 3 (one element node and two comment nodes)
                let blockLength = 3,
                    start = startIndex * blockLength;

                return Array.prototype.slice.call(group.itemContainer.childNodes, start, numberOfItems * blockLength + start);
            }

            let utils = this.utils,
                isNode = utils.isNode,
                nodes: Array<Node> = Array.prototype.slice.call(group.itemContainer.childNodes),
                endIndex = startIndex + numberOfItems - 1,
                controls = <Array<plat.ui.TemplateControl>>group.control.controls;

            if (controls.length <= endIndex) {
                endIndex = controls.length - 1;
            }

            let startNode = controls[startIndex].startNode,
                endNode = controls[endIndex].endNode;
            if (!(isNode(startNode) && isNode(endNode))) {
                return [];
            }

            let startNodeIndex = nodes.indexOf(startNode),
                endNodeIndex = nodes.indexOf(endNode);
            if (startNodeIndex === -1 || endNodeIndex === -1) {
                return [];
            }

            return nodes.slice(startNodeIndex, endNodeIndex + 1);
        }

        /**
         * @name _handleSimpleAnimation
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Handles a simple animation of a block of elements.
         *
         * @param {Array<Node>} nodes The Array of nodes to animate.
         * @param {string} key The animation key/type.
         * @param {IGroupHash} group The group performing the animation.
         * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
         *
         * @returns {plat.async.Promise<void>} A promise that fulfills when the animation is complete.
         */
        protected _handleSimpleAnimation(nodes: Array<Node>, key: string, group: IGroupHash, cancel: boolean): plat.async.Promise<void> {
            if (nodes.length === 0) {
                return this._Promise.resolve();
            }

            let container = group.itemContainer,
                animationQueue = group.animationQueue,
                animationCreation = this._animator.create(nodes, key),
                animation: {
                    animation: plat.ui.animations.IAnimationThenable<void>,
                    op: string;
                },
                animationPromise = animationCreation.current.then((): void => {
                    let index = animationQueue.indexOf(animation);
                    if (index === -1) {
                        return;
                    }

                    animationQueue.splice(index, 1);
                }),
                callback = (): plat.ui.animations.IAnimationThenable<any> => {
                    animationCreation.previous.then((): void => {
                        animationPromise.start();
                    });
                    return animationPromise;
                };

            animation = {
                animation: animationPromise,
                op: <string>null
            };

            if (cancel && animationQueue.length > 0) {
                let cancelPromise = this._cancelCurrentAnimations().then(callback);
                animationQueue.push(animation);
                return cancelPromise;
            }

            animationQueue.push(animation);
            return callback();
        }

        /**
         * @name _handleLeave
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Handles a simple animation of a block of elements.
         *
         * @param {Array<Node>} nodes The Array of nodes to animate.
         * @param {string} key The animation key/type.
         * @param {IGroupHash} group The group performing the animation.
         *
         * @returns {plat.async.Promise<void>} A promise that fulfills when the animation is complete and both
         * the cloned item has been removed and the original item has been put back.
         */
        protected _handleLeave(nodes: Array<Node>, key: string, group: IGroupHash): plat.async.Promise<void> {
            if (nodes.length === 0) {
                return this._Promise.resolve();
            }

            let container = group.itemContainer,
                animationQueue = group.animationQueue,
                animation: {
                    animation: plat.ui.animations.IAnimationThenable<void>,
                    op: string;
                },
                animationPromise = this._animator.leave(nodes, key).then((): void => {
                    let index = animationQueue.indexOf(animation);
                    if (index === -1) {
                        return;
                    }

                    animationQueue.splice(index, 1);
                });

            animation = {
                animation: animationPromise,
                op: 'leave'
            };

            animationQueue.push(animation);

            return animationPromise;
        }

        /**
         * @name _handleClonedItemAnimation
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Handles a simple animation of a block of elements.
         *
         * @param {Array<Node>} nodes The Array of nodes to animate.
         * @param {string} key The animation key/type.
         * @param {IGroupHash} group The group performing the animation.
         * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
         *
         * @returns {plat.async.Promise<void>} A promise that fulfills when the animation is complete and both
         * the cloned container has been removed and the original container has been put back.
         */
        protected _handleClonedContainerAnimation(nodes: Array<Node>, key: string, group: IGroupHash,
            cancel: boolean): plat.async.Promise<void> {
            if (nodes.length === 0) {
                return this._Promise.resolve();
            }

            let container = group.itemContainer,
                clonedContainer = container.cloneNode(true),
                parentNode: Node,
                animationQueue = group.animationQueue,
                isNull = this.utils.isNull,
                animationCreation = this._animator.create(nodes, key),
                animation: {
                    animation: plat.ui.animations.IAnimationThenable<void>,
                    op: string;
                },
                animationPromise = animationCreation.current.then((): void => {
                    let index = animationQueue.indexOf(animation);
                    if (index > -1) {
                        animationQueue.splice(index, 1);
                    }

                    if (isNull(parentNode)) {
                        return;
                    }

                    parentNode.replaceChild(container, clonedContainer);
                }),
                callback = (): plat.async.Promise<void> => {
                    parentNode = container.parentNode;
                    if (isNull(parentNode) || animationPromise.isCanceled()) {
                        return animationPromise;
                    }

                    parentNode.replaceChild(clonedContainer, container);
                    animationCreation.previous.then((): void => {
                        animationPromise.start();
                    });
                    return animationPromise;
                };

            animation = {
                animation: animationPromise,
                op: 'clone'
            };

            if (cancel && animationQueue.length > 0) {
                let cancelPromise = this._cancelCurrentAnimations().then(callback);
                animationQueue.push(animation);
                return cancelPromise;
            }

            animationQueue.push(animation);
            return callback();
        }

        /**
         * @name _cancelCurrentAnimations
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Cancels all current animations.
         *
         * @param {platui.IGroupHash} The object representing the current group.
         *
         * @returns {plat.async.Promise<any>} A promise that resolves when
         * all current animations have been canceled.
         */
        protected _cancelCurrentAnimations(group?: IGroupHash): plat.async.Promise<any> {
            let animationQueue = (group || this._defaultGroup).animationQueue,
                animations = <Array<plat.ui.animations.IAnimationThenable<any>>>[],
                length = animationQueue.length;

            for (let i = 0; i < length; ++i) {
                animations.push(animationQueue[i].animation.cancel());
            }

            return this._Promise.all(animations);
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
            if (this.utils.isString(templateName)) {
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
            let _document = this._document,
                control = _document.createElement('div'),
                ring = _document.createElement('div');

            control.className = `${__Listview}-ring ${__Plat}ring ${__Plat}ring-0`;
            ring.className = `${__Plat}animated-ring`;
            control.insertBefore(ring, null);

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
            if (this.utils.isUndefined(orientation)) {
                return 'vertical';
            }

            let validOrientation: string;
            if (orientation === 'vertical') {
                validOrientation = orientation;
            } else if (orientation === 'horizontal') {
                validOrientation = orientation;
                this._isVertical = false;
            } else {
                this._log.debug(`Invalid orientation "${orientation}" for ${this.type}. Defaulting to "vertical."`);
                validOrientation = 'vertical';
            }

            return validOrientation;
        }

        /**
         * @name _setContainerHeight
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Sets the height of a horizontally grouped {@link platui.Listview|Listview's} container.
         *
         * @returns {void}
         */
        protected _setContainerHeight(): void {
            if (this._isVertical || !this._isGrouped) {
                return;
            }

            let element = this.element,
                height = element.offsetHeight;

            if (!height) {
                this._addVisibilityListener(this._setContainerHeight.bind(this), element);
                return;
            }

            // account for scroll bar height even if scroll bar isn't visible
            // allows for transition of scroll bar in and out of page in browsers where scroll bar affects height
            height = height - this._getScrollBarWidth();
            if (height < 0) {
                height = 0;
            }

            this._container.style.height = `${height}px`;
        }

        /**
         * @name _setGroupContainerWidth
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Sets the width of a group container based on the scroll width of the group's item container.
         *
         * @param {HTMLElement} itemContainer The item container element whose parent we're going to set its scroll width on.
         *
         * @returns {void}
         */
        protected _setGroupContainerWidth(itemContainer: HTMLElement): void {
            let width = itemContainer.scrollWidth;

            if (!width) {
                this._addVisibilityListener(this._setGroupContainerWidth.bind(this, itemContainer), itemContainer);
                return;
            }

            itemContainer.parentElement.style.width = `${width}px`;
        }

        /**
         * @name _setGroupContainerPadding
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Sets the padding of a group's element.
         *
         * @param {HTMLElement} element The group container element who we're setting padding on.
         *
         * @returns {void}
         */
        protected _setGroupContainerPadding(element: HTMLElement): void {
            let elementHeight = element.offsetHeight;

            if (!elementHeight) {
                this._addVisibilityListener(this._setGroupContainerPadding.bind(this, element), element);
                return;
            }

            let header = <HTMLElement>element.firstElementChild,
                headerHeight = header.offsetHeight;

            if (!headerHeight) {
                this._addVisibilityListener(this._setGroupContainerPadding.bind(this, element), header);
                return;
            }

            element.style.paddingTop = `${headerHeight}px`;
        }

        /**
         * @name _getScrollBarWidth
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Calcuates the width of the horizontal scroll bar in the current browser.
         *
         * @returns {number} The width of the horizontal scroll bar in pixels.
         */
        protected _getScrollBarWidth(): number {
            let _document = this._document,
                body = _document.body,
                inner = _document.createElement('div'),
                outer = _document.createElement('div'),
                innerStyle = inner.style,
                outerStyle = outer.style;

            innerStyle.width = innerStyle.height = outerStyle.height = '100px';
            outerStyle.width = '50px';
            outerStyle.position = 'absolute';
            outerStyle.top = outerStyle.left = '0px';
            outerStyle.visibility = outerStyle.overflow = 'hidden';

            outer.insertBefore(inner, null);
            body.insertBefore(outer, null);

            let w1 = inner.offsetHeight;

            outerStyle.overflow = 'scroll';

            let w2 = inner.offsetHeight;

            if (w1 === w2)  {
                w2 = outer.clientHeight;
            }

            body.removeChild(outer);

            return (w1 - w2);
        }

        /**
         * @name _addVisibilityListener
         * @memberof platui.Listview
         * @kind function
         * @access protected
         *
         * @description
         * Adds a visibility listener and hides and shows element accordingly
         *
         * @param {() => void} listener The listener to fire when visible.
         * @param {HTMLElement} element The element to listen for visibility.
         *
         * @returns {void}
         */
        protected _addVisibilityListener(listener: () => void, element: HTMLElement): void {
            let visibilityRemovers = this._visibilityRemoveListeners,
                remove: plat.IRemoveListener,
                cb = (): void => {
                    listener();
                    let i = visibilityRemovers.indexOf(remove);
                    if (i !== -1) {
                        visibilityRemovers.splice(i, 1);
                    }

                    if (visibilityRemovers.length === 0) {
                        this.element.removeAttribute(__Hidden);
                    }
                };

            remove = this.dom.whenVisible(this.utils.requestAnimationFrame.bind(this, cb), element);

            if (visibilityRemovers.length === 0) {
                this.element.setAttribute(__Hidden, '');
            }

            visibilityRemovers.push(remove);
        }
    }

    plat.register.control(__Listview, Listview);

    /**
     * @name IListviewOptions
     * @memberof platui
     * @kind interface
     *
     * @extends {plat.ui.controls.IForEachOptions}
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
         * The default value is "vertical".
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
         * @type {string|(item: any, index: number, group?: string) => string}
         *
         * @description
         * The node name of the desired item template or a defined item template selector function.
         */
        itemTemplate?: any;

        /**
         * @name headerTemplate
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The node name of the desired group header template.
         */
        headerTemplate?: string;

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
         * @name scrollElement
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         *
         * @type {HTMLElement|string}
         *
         * @description
         * Indicates a separate HTMLElement is being used to scroll. If this is set to a HTMLElement, the {@link platui.Listview|Listview}
         * will not handle its own scrolling. If it is set to a string, the {@link platui.Listview|Listview} will run a querySelector
         * on it at the Document level to obtain the Element.
         */
        scrollElement?: HTMLElement;

        /**
         * @name onItemsRequested
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The name of the function that will be called when more items are being requested to add to the list.
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
         * @name itemContainer
         * @memberof platui.IGroupHash
         * @kind property
         * @access public
         *
         * @type {HTMLElement}
         *
         * @description
         * The group's item container.
         */
        itemContainer: HTMLElement;

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

        /**
         * @name addQueue
         * @memberof platui.IGroupHash
         * @kind property
         * @access public
         *
         * @type {Array<plat.async.Promise<void>>}
         *
         * @description
         * An Array of promises denoting items being added to this group.
         */
        addQueue: Array<plat.async.Promise<void>>;

        /**
         * @name itemCount
         * @memberof platui.IGroupHash
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * The current number of synchronous items in the group.
         */
        itemCount: number;

        /**
         * @name animationQueue
         * @memberof platui.IGroupHash
         * @kind property
         * @access public
         *
         * @type {Array<{ animation: plat.ui.animations.IAnimationThenable<any>; op: string; }>}
         *
         * @description
         * A queue of objects representing current animations and their operation for this group.
         */
        animationQueue: Array<{ animation: plat.ui.animations.IAnimationThenable<any>; op: string; }>;
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
         * Will be available in the headerTemplate as "group".
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
     * @extends {plat.ui.controls.IForEachAliasOptions}
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
