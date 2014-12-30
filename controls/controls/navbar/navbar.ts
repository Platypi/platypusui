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
         * @name $utils
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * @name $animator
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $animator: plat.ui.animations.IAnimator = plat.acquire(__Animator);

        /**
         * @name replaceWith
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Replaces the <plat-navbar> node with a <nav> node.
         */
        replaceWith = 'nav';

        /**
         * @name _actionAnimation
         * @memberof platui.Navbar
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.ISimpleCssAnimation}
         * 
         * @description
         * The registered animation that animates when a navbar-action is pressed
         */
        _actionAnimation = plat.acquire(platui.NavbarActionPulse);

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

        /**
         * @name setTemplate
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * 
         * @description
         * Registers and sets event listeners on navbar action elements
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var element = this.element,
                navbarActions = element.querySelectorAll('.navbar-action'),
                i: number;

            for (i = 0; i < navbarActions.length; i++) {
                this.addEventListener(navbarActions[i], __$tap, this._actionPressed, false);
            }
        }

        /**
         * @name _actionPressed
         * @memberof platui.Navbar
         * @kind function
         * @access protected
         * 
         * @description
         * Animate .navbar-action elements when the user touches the {@link platui.Navbar|Navbar}.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        _actionPressed(ev: plat.ui.IGestureEvent): void {
            // this.dom.addClass(ev.srcElement, 'plat-navbar-action-pulse');
            this.$animator.animate(ev.srcElement, __NavbarActionPulse, { pseudo: '::after' });
        }
    }

    plat.register.control(__Navbar, Navbar);
}
