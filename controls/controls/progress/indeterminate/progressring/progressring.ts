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
         * @param {string} className The class name to set on the button element.
         */
        setClasses(className: string): void {
            this.dom.addClass(this.element, className);
        }

        /**
         * Set the class name
         */
        initialize(): void {
            this.setClasses(__ProgressRing);
        }
    }

    plat.register.control(__ProgressRing, ProgressRing);
}
