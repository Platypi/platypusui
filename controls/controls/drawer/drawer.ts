module platui {
    var __drawerControllerInitEvent = '__platDrawerControllerInit',
        __drawerControllerFetchEvent = '__platDrawerControllerFetch',
        __drawerFoundEvent = '__platDrawerFound';

    export class Drawer extends plat.ui.TemplateControl {
        $utils: plat.IUtils = plat.acquire(plat.IUtils);

        /**
         * The plat-options for the Drawer.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;

        private __currentDirection: string;

        /**
         * Check for a direction and initialize event handling.
         */
        initialize(): void {
            var element = this.element,
                optionObj = this.options,
                options = this.$utils.isObject(optionObj) ? optionObj.value : <IDrawerOptions>{},
                direction = this.__currentDirection = options.direction || 'right',
                name = element.hasAttribute('plat-name') ? element.getAttribute('plat-name') : null;

            this.dom.addClass(element, direction);
            this.__initializeEvents(name, direction);
        }

        _changeDirection(direction: string): void {
            if (this.$utils.isNull(direction) || direction === this.__currentDirection) {
                return;
            }

            var dom = this.dom,
                element = this.element;

            dom.removeClass(element, this.__currentDirection);
            dom.addClass(element, direction);

            this.__currentDirection = direction;
        }

        private __initializeEvents(name: string, direction: string): void {
            var $utils = this.$utils,
                isString = $utils.isString;

            this.on(__drawerControllerFetchEvent, (event: plat.events.IDispatchEventInstance, controllerArg: any) => {
                if (isString(name) && isString(controllerArg.name) && name !== controllerArg.name) {
                    return;
                } else if (isString(controllerArg.direction)) {
                    this._changeDirection(controllerArg.direction);
                }

                this.dispatchEvent(__drawerFoundEvent, plat.events.EventManager.DIRECT, {
                    name: name,
                    direction: direction,
                    element: this.element
                });
            });
        }
    }

    plat.register.control('plat-drawer', Drawer);

    export class DrawerController extends plat.ui.TemplateControl {
        $utils: plat.IUtils = plat.acquire(plat.IUtils);
        $compat: plat.ICompat = plat.acquire(plat.ICompat);
        $document: Document = plat.acquire(plat.Document);

        /**
         * The plat-options for the DrawerController.
         */
        options: plat.observable.IObservableProperty<IDrawerControllerOptions>;

        /**
         * A boolean value indicating whether the drawer is currently open.
         */
        isOpen = false;

        /**
         * The direction of control for this DrawerController.
         */
        _direction: string;

        /**
         * The DrawerController's corresponding Drawer element.
         */
        _drawerElement: HTMLElement;

        /**
         * The CSS3 transform property.
         */
        _transform: string;

        /**
         * The last touch start recorded.
         */
        _lastTouch: plat.ui.IPoint;

        private __hasSwiped = false;
        private __removeSwipeOpen: plat.IRemoveListener;
        private __removeSwipeClose: plat.IRemoveListener;
        private __removePrimaryTrack: plat.IRemoveListener;
        private __removeSecondaryTrack: plat.IRemoveListener;
        private __rootElement: HTMLElement;
        private __directionHash: plat.IObject<string> = {
            right: 'left',
            left: 'right',
            up: 'down',
            down: 'up'
        };

        /**
         * Initialize the track events on the element.
         */
        loaded(): void {
            var element = this.element,
                optionObj = this.options,
                options = this.$utils.isObject(optionObj) ? optionObj.value : <IDrawerOptions>{},
                direction = options.direction,
                name = element.hasAttribute('plat-name') ? element.getAttribute('plat-name') : null;

            this.__initializeEvents(name, direction);
        }

        open(): void {
            var elementToMove = this.__rootElement,
                drawerElement = this._drawerElement,
                isNode = this.$utils.isNode;

            if (!isNode(elementToMove) || !isNode(drawerElement)) {
                return;
            }

            this.dom.addClass(elementToMove, 'plat-drawer-transition');

            var translation: string,
                direction = this._direction;
            switch (direction) {
                case 'up':
                    translation = 'translate3d(0,' + (-drawerElement.offsetHeight) + 'px,0)';
                    break;
                case 'down':
                    translation = 'translate3d(0,' + drawerElement.offsetHeight + 'px,0)';
                    break;
                case 'left':
                    translation = 'translate3d(' + (-drawerElement.offsetWidth) + 'px,0,0)';
                    break;
                case 'right':
                    translation = 'translate3d(' + drawerElement.offsetWidth + 'px,0,0)';
                    break;
                default:
                    return;
            }

            elementToMove.style[<any>this._transform] = translation;
            if (this.isOpen) {
                return;
            }

            this.isOpen = true;
            this._removeSwipeOpen();
            this._addSwipeClose(direction);
        }

        close(): void {
            var elementToMove = this.__rootElement,
                drawerElement = this._drawerElement,
                isNode = this.$utils.isNode;

            if (!isNode(elementToMove) || !isNode(drawerElement)) {
                return;
            }

            this.dom.addClass(elementToMove, 'plat-drawer-transition');

            elementToMove.style[<any>this._transform] = '';
            if (!this.isOpen) {
                return;
            }

            this.isOpen = false;
            this._removeSwipeClose();
            this._addSwipeOpen(this._direction);
        }

        toggle(): void {
            if (this.isOpen) {
                this.close();
                return;
            }

            this.open();
        }

        _reset(): void {
            if (this.isOpen) {
                this.open();
                return;
            }

            this.close();
        }

        _addSwipeOpen(direction: string): void {
            var event = '$swipe' + direction;
            this.__removeSwipeOpen = this.addEventListener(this.element, event, () => {
                this.__hasSwiped = true;
                this.open();
            });
        }

        _removeSwipeOpen(): void {
            if (this.$utils.isFunction(this.__removeSwipeOpen)) {
                this.__removeSwipeOpen();
                this.__removeSwipeOpen = null;
            }
        }

        _addSwipeClose(direction: string): void {
            var event = '$swipe' + this.__directionHash[direction];
            this.__removeSwipeClose = this.addEventListener(this.element, event, () => {
                this.__hasSwiped = true;
                this.close();
            });
        }

        _removeSwipeClose(): void {
            if (this.$utils.isFunction(this.__removeSwipeClose)) {
                this.__removeSwipeClose();
                this.__removeSwipeClose = null;
            }
        }

        _addEventListeners(direction: string): void {
            if (!this.__controllerIsValid(direction)) {
                return;
            }

            var element = this.element,
                primaryTrack = '$track' + direction,
                secondaryTrack = '$track' + this.__directionHash[direction],
                trackFn = this._track.bind(this);

            this._direction = direction;

            this._removeEventListeners();
            this.__removePrimaryTrack = this.addEventListener(element, primaryTrack, trackFn);
            this.__removeSecondaryTrack = this.addEventListener(element, secondaryTrack, trackFn);
            this._addSwipeOpen(direction);
            if (this.$utils.isNull(this._lastTouch)) {
                this._lastTouch = { x: 0, y: 0 };
                this.addEventListener(element, '$touchstart', (ev: plat.ui.IGestureEvent) => {
                    this._lastTouch = {
                        x: ev.clientX,
                        y: ev.clientY
                    };
                });
                this.addEventListener(this.$document, '$touchend', this._touchEnd.bind(this));
            }
        }

        _removeEventListeners(): void {
            var isFunction = this.$utils.isFunction;
            if (isFunction(this.__removePrimaryTrack)) {
                this.__removePrimaryTrack();
                this.__removePrimaryTrack = null;
            }

            if (isFunction(this.__removeSecondaryTrack)) {
                this.__removeSecondaryTrack();
                this.__removeSecondaryTrack = null;
            }

            if (isFunction(this.__removeSwipeOpen)) {
                this.__removeSwipeOpen();
                this.__removeSwipeOpen = null;
            }

            if (isFunction(this.__removeSwipeClose)) {
                this.__removeSwipeClose();
                this.__removeSwipeClose = null;
            }
        }

        _touchEnd(ev: plat.ui.IGestureEvent): void {
            if (this.__hasSwiped) {
                this.__hasSwiped = false;
                return;
            }

            var drawerElement = this._drawerElement,
                $utils = this.$utils;

            var distanceMoved: number,
                totalDistance: number;
            switch (this._direction) {
                case 'up':
                case 'down':
                    totalDistance = drawerElement.offsetHeight;
                    distanceMoved = ev.clientY - this._lastTouch.y;
                    break;
                case 'left':
                case 'right':
                    totalDistance = drawerElement.offsetWidth;
                    distanceMoved = ev.clientX - this._lastTouch.x;
                    break;
                default:
                    return;
            }

            if (Math.abs(distanceMoved) > Math.ceil(totalDistance * 3 / 4)) {
                this.toggle();
                return;
            }

            this._reset();
        }

        _track(ev: plat.ui.IGestureEvent): void {
            var elementToMove = this.__rootElement,
                drawerElement = this._drawerElement,
                $utils = this.$utils;

            var distanceMoved: number,
                translation: string;
            switch (this._direction) {
                case 'up':
                case 'down':
                    distanceMoved = this.isOpen ?
                        drawerElement.offsetHeight + ev.clientY - this._lastTouch.y :
                        ev.clientY - this._lastTouch.y;
                    translation = 'translate3d(0,' + distanceMoved + 'px,0)';
                    break;
                case 'left':
                case 'right':
                    distanceMoved = this.isOpen ?
                        drawerElement.offsetWidth + ev.clientX - this._lastTouch.x :
                        ev.clientX - this._lastTouch.x;
                    translation = 'translate3d(' + distanceMoved + 'px,0,0)';
                    break;
                default:
                    return;
            }

            elementToMove.style[<any>this._transform] = translation;
        }

        private __initializeEvents(name: string, direction: string): void {
            var element = this.element,
                $utils = this.$utils,
                isString = $utils.isString,
                hasDirection = isString(direction);

            this.__setTransform();

            if (hasDirection) {
                return this._addEventListeners(direction.toLowerCase());
            }

            var eventRemover = this.on(__drawerFoundEvent, (event: plat.events.IDispatchEventInstance, drawerArg: any) => {
                if (isString(name) && isString(drawerArg.name) && name !== drawerArg.name) {
                    return;
                }

                this._drawerElement = drawerArg.element;

                if (!hasDirection && isString(drawerArg.direction)) {
                    this._addEventListeners(drawerArg.direction.toLowerCase());
                }

                eventRemover();
            });

            this.dispatchEvent(__drawerControllerFetchEvent, plat.events.EventManager.DIRECT, {
                name: name
            });
        }

        private __setTransform(): void {
            var style = this.element.style,
                isUndefined = this.$utils.isUndefined;

            if (isUndefined(style.transform)) {
                var vendorPrefix = this.$compat.vendorPrefix;
                if (!isUndefined(style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                    this._transform = vendorPrefix.lowerCase + 'Transform';
                    return;
                } else if (!isUndefined(style[<any>(vendorPrefix.js + 'Transform')])) {
                    this._transform = vendorPrefix.lowerCase + 'Transform';
                    return;
                }
            }

            this._transform = 'transform';
        }

        private __controllerIsValid(direction: string): boolean {
            var isNull = this.$utils.isNull,
                Exception: plat.IExceptionStatic,
                rootElement = this.__rootElement = this.root.element;

            if (isNull(this.__directionHash[direction])) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Incorrect direction: "' + direction + '" defined for "plat-drawer" or "plat-drawer-controller"');
                return false;
            } else if (isNull(this._drawerElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Could not find a corresponding plat-drawer for this "plat-drawer-controller"');
                return false;
            } else if (isNull(rootElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Cannot have a "plat-drawer-controller" inside a root control with a null element.');
                return false;
            }

            this.addEventListener(rootElement, this.$compat.animationEvents.$transitionEnd, () => {
                this.dom.removeClass(rootElement, 'plat-drawer-transition');
            });

            return true;
        }
    }

    plat.register.control('plat-drawer-controller', DrawerController);

    export interface IDrawerOptions {
        direction: string;
    }

    export interface IDrawerControllerOptions {
        direction: string;
    }
}
