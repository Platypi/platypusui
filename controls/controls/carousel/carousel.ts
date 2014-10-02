module platui {
    /**
     * @name Carousel
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that acts as a HTML template carousel.
     */
    export class Carousel extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name templateString
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString = '<div class="plat-carousel-container"></div>';

        /**
         * @name context
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {Array<any>}
         * 
         * @description
         * The mandatory type of context of the {@link platui.Carousel|Carousel}.
         */
        context: Array<any>;

        /**
         * @name setClasses
         * @memberof platui.Button
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
            this.dom.addClass(element || this.element, __Carousel + ' ' + (className || ''));
        }
    }

    plat.register.control(__Carousel, Carousel);
}
