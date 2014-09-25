/* tslint:disable:no-unused-variable */
    /*
     * Injectables
     */
var __Promise = '$Promise',
    __Compat = '$Compat',
    __Window = '$Window',
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
    __Slider = __Plat + 'slider',
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

module platui {
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
}
