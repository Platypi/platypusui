/// <reference path="../references.d.ts" />

module platui {
    /**
     * @name Navbar
     * @memberof platui
     * @kind class
     *
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     *
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that acts as a global navigation bar that defines its own context.
     */
    export class Navbar extends plat.ui.TemplateControl implements IUiControl {
        protected static _inject: any = {
            _document: __Document
        };

        /**
         * @name templateString
         * @memberof platui.Navbar
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The HTML template represented as a string.
         */
        templateString: string =
        '<div class="plat-navbar-left">\n' +
        '    <div class="plat-navbar-items" plat-control="' + __ForEach + '" plat-context="left">\n' +
        '        <div class="plat-navbar-item" plat-control="' + __Html + '" plat-options="{ html: content, compile: true }" plat-tap="leftAction(@index)"></div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="plat-navbar-center">\n' +
        '    <div class="plat-navbar-items" plat-control="' + __ForEach + '" plat-context="center">\n' +
        '        <div class="plat-navbar-item" plat-control="' + __Html + '" plat-options="{ html: content, compile: true }" plat-tap="centerAction(@index)"></div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="plat-navbar-right">\n' +
        '    <div class="plat-navbar-items" plat-control="' + __ForEach + '" plat-context="right">\n' +
        '        <div class="plat-navbar-item" plat-control="' + __Html + '" plat-options="{ html: content, compile: true }" plat-tap="rightAction(@index)"></div>\n' +
        '    </div>\n' +
        '</div>\n';

        /**
         * @name options
         * @memberof platui.Navbar
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<platui.INavbarOptions>}
         *
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<INavbarOptions>;

        /**
         * @name context
         * @memberof platui.Navbar
         * @kind property
         * @access public
         *
         * @type {platui.INavbarContext}
         *
         * @description
         * The {@link platui.Navbar|Navbar} control's context.
         */
        context: INavbarContext = {
            left: [{
                content: '',
                action: noop
            }],
            center: [{
                content: '',
                action: noop
            }],
            right: [{
                content: '',
                action: noop
            }]
        };

        /**
         * @name hasOwnContext
         * @memberof platui.Navbar
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * Specifies that the {@link platui.Navbar|Navbar} defines it's own context.
         */
        hasOwnContext: boolean = true;

        /**
         * @name _document
         * @memberof platui.Navbar
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
         * @name _overrides
         * @memberof platui.Navbar
         * @kind property
         * @access protected
         *
         * @type {platui.INavbarProperties<boolean>}
         *
         * @description
         * An object specifying whether a particular section of the {@link platui.Navbar|Navbar}
         * has been overridden.
         */
        protected _overrides: INavbarProperties<boolean> = {
          left: false,
          center: false,
          right: false
        };

        /**
         * @name setClasses
         * @memberof platui.Navbar
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
            this.dom.addClass(element || this.element, `${__Navbar} ${(className || '')}`);
        }

        /**
         * @name initialize
         * @memberof platui.Navbar
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
         * @memberof platui.Navbar
         * @kind function
         * @access public
         *
         * @description
         * Looks for and applies overwritten components.
         *
         * @returns {void}
         */
        setTemplate(): void {
            let isNull = this.utils.isNull,
                innerTemplate = this.innerTemplate;

            if (isNull(innerTemplate)) {
                return;
            }

            let doc = this._document,
                overrides = this._overrides,
                slice = Array.prototype.slice,
                appendChildren = this.dom.appendChildren,
                childNodes = slice.call(innerTemplate.childNodes),
                childNode: Node,
                newNode: HTMLElement,
                element = this.element,
                elementNodes = slice.call(element.children);

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }

