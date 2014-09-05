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
         * Sets the proper class name on this control.
         * 
         * @param {string} className? The class name to set on the button element.
         * @param {Element} element? The element to set the class on. Defaults to this 
         * control's element.
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
