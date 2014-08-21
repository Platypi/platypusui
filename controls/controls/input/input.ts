module platui {
    export class Input extends plat.ui.BindablePropertyControl {
        /**
         * The template string for the Input control.
         */
        templateString =
        '<div class="plat-input-container">' +
            '<div class="image"></div>' +
            '<input type="text" />' +
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
        _inputElement: HTMLElement;

        /**
         * The HTML action element.
         */
        _actionElement: HTMLElement;

        /**
         * Set all HTMLElement references.
         */
        setTemplate(): void {
            var image = this._imageElement = <HTMLElement>this.element.firstElementChild.firstElementChild,
                input = this._inputElement = <HTMLElement>image.nextElementSibling;

            this._actionElement = <HTMLElement>input.nextElementSibling;
        }

        /**
         * 
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IInputOptions>>{},
                options = optionObj.value || <IInputOptions>{},
                type = options.type || 'primary';

            this.dom.addClass(this.element, type);
        }
    }

    plat.register.control(__Input, Input);

    export interface IInputOptions {
        /**
         * The type of Input control.
         */
        type: string;
    }
}
