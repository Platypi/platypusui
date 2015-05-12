var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* tslint:disable */
/**
 * Copyright 2014 Platypi, LLC. All rights reserved.
 *
 * PlatypusUI is licensed under the GPL-3.0 found at
 * http://opensource.org/licenses/GPL-3.0
 *
 */
/**
 * The entry point into the platypus UI controls library.
 */
var platui;
(function (platui) {
    'use strict';
    /* tslint:disable:no-unused-variable */
    /*
     */
    var __prefix = '$', __Promise = __prefix + 'Promise', __Compat = __prefix + 'Compat', __Regex = __prefix + 'Regex', __Window = __prefix + 'Window', __Document = __prefix + 'Document', __Utils = __prefix + 'Utils', __Animator = __prefix + 'Animator', __DomEventInstance = __prefix + 'DomEventInstance', __TemplateControlFactory = __prefix + 'TemplateControlFactory', 
    /**
     */
    __CONTEXT = 'context', 
    /**
     */
    __PlatPrefix = 'plat', __Plat = __PlatPrefix + '-', __Button = __Plat + 'button', __Checkbox = __Plat + 'checkbox', __Drawer = __Plat + 'drawer', __DrawerController = __Drawer + '-controller', __Modal = __Plat + 'modal', __ProgressBar = __Plat + 'progress', __ProgressRing = __Plat + 'ring', __Radio = __Plat + 'radio', __Toggle = __Plat + 'toggle', __Slider = __Plat + 'slider', __Range = __Plat + 'range', __Select = __Plat + 'select', __Input = __Plat + 'input', __File = __Plat + 'file', __Carousel = __Plat + 'carousel', __Listview = __Plat + 'listview', 
    /**
     */
    __Hide = __Plat + 'hide', __Checked = __Plat + 'checked', __ForEach = __Plat + 'foreach', __Bind = __Plat + 'bind', __Disabled = __Plat + 'disabled', __CamelContext = __PlatPrefix + 'Context', __CamelChecked = __PlatPrefix + 'Checked', __CamelBind = __PlatPrefix + 'Bind', 
    /**
     */
    __listviewAliasOptions = {
        index: 'index',
        even: 'even',
        odd: 'odd',
        first: 'first',
        last: 'last',
        group: 'group'
    }, 
    /**
     */
    __Transition = __Plat + 'transition', __Enter = __Plat + 'enter', __Leave = __Plat + 'leave', 
    /**
     */
    __$tap = '$tap', __$touchstart = '$touchstart', __$touchend = '$touchend', __$touchcancel = '$touchcancel', __$swipe = '$swipe', __$track = '$track', __$trackend = '$trackend', __ButtonPrefix = '__plat-button-', __RadioPrefix = '__plat-radio-', __DrawerControllerInitEvent = '__platDrawerControllerInit', __DrawerControllerFetchEvent = '__platDrawerControllerFetch', __DrawerFoundEvent = '__platDrawerFound', __DrawerControllerDisposing = '__platDrawerControllerDisposing', __DrawerControllerDisposingFound = '__platDrawerControllerDisposingFound', 
    /**
     */
    __Reversed = '-reversed', __LITERAL_RESOURCE = 'literal', __transitionNegate = {
        right: 'left',
        left: 'right',
        up: 'down',
        down: 'up'
    }, noop = function () { };
    /* tslint:enable:no-unused-variable */
    if (typeof window !== 'undefined') {
        if (typeof window.platui === 'undefined') {
            window.platui = platui;
        }
        if (typeof window.module === 'undefined') {
            window.module = {};
        }
    }
    /**
     * An BindControl that standardizes an HTML5 button.
     */
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            _super.apply(this, arguments);
            /**
             * Replaces the <plat-button> node with
             * a <button> node.
             */
            this.replaceWith = 'button';
            /**
             * A boolean value showing the selected state of this Button.
             */
            this._isSelected = false;
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Button.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Button + ' ' + (className || ''));
        };
        /**
         * Sets default classes.
         */
        Button.prototype.initialize = function () {
            this.setClasses();
        };
        /**
         * Wrap all inner text nodes in spans.
         */
        Button.prototype.setTemplate = function () {
            var _document = this._document, element = this.element, childNodes = Array.prototype.slice.call(element.childNodes), childNode, span;
            var isEmpty = this.utils.isEmpty;
            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    if (!isEmpty(childNode.textContent.trim().match(/[^\r\n]/g))) {
                        span = _document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                }
                else {
                    element.insertBefore(childNode, null);
                }
            }
        };
        /**
         * Determine the button style and apply the proper classes.
         */
        Button.prototype.loaded = function () {
            var element = this.element, optionObj = this.options || {}, options = optionObj.value || {}, group = options.group, isString = this.utils.isString;
            if (!isString(group)) {
                group = this.attributes[__CamelBind];
                if (isString(group)) {
                    this._group = group;
                    if (this.dom.hasClass(element, __Plat + 'selected')) {
                        this._onTap();
                    }
                    this._addEventListeners();
                }
                return;
            }
            this._group = group;
            if (this.dom.hasClass(element, __Plat + 'selected')) {
                this._onTap();
            }
            this._addEventListeners();
        };
        /**
         * Add event listeners for selection.
         */
        Button.prototype._addEventListeners = function () {
            var _this = this;
            this.addEventListener(this.element, __$tap, this._onTap, false);
            this.on(__ButtonPrefix + this._group, function () {
                if (_this._isSelected) {
                    _this.dom.removeClass(_this.element, __Plat + 'selected');
                    _this._isSelected = false;
                }
            });
        };
        /**
         * Place the pushed button in a selected state.
         */
        Button.prototype._onTap = function () {
            if (this._isSelected) {
                return;
            }
            var element = this.element;
            this.dom.addClass(element, __Plat + 'selected');
            this.dispatchEvent(__ButtonPrefix + this._group, plat.events.EventManager.DIRECT);
            this._isSelected = true;
            this.inputChanged(element.textContent);
        };
        Button._inject = {
            _document: __Document
        };
        return Button;
    })(plat.ui.BindControl);
    platui.Button = Button;
    plat.register.control(__Button, Button);
    /**
     * An BindControl that simulates a toggle switch.
     */
    var Toggle = (function (_super) {
        __extends(Toggle, _super);
        function Toggle() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-toggle-container">\n' +
                '    <div class="plat-knob"></div>\n' +
                '</div>\n';
            /**
             * A boolean value indicating whether the control is actively selected.
             */
            this.isActive = false;
            /**
             * The type of the control's activated element.
             */
            this._targetType = 'slide';
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Toggle.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Toggle + ' ' + (className || ''));
        };
        /**
         * Set the class name.
         */
        Toggle.prototype.initialize = function () {
            this.setClasses();
        };
        /**
         * Adds a listener for the tap event.
         */
        Toggle.prototype.loaded = function () {
            var element = this.element;
            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
        };
        /**
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        Toggle.prototype.observeProperties = function (binder) {
            binder.observeProperty(this._setBoundProperty);
        };
        /**
         * The function called when the bindable property is set externally.
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue The old value of the bindable property.
         * @param {string} identifier The identifier of the property being observed.
         * @param {boolean} setProperty? A boolean value indicating whether we should set
         * the property if we need to toggle the state.
         */
        Toggle.prototype._setBoundProperty = function (newValue, oldValue, identifier, setProperty) {
            if (newValue === oldValue) {
                return;
            }
            else if (setProperty === true && this.utils.isNull(newValue)) {
                this.inputChanged(this.isActive);
                return;
            }
            var isActive = !!newValue;
            if (isActive === this.isActive) {
                return;
            }
            this._toggle(setProperty);
        };
        /**
         * The callback for a tap event.
         * @param {plat.ui.IGestureEvent} ev The tap event object.
         */
        Toggle.prototype._onTap = function (ev) {
            this._toggle(true);
            this._trigger('change');
        };
        /**
         * Triggers an event starting from this control's element.
         * @param {string} event The event name to trigger.
         */
        Toggle.prototype._trigger = function (event) {
            var domEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
            domEvent.trigger();
        };
        /**
         * Toggles the mark and updates the bindable property if needed.
         * @param {boolean} setProperty? A boolean value stating whether the bindable
         * property should be updated.
         */
        Toggle.prototype._toggle = function (setProperty) {
            var wasActive = this.isActive, isActive = !wasActive;
            this._activate(this._targetElement || (this._targetElement = this.element.firstElementChild));
            this.isActive = this.element.checked = isActive;
            if (setProperty === true) {
                this.inputChanged(isActive, wasActive);
            }
        };
        /**
         * A function to activate the given element by toggling the
         * class specified as the target type.
         * @param {Element} element The element to activate.
         */
        Toggle.prototype._activate = function (element) {
            this.dom.toggleClass(element, __Plat + this._targetType);
        };
        return Toggle;
    })(plat.ui.BindControl);
    platui.Toggle = Toggle;
    plat.register.control(__Toggle, Toggle);
    /**
     * An IBindablePropertyControl that standardizes the HTML5 checkbox.
     */
    var Checkbox = (function (_super) {
        __extends(Checkbox, _super);
        function Checkbox() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-checkbox-container">\n' +
                '    <span class="plat-mark"></span>\n' +
                '</div>\n';
            /**
             * Whether the target type has been set already or not.
             */
            this._targetTypeSet = false;
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Checkbox.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Checkbox + ' ' + (className || ''));
        };
        /**
         * Adds the inner template to the DOM making sure to wrap text nodes in spans.
         */
        Checkbox.prototype.setTemplate = function () {
            var isNull = this.utils.isNull, innerTemplate = this.innerTemplate;
            if (isNull(innerTemplate)) {
                return;
            }
            var _document = this._document, element = this.element, childNodes = Array.prototype.slice.call(innerTemplate.childNodes), childNode, span, match;
            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (match !== null && match.length > 0) {
                        span = _document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                }
                else {
                    element.insertBefore(childNode, null);
                }
            }
        };
        /**
         * Checks for checked attributes and handles them accordingly. Also,
         * initializes the mark and adds a listener for the tap event.
         */
        Checkbox.prototype.loaded = function () {
            _super.prototype.loaded.call(this);
            var optionObj = this.options || {}, options = optionObj.value || {}, previousType = this._targetType, mark = this._targetType = options.mark || 'check';
            this._convertChecked();
            switch (mark.toLowerCase()) {
                case 'check':
                case 'x':
                    break;
                default:
                    var _Exception = this._Exception;
                    _Exception.warn('Invalid mark option specified for' + this.type + '. Defaulting to checkmark.', _Exception.CONTROL);
                    this._targetType = 'check';
                    break;
            }
            if (this._targetTypeSet) {
                var target = this._targetElement;
                this.dom.removeClass(target, previousType);
                this._activate(target);
            }
            this._targetTypeSet = true;
        };
        /**
         * A function for checking "checked" attributes and handling them accordingly.
         * @param {any} newValue The newValue of the attribute to convert.
         * @param {any} oldValue? The oldValue of the attribute to convert.
         */
        Checkbox.prototype._convertChecked = function () {
            var element = this.element;
            if (element.hasAttribute(__Checked)) {
                this._convertAttribute(element.getAttribute(__Checked));
                this.attributes.observe(this._convertAttribute, __CamelChecked);
            }
            else if (element.hasAttribute('data-' + __Checked)) {
                this._convertAttribute(element.getAttribute('data-' + __Checked));
                this.attributes.observe(this._convertAttribute, __CamelChecked);
            }
            else if (element.hasAttribute('checked') || element.hasAttribute('data-checked')) {
                this._convertAttribute(true);
            }
        };
        /**
         * A function for handling the attribute value conversion for updating the
         * bound property.
         * @param {any} newValue The newValue of the attribute to convert.
         * @param {any} oldValue? The oldValue of the attribute to convert.
         */
        Checkbox.prototype._convertAttribute = function (newValue, oldValue) {
            var _utils = this.utils;
            if (_utils.isBoolean(newValue)) {
                return this._setBoundProperty(newValue, oldValue, null, true);
            }
            else if (!_utils.isString(newValue)) {
                return;
            }
            this._setBoundProperty(newValue === 'true', oldValue === 'true', null, true);
        };
        /**
         * A function to activate the given element by toggling the
         * class specified as the target type.
         * @param {Element} element The element to activate.
         */
        Checkbox.prototype._activate = function (element) {
            if (this._targetTypeSet) {
                this.dom.toggleClass(element, __Plat + this._targetType);
                return;
            }
            this._targetTypeSet = true;
        };
        Checkbox._inject = {
            _document: __Document
        };
        return Checkbox;
    })(Toggle);
    platui.Checkbox = Checkbox;
    plat.register.control(__Checkbox, Checkbox);
    /**
     * An IBindablePropertyControl that standardizes the HTML5 radio button.
     */
    var Radio = (function (_super) {
        __extends(Radio, _super);
        function Radio() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-radio-container">\n' +
                '    <div class="plat-mark"></div>\n' +
                '</div>\n';
            /**
             * The radio groups name if a radio group is present.
             */
            this.groupName = '';
            /**
             * The check type to be placed in the element.
             */
            this._targetType = 'bullet';
            /**
             * Whether the target type has been set already or not.
             */
            this._targetTypeSet = true;
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Radio.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Radio + ' ' + (className || ''));
        };
        /**
         * Checks for a radio group and converts "checked" attributes.
         */
        Radio.prototype.loaded = function () {
            var element = this.element;
            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
            if (element.hasAttribute('name')) {
                this.groupName = element.getAttribute('name');
            }
            else if (element.hasAttribute(__Bind)) {
                this.groupName = element.getAttribute(__Bind);
            }
            else if (element.hasAttribute('data-' + __Bind)) {
                this.groupName = element.getAttribute('data-' + __Bind);
            }
            this._convertChecked();
        };
        /**
         * Checks if the radio has been selected and only notifies of a bindable
         * property changed if it has.
         * @param {any} newValue? The new value of the property after the change.
         * @param {any} oldValue? The old value of the property prior to the change.
         */
        Radio.prototype.inputChanged = function (newValue, oldValue) {
            if (this.isActive) {
                _super.prototype.inputChanged.call(this, this._getValue());
            }
        };
        /**
         * The function called when the bindable property is set externally.
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue The old value of the bindable property.
         * @param {string} identifier The identifier of the property being observed.
         * @param {boolean} setProperty? A boolean value indicating whether we should set
         * the property if we need to toggle the mark.
         */
        Radio.prototype._setBoundProperty = function (newValue, oldValue, identifier, setProperty) {
            if (newValue === oldValue) {
                return;
            }
            else if (setProperty === true && this.utils.isNull(newValue)) {
                this.inputChanged();
                return;
            }
            var isChecked = newValue === this._getValue(), wasChecked = this.isActive;
            if (isChecked === wasChecked) {
                return;
            }
            this._toggle(setProperty);
        };
        /**
         * The callback for a tap event. Only fires the event if the Radio
         * has been selected.
         * @param {plat.ui.IGestureEvent} ev The tap event object.
         */
        Radio.prototype._onTap = function (ev) {
            if (this.isActive) {
                return;
            }
            _super.prototype._onTap.call(this, ev);
        };
        /**
         * Toggles the mark and updates the bindable property if needed.
         * @param {boolean} setProperty? A boolean value stating whether the bindable
         * property should be updated.
         */
        Radio.prototype._toggle = function (setProperty) {
            var _this = this;
            _super.prototype._toggle.call(this, setProperty);
            if (this.utils.isFunction(this._removeListener)) {
                this._removeListener();
                this._removeListener = null;
            }
            if (this.isActive) {
                var name = this.groupName;
                this.dispatchEvent(__RadioPrefix + name, plat.events.EventManager.DIRECT);
                var remover = this._removeListener = this.on(__RadioPrefix + name, function () {
                    _this._toggle();
                    remover();
                });
            }
        };
        /**
         * A function for handling the attribute value conversion for updating the
         * bound property.
         * @param {any} newValue The newValue of the attribute to convert.
         * @param {any} oldValue? The oldValue of the attribute to convert.
         */
        Radio.prototype._convertAttribute = function (newValue, oldValue) {
            var _utils = this.utils;
            if (_utils.isBoolean(newValue)) {
                if (newValue) {
                    this._setBoundProperty(this._getValue(), null, null, true);
                }
                return;
            }
            else if (!_utils.isString(newValue)) {
                return;
            }
            if (newValue === 'true') {
                this._setBoundProperty(this._getValue(), null, null, true);
            }
        };
        /**
         * Grabs the value of this Radio's bindable property. It first checks for
         * the "value" attribute, and defaults to the elements textContent if it's unavailable.
         */
        Radio.prototype._getValue = function () {
            var element = this.element;
            return element.hasAttribute('value') ? element.getAttribute('value').trim() : element.textContent.trim();
        };
        return Radio;
    })(Checkbox);
    platui.Radio = Radio;
    plat.register.control(__Radio, Radio);
    /**
     * An ITemplateControl for showing indeterminate progress.
     */
    var ProgressRing = (function (_super) {
        __extends(ProgressRing, _super);
        function ProgressRing() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-progress-container">\n' +
                '    <div class="plat-animated-ring"></div>\n' +
                '</div>\n';
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        ProgressRing.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __ProgressRing + ' ' + (className || ''));
        };
        /**
         * Set the animation.
         */
        ProgressRing.prototype.initialize = function () {
            this.setClasses();
        };
        return ProgressRing;
    })(plat.ui.TemplateControl);
    platui.ProgressRing = ProgressRing;
    plat.register.control(__ProgressRing, ProgressRing);
    /**
     * An ITemplateControl for showing incremental progress.
     */
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-progress-container">\n' +
                '    <div class="plat-animated-bar"></div>\n' +
                '</div>\n';
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        ProgressBar.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __ProgressBar + ' ' + (className || ''));
        };
        /**
         * Set the class name.
         */
        ProgressBar.prototype.initialize = function () {
            this.setClasses();
        };
        /**
         * Grabs the bar element then sets any initial progress.
         */
        ProgressBar.prototype.loaded = function () {
            var _this = this;
            this._barElement = this.element.firstElementChild.firstElementChild;
            this.setProgress(this.context);
            this.addEventListener(this._window, 'resize', function () {
                _this.setProgress(_this.context);
            });
        };
        /**
         * Animates the bar on a context changed.
         */
        ProgressBar.prototype.contextChanged = function () {
            this.setProgress(this.context);
        };
        /**
         * Sets the progress bar value.
         * @param {number} value The decimal number between 0 and 1 to set as the
         * bar percentage (e.g. - 0.5 would be 50% complete).
         */
        ProgressBar.prototype.setProgress = function (value) {
            if (!this.utils.isNumber(value) || value > 1 || value < 0) {
                var _Exception = this._Exception;
                _Exception.warn('The context of a "' + this.type + '" control must be a number between 0 and 1.', _Exception.CONTEXT);
                return;
            }
            var barElement = this._barElement, barMax = barElement.parentElement.offsetWidth;
            if (!barMax) {
                return;
            }
            barElement.style.width = Math.ceil(barMax * value) + 'px';
        };
        ProgressBar._inject = {
            _window: __Window
        };
        return ProgressBar;
    })(plat.ui.TemplateControl);
    platui.ProgressBar = ProgressBar;
    plat.register.control(__ProgressBar, ProgressBar);
    /**
     * An BindControl that acts as a global drawer.
     */
    var Drawer = (function (_super) {
        __extends(Drawer, _super);
        function Drawer() {
            _super.apply(this, arguments);
            /**
             * References to all the DrawerControllers used to control this Drawer.
             */
            this._controllers = [];
            /**
             * Whether or not the this control has been paired with a corresponding Drawer.
             */
            this._isInitialized = false;
            /**
             * A bound value that may have come through prior to initialization.
             */
            this._preInitializedValue = false;
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Drawer.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Drawer + ' ' + (className || ''));
        };
        /**
         * Set the class name and hides the element and
         * removes the innerHTML from the DOM and saves it.
         */
        Drawer.prototype.initialize = function () {
            this.setClasses();
        };
        /**
         * Removes the innerHTML from the DOM and saves it.
         */
        Drawer.prototype.setTemplate = function () {
            this.innerTemplate = this.dom.appendChildren(this.element.childNodes);
        };
        /**
         * Check for a position and initialize event handling.
         */
        Drawer.prototype.loaded = function () {
            var _this = this;
            var element = this.element, _utils = this.utils, optionObj = this.options || {}, options = optionObj.value || {}, position = this._currentPosition = options.position || 'left', id = options.id || '', templateUrl = options.templateUrl, isElastic = options.elastic === true;
            element.setAttribute(__Hide, '');
            this.dom.addClass(element, __Plat + position);
            if (_utils.isString(templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, templateUrl).then(function (template) {
                    _this.innerTemplate = template;
                    _this._initializeEvents(id, position, isElastic);
                });
                return;
            }
            this._initializeEvents(id, position, isElastic);
        };
        /**
         * Opens the Drawer.
         */
        Drawer.prototype.open = function () {
            var controller = this._controllers[0];
            if (this.utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to open.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }
            return controller.open();
        };
        /**
         * Closes the Drawer.
         */
        Drawer.prototype.close = function () {
            var controller = this._controllers[0];
            if (this.utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to close.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }
            return controller.close();
        };
        /**
         * Toggles the Drawer's open/closed state.
         */
        Drawer.prototype.toggle = function () {
            var controller = this._controllers[0];
            if (this.utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to toggle.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }
            return controller.toggle();
        };
        /**
         * Resets the Drawer to it's current open/closed state.
         */
        Drawer.prototype.reset = function () {
            var controller = this._controllers[0];
            if (this.utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to reset.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }
            return controller.reset();
        };
        /**
         * Indicates whether the Drawer is currently open.
         */
        Drawer.prototype.isOpen = function () {
            var controller = this._controllers[0];
            if (this.utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to check if open.', _Exception.TEMPLATE);
                return false;
            }
            return controller.isOpen();
        };
        /**
         * Adds and binds the added HTML template to this control's inherited context.
         * @param {string} name The template name to both add and bind.
         * @param {Node} node The node to add as a bindable template.
         */
        Drawer.prototype.bindTemplate = function (name, node) {
            var _this = this;
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            return bindableTemplates.bind(name).then(function (template) {
                var element = _this.element;
                _this.dom.clearNode(element);
                element.appendChild(template);
            }).catch(function (error) {
                var _Exception = _this._Exception;
                _Exception.warn('Error binding template for ' + _this.type + ': ' + error, _Exception.BIND);
            });
        };
        /**
         * Returns the number of DrawerControllers linked to this
         * Drawer.
         */
        Drawer.prototype.controllerCount = function () {
            return this._controllers.length;
        };
        /**
         * Removes a specified DrawerController from this control's Array of
         * linked DrawerControllers.
         * @param {platui.DrawerController} controller The DrawerController
         * to splice.
         */
        Drawer.prototype.spliceController = function (controller) {
            var controllers = this._controllers, index = controllers.indexOf(controller);
            if (index === -1) {
                return;
            }
            controllers.splice(index, 1);
        };
        /**
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        Drawer.prototype.observeProperties = function (binder) {
            binder.observeProperty(this._setBoundProperty);
        };
        /**
         * The function called when the bindable property is set externally.
         * @param {boolean} drawerState The new value of the control state.
         * @param {boolean} oldValue The old value of the bindable control state.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         */
        Drawer.prototype._setBoundProperty = function (drawerState, oldValue, identifier, firstTime) {
            var _utils = this.utils, controller = this._controllers[0];
            if (firstTime === true && _utils.isNull(drawerState)) {
                this.inputChanged(_utils.isNull(controller) ? false : controller.isOpen());
                return;
            }
            if (_utils.isBoolean(drawerState)) {
                if (!this._isInitialized) {
                    this._preInitializedValue = drawerState;
                    return;
                }
                this._preInitializedValue = false;
                if (_utils.isNull(controller)) {
                    return;
                }
                if (drawerState) {
                    if (controller.isOpen()) {
                        return;
                    }
                    controller.open();
                    return;
                }
                if (controller.isOpen()) {
                    controller.close();
                }
                return;
            }
            var _Exception = this._Exception;
            _Exception.warn('Attempting to open or close ' + this.type +
                ' with a bound value that is something other than a boolean.', _Exception.BIND);
        };
        /**
         * Changes the placement and implied position of the Drawer.
         * @param {string} position The new position to change to.
         */
        Drawer.prototype._changeDirection = function (position) {
            if (this.utils.isNull(position) || position === this._currentPosition) {
                return;
            }
            var dom = this.dom, element = this.element;
            dom.removeClass(element, __Plat + this._currentPosition);
            dom.addClass(element, __Plat + position);
            this._currentPosition = position;
        };
        /**
         * Initializes and dispatches pub sub events.
         * @param {string} id The ID of this Drawer if used.
         * @param {string} position The position.
         * @param {boolean} isElastic Whether or not the Drawer has an
         * elastic transition effect.
         */
        Drawer.prototype._initializeEvents = function (id, position, isElastic) {
            var _this = this;
            var _utils = this.utils, innerTemplate = this.innerTemplate;
            this.on(__DrawerControllerFetchEvent + '_' + id, function (event, controllerArg) {
                var control = controllerArg.control;
                if (_utils.isNull(control)) {
                    return;
                }
                if (_utils.isString(controllerArg.position)) {
                    position = controllerArg.position;
                    _this._changeDirection(position);
                }
                _this._controllers.unshift(control);
                if (!controllerArg.received) {
                    _this.dispatchEvent(__DrawerFoundEvent + '_' + id, plat.events.EventManager.DIRECT, {
                        control: _this,
                        received: true,
                        position: position,
                        template: _utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                        elastic: isElastic
                    });
                }
                _this._isInitialized = true;
                if (!controllerArg.useContext) {
                    _this.bindTemplate('drawer', innerTemplate.cloneNode(true)).then(function () {
                        _this._checkPreInit();
                    });
                    return;
                }
                _this._checkPreInit();
            });
            this.dispatchEvent(__DrawerFoundEvent + '_' + id, plat.events.EventManager.DIRECT, {
                control: this,
                received: false,
                position: position,
                template: _utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                elastic: isElastic
            });
        };
        /**
         * Checks the pre-initialized value and handles accordingly.
         */
        Drawer.prototype._checkPreInit = function () {
            var _this = this;
            if (this._preInitializedValue) {
                var _utils = this.utils;
                _utils.postpone(function () {
                    var controller = _this._controllers[0];
                    if (!_utils.isNull(controller)) {
                        controller.open();
                    }
                });
            }
        };
        Drawer._inject = {
            _Promise: __Promise
        };
        return Drawer;
    })(plat.ui.BindControl);
    platui.Drawer = Drawer;
    plat.register.control(__Drawer, Drawer);
    /**
     * An BindControl that manipulates and controls a global drawer.
     */
    var DrawerController = (function (_super) {
        __extends(DrawerController, _super);
        function DrawerController() {
            _super.apply(this, arguments);
            /**
             * Whether or not the user has swiped.
             */
            this._hasSwiped = false;
            /**
             * Whether or not the user has tapped.
             */
            this._hasTapped = false;
            /**
             * Whether or not the Drawer is open.
             */
            this._isOpen = false;
            /**
             * An enum denoting the current touch state of the user.
             */
            this._touchState = 0;
            /**
             * Whether the corresponding Drawer is vertical or horizontal.
             */
            this._isVertical = false;
            /**
             * A function for removing the listener for responding to other DrawerControllers
             * being disposed.
             */
            this._disposeRemover = noop;
            /**
             * Whether or not the this control has been paired with a corresponding Drawer.
             */
            this._isInitialized = false;
            /**
             * A bound value that may have come through prior to initialization.
             */
            this._preInitializedValue = false;
        }
        /**
         * Sets the class name on the element.
         */
        DrawerController.prototype.initialize = function () {
            this.dom.addClass(this.element, __DrawerController);
        };
        /**
         * Initialize the track events on the element.
         */
        DrawerController.prototype.loaded = function () {
            var optionObj = this.options || {}, options = optionObj.value || {}, position = options.position, id = options.id || '';
            this._type = options.type || 'tap track';
            this._isElastic = options.elastic;
            this._useContext = options.useContext === true;
            this._templateUrl = options.templateUrl;
            this._initializeEvents(id, position);
        };
        /**
         * Remove the transition classes off the root element and reset the position and
         * zIndex properties if modified and only if this is the last DrawerController
         * referencing this Drawer.
         */
        DrawerController.prototype.dispose = function () {
            var _this = this;
            _super.prototype.dispose.call(this);
            var _utils = this.utils, drawer = this._drawer;
            if (_utils.isNull(drawer)) {
                return;
            }
            drawer.spliceController(this);
            if (drawer.controllerCount() > 0) {
                return;
            }
            var storedStyle = drawer.storedProperties, rootElement = this._rootElement, disposeRootElement = true;
            this._disposeRemover();
            this.on(__DrawerControllerDisposingFound, function (ev, otherRoot) {
                if (!disposeRootElement) {
                    return;
                }
                disposeRootElement = rootElement !== otherRoot;
            });
            _utils.defer(function () {
                if (!disposeRootElement) {
                    return;
                }
                _this.dom.removeClass(rootElement, __Drawer + '-open plat-drawer-transition-prep ' + _this._directionalTransitionPrep);
                if (_utils.isObject(storedStyle)) {
                    var rootElementStyle = rootElement.style, parent = rootElement.parentElement, overflow = storedStyle.parentOverflow;
                    rootElementStyle.position = storedStyle.position;
                    rootElementStyle.zIndex = storedStyle.zIndex;
                    if (_utils.isObject(overflow) && _utils.isNode(parent)) {
                        parent.style[overflow.key] = overflow.value;
                    }
                }
            }, 25);
            this.dispatchEvent(__DrawerControllerDisposing, plat.events.EventManager.DIRECT);
        };
        /**
         * Opens the Drawer.
         */
        DrawerController.prototype.open = function () {
            var _this = this;
            var wasClosed = !this._isOpen, _utils = this.utils;
            if (_utils.isFunction(this._toggleDelay)) {
                this._toggleDelay();
            }
            var promise = new this._Promise(function (resolve) {
                _this._toggleDelay = _utils.requestAnimationFrame(function () {
                    _this._touchState = 0;
                    _this._toggleDelay = null;
                    _this._open().then(resolve);
                });
            });
            if (wasClosed) {
                var drawer = this._drawer;
                this.inputChanged(true);
                if (!_utils.isNull(drawer)) {
                    drawer.inputChanged(true);
                }
            }
            return promise;
        };
        /**
         * Closes the Drawer.
         */
        DrawerController.prototype.close = function () {
            var _this = this;
            var wasOpen = this._isOpen, _utils = this.utils;
            if (_utils.isFunction(this._toggleDelay)) {
                this._toggleDelay();
            }
            var promise = new this._Promise(function (resolve) {
                _this._toggleDelay = _utils.requestAnimationFrame(function () {
                    _this._touchState = 0;
                    _this._toggleDelay = null;
                    _this._close().then(resolve);
                });
            });
            if (wasOpen) {
                var drawer = this._drawer;
                this.inputChanged(false);
                if (!_utils.isNull(drawer)) {
                    drawer.inputChanged(false);
                }
            }
            return promise;
        };
        /**
         * Toggles the Drawer's open/closed state.
         */
        DrawerController.prototype.toggle = function () {
            if (this._isOpen) {
                return this.close();
            }
            return this.open();
        };
        /**
         * Resets the Drawer to it's current open/closed state.
         */
        DrawerController.prototype.reset = function () {
            if (this._isOpen) {
                return this.open();
            }
            return this.close();
        };
        /**
         * Indicates whether the Drawer is currently open.
         */
        DrawerController.prototype.isOpen = function () {
            return this._isOpen;
        };
        /**
         * Binds the added HTML template to this control's inherited context and
         * places the node into the Drawer.
         * @param {string} name The template name to bind.
         * @param {Node} node The node to add as a bindable template.
         */
        DrawerController.prototype.bindTemplate = function (name, node) {
            var _this = this;
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            return bindableTemplates.bind(name).then(function (template) {
                var element = _this._drawerElement;
                _this.dom.clearNode(element);
                element.appendChild(template);
            }).catch(function (error) {
                var _Exception = _this._Exception;
                _Exception.warn('Error binding template for ' + _this.type + ': ' + error, _Exception.BIND);
            });
        };
        /**
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        DrawerController.prototype.observeProperties = function (binder) {
            binder.observeProperty(this._setBoundProperty);
        };
        /**
         * The function called when the bindable property is set externally.
         * @param {boolean} drawerState The new value of the control's state.
         * @param {boolean} oldValue The old value of the bindable control state.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         */
        DrawerController.prototype._setBoundProperty = function (drawerState, oldValue, identifier, firstTime) {
            var _this = this;
            var _utils = this.utils;
            if (firstTime === true && _utils.isNull(drawerState)) {
                this.inputChanged(this._isOpen);
                return;
            }
            if (_utils.isBoolean(drawerState)) {
                if (!this._isInitialized) {
                    this._preInitializedValue = drawerState;
                    return;
                }
                if (drawerState) {
                    if (this._isOpen) {
                        return;
                    }
                    this._toggleDelay = _utils.requestAnimationFrame(function () {
                        _this._touchState = 0;
                        _this._toggleDelay = null;
                        _this._open();
                    });
                    return;
                }
                if (this._isOpen) {
                    this._toggleDelay = _utils.requestAnimationFrame(function () {
                        _this._touchState = 0;
                        _this._toggleDelay = null;
                        _this._close();
                    });
                }
                return;
            }
            var _Exception = this._Exception;
            _Exception.warn('Attempting to bind ' + this.type +
                ' with a value that is something other than a boolean.', _Exception.BIND);
        };
        /**
         * Opens the Drawer.
         */
        DrawerController.prototype._open = function () {
            var _this = this;
            var rootElement = this._rootElement, drawerElement = this._drawerElement, _utils = this.utils, isNode = _utils.isNode, wasClosed = !this._isOpen, offset = this._getOffset();
            if (!(offset && isNode(rootElement) && isNode(drawerElement))) {
                return this._Promise.resolve(null);
            }
            var translation;
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
                    return this._animator.resolve();
            }
            this._isOpen = true;
            drawerElement.removeAttribute(__Hide);
            if (wasClosed) {
                this.dom.addClass(rootElement, __Drawer + '-open ' + this._directionalTransitionPrep);
                this._addEventIntercepts();
            }
            else {
                this.dom.addClass(rootElement, this._directionalTransitionPrep);
            }
            var animationOptions = {};
            animationOptions[this._transform] = translation;
            return this._animationThenable = this._animator.animate(rootElement, __Transition, {
                properties: animationOptions
            }).then(function () {
                _this._animationThenable = null;
            });
        };
        /**
         * Closes the Drawer.
         */
        DrawerController.prototype._close = function () {
            var _this = this;
            var rootElement = this._rootElement, drawerElement = this._drawerElement, dom = this.dom, _utils = this.utils, isNode = _utils.isNode;
            if (this._isOpen) {
                this._removeEventIntercepts();
                dom.removeClass(rootElement, __Drawer + '-open');
            }
            this._isOpen = false;
            if (!(isNode(rootElement) && isNode(drawerElement))) {
                return this._Promise.resolve(null);
            }
            var animationOptions = {}, transform = this._transform;
            animationOptions[transform] = this._preTransform;
            return this._animationThenable = this._animator.animate(rootElement, __Transition, {
                properties: animationOptions
            }).then(function () {
                _this._animationThenable = null;
                if (_this._isOpen) {
                    return;
                }
                drawerElement.setAttribute(__Hide, '');
                dom.removeClass(rootElement, _this._directionalTransitionPrep);
            });
        };
        /**
         * Adds a click eater and all event listeners to the click eater when tracking
         * and closing an open Drawer.
         */
        DrawerController.prototype._addEventIntercepts = function () {
            var clickEater = this._clickEater, style = clickEater.style, rootElement = this._rootElement;
            // align clickEater to fill the rootElement 
            style.top = rootElement.scrollTop + 'px';
            style.left = rootElement.scrollLeft + 'px';
            rootElement.insertBefore(clickEater, null);
            if (this._isTap) {
                this._addTapClose();
            }
            if (this._isSwipe) {
                this._addSwipeClose();
            }
            if (this._isTrack) {
                var touchStartRemover = this.addEventListener(clickEater, __$touchstart, this._touchStart, false), trackRemover = this.addEventListener(clickEater, __$track, this._track, false), touchEnd = this._touchEnd, trackEndRemover = this.addEventListener(clickEater, __$trackend, touchEnd, false), touchEndRemover = this.addEventListener(clickEater, __$touchend, touchEnd, false);
                this._openTrackRemover = function () {
                    touchStartRemover();
                    trackRemover();
                    trackEndRemover();
                    touchEndRemover();
                };
            }
        };
        /**
         * Removes the click eater and all event intercepts on the click eater when closing an open Drawer.
         */
        DrawerController.prototype._removeEventIntercepts = function () {
            this._rootElement.removeChild(this._clickEater);
            var isFunction = this.utils.isFunction;
            if (this._isTap && isFunction(this._openTapRemover)) {
                this._openTapRemover();
                this._openTapRemover = null;
            }
            if (this._isTrack && isFunction(this._openTrackRemover)) {
                this._openTrackRemover();
                this._openTrackRemover = null;
            }
            if (this._isSwipe && isFunction(this._openSwipeRemover)) {
                this._openSwipeRemover();
                this._openSwipeRemover = null;
            }
        };
        /**
         * Adds swipe events to the controller element.
         */
        DrawerController.prototype._addSwipeOpen = function () {
            var _this = this;
            this._removeSwipeOpen = this.addEventListener(this.element, __$swipe + __transitionNegate[this._position], function () {
                _this._hasSwiped = true;
                _this.open();
            }, false);
        };
        /**
         * Adds swipe close event to the root element.
         */
        DrawerController.prototype._addSwipeClose = function () {
            var _this = this;
            this._openSwipeRemover = this.addEventListener(this._clickEater, __$swipe + this._position, function () {
                _this._hasSwiped = true;
                _this.close();
            }, false);
        };
        /**
         * Adds tap close event to the controller element.
         */
        DrawerController.prototype._addTapOpen = function () {
            var _this = this;
            this._removeTap = this.addEventListener(this.element, __$tap, function () {
                _this._hasTapped = true;
                _this.open();
            }, false);
        };
        /**
         * Adds tap close event to the root element.
         */
        DrawerController.prototype._addTapClose = function () {
            var _this = this;
            this._openTapRemover = this.addEventListener(this._clickEater, __$tap, function () {
                _this._hasTapped = true;
                _this.close();
            }, false);
        };
        /**
         * Adds primary and secondary tracking events to the DrawerController element.
         */
        DrawerController.prototype._addEventListeners = function () {
            var element = this.element, isNull = this.utils.isNull, types = this._type.split(' '), position = this._position;
            // remove event listeners here first if we want to later be able to dynamically change position of drawer. 
            // this._removeEventListeners(); 
            if (this._isTap = (types.indexOf('tap') !== -1)) {
                this._addTapOpen();
            }
            if (this._isSwipe = (types.indexOf('swipe') !== -1)) {
                this._addSwipeOpen();
            }
            if (this._isTrack = (types.indexOf('track') !== -1)) {
                var trackFn = this._track, trackDirection;
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
                this._removePrimaryTrack = this.addEventListener(element, __$track + __transitionNegate[trackDirection], trackFn, false);
                this._removeSecondaryTrack = this.addEventListener(element, __$track + trackDirection, trackFn, false);
                if (isNull(this._lastTouch)) {
                    var touchEnd = this._touchEnd;
                    this._lastTouch = { x: 0, y: 0 };
                    this.addEventListener(element, __$touchstart, this._touchStart, false);
                    this.addEventListener(element, __$touchend, touchEnd, false);
                    this.addEventListener(element, __$trackend, touchEnd, false);
                }
            }
        };
        /**
         * Removes all event listeners.
         */
        DrawerController.prototype._removeEventListeners = function () {
            var isFunction = this.utils.isFunction;
            if (this._isTap && isFunction(this._removeTap)) {
                this._removeTap();
                this._removeTap = null;
            }
            if (this._isTrack) {
                if (isFunction(this._removePrimaryTrack)) {
                    this._removePrimaryTrack();
                    this._removePrimaryTrack = null;
                }
                if (isFunction(this._removeSecondaryTrack)) {
                    this._removeSecondaryTrack();
                    this._removeSecondaryTrack = null;
                }
            }
            if (this._isSwipe && isFunction(this._removeSwipeOpen)) {
                this._removeSwipeOpen();
                this._removeSwipeOpen = null;
            }
        };
        /**
         * Log when the user touches the DrawerController.
         * @param {plat.ui.IGestureEvent} ev The touch event.
         */
        DrawerController.prototype._touchStart = function (ev) {
            if (this._touchState === 1) {
                return;
            }
            if (!this.utils.isNull(this._animationThenable)) {
                this._animationThenable.cancel();
            }
            this._initTouch(ev);
        };
        /**
         * Indicates touch is in progress and sets the initial touch point
         * when the user touches the DrawerController.
         * @param {plat.ui.IGestureEvent} ev The touch event.
         */
        DrawerController.prototype._initTouch = function (ev) {
            this._touchState = 1;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
            if (this._isOpen) {
                return;
            }
            this._drawerElement.removeAttribute(__Hide);
            this.dom.addClass(this._rootElement, this._directionalTransitionPrep);
        };
        /**
         * The $touchend and $trackend event handler.
         * @param {plat.ui.IGestureEvent} ev The touch event.
         */
        DrawerController.prototype._touchEnd = function (ev) {
            var noTouch = this._touchState !== 1, hasSwiped = this._hasSwiped, hasTapped = this._hasTapped;
            this._hasSwiped = this._hasTapped = false;
            if (hasTapped || noTouch || hasSwiped) {
                this._touchState = 0;
                return;
            }
            this._touchState = 2;
            var distanceMoved = this._isVertical ? ev.clientY - this._lastTouch.y : ev.clientX - this._lastTouch.x;
            if (this._isRightDirection(distanceMoved)) {
                var offset = this._getOffset();
                if (!offset) {
                    return;
                }
                else if (Math.abs(distanceMoved) > Math.ceil(offset / 2)) {
                    this.toggle();
                    return;
                }
                this.reset();
            }
            else if (this._isElastic) {
                if (Math.abs(distanceMoved) > 0) {
                    this.reset();
                }
            }
            else if (!this._isOpen) {
                this._drawerElement.setAttribute(__Hide, '');
                this.dom.removeClass(this._rootElement, this._directionalTransitionPrep);
            }
        };
        /**
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions
         * depending on the defined position.
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         */
        DrawerController.prototype._track = function (ev) {
            var _this = this;
            if (this._touchState === 0) {
                return;
            }
            this.utils.requestAnimationFrame(function () {
                _this._rootElement.style[_this._transform] = _this._calculateTranslation(ev);
            });
        };
        /**
         * Checks to make sure the user has been tracking in the right direction to
         * toggle.
         * @param {number} distanceMoved The distance the user's pointer has moved.
         */
        DrawerController.prototype._isRightDirection = function (distanceMoved) {
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
        };
        /**
         * Calculates the translation value for setting the transform value.
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         */
        DrawerController.prototype._calculateTranslation = function (ev) {
            var offset = this._getOffset(), distanceMoved;
            if (!offset) {
                return 'translate3d(0,0,0)';
            }
            switch (this._position) {
                case 'left':
                    distanceMoved = this._checkElasticity(offset, ev.clientX - this._lastTouch.x);
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                case 'right':
                    distanceMoved = this._checkElasticity(offset, this._lastTouch.x - ev.clientX);
                    return 'translate3d(' + (-distanceMoved) + 'px,0,0)';
                case 'top':
                    distanceMoved = this._checkElasticity(offset, ev.clientY - this._lastTouch.y);
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'bottom':
                    distanceMoved = this._checkElasticity(offset, this._lastTouch.y - ev.clientY);
                    return 'translate3d(0,' + (-distanceMoved) + 'px,0)';
                default:
                    return this._preTransform;
            }
        };
        /**
         * Checks for elasticity and potentially readjusts the user's
         * distance moved.
         * @param {number} maxOffset The maximum distance the corresponding Drawer can translate.
         * @param {number} delta The distance the user's finger moved.
         */
        DrawerController.prototype._checkElasticity = function (maxOffset, delta) {
            var distanceMoved = this._isOpen ? maxOffset + delta : delta;
            if (this._isElastic) {
                return distanceMoved;
            }
            if (distanceMoved < 0) {
                distanceMoved = 0;
            }
            else if (distanceMoved > maxOffset) {
                distanceMoved = maxOffset;
            }
            return distanceMoved;
        };
        /**
         * Initializes and dispatches pub sub events.
         * @param {string} id The ID of this DrawerController if used.
         * @param {string} position The position of the Drawer.
         */
        DrawerController.prototype._initializeEvents = function (id, position) {
            var _this = this;
            var useContext = this._useContext, eventRemover = this.on(__DrawerFoundEvent + '_' + id, function (event, drawerArg) {
                eventRemover();
                var _utils = _this.utils, isString = _utils.isString, isUndefined = _utils.isUndefined, drawer = (_this._drawer = drawerArg.control) || {}, drawerElement = _this._drawerElement = drawer.element;
                if (!isString(position)) {
                    if (isString(drawerArg.position)) {
                        position = drawerArg.position;
                    }
                    else {
                        var _Exception = _this._Exception;
                        _Exception.warn('"position" is incorrectly defined for a control such as "' +
                            __Drawer + '" or "' + _this.type + '."' +
                            ' Please ensure it is a string.', _Exception.CONTROL);
                        return;
                    }
                }
                if (!_this._controllerIsValid(position.toLowerCase())) {
                    return;
                }
                _this._setTransform();
                _this._addEventListeners();
                if (isUndefined(_this._isElastic)) {
                    _this._isElastic = drawerArg.elastic === true;
                }
                if (!drawerArg.received) {
                    _this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                        control: _this,
                        received: true,
                        position: position,
                        useContext: useContext
                    });
                }
                if (!useContext) {
                    _this._isInitialized = true;
                    _this._checkPreInit();
                    return;
                }
                _this._determineTemplate(drawerArg.template).then(function () {
                    _this._isInitialized = true;
                    _this._checkPreInit();
                });
            });
            this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                control: this,
                received: false,
                position: position,
                useContext: useContext
            });
        };
        /**
         * Checks the pre-initialized value and handles accordingly.
         */
        DrawerController.prototype._checkPreInit = function () {
            var _this = this;
            if (this._preInitializedValue) {
                this._toggleDelay = this.utils.postpone(function () {
                    _this._touchState = 0;
                    _this._toggleDelay = null;
                    _this._open();
                });
            }
        };
        /**
         * Determines the proper HTML template, binds it, and inserts it if needed.
         * @param {Node} fragment? A Node to insert as the Drawer's HTML template
         * if no templateUrl is present on this DrawerController.
         */
        DrawerController.prototype._determineTemplate = function (fragment) {
            var _this = this;
            var _utils = this.utils;
            if (_utils.isString(this._templateUrl)) {
                return plat.ui.TemplateControl.determineTemplate(this, this._templateUrl).then(function (template) {
                    return _this.bindTemplate('drawer', template);
                });
            }
            else if (_utils.isNode(fragment)) {
                return this.bindTemplate('drawer', fragment);
            }
            return this._Promise.resolve();
        };
        /**
         * Obtains the current browser's transform property value.
         */
        DrawerController.prototype._setTransform = function () {
            var style = this._rootElement.style, isUndefined = this.utils.isUndefined;
            var vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(this._preTransform = style[(vendorPrefix.lowerCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
            else if (!isUndefined(this._preTransform = style[(vendorPrefix.upperCase + 'Transform')])) {
                this._transform = vendorPrefix.upperCase + 'Transform';
            }
            else {
                this._transform = 'transform';
            }
        };
        /**
         * Checks if this control has all valid properties.
         * @param {string} position The position of the Drawer.
         */
        DrawerController.prototype._controllerIsValid = function (position) {
            var _this = this;
            var isNull = this.utils.isNull, _Exception;
            if (isNull(this._drawerElement)) {
                _Exception = this._Exception;
                _Exception.warn('Could not find a corresponding control such as "' + __Drawer +
                    '" for this "' + this.type + '."', _Exception.CONTROL);
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
                    _Exception = this._Exception;
                    _Exception.warn('Incorrect position: "' + position +
                        '" defined for the a control such as "' +
                        __Drawer + '", or "' + this.type + '."', _Exception.CONTROL);
                    return false;
            }
            var rootElement = this._rootElement = this._getRootElement();
            if (isNull(rootElement)) {
                _Exception = this._Exception;
                _Exception.warn('Cannot have a "' + this.type +
                    '" in a hierarchy above the corresponding control such as "' + __Drawer + '."', _Exception.CONTROL);
                return false;
            }
            this._clickEater = this._document.createElement('div');
            this._clickEater.className = 'plat-clickeater';
            this.dom.addClass(rootElement, 'plat-drawer-transition-prep');
            this._directionalTransitionPrep = 'plat-drawer-transition-' + position;
            this._disposeRemover = this.on(__DrawerControllerDisposing, function () {
                _this.dispatchEvent(__DrawerControllerDisposingFound, plat.events.EventManager.DIRECT, rootElement);
            });
            return true;
        };
        /**
         * Obtains the root element to translate.
         */
        DrawerController.prototype._getRootElement = function () {
            var drawer = this._drawer, _utils = this.utils;
            if (!_utils.isNull(drawer.storedProperties)) {
                return drawer.storedProperties.rootElement;
            }
            var isNode = _utils.isNode, root = this.root, element = _utils.isObject(root) && isNode(root.element) ? root.element : this.element, drawerEl = this._drawerElement, parent;
            while (isNode(parent = element.parentElement) && !parent.contains(drawerEl)) {
                element = parent;
            }
            var _window = this._window, computedStyle = _window.getComputedStyle(element), style = element.style, position = computedStyle.position, zIndex = Number(computedStyle.zIndex), rootElementStyle = {
                rootElement: element
            };
            if (position === 'static') {
                rootElementStyle.position = style.position;
                style.position = 'relative';
            }
            if (!_utils.isNumber(zIndex) || zIndex < 1) {
                rootElementStyle.zIndex = style.zIndex;
                style.zIndex = '1';
            }
            if (isNode(parent)) {
                var parentStyle = parent.style, overflow = parentStyle.overflow;
                if (overflow !== 'hidden') {
                    var computedParentStyle = _window.getComputedStyle(parent), computedOverflow = computedParentStyle.overflow, computedDirectionalOverflow, key;
                    if (this._isVertical) {
                        key = 'overflowY';
                        computedDirectionalOverflow = computedParentStyle.overflowY;
                    }
                    else {
                        key = 'overflowX';
                        computedDirectionalOverflow = computedParentStyle.overflowX;
                    }
                    if (computedDirectionalOverflow !== 'hidden') {
                        rootElementStyle.parentOverflow = {
                            key: key,
                            value: parentStyle[key]
                        };
                        parentStyle[key] = 'hidden';
                    }
                }
            }
            drawer.storedProperties = rootElementStyle;
            return element;
        };
        /**
         * Sets the max offset to translate the corresponding Drawer.
         */
        DrawerController.prototype._getOffset = function () {
            var drawerElement = this._drawerElement, hasAttribute = drawerElement.hasAttribute(__Hide);
            if (drawerElement.hasAttribute(__Hide)) {
                drawerElement.removeAttribute(__Hide);
                var offset = this._isVertical ? drawerElement.offsetHeight : drawerElement.offsetWidth;
                drawerElement.setAttribute(__Hide, '');
                return offset;
            }
            return this._isVertical ? drawerElement.offsetHeight : drawerElement.offsetWidth;
        };
        DrawerController._inject = {
            _document: __Document,
            _window: __Window,
            _compat: __Compat,
            _animator: __Animator,
            _Promise: __Promise
        };
        return DrawerController;
    })(plat.ui.BindControl);
    platui.DrawerController = DrawerController;
    plat.register.control(__DrawerController, DrawerController);
    /**
     * An BindControl for showing a templated and animated overlay.
     */
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-modal-container"></div>\n';
            /**
             * Whether or not the modal is currently visible.
             */
            this._isVisible = false;
            /**
             * A function to stop listening to scroll events.
             */
            this._scrollRemover = noop;
            /**
             * The current scroll position of the modal.
             */
            this._scrollTop = 0;
            /**
             * A hash for validating available transitions.
             */
            this._transitionHash = {
                up: true,
                down: true,
                left: true,
                right: true,
                fade: true
            };
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Modal.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Modal + ' ' + __Hide + ' ' + (className || ''));
        };
        /**
         * Check for templateUrl and set if needed then hide the control.
         */
        Modal.prototype.initialize = function () {
            var optionObj = this.options || (this.options = {}), options = optionObj.value || (optionObj.value = {});
            this.templateUrl = options.templateUrl;
            this.setClasses();
        };
        /**
         * Add the innerTemplate to the control's element.
         */
        Modal.prototype.setTemplate = function () {
            var _utils = this.utils, modalContainer;
            if (_utils.isString(this.templateUrl)) {
                var dom = this.dom, fragment = dom.serializeHtml(this.templateString), element = this.element;
                modalContainer = this._container = fragment.firstChild;
                this.innerTemplate = dom.appendChildren(element.childNodes);
                element.appendChild(fragment);
            }
        };
        /**
         * Check for a transition and initialize it if necessary.
         */
        Modal.prototype.loaded = function () {
            var options = this.options.value, transition = options.transition, _Exception;
            // in case of cloning 
            this._container = this._container || this.element.firstElementChild;
            this._injectElement();
            if (!this.utils.isString(transition) || transition === 'none') {
                this.dom.addClass(this._container, __Plat + 'no-transition');
                return;
            }
            else if (!this._transitionHash[transition]) {
                _Exception = this._Exception;
                _Exception.warn('Custom transition: "' + transition + '" defined for "' + this.type +
                    '." Please ensure the transition is defined to avoid errors.', _Exception.CONTROL);
            }
            var animationEvents = this._compat.animationEvents;
            if (this.utils.isNull(animationEvents)) {
                _Exception = this._Exception;
                _Exception.warn('This browser does not support CSS3 animations.', _Exception.COMPAT);
                this.dom.addClass(this._container, __Plat + 'no-transition');
                return;
            }
            this._transitionEnd = animationEvents.$transitionEnd;
            this.dom.addClass(this._container, __Plat + transition + ' ' + __Plat + 'modal-transition');
        };
        /**
         * Clean up the auto scroll.
         */
        Modal.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._scrollRemover();
        };
        /**
         * Shows the Modal.
         */
        Modal.prototype.show = function () {
            var wasHidden = !this._isVisible, promise = this._show();
            if (wasHidden) {
                this.inputChanged(true);
            }
            return promise;
        };
        /**
         * Hides the Modal.
         */
        Modal.prototype.hide = function () {
            var wasVisible = this.isVisible, promise = this._hide();
            if (wasVisible) {
                this.inputChanged(false);
            }
            return promise;
        };
        /**
         * Toggles the visibility of the Modal.
         */
        Modal.prototype.toggle = function () {
            if (this._isVisible) {
                return this.hide();
            }
            return this.show();
        };
        /**
         * Whether or not the Modal is currently visible.
         */
        Modal.prototype.isVisible = function () {
            return this._isVisible;
        };
        /**
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        Modal.prototype.observeProperties = function (binder) {
            binder.observeProperty(this._setBoundProperty);
        };
        /**
         * The function called when the bindable property is set externally.
         * @param {boolean} modalState The new value of the control state.
         * @param {boolean} oldValue The old value of the control state.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         */
        Modal.prototype._setBoundProperty = function (modalState, oldValue, identifier, firstTime) {
            var _utils = this.utils;
            if (firstTime === true && _utils.isNull(modalState)) {
                this.inputChanged(this._isVisible);
                return;
            }
            if (_utils.isBoolean(modalState)) {
                if (modalState) {
                    if (this._isVisible) {
                        return;
                    }
                    this._show();
                    return;
                }
                if (this._isVisible) {
                    this._hide();
                }
                return;
            }
            var _Exception = this._Exception;
            _Exception.warn('Attempting to show or hide a ' + this.type +
                ' with a bound value that is something other than a boolean.', _Exception.BIND);
        };
        /**
         * Shows the Modal.
         */
        Modal.prototype._show = function () {
            var _this = this;
            var dom = this.dom, utils = this.utils;
            if (!utils.isNull(this.innerTemplate)) {
                return this._bindInnerTemplate();
            }
            this._isVisible = true;
            return new this._Promise(function (resolve) {
                utils.requestAnimationFrame(function () {
                    _this._alignModal();
                    dom.removeClass(_this.element, __Hide);
                    utils.defer(function () {
                        utils.requestAnimationFrame(function () {
                            dom.addClass(_this._container, __Plat + 'activate');
                            resolve();
                        });
                    }, 20);
                });
            });
        };
        /**
         * Aligns the control to the top of the viewport.
         * @param {Event} ev? The scroll event object.
         */
        Modal.prototype._alignModal = function (ev) {
            var _this = this;
            var utils = this.utils, isNull = utils.isNull, _document = this._document, documentEl = _document.documentElement, scrollEl = isNull(documentEl) || !documentEl.scrollTop ? _document.body : documentEl, scrollTop = scrollEl.scrollTop;
            if (this._scrollTop === scrollTop) {
                return;
            }
            if (!isNull(ev)) {
                utils.requestAnimationFrame(function () {
                    _this.element.style.top = scrollTop + 'px';
                });
            }
            else {
                this.element.style.top = scrollTop + 'px';
                this._scrollRemover = this.addEventListener(this._window, 'scroll', this._alignModal, false);
            }
            this._scrollTop = scrollTop;
        };
        /**
         * Hides the Modal.
         */
        Modal.prototype._hide = function () {
            var _this = this;
            var dom = this.dom, utils = this.utils, promise;
            this._scrollRemover();
            this._scrollRemover = noop;
            this._isVisible = false;
            if (utils.isString(this._transitionEnd)) {
                promise = this._addHideOnTransitionEnd();
                utils.requestAnimationFrame(function () {
                    dom.removeClass(_this._container, __Plat + 'activate');
                });
            }
            else {
                promise = new this._Promise(function (resolve) {
                    utils.requestAnimationFrame(function () {
                        dom.addClass(_this.element, __Hide);
                        dom.removeClass(_this._container, __Plat + 'activate');
                        resolve();
                    });
                });
            }
            return promise;
        };
        /**
         * Adds the innerTemplate to BindableTemplates, binds it,
         * and adds it to the DOM.
         */
        Modal.prototype._bindInnerTemplate = function () {
            var _this = this;
            var innerTemplate = this.innerTemplate, bindableTemplates = this.bindableTemplates, modal = 'modal';
            bindableTemplates.add(modal, innerTemplate);
            this.innerTemplate = null;
            return bindableTemplates.bind(modal).then(function (template) {
                _this._container.insertBefore(template, null);
                return _this._show();
            });
        };
        /**
         * Removes itself from the DOM and inserts itself into the body to work with
         * absolute positioning.
         */
        Modal.prototype._injectElement = function () {
            var element = this.element, parentElement = element.parentElement, body = this._document.body;
            if (!this.utils.isNode(parentElement) || parentElement === body) {
                return;
            }
            body.insertBefore(element, null);
        };
        /**
         * Listens for the transition to end and hides the element after it is finished.
         */
        Modal.prototype._addHideOnTransitionEnd = function () {
            var _this = this;
            return new this._Promise(function (resolve) {
                var element = _this.element, remove = _this.addEventListener(element, _this._transitionEnd, function () {
                    remove();
                    _this.dom.addClass(element, __Hide);
                    resolve();
                }, false);
            });
        };
        Modal._inject = {
            _window: __Window,
            _document: __Document,
            _compat: __Compat,
            _Promise: __Promise
        };
        return Modal;
    })(plat.ui.BindControl);
    platui.Modal = Modal;
    plat.register.control(__Modal, Modal);
    /**
     * An BindControl that standardizes an HTML5 input[type="range"].
     */
    var Slider = (function (_super) {
        __extends(Slider, _super);
        function Slider() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-slider-container">\n' +
                '    <div class="plat-slider-track">\n' +
                '        <div class="plat-knob"></div>\n' +
                '    </div>\n' +
                '</div>\n';
            /**
             * Whether the control is vertical or horizontal.
             */
            this._isVertical = false;
            /**
             * The current knob offset.
             */
            this._knobOffset = 0;
            /**
             * An enum denoting the current touch state of the user.
             */
            this._touchState = 0;
            /**
             * The current number of times we checked to see if the element was placed into the DOM.
             * Used for determining max offset width.
             */
            this._cloneAttempts = 0;
            /**
             * The max number of times we'll check to see if the element was placed into the DOM.
             * Used for determining max offset width.
             */
            this._maxCloneAttempts = 25;
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Slider.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Slider + ' ' + (className || ''));
        };
        /**
         * Set the proper classes for the control.
         */
        Slider.prototype.initialize = function () {
            this.setClasses();
        };
        /**
         * Determine the button type and apply the proper classes.
         */
        Slider.prototype.loaded = function () {
            var element = this.element, slider = this._slider = element.firstElementChild.firstElementChild, isNumber = this.utils.isNumber, optionObj = this.options || {}, options = optionObj.value || {}, optionValue = Number(options.value), optionMin = options.min, optionMax = options.max, step = options.step, reversed = this._reversed = (options.reverse === true), min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0, max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100, value = isNumber(optionValue) ? Math.round(optionValue) : min, className = __Plat + this._validateOrientation(options.orientation);
            this._knob = slider.firstElementChild;
            if (reversed) {
                className += __Reversed;
            }
            this.dom.addClass(element, className);
            // reset value to minimum in case Bind set it to a value 
            this.value = min;
            this._step = isNumber(step) ? (step > 0 ? Math.round(step) : 1) : 1;
            if (min >= max) {
                var _Exception = this._Exception;
                _Exception.warn('"' + this.type + '\'s" min is greater than or equal to its max. Setting max to min + 1.', _Exception.CONTROL);
                this.max = min + 1;
            }
            this._setLength();
            this._initializeEvents();
            this.setValue(value);
        };
        /**
         * Set the value of the Slider. If an invalid value is passed in
         * nothing will happen.
         * @param {number} value The value to set the Slider to.
         */
        Slider.prototype.setValue = function (value) {
            this._setValue(value, true);
        };
        /**
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        Slider.prototype.observeProperties = function (binder) {
            binder.observeProperty(this._setBoundProperty);
        };
        /**
         * The function called when the bindable value is set externally.
         * @param {number} newValue The new value of the bindable value.
         * @param {number} oldValue The old value of the bindable index.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         */
        Slider.prototype._setBoundProperty = function (newValue, oldValue, identifier, firstTime) {
            if (firstTime === true && this.utils.isNull(newValue)) {
                this.inputChanged(this.value);
                return;
            }
            this._setValue(newValue, false);
        };
        /**
         * Sets the value of the Slider.
         * @param {number} value The value to set.
         * @param {boolean} propertyChanged Whether or not we need to fire a propertyChanged event.
         */
        Slider.prototype._setValue = function (value, propertyChanged) {
            var _utils = this.utils;
            if (this._touchState === 1) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set the value of ' + this.type +
                    ' while the user is manipulating it.', _Exception.CONTROL);
                return;
            }
            else if (_utils.isNull(value)) {
                value = this.min;
            }
            else if (!_utils.isNumber(value)) {
                return;
            }
            this._setValueProperty(value, true, propertyChanged);
        };
        /**
         * Initialize the proper tracking events.
         */
        Slider.prototype._initializeEvents = function () {
            var _this = this;
            var element = this.element, trackFn = this._track, touchEnd = this._touchEnd, track, reverseTrack;
            if (this._isVertical) {
                track = __$track + 'down';
                reverseTrack = __$track + 'up';
            }
            else {
                track = __$track + 'right';
                reverseTrack = __$track + 'left';
            }
            this.addEventListener(element, __$touchstart, this._touchStart, false);
            this.addEventListener(element, track, trackFn, false);
            this.addEventListener(element, reverseTrack, trackFn, false);
            this.addEventListener(element, __$touchend, touchEnd, false);
            this.addEventListener(element, __$trackend, touchEnd, false);
            this.addEventListener(this._window, 'resize', function () {
                _this._setLength();
                _this._setKnob();
            }, false);
        };
        /**
         * Log the first touch.
         * @param {plat.ui.IGestureEvent} ev The touch event object.
         */
        Slider.prototype._touchStart = function (ev) {
            var _this = this;
            if (this._touchState === 1) {
                return;
            }
            this._touchState = 1;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY,
                value: this.value
            };
            var target = ev.target;
            if (target === this._knob) {
                return;
            }
            var offset;
            if (this._isVertical) {
                if (target === this.element) {
                    offset = this._reversed ? ev.offsetY - this._sliderOffset : this._maxOffset - (ev.offsetY - this._sliderOffset);
                }
                else if (target === this._slider) {
                    offset = this._reversed ? ev.offsetY : this._knobOffset - ev.offsetY;
                }
                else {
                    offset = this._reversed ? ev.offsetY : this._maxOffset - ev.offsetY;
                }
            }
            else {
                if (target === this.element) {
                    offset = this._reversed ? this._maxOffset - (ev.offsetX - this._sliderOffset) : ev.offsetX - this._sliderOffset;
                }
                else if (target === this._slider) {
                    offset = this._reversed ? this._knobOffset - ev.offsetX : ev.offsetX;
                }
                else {
                    offset = this._reversed ? this._maxOffset - ev.offsetX : ev.offsetX;
                }
            }
            this.utils.requestAnimationFrame(function () {
                _this._knobOffset = _this._setSliderProperties(offset);
            });
        };
        /**
         * Set the new slider offset.
         * @param {plat.ui.IGestureEvent} ev The $trackend event object.
         */
        Slider.prototype._touchEnd = function (ev) {
            var _this = this;
            if (this._touchState !== 1) {
                this._touchState = 0;
                return;
            }
            this._touchState = 2;
            var newOffset = this._calculateOffset(ev), maxOffset = this._maxOffset;
            this.utils.requestAnimationFrame(function () {
                _this._touchState = 0;
                if (_this._lastTouch.value !== _this.value) {
                    _this._trigger('change');
                }
                if (newOffset < 0) {
                    _this._knobOffset = 0;
                    return;
                }
                else if (newOffset > maxOffset) {
                    _this._knobOffset = maxOffset;
                    return;
                }
                _this._knobOffset = newOffset;
            });
        };
        /**
         * Track the knob movement.
         * @param {plat.ui.IGestureEvent} ev The $track event object.
         */
        Slider.prototype._track = function (ev) {
            var _this = this;
            if (this._touchState === 0) {
                return;
            }
            this.utils.requestAnimationFrame(function () {
                _this._setSliderProperties(_this._calculateOffset(ev));
            });
        };
        /**
         * Set the Slider's knob position and corresponding value.
         * @param {number} position The position value to set the knob to prior to
         * normalization.
         */
        Slider.prototype._setSliderProperties = function (position) {
            var maxOffset = this._maxOffset, value;
            if (position <= 0) {
                value = this.min;
                if (value - this.value >= 0) {
                    return;
                }
                position = 0;
            }
            else if (position >= maxOffset) {
                value = this.max;
                if (value - this.value <= 0) {
                    return;
                }
                position = maxOffset;
            }
            else {
                value = this._calculateValue(position);
            }
            this._setValueProperty(value, false, true);
            this._slider.style[this._lengthProperty] = position + 'px';
            return position;
        };
        /**
         * Calculates the current value based on knob position and slider width.
         * @param {number} width The current width of the slider.
         */
        Slider.prototype._calculateValue = function (width) {
            var step = this._step;
            return (this.min + Math.round(width / this._increment / step) * step);
        };
        /**
         * Calculates knob position based on current value.
         * @param {number} value The current value of the {link platui.Slider|Slider}.
         */
        Slider.prototype._calculateKnobPosition = function (value) {
            return (value - this.min) * this._increment;
        };
        /**
         * Calculates the new offset of the slider based on the old offset and the distance moved.
         * @param {plat.ui.IGestureEvent} ev The $track or $trackend event object.
         */
        Slider.prototype._calculateOffset = function (ev) {
            if (this._isVertical) {
                return this._reversed ?
                    (this._knobOffset + ev.clientY - this._lastTouch.y) :
                    (this._knobOffset + this._lastTouch.y - ev.clientY);
            }
            else {
                return this._reversed ?
                    (this._knobOffset + this._lastTouch.x - ev.clientX) :
                    (this._knobOffset + ev.clientX - this._lastTouch.x);
            }
        };
        /**
         * Sets the property to use for length and sets the max length of the slider.
         * @param {HTMLElement} element? The element to use to obtain the max length.
         */
        Slider.prototype._setLength = function (element) {
            var isNode = this.utils.isNode(element), el = isNode ? element : this._slider.parentElement;
            if (this._isVertical) {
                this._lengthProperty = 'height';
                this._maxOffset = el.offsetHeight;
                this._sliderOffset = el.offsetTop;
            }
            else {
                this._lengthProperty = 'width';
                this._maxOffset = el.offsetWidth;
                this._sliderOffset = el.offsetLeft;
            }
            if (!(isNode || this._maxOffset)) {
                this._setOffsetWithClone(this._lengthProperty);
                return;
            }
            this._setIncrement();
        };
        /**
         * Sets the increment for sliding the {link platui.Slider|Slider}.
         */
        Slider.prototype._setIncrement = function () {
            return (this._increment = this._maxOffset / (this.max - this.min));
        };
        /**
         * Sets the value of the Slider.
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * @param {boolean} propertyChanged Whether or not we need to fire a propertyChanged event.
         */
        Slider.prototype._setValueProperty = function (newValue, setKnob, propertyChanged) {
            var value = this.value;
            if (newValue === value) {
                return;
            }
            else if (newValue >= this.max) {
                newValue = this.max;
            }
            else if (newValue <= this.min) {
                newValue = this.min;
            }
            else if (Math.abs(newValue - value) < this._step) {
                return;
            }
            this.value = this.element.value = newValue;
            if (setKnob) {
                this._setKnob();
            }
            if (propertyChanged) {
                this.inputChanged(newValue, value);
            }
            this._trigger('input');
        };
        /**
         * Animates and sets the knob position.
         * @param {number} value? The value to use to calculate the knob position. If no value is
         * specified, the current Slider's value will be used.
         */
        Slider.prototype._setKnob = function (value) {
            var animationOptions = {}, length = this._calculateKnobPosition((value || this.value));
            if (length === this._knobOffset) {
                return;
            }
            animationOptions[this._lengthProperty] = length + 'px';
            this._animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._knobOffset = length;
        };
        /**
         * Triggers an event starting from this control's element.
         * @param {string} event The event name to trigger.
         */
        Slider.prototype._trigger = function (event) {
            var domEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
            domEvent.trigger();
        };
        /**
         * Checks the orientation of the control and ensures it is valid.
         * Will default to "horizontal" if invalid.
         * @param {string} orientation The element to base the length off of.
         */
        Slider.prototype._validateOrientation = function (orientation) {
            if (this.utils.isUndefined(orientation)) {
                return 'horizontal';
            }
            var validOrientation;
            if (orientation === 'horizontal') {
                validOrientation = orientation;
            }
            else if (orientation === 'vertical') {
                validOrientation = orientation;
                this._isVertical = true;
            }
            else {
                var _Exception = this._Exception;
                _Exception.warn('Invalid orientation "' + orientation + '" for ' + this.type + '. Defaulting to "horizontal."', _Exception.CONTROL);
                validOrientation = 'horizontal';
            }
            return validOrientation;
        };
        /**
         * Creates a clone of this element and uses it to find the max offset.
         * @param {string} dependencyProperty The property that the offset is being based off of.
         */
        Slider.prototype._setOffsetWithClone = function (dependencyProperty) {
            var element = this.element, body = this._document.body, _Exception;
            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var controlType = this.type;
                    _Exception = this._Exception,
                        _Exception.warn('Max clone attempts reached before the ' + controlType + ' was placed into the ' +
                            'DOM. Disposing of the ' + controlType + '.', _Exception.CONTROL);
                    plat.acquire(__TemplateControlFactory).dispose(this);
                    return;
                }
                this.utils.defer(this._setOffsetWithClone, 20, [dependencyProperty], this);
                return;
            }
            var hasDeferred = this._cloneAttempts > 0;
            this._cloneAttempts = 0;
            var clone = element.cloneNode(true), regex = /\d+(?!\d+|%)/, _window = this._window, parentChain = [], shallowCopy = clone, computedStyle, important = 'important', isNull = this.utils.isNull, dependencyValue;
            shallowCopy.id = '';
            while (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', important);
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, important);
                element = element.parentElement;
                if (isNull(element)) {
                    // if we go all the way up to <html> the body may currently be hidden. 
                    _Exception = this._Exception,
                        _Exception.warn('The document\'s body contains a ' + this.type + ' that needs its length and is currently ' +
                            'hidden. Please do not set the body\'s display to none.', _Exception.CONTROL);
                    this.utils.defer(this._setOffsetWithClone, 100, [dependencyProperty], this);
                    return;
                }
                shallowCopy = element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }
            if (parentChain.length > 0) {
                var curr = parentChain.pop(), currStyle = curr.style, temp;
                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }
                curr.insertBefore(clone, null);
            }
            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, important);
            shallowStyle.setProperty('visibility', 'hidden', important);
            body.appendChild(shallowCopy);
            this._setLength(clone.firstElementChild);
            body.removeChild(shallowCopy);
            if (hasDeferred) {
                this._setKnob();
            }
        };
        Slider._inject = {
            _document: __Document,
            _window: __Window,
            _animator: __Animator
        };
        return Slider;
    })(plat.ui.BindControl);
    platui.Slider = Slider;
    plat.register.control(__Slider, Slider);
    /**
     * A BindControl that allows for a lower and upper value,
     * thus creating a variable range of included values.
     */
    var Range = (function (_super) {
        __extends(Range, _super);
        function Range() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-range-container">\n' +
                '    <div class="plat-range-track">\n' +
                '        <div class="plat-lower-knob"></div>\n' +
                '        <div class="plat-upper-knob"></div>\n' +
                '    </div>\n' +
                '</div>\n';
            /**
             * Whether the control is vertical or horizontal.
             */
            this._isVertical = false;
            /**
             * An enum denoting the current touch state of the user.
             */
            this._touchState = 0;
            /**
             * The current number of times we checked to see if the element was placed into the DOM.
             * Used for determining max offset width.
             */
            this._cloneAttempts = 0;
            /**
             * The max number of times we'll check to see if the element was placed into the DOM.
             * Used for determining max offset width.
             */
            this._maxCloneAttempts = 25;
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Range.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Range + ' ' + (className || ''));
        };
        /**
         * Set the proper classes for the control.
         */
        Range.prototype.initialize = function () {
            this.setClasses();
        };
        /**
         * Determine the button type and apply the proper classes.
         */
        Range.prototype.loaded = function () {
            var element = this.element, slider = this._slider = element.firstElementChild.firstElementChild, _utils = this.utils, isNumber = _utils.isNumber, optionObj = this.options || {}, options = optionObj.value || {}, optionLower = Number(options.lower), optionUpper = Number(options.upper), identifiers = options.identifiers || {}, optionMin = options.min, optionMax = options.max, step = options.step, reversed = this._reversed = (options.reverse === true), min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0, max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100, lower = isNumber(optionLower) ? Math.round(optionLower) : min, upper = isNumber(optionUpper) ? Math.round(optionUpper) : max, className = __Plat + this._validateOrientation(options.orientation), _Exception;
            this._lowerKnob = slider.firstElementChild;
            this._upperKnob = slider.lastElementChild;
            this._lowerIdentifier = identifiers.lower || 'lower';
            this._upperIdentifier = identifiers.upper || 'upper';
            // if it's a reversed direction, swap knobs. 
            if (reversed) {
                var lowerKnob = this._lowerKnob;
                this._lowerKnob = this._upperKnob;
                this._upperKnob = lowerKnob;
                className += __Reversed;
            }
            this.dom.addClass(element, className);
            // reset value to minimum in case context is already set to a value 
            this.lower = min;
            this.upper = max;
            this._step = isNumber(step) ? (step > 0 ? Math.round(step) : 1) : 1;
            if (min >= max) {
                _Exception = this._Exception;
                _Exception.warn('"' + this.type + '\'s" min is greater than or equal to its max. Setting max to min + 1.', _Exception.CONTROL);
                this.max = min + 1;
            }
            this._setPositionAndLength();
            this._setLowerKnobPosition(min);
            this._initializeEvents();
            this.setLower(lower);
            this.setUpper(upper);
        };
        /**
         * Sets the lower value of the Range. If an invalid value is passed in
         * nothing will happen.
         * @param {number} value The value to set the Range to.
         */
        Range.prototype.setLower = function (value) {
            this._setLower(value, true);
        };
        /**
         * Sets the upper value of the Range. If an invalid value is passed in
         * nothing will happen.
         * @param {number} value The value to set the Range to.
         */
        Range.prototype.setUpper = function (value) {
            this._setUpper(value, true);
        };
        /**
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        Range.prototype.observeProperties = function (binder) {
            binder.observeProperty(this._setLowerBoundProperty, this._lowerIdentifier);
            binder.observeProperty(this._setUpperBoundProperty, this._upperIdentifier);
        };
        /**
         * The function called when the bindable lower value is set externally.
         * @param {number} newValue The new lower value.
         * @param {number} oldValue The old value of the bindable index.
         * @param {string} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         */
        Range.prototype._setLowerBoundProperty = function (newValue, oldValue, identifier, firstTime) {
            if (firstTime === true && this.utils.isNull(newValue)) {
                this._fireChange();
            }
            this._setLower(newValue, false);
        };
        /**
         * The function called when the bindable upper value is set externally.
         * @param {number} newValue The new upper value.
         * @param {number} oldValue The old value of the bindable index.
         * @param {string} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         */
        Range.prototype._setUpperBoundProperty = function (newValue, oldValue, identifier, firstTime) {
            if (firstTime === true && this.utils.isNull(newValue)) {
                this._fireChange();
            }
            this._setUpper(newValue, false);
        };
        /**
         * Sets the lower value of the Range. If an invalid value is passed in
         * nothing will happen.
         * @param {number} value The value to set the Range to.
         * @param {boolean} propertyChanged Whether or not the property was changed by the user.
         */
        Range.prototype._setLower = function (value, propertyChanged) {
            var _utils = this.utils;
            if (this._touchState === 2) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set the value of the ' + this.type +
                    '\'s lower knob while the user is manipulating it.', _Exception.CONTROL);
                return;
            }
            else if (_utils.isNull(value)) {
                value = this.min;
            }
            if (!_utils.isNumber(value)) {
                var numberVal = Number(value);
                if (_utils.isNumber(numberVal)) {
                    value = numberVal;
                }
                else {
                    return;
                }
            }
            this._setLowerValue(value, true, propertyChanged, true);
        };
        /**
         * Sets the uppper value of the Range. If an invalid value is passed in
         * nothing will happen.
         * @param {number} value The value to set the Range to.
         * @param {boolean} propertyChanged Whether or not the property was changed by the user.
         */
        Range.prototype._setUpper = function (value, propertyChanged) {
            var _utils = this.utils;
            if (this._touchState === 3) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set the upper value of the ' + this.type +
                    '\'s upper knob while the user is manipulating it.', _Exception.CONTROL);
                return;
            }
            else if (_utils.isNull(value)) {
                value = this.max;
            }
            if (!_utils.isNumber(value)) {
                var numberVal = Number(value);
                if (_utils.isNumber(numberVal)) {
                    value = numberVal;
                }
                else {
                    return;
                }
            }
            this._setUpperValue(value, true, propertyChanged, true);
        };
        /**
         * Initialize the proper tracking events.
         */
        Range.prototype._initializeEvents = function () {
            var _this = this;
            var lowerKnob = this._lowerKnob, upperKnob = this._upperKnob, touchstart = this._touchStart, touchEnd = this._touchEnd, trackLower = this._trackLower, trackUpper = this._trackUpper, track, reverseTrack;
            if (this._isVertical) {
                track = __$track + 'down';
                reverseTrack = __$track + 'up';
            }
            else {
                track = __$track + 'right';
                reverseTrack = __$track + 'left';
            }
            this.addEventListener(lowerKnob, __$touchstart, touchstart, false);
            this.addEventListener(upperKnob, __$touchstart, touchstart, false);
            this.addEventListener(lowerKnob, track, trackLower, false);
            this.addEventListener(lowerKnob, reverseTrack, trackLower, false);
            this.addEventListener(upperKnob, track, trackUpper, false);
            this.addEventListener(upperKnob, reverseTrack, trackUpper, false);
            this.addEventListener(lowerKnob, __$touchend, touchEnd, false);
            this.addEventListener(upperKnob, __$touchend, touchEnd, false);
            this.addEventListener(lowerKnob, __$trackend, touchEnd, false);
            this.addEventListener(upperKnob, __$trackend, touchEnd, false);
            this.addEventListener(this._window, 'resize', function () {
                _this._setPositionAndLength();
                _this._setLowerKnobPosition();
                _this._setUpperKnobPosition();
            }, false);
        };
        /**
         * Log the first touch.
         * @param {plat.ui.IGestureEvent} ev The touch event object.
         */
        Range.prototype._touchStart = function (ev) {
            var touchState = this._touchState;
            if (touchState === 1 || touchState === 2 || touchState === 3) {
                return;
            }
            this._touchState = 1;
            var target = ev.currentTarget, lastTouch = this._lastTouch;
            if (!this.utils.isNull(lastTouch)) {
                if (lastTouch.target !== target) {
                    lastTouch.target.style.zIndex = '0';
                    target.style.zIndex = '1';
                }
            }
            else {
                target.style.zIndex = '1';
            }
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY,
                value: target === this._lowerKnob ? this.lower : this.upper,
                target: target
            };
        };
        /**
         * Set the new slider element offset.
         * @param {plat.ui.IGestureEvent} ev The $trackend event object.
         */
        Range.prototype._touchEnd = function (ev) {
            var _this = this;
            var touchState = this._touchState;
            if (touchState === 0 || touchState === 4) {
                this._touchState = 0;
                return;
            }
            this._touchState = 4;
            var lastTouch = this._lastTouch, target = ev.currentTarget;
            if (this.utils.isNull(lastTouch) || (lastTouch.target !== target)) {
                return;
            }
            this.utils.requestAnimationFrame(function () {
                _this._touchState = 0;
                var isLower = target === _this._lowerKnob, newOffset = _this._calculateOffset(ev, isLower);
                if (isLower) {
                    if (lastTouch.value !== _this.lower) {
                        _this._trigger('change');
                    }
                }
                else if (lastTouch.value !== _this.upper) {
                    _this._trigger('change');
                }
                _this._setOffset(newOffset, isLower);
            });
        };
        /**
         * Sets the designated knob element's offset to the given value.
         * @param {number} offset The new offset.
         * @param {boolean} isLower Whether we're setting the lower or upper knob.
         */
        Range.prototype._setOffset = function (offset, isLower) {
            var maxOffset = this._maxOffset;
            if (offset < 0) {
                return isLower ? (this._lowerKnobOffset = 0) :
                    (this._upperKnobOffset = 0);
            }
            else if (offset > maxOffset) {
                return isLower ? (this._lowerKnobOffset = maxOffset) :
                    (this._upperKnobOffset = maxOffset);
            }
            return isLower ? (this._lowerKnobOffset = offset) :
                (this._upperKnobOffset = offset);
        };
        /**
         * Track the lower knob movement.
         * @param {plat.ui.IGestureEvent} ev The $track event object.
         */
        Range.prototype._trackLower = function (ev) {
            var touchState = this._touchState;
            if (touchState !== 2) {
                if (touchState === 1) {
                    this._touchState = 2;
                }
                else if (touchState === 0 || touchState === 3) {
                    return;
                }
            }
            var maxOffset = this._maxOffset, position = this._calculateOffset(ev, true), value;
            if (position <= 0) {
                value = this.min;
                if (value - this.lower >= 0) {
                    value = null;
                }
                position = 0;
            }
            else if (position >= maxOffset) {
                value = this.max;
                if (value - this.lower <= 0) {
                    value = null;
                }
                position = maxOffset;
            }
            else {
                value = this._calculateValue(position);
                if (value - this.lower === 0) {
                    value = null;
                }
            }
            if (position > this._upperKnobOffset) {
                this._positionTogether(position, value);
                this._setOffset(position, false);
                return;
            }
            this._positionLower(position, value);
        };
        /**
         * Track the upper knob movement.
         * @param {plat.ui.IGestureEvent} ev The $track event object.
         */
        Range.prototype._trackUpper = function (ev) {
            var touchState = this._touchState;
            if (touchState !== 3) {
                if (touchState === 1) {
                    this._touchState = 3;
                }
                else if (touchState === 0 || touchState === 2) {
                    return;
                }
            }
            var maxOffset = this._maxOffset, position = this._calculateOffset(ev, false), value;
            if (position <= 0) {
                value = this.min;
                if (value - this.upper >= 0) {
                    value = null;
                }
                position = 0;
            }
            else if (position >= maxOffset) {
                value = this.max;
                if (value - this.upper <= 0) {
                    value = null;
                }
                position = maxOffset;
            }
            else {
                value = this._calculateValue(position);
                if (value - this.upper === 0) {
                    value = null;
                }
            }
            if (position < this._lowerKnobOffset) {
                this._positionTogether(position, value);
                this._setOffset(position, true);
                return;
            }
            this._positionUpper(position, value);
        };
        /**
         * Positions the slider element and adjusts it's length to account
         * for lower knob movement.
         * @param {number} position The new position of the lower knob.
         * @param {number} value? The new value to set if specified.
         */
        Range.prototype._positionLower = function (position, value) {
            var _this = this;
            this.utils.requestAnimationFrame(function () {
                var style = _this._slider.style;
                style[_this._positionProperty] = position + 'px';
                style[_this._lengthProperty] = (_this._upperKnobOffset - position) + 'px';
                if (value === null) {
                    return;
                }
                _this._setLowerValue(value, false, true, true);
            });
        };
        /**
         * Positions the slider element and adjusts it's length to account
         * for upper knob movement.
         * @param {number} position The new position of the upper knob.
         * @param {number} value? The new value to set if specified.
         */
        Range.prototype._positionUpper = function (position, value) {
            var _this = this;
            this.utils.requestAnimationFrame(function () {
                _this._slider.style[_this._lengthProperty] = (position - _this._lowerKnobOffset) + 'px';
                if (value === null) {
                    return;
                }
                _this._setUpperValue(value, false, true, true);
            });
        };
        /**
         * Positions the slider element and adjusts it's length to account
         * for synchronized knob movement.
         * @param {number} position The new position of the knobs.
         * @param {number} value? The new value to set if specified.
         */
        Range.prototype._positionTogether = function (position, value) {
            var _this = this;
            this.utils.requestAnimationFrame(function () {
                var style = _this._slider.style;
                style[_this._positionProperty] = position + 'px';
                style[_this._lengthProperty] = '0px';
                if (value === null) {
                    return;
                }
                _this._setLowerValue(value, false, false, false);
                _this._setUpperValue(value, false, true, true);
            });
        };
        /**
         * Calculates the current value based on knob position and slider element width.
         * @param {number} width The current width of the slider element.
         */
        Range.prototype._calculateValue = function (width) {
            var step = this._step;
            return (this.min + Math.round(width / this._increment / step) * step);
        };
        /**
         * Calculates the new offset of the slider element based on the old offset and the distance moved.
         * @param {plat.ui.IGestureEvent} ev The $track or $trackend event object.
         * @param {boolean} isLower Whether the current knob is the lower or the upper knob.
         */
        Range.prototype._calculateOffset = function (ev, isLower) {
            var currentOffset = isLower ? this._lowerKnobOffset : this._upperKnobOffset, displacement;
            if (this._isVertical) {
                displacement = this._reversed ? ev.clientY - this._lastTouch.y : this._lastTouch.y - ev.clientY;
            }
            else {
                displacement = this._reversed ? this._lastTouch.x - ev.clientX : ev.clientX - this._lastTouch.x;
            }
            return currentOffset + displacement;
        };
        /**
         * Calculates knob position based on current value.
         * @param {number} value The current value of the {link platui.Range|Range}.
         */
        Range.prototype._calculateKnobPosition = function (value) {
            return (value - this.min) * this._increment;
        };
        /**
         * Sets the lower value of the Range.
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * @param {boolean} propertyChanged Whether or not the property was changed by the user.
         * @param {boolean} trigger Whether or not to trigger the 'input' event.
         */
        Range.prototype._setLowerValue = function (newValue, setKnob, propertyChanged, trigger) {
            var lower = this.lower;
            if (newValue === lower) {
                return;
            }
            else if (newValue >= this.max) {
                newValue = this.max;
            }
            else if (newValue <= this.min) {
                newValue = this.min;
            }
            else if (Math.abs(newValue - lower) < this._step) {
                return;
            }
            this.lower = newValue;
            if (setKnob) {
                this._setLowerKnobPosition();
            }
            if (propertyChanged) {
                this._fireChange();
            }
            if (trigger) {
                this._trigger('input');
            }
        };
        /**
         * Sets the value of the Range.
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * @param {boolean} propertyChanged Whether or not the property was changed by the user.
         * @param {boolean} trigger Whether or not to trigger the 'input' event.
         */
        Range.prototype._setUpperValue = function (newValue, setKnob, propertyChanged, trigger) {
            var upper = this.upper;
            if (newValue === upper) {
                return;
            }
            else if (newValue >= this.max) {
                newValue = this.max;
            }
            else if (newValue <= this.min) {
                newValue = this.min;
            }
            else if (Math.abs(newValue - upper) < this._step) {
                return;
            }
            this.upper = newValue;
            if (setKnob) {
                this._setUpperKnobPosition();
            }
            if (propertyChanged) {
                this._fireChange();
            }
            if (trigger) {
                this._trigger('input');
            }
        };
        /**
         * Sets the increment for sliding the {link platui.Range|Range}.
         */
        Range.prototype._setIncrement = function () {
            return (this._increment = this._maxOffset / (this.max - this.min));
        };
        /**
         * Sets the properties to use for length and position and sets the max length of the sliding element.
         * @param {HTMLElement} element? The element to base the length off of.
         */
        Range.prototype._setPositionAndLength = function (element) {
            var isNode = this.utils.isNode(element), el = isNode ? element : this._slider.parentElement;
            if (this._isVertical) {
                this._lengthProperty = 'height';
                this._positionProperty = this._reversed ? 'top' : 'bottom';
                this._maxOffset = el.offsetHeight;
            }
            else {
                this._lengthProperty = 'width';
                this._positionProperty = this._reversed ? 'right' : 'left';
                this._maxOffset = el.offsetWidth;
            }
            if (!(isNode || this._maxOffset)) {
                this._setOffsetWithClone(this._lengthProperty);
                return;
            }
            this._setIncrement();
        };
        /**
         * Animates and sets the knob position.
         * @param {number} value? The value to use to calculate the knob position. If no value is
         * specified, the current Range's value will be used.
         */
        Range.prototype._setLowerKnobPosition = function (value) {
            var animationOptions = {}, upperKnobOffset = this._upperKnobOffset, upperOffset = this.utils.isNumber(upperKnobOffset) ? upperKnobOffset :
                this._setOffset(this._calculateKnobPosition(this.upper), false), position = this._calculateKnobPosition((value || this.lower));
            if (position === this._lowerKnobOffset) {
                return;
            }
            animationOptions[this._positionProperty] = position + 'px';
            animationOptions[this._lengthProperty] = (upperOffset - position) + 'px';
            this._animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._lowerKnobOffset = position;
        };
        /**
         * Animates and sets the knob position.
         * @param {number} value? The value to use to calculate the knob position. If no value is
         * specified, the current Range's value will be used.
         */
        Range.prototype._setUpperKnobPosition = function (value) {
            var animationOptions = {}, length = this._calculateKnobPosition((value || this.upper));
            if (length === this._upperKnobOffset) {
                return;
            }
            animationOptions[this._lengthProperty] = (length - this._lowerKnobOffset) + 'px';
            this._animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._upperKnobOffset = length;
        };
        /**
         * Fires an inputChanged event with the new bound value.
         */
        Range.prototype._fireChange = function () {
            var newProperty = {};
            newProperty[this._lowerIdentifier] = this.lower;
            newProperty[this._upperIdentifier] = this.upper;
            this.inputChanged(newProperty);
        };
        /**
         * Triggers an event starting from this control's element.
         * @param {string} event The event name to trigger.
         */
        Range.prototype._trigger = function (event) {
            var domEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
            domEvent.trigger();
        };
        /**
         * Checks the orientation of the control and ensures it is valid.
         * Will default to "horizontal" if invalid.
         * @param {string} orientation The element to base the length off of.
         */
        Range.prototype._validateOrientation = function (orientation) {
            if (this.utils.isUndefined(orientation)) {
                return 'horizontal';
            }
            var validOrientation;
            if (orientation === 'horizontal') {
                validOrientation = orientation;
            }
            else if (orientation === 'vertical') {
                validOrientation = orientation;
                this._isVertical = true;
            }
            else {
                var _Exception = this._Exception;
                _Exception.warn('Invalid orientation "' + orientation + '" for ' + this.type + '. Defaulting to "horizontal."', _Exception.CONTROL);
                validOrientation = 'horizontal';
            }
            return validOrientation;
        };
        /**
         * Creates a clone of this element and uses it to find the max offset.
         * @param {string} dependencyProperty The property that the offset is being based off of.
         */
        Range.prototype._setOffsetWithClone = function (dependencyProperty) {
            var element = this.element, body = this._document.body, _Exception;
            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var controlType = this.type;
                    _Exception = this._Exception,
                        _Exception.warn('Max clone attempts reached before the ' + controlType + ' was placed into the ' +
                            'DOM. Disposing of the ' + controlType + '.', _Exception.CONTROL);
                    plat.acquire(__TemplateControlFactory).dispose(this);
                    return;
                }
                this.utils.defer(this._setOffsetWithClone, 20, [dependencyProperty], this);
                return;
            }
            var hasDeferred = this._cloneAttempts > 0;
            this._cloneAttempts = 0;
            var clone = element.cloneNode(true), regex = /\d+(?!\d+|%)/, _window = this._window, parentChain = [], shallowCopy = clone, computedStyle, important = 'important', isNull = this.utils.isNull, dependencyValue;
            shallowCopy.id = '';
            while (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', important);
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, important);
                element = element.parentElement;
                if (isNull(element)) {
                    // if we go all the way up to <html> the body may currently be hidden. 
                    _Exception = this._Exception,
                        _Exception.warn('The document\'s body contains a ' + this.type + ' that needs its length and is currently ' +
                            'hidden. Please do not set the body\'s display to none.', _Exception.CONTROL);
                    this.utils.defer(this._setOffsetWithClone, 100, [dependencyProperty], this);
                    return;
                }
                shallowCopy = element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }
            if (parentChain.length > 0) {
                var curr = parentChain.pop(), currStyle = curr.style, temp;
                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }
                curr.insertBefore(clone, null);
            }
            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, important);
            shallowStyle.setProperty('visibility', 'hidden', important);
            body.appendChild(shallowCopy);
            this._setPositionAndLength(clone.firstElementChild);
            body.removeChild(shallowCopy);
            if (hasDeferred) {
                this._setLowerKnobPosition();
                this._setUpperKnobPosition();
            }
        };
        Range._inject = {
            _document: __Document,
            _window: __Window,
            _animator: __Animator
        };
        return Range;
    })(plat.ui.BindControl);
    platui.Range = Range;
    plat.register.control(__Range, Range);
    /**
     * An ITemplateControl that allows for data-binding a select box and adds
     * custom styling to make it look consistent across all platforms.
     */
    var Select = (function (_super) {
        __extends(Select, _super);
        function Select() {
            _super.apply(this, arguments);
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Select.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Select + ' ' + (className || ''));
        };
        /**
         * Set the class name.
         */
        Select.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.setClasses();
        };
        return Select;
    })(plat.ui.controls.Select);
    platui.Select = Select;
    plat.register.control(__Select, Select);
    /**
     * An BindControl that standardizes and styles
     * an HTML input element of various types.
     */
    var Input = (function (_super) {
        __extends(Input, _super);
        function Input() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-input-container">\n' +
                '    <span class="plat-input-image"></span>\n' +
                '    <input type="text" />\n' +
                '    <span class="plat-input-action">\n' +
                '        <span class="plat-action"></span>\n' +
                '    </span>\n' +
                '</div>\n';
            /**
             * Whether the user is currently touching the screen.
             */
            this._inTouch = false;
            /**
             * Whether the user is currently in the process of performing the Input's action.
             */
            this._inAction = false;
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Input.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Input + ' ' + (className || ''));
        };
        /**
         * Set the class name.
         */
        Input.prototype.initialize = function () {
            this.setClasses();
        };
        /**
         * Set all HTMLElement references and potential attribute controls.
         */
        Input.prototype.setTemplate = function () {
            var element = this.element, image = this._imageElement = element.firstElementChild.firstElementChild, input = this._inputElement = image.nextElementSibling, attributes = this.attributes, keys = Object.keys(attributes), length = keys.length, controlInjectors = plat.dependency.injectors.control, hasPlaceholder = false, attrRegex = /plat-(?:control|hide|context)|class|style/, _utils = this.utils, isNull = _utils.isNull, delimit = _utils.delimit, isString = _utils.isString, key, name, value;
            for (var i = 0; i < length; ++i) {
                key = keys[i];
                name = delimit(key, '-');
                value = attributes[key];
                if (!isString(value) || attrRegex.test(name) || !isNull(controlInjectors[name])) {
                    continue;
                }
                else if (name === 'placeholder') {
                    hasPlaceholder = true;
                    input.placeholder = value;
                }
                else {
                    input.setAttribute(name, value);
                }
            }
            if (hasPlaceholder || isNull(this.innerTemplate)) {
                return;
            }
            var placeholder = this.innerTemplate.textContent.replace(/\r|\n/g, '');
            if (!_utils.isEmpty(placeholder)) {
                input.placeholder = placeholder;
            }
        };
        /**
         * Set the style and initialize the action.
         */
        Input.prototype.loaded = function () {
            var _this = this;
            var optionObj = this.options || {}, options = optionObj.value || {}, element = this.element, inputType = this._type = this.attributes['type'] || options.type || 'text', pattern = options.pattern;
            // in case of cloning 
            this._imageElement = this._imageElement || element.firstElementChild.firstElementChild;
            this._inputElement = this._inputElement || this._imageElement.nextElementSibling;
            this.dom.addClass(element, __Plat + inputType);
            var actionContainer = this._inputElement.nextElementSibling;
            this.addEventListener(actionContainer, __$tap, function () {
                _this._inputElement.focus();
            }, false);
            this._actionElement = actionContainer.firstElementChild;
            if (!this.utils.isEmpty(pattern)) {
                if (pattern[0] === '/' && pattern[pattern.length - 1] === '/') {
                    pattern = pattern.slice(1, -1);
                }
                this._pattern = new RegExp(pattern);
            }
            this._initializeType();
        };
        /**
         * A function to validate the user's input. For action="email" it returns
         * true if the email can be a valid email address. For all other
         * actions it returns true if the input is not empty.
         */
        Input.prototype.validate = function () {
            return this._pattern.test(this._inputElement.value);
        };
        /**
         * Clears the user's input.
         */
        Input.prototype.clear = function () {
            var inputElement = this._inputElement, value = inputElement.value;
            if (value === '') {
                return;
            }
            var actionElement = this._actionElement;
            this.inputChanged((inputElement.value = ''), value);
            actionElement.textContent = this._typeChar = '';
            actionElement.setAttribute(__Hide, '');
        };
        /**
         * Focuses the input.
         */
        Input.prototype.focus = function () {
            this._inputElement.focus();
        };
        /**
         * Blurs the input.
         */
        Input.prototype.blur = function () {
            this._inputElement.blur();
        };
        /**
         * Returns the current value of Input control.
         */
        Input.prototype.value = function () {
            return this._inputElement.value;
        };
        /**
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        Input.prototype.observeProperties = function (binder) {
            binder.observeProperty(this._setBoundProperty);
        };
        /**
         * The function called when the bindable text is set externally.
         * @param {string} newValue The new value of the bindable text.
         * @param {string} oldValue The old value of the bindable text.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         */
        Input.prototype._setBoundProperty = function (newValue, oldValue, identifier, firstTime) {
            var value = this._inputElement.value;
            if (this.utils.isNull(newValue)) {
                newValue = '';
                if (firstTime === true) {
                    if (this.utils.isNull(value)) {
                        this._onInputChanged(newValue);
                    }
                    return;
                }
            }
            else if (newValue === value) {
                return;
            }
            this._onInputChanged(newValue);
        };
        /**
         * Initializes the type.
         */
        Input.prototype._initializeType = function () {
            var inputType = this._type, event = __$tap, actionElement = this._actionElement, _Exception;
            switch (inputType) {
                case 'text':
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    break;
                case 'email':
                    this._pattern = this._pattern || this._regex.validateEmail;
                    this._actionHandler = this._checkEmail.bind(this);
                    this._typeHandler = this._handleEmail;
                    break;
                case 'password':
                    var hidePassword = this._handlePasswordHide;
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._actionHandler = this._checkPassword.bind(this);
                    this._typeHandler = this._handlePasswordShow;
                    this.addEventListener(actionElement, __$touchend, hidePassword);
                    this.addEventListener(actionElement, __$trackend, hidePassword);
                    event = __$touchstart;
                    break;
                case 'tel':
                case 'telephone':
                    this._pattern = this._pattern || this._regex.validateTelephone;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    break;
                case 'number':
                    this._pattern = this._pattern || /^[0-9\.,]*$/;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    inputType = 'tel';
                    break;
                case 'hidden':
                    this.element.setAttribute(__Hide, '');
                    return;
                case 'radio':
                    _Exception = this._Exception;
                    _Exception.warn(inputType + ' is not supported by ' + this.type +
                        '. Please use a ' + __Radio + ' instead.', _Exception.CONTROL);
                    return;
                case 'checkbox':
                    _Exception = this._Exception;
                    _Exception.warn(inputType + ' is not supported by ' + this.type +
                        '. Please use a ' + __Checkbox + ' instead.', _Exception.CONTROL);
                    return;
                case 'range':
                    _Exception = this._Exception;
                    _Exception.warn(inputType + ' is not supported by ' + this.type +
                        '. Please use a ' + __Slider + ' instead.', _Exception.CONTROL);
                    return;
                case 'file':
                    _Exception = this._Exception;
                    _Exception.warn(inputType + ' is not supported by ' + this.type +
                        '. Please use a ' + __File + ' instead.', _Exception.CONTROL);
                    return;
                default:
                    _Exception = this._Exception;
                    _Exception.warn(inputType + ' is not yet fully supported by ' + this.type +
                        '. Defaulting to type="text".', _Exception.CONTROL);
                    inputType = 'text';
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    break;
            }
            this._inputElement.type = inputType;
            actionElement.textContent = this._typeChar = '';
            actionElement.setAttribute(__Hide, '');
            this._addEventListeners(event);
        };
        /**
         * Adds all event listeners to the input and action element.
         * @param {string} event The primary action element's event.
         */
        Input.prototype._addEventListeners = function (event) {
            var _this = this;
            var actionElement = this._actionElement, input = this._inputElement, actionEnd = function () { return (_this._inAction = false); };
            this.addEventListener(actionElement, event, this._typeHandler, false);
            this.addEventListener(actionElement, __$touchstart, function () { return (_this._inAction = true); }, false);
            this.addEventListener(actionElement, __$touchend, actionEnd, false);
            this.addEventListener(actionElement, __$trackend, actionEnd, false);
            this.addEventListener(input, 'focus', function () {
                if (input.value === '') {
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }, false);
            this.addEventListener(input, 'blur', function (ev) {
                if (_this._inAction) {
                    return;
                }
                actionElement.setAttribute(__Hide, '');
            }, false);
            this._addTextEventListener();
        };
        /**
         * Adds a text event listener to the input element.
         */
        Input.prototype._addTextEventListener = function () {
            var _this = this;
            var input = this._inputElement, _compat = this._compat, _utils = this.utils, composing = false, timeout, eventListener = function () {
                if (composing) {
                    return;
                }
                _this._onInput();
            }, postponedEventListener = function () {
                if (_utils.isFunction(timeout)) {
                    return;
                }
                timeout = _utils.postpone(function () {
                    eventListener();
                    timeout = null;
                });
            };
            if (_utils.isUndefined(_compat.ANDROID)) {
                this.addEventListener(input, 'compositionstart', function () { return (composing = true); }, false);
                this.addEventListener(input, 'compositionend', function () {
                    composing = false;
                    eventListener();
                }, false);
            }
            if (_compat.hasEvent('input')) {
                this.addEventListener(input, 'input', eventListener, false);
            }
            else {
                this.addEventListener(input, 'keydown', function (ev) {
                    var key = ev.keyCode;
                    if (key === 91 ||
                        key === 92 ||
                        (key > 15 && key < 28) ||
                        (key > 32 && key < 41)) {
                        return;
                    }
                    postponedEventListener();
                }, false);
                this.addEventListener(input, 'cut', postponedEventListener, false);
                this.addEventListener(input, 'paste', postponedEventListener, false);
            }
            this.addEventListener(input, 'change', eventListener, false);
        };
        /**
         * Clears the user's input and focuses the input element.
         */
        Input.prototype._erase = function () {
            this.clear();
            this.focus();
        };
        /**
         * The action handler for the "password" type when showing the
         * password text.
         */
        Input.prototype._handlePasswordShow = function () {
            this._inTouch = true;
            this._inputElement.type = 'text';
        };
        /**
         * The action handler for the "password" type when hiding the
         * password text.
         */
        Input.prototype._handlePasswordHide = function () {
            if (!this._inTouch) {
                return;
            }
            this._inTouch = false;
            var inputElement = this._inputElement;
            inputElement.type = this._type;
            inputElement.focus();
        };
        /**
         * The action handler for the "email" type.
         */
        Input.prototype._handleEmail = function () {
            var inputElement = this._inputElement, value = inputElement.value, char = this._typeChar;
            this.inputChanged((inputElement.value = (char === 'x' ? '' : value + char)), value);
            this._checkEmail();
            inputElement.focus();
        };
        /**
         * Checks the current state of the default action and handles accordingly.
         */
        Input.prototype._checkText = function () {
            var char = this._typeChar;
            if (char === 'x') {
                if (this._inputElement.value === '') {
                    this._typeChar = '';
                }
            }
            else if (this._inputElement.value !== '') {
                this._typeChar = 'x';
            }
            var newChar = this._typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    actionElement.setAttribute(__Hide, '');
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }
        };
        /**
         * Checks the current state of the password action and handles accordingly.
         */
        Input.prototype._checkPassword = function () {
            var char = this._typeChar;
            if (char === '?') {
                if (this._inputElement.value === '') {
                    this._typeChar = '';
                }
            }
            else if (this._inputElement.value !== '') {
                this._typeChar = '?';
            }
            var newChar = this._typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    actionElement.setAttribute(__Hide, '');
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }
        };
        /**
         * Checks the current state of the "email" action and handles accordingly.
         */
        Input.prototype._checkEmail = function () {
            var value = this._inputElement.value, char = this._typeChar;
            switch (char) {
                case '@':
                    if (value.indexOf('@') !== -1) {
                        if (value.indexOf('.com') !== -1) {
                            this._typeChar = 'x';
                            break;
                        }
                        this._typeChar = '.com';
                    }
                    break;
                case '.com':
                    if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    }
                    else if (value.indexOf('.com') !== -1) {
                        this._typeChar = 'x';
                    }
                    break;
                case 'x':
                    if (value === '') {
                        this._typeChar = '';
                    }
                    else if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    }
                    else if (value.indexOf('.com') === -1) {
                        this._typeChar = '.com';
                    }
                    break;
                default:
                    if (value === '') {
                        this._typeChar = '';
                    }
                    else if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    }
                    break;
            }
            var newChar = this._typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    actionElement.setAttribute(__Hide, '');
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }
        };
        /**
         * The event handler upon user text input.
         */
        Input.prototype._onInput = function () {
            var inputElement = this._inputElement, value = inputElement.value;
            switch (this._type) {
                case 'tel':
                case 'number':
                    var last = value.length - 1;
                    if (last >= 0 && (!this._pattern.test(value[last]) ||
                        !(last === 0 || this._type !== 'tel' || value[last] !== '+'))) {
                        value = inputElement.value = value.slice(0, -1);
                    }
                default:
                    this.inputChanged(value);
                    break;
            }
            this._actionHandler();
        };
        /**
         * The event handler upon bound text being changed.
         * @param {string} newValue The new value of the bound text.
         */
        Input.prototype._onInputChanged = function (newValue) {
            var inputElement = this._inputElement;
            switch (this._type) {
                case 'tel':
                case 'number':
                    var last = newValue.length - 1;
                    if (last >= 0 && (!this._pattern.test(newValue[last]) ||
                        !(last === 0 || this._type !== 'tel' || newValue[last] !== '+'))) {
                        newValue = inputElement.value = newValue.slice(0, -1);
                        this.inputChanged(newValue);
                        break;
                    }
                default:
                    inputElement.value = newValue;
                    break;
            }
            this._actionHandler();
        };
        /**
         * Check the initial input and delete if it does not match the pattern.
         * @param {string} value The value to check as input to the HTMLInputElement.
         */
        Input.prototype._checkInput = function (value) {
            switch (this._type) {
                case 'tel':
                case 'number':
                    if (this._pattern.test(value)) {
                        this._inputElement.value = value;
                    }
                    else {
                        var _Exception = this._Exception;
                        _Exception.warn(this.type + '\'s value does not satisfy either ' +
                            'the given pattern or type. The value will be reset to "".', _Exception.CONTROL);
                        this.inputChanged((this._inputElement.value = ''), value);
                    }
                    break;
                default:
                    this._inputElement.value = value;
                    break;
            }
            this._actionHandler();
            this._actionElement.setAttribute(__Hide, '');
        };
        Input._inject = {
            _compat: __Compat,
            _regex: __Regex
        };
        return Input;
    })(plat.ui.BindControl);
    platui.Input = Input;
    plat.register.control(__Input, Input);
    /**
     * An BindControl that standardizes and styles
     * an HTML input[type="file"] element.
     */
    var File = (function (_super) {
        __extends(File, _super);
        function File() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-file-container">\n' +
                '    <input type="file" class="plat-file-hidden" plat-change="_filesSelected" />\n' +
                '    <input type="text" class="plat-file-input" plat-keydown="_onKeyDown" />\n' +
                '    <button class="plat-file-button" plat-tap="_selectFiles"></button>\n' +
                '</div>\n';
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        File.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __File + ' ' + (className || ''));
        };
        /**
         * Set the class name.
         */
        File.prototype.initialize = function () {
            this.setClasses();
        };
        /**
         * Set all HTMLElement references and potential attribute controls.
         */
        File.prototype.setTemplate = function () {
            var element = this.element, hiddenInput = this._hiddenInput = element.firstElementChild.firstElementChild, visibleInput = this._visibleInput = hiddenInput.nextElementSibling, buttonInput = visibleInput.nextElementSibling, attributes = this.attributes, keys = Object.keys(attributes), length = keys.length, controlInjectors = plat.dependency.injectors.control, attrRegex = /plat-(?:control|hide|context)|class|style/, hasMultiple = false, _utils = this.utils, isNull = _utils.isNull, delimit = _utils.delimit, isString = _utils.isString, key, name, value;
            for (var i = 0; i < length; ++i) {
                key = keys[i];
                name = delimit(key, '-');
                value = attributes[key];
                if (!isString(value) || attrRegex.test(name) || !isNull(controlInjectors[name])) {
                    if (name === __Disabled) {
                        hiddenInput.setAttribute(name, value);
                        visibleInput.setAttribute(name, value);
                        buttonInput.setAttribute(name, value);
                    }
                    continue;
                }
                else if (name === 'multiple') {
                    hasMultiple = true;
                    hiddenInput.setAttribute(name, value);
                }
                else if (name === 'disabled') {
                    hiddenInput.setAttribute(name, value);
                    visibleInput.setAttribute(name, value);
                    buttonInput.setAttribute(name, value);
                }
                else {
                    hiddenInput.setAttribute(name, value);
                }
            }
            if (isNull(this.innerTemplate)) {
                buttonInput.textContent = hasMultiple ? 'Select files' : 'Select a file';
                return;
            }
            var buttonText = this.innerTemplate.textContent.replace(/\r|\n/g, '');
            if (_utils.isEmpty(buttonText)) {
                buttonInput.textContent = hasMultiple ? 'Select files' : 'Select a file';
                return;
            }
            buttonInput.textContent = buttonText;
        };
        /**
         * Set the style and initialize the action.
         */
        File.prototype.loaded = function () {
            var hiddenInput = this._hiddenInput = this._hiddenInput || this.element.firstElementChild.firstElementChild;
            this._visibleInput = this._visibleInput || hiddenInput.nextElementSibling;
        };
        /**
         * A function to validate the user's input. Returns true if the input is not empty.
         */
        File.prototype.validate = function () {
            return !this.utils.isEmpty(this._hiddenInput.value);
        };
        /**
         * Clears the user's input.
         */
        File.prototype.clear = function () {
            var hiddenInput = this._hiddenInput;
            if (this.utils.isEmpty(hiddenInput.value)) {
                return;
            }
            var clone = this._hiddenInput = hiddenInput.cloneNode(true);
            this.element.firstElementChild.replaceChild(clone, hiddenInput);
            this._visibleInput.value = '';
            this.inputChanged(null);
        };
        /**
         * Acts as a programmatic click for file selection.
         */
        File.prototype.click = function () {
            this._selectFiles();
        };
        /**
         * Returns the current value of File control.
         */
        File.prototype.value = function () {
            var hiddenInput = this._hiddenInput, files = hiddenInput.files;
            if (this.utils.isNull(files)) {
                return;
            }
            else if (!hiddenInput.multiple) {
                return files[0];
            }
            return Array.prototype.slice.call(files);
        };
        /**
         * Disables the control.
         */
        File.prototype.disable = function () {
            var disabled = 'disabled', visibleInput = this._visibleInput;
            this._hiddenInput.setAttribute(disabled, disabled);
            visibleInput.setAttribute(disabled, disabled);
            visibleInput.nextElementSibling.setAttribute(disabled, disabled);
            this.element.setAttribute(disabled, disabled);
        };
        /**
         * Enables the control.
         */
        File.prototype.enable = function () {
            var disabled = 'disabled', visibleInput = this._visibleInput;
            this._hiddenInput.removeAttribute(disabled);
            visibleInput.removeAttribute(disabled);
            visibleInput.nextElementSibling.removeAttribute(disabled);
            this.element.removeAttribute(disabled);
        };
        /**
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        File.prototype.observeProperties = function (binder) {
            binder.observeProperty(this._setBoundProperty);
        };
        /**
         * The function called when the bindable text is set externally.
         * @param {any} newValue The new value of the bindable file(s).
         * @param {any} oldValue The old value of the bindable file(s).
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         */
        File.prototype._setBoundProperty = function (newValue, oldValue, identifier, firstTime) {
            var utils = this.utils;
            if (utils.isUndefined(newValue)) {
                this.inputChanged(null);
                return;
            }
            var hiddenInput = this._hiddenInput, files = hiddenInput.files;
            if (utils.isNull(files)) {
                return;
            }
            if (!hiddenInput.multiple) {
                if (newValue !== files[0]) {
                    this.inputChanged(files[0]);
                }
                return;
            }
            this.inputChanged(Array.prototype.slice.call(files));
        };
        /**
         * An event listener to handle a "keydown" event on the visible input.
         * @param {KeyboardEvent} ev The "keydown" event.
         */
        File.prototype._onKeyDown = function (ev) {
            var key = ev.keyCode, keyCodes = plat.controls.KeyCodes;
            if (key === keyCodes.tab) {
                return true;
            }
            else if (key === keyCodes.backspace || key === keyCodes.delete) {
                this.clear();
            }
            ev.preventDefault();
            return false;
        };
        /**
         * Kicks off the file selection process.
         */
        File.prototype._selectFiles = function () {
            this._hiddenInput.click();
        };
        /**
         * An event indicating that files have been selected.
         */
        File.prototype._filesSelected = function () {
            var hiddenInput = this._hiddenInput, visibleInput = this._visibleInput, files = hiddenInput.files;
            if (this.utils.isNull(files)) {
                return;
            }
            if (!hiddenInput.multiple) {
                var file = files[0];
                visibleInput.value = file.name;
                this.inputChanged(file);
                return;
            }
            var fileNames = [], length = files.length;
            for (var i = 0; i < length; ++i) {
                fileNames.push(files[i].name);
            }
            visibleInput.value = fileNames.join(', ');
            this.inputChanged(Array.prototype.slice.call(files));
        };
        File._inject = {
            _compat: __Compat
        };
        return File;
    })(plat.ui.BindControl);
    platui.File = File;
    plat.register.control(__File, File);
    /**
     * An extension of the ForEach that acts as a HTML template carousel
     * and can bind the selected index to a value.
     */
    var Carousel = (function (_super) {
        __extends(Carousel, _super);
        function Carousel() {
            _super.apply(this, arguments);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-carousel-viewport">\n' +
                '    <div class="plat-carousel-container"></div>\n' +
                '</div>\n';
            /**
             * The set of functions added externally that listens
             * for property changes.
             */
            this._listeners = [];
            /**
             * Whether the control is vertical or horizontal.
             */
            this._isVertical = false;
            /**
             * Whether or not the user has swiped.
             */
            this._hasSwiped = false;
            /**
             * Whether or not the user is currently touching the screen.
             */
            this._inTouch = false;
            /**
             * Whether or not the user is currently touching the screen and has moved.
             */
            this._hasMoved = false;
            /**
             * The last touch start recorded.
             */
            this._lastTouch = { x: 0, y: 0 };
            /**
             * Whether or not the control has been loaded based on its context being an Array.
             */
            this._loaded = false;
            /**
             * The current index seen in the Carousel.
             */
            this._index = -1;
            /**
             * The previous index of the Carousel in relation to the item nodes.
             */
            this._previousIndex = -1;
            /**
             * The next index of the Carousel in relation to the item nodes.
             */
            this._nextIndex = -1;
            /**
             * The current offset of the translated Carousel's sliding element.
             */
            this._currentOffset = 0;
            /**
             * The function used to clear the auto scroll interval.
             */
            this._removeInterval = noop;
            /**
             * The function used to clear the suspended auto scroll interval.
             */
            this._removeSuspend = noop;
            /**
             * Whether or not automatic scrolling is enabled.
             */
            this._isAuto = false;
            /**
             * Whether or not automatic scrolling is currently paused.
             */
            this._isPaused = false;
            /**
             * Whether or not the control is responsible for pausing itself.
             */
            this._selfPause = false;
            /**
             * An Array of all the current nodes in the control.
             */
            this._itemNodes = [];
            /**
             * A collection of remove listeners to stop listening for events.
             */
            this._removeListeners = [];
            /**
             * Whether or not the start outer item node has been initialized.
             */
            this._outerStart = false;
            /**
             * Whether or not the end outer item node has been initialized.
             */
            this._outerEnd = false;
            /**
             * An interval constant used to regulate the speed of the auto scroll
             * when the goToIndex function is called and is not direct.
             */
            this._goToIntervalConstant = 125;
        }
        Object.defineProperty(Carousel.prototype, "index", {
            /**
             * The current index of the Carousel.
             */
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Carousel.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Carousel + ' ' + (className || ''));
        };
        /**
         * Checks if the control has been initialized, otherwise it does so.
         * @param {Array<any>} newValue The new array context.
         * @param {Array<any>} oldValue The old array context.
         */
        Carousel.prototype.contextChanged = function (newValue, oldValue) {
            var _this = this;
            var utils = this.utils;
            if (utils.isFunction(this._onLoad)) {
                if (utils.isEmpty(newValue)) {
                    if (!utils.isEmpty(oldValue)) {
                        this._Promise.all(this._addQueue).then(function () {
                            _this._removeItems(0, _this.controls.length);
                        });
                    }
                    this._verifyLength();
                    return;
                }
                else if (!utils.isArray(newValue)) {
                    var _Exception = this._Exception;
                    _Exception.warn(this.type + ' context set to something other than an Array.', _Exception.CONTEXT);
                    return;
                }
                this._executeEvent([{
                        object: newValue || [],
                        type: 'splice'
                    }]);
                if (utils.isArray(newValue) && newValue.length > 0) {
                    this._initializeIndex(0);
                }
                return;
            }
            this.loaded();
        };
        /**
         * Set the class name.
         */
        Carousel.prototype.initialize = function () {
            this.setClasses();
        };
        /**
         * Inserts the innerHTML of this control into a child ForEach control.
         */
        Carousel.prototype.setTemplate = function () {
            var itemContainer = this._document.createElement('div');
            itemContainer.className = 'plat-carousel-item';
            itemContainer.appendChild(this.innerTemplate);
            this.bindableTemplates.add('item', itemContainer);
        };
        /**
         * Checks context and warns if not an Array, then initializes.
         */
        Carousel.prototype.loaded = function () {
            var _this = this;
            var utils = this.utils, context = this.context;
            if (!utils.isArray(context)) {
                var _Exception = this._Exception;
                _Exception.warn('The context of a ' + this.type + ' must be an Array.', _Exception.CONTEXT);
                return;
            }
            // since we're extending the ForEach, we must set this animate to false as it refers to item manipulation. 
            this._animate = false;
            var optionObj = this.options || {}, options = optionObj.value || {}, index = options.index, isNumber = utils.isNumber, orientation = this._validateOrientation(options.orientation), interval = options.interval, intervalNum = this._interval = isNumber(interval) ? Math.abs(interval) : 3000, suspend = options.suspend, viewport = this._viewport = this.element.firstElementChild;
            this._container = viewport.firstElementChild;
            this._type = options.type || 'track swipe';
            this._isInfinite = options.infinite === true;
            this._suspend = Math.abs(isNumber(suspend) ? intervalNum - suspend : intervalNum - 3000);
            this.dom.addClass(this.element, __Plat + orientation);
            this._onLoad = function () {
                var setIndex = _this._index;
                index = isNumber(index) && index >= 0 ? index < context.length ? index : (context.length - 1) : null;
                _this._index = 0;
                _this._initializeIndex(index === null ? setIndex : index);
                _this._addEventListeners();
                _this.observeArray(_this._verifyLength);
                _this._loaded = true;
            };
            this._init();
        };
        /**
         * Advances the position of the Carousel to the next state.
         */
        Carousel.prototype.goToNext = function () {
            var _this = this;
            return this._Promise.all(this._addQueue).then(function () {
                var index = _this._index, reset = false;
                if ((index >= _this._itemNodes.length - 1) && !(reset = _this._isInfinite)) {
                    if (_this._isAuto && !_this._isPaused) {
                        _this.pause();
                        _this._selfPause = true;
                    }
                    return _this._Promise.resolve(false);
                }
                var length = _this._getLength();
                if (!length) {
                    return _this.goToIndex(_this._nextIndex, true);
                }
                return _this._cancelCurrentAnimations().then(function () {
                    if (!(_this._outerStart && _this._outerEnd)) {
                        _this._initializeOuterNodes();
                    }
                    var animationOptions = {};
                    animationOptions[_this._transform] = _this._calculateStaticTranslation(-length);
                    var animation = _this._initiateAnimation({ properties: animationOptions }), nextIndex;
                    if (reset) {
                        _this._index = nextIndex = 0;
                    }
                    else {
                        nextIndex = ++_this._index;
                    }
                    _this.inputChanged(_this._index, index);
                    return animation.then(function () {
                        _this._handleNext(nextIndex, length);
                        _this._checkArrows();
                        return true;
                    });
                });
            });
        };
        /**
         * Changes the position of the Carousel to the previous state.
         */
        Carousel.prototype.goToPrevious = function () {
            var _this = this;
            return this._Promise.all(this._addQueue).then(function () {
                var index = _this._index, reset = false;
                if (index <= 0 && !(reset = _this._isInfinite)) {
                    return _this._Promise.resolve(false);
                }
                else if (_this._selfPause) {
                    _this.resume();
                }
                var length = _this._getLength();
                if (!length) {
                    return _this.goToIndex(_this._previousIndex, true);
                }
                return _this._cancelCurrentAnimations().then(function () {
                    if (!(_this._outerStart && _this._outerEnd)) {
                        _this._initializeOuterNodes();
                    }
                    var animationOptions = {};
                    animationOptions[_this._transform] = _this._calculateStaticTranslation(length);
                    var animation = _this._initiateAnimation({ properties: animationOptions }), previousIndex;
                    if (reset) {
                        _this._index = previousIndex = _this._itemNodes.length - 1;
                    }
                    else {
                        previousIndex = --_this._index;
                    }
                    _this.inputChanged(_this._index, index);
                    return animation.then(function () {
                        _this._handlePrevious(previousIndex, -length);
                        _this._checkArrows();
                        return true;
                    });
                });
            });
        };
        /**
         * Changes the position of the Carousel to the state
         * specified by the input index.
         * @param {number} index The new index of the Carousel.
         * @param {boolean} direct? If true, will go straight to the specified index without transitioning.
         */
        Carousel.prototype.goToIndex = function (index, direct) {
            var _this = this;
            return this._Promise.all(this._addQueue).then(function () {
                var oldIndex = _this._index;
                if (_this.utils.isUndefined(oldIndex)) {
                    _this._initializeIndex(0);
                    _this.inputChanged(_this._index, index);
                    if (!_this._isInfinite) {
                        if (index < _this.context.length - 1) {
                            if (_this._selfPause) {
                                _this.resume();
                            }
                        }
                        else if (_this._isAuto && !_this._isPaused) {
                            _this.pause();
                            _this._selfPause = true;
                        }
                    }
                    return _this._Promise.resolve(true);
                }
                else if (index === oldIndex) {
                    return _this._Promise.resolve(false);
                }
                else if (direct === true) {
                    _this._initializeIndex(index);
                    _this.inputChanged(_this._index, index);
                    if (!_this._isInfinite) {
                        if (index < _this.context.length - 1) {
                            if (_this._selfPause) {
                                _this.resume();
                            }
                        }
                        else if (_this._isAuto && !_this._isPaused) {
                            _this.pause();
                            _this._selfPause = true;
                        }
                    }
                    return _this._Promise.resolve(true);
                }
                else if (index === _this._nextIndex) {
                    return _this.goToNext();
                }
                else if (index === _this._previousIndex) {
                    return _this.goToPrevious();
                }
                return _this._goToIndex(index);
            });
        };
        /**
         * Stops auto scrolling if auto scrolling is enabled.
         */
        Carousel.prototype.pause = function () {
            this._selfPause = false;
            if (!this._isAuto || this._isPaused) {
                return;
            }
            this._isPaused = true;
            this._removeSuspend();
            this._removeSuspend = noop;
            this._removeInterval();
            this._removeInterval = noop;
        };
        /**
         * Resumes auto scrolling if auto scrolling is enabled.
         */
        Carousel.prototype.resume = function () {
            if (!(this._isAuto && this._isPaused)) {
                return;
            }
            this._isPaused = this._selfPause = false;
            this._initiateInterval();
        };
        /**
         * Clean up the auto scroll interval if necessary.
         */
        Carousel.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._listeners = [];
            this._removeEventListeners();
        };
        /**
         * Adds a listener to be called when the bindable property changes.
         * @param {plat.IPropertyChangedListener<any>} listener The function that acts as a listener.
         */
        Carousel.prototype.onInput = function (listener) {
            var listeners = this._listeners;
            listeners.push(listener);
            return function () {
                var index = listeners.indexOf(listener);
                if (index === -1) {
                    return;
                }
                listeners.splice(index, 1);
            };
        };
        /**
         * A function that signifies when this control's bindable property has changed.
         * @param {any} newValue The new value of the property after the change.
         * @param {any} oldValue? The old value of the property prior to the change.
         */
        Carousel.prototype.inputChanged = function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            var listeners = this._listeners, length = listeners.length;
            for (var i = 0; i < length; ++i) {
                listeners[i](newValue, oldValue);
            }
        };
        /**
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        Carousel.prototype.observeProperties = function (binder) {
            binder.observeProperty(this._setBoundProperty);
        };
        /**
         * The function called when the bindable index is set externally.
         * @param {number} index The new value of the bindable index.
         * @param {number} oldValue The old value of the bindable index.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         */
        Carousel.prototype._setBoundProperty = function (index, oldValue, identifier, firstTime) {
            var utils = this.utils;
            if (utils.isNull(index)) {
                if (firstTime === true) {
                    this.inputChanged((this._index = 0), index);
                    return;
                }
            }
            else if (!utils.isNumber(index)) {
                index = Number(index);
                if (!utils.isNumber(index)) {
                    var _Exception = this._Exception;
                    _Exception.warn(this.type + ' has it\'s index bound to a property that cannot be interpreted as a Number.', _Exception.BIND);
                    return;
                }
            }
            if (!this._loaded) {
                this._index = index;
                return;
            }
            this.goToIndex(index);
        };
        /**
         * Resets the position of the Carousel to its current state.
         */
        Carousel.prototype._reset = function () {
            var animationOptions = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(0);
            this._initiateAnimation({ properties: animationOptions });
        };
        /**
         * Verifies that the current length of the context aligns with the position of the Carousel.
         */
        Carousel.prototype._verifyLength = function () {
            var _this = this;
            this._Promise.all(this._addQueue).then(function () {
                var context = _this.context, index = _this._index;
                if (!_this.utils.isArray(context) || context.length === 0) {
                    if (!_this.utils.isUndefined(index)) {
                        _this.inputChanged((_this._index = undefined), index);
                    }
                    _this._container.style[_this._transform] = _this._calculateStaticTranslation(-_this._currentOffset);
                    _this._removeEventListeners();
                    _this._checkArrows();
                    return;
                }
                // if no remove listeners exist we know that we had previously removed them. 
                if (_this._removeListeners.length === 0) {
                    _this._addEventListeners();
                    _this._initializeIndex(0);
                    _this.inputChanged(0, index);
                    return;
                }
                var maxIndex = context.length - 1;
                if (maxIndex < 2) {
                    _this._initializeIndex(index > maxIndex ? maxIndex : index);
                    _this.inputChanged(_this._index, index);
                }
                else if (index > maxIndex) {
                    _this.goToIndex(maxIndex);
                }
            });
        };
        /**
         * Sets the previous and next indices in relation to item nodes according to the current index.
         */
        Carousel.prototype._setIndexWindow = function () {
            var index = this._index, lastIndex = this._itemNodes.length - 1;
            if (lastIndex < 0) {
                this._previousIndex = this._nextIndex = lastIndex;
            }
            else if (index >= lastIndex) {
                if (index > lastIndex) {
                    index = this._index = lastIndex;
                }
                this._previousIndex = index - 1;
                this._nextIndex = this._isInfinite ? 0 : -1;
            }
            else if (index <= 0) {
                if (index < 0) {
                    index = this._index = 0;
                }
                this._previousIndex = this._isInfinite ? lastIndex : -1;
                this._nextIndex = index + 1;
            }
            else {
                this._previousIndex = index - 1;
                this._nextIndex = index + 1;
            }
        };
        /**
         * Changes the position of the Carousel to the state
         * specified by the input index.
         * @param {number} index The new index of the Carousel.
         */
        Carousel.prototype._goToIndex = function (index) {
            var oldIndex = this._index;
            if (index === oldIndex || index < 0 || index >= this.context.length) {
                return this._Promise.resolve(false);
            }
            else if (this._selfPause) {
                this.resume();
            }
            if (!this._getLength()) {
                this._initializeIndex(index);
                return this._Promise.resolve(true);
            }
            var _Promise = this._Promise, defer = this.utils.defer, move, diff, reverseDiff;
            if (index > oldIndex) {
                move = this.goToNext;
                diff = index - oldIndex;
                if (this._isInfinite) {
                    reverseDiff = this._itemNodes.length - index + oldIndex;
                    if (reverseDiff < diff) {
                        move = this.goToPrevious;
                        diff = reverseDiff;
                    }
                }
            }
            else {
                move = this.goToPrevious;
                diff = oldIndex - index;
                if (this._isInfinite) {
                    reverseDiff = this._itemNodes.length - oldIndex + index;
                    if (reverseDiff < diff) {
                        move = this.goToNext;
                        diff = reverseDiff;
                    }
                }
            }
            var promises = [], removeListeners = this._removeListeners, constant = this._goToIntervalConstant, interval = 0;
            move = move.bind(this);
            while (--diff > 0) {
                promises.push(new _Promise(function (resolve) {
                    var remove = defer(function () {
                        var removeIndex = removeListeners.indexOf(remove);
                        if (removeIndex !== -1) {
                            removeListeners.splice(removeIndex, 1);
                        }
                        resolve(move());
                    }, interval += Math.round(constant / diff));
                    removeListeners.push(remove);
                }));
            }
            promises.push(move());
            return _Promise.all(promises).then(function (results) {
                var result = false;
                while (results.length > 0) {
                    result = result || results.pop();
                    if (result) {
                        break;
                    }
                }
                return result;
            });
        };
        /**
         * Handles swapping and translating nodes for a "next" operation.
         * @param {number} index The new index at the time of the animation.
         * @param {number} length The length to statically transition back to.
         */
        Carousel.prototype._handleNext = function (index, length) {
            var isInfinite = this._isInfinite;
            if (isInfinite && this.utils.isNode(this._postClonedNode)) {
                this._initializeIndex(index);
                return;
            }
            var itemNodes = this._itemNodes, container = this._container;
            if (this._outerStart) {
                if (isInfinite || index > 1) {
                    this.dom.insertBefore(itemNodes[this._previousIndex], Array.prototype.slice.call(container.childNodes, 0, 3));
                    container.style[this._transform] = this._calculateStaticTranslation(length);
                    // access property to force a repaint 
                    container.offsetWidth;
                }
            }
            else {
                this._outerStart = true;
            }
            this._setIndexWindow();
            if (!(isInfinite || index < itemNodes.length - 1)) {
                return;
            }
            container.insertBefore(itemNodes[this._nextIndex], null);
        };
        /**
         * Handles swapping and translating nodes for a "previous" operation.
         * @param {number} index The new index at the time of the animation.
         * @param {number} length The length to statically transition back to.
         */
        Carousel.prototype._handlePrevious = function (index, length) {
            var isInfinite = this._isInfinite;
            if (isInfinite && this.utils.isNode(this._preClonedNode)) {
                this._initializeIndex(index);
                return;
            }
            var itemNodes = this._itemNodes, container = this._container;
            if (this._outerEnd) {
                if (isInfinite || index < itemNodes.length - 2) {
                    this.dom.insertBefore(itemNodes[this._nextIndex], Array.prototype.slice.call(container.childNodes, -3));
                }
            }
            else {
                this._outerEnd = true;
            }
            this._setIndexWindow();
            if (!(isInfinite || index > 0)) {
                return;
            }
            container.insertBefore(itemNodes[this._previousIndex], container.firstChild);
            container.style[this._transform] = this._calculateStaticTranslation(length);
            // access property to force a repaint 
            container.offsetWidth;
        };
        /**
         * Clears all the inner nodes of the control.
         */
        Carousel.prototype._clearInnerNodes = function () {
            this._removeClones();
            var itemNodes = this._itemNodes;
            if (itemNodes.length === 0) {
                return false;
            }
            var childNodes = Array.prototype.slice.call(this._container.childNodes), insertBefore = this.dom.insertBefore;
            switch (childNodes.length) {
                case 9:
                    insertBefore(itemNodes[this._previousIndex], childNodes.slice(0, 3));
                case 6:
                    insertBefore(itemNodes[this._nextIndex], childNodes.slice(-3));
                case 3:
                    insertBefore(itemNodes[this._index], childNodes.slice(0, 3));
            }
            return true;
        };
        /**
         * Initializes item nodes at the given index.
         * @param {number} index The new index at the time of the animation.
         */
        Carousel.prototype._initializeIndex = function (index) {
            var innerNodesCleared = this._clearInnerNodes(), nodeLength = this._itemNodes.length;
            if (this._itemNodes.length === 0) {
                index = -1;
            }
            else if (index < 0) {
                index = 0;
            }
            this._index = index;
            this._setIndexWindow();
            if (!innerNodesCleared) {
                return false;
            }
            var container = this._container;
            container.insertBefore(this._itemNodes[index], null);
            container.style[this._transform] = this._calculateStaticTranslation(-this._currentOffset);
            // access property to force a repaint 
            container.offsetWidth;
            this._initializeOuterNodes();
            this._checkArrows();
            return true;
        };
        /**
         * Initializes pre and post item nodes for the current index.
         */
        Carousel.prototype._initializeOuterNodes = function () {
            var length = this._getLength();
            if (!length) {
                this._outerStart = this._outerEnd = false;
                return;
            }
            var itemNodes = this._itemNodes, container = this._container, nodeLength = itemNodes.length;
            if (nodeLength > 1) {
                container.insertBefore(itemNodes[this._nextIndex], null);
                this._outerEnd = true;
                if (nodeLength > 2) {
                    if (this._isInfinite || this._index > 0) {
                        container.insertBefore(itemNodes[this._previousIndex], container.firstChild);
                        container.style[this._transform] = this._calculateStaticTranslation(-length);
                        // access property to force a repaint 
                        container.offsetWidth;
                        this._outerStart = true;
                    }
                }
                else if (this._isInfinite) {
                    this._cloneForInfinite(-length);
                }
                return;
            }
            else if (this._isInfinite) {
                this._cloneForInfinite(-length);
            }
        };
        /**
         * Animates the carousel with a set of characteristics passed in as an argument.
         * @param {plat.IObject<string>} animationOptions An object containing key-value pairs
         * of properties to animate.
         */
        Carousel.prototype._initiateAnimation = function (animationOptions) {
            return this._animationThenable =
                this._animator.animate(this._container, __Transition, animationOptions);
        };
        /**
         * Initializes the control and adds all event listeners.
         */
        Carousel.prototype._init = function () {
            var _this = this;
            var addQueue = this._addQueue, itemCount = this.context.length;
            this._setAliases();
            var addPromise = this._addItems(0, itemCount, 0).then(function () {
                var index = addQueue.indexOf(addPromise);
                if (index !== -1) {
                    addQueue.splice(index, 1);
                }
                _this._onLoad();
            }).catch(function () {
                var _Exception = _this._Exception;
                _Exception.warn('An error occurred while processing the ' + _this.type + '. Please ensure you\'re context is correct.', _Exception.CONTROL);
                _this._loaded = false;
                return;
            });
            addQueue.push(addPromise);
            this._setListener();
            this._setTransform();
        };
        /**
         * Adds all event listeners on this control's element.
         */
        Carousel.prototype._addEventListeners = function () {
            var types = this._type.split(' ');
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
        };
        /**
         * Removes all event listeners on this control's element.
         */
        Carousel.prototype._removeEventListeners = function () {
            var removeListeners = this._removeListeners;
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
        };
        /**
         * Create the clones case where item length is less than 3.
         * @param {number} length The length to translate the offset clone.
         */
        Carousel.prototype._cloneForInfinite = function (length) {
            this._removeClones();
            var context = this.context;
            if (!this.utils.isArray(context) || context.length === 0) {
                return;
            }
            var container = this._container, preClone = this._preClonedNode = container.lastElementChild.cloneNode(true), postClone = this._postClonedNode = container.firstElementChild.cloneNode(true);
            container.insertBefore(preClone, container.firstChild);
            container.insertBefore(postClone, null);
            container.style[this._transform] = this._calculateStaticTranslation(length);
            // access property to force a repaint 
            container.offsetWidth;
            this._outerStart = this._outerEnd = true;
        };
        /**
         * Removes the clones for infinite scrolling.
         */
        Carousel.prototype._removeClones = function () {
            var container = this._container, preClone = this._preClonedNode, postClone = this._postClonedNode, isNode = this.utils.isNode;
            if (isNode(preClone) && container.contains(preClone)) {
                container.removeChild(preClone);
            }
            if (isNode(postClone) && container.contains(postClone)) {
                container.removeChild(postClone);
            }
        };
        /**
         * Adds all necessary elements and event listeners to setup auto scroll.
         */
        Carousel.prototype._initializeAuto = function () {
            this._isAuto = true;
            this._initiateInterval();
        };
        /**
         * Begins auto scrolling.
         */
        Carousel.prototype._initiateInterval = function () {
            this._removeInterval = this.utils.setInterval(this.goToNext, this._interval, null, this);
        };
        /**
         * Checks for automatic scrolling and suspends if necessary.
         */
        Carousel.prototype._suspendInterval = function () {
            var _this = this;
            if (!this._isAuto || this._isPaused) {
                return;
            }
            this._removeSuspend();
            this._removeInterval();
            this._removeSuspend = this.utils.defer(function () {
                _this._initiateInterval();
                _this._removeSuspend = noop;
            }, this._suspend);
        };
        /**
         * Adds all necessary elements and event listeners to handle tap events.
         */
        Carousel.prototype._initializeTap = function () {
            var _this = this;
            if (!this.utils.isNode(this._forwardArrow)) {
                this._createArrowElements();
            }
            var removeListeners = this._removeListeners;
            removeListeners.push(this.addEventListener(this._backArrow, __$tap, function () {
                _this._suspendInterval();
                _this.goToPrevious();
            }, false));
            removeListeners.push(this.addEventListener(this._forwardArrow, __$tap, function () {
                _this._suspendInterval();
                _this.goToNext();
            }, false));
            this._checkArrows();
        };
        /**
         * Creates the arrow elements for type `tap` and places them in the DOM.
         */
        Carousel.prototype._createArrowElements = function () {
            var _document = this._document, viewport = this._viewport, backArrowContainer = this._backArrow = _document.createElement('div'), forwardArrowContainer = this._forwardArrow = _document.createElement('div'), backArrow = _document.createElement('span'), forwardArrow = _document.createElement('span');
            if (this._isVertical) {
                backArrow.className = __Plat + 'icon-arrow-up';
                forwardArrow.className = __Plat + 'icon-arrow-down';
            }
            else {
                backArrow.className = __Plat + 'icon-arrow-left';
                forwardArrow.className = __Plat + 'icon-arrow-right';
            }
            backArrowContainer.className = __Plat + 'back-arrow';
            forwardArrowContainer.className = __Plat + 'forward-arrow';
            backArrowContainer.appendChild(backArrow);
            forwardArrowContainer.appendChild(forwardArrow);
            viewport.appendChild(backArrowContainer);
            viewport.appendChild(forwardArrowContainer);
        };
        /**
         * Checks the validity of the visibility of the forward and back arrows.
         */
        Carousel.prototype._checkArrows = function () {
            var utils = this.utils, isNode = utils.isNode;
            if (this._isInfinite || !(isNode(this._forwardArrow) && isNode(this._backArrow))) {
                return;
            }
            var contextLength = this.context.length, index = this._index;
            if (utils.isNull(index)) {
                this._backArrow.setAttribute(__Hide, '');
                this._forwardArrow.setAttribute(__Hide, '');
                return;
            }
            if (index <= 0) {
                this._backArrow.setAttribute(__Hide, '');
            }
            else {
                this._backArrow.removeAttribute(__Hide);
            }
            if (index >= contextLength - 1) {
                this._forwardArrow.setAttribute(__Hide, '');
            }
            else {
                this._forwardArrow.removeAttribute(__Hide);
            }
        };
        /**
         * Adds all event listeners to handle swipe events.
         */
        Carousel.prototype._initializeSwipe = function () {
            var container = this._viewport, swipeFn = this._handleSwipe, swipe, reverseSwipe;
            if (this._isVertical) {
                swipe = __$swipe + 'up';
                reverseSwipe = __$swipe + 'down';
            }
            else {
                swipe = __$swipe + 'left';
                reverseSwipe = __$swipe + 'right';
            }
            var removeListeners = this._removeListeners;
            removeListeners.push(this.addEventListener(container, swipe, swipeFn, false));
            removeListeners.push(this.addEventListener(container, reverseSwipe, swipeFn, false));
        };
        /**
         * Adds all event listeners to handle tracking events.
         */
        Carousel.prototype._initializeTrack = function () {
            var viewport = this._viewport, trackFn = this._track, touchEnd = this._touchEnd, track, reverseTrack;
            if (this._isVertical) {
                track = __$track + 'up';
                reverseTrack = __$track + 'down';
            }
            else {
                track = __$track + 'left';
                reverseTrack = __$track + 'right';
            }
            var removeListeners = this._removeListeners;
            removeListeners.push(this.addEventListener(viewport, track, trackFn, false));
            removeListeners.push(this.addEventListener(viewport, reverseTrack, trackFn, false));
            removeListeners.push(this.addEventListener(viewport, __$touchstart, this._touchStart, false));
            removeListeners.push(this.addEventListener(viewport, __$trackend, touchEnd, false));
            removeListeners.push(this.addEventListener(viewport, __$touchend, touchEnd, false));
        };
        /**
         * Handles a swipe event.
         */
        Carousel.prototype._handleSwipe = function (ev) {
            var direction = ev.direction.primary, hasSwiped = false;
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
        };
        /**
         * Log when the user touches the Carousel.
         * @param {plat.ui.IGestureEvent} ev The touch event.
         */
        Carousel.prototype._touchStart = function (ev) {
            if (this._inTouch) {
                return;
            }
            else if (this._isAuto) {
                this._removeInterval();
                this._removeInterval = noop;
            }
            this._inTouch = true;
            this._hasMoved = false;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
            if (!(this._outerStart && this._outerEnd)) {
                this._initializeOuterNodes();
            }
        };
        /**
         * The $touchend and $trackend event handler.
         * @param {plat.ui.IGestureEvent} ev The touch event.
         */
        Carousel.prototype._touchEnd = function (ev) {
            var _this = this;
            var inTouch = this._inTouch, hasMoved = this._hasMoved, hasSwiped = this._hasSwiped;
            this._inTouch = this._hasSwiped = this._hasMoved = false;
            if (!inTouch || hasSwiped) {
                return;
            }
            else if (this._isAuto && !this._isPaused) {
                this._initiateInterval();
            }
            if (!hasMoved) {
                return;
            }
            var distanceMoved = this._isVertical ? (ev.clientY - this._lastTouch.y) : (ev.clientX - this._lastTouch.x), length = this._getLength();
            if (!length) {
                this._reset();
                return;
            }
            else if (Math.abs(distanceMoved) > Math.ceil(length / 2)) {
                if (distanceMoved < 0) {
                    this.goToNext().then(function (success) {
                        if (!success) {
                            _this._reset();
                        }
                    });
                    return;
                }
                this.goToPrevious().then(function (success) {
                    if (!success) {
                        _this._reset();
                    }
                });
                return;
            }
            this._reset();
        };
        /**
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions
         * depending on the defined orientation.
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         */
        Carousel.prototype._track = function (ev) {
            var _this = this;
            if (!this._inTouch) {
                return;
            }
            else if (!this._hasMoved) {
                this._cancelCurrentAnimations();
            }
            this._hasMoved = true;
            this.utils.requestAnimationFrame(function () {
                var translation = _this._calculateDynamicTranslation(ev);
                if (translation === null) {
                    return;
                }
                _this._container.style[_this._transform] = translation;
            });
        };
        /**
         * Calculates the translation value for setting the transform value during a static index set.
         * @param {number} interval The interval change.
         */
        Carousel.prototype._calculateStaticTranslation = function (interval) {
            return this._isVertical ? 'translate3d(0,' + (this._currentOffset += interval) + 'px,0)' :
                'translate3d(' + (this._currentOffset += interval) + 'px,0,0)';
        };
        /**
         * Calculates the translation value for setting the transform value during tracking.
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         */
        Carousel.prototype._calculateDynamicTranslation = function (ev) {
            var offset;
            if (this._isVertical) {
                offset = ev.clientY - this._lastTouch.y;
                if (Math.abs(offset) > this._getLength()) {
                    this._touchEnd(ev);
                    return null;
                }
                return 'translate3d(0,' + (this._currentOffset + offset) + 'px,0)';
            }
            offset = ev.clientX - this._lastTouch.x;
            if (Math.abs(offset) > this._getLength()) {
                this._touchEnd(ev);
                return null;
            }
            return 'translate3d(' + (this._currentOffset + offset) + 'px,0,0)';
        };
        /**
         * Obtains the current browser's transform property value.
         */
        Carousel.prototype._setTransform = function () {
            var style = this._container.style, isUndefined = this.utils.isUndefined;
            var vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(style[(vendorPrefix.lowerCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
            else if (!isUndefined(style[(vendorPrefix.upperCase + 'Transform')])) {
                this._transform = vendorPrefix.upperCase + 'Transform';
            }
            else {
                this._transform = 'transform';
            }
        };
        /**
         * Gets the interval length of the sliding container.
         */
        Carousel.prototype._getLength = function () {
            return this._isVertical ? this._viewport.offsetHeight : this._viewport.offsetWidth;
        };
        /**
         * Checks the orientation of the control and ensures it is valid.
         * Will default to "horizontal" if invalid.
         * @param {string} orientation The element to base the length off of.
         */
        Carousel.prototype._validateOrientation = function (orientation) {
            if (this.utils.isUndefined(orientation)) {
                return 'horizontal';
            }
            var validOrientation;
            if (orientation === 'horizontal') {
                validOrientation = orientation;
            }
            else if (orientation === 'vertical') {
                validOrientation = orientation;
                this._isVertical = true;
            }
            else {
                var _Exception = this._Exception;
                _Exception.warn('Invalid orientation "' + orientation + '" for ' + this.type + '. Defaulting to "horizontal."', _Exception.CONTROL);
                validOrientation = 'horizontal';
            }
            return validOrientation;
        };
        /**
         * Adds an Array of items to the element without animating.
         * @param {Array<Node>} items The Array of items to add.
         */
        Carousel.prototype._appendItems = function (items) {
            this._itemNodes = this._itemNodes.concat(items);
        };
        /**
         * Removes items from the control's element.
         * @param {number} index The index to start disposing from.
         * @param {number} numberOfItems The number of items to remove.
         */
        Carousel.prototype._removeItems = function (index, numberOfItems) {
            var dispose = this._TemplateControlFactory.dispose, controls = this.controls, itemNodes = this._itemNodes, last = index + numberOfItems;
            while (last-- > index) {
                dispose(controls[last]);
                itemNodes.pop();
            }
            this._updateResource(controls.length - 1);
        };
        /**
         * Cancels the current animation.
         */
        Carousel.prototype._cancelCurrentAnimations = function () {
            if (this.utils.isNull(this._animationThenable)) {
                return this._Promise.resolve();
            }
            return this._animationThenable.cancel();
        };
        Carousel._inject = {
            _document: __Document,
            _window: __Window,
            _compat: __Compat,
            _TemplateControlFactory: __TemplateControlFactory
        };
        return Carousel;
    })(plat.ui.controls.ForEach);
    platui.Carousel = Carousel;
    plat.register.control(__Carousel, Carousel);
    /**
     * An ITemplateControl for creating a complex list of items with
     * extensive functionality.
     */
    var Listview = (function (_super) {
        __extends(Listview, _super);
        /**
         * The constructor for a Listview. Creates the itemsLoaded promise.
         */
        function Listview() {
            var _this = this;
            _super.call(this);
            /**
             * The HTML template represented as a string.
             */
            this.templateString = '<div class="plat-listview-viewport">\n' +
                '    <div class="plat-scroll-container">\n' +
                '        <div class="plat-container"></div>\n' +
                '    </div>\n' +
                '</div>\n';
            /**
             * Used to hold the alias tokens for the built-in aliases. You
             * can overwrite these with the options for
             * the Listview control.
             */
            this._aliases = {
                index: __listviewAliasOptions.index,
                even: __listviewAliasOptions.even,
                odd: __listviewAliasOptions.odd,
                first: __listviewAliasOptions.first,
                last: __listviewAliasOptions.last,
                group: __listviewAliasOptions.group
            };
            /**
             * An object containing the node names of the Listview's defined templates and
             * their corresponding template node.
             */
            this._templates = {};
            /**
             * Whether the control is vertical or horizontal.
             */
            this._isVertical = true;
            /**
             * Whether or not the user is currently performing a load operation.
             */
            this._isLoading = false;
            /**
             * The current scroll position of the container.
             */
            this._scrollPosition = 0;
            /**
             * Whether or not the user is currently performing a refresh operation.
             */
            this._isRefreshing = false;
            /**
             * An enumeration value signifying the current touch state.
             */
            this._touchState = 0;
            /**
             * Whether the user is tracking in a fashion that attempts to refresh the list.
             */
            this._hasMoved = false;
            /**
             * The last touch start recorded.
             */
            this._lastTouch = { x: 0, y: 0 };
            /**
             * A regular expression for normalizing a node name by removing potential special characters.
             */
            this._nodeNormalizeRegex = /-|\.|_/g;
            /**
             * Whether or not the select is grouped.
             */
            this._isGrouped = false;
            /**
             * The current number of times we checked to see if the element was placed into the DOM.
             * Used for determining height.
             */
            this._cloneAttempts = 0;
            /**
             * The max number of times we'll check to see if the element was placed into the DOM.
             * Used for determining height.
             */
            this._maxCloneAttempts = 25;
            /**
             * Whether or not the main Array listener has been set.
             */
            this.__listenerSet = false;
            this.itemsLoaded = new this._Promise(function (resolve) {
                _this.__resolveFn = resolve;
            });
        }
        /**
         * Sets the classes on the proper elements.
         * @param {string} className? An optional, additional class name or class names to set on the control
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to
         * the control's element if not specified.
         */
        Listview.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Listview + ' ' + (className || ''));
        };
        /**
         * Check for templateUrl and set if needed.
         */
        Listview.prototype.initialize = function () {
            var optionObj = this.options || (this.options = {}), options = optionObj.value || (optionObj.value = {});
            this.templateUrl = this.templateUrl || options.templateUrl;
            this.setClasses();
        };
        /**
         * Parse the innerTemplate and add it to the control's element.
         */
        Listview.prototype.setTemplate = function () {
            if (!this.utils.isString(this.templateUrl)) {
                return;
            }
            var fragment = this.dom.serializeHtml(this.templateString), element = this.element;
            this.innerTemplate = this.dom.appendChildren(element.childNodes);
            element.appendChild(fragment);
        };
        /**
         * Re-syncs the Listview child controls and DOM with the new
         * array.
         * @param {Array<any>} newValue? The new Array
         * @param {Array<any>} oldValue? The old Array
         */
        Listview.prototype.contextChanged = function (newValue, oldValue) {
            var _this = this;
            var utils = this.utils;
            if (utils.isEmpty(newValue)) {
                if (!this.utils.isEmpty(oldValue)) {
                    this._Promise.all(this._defaultGroup.addQueue).then(function () {
                        _this._removeItems(0, _this.controls.length, _this);
                    });
                }
            }
            else if (!utils.isArray(newValue)) {
                var _Exception = this._Exception;
                _Exception.warn(this.type + ' context must be an Array.', _Exception.CONTEXT);
                return;
            }
            this._setListener();
            this._executeEvent([{
                    object: newValue || [],
                    type: 'splice'
                }]);
        };
        /**
         * Determine item templates and kick off rendering.
         */
        Listview.prototype.loaded = function () {
            var options = this.options.value, utils = this.utils, isString = utils.isString, element = this.element, viewport = this._viewport = element.firstElementChild, scrollContainer = this._scrollContainer = viewport.firstElementChild, loading = this._loading = options.loading, animate = this._animate = options.animate === true, requestItems = options.onItemsRequested, refresh = options.onRefresh, itemTemplate = options.itemTemplate, _Exception;
            this._container = scrollContainer.firstElementChild;
            this.dom.addClass(element, __Plat + this._validateOrientation(options.orientation) +
                (animate ? (' ' + __Plat + 'animated') : ''));
            if (!isString(itemTemplate)) {
                _Exception = this._Exception;
                _Exception.warn('No item template or item template selector specified for ' + this.type + '.', _Exception.TEMPLATE);
                return;
            }
            var normalizedItemTemplate = this._normalizeTemplateName(itemTemplate), groupHeaderTemplate = options.groupHeaderTemplate, normalizedGroupTemplate = isString(groupHeaderTemplate) ? this._normalizeTemplateName(groupHeaderTemplate) : null;
            this._parseInnerTemplate(normalizedItemTemplate, normalizedGroupTemplate);
            this._determineTemplates(itemTemplate, normalizedItemTemplate, normalizedGroupTemplate);
            this._defaultGroup = {
                name: null,
                control: this,
                itemContainer: this._container,
                element: element,
                index: null,
                itemCount: 0,
                addQueue: [],
                animationQueue: []
            };
            var isLoading = false, isRefreshing = false;
            if (isString(loading)) {
                if (isString(requestItems)) {
                    isLoading = true;
                    this._determineLoading(requestItems, options.infiniteProgress !== false);
                }
                else {
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
            if (!utils.isArray(this.context)) {
                if (!utils.isNull(this.context)) {
                    _Exception = this._Exception;
                    _Exception.warn(this.type + '\'s context must be an Array.', _Exception.CONTEXT);
                }
                return;
            }
            this._setAliases();
            this.render();
            this._setListener();
        };
        /**
         * Removes any potentially held memory.
         */
        Listview.prototype.dispose = function () {
            this.__resolveFn = null;
        };
        /**
         * Blow out the DOM starting at the index, determine how to render, and render the count accordingly.
         * @param {number} index? The starting index to render. If not specified, it will start at currentCount.
         * @param {number} count? The number of items to render. If not specified, the whole context
         * from the specified index will be rendered.
         * @param {platui.IGroupHash} group? The group we're rendering.
         */
        Listview.prototype.render = function (index, count, group) {
            var isNumber = this.utils.isNumber, opGroup = group || this._defaultGroup, control = opGroup.control, context = this === control ? this.context : control.context.items;
            if (!isNumber(index)) {
                index = 0;
            }
            var maxCount = context.length - index, itemCount = isNumber(count) && maxCount >= count ? count : maxCount;
            this._createItems(index, itemCount, opGroup, 0);
        };
        /**
         * Blow out all the DOM, determine how to render, and render accordingly.
         * @param {platui.IGroupHash} group? The group we're rerendering.
         */
        Listview.prototype.rerender = function (group) {
            this.render(0, null, group);
        };
        /**
         * Re-syncs the Listview child items and DOM with the new items
         * array.
         * @param {string} groupName The group name of the currently changing Array.
         * @param {any} newValue? The new child array of items
         * @param {any} oldValue? The old child array of items
         */
        Listview.prototype._childContextChanged = function (groupName, newValue, oldValue) {
            this._executeChildEvent(groupName, [{
                    object: newValue || [],
                    type: 'splice'
                }]);
        };
        /**
         * Sets a listener for the changes to the array.
         */
        Listview.prototype._setListener = function () {
            if (!this.__listenerSet) {
                this.observeArray(this._executeEvent);
                this.__listenerSet = true;
            }
        };
        /**
         * Sets the alias tokens to use for all the items in the Listview context array.
         */
        Listview.prototype._setAliases = function () {
            var aliases = this.options.value.aliases, utils = this.utils;
            if (!utils.isObject(aliases)) {
                return;
            }
            var _aliases = this._aliases, isString = utils.isString, keys = Object.keys(_aliases), length = keys.length, value;
            for (var i = 0; i < length; ++i) {
                value = aliases[keys[i]];
                if (isString(value)) {
                    _aliases[keys[i]] = value;
                }
            }
        };
        /**
         * Determine the proper item template or method of item template selection.
         * @param {string} itemTemplate The pre-normalized property for indicating either the item template or the
         * item template selector.
         * @param {string} itemTemplateKey The normalized property for indicating the item template.
         * @param {string} groupHeaderTemplate The property for indicating the group header template.
         */
        Listview.prototype._determineTemplates = function (itemTemplate, itemTemplateKey, groupHeaderTemplate) {
            var _Exception, utils = this.utils, bindableTemplates = this.bindableTemplates, templates = this._templates, template;
            if (utils.isString(groupHeaderTemplate)) {
                this._isGrouped = true;
                template = templates[groupHeaderTemplate];
                if (utils.isNode(template)) {
                    this._groupHeaderTemplate = groupHeaderTemplate;
                    this.bindableTemplates.add(groupHeaderTemplate, template);
                    delete templates[groupHeaderTemplate];
                }
                else {
                    _Exception = this._Exception;
                    _Exception.warn(__Listview + ' group header template "' + groupHeaderTemplate +
                        '" was not a template defined in the DOM.', _Exception.TEMPLATE);
                }
                this._groupHeaderTemplatePromise = this._createGroupTemplate();
            }
            template = templates[itemTemplateKey];
            if (utils.isNode(template)) {
                this._itemTemplate = itemTemplateKey;
                this.bindableTemplates.add(itemTemplateKey, template);
                delete templates[itemTemplateKey];
                return;
            }
            var controlProperty = this.findProperty(itemTemplate) || {};
            if (!utils.isFunction(controlProperty.value)) {
                _Exception = this._Exception;
                _Exception.warn(__Listview + ' item template "' + itemTemplate +
                    '" was neither a template defined in the DOM nor a template selector function in its control hiearchy.', _Exception.TEMPLATE);
            }
            this._templateSelector = controlProperty.value.bind(controlProperty.control);
            this._templateSelectorKeys = {};
            var keys = Object.keys(templates), key;
            while (keys.length > 0) {
                key = keys.pop();
                bindableTemplates.add(key, templates[key]);
                delete templates[key];
            }
        };
        /**
         * Construct the group template and add it to bindable templates.
         */
        Listview.prototype._createGroupTemplate = function () {
            var _this = this;
            var _document = this._document, options = this.options.value, bindableTemplates = this.bindableTemplates, groupHeaderTemplate = this._groupHeaderTemplate, groupHeader = this._templates[groupHeaderTemplate], listviewGroup = __Listview + '-group', group = _document.createElement('div'), itemContainer = _document.createElement('div'), headerPromise;
            group.className = listviewGroup;
            itemContainer.className = __Listview + '-items';
            if (this.utils.isString(groupHeaderTemplate)) {
                headerPromise = bindableTemplates.templates[groupHeaderTemplate].then(function (headerTemplate) {
                    group.insertBefore(headerTemplate.cloneNode(true), null);
                });
            }
            return this._Promise.resolve(headerPromise).then(function () {
                group.insertBefore(itemContainer, null);
                bindableTemplates.add(listviewGroup, group);
            }).then(null, function (error) {
                var _Exception = _this._Exception;
                _Exception.warn(_this.type + ' error: ' + error, _Exception.COMPILE);
            });
        };
        /**
         * Adds new groups to the control's element when items are added to
         * the context.
         * @param {number} numberOfGroups The number of groups to add.
         * @param {number} index The point in the array to start adding groups.
         * @param {number} animateItems The number of groups to animate.
         */
        Listview.prototype._addGroups = function (numberOfGroups, index, animateItems) {
            var _this = this;
            var context = this.context, initialIndex = index, max = +(index + numberOfGroups);
            var promises = [], fragment, i;
            while (index < max) {
                promises.push(this._bindGroup(index++));
            }
            return this._Promise.all(promises).then(function (fragments) {
                var length = fragments.length;
                for (i = 0; i < length; ++i) {
                    _this._addGroup(i + initialIndex, fragments[i], i < animateItems);
                }
            });
        };
        /**
         * Adds new group to the control's element.
         * @param {number} index The index of the group.
         * @param {DocumentFragment} fragment The group fragment to add to the DOM.
         * @param {boolean} animate Whether or not to animate the group.
         */
        Listview.prototype._addGroup = function (index, fragment, animate) {
            var _this = this;
            var context = this.context, groups = this._groups || (this._groups = {}), group = context[index], name = group.group, groupContainer = fragment.childNodes[1], itemContainer = groupContainer.lastElementChild, control = this.controls[index], groupHash = groups[name] = {
                name: name,
                index: index,
                element: groupContainer,
                itemContainer: itemContainer,
                control: control,
                itemCount: 0,
                addQueue: [],
                animationQueue: []
            }, items = 'items', removeArrayListener, removeMutationListener;
            control.dispose = function () {
                _super.prototype.dispose.call(_this);
                delete groups[name];
            };
            control.observe(function (newValue, oldValue) {
                var newName = newValue.group;
                if (newName === name || !_this.utils.isObject(newValue)) {
                    return;
                }
                var temp = groups[name];
                delete groups[name];
                temp.name = newName;
                groups[newName] = temp;
                name = newName;
                removeArrayListener();
                removeMutationListener();
                removeArrayListener = control.observe(_this._childContextChanged.bind(_this, name), items);
                removeMutationListener = control.observeArray(_this._executeChildEvent.bind(_this, name), items);
            });
            removeArrayListener = control.observe(this._childContextChanged.bind(this, name), items);
            removeMutationListener = control.observeArray(this._executeChildEvent.bind(this, name), items);
            this._createItems(0, (group.items || []).length, groupHash, 0);
            if (animate) {
                var animationQueue = this._defaultGroup.animationQueue;
                animationQueue.push({
                    animation: this._animator.enter(fragment, __Enter, this._container).then(function () {
                        animationQueue.shift();
                        if (!_this._isVertical) {
                            // set height for flexbox container 
                            _this._setItemContainerHeight(itemContainer);
                        }
                    }),
                    op: null
                });
            }
            else {
                this._container.insertBefore(fragment, null);
                if (!this._isVertical) {
                    // set height for flexbox container 
                    this._setItemContainerHeight(itemContainer);
                }
            }
        };
        /**
         * Handle binding of a single group.
         * @param {number} index The index of the group in context.
         */
        Listview.prototype._bindGroup = function (index) {
            return this.bindableTemplates.bind(__Listview + '-group', index, this._getAliases(this.context, index));
        };
        /**
         * Creates a specified number of items.
         * @param {number} index The index to start creating items.
         * @param {number} count The number of items to create.
         * @param {platui.IGroupHash} group The group for which we're creating items.
         * @param {number} animateItems The number of items to animate.
         */
        Listview.prototype._createItems = function (index, count, group, animateItems) {
            var _this = this;
            var utils = this.utils, opGroup = group || this._defaultGroup, control = opGroup.control;
            if (this._isGrouped && this === control) {
                this._groupHeaderTemplatePromise.then(function () {
                    _this._addGroups(count, index, animateItems);
                }).then(null, function (error) {
                    var _Exception = _this._Exception;
                    _Exception.warn(_this.type + ' error: ' + error, _Exception.CONTROL);
                });
                return;
            }
            var addQueue = opGroup.addQueue;
            if (utils.isFunction(this._templateSelector)) {
                var promises = [];
                opGroup.itemCount += count;
                for (var i = 0; i < count; ++i, ++index) {
                    promises.push(this._renderUsingFunction(index, opGroup, i < animateItems));
                }
                var itemsLoaded = this._Promise.all(promises).then(function () {
                    var indexOf = addQueue.indexOf(addPromise);
                    if (indexOf !== -1) {
                        addQueue.splice(indexOf, 1);
                    }
                    if (!_this._isVertical) {
                        _this._setItemContainerWidth(opGroup.itemContainer);
                    }
                });
                addQueue.push(itemsLoaded);
                this.itemsLoaded = itemsLoaded;
                return;
            }
            var key = this._itemTemplate;
            if (utils.isUndefined(this.bindableTemplates.templates[key])) {
                return;
            }
            this._disposeFromIndex(index, opGroup);
            opGroup.itemCount += count;
            var addPromise = this._addItems(index, count, opGroup, animateItems).then(function () {
                var index = addQueue.indexOf(addPromise);
                if (index !== -1) {
                    addQueue.splice(index, 1);
                }
                if (!_this._isVertical) {
                    _this._setItemContainerWidth(opGroup.itemContainer);
                }
            });
            addQueue.push(addPromise);
        };
        /**
         * Adds new items to the control's element when items are added to
         * the array.
         * @param {number} index The point in the array to start adding items.
         * @param {number} numberOfItems The number of items to add.
         * @param {platui.IGroupHash} group The group that we're performing this operation on.
         * @param {number} animateItems The number of items to animate.
         */
        Listview.prototype._addItems = function (index, numberOfItems, group, animateItems) {
            var _this = this;
            var opGroup = group || this._defaultGroup, control = opGroup.control, container = opGroup.itemContainer, max = +(index + numberOfItems), promises = [], itemTemplate = this._itemTemplate, bindableTemplates = control.bindableTemplates, initialIndex = index, identifier, context;
            if (this === control) {
                identifier = '';
                context = this.context;
            }
            else {
                identifier = 'items.';
                context = control.context.items;
            }
            while (index < max) {
                promises.push(bindableTemplates.bind(itemTemplate, identifier + index, this._getAliases(context, index++)));
            }
            if (promises.length > 0) {
                this.itemsLoaded = this._Promise.all(promises).then(function (templates) {
                    if (animateItems > 0) {
                        var length = templates.length;
                        for (var i = 0; i < length; ++i) {
                            if (i < animateItems) {
                                _this._appendAnimatedItem(templates[i], opGroup);
                            }
                            else {
                                container.insertBefore(templates[i], null);
                            }
                        }
                    }
                    else {
                        _this._appendItems(templates, container);
                    }
                    _this._updateResource(initialIndex - 1, control);
                    if (_this.utils.isFunction(_this.__resolveFn)) {
                        _this.__resolveFn();
                        _this.__resolveFn = null;
                    }
                }).catch(function (error) {
                    _this.utils.postpone(function () {
                        var _Exception = _this._Exception;
                        _Exception.warn(error, _Exception.BIND);
                    });
                });
            }
            return this.itemsLoaded;
        };
        /**
         * Render items using a defined render function starting at a given index and continuing
         * through for a set number of items. If undefined or null is returned from the function,
         * rendering will stop.
         * @param {number} index The starting index to render.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         * @param {boolean} animate? Whether or not to animate the new items.
         */
        Listview.prototype._renderUsingFunction = function (index, group, animate) {
            var _this = this;
            var _Promise = this._Promise, utils = this.utils, opGroup = group || this._defaultGroup, control = opGroup.control, identifier, context;
            if (this === control) {
                identifier = index;
                context = this.context;
            }
            else {
                identifier = 'items.' + index;
                context = control.context.items;
            }
            return _Promise.resolve(this._templateSelectorPromise).then(function () {
                return _this._templateSelectorPromise = _Promise.resolve(_this._templateSelector(context[index], index));
            }).then(function (selectedTemplate) {
                var bindableTemplates = control.bindableTemplates, templates = bindableTemplates.templates, controls = control.controls, key = _this._normalizeTemplateName(selectedTemplate), name = opGroup.name, templateKeys = _this._templateSelectorKeys[name], controlExists = index < controls.length;
                if (utils.isUndefined(templateKeys)) {
                    templateKeys = _this._templateSelectorKeys[name] = {};
                }
                if (!utils.isUndefined(templates[key])) {
                    if (controlExists) {
                        if (key === templateKeys[index]) {
                            return;
                        }
                        templateKeys[index] = key;
                        return bindableTemplates.replace(index, key, identifier, _this._getAliases(context, index));
                    }
                    templateKeys[index] = key;
                    return bindableTemplates.bind(key, identifier, _this._getAliases(context, index));
                }
                else if (controlExists) {
                    _this._TemplateControlFactory.dispose(controls[index]);
                }
            }).then(function (node) {
                if (utils.isNull(node) || utils.isArray(node)) {
                    return;
                }
                else if (animate === true) {
                    var animationQueue = opGroup.animationQueue;
                    animationQueue.push({
                        animation: _this._animator.enter(node, __Enter, opGroup.itemContainer).then(function () {
                            animationQueue.shift();
                        }),
                        op: null
                    });
                    return;
                }
                opGroup.itemContainer.insertBefore(node, null);
            }).then(null, function (error) {
                var _Exception = _this._Exception;
                _Exception.warn(_this.type + ' error: ' + error, _Exception.CONTROL);
            });
        };
        /**
         * Updates the control's children resource objects when
         * the array changes.
         * @param {number} index? The index to begin updating.
         * @param {number} count? The number of resources to update.
         * @param {plat.ui.TemplateControl} control The control whose resources are to be updated.
         */
        Listview.prototype._updateResource = function (index, control) {
            var controls = control.controls;
            if (index < 0 || index >= controls.length) {
                return;
            }
            controls[index].resources.add(this._getAliases(this === control ? this.context : control.context.items, index));
        };
        /**
         * Returns a resource alias object for an item in the array. The
         * resource object contains index:number, even:boolean, odd:boolean,
         * first:boolean, and last:boolean.
         * @param {any} context The context to get the aliases for.
         * @param {number} index The index used to create the resource aliases.
         */
        Listview.prototype._getAliases = function (context, index) {
            var isEven = (index & 1) === 0, aliases = {}, _aliases = this._aliases, type = __LITERAL_RESOURCE;
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
        };
        /**
         * Adds an Array of items to the element without animating.
         * @param {Array<Node>} items The Array of items to add.
         * @param {Element} container THe container to add the items to.
         */
        Listview.prototype._appendItems = function (items, container) {
            this.dom.appendChildren(items, container);
        };
        /**
         * Adds an item to the control's element animating its elements.
         * @param {DocumentFragment} item The HTML fragment representing a single item.
         * @param {platui.IGroupHash} group The group items are being added to.
         */
        Listview.prototype._appendAnimatedItem = function (item, group) {
            if (!this.utils.isNode(item)) {
                return;
            }
            var animationQueue = group.animationQueue;
            animationQueue.push({
                animation: this._animator.enter(item, __Enter, group.itemContainer).then(function () {
                    animationQueue.shift();
                }),
                op: null
            });
        };
        /**
         * Removes items from the control's element.
         * @param {number} index The index to start disposing from.
         * @param {number} numberOfItems The number of items to remove.
         * @param {plat.ui.TemplateControl} control The control whose child controls we are to remove.
         */
        Listview.prototype._removeItems = function (index, numberOfItems, control) {
            var dispose = this._TemplateControlFactory.dispose, controls = control.controls, last = index + numberOfItems;
            while (last-- > index) {
                dispose(controls[last]);
            }
            this._updateResource(controls.length - 1, control);
        };
        /**
         * Dispose of the controls and DOM starting at a given index.
         * @param {number} index The starting index to dispose.
         * @param {platui.IGroupHash} group? The group for which we're disposing items.
         */
        Listview.prototype._disposeFromIndex = function (index, group) {
            var controls = (group || this._defaultGroup).control.controls, dispose = this._TemplateControlFactory.dispose;
            for (var i = controls.length - 1; i >= index; --i) {
                dispose(controls[i]);
            }
        };
        /**
         * Find and determine the proper loading function.
         * @param {string} requestItems The property for indicating the function for requesting more items.
         * @param {boolean} hideRing? Whether or not to hide the progress ring for "incremental" loading.
         */
        Listview.prototype._determineLoading = function (requestItems, showRing) {
            var _this = this;
            var controlProperty = this.findProperty(requestItems) || {};
            if (!this.utils.isFunction(controlProperty.value)) {
                var _Exception = this._Exception;
                _Exception.warn(__Listview + ' onItemsRequested function "' + requestItems +
                    '" was not found.', _Exception.CONTROL);
                return;
            }
            this._requestItems = controlProperty.value.bind(controlProperty.control);
            var progressRingContainer;
            switch (this._loading) {
                case 'infinite':
                    this._removeScroll = this.addEventListener(this._scrollContainer, 'scroll', this._onScroll, false);
                    if (showRing) {
                        progressRingContainer = this._loadingProgressRing = this._document.createElement('div');
                        progressRingContainer.className = 'plat-infinite';
                        progressRingContainer.insertBefore(this._generateProgressRing(), null);
                    }
                    this.itemsLoaded.then(function () {
                        _this._handleScroll();
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
        };
        /**
         * The scroll event listener.
         * @param {Event} ev The scroll event object.
         */
        Listview.prototype._onScroll = function (ev) {
            var scrollContainer = this._scrollContainer, scrollPos = this._scrollPosition, scrollPosition = this._isVertical ?
                scrollContainer.scrollTop + scrollContainer.offsetHeight :
                scrollContainer.scrollLeft + scrollContainer.offsetWidth;
            if (scrollPos > scrollPosition) {
                this._scrollPosition = scrollPosition;
                return;
            }
            else if (scrollPos + 5 > scrollPosition) {
                // debounce excessive scroll event calls 
                return;
            }
            this._scrollPosition = scrollPosition;
            this._handleScroll();
        };
        /**
         * Checks if the scrolling has hit the proper threshold and requests more items if it has.
         */
        Listview.prototype._handleScroll = function () {
            var _this = this;
            // infinite scrolling set to load items at 80% of scroll length 
            var scrollContainer = this._scrollContainer, scrollLength = 0.8 * (this._isVertical ? scrollContainer.scrollHeight : scrollContainer.scrollWidth), utils = this.utils;
            if (scrollLength === 0) {
                return;
            }
            else if (this._scrollPosition >= scrollLength) {
                var itemsRemain = this._requestItems();
                if (itemsRemain === false) {
                    this._removeScroll();
                }
                else if (utils.isPromise(itemsRemain)) {
                    var progressRing = this._loadingProgressRing, showProgress = !utils.isNull(progressRing), container = this._container;
                    this._removeScroll();
                    if (showProgress) {
                        utils.requestAnimationFrame(function () {
                            container.insertBefore(progressRing, null);
                        });
                    }
                    itemsRemain.then(function (moreItemsRemain) {
                        if (showProgress) {
                            utils.requestAnimationFrame(function () {
                                container.removeChild(progressRing);
                            });
                        }
                        if (moreItemsRemain === false) {
                            return;
                        }
                        _this._removeScroll = _this.addEventListener(scrollContainer, 'scroll', _this._onScroll, false);
                    });
                }
            }
        };
        /**
         * Find and determine the pull-to-refresh function.
         * @param {string} pullRefresh The property for indicating the pull-to-refresh function.
         */
        Listview.prototype._initializeRefresh = function (refresh) {
            var controlProperty = this.findProperty(refresh) || {};
            if (!this.utils.isFunction(controlProperty.value)) {
                var _Exception = this._Exception;
                _Exception.warn(__Listview + ' onRefresh function "' + refresh +
                    '" was not found.', _Exception.CONTROL);
                return;
            }
            this._refresh = controlProperty.value.bind(controlProperty.control);
            var progressRingContainer = this._refreshProgressRing = this._document.createElement('div');
            progressRingContainer.className = 'plat-refresh';
            progressRingContainer.setAttribute(__Hide, '');
            progressRingContainer.insertBefore(this._generateProgressRing(), null);
            this.element.insertBefore(progressRingContainer, null);
        };
        /**
         * Initializes the proper tracking events.
         * @param {boolean} loading Whether or not to initialize the loading tracking events.
         * @param {boolean} refresh Whether or not to initialize the refresh tracking events.
         */
        Listview.prototype._initializeTracking = function (loading, refresh) {
            if (!(loading || refresh)) {
                return;
            }
            this._setTransform();
            var track, reverseTrack;
            if (this._isVertical) {
                track = __$track + 'down';
                reverseTrack = __$track + 'up';
            }
            else {
                track = __$track + 'right';
                reverseTrack = __$track + 'left';
            }
            var viewport = this._viewport, touchEnd, trackFn;
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
        };
        /**
         * The touch start event listener for when looking for a refresh.
         * @param {plat.ui.IGestureEvent} ev The $touchstart event object.
         */
        Listview.prototype._touchStart = function (ev) {
            var _this = this;
            if (this._touchState !== 0) {
                return;
            }
            else if (!this._isVertical) {
                var pos = Math.ceil(ev.offsetY), 
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
                this._touchAnimationThenable.cancel().then(function () {
                    _this._touchAnimationThenable = null;
                    _this._touchState = 2;
                });
                return;
            }
            this._touchState = 2;
        };
        /**
         * The touch end event listener for when looking for an incremental load.
         * @param {plat.ui.IGestureEvent} ev The $touchend event object.
         */
        Listview.prototype._touchEndLoad = function (ev) {
            var isLoading = this._isLoading;
            this._isLoading = false;
            if (!isLoading) {
                if (!this._isRefreshing) {
                    this._touchState = 0;
                }
                return;
            }
            var scrollContainer = this._scrollContainer, scrollLength, threshold;
            if (this._isVertical) {
                scrollLength = scrollContainer.scrollTop + scrollContainer.offsetHeight;
                threshold = scrollContainer.scrollHeight;
            }
            else {
                scrollLength = scrollContainer.scrollLeft + scrollContainer.offsetWidth;
                threshold = scrollContainer.scrollWidth;
            }
            // do plus 1 here for browser pixel inconsistency 
            if (scrollLength + 1 < threshold) {
                this._touchState = 0;
                return;
            }
            this._touchEnd(ev, false);
        };
        /**
         * The touch end event listener for when looking for a refresh.
         * @param {plat.ui.IGestureEvent} ev The $touchend event object.
         */
        Listview.prototype._touchEndRefresh = function (ev) {
            var isRefreshing = this._isRefreshing;
            this._isRefreshing = false;
            if (!isRefreshing) {
                if (!this._isLoading) {
                    this._touchState = 0;
                }
                return;
            }
            else if ((this._isVertical ? this._scrollContainer.scrollTop : this._scrollContainer.scrollLeft) > 0) {
                this._touchState = 0;
                return;
            }
            this._touchEnd(ev, true);
        };
        /**
         * A common touch end event listener for both refresh and incremental loading.
         * @param {plat.ui.IGestureEvent} ev The $touchend event object.
         * @param {boolean} refreshing Whether this translation is for refresh or incremental loading.
         */
        Listview.prototype._touchEnd = function (ev, refreshing) {
            var _this = this;
            var state = this._touchState, hasMoved = this._hasMoved;
            this._hasMoved = false;
            if (state < 2 || !hasMoved) {
                return;
            }
            var animationOptions = {}, dom = this.dom, viewport = this._viewport, progressRing = refreshing ? this._refreshProgressRing : this._loadingProgressRing, isActionState = state === 3, nextTranslation;
            if (isActionState) {
                var offset;
                if (this._isVertical) {
                    offset = refreshing ? progressRing.offsetHeight : -progressRing.offsetHeight;
                    nextTranslation = 'translate3d(0,' + offset + 'px,0)';
                }
                else {
                    offset = refreshing ? progressRing.offsetWidth : -progressRing.offsetWidth;
                    nextTranslation = 'translate3d(' + offset + 'px,0,0)';
                }
            }
            else {
                nextTranslation = this._preTransform;
            }
            animationOptions[this._transform] = nextTranslation;
            this._touchAnimationThenable = this._animator.animate(viewport, __Transition, {
                properties: animationOptions
            }).then(function () {
                _this._touchState = 4;
                _this._hasMoved = false;
                _this._touchAnimationThenable = null;
                if (isActionState) {
                    return _this._Promise.resolve(refreshing ? _this._refresh() : _this._requestItems());
                }
                dom.removeClass(viewport, __Plat + 'manipulation-prep');
                progressRing.setAttribute(__Hide, '');
                return _this._Promise.resolve();
            }).then(function () {
                if (!isActionState) {
                    _this._touchState = 0;
                    return;
                }
                dom.removeClass(progressRing, __Plat + 'play');
                animationOptions[_this._transform] = _this._preTransform;
                return _this._touchAnimationThenable = _this._animator.animate(viewport, __Transition, {
                    properties: animationOptions
                }).then(function () {
                    _this._touchState = 0;
                    _this._touchAnimationThenable = null;
                    dom.removeClass(viewport, __Plat + 'manipulation-prep');
                    progressRing.setAttribute(__Hide, '');
                });
            }).then(null, function (error) {
                _this._touchState = 0;
                var _Exception = _this._Exception;
                _Exception.warn(_this.type + 'error: ' + error, _Exception.CONTROL);
            });
        };
        /**
         * The tracking event listener for looking for a load.
         * @param {plat.ui.IGestureEvent} ev The $track[direction] event object.
         */
        Listview.prototype._trackLoad = function (ev) {
            if (this._isRefreshing) {
                return;
            }
            if (!this._isLoading) {
                var scrollContainer = this._scrollContainer, scrollLength, threshold;
                if (this._isVertical) {
                    if (ev.direction.y !== 'up') {
                        return;
                    }
                    scrollLength = scrollContainer.scrollTop + scrollContainer.offsetHeight;
                    threshold = scrollContainer.scrollHeight;
                }
                else {
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
        };
        /**
         * The tracking event listener for looking for a refresh.
         * @param {plat.ui.IGestureEvent} ev The $track[direction] event object.
         */
        Listview.prototype._trackRefresh = function (ev) {
            if (this._isLoading) {
                return;
            }
            if (!this._isRefreshing) {
                if (this._isVertical) {
                    if (ev.direction.y !== 'down' || this._scrollContainer.scrollTop > 0) {
                        return;
                    }
                }
                else if (ev.direction.x !== 'right' || this._scrollContainer.scrollLeft > 0) {
                    return;
                }
                this._isRefreshing = true;
            }
            this._track(ev, true);
        };
        /**
         * Handles the translation of the viewport while tracking.
         * @param {plat.ui.IGestureEvent} ev The $track[direction] event object.
         * @param {boolean} refreshing Whether this translation is for refresh or incremental loading.
         */
        Listview.prototype._track = function (ev, refreshing) {
            var _this = this;
            var touchState = this._touchState;
            if (!(touchState === 2 || touchState === 3)) {
                return;
            }
            var translation = this._calculateTranslation(ev, refreshing);
            this.utils.requestAnimationFrame(function () {
                _this._viewport.style[_this._transform] = translation;
            });
        };
        /**
         * Calculates the translation value for setting the transform value during tracking.
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * @param {boolean} refreshing Whether this translation is for refresh or incremental loading.
         */
        Listview.prototype._calculateTranslation = function (ev, refreshing) {
            var isVertical = this._isVertical, progressRing = refreshing ? this._refreshProgressRing : this._loadingProgressRing, diff, threshold;
            if (isVertical) {
                diff = ev.clientY - this._lastTouch.y;
                threshold = progressRing.offsetHeight;
            }
            else {
                diff = ev.clientX - this._lastTouch.x;
                threshold = progressRing.offsetWidth;
            }
            if ((refreshing && diff < 0) || (!refreshing && diff > 0)) {
                diff = 0;
            }
            else if (!this._hasMoved) {
                this._hasMoved = true;
                this.dom.addClass(this._viewport, __Plat + 'manipulation-prep');
                progressRing.removeAttribute(__Hide);
            }
            else if (Math.abs(diff) >= threshold) {
                if (this._touchState < 3) {
                    this._touchState = 3;
                    this.dom.addClass(progressRing, __Plat + 'play');
                }
            }
            else if (this._touchState === 3) {
                this._touchState = 2;
                this.dom.removeClass(progressRing, __Plat + 'play');
            }
            if (isVertical) {
                return 'translate3d(0,' + diff + 'px,0)';
            }
            return 'translate3d(' + diff + 'px,0,0)';
        };
        /**
         * Obtains the current browser's transform property value.
         */
        Listview.prototype._setTransform = function () {
            var style = this._viewport.style, isUndefined = this.utils.isUndefined;
            var vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(this._preTransform = style[(vendorPrefix.lowerCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
            else if (!isUndefined(this._preTransform = style[(vendorPrefix.upperCase + 'Transform')])) {
                this._transform = vendorPrefix.upperCase + 'Transform';
            }
            else {
                this._preTransform = style.transform;
                this._transform = 'transform';
            }
        };
        /**
         * Clones and parses thes innerTemplate and creates the templates object.
         * @param {string} itemTemplate The normalized item template name from the options.
         * @param {string} groupHeaderTemplate? The normalized group header template name from the options.
         */
        Listview.prototype._parseInnerTemplate = function (itemTemplate, groupHeaderTemplate) {
            var templates = this._templates, slice = Array.prototype.slice, appendChildren = this.dom.appendChildren, _document = this._document, validGroupTemplate = !this.utils.isNull(groupHeaderTemplate), childNodes = slice.call(this.innerTemplate.childNodes), length = childNodes.length, itemClass = __Plat + 'item', groupClass = __Plat + 'header', childNode, templateName, container;
            while (childNodes.length > 0) {
                childNode = childNodes.pop();
                if (childNode.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }
                templateName = this._normalizeTemplateName(childNode.nodeName);
                if (validGroupTemplate && templateName === groupHeaderTemplate) {
                    container = _document.createElement('div');
                    container.className = groupClass;
                }
                else {
                    container = _document.createElement('div');
                    container.className = itemClass;
                }
                container = appendChildren(childNode.childNodes, container);
                templates[templateName] = container;
            }
        };
        /**
         * Receives an event when a method has been called on an array and maps the array
         * method to its associated method handler.
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         */
        Listview.prototype._executeEvent = function (changes) {
            var method = '_' + changes[0].type;
            if (this.utils.isFunction(this[method])) {
                this[method](changes);
            }
        };
        /**
         * Adds new group to the control's element.
         * @param {string} groupName The group name of the currently changing Array.
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         */
        Listview.prototype._executeChildEvent = function (groupName, changes) {
            var utils = this.utils, method = '_' + changes[0].type;
            if (utils.isFunction(this[method])) {
                var group = this._groups[groupName];
                if (utils.isNull(group)) {
                    return;
                }
                this[method](changes, group);
            }
        };
        /**
         * First checks if the push will do anything, then handles items being pushed into the array.
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         */
        Listview.prototype._push = function (changes, group) {
            var change = changes[0], addedCount = change.addedCount;
            this._createItems(change.index, addedCount, group, this._animate ? addedCount : 0);
        };
        /**
         * Handles items being popped off the array.
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         */
        Listview.prototype._pop = function (changes, group) {
            var _this = this;
            var opGroup = group || this._defaultGroup, addQueue = opGroup.addQueue, change = changes[0], start = change.object.length;
            if (change.removed.length === 0) {
                return;
            }
            var removeIndex = change.object.length;
            if (opGroup.itemCount > 0) {
                opGroup.itemCount--;
            }
            this._Promise.all(addQueue).then(function () {
                if (_this._animate) {
                    _this._animateItems(start, 1, __Leave, opGroup, 'leave', false).then(function () {
                        _this._removeItems(removeIndex, 1, opGroup.control);
                    });
                    return;
                }
                _this._removeItems(removeIndex, 1, opGroup.control);
            });
        };
        /**
         * Handles items being unshifted into the array.
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         */
        Listview.prototype._unshift = function (changes, group) {
            if (this.utils.isFunction(this._templateSelector)) {
                this.rerender(group);
                return;
            }
            var opGroup = group || this._defaultGroup, change = changes[0], addedCount = change.addedCount;
            if (this._animate) {
                var animationQueue = opGroup.animationQueue, animationLength = animationQueue.length;
                this._animateItems(0, addedCount, __Enter, opGroup, null, animationLength > 0 && animationQueue[animationLength - 1].op === 'clone');
            }
            this._createItems(change.object.length - addedCount, addedCount, opGroup, 0);
        };
        /**
         * Handles items being shifted off the array.
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         */
        Listview.prototype._shift = function (changes, group) {
            var _this = this;
            var opGroup = group || this._defaultGroup, addQueue = opGroup.addQueue, change = changes[0];
            if (change.removed.length === 0) {
                return;
            }
            else if (this._animate) {
                if (addQueue.length === 0) {
                    var animationQueue = opGroup.animationQueue;
                    addQueue = addQueue.concat([this._animateItems(0, 1, __Leave, opGroup, 'clone', true)]);
                }
            }
            var removeIndex = change.object.length;
            if (opGroup.itemCount > 0) {
                opGroup.itemCount--;
            }
            this._Promise.all(addQueue).then(function () {
                _this._removeItems(removeIndex, 1, opGroup.control);
            });
        };
        /**
         * Handles adding/removing items when an array is spliced.
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
         * @param {platui.IGroupHash} group? The group that we're performing this operation on.
         */
        Listview.prototype._splice = function (changes, group) {
            var _this = this;
            var utils = this.utils, change = changes[0], opGroup = group || this._defaultGroup, addCount = change.addedCount, currentLength = opGroup.itemCount, control = opGroup.control, addQueue = opGroup.addQueue, animating = this._animate;
            if (utils.isNull(addCount)) {
                if (animating) {
                    this._cancelCurrentAnimations();
                }
                var newLength = change.object.length, itemCount = currentLength - newLength;
                if (newLength > currentLength) {
                    if (utils.isFunction(this._templateSelector)) {
                        if (utils.isNull(change.index)) {
                            this.rerender(opGroup);
                        }
                        else {
                            this.render(change.index, addCount, opGroup);
                        }
                        return;
                    }
                    // itemCount will be negative 
                    this._createItems(currentLength, -itemCount, opGroup, 0);
                }
                else if (currentLength > newLength) {
                    if (opGroup.itemCount >= itemCount) {
                        opGroup.itemCount -= itemCount;
                    }
                    else {
                        opGroup.itemCount = 0;
                    }
                    this._Promise.all(addQueue).then(function () {
                        _this._removeItems(currentLength - itemCount, itemCount, control);
                    });
                }
                return;
            }
            var removeCount = change.removed.length, animationQueue = opGroup.animationQueue;
            if (addCount > removeCount) {
                var _Promise = this._Promise, itemAddCount = addCount - removeCount, animationCount;
                if (utils.isFunction(this._templateSelector)) {
                    if (utils.isNull(change.index)) {
                        this.rerender(opGroup);
                    }
                    else {
                        this.render(change.index, addCount, opGroup);
                    }
                    return;
                }
                if (animating) {
                    animationCount = addCount;
                    var animationLength = animationQueue.length, startIndex = change.index;
                    if (currentLength < addCount - startIndex) {
                        animationCount = currentLength - startIndex;
                    }
                    this._animateItems(startIndex, animationCount, __Enter, opGroup, null, animationLength > 0 && animationQueue[animationLength - 1].op === 'clone');
                    animationCount = addCount - animationCount;
                }
                else {
                    animationCount = 0;
                }
                this._createItems(change.object.length - itemAddCount, itemAddCount, opGroup, animationCount);
            }
            else if (removeCount > addCount) {
                var adding = addCount > 0;
                if (animating && !adding && addQueue.length === 0) {
                    addQueue = addQueue.concat([this._animateItems(change.index, removeCount, __Leave, opGroup, 'clone', true)]);
                }
                var deleteCount = removeCount - addCount;
                if (opGroup.itemCount >= deleteCount) {
                    opGroup.itemCount -= deleteCount;
                }
                else {
                    opGroup.itemCount = 0;
                }
                this._Promise.all(addQueue).then(function () {
                    if (animating && adding) {
                        var animLength = animationQueue.length;
                        _this._animateItems(change.index, addCount, __Enter, opGroup, null, animLength > 0 && animationQueue[animLength - 1].op === 'clone');
                    }
                    _this._removeItems(currentLength - deleteCount, deleteCount, control);
                });
            }
        };
        /**
         * Animates the indicated items.
         * @param {number} startIndex The starting index of items to animate.
         * @param {number} numberOfItems The number of consecutive items to animate.
         * @param {string} key The animation key/type.
         * @param {IGroupHash} group The group performing the animation.
         * @param {string} animationOp Denotes animation operation.
         * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
         */
        Listview.prototype._animateItems = function (startIndex, numberOfItems, key, group, animationOp, cancel) {
            // block length === 3 (one element node and two comment nodes) 
            var blockLength = 3, start = startIndex * blockLength;
            switch (animationOp) {
                case 'clone':
                    return this._handleClonedContainerAnimation(start, numberOfItems * blockLength + start, key, group, cancel === true);
                case 'leave':
                    return this._handleLeave(start, numberOfItems * blockLength + start, key, group);
                default:
                    return this._handleSimpleAnimation(start, numberOfItems * blockLength + start, key, group, cancel === true);
            }
        };
        /**
         * Handles a simple animation of a block of elements.
         * @param {number} startNode The starting childNode of the ForEach to animate.
         * @param {number} endNode The ending childNode of the ForEach to animate.
         * @param {string} key The animation key/type.
         * @param {IGroupHash} group The group performing the animation.
         * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
         */
        Listview.prototype._handleSimpleAnimation = function (startNode, endNode, key, group, cancel) {
            var container = group.itemContainer, slice = Array.prototype.slice, nodes = slice.call(container.childNodes, startNode, endNode);
            if (nodes.length === 0) {
                return this._Promise.resolve();
            }
            var animationQueue = group.animationQueue, animationCreation = this._animator.create(nodes, key), animationPromise = animationCreation.current.then(function () {
                animationQueue.shift();
            }), callback = function () {
                animationCreation.previous.then(function () {
                    animationPromise.start();
                });
                return animationPromise;
            };
            if (cancel && animationQueue.length > 0) {
                var cancelPromise = this._cancelCurrentAnimations().then(callback);
                animationQueue.push({ animation: animationPromise, op: null });
                return cancelPromise;
            }
            animationQueue.push({ animation: animationPromise, op: null });
            return callback();
        };
        /**
         * Handles a simple animation of a block of elements.
         * @param {number} startNode The starting childNode of the ForEach to animate.
         * @param {number} endNode The ending childNode of the ForEach to animate.
         * @param {string} key The animation key/type.
         * @param {IGroupHash} group The group performing the animation.
         */
        Listview.prototype._handleLeave = function (startNode, endNode, key, group) {
            var container = group.itemContainer, slice = Array.prototype.slice, nodes = slice.call(container.childNodes, startNode, endNode);
            if (nodes.length === 0) {
                return this._Promise.resolve();
            }
            var animationQueue = group.animationQueue, animation = this._animator.leave(nodes, key).then(function () {
                animationQueue.shift();
            });
            animationQueue.push({
                animation: animation,
                op: 'leave'
            });
            return animation;
        };
        /**
         * Handles a simple animation of a block of elements.
         * @param {number} startNode The starting childNode of the ForEach to animate.
         * @param {number} endNode The ending childNode of the ForEach to animate.
         * @param {string} key The animation key/type.
         * @param {IGroupHash} group The group performing the animation.
         * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
         */
        Listview.prototype._handleClonedContainerAnimation = function (startNode, endNode, key, group, cancel) {
            var container = group.itemContainer, clonedContainer = container.cloneNode(true), slice = Array.prototype.slice, nodes = slice.call(clonedContainer.childNodes, startNode, endNode);
            if (nodes.length === 0) {
                return this._Promise.resolve();
            }
            var parentNode, animationQueue = group.animationQueue, isNull = this.utils.isNull, animationCreation = this._animator.create(nodes, key), animationPromise = animationCreation.current.then(function () {
                animationQueue.shift();
                if (isNull(parentNode)) {
                    return;
                }
                parentNode.replaceChild(container, clonedContainer);
            }), callback = function () {
                parentNode = container.parentNode;
                if (isNull(parentNode) || animationPromise.isCanceled()) {
                    animationQueue.shift();
                    return animationPromise;
                }
                parentNode.replaceChild(clonedContainer, container);
                animationCreation.previous.then(function () {
                    animationPromise.start();
                });
                return animationPromise;
            };
            if (cancel && animationQueue.length > 0) {
                var cancelPromise = this._cancelCurrentAnimations().then(callback);
                animationQueue.push({ animation: animationPromise, op: 'clone' });
                return cancelPromise;
            }
            animationQueue.push({ animation: animationPromise, op: 'clone' });
            return callback();
        };
        /**
         * Cancels all current animations.
         * @param {platui.IGroupHash} The object representing the current group.
         */
        Listview.prototype._cancelCurrentAnimations = function (group) {
            var animationQueue = (group || this._defaultGroup).animationQueue, animations = [], length = animationQueue.length;
            for (var i = 0; i < length; ++i) {
                animations.push(animationQueue[i].animation.cancel());
            }
            return this._Promise.all(animations);
        };
        /**
         * Normalizes template names by removing special characters.
         * @param {string} templateName The name to normalize.
         */
        Listview.prototype._normalizeTemplateName = function (templateName) {
            if (this.utils.isString(templateName)) {
                return templateName.toLowerCase().replace(this._nodeNormalizeRegex, '');
            }
        };
        /**
         * Creates a progress ring element.
         */
        Listview.prototype._generateProgressRing = function () {
            var _document = this._document, control = _document.createElement('div'), container = _document.createElement('div'), ring = _document.createElement('div');
            ring.className = 'plat-animated-ring';
            container.insertBefore(ring, null);
            container.className = 'plat-progress-container';
            control.insertBefore(container, null);
            control.className = 'plat-ring';
            return control;
        };
        /**
         * Checks the orientation of the control and ensures it is valid.
         * Will default to "horizontal" if invalid.
         * @param {string} orientation The element to base the length off of.
         */
        Listview.prototype._validateOrientation = function (orientation) {
            if (this.utils.isUndefined(orientation)) {
                return 'vertical';
            }
            var validOrientation;
            if (orientation === 'vertical') {
                validOrientation = orientation;
            }
            else if (orientation === 'horizontal') {
                validOrientation = orientation;
                this._isVertical = false;
            }
            else {
                var _Exception = this._Exception;
                _Exception.warn('Invalid orientation "' + orientation + '" for ' + this.type + '. Defaulting to "vertical."', _Exception.CONTROL);
                validOrientation = 'vertical';
            }
            return validOrientation;
        };
        /**
         * Sets the width of a group's item container.
         * @param {HTMLElement} element The element to set the width on.
         */
        Listview.prototype._setItemContainerWidth = function (element) {
            var width = element.scrollWidth;
            if (!width) {
                this._setItemContainerWidthWithClone(element);
                return;
            }
            element.style.width = width + 'px';
        };
        /**
         * Creates a clone of the group container and uses it to find width values.
         * @param {HTMLElement} item The element having its height set.
         */
        Listview.prototype._setItemContainerWidthWithClone = function (item) {
            var body = this._document.body, parent = item.parentElement, element = parent.lastElementChild, _Exception;
            if (!body.contains(parent)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var controlType = this.type;
                    _Exception = this._Exception,
                        _Exception.warn('Max clone attempts reached before the ' + controlType + ' was placed into the ' +
                            'DOM. Disposing of the ' + controlType + '.', _Exception.CONTROL);
                    this._TemplateControlFactory.dispose(this);
                    return;
                }
                this.utils.defer(this._setItemContainerWidthWithClone, 20, [item], this);
                return;
            }
            this._cloneAttempts = 0;
            var parentClone = parent.cloneNode(true), clone = parentClone.lastElementChild, regex = /\d+(?!\d+|%)/, _window = this._window, parentChain = [], shallowCopy = clone, computedStyle, dependencyProperty = 'width', codependentProperty = 'height', important = 'important', isNull = this.utils.isNull, dependencyValue;
            shallowCopy.id = '';
            if (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', important);
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, important);
                shallowCopy.style.setProperty(codependentProperty, computedStyle.height, important);
                element = element.parentElement;
                shallowCopy = parentClone;
                shallowCopy.id = '';
                while (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                    if (computedStyle.display === 'none') {
                        shallowCopy.style.setProperty('display', 'block', important);
                    }
                    shallowCopy.style.setProperty(dependencyProperty, dependencyValue, important);
                    shallowCopy.style.setProperty(codependentProperty, computedStyle.height, important);
                    element = element.parentElement;
                    if (isNull(element)) {
                        // if we go all the way up to <html> the body may currently be hidden. 
                        _Exception = this._Exception,
                            _Exception.warn('The document\'s body contains a ' + this.type + ' that needs its length and is currently ' +
                                'hidden. Please do not set the body\'s display to none.', _Exception.CONTROL);
                        this.utils.defer(this._setItemContainerWidthWithClone, 100, [dependencyProperty], this);
                        return;
                    }
                    shallowCopy = element.cloneNode(false);
                    shallowCopy.id = '';
                    parentChain.push(shallowCopy);
                }
            }
            if (parentChain.length > 0) {
                var curr = parentChain.pop(), currStyle = curr.style, temp;
                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }
                curr.insertBefore(parentClone, null);
            }
            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, important);
            shallowStyle.setProperty(codependentProperty, computedStyle.height, important);
            shallowStyle.setProperty('visibility', 'hidden', important);
            body.appendChild(shallowCopy);
            item.style.width = clone.scrollWidth + 'px';
            body.removeChild(shallowCopy);
        };
        /**
         * Sets the height of a group's item container.
         * @param {HTMLElement} element The element to set the height on.
         */
        Listview.prototype._setItemContainerHeight = function (element) {
            var parent = element.parentElement, parentHeight = parent.offsetHeight, headerHeight = parent.firstElementChild.offsetHeight;
            if (!(parentHeight && headerHeight)) {
                this._setItemContainerHeightWithClone(element);
                return;
            }
            element.style.height = (parentHeight - headerHeight - 15) + 'px';
        };
        /**
         * Creates a clone of the group container and uses it to find height values.
         * @param {HTMLElement} item The element having its height set.
         */
        Listview.prototype._setItemContainerHeightWithClone = function (item) {
            var body = this._document.body, parent = item.parentElement, element = parent.firstElementChild, _Exception;
            if (!body.contains(parent)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var controlType = this.type;
                    _Exception = this._Exception,
                        _Exception.warn('Max clone attempts reached before the ' + controlType + ' was placed into the ' +
                            'DOM. Disposing of the ' + controlType + '.', _Exception.CONTROL);
                    this._TemplateControlFactory.dispose(this);
                    return;
                }
                this.utils.defer(this._setItemContainerHeightWithClone, 20, [item], this);
                return;
            }
            this._cloneAttempts = 0;
            var parentClone = parent.cloneNode(true), clone = parentClone.firstElementChild, regex = /\d+(?!\d+|%)/, _window = this._window, parentChain = [], shallowCopy = clone, computedStyle, dependencyProperty = 'height', important = 'important', isNull = this.utils.isNull, dependencyValue;
            shallowCopy.id = '';
            if (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', important);
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, important);
                element = element.parentElement;
                shallowCopy = parentClone;
                shallowCopy.id = '';
                while (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                    if (computedStyle.display === 'none') {
                        shallowCopy.style.setProperty('display', 'block', important);
                    }
                    shallowCopy.style.setProperty(dependencyProperty, dependencyValue, important);
                    element = element.parentElement;
                    if (isNull(element)) {
                        // if we go all the way up to <html> the body may currently be hidden. 
                        _Exception = this._Exception,
                            _Exception.warn('The document\'s body contains a ' + this.type + ' that needs its length and is currently ' +
                                'hidden. Please do not set the body\'s display to none.', _Exception.CONTROL);
                        this.utils.defer(this._setItemContainerHeightWithClone, 100, [dependencyProperty], this);
                        return;
                    }
                    shallowCopy = element.cloneNode(false);
                    shallowCopy.id = '';
                    parentChain.push(shallowCopy);
                }
            }
            if (parentChain.length > 0) {
                var curr = parentChain.pop(), currStyle = curr.style, temp;
                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }
                curr.insertBefore(parentClone, null);
            }
            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, important);
            shallowStyle.setProperty('visibility', 'hidden', important);
            body.appendChild(shallowCopy);
            item.style.height = (parentClone.offsetHeight - clone.offsetHeight - 15) + 'px';
            body.removeChild(shallowCopy);
        };
        Listview._inject = {
            _document: __Document,
            _window: __Window,
            _compat: __Compat,
            _animator: __Animator,
            _Promise: __Promise,
            _TemplateControlFactory: __TemplateControlFactory
        };
        return Listview;
    })(plat.ui.TemplateControl);
    platui.Listview = Listview;
    plat.register.control(__Listview, Listview);
})(platui || (platui = {}));
module.exports = platui;
