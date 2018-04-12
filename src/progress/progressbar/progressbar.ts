/// <reference path="../../references.d.ts" />

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
            _Promise: __Promise,
            _animator: __Animator
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
        templateString: string =
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
         * @name _Promise
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         *
         * @type {plat.async.IPromise}
         *
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: plat.async.IPromise;

        /**
         * @name _animator
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         *
         * @type {plat.ui.animations.IAnimator}
         *
         * @description
         * Reference to the {@link plat.ui.animations.Animator|Animator} injectable.
         */
        protected _animator: plat.ui.animations.Animator;

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
         * @name _removeVisibilityListener
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function that will stop listening for visibility if applicable.
         */
        protected _removeVisibilityListener: plat.IRemoveListener = noop;

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
            this.dom.addClass(element || this.element, `${__ProgressBar} ${(className || '')}`);
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

            this.addEventListener(this._window, 'resize', () => {
                this.setProgress(this.context);
            });

            this.setProgress(this.context);
        }

        /**
         * @name dispose
         * @memberof platui.ProgressBar
         * @kind function
         * @access public
         *
         * @description
         * Removes the visibility listener if applicable.
         *
         * @returns {void}
         */
        dispose(): void {
            this._removeVisibilityListener();
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
         * @returns {plat.async.Promise<void>} A Promise that resolves when the
         * progress loader has shown the progress update.
         */
        setProgress(value: number): plat.async.Promise<void> {
            return new this._Promise<void>((resolve, reject) => {
                if (!this.utils.isNumber(value) || value > 1 || value < 0) {
                    let msg = `The value of a "${this.type}" control must be a number between 0 and 1.`;
                    this._log.debug(msg);
                    reject(msg);
                    return;
                }

                let barElement = this._barElement,
                    barMax = barElement.parentElement.clientWidth;

                if (!barMax) {
                    this._removeVisibilityListener();
                    this._removeVisibilityListener = this.dom.whenVisible((): void => {
                        this.setProgress(value).then(resolve);
                    }, this.element);
                    return;
                }

                this._animator.animate(barElement, __Transition, {
                    properties: {
                        width: `${Math.ceil(barMax * value)}px`
                    }
                }).then((): void => {
                    resolve();
                });
            });
        }
    }

    plat.register.control(__ProgressBar, ProgressBar);
}
