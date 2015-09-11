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
         * @name templateString
         * @memberof platui.ProgressRing
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The HTML template represented as a string.
         */
        templateString: string = '<div class="plat-animated-ring"></div>';

        /**
         * @name options
         * @memberof platui.ProgressRing
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<platui.IProgressRingOptions>}
         *
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IProgressRingOptions>;

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
            this.dom.addClass(element || this.element, `${__ProgressRing} ${(className || '')}`);
        }

        /**
         * @name initialize
         * @memberof platui.ProgressRing
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
         * @memberof platui.ProgressRing
         * @kind function
         * @access public
         *
         * @description
         * Set the animation.
         *
         * @returns {void}
         */
        loaded(): void {
            let options = this.options,
                utils = this.utils,
                isObject = utils.isObject,
                style = 0;

            if (isObject(options) && isObject(options.value)) {
                style = options.value.style;
                if (!utils.isNumber(style)) {
                    style = 0;
                }
            }

            this.dom.addClass(this.element, `${__ProgressRing}-${style}`);
            if (style === 0) {
                return;
            }

            this._addAnimatedElements(style);
        }

        /**
         * @name _addAnimatedElements
         * @memberof platui.ProgressRing
         * @kind function
         * @access protected
         *
         * @description
         * Adds any needed DOM for the animation.
         *
         * @returns {void}
         */
        protected _addAnimatedElements(style: number): void {
            let _document: Document = plat.acquire(__Document),
                fragment = _document.createDocumentFragment(),
                count = style === 2 ? 12 : 4,
                div = 'div',
                classPrefix = `${__Plat}animated-child ${__Plat}animated-child-`,
                child: HTMLElement;

            for (let i = 0; i < count; ++i) {
                child = _document.createElement(div);
                child.className = classPrefix + i;
                fragment.insertBefore(child, null);
            }

            this.element.firstElementChild.insertBefore(fragment, null);
        }
    }

    plat.register.control(__ProgressRing, ProgressRing);

    /**
     * @name INavbarOptions
     * @memberof platui
     * @kind interface
     *
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Navbar|Navbar} control.
     */
    export interface IProgressRingOptions {
        /**
         * @name style
         * @memberof platui.IProgressRingOptions
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * The loading ring style. Defaults to 0.
         *
         * @remarks
         * 0 - continuous rotation, always visible, no fading
         * 1 - 8 line rotation, always visible, partial fading
         * 2 - 12 point rotation, partial visibility, partial fading
         */
        style?: number;
    }
}
