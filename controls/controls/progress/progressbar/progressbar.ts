/// <reference path="../../../references.d.ts" />

module platui {
    /**
     * @name ProgressBar
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} for showing incremental progress.
     */
    export class ProgressBar extends plat.ui.TemplateControl implements IUiControl {
        protected static _inject: any = {
            _window: __Window
        };

        /**
         * @name templateString
         * @memberof platui.ProgressBar
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-progress-container">\n' +
        '    <div class="plat-animated-bar"></div>\n' +
        '</div>\n';

        /**
         * @name _window
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        protected _window: Window;

        /**
         * @name _barElement
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The animated bar element.
         */
        protected _barElement: HTMLElement;

        /**
         * @name setClasses
         * @memberof platui.ProgressBar
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
            this.dom.addClass(element || this.element, __ProgressBar + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.ProgressBar
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

        /**
         * @name loaded
         * @memberof platui.ProgressBar
         * @kind function
         * @access public
         * 
         * @description
         * Grabs the bar element then sets any initial progress.
         * 
         * @returns {void}
         */
        loaded(): void {
            this._barElement = <HTMLElement>this.element.firstElementChild.firstElementChild;
            this.setProgress(this.context);

            this.addEventListener(this._window, 'resize', () => {
                this.setProgress(this.context);
            });
        }

        /**
         * @name contextChanged
         * @memberof platui.ProgressBar
         * @kind function
         * @access public
         * 
         * @description
         * Animates the bar on a context changed.
         * 
         * @returns {void}
         */
        contextChanged(): void {
            this.setProgress(this.context);
        }

        /**
         * @name setProgress
         * @memberof platui.ProgressBar
         * @kind function
         * @access public
         * 
         * @description
         * Sets the progress bar value.
         * 
         * @param {number} value The decimal number between 0 and 1 to set as the 
         * bar percentage (e.g. - 0.5 would be 50% complete).
         * 
         * @returns {void}
         */
        setProgress(value: number): void {
            if (!this.utils.isNumber(value) || value > 1 || value < 0) {
                var _Exception = this._Exception;
                _Exception.warn('The context of a "' + this.type + '" control must be a number between 0 and 1.', _Exception.CONTEXT);
                return;
            }

            var barElement = this._barElement,
                barMax = barElement.parentElement.offsetWidth;
            if (!barMax) {
                return;
            }

            barElement.style.width = Math.ceil(barMax * value) + 'px';
        }
    }

    plat.register.control(__ProgressBar, ProgressBar);
}
