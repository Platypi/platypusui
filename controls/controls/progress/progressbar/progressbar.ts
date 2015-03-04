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
            _window: __Window,
            _utils: __Utils
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
         * @name _utils
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.Utils|Utils} injectable.
         */
        protected _utils: plat.Utils;

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
         * @name _barMax
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The max value of the bar.
         */
        protected _barMax: number;

        /**
         * @name _cloneAttempts
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current number of times we checked to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _cloneAttempts = 0;

        /**
         * @name _maxCloneCount
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * The max number of times we'll check to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _maxCloneAttempts = 25;

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
         * Grabs the bar element and bar max value and checks to make sure the context is correctly 
         * set or a plat-bind is being used, then does the initial animation of the bar.
         * 
         * @returns {void}
         */
        loaded(): void {
            var context = this.context,
                barElement = this._barElement = <HTMLElement>this.element.firstElementChild.firstElementChild,
                bar = this._barMax = barElement.parentElement.offsetWidth;

            if (!bar) {
                this._setOffsetWithClone('width');
            }

            if (!this._utils.isNumber(context) || context > 1 || context < 0) {
                var _Exception = this._Exception;
                _Exception.warn('The context of a "' + this.type + '" control must be a number between 0 and 1.', _Exception.CONTEXT);
                return;
            }

            this.addEventListener(this._window, 'resize', (): void => {
                var offset = this._barMax = barElement.parentElement.offsetWidth;
                if (!offset) {
                    this._setOffsetWithClone('width');
                }
            }, false);
            this.setProgress();
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
            this.setProgress();
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
         * @param {number} value? The decimal number between 0 and 1 to set as the 
         * bar percentage (e.g. - 0.5 would be 50% complete).
         * 
         * @returns {void}
         */
        setProgress(value?: number): void {
            var barValue = value || this.context;
            if (!this._utils.isNumber(barValue) || barValue > 1 || barValue < 0) {
                var _Exception = this._Exception;
                _Exception.warn('The context of a "' + this.type + '" control must be a number between 0 and 1.', _Exception.CONTEXT);
                return;
            }

            this._barElement.style.width = Math.ceil(this._barMax * barValue) + 'px';
        }

        /**
         * @name _setOffsetWithClone
         * @memberof platui.ProgressBar
         * @kind function
         * @access protected
         * 
         * @description
         * Creates a clone of this element and uses it to find the max offset.
         *
         * @param {string} dependencyProperty The property that the offset is being based off of.
         *
         * @returns {void}
         */
        protected _setOffsetWithClone(dependencyProperty: string): void {
            var element = this.element,
                _document: Document = plat.acquire(__Document),
                body = _document.body;

            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var _Exception = this._Exception,
                        type = this.type;
                    _Exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' +
                        'DOM. Disposing of the ' + type + '.', _Exception.CONTROL);
                    (<plat.ui.ITemplateControlFactory>plat.acquire(__TemplateControlFactory)).dispose(this);
                    return;
                }

                this._utils.defer(this._setOffsetWithClone, 10, [dependencyProperty], this);
                return;
            }

            this._cloneAttempts = 0;

            var clone = <HTMLElement>element.cloneNode(true),
                regex = /\d+(?!\d+|%)/,
                _window = this._window,
                parentChain = <Array<HTMLElement>>[],
                shallowCopy = clone,
                computedStyle: CSSStyleDeclaration,
                important = 'important',
                dependencyValue: string;

            shallowCopy.id = '';
            while (!regex.test((dependencyValue = (computedStyle = (<any>_window.getComputedStyle(element)))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', important);
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, important);
                element = element.parentElement;
                shallowCopy = <HTMLElement>element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }

            if (parentChain.length > 0) {
                var curr = parentChain.pop(),
                    currStyle = curr.style,
                    temp: HTMLElement;

                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }

                curr.insertBefore(clone, null);
            }

            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, important);
            shallowStyle.setProperty('visibility', 'hidden', important);
            body.appendChild(shallowCopy);
            this._barMax = (<HTMLElement>clone.firstElementChild).offsetWidth;
            body.removeChild(shallowCopy);
        }
    }

    plat.register.control(__ProgressBar, ProgressBar);
}
