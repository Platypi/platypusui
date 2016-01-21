/// <reference path="../references.d.ts" />

module platui {
    /**
     * @name Modal
     * @memberof platui
     * @kind class
     *
     * @extends {plat.ui.BindControl}
     * @implements {platui.IUIControl}
     *
     * @description
     * An {@link plat.ui.BindControl|BindControl} for showing a templated and animated overlay.
     */
    export class Modal extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any = {
            _window: __Window,
            _document: __Document,
            _compat: __Compat,
            _Promise: __Promise
        };

        /**
         * @name templateString
         * @memberof platui.Modal
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The HTML template represented as a string.
         */
        templateString: string = this.__templateString;

        /**
         * @name options
         * @memberof platui.Modal
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<platui.IModalOptions>}
         *
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IModalOptions>;

        /**
         * @name modalLoaded
         * @memberof platui.Modal
         * @kind property
         * @access public
         *
         * @type {plat.async.IThenable<void>}
         *
         * @description
         * A Promise that fulfills when the modal is loaded and rejects if the {@link platui.Modal|Modal}
         * gets disposed before it loads content.
         */
        modalLoaded: plat.async.IThenable<void>;

        /**
         * @name _window
         * @memberof platui.Modal
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
         * @name _document
         * @memberof platui.Modal
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
         * @name _compat
         * @memberof platui.Modal
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
         * @name _Promise
         * @memberof platui.Modal
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
         * @name _container
         * @memberof platui.Modal
         * @kind property
         * @access protected
         *
         * @type {HTMLElement}
         *
         * @description
         * The HTML element representing the content of the modal.
         */
        protected _container: HTMLElement;

        /**
         * @name _isVisible
         * @memberof platui.Modal
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the modal is currently visible.
         */
        protected _isVisible: boolean = false;

        /**
         * @name _transitionEnd
         * @memberof platui.Modal
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The browser's "transitionend" event.
         */
        protected _transitionEnd: string;

        /**
         * @name _scrollRemover
         * @memberof platui.Modal
         * @kind property
         * @access protected
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function to stop listening to scroll events.
         */
        protected _scrollRemover: plat.IRemoveListener = noop;

        /**
         * @name _scrollTop
         * @memberof platui.Modal
         * @kind property
         * @access protected
         *
         * @type {number}
         *
         * @description
         * The current scroll position of the modal.
         */
        protected _scrollTop: number = 0;

        /**
         * @name _transitionHash
         * @memberof platui.Modal
         * @kind property
         * @access protected
         *
         * @type {plat.IObject<boolean>}
         *
         * @description
         * A hash for validating available transitions.
         */
        protected _transitionHash: plat.IObject<boolean> = {
            up: true,
            down: true,
            left: true,
            right: true,
            fade: true
        };

        /**
         * @name __templateString
         * @memberof platui.Modal
         * @kind property
         * @access private
         *
         * @type {string}
         *
         * @description
         * The private template string used to check for a template overwrite.
         */
        private __templateString: string = '<div class="plat-modal-container"></div>\n';

        /**
         * @name __resolveFn
         * @memberof platui.Modal
         * @kind property
         * @access private
         *
         * @type {() => void}
         *
         * @description
         * The resolve function for the modalLoaded Promise.
         */
        private __resolveFn: () => void;

        /**
         * @name __rejectFn
         * @memberof platui.Modal
         * @kind property
         * @access private
         *
         * @type {() => void}
         *
         * @description
         * The reject function for the modalLoaded Promise.
         */
        private __rejectFn: () => void;

        /**
         * @name constructor
         * @memberof platui.Modal
         * @kind function
         * @access public
         *
         * @description
         * The constructor for a {@link platui.Modal|Modal}. Creates the modalLoaded Promise.
         *
         * @returns {platui.Modal} A {@link platui.Modal|Modal} instance.
         */
        constructor() {
            super();
            this.modalLoaded = new this._Promise<void>((resolve, reject): void => {
                this.__resolveFn = resolve;
                this.__rejectFn = reject;
            }).catch(noop);
        }

