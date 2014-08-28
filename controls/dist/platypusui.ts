/* tslint:disable */
/**
 * Copyright 2014 Platypi, LLC. All rights reserved. 
 * 
 * PlatypusUI is licensed under the GPL-3.0 found at  
 * http://opensource.org/licenses/GPL-3.0 
 * 
 */
module platui {
    /* tslint:disable:no-unused-variable */
        /*
         * Injectables
         */
    var __Promise = '$Promise',
        __Compat = '$Compat',
        __Document = '$Document',
        __ExceptionStatic = '$ExceptionStatic',
        __Utils = '$Utils',
        __Animator = '$Animator',
    
        /**
         * Controls
         */
        __Plat = 'plat-',
        __Button = __Plat + 'button',
        __Checkbox = __Plat + 'checkbox',
        __Drawer = __Plat + 'drawer',
        __DrawerController = __Plat + 'drawer-controller',
        __Modal = __Plat + 'modal',
        __ProgressBar = __Plat + 'progress',
        __ProgressRing = __Plat + 'ring',
        __Radio = __Plat + 'radio',
        __Toggle = __Plat + 'toggle',
        __Range = __Plat + 'range',
        __Select = __Plat + 'select',
        __Input = __Plat + 'input',
    
        /**
         * Referenced Controls / Vars
         */
        __Checked = __Plat + 'checked',
        __CamelChecked = 'platChecked',
        __Context = __Plat + 'context',
        __Bind = __Plat + 'bind',
    
        /**
         * Animations
         */
        __Transition = __Plat + 'transition',
    
        /**
         * Events
         */
        __$tap = '$tap',
        __$touchstart = '$touchstart',
        __$touchend = '$touchend',
        __$swipe = '$swipe',
        __$track = '$track',
        __$trackend = '$trackend',
        __ButtonPrefix = '__plat-button-',
        __RadioPrefix = '__plat-radio-',
        __DrawerControllerInitEvent = '__platDrawerControllerInit',
        __DrawerControllerFetchEvent = '__platDrawerControllerFetch',
        __DrawerFoundEvent = '__platDrawerFound';
    /* tslint:enable:no-unused-variable */
    
    /**
     * An interface a control should implement if they plan on using 
     * class based CSS to style the UI.
     */
    export interface IUIControl {
        /**
         * Sets the classes on the proper elements.
         * 
         * @param {any} classNames? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(classNames?: any, element?: Element): void;
    }

    /**
     * A Template Control for standardizing an HTML5 button.
     */
    export class Button extends plat.ui.BindablePropertyControl implements IUIControl {
        $document: Document = plat.acquire(__Document);

        /**
         * The element to replace the button control with.
         */
        replaceWith = 'button';

        /**
         * The plat-options for the Button.
         */
        options: plat.observable.IObservableProperty<IButtonOptions>;

        /**
         * The radio groups name if a radio group is present.
         */
        groupName = '';

        /**
         * Boolean value showing the selected state of this Button.
         */
        _isSelected: boolean;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the button element.
         * @param {string} element? The element to set the class on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Button);
            dom.addClass(element, className);
        }
        
        /**
         * Adds a listener for the tap event and checks for a 
         * radio group.
         */
        initialize(): void {
            var element = this.element;

            if (element.hasAttribute('name')) {
                this._addEventListeners(element.getAttribute('name'));
            } else if (element.hasAttribute(__Bind)) {
                this._addEventListeners(element.getAttribute(__Bind));
            } else if (element.hasAttribute('data-' + __Bind)) {
                this._addEventListeners(element.getAttribute('data-' + __Bind));
            }

            this.setClasses();
        }

