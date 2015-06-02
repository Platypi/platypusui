/// <reference path="../references.d.ts" />

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
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that acts as a global navigation bar that defines its own context.
     */
    export class Navbar extends plat.ui.TemplateControl implements IUiControl {
        /**
         * @name templateString
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString: string =
        '<div class="plat-navbar-container">\n' +
        '</div>\n';
        
        /**
         * @name context
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {platui.INavbarContext}
         * 
         * @description
         * The {@link platui.Navbar|Navbar} control's context.
         */
        context: INavbarContext;
        
        /**
         * @name hasOwnContext
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Specifies that the {@link platui.Navbar|Navbar} defines it's own context.
         */
        hasOwnContext: boolean = true;
        
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
         * Set the class name.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }
    }

    plat.register.control(__Navbar, Navbar, null, true);
    
    /**
     * @name INavbarOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Navbar|Navbar} control.
     */
    export interface INavbarOptions {
        
    }
    
    /**
     * @name INavbarComponent
     * @memberof platui
     * @kind interface
     * 
     * @description
     * Defines the available bindings for a single componenet of the {@link platui.Navbar|Navbar} control.
     */
    export interface INavbarComponent {
        
    }
    
    /**
     * @name INavbarContext
     * @memberof platui
     * @kind interface
     * 
     * @description
     * Defines the type of context for the {@link platui.Navbar|Navbar} control.
     */
    export interface INavbarContext {
        left: Array<INavbarComponent>;
        center: Array<INavbarComponent>;
        right: Array<INavbarComponent>;
    }
}
