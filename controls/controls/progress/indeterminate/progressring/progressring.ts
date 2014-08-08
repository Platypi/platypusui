module platui {
    export class ProgressRing extends plat.ui.TemplateControl {
        /**
         * The ProgressRing's template string.
         */
        templateString =
        '<div class="plat-progress-container">' +
            '<div class="ring"></div>' +
        '</div>';
    }

    plat.register.control('plat-ring', ProgressRing);
}
