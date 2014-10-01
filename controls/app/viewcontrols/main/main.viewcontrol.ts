module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            text: <string>null,
            password: <string>null,
            test: <any>null,
            check: true,
            progress: 0,
            range: 20,
            test3: '',
            lower: 10,
            upper: 90,
            show: false
        };

        text: plat.controls.INamedElement<HTMLElement, void>;
        password: plat.controls.INamedElement<HTMLElement, void>;
        modal: plat.controls.INamedElement<Element, platui.Modal>;

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
            console.log(this.context.test3);
        }

        bar(ev?: any) {
            this.context.progress += 0.01;
            this.context.range++;
        }

        __toggle() {
            this.context.show = !this.context.show;
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, null, ['']);
}
