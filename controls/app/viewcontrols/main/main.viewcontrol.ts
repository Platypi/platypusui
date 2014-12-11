/// <reference path="../../../references.d.ts" />

module app {
    export class MainViewControl extends plat.ui.WebViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
            text: <string>'test',
            password: <string>null,
            test: <any>null,
            checks: {
                HTML: true,
                CSS: false,
                JavaScript: true
            },
            progress: 0,
            sliders: {
                slider1: 20,
                slider2: 35,
                slider3: 50,
                slider4: 65,
            },
            ranges: {
                range1: { lower: 10, upper: 30 },
                range2: { lower: 15, upper: 50 },
                range3: { lower: 20, upper: 70 },
                range4: { lower: 25, upper: 90 },
            },
            test3: '',
            lower: 10,
            upper: 90,
            show: false,
            carouselItems: [{ text: 'test0' }, { text: 'test1' }, { text: 'test2' }]
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
        }

        __toggle() {
            this.context.show = !this.context.show;
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl, null, ['']);

    class App extends plat.App {
        constructor(config: plat.web.IBrowserConfig) {
            super();
            config.baseUrl = 'app';
        }

        error(ev: plat.events.IErrorEvent<Error>) {
            console.log(ev.error);
        }
    }

    plat.register.app('app', App, [
        plat.web.IBrowserConfig
    ]);
}
