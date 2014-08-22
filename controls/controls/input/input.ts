module platui {
    export class Input extends plat.ui.BindablePropertyControl {
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * The template string for the Input control.
         */
        templateString =
        '<div class="plat-input-container">' +
            '<div class="image"></div>' +
            '<input type="text" plat-keyup="__onKeyup" />' +
            '<div class="action"></div>' +
        '</div>';

        /**
         * The plat-options for the Input control.
         */
        options: plat.observable.IObservableProperty<IInputOptions>;

        /**
         * The HTML image element.
         */
        _imageElement: HTMLElement;

        /**
         * The HTML input element.
         */
        _inputElement: HTMLInputElement;

        /**
         * The HTML action element.
         */
        _actionElement: HTMLElement;

        private __action: string;
        private __actionChar: string;
        private __actionHandler: EventListener;

        /**
         * Set all HTMLElement references.
         */
        setTemplate(): void {
            var image = this._imageElement = <HTMLElement>this.element.firstElementChild.firstElementChild,
                input = this._inputElement = <HTMLInputElement>image.nextElementSibling;

            this._actionElement = <HTMLElement>input.nextElementSibling;
        }

        /**
         * Set the type and initialize the action.
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IInputOptions>>{},
                options = optionObj.value || <IInputOptions>{},
                dom = this.dom,
                element = this.element,
                type = options.type || 'primary',
                action = this.__action = options.action || 'normal';

            dom.addClass(element, type);
            dom.addClass(element, action);
            this.__initializeAction();
        }

        private __initializeAction(): void {
            var char = '';
            switch (this.__action) {
                case 'email':
                    this.__actionHandler = this.__handleEmail;
                    break;
                default:
                    this.__actionHandler = this.__erase;
                    break;
            }

            var actionElement = this._actionElement;
            actionElement.textContent = this.__actionChar = char;
            this.addEventListener(actionElement, __$tap, this.__actionHandler);
        }

        private __erase(): void {
            var inputElement = this._inputElement;
            inputElement.value = '';
            this._actionElement.textContent = this.__actionChar = '';
            inputElement.focus();
        }

        private __handleEmail(): void {
            var inputElement = this._inputElement,
                value = inputElement.value,
                char = this.__actionChar;

            if (char === 'x') {
                inputElement.value = '';
            } else {
                inputElement.value += this.__actionChar;
            }

            this.__checkEmail();
            this.propertyChanged(inputElement.value, value);
            inputElement.focus();
        }

        private __checkEmail(): void {
            var value = this._inputElement.value;
            switch (this.__actionChar) {
                case '@':
                    if (value.indexOf('@') !== -1) {
                        if (value.indexOf('.com') !== -1) {
                            this._actionElement.textContent = this.__actionChar = 'x';
                            break;
                        }
                        this._actionElement.textContent = this.__actionChar = '.com';
                    }
                    break;
                case '.com':
                    if (value.indexOf('@') === -1) {
                        this._actionElement.textContent = this.__actionChar = '@';
                    } else if (value.indexOf('.com') !== -1) {
                        this._actionElement.textContent = this.__actionChar = 'x';
                    }
                    break;
                case 'x':
                    if (value === '') {
                        this._actionElement.textContent = this.__actionChar = '';
                    } else if (value.indexOf('@') === -1) {
                        this._actionElement.textContent = this.__actionChar = '@';
                    } else if (value.indexOf('.com') === -1) {
                        this._actionElement.textContent = this.__actionChar = '.com';
                    }
                    break;
                default:
                    if (value.indexOf('@') === -1) {
                        this._actionElement.textContent = this.__actionChar = '@';
                    }
                    break;
            }
        }

        private __checkText(): void {
            if (this.__actionChar === 'x') {
                if (this._inputElement.value === '') {
                    this._actionElement.textContent = this.__actionChar = '';
                }
            } else {
                if (this._inputElement.value !== '') {
                    this._actionElement.textContent = this.__actionChar = 'x';
                }
            }
        }

        private __onKeyup(ev: KeyboardEvent): void {
            switch (this.__action) {
                case 'email':
                    this.__checkEmail();
                    break;
                default:
                    this.__checkText();
                    break;
            }
        }
    }

    plat.register.control(__Input, Input);

    export interface IInputOptions {
        /**
         * The type of Input control.
         */
        type: string;

        /**
         * The action of the Input control (email).
         */
        action: string;
    }
}
