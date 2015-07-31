/**
  * PlatypusUI v0.5.2 (https://platypi.io)
  * Copyright 2015 Platypi, LLC. All rights reserved.
  *
  * PlatypusUI is licensed under the MIT license found at
  * https://github.com/Platypi/platypusui/blob/master/LICENSE
  *
  */
/**
  * The entry point into the platypus UI controls library.
  */
declare module platui {
    /**
      * An interface a control should implement if they plan on using
      * class based CSS to style the UI.
      */
    interface IUiControl {
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(classNames?: any, element?: Element): void;
    }
    /**
      * An interface a control should implement if validation is necessary.
      */
    interface IFormControl {
        /**
          * A function to validate user input.
          */
        validate(): boolean;
    }
    /**
      * Describes a point with x and y coordinates and an associated value.
      */
    interface IValuePoint extends plat.ui.IPoint {
        /**
          * A value associated with the given point.
          */
        value: number;
    }
    /**
      * An BindControl that standardizes an HTML5 button.
      */
    class Button extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any;
        /**
          * Replaces the <plat-button> node with
          * a <button> node.
          */
        replaceWith: string;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<IButtonOptions>;
        /**
          * Reference to the Document injectable.
          */
        protected _document: Document;
        /**
          * The button group's name if a button group is present.
          */
        protected _group: string;
        /**
          * A boolean value showing the selected state of this Button.
          */
        protected _isSelected: boolean;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Sets default classes.
          */
        initialize(): void;
        /**
          * Wrap all inner text nodes in spans.
          */
        setTemplate(): void;
        /**
          * Determine the button style and apply the proper classes.
          */
        loaded(): void;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable property is set externally.
          * @param {string} newValue The new value of the bindable property.
          * @param {string} oldValue The old value of the bindable property.
          * @param {string} identifier The identifier of the property being observed.
          * @param {boolean} firstTime? A boolean value indicating whether this is the first time its being set.
          */
        protected _setBoundProperty(newValue: string, oldValue: string, identifier: string, firstTime?: boolean): void;
        /**
          * Add event listeners for selection.
          */
        protected _addEventListeners(): void;
        /**
          * Place the pushed button in a selected state.
          */
        protected _onTap(): void;
    }
    /**
      * The available options for the Button control.
      */
    interface IButtonOptions {
        /**
          * The group name of this Button's associated button group.
          */
        group?: string;
    }
    /**
      * An BindControl that simulates a toggle switch.
      */
    class Toggle extends plat.ui.BindControl implements IUiControl {
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * A boolean value indicating whether the control is actively selected.
          */
        isActive: boolean;
        /**
          * The type of the control's activated element.
          */
        protected _targetType: string;
        /**
          * The element used to create the targeted effect.
          */
        protected _targetElement: Element;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the class name.
          */
        initialize(): void;
        /**
          * Adds a listener for the tap event.
          */
        loaded(): void;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable property is set externally.
          * @param {any} newValue The new value of the bindable property.
          * @param {any} oldValue The old value of the bindable property.
          * @param {string} identifier The identifier of the property being observed.
          * @param {boolean} setProperty? A boolean value indicating whether we should set
          * the property if we need to toggle the state.
          */
        protected _setBoundProperty(newValue: any, oldValue: any, identifier: string, setProperty?: boolean): void;
        /**
          * The callback for a tap event.
          * @param {plat.ui.IGestureEvent} ev The tap event object.
          */
        protected _onTap(ev: plat.ui.IGestureEvent): void;
        /**
          * Triggers an event starting from this control's element.
          * @param {string} event The event name to trigger.
          */
        protected _trigger(event: string): void;
        /**
          * Toggles the mark and updates the bindable property if needed.
          * @param {boolean} setProperty? A boolean value stating whether the bindable
          * property should be updated.
          */
        protected _toggle(setProperty?: boolean): void;
        /**
          * A function to activate the given element by toggling the
          * class specified as the target type.
          * @param {Element} element The element to activate.
          */
        protected _activate(element: Element): void;
    }
    /**
      * An IBindablePropertyControl that standardizes the HTML5 checkbox.
      */
    class Checkbox extends Toggle {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<ICheckboxOptions>;
        /**
          * Reference to the Document injectable.
          */
        protected _document: Document;
        /**
          * Whether the target type has been set already or not.
          */
        protected _targetTypeSet: boolean;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Adds the inner template to the DOM making sure to wrap text nodes in spans.
          */
        setTemplate(): void;
        /**
          * Checks for checked attributes and handles them accordingly. Also,
          * initializes the mark and adds a listener for the tap event.
          */
        loaded(): void;
        /**
          * A function for checking "checked" attributes and handling them accordingly.
          * @param {any} newValue The newValue of the attribute to convert.
          * @param {any} oldValue? The oldValue of the attribute to convert.
          */
        protected _convertChecked(): void;
        /**
          * A function for handling the attribute value conversion for updating the
          * bound property.
          * @param {any} newValue The newValue of the attribute to convert.
          * @param {any} oldValue? The oldValue of the attribute to convert.
          */
        protected _convertAttribute(newValue: any, oldValue?: any): void;
        /**
          * A function to activate the given element by toggling the
          * class specified as the target type.
          * @param {Element} element The element to activate.
          */
        protected _activate(element: Element): void;
    }
    /**
      * The available options for the Checkbox control.
      */
    interface ICheckboxOptions {
        /**
          * The type of mark to place inside the Checkbox.
          * The default value is "check".
          */
        mark?: string;
    }
    /**
      * An IBindablePropertyControl that standardizes the HTML5 radio button.
      */
    class Radio extends Checkbox {
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * The radio groups name if a radio group is present.
          */
        groupName: string;
        /**
          * The check type to be placed in the element.
          */
        protected _targetType: string;
        /**
          * Whether the target type has been set already or not.
          */
        protected _targetTypeSet: boolean;
        /**
          * A function to stop listening for dispatched group events.
          */
        protected _removeListener: plat.IRemoveListener;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Checks for a radio group and converts "checked" attributes.
          */
        loaded(): void;
        /**
          * Checks if the radio has been selected and only notifies of a bindable
          * property changed if it has.
          * @param {any} newValue? The new value of the property after the change.
          * @param {any} oldValue? The old value of the property prior to the change.
          */
        inputChanged(newValue?: any, oldValue?: any): void;
        /**
          * The function called when the bindable property is set externally.
          * @param {any} newValue The new value of the bindable property.
          * @param {any} oldValue The old value of the bindable property.
          * @param {string} identifier The identifier of the property being observed.
          * @param {boolean} setProperty? A boolean value indicating whether we should set
          * the property if we need to toggle the mark.
          */
        protected _setBoundProperty(newValue: any, oldValue: any, identifier: string, setProperty?: boolean): void;
        /**
          * The callback for a tap event. Only fires the event if the Radio
          * has been selected.
          * @param {plat.ui.IGestureEvent} ev The tap event object.
          */
        protected _onTap(ev: plat.ui.IGestureEvent): void;
        /**
          * Toggles the mark and updates the bindable property if needed.
          * @param {boolean} setProperty? A boolean value stating whether the bindable
          * property should be updated.
          */
        protected _toggle(setProperty?: boolean): void;
        /**
          * A function for handling the attribute value conversion for updating the
          * bound property.
          * @param {any} newValue The newValue of the attribute to convert.
          * @param {any} oldValue? The oldValue of the attribute to convert.
          */
        protected _convertAttribute(newValue: any, oldValue?: any): void;
        /**
          * Grabs the value of this Radio's bindable property. It first checks for
          * the "value" attribute, and defaults to the elements textContent if it's unavailable.
          */
        protected _getValue(): string;
    }
    /**
      * An ITemplateControl for showing indeterminate progress.
      */
    class ProgressRing extends plat.ui.TemplateControl implements IUiControl {
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the animation.
          */
        initialize(): void;
    }
    /**
      * An ITemplateControl for showing incremental progress.
      */
    class ProgressBar extends plat.ui.TemplateControl implements IUiControl {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * Reference to the Window injectable.
          */
        protected _window: Window;
        /**
          * The animated bar element.
          */
        protected _barElement: HTMLElement;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the class name.
          */
        initialize(): void;
        /**
          * Grabs the bar element then sets any initial progress.
          */
        loaded(): void;
        /**
          * Animates the bar on a context changed.
          */
        contextChanged(): void;
        /**
          * Sets the progress bar value.
          * @param {number} value The decimal number between 0 and 1 to set as the
          * bar percentage (e.g. - 0.5 would be 50% complete).
          */
        setProgress(value: number): void;
    }
    /**
      * An BindControl that acts as a global drawer.
      */
    class Drawer extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<IDrawerOptions>;
        /**
          * An object to hold the stored style and element properties so that we can reference and reset them
          * when all Drawer Controllers are disposed.
          */
        storedProperties: {
            position?: string;
            zIndex?: string;
            rootElement?: HTMLElement;
            parentOverflow?: {
                key: string;
                value: string;
            };
        };
        /**
          * Reference to the IPromise injectable.
          */
        protected _Promise: plat.async.IPromise;
        /**
          * The current position of the Drawer.
          */
        protected _currentPosition: string;
        /**
          * References to all the DrawerControllers used to control this Drawer.
          */
        protected _controllers: Array<DrawerController>;
        /**
          * Whether or not the this control has been paired with a corresponding Drawer.
          */
        protected _isInitialized: boolean;
        /**
          * A bound value that may have come through prior to initialization.
          */
        protected _preInitializedValue: boolean;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the class name and hides the element and
          * removes the innerHTML from the DOM and saves it.
          */
        initialize(): void;
        /**
          * Removes the innerHTML from the DOM and saves it.
          */
        setTemplate(): void;
        /**
          * Check for a position and initialize event handling.
          */
        loaded(): void;
        /**
          * Opens the Drawer.
          */
        open(): plat.async.IThenable<void>;
        /**
          * Closes the Drawer.
          */
        close(): plat.async.IThenable<void>;
        /**
          * Toggles the Drawer's open/closed state.
          */
        toggle(): plat.async.IThenable<void>;
        /**
          * Resets the Drawer to it's current open/closed state.
          */
        reset(): plat.async.IThenable<void>;
        /**
          * Indicates whether the Drawer is currently open.
          */
        isOpen(): boolean;
        /**
          * Adds and binds the added HTML template to this control's inherited context.
          * @param {string} name The template name to both add and bind.
          * @param {Node} node The node to add as a bindable template.
          */
        bindTemplate(name: string, node: Node): plat.async.IThenable<void>;
        /**
          * Returns the number of DrawerControllers linked to this
          * Drawer.
          */
        controllerCount(): number;
        /**
          * Removes a specified DrawerController from this control's Array of
          * linked DrawerControllers.
          * @param {platui.DrawerController} controller The DrawerController
          * to splice.
          */
        spliceController(controller: DrawerController): void;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable property is set externally.
          * @param {boolean} drawerState The new value of the control state.
          * @param {boolean} oldValue The old value of the bindable control state.
          * @param {void} identifier The child identifier of the property being observed.
          * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
          */
        protected _setBoundProperty(drawerState: boolean, oldValue: boolean, identifier: void, firstTime?: boolean): void;
        /**
          * Changes the placement and implied position of the Drawer.
          * @param {string} position The new position to change to.
          */
        protected _changeDirection(position: string): void;
        /**
          * Initializes and dispatches pub sub events.
          * @param {string} id The ID of this Drawer if used.
          * @param {string} position The position.
          * @param {boolean} isElastic Whether or not the Drawer has an
          * elastic transition effect.
          */
        protected _initializeEvents(id: string, position: string, isElastic: boolean): void;
        /**
          * Checks the pre-initialized value and handles accordingly.
          */
        protected _checkPreInit(): void;
    }
    /**
      * The available options for the Drawer control.
      */
    interface IDrawerOptions {
        /**
          * The unique ID of the Drawer / DrawerController pair.
          * Useful when multiple Drawers exist in an app.
          */
        id?: string;
        /**
          * The position of the Drawer.
          * The default value is "left".
          */
        position?: string;
        /**
          * The URL of the Drawer's intended template.
          */
        templateUrl?: string;
        /**
          * Whether the Drawer has an elastic effect while tracking open.
          * Defaults to false.
          */
        elastic?: boolean;
    }
    /**
      * An interface for an event object used during a control-to-control handshake.
      */
    interface IHandshakeEvent {
        /**
          * A boolean value specifying whether the handshake is being reciprocated.
          */
        received: boolean;
        /**
          * A reference to the corresponding control performing this leg of the handshake.
          */
        control: plat.Control;
    }
    /**
      * An interface for the Drawer's event object used during the
      * Drawer / DrawerController handshake.
      */
    interface IDrawerHandshakeEvent extends IHandshakeEvent {
        /**
          * The position of the Drawer.
          */
        position: string;
        /**
          * The intended template of the global Drawer element.
          */
        template: Node;
        /**
          * Whether the Drawer has an elastic effect while sliding.
          * Defaults to false.
          */
        elastic: boolean;
    }
    /**
      * An BindControl that manipulates and controls a global drawer.
      */
    class DrawerController extends plat.ui.BindControl {
        protected static _inject: any;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<IDrawerControllerOptions>;
        /**
          * Reference to the Compat injectable.
          */
        protected _compat: plat.Compat;
        /**
          * Reference to the Window injectable.
          */
        protected _window: Window;
        /**
          * Reference to the Document injectable.
          */
        protected _document: Document;
        /**
          * Reference to the Animator injectable.
          */
        protected _animator: plat.ui.animations.Animator;
        /**
          * Reference to the IPromise injectable.
          */
        protected _Promise: plat.async.IPromise;
        /**
          * The position of the global Drawer associated
          * with this control.
          */
        protected _position: string;
        /**
          * The HTMLElement of the global Drawer associated
          * with this control.
          */
        protected _drawerElement: HTMLElement;
        /**
          * The global Drawer associated
          * with this control.
          */
        protected _drawer: Drawer;
        /**
          * The current browser's CSS3 transform property.
          */
        protected _transform: string;
        /**
          * The value of the inline transform property prior to the Drawer manipulating it.
          */
        protected _preTransform: string;
        /**
          * The last touch start recorded.
          */
        protected _lastTouch: plat.ui.IPoint;
        /**
          * Whether or not the user has swiped.
          */
        protected _hasSwiped: boolean;
        /**
          * Whether or not the user has tapped.
          */
        protected _hasTapped: boolean;
        /**
          * Whether or not the Drawer is open.
          */
        protected _isOpen: boolean;
        /**
          * Whether or not the Drawer is elastic.
          */
        protected _isElastic: boolean;
        /**
          * An enum denoting the current touch state of the user.
          */
        protected _touchState: number;
        /**
          * Whether the corresponding Drawer is vertical or horizontal.
          */
        protected _isVertical: boolean;
        /**
          * Whether or not to use this control's inherited context.
          */
        protected _useContext: boolean;
        /**
          * A function for removing the tap event listener.
          */
        protected _removeTap: plat.IRemoveListener;
        /**
          * A function for removing the swipe open event listener.
          */
        protected _removeSwipeToggle: plat.IRemoveListener;
        /**
          * A function for removing the primary tracking event listeners.
          */
        protected _removeTrack: plat.IRemoveListener;
        /**
          * A function for removing the tap event listener on the open Drawer.
          */
        protected _openTapRemover: plat.IRemoveListener;
        /**
          * A function for removing the swipe event listeners on the open Drawer.
          */
        protected _openSwipeRemover: plat.IRemoveListener;
        /**
          * A function for removing the swipe event listeners on the open Drawer.
          */
        protected _openTrackRemover: plat.IRemoveListener;
        /**
          * The root element to translate.
          */
        protected _rootElement: HTMLElement;
        /**
          * An HTMLElement to eat clicks when the Drawer is open.
          */
        protected _clickEater: HTMLElement;
        /**
          * A function for removing the click eater scroll listening event.
          */
        protected _removeClickEaterListener: plat.IRemoveListener;
        /**
          * The type of Drawer
          * (i.e. the method by which the Drawer opens and closes).
          */
        protected _type: string;
        /**
          * A URL that points to the HTML template.
          */
        protected _templateUrl: string;
        /**
          * A class name that is used to set styling based on the transition direction.
          */
        protected _directionalTransitionPrep: string;
        /**
          * A value specifying whether the Drawer is waiting for a tap
          * for opening and closing.
          */
        protected _isTap: boolean;
        /**
          * A value specifying whether the Drawer is waiting for a swipe
          * for opening and closing.
          */
        protected _isSwipe: boolean;
        /**
          * A value specifying whether the Drawer is being tracked
          * for opening and closing.
          */
        protected _isTrack: boolean;
        /**
          * A function to remove the toggle delay if present.
          */
        protected _toggleDelay: plat.IRemoveListener;
        /**
          * The most recent animation thenable. Used to cancel the current animation if another needs
          * to begin.
          */
        protected _animationThenable: plat.ui.animations.IAnimationThenable<void>;
        /**
          * Whether or not the this control has been paired with a corresponding Drawer.
          */
        protected _isInitialized: boolean;
        /**
          * A bound value that may have come through prior to initialization.
          */
        protected _preInitializedValue: boolean;
        /**
          * Sets the class name on the element.
          */
        initialize(): void;
        /**
          * Initialize the track events on the element.
          */
        loaded(): void;
        /**
          * Remove the transition classes off the root element and reset the position and
          * zIndex properties if modified and only if this is the last DrawerController
          * referencing this Drawer.
          */
        dispose(): void;
        /**
          * Opens the Drawer.
          */
        open(): plat.async.IThenable<void>;
        /**
          * Closes the Drawer.
          */
        close(): plat.async.IThenable<void>;
        /**
          * Toggles the Drawer's open/closed state.
          */
        toggle(): plat.async.IThenable<void>;
        /**
          * Resets the Drawer to it's current open/closed state.
          */
        reset(): plat.async.IThenable<void>;
        /**
          * Indicates whether the Drawer is currently open.
          */
        isOpen(): boolean;
        /**
          * Binds the added HTML template to this control's inherited context and
          * places the node into the Drawer.
          * @param {string} name The template name to bind.
          * @param {Node} node The node to add as a bindable template.
          */
        bindTemplate(name: string, node: Node): plat.async.IThenable<void>;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable property is set externally.
          * @param {boolean} drawerState The new value of the control's state.
          * @param {boolean} oldValue The old value of the bindable control state.
          * @param {void} identifier The child identifier of the property being observed.
          * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
          */
        protected _setBoundProperty(drawerState: boolean, oldValue: boolean, identifier: void, firstTime?: boolean): void;
        /**
          * Opens the Drawer.
          */
        protected _open(): plat.async.IThenable<void>;
        /**
          * Closes the Drawer.
          */
        protected _close(): plat.async.IThenable<void>;
        /**
          * Adds a click eater when tracking and closing an open Drawer.
          */
        protected _addClickEater(): void;
        /**
          * Removes the click eater after closing an open Drawer.
          */
        protected _removeClickEater(): void;
        /**
          * Adds swipe events to the controller element.
          */
        protected _addSwipeToggle(): void;
        /**
          * Adds swipe close event to the root element.
          */
        protected _addSwipeClose(): void;
        /**
          * Adds tap toggle event to the controller element.
          */
        protected _addTapToggle(): void;
        /**
          * Adds tap close event to the root element.
          */
        protected _addTapClose(): void;
        /**
          * Adds primary and secondary tracking events to the DrawerController element.
          */
        protected _addEventListeners(): void;
        /**
          * Removes all event listeners.
          */
        protected _removeEventListeners(): void;
        /**
          * Log when the user touches the DrawerController.
          * @param {plat.ui.IGestureEvent} ev The touch event.
          */
        protected _touchStart(ev: plat.ui.IGestureEvent): void;
        /**
          * The $touchend and $trackend event handler.
          * @param {plat.ui.IGestureEvent} ev The touch event.
          */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void;
        /**
          * The $track event handler. Used for tracking only horizontal or vertical tracking motions
          * depending on the defined position.
          * @param {plat.ui.IGestureEvent} ev The $tracking event.
          */
        protected _track(ev: plat.ui.IGestureEvent): void;
        protected _preventDefault(ev: Event): void;
        /**
          * Checks to make sure the user has been tracking in the right direction to
          * toggle.
          * @param {number} distanceMoved The distance the user's pointer has moved.
          */
        protected _isRightDirection(distanceMoved: number): boolean;
        /**
          * Calculates the translation value for setting the transform value.
          * @param {plat.ui.IGestureEvent} ev The $tracking event.
          */
        protected _calculateTranslation(ev: plat.ui.IGestureEvent): string;
        /**
          * Checks for elasticity and potentially readjusts the user's
          * distance moved.
          * @param {number} maxOffset The maximum distance the corresponding Drawer can translate.
          * @param {number} delta The distance the user's finger moved.
          */
        protected _checkElasticity(maxOffset: number, delta: number): number;
        /**
          * Initializes and dispatches pub sub events.
          * @param {string} id The ID of this DrawerController if used.
          * @param {string} position The position of the Drawer.
          */
        protected _initializeEvents(id: string, position: string): void;
        /**
          * Checks the pre-initialized value and handles accordingly.
          */
        protected _checkPreInit(): void;
        /**
          * Determines the proper HTML template, binds it, and inserts it if needed.
          * @param {Node} fragment? A Node to insert as the Drawer's HTML template
          * if no templateUrl is present on this DrawerController.
          */
        protected _determineTemplate(fragment?: Node): plat.async.IThenable<void>;
        /**
          * Obtains the current browser's transform property value.
          */
        protected _setTransform(): void;
        /**
          * Checks if this control has all valid properties.
          * @param {string} position The position of the Drawer.
          */
        protected _controllerIsValid(position: string): boolean;
        /**
          * Obtains the root element to translate.
          */
        protected _getRootElement(): HTMLElement;
        /**
          * Sets the max offset to translate the corresponding Drawer.
          */
        protected _getOffset(): number;
    }
    /**
      * The available options for the DrawerController control.
      */
    interface IDrawerControllerOptions extends IDrawerOptions {
        /**
          * A boolean value stating whether to use the DrawerController's context instead of the default
          * Drawer's context.
          */
        useContext?: boolean;
        /**
          * Specifies how the Drawer should open. Multiple types can be combined by making it space delimited.
          * The default behavior is "tap track".
          */
        type?: string;
    }
    /**
      * An interface for the DrawerController's event object used during the
      * Drawer / DrawerController handshake.
      */
    interface IDrawerControllerHandshakeEvent extends IHandshakeEvent {
        /**
          * The position of the Drawer.
          */
        position: string;
        /**
          * A boolean value stating whether to use the DrawerController's context or not.
          */
        useContext: boolean;
    }
    /**
      * An BindControl for showing a templated and animated overlay.
      */
    class Modal extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<IModalOptions>;
        /**
          * A Promise that fulfills when the modal is loaded and rejects if the Modal
          * gets disposed before it loads content.
          */
        modalLoaded: plat.async.IThenable<void>;
        /**
          * Reference to the Window injectable.
          */
        protected _window: Window;
        /**
          * Reference to the Document injectable.
          */
        protected _document: Document;
        /**
          * Reference to the Compat injectable.
          */
        protected _compat: plat.Compat;
        /**
          * Reference to the IPromise injectable.
          */
        protected _Promise: plat.async.IPromise;
        /**
          * The HTML element representing the content of the modal.
          */
        protected _container: HTMLElement;
        /**
          * Whether or not the modal is currently visible.
          */
        protected _isVisible: boolean;
        /**
          * The browser's "transitionend" event.
          */
        protected _transitionEnd: string;
        /**
          * A function to stop listening to scroll events.
          */
        protected _scrollRemover: plat.IRemoveListener;
        /**
          * The current scroll position of the modal.
          */
        protected _scrollTop: number;
        /**
          * A hash for validating available transitions.
          */
        protected _transitionHash: plat.IObject<boolean>;
        /**
          * The resolve function for the modalLoaded Promise.
          */
        private __resolveFn;
        /**
          * The reject function for the modalLoaded Promise.
          */
        private __rejectFn;
        /**
          * The constructor for a Listview. Creates the modalLoaded Promise.
          */
        constructor();
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Check for templateUrl and set if needed then hide the control.
          */
        initialize(): void;
        /**
          * Add the innerTemplate to the control's element.
          */
        setTemplate(): void;
        /**
          * Check for a transition and initialize it if necessary.
          */
        loaded(): void;
        /**
          * Clean up the auto scroll.
          */
        dispose(): void;
        /**
          * Shows the Modal.
          */
        show(): plat.async.IThenable<void>;
        /**
          * Hides the Modal.
          */
        hide(): plat.async.IThenable<void>;
        /**
          * Toggles the visibility of the Modal.
          */
        toggle(): plat.async.IThenable<void>;
        /**
          * Whether or not the Modal is currently visible.
          */
        isVisible(): boolean;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable property is set externally.
          * @param {boolean} modalState The new value of the control state.
          * @param {boolean} oldValue The old value of the control state.
          * @param {void} identifier The child identifier of the property being observed.
          * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
          */
        protected _setBoundProperty(modalState: boolean, oldValue: boolean, identifier: void, firstTime?: boolean): void;
        /**
          * Shows the Modal.
          */
        protected _show(): plat.async.IThenable<void>;
        /**
          * Aligns the control to the top of the viewport.
          * @param {Event} ev? The scroll event object.
          */
        protected _alignModal(ev?: Event): void;
        /**
          * Hides the Modal.
          */
        protected _hide(): plat.async.IThenable<void>;
        /**
          * Adds the innerTemplate to BindableTemplates, binds it,
          * and adds it to the DOM.
          */
        protected _bindInnerTemplate(): plat.async.IThenable<void>;
        /**
          * Removes itself from the DOM and inserts itself into the body to work with
          * absolute positioning.
          */
        protected _injectElement(): void;
        /**
          * Listens for the transition to end and hides the element after it is finished.
          */
        protected _addHideOnTransitionEnd(): plat.async.IThenable<void>;
    }
    /**
      * The available options for the Modal control.
      */
    interface IModalOptions {
        /**
          * The transition type/direction the Modal will enter with.
          * The default value is "none".
          */
        transition?: string;
        /**
          * The url of the Modal's intended template if not using
          * innerHTML.
          */
        templateUrl?: string;
    }
    /**
      * An BindControl that standardizes an HTML5 input[type="range"].
      */
    class Slider extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<ISliderOptions>;
        /**
          * The current value of the Slider.
          */
        value: number;
        /**
          * The min value of the Slider.
          */
        min: number;
        /**
          * The max value of the Slider.
          */
        max: number;
        /**
          * Reference to the Window injectable.
          */
        protected _window: Window;
        /**
          * Reference to the Document injectable.
          */
        protected _document: Document;
        /**
          * Reference to the Animator injectable.
          */
        protected _animator: plat.ui.animations.Animator;
        /**
          * The HTMLElement representing the slider.
          */
        protected _slider: HTMLElement;
        /**
          * The HTMLElement representing the knob.
          */
        protected _knob: HTMLElement;
        /**
          * The last touch start recorded.
          */
        protected _lastTouch: IValuePoint;
        /**
          * The maximum slider offset.
          */
        protected _maxOffset: number;
        /**
          * The slider's offset left.
          */
        protected _sliderOffset: number;
        /**
          * The slider's pixel based increment value.
          */
        protected _increment: number;
        /**
          * Denotes the incremental step value of the Slider's value property.
          */
        protected _step: number;
        /**
          * Whether the control is vertical or horizontal.
          */
        protected _isVertical: boolean;
        /**
          * Whether the min and max positions have been reversed.
          */
        protected _reversed: boolean;
        /**
          * The current knob offset.
          */
        protected _knobOffset: number;
        /**
          * An enum denoting the current touch state of the user.
          */
        protected _touchState: number;
        /**
          * Denotes whether we're using height or width as the length of the slider.
          */
        protected _lengthProperty: string;
        /**
          * The current number of times we checked to see if the element was placed into the DOM.
          * Used for determining max offset width.
          */
        protected _cloneAttempts: number;
        /**
          * The max number of times we'll check to see if the element was placed into the DOM.
          * Used for determining max offset width.
          */
        protected _maxCloneAttempts: number;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the proper classes for the control.
          */
        initialize(): void;
        /**
          * Determine the button type and apply the proper classes.
          */
        loaded(): void;
        /**
          * Set the value of the Slider. If an invalid value is passed in
          * nothing will happen.
          * @param {number} value The value to set the Slider to.
          */
        setValue(value: number): void;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable value is set externally.
          * @param {number} newValue The new value of the bindable value.
          * @param {number} oldValue The old value of the bindable index.
          * @param {void} identifier The child identifier of the property being observed.
          * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
          */
        protected _setBoundProperty(newValue: number, oldValue: number, identifier: void, firstTime?: boolean): void;
        /**
          * Sets the value of the Slider.
          * @param {number} value The value to set.
          * @param {boolean} propertyChanged Whether or not we need to fire a propertyChanged event.
          */
        protected _setValue(value: number, propertyChanged: boolean): void;
        /**
          * Initialize the proper tracking events.
          */
        protected _initializeEvents(): void;
        /**
          * Log the first touch.
          * @param {plat.ui.IGestureEvent} ev The touch event object.
          */
        protected _touchStart(ev: plat.ui.IGestureEvent): void;
        /**
          * Set the new slider offset.
          * @param {plat.ui.IGestureEvent} ev The $trackend event object.
          */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void;
        /**
          * Track the knob movement.
          * @param {plat.ui.IGestureEvent} ev The $track event object.
          */
        protected _track(ev: plat.ui.IGestureEvent): void;
        /**
          * Set the Slider's knob position and corresponding value.
          * @param {number} position The position value to set the knob to prior to
          * normalization.
          */
        protected _setSliderProperties(position: number): number;
        /**
          * Calculates the current value based on knob position and slider width.
          * @param {number} width The current width of the slider.
          */
        protected _calculateValue(width: number): number;
        /**
          * Calculates knob position based on current value.
          * @param {number} value The current value of the {link platui.Slider|Slider}.
          */
        protected _calculateKnobPosition(value: number): number;
        /**
          * Calculates the new offset of the slider based on the old offset and the distance moved.
          * @param {plat.ui.IGestureEvent} ev The $track or $trackend event object.
          */
        protected _calculateOffset(ev: plat.ui.IGestureEvent): number;
        /**
          * Sets the property to use for length and sets the max length of the slider.
          * @param {HTMLElement} element? The element to use to obtain the max length.
          */
        protected _setLength(element?: HTMLElement): void;
        /**
          * Sets the increment for sliding the {link platui.Slider|Slider}.
          */
        protected _setIncrement(): number;
        /**
          * Sets the value of the Slider.
          * @param {number} newValue The new value to set.
          * @param {boolean} setKnob Whether or not we need to set the knob position.
          * @param {boolean} propertyChanged Whether or not we need to fire a propertyChanged event.
          */
        protected _setValueProperty(newValue: number, setKnob: boolean, propertyChanged: boolean): void;
        /**
          * Animates and sets the knob position.
          * @param {number} value? The value to use to calculate the knob position. If no value is
          * specified, the current Slider's value will be used.
          */
        protected _setKnob(value?: number): void;
        /**
          * Triggers an event starting from this control's element.
          * @param {string} event The event name to trigger.
          */
        protected _trigger(event: string): void;
        /**
          * Checks the orientation of the control and ensures it is valid.
          * Will default to "horizontal" if invalid.
          * @param {string} orientation The element to base the length off of.
          */
        protected _validateOrientation(orientation: string): string;
        /**
          * Creates a clone of this element and uses it to find the max offset.
          * @param {string} dependencyProperty The property that the offset is being based off of.
          */
        protected _setOffsetWithClone(dependencyProperty: string): void;
    }
    /**
      * The available options for the Slider control.
      */
    interface ISliderOptions {
        /**
          * The orientation of the Slider.
          * Defaults to "horizontal".
          */
        orientation?: string;
        /**
          * Whether or not the min and max positions are reversed.
          * Defaults to false.
          */
        reverse?: boolean;
        /**
          * The current value of the Slider.
          */
        value?: number;
        /**
          * The minimum value of the Slider.
          */
        min?: number;
        /**
          * The maximum value of the Slider.
          */
        max?: number;
        /**
          * The incremental step value of the Slider.
          */
        step?: number;
    }
    /**
      * A BindControl that allows for a lower and upper value,
      * thus creating a variable range of included values.
      */
    class Range extends plat.ui.BindControl implements IUiControl {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<IRangeOptions>;
        /**
          * The current lower value of the Range.
          */
        lower: number;
        /**
          * The current upper value of the Range.
          */
        upper: number;
        /**
          * The min value of the Range.
          */
        min: number;
        /**
          * The max value of the Range.
          */
        max: number;
        /**
          * Reference to the Window injectable.
          */
        protected _window: Window;
        /**
          * Reference to the Document injectable.
          */
        protected _document: Document;
        /**
          * Reference to the Animator injectable.
          */
        protected _animator: plat.ui.animations.Animator;
        /**
          * The HTMLElement representing the slider element.
          */
        protected _slider: HTMLElement;
        /**
          * The HTMLElement representing the lower knob.
          */
        protected _lowerKnob: HTMLElement;
        /**
          * The HTMLElement representing the second knob of the Range.
          */
        protected _upperKnob: HTMLElement;
        /**
          * The last touch start recorded.
          */
        protected _lastTouch: IKnobPosition;
        /**
          * The maximum slider element offset.
          */
        protected _maxOffset: number;
        /**
          * The slider element's pixel based increment value.
          */
        protected _increment: number;
        /**
          * Denotes the incremental step value of the Range's value property.
          */
        protected _step: number;
        /**
          * Whether the control is vertical or horizontal.
          */
        protected _isVertical: boolean;
        /**
          * Whether the upper and lower knobs have been _reversed.
          */
        protected _reversed: boolean;
        /**
          * The current lower knob offset.
          */
        protected _lowerKnobOffset: number;
        /**
          * The current upper knob offset.
          */
        protected _upperKnobOffset: number;
        /**
          * The lower identifier for setting the value of the bound object.
          */
        protected _lowerIdentifier: string;
        /**
          * The upper identifier for setting the value of the bound object.
          */
        protected _upperIdentifier: string;
        /**
          * Denotes whether we're using height or width as the length of the sliding element.
          */
        protected _lengthProperty: string;
        /**
          * Denotes whether we're using left, right, top, or bottom as the position of the sliding element.
          */
        protected _positionProperty: string;
        /**
          * An enum denoting the current touch state of the user.
          */
        protected _touchState: number;
        /**
          * The current number of times we checked to see if the element was placed into the DOM.
          * Used for determining max offset width.
          */
        protected _cloneAttempts: number;
        /**
          * The max number of times we'll check to see if the element was placed into the DOM.
          * Used for determining max offset width.
          */
        protected _maxCloneAttempts: number;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the proper classes for the control.
          */
        initialize(): void;
        /**
          * Determine the button type and apply the proper classes.
          */
        loaded(): void;
        /**
          * Sets the lower value of the Range. If an invalid value is passed in
          * nothing will happen.
          * @param {number} value The value to set the Range to.
          */
        setLower(value: number): void;
        /**
          * Sets the upper value of the Range. If an invalid value is passed in
          * nothing will happen.
          * @param {number} value The value to set the Range to.
          */
        setUpper(value: number): void;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable lower value is set externally.
          * @param {number} newValue The new lower value.
          * @param {number} oldValue The old value of the bindable index.
          * @param {string} identifier The child identifier of the property being observed.
          * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
          */
        protected _setLowerBoundProperty(newValue: number, oldValue: number, identifier: string, firstTime?: boolean): void;
        /**
          * The function called when the bindable upper value is set externally.
          * @param {number} newValue The new upper value.
          * @param {number} oldValue The old value of the bindable index.
          * @param {string} identifier The child identifier of the property being observed.
          * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
          */
        protected _setUpperBoundProperty(newValue: number, oldValue: number, identifier: string, firstTime?: boolean): void;
        /**
          * Sets the lower value of the Range. If an invalid value is passed in
          * nothing will happen.
          * @param {number} value The value to set the Range to.
          * @param {boolean} propertyChanged Whether or not the property was changed by the user.
          */
        protected _setLower(value: number, propertyChanged: boolean): void;
        /**
          * Sets the uppper value of the Range. If an invalid value is passed in
          * nothing will happen.
          * @param {number} value The value to set the Range to.
          * @param {boolean} propertyChanged Whether or not the property was changed by the user.
          */
        protected _setUpper(value: number, propertyChanged: boolean): void;
        /**
          * Initialize the proper tracking events.
          */
        protected _initializeEvents(): void;
        /**
          * Log the first touch.
          * @param {plat.ui.IGestureEvent} ev The touch event object.
          */
        protected _touchStart(ev: plat.ui.IGestureEvent): void;
        /**
          * Set the new slider element offset.
          * @param {plat.ui.IGestureEvent} ev The $trackend event object.
          */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void;
        /**
          * Sets the designated knob element's offset to the given value.
          * @param {number} offset The new offset.
          * @param {boolean} isLower Whether we're setting the lower or upper knob.
          */
        protected _setOffset(offset: number, isLower: boolean): number;
        /**
          * Track the lower knob movement.
          * @param {plat.ui.IGestureEvent} ev The $track event object.
          */
        protected _trackLower(ev: plat.ui.IGestureEvent): void;
        /**
          * Track the upper knob movement.
          * @param {plat.ui.IGestureEvent} ev The $track event object.
          */
        protected _trackUpper(ev: plat.ui.IGestureEvent): void;
        /**
          * Positions the slider element and adjusts it's length to account
          * for lower knob movement.
          * @param {number} position The new position of the lower knob.
          * @param {number} value? The new value to set if specified.
          */
        protected _positionLower(position: number, value?: number): void;
        /**
          * Positions the slider element and adjusts it's length to account
          * for upper knob movement.
          * @param {number} position The new position of the upper knob.
          * @param {number} value? The new value to set if specified.
          */
        protected _positionUpper(position: number, value?: number): void;
        /**
          * Positions the slider element and adjusts it's length to account
          * for synchronized knob movement.
          * @param {number} position The new position of the knobs.
          * @param {number} value? The new value to set if specified.
          */
        protected _positionTogether(position: number, value?: number): void;
        /**
          * Calculates the current value based on knob position and slider element width.
          * @param {number} width The current width of the slider element.
          */
        protected _calculateValue(width: number): number;
        /**
          * Calculates the new offset of the slider element based on the old offset and the distance moved.
          * @param {plat.ui.IGestureEvent} ev The $track or $trackend event object.
          * @param {boolean} isLower Whether the current knob is the lower or the upper knob.
          */
        protected _calculateOffset(ev: plat.ui.IGestureEvent, isLower: boolean): number;
        /**
          * Calculates knob position based on current value.
          * @param {number} value The current value of the {link platui.Range|Range}.
          */
        protected _calculateKnobPosition(value: number): number;
        /**
          * Sets the lower value of the Range.
          * @param {number} newValue The new value to set.
          * @param {boolean} setKnob Whether or not we need to set the knob position.
          * @param {boolean} propertyChanged Whether or not the property was changed by the user.
          * @param {boolean} trigger Whether or not to trigger the 'input' event.
          */
        protected _setLowerValue(newValue: number, setKnob: boolean, propertyChanged: boolean, trigger: boolean): void;
        /**
          * Sets the value of the Range.
          * @param {number} newValue The new value to set.
          * @param {boolean} setKnob Whether or not we need to set the knob position.
          * @param {boolean} propertyChanged Whether or not the property was changed by the user.
          * @param {boolean} trigger Whether or not to trigger the 'input' event.
          */
        protected _setUpperValue(newValue: number, setKnob: boolean, propertyChanged: boolean, trigger: boolean): void;
        /**
          * Sets the increment for sliding the {link platui.Range|Range}.
          */
        protected _setIncrement(): number;
        /**
          * Sets the properties to use for length and position and sets the max length of the sliding element.
          * @param {HTMLElement} element? The element to base the length off of.
          */
        protected _setPositionAndLength(element?: HTMLElement): void;
        /**
          * Animates and sets the knob position.
          * @param {number} value? The value to use to calculate the knob position. If no value is
          * specified, the current Range's value will be used.
          */
        protected _setLowerKnobPosition(value?: number): void;
        /**
          * Animates and sets the knob position.
          * @param {number} value? The value to use to calculate the knob position. If no value is
          * specified, the current Range's value will be used.
          */
        protected _setUpperKnobPosition(value?: number): void;
        /**
          * Fires an inputChanged event with the new bound value.
          */
        protected _fireChange(): void;
        /**
          * Triggers an event starting from this control's element.
          * @param {string} event The event name to trigger.
          */
        protected _trigger(event: string): void;
        /**
          * Checks the orientation of the control and ensures it is valid.
          * Will default to "horizontal" if invalid.
          * @param {string} orientation The element to base the length off of.
          */
        protected _validateOrientation(orientation: string): string;
        /**
          * Creates a clone of this element and uses it to find the max offset.
          * @param {string} dependencyProperty The property that the offset is being based off of.
          */
        protected _setOffsetWithClone(dependencyProperty: string): void;
    }
    /**
      * The available options for the Range control.
      */
    interface IRangeOptions {
        /**
          * The orientation of the Range.
          * The default value is "horizontal".
          */
        orientation?: string;
        /**
          * Whether or not the upper and lower knobs of the Range are reversed.
          * Defaults to false.
          */
        reverse?: boolean;
        /**
          * The lower set value of the Range.
          */
        lower?: number;
        /**
          * The upper set value of the Range.
          */
        upper?: number;
        /**
          * The minimum value of the Range.
          */
        min?: number;
        /**
          * The maximum value of the Range.
          */
        max?: number;
        /**
          * The incremental step value of the Range.
          */
        step?: number;
        /**
          * The identifiers that will label the lower and upper values set
          * on the bound object (e.g. if bound to an object `foo: { low: number; high: number; }`
          * this identifiers object should be `{ lower: 'low', upper: 'high' }`).
          */
        identifiers?: IRangeIdentifiers<string>;
    }
    /**
      * A point representing a potential knob position.
      */
    interface IKnobPosition extends IValuePoint {
        /**
          * The target element located at the x-y coordinate.
          */
        target?: HTMLElement;
    }
    /**
      * Defines an object describing expected identifiers for a Range control.
      */
    interface IRangeIdentifiers<T> {
        /**
          * The lower set value of the Range control.
          */
        lower: T;
        /**
          * The upper set value of the Range control.
          */
        upper: T;
    }
    /**
      * Defines the expected bound object of the Range control
      * (e.g. using Bind.
      */
    interface IRangeBinding extends IRangeIdentifiers<number> {
    }
    /**
      * An ITemplateControl that allows for data-binding a select box and adds
      * custom styling to make it look consistent across all platforms.
      */
    class Select extends plat.ui.controls.Select implements IUiControl {
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the class name.
          */
        initialize(): void;
    }
    /**
      * The available options for the Select control.
      */
    interface ISelectOptions {
        /**
          * The property in your context array
          * of objects to use to group the objects
          * into optgroups.
          */
        group?: string;
        /**
          * The property in your context array of
          * objects with which to use to bind to the
          * option's value.
          */
        value?: string;
        /**
          * The property in your context array of
          * objects with which to use to bind to the
          * option's textContent.
          */
        textContent?: string;
    }
    /**
      * An BindControl that standardizes and styles
      * an HTML input element of various types.
      */
    class Input extends plat.ui.BindControl implements IUiControl, IFormControl {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<IInputOptions>;
        /**
          * The current value.
          */
        value: string;
        /**
          * Reference to the Compat injectable.
          */
        protected _compat: plat.Compat;
        /**
          * Reference to the Regex injectable.
          */
        protected _regex: plat.expressions.Regex;
        /**
          * The HTMLElement for the control's optional image.
          */
        protected _imageElement: HTMLElement;
        /**
          * The HTMLInputElement for control input.
          */
        protected _inputElement: HTMLInputElement;
        /**
          * The HTMLElement for the control's action.
          */
        protected _actionElement: HTMLElement;
        /**
          * The control's type (e.g. - "email").
          */
        protected _type: string;
        /**
          * A regular expression string to regulate what text is allowed to be entered on input.
          */
        protected _pattern: RegExp;
        /**
          * A regular expression string used to validate input upon calling the "validate" function.
          */
        protected _validation: RegExp;
        /**
          * The control's type character (e.g. - an "x" to delete
          * input text).
          */
        protected _typeChar: string;
        /**
          * A function to handle the type event.
          */
        protected _typeHandler: EventListener;
        /**
          * A function to check the current action state and handle accordingly.
          */
        protected _actionHandler: () => void;
        /**
          * Whether the user is currently touching the screen.
          */
        protected _inTouch: boolean;
        /**
          * Whether the user is currently in the process of performing the Input's action.
          */
        protected _inAction: boolean;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the class name.
          */
        initialize(): void;
        /**
          * Set all HTMLElement references and potential attribute controls.
          */
        setTemplate(): void;
        /**
          * Set the style and initialize the action.
          */
        loaded(): void;
        /**
          * A function to validate the user's input. For action="email" it returns
          * true if the email can be a valid email address. For all other
          * actions it returns true if the input is not empty.
          */
        validate(): boolean;
        /**
          * Clears the user's input.
          */
        clear(): void;
        /**
          * Focuses the input.
          */
        focus(): void;
        /**
          * Blurs the input.
          */
        blur(): void;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable text is set externally.
          * @param {string} newValue The new value of the bindable text.
          * @param {string} oldValue The old value of the bindable text.
          * @param {void} identifier The child identifier of the property being observed.
          * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
          */
        protected _setBoundProperty(newValue: string, oldValue: string, identifier: void, firstTime?: boolean): void;
        /**
          * Initializes the type.
          */
        protected _initializeType(): void;
        /**
          * Adds all event listeners to the input and action element.
          * @param {string} event The primary action element's event.
          */
        protected _addEventListeners(event: string): void;
        /**
          * Adds a text event listener to the input element.
          */
        protected _addTextEventListener(): void;
        /**
          * Clears the user's input and focuses the input element.
          */
        protected _erase(): void;
        /**
          * The action handler for the "password" type when showing the
          * password text.
          */
        protected _handlePasswordShow(): void;
        /**
          * The action handler for the "password" type when hiding the
          * password text.
          */
        protected _handlePasswordHide(): void;
        /**
          * The action handler for the "email" type.
          */
        protected _handleEmail(): void;
        /**
          * Checks the current state of the default action and handles accordingly.
          */
        protected _checkText(): void;
        /**
          * Checks the current state of the password action and handles accordingly.
          */
        protected _checkPassword(): void;
        /**
          * Checks the current state of the "email" action and handles accordingly.
          */
        protected _checkEmail(): void;
        /**
          * The event handler upon user text input.
          */
        protected _onInput(): void;
        /**
          * The event handler upon bound text being changed.
          * @param {string} newValue The new value of the bound text.
          */
        protected _onInputChanged(newValue: string): void;
        /**
          * Parses the input and strips it of characters that don't fit its pattern.
          * @param {string} value The current value to parse.
          */
        protected _stripInput(value: string): string;
    }
    /**
      * The available options for the Input control.
      */
    interface IInputOptions {
        /**
          * The type of the Input control.
          * The default value is "text".
          */
        type?: string;
        /**
          * A regular expression string to regulate what text is allowed to be entered during input.
          */
        pattern?: string;
        /**
          * A regular expression string used to validate input upon calling the "validate" function.
          */
        validation?: string;
    }
    /**
      * An BindControl that standardizes and styles
      * an HTML input[type="file"] element.
      */
    class File extends plat.ui.BindControl implements IUiControl, IFormControl {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * Reference to the Compat injectable.
          */
        protected _compat: plat.Compat;
        /**
          * The HTMLInputElement for hidden input functionality.
          */
        protected _hiddenInput: HTMLInputElement;
        /**
          * A secondary HTMLInputElement for visible control input.
          */
        protected _visibleInput: HTMLInputElement;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the class name.
          */
        initialize(): void;
        /**
          * Set all HTMLElement references and potential attribute controls.
          */
        setTemplate(): void;
        /**
          * Set the style and initialize the action.
          */
        loaded(): void;
        /**
          * A function to validate the user's input. Returns true if the input is not empty.
          */
        validate(): boolean;
        /**
          * Clears the user's input.
          */
        clear(): void;
        /**
          * Acts as a programmatic click for file selection.
          */
        click(): void;
        /**
          * Returns the current value of File control.
          */
        value(): any;
        /**
          * Disables the control.
          */
        disable(): void;
        /**
          * Enables the control.
          */
        enable(): void;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable text is set externally.
          * @param {any} newValue The new value of the bindable file(s).
          * @param {any} oldValue The old value of the bindable file(s).
          * @param {void} identifier The child identifier of the property being observed.
          * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
          */
        protected _setBoundProperty(newValue: any, oldValue: any, identifier: void, firstTime?: boolean): void;
        /**
          * An event listener to handle a "keydown" event on the visible input.
          * @param {KeyboardEvent} ev The "keydown" event.
          */
        protected _onKeyDown(ev: KeyboardEvent): boolean;
        /**
          * Kicks off the file selection process.
          */
        protected _selectFiles(): void;
        /**
          * An event indicating that files have been selected.
          */
        protected _filesSelected(): void;
    }
    /**
      * An extension of the ForEach that acts as a HTML template carousel
      * and can bind the selected index to a value.
      */
    class Carousel extends plat.ui.controls.ForEach implements plat.observable.ISupportTwoWayBinding, IUiControl {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<ICarouselOptions>;
        /**
          * The current index of the Carousel.
          */
        index: number;
        /**
          * Reference to the Compat injectable.
          */
        protected _compat: plat.Compat;
        /**
          * Reference to the Document injectable.
          */
        protected _document: Document;
        /**
          * Reference to the Window injectable.
          */
        protected _window: Window;
        /**
          * Reference to the ITemplateControlFactory injectable.
          */
        protected _TemplateControlFactory: plat.ui.ITemplateControlFactory;
        /**
          * The set of functions added externally that listens
          * for property changes.
          */
        protected _listeners: Array<plat.IPropertyChangedListener<any>>;
        /**
          * Whether the control is vertical or horizontal.
          */
        protected _isVertical: boolean;
        /**
          * The type of the control (i.e. how it is scrolled).
          */
        protected _type: string;
        /**
          * The current browser's CSS3 transform property.
          */
        protected _transform: string;
        /**
          * Whether or not the user has swiped.
          */
        protected _hasSwiped: boolean;
        /**
          * Whether or not the user is currently touching the screen.
          */
        protected _inTouch: boolean;
        /**
          * Whether or not the user is currently touching the screen and has moved.
          */
        protected _hasMoved: boolean;
        /**
          * The last touch start recorded.
          */
        protected _lastTouch: plat.ui.IPoint;
        /**
          * Whether or not the control has been loaded based on its context being an Array.
          */
        protected _loaded: boolean;
        /**
          * The current index seen in the Carousel.
          */
        protected _index: number;
        /**
          * The previous index of the Carousel in relation to the item nodes.
          */
        protected _previousIndex: number;
        /**
          * The next index of the Carousel in relation to the item nodes.
          */
        protected _nextIndex: number;
        /**
          * The current offset of the translated Carousel's sliding element.
          */
        protected _currentOffset: number;
        /**
          * Denotes the viewing window of the control.
          */
        protected _viewport: HTMLElement;
        /**
          * Denotes the sliding element and item container contained within the control.
          */
        protected _container: HTMLElement;
        /**
          * The most recent animation thenable. Used to cancel the current animation if another needs
          * to begin.
          */
        protected _animationThenable: plat.ui.animations.IAnimationThenable<void>;
        /**
          * A function to call once items are loaded and the Carousel is set.
          */
        protected _onLoad: () => void;
        /**
          * The auto scroll interval.
          */
        protected _interval: number;
        /**
          * The function used to clear the auto scroll interval.
          */
        protected _removeInterval: plat.IRemoveListener;
        /**
          * The auto scroll interval suspension time if user interaction occurs.
          */
        protected _suspend: number;
        /**
          * The function used to clear the suspended auto scroll interval.
          */
        protected _removeSuspend: plat.IRemoveListener;
        /**
          * Whether or not infinite scrolling is enabled.
          */
        protected _isInfinite: boolean;
        /**
          * Whether or not automatic scrolling is enabled.
          */
        protected _isAuto: boolean;
        /**
          * Whether or not automatic scrolling is currently paused.
          */
        protected _isPaused: boolean;
        /**
          * Whether or not the control is responsible for pausing itself.
          */
        protected _selfPause: boolean;
        /**
          * An Array of all the current nodes in the control.
          */
        protected _itemNodes: Array<Node>;
        /**
          * The index `-1` node used for infinite scrolling.
          */
        protected _preClonedNode: HTMLElement;
        /**
          * The index `length` node used for infinite scrolling.
          */
        protected _postClonedNode: HTMLElement;
        /**
          * A reference to the forward arrow element.
          */
        protected _forwardArrow: HTMLElement;
        /**
          * A reference to the back arrow element.
          */
        protected _backArrow: HTMLElement;
        /**
          * A collection of remove listeners to stop listening for events.
          */
        protected _removeListeners: Array<plat.IRemoveListener>;
        /**
          * Whether or not the start outer item node has been initialized.
          */
        protected _outerStart: boolean;
        /**
          * Whether or not the end outer item node has been initialized.
          */
        protected _outerEnd: boolean;
        /**
          * An interval constant used to regulate the speed of the auto scroll
          * when the goToIndex function is called and is not direct.
          */
        protected _goToIntervalConstant: number;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Checks if the control has been initialized, otherwise it does so.
          * @param {Array<any>} newValue The new array context.
          * @param {Array<any>} oldValue The old array context.
          */
        contextChanged(newValue: Array<any>, oldValue: Array<any>): void;
        /**
          * Set the class name.
          */
        initialize(): void;
        /**
          * Inserts the innerHTML of this control into a child ForEach control.
          */
        setTemplate(): void;
        /**
          * Checks context and warns if not an Array, then initializes.
          */
        loaded(): void;
        /**
          * Advances the position of the Carousel to the next state.
          */
        goToNext(): plat.async.IThenable<boolean>;
        /**
          * Changes the position of the Carousel to the previous state.
          */
        goToPrevious(): plat.async.IThenable<boolean>;
        /**
          * Changes the position of the Carousel to the state
          * specified by the input index.
          * @param {number} index The new index of the Carousel.
          * @param {boolean} direct? If true, will go straight to the specified index without transitioning.
          */
        goToIndex(index: number, direct?: boolean): plat.async.IThenable<boolean>;
        /**
          * Stops auto scrolling if auto scrolling is enabled.
          */
        pause(): void;
        /**
          * Resumes auto scrolling if auto scrolling is enabled.
          */
        resume(): void;
        /**
          * Clean up the auto scroll interval if necessary.
          */
        dispose(): void;
        /**
          * Adds a listener to be called when the bindable property changes.
          * @param {plat.IPropertyChangedListener<any>} listener The function that acts as a listener.
          */
        onInput(listener: (newValue: any, oldValue: any) => void): plat.IRemoveListener;
        /**
          * A function that signifies when this control's bindable property has changed.
          * @param {any} newValue The new value of the property after the change.
          * @param {any} oldValue? The old value of the property prior to the change.
          */
        inputChanged(newValue: any, oldValue?: any): void;
        /**
          * A function that allows this control to observe both the bound property itself as well as
          * potential child properties if being bound to an object.
          * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
          * databinding.
          */
        observeProperties(binder: plat.observable.IImplementTwoWayBinding): void;
        /**
          * The function called when the bindable index is set externally.
          * @param {number} index The new value of the bindable index.
          * @param {number} oldValue The old value of the bindable index.
          * @param {void} identifier The child identifier of the property being observed.
          * @param {boolean} firstTime? Whether or not this is the first call to bind the property.
          */
        protected _setBoundProperty(index: number, oldValue: number, identifier: void, firstTime?: boolean): void;
        /**
          * Resets the position of the Carousel to its current state.
          */
        protected _reset(): void;
        /**
          * Verifies that the current length of the context aligns with the position of the Carousel.
          */
        protected _verifyLength(): void;
        /**
          * Sets the previous and next indices in relation to item nodes according to the current index.
          */
        protected _setIndexWindow(): void;
        /**
          * Advances the position of the Carousel to the next state.
          * @param {boolean} inputChanged Whether or not this was the result of a bound input change.
          */
        protected _goToNext(inputChanged: boolean): plat.async.IThenable<boolean>;
        /**
          * Changes the position of the Carousel to the previous state.
          * @param {boolean} inputChanged Whether or not this was the result of a bound input change.
          */
        protected _goToPrevious(inputChanged: boolean): plat.async.IThenable<boolean>;
        /**
          * Changes the position of the Carousel to the state
          * specified by the input index.
          * @param {number} index The new index of the Carousel.
          * @param {boolean} inputChanged Whether or not this was the result of a bound input change.
          * @param {boolean} direct? If true, will go straight to the specified index without transitioning.
          */
        protected _goToIndex(index: number, inputChanged: boolean, direct?: boolean): plat.async.IThenable<boolean>;
        /**
          * Changes the position of the Carousel to the state
          * specified by the input index.
          * @param {number} index The new index of the Carousel.
          * @param {boolean} inputChanged Whether or not this was the result of a bound input change.
          */
        protected _handleGoToIndex(index: number, inputChanged: boolean): plat.async.IThenable<boolean>;
        /**
          * Handles swapping and translating nodes for a "next" operation.
          * @param {number} index The new index at the time of the animation.
          * @param {number} length The length to statically transition back to.
          */
        protected _handleNext(index: number, length: number): void;
        /**
          * Handles swapping and translating nodes for a "previous" operation.
          * @param {number} index The new index at the time of the animation.
          * @param {number} length The length to statically transition back to.
          */
        protected _handlePrevious(index: number, length: number): void;
        /**
          * Clears all the inner nodes of the control.
          */
        protected _clearInnerNodes(): boolean;
        /**
          * Initializes item nodes at the given index.
          * @param {number} index The new index at the time of the animation.
          */
        protected _initializeIndex(index: number): boolean;
        /**
          * Initializes pre and post item nodes for the current index.
          */
        protected _initializeOuterNodes(): void;
        /**
          * Animates the carousel with a set of characteristics passed in as an argument.
          * @param {plat.IObject<string>} animationOptions An object containing key-value pairs
          * of properties to animate.
          */
        protected _initiateAnimation(animationOptions: plat.ui.animations.ISimpleCssTransitionOptions): plat.async.IThenable<void>;
        /**
          * Initializes the control and adds all event listeners.
          */
        protected _init(): void;
        /**
          * Adds all event listeners on this control's element.
          */
        protected _addEventListeners(): void;
        /**
          * Removes all event listeners on this control's element.
          */
        protected _removeEventListeners(): void;
        /**
          * Create the clones case where item length is less than 3.
          * @param {number} length The length to translate the offset clone.
          */
        protected _cloneForInfinite(length: number): void;
        /**
          * Removes the clones for infinite scrolling.
          */
        protected _removeClones(): void;
        /**
          * Adds all necessary elements and event listeners to setup auto scroll.
          */
        protected _initializeAuto(): void;
        /**
          * Begins auto scrolling.
          */
        protected _initiateInterval(): void;
        /**
          * Checks for automatic scrolling and suspends if necessary.
          */
        protected _suspendInterval(): void;
        /**
          * Adds all necessary elements and event listeners to handle tap events.
          */
        protected _initializeTap(): void;
        /**
          * Creates the arrow elements for type `tap` and places them in the DOM.
          */
        protected _createArrowElements(): void;
        /**
          * Checks the validity of the visibility of the forward and back arrows.
          */
        protected _checkArrows(): void;
        /**
          * Adds all event listeners to handle swipe events.
          */
        protected _initializeSwipe(): void;
        /**
          * Adds all event listeners to handle tracking events.
          */
        protected _initializeTrack(): void;
        /**
          * Handles a swipe event.
          */
        protected _handleSwipe(ev: plat.ui.IGestureEvent): void;
        /**
          * Log when the user touches the Carousel.
          * @param {plat.ui.IGestureEvent} ev The touch event.
          */
        protected _touchStart(ev: plat.ui.IGestureEvent): void;
        /**
          * The $touchend and $trackend event handler.
          * @param {plat.ui.IGestureEvent} ev The touch event.
          */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void;
        /**
          * The $track event handler. Used for tracking only horizontal or vertical tracking motions
          * depending on the defined orientation.
          * @param {plat.ui.IGestureEvent} ev The $tracking event.
          */
        protected _track(ev: plat.ui.IGestureEvent): void;
        /**
          * Calculates the translation value for setting the transform value during a static index set.
          * @param {number} interval The interval change.
          */
        protected _calculateStaticTranslation(interval: number): string;
        /**
          * Calculates the translation value for setting the transform value during tracking.
          * @param {plat.ui.IGestureEvent} ev The $tracking event.
          */
        protected _calculateDynamicTranslation(ev: plat.ui.IGestureEvent): string;
        /**
          * Obtains the current browser's transform property value.
          */
        protected _setTransform(): void;
        /**
          * Gets the interval length of the sliding container.
          */
        protected _getLength(): number;
        /**
          * Checks the orientation of the control and ensures it is valid.
          * Will default to "horizontal" if invalid.
          * @param {string} orientation The element to base the length off of.
          */
        protected _validateOrientation(orientation: string): string;
        /**
          * Adds an Array of items to the element without animating.
          * @param {Array<Node>} items The Array of items to add.
          */
        protected _appendItems(items: Array<Node>): void;
        /**
          * Removes items from the control's element.
          * @param {number} index The index to start disposing from.
          * @param {number} numberOfItems The number of items to remove.
          */
        protected _removeItems(index: number, numberOfItems: number): void;
        /**
          * Cancels the current animation.
          */
        protected _cancelCurrentAnimations(): plat.async.IThenable<any>;
        /**
          * Forces a repaint / reflow.
          * @param {HTMLElement} element The element to force the repaint / reflow on.
          */
        protected _forceRepaint(element: HTMLElement): void;
    }
    /**
      * The available options for the Carousel control.
      */
    interface ICarouselOptions {
        /**
          * Specifies how the Carousel should change. Multiple types can be combined by making it space delimited.
          * The default behavior is "track swipe".
          */
        type?: string;
        /**
          * The swipe direction of the Carousel.
          * The default value is "horizontal".
          */
        orientation?: string;
        /**
          * The starting index of the Carousel.
          */
        index?: number;
        /**
          * The interval automatic scroll time (in ms) for when the Carousel
          * is type "auto". Defaults to 3000 (i.e. 3 seconds).
          */
        interval?: number;
        /**
          * The amount of time after a user interaction that the Carousel will wait before
          * restarting its interval automatic scroll time if its type includes "auto" but is not only "auto".
          * Defaults to 3000 (i.e. 3 seconds).
          */
        suspend?: number;
        /**
          * Enables infinite scrolling when set to true.
          */
        infinite?: boolean;
    }
    /**
      * An ITemplateControl for creating a complex list of items with
      * extensive functionality.
      */
    class Listview extends plat.ui.TemplateControl implements IUiControl {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<IListviewOptions>;
        /**
          * The required context of the control (must be of type Array).
          */
        context: Array<any>;
        /**
          * The child controls of the control. All will be of type TemplateControl.
          */
        controls: Array<plat.ui.TemplateControl>;
        /**
          * A Promise that fulfills when the items are loaded.
          */
        itemsLoaded: plat.async.IThenable<void>;
        /**
          * Reference to the Window injectable.
          */
        protected _window: Window;
        /**
          * Reference to the Document injectable.
          */
        protected _document: Document;
        /**
          * Reference to the Animator injectable.
          */
        protected _animator: plat.ui.animations.Animator;
        /**
          * Reference to the IPromise injectable.
          */
        protected _Promise: plat.async.IPromise;
        /**
          * Reference to the Compat injectable.
          */
        protected _compat: plat.Compat;
        /**
          * Reference to the ITemplateControlFactory injectable.
          */
        protected _TemplateControlFactory: plat.ui.ITemplateControlFactory;
        /**
          * Used to hold the alias tokens for the built-in aliases. You
          * can overwrite these with the options for
          * the Listview control.
          */
        protected _aliases: IListviewAliasOptions;
        /**
          * The container to which items will be added.
          */
        protected _container: HTMLElement;
        /**
          * Whether or not to animate Array mutations.
          */
        protected _animate: boolean;
        /**
          * An element wrapping the scrollable container to be used for pull-to-refresh.
          */
        protected _viewport: HTMLElement;
        /**
          * An element wrapping the item container for scrolling purposes.
          */
        protected _scrollContainer: HTMLElement;
        /**
          * An object containing the node names of the Listview's defined templates and
          * their corresponding template node.
          */
        protected _templates: plat.IObject<Node>;
        /**
          * Whether the control is vertical or horizontal.
          */
        protected _isVertical: boolean;
        /**
          * The normalized node name / item template key if a single item template is being used.
          */
        protected _itemTemplate: string;
        /**
          * The selector function used to obtain the template key for each item.
          */
        protected _templateSelector: (item: any, index: number, group?: string) => any;
        /**
          * A promise that denotes that items are currently being rendered.
          */
        protected _templateSelectorPromise: plat.async.IThenable<any>;
        /**
          * An object containing template keys of groups associated with an index.
          */
        protected _templateSelectorKeys: plat.IObject<plat.IObject<string>>;
        /**
          * Whether or not the user is currently performing a load operation.
          */
        protected _isLoading: boolean;
        /**
          * Denotes how the items in the list should load. Infinite scrolling will call a function whenever more items
          * are being requested due to the list being 80% scrolled. Returning false will end all item requests.
          * Returning a promise will pause all other item requests until the promise resolves. Incremental loading
          * will call a function whenever more items are being requested due to the user requesting more items by
          * pulling past the end of the list. Returning false will end all item requests.
          * Returning a promise will pause all other item requests until the promise resolves.
          */
        protected _loading: string;
        /**
          * A function that will be called when more items should be added to the list (e.g. - "infinite" and "incremental" loading).
          */
        protected _requestItems: () => any;
        /**
          * The progress ring used to indicate the loading of items. If the "loading" option is set to "infinite" it is an
          * infinite scrolling progress ring that is shown when a promise is returned from the _requestItems function and
          * the infiniteScrollingRing option is not set to false. If the "loading" option is set to "incremental" it is a
          * progress ring that is shown when the user scrolls past the bottom of the list.
          */
        protected _loadingProgressRing: HTMLElement;
        /**
          * The current scroll position of the container.
          */
        protected _scrollPosition: number;
        /**
          * A function that removes the scroll event listener.
          */
        protected _removeScroll: plat.IRemoveListener;
        /**
          * Whether or not the user is currently performing a refresh operation.
          */
        protected _isRefreshing: boolean;
        /**
          * A function that is called when the user pulls the list to refresh its content.
          * A promise can be returned.
          */
        protected _refresh: () => any;
        /**
          * A loading ring that is shown when the user pulls the list to refresh its contents.
          */
        protected _refreshProgressRing: HTMLElement;
        /**
          * An enumeration value signifying the current touch state.
          */
        protected _touchState: number;
        /**
          * Whether the user is tracking in a fashion that attempts to refresh the list.
          */
        protected _hasMoved: boolean;
        /**
          * The last touch start recorded.
          */
        protected _lastTouch: plat.ui.IPoint;
        /**
          * The current browser's CSS3 transform property.
          */
        protected _transform: string;
        /**
          * The value of the inline transform property prior to the Drawer manipulating it.
          */
        protected _preTransform: string;
        /**
          * The most recent touch animation thenable. Used to cancel the current animation if another needs
          * to begin.
          */
        protected _touchAnimationThenable: plat.ui.animations.IAnimationThenable<void>;
        /**
          * A regular expression for normalizing a node name by removing potential special characters.
          */
        protected _nodeNormalizeRegex: RegExp;
        /**
          * Whether or not the select is grouped.
          */
        protected _isGrouped: boolean;
        /**
          * The default group which refers to this control itself.
          */
        protected _defaultGroup: IGroupHash;
        /**
          * An object that keeps track of unique groups.
          */
        protected _groups: plat.IObject<IGroupHash>;
        /**
          * The normalized node name of the group header template.
          */
        protected _headerTemplate: string;
        /**
          * A promise that resolves when the group template has been created.
          */
        protected _headerTemplatePromise: plat.async.IThenable<void>;
        /**
          * The current number of times we checked to see if the element was placed into the DOM.
          * Used for determining height.
          */
        protected _cloneAttempts: number;
        /**
          * The max number of times we'll check to see if the element was placed into the DOM.
          * Used for determining height.
          */
        protected _maxCloneAttempts: number;
        /**
          * Whether or not the main Array listener has been set.
          */
        private __listenerSet;
        /**
          * The resolve function for the itemsLoaded Promise.
          */
        private __resolveFn;
        /**
          * The constructor for a Listview. Creates the itemsLoaded Promise.
          */
        constructor();
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Check for templateUrl and set if needed.
          */
        initialize(): void;
        /**
          * Parse the innerTemplate and add it to the control's element.
          */
        setTemplate(): void;
        /**
          * Re-syncs the Listview child controls and DOM with the new
          * array.
          * @param {Array<any>} newValue? The new Array
          * @param {Array<any>} oldValue? The old Array
          */
        contextChanged(newValue?: Array<any>, oldValue?: Array<any>): void;
        /**
          * Determine item templates and kick off rendering.
          */
        loaded(): void;
        /**
          * Removes any potentially held memory.
          */
        dispose(): void;
        /**
          * Blow out the DOM starting at the index, determine how to render, and render the count accordingly.
          * @param {number} index? The starting index to render. If not specified, it will start at currentCount.
          * @param {number} count? The number of items to render. If not specified, the whole context
          * from the specified index will be rendered.
          * @param {platui.IGroupHash} group? The group we're rendering.
          */
        render(index?: number, count?: number, group?: IGroupHash): void;
        /**
          * Blow out all the DOM, determine how to render, and render accordingly.
          * @param {platui.IGroupHash} group? The group we're rerendering.
          */
        rerender(group?: IGroupHash): void;
        /**
          * Re-syncs the Listview child items and DOM with the new items
          * array.
          * @param {string} groupName The group name of the currently changing Array.
          * @param {any} newValue? The new child array of items
          * @param {any} oldValue? The old child array of items
          */
        protected _childContextChanged(groupName: string, newValue?: Array<any>, oldValue?: Array<any>): void;
        /**
          * Sets a listener for the changes to the array.
          */
        protected _setListener(): void;
        /**
          * Sets the alias tokens to use for all the items in the Listview context array.
          */
        protected _setAliases(): void;
        /**
          * Determine the proper item template or method of item template selection.
          * @param {string} itemTemplate The pre-normalized property for indicating either the item template or the
          * item template selector.
          * @param {string} itemTemplateKey The normalized property for indicating the item template.
          * @param {string} headerTemplate The property for indicating the group header template.
          */
        protected _determineTemplates(itemTemplate: string, itemTemplateKey: string, headerTemplate: string): void;
        /**
          * Construct the group template and add it to bindable templates.
          */
        protected _createGroupTemplate(): plat.async.IThenable<void>;
        /**
          * Adds new groups to the control's element when items are added to
          * the context.
          * @param {number} numberOfGroups The number of groups to add.
          * @param {number} index The point in the array to start adding groups.
          * @param {number} animateItems The number of groups to animate.
          */
        protected _addGroups(numberOfGroups: number, index: number, animateItems: number): plat.async.IThenable<void>;
        /**
          * Adds new group to the control's element.
          * @param {number} index The index of the group.
          * @param {DocumentFragment} fragment The group fragment to add to the DOM.
          * @param {boolean} animate Whether or not to animate the group.
          */
        protected _addGroup(index: number, fragment: DocumentFragment, animate: boolean): void;
        /**
          * Handle binding of a single group.
          * @param {number} index The index of the group in context.
          */
        protected _bindGroup(index: number): plat.async.IThenable<DocumentFragment>;
        /**
          * Creates a specified number of items.
          * @param {number} index The index to start creating items.
          * @param {number} count The number of items to create.
          * @param {platui.IGroupHash} group The group for which we're creating items.
          * @param {number} animateItems The number of items to animate.
          */
        protected _createItems(index: number, count: number, group: IGroupHash, animateItems: number): void;
        /**
          * Adds new items to the control's element when items are added to
          * the array.
          * @param {number} index The point in the array to start adding items.
          * @param {number} numberOfItems The number of items to add.
          * @param {platui.IGroupHash} group The group that we're performing this operation on.
          * @param {number} animateItems The number of items to animate.
          */
        protected _addItems(index: number, numberOfItems: number, group: IGroupHash, animateItems: number): plat.async.IThenable<void>;
        /**
          * Render items using a defined render function starting at a given index and continuing
          * through for a set number of items. If undefined or null is returned from the function,
          * rendering will stop.
          * @param {number} index The starting index to render.
          * @param {platui.IGroupHash} group? The group that we're performing this operation on.
          */
        protected _renderUsingFunction(index: number, group?: IGroupHash): plat.async.IThenable<any>;
        /**
          * Appends the rendered item from the defined render function.
          * @param {any} node The node to place into the item container if available.
          * @param {platui.IGroupHash} group? The group that we're performing this operation on.
          * @param {boolean} animate? Whether or not to animate the new item.
          */
        protected _appendRenderedItem(node: any, group?: IGroupHash, animate?: boolean): void;
        /**
          * Updates the control's children resource objects when
          * the array changes.
          * @param {number} index? The index to begin updating.
          * @param {number} count? The number of resources to update.
          * @param {plat.ui.TemplateControl} control The control whose resources are to be updated.
          */
        protected _updateResource(index: number, control: plat.ui.TemplateControl): void;
        /**
          * Returns a resource alias object for an item in the array. The
          * resource object contains index:number, even:boolean, odd:boolean,
          * first:boolean, and last:boolean.
          * @param {any} context The context to get the aliases for.
          * @param {number} index The index used to create the resource aliases.
          */
        protected _getAliases(context: any, index: number): plat.IObject<plat.ui.IResource>;
        /**
          * Adds an Array of items to the element without animating.
          * @param {Array<Node>} items The Array of items to add.
          * @param {Element} container THe container to add the items to.
          */
        protected _appendItems(items: Array<Node>, container: Element): void;
        /**
          * Adds an item to the control's element animating its elements.
          * @param {DocumentFragment} item The HTML fragment representing a single item.
          * @param {platui.IGroupHash} group The group items are being added to.
          */
        protected _appendAnimatedItem(item: DocumentFragment, group: IGroupHash): void;
        /**
          * Removes items from the control's element.
          * @param {number} index The index to start disposing from.
          * @param {number} numberOfItems The number of items to remove.
          * @param {platui.IGroupHash} group The group for which we're disposing items.
          */
        protected _removeItems(index: number, numberOfItems: number, group: IGroupHash): void;
        /**
          * Dispose of the controls and DOM starting at a given index.
          * @param {number} index The starting index to dispose.
          * @param {platui.IGroupHash} group? The group for which we're disposing items.
          */
        protected _disposeFromIndex(index: number, group?: IGroupHash): void;
        /**
          * Find and determine the proper loading function.
          * @param {string} requestItems The property for indicating the function for requesting more items.
          * @param {boolean} hideRing? Whether or not to hide the progress ring for "incremental" loading.
          */
        protected _determineLoading(requestItems: string, showRing: boolean): void;
        /**
          * The scroll event listener.
          * @param {Event} ev The scroll event object.
          */
        protected _onScroll(ev?: Event): void;
        /**
          * Checks if the scrolling has hit the proper threshold and requests more items if it has.
          */
        protected _handleScroll(): void;
        /**
          * Find and determine the pull-to-refresh function.
          * @param {string} pullRefresh The property for indicating the pull-to-refresh function.
          */
        protected _initializeRefresh(refresh: string): void;
        /**
          * Initializes the proper tracking events.
          * @param {boolean} loading Whether or not to initialize the loading tracking events.
          * @param {boolean} refresh Whether or not to initialize the refresh tracking events.
          */
        protected _initializeTracking(loading: boolean, refresh: boolean): void;
        /**
          * The touch start event listener for when looking for a refresh.
          * @param {plat.ui.IGestureEvent} ev The $touchstart event object.
          */
        protected _touchStart(ev: plat.ui.IGestureEvent): void;
        /**
          * The touch end event listener for when looking for an incremental load.
          * @param {plat.ui.IGestureEvent} ev The $touchend event object.
          */
        protected _touchEndLoad(ev: plat.ui.IGestureEvent): void;
        /**
          * The touch end event listener for when looking for a refresh.
          * @param {plat.ui.IGestureEvent} ev The $touchend event object.
          */
        protected _touchEndRefresh(ev: plat.ui.IGestureEvent): void;
        /**
          * A common touch end event listener for both refresh and incremental loading.
          * @param {plat.ui.IGestureEvent} ev The $touchend event object.
          * @param {boolean} refreshing Whether this translation is for refresh or incremental loading.
          */
        protected _touchEnd(ev: plat.ui.IGestureEvent, refreshing: boolean): void;
        /**
          * The tracking event listener for looking for a load.
          * @param {plat.ui.IGestureEvent} ev The $track[direction] event object.
          */
        protected _trackLoad(ev: plat.ui.IGestureEvent): void;
        /**
          * The tracking event listener for looking for a refresh.
          * @param {plat.ui.IGestureEvent} ev The $track[direction] event object.
          */
        protected _trackRefresh(ev: plat.ui.IGestureEvent): void;
        /**
          * Handles the translation of the viewport while tracking.
          * @param {plat.ui.IGestureEvent} ev The $track[direction] event object.
          * @param {boolean} refreshing Whether this translation is for refresh or incremental loading.
          */
        protected _track(ev: plat.ui.IGestureEvent, refreshing: boolean): void;
        /**
          * Calculates the translation value for setting the transform value during tracking.
          * @param {plat.ui.IGestureEvent} ev The $tracking event.
          * @param {boolean} refreshing Whether this translation is for refresh or incremental loading.
          */
        protected _calculateTranslation(ev: plat.ui.IGestureEvent, refreshing: boolean): string;
        /**
          * Obtains the current browser's transform property value.
          */
        protected _setTransform(): void;
        /**
          * Clones and parses thes innerTemplate and creates the templates object.
          * @param {string} itemTemplate The normalized item template name from the options.
          * @param {string} headerTemplate? The normalized group header template name from the options.
          */
        protected _parseInnerTemplate(itemTemplate: string, headerTemplate?: string): void;
        /**
          * Receives an event when a method has been called on an array and maps the array
          * method to its associated method handler.
          * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
          */
        protected _executeEvent(changes: Array<plat.observable.IArrayChanges<any>>): void;
        /**
          * Adds new group to the control's element.
          * @param {string} groupName The group name of the currently changing Array.
          * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
          */
        protected _executeChildEvent(groupName: string, changes: Array<plat.observable.IArrayChanges<any>>): void;
        /**
          * First checks if the push will do anything, then handles items being pushed into the array.
          * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
          * @param {platui.IGroupHash} group? The group that we're performing this operation on.
          */
        protected _push(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void;
        /**
          * Handles items being popped off the array.
          * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
          * @param {platui.IGroupHash} group? The group that we're performing this operation on.
          */
        protected _pop(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void;
        /**
          * Handles items being unshifted into the array.
          * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
          * @param {platui.IGroupHash} group? The group that we're performing this operation on.
          */
        protected _unshift(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void;
        /**
          * Handles items being shifted off the array.
          * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
          * @param {platui.IGroupHash} group? The group that we're performing this operation on.
          */
        protected _shift(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void;
        /**
          * Handles adding/removing items when an array is spliced.
          * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array change information.
          * @param {platui.IGroupHash} group? The group that we're performing this operation on.
          */
        protected _splice(changes: Array<plat.observable.IArrayChanges<any>>, group?: IGroupHash): void;
        /**
          * Animates the indicated items.
          * @param {number} startIndex The starting index of items to animate.
          * @param {number} numberOfItems The number of consecutive items to animate.
          * @param {string} key The animation key/type.
          * @param {IGroupHash} group The group performing the animation.
          * @param {string} animationOp Denotes animation operation.
          * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
          */
        protected _animateItems(startIndex: number, numberOfItems: number, key: string, group: IGroupHash, animationOp: string, cancel: boolean): plat.async.IThenable<void>;
        /**
          * Translates the items to be animated into the nodes to be animated.
          * @param {number} startIndex The starting index of items to animate.
          * @param {number} numberOfItems The number of consecutive items to animate.
          * @param {IGroupHash} group The group performing the animation.
          */
        protected _getAnimatedNodes(startIndex: number, numberOfItems: number, group: IGroupHash): Array<Node>;
        /**
          * Handles a simple animation of a block of elements.
          * @param {Array<Node>} nodes The Array of nodes to animate.
          * @param {string} key The animation key/type.
          * @param {IGroupHash} group The group performing the animation.
          * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
          */
        protected _handleSimpleAnimation(nodes: Array<Node>, key: string, group: IGroupHash, cancel: boolean): plat.async.IThenable<void>;
        /**
          * Handles a simple animation of a block of elements.
          * @param {Array<Node>} nodes The Array of nodes to animate.
          * @param {string} key The animation key/type.
          * @param {IGroupHash} group The group performing the animation.
          */
        protected _handleLeave(nodes: Array<Node>, key: string, group: IGroupHash): plat.async.IThenable<void>;
        /**
          * Handles a simple animation of a block of elements.
          * @param {Array<Node>} nodes The Array of nodes to animate.
          * @param {string} key The animation key/type.
          * @param {IGroupHash} group The group performing the animation.
          * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
          */
        protected _handleClonedContainerAnimation(nodes: Array<Node>, key: string, group: IGroupHash, cancel: boolean): plat.async.IThenable<void>;
        /**
          * Cancels all current animations.
          * @param {platui.IGroupHash} The object representing the current group.
          */
        protected _cancelCurrentAnimations(group?: IGroupHash): plat.async.IThenable<any>;
        /**
          * Normalizes template names by removing special characters.
          * @param {string} templateName The name to normalize.
          */
        protected _normalizeTemplateName(templateName: string): string;
        /**
          * Creates a progress ring element.
          */
        protected _generateProgressRing(): HTMLElement;
        /**
          * Checks the orientation of the control and ensures it is valid.
          * Will default to "horizontal" if invalid.
          * @param {string} orientation The element to base the length off of.
          */
        protected _validateOrientation(orientation: string): string;
        /**
          * Sets the width of a group's item container.
          * @param {HTMLElement} element The element to set the width on.
          * @param {boolean} immediate? Whether or not the change must be immediate. Default is false.
          */
        protected _setItemContainerWidth(element: HTMLElement, immediate?: boolean): void;
        /**
          * Resets the width of a group's item container.
          * @param {HTMLElement} element The element to reset the width on.
          */
        protected _resetItemContainerWidth(element: HTMLElement): void;
        /**
          * Creates a clone of the group container and uses it to find width values.
          * @param {HTMLElement} item The element having its width set.
          * @param {boolean} immediate? Whether or not the change must be immediate. Default is false.
          */
        protected _setItemContainerWidthWithClone(item: HTMLElement, immediate?: boolean): void;
        /**
          * Sets the height of a group's item container.
          * @param {HTMLElement} element The element to set the height on.
          * @param {boolean} withHeader Whether the header should be included in the calculation or not.
          */
        protected _setItemContainerHeight(element: HTMLElement, withHeader: boolean): void;
        /**
          * Creates a clone of the group container and uses it to find height values.
          * @param {HTMLElement} item The element having its height set.
          * @param {boolean} withHeader Whether the header should be included in the calculation or not.
          */
        protected _setItemContainerHeightWithClone(item: HTMLElement, withHeader: boolean): void;
    }
    /**
      * The available options for the Listview control.
      */
    interface IListviewOptions extends plat.ui.controls.IForEachOptions {
        /**
          * Used to specify alternative alias tokens for the built-in Listview aliases.
          */
        aliases?: IListviewAliasOptions;
        /**
          * The orientation (scroll direction) of the Listview.
          * The default value is "vertical".
          */
        orientation?: string;
        /**
          * The node name of the desired item template or a defined item template selector function.
          */
        itemTemplate?: any;
        /**
          * The node name of the desired group header template.
          */
        headerTemplate?: string;
        /**
          * Indicates a special type of loading. Available options are "infinite" or "incremental".
          */
        loading?: string;
        /**
          * The name of the function that will be called when more items are being requested to add to the list.
          */
        onItemsRequested?: string;
        /**
          * Whether or not to show an infinite scrolling progress ring whenever the loading type is set to
          * "infinite" and a promise is returned from the onItemsRequested function. Defaults to true.
          */
        infiniteProgress?: boolean;
        /**
          * The url of the Listview's intended template if not using
          * innerHTML.
          */
        templateUrl?: string;
        /**
          * The function that will be called when the user pulls to refresh.
          */
        onRefresh?: string;
    }
    /**
      * Defines the properties for the Listview's grouping hash.
      */
    interface IGroupHash {
        /**
          * The name of the group.
          */
        name: string;
        /**
          * The index of the group.
          */
        index: number;
        /**
          * The primary group element.
          */
        element: HTMLElement;
        /**
          * The group's item container.
          */
        itemContainer: HTMLElement;
        /**
          * The control associated with this group.
          */
        control: plat.ui.TemplateControl;
        /**
          * An Array of promises denoting items being added to this group.
          */
        addQueue: Array<plat.async.IThenable<void>>;
        /**
          * The current number of synchronous items in the group.
          */
        itemCount: number;
        /**
          * A queue of objects representing current animations and their operation for this group.
          */
        animationQueue: Array<{
            animation: plat.ui.animations.IAnimationThenable<any>;
            op: string;
        }>;
    }
    /**
      * Defines the necessary key-value pairs for a Listview group that makes up
      * a grouped Listview's context.
      */
    interface IListviewGroup {
        /**
          * The group name.
          */
        group: string;
        /**
          * The items contained in each group.
          */
        items: Array<any>;
    }
    /**
      * The alias tokens for the Listview options object for the
      * Listview control.
      */
    interface IListviewAliasOptions extends plat.ui.controls.IForEachAliasOptions {
        /**
          * The group name of the current group.
          */
        group?: string;
    }
    /**
      * An ITemplateControl that acts as a global navigation bar that defines its own context.
      */
    class Navbar extends plat.ui.TemplateControl implements IUiControl {
        protected static _inject: any;
        /**
          * The HTML template represented as a string.
          */
        templateString: string;
        /**
          * The evaluated plat-options object.
          */
        options: plat.observable.IObservableProperty<INavbarOptions>;
        /**
          * The Navbar control's context.
          */
        context: INavbarContext;
        /**
          * Specifies that the Navbar defines it's own context.
          */
        hasOwnContext: boolean;
        /**
          * Reference to the Document injectable.
          */
        protected _document: Document;
        /**
          * An object specifying whether a particular section of the Navbar
          * has been overridden.
          */
        protected _overrides: INavbarProperties<boolean>;
        /**
          * Sets the classes on the proper elements.
          * @param {string} className? An optional, additional class name or class names to set on the control
          * in addition to its standard set.
          * @param {Element} element? The element to set the class name on. Should default to
          * the control's element if not specified.
          */
        setClasses(className?: string, element?: Element): void;
        /**
          * Set the class name.
          */
        initialize(): void;
        /**
          * Looks for and applies overwritten components.
          */
        setTemplate(): void;
        /**
          * Initializes all options.
          */
        loaded(): void;
        /**
          * Sets the left part of the Navbar.
          * @param {platui.INavbarComponent} component The component to be set as the sole item in
          * the left part of the Navbar.
          */
        setLeft(component: INavbarComponent): void;
        /**
          * Sets the left part of the Navbar.
          * @param {Array<platui.INavbarComponent>} components An Array of components to be set as the left
          * Navbar's items.
          */
        setLeft(components: Array<INavbarComponent>): void;
        /**
          * Sets the center part of the Navbar.
          * @param {platui.INavbarComponent} component The component to be set as the sole item in
          * the center part of the Navbar.
          */
        setCenter(component: INavbarComponent): void;
        /**
          * Sets the center part of the Navbar.
          * @param {Array<platui.INavbarComponent>} components An Array of components to be set as the center
          * Navbar's items.
          */
        setCenter(components: Array<INavbarComponent>): void;
        /**
          * Sets the right Navbar component's context.
          * @param {platui.INavbarComponent} component The component to be set as the sole item in
          * the right part of the Navbar.
          */
        setRight(component: INavbarComponent): void;
        /**
          * Sets the right part of the Navbar.
          * @param {Array<platui.INavbarComponent>} components An Array of components to be set as the right
          * Navbar's items.
          */
        setRight(components: Array<INavbarComponent>): void;
        /**
          * The defined action of the left part of the Navbar when tapped.
          * @param {number} index? The index of the action tapped.
          * @param {plat.ui.IGestureEvent} ev? The "$tap" event.
          */
        leftAction(index?: number, ev?: plat.ui.IGestureEvent): void;
        /**
          * The defined action of the center part of the Navbar when tapped.
          * @param {number} index? The index of the action tapped.
          * @param {plat.ui.IGestureEvent} ev? The "$tap" event.
          */
        centerAction(index?: number, ev?: plat.ui.IGestureEvent): void;
        /**
          * The defined action of the right part of the Navbar when tapped.
          * @param {number} index? The index of the action tapped.
          * @param {plat.ui.IGestureEvent} ev? The "$tap" event.
          */
        rightAction(index?: number, ev?: plat.ui.IGestureEvent): void;
        /**
          * Determines the nature of the passed in components and sets the context at the given position
          * to the determined INavbarComponent(s).
          * @param {string} position The part of the Navbar being set.
          * @param {platui.INavbarComponent} component The INavbarComponent
          * to set as the context.
          */
        protected _setComponent(position: string, component: INavbarComponent): void;
        /**
          * Determines the nature of the passed in components and sets the context at the given position
          * to the determined INavbarComponent(s).
          * @param {string} position The part of the Navbar being set.
          * @param {Array<platui.INavbarComponent>} components The INavbarComponents
          * to set as the context.
          */
        protected _setComponent(position: string, components: Array<INavbarComponent>): void;
        /**
          * Sets default component parameters and grabs custom actions from it.
          * @param {platui.INavbarComponent} newComponent The new INavbarComponent
          * to parse.
          * @param {platui.INavbarComponent} oldComponent? The old INavbarComponent
          * whose place is being taken.
          */
        protected _parseComponent(newComponent: INavbarComponent, oldComponent?: INavbarComponent): void;
        /**
          * Executes the proper action associated with a Navbar component.
          * @param {plat.ui.IGestureEvent} ev The executed event.
          * @param {string} position The part of the Navbar whose action is being executed.
          * @param {any} property? The indexing property. Will by default be an index into the component Array.
          */
        protected _executeAction(ev: plat.ui.IGestureEvent, position: string, property?: any): void;
    }
    /**
      * The available options for the Navbar control.
      */
    interface INavbarOptions {
        /**
          * The position of the Navbar.
          * The default value is "top".
          */
        position?: string;
    }
    /**
      * Defines the available bindings for a single component of the Navbar control.
      */
    interface INavbarComponent {
        /**
          * The content contained inside the component.
          */
        content?: string;
        /**
          * The action to perform when the component is tapped.
          */
        action?: (ev?: plat.ui.IGestureEvent) => any;
        /**
          * The set of custom actions whose key will be used as the function name and
          * whose value is the action to perform.
          */
        customActions?: plat.IObject<() => any>;
    }
    interface INavbarProperties<T> {
        [x: string]: T;
        /**
          * An association to the left part of the Navbar control.
          */
        left: T;
        /**
          * An association to the center part of the Navbar control.
          */
        center: T;
        /**
          * An association to the right part of the Navbar control.
          */
        right: T;
    }
    /**
      * Defines the context type for the Navbar control.
      */
    interface INavbarContext extends INavbarProperties<INavbarComponent | Array<INavbarComponent>> {
    }
}

declare module 'platypusui' {
    export = platui;
}
