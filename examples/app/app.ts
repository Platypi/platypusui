/// <reference path="../references.d.ts" />

module app {
    class App extends plat.App {
        constructor(config: plat.web.IBrowserConfig, router: plat.routing.Router) {
            super();
            config.baseUrl = 'examples';
    
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
