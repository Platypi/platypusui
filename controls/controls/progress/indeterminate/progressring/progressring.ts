module platui {
    /**
     * @name ProgressRing
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} for showing indeterminate progress.
     */
    export class ProgressRing extends plat.ui.TemplateControl implements IUIControl {
        /**
         * @name templateString
         * @memberof platui.ProgressRing
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-progress-container">' +
            '<div class="ring"></div>' +
        '</div>';
        
        /**
         * @name setClasses
         * @memberof platui.ProgressRing
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

            dom.addClass(element, __ProgressRing);
            dom.addClass(element, className);
        }
        
        /**
         * @name setClasses
         * @memberof platui.ProgressRing
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
    }

    plat.register.control(__ProgressRing, ProgressRing);
}
