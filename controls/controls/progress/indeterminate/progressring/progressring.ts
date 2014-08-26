module platui {
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

            if (!!className) {
                dom.addClass(element, className);
            }
        }

        /**
         * Set the class name
         */
        initialize(): void {
            this.setClasses();
        }
    }

    plat.register.control(__ProgressRing, ProgressRing);
}
