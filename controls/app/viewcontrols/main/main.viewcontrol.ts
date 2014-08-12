module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            text: <string>null,
            password: <string>null,
            test: 'wassup',
            check: true,
            progress: 0
        };

        text: plat.controls.INamedElement<HTMLElement, void>;
        password: plat.controls.INamedElement<HTMLElement, void>;

        navigatedTo(route: plat.web.IRoute<any>) {
            if (route.path.length === 0) {
                return;
            }

            this.title = route.path.replace(/\//g, ' ');
        }

        loaded() {
            var context = this.context;
        }

        foo(ev?: any) {
            console.log(this.context.test);
        }

        bar(ev?: any) {
            this.context.progress += 0.01;
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, null, ['']);
}
