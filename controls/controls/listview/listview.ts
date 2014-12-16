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
         * @name $window
         * @memberof platui.Listview
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
         * @name $document
         * @memberof platui.Listview
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
         * @name $utils
         * @memberof platui.Listview
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
         * @memberof platui.Listview
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
         * @name templates
         * @memberof platui.Listview
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<Node>}
         * 
         * @description
         * An object containing the {@link platui.Listview|Listview's} defined templates.
         */
        templates: plat.IObject<Node> = {};

        /**
         * @name _container
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The control's container element.
         */
        protected _container: HTMLElement;

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
         * @name _usingRenderFunction
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not a render function is being used.
         */
        protected _usingRenderFunction = false;

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
         * @name _renderFunction
         * @memberof platui.Listview
         * @kind property
         * @access protected
         * 
         * @type {(item: any, templates: plat.IObject<Node>) => string}
         * 
         * @description
         * The render function used to obtain the template key for each item.
         */
        protected _renderFunction: (item: any, templates: plat.IObject<Node>) => string;

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
            var $utils = this.$utils;
            if ($utils.isString(this.templateUrl)) {
                var fragment = this.dom.serializeHtml(this.templateString),
                    element = this.element;

                this._container = <HTMLElement>fragment.firstChild;
                this._parseTemplates(element);

                element.appendChild(fragment);
                return;
            }

            var innerTemplate = this.innerTemplate;
            this._container = <HTMLElement>this.element.firstElementChild;

            if ($utils.isNode(innerTemplate)) {
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
        contextChanged(): void {
            if (!this.$utils.isArray(this.context)) {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.warn(__Listview + ' context set to something other than an Array.', $exception.CONTEXT);
                return;
            }

            this._setListener();
            this.render();
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
            var optionObj = this.options || <plat.observable.IObservableProperty<IListviewOptions>>{},
                options = optionObj.value || <IListviewOptions>{},
                $utils = this.$utils,
                templates = this.templates,
                orientation = this._orientation = options.orientation || 'vertical',
                itemTemplate = options.itemTemplate,
                $exception: plat.IExceptionStatic;

            this.dom.addClass(this.element, __Plat + orientation);

            if ($utils.isString(itemTemplate)) {
                this._itemTemplate = itemTemplate;
                if (!$utils.isNode(templates[itemTemplate])) {
                    $exception = plat.acquire(__ExceptionStatic);
                    $exception.warn(__Listview + ' item template "' + itemTemplate + '" was not defined in the DOM.', $exception.TEMPLATE);
                    return;
                }
            }

            if (!$utils.isArray(this.context)) {
                if (!$utils.isNull(this.context)) {
                    $exception = plat.acquire(__ExceptionStatic);
                    $exception.warn(__Listview + ' context set to something other than an Array.', $exception.CONTEXT);
                }
                return;
            }

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
         * Blow out the DOM, determine how to render, and render accordingly.
         * 
         * @returns {void}
         */
        render(): void {
            var $utils = this.$utils,
                bindableTemplates = this.bindableTemplates,
                container = this._container;

            this.dom.clearNode(container);

            if (this._usingRenderFunction) {
                return;
            }

            var key = this._itemTemplate;
            if ($utils.isUndefined(bindableTemplates.templates[key])) {
                return;
            }

            var length = this.context.length;
            for (var i = 0; i < length; ++i) {
                bindableTemplates.bind(key, i).then((template) => {
                    container.appendChild(template);
                }).catch((error) => {
                        this.$utils.postpone(() => {
                            var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                            $exception.fatal(error, $exception.BIND);
                        });
                    });
            }
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
            var $utils = this.$utils,
                $document = this.$document,
                templates = this.templates,
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
                    fragment = $document.createDocumentFragment();
                    subNodes = slice.call(childNode.childNodes);

                    while (subNodes.length > 0) {
                        fragment.appendChild(subNodes.shift());
                    }

                    templateName = $utils.camelCase(childNode.nodeName.toLowerCase());
                    bindableTemplates.add(templateName, fragment);
                    templates[templateName] = fragment;
                }
            }
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
         * The orientation (scroll direction) of the {@link platui.Listview|Listview's}. 
         * Defaults to "vertical".
         * 
         * @remarks
         * - "vertical"
         * - "horizontal"
         */
        orientation: string;

        /**
         * @name itemTemplate
         * @memberof platui.IListviewOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The camel-cased node name of the desired item template.
         * 
         * @remarks
         * Unnecessary if a render function is defined.
         */
        itemTemplate: string;

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
