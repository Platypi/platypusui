/// <reference path="../../references.d.ts" />

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
                slider4: 65
            },
            ranges: {
                range1: { lower: 10, upper: 30 },
                range2: { lower: 15, upper: 50 },
                range3: { lower: 20, upper: 70 },
                range4: { lower: 25, upper: 90 }
            },
            test3: '',
            lower: 10,
            upper: 90,
            modals: <any>{
                modal1: false,
                modal2: false,
                modal3: false
            },
            carouselItems: [{ text: 'test0' }, { text: 'test1' }, { text: 'test2' }],
            //listview: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
            listview: [10, 9, 8],
            groupedlistview: <Array<platui.IListviewGroup>>[
                { group: 'A', items: ['apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'B', items: ['ballin', 'bark', 'basket'] },
                { group: 'C', items: ['ballin', 'bark', 'basket', 'apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'D', items: ['ballin', 'bark', 'basket'] },
                { group: 'E', items: ['ballin', 'bark', 'basket'] },
                { group: 'F', items: ['ballin', 'bark', 'basket', 'apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'G', items: ['ballin', 'bark', 'basket'] },
                { group: 'H', items: ['ballin', 'bark', 'basket'] },
                { group: 'I', items: ['ballin', 'bark', 'basket', 'apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'J', items: ['ballin', 'bark', 'basket'] },
                { group: 'K', items: ['ballin', 'bark', 'basket'] },
                { group: 'L', items: ['ballin', 'bark', 'basket', 'apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'M', items: ['ballin', 'bark', 'basket'] },
                { group: 'N', items: ['ballin', 'bark', 'basket'] },
                { group: 'O', items: ['ballin', 'bark', 'basket', 'apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'P', items: ['ballin', 'bark', 'basket'] },
                { group: 'Q', items: ['ballin', 'bark', 'basket'] },
                { group: 'R', items: ['ballin', 'bark', 'basket', 'apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'S', items: ['ballin', 'bark', 'basket'] },
                { group: 'T', items: ['ballin', 'bark', 'basket'] },
                { group: 'U', items: ['ballin', 'bark', 'basket', 'apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'V', items: ['ballin', 'bark', 'basket'] },
                { group: 'W', items: ['ballin', 'bark', 'basket'] },
                { group: 'X', items: ['ballin', 'bark', 'basket', 'apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'Y', items: ['ballin', 'bark', 'basket'] },
                { group: 'Z', items: ['ballin', 'bark', 'basket'] },
                { group: 'AA', items: ['ballin', 'bark', 'basket', 'apple', 'apricot', 'ardvark', 'apple', 'apricot', 'ardvark'] },
                { group: 'AB', items: ['ballin', 'bark', 'basket'] },
                { group: 'AC', items: ['ballin', 'bark', 'basket'] }
            ],
            states: [
                'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
            ],
            url1: '',
            url2: ''
        };

        text: plat.controls.INamedElement<HTMLElement, void>;
        password: plat.controls.INamedElement<HTMLElement, void>;
        modal1: plat.controls.INamedElement<Element, platui.Modal>;
        modal2: plat.controls.INamedElement<Element, platui.Modal>;
        urls = [
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTnPq66xNWUQvfFqdlFnsrU4TfR_dASliyI1avXHzRZ6FieE88n',
            'https://upload.wikimedia.org/wikipedia/commons/3/3d/LARGE_elevation.jpg',
            'http://i1.wp.com/static.web-backgrounds.net/uploads/2012/08/City_Landscape_Background.jpg',
            'http://www.pageresource.com/wallpapers/wallpaper/blue-sky-abstrakt-windows-backgrounds.jpg'
        ];

        protected navbar: platui.Navbar = plat.acquire(platui.Navbar);

        initialize() {
            this.initNavbar();
            this.context.url1 = this.urls[0];
            this.context.url2 = this.urls[this.urls.length - 1];
        }

        loaded() {
            var context = this.context,
                i = 1;
            setInterval(() => {
                var urls = this.urls,
                    lastIndex = urls.length - 1;

                context.url1 = urls[i];
                context.url2 = urls[lastIndex - i];
                if (i === lastIndex) {
                    i = 0;
                } else {
                    i++;
                }
            }, 2000);
        }

        initNavbar() {
            this.navbar.setLeft([{
               content: '<span class="icon-arrow-left"></span><span>Back</span>',
               action: () => {
                   alert('back');
               }
            }]);

            this.navbar.setCenter({
               content: 'PlatypusUI'
            });

            this.navbar.setRight({
               content: '<span>some icon</span>',
               action: () => {
                   alert('icon action');
               }
            });
        }

        addListItem() {
            var listview = this.context.listview;
            this.context.groupedlistview[0].items.push('check');
        }

        popListItem() {
            this.context.listview.pop();
            this.context.groupedlistview[0].items.pop();
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
                    //this.context.listview.unshift(0);
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
            //var promise: plat.async.IPromise = plat.acquire('$Promise');

            //return new promise((resolve, reject) => {
            //    setTimeout(() => {
            //        //this.context.listview = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            //        resolve();
            //    }, 5000);
            //});
        }
    }

    plat.register.viewControl('viewcontrol', MainViewControl);
}
