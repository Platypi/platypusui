/// <reference path='../../lib/platypus.ts' />
module app {
    export class GridViewControl extends plat.ui.WebViewControl {
        title = 'Grid';
        templateUrl = 'viewcontrols/grid/grid.viewcontrol.html';
        context = {};
    }
    plat.register.viewControl('grid', GridViewControl, null, ['grid']);
}
