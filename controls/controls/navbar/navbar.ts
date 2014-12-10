/// <reference path="../../references.d.ts" />

module platui {
	/**
     * @name Navbar
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that acts as a Navigation Element.
     */
	export class Navbar extends plat.ui.TemplateControl implements IUIControl {
        /**
         * @name replaceWith
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Replaces the <plat-navbar> node with 
         * a <nav> node.
         */
        replaceWith = 'nav';

        /**
         * @name setClasses
         * @memberof platui.Navbar
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
            this.dom.addClass(element || this.element, __Navbar + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * 
         * @description
         * Sets default classes.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }
	}

	plat.register.control(__Navbar, Navbar);
}