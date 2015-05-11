/// <reference path="../references.d.ts" />

/* tslint:disable:no-unused-variable */
/*
 * Injectables
 */
var __prefix = '$',
    __Promise = __prefix + 'Promise',
    __Compat = __prefix + 'Compat',
    __Regex = __prefix + 'Regex',
    __Window = __prefix + 'Window',
    __Document = __prefix + 'Document',
    __Utils = __prefix + 'Utils',
    __Animator = __prefix + 'Animator',
    __DomEventInstance = __prefix + 'DomEventInstance',
    __TemplateControlFactory = __prefix + 'TemplateControlFactory',

    /**
     * Constants
     */
    __CONTEXT = 'context',

    /**
     * Controls
     */
    __PlatPrefix = 'plat',
    __Plat = __PlatPrefix + '-',
    __Button = __Plat + 'button',
    __Checkbox = __Plat + 'checkbox',
    __Drawer = __Plat + 'drawer',
    __DrawerController = __Drawer + '-controller',
    __Modal = __Plat + 'modal',
    __ProgressBar = __Plat + 'progress',
    __ProgressRing = __Plat + 'ring',
    __Radio = __Plat + 'radio',
    __Toggle = __Plat + 'toggle',
    __Slider = __Plat + 'slider',
    __Range = __Plat + 'range',
    __Select = __Plat + 'select',
    __Input = __Plat + 'input',
    __File = __Plat + 'file',
    __Carousel = __Plat + 'carousel',
    __Listview = __Plat + 'listview',

    /**
     * Referenced Controls / Vars
     */
    __Hide = __Plat + 'hide',
    __Checked = __Plat + 'checked',
    __ForEach = __Plat + 'foreach',
    __Bind = __Plat + 'bind',
    __Disabled = __Plat + 'disabled',
    __CamelContext = __PlatPrefix + 'Context',
    __CamelChecked = __PlatPrefix + 'Checked',
    __CamelBind = __PlatPrefix + 'Bind',

    /**
     * Listview aliases
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
     * Animations
     */
    __Transition = __Plat + 'transition',
    __Enter = __Plat + 'enter',
    __Leave = __Plat + 'leave',

    /**
     * Events
     */
    __$tap = '$tap',
    __$touchstart = '$touchstart',
    __$touchend = '$touchend',
    __$touchcancel = '$touchcancel',
    __$swipe = '$swipe',
    __$track = '$track',
    __$trackend = '$trackend',
    __ButtonPrefix = '__plat-button-',
    __RadioPrefix = '__plat-radio-',
    __DrawerControllerInitEvent = '__platDrawerControllerInit',
    __DrawerControllerFetchEvent = '__platDrawerControllerFetch',
    __DrawerFoundEvent = '__platDrawerFound',
    __DrawerControllerDisposing = '__platDrawerControllerDisposing',
    __DrawerControllerDisposingFound = '__platDrawerControllerDisposingFound',

    /**
     * Misc
     */
    __Reversed = '-reversed',
    __LITERAL_RESOURCE = 'literal',
    __transitionNegate: plat.IObject<string> = {
        right: 'left',
        left: 'right',
        up: 'down',
        down: 'up'
    },
    noop = (): void => { };
/* tslint:enable:no-unused-variable */

module platui {
    if (typeof window !== 'undefined') {
        if (typeof (<any>window).platui === 'undefined') {
            (<any>window).platui = platui;
        }

        if (typeof (<any>window).module === 'undefined') {
            (<any>window).module = {};
        }
    }

    /**
     * @name IUiControl
     * @memberof platui
     * @kind interface
     * 
     * @description
     * An interface a control should implement if they plan on using 
     * class based CSS to style the UI.
     */
    export interface IUiControl {
        /**
         * @name setClasses
         * @memberof platui.IUIControl
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
        setClasses(classNames?: any, element?: Element): void;
    }

    /**
     * @name IFormControl
     * @memberof platui
     * @kind interface
     * 
     * @description
     * An interface a control should implement if validation is necessary.
     */
    export interface IFormControl {
        /**
         * @name validate
         * @memberof platui.IFormControl
         * @kind function
         * @access public
         * 
         * @description
         * A function to validate user input.
         * 
         * @returns {boolean} Whether or not the user input is valid.
         */
        validate(): boolean;
    }

    /**
     * @name IValuePoint
     * @memberof platui
     * @kind interface
     * 
     * @description
     * Describes a point with x and y coordinates and an associated value.
     */
    export interface IValuePoint extends plat.ui.IPoint {
        /**
         * @name value
         * @memberof platui.IValuePoint
         * @kind property
         * @access public
         * 
         * @description
         * A value associated with the given point.
         */
        value: number;
    }
}
