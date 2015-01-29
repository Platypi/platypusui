/// <reference path="../../../references.d.ts" />

module app {
    export class MainViewControl extends plat.ui.ViewControl {
        title = 'Main';
        templateUrl = 'viewcontrols/main/main.viewcontrol.html';
        context = {
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
            modals: <any>{
                modal1: false,
                modal2: false,
                modal3: false,
            },
            carouselItems: [{ text: 'test0' }, { text: 'test1' }, { text: 'test2' }],
            listview: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
        };

        text: plat.controls.INamedElement<HTMLElement, void>;
        password: plat.controls.INamedElement<HTMLElement, void>;
        modal1: plat.controls.INamedElement<Element, platui.Modal>;
        modal2: plat.controls.INamedElement<Element, platui.Modal>;

        loaded() {
            var context = this.context;
        }

        addListItem() {
            var listview = this.context.listview;
            listview.push(listview[listview.length - 1] + 1);
        }

        popListItem() {
            this.context.listview.pop();
        }

        foo(ev?: any) {
            console.log(this.context.test3);
        }

        bar(ev?: any) {
            this.context.progress += 0.01;
        }

        toggleModal(modal: string) {
            this.context.modals[modal] = !this.context.modals[modal];
        }

        load() {
            var promise: plat.async.IPromise = plat.acquire('$Promise');

            return new promise((resolve, reject) => {
                setTimeout(() => {
                    this.context.listview.unshift(0);
                    resolve();
                }, 10000);
            });
        }

        renderListview(item: number, index: number) {
            if (index % 2 === 0) {
                return 'listview-template';
            }

            return 'listview-template2';
        }

        refresh() {
            var promise: plat.async.IPromise = plat.acquire('$Promise');

            return new promise((resolve, reject) => {
                setTimeout(() => {
                    this.context.listview = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    resolve();
                }, 5000);
            });
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl);

    class App extends plat.App {
        constructor(config: plat.web.IBrowserConfig, router: plat.routing.Router) {
            super();
            config.baseUrl = 'app';

            router.configure({
                pattern: '',
                view: MainViewControl
            });
        }

        error(ev: plat.events.ErrorEvent<Error>) {
            console.log(ev.error);
        }
    }

    plat.register.app('app', App, [
        plat.web.IBrowserConfig,
        plat.routing.Router
    ]);
}
