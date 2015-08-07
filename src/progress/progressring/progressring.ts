/// <reference path="../../references.d.ts" />

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
    export class ProgressRing extends plat.ui.TemplateControl implements IUiControl {
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
            this.dom.addClass(element || this.element, __ProgressRing + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.ProgressRing
         * @kind function
         * @access public
         *
         * @description
         * Set the animation.
         *
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.ProgressRing
         * @kind function
         * @access public
         *
         * @description
         * Clears the innerTemplate in the DOM.
         *
         * @returns {void}
         */
        setTemplate(): void {
            this.dom.clearNode(this.element);
        }
    }

    plat.register.control(__ProgressRing, ProgressRing);
}
