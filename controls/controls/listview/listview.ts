﻿module platui {
    /**
     * @name Listview
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.controls.ForEach}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} for creating a complex list of items with 
     * extensive functionality.
     */
    export class Listview extends plat.ui.controls.ForEach implements IUIControl {
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
        templateString = '<div class="plat-listview-container"></div>\n';

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
         * @name count
         * @memberof platui.Listview
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The number of items currently loaded.
         */
        count = 0;

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
        protected _window: Window = plat.acquire(__Window);

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
        protected _document: Document = plat.acquire(__Document);

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
        protected _utils: plat.Utils = plat.acquire(__Utils);

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
        protected _compat: plat.Compat = plat.acquire(__Compat);

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
        protected _Promise: plat.async.IPromise = plat.acquire(__Promise);

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
        protected _TemplateControlFactory: plat.ui.ITemplateControlFactory = plat.acquire(__TemplateControlFactory);

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
         * @name _orientation
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The control's orientation.
         * 
         * @remarks
         * - "vertical"
         * - "horizontal"
         */
        protected _orientation: string;

        /**
         * @name _itemTemplate
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The item template key if a single item template is being used.
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
         * @type {plat.IObject<string>}
         * 
         * @description
         * An object containing template keys associated with an index.
         */
        protected _templateSelectorKeys: plat.IObject<string>;

        /**
         * @name _itemTemplateSelector
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {(ev?: Event) => any}
         * 
         * @description
         * An incremental loading function that will be called with the container's scroll Event whenever more items should 
         * are being requested. Returning false will end all incremental loading. Returning a promise will pause all 
         * other incremental loading until the promise resolves.
         */
        protected _incrementalLoading: (ev?: Event) => any;

        /**
         * @name _incrementalProgressRing
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * An incremental loading ring that is shown when the user returns a promise from the incremental loading function.
         */
        protected _incrementalProgressRing: HTMLElement;

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
         * @name _nodeNameRegex
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression for normalizing a node name by removing potential special characters.
         */
        protected _nodeNameRegex = /-|\.|_/g;

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
            var optionObj = this.options || <plat.observable.IObservableProperty<IListviewOptions>>{},
                options = optionObj.value || <IListviewOptions>{};

            this.templateUrl = options.templateUrl;
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
            var _utils = this._utils;
            if (_utils.isString(this.templateUrl)) {
                var fragment = this.dom.serializeHtml(this.templateString),
                    element = this.element;

                this._parseTemplates(element);
                element.appendChild(fragment);
                return;
            }

            var innerTemplate = this.innerTemplate;
            if (_utils.isNode(innerTemplate)) {
                this._parseTemplates(innerTemplate);
            }
        }

        /**
         * @name contextChanged
         * @memberof platui.Listview
         * @kind function
         * @access public
         * 
         * @description
         * Check new context, re-determine item templates, and kick off re-rendering.
         * 
         * @returns {void}
         */
        //contextChanged(): void {
        //}

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
            var optionObj = this.options || <plat.observable.IObservableProperty<IListviewOptions>>{},
                options = optionObj.value || <IListviewOptions>{},
                _utils = this._utils,
                isString = _utils.isString,
                orientation = this._orientation = options.orientation || 'vertical',
                incrementalLoading = options.incrementalLoading,
                itemTemplate = options.itemTemplate,
                _Exception: plat.IExceptionStatic;

            this._container = <HTMLElement>this.element.firstElementChild;
            this.dom.addClass(this.element, __Plat + orientation);

            if (!isString(itemTemplate)) {
                _Exception = this._Exception;
                _Exception.warn('No item template or item template selector specified for ' + this.type + '.', _Exception.TEMPLATE);
                return;
            }

            this._determineItemTemplate(itemTemplate);
            if (isString(incrementalLoading)) {
                this._determineIncrementalLoading(incrementalLoading, options.incrementalLoadingRing === false);
            }

            if (!_utils.isArray(this.context)) {
                if (!_utils.isNull(this.context)) {
                    _Exception = this._Exception;
                    _Exception.warn(this.type + ' context set to something other than an Array.', _Exception.CONTEXT);
                }
                return;
            }

            this._setAliases();
            this._setListener();
            this.render();
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
         * 
         * @returns {void}
         */
        render(index?: number, count?: number): void {
            var _utils = this._utils,
                isNumber = _utils.isNumber,
                bindableTemplates = this.bindableTemplates,
                controls = this.controls,
                container = this._container;

            if (!isNumber(index)) {
                index = this.count;
            }

            var lastIndex = this.context.length,
                maxCount = lastIndex - index,
                itemCount = isNumber(count) && maxCount >= count ? count : maxCount;

            if (_utils.isFunction(this._templateSelector)) {
                while (itemCount-- > 0) {
                    this._renderUsingFunction(index++);
                }
                return;
            }

            var key = this._itemTemplate;
            if (_utils.isUndefined(bindableTemplates.templates[key])) {
                return;
            }

            this._disposeFromIndex(index);
            this._addItems(itemCount, index);
            this.count += itemCount;
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
         * @returns {void}
         */
        rerender(): void {
            this.render(0);
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
         * 
         * @returns {void}
         */
        protected _determineItemTemplate(itemTemplate: string): void {
            var templateKey = this._normalizeTemplateName(itemTemplate);

            if (this._templates[templateKey] === true) {
                this._itemTemplate = templateKey;
                return;
            }

            var controlProperty = this.findProperty(itemTemplate) || <plat.IControlProperty>{};
            if (!this._utils.isFunction(controlProperty.value)) {
                var _Exception = this._Exception;
                _Exception.warn(__Listview + ' item template "' + itemTemplate +
                    '" was neither a template defined in the DOM nor a template selector function in its control hiearchy.',
                    _Exception.TEMPLATE);
                return;
            }

            this._templateSelector = (<Function>controlProperty.value).bind(controlProperty.control);
            this._templateSelectorKeys = {};
        }

        /**
         * @name _determineIncrementalLoading
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Find and determine the incremental loading function.
         * 
         * @param {string} incrementalLoading The property for indicating the incremental loading function.
         * @param {boolean} hideRing Whether or not to hide the incremental loading ring.
         * 
         * @returns {void}
         */
        protected _determineIncrementalLoading(incrementalLoading: string, hideRing: boolean): void {
            var controlProperty = this.findProperty(incrementalLoading) || <plat.IControlProperty>{};
            if (!this._utils.isFunction(controlProperty.value)) {
                var _Exception = this._Exception;
                _Exception.warn(__Listview + ' incremental loading function "' + incrementalLoading +
                    '" was not found.', _Exception.CONTROL);
                return;
            }

            this._incrementalLoading = (<Function>controlProperty.value).bind(controlProperty.control);
            this._removeScroll = this.addEventListener(this._container, 'scroll', this._handleScroll, false);

            if (hideRing) {
                return;
            }

            var progressRingContainer = this._incrementalProgressRing = this._document.createElement('div');
            progressRingContainer.className = 'plat-incremental';
            progressRingContainer.insertBefore(this._generateProgressRing(), null);
        }

        /**
         * @name _handleScroll
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
        protected _handleScroll(ev: Event): void {
            var target = <HTMLElement>ev.target,
                scrollPos = this._scrollPosition,
                scrollPosition = target.scrollTop + target.offsetHeight;

            if (scrollPos > scrollPosition) {
                this._scrollPosition = scrollPosition;
                return;
            } else if (scrollPos + 5 > scrollPosition) {
                return;
            }

            this._scrollPosition = scrollPosition;

            var scrollLength = (this._orientation === 'horizontal' ? target.scrollWidth : target.scrollHeight) * 0.8,
                _utils = this._utils;
            if (scrollLength === 0) {
                return;
            } else if (scrollPosition >= scrollLength) {
                var itemsRemain = this._incrementalLoading(ev);
                if (itemsRemain === false) {
                    this._removeScroll();
                } else if (_utils.isPromise(itemsRemain)) {
                    var progressRing = this._incrementalProgressRing,
                        showProgress = !_utils.isNull(progressRing),
                        container = this._container;

                    this._removeScroll();
                    if (showProgress) {
                        container.insertBefore(progressRing, null);
                    }

                    itemsRemain.then((moreItemsRemain: boolean) => {
                        if (showProgress) {
                            container.removeChild(progressRing);
                        }
                        if (moreItemsRemain === false) {
                            return;
                        }
                        this._removeScroll = this.addEventListener(this._container, 'scroll', this._handleScroll, false);
                    });
                }
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
         * 
         * @returns {void}
         */
        protected _disposeFromIndex(index: number): void {
            var controls = this.controls;

            if (controls.length > 0) {
                var dispose = this._TemplateControlFactory.dispose;
                for (var i = this.context.length - 1; i >= index; --i) {
                    if (controls.length > i) {
                        dispose(controls[i]);
                        this.count--;
                    }
                }
            }
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
         * 
         * @returns {plat.async.IThenable<any>} The promise that fulfills when all items have been rendered.
         */
        protected _renderUsingFunction(index: number): plat.async.IThenable<void> {
            var _Promise = this._Promise,
                _utils = this._utils;

            return _Promise.resolve(this._templateSelectorPromise).then(() => {
                return this._templateSelectorPromise = _Promise.resolve<string>(this._templateSelector(this.context[index], index));
            }).then((selectedTemplate) => {
                var bindableTemplates = this.bindableTemplates,
                    templates = bindableTemplates.templates,
                    controls = this.controls,
                    key = this._normalizeTemplateName(selectedTemplate),
                    controlExists = index < controls.length;

                if (!_utils.isUndefined(templates[key])) {
                    if (controlExists) {
                        if (key === this._templateSelectorKeys[index]) {
                            return;
                        }

                        this._templateSelectorKeys[index] = key;
                        return <plat.async.IThenable<any>>bindableTemplates.replace(index, key, index, this._getAliases(index));
                    }

                    this._templateSelectorKeys[index] = key;
                    return bindableTemplates.bind(key, index, this._getAliases(index));
                } else if (controlExists) {
                    this._TemplateControlFactory.dispose(controls[index]);
                    this.count--;
                }
            }).then((node) => {
                if (_utils.isNull(node) || _utils.isArray(node)) {
                    return;
                }

                this._appendItem(node);
                this.count++;
            }).then(null, (error) => {
                var _Exception = this._Exception;
                _Exception.warn(this.type + ' error: ' + error, _Exception.CONTROL);
            });
        }

        /**
         * @name _bindItem
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Binds the item to a template at that index.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves with 
         * the a DocumentFragment that represents an item.
         */
        protected _bindItem(index: number): plat.async.IThenable<DocumentFragment> {
            return this.bindableTemplates.bind(this._itemTemplate, index, this._getAliases(index));
        }

        /**
         * @name _appendItem
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Adds an item to the container without animating.
         * 
         * @param {Node} item The new Node to add.
         * 
         * @returns {void}
         */
        protected _appendItem(item: Node): void {
            var platItem = this._document.createElement('div');
            platItem.className = 'plat-listview-item';
            platItem.insertBefore(item, null);
            this._container.insertBefore(platItem, null);
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
         * 
         * @returns {void}
         */
        protected _appendItems(items: Array<Node>): void {
            while (items.length > 0) {
                this._appendItem(items.shift());
            }
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
         * 
         * @returns {void}
         */
        protected _appendAnimatedItem(item: DocumentFragment, key: string): void {
            if (!this._utils.isNode(item)) {
                return;
            }

            var _animator = this._animator,
                itemContainer = this._document.createElement('div');

            itemContainer.className = 'plat-listview-item';
            itemContainer.insertBefore(item, null);
            this._container.insertBefore(itemContainer, null);

            var currentAnimations = this._currentAnimations;
            currentAnimations.push(_animator.animate(itemContainer, key).then(() => {
                currentAnimations.shift();
            }));
        }

        /**
         * @name _parseTemplates
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Parse the Listview templates and create the templates object.
         * 
         * @param {Node} node The node whose childNodes we want to parse.
         * 
         * @returns {void}
         */
        protected _parseTemplates(node: Node): void {
            var _document = this._document,
                regex = this._nodeNameRegex,
                templates = this._templates,
                bindableTemplates = this.bindableTemplates,
                slice = Array.prototype.slice,
                childNodes: Array<Node> = slice.call(node.childNodes),
                childNode: Node,
                subNodes: Array<Node>,
                templateName: string,
                fragment: DocumentFragment;

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.ELEMENT_NODE) {
                    fragment = _document.createDocumentFragment();
                    subNodes = slice.call(childNode.childNodes);

                    while (subNodes.length > 0) {
                        fragment.appendChild(subNodes.shift());
                    }

                    templateName = this._normalizeTemplateName(childNode.nodeName);
                    bindableTemplates.add(templateName, fragment);
                    templates[templateName] = true;
                }
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _push(ev: plat.observable.IPostArrayChangeInfo<any>): void {
            if (this._utils.isFunction(this._templateSelector)) {
                this._renderUsingFunction(this.context.length - 1);
                return;
            }

            super._push(ev);
            this.count++;
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _pop(ev: plat.observable.IPostArrayChangeInfo<any>): void {
            super._pop(ev);
            this.count--;
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _shift(ev: plat.observable.IPostArrayChangeInfo<any>): void {
            super._shift(ev);
            this.count--;
        }

        /**
         * @name _presplice
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handles adding/removing items when an array is spliced.
         * 
         * @param {plat.observable.IPreArrayChangeInfo} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        //protected _presplice(ev: plat.observable.IPreArrayChangeInfo): void {
        //    if (ev.arguments[0] > this.currentCount) {
        //        return;
        //    }

        //    super._presplice(ev);
        //}

        /**
         * @name _splice
         * @memberof platui.Listview
         * @kind function
         * @access protected
         * 
         * @description
         * Handles adding/removing items when an array is spliced.
         * 
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _splice(ev: plat.observable.IPostArrayChangeInfo<any>): void {
            var additions = ev.newArray.length - ev.oldArray.length;
            if (additions > 0 && this._utils.isFunction(this._templateSelector)) {
                if (this._utils.isNull(ev.arguments)) {
                    this.rerender();
                } else {
                    this.render(ev.arguments[0], additions);
                }
                return;
            }

            super._splice(ev);
            this.count += additions;
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _unshift(ev: plat.observable.IPostArrayChangeInfo<any>): void {
            if (this._utils.isFunction(this._templateSelector)) {
                this.rerender();
                return;
            }

            super._unshift(ev);
            this.count++;
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
                return templateName.toLowerCase().replace(this._nodeNameRegex, '');
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
         * @type {string|(item?: any, templates?: plat.IObject<Node>) => string}
         * 
         * @description
         * The camel-cased node name of the desired item template or a defined template selector function.
         */
        itemTemplate?: any;

        /**
         * @name incrementalLoading
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The function that will be called for incremental loading.
         */
        incrementalLoading?: string;

        /**
         * @name incrementalLoading
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not to show an incremental loading ring when a promise is returned from the 
         * incremental loading function. Defaults to true.
         */
        incrementalLoadingRing?: boolean;

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
         * @name pullRefresh
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The function that will be called when the user pulls down/right to refresh.
         * 
         * @remarks
         * When the {@link platui.Listview|Listview's} orientation is vertical the motion will 
         * be to pull down when the list is scrolled all the way to the top, when horizontal the motion 
         * will be to pull right when the list is scrolled all the way to the left.
         */
        pullRefresh?: string;
    }
}
