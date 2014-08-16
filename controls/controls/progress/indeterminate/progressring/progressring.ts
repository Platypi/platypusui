﻿module platui {
    /**
     * A Template Control for showing indeterminate progress.
     */
    export class ProgressRing extends plat.ui.TemplateControl {
        /**
         * The ProgressRing's template string.
         */
        templateString =
        '<div class="plat-progress-container">' +
            '<div class="ring"></div>' +
        '</div>';
    }

    plat.register.control(__ProgressRing, ProgressRing);
}
