/// <reference path="../references.d.ts" />

module platui {
    /**
     * @name Image
     * @memberof platui
     * @kind class
     *
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     *
     * @description
     * An {@link plat.ui.TemplateControl|TemplateControl} that keeps track of a loading image.
     */
    export class Image extends plat.ui.TemplateControl implements IUiControl {
        protected static _inject: any = {
            _compat: __Compat,
            _document: __Document,
            _NodeManagerStatic: __NodeManagerStatic
        };

        /**
         * @name templateString
         * @memberof platui.Image
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The HTML template represented as a string.
         */
        templateString: string =
        '<div class="plat-ring">\n' +
        '    <div class="plat-progress-container">\n' +
        '        <div class="plat-animated-ring"></div>\n' +
        '    </div>\n' +
        '</div>\n';

        /**
         * @name options
         * @memberof platui.Image
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<platui.IImageOptions>}
         *
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IImageOptions>;

        /**
         * @name _compat
         * @memberof platui.Image
         * @kind property
         * @access protected
         *
         * @type {plat.Compat}
         *
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: plat.Compat;

        /**
         * @name _document
         * @memberof platui.Image
         * @kind property
         * @access protected
         *
         * @type {Document}
         *
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document;

        /**
         * @name _NodeManagerStatic
         * @memberof platui.Image
         * @kind property
         * @access protected
         *
         * @type {plat.processing.INodeManagerStatic}
         *
         * @description
         * Reference to the {@link plat.processing.INodeManagerStatic|INodeManagerStatic} injectable.
         */
        protected _NodeManagerStatic: plat.processing.INodeManagerStatic;

        /**
         * @name _loader
         * @memberof platui.Image
         * @kind property
         * @access protected
         *
         * @type {HTMLElement}
         *
         * @description
         * The loading progress element.
         */
        protected _loader: HTMLElement;

        /**
         * @name _isBackground
         * @memberof platui.Image
         * @kind property
         * @access protected
         *
         * @type {HTMLElement}
         *
         * @description
         * The image is a CSS background image. Defaults to false.
         */
        protected _isBackground: boolean = false;

        /**
         * @name _img
         * @memberof platui.Image
         * @kind property
         * @access protected
         *
         * @type {HTMLImageElement}
         *
         * @description
         * The HTMLImageElement use to source the image.
         */
        protected _img: HTMLImageElement = this._document.createElement('img');

        /**
         * @name setClasses
         * @memberof platui.Image
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
            this.dom.addClass(element || this.element, __Image + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Image
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
         * @memberof platui.Image
         * @kind function
         * @access public
         *
         * @description
         * Set the style and initialize the action.
         *
         * @returns {void}
         */
        loaded(): void {
            var element = this.element,
                isString = this.utils.isString,
                attributes = this.attributes,
                isObject = this.utils.isObject,
                options = this.options,
                url: string;

            this._loader = <HTMLElement>element.firstElementChild;

            if (isObject(options) && isObject(options.value)) {
                this._isBackground = options.value.isBackground === true;
            }

            if (this._isBackground) {
                this.dom.addClass(element, __Plat + 'background');
            }

            if (isString(url = attributes[__CamelSrc])) {
                attributes.observe(this._setSrc, __CamelSrc);
            } else if (isString(url = attributes[__src])) {
                attributes.observe(this._setSrc, __src);
            } else {
                return;
            }

            if (this._NodeManagerStatic.hasMarkup(url)) {
                return;
            }

            this._setSrc(url);
        }

        /**
         * @name _setSrc
         * @memberof platui.Image
         * @kind function
         * @access protected
         *
         * @description
         * Sets and sources the image to display.
         *
         * @param {string} url The source URL to display.
         * @param {string} oldUrl? The old source URL that was being displayed.
         *
         * @returns {void}
         */
        protected _setSrc(url: string, oldUrl?: string): void {
            var img = this._img,
                element = this.element,
                dom = this.dom,
                imageLoadClass = __Plat + 'load-image',
                loader = this._loader;

            dom.addClass(img, imageLoadClass);

            img.src = url;
            img.onload = (): void => {
                this.utils.requestAnimationFrame((): void => {
                    if (this._isBackground) {
                        element.style.backgroundImage = 'url("' + url + '")';
                        element.removeChild(img);
                    } else {
                        if (img.clientHeight < element.clientHeight) {
                            dom.addClass(img, __Plat + 'center-vertical');
                        } else {
                            dom.removeClass(img, __Plat + 'center-vertical');
                        }

                        if (img.clientWidth < element.clientWidth) {
                            dom.addClass(img, __Plat + 'center-horizontal');
                        } else {
                            dom.removeClass(img, __Plat + 'center-horizontal');
                        }

                        dom.removeClass(img, imageLoadClass);
                    }

                    element.removeChild(loader);
                });
            };

            img.onerror = (): void => {
                this.utils.requestAnimationFrame((): void => {
                    dom.addClass(element, __Image + '-error');
                    element.removeChild(img);
                    element.removeChild(loader);
                });
            };

            element.insertBefore(loader, null);
            element.insertBefore(img, null);
        }
    }

    plat.register.control(__Image, Image);

    /**
     * @name IImageOptions
     * @memberof platui
     * @kind interface
     *
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Image|Image} control.
     */
    export interface IImageOptions {
        /**
         * @name isBackground
         * @memberof platui.IImageOptions
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * Whether the image being set is going to be a CSS background image or an HTML `<img>` tag.
         * Defaults to false meaning an HTML `<img>` tag.
         */
        isBackground?: boolean;
    }
}
