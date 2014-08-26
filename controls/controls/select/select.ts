module platui {
    /**
     * A Template Control that allows for data-binding a select box and adds custom styling to make it look 
     * consistent across all platforms.
     */
    export class Select extends plat.ui.controls.Select implements IUIControl {
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
            super.initialize();
            this.setClasses(__Select);
        }
    }

    plat.register.control(__Select, Select);
}