        /**
         * Wrap all inner text nodes in spans.
         */
        setTemplate(): void {
            var $document = this.$document,
                element = this.element,
                childNodes = Array.prototype.slice.call(element.childNodes),
                childNode: Node,
                span: HTMLSpanElement,
                match: Array<string>;

            if (childNodes.length === 0) {
                span = $document.createElement('span');
                element.insertBefore(span, null);
                return;
            }

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (match !== null && match.length > 0) {
                        span = $document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                } else {
                    element.insertBefore(childNode, null);
                }
            }
        }

        /**
         * Determine the button type and apply the proper classes.
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IButtonOptions>>{},
                options = optionObj.value || <IButtonOptions>{},
                type = options.type || 'primary';

            this.dom.addClass(this.element, type);
        }

        /**
         * Add event listeners for selection.
         */
        _addEventListeners(name: string): void {
            var element = this.element,
                dom = this.dom;

            this.groupName = name;
            this._isSelected = false;
            this.addEventListener(element, __$tap, this._onTap, false);
            this.on(__ButtonPrefix + name, () => {
                if (this._isSelected) {
                    dom.removeClass(element, 'selected');
                    this._isSelected = false;
                }
            });
        }

        /**
         * Place the pushed button in a selected state.
         */
        _onTap(): void {
            if (this._isSelected) {
                return;
            }

            var element = this.element;
            this.dom.addClass(element, 'selected');
            this.dispatchEvent(__ButtonPrefix + this.groupName, plat.events.EventManager.DIRECT);
            this._isSelected = true;
            this.propertyChanged(element.textContent);
        }
    }

    plat.register.control(__Button, Button);

    /**
     * An interface defining the plat-options for the Button control.
     */
    export interface IButtonOptions {
        /**
         * The type of Button.
         */
        type: string;
    }

    /**
     * A Template Control simulating a toggle switch.
     */
    export class Toggle extends plat.ui.BindablePropertyControl implements IUIControl {
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * The Toggle's template string.
         */
        templateString =
        '<div class="plat-toggle-container">' +
            '<div class="knob"></div>' +
        '</div>';

        /**
         * A boolean value indicating whether the control is actively selected.
         */
        isActive = false;

        /**
         * The type of the control's activated element.
         */
        _targetType = 'slide';

        /**
         * The element used to create the targeted effect.
         */
        _targetElement: Element;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Toggle);
            dom.addClass(element, className);
        }

        /**
         * Set the plat-toggle class name.
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * Adds a listener for the tap event.
         */
        setTemplate(): void {
            var element = this.element;
            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
        }

        /**
         * The function called when the bindable property is set externally.
         * 
         * @param newValue The new value of the bindable property.
         * @param oldValue The old value of the bindable property.
         * @param setProperty A boolean value indicating whether we should set 
         * the property if we need to toggle the check mark value.
         */
        setProperty(newValue: any, oldValue?: any, setProperty?: boolean): void {
            if (newValue === oldValue) {
                return;
            }

            var isActive = !!newValue;
            if (isActive === this.isActive) {
                return;
            }

            this._toggle(setProperty);
        }

        /**
         * The callback for a tap event.
         * 
         * @param ev The tap event object.
         */
        _onTap(ev: plat.ui.IGestureEvent): void {
            var domEvent = plat.acquire(plat.ui.IDomEventInstance);

            this._toggle(true);

            domEvent.initialize(this.element, 'change');
            domEvent.trigger();
        }

        /**
         * Toggles the mark and updates the bindable property if needed.
         * 
         * @param setProperty A boolean value stating whether the bindable 
         * property should be updated.
         */
        _toggle(setProperty?: boolean): void {
            var wasActive = this.isActive,
                isActive = !wasActive;

            this._activate(this._targetElement);
            this.isActive = (<HTMLInputElement>this.element).checked = isActive;
            if (setProperty === true) {
                this.propertyChanged(isActive, wasActive);
            }
        }

        /**
         * A function to activate the given element.
         */
        _activate(element: Element): void {
            this.dom.toggleClass(element, this._targetType);
        }
    }

    plat.register.control(__Toggle, Toggle);

    /**
     * A Template Control that standardizes the HTML5 checkbox.
     */
    export class Checkbox extends Toggle {
        $document: Document = plat.acquire(__Document);

        /**
         * The Checkbox's template string.
         */
        templateString =
        '<div class="plat-checkbox-container">' +
            '<span class="mark"></span>' +
        '</div>';

        /**
         * The plat-options for this control.
         */
        options: plat.observable.IObservableProperty<ICheckboxOptions>;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Checkbox);
            dom.addClass(element, className);
        }

        /**
         * Initializes the mark and adds a listener for the tap event.
         */
        initialize(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<ICheckboxOptions>>{},
                options = optionObj.value || <ICheckboxOptions>{},
                mark = this._targetType = options.mark || 'check',
                type = options.type || 'primary';

            switch (mark.toLowerCase()) {
                case 'check':
                case 'x':
                    break;
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    Exception.warn('Invalid mark option specified for' + __Checkbox + '. Defaulting to checkmark.');
                    break;
            }

            this.setClasses(type);
        }

        /**
         * Adds the inner template to the DOM making sure to wrap text nodes in spans.
         */
        setTemplate(): void {
            super.setTemplate();

            var isNull = this.$utils.isNull,
                innerTemplate = this.innerTemplate;

            if (isNull(innerTemplate)) {
                return;
            }

            var $document = this.$document,
                element = this.element,
                childNodes = Array.prototype.slice.call(innerTemplate.childNodes),
                childNode: Node,
                span: HTMLSpanElement,
                match: Array<string>;

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (match !== null && match.length > 0) {
                        span = $document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                } else {
                    element.insertBefore(childNode, null);
                }
            }
        }

        /**
         * Checks for checked attributes and handles them accordingly.
         */
        loaded(): void {
            var element = this.element;
            if (element.hasAttribute('checked') || element.hasAttribute('data-checked')) {
                this._convertAttribute(true);
            } else if (element.hasAttribute(__Checked)) {
                this._convertAttribute(element.getAttribute(__Checked));
                this.attributes.observe(__CamelChecked, this._convertAttribute);
            } else if (element.hasAttribute('data-' + __Checked)) {
                this._convertAttribute(element.getAttribute('data-' + __Checked));
                this.attributes.observe(__CamelChecked, this._convertAttribute);
            }
        }

        /**
         * A function for handling the attribute value conversion for updating the 
         * bound property.
         * 
         * @param newValue The newValue of the attribute to convert.
         * @param oldValue The oldValue of the attribute to convert.
         */
        _convertAttribute(newValue: any, oldValue?: any): void {
            var $utils = this.$utils;
            if ($utils.isBoolean(newValue)) {
                return this.setProperty(newValue, oldValue, true);
            } else if (!$utils.isString(newValue)) {
                return;
            }

            this.setProperty(newValue === 'true', oldValue === 'true', true);
        }
    }

    plat.register.control(__Checkbox, Checkbox);

    /**
     * The plat-options interface for the Checkbox control.
     */
    export interface ICheckboxOptions {
        /**
         * The type of mark to place in the checkbox.
         */
        mark: string;

        /**
         * The type of checkbox (i.e. - primary, secondary, etc).
         */
        type: string;
    }

    /**
     * A Template Control that standardizes the HTML5 radio button.
     */
    export class Radio extends Checkbox {
        /**
         * The Radio's template string.
         */
        templateString =
        '<div class="plat-radio-container">' +
            '<div class="mark"></div>' +
        '</div>';

        /**
         * The radio groups name if a radio group is present.
         */
        groupName = '';
        
        /**
         * The check type to be placed in the element.
         */
        _targetType = 'radio';

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Radio);
            dom.addClass(element, className);
        }

        /**
         * Adds a listener for the tap event and checks for a 
         * radio group.
         */
        initialize(): void {
            var element = this.element;

            if (element.hasAttribute('name')) {
                this.groupName = element.getAttribute('name');
            } else if (element.hasAttribute(__Bind)) {
                this.groupName = element.getAttribute(__Bind);
            } else if (element.hasAttribute('data-' + __Bind)) {
                this.groupName = element.getAttribute('data-' + __Bind);
            }

            this.setClasses();
        }
        
        /**
         * The function called when the bindable property is set externally.
         * 
         * @param newValue The new value of the bindable property.
         * @param oldValue The old value of the bindable property.
         * @param setProperty A boolean value indicating whether we should set 
         * the property if we need to toggle the check mark value.
         */
        setProperty(newValue: any, oldValue?: any, setProperty?: boolean): void {
            if (newValue === oldValue) {
                return;
            }

            var isChecked = newValue === this._getValue(),
                wasChecked = this.isActive;

            if (isChecked === wasChecked) {
                return;
            }

            this._toggle(setProperty);
        }

        /**
         * Checks if the radio has been selected and only notifies of a bindable 
         * property changed if it has.
         * 
         * @param newValue The new value of the property after the change.
         * @param oldValue The old value of the property prior to the change.
         */
        propertyChanged(newValue: any, oldValue?: any): void {
            if (this.isActive) {
                super.propertyChanged(this._getValue());
            }
        }

        /**
         * The callback for a tap event. Only fires the event if the radio 
         * has been selected.
         * 
         * @param ev The tap event object.
         */
        _onTap(ev: plat.ui.IGestureEvent): void {
            if (this.isActive) {
                return;
            }

            super._onTap(ev);
        }

        /**
         * Toggles the mark and updates the bindable property if needed.
         * 
         * @param setProperty A boolean value stating whether the bindable 
         * property should be updated.
         */
        _toggle(setProperty?: boolean): void {
            super._toggle(setProperty);
            if (this.isActive) {
                var name = this.groupName;
                this.dispatchEvent(__RadioPrefix + name, plat.events.EventManager.DIRECT);
                var remover = this.on(__RadioPrefix + name, () => {
                    this._toggle();
                    remover();
                });
            }
        }

        /**
         * A function for handling the attribute value conversion for updating the 
         * bound property.
         * 
         * @param newValue The newValue of the attribute to convert.
         * @param oldValue The oldValue of the attribute to convert.
         */
        _convertAttribute(newValue: any, oldValue?: any): void {
            var $utils = this.$utils;
            if ($utils.isBoolean(newValue)) {
                if (newValue) {
                    this.setProperty(this._getValue(), null, true);
                }
                return;
            } else if (!$utils.isString(newValue)) {
                return;
            }

            if (newValue === 'true') {
                this.setProperty(this._getValue(), null, true);
            }
        }

        /**
         * Grabs the value of this radio buttons bindable property. It first checks for 
         * the "value" attribute, and defaults to the elements textContent if it's unavailable.
         */
        _getValue(): string {
            var element = this.element;
            return element.hasAttribute('value') ? element.getAttribute('value') : element.textContent;
        }
    }

    plat.register.control(__Radio, Radio);

    /**
     * A Template Control for showing indeterminate progress.
     */
    export class ProgressRing extends plat.ui.TemplateControl {
        /**
         * The ProgressRing's template string.
         */
        templateString =
        '<div class="plat-progress-container">' +
            '<div class="ring"></div>' +
        '</div>';

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __ProgressRing);
            dom.addClass(element, className);
        }

        /**
         * Set the class name
         */
        initialize(): void {
            this.setClasses();
        }
    }

    plat.register.control(__ProgressRing, ProgressRing);

    /**
     * A Template Control for showing incremental progress.
     */
    export class ProgressBar extends plat.ui.BindablePropertyControl {
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * The ProgressBar's template string.
         */
        templateString =
        '<div class="plat-progress-container">' +
            '<div class="bar"></div>' +
        '</div>';

        /**
         * The animated bar element.
         */
        _barElement: HTMLElement;

        /**
         * The max value of the bar.
         */
        _barMax: number;

        private __usingPlatBind = false;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __ProgressBar);
            dom.addClass(element, className);
        }

        /**
         * Set the class name
         */
        initialize(): void {
            this.setClasses(__ProgressBar);
        }

        /**
         * Grabs the bar element and bar max value.
         */
        setTemplate(): void {
            this._barElement = <HTMLElement>this.element.firstElementChild.firstElementChild;
        }

        /**
         * Checks to make sure the context is correctly set or a plat-bind is being used, 
         * then does the initial animation of the bar.
         */
        loaded(): void {
            var context = this.context,
                element = this.element,
                usingPlatBind = this.__usingPlatBind = element.hasAttribute(__Bind) || element.hasAttribute('data-' + __Bind);

            this._barMax = this._barMax || this._barElement.parentElement.offsetWidth;

            if ((!this.$utils.isNumber(context) || context > 1 || context < 0) && !usingPlatBind) {
                var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                Exception.warn('The context of a "' + __ProgressBar + '" control must be a number between 0 and 1, ' +
                    'or a "' + __Bind + '" control must be used.');
                return;
            } else if (usingPlatBind) {
                return;
            }

            this.setProgress();
        }

        /**
         * Animates the bar on a context changed.
         */
        contextChanged(): void {
            if (this.__usingPlatBind) {
                return;
            }

            this.setProgress();
        }

        /**
         * The function called when the bindable property is set externally.
         * 
         * @param newValue The new value of the bindable property.
         * @param oldValue The old value of the bindable property.
         * @param setProperty A boolean value indicating whether we should set 
         * the property if we need to toggle the check mark value.
         */
        setProperty(newValue: any, oldValue?: any, setProperty?: boolean): void {
            if (newValue === oldValue) {
                return;
            }

            this.setProgress(newValue);
        }

        /**
         * Sets the progress bar value.
         */
        setProgress(value?: boolean): void {
            var barValue = value || this.context,
                barMax = this._barMax || (this._barMax = this._barElement.parentElement.offsetWidth);

            if (!this.$utils.isNumber(barValue) || barValue > 1 || barValue < 0) {
                return;
            }

            this._barElement.style.width = Math.ceil(barMax * barValue) + 'px';
        }
    }

    plat.register.control(__ProgressBar, ProgressBar);

    /**
     * A Template Control that acts as a global drawer.
     */
    export class Drawer extends plat.ui.TemplateControl implements IUIControl {
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * The plat-options for the Drawer.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;

        private __currentTransition: string;
        private __useContext: boolean;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Drawer);
            dom.addClass(element, className);
        }

        /**
         * Set the class name
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * Check for a transition direction and initialize event handling.
         */
        loaded(): void {
            var element = this.element,
                $utils = this.$utils,
                optionObj = this.options || <plat.observable.IObservableProperty<IDrawerOptions>>{},
                options = optionObj.value || <IDrawerOptions>{},
                transition = this.__currentTransition = options.transition || 'right',
                useContext = this.__useContext =
                    (options.useContext === true) ||
                    element.hasAttribute(__Context) ||
                    element.hasAttribute('data-' + __Context),
                id = options.id,
                templateUrl = options.templateUrl,
                isElastic = options.elastic === true;

            this.dom.addClass(element, transition);
            if ($utils.isString(templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, templateUrl).then((template) => {
                    this.innerTemplate = template;
                    if (this.__useContext) {
                        this.bindableTemplates.add('drawer', template.cloneNode(true));
                        this.__bindTemplate();
                    }
                    this.__initializeEvents(id, transition, isElastic);
                });
                return;
            } else if (useContext && $utils.isNode(this.innerTemplate)) {
                this.bindableTemplates.add('drawer', this.innerTemplate.cloneNode(true));
                this.__bindTemplate();
            }

            this.__initializeEvents(id, transition, isElastic);
        }

        /**
         * Removes the innerHTML from the DOM and saves it.
         */
        setTemplate(): void {
            var childNodes = Array.prototype.slice.call(this.element.childNodes);
            if (childNodes.length > 0) {
                this.innerTemplate = this.dom.appendChildren(childNodes);
            }
        }

        /**
         * Changes the placement and implied transition direction of the drawer.
         */
        _changeDirection(transition: string): void {
            if (this.$utils.isNull(transition) || transition === this.__currentTransition) {
                return;
            }

            var dom = this.dom,
                element = this.element;

            dom.removeClass(element, this.__currentTransition);
            dom.addClass(element, transition);

            this.__currentTransition = transition;
        }

        private __initializeEvents(id: string, transition: string, isElastic: boolean): void {
            var $utils = this.$utils,
                element = this.element,
                isString = $utils.isString,
                innerTemplate = this.innerTemplate,
                useContext = this.__useContext,
                DIRECT = plat.events.EventManager.DIRECT;

            this.on(__DrawerControllerFetchEvent,
                (event: plat.events.IDispatchEventInstance, controllerArg: IDrawerHandshakeEvent) => {
                if (isString(id) && isString(controllerArg.id) && id !== controllerArg.id) {
                    return;
                } else if (isString(controllerArg.transition)) {
                    transition = controllerArg.transition;
                    this._changeDirection(transition);
                }

                this.dispatchEvent(__DrawerFoundEvent, DIRECT, {
                    id: id,
                    transition: transition,
                    element: element,
                    useContext: useContext,
                    template: $utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                    elastic: isElastic
                });
            });

            this.dispatchEvent(__DrawerFoundEvent, DIRECT, {
                id: id,
                transition: transition,
                element: element,
                useContext: useContext,
                template: $utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                elastic: isElastic
            });
        }

        private __bindTemplate(): void {
            this.bindableTemplates.bind('drawer').then((template) => {
                this.element.appendChild(template);
            });
        }
    }

    plat.register.control(__Drawer, Drawer);

    /**
     * A Template Control that manipulates and controls a global drawer.
     */
    export class DrawerController extends plat.ui.TemplateControl {
        $utils: plat.IUtils = plat.acquire(__Utils);
        $compat: plat.ICompat = plat.acquire(__Compat);
        $document: Document = plat.acquire(__Document);
        $animator: plat.ui.IAnimator = plat.acquire(__Animator);

        /**
         * The plat-options for the DrawerController.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;

        /**
         * The transition direction of control for this DrawerController.
         */
        _transition: string;

        /**
         * The DrawerController's corresponding Drawer element.
         */
        _drawerElement: HTMLElement;

        /**
         * The CSS3 transform property.
         */
        _transform: string;

        /**
         * The last touch start recorded.
         */
        _lastTouch: plat.ui.IPoint;

        private __hasSwiped = false;
        private __isOpen = false;
        private __isElastic: boolean;
        private __inTouch: boolean;
        private __useContext: boolean;
        private __maxOffset: number;
        private __removeTap: plat.IRemoveListener;
        private __removeSwipeOpen: plat.IRemoveListener;
        private __removeSwipeClose: plat.IRemoveListener;
        private __removePrimaryTrack: plat.IRemoveListener;
        private __removeSecondaryTrack: plat.IRemoveListener;
        private __rootElement: HTMLElement;
        private __type: string;
        private __templateUrl: string;
        private __transitionHash: plat.IObject<string> = {
            right: 'left',
            left: 'right',
            up: 'down',
            down: 'up'
        };

        /**
         * Initialize the track events on the element.
         */
        loaded(): void {
            var element = this.element,
                optionObj = this.options || <plat.observable.IObservableProperty<IDrawerOptions>>{},
                options = optionObj.value || <IDrawerOptions>{},
                transition = options.transition,
                id = options.id;

            this.__type = options.type;
            this.__isElastic = options.elastic === true;
            this.__useContext = options.useContext === true;
            this.__templateUrl = options.templateUrl;
            this.__initializeEvents(id, transition);
        }

        /**
         * Remove the transition classes off the root element.
         */
        dispose(): void {
            var dom = this.dom,
                rootElement = this.__rootElement;
            dom.removeClass(rootElement, 'plat-drawer-transition-prep');
            dom.removeClass(rootElement, 'plat-drawer-transition-' + this._transition);
        }

        /**
         * Opens the drawer.
         */
        open(): void {
            var elementToMove = this.__rootElement,
                isNode = this.$utils.isNode;

            if (!isNode(elementToMove) || !isNode(this._drawerElement)) {
                return;
            }

            var translation: string;
            switch (this._transition) {
                case 'up':
                    translation = 'translate3d(0,' + (-this.__maxOffset) + 'px,0)';
                    break;
                case 'down':
                    translation = 'translate3d(0,' + this.__maxOffset + 'px,0)';
                    break;
                case 'left':
                    translation = 'translate3d(' + (-this.__maxOffset) + 'px,0,0)';
                    break;
                case 'right':
                    translation = 'translate3d(' + this.__maxOffset + 'px,0,0)';
                    break;
                default:
                    return;
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = translation;
            this.$animator.animate(elementToMove, __Transition, animationOptions);
            this.__isOpen = true;
        }

        /**
         * Closes the drawer.
         */
        close(): void {
            var elementToMove = this.__rootElement,
                drawerElement = this._drawerElement,
                isNode = this.$utils.isNode;

            if (!isNode(elementToMove) || !isNode(drawerElement)) {
                return;
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = 'translate3d(0,0,0)';
            this.$animator.animate(elementToMove, __Transition, animationOptions);
            this.__isOpen = false;
        }

        /**
         * Toggles the drawer's open/closed state.
         */
        toggle(): void {
            if (this.__isOpen) {
                this.close();
                return;
            }

            this.open();
        }

        /**
         * Resets the drawer to it's current open/closed state.
         */
        reset(): void {
            if (this.__isOpen) {
                this.open();
                return;
            }

            this.close();
        }

        /**
         * Indicates whether the drawer is currently open.
         */
        isOpen(): boolean {
            return this.__isOpen;
        }

        /**
         * Adds swipe events to the controller element.
         * 
         * @param transition The transition direction of opening for the drawer.
         */
        _addSwipeEvents(transition: string): void {
            var openEvent = __$swipe + transition,
                closeEvent = __$swipe + this.__transitionHash[transition],
                element = this.element;

            this.__removeSwipeOpen = this.addEventListener(element, openEvent, () => {
                this.__hasSwiped = true;
                this.open();
            }, false);

            this.__removeSwipeClose = this.addEventListener(element, closeEvent, () => {
                this.__hasSwiped = true;
                this.close();
            }, false);
        }

        /**
         * Adds primary and secondary tracking events to the controller element.
         * 
         * @param transition The transition direction of opening for the drawer.
         */
        _addEventListeners(transition: string): void {
            var element = this.element,
                isNull = this.$utils.isNull,
                type = this.__type,
                tapOnly = type === 'tap';

            this._transition = transition;

            // remove event listeners first in case we want to later be able to dynamically change transition direction of drawer.
            this._removeEventListeners();
            if (isNull(type) || tapOnly) {
                this.__removeTap = this.addEventListener(element, __$tap, this.toggle, false);
                if (tapOnly) {
                    return;
                }
            }

            var primaryTrack = __$track + transition,
                secondaryTrack = __$track + this.__transitionHash[transition],
                trackFn = this._track;

            this.__removePrimaryTrack = this.addEventListener(element, primaryTrack, trackFn, false);
            this.__removeSecondaryTrack = this.addEventListener(element, secondaryTrack, trackFn, false);
            this._addSwipeEvents(transition);

            if (isNull(this._lastTouch)) {
                var touchEnd = this._touchEnd;

                this._lastTouch = { x: 0, y: 0 };
                this.addEventListener(element, __$touchstart, this._touchStart, false);
                this.addEventListener(element, __$touchend, touchEnd, false);
                this.addEventListener(element, __$trackend, touchEnd, false);
            }
        }

        /**
         * Removes all event listeners.
         */
        _removeEventListeners(): void {
            var isFunction = this.$utils.isFunction;
            if (isFunction(this.__removeTap)) {
                this.__removeTap();
                this.__removeTap = null;
            }

            if (isFunction(this.__removePrimaryTrack)) {
                this.__removePrimaryTrack();
                this.__removePrimaryTrack = null;
            }

            if (isFunction(this.__removeSecondaryTrack)) {
                this.__removeSecondaryTrack();
                this.__removeSecondaryTrack = null;
            }

            if (isFunction(this.__removeSwipeOpen)) {
                this.__removeSwipeOpen();
                this.__removeSwipeOpen = null;
            }

            if (isFunction(this.__removeSwipeClose)) {
                this.__removeSwipeClose();
                this.__removeSwipeClose = null;
            }
        }

        /**
         * Log when the user touches the drawer controller.
         * 
         * @param ev The touch event.
         */
        _touchStart(ev: plat.ui.IGestureEvent): void {
            this.__inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        }

        /**
         * The $touchend and $trackend event handler.
         * 
         * @param ev The touch event.
         */
        _touchEnd(ev: plat.ui.IGestureEvent): void {
            var inTouch = this.__inTouch;
            this.__inTouch = false;
            if (!inTouch || this.__hasSwiped) {
                this.__hasSwiped = false;
                return;
            } else if (ev.type === __$touchend && this.__type !== 'slide') {
                return;
            }

            var drawerElement = this._drawerElement,
                distanceMoved: number;
            switch (this._transition) {
                case 'up':
                case 'down':
                    distanceMoved = ev.clientY - this._lastTouch.y;
                    break;
                case 'left':
                case 'right':
                    distanceMoved = ev.clientX - this._lastTouch.x;
                    break;
                default:
                    return;
            }

            if (Math.abs(distanceMoved) > Math.ceil(this.__maxOffset / 2)) {
                this.toggle();
                return;
            }

            this.reset();
        }

        /**
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions  
         * depending on the defined 'transition' direction.
         * 
         * @param ev The $tracking event.
         */
        _track(ev: plat.ui.IGestureEvent): void {
            this.__rootElement.style[<any>this._transform] = this.__calculateTranslation(ev);
        }

        private __calculateTranslation(ev: plat.ui.IGestureEvent): string {
            var distanceMoved: number;
            switch (this._transition) {
                case 'up':
                    distanceMoved = this.__isOpen ?
                    this.__checkElasticity((-this.__maxOffset) + ev.clientY - this._lastTouch.y) :
                    this.__checkElasticity(ev.clientY - this._lastTouch.y);
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'down':
                    distanceMoved = this.__isOpen ?
                    this.__checkElasticity(this.__maxOffset + ev.clientY - this._lastTouch.y) :
                    this.__checkElasticity(ev.clientY - this._lastTouch.y);
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'left':
                    distanceMoved = this.__isOpen ?
                    this.__checkElasticity((-this.__maxOffset) + ev.clientX - this._lastTouch.x) :
                    this.__checkElasticity(ev.clientX - this._lastTouch.x);
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                case 'right':
                    distanceMoved = this.__isOpen ?
                    this.__checkElasticity(this.__maxOffset + ev.clientX - this._lastTouch.x) :
                    this.__checkElasticity(ev.clientX - this._lastTouch.x);
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                default:
                    return 'translate3d(0,0,0)';
            }
        }

        private __checkElasticity(distanceMoved: number): number {
            if (this.__isElastic) {
                return distanceMoved;
            }

            if (distanceMoved < 0) {
                distanceMoved = 0;
            } else if (distanceMoved > this.__maxOffset) {
                distanceMoved = this.__maxOffset;
            }

            return distanceMoved;
        }

        private __initializeEvents(id: string, transition: string): void {
            var element = this.element,
                $utils = this.$utils,
                isString = $utils.isString,
                needsDirection = !isString(transition);

            this.__setTransform();

            var eventRemover = this.on(__DrawerFoundEvent,
                (event: plat.events.IDispatchEventInstance, drawerArg: IDrawerHandshakeEvent) => {
                if (isString(id) && isString(drawerArg.id) && id !== drawerArg.id) {
                    return;
                }

                eventRemover();

                this._drawerElement = drawerArg.element;

                if (needsDirection) {
                    if (isString(drawerArg.transition)) {
                        transition = drawerArg.transition;
                    } else {
                        var Exception = plat.acquire(plat.IExceptionStatic);
                        Exception.warn('Transition direction is incorrectly defined for "' +
                            __Drawer + '" or "' + __DrawerController + '."' +
                            ' Please ensure it is a string.');
                        return;
                    }
                }

                if (!this.__controllerIsValid(transition)) {
                    return;
                }

                this._addEventListeners(transition.toLowerCase());
                this.__setOffset();

                if ($utils.isUndefined(this.__isElastic)) {
                    this.__isElastic = drawerArg.elastic === true;
                }

                if (!this.__useContext && drawerArg.useContext === true) {
                    return;
                }

                this.__determineTemplate(drawerArg.template);
            });

            this.dispatchEvent(__DrawerControllerFetchEvent, plat.events.EventManager.DIRECT, {
                id: id,
                transition: transition
            });
        }

        private __determineTemplate(fragment?: Node): void {
            var $utils = this.$utils;

            if ($utils.isString(this.__templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, this.__templateUrl).then((template) => {
                    this.bindableTemplates.add('drawer', template);
                    this.__bindTemplate();
                });
            } else if ($utils.isNode(fragment)) {
                this.bindableTemplates.add('drawer', fragment);
                this.__bindTemplate();
            }
        }

        private __bindTemplate(): void {
            var drawerElement = this._drawerElement;
            this.bindableTemplates.bind('drawer').then((template) => {
                this.dom.clearNode(drawerElement);
                drawerElement.appendChild(template);
            });
        }

        private __setTransform(): void {
            var style = this.element.style,
                isUndefined = this.$utils.isUndefined;

            if (isUndefined(style.transform)) {
                var vendorPrefix = this.$compat.vendorPrefix;
                if (!isUndefined(style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                    this._transform = vendorPrefix.lowerCase + 'Transform';
                    return;
                } else if (!isUndefined(style[<any>(vendorPrefix.js + 'Transform')])) {
                    this._transform = vendorPrefix.lowerCase + 'Transform';
                    return;
                }
            }

            this._transform = 'transform';
        }

        private __controllerIsValid(transition: string): boolean {
            var isNull = this.$utils.isNull,
                Exception: plat.IExceptionStatic;

            if (isNull(this.__transitionHash[transition])) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Incorrect transition direction: "' + transition +
                    '" defined for "' + __Drawer + '" or "' + __DrawerController + '."');
                return false;
            } else if (isNull(this._drawerElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Could not find a corresponding "' + __Drawer + '" for this "' + __DrawerController + '."');
                return false;
            }
            
            var rootElement = this.__rootElement = this.__getRootElement(this.root);
            if (isNull(rootElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Cannot have a "' + __DrawerController +
                    '" in a hierarchy above the corresponding "' + __Drawer + '."');
                    return false;
            }

            var dom = this.dom;
            dom.addClass(rootElement, 'plat-drawer-transition-prep');
            dom.addClass(rootElement, 'plat-drawer-transition-' + transition);

            return true;
        }

        private __getRootElement(root: plat.ui.ITemplateControl): HTMLElement {
            var $utils = this.$utils,
                isNode = $utils.isNode;
            if (!$utils.isObject(root)) {
                return null;
            }

            var element = root.element,
                drawer = this._drawerElement,
                parent: HTMLElement;
            while (isNode(element) && !((parent = element.parentElement).contains(drawer))) {
                element = parent;
            }

            return element;
        }

        private __setOffset(): void {
            switch (this._transition) {
                case 'up':
                case 'down':
                    this.__maxOffset = this._drawerElement.offsetHeight;
                    break;
                case 'left':
                case 'right':
                    this.__maxOffset = this._drawerElement.offsetWidth;
                    break;
            }
        }
    }

    plat.register.control(__DrawerController, DrawerController);

    /**
     * The drawer options capable of being placed on the 'plat-drawer' and/or the 
     * 'plat-drawer-controller' as 'plat-options.'
     */
    export interface IDrawerOptions {
        /**
         * The unique ID of the drawer / drawer-controller pair.
         */
        id?: string;

        /**
         * The transition direction of drawer opening.
         */
        transition?: string;

        /**
         * The url of the drawer's intended template.
         */
        templateUrl?: string;

        /**
         * A boolean value stating whether to use this context or not.
         */
        useContext?: boolean;

        /**
         * Whether the drawer has an elastic effect while sliding. 
         * Defaults to false.
         */
        elastic?: boolean;

        /**
         * An option for the drawer-controller specifying how the drawer should 
         * open.
         * 'tap': The drawer opens when the controller is tapped.
         * 'slide': The drawer opens when the controller is dragged.
         * default: The drawer opens either when the controller is tapped or the 
         * controller is slid.
         */
        type?: string;
    }

    /**
     * An interface for the drawer's event object used during the 
     * drawer / drawer-controller handshake.
     */
    interface IDrawerHandshakeEvent {
        /**
         * The unique ID of the drawer / drawer-controller pair.
         */
        id?: string;
        /**
         * The transition direction of drawer opening.
         */
        transition?: string;
        /**
         * The global drawer element.
         */
        element?: HTMLElement;
        /**
         * The intended template of the global drawer element.
         */
        template?: Node;
        /**
         * A boolean value stating whether to use this context or not.
         */
        useContext?: boolean;
        /**
         * Whether the drawer has an elastic effect while sliding. 
         * Defaults to false.
         */
        elastic?: boolean;
    }

    /**
     * A Template Control for showing a templated and animated overlay.
     */
    export class Modal extends plat.ui.TemplateControl implements IUIControl {
        $utils: plat.IUtils = plat.acquire(__Utils);
        $compat: plat.ICompat = plat.acquire(__Compat);

        /**
         * The Modal's template string.
         */
        templateString = '<div class="plat-modal-container"></div>';

        /**
         * The plat-options for the Modal.
         */
        options: plat.observable.IObservableProperty<IModalOptions>;

        private __modalElement: HTMLElement;
        private __isVisible = false;
        private __transitionEnd: string;
        private __transitionHash: plat.IObject<boolean> = {
            up: true,
            down: true,
            left: true,
            right: true,
            fade: true
        };

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Modal);
            dom.addClass(element, 'hide');
            dom.addClass(element, className);
        }

        /**
         * Check for templateUrl and set if needed. Hide the modal.
         */
        initialize(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IModalOptions>>{},
                options = optionObj.value || <IModalOptions>{};

            this.templateUrl = options.templateUrl;
            this.setClasses();
        }

        /**
         * Add the innerTemplate to the modal element.
         */
        setTemplate(): void {
            var modal = this.__modalElement = <HTMLElement>this.element.firstElementChild,
                innerTemplate = this.innerTemplate;
            if (this.$utils.isNode(innerTemplate)) {
                modal.appendChild(innerTemplate);
            }
        }

        /**
         * Check for a transition.
         */
        loaded(): void {
            var optionObj = this.options,
                $utils = this.$utils,
                dom = this.dom,
                modalElement = this.__modalElement,
                options = $utils.isObject(optionObj) ? optionObj.value : <IModalOptions>{},
                transition = options.transition;

            if (!this.$utils.isString(transition) || transition === 'none') {
                dom.addClass(modalElement, 'plat-no-transition');
                return;
            } else if ($utils.isNull(this.__transitionHash[transition])) {
                var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Custom transition direction: "' + transition +
                    '" defined for "' + __Modal + '." Please ensure a transition is defined to avoid errors.');
            }

            this.__transitionEnd = this.$compat.animationEvents.$transitionEnd;
            dom.addClass(modalElement, 'plat-modal-transition');
            dom.addClass(modalElement, transition);
        }

        /**
         * Shows the modal.
         */
        show(): void {
            var dom = this.dom;
            dom.removeClass(this.element, 'hide');
            this.$utils.postpone(() => {
                dom.addClass(this.__modalElement, 'activate');
            });

            this.__isVisible = true;
        }

        /**
         * Hides the modal.
         */
        hide(): void {
            var dom = this.dom;
            dom.removeClass(this.__modalElement, 'activate');
            if (this.$utils.isString(this.__transitionEnd)) {
                this._addHideOnTransitionEnd();
            } else {
                dom.addClass(this.element, 'hide');
            }

            this.__isVisible = false;
        }

        /**
         * Toggles the visibility of the modal.
         */
        toggle(): void {
            if (this.__isVisible) {
                this.hide();
                return;
            }

            this.show();
        }

        /**
         * Whether the modal is currently visible.
         */
        isVisible(): boolean {
            return this.__isVisible;
        }

        _addHideOnTransitionEnd(): void {
            var element = this.element,
                dom = this.dom,
                remove = this.addEventListener(element, this.__transitionEnd, () => {
                    remove();
                    dom.addClass(element, 'hide');
                }, false);
        }
    }

    plat.register.control(__Modal, Modal);

    /**
     * The modal options capable of being placed on the 'plat-modal' as 'plat-options.'
     */
    export interface IModalOptions {
        /**
         * The transition direction the modal will enter with.
         */
        transition: string;

        /**
         * The url of the modal's intended template.
         */
        templateUrl?: string;
    }

    /**
     * A Template Control that standardizes an HTML5 input[type="range"].
     */
    export class Range extends plat.ui.BindablePropertyControl implements IUIControl {
        $document: Document = plat.acquire(__Document);
        $utils: plat.IUtils = plat.acquire(__Utils);
        $animator: plat.ui.IAnimator = plat.acquire(__Animator);

        /**
         * The template string for the Range control.
         */
        templateString =
        '<div class="plat-range-container">' +
            '<div class="slider">' +
                '<div class="knob"></div>' +
            '</div>' +
        '</div>';

        /**
         * The plat-options for the Button.
         */
        options: plat.observable.IObservableProperty<IRangeOptions>;

        /**
         * The current value of the range.
         */
        value: number;

        /**
         * The min value of the range.
         */
        min: number;

        /**
         * The max value of the range.
         */
        max: number;

        /**
         * The HTMLElement representing the slider.
         */
        _sliderElement: HTMLElement;

        /**
         * The HTMLElement representing the knob.
         */
        _knobElement: HTMLElement;

        /**
         * The last touch start recorded.
         */
        _lastTouch: plat.ui.IPoint;

        private __sliderOffset = 0;
        private __maxOffset: number;
        private __increment: number;
        private __loaded = false;
        private __inTouch = false;
        private __usingBind: boolean;
        private __transition: string;
        private __lengthProperty: string;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Range);
            dom.addClass(element, className);
        }

        /**
         * Check if using context or using bind.
         */
        initialize(): void {
            var element = this.element;
            this.__usingBind = element.hasAttribute(__Bind) || element.hasAttribute('data-' + __Bind);
            this.setClasses();
        }

        /**
         * Grab the knob element.
         */
        setTemplate(): void {
            var slider = this._sliderElement = <HTMLElement>this.element.firstElementChild.firstElementChild;
            this._knobElement = <HTMLElement>slider.firstElementChild;
        }

        /**
         * Determine the button type and apply the proper classes.
         */
        loaded(): void {
            var dom = this.dom,
                element = this.element,
                $utils = this.$utils,
                isNumber = $utils.isNumber,
                optionObj = this.options || <plat.observable.IObservableProperty<IRangeOptions>>{},
                options = optionObj.value || <IRangeOptions>{},
                optionValue = Number(options.value),
                optionMin = options.min,
                optionMax = options.max,
                type = options.type || 'primary',
                transition = this.__transition = options.transition || 'right',
                length = this.__getLength(transition);

            dom.addClass(element, type);
            dom.addClass(element, transition);

            var bindValue = this.value,
                value = isNumber(bindValue) ? bindValue : isNumber(optionValue) ? optionValue : min,
                min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0,
                max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100;

            // reset value to minimum in case Bind set it to a value
            this.value = min;
            this.__maxOffset = length;

            if (min >= max) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + __Range + '\'s" min is greater than or equal to its max. Setting max to min + 1.');
                this.max = min + 1;
                return;
            }

            this.__increment = length / (max - min);
            this._initializeEvents(transition);
            this.setValue(value);
            this.__loaded = true;
        }

        /**
         * The function called when the Range's bindable property is set externally.
         * 
         * @param newValue The new value of the bindable property.
         * @param oldValue The old value of the bindable property.
         */
        setProperty(newValue: any, oldValue?: any): void {
            if (newValue === oldValue || newValue === this.value) {
                return;
            } else if (!this.$utils.isNumber(newValue)) {
                newValue = this.min;
            }

            if (this.__loaded) {
                this.__setValue(newValue, true, false);
                return;
            }

            this.value = newValue;
        }

        /**
         * Set the value of the range.
         * 
         * @param value The value to set the Range to.
         */
        setValue(value: number): void {
            if (!this.$utils.isNumber(value)) {
                value = this.min;
            }

            this.__setValue(value, true, true);
        }

        /**
         * Initialize the proper tracking events.
         * 
         * @param transition The transition direction specified 
         * in the plat-options.
         */
        _initializeEvents(transition: string): void {
            var knob = this._knobElement,
                trackBack: string,
                trackForward: string,
                track: EventListener = this._track;

            switch (transition) {
                case 'right':
                    trackBack = __$track + 'left';
                    trackForward = __$track + 'right';
                    track = this._track;
                    break;
                case 'left':
                    trackBack = __$track + 'right';
                    trackForward = __$track + 'left';
                    track = this._track;
                    break;
                case 'up':
                    trackBack = __$track + 'down';
                    trackForward = __$track + 'up';
                    break;
                case 'down':
                    trackBack = __$track + 'up';
                    trackForward = __$track + 'down';
                    break;
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    Exception.warn('Invalid direction "' + transition + '" for "' + __Range + '."');
                    return;
            }

            this.addEventListener(knob, __$touchstart, this._touchStart, false);
            this.addEventListener(knob, trackBack, track, false);
            this.addEventListener(knob, trackForward, track, false);

            var touchEnd = this._touchEnd;
            this.addEventListener(knob, __$trackend, touchEnd, false);
            this.addEventListener(knob, __$touchend, touchEnd, false);
        }

        /**
         * Log the first touch.
         * 
         * @param ev The touch event object.
         */
        _touchStart(ev: plat.ui.IGestureEvent): void {
            this.__inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        }

        /**
         * Set the new slider offset.
         * 
         * @param ev The $track event object.
         */
        _touchEnd(ev: plat.ui.IGestureEvent): void {
            if (!this.__inTouch) {
                return;
            }

            this.__inTouch = false;

            var newOffset = this.__calculateOffset(ev);
            if (newOffset < 0) {
                this.__sliderOffset = 0;
                return;
            } else if (newOffset > this.__maxOffset) {
                this.__sliderOffset = this.__maxOffset;
                return;
            }

            this.__sliderOffset = newOffset;
        }

        /**
         * Track the knob movement.
         * 
         * @param ev The $track event object.
         */
        _track(ev: plat.ui.IGestureEvent): void {
            var length = this.__calculateOffset(ev),
                value: number;

            if (length < 0) {
                value = this.min;
                if (value - this.value >= 0) {
                    return;
                }
                length = 0;
            } else if (length > this.__maxOffset) {
                value = this.max;
                if (value - this.value <= 0) {
                    return;
                }
                length = this.__maxOffset;
            } else {
                value = this.__calculateValue(length);
            }

            this.__setValue(value, false, true);
            this._sliderElement.style[<any>this.__lengthProperty] = length + 'px';
        }

        private __calculateValue(width: number): number {
            return (this.min + Math.round(width / this.__increment));
        }

        private __calculateKnobPosition(value: number): number {
            return (value - this.min) * this.__increment;
        }

        private __calculateOffset(ev: plat.ui.IGestureEvent): number {
            switch (this.__transition) {
                case 'right':
                    return this.__sliderOffset + ev.clientX - this._lastTouch.x;
                case 'left':
                    return this.__sliderOffset + this._lastTouch.x - ev.clientX;
                case 'up':
                    return this.__sliderOffset + this._lastTouch.y - ev.clientY;
                case 'down':
                    return this.__sliderOffset + ev.clientY - this._lastTouch.y;
            }
        }

        private __getLength(transition: string): number {
            switch (transition) {
                case 'right':
                case 'left':
                    this.__lengthProperty = 'width';
                    return this._sliderElement.parentElement.offsetWidth;
                case 'up':
                case 'down':
                    this.__lengthProperty = 'height';
                    return this._sliderElement.parentElement.offsetHeight;
                default:
                    return 0;
            }
        }

        private __setValue(newValue: number, setKnob: boolean, setProperty: boolean): void {
            var value = this.value;
            if (newValue === value) {
                return;
            } else if (newValue > this.max) {
                newValue = this.max;
            } else if (newValue < this.min) {
                newValue = this.min;
            }

            this.value = newValue;
            if (setKnob) {
                this.__setKnob(newValue);
            }

            if (setProperty) {
                this.propertyChanged(newValue, value);
            }
        }

        private __setKnob(value: number): void {
            var animationOptions: plat.IObject<string> = {},
                length = this.__calculateKnobPosition(value);

            animationOptions[this.__lengthProperty] = length + 'px';
            this.$animator.animate(this._sliderElement, __Transition, animationOptions);
            this.__sliderOffset = length;
        }
    }

    plat.register.control(__Range, Range);

    /**
     * An interface defining the plat-options for the Range control.
     */
    export interface IRangeOptions {
        /**
         * The type of range.
         */
        type: string;

        /**
         * The direction of the range.
         */
        transition: string;

        /**
         * The current value of the range.
         */
        value: number;

        /**
         * The min value of the range.
         */
        min: number;

        /**
         * The max value of the range.
         */
        max: number;
    }

    /**
     * A Template Control that allows for data-binding a select box and adds custom styling to make it look 
     * consistent across all platforms.
     */
    export class Select extends plat.ui.controls.Select implements IUIControl {
        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Select);
            dom.addClass(element, className);
        }

        /**
         * Set the class name
         */
        initialize(): void {
            super.initialize();
            this.setClasses();
        }
    }

    plat.register.control(__Select, Select);

    export class Input extends plat.ui.BindablePropertyControl implements IUIControl {
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * The template string for the Input control.
         */
        templateString =
        '<div class="plat-input-container">' +
            '<div class="image"></div>' +
            '<input type="text" plat-keyup="__onKeyup" />' +
            '<div class="action"></div>' +
        '</div>';

        /**
         * The plat-options for the Input control.
         */
        options: plat.observable.IObservableProperty<IInputOptions>;

        /**
         * The HTML image element.
         */
        _imageElement: HTMLElement;

        /**
         * The HTML input element.
         */
        _inputElement: HTMLInputElement;

        /**
         * The HTML action element.
         */
        _actionElement: HTMLElement;

        private __action: string;
        private __actionChar: string;
        private __actionHandler: EventListener;

        /**
         * Sets the proper class name on the button.
         * 
         * @param {string} className? The class name to set on the element.
         * @param {string} element? The element to set the class names on. Defaults to this 
         * control's element.
         */
        setClasses(className?: string, element?: Element): void {
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Input);
            dom.addClass(element, className);
        }

        /**
         * Set the class name
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * Set all HTMLElement references.
         */
        setTemplate(): void {
            var image = this._imageElement = <HTMLElement>this.element.firstElementChild.firstElementChild,
                input = this._inputElement = <HTMLInputElement>image.nextElementSibling;

            this._actionElement = <HTMLElement>input.nextElementSibling;
        }

        /**
         * Set the type and initialize the action.
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IInputOptions>>{},
                options = optionObj.value || <IInputOptions>{},
                dom = this.dom,
                element = this.element,
                type = options.type || 'primary',
                action = this.__action = options.action || 'normal';

            dom.addClass(element, type);
            dom.addClass(element, action);
            this.__initializeAction();
        }

        /**
         * A function to validate the input. For action='email' it returns 
         * true if the email can be a valid email address. For all other 
         * actions it returns true if the input is not empty.
         */
        validate(): boolean {
            var value = this._inputElement.value;
            if (this.$utils.isEmpty(value)) {
                return false;
            }

            switch (this.__action) {
                case 'email':
                    return this.__validateEmail(value);
                default:
                    return true;
            }
        }

        private __initializeAction(): void {
            var char = '';
            switch (this.__action) {
                case 'email':
                    this.__actionHandler = this.__handleEmail;
                    break;
                default:
                    this.__actionHandler = this.__erase;
                    break;
            }

            var actionElement = this._actionElement;
            actionElement.textContent = this.__actionChar = char;
            this.addEventListener(actionElement, __$tap, this.__actionHandler);
        }

        private __erase(): void {
            var inputElement = this._inputElement;
            inputElement.value = '';
            this._actionElement.textContent = this.__actionChar = '';
            inputElement.focus();
        }

        private __handleEmail(): void {
            var inputElement = this._inputElement,
                value = inputElement.value,
                char = this.__actionChar;

            if (char === 'x') {
                inputElement.value = '';
            } else {
                inputElement.value += this.__actionChar;
            }

            this.__checkEmail();
            this.propertyChanged(inputElement.value, value);
            inputElement.focus();
        }

        private __checkEmail(): void {
            var value = this._inputElement.value;
            switch (this.__actionChar) {
                case '@':
                    if (value.indexOf('@') !== -1) {
                        if (value.indexOf('.com') !== -1) {
                            this._actionElement.textContent = this.__actionChar = 'x';
                            break;
                        }
                        this._actionElement.textContent = this.__actionChar = '.com';
                    }
                    break;
                case '.com':
                    if (value.indexOf('@') === -1) {
                        this._actionElement.textContent = this.__actionChar = '@';
                    } else if (value.indexOf('.com') !== -1) {
                        this._actionElement.textContent = this.__actionChar = 'x';
                    }
                    break;
                case 'x':
                    if (value === '') {
                        this._actionElement.textContent = this.__actionChar = '';
                    } else if (value.indexOf('@') === -1) {
                        this._actionElement.textContent = this.__actionChar = '@';
                    } else if (value.indexOf('.com') === -1) {
                        this._actionElement.textContent = this.__actionChar = '.com';
                    }
                    break;
                default:
                    if (value.indexOf('@') === -1) {
                        this._actionElement.textContent = this.__actionChar = '@';
                    }
                    break;
            }
        }

        private __validateEmail(email: string): boolean {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        }

        private __checkText(): void {
            if (this.__actionChar === 'x') {
                if (this._inputElement.value === '') {
                    this._actionElement.textContent = this.__actionChar = '';
                }
            } else {
                if (this._inputElement.value !== '') {
                    this._actionElement.textContent = this.__actionChar = 'x';
                }
            }
        }

        private __onKeyup(ev: KeyboardEvent): void {
            switch (this.__action) {
                case 'email':
                    this.__checkEmail();
                    break;
                default:
                    this.__checkText();
                    break;
            }
        }
    }

    plat.register.control(__Input, Input);

    export interface IInputOptions {
        /**
         * The type of Input control.
         */
        type: string;

        /**
         * The action of the Input control (email).
         */
        action: string;
    }
}
/* tslint:enable */
