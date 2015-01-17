module platui {
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
         * @name currentCount
         * @memberof platui.Listview
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The number of items currently loaded.
         */
        currentCount = 0;

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
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        protected _utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * @name _compat
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        protected _compat: plat.ICompat = plat.acquire(__Compat);

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
         * @name _TemplateControl
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.ITemplateControlFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
         */
        protected _TemplateControl: plat.ui.ITemplateControlFactory = plat.acquire(__TemplateControlFactory);

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
         * @name _increment
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The number of items to incrementally load.
         */
        protected _increment: number;

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
         * @name _itemTemplateSelector
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {(item: any, index: number) => string|plat.async.IPromise}
         * 
         * @description
         * The selector function used to obtain the template key for each item.
         */
        protected _itemTemplateSelector: (item: any, index: number) => any;

        /**
         * @name _itemTemplatePromise
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {plat.async.IThenable<any>}
         * 
         * @description
         * A promise that denotes that items are currently being rendered.
         */
        protected _itemTemplatePromise: plat.async.IThenable<any>;

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
                orientation = this._orientation = options.orientation || 'vertical',
                increment = this._increment = options.increment,
                itemTemplate = options.itemTemplate,
                _Exception: plat.IExceptionStatic;

            this._container = <HTMLElement>this.element.firstElementChild;
            this.dom.addClass(this.element, __Plat + orientation);

            if (!_utils.isString(itemTemplate)) {
                _Exception = this._Exception;
                _Exception.warn('No item template or item template selector specified for ' + this.type + '.', _Exception.TEMPLATE);
                return;
            }

            this._determineItemTemplate(itemTemplate);

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
         * @param {number} count? The number of items to render. If not specified, the increment count 
         * will be used. If no increment was specified, the whole context will be rendered.
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
                index = this.currentCount;
            }

            var lastIndex = this.context.length,
                maxCount = lastIndex - index,
                increment = this._increment,
                itemCount: number;

            if (isNumber(count)) {
                itemCount = maxCount >= count ? count : maxCount;
            } else if (isNumber(increment)) {
                itemCount = maxCount >= increment ? increment : maxCount;
            } else {
                itemCount = maxCount;
            }

            if (_utils.isFunction(this._itemTemplateSelector)) {
                this._disposeFromIndex(index);
                this._renderUsingFunction(index, itemCount);
                return;
            }

            var key = this._itemTemplate;
            if (_utils.isUndefined(bindableTemplates.templates[key])) {
                return;
            }

            this._disposeFromIndex(index);
            this._addItems(itemCount, index);
            this.currentCount = index + itemCount;
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
            var _utils = this._utils,
                templateKey = this._normalizeTemplateName(itemTemplate);

            if (this._templates[templateKey] === true) {
                this._itemTemplate = templateKey;
                return;
            }

            var controlProperty = this.findProperty(itemTemplate) || <plat.IControlProperty>{};
            if (!_utils.isFunction(controlProperty.value)) {
                var _Exception = this._Exception;
                _Exception.warn(__Listview + ' item template "' + itemTemplate +
                    '" was neither a template defined in the DOM nor a template selector function in its control hiearchy.',
                    _Exception.TEMPLATE);
                return;
            }

            this._itemTemplateSelector = (<Function>controlProperty.value).bind(controlProperty.control);
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
                var dispose = this._TemplateControl.dispose;
                for (var i = this.context.length - 1; i >= index; --i) {
                    if (controls.length > i) {
                        dispose(controls[i]);
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
         * @param {number} count The number of items to render.
         * 
         * @returns {plat.async.IThenable<any>} The promise that fulfills when all items have been rendered.
         */
        protected _renderUsingFunction(index: number, count: number): plat.async.IThenable<any> {
            var _utils = this._utils;
            if (!_utils.isNull(this._itemTemplatePromise)) {
                return this._itemTemplatePromise = this._itemTemplatePromise.then(() => {
                    return this._renderUsingFunction(index, count);
                });
            }

            var context = this.context,
                renderFn = this._itemTemplateSelector,
                _Promise = this._Promise,
                retVals = <Array<any>>[],
                i: number, j: number;

            for (i = 0, j = index; i < count; ++i, ++j) {
                retVals.push(renderFn(context[j], j));
            }

            return this._itemTemplatePromise = _Promise.all(retVals).then((keys: Array<string>) => {
                var length = keys.length,
                    bindableTemplates = this.bindableTemplates,
                    templates = bindableTemplates.templates,
                    isUndefined = this._utils.isUndefined,
                    promises = <Array<plat.async.IThenable<DocumentFragment>>>[],
                    key: string;

                for (i = 0; i < length; ++i, ++index) {
                    key = this._normalizeTemplateName(keys[i]);
                    if (!isUndefined(templates[key])) {
                        promises.push(bindableTemplates.bind(key, index, this._getAliases(index)));
                        this.currentCount++;
                    }
                }

                return this._itemTemplatePromise = _Promise.all(promises).then((fragments) => {
                    this._appendItems(fragments);
                    this._itemTemplatePromise = null;
                });
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
            if (this._utils.isFunction(this._itemTemplateSelector)) {
                this._renderUsingFunction(this.context.length - 1, 1);
                return;
            }

            super._push(ev);
            this.currentCount++;
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
            this.currentCount--;
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
            this.currentCount--;
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
            super._splice(ev);
            var args = ev.arguments;
            this.currentCount += args.length - 2 - args[2];
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
            super._unshift(ev);
            this.currentCount++;
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
            return templateName.toLowerCase().replace(this._nodeNameRegex, '');
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
         * @name increment
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The number of items to incrementally load.
         */
        increment?: number;

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
    }
}