                switch(childNode.nodeName.toLowerCase()) {
                    case 'left':
                        overrides.left = true;
                        newNode = doc.createElement('div');
                        newNode.className = `${__Navbar}-left`;
                        newNode.setAttribute(__Context, 'left');
                        element.replaceChild(appendChildren(slice.call(childNode.childNodes), newNode), elementNodes[0]);
                        break;
                    case 'center':
                        overrides.center = true;
                        newNode = doc.createElement('div');
                        newNode.className = `${__Navbar}-center`;
                        newNode.setAttribute(__Context, 'center');
                        element.replaceChild(appendChildren(slice.call(childNode.childNodes), newNode), elementNodes[1]);
                        break;
                    case 'right':
                        overrides.right = true;
                        newNode = doc.createElement('div');
                        newNode.className = `${__Navbar}-right`;
                        newNode.setAttribute(__Context, 'right');
                        element.replaceChild(appendChildren(slice.call(childNode.childNodes), newNode), elementNodes[2]);
                        break;
                }
            }
        }

        /**
         * @name loaded
         * @memberof platui.Navbar
         * @kind function
         * @access public
         *
         * @description
         * Initializes all options.
         *
         * @returns {void}
         */
        loaded(): void {
            let optionObj = this.options || <plat.observable.IObservableProperty<INavbarOptions>>{},
                options = optionObj.value || <INavbarOptions>{},
                position = this.utils.isString(options.position) && options.position.toLowerCase() === 'bottom' ? '-bottom' : '-top';

            this.dom.addClass(this.element, __Navbar + position);
        }

        /**
         * @name setLeft
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Sets the left part of the {@link platui.Navbar|Navbar}.
         *
         * @param {platui.INavbarComponent} component The component to be set as the sole item in
         * the left part of the {@link platui.Navbar|Navbar}.
         *
         * @returns {void}
         */
        setLeft(component: INavbarComponent): void;
        /**
         * @name setLeft
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Sets the left part of the {@link platui.Navbar|Navbar}.
         *
         * @param {Array<platui.INavbarComponent>} components An Array of components to be set as the left
         * {@link platui.Navbar|Navbar's} items.
         *
         * @returns {void}
         */
        setLeft(components: Array<INavbarComponent>): void;
        setLeft(components: any): void {
            this._setComponent('left', components);
        }

        /**
         * @name setCenter
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Sets the center part of the {@link platui.Navbar|Navbar}.
         *
         * @param {platui.INavbarComponent} component The component to be set as the sole item in
         * the center part of the {@link platui.Navbar|Navbar}.
         *
         * @returns {void}
         */
        setCenter(component: INavbarComponent): void;
        /**
         * @name setCenter
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Sets the center part of the {@link platui.Navbar|Navbar}.
         *
         * @param {Array<platui.INavbarComponent>} components An Array of components to be set as the center
         * {@link platui.Navbar|Navbar's} items.
         *
         * @returns {void}
         */
        setCenter(components: Array<INavbarComponent>): void;
        setCenter(components: any): void {
            this._setComponent('center', components);
        }

        /**
         * @name setRight
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Sets the right {@link platui.Navbar|Navbar} component's context.
         *
         * @param {platui.INavbarComponent} component The component to be set as the sole item in
         * the right part of the {@link platui.Navbar|Navbar}.
         *
         * @returns {void}
         */
        setRight(component: INavbarComponent): void;
        /**
         * @name setRight
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Sets the right part of the {@link platui.Navbar|Navbar}.
         *
         * @param {Array<platui.INavbarComponent>} components An Array of components to be set as the right
         * {@link platui.Navbar|Navbar's} items.
         *
         * @returns {void}
         */
        setRight(components: Array<INavbarComponent>): void;
        setRight(components: any): void {
            this._setComponent('right', components);
        }

        /**
         * @name leftAction
         * @memberof platui.Navbar
         * @kind function
         * @access public
         *
         * @description
         * The defined action of the left part of the {@link platui.Navbar|Navbar} when tapped.
         *
         * @param {number} index? The index of the action tapped.
         * @param {plat.ui.IGestureEvent} ev? The "$tap" event.
         *
         * @returns {void}
         */
        leftAction(index?: number, ev?: plat.ui.IGestureEvent): void {
            this._executeAction(ev, 'left', index);
        }

        /**
         * @name centerAction
         * @memberof platui.Navbar
         * @kind function
         * @access public
         *
         * @description
         * The defined action of the center part of the {@link platui.Navbar|Navbar} when tapped.
         *
         * @param {number} index? The index of the action tapped.
         * @param {plat.ui.IGestureEvent} ev? The "$tap" event.
         *
         * @returns {void}
         */
        centerAction(index?: number, ev?: plat.ui.IGestureEvent): void {
            this._executeAction(ev, 'center', index);
        }

        /**
         * @name rightAction
         * @memberof platui.Navbar
         * @kind function
         * @access public
         *
         * @description
         * The defined action of the right part of the {@link platui.Navbar|Navbar} when tapped.
         *
         * @param {number} index? The index of the action tapped.
         * @param {plat.ui.IGestureEvent} ev? The "$tap" event.
         *
         * @returns {void}
         */
        rightAction(index?: number, ev?: plat.ui.IGestureEvent): void {
            this._executeAction(ev, 'right', index);
        }

        /**
         * @name _setComponent
         * @memberof platui.Navbar
         * @kind function
         * @access protected
         * @variation 0
         *
         * @description
         * Determines the nature of the passed in components and sets the context at the given position
         * to the determined {@link platui.INavbarComponent|INavbarComponent(s)}.
         *
         * @param {string} position The part of the {@link platui.Navbar|Navbar} being set.
         * @param {platui.INavbarComponent} component The {@link platui.INavbarComponent|INavbarComponent}
         * to set as the context.
         *
         * @returns {void}
         */
        protected _setComponent(position: string, component: INavbarComponent): void;
        /**
         * @name _setComponent
         * @memberof platui.Navbar
         * @kind function
         * @access protected
         * @variation 1
         *
         * @description
         * Determines the nature of the passed in components and sets the context at the given position
         * to the determined {@link platui.INavbarComponent|INavbarComponent(s)}.
         *
         * @param {string} position The part of the {@link platui.Navbar|Navbar} being set.
         * @param {Array<platui.INavbarComponent>} components The {@link platui.INavbarComponent|INavbarComponents}
         * to set as the context.
         *
         * @returns {void}
         */
        protected _setComponent(position: string, components: Array<INavbarComponent>): void;
        protected _setComponent(position: string, components: any): void {
            let context = this.context;
            if (!this.utils.isArray(components)) {
                if (this._overrides[position]) {
                    this._parseComponent(components);
                    context[position] = components;
                    return;
                }

                components = [components];
            }

            let curr = components.length;
            while (curr-- > 0) {
                this._parseComponent(components[curr], (<any>context[position])[curr]);
            }

            context[position] = components;
        }

        /**
         * @name _parseComponent
         * @memberof platui.Navbar
         * @kind function
         * @access protected
         *
         * @description
         * Sets default component parameters and grabs custom actions from it.
         *
         * @param {platui.INavbarComponent} newComponent The new {@link platui.INavbarComponent|INavbarComponent}
         * to parse.
         * @param {platui.INavbarComponent} oldComponent? The old {@link platui.INavbarComponent|INavbarComponent}
         * whose place is being taken.
         *
         * @returns {void}
         */
        protected _parseComponent(newComponent: INavbarComponent, oldComponent?: INavbarComponent): void {
            let utils = this.utils,
                isObject = utils.isObject,
                oldComponentExists = isObject(oldComponent),
                customActions: plat.IObject<() => any>,
                keys: Array<string>,
                key: string,
                currKey: number;

            if (oldComponentExists && utils.isUndefined(newComponent.content)) {
                newComponent.content = oldComponent.content;
            }

            if (!utils.isFunction(newComponent.action)) {
                newComponent.action = oldComponentExists ? oldComponent.action : noop;
            }

            customActions = newComponent.customActions;
            if (isObject(customActions)) {
                keys = Object.keys(customActions);
                currKey = keys.length;
                while (currKey-- > 0) {
                    key = keys[currKey];
                    (<any>this)[key] = customActions[key];
                }
            }
        }

        /**
         * @name _executeAction
         * @memberof platui.Navbar
         * @kind function
         * @access protected
         *
         * @description
         * Executes the proper action associated with a {@link platui.Navbar|Navbar} component.
         *
         * @param {plat.ui.IGestureEvent} ev The executed event.
         * @param {string} position The part of the {@link platui.Navbar|Navbar} whose action is being executed.
         * @param {any} property? The indexing property. Will by default be an index into the component Array.
         *
         * @returns {void}
         */
        protected _executeAction(ev: plat.ui.IGestureEvent, position: string, property?: any): void {
            let utils = this.utils,
                component: INavbarComponent = this.context[position];

            if (utils.isArray(component) && !utils.isNull(property)) {
                component = (<any>component)[property];
            }

            if (utils.isFunction(component.action)) {
                component.action(ev);
                return;
            }

            this._log.debug(`An action function is not defined for the component ${component}.`)
        }
    }

    plat.register.control(__Navbar, Navbar, null, true);

    /**
     * @name INavbarOptions
     * @memberof platui
     * @kind interface
     *
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Navbar|Navbar} control.
     */
    export interface INavbarOptions {
        /**
         * @name position
         * @memberof platui.INavbarOptions
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The position of the {@link platui.Navbar|Navbar}.
         * The default value is "top".
         *
         * @remarks
         * - "top"
         * - "bottom"
         */
        position?: string;
    }

    /**
     * @name INavbarComponent
     * @memberof platui
     * @kind interface
     *
     * @description
     * Defines the available bindings for a single component of the {@link platui.Navbar|Navbar} control.
     */
    export interface INavbarComponent {
        /**
         * @name content
         * @memberof platui.INavbarComponent
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The content contained inside the component.
         *
         * @remarks
         * Can be html.
         */
        content?: string;

        /**
         * @name action
         * @memberof platui.INavbarComponent
         * @kind property
         * @access public
         *
         * @type {(ev?: plat.ui.IGestureEvent) => any}
         *
         * @description
         * The action to perform when the component is tapped.
         */
        action?: (ev?: plat.ui.IGestureEvent) => any;

        /**
         * @name customActions
         * @memberof platui.INavbarComponent
         * @kind property
         * @access public
         *
         * @type {() => any}
         *
         * @description
         * The set of custom actions whose key will be used as the function name and
         * whose value is the action to perform.
         *
         * @remarks
         * Useful when overriding component templates in the innerTemplate of the {@link platui.Navbar|Navbar}
         * or setting custom events in your html.
         * e.g.
         * navbar.setCenter({
         *  content: '<plat-input plat-keyup="onKeyUp"></plat-input>',
         *  customActions: {
         *      onKeyUp: (ev: KeyboardEvent) => {
         *          // handle event
         *      }
         *  }
         * });
         */
        customActions?: plat.IObject<() => any>;
    }

    export interface INavbarProperties<T> {
        [x: string]: T;

        /**
         * @name left
         * @memberof platui.INavbarContext
         * @kind property
         * @access public
         *
         * @type {T}
         *
         * @description
         * An association to the left part of the {@link platui.Navbar|Navbar} control.
         */
        left: T;

        /**
         * @name center
         * @memberof platui.INavbarContext
         * @kind property
         * @access public
         *
         * @type {T}
         *
         * @description
         * An association to the center part of the {@link platui.Navbar|Navbar} control.
         */
        center: T;

        /**
         * @name right
         * @memberof platui.INavbarContext
         * @kind property
         * @access public
         *
         * @type {T}
         *
         * @description
         * An association to the right part of the {@link platui.Navbar|Navbar} control.
         */
        right: T;
    }

    /**
     * @name INavbarContext
     * @memberof platui
     * @kind interface
     *
     * @extends {platui.INavbarProperties<platui.INavbarComponent|Array<platui.INavbarComponent>>}
     *
     * @description
     * Defines the context type for the {@link platui.Navbar|Navbar} control.
     */
    export interface INavbarContext extends INavbarProperties<INavbarComponent|Array<INavbarComponent>> { }
}
