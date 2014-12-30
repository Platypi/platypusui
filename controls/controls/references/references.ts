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
    __ExceptionStatic = __prefix + 'ExceptionStatic',
    __Utils = __prefix + 'Utils',
    __Animator = __prefix + 'Animator',
    __DomEventInstance = __prefix + 'DomEventInstance',
    __TemplateControlFactory = __prefix + 'TemplateControlFactory',

    /**
     * Controls
     */
    __Plat = 'plat-',
    __Button = __Plat + 'button',
    __Checkbox = __Plat + 'checkbox',
    __Drawer = __Plat + 'drawer',
    __DrawerController = __Plat + 'drawer-controller',
    __Modal = __Plat + 'modal',
    __Navbar = __Plat + 'navbar',
    __ProgressBar = __Plat + 'progress',
    __ProgressRing = __Plat + 'ring',
    __Radio = __Plat + 'radio',
    __Toggle = __Plat + 'toggle',
    __Slider = __Plat + 'slider',
    __Range = __Plat + 'range',
    __Select = __Plat + 'select',
    __Input = __Plat + 'input',
    __Carousel = __Plat + 'carousel',
    __Listview = __Plat + 'listview',

    /**
     * Referenced Controls / Vars
     */
    __Hide = __Plat + 'hide',
    __Hidden = __Plat + 'hidden',
    __Checked = __Plat + 'checked',
    __CamelChecked = 'platChecked',
    __Context = __Plat + 'context',
    __CamelContext = 'platContext',
    __Bind = __Plat + 'bind',
    __TemplateControlCache = '__templateControlCache',

    /**
     * Animations
     */
    __Transition = __Plat + 'transition',
    __NavbarActionPulse = __Plat + 'navbar-action-pulse',

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
    __DrawerFoundEvent = '__platDrawerFound',
    __DrawerControllerDisposing = '__platDrawerControllerDisposing',
    __DrawerControllerDisposingFound = '__platDrawerControllerDisposingFound',

    /**
     * Misc
     */
    __CONTEXT = 'context',
    __Reversed = '-reversed',
    __transitionNegate: plat.IObject<string> = {
        right: 'left',
        left: 'right',
        up: 'down',
        down: 'up'
    };
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
     * @name IUIControl
     * @memberof platui
     * @kind interface
     * 
     * @description
     * An interface a control should implement if they plan on using 
     * class based CSS to style the UI.
     */
    export interface IUIControl {
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
