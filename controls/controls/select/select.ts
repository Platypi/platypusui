module platui {
    /**
     * @name Select
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.controls.Select}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that allows for data-binding a select box and adds 
     * custom styling to make it look consistent across all platforms.
     */
    export class Select extends plat.ui.controls.Select implements IUIControl {
        /**
         * @name setClasses
         * @memberof platui.Select
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
            var dom = this.dom,
                element = element || this.element;

            dom.addClass(element, __Select);
            dom.addClass(element, className);
        }
        
        /**
         * @name initialize
         * @memberof platui.Select
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name.
         * 
         * @returns {void}
         */
        initialize(): void {
            super.initialize();
            this.setClasses();
        }
    }

    plat.register.control(__Select, Select);

    /**
     * @name ISelectOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Select|Select} control.
     */
    export interface ISelectOptions {
        /**
         * @name group
         * @memberof platui.ISelectOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property in your context array 
         * of objects to use to group the objects 
         * into optgroups.
         */
        group: string;

        /**
         * @name value
         * @memberof platui.ISelectOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property in your context array of 
         * objects with which to use to bind to the 
         * option's value.
         */
        value: string;

        /**
         * @name textContent
         * @memberof platui.ISelectOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property in your context array of 
         * objects with which to use to bind to the 
         * option's textContent.
         */
        textContent: string;
    }
}
