module platui {
    export class Modal extends plat.ui.TemplateControl {
        $utils: plat.IUtils = plat.acquire(plat.IUtils);
        $compat: plat.ICompat = plat.acquire(plat.ICompat);

        /**
         * The Modal's template string.
         */
        templateString = '<div class="plat-modal-container"></div>';

        /**
         * The plat-options for the Modal.
         */
        options: plat.observable.IObservableProperty<IModalOptions>;

        private __modalElement: HTMLElement;
        private __isVisible = false;
        private __transitionEnd: string;
        private __transitionHash: plat.IObject<boolean> = {
            up: true,
            down: true,
            left: true,
            right: true,
            fade: true
        };

        /**
         * Check for templateUrl and set if needed. Hide the modal.
         */
        initialize(): void {
            var optionObj = this.options,
                options = this.$utils.isObject(optionObj) ? optionObj.value : <IModalOptions>{};

            this.templateUrl = options.templateUrl;
            this.dom.addClass(this.element, 'hide');
        }

        /**
         * Add the innerTemplate to the modal element.
         */
        setTemplate(): void {
            var modal = this.__modalElement = <HTMLElement>this.element.firstElementChild;
            if (this.$utils.isNode(this.innerTemplate)) {
                modal.appendChild(this.innerTemplate);
            }
        }

        /**
         * Check for a transition.
         */
        loaded(): void {
            var optionObj = this.options,
                $utils = this.$utils,
                dom = this.dom,
                modalElement = this.__modalElement,
                options = $utils.isObject(optionObj) ? optionObj.value : <IModalOptions>{},
                transition = options.transition;

            if (!this.$utils.isString(transition) || transition === 'none') {
                dom.addClass(modalElement, 'plat-no-transition');
                return;
            } else if ($utils.isNull(this.__transitionHash[transition])) {
                var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Custom transition direction: "' + transition +
                    '" defined for "plat-modal." Please ensure a transition is defined to avoid errors.');
            }

            this.__transitionEnd = this.$compat.animationEvents.$transitionEnd;
            dom.addClass(modalElement, 'plat-modal-transition');
            dom.addClass(modalElement, transition);
        }

        /**
         * Shows the modal.
         */
        show(): void {
            var dom = this.dom;
            dom.removeClass(this.element, 'hide');
            this.$utils.postpone(() => {
                dom.addClass(this.__modalElement, 'activate');
            });

            this.__isVisible = true;
        }

        /**
         * Hides the modal.
         */
        hide(): void {
            var dom = this.dom;
            dom.removeClass(this.__modalElement, 'activate');
            if (this.$utils.isString(this.__transitionEnd)) {
                this._addHideOnTransitionEnd();
            } else {
                dom.addClass(this.element, 'hide');
            }

            this.__isVisible = false;
        }

        /**
         * Toggles the visibility of the modal.
         */
        toggle(): void {
            if (this.__isVisible) {
                this.hide();
                return;
            }

            this.show();
        }

        /**
         * Whether the modal is currently visible.
         */
        isVisible(): boolean {
            return this.__isVisible;
        }

        _addHideOnTransitionEnd(): void {
            var element = this.element,
                remove = this.addEventListener(element, this.__transitionEnd, () => {
                    remove();
                    this.dom.addClass(element, 'hide');
                });
        }
    }

    plat.register.control('plat-modal', Modal);

    /**
     * The modal options capable of being placed on the 'plat-modal' as 'plat-options.'
     */
    export interface IModalOptions {
        /**
         * The transition direction the modal will enter with.
         */
        transition: string;

        /**
         * The url of the modal's intended template.
         */
        templateUrl?: string;
    }
}