        /**
         * @name setClasses
         * @memberof platui.Modal
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
            this.dom.addClass(element || this.element, `${__Modal} ${__Hide} ${(className || '')}`);
        }

        /**
         * @name initialize
         * @memberof platui.Modal
         * @kind function
         * @access public
         *
         * @description
         * Check for templateUrl and set if needed then hide the control.
         *
         * @returns {void}
         */
        initialize(): void {
            let optionObj = this.options || (this.options = <plat.observable.IObservableProperty<IModalOptions>>{}),
                options = optionObj.value || (optionObj.value = <IModalOptions>{});

            this.templateUrl = options.templateUrl || this.templateUrl;
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Modal
         * @kind function
         * @access public
         *
         * @description
         * Add the innerTemplate to the control's element.
         *
         * @returns {void}
         */
        setTemplate(): void {
            if (this.templateString !== this.__templateString || this.utils.isString(this.templateUrl)) {
                let dom = this.dom,
                    fragment = dom.serializeHtml(this.__templateString),
                    element = this.element,
                    modalContainer = this._container = <HTMLElement>fragment.firstChild;

                this.innerTemplate = dom.appendChildren(element.childNodes);
                element.appendChild(fragment);
            }
        }

        /**
         * @name loaded
         * @memberof platui.Modal
         * @kind function
         * @access public
         *
         * @description
         * Check for a transition and initialize it if necessary.
         *
         * @returns {void}
         */
        loaded(): void {
            let options = this.options.value,
                transition = options.transition;

            // in case of cloning
            this._container = this._container || <HTMLElement>this.element.firstElementChild;

            this._injectElement();

            if (!this.utils.isString(transition) || transition === 'none') {
                this.dom.addClass(this._container, `${__Plat}no-transition`);
                return;
            } else if (!this._transitionHash[transition]) {
                this._log.debug(`Custom transition: "${transition}" defined for "${this.type}." Please ensure the transition is defined to avoid errors.`);
            }

            let animationEvents = this._compat.animationEvents;
            if (this.utils.isNull(animationEvents)) {
                this._log.debug('This browser does not support CSS3 animations.');
                this.dom.addClass(this._container, `${__Plat}no-transition`);
                return;
            }

            this._transitionEnd = animationEvents.$transitionEnd;
            this.dom.addClass(this._container, `${__Plat + transition} ${__Plat}modal-transition`);
        }

        /**
         * @name dispose
         * @memberof platui.Modal
         * @kind function
         * @access public
         *
         * @description
         * Clean up the auto scroll.
         *
         * @returns {void}
         */
        dispose(): void {
            super.dispose();
            this._scrollRemover();

            if (this.utils.isFunction(this.__rejectFn)) {
                this.__rejectFn();
                this.__rejectFn = this.__resolveFn = null;
            }
        }

        /**
         * @name show
         * @memberof platui.Modal
         * @kind function
         * @access public
         *
         * @description
         * Shows the {@link platui.Modal|Modal}.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control is shown.
         */
        show(): plat.async.IThenable<void> {
            let wasHidden = !this._isVisible,
                promise = this._show();

            if (wasHidden) {
                this.inputChanged(true);
            }

            return promise;
        }

        /**
         * @name hide
         * @memberof platui.Modal
         * @kind function
         * @access public
         *
         * @description
         * Hides the {@link platui.Modal|Modal}.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control is hidden.
         */
        hide(): plat.async.IThenable<void> {
            let wasVisible = this.isVisible,
                promise = this._hide();

            if (wasVisible) {
                this.inputChanged(false);
            }

            return promise;
        }

        /**
         * @name toggle
         * @memberof platui.Modal
         * @kind function
         * @access public
         *
         * @description
         * Toggles the visibility of the {@link platui.Modal|Modal}.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control is toggled.
         */
        toggle(): plat.async.IThenable<void> {
            if (this._isVisible) {
                return this.hide();
            }

            return this.show();
        }

        /**
         * @name isVisible
         * @memberof platui.Modal
         * @kind function
         * @access public
         *
         * @description
         * Whether or not the {@link platui.Modal|Modal} is currently visible.
         *
         * @returns {boolean} True if the {@link platui.Modal|Modal} is currently open
         * and visible, false otherwise.
         */
        isVisible(): boolean {
            return this._isVisible;
        }

        /**
         * @name observeProperties
         * @memberof platui.Modal
         * @kind function
         * @access public
         * @virtual
         *
         * @description
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         *
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         *
         * @returns {void}
         */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void {
            binder.observeProperty(this._setBoundProperty);
        }

        /**
         * @name _setBoundProperty
         * @memberof platui.Modal
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the bindable property is set externally.
         *
         * @param {boolean} modalState The new value of the control state.
         * @param {boolean} oldValue The old value of the control state.
         * @param {void} identifier The child identifier of the property being observed.
         * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
         *
         * @returns {void}
         */
        protected _setBoundProperty(modalState: boolean, oldValue: boolean, identifier: void, firstTime?: boolean): void {
            let utils = this.utils;

            if (firstTime === true && utils.isNull(modalState)) {
                this.inputChanged(this._isVisible);
                return;
            }

            if (utils.isBoolean(modalState)) {
                if (modalState) {
                    if (this._isVisible) {
                        return;
                    }
                    this._show();
                    return;
                }

                if (this._isVisible) {
                    this._hide();
                }

                return;
            }

            this._log.debug(`Attempting to show or hide a ${this.type} with a bound value that is something other than a boolean.`);
        }

        /**
         * @name _show
         * @memberof platui.Modal
         * @kind function
         * @access protected
         *
         * @description
         * Shows the {@link platui.Modal|Modal}.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control is shown.
         */
        protected _show(): plat.async.IThenable<void> {
            let dom = this.dom,
                utils = this.utils;

            if (!utils.isNull(this.innerTemplate)) {
                return this._bindInnerTemplate();
            }

            this._isVisible = true;

            return new this._Promise<void>((resolve): void => {
                utils.requestAnimationFrame((): void => {
                    this._alignModal();
                    dom.removeClass(this.element, __Hide);

                    utils.defer((): void => {
                        utils.requestAnimationFrame((): void => {
                            dom.addClass(this._container, `${__Plat}activate`);
                            resolve();
                        });
                    }, 20);
                });
            });
        }

        /**
         * @name _alignModal
         * @memberof platui.Modal
         * @kind function
         * @access protected
         *
         * @description
         * Aligns the control to the top of the viewport.
         *
         * @param {Event} ev? The scroll event object.
         *
         * @returns {void}
         */
        protected _alignModal(ev?: Event): void {
            let utils = this.utils,
                isNull = utils.isNull,
                _document = this._document,
                documentEl = _document.documentElement,
                scrollEl = isNull(documentEl) || !documentEl.scrollTop ? _document.body : documentEl,
                scrollTop = scrollEl.scrollTop;

            if (this._scrollTop === scrollTop) {
                return;
            }

            if (!isNull(ev)) {
                utils.requestAnimationFrame((): void => {
                    this.element.style.top = `${scrollTop}px`;
                });
            } else {
                this.element.style.top = `${scrollTop}px`;
                this._scrollRemover = this.addEventListener(this._window, 'scroll', this._alignModal, false);
            }

            this._scrollTop = scrollTop;
        }

        /**
         * @name _hide
         * @memberof platui.Modal
         * @kind function
         * @access protected
         *
         * @description
         * Hides the {@link platui.Modal|Modal}.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control is hidden.
         */
        protected _hide(): plat.async.IThenable<void> {
            let dom = this.dom,
                utils = this.utils,
                promise: plat.async.IThenable<void>;

            this._scrollRemover();
            this._scrollRemover = noop;

            this._isVisible = false;
            if (utils.isString(this._transitionEnd)) {
                promise = this._addHideOnTransitionEnd();
                utils.requestAnimationFrame((): void => {
                    dom.removeClass(this._container, `${__Plat}activate`);
                });
            } else {
                promise = new this._Promise<void>((resolve): void => {
                    utils.requestAnimationFrame((): void => {
                        dom.addClass(this.element, __Hide);
                        dom.removeClass(this._container, `${__Plat}activate`);
                        resolve();
                    });
                });
            }

            return promise;
        }

        /**
         * @name _bindInnerTemplate
         * @memberof platui.Modal
         * @kind function
         * @access protected
         *
         * @description
         * Adds the innerTemplate to {@link plat.ui.BindableTemplates|BindableTemplates}, binds it,
         * and adds it to the DOM.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control is shown.
         */
        protected _bindInnerTemplate(): plat.async.IThenable<void> {
            let innerTemplate = this.innerTemplate,
                bindableTemplates = this.bindableTemplates,
                modal = 'modal';

            bindableTemplates.add(modal, innerTemplate);
            this.innerTemplate = null;

            return bindableTemplates.bind(modal).then((template): plat.async.IThenable<void> => {
                this._container.insertBefore(template, null);

                if (this.utils.isFunction(this.__resolveFn)) {
                    this.__resolveFn();
                    this.__resolveFn = this.__rejectFn = null;
                }

                return this._show();
            });
        }

        /**
         * @name _injectElement
         * @memberof platui.Modal
         * @kind function
         * @access protected
         *
         * @description
         * Removes itself from the DOM and inserts itself into the body to work with
         * absolute positioning.
         *
         * @returns {void}
         */
        protected _injectElement(): void {
            let element = this.element,
                parentElement = element.parentElement,
                body = this._document.body;

            if (!this.utils.isNode(parentElement) || parentElement === body) {
                return;
            }

            body.insertBefore(element, null);
        }

        /**
         * @name _addHideOnTransitionEnd
         * @memberof platui.Modal
         * @kind function
         * @access protected
         *
         * @description
         * Listens for the transition to end and hides the element after it is finished.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control is hidden.
         */
        protected _addHideOnTransitionEnd(): plat.async.IThenable<void> {
            return new this._Promise<void>((resolve): void => {
                let element = this.element,
                    remove = this.addEventListener(element, this._transitionEnd,(): void => {
                        remove();
                        this.dom.addClass(element, __Hide);
                        resolve();
                    }, false);
            });
        }
    }

    plat.register.control(__Modal, Modal);

    /**
     * @name IModalOptions
     * @memberof platui
     * @kind interface
     *
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Modal|Modal} control.
     */
    export interface IModalOptions {
        /**
         * @name transition
         * @memberof platui.IModalOptions
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The transition type/direction the {@link platui.Modal|Modal} will enter with.
         * The default value is "none".
         *
         * @remarks
         * - "none"
         * - "left"
         * - "right"
         * - "up"
         * - "down"
         * - "fade"
         */
        transition?: string;

        /**
         * @name templateUrl
         * @memberof platui.IModalOptions
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The url of the {@link platui.Modal|Modal's} intended template if not using
         * innerHTML.
         *
         * @remarks
         * This URL must be a static string and cannot be a bound item on a parent control's context.
         */
        templateUrl?: string;
    }
}
