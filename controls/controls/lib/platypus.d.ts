/**
* PlatypusTS v0.9.0 (http://getplatypi.com)
* Copyright 2014 Platypi, LLC. All rights reserved.
*
* PlatypusTS is licensed under the GPL-3.0 found at
* http://opensource.org/licenses/GPL-3.0
*
*/
declare module plat {
    /**
    * @name register
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds all the classes and interfaces related to registering components for platypus.
    */
    module register {
        /**
        * Registers the IApp with the framework. The framework will instantiate the IApp when needed, and wire up
        * the Application Lifecycle events. The dependencies array corresponds to injectables that will be
        * passed into the Constructor of the app.
        *
        * @param name The name of your app.
        * @param Type The constructor for the IApp.
        * @param dependencies An array of strings representing the dependencies needed for the app injector.
        */
        function app(name: string, Type: new(...args: any[]) => IApp, dependencies?: any[]): typeof register;
        /**
        * Registers an IControl with the framework. The framework will instantiate the IControl when needed. The
        * dependencies array corresponds to injectables that will be passed into the Constructor of the control.
        *
        * @param name The control type, corresponding to the HTML notation for creating a new IControl (e.g. 'plat-foreach').
        * @param Type The constructor for the IControl.
        * @param dependencies An array of strings representing the dependencies needed for the IControl injector.
        *
        * @example plat.register.control('my-tap', MyTap, [plat.expressions.IParser]);
        */
        function control(name: string, Type: new(...args: any[]) => IControl, dependencies?: any[]): typeof register;
        /**
        * Registers a ViewControl with the framework. The framework will instantiate the control when needed. The
        * dependencies array corresponds to injectables that will be passed into the Constructor of the control.
        *
        * @param name The control type, corresponding to the HTML notation for creating a new IViewControl. Used for navigation
        * to the specified ViewControl.
        * @param Type The constructor for the IViewControl.
        * @param dependencies An optional array of strings representing the dependencies needed for the IViewControl injector.
        *
        * @example plat.register.viewControl('my-view-control', MyViewControl);
        */
        function viewControl(name: string, Type: new(...args: any[]) => ui.IViewControl, dependencies?: any[]): typeof register;
        /**
        * Registers a WebViewControl with the framework. The framework will instantiate the control when needed. The
        * dependencies array corresponds to injectables that will be passed into the Constructor of the control.
        *
        * @param name The control type, corresponding to the HTML notation for creating a new IWebViewControl. Used for navigation
        * to the specified WebViewControl.
        * @param Type The constructor for the IWebViewControl.
        * @param dependencies An optional array of strings representing the dependencies needed for the IWebViewControl injector.
        * @param routes Optional route strings (or regular expressions) used for matching a URL to the registered IWebViewControl.
        *
        * @example plat.register.viewControl('my-view-control', MyViewControl, null, ['customers/:customer(/:ordernumber)']);
        */
        function viewControl(name: string, Type: new(...args: any[]) => ui.IWebViewControl, dependencies: any[], routes: any[]): typeof register;
        /**
        * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
        * The dependencies array corresponds to injectables that will be passed into the Constructor of the injectable.
        *
        * @param name The name of the injector, used when another component is specifying dependencies.
        * @param dependencies An array of strings representing the dependencies needed for the injectable's injector.
        * @param Type The constructor for the injectable. The injectable will only be instantiated once during the application
        * lifetime.
        * @param injectableType Specifies the type of injectable, either plat.register.injectable.SINGLETON,
        * plat.register.injectable.STATIC, plat.register.injectable.INSTANCE, plat.register.injectable.FACTORY,
        * plat.register.injectable.CLASS (defaults to plat.register.injectable.SINGLETON).
        *
        * @example plat.register.injectable('$CacheFactory', [plat.expressions.IParser], Cache);
        * @example plat.register.injectable('database', MyDatabase, null, register.injectable.INSTANCE);
        */
        function injectable(name: string, Type: new(...args: any[]) => any, dependencies?: any[], injectableType?: string): typeof register;
        /**
        * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
        * The dependencies array corresponds to injectables that will be passed into the injectable method.
        *
        * @param name The name of the injector, used when another component is specifying dependencies.
        * @param dependencies An array of strings representing the dependencies needed for the injectable's injector.
        * @param Type The constructor for the injectable. The injectable will only be instantiated once during the application
        * lifetime.
        * @param injectableType Specifies the type of injectable, either plat.register.injectable.SINGLETON,
        * plat.register.injectable.STATIC, plat.register.injectable.INSTANCE, plat.register.injectable.FACTORY,
        * plat.register.injectable.CLASS (defaults to plat.register.injectable.SINGLETON).
        *
        * @returns {register} The object that contains the register methods (for method chaining).
        *
        * @example plat.register.injectable('$CacheFactory', [plat.expressions.IParser],
        *  function(parser: plat.expressions.IParser) { return { ... }; });
        * @example plat.register.injectable('database', function() { return new Database(); }, null, register.injectable.INSTANCE);
        */
        function injectable(name: string, method: (...args: any[]) => any, dependencies?: any[], injectableType?: string): typeof register;
        /**
        * A function for registering an injectable that also contains constants for injectable type.
        */
        module injectable {
            /**
            * Static injectables will be injected before the application loads. This provides a way to create
            * a static constructor and load dependencies into static class properties.
            */
            var STATIC: string;
            /**
            * Singleton injectables will contain a constructor. A Singleton injectable will be instantiated once and
            * used throughout the application lifetime. It will be instantiated when another component is injected
            * and lists it as a dependency.
            */
            var SINGLETON: string;
            /**
            * Instance injectables will contain a constructor. An Instance injectable will be instantiated multiple times
            * throughout the application lifetime. It will be instantiated whenever another component is injected
            * and lists it as a dependency.
            */
            var INSTANCE: string;
            /**
            * Factory injectables will not contain a constructor but will instead contain a method for obtaining an
            * instance, such as getInstance() or create(). It will be injected before the application loads, similar to a Static
            * injectable.
            */
            var FACTORY: string;
            /**
            * Class injectables are essentially a direct reference to a class's constructor. It may contain both
            * static and instance methods as well as a constructor for creating a new instance.
            */
            var CLASS: string;
        }
        /**
        * Adds a CSS animation denoted by its name. If you wish to also support legacy browsers, make sure to register a
        * JS implementation as well.
        *
        * @param name The unique idenitifer of the animation.
        * @param Type The constructor for the custom animation.
        * @param dependencies Any dependencies that need to be injected into the animation at
        * instantiation.
        * @param animationType The type of animation. Both the intended type and default value are plat.register.animation.CSS.
        */
        function animation(name: string, Type: new(...args: any[]) => ui.animations.ICssAnimation, dependencies?: any[], animationType?: 'css'): typeof register;
        /**
        * Adds a CSS animation denoted by its name. If you wish to also support legacy browsers, make sure to register a
        * JS implementation as well.
        *
        * @param name The unique idenitifer of the animation.
        * @param Type The constructor for the custom animation.
        * @param dependencies Any dependencies that need to be injected into the animation at
        * instantiation.
        * @param animationType The type of animation. Both the intended type and default value are plat.register.animation.CSS.
        */
        function animation(name: string, Type: new(...args: any[]) => ui.animations.ICssAnimation, dependencies?: any[], animationType?: string): typeof register;
        /**
        * Adds a JS animation denoted by its name. If  Intended to be used when JS animation implementations for legacy browsers
        * is desired.
        *
        * @param name The unique idenitifer of the animation.
        * @param Type The constructor for the custom animation.
        * @param dependencies Any dependencies that need to be injected into the animation at
        * instantiation.
        * @param animationType The type of animation. The intended type is plat.register.animation.JS.
        */
        function animation(name: string, Type: new(...args: any[]) => ui.animations.IJsAnimation, dependencies: any[], animationType: 'js'): typeof register;
        /**
        * Adds a JS animation denoted by its name. If  Intended to be used when JS animation implementations for legacy browsers
        * is desired.
        *
        * @param name The unique idenitifer of the animation.
        * @param Type The constructor for the custom animation.
        * @param dependencies Any dependencies that need to be injected into the animation at
        * instantiation.
        * @param animationType The type of animation. The intended type is plat.register.animation.JS.
        */
        function animation(name: string, Type: new(...args: any[]) => ui.animations.IJsAnimation, dependencies: any[], animationType: string): typeof register;
        /**
        * A function for registering animations that also contains constants for animation type.
        */
        module animation {
            /**
            * A CSS animation.
            */
            var CSS: string;
            /**
            * A JavaScript animation.
            */
            var JS: string;
        }
    }
    /**
    * @name dependency
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds classes and interfaces related to dependency injection components in platypus.
    */
    module dependency {
        /**
        * @name Injector
        * @memberof plat.dependency
        * @kind class
        *
        * @implements {plat.dependency.IInjector}
        *
        * @description
        * The Injector class is used for dependency injection. You can create an injector object,
        * specify dependencies and a constructor for your component. When the injector object is
        * 'injected' it will create a new instance of your component and pass in the dependencies
        * to the constructor.
        *
        * @typeparam {any} T The type of object that will be returned when the inject method is invoked.
        */
        class Injector<T> implements IInjector<T> {
            public name: string;
            public Constructor: new() => T;
            public type: string;
            /**
            * @name initialize
            * @memberof plat.dependency.Injector
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Initializes all static injectors.
            *
            * @returns {void}
            */
            static initialize(): void;
            /**
            * @name getDependencies
            * @memberof plat.dependency.Injector
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Gathers and returns the array of listed dependencies.
            *
            * @param {Array<any>} dependencies The array of dependencies specified
            * by either their Constructor or their registered name.
            *
            * @returns {Array<plat.dependency.IInjecor<any>>} The dependencies
            */
            static getDependencies(dependencies: any[]): IInjector<any>[];
            /**
            * @name getDependency
            * @memberof plat.dependency.Injector
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Finds and returns the dependency.
            *
            * @param {any} dependency an object/string used to find the dependency.
            *
            * @returns {plat.dependency.IInjector<any>} The dependency
            */
            static getDependency(dependency: any): IInjector<any>;
            /**
            * @name convertDependencies
            * @memberof plat.dependency.Injector
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Converts dependencies specified by their Constructors into
            * equivalent dependencies specified by their registered string
            * name.
            *
            * @param {Array<any>} dependencies The array of dependencies specified
            * by either their Constructor or their registered name.
            *
            * @returns {Array<string>} The dependency strings.
            */
            static convertDependencies(dependencies: any[]): string[];
            /**
            * @name isInjector
            * @memberof plat.dependency.Injector
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Checks if the object being passed in fulfills the requirements for being an Injector.
            *
            * @param {plat.dependency.Injector<any>} dependency The object to check.
            *
            * @returns {boolean} Whether or not the object passed in is an injector.
            */
            static isInjector(dependency: Injector<any>): boolean;
            /**
            * @name __getInjectorName
            * @memberof plat.dependency.Injector
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Gets the string name related to an injector.
            *
            * @param {any} dependency The object to search for.
            *
            * @returns {string} The string injector name
            */
            private static __getInjectorName(dependency);
            /**
            * @name __construct
            * @memberof plat.dependency.Injector
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Calls the injector's constructor with the associated dependencies.
            *
            * @param {any} Constructor The Constructor to call.
            * @param {Array<any>} args The arguments to pass to the constructor.
            *
            * @returns {any} The instantiated constructor.
            */
            private static __construct(Constructor, args);
            /**
            * @name __locateInjector
            * @memberof plat.dependency.Injector
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Finds an injector object with the associated constructor.
            *
            * @param {any} Constructor The Constructor to locate.
            *
            * @returns {any} The located injector.
            */
            private static __locateInjector(Constructor);
            /**
            * @name __wrap
            * @memberof plat.dependency.Injector
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Once an injector is injected, it is wrapped to prevent further injection.
            *
            * @param {any} value The injected value.
            *
            * @returns {plat.dependency.IInjector<any>} The wrapped injector.
            */
            private static __wrap(value);
            /**
            * @name __noop
            * @memberof plat.dependency.Injector
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Returns an empty injector object.
            *
            * @returns {plat.dependency.IInjector<any>} The noop injector.
            */
            private static __noop();
            /**
            * @name __findCircularReferences
            * @memberof plat.dependency.Injector
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Determines if there is a circular dependency in a dependency tree.
            *
            * @param {plat.dependency.Injector<any>} injector The starting point for the dependency tree search.
            *
            * @returns {string} The end of the circular dependency chain, if one exists.
            */
            private static __findCircularReferences(injector);
            /**
            * @name __dependencies
            * @memberof plat.dependency.Injector
            * @kind property
            * @access private
            *
            * @type {Array<string>}
            *
            * @description
            * The dependencies for this injector
            */
            private __dependencies;
            /**
            * @name constructor
            * @memberof plat.dependency.Injector
            * @kind function
            * @access public
            *
            * @description
            * The constructor for an injector. Converts any non-string dependencies to strings to support mocking Injectors during runtime.
            *
            * @param {string} name The name of the injected type.
            * @param {new () => T} Constructor The constructor method for the component requiring the dependency
            * injection.
            * @param {Array<any>} dependencies An array of strings specifying the injectable dependencies for the
            * associated constructor.
            * @param {string} type The type of injector, used for injectables specifying a injectableType of
            * STATIC, SINGLETON, FACTORY, INSTANCE, or CLASS. The default is SINGLETON.
            *
            * @returns {plat.dependency.Injector}
            */
            constructor(name: string, Constructor: new() => T, dependencies?: any[], type?: string);
            /**
            * @name inject
            * @memberof plat.dependency.Injector
            * @kind function
            * @access public
            *
            * @description
            * Gathers the dependencies for the Injector object and creates a new instance of the
            * Constructor, passing in the dependencies in the order they were specified. If the
            * Injector contains a Constructor for an injectable and the Constructor is registered
            * as a SINGLE type it will only inject that injectable once.
            *
            * @returns {T} The injected object
            */
            public inject(): T;
            /**
            * @name _wrapInjector
            * @memberof plat.dependency.Injector
            * @kind function
            * @access protected
            *
            * @description
            * Wraps the injector with the instantiated value in the case of a
            * SINGLE or STATIC type so that it does not re-instantiate.
            *
            * @param {any} value The value to wrap
            */
            public _wrapInjector(value: any): IInjector<any>;
        }
        /**
        * @name IInjectorObject
        * @memberof plat.dependency
        * @kind interface
        * @access public
        *
        * @description
        * An object whose values are all {@link plat.dependency.IInjector|IInjectors}.
        */
        interface IInjectorObject<T> extends IObject<IInjector<T>> {
        }
        /**
        * @name IInjector
        * @memberof plat.dependency
        * @kind class
        *
        * @description
        * The IInjector interface is used for dependency injection. You can create an injector object,
        * specify dependencies and a constructor for your component. When the injector object is
        * 'injected' it will create a new instance of your component and pass in the dependencies
        * to the constructor.
        *
        * @typeparam {any} T The type of object that will be returned when the inject method is invoked.
        */
        interface IInjector<T> {
            /**
            * @name inject
            * @memberof plat.dependency.IInjector
            * @kind function
            * @access public
            *
            * @description
            * Gathers the dependencies for the IInjector object and creates a new instance of the
            * Constructor, passing in the dependencies in the order they were specified. If the
            * Injector contains a Constructor for an injectable and the Constructor is registered
            * as a SINGLE type it will only inject that injectable once.
            *
            * @returns {T} The injected object
            */
            inject(): T;
            /**
            * @name Constructor
            * @memberof plat.dependency.IInjector
            * @kind property
            * @access public
            *
            * @type {new () => T}
            *
            * @description
            * The constructor method for the component requiring the dependency injection.
            */
            Constructor: new() => T;
            /**
            * @name type
            * @memberof plat.dependency.IInjector
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The type of injector, used for injectables specifying a register.injectableType of
            * STATIC, SINGLE, or MULTI. The default is SINGLE.
            */
            type?: string;
            /**
            * @name name
            * @memberof plat.dependency.IInjector
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The name registered for the injector.
            */
            name: string;
        }
    }
    /**
    * @name plat
    * @kind namespace
    * @access public
    *
    * @description
    * The entry point into the platypus library.
    */
    /**
    * @name acquire
    * @memberof plat
    * @kind function
    * @variation 0
    * @access public
    * @static
    *
    * @description
    * Returns the requested injectable dependency.
    *
    * @typeparam {any} T The type of the requested dependency.
    *
    * @param {() => T} dependency The dependency Type to return.
    *
    * @returns T The requested dependency.
    */
    function acquire<T>(dependency: () => T): T;
    /**
    * @name acquire
    * @memberof plat
    * @kind function
    * @variation 1
    * @access public
    * @static
    *
    * @description
    * Returns the requested injectable dependency.
    *
    * @param {Function} dependency The dependency Type to return.
    *
    * @returns {any} The requested dependency.
    */
    function acquire(dependency: Function): any;
    /**
    * @name acquire
    * @memberof plat
    * @kind function
    * @variation 2
    * @access public
    * @static
    *
    * @description
    * Returns the requested injectable dependency.
    *
    * @param {Function} dependency An array of Types specifying the injectable dependencies.
    *
    * @returns {Array<any>} The dependencies, in the order they were requested.
    */
    function acquire(dependencies: Function[]): any[];
    /**
    * @name acquire
    * @memberof plat
    * @kind function
    * @variation 3
    * @access public
    * @static
    *
    * @description
    * Returns the requested injectable dependency.
    *
    * @param {string} dependency The injectable dependency type to return.
    *
    * @returns {any} The requested dependency.
    */
    function acquire(dependency: string): any;
    /**
    * @name acquire
    * @memberof plat
    * @kind function
    * @variation 4
    * @access public
    * @static
    *
    * @description
    * Gathers dependencies and returns them as an array in the order they were requested.
    *
    * @param {Array<string>} dependencies An array of strings specifying the injectable dependencies.
    *
    * @returns {Array<any>} The dependencies, in the order they were requested.
    */
    function acquire(dependencies: string[]): any[];
    /**
    * @name acquire
    * @memberof plat
    * @kind function
    * @variation 5
    * @access public
    * @static
    *
    * @description
    * Gathers dependencies and returns them as an array in the order they were requested.
    *
    * @param {Array<any>} dependencies An array of strings or Functions specifying the injectable dependencies.
    *
    * @returns {Array<any>} The dependencies, in the order they were requested.
    */
    function acquire(dependencies: any[]): any[];
    /**
    * @name Exception
    * @memberof plat
    * @kind class
    * @access public
    *
    * @description
    * Manages the throwing and consuming of errors and warnings.
    */
    class Exception {
        /**
        * @name warn
        * @memberof plat.Exception
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Method for sending a warning to all listeners. Will
        * not throw an error.
        *
        * @param {string} message The message to be sent to the listeners.
        * @param {number} type? Denotes the type of fatal exception.
        *
        * @returns {void}
        */
        static warn(message: string, type?: number): void;
        /**
        * @name fatal
        * @memberof plat.Exception
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Method for sending a fatal error to all listeners. Will
        * throw an error.
        *
        * @param {Error} error The Error to be sent to all the listeners.
        * @param {number} type? Denotes the type of fatal exception.
        *
        * @returns {void}
        */
        static fatal(error: Error, type?: number): void;
        /**
        * @name fatal
        * @memberof plat.Exception
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Method for sending a fatal message to all listeners. Will
        * throw an error.
        *
        * @param {string} message The message to be sent to all the listeners.
        * @param {number} type? Denotes the type of fatal exception.
        *
        * @returns {void}
        */
        static fatal(message: string, type?: number): void;
        /**
        * @name PARSE
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for parsing exceptions
        */
        static PARSE: number;
        /**
        * @name COMPILE
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for compiling exceptions
        */
        static COMPILE: number;
        /**
        * @name BIND
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for binding exceptions
        */
        static BIND: number;
        /**
        * @name NAME
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for name exceptions
        */
        static NAME: number;
        /**
        * @name NAVIGATION
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for navigation exceptions
        */
        static NAVIGATION: number;
        /**
        * @name TEMPLATE
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for template exceptions
        */
        static TEMPLATE: number;
        /**
        * @name AJAX
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for ajax exceptions
        */
        static AJAX: number;
        /**
        * @name CONTEXT
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for context exceptions
        */
        static CONTEXT: number;
        /**
        * @name EVENT
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for event exceptions
        */
        static EVENT: number;
        /**
        * @name INJECTABLE
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for injectable exceptions
        */
        static INJECTABLE: number;
        /**
        * @name COMPAT
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for compat exceptions
        */
        static COMPAT: number;
        /**
        * @name PROMISE
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for promise exceptions
        */
        static PROMISE: number;
        /**
        * @name ANIMATION
        * @memberof plat.Exception
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for animation exceptions
        */
        static ANIMATION: number;
    }
    /**
    * The Type for referencing the '$ExceptionStatic' injectable as a dependency.
    */
    function IExceptionStatic(): IExceptionStatic;
    /**
    * @name IExceptionStatic
    * @memberof plat
    * @kind interface
    * @access public
    *
    * @description
    * Manages the throwing and consuming of errors and warnings.
    */
    interface IExceptionStatic {
        /**
        * @name warn
        * @memberof plat.IExceptionStatic
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Method for sending a warning to all listeners. Will
        * not throw an error.
        *
        * @param {string} message The message to be sent to the listeners.
        * @param {number} type? Denotes the type of fatal exception.
        *
        * @returns {void}
        */
        warn(message: string, type?: number): void;
        /**
        * @name fatal
        * @memberof plat.IExceptionStatic
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Method for sending a fatal error to all listeners. Will
        * throw an error.
        *
        * @param {Error} error The Error to be sent to all the listeners.
        * @param {number} type? Denotes the type of fatal exception.
        *
        * @returns {void}
        */
        fatal(error: Error, type?: number): void;
        /**
        * @name fatal
        * @memberof plat.IExceptionStatic
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Method for sending a fatal message to all listeners. Will
        * throw an error.
        *
        * @param {string} message The message to be sent to all the listeners.
        * @param {number} type? Denotes the type of fatal exception.
        *
        * @returns {void}
        */
        fatal(message: string, type?: number): void;
        /**
        * @name PARSE
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for parsing exceptions
        */
        PARSE: number;
        /**
        * @name COMPILE
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for compiling exceptions
        */
        COMPILE: number;
        /**
        * @name BIND
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for binding exceptions
        */
        BIND: number;
        /**
        * @name NAME
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for name exceptions
        */
        NAME: number;
        /**
        * @name NAVIGATION
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for navigation exceptions
        */
        NAVIGATION: number;
        /**
        * @name TEMPLATE
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for template exceptions
        */
        TEMPLATE: number;
        /**
        * @name AJAX
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for ajax exceptions
        */
        AJAX: number;
        /**
        * @name CONTEXT
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for context exceptions
        */
        CONTEXT: number;
        /**
        * @name EVENT
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for event exceptions
        */
        EVENT: number;
        /**
        * @name INJECTABLE
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for injectable exceptions
        */
        INJECTABLE: number;
        /**
        * @name COMPAT
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for compat exceptions
        */
        COMPAT: number;
        /**
        * @name PROMISE
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for promise exceptions
        */
        PROMISE: number;
        /**
        * @name ANIMATION
        * @memberof plat.IExceptionStatic
        * @kind property
        * @access public
        * @static
        * @readonly
        *
        * @type {number}
        *
        * @description
        * Exception Type for animation exceptions
        */
        ANIMATION: number;
    }
    /**
    * @name Compat
    * @memberof plat
    * @kind class
    *
    * @implements {plat.ICompat}
    *
    * @description
    * A class containing boolean values signifying browser
    * and/or platform compatibilities.
    */
    class Compat implements ICompat {
        /**
        * @name $Window
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {Window}
        *
        * @description
        * The window injectable.
        */
        public $Window: Window;
        /**
        * @name $Document
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {Document}
        *
        * @description
        * The document injectable.
        */
        public $Document: Document;
        /**
        * @name isCompatible
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Determines if the browser is modern enough to correctly
        * run PlatypusTS.
        */
        public isCompatible: boolean;
        /**
        * @name cordova
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether or not Cordova is defined. If it is,
        * we hook up ALM events to Cordova's functions.
        */
        public cordova: boolean;
        /**
        * @name pushState
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether window.history.pushState is defined.
        */
        public pushState: boolean;
        /**
        * @name fileSupported
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether the File API is supported.
        */
        public fileSupported: boolean;
        /**
        * @name amd
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether Require is present. If it is, we assume
        * it is going to be used and leave the loading of the app up
        * to the developer.
        */
        public amd: boolean;
        /**
        * @name msApp
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether we are in the contet of a Windows 8 app.
        */
        public msApp: boolean;
        /**
        * @name indexedDb
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether indexedDB exists on the window.
        */
        public indexedDb: boolean;
        /**
        * @name proto
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether Object.prototype.__proto__ exists.
        */
        public proto: boolean;
        /**
        * @name getProto
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether Object.prototype.getPrototypeOf exists.
        */
        public getProto: boolean;
        /**
        * @name setProto
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether Object.prototype.setPrototypeOf exists.
        */
        public setProto: boolean;
        /**
        * @name hasTouchEvents
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether or not the current browser has touch events
        * like touchstart, touchmove, touchend, etc.
        */
        public hasTouchEvents: boolean;
        /**
        * @name hasPointerEvents
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether or not the current browser has pointer events
        * like pointerdown, MSPointerMove, pointerup, etc.
        */
        public hasPointerEvents: boolean;
        /**
        * @name hasMsPointerEvents
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether or not the current browser has touch events
        * like MSPointerDown, touchmove, MSPointerUp, etc.
        */
        public hasMsPointerEvents: boolean;
        /**
        * @name animationSupported
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether or not the browser supports animations.
        */
        public animationSupported: boolean;
        /**
        * @name platCss
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether the platypus.css file was included or not.
        */
        public platCss: boolean;
        /**
        * @name mappedEvents
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {plat.IMappedEvents}
        *
        * @description
        * An object containing the correctly mapped touch events for the browser.
        */
        public mappedEvents: IMappedEvents;
        /**
        * @name animationEvents
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {plat.IAnimationEvents}
        *
        * @description
        * An object containing the properly prefixed animation events.
        */
        public animationEvents: IAnimationEvents;
        /**
        * @name vendorPrefix
        * @memberof plat.Compat
        * @kind property
        * @access public
        *
        * @type {plat.IVendorPrefix}
        *
        * @description
        * An object containing information regarding any potential vendor prefix.
        */
        public vendorPrefix: IVendorPrefix;
        /**
        * @name constructor
        * @memberof plat.Compat
        * @kind function
        * @access public
        *
        * @description
        * Define everything
        *
        * @returns {void}
        */
        constructor();
        /**
        * @name __defineBooleans
        * @memberof plat.Compat
        * @kind function
        * @access private
        *
        * @description
        * Define booleans
        *
        * @returns {void}
        */
        private __defineBooleans();
        /**
        * @name __defineMappedEvents
        * @memberof plat.Compat
        * @kind function
        * @access private
        *
        * @description
        * Define {@link plat.IMappedEvents|mapped events}
        *
        * @returns {void}
        */
        private __defineMappedEvents();
        /**
        * @name __defineAnimationEvents
        * @memberof plat.Compat
        * @kind function
        * @access private
        *
        * @description
        * Define {@link plat.IAnimationEvents|animation events}
        *
        * @returns {void}
        */
        private __defineAnimationEvents();
        /**
        * @name __determineCss
        * @memberof plat.Compat
        * @kind function
        * @access private
        *
        * @description
        * Determines whether or not platypus css styles exist.
        *
        * @returns {void}
        */
        private __determineCss();
    }
    /**
    * The Type for referencing the '$Compat' injectable as a dependency.
    */
    function ICompat(): ICompat;
    /**
    * @name ICompat
    * @memberof plat
    * @kind interface
    *
    * @description
    * An object containing boolean values signifying browser
    * and/or platform compatibilities.
    */
    interface ICompat {
        /**
        * @name isCompatible
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Determines if the browser is modern enough to correctly
        * run PlatypusTS.
        */
        isCompatible: boolean;
        /**
        * @name cordova
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether or not Cordova is defined. If it is,
        * we hook up ALM events to Cordova's functions.
        */
        cordova: boolean;
        /**
        * @name pushState
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether window.history.pushState is defined.
        */
        pushState: boolean;
        /**
        * @name fileSupported
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether the File API is supported.
        */
        fileSupported: boolean;
        /**
        * @name amd
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether Require is present. If it is, we assume
        * it is going to be used and leave the loading of the app up
        * to the developer.
        */
        amd: boolean;
        /**
        * @name msApp
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether we are in the contet of a Windows 8 app.
        */
        msApp: boolean;
        /**
        * @name indexedDb
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether indexedDB exists on the window.
        */
        indexedDb: boolean;
        /**
        * @name proto
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether Object.prototype.__proto__ exists.
        */
        proto: boolean;
        /**
        * @name getProto
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether Object.prototype.getPrototypeOf exists.
        */
        getProto: boolean;
        /**
        * @name setProto
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Signifies whether Object.prototype.setPrototypeOf exists.
        */
        setProto: boolean;
        /**
        * @name hasTouchEvents
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether or not the current browser has touch events
        * like touchstart, touchmove, touchend, etc.
        */
        hasTouchEvents: boolean;
        /**
        * @name hasPointerEvents
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether or not the current browser has pointer events
        * like pointerdown, MSPointerMove, pointerup, etc.
        */
        hasPointerEvents: boolean;
        /**
        * @name hasMsPointerEvents
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether or not the current browser has touch events
        * like MSPointerDown, touchmove, MSPointerUp, etc.
        */
        hasMsPointerEvents: boolean;
        /**
        * @name animationSupported
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether or not the browser supports animations.
        */
        animationSupported: boolean;
        /**
        * @name platCss
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {boolean}
        *
        * @description
        * Whether the platypus.css file was included or not.
        */
        platCss: boolean;
        /**
        * @name mappedEvents
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {plat.IMappedEvents}
        *
        * @description
        * An object containing the correctly mapped touch events for the browser.
        */
        mappedEvents: IMappedEvents;
        /**
        * @name animationEvents
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {plat.IAnimationEvents}
        *
        * @description
        * An object containing the properly prefixed animation events.
        */
        animationEvents: IAnimationEvents;
        /**
        * @name vendorPrefix
        * @memberof plat.ICompat
        * @kind property
        * @access public
        *
        * @type {plat.IVendorPrefix}
        *
        * @description
        * An object containing information regarding any potential vendor prefix.
        */
        vendorPrefix: IVendorPrefix;
    }
    /**
    * @name IMappedEvents
    * @memberof plat
    * @kind interface
    *
    * @extends {plat.IObject}
    *
    * @description
    * Describes an object containing the correctly mapped touch events for the browser.
    */
    interface IMappedEvents extends IObject<string> {
        /**
        * @name $touchstart
        * @memberof plat.IMappedEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * An event type for touch start.
        */
        $touchstart: string;
        /**
        * @name $touchend
        * @memberof plat.IMappedEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * An event type for touch end.
        */
        $touchend: string;
        /**
        * @name $touchmove
        * @memberof plat.IMappedEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * An event type for touch move.
        */
        $touchmove: string;
        /**
        * @name $touchcancel
        * @memberof plat.IMappedEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * An event type for touch cancel.
        */
        $touchcancel: string;
    }
    /**
    * @name IAnimationEvents
    * @memberof plat
    * @kind interface
    *
    * @extends {plat.IObject}
    *
    * @description
    * Describes an object containing the properly prefixed animation events.
    */
    interface IAnimationEvents extends IObject<string> {
        /**
        * @name $animation
        * @memberof plat.IAnimationEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * The animation identifier.
        */
        $animation: string;
        /**
        * @name $animationStart
        * @memberof plat.IAnimationEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * The animation start event.
        */
        $animationStart: string;
        /**
        * @name $animationEnd
        * @memberof plat.IAnimationEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * The animation end event.
        */
        $animationEnd: string;
        /**
        * @name $transition
        * @memberof plat.IAnimationEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * The transition identifier.
        */
        $transition: string;
        /**
        * @name $transitionStart
        * @memberof plat.IAnimationEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * The transition start event.
        */
        $transitionStart: string;
        /**
        * @name $transitionEnd
        * @memberof plat.IAnimationEvents
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * The transition end event.
        */
        $transitionEnd: string;
    }
    /**
    * @name IVendorPrefix
    * @memberof plat
    * @kind interface
    *
    * @extends {plat.IObject}
    *
    * @description
    * Describes an object that contains information regarding the browser's
    * vendor prefix.
    */
    interface IVendorPrefix extends IObject<string> {
        /**
        * @name lowerCase
        * @memberof plat.IVendorPrefix
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * The lowercase representation of the browser's vendor prefix.
        */
        lowerCase: string;
        /**
        * @name css
        * @memberof plat.IVendorPrefix
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * The css representation of the browser's vendor prefix
        * denoted by -{prefix}-.
        */
        css: string;
        /**
        * @name js
        * @memberof plat.IVendorPrefix
        * @kind property
        * @access public
        *
        * @type {string}
        *
        * @description
        * The JavaScript representation of the browser's vendor prefix
        * denoted by it beginning with a capital letter.
        */
        js: string;
    }
    /**
    * @name Utils
    * @memberof plat
    * @kind class
    *
    * @implements {plat.IUtils}
    *
    * @description
    * An extensible class defining common utilities and helper functions.
    */
    class Utils implements IUtils {
        /**
        * @name noop
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * An empty method for quickly creating dummy objects.
        *
        * @returns {void}
        */
        public noop(): void;
        /**
        * @name extend
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Allows you to extend the properties of an object with any number
        * of other objects. If objects share properties, the last object in the
        * arguments will take precedence. This method is only a shallow copy of
        * all the source objects to the destination object.
        *
        * @param {any} destination The destination object to extend.
        * @param {Array<any>} ...sources Any number of objects with which to extend the
        * destination object.
        *
        * @returns {any} The extended destination object.
        */
        public extend(destination: any, ...sources: any[]): any;
        /**
        * @name deepExtend
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Allows you to extend the properties of an object with any number
        * of other objects. If objects share properties, the last object in the
        * arguments will take precedence. This method is a deep copy of
        * all the source objects to the destination object.
        *
        * @param {any} destination The destination object to extend.
        * @param {Array<any>} ...sources Any number of objects with which to extend the
        * destination object.
        *
        * @returns {any} The extended destination object.
        */
        public deepExtend(destination: any, ...sources: any[]): any;
        /**
        * @name clone
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Creates a copy of the passed-in object. If deep is true it will
        * be a deep copy (duplicate), else nested objects/arrays will be copied by reference
        * and not duplicated.
        *
        * @typeparam {any} T The type of object being cloned.
        *
        * @param {T} obj The object to clone.
        * @param {boolean} deep? Whether or not it is a deep clone.
        *
        * @returns {T} The cloned object.
        */
        public clone<T>(obj: T, deep?: boolean): T;
        /**
        * @name isObject
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a type of Object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is an object, false otherwise.
        */
        public isObject(obj: any): boolean;
        /**
        * @name isWindow
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a window object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is the window, false otherwise.
        */
        public isWindow(obj: any): boolean;
        /**
        * @name isDocument
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a document object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is the document, false otherwise.
        */
        public isDocument(obj: any): boolean;
        /**
        * @name isNode
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a Node.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a Node, false otherwise.
        */
        public isNode(obj: any): boolean;
        /**
        * @name isDocumentFragment
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a DocumentFragment.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a DocumentFragment, false otherwise.
        */
        public isDocumentFragment(obj: any): boolean;
        /**
        * @name isString
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a string.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a string, false otherwise.
        */
        public isString(obj: any): boolean;
        /**
        * @name isRegExp
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a RegExp object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a RegExp object, false otherwise.
        */
        public isRegExp(obj: any): boolean;
        /**
        * @name isPromise
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a Promise object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a Promise object, false otherwise.
        */
        public isPromise(obj: any): boolean;
        /**
        * @name isEmpty
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is empty. Useful for
        * checking for empty strings, arrays, or objects without keys.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if the object isEmpty (or null/undefined),
        * false otherwise.
        */
        public isEmpty(obj: any): boolean;
        /**
        * @name isBoolean
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a boolean.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a boolean, false otherwise.
        */
        public isBoolean(obj: any): boolean;
        /**
        * @name isNumber
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a number.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a number, false otherwise.
        */
        public isNumber(obj: any): boolean;
        /**
        * @name isFunction
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a function.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a function, false otherwise.
        */
        public isFunction(obj: any): boolean;
        /**
        * @name isNull
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is null or undefined.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is null or undefined, false otherwise.
        */
        public isNull(obj: any): boolean;
        /**
        * @name isUndefined
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is undefined.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is undefined, false otherwise.
        */
        public isUndefined(obj: any): boolean;
        /**
        * @name isArray
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is an Array.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is an Array, false otherwise.
        */
        public isArray(obj: any): boolean;
        /**
        * @name isArrayLike
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it has array-like qualities.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj has array-like qualities (i.e. it is an
        * Array, string, arguments, or NodeList), false otherwise.
        */
        public isArrayLike(obj: any): boolean;
        /**
        * @name isDate
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a Date object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a Date object, false otherwise.
        */
        public isDate(obj: any): boolean;
        /**
        * @name filter
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in an array and a function to evaluate the properties in the array.
        * Returns a filtered array of objects resulting from evaluating the function.
        *
        * @typeparam {any} T The type of objects contained in the Array being filtered.
        *
        * @param {Array<T>} array The Array to filter.
        * @param {(value: T, index: number, obj: any) => boolean} iterator The iterator function to call with array's properties.
        * Returns true if the property should be kept, false otherwise.
        * @param {any} context? Optional context with which to call the iterator.
        *
        * @returns {Array<T>} An array of objects which evaluated to true with the iterator.
        */
        public filter<T>(array: T[], iterator: (value: T, index: number, obj: any) => boolean, context?: any): T[];
        /**
        * @name filter
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in an object/array and a function to evaluate the properties in the object/array.
        * Returns a filtered array of objects resulting from evaluating the function.
        *
        * @typeparam {any} T The type of objects contained in the Object/Array being filtered.
        *
        * @param {any} obj The object to filter.
        * @param {(value: T, index: number, obj: any) => boolean} iterator The iterator function to call with array's properties.
        * Returns true if the property should be kept, false otherwise.
        * @param {any} context? Optional context with which to call the iterator.
        *
        * @returns {Array<T>} An array of objects which evaluated to true with the iterator.
        */
        public filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): T[];
        /**
        * @name where
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in a list and object containing key/value pairs to search for in the list.
        *
        * @typeparam {any} T The type of objects contained in the input Array.
        *
        * @param {Array<T>} array The list used for searching for properties.
        * @param {any} properties An object containing key/value pairs to match with obj's values.
        *
        * @returns {Array<T>} The matched values in obj.
        */
        public where<T>(array: T[], properties: any): T[];
        /**
        * @name where
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in a list and object containing key/value pairs to search for in the list.
        *
        * @typeparam {any} T The type of objects contained in the input Object.
        *
        * @param {any} obj The object used for searching for properties.
        * @param {any} properties An object containing key/value pairs to match with obj's values.
        *
        * @returns {Array<T>} The matched values in obj.
        */
        public where<T>(obj: any, properties: any): T[];
        /**
        * @name forEach
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in an Array and a function to iterate over. Calls the iterator function with every property
        * in the Array, then returns the object.
        *
        * @typeparam {any} T The type of objects contained in the input Array.
        *
        * @param {Array<T>} array An Array.
        * @param {(value: T, index: number, obj: any) => void} iterator A method that takes in a value, index, and the object.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {Array<T>} The array.
        */
        public forEach<T>(array: T[], iterator: (value: T, index: number, obj: any) => void, context?: any): T[];
        /**
        * @name forEach
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in an Array and a function to iterate over. Calls the iterator function with every property
        * in the Array, then returns the object.
        *
        * @typeparam {any} T The type of objects contained in the input Object.
        *
        * @param {any} obj An object.
        * @param {(value: T, index: number, obj: any) => void} iterator A method that takes in a value, index, and the object.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {any} The input Object.
        */
        public forEach<T>(obj: any, iterator: (value: T, key: string, obj: any) => void, context?: any): any;
        /**
        * @name map
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
        * iterator can transform the object and return it. The returned values will be pushed to an Array and
        * returned.
        *
        * @typeparam {any} T The type of objects contained in the input Array.
        * @typeparam {any} U The type of objects contained in the transformed output Array.
        *
        * @param {Array<T>} array An Array.
        * @param {(value: T, index: number, obj: any) => U} iterator The transformation function.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {Array<U>} The accumulated transformed values from the iterator.
        */
        public map<T, U>(array: T[], iterator: (value: T, index: number, obj: any) => U, context?: any): U[];
        /**
        * @name map
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
        * iterator can transform the object and return it. The returned values will be pushed to an Array and
        * returned.
        *
        * @typeparam {any} T The type of objects contained in the input Object/Array.
        * @typeparam {any} U The type of objects contained in the transformed output Array.
        *
        * @param {Array<T>} obj An Object.
        * @param {(value: T, index: number, obj: any) => U} iterator The transformation function.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {Array<U>} The accumulated transformed values from the iterator.
        */
        public map<T, U>(obj: any, iterator: (value: T, key: string, obj: any) => U, context?: any): U[];
        /**
        * @name pluck
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in an object and a property to extract from all of the object's values. Returns an array of
        * the 'plucked' values.
        *
        * @typeparam {any} T The type of objects contained in the input Object/Array.
        * @typeparam {any} U The type of objects contained in the transformed output Array.
        *
        * @param {any} obj An object.
        * @param {string} key The property to 'pluck' from each value in obj.
        *
        * @returns {Array<U>} An array of 'plucked' values from obj.
        */
        public pluck<T, U>(obj: any, key: string): U[];
        /**
        * @name some
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
        * Returns true if any of the iterators return true, otherwise returns false.
        *
        * @typeparam {any} T The type of objects contained in the input Array.
        *
        * @param {Array<T>} array An array.
        * @param {(value: T, index: number, obj: any) => boolean} iterator A method with which to evaluate all the values in obj.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {boolean} True if any calls to iterator return true, false otherwise.
        */
        public some<T>(array: T[], iterator: (value: T, index: number, obj: any) => boolean, context?: any): boolean;
        /**
        * @name some
        * @memberof plat.Utils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
        * Returns true if any of the iterators return true, otherwise returns false.
        *
        * @typeparam {any} T The type of objects contained in the input Object/Array.
        *
        * @param {Array<T>} obj An object.
        * @param {(value: T, index: number, obj: any) => boolean} iterator A method with which to evaluate all the values in obj.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {boolean} True if any calls to iterator return true, false otherwise.
        */
        public some<T>(obj: any, iterator: (value: T, key: string, obj: any) => boolean, context?: any): boolean;
        /**
        * @name postpone
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in a method and array of arguments to pass to that method. Delays calling the method until
        * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
        *
        * @param {(...args: Array<any>) => void} method The method to call.
        * @param {Array<any>} args? The arguments to apply to the method.
        * @param {any} context? An optional context to bind to the method.
        *
        * @returns {plat.IRemoveListener} A function that will clear the timeout when called.
        */
        public postpone(method: (...args: any[]) => void, args?: any[], context?: any): IRemoveListener;
        /**
        * @name defer
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in a method and array of arguments to pass to that method. Delays calling the method until
        * after the current call stack is clear. Equivalent to a setTimeout with the specified timeout value.
        *
        * @param {(...args: Array<any>) => void} method The method to call.
        * @param {number} timeout The time (in milliseconds) to delay before calling the provided method
        * @param {Array<any>} args? The arguments to apply to the method.
        * @param {any} context? An optional context to bind to the method.
        *
        * @returns {plat.IRemoveListener} A function that will clear the timeout when called.
        */
        public defer(method: (...args: any[]) => void, timeout: number, args?: any[], context?: any): IRemoveListener;
        /**
        * @name uniqueId
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in a prefix and returns a unique identifier string with the prefix preprended. If no prefix
        * is specified, none will be prepended.
        *
        * @param {string} prefix? A string prefix to prepend tothe unique ID.
        *
        * @returns {string} The prefix-prepended unique ID.
        */
        public uniqueId(prefix?: string): string;
        /**
        * @name camelCase
        * @memberof plat.Utils
        * @kind function
        * @access public
        *
        * @description
        * Takes in a spinal-case, dot.case, or snake_case string and returns
        * a camelCase string. Also can turn a string into camelCase with space
        * as a delimeter.
        *
        * @param {string} str The spinal-case, dot.case, or snake_case string.
        *
        * @returns {string} The camelCase string.
        */
        public camelCase(str: string): string;
    }
    /**
    * The Type for referencing the '$Utils' injectable as a dependency.
    */
    function IUtils(): IUtils;
    /**
    * @name IUtils
    * @memberof plat
    * @kind interface
    *
    * @description
    * An object defining common utilities and helper functions.
    */
    interface IUtils {
        /**
        * @name noop
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * An empty method for quickly creating dummy objects.
        *
        * @returns {void}
        */
        noop(): void;
        /**
        * @name extend
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Allows you to extend the properties of an object with any number
        * of other objects. If objects share properties, the last object in the
        * arguments will take precedence. This method is only a shallow copy of
        * all the source objects to the destination object.
        *
        * @param {any} destination The destination object to extend.
        * @param {Array<any>} ...sources Any number of objects with which to extend the
        * destination object.
        *
        * @returns {any} The extended destination object.
        */
        extend(destination: any, ...sources: any[]): any;
        /**
        * @name deepExtend
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Allows you to extend the properties of an object with any number
        * of other objects. If objects share properties, the last object in the
        * arguments will take precedence. This method is a deep copy of
        * all the source objects to the destination object.
        *
        * @param {any} destination The destination object to extend.
        * @param {Array<any>} ...sources Any number of objects with which to extend the
        * destination object.
        *
        * @returns {any} The extended destination object.
        */
        deepExtend(destination: any, ...sources: any[]): any;
        /**
        * @name clone
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Creates a copy of the passed-in object. If deep is true it will
        * be a deep copy (duplicate), else nested objects/arrays will be copied by reference
        * and not duplicated.
        *
        * @typeparam {any} T The type of object being cloned.
        *
        * @param {T} obj The object to clone.
        * @param {boolean} deep? Whether or not it is a deep clone.
        *
        * @returns {T} The cloned object.
        */
        clone<T>(obj: T, deep?: boolean): T;
        /**
        * @name isObject
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a type of Object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is an object, false otherwise.
        */
        isObject(obj: any): boolean;
        /**
        * @name isWindow
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a window object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is the window, false otherwise.
        */
        isWindow(obj: any): boolean;
        /**
        * @name isDocument
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a document object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is the document, false otherwise.
        */
        isDocument(obj: any): boolean;
        /**
        * @name isNode
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a Node.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a Node, false otherwise.
        */
        isNode(obj: any): boolean;
        /**
        * @name isDocumentFragment
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a DocumentFragment.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a DocumentFragment, false otherwise.
        */
        isDocumentFragment(obj: any): boolean;
        /**
        * @name isString
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a string.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a string, false otherwise.
        */
        isString(obj: any): boolean;
        /**
        * @name isRegExp
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a RegExp object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a RegExp object, false otherwise.
        */
        isRegExp(obj: any): boolean;
        /**
        * @name isPromise
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a Promise object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a Promise object, false otherwise.
        */
        isPromise(obj: any): boolean;
        /**
        * @name isEmpty
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is empty. Useful for
        * checking for empty strings, arrays, or objects without keys.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if the object isEmpty (or null/undefined),
        * false otherwise.
        */
        isEmpty(obj: any): boolean;
        /**
        * @name isBoolean
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a boolean.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a boolean, false otherwise.
        */
        isBoolean(obj: any): boolean;
        /**
        * @name isNumber
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a number.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a number, false otherwise.
        */
        isNumber(obj: any): boolean;
        /**
        * @name isFunction
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a function.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a function, false otherwise.
        */
        isFunction(obj: any): boolean;
        /**
        * @name isNull
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is null or undefined.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is null or undefined, false otherwise.
        */
        isNull(obj: any): boolean;
        /**
        * @name isUndefined
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is undefined.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is undefined, false otherwise.
        */
        isUndefined(obj: any): boolean;
        /**
        * @name isArray
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is an Array.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is an Array, false otherwise.
        */
        isArray(obj: any): boolean;
        /**
        * @name isArrayLike
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it has array-like qualities.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj has array-like qualities (i.e. it is an
        * Array, string, arguments, or NodeList), false otherwise.
        */
        isArrayLike(obj: any): boolean;
        /**
        * @name isDate
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in anything and determines if it is a Date object.
        *
        * @param {any} obj Anything.
        *
        * @returns {boolean} True if obj is a Date object, false otherwise.
        */
        isDate(obj: any): boolean;
        /**
        * @name filter
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in an array and a function to evaluate the properties in the array.
        * Returns a filtered array of objects resulting from evaluating the function.
        *
        * @typeparam {any} T The type of objects contained in the Array being filtered.
        *
        * @param {Array<T>} array The Array to filter.
        * @param {(value: T, index: number, obj: any) => boolean} iterator The iterator function to call with array's properties.
        * Returns true if the property should be kept, false otherwise.
        * @param {any} context? Optional context with which to call the iterator.
        *
        * @returns {Array<T>} An array of objects which evaluated to true with the iterator.
        */
        filter<T>(array: T[], iterator: (value: T, index: number, obj: any) => boolean, context?: any): T[];
        /**
        * @name filter
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in an object/array and a function to evaluate the properties in the object/array.
        * Returns a filtered array of objects resulting from evaluating the function.
        *
        * @typeparam {any} T The type of objects contained in the Object/Array being filtered.
        *
        * @param {any} obj The object to filter.
        * @param {(value: T, index: number, obj: any) => boolean} iterator The iterator function to call with array's properties.
        * Returns true if the property should be kept, false otherwise.
        * @param {any} context? Optional context with which to call the iterator.
        *
        * @returns {Array<T>} An array of objects which evaluated to true with the iterator.
        */
        filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): T[];
        /**
        * @name where
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in a list and object containing key/value pairs to search for in the list.
        *
        * @typeparam {any} T The type of objects contained in the input Array.
        *
        * @param {Array<T>} array The list used for searching for properties.
        * @param {any} properties An object containing key/value pairs to match with obj's values.
        *
        * @returns {Array<T>} The matched values in obj.
        */
        where<T>(array: T[], properties: any): T[];
        /**
        * @name where
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in a list and object containing key/value pairs to search for in the list.
        *
        * @typeparam {any} T The type of objects contained in the input Object.
        *
        * @param {any} obj The object used for searching for properties.
        * @param {any} properties An object containing key/value pairs to match with obj's values.
        *
        * @returns {Array<T>} The matched values in obj.
        */
        where<T>(obj: any, properties: any): T[];
        /**
        * @name forEach
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in an Array and a function to iterate over. Calls the iterator function with every property
        * in the Array, then returns the object.
        *
        * @typeparam {any} T The type of objects contained in the input Array.
        *
        * @param {Array<T>} array An Array.
        * @param {(value: T, index: number, obj: any) => void} iterator A method that takes in a value, index, and the object.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {Array<T>} The array.
        */
        forEach<T>(array: T[], iterator: (value: T, index: number, obj: any) => void, context?: any): T[];
        /**
        * @name forEach
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in an Array and a function to iterate over. Calls the iterator function with every property
        * in the Array, then returns the object.
        *
        * @typeparam {any} T The type of objects contained in the input Object.
        *
        * @param {any} obj An object.
        * @param {(value: T, index: number, obj: any) => void} iterator A method that takes in a value, index, and the object.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {any} The input Object.
        */
        forEach<T>(obj: any, iterator: (value: T, key: string, obj: any) => void, context?: any): any;
        /**
        * @name map
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
        * iterator can transform the object and return it. The returned values will be pushed to an Array and
        * returned.
        *
        * @typeparam {any} T The type of objects contained in the input Array.
        * @typeparam {any} U The type of objects contained in the transformed output Array.
        *
        * @param {Array<T>} array An Array.
        * @param {(value: T, index: number, obj: any) => U} iterator The transformation function.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {Array<U>} The accumulated transformed values from the iterator.
        */
        map<T, U>(array: T[], iterator: (value: T, index: number, obj: any) => U, context?: any): U[];
        /**
        * @name map
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
        * iterator can transform the object and return it. The returned values will be pushed to an Array and
        * returned.
        *
        * @typeparam {any} T The type of objects contained in the input Object/Array.
        * @typeparam {any} U The type of objects contained in the transformed output Array.
        *
        * @param {Array<T>} obj An Object.
        * @param {(value: T, index: number, obj: any) => U} iterator The transformation function.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {Array<U>} The accumulated transformed values from the iterator.
        */
        map<T, U>(obj: any, iterator: (value: T, key: string, obj: any) => U, context?: any): U[];
        /**
        * @name pluck
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in an object and a property to extract from all of the object's values. Returns an array of
        * the 'plucked' values.
        *
        * @typeparam {any} T The type of objects contained in the input Object/Array.
        * @typeparam {any} U The type of objects contained in the transformed output Array.
        *
        * @param {any} obj An object.
        * @param {string} key The property to 'pluck' from each value in obj.
        *
        * @returns {Array<U>} An array of 'plucked' values from obj.
        */
        pluck<T, U>(obj: any, key: string): U[];
        /**
        * @name some
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
        * Returns true if any of the iterators return true, otherwise returns false.
        *
        * @typeparam {any} T The type of objects contained in the input Array.
        *
        * @param {Array<T>} array An array.
        * @param {(value: T, index: number, obj: any) => boolean} iterator A method with which to evaluate all the values in obj.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {boolean} True if any calls to iterator return true, false otherwise.
        */
        some<T>(array: T[], iterator: (value: T, index: number, obj: any) => boolean, context?: any): boolean;
        /**
        * @name some
        * @memberof plat.IUtils
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
        * Returns true if any of the iterators return true, otherwise returns false.
        *
        * @typeparam {any} T The type of objects contained in the input Object/Array.
        *
        * @param {Array<T>} obj An object.
        * @param {(value: T, index: number, obj: any) => boolean} iterator A method with which to evaluate all the values in obj.
        * @param {any} context? An optional context to bind to the iterator.
        *
        * @returns {boolean} True if any calls to iterator return true, false otherwise.
        */
        some<T>(obj: any, iterator: (value: T, key: string, obj: any) => boolean, context?: any): boolean;
        /**
        * @name postpone
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in a method and array of arguments to pass to that method. Delays calling the method until
        * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
        *
        * @param {(...args: Array<any>) => void} method The method to call.
        * @param {Array<any>} args? The arguments to apply to the method.
        * @param {any} context? An optional context to bind to the method.
        *
        * @returns {plat.IRemoveListener} A function that will clear the timeout when called.
        */
        postpone(method: (...args: any[]) => void, args?: any[], context?: any): IRemoveListener;
        /**
        * @name defer
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in a method and array of arguments to pass to that method. Delays calling the method until
        * after the current call stack is clear. Equivalent to a setTimeout with the specified timeout value.
        *
        * @param {(...args: Array<any>) => void} method The method to call.
        * @param {number} timeout The time (in milliseconds) to delay before calling the provided method
        * @param {Array<any>} args? The arguments to apply to the method.
        * @param {any} context? An optional context to bind to the method.
        *
        * @returns {plat.IRemoveListener} A function that will clear the timeout when called.
        */
        defer(method: (...args: any[]) => void, timeout: number, args?: any[], context?: any): IRemoveListener;
        /**
        * @name uniqueId
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in a prefix and returns a unique identifier string with the prefix preprended. If no prefix
        * is specified, none will be prepended.
        *
        * @param {string} prefix? A string prefix to prepend tothe unique ID.
        *
        * @returns {string} The prefix-prepended unique ID.
        */
        uniqueId(prefix?: string): string;
        /**
        * @name camelCase
        * @memberof plat.IUtils
        * @kind function
        * @access public
        *
        * @description
        * Takes in a spinal-case, dot.case, or snake_case string and returns
        * a camelCase string. Also can turn a string into camelCase with space
        * as a delimeter.
        *
        * @param {string} str The spinal-case, dot.case, or snake_case string.
        *
        * @returns {string} The camelCase string.
        */
        camelCase(str: string): string;
    }
    /**
    * @name IIterator
    * @memberof plat
    * @kind interface
    *
    * @description
    * The Type for a {@link plat.Utils|Utils} iterator callback method.
    *
    * @typeparam {any} T The value type used in the iterator callback.
    * @typeparam {any} U The return type of the iterator callback.
    */
    interface IIterator<T, U> {
        /**
        * @memberof plat.IIterator
        * @kind function
        * @access public
        * @static
        *
        * @description
        * A method signature for {@link plat.IIterator|IIterator}.
        *
        * @param {T} value The value for an object during an iteration.
        * @param {number} index The index where the value can be found.
        * @param {any} obj The object passed into the util method.
        *
        * @returns {U} The returned value.
        */
        (value: T, index: number, obj: any): U;
        /**
        * @memberof plat.IIterator
        * @kind function
        * @access public
        * @static
        *
        * @description
        * A method signature for {@link plat.IIterator|IIterator}.
        *
        * @param {T} value The value for an object during an iteration.
        * @param {string} key The key where the value can be found.
        * @param {any} obj The object passed into the util method.
        *
        * @returns {U} The returned value.
        */
        (value: T, key: string, obj: any): U;
    }
    /**
    * The Type for referencing the '$Window' injectable as a dependency.
    * Used so that the Window can be mocked.
    */
    function Window(): Window;
    /**
    * The Type for referencing the '$Document' injectable as a dependency.
    * Used so that the Window can be mocked.
    */
    function Document($Window?: Window): Document;
    module expressions {
        /**
        * A class for keeping track of commonly used regular expressions.
        */
        class Regex implements IRegex {
            public markupRegex: RegExp;
            public argumentRegex: RegExp;
            public aliasRegex: RegExp;
            public initialUrlRegex: RegExp;
            public protocolRegex: RegExp;
            public invalidVariableRegex: RegExp;
            public fileNameRegex: RegExp;
            public shiftedKeyRegex: RegExp;
            public newLineRegex : RegExp;
            public optionalRouteRegex : RegExp;
            public namedParameterRouteRegex : RegExp;
            public wildcardRouteRegex : RegExp;
            public escapeRouteRegex : RegExp;
            public camelCaseRegex : RegExp;
            public whiteSpaceRegex : RegExp;
            public quotationRegex : RegExp;
            /**
            * Creates the markup regular expression
            */
            constructor();
        }
        /**
        * The Type for referencing the '$Regex' injectable as a dependency.
        */
        function IRegex(): IRegex;
        /**
        * An object containing commonly used regular expressions.
        */
        interface IRegex {
            /**
            * The regular expression for matching or removing all newline characters.
            */
            newLineRegex: RegExp;
            /**
            * The regular expression for finding markup in a string.
            */
            markupRegex: RegExp;
            /**
            * Finds the arguments in a method expression
            *
            * @example
            *   // outputs ["('foo', 'bar', 'baz')", "'foo', 'bar', 'baz'"]
            *   exec("myFunction('foo', 'bar', 'baz')");
            */
            argumentRegex: RegExp;
            /**
            * Given a string, finds the root alias name if that string is an
            * alias path.
            *
            * @example
            *   // outputs ['context']
            *   exec('@context.foo');
            *
            * @example
            *   // outputs null
            *   exec('@context');
            */
            aliasRegex: RegExp;
            /**
            * Finds optional parameters in a route string.
            *
            * @example
            *   // outputs ['(/foo)', '/foo']
            *   exec('(/foo)/bar');
            *
            * @example
            *  // outputs ['(/foo)', '/foo']
            *  exec('(/foo))');
            */
            optionalRouteRegex: RegExp;
            /**
            * Finds named parameters in a route string.
            *
            * @example
            *   // outputs [':foo']
            *   exec('/:foo/bar')
            *
            *   // outputs [':foo']
            *   exec('(/:foo)/bar');
            */
            namedParameterRouteRegex: RegExp;
            /**
            * Finds an alphanumeric wildcard match in a route string.
            *
            * @example
            *   // outputs ['*bar']
            *   exec('/foo/*bar/baz')
            */
            wildcardRouteRegex: RegExp;
            /**
            * Finds invalid characters in a route string.
            *
            * @example
            *  // outputs ['?']
            *  exec('/foo/bar?query=baz');
            */
            escapeRouteRegex: RegExp;
            /**
            * Finds '/*.html' or '/*.htm' in a url. Useful for removing
            * the html file out of the url.
            *
            * @example
            *   // outputs ['/index.html']
            *   exec('http://localhost:8080/index.html');
            */
            initialUrlRegex: RegExp;
            /**
            * Finds a protocol delimeter in a string (e.g. ://)
            */
            protocolRegex: RegExp;
            /**
            * Finds delimeters for spinal-case, snake_case, and dot.case.
            * useful for converting to camelCase. Also can turn a string
            * into camelCase with space as a delimeter.
            *
            * @example
            *   // outputs ['-o', '-', 'o']
            *   exec('plat-options')
            *
            * @example
            *   // outputs ['.c', '.', 'c']
            *   exec('plat.config')
            *
            * @example
            *   // outputs ['_v', '_', 'v']
            *   exec('plat_var')
            *
            * @example
            *   // outputs [' W', ' ', 'W']
            *   exec('Hello World')
            */
            camelCaseRegex: RegExp;
            /**
            * Finds all whitespace and newline characters
            * not in string literals. Needs to be combined
            * with string replace function using $1 argument.
            */
            whiteSpaceRegex: RegExp;
            /**
            * Finds all single and double quotes.
            */
            quotationRegex: RegExp;
            /**
            * Looks for any invalid variable syntax.
            */
            invalidVariableRegex: RegExp;
            /**
            * Grabs the file name from a file path.
            */
            fileNameRegex: RegExp;
            shiftedKeyRegex: RegExp;
        }
        /**
        * Responsible for taking a javascript expression string and
        * finding all its tokens (i.e. delimiters, operators, etc).
        */
        class Tokenizer implements ITokenizer {
            /**
            * The input string to tokenize.
            */
            public _input: string;
            private __previousChar;
            private __variableRegex;
            private __outputQueue;
            private __operatorStack;
            private __argCount;
            private __objArgCount;
            private __lastColonChar;
            private __lastCommaChar;
            public createTokens(input: string): IToken[];
            private __handleAplhaNumeric(index, char);
            private __handlePeriod(index, char);
            private __handleLeftBrace(char);
            private __handleRightBrace(char);
            private __handleLeftBracket(char);
            private __handleRightBracket(char);
            private __handleLeftParenthesis(char);
            private __handleRightParenthesis(char);
            private __handleComma(char);
            private __handleStringLiteral(index, char);
            private __handleQuestion(char);
            private __handleColon(char, ternary);
            private __handleOtherOperator(index, char);
            private __popRemainingOperators();
            private __determineOperator(operator);
            private __determinePrecedence(operator);
            private __removeFnFromStack(argCount);
            /**
            * Determines character type
            *
            * @param char The character to check
            * @param isNumberLike Whether or not the character resembles a number
            */
            public _checkType(char: string, isNumberLike: boolean): boolean;
            /**
            * Looks ahead in the expression to group similar character types.
            *
            * @param index The current index in the expression string
            * @param isNumberLike Whether or not the character resembles a number
            * @param array A temporary array used to aggregate similar character types.
            * @returns {number} The new index in the expression string
            */
            public _lookAhead(index: number, isNumberLike: boolean, array: string[]): number;
            /**
            * Looks ahead in the expression to try and complete the
            * current operator.
            *
            * @param char The operator to find
            * @param index The current index in the expression string
            */
            public _lookAheadForOperatorFn(char: string, index: number): ILookAheadResult;
            /**
            * Looks ahead in the expression until it comes to the ending
            * character to try and complete a particular sequence
            * (e.g. - a string literal).
            *
            * @param char The starting character
            * @param endChar The ending character
            * @param index The current index in the expression string
            * @param includeDelimiter Whether or not to include the delimiter
            * in the result
            */
            public _lookAheadForDelimiter(char: string, endChar: string, index: number, includeDelimiter?: boolean): ILookAheadResult;
            /**
            * Pops the operator stack onto the output queue until a particular
            * operator value is reached.
            *
            * @param topOperator The top of the operator stack
            * @param char The operator value being searched for
            * @param error The error to throw in the case that the expression
            * is invalid.
            */
            public _popStackForVal(topOperator: any, char: string, error: string): void;
            /**
            * Check if the 'val' property is equal to a particular character.
            *
            * @param obj The obj whose 'val' property to compare
            * @param char The char to compare with
            */
            public _isValEqual(obj: any, char: string): boolean;
            /**
            * Check if the 'val' property is not equal to a particular character.
            *
            * @param obj The obj whose 'val' property to compare
            * @param char The char to compare with
            */
            public _isValUnequal(obj: any, char: string): boolean;
            /**
            * Reset the tokenizer's properties.
            */
            public _resetTokenizer(): void;
            /**
            * Throw an exception in the case of an error.
            *
            * @param error The error message to throw
            */
            public _throwError(error: string): void;
            /**
            * Checks if a single character is numeric.
            *
            * @param char The character to check.
            */
            public _isNumeric(char: string): boolean;
            /**
            * Checks if a single character is a space.
            *
            * @param char The character to check.
            */
            public _isSpace(char: string): boolean;
            /**
            * Checks if a single character is an alphabetical
            * type character.
            *
            * @param char The character to check.
            */
            public _isAlpha(char: string): boolean;
            /**
            * Checks if a single character is alphanumeric.
            *
            * @param char The character to check.
            */
            public _isAlphaNumeric(char: string): boolean;
            /**
            * Checks if a string has proper javascript variable syntax.
            *
            * @param input The string to check.
            */
            public _isStringValidVariable(input: string): boolean;
        }
        /**
        * The Type for referencing the '$Tokenizer' injectable as a dependency.
        */
        function ITokenizer(): ITokenizer;
        /**
        * Describes an object used to find tokens for an expression and create ITokens.
        */
        interface ITokenizer {
            /**
            * Takes in an expression string and outputs ITokens.
            *
            * @param input The expression string to tokenize.
            */
            createTokens(input: string): IToken[];
        }
        /**
        * Describes a token in an expression.
        */
        interface IToken {
            /**
            * The string or number value of the token.
            */
            val: any;
            /**
            * Denotes the type of token, as well as the number
            * of arguments for a function if it is the token.
            *
            * If -2: Denotes a function name unless indexed into with [].
            * If -1: Denotes a variable or empty array literal.
            * If 0: Denotes a number, keyword, object indexer (.[]), string literal,
            *  function with 0 arguments, ternary expression, or empty object literal
            * If 1: Denotes a function type with 1 argument, a property on an object literal,
            *  an object literal with 1 property, or an array literal with 1 entry.
            * If > 1: Denotes a function type with args arguments, an object literal with
            *  args properties, or an array literal with args entries.
            */
            args: number;
        }
        /**
        * Provides all the necessary details on how to evaluate a token.
        */
        interface ITokenDetails {
            /**
            * The precedence that this token takes with respect to the
            * evaluation order.
            */
            precedence: number;
            /**
            * Whether or not the token associates with the expression on
            * their left or right.
            */
            associativity: string;
            /**
            * A function used to evaluate an operator expression.
            */
            fn: Function;
        }
        /**
        * An object describing the result of looking ahead in the expression.
        */
        interface ILookAheadResult {
            /**
            * The resultant string after after looking ahead
            */
            char: string;
            /**
            * The new current index in the expression string
            */
            index: number;
        }
        /**
        * Parses javascript expression strings and creates IParsedExpressions.
        */
        class Parser implements IParser {
            public $Tokenizer: ITokenizer;
            /**
            * A single expression's token representation created by the Tokenizer.
            */
            public _tokens: IToken[];
            private __cache;
            private __codeArray;
            private __identifiers;
            private __tempIdentifiers;
            private __aliases;
            private __uniqueAliases;
            public parse(input: string): IParsedExpression;
            /**
            * Evaluate the current token array.
            *
            * @param input The input string to evaluate.
            */
            public _evaluate(input: string): IParsedExpression;
            private __convertPrimitive(index, token, args);
            private __convertFunction(index, token, useLocalContext);
            private __convertObject(args);
            private __convertArrayLiteral(args);
            private __handleFunction(index, args, useLocalContext);
            private __indexIntoObject(index, useLocalContext);
            private __handleQuestion();
            private __handleColon();
            private __handleOperator(token, args);
            private __findInitialContext(context, aliases, token, undefined?);
            private __indexIntoContext(context, token, undefined?);
            /**
            * Peek at the next token.
            *
            * @param index The current index.
            */
            public _peek(index: number): IToken;
            /**
            * Evaluate and remove the leftover identifiers.
            */
            public _popRemainingIdentifiers(): void;
            /**
            * Remove duplicate identifiers.
            */
            public _makeIdentifiersUnique(): void;
            /**
            * Check if the 'val' property is equal to a particular character.
            *
            * @param obj The obj whose 'val' property to compare
            * @param char The char to compare with
            */
            public _isValEqual(obj: any, char: string): boolean;
            /**
            * Check if the 'val' property is not equal to a particular character.
            *
            * @param obj The obj whose 'val' property to compare
            * @param char The char to compare with
            */
            public _isValUnequal(obj: any, char: string): boolean;
            /**
            * Reset the parser's properties.
            */
            public _resetParser(): void;
            /**
            * Throw an exception in the case of an error.
            *
            * @param error The error message to throw
            */
            public _throwError(error: string): void;
        }
        /**
        * The Type for referencing the '$Parser' injectable as a dependency.
        */
        function IParser(): IParser;
        /**
        * Describes an object that can parse an expression string and turn it into an
        * IParsedExpression. The intended external interface for the '$Parser'
        * injectable.
        */
        interface IParser {
            /**
            * Takes in an expression string and outputs an IParsedExpression.
            *
            * @param input An expression string to parse.
            */
            parse(expression: string): IParsedExpression;
        }
        /**
        * Describes an object that is the result of parsing an expression string. Provides a
        * way to evaluate the expression with a context.
        */
        interface IParsedExpression {
            /**
            * A method for evaluating an expression with a context.
            *
            * @param context The primary context for evaluation.
            * @param aliases An object containing resource alias values. All keys must begin with '@'.
            */
            evaluate(context?: any, aliases?: any): any;
            /**
            * The original expression string.
            */
            expression: string;
            /**
            * Contains all the identifiers found in an expression.  Useful for determining
            * properties to watch on a context.
            */
            identifiers: string[];
            /**
            * Contains all the aliases (denoted by an identifier with '@' as the first character) for this IParsedExpression.
            */
            aliases: string[];
            /**
            * Specifies whether or not you want to do a one-time binding on identifiers
            * for this expression. Typically this is added to a clone of the IParsedExpression.
            */
            oneTime?: boolean;
        }
    }
    /**
    * @name web
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds classes and interfaces related to web components in platypus.
    */
    module web {
        /**
        * @name Browser
        * @memberof plat.web
        * @kind class
        *
        * @implements {plat.web.IBrowser}
        *
        * @description
        * The class that handles all interaction with the browser.
        */
        class Browser implements IBrowser {
            /**
            * @name config
            * @memberof plat.web.Browser
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.web.IBrowserConfig}
            *
            * @description
            * The {@link plat.web.IBrowserConfig|IBrowserConfig} injectable object.
            */
            static config: IBrowserConfig;
            /**
            * @name $EventManagerStatic
            * @memberof plat.web.Browser
            * @kind property
            * @access public
            *
            * @type {plat.events.IEventManagerStatic}
            *
            * @description
            * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
            */
            public $EventManagerStatic: events.IEventManagerStatic;
            /**
            * @name $Compat
            * @memberof plat.web.Browser
            * @kind property
            * @access public
            *
            * @type {plat.ICompat}
            *
            * @description
            * Reference to the {@link plat.ICompat|ICompat} injectable.
            */
            public $Compat: ICompat;
            /**
            * @name $Regex
            * @memberof plat.web.Browser
            * @kind property
            * @access public
            *
            * @type {plat.expressions.IRegex}
            *
            * @description
            * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
            */
            public $Regex: expressions.IRegex;
            /**
            * @name $Window
            * @memberof plat.web.Browser
            * @kind property
            * @access public
            *
            * @type {Window}
            *
            * @description
            * Reference to the Window injectable.
            */
            public $Window: Window;
            /**
            * @name $Dom
            * @memberof plat.web.Browser
            * @kind property
            * @access public
            *
            * @type {plat.ui.IDom}
            *
            * @description
            * Reference to the {@link plat.ui.IDom|IDom} injectable.
            */
            public $Dom: ui.IDom;
            /**
            * @name uid
            * @memberof plat.web.Browser
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * A unique string identifier.
            */
            public uid: string;
            /**
            * @name __currentUrl
            * @memberof plat.web.Browser
            * @kind property
            * @access private
            *
            * @type {string}
            *
            * @description
            * The browser's current URL.
            */
            private __currentUrl;
            /**
            * @name __lastUrl
            * @memberof plat.web.Browser
            * @kind property
            * @access private
            *
            * @type {string}
            *
            * @description
            * The browser's last URL.
            */
            private __lastUrl;
            /**
            * @name __initializing
            * @memberof plat.web.Browser
            * @kind property
            * @access private
            *
            * @type {boolean}
            *
            * @description
            * Whether or not the browser is in an initialization state.
            */
            private __initializing;
            /**
            * @name constructor
            * @memberof plat.web.Browser
            * @kind function
            * @access public
            *
            * @description
            * The constructor for a {@link plat.web.Browser|Browser}. Assigns a uid and subscribes to the 'beforeLoad' event.
            *
            * @returns {plat.web.Browser} A {@link plat.web.Browser|Browser} instance.
            */
            constructor();
            /**
            * @name initialize
            * @memberof plat.web.Browser
            * @kind function
            * @access public
            *
            * @description
            * Initializes the {@link plat.web.Browser|Browser} instance, trims the url, and
            * adds events for popstate and hashchange.
            *
            * @returns {void}
            */
            public initialize(): void;
            /**
            * @name url
            * @memberof plat.web.Browser
            * @kind function
            * @access public
            *
            * @description
            * Sets or gets the current $Window.location
            *
            * @param {string} url? The URL to set the location to.
            * @param {boolean} replace? Whether or not to replace the current URL in
            * the history.
            *
            * @returns {string} The current URL or current location.
            */
            public url(url?: string, replace?: boolean): string;
            /**
            * @name urlUtils
            * @memberof plat.web.Browser
            * @kind function
            * @access public
            *
            * @description
            * Creates a new {@link plat.web.IUrlUtils|IUrlUtils} object.
            *
            * @param url? The URL to associate with the new {@link plat.web.UrlUtils|UrlUtils}
            * instance.
            *
            * @returns {@link plat.web.IUrlUtils|IUrlUtils} The new {@link plat.web.IUrlUtils|IUrlUtils} object.
            */
            public urlUtils(url?: string): IUrlUtilsInstance;
            /**
            * @name isCrossDomain
            * @memberof plat.web.Browser
            * @kind function
            * @access public
            *
            * @description
            * Checks to see if the requested URL is cross domain.
            *
            * @param url The URL to verify whether or not it's cross domain.
            *
            * @returns {boolean} Whether or not the URL argument is cross domain.
            */
            public isCrossDomain(url: string): boolean;
            /**
            * @name _urlChanged
            * @memberof plat.web.Browser
            * @kind function
            * @access public
            *
            * @description
            * The event to fire in the case of a URL change. It kicks
            * off a 'urlChanged' direct event notification.
            *
            * @param url The URL to verify whether or not it's cross domain.
            *
            * @returns {void}
            */
            public _urlChanged(): void;
            /**
            * @name _setUrl
            * @memberof plat.web.Browser
            * @kind function
            * @access public
            *
            * @description
            * Checks for the existence of pushState and
            * sets the browser URL accordingly.
            *
            * @param {string} url The URL to set.
            * @param {boolean} replace? Whether or not to replace the
            * current URL in the history.
            *
            * @returns {void}
            */
            public _setUrl(url: string, replace?: boolean): void;
            /**
            * @name _formatUrl
            * @memberof plat.web.Browser
            * @kind function
            * @access public
            *
            * @description
            * Formats the URL in the case of HASH routing.
            *
            * @param url The URL to format.
            *
            * @returns {string} The formatted URL.
            */
            public _formatUrl(url: string): string;
        }
        /**
        * The Type for referencing the '$Browser' injectable as a dependency.
        */
        function IBrowser(): IBrowser;
        /**
        * @name IBrowser
        * @memberof plat.web
        * @kind interface
        *
        * @description
        * Defines an object that handles interaction with the browser.
        */
        interface IBrowser {
            /**
            * @name uid
            * @memberof plat.web.IBrowser
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * A unique string identifier.
            */
            uid: string;
            /**
            * @name initialize
            * @memberof plat.web.IBrowser
            * @kind function
            * @access public
            *
            * @description
            * Initializes the {@link plat.web.Browser|Browser} instance, trims the url, and
            * adds events for popstate and hashchange.
            *
            * @returns {void}
            */
            initialize(): void;
            /**
            * @name url
            * @memberof plat.web.IBrowser
            * @kind function
            * @access public
            *
            * @description
            * Sets or gets the current $Window.location
            *
            * @param {string} url? The URL to set the location to.
            * @param {boolean} replace? Whether or not to replace the current URL in
            * the history.
            *
            * @returns {string} The current URL or current location.
            */
            url(url?: string, replace?: boolean): string;
            /**
            * @name urlUtils
            * @memberof plat.web.IBrowser
            * @kind function
            * @access public
            *
            * @description
            * Creates a new {@link plat.web.IUrlUtils|IUrlUtils} object.
            *
            * @param url? The URL to associate with the new {@link plat.web.UrlUtils|UrlUtils}
            * instance.
            *
            * @returns {@link plat.web.IUrlUtils|IUrlUtils} The new {@link plat.web.IUrlUtils|IUrlUtils} object.
            */
            urlUtils(url?: string): IUrlUtilsInstance;
            /**
            * @name isCrossDomain
            * @memberof plat.web.IBrowser
            * @kind function
            * @access public
            *
            * @description
            * Checks to see if the requested URL is cross domain.
            *
            * @param url The URL to verify whether or not it's cross domain.
            *
            * @returns {boolean} Whether or not the URL argument is cross domain.
            */
            isCrossDomain(url: string): boolean;
        }
        /**
        * The Type for referencing the '$BrowserConfig' injectable as a dependency.
        */
        function IBrowserConfig(): IBrowserConfig;
        /**
        * @name IBrowserConfig
        * @memberof plat.web
        * @kind interface
        *
        * @description
        * Specifies configuration properties for the {@link plat.web.IBrowser|IBrowser}
        * injectable.
        */
        interface IBrowserConfig {
            /**
            * @name NONE
            * @memberof plat.web.IBrowserConfig
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * Specifies that the application will not be doing
            * url-based routing.
            */
            NONE: string;
            /**
            * @name HASH
            * @memberof plat.web.IBrowserConfig
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * Specifies that the application wants to use hash-based
            * routing.
            */
            HASH: string;
            /**
            * @name STATE
            * @memberof plat.web.IBrowserConfig
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * Specifies that the application wants to use the HTML5
            * popstate method for managing routing. If the browser
            * does not support HTML5 popstate events, hash routing
            * will be used instead.
            *
            * Note: In 'state' mode, the web server must be configured to
            * route every url to the root url.
            */
            STATE: string;
            /**
            * @name routingType
            * @memberof plat.web.IBrowserConfig
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * Allows you to define how your app will route. There are
            * three modes, NONE ('none'), HASH ('hash'), and STATE ('state').
            *
            * In NONE, the application will not be responding to
            * url changes.
            *
            * In HASH, the application will use a hash prefix and
            * all navigation will be managed with hash changes.
            *
            * In STATE mode, the application will use the 'popstate'
            * event and will be able to manage routes. The web server
            * must be configured to route every URL to the root URL if
            * using STATE mode.
            *
            * The default mode is NONE.
            */
            routingType: string;
            /**
            * @name hashPrefix
            * @memberof plat.web.IBrowserConfig
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * If routingType is set to HASH ('hash'), this value will be
            * appended to the '#' at the beginning of every route. The
            * default prefix is '!', meaning each path will be '#!/<path>'.
            */
            hashPrefix: string;
            /**
            * @name baseUrl
            * @memberof plat.web.IBrowserConfig
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * Specifies the base URL used to normalize URL routing.
            */
            baseUrl: string;
        }
        /**
        * @name UrlUtils
        * @memberof plat.web
        * @kind class
        *
        * @implements {plat.web.IUrlUtilsInstance}
        *
        * @description
        * Deals with obtaining detailed information about an
        * associated URL.
        */
        class UrlUtils implements IUrlUtilsInstance {
            /**
            * @name __urlUtilsElement
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access private
            * @static
            *
            * @type {HTMLAnchorElement}
            *
            * @description
            * Helps with URL initialization through it's href attribute.
            */
            private static __urlUtilsElement;
            /**
            * @name __getQuery
            * @memberof plat.web.UrlUtils
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Creates a query object out of the URL's query search string.
            *
            * @param {string} search The URL's query search string.
            *
            * @returns {plat.IObject<string>} An object consisting of key-value pairs
            * representing the query string.
            */
            private static __getQuery(search);
            /**
            * @name __getBaseUrl
            * @memberof plat.web.UrlUtils
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Obtains the base URL for the app/site for doing STATE type routing.
            *
            * @param {string} url The initial URL passed into the Browser.
            *
            * @returns {string} The base URL.
            */
            private static __getBaseUrl(url);
            /**
            * @name $ContextManagerStatic
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {plat.observable.IContextManagerStatic}
            *
            * @description
            * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
            */
            public $ContextManagerStatic: observable.IContextManagerStatic;
            /**
            * @name $Document
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {Document}
            *
            * @description
            * Reference to the Document injectable.
            */
            public $Document: Document;
            /**
            * @name $Window
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {Window}
            *
            * @description
            * Reference to the Window injectable.
            */
            public $Window: Window;
            /**
            * @name $Compat
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {plat.ICompat}
            *
            * @description
            * Reference to the {@link plat.ICompat|ICompat} injectable.
            */
            public $Compat: ICompat;
            /**
            * @name $Regex
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {plat.expressions.IRegex}
            *
            * @description
            * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
            */
            public $Regex: expressions.IRegex;
            /**
            * @name $BrowserConfig
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {plat.web.IBrowserConfig}
            *
            * @description
            * Reference to the {@link plat.web.IBrowserConfig|IBrowserConfig} injectable.
            */
            public $BrowserConfig: IBrowserConfig;
            /**
            * @name href
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The whole associated URL.
            */
            public href: string;
            /**
            * @name protocol
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The protocol scheme of the URL, including the final ':' of the associated URL.
            */
            public protocol: string;
            /**
            * @name host
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The hostname and port of the associated URL.
            */
            public host: string;
            /**
            * @name hostname
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The domain of the associated URL.
            */
            public hostname: string;
            /**
            * @name port
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The port number of the associated URL.
            */
            public port: string;
            /**
            * @name pathname
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The additional path value in the associated URL preceded by a '/'.
            * Removes the query string.
            */
            public pathname: string;
            /**
            * @name search
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A '?' followed by the included parameters in the associated URL.
            */
            public search: string;
            /**
            * @name hash
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A '#' followed by the included hash fragments in the associated URL.
            */
            public hash: string;
            /**
            * @name username
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The username specified before the domain name in the associated URL.
            */
            public username: string;
            /**
            * @name password
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The password specified before the domain name in the associated URL.
            */
            public password: string;
            /**
            * @name origin
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The origin of the associated URL (its protocol, domain, and port).
            */
            public origin: string;
            /**
            * @name query
            * @memberof plat.web.UrlUtils
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * An object containing keyed query arguments from the associated URL.
            */
            public query: any;
            /**
            * @name constructor
            * @memberof plat.web.UrlUtils
            * @kind function
            * @access public
            *
            * @description
            * The constructor for a {@link plat.web.UrlUtils|UrlUtils} instance.
            * Handles parsing the initial URL and obtain the base URL if necessary.
            *
            * @returns {plat.web.UrlUtils} A {@link plat.web.UrlUtils|UrlUtils} instance.
            */
            constructor();
            /**
            * @name initialize
            * @memberof plat.web.UrlUtils
            * @kind function
            * @access public
            *
            * @description
            * Initializes and defines properties using
            * the input url.
            *
            * @param {string} url The input to associate with this {@link plat.web.UrlUtils|UrlUtils} instance.
            *
            * @returns {void}
            */
            public initialize(url: string): void;
            /**
            * @name toString
            * @memberof plat.web.UrlUtils
            * @kind function
            * @access public
            *
            * @description
            * A toString function implementation for the {@link plat.web.UrlUtils|UrlUtils} class.
            *
            * @returns {string} The href associated with this {@link plat.web.UrlUtils|UrlUtils} instance.
            */
            public toString(): string;
        }
        /**
        * The Type for referencing the '$UrlUtilsInstance' injectable as a dependency.
        */
        function IUrlUtilsInstance(): IUrlUtilsInstance;
        /**
        * @name IUrlUtilsInstance
        * @memberof plat.web
        * @kind interface
        *
        * @description
        * Defines an object that deals with obtaining detailed information about an
        * associated URL.
        */
        interface IUrlUtilsInstance {
            /**
            * @name href
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The whole associated URL.
            */
            href: string;
            /**
            * @name protocol
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The protocol scheme of the URL, including the final ':' of the associated URL.
            */
            protocol: string;
            /**
            * @name host
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The hostname and port of the associated URL.
            */
            host: string;
            /**
            * @name hostname
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The domain of the associated URL.
            */
            hostname: string;
            /**
            * @name port
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The port number of the associated URL.
            */
            port: string;
            /**
            * @name pathname
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The additional path value in the associated URL preceded by a '/'.
            * Removes the query string.
            */
            pathname: string;
            /**
            * @name search
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A '?' followed by the included parameters in the associated URL.
            */
            search: string;
            /**
            * @name hash
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A '#' followed by the included hash fragments in the associated URL.
            */
            hash: string;
            /**
            * @name username
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The username specified before the domain name in the associated URL.
            */
            username?: string;
            /**
            * @name password
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The password specified before the domain name in the associated URL.
            */
            password?: string;
            /**
            * @name origin
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The origin of the associated URL (its protocol, domain, and port).
            */
            origin?: string;
            /**
            * @name query
            * @memberof plat.web.IUrlUtilsInstance
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * An object containing keyed query arguments from the associated URL.
            */
            query?: any;
            /**
            * @name initialize
            * @memberof plat.web.IUrlUtilsInstance
            * @kind function
            * @access public
            *
            * @description
            * Initializes and defines properties using
            * the input url.
            *
            * @param {string} url The input to associate with this {@link plat.web.IUrlUtilsInstance|IUrlUtilsInstance}.
            *
            * @returns {void}
            */
            initialize(url: string): void;
            /**
            * @name toString
            * @memberof plat.web.IUrlUtilsInstance
            * @kind function
            * @access public
            *
            * @description
            * A toString function implementation for the {@link plat.web.IUrlUtilsInstance|IUrlUtilsInstance}.
            *
            * @returns {string} The href associated with this {@link plat.web.IUrlUtilsInstance|IUrlUtilsInstance}.
            */
            toString(): string;
        }
        /**
        * @name Router
        * @memberof plat.web
        * @kind class
        *
        * @implements {plat.web.IRouter}
        *
        * @description
        * The class that handles route registration and navigation
        * to and from {@link plat.ui.IViewControl|IViewControls} within the
        * {@link plat.ui.controls.Routeport|Routeport}.
        */
        class Router implements IRouter {
            /**
            * @name $Browser
            * @memberof plat.web.Router
            * @kind property
            * @access public
            *
            * @type {plat.web.IBrowser}
            *
            * @description
            * Reference to the {@link plat.web.IBrowser|IBrowser} injectable.
            */
            public $Browser: IBrowser;
            /**
            * @name $BrowserConfig
            * @memberof plat.web.Router
            * @kind property
            * @access public
            *
            * @type {plat.web.IBrowserConfig}
            *
            * @description
            * Reference to the {@link plat.web.IBrowserConfig|IBrowserConfig} injectable.
            */
            public $BrowserConfig: IBrowserConfig;
            /**
            * @name $EventManagerStatic
            * @memberof plat.web.Router
            * @kind property
            * @access public
            *
            * @type {plat.events.IEventManagerStatic}
            *
            * @description
            * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
            */
            public $EventManagerStatic: events.IEventManagerStatic;
            /**
            * @name $NavigationEventStatic
            * @memberof plat.web.Router
            * @kind property
            * @access public
            *
            * @type {plat.events.INavigationEventStatic}
            *
            * @description
            * Reference to the {@link plat.events.INavigationEventStatic|INavigationEventStatic} injectable.
            */
            public $NavigationEventStatic: events.INavigationEventStatic;
            /**
            * @name $Compat
            * @memberof plat.web.Router
            * @kind property
            * @access public
            *
            * @type {plat.ICompat}
            *
            * @description
            * Reference to the {@link plat.ICompat|ICompat} injectable.
            */
            public $Compat: ICompat;
            /**
            * @name $Regex
            * @memberof plat.web.Router
            * @kind property
            * @access public
            *
            * @type {plat.expressions.IRegex}
            *
            * @description
            * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
            */
            public $Regex: expressions.IRegex;
            /**
            * @name $Window
            * @memberof plat.web.Router
            * @kind property
            * @access public
            *
            * @type {Window}
            *
            * @description
            * Reference to the Window injectable.
            */
            public $Window: Window;
            /**
            * @name uid
            * @memberof plat.web.Router
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * A unique string identifier.
            */
            public uid: string;
            /**
            * @name _routes
            * @memberof plat.web.Router
            * @kind property
            * @access protected
            *
            * @type {Array<plat.web.IRouteMatcher>}
            *
            * @description
            * The registered routes (as {@link plat.web.IRouteMatcher|IRouteMatchers}) for matching
            * on route change.
            */
            public _routes: IRouteMatcher[];
            /**
            * @name _removeListener
            * @memberof plat.web.Router
            * @kind property
            * @access protected
            *
            * @type {plat.IRemoveListener}
            *
            * @description
            * The function to stop listening to the 'urlChanged' event.
            */
            public _removeListener: IRemoveListener;
            /**
            * @name _defaultRoute
            * @memberof plat.web.Router
            * @kind property
            * @access protected
            *
            * @type {plat.web.IMatchedRoute}
            *
            * @description
            * The registered default route ('') converted into an {@link plat.web.IMatchedRoute|IMatchedRoute}.
            * The default route is used whenever a specified route/url is not matched.
            */
            public _defaultRoute: IMatchedRoute;
            /**
            * @name _baseRoute
            * @memberof plat.web.Router
            * @kind property
            * @access protected
            *
            * @type {plat.web.IMatchedRoute}
            *
            * @description
            * The registered base route ('/') converted into an {@link plat.web.IMatchedRoute|IMatchedRoute}.
            * The base route is the first route navigated to in the {@link plat.ui.controls.Routeport|Routeport} if a
            * default route is not specified in its plat-options.
            */
            public _baseRoute: IMatchedRoute;
            /**
            * @name __escapeRegex
            * @memberof plat.web.Router
            * @kind property
            * @access private
            *
            * @type {RegExp}
            *
            * @description
            * A regular expression for finding invalid characters in a route string.
            */
            private __escapeRegex;
            /**
            * @name __optionalRegex
            * @memberof plat.web.Router
            * @kind property
            * @access private
            *
            * @type {RegExp}
            *
            * @description
            * A regular expression for finding optional parameters in a route string.
            */
            private __optionalRegex;
            /**
            * @name __pathSlashRegex
            * @memberof plat.web.Router
            * @kind property
            * @access private
            *
            * @type {RegExp}
            *
            * @description
            * A regular expression for finding forward slashes at the beginning or end of
            * an expression.
            */
            private __pathSlashRegex;
            /**
            * @name __firstRoute
            * @memberof plat.web.Router
            * @kind property
            * @access private
            *
            * @type {boolean}
            *
            * @description
            * States whether the specified route is the first attempt at routing.
            */
            private __firstRoute;
            /**
            * @name __history
            * @memberof plat.web.Router
            * @kind property
            * @access private
            *
            * @type {Array<string>}
            *
            * @description
            * A virtual history stack used in IE based MS apps.
            */
            private __history;
            /**
            * @name constructor
            * @memberof plat.web.Router
            * @kind function
            * @access public
            *
            * @description
            * The constructor for a {@link plat.web.Router|Router}. Assigns a uid and subscribes to the 'urlChanged' event.
            *
            * @returns {plat.web.Router} A {@link plat.web.Router|Router} instance.
            */
            constructor();
            /**
            * @name registerRoutes
            * @memberof plat.web.Router
            * @kind function
            * @access public
            *
            * @description
            * Registers route strings/RegExps and associates them with a control type.
            *
            * @param {string} type The control type with which to associate the routes.
            * @param {Array<any>} routes An array of strings or RegExp expressions to associate with
            * the control type.
            *
            * @returns {void}
            */
            public registerRoutes(type: string, routes: any[]): void;
            /**
            * @name route
            * @memberof plat.web.Router
            * @kind function
            * @access public
            *
            * @description
            * Formats a url path given the parameters and query string, then changes the
            * url to that path.
            *
            * @param {string} path The route path to navigate to.
            * @param {plat.web.IRouteNavigationOptions} options? The {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions}
            * included with this route.
            *
            * @returns {boolean} Whether or not the route operation was a success.
            */
            public route(path: string, options?: IRouteNavigationOptions): boolean;
            /**
            * @name goBack
            * @memberof plat.web.Router
            * @kind function
            * @access public
            *
            * @description
            * Navigates back in the history.
            *
            * @param {number} length? The number of entries to go back in the history.
            *
            * @returns {void}
            */
            public goBack(length?: number): void;
            /**
            * @name _buildRoute
            * @memberof plat.web.Router
            * @kind function
            * @access protected
            *
            * @description
            * Builds a valid route with a valid query string to use for navigation.
            *
            * @param {string} routeParameter The route portion of the navigation path. Used to
            * match with a registered {@link plat.ui.WebViewControl|WebViewControl}.
            * @param {plat.IObject<string>} query The route query object if passed into the
            * {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions}.
            *
            * @returns {{ route: string; match: plat.web.IMatchedRoute; }} An object containing
            * both the fully evaluated route and the corresponding {@link plat.web.IMatchedRoute|IMatchedRoute}.
            */
            public _buildRoute(routeParameter: string, query: IObject<string>): {
                route: string;
                match: IMatchedRoute;
            };
            /**
            * @name _buildQueryString
            * @memberof plat.web.Router
            * @kind function
            * @access protected
            *
            * @description
            * Builds the query string if a query object was passed into
            * the {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions}.
            *
            * @param {plat.IObject<string>} query The query object passed in.
            *
            * @returns {string} The built query string.
            */
            public _buildQueryString(query: IObject<string>): string;
            /**
            * @name _routeChanged
            * @memberof plat.web.Router
            * @kind function
            * @access protected
            *
            * @description
            * The method called when the route function is invoked
            * or on a 'urlChanged' event.
            *
            * @param {plat.events.IDispatchEventInstance} ev The 'urlChanged' event object.
            * @param {plat.web.IUrlUtilsInstance} utils The {@link plat.web.IUrlUtils|IUrlUtils}
            * created for the invoked route function.
            *
            * @returns {void}
            */
            public _routeChanged(ev: events.IDispatchEventInstance, utils: IUrlUtilsInstance): void;
            /**
            * @name _registerRoute
            * @memberof plat.web.Router
            * @kind function
            * @access protected
            *
            * @description
            * Registers a {@link plat.ui.WebViewControl|WebViewControl's} route.
            *
            * @param {any} route Can be either a string or RegExp.
            * @param {plat.dependency.IInjector<plat.ui.IBaseViewControl>} injector The injector for the
            * {@link plat.ui.WebViewControl|WebViewControl} defined by the type.
            * @param {string} type The control type.
            *
            * @returns {void}
            */
            public _registerRoute(route: any, injector: dependency.IInjector<ui.IBaseViewControl>, type: string): void;
            /**
            * @name _getRouteParameters
            * @memberof plat.web.Router
            * @kind function
            * @access protected
            *
            * @description
            * Parses the route and pulls out route parameters. Then
            * converts them to regular expressions to match for
            * routing.
            *
            * @param {string} route The route to parse.
            *
            * @returns {plat.web.IRouteMatcher} The object used to match a
            * route with a {@link plat.ui.BaseViewControl|BaseViewControl's} injector.
            */
            public _getRouteParameters(route: string): IRouteMatcher;
            /**
            * @name _match
            * @memberof plat.web.Router
            * @kind function
            * @access protected
            *
            * @description
            * Matches a route to a registered route using the
            * registered route's regular expression.
            *
            * @param {plat.web.IUrlUtilsInstance} utils The utility used to obtain
            * the url fragment and the url query.
            *
            * @returns {plat.web.IMatchedRoute} The matched route with the matched control
            * injector.
            */
            public _match(utils: IUrlUtilsInstance): IMatchedRoute;
            /**
            * @name _getUrlFragment
            * @memberof plat.web.Router
            * @kind function
            * @access protected
            *
            * @description
            * Trims the first and last slash on the URL pathname and returns it.
            *
            * @param {plat.web.IUrlUtilsInstance} utils The utility used to obtain
            * the url fragment.
            *
            * @returns {string} The trimmed URL pathname.
            */
            public _getUrlFragment(utils: IUrlUtilsInstance): string;
        }
        /**
        * The Type for referencing the '$Router' injectable as a dependency.
        */
        function IRouter(): IRouter;
        /**
        * @name IRouter
        * @memberof plat.web
        * @kind interface
        *
        * @description
        * Describes the object that handles route registration and navigation
        * to and from {@link plat.ui.IWebViewControl|IWebViewControls} within a
        * {@link plat.ui.controls.Routeport|Routeport}.
        */
        interface IRouter {
            /**
            * @name uid
            * @memberof plat.web.IRouter
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A unique string identifier.
            */
            uid: string;
            /**
            * @name registerRoutes
            * @memberof plat.web.IRouter
            * @kind function
            * @access public
            *
            * @description
            * Registers route strings/RegExps and associates them with a control type.
            *
            * @param {string} type The control type with which to associate the routes.
            * @param {Array<any>} routes An array of strings or RegExp expressions to associate with
            * the control type.
            *
            * @returns {void}
            */
            registerRoutes(type: string, routes: any[]): void;
            /**
            * @name route
            * @memberof plat.web.IRouter
            * @kind function
            * @access public
            *
            * @description
            * Formats a url path given the parameters and query string, then changes the
            * url to that path.
            *
            * @param {string} path The route path to navigate to.
            * @param {plat.web.IRouteNavigationOptions} options? The {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions}
            * included with this route.
            *
            * @returns {boolean} Whether or not the route operation was a success.
            */
            route(path: string, options?: IRouteNavigationOptions): boolean;
            /**
            * @name goBack
            * @memberof plat.web.IRouter
            * @kind function
            * @access public
            *
            * @description
            * Navigates back in the history.
            *
            * @param {number} length? The number of entries to go back in the history.
            *
            * @returns {void}
            */
            goBack(length?: number): void;
        }
        /**
        * @name IRouteNavigationOptions
        * @memberof plat.web
        * @kind interface
        *
        * @extends {plat.navigation.IBaseNavigationOptions}
        *
        * @description
        * Options that you can submit to the router in order
        * to customize navigation.
        */
        interface IRouteNavigationOptions extends navigation.IBaseNavigationOptions {
            /**
            * @name query
            * @memberof plat.web.IRouteNavigationOptions
            * @kind property
            * @access public
            *
            * @type {plat.IObject<string>}
            *
            * @description
            * An object that includes the query parameters to be inserted into the route
            * as the query string.
            */
            query?: IObject<string>;
        }
        /**
        * @name IRouteMatcher
        * @memberof plat.web
        * @kind interface
        *
        * @description
        * Used by the navigator for matching a route with
        * a {@link plat.ui.IBaseViewControl|IBaseViewControl's} injector.
        */
        interface IRouteMatcher {
            /**
            * @name injector
            * @memberof plat.web.IRouteMatcher
            * @kind property
            * @access public
            *
            * @type {plat.dependency.IInjector<plat.ui.IBaseViewControl>}
            *
            * @description
            * The {@link plat.ui.IBaseViewControl|IBaseViewControl} injector.
            */
            injector?: dependency.IInjector<ui.IBaseViewControl>;
            /**
            * @name type
            * @memberof plat.web.IRouteMatcher
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The type of {@link plat.ui.IBaseViewControl|IBaseViewControl}.
            */
            type?: string;
            /**
            * @name regex
            * @memberof plat.web.IRouteMatcher
            * @kind property
            * @access public
            *
            * @type {RegExp}
            *
            * @description
            * A regular expression to match with the url.
            */
            regex: RegExp;
            /**
            * @name args
            * @memberof plat.web.IRouteMatcher
            * @kind property
            * @access public
            *
            * @type {Array<string>}
            *
            * @description
            * Route arguments used to create route parameters
            * in the event of a url match.
            */
            args: string[];
        }
        /**
        * @name IMatchedRoute
        * @memberof plat.web
        * @kind interface
        *
        * @description
        * Provides a {@link plat.dependency.IInjector<plat.ui.IBaseViewControl>|IInjector<IBaseViewControl>} that matches
        * the given {@link plat.web.IRoute|IRoute}.
        */
        interface IMatchedRoute {
            /**
            * @name injector
            * @memberof plat.web.IMatchedRoute
            * @kind property
            * @access public
            *
            * @type {plat.dependency.IInjector<plat.ui.IBaseViewControl>}
            *
            * @description
            * The associated {@link plat.dependency.IInjector<plat.ui.IBaseViewControl>|IInjector<IBaseViewControl>} for the route.
            */
            injector: dependency.IInjector<ui.IBaseViewControl>;
            /**
            * @name type
            * @memberof plat.web.IMatchedRoute
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The type of {@link plat.ui.IBaseViewControl|IBaseViewControl}.
            */
            type: string;
            /**
            * @name route
            * @memberof plat.web.IMatchedRoute
            * @kind property
            * @access public
            *
            * @type {plat.web.IRoute<any>}
            *
            * @description
            * The route associated with this object's injector.
            */
            route?: IRoute<any>;
        }
        /**
        * @name IRoute
        * @memberof plat.web
        * @kind interface
        *
        * @typeparam {{}} T The type of the defined parameters matched with this route.
        *
        * @description
        * Contains the parsed properties of a url.
        */
        interface IRoute<T extends {}> {
            /**
            * @name parameters
            * @memberof plat.web.IRoute
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The defined parameters that were matched with the route.
            * When a route is registered, the registrant can specify named
            * route parameters. Those parameters will appear in this object
            * as key/value pairs.
            */
            parameters: T;
            /**
            * @name path
            * @memberof plat.web.IRoute
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * This property will always exist and will be equal to the full
            * route for navigation (only the path from root, not including
            * the query string).
            */
            path: string;
            /**
            * @name query
            * @memberof plat.web.IRoute
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * An object containing query string key/value pairs.
            */
            query?: any;
        }
    }
    module async {
        /**
        * @name Promise
        * @memberof plat.async
        * @kind class
        *
        * @implements {plat.async.IThenable}
        *
        * @description
        * Takes in a generic type corresponding to the fullfilled success type.
        *
        * @typeparam {any} R The return type of the promise.
        */
        class Promise<R> implements IThenable<R> {
            /**
            * @name __subscribers
            * @memberof plat.async.Promise
            * @kind property
            * @access private
            *
            * @type {Array<any>}
            *
            * @description
            * Holds all the subscriber promises
            */
            private __subscribers;
            /**
            * @name __state
            * @memberof plat.async.Promise
            * @kind property
            * @access private
            *
            * @type {plat.async.State}
            *
            * @description
            * The state of the promise (fulfilled/rejected)
            */
            private __state;
            /**
            * @name __detail
            * @memberof plat.async.Promise
            * @kind property
            * @access private
            *
            * @type {any}
            *
            * @description
            * The return detail of a promise.
            */
            private __detail;
            /**
            * @name config
            * @memberof plat.async.Promise
            * @kind property
            * @access public
            * @static
            *
            * @type {any}
            *
            * @description
            * The configuration for creating asynchronous promise flushing.
            */
            static config: {
                async: (callback: (arg?: IThenable<any>) => void, arg?: IThenable<any>) => void;
            };
            /**
            * @name all
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Returns a promise that fulfills when every item in the array is fulfilled.
            * Casts arguments to promises if necessary. The result argument of the
            * returned promise is an array containing the fulfillment result arguments
            * in-order. The rejection argument is the rejection argument of the
            * first-rejected promise.
            *
            * @typeparam {any} R The return type of the promises.
            *
            * @param {Array<plat.async.IThenable<R>>} promises An array of promises, although every argument is potentially
            * cast to a promise meaning not every item in the array needs to be a promise.
            *
            * @returns {plat.async.IThenable<Array<R>>} A promise that resolves after all the input promises resolve.
            */
            static all<R>(promises: IThenable<R>[]): IThenable<R[]>;
            /**
            * @name all
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Returns a promise that fulfills when every item in the array is fulfilled.
            * Casts arguments to promises if necessary. The result argument of the
            * returned promise is an array containing the fulfillment result arguments
            * in-order. The rejection argument is the rejection argument of the
            * first-rejected promise.
            *
            * @typeparam {any} R The type of the promises.
            *
            * @param {Array<R>} promises An array of objects, if an object is not a promise, it will be cast.
            *
            * @returns {plat.async.IThenable<Array<R>>} A promise that resolves after all the input promises resolve.
            */
            static all<R>(promises: R[]): IThenable<R[]>;
            /**
            * @name cast
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Creates a promise that fulfills to the passed in object. If the
            * passed-in object is a promise it returns the promise.
            *
            * @typeparam {any} R The type of the input object to cast to a promise.
            *
            * @param object The object to cast to a Promise.
            */
            static cast<R>(object?: R): Promise<R>;
            /**
            * @name race
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Returns a promise that fulfills as soon as any of the promises fulfill,
            * or rejects as soon as any of the promises reject (whichever happens first).
            *
            * @typeparam {any} R The return type of the input promises.
            *
            * @param {Array<plat.async.IThenable<R>>} promises An Array of promises to 'race'.
            *
            * @returns {plat.async.IThenable<R>} A promise that fulfills when one of the input
            * promises fulfilled.
            */
            static race<R>(promises: IThenable<R>[]): IThenable<R>;
            /**
            * @name race
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Returns a promise that fulfills as soon as any of the promises fulfill,
            * or rejects as soon as any of the promises reject (whichever happens first).
            *
            * @typeparam {any} R The type of the input objects.
            *
            * @param {Array<R>} promises An Array of anything to 'race'. Objects that aren't promises will
            * be cast.
            *
            * @returns {plat.async.IThenable<R>} A promise that fulfills when one of the input
            * promises fulfilled.
            */
            static race<R>(promises: R[]): IThenable<R>;
            /**
            * @name resolve
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a promise that resolves with the input value.
            *
            * @typeparam {any} R The value with which to resolve the promise.
            *
            * @param {R} value The value to resolve.
            *
            * @returns {plat.async.IThenable<R>} A promise that will resolve with the associated value.
            */
            static resolve<R>(value?: R): IThenable<R>;
            /**
            * @name reject
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a promise that rejects with the input value.
            *
            * @param {any} error The value to reject.
            *
            * @returns {plat.async.IThenable<any>} A promise that will reject with the error.
            */
            static reject(error?: any): IThenable<any>;
            /**
            * @name __invokeResolveFunction
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Invokes the resolve function for a promise. Handles error catching.
            *
            * @typeparam {any} R The return type of the input {@link plat.async.Promise|Promise}.
            *
            * @param {plat.async.IResolveFunction<R>} resolveFunction The resolve function to invoke.
            * @param {plat.async.Promise<R>} promise The promise on which to invoke the resolve function.
            *
            * @returns {void}
            */
            private static __invokeResolveFunction<R>(resolveFunction, promise);
            /**
            * @name __invokeCallback
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Invokes a callback for a promise with the specified detail.
            *
            * @param {plat.async.State} settled The state of the promise.
            * @param {any} promise The promise object.
            * @param {(response: any) => void} callback The callback to invoke.
            * @param {any} detail The details to pass to the callback.
            *
            * @returns {void}
            */
            private static __invokeCallback(settled, promise, callback, detail);
            /**
            * @name __publish
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Publishes the promise details to all the subscribers for a promise.
            *
            * @param {any} promise The promise object.
            * @param {plat.async.State} settled The state of the promise.
            *
            * @returns {void}
            */
            private static __publish(promise, settled);
            /**
            * @name __publishFulfillment
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Publishes a promises that has been fulfilled.
            *
            * @param {any} promise The promise object.
            *
            * @returns {void}
            */
            private static __publishFulfillment(promise);
            /**
            * @name __publishRejection
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Publishes a promises that has been rejected.
            *
            * @param {any} promise The promise object.
            *
            * @returns {void}
            */
            private static __publishRejection(promise);
            /**
            * @name __reject
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Asynchronously rejects a promise
            *
            * @param {any} promise The promise object.
            * @param {any} reason The detail of the rejected promise.
            *
            * @returns {void}
            */
            private static __reject(promise, reason);
            /**
            * @name __fulfill
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Asynchronously fulfills a promise
            *
            * @typeparam {any} R The return type of the promise.
            *
            * @param {plat.async.Promise<R>} promise The promise object.
            * @param {any} value The detail of the fulfilled promise.
            *
            * @returns {void}
            */
            private static __fulfill<R>(promise, value);
            /**
            * @name __resolve
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Asynchronously fulfills a promise, allowing for promise chaining.
            *
            * @typeparam {any} R The return type of the promise.
            *
            * @param {plat.async.Promise<R>} promise The promise object.
            * @param {any} value The detail of the fulfilled promise.
            *
            * @returns {void}
            */
            private static __resolve<R>(promise, value);
            /**
            * @name __handleThenable
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Handles chaining promises together, when a promise is returned from within a then handler.
            *
            * @typeparam {any} R The return type of the promise.
            *
            * @param {plat.async.Promise<R>} promise The promise object.
            * @param {plat.async.Promise<R>} value The next promise to await.
            *
            * @returns {boolean} Whether or not the value passed in is a promise.
            */
            private static __handleThenable<R>(promise, value);
            /**
            * @name __subscribe
            * @memberof plat.async.Promise
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Adds a child promise to the parent's subscribers.
            *
            * @typeparam {any} R The return type of the promise.
            *
            * @param {plat.async.Promise<any>} parent The parent promise.
            * @param {plat.async.Promise<any>} value The child promise.
            * @param {(success: any) => any} onFullfilled The fulfilled method for the child.
            * @param {(error: any) => any} onRejected The rejected method for the child.
            *
            * @returns {void}
            */
            private static __subscribe(parent, child, onFulfilled, onRejected);
            /**
            * @name constructor
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            *
            * @description
            * An ES6 implementation of the Promise API. Useful for asynchronous programming.
            * Takes in 2 generic types corresponding to the fullfilled success and error types.
            * The error type (U) should extend Error in order to get proper stack tracing.
            *
            * @typeparam {any} R The return type of the promise.
            *
            * @param {plat.async.IResolveFunction<R>} resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
            *
            * @returns {plat.async.Promise<R>} A promise object.
            */
            constructor(resolveFunction: IResolveFunction<R>);
            /**
            * @name then
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(success: R) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
            * onFulfilled method in the promise chain will be called.
            * @param {(error: any) => plat.async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            public then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
            * @name then
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(success: R) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
            * onFulfilled method in the promise chain will be called.
            * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            public then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
            /**
            * @name then
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
            * onFulfilled method in the promise chain will be called.
            * @param {(error: any) => plat.async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            public then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
            * @name then
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
            * onFulfilled method in the promise chain will be called.
            * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            public then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(error: any) => plat.async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            public catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            public catch<U>(onRejected: (error: any) => U): IThenable<U>;
            /**
            * @name toString
            * @memberof plat.async.Promise
            * @kind function
            * @access public
            *
            * @description
            * Outputs the Promise as a readable string.
            */
            public toString(): string;
        }
        /**
        * @name IThenable
        * @memberof plat.async
        * @kind interface
        *
        * @description
        * Describes a chaining function that fulfills when the previous link is complete and is
        * able to be caught in the case of an error.
        *
        * @typeparam {any} R The return type of the thenable.
        */
        interface IThenable<R> {
            /**
            * @name then
            * @memberof plat.async.IThenable
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(success: R) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
            * onFulfilled method in the promise chain will be called.
            * @param {(error: any) => plat.async.IThenable<U>} onRejected? A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
            * @name then
            * @memberof plat.async.IThenable
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(success: R) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
            * onFulfilled method in the promise chain will be called.
            * @param {(error: any) => U} onRejected? A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
            /**
            * @name then
            * @memberof plat.async.IThenable
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
            * onFulfilled method in the promise chain will be called.
            * @param {(error: any) => plat.async.IThenable<U>} onRejected? A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
            * @name then
            * @memberof plat.async.IThenable
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
            * onFulfilled method in the promise chain will be called.
            * @param {(error: any) => U} onRejected? A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.IThenable
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(error: any) => plat.async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.IThenable
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
            */
            catch<U>(onRejected: (error: any) => U): IThenable<U>;
        }
        /**
        * Describes a function passed into the constructor for a Promise. The function allows you to
        * resolve/reject the Promise.
        */
        interface IResolveFunction<R> {
            /**
            * A function which allows you to resolve/reject a Promise.
            *
            * @param resolve A method for resolving a Promise. If you pass in a 'thenable' argument
            * (meaning if you pass in a Promise-like object), then the promise will resolve with the
            * outcome of the object. Else the promise will resolve with the argument.
            * @param reject A method for rejecting a promise. The argument should be an instancof Error
            * to assist with debugging. If a method in the constructor for a Promise throws an error,
            * the promise will reject with the error.
            */
            (resolve: (value?: R) => void, reject: (reason?: any) => void): void;
        }
        /**
        * The Type for referencing the '$Promise' injectable as a dependency.
        */
        function IPromise($Window?: any): IPromise;
        /**
        * @name IPromise
        * @memberof plat.async
        * @kind interface
        *
        * @description
        * The injectable reference for the ES6 Promise implementation.
        */
        interface IPromise {
            /**
            * @name constructor
            * @memberof plat.async.IPromise
            * @kind function
            * @access public
            *
            * @description
            * An ES6 implementation of the Promise API. Useful for asynchronous programming.
            * Takes in 2 generic types corresponding to the fullfilled success and error types.
            * The error type (U) should extend Error in order to get proper stack tracing.
            *
            * @typeparam {any} R The return type of the promise.
            *
            * @param {plat.async.IResolveFunction<R>} resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
            *
            * @returns {plat.async.IThenable<R>} A promise object.
            */
            new<R>(resolveFunction: IResolveFunction<R>): IThenable<R>;
            /**
            * @name all
            * @memberof plat.async.IPromise
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Returns a promise that fulfills when every item in the array is fulfilled.
            * Casts arguments to promises if necessary. The result argument of the
            * returned promise is an array containing the fulfillment result arguments
            * in-order. The rejection argument is the rejection argument of the
            * first-rejected promise.
            *
            * @typeparam {any} R The return type of the promises.
            *
            * @param {Array<plat.async.IThenable<R>>} promises An array of promises, although every argument is potentially
            * cast to a promise meaning not every item in the array needs to be a promise.
            *
            * @returns {plat.async.IThenable<Array<R>>} A promise that resolves after all the input promises resolve.
            */
            all<R>(promises: IThenable<R>[]): IThenable<R[]>;
            /**
            * @name all
            * @memberof plat.async.IPromise
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Returns a promise that fulfills when every item in the array is fulfilled.
            * Casts arguments to promises if necessary. The result argument of the
            * returned promise is an array containing the fulfillment result arguments
            * in-order. The rejection argument is the rejection argument of the
            * first-rejected promise.
            *
            * @typeparam {any} R The type of the promises.
            *
            * @param {Array<R>} promises An array of objects, if an object is not a promise, it will be cast.
            *
            * @returns {plat.async.IThenable<Array<R>>} A promise that resolves after all the input promises resolve.
            */
            all<R>(promises: R[]): IThenable<R[]>;
            /**
            * @name cast
            * @memberof plat.async.IPromise
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Creates a promise that fulfills to the passed in object. If the
            * passed-in object is a promise it returns the promise.
            *
            * @typeparam {any} R The type of the input object to cast to a promise.
            *
            * @param {R} object The object to cast to a Promise.
            *
            * @returns {plat.async.IThenable<R>} The cast promise.
            */
            cast<R>(object?: R): IThenable<R>;
            /**
            * @name race
            * @memberof plat.async.IPromise
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Returns a promise that fulfills as soon as any of the promises fulfill,
            * or rejects as soon as any of the promises reject (whichever happens first).
            *
            * @typeparam {any} R The return type of the input promises.
            *
            * @param {Array<plat.async.IThenable<R>>} promises An Array of promises to 'race'.
            *
            * @returns {plat.async.IThenable<R>} A promise that fulfills when one of the input
            * promises fulfilled.
            */
            race<R>(promises: IThenable<R>[]): IThenable<R>;
            /**
            * @name race
            * @memberof plat.async.IPromise
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Returns a promise that fulfills as soon as any of the promises fulfill,
            * or rejects as soon as any of the promises reject (whichever happens first).
            *
            * @typeparam {any} R The type of the input objects.
            *
            * @param {Array<R>} promises An Array of anything to 'race'. Objects that aren't promises will
            * be cast.
            *
            * @returns {plat.async.IThenable<R>} A promise that fulfills when one of the input
            * promises fulfilled.
            */
            race<R>(promises: R[]): IThenable<R>;
            /**
            * @name resolve
            * @memberof plat.async.IPromise
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a promise that resolves with the input value.
            *
            * @typeparam {any} R The value with which to resolve the promise.
            *
            * @param {R} value The value to resolve.
            *
            * @returns {plat.async.IThenable<R>} A promise that will resolve with the associated value.
            */
            resolve<R>(value: R): IThenable<R>;
            /**
            * @name reject
            * @memberof plat.async.IPromise
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a promise that rejects with the input value.
            *
            * @param {any} value The value to reject.
            *
            * @returns {plat.async.IThenable<any>} A promise that will reject with the error.
            */
            reject(error: any): IThenable<any>;
        }
        /**
        * @name IHttpConfig
        * @memberof plat.async
        * @kind interface
        *
        * @extends {plat.async.IJsonpConfig}
        *
        * @description
        * Describes an object which contains Ajax configuration properties.
        */
        interface IHttpConfig extends IJsonpConfig {
            /**
            * @name method
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {string}
            *
            * @description
            * The HTTP method type of XmlHttpRequest such as 'GET', 'POST', 'PUT',
            * 'DELETE', etc. Ignored for non-HTTP urls. Defaults to 'GET'.
            */
            method?: string;
            /**
            * @name timeout
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {number}
            *
            * @description
            * The number of milliseconds a request can take before
            * automatically being terminated. A value of 0
            * means there is no timeout.
            */
            timeout?: number;
            /**
            * @name user
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {string}
            *
            * @description
            * An optional user string for the XmlHttpRequest
            */
            user?: string;
            /**
            * @name password
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {string}
            *
            * @description
            * An optional password string for the XmlHttpRequest
            */
            password?: string;
            /**
            * @name responseType
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {string}
            *
            * @description
            * The XMLHttpRequestResponseType. The response should
            * still be checked when received due to browser
            * incompatibilities. If a browser does not support a
            * response type it will return the value as a string.
            * The response type does not affect JSONP callback
            * arguments.
            *
            * @see config.XMLHttpRequestResponseType
            */
            responseType?: string;
            /**
            * @name contentType
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {string}
            *
            * @description
            * The Content-Type header for XMLHttpRequest when
            * data is being sent. The default is
            * 'application/json;charset=utf-8;'.
            */
            contentType?: string;
            /**
            * @name overrideMimeType
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {string}
            *
            * @description
            * A string to override the MIME type returned by the server.
            */
            overrideMimeType?: string;
            /**
            * @name headers
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {any}
            *
            * @description
            * A key/value pair object where the key is a DOMString header key
            * and the value is the DOMString header value.
            */
            headers?: any;
            /**
            * @name withCredentials
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {boolean}
            *
            * @description
            * Indicates whether or not cross-site Access-Control requests
            * should be made using credentials such as cookies or
            * authorization headers. The default is false.
            */
            withCredentials?: boolean;
            /**
            * @name data
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {any}
            *
            * @description
            * The request payload
            */
            data?: any;
            /**
            * @name transforms
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {plat.async.IHttpTransformFunction}
            *
            * @description
            * An array of data transform functions that fire in order and consecutively
            * pass the returned result from one function to the next.
            */
            transforms?: IHttpTransformFunction[];
            /**
            * @name isCrossDomain
            * @memberof plat.async.IHttpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {boolean}
            *
            * @description
            * Forces a JSONP, cross-domain request when set to true.
            * The default is false.
            */
            isCrossDomain?: boolean;
        }
        /**
        * @name IHttpTransformFunction
        * @memberof plat.async
        * @kind interface
        *
        * @description
        * A function that is used to transform XMLHttpRequest data.
        */
        interface IHttpTransformFunction {
            /**
            * @memberof plat.async.IHttpTransformFunction
            * @kind function
            * @access public
            *
            * @description
            * The method signature for {@link plat.async.IHttpTransformFunction|IHttpTransformFunction}.
            *
            * @param {any} data The data for the XMLHttpRequest.
            * @param {XMLHttpRequest} xhr The XMLHttpRequest for the data.
            *
            * @returns {any} The transformed data.
            */
            (data: any, xhr: XMLHttpRequest): any;
        }
        /**
        * @name IJsonpConfig
        * @memberof plat.async
        * @kind interface
        *
        * @description
        * Describes an object which contains JSONP configuration properties.
        */
        interface IJsonpConfig {
            /**
            * @name url
            * @memberof plat.async.IJsonpConfig
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The url for the JSONP callback
            * (without the `?{callback}={callback_name}` parameter in the url)
            * or for the XmlHttpRequest.
            */
            url: string;
            /**
            * @name jsonpIdentifier
            * @memberof plat.async.IJsonpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {string}
            *
            * @description
            * The identifier the server uses to get the name of the JSONP
            * callback. The default is 'callback' as seen in
            * http://www.platyfi.com/data?callback=plat_fnName.
            */
            jsonpIdentifier?: string;
            /**
            * @name jsonpCallback
            * @memberof plat.async.IJsonpConfig
            * @kind property
            * @access public
            * @optional
            *
            * @type {string}
            *
            * @description
            * A specified name for the JSONP callback (in case the server has
            * it hardcoded and/or does not get it from the given url). The
            * default is a unique plat id generated separately for
            * each JSONP callback seen as 'plat_callback00' in
            * http://www.platyfi.com/data?callback=plat_callback00.
            */
            jsonpCallback?: string;
        }
        /**
        * @name IAjaxResponse
        * @memberof plat.async
        * @kind interface
        *
        * @description
        * Describes an object that is the response to an AJAX request.
        *
        * @typeparam {any} R The type of the AJAX response.
        */
        interface IAjaxResponse<R> {
            /**
            * @name response
            * @memberof plat.async.IAjaxResponse
            * @kind property
            * @access public
            *
            * @type {R}
            *
            * @description
            * The AJAX response or responseText. The response should
            * be checked when received due to browser
            * incompatibilities with responseType. If a browser does
            * not support a response type it will return the value as
            * a string.
            */
            response: R;
            /**
            * @name status
            * @memberof plat.async.IAjaxResponse
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The XHR status. Resolves as 200 for JSONP.
            */
            status: number;
            /**
            * @name getAllResponseHeaders
            * @memberof plat.async.IAjaxResponse
            * @kind function
            * @access public
            *
            * @description
            * A method for getting the XHR response headers.
            *
            * @returns {void}
            */
            getAllResponseHeaders?: () => string;
            /**
            * @name xhr
            * @memberof plat.async.IAjaxResponse
            * @kind property
            * @access public
            * @optional
            *
            * @type {XMLHttpRequest}
            *
            * @description
            * The XMLHttpRequest object associated with the AJAX call
            */
            xhr?: XMLHttpRequest;
        }
        /**
        * @name IAjaxResolveFunction
        * @memberof plat.async
        * @kind interface
        *
        * @description
        * Describes the AjaxPromise's resolve function
        *
        * @typeparam {any} R The type of the {@link plat.async.IAjaxResponse|IAjaxResponse} object.
        */
        interface IAjaxResolveFunction<R> {
            /**
            * @memberof plat.async.IAjaxResolveFunction
            * @kind function
            * @access public
            *
            * @description
            * The method signature for an {@link plat.async.IAjaxResolveFunction|IAjaxResolveFunction}.
            *
            * @param {(value?: plat.async.IAjaxResponse<R>) => any} resolve The function to call when the
            * AJAX call has successfully fulfilled.
            * @param {(reason?: plat.async.IAjaxError) => any} reject The function to call when the
            * AJAX call fails.
            *
            * @returns {void}
            */
            (resolve: (value?: IAjaxResponse<R>) => any, reject: (reason?: IAjaxError) => any): void;
        }
        /**
        * @name IAjaxError
        * @memberof plat.async
        * @kind interface
        *
        * @implements {plat.async.IAjaxResponse}
        *
        * @description
        * Describes an object that forms an Error object with an {@link plat.async.IAjaxResponse|IAjaxResponse}.
        */
        interface IAjaxError extends Error, IAjaxResponse<any> {
        }
        /**
        * @name AjaxPromise
        * @memberof plat.async
        * @kind class
        *
        * @extends {plat.async.Promise}
        * @implements {plat.async.IAjaxPromise}
        *
        * @description
        * Describes a type of {@link plat.async.Promise|Promise} that fulfills with an {@link plat.async.IAjaxResponse|IAjaxResponse} and can be optionally cancelled.
        *
        * @typeparam {any} R The type of the response object in the {@link plat.async.IAjaxResponse|IAjaxResponse}.
        */
        class AjaxPromise<R> extends Promise<IAjaxResponse<R>> implements IAjaxPromise<R> {
            /**
            * @name $Window
            * @memberof plat.async.AjaxPromise
            * @kind property
            * @access public
            * @readonly
            *
            * @type {Window}
            *
            * @description
            * The Window object.
            */
            public $Window: Window;
            /**
            * @name __http
            * @memberof plat.async.AjaxPromise
            * @kind property
            * @access private
            * @readonly
            *
            * @type {plat.async.HttpRequest}
            *
            * @description
            * The {@link plat.async.HttpRequest|HttpRequest} object.
            */
            private __http;
            /**
            * @name constructor
            * @memberof plat.async.AjaxPromise
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * The constructor method for the {@link plat.async.AjaxPromise}.
            *
            * @param {plat.async.IAjaxResolveFunction} resolveFunction The promise resolve function.
            *
            * @returns {plat.async.AjaxPromise}
            */
            constructor(resolveFunction: IAjaxResolveFunction<R>);
            /**
            * @name constructor
            * @memberof plat.async.AjaxPromise
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * The constructor method for the {@link plat.async.AjaxPromise}.
            *
            * @param {plat.async.IAjaxResolveFunction} resolveFunction The promise resolve function.
            * @param {any} promise The promise object to allow for cancelling the {@link plat.async.AjaxPromise}.
            *
            * @returns {plat.async.AjaxPromise}
            */
            constructor(resolveFunction: IAjaxResolveFunction<R>, promise: any);
            /**
            * @name cancel
            * @memberof plat.async.AjaxPromise
            * @kind function
            * @access public
            *
            * @description
            * A method to cancel the AJAX call associated with this {@link plat.async.AjaxPromise}.
            *
            * @returns {void}
            */
            public cancel(): void;
            /**
            * @name then
            * @memberof plat.async.AjaxPromise
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IAjaxThenable<U>}
            */
            public then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
            /**
            * @name then
            * @memberof plat.async.AjaxPromise
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IAjaxThenable<U>}
            */
            public then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>, onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
            /**
            * @name then
            * @memberof plat.async.AjaxPromise
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IAjaxThenable<U>}
            */
            public then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>, onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
            /**
            * @name then
            * @memberof plat.async.AjaxPromise
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IAjaxThenable<U>}
            */
            public then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.AjaxPromise
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IAjaxThenable<U>} A promise that resolves with the input type parameter U.
            */
            public catch<U>(onRejected: (error: any) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.AjaxPromise
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @typeparam {any} U The return type of the returned promise.
            *
            * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
            * onRejected method in the promise chain will be called.
            *
            * @returns {plat.async.IAjaxThenable<U>} A promise that resolves with the input type parameter U.
            */
            public catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
        }
        /**
        * @name IAjaxThenable
        * @memberof plat.async
        * @kind interface
        *
        * @extends {plat.async.IThenable}
        *
        * @description
        * Describes a type of {@link plat.async.IThenable|IThenable} that can optionally cancel it's associated AJAX call.
        *
        * @typeparam {any} R The return type for the {@link plat.async.IThenable|IThenable}.
        */
        interface IAjaxThenable<R> extends IThenable<R> {
            /**
            * @name cancel
            * @memberof plat.async.IAjaxThenable
            * @kind function
            * @access public
            *
            * @description
            * A method to cancel the AJAX call associated with this {@link plat.async.AjaxPromise}.
            *
            * @returns {void}
            */
            cancel(): void;
            /**
            * @name then
            * @memberof plat.async.IAjaxThenable
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: R) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            then<U>(onFulfilled: (success: R) => IAjaxThenable<U>, onRejected?: (error: any) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
            * @name then
            * @memberof plat.async.IAjaxThenable
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: R) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            then<U>(onFulfilled: (success: R) => IAjaxThenable<U>, onRejected?: (error: any) => U): IAjaxThenable<U>;
            /**
            * @name then
            * @memberof plat.async.IAjaxThenable
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
            * @name then
            * @memberof plat.async.IAjaxThenable
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAjaxThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.IAjaxThenable
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            catch<U>(onRejected: (error: any) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.IAjaxThenable
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
        }
        /**
        * @name IAjaxPromise
        * @memberof plat.async
        * @kind interface
        *
        * @extends {plat.async.IAjaxThenable}
        *
        * @description
        * Describes a type of {@link plat.async.IPromise|IPromise} that fulfills with an {@link plat.async.IAjaxResponse|IAjaxResponse} and can be optionally cancelled.
        *
        * @typeparam {any} R The type of the response object in the {@link plat.async.IAjaxResponse|IAjaxResponse}.
        */
        interface IAjaxPromise<R> extends IAjaxThenable<IAjaxResponse<R>> {
            /**
            * @name cancel
            * @memberof plat.async.IAjaxPromise
            * @kind function
            * @access public
            *
            * @description
            * A method to cancel the AJAX call associated with this {@link plat.async.AjaxPromise}.
            *
            * @returns {void}
            */
            cancel(): void;
            /**
            * @name then
            * @memberof plat.async.IAjaxPromise
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IAjaxThenable<U>, onRejected?: (error: IAjaxError) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
            * @name then
            * @memberof plat.async.IAjaxPromise
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IAjaxThenable<U>, onRejected?: (error: IAjaxError) => U): IAjaxThenable<U>;
            /**
            * @name then
            * @memberof plat.async.IAjaxPromise
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
            * @name then
            * @memberof plat.async.IAjaxPromise
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Takes in two methods, called when/if the promise fulfills/rejects.
            *
            * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
            * next then method in the promise chain.
            *
            * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
            * If undefined the next onFulfilled method in the promise chain will be called.
            * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => U): IAjaxThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.IAjaxPromise
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            catch<U>(onRejected: (error: IAjaxError) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
            * @name catch
            * @memberof plat.async.IAjaxPromise
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
            *
            * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
            * If undefined the next onRejected method in the promise chain will be called.
            */
            catch<U>(onRejected: (error: IAjaxError) => U): IAjaxThenable<U>;
        }
        /**
        * @name IHttpResponseType
        * @memberof plat.async
        * @kind interface
        *
        * @description
        * Describes an object that provides value mappings for XMLHttpRequestResponseTypes
        */
        interface IHttpResponseType {
            /**
            * @name DEFAULT
            * @memberof plat.async.IHttpResponseType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * The default response type (empty string)
            */
            DEFAULT: string;
            /**
            * @name ARRAYBUFFER
            * @memberof plat.async.IHttpResponseType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * The arrayBuffer type ('arrayBuffer')
            */
            ARRAYBUFFER: string;
            /**
            * @name BLOB
            * @memberof plat.async.IHttpResponseType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * The blob type ('blob')
            */
            BLOB: string;
            /**
            * @name DOCUMENT
            * @memberof plat.async.IHttpResponseType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * The document type ('document')
            */
            DOCUMENT: string;
            /**
            * @name JSON
            * @memberof plat.async.IHttpResponseType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * The json type ('json')
            */
            JSON: string;
            /**
            * @name TEXT
            * @memberof plat.async.IHttpResponseType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * The text type ('text')
            */
            TEXT: string;
        }
        /**
        * @name IHttpContentType
        * @memberof plat.async
        * @kind interface
        *
        * @description
        * Describes an object that provides Content-Type mappings for Http POST requests.
        */
        interface IHttpContentType {
            /**
            * @name ENCODED_FORM
            * @memberof plat.async.IHttpContentType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Standard denotation for form encoded data. All objects are converted
            * to string key-value pairs.
            */
            ENCODED_FORM: string;
            /**
            * @name JSON
            * @memberof plat.async.IHttpContentType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Standard denotation for JavaScript Object Notation (JSON).
            */
            JSON: string;
            /**
            * @name MULTIPART_FORM
            * @memberof plat.async.IHttpContentType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Standard denotation for a multi-part Webform. Associated with
            * an entype of 'multipart/form-data'.
            */
            MULTIPART_FORM: string;
            /**
            * @name OCTET_STREAM
            * @memberof plat.async.IHttpContentType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Standard denotation for arbitrary binary data.
            */
            OCTET_STREAM: string;
            /**
            * @name XML
            * @memberof plat.async.IHttpContentType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Standard denotation for XML files.
            */
            XML: string;
            /**
            * @name PLAIN_TEXT
            * @memberof plat.async.IHttpContentType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Standard denotation for textual data.
            */
            PLAIN_TEXT: string;
            /**
            * @name HTML
            * @memberof plat.async.IHttpContentType
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Standard denotation for HTML.
            */
            HTML: string;
        }
        /**
        * @name Http
        * @memberof plat.async
        * @kind class
        *
        * @implements {plat.async.IHttp}
        *
        * @description
        * The instantiated class of the injectable for making
        * AJAX requests.
        */
        class Http implements IHttp {
            /**
            * @name config
            * @memberof plat.async.Http
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.async.IHttpConfig}
            *
            * @description
            * Default Http config
            */
            static config: IHttpConfig;
            /**
            * @name responseType
            * @memberof plat.async.Http
            * @kind property
            * @access public
            *
            * @type {plat.async.IHttpResponseType}
            *
            * @description
            * Provides value mappings for XMLHttpRequestResponseTypes
            */
            public responseType: IHttpResponseType;
            /**
            * @name contentType
            * @memberof plat.async.Http
            * @kind property
            * @access public
            *
            * @type {plat.async.IHttpContentType}
            *
            * @description
            * Provides Content-Type mappings for Http POST requests.
            */
            public contentType: IHttpContentType;
            /**
            * @name ajax
            * @memberof plat.async.Http
            * @kind function
            * @access public
            *
            * @description
            * A wrapper method for the Http class that creates and executes a new Http with
            * the specified {@link plat.async.IAjaxOptions|IAjaxOptions}. This function will check if
            * XMLHttpRequest level 2 is present, and will default to JSONP if it isn't and
            * the request is cross-domain.
            *
            * @typeparam {any} R The type of the {@link plat.async.IAjaxPromise|IAjaxPromise}
            *
            * @param {plat.async.IHttpConfig} options The {@link plat.async.IAjaxOptions|IAjaxOptions} for either the XMLHttpRequest
            * or the JSONP callback.
            *
            * @returns {plat.async.IAjaxPromise} A promise, when fulfilled
            * or rejected, will return an {@link plat.async.IAjaxResponse|IAjaxResponse} object.
            */
            public ajax<R>(options: IHttpConfig): IAjaxPromise<R>;
            /**
            * @name jsonp
            * @memberof plat.async.Http
            * @kind function
            * @access public
            *
            * @description
            * A direct method to force a cross-domain JSONP request.
            *
            * @typeparam {any} R The type of the {@link plat.async.IAjaxPromise|IAjaxPromise}
            *
            * @param {plat.async.IJsonpConfig} options The {@link plat.async.IJsonpConfig|IJsonpConfig}
            *
            * @returns {plat.async.IAjaxPromise} A promise, when fulfilled or rejected, will return an
            * {@link plat.async.IAjaxResponse|IAjaxResponse} object.
            */
            public jsonp<R>(options: IJsonpConfig): IAjaxPromise<R>;
            /**
            * @name json
            * @memberof plat.async.Http
            * @kind function
            * @access public
            *
            * @description
            * Makes an ajax request, specifying responseType: 'json'.
            *
            * @typeparam {any} R The type of the {@link plat.async.IAjaxPromise|IAjaxPromise}
            *
            * @param {plat.async.IHttpConfig} options The {@link plat.async.IHttpConfig|IHttpConfig}
            * for either the XMLHttpRequest or the JSONP callback.
            *
            * @returns {plat.async.IAjaxPromise} A promise, when fulfilled or rejected,
            * will return an {@link plat.async.IAjaxResponse|IAjaxResponse} object, with the response
            * being a parsed JSON object (assuming valid JSON).
            */
            public json<R>(options: IHttpConfig): IAjaxPromise<R>;
        }
        /**
        * The Type for referencing the '$Http' injectable as a dependency.
        */
        function IHttp(): IHttp;
        /**
        * @name IHttp
        * @memberof plat.async
        * @kind interface
        *
        * @description
        * The interface of the injectable for making
        * AJAX requests.
        */
        interface IHttp {
            /**
            * @name responseType
            * @memberof plat.async.IHttp
            * @kind property
            * @access public
            *
            * @type {plat.async.IHttpResponseType}
            *
            * @description
            * Provides value mappings for
            * XMLHttpRequestResponseTypes
            */
            responseType: IHttpResponseType;
            /**
            * @name contentType
            * @memberof plat.async.IHttp
            * @kind property
            * @access public
            *
            * @type {plat.async.IHttpContentType}
            *
            * @description
            * Provides Content-Type mappings for Http POST requests.
            */
            contentType: IHttpContentType;
            /**
            * @name ajax
            * @memberof plat.async.IHttp
            * @kind function
            * @access public
            *
            * @description
            * A wrapper method for the Http class that creates and executes a new Http with
            * the specified {@link plat.async.IAjaxOptions|IAjaxOptions}. This function will check if
            * XMLHttpRequest level 2 is present, and will default to JSONP if it isn't and
            * the request is cross-domain.
            *
            * @typeparam {any} R The type of the {@link plat.async.IAjaxPromise|IAjaxPromise}
            *
            * @param {plat.async.IHttpConfig} options The {@link plat.async.IAjaxOptions|IAjaxOptions} for either the XMLHttpRequest
            * or the JSONP callback.
            *
            * @returns {plat.async.AjaxPromise} A promise, when fulfilled
            * or rejected, will return an {@link plat.async.IAjaxResponse|IAjaxResponse} object.
            */
            ajax<R>(options: IHttpConfig): IAjaxPromise<R>;
            /**
            * @name jsonp
            * @memberof plat.async.IHttp
            * @kind function
            * @access public
            *
            * @description
            * A direct method to force a cross-domain JSONP request.
            *
            * @typeparam {any} R The type of the {@link plat.async.IAjaxPromise|IAjaxPromise}
            *
            * @param {plat.async.IJsonpConfig} options The {@link plat.async.IJsonpConfig|IJsonpConfig}
            *
            * @returns {plat.async.IAjaxPromise} A promise, when fulfilled or rejected, will return an
            * {@link plat.async.IAjaxResponse|IAjaxResponse} object.
            */
            jsonp? <R>(options: IJsonpConfig): IAjaxPromise<R>;
            /**
            * @name json
            * @memberof plat.async.IHttp
            * @kind function
            * @access public
            *
            * @description
            * Makes an ajax request, specifying responseType: 'json'.
            *
            * @typeparam {any} R The type of the {@link plat.async.IAjaxPromise|IAjaxPromise}
            *
            * @param {plat.async.IHttpConfig} options The {@link plat.async.IHttpConfig|IHttpConfig}
            * for either the XMLHttpRequest or the JSONP callback.
            *
            * @returns {plat.async.IAjaxPromise} A promise, when fulfilled or rejected,
            * will return an {@link plat.async.IAjaxResponse|IAjaxResponse} object, with the response
            * being a parsed JSON object (assuming valid JSON).
            */
            json? <R>(options: IHttpConfig): IAjaxPromise<R>;
        }
        /**
        * The Type for referencing the '$HttpConfig' injectable as a dependency.
        */
        function IHttpConfig(): IHttpConfig;
    }
    /**
    * @name async
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds all classes and interfaces related to async components in platypus.
    */
    /**
    * @name storage
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds classes and interfaces related to storage in platypus.
    */
    module storage {
        /**
        * A Cache class, for use with the $CacheFactory injectable. Used for storing objects.
        * Takes in a generic type corresponding to the type of objects it contains.
        *
        */
        class Cache<T> implements ICache<T> {
            /**
            * Method for creating a new Cache. Takes a generic type to denote the
            * type of objects stored in the new Cache.  If the Cache already exists
            * in the $CacheFactory, a new Cache will not be created.
            *
            * @static
            * @param id The id of the new Cache.
            * @param options ICacheOptions for customizing the Cache.
            */
            static create<T>(id: string, options?: ICacheOptions): ICache<T>;
            /**
            * Gets a cache out of the $CacheFactory if it exists.
            *
            * @static
            * @param id The identifier used to search for the cache.
            *
            * @returns {Cache<T>|undefined}
            */
            static fetch<T>(id: string): ICache<T>;
            /**
            * Clears the CacheFactory and all of its caches.
            *
            * @static
            */
            static clear(): void;
            private __size;
            private __id;
            private __options;
            /**
            * @param id The id to use to retrieve the cache from the CacheFactory.
            * @param options The ICacheOptions for customizing the cache.
            */
            constructor(id: string, options?: ICacheOptions);
            public info(): ICacheInfo;
            public put(key: string, value: T): T;
            public read(key: string): T;
            public remove(key: string): void;
            public clear(): void;
            public dispose(): void;
        }
        /**
        * The Type for referencing the '$CacheFactory' injectable as a dependency.
        */
        function ICacheFactory(): ICacheFactory;
        /**
        * Used to manage all the defined caches for the current application session.
        */
        interface ICacheFactory {
            /**
            * Method for creating a new ICache. Takes a generic type to denote the
            * type of objects stored in the new ICache.  If the ICache already exists
            * in the ICacheStatic, a new ICache will not be created.
            *
            * @param id The id of the new ICache.
            * @param options ICacheOptions for customizing the ICache.
            *
            * @returns {ICache} The newly created ICache object.
            */
            create<T>(id: string, options?: ICacheOptions): ICache<T>;
            /**
            * Gets a cache out of the ICacheStatic if it exists.
            *
            * @param id The identifier used to search for the cache.
            *
            * @returns {ICache|undefined}
            */
            fetch<T>(id: string): ICache<T>;
            /**
            * Clears the ICacheStatic and all of its caches.
            */
            clear(): void;
        }
        /**
        * The ICache interface describing a cache. Takes in a generic type
        * corresponding to the type of objects stored in the cache.
        */
        interface ICache<T> {
            /**
            * Method for accessing information about an ICache.
            */
            info(): ICacheInfo;
            /**
            * Method for inserting an object into an ICache.
            *
            * @param key The key to use for storage/retrieval of the object.
            * @param value The value to store with the associated key.
            *
            * @returns {T} The value inserted into an ICache.
            */
            put(key: string, value: T): T;
            /**
            * Method for retrieving an object from an ICache.
            *
            * @param key The key to search for in an ICache.
            *
            * @returns {T|undefined} The value found at the associated key.
            * Returns undefined for an ICache miss.
            */
            read(key: string): T;
            /**
            * Method for removing an object from an ICache.
            *
            * @param key The key to remove from an ICache.
            */
            remove(key: string): void;
            /**
            * Method for clearing an ICache, removing all of its keys.
            */
            clear(): void;
            /**
            * Method for removing an ICache from the $CacheFactory.
            */
            dispose(): void;
        }
        /**
        * The Type for referencing the '$ManagerCache' injectable as a dependency.
        */
        function IManagerCache(): ICache<processing.INodeManager>;
        /**
        * Options for a cache.
        */
        interface ICacheOptions {
            /**
            * Specifies a timeout for a cache value. When a value
            * is put in the cache, it will be valid for the given
            * period of time (in milliseconds). After the timeout
            * is reached, the value will automatically be removed
            * from the cache.
            */
            timeout?: number;
        }
        /**
        * Contains information about an ICache.
        */
        interface ICacheInfo {
            /**
            * A unique id for the ICache object, used to
            * retrieve the ICache out of the $CacheFactory.
            */
            id: string;
            /**
            * Represents the number of items in the ICache.
            */
            size: number;
            /**
            * Represents the ICacheOptions that the ICache is
            * using.
            */
            options: ICacheOptions;
        }
        /**
        * Used for caching compiled nodes. This class will
        * clone a template when you put it in the cache. It will
        * also clone the template when you retrieve it.
        */
        class TemplateCache extends Cache<any> implements ITemplateCache {
            public $Promise: async.IPromise;
            constructor();
            public put(key: string, value: Node): async.IThenable<DocumentFragment>;
            public put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;
            public read(key: string): async.IThenable<DocumentFragment>;
        }
        /**
        * The Type for referencing the '$TemplateCache' injectable as a dependency.
        */
        function ITemplateCache(): ITemplateCache;
        /**
        * Interface for TemplateCache, used to manage all templates. Returns a unique template
        * for every read, to avoid having to call cloneNode.
        */
        interface ITemplateCache extends ICache<async.IThenable<DocumentFragment>> {
            /**
            * Stores a Node in the cache as a DocumentFragment.
            *
            * @param key The key used to store the value.
            * @param value The Node.
            */
            put(key: string, value: Node): async.IThenable<DocumentFragment>;
            /**
            * Stores a Promise in the cache.
            *
            * @param key The key used to store the value.
            * @param value The Promise.
            */
            put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;
            /**
            * Method for retrieving a Node from an ITemplateCache. The returned DocumentFragment will be
            * cloned to avoid manipulating the cached template.
            *
            * @param key The key to search for in an ITemplateCache.
            */
            read(key: string): async.IThenable<DocumentFragment>;
        }
        /**
        * A base class for storing data with a designated storage type.
        */
        class BaseStorage implements IBaseStorage {
            constructor();
            public length : number;
            public clear(): void;
            public getItem<T>(key: string): T;
            public key(index: number): string;
            public removeItem(key: string): void;
            public setItem(key: string, data: any): void;
        }
        /**
        * An object designed for storing data with a designated storage type.
        */
        interface IBaseStorage {
            /**
            * Returns the number of items in storage.
            */
            length: number;
            /**
            * Clears storage, deleting all of its keys.
            */
            clear(): void;
            /**
            * Gets an item out of storage with the assigned key.
            *
            * @param key The key of the item to retrieve from storage.
            * @returns {T} The item retrieved from storage.
            */
            getItem<T>(key: string): T;
            /**
            * Allows for iterating over storage keys with an index. When
            * called with an index, it will return the key at that index in
            * storage.
            *
            * @param index The index used to retrieve the associated key.
            * @returns {string} The key at the given index.
            */
            key(index: number): string;
            /**
            * Searches in storage for an item and removes it if it
            * exists.
            *
            * @param key the Key of the item to remove from storage.
            */
            removeItem(key: string): void;
            /**
            * Adds data to storage with the designated key.
            *
            * @param key The key of the item to store in storage.
            * @param data The data to store in storage with the key.
            */
            setItem(key: string, data: any): void;
        }
        /**
        * A class used to wrap local storage into an injectable.
        */
        class LocalStorage extends BaseStorage implements ILocalStorage {
            private __storage;
        }
        /**
        * The Type for referencing the '$LocalStorage' injectable as a dependency.
        */
        function ILocalStorage(): ILocalStorage;
        /**
        * Describes an object used to wrap local storage into an injectable.
        */
        interface ILocalStorage {
            /**
            * Returns the number of items in localStorage.
            */
            length: number;
            /**
            * Clears localStorage, deleting all of its keys.
            */
            clear(): void;
            /**
            * Gets an item out of local storage with the assigned key.
            *
            * @param key The key of the item to retrieve from localStorage.
            * @returns {T} The item retrieved from localStorage.
            */
            getItem<T>(key: string): T;
            /**
            * Allows for iterating over localStorage keys with an index. When
            * called with an index, it will return the key at that index in
            * localStorage.
            *
            * @param index The index used to retrieve the associated key.
            * @returns {string} The key at the given index.
            */
            key(index: number): string;
            /**
            * Searches in localStorage for an item and removes it if it
            * exists.
            *
            * @param key the Key of the item to remove from localStorage.
            */
            removeItem(key: string): void;
            /**
            * Adds data to localStorage with the designated key.
            *
            * @param key The key of the item to store in localStorage.
            * @param data The data to store in localStorage with the key.
            */
            setItem(key: string, data: any): void;
        }
        /**
        * A class for wrapping SessionStorage as an injectable.
        */
        class SessionStorage extends BaseStorage implements ISessionStorage {
            private __storage;
        }
        /**
        * The Type for referencing the '$SessionStorage' injectable as a dependency.
        */
        function ISessionStorage(): ISessionStorage;
        /**
        * Describes an object used to wrap session storage into an injectable.
        */
        interface ISessionStorage {
            /**
            * Returns the number of items in sessionStorage.
            */
            length: number;
            /**
            * Clears sessionStorage, deleting all of its keys.
            */
            clear(): void;
            /**
            * Gets an item out of session storage with the assigned key.
            *
            * @param key The key of the item to retrieve from sessionStorage.
            * @returns {T} The item retrieved from sessionStorage.
            */
            getItem<T>(key: string): T;
            /**
            * Allows for iterating over sessionStorage keys with an index. When
            * called with an index, it will return the key at that index in
            * sessionStorage.
            *
            * @param index The index used to retrieve the associated key.
            * @returns {string} The key at the given index.
            */
            key(index: number): string;
            /**
            * Searches in sessionStorage for an item and removes it if it
            * exists.
            *
            * @param key the Key of the item to remove from sessionStorage.
            */
            removeItem(key: string): void;
            /**
            * Adds data to sessionStorage with the designated key.
            *
            * @param key The key of the item to store in sessionStorage.
            * @param data The data to store in sessionStorage with the key.
            */
            setItem(key: string, data: any): void;
        }
    }
    /**
    * @name observable
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds all classes and interfaces related to observable components in platypus.
    */
    module observable {
        /**
        * Manages observable properties on control.
        * Facilitates in data-binding and managing context inheritance.
        */
        class ContextManager implements IContextManager {
            /**
            * A set of functions to be fired when a particular observed array is mutated.
            */
            static observedArrayListeners: IObject<IObject<{
                (ev: IArrayMethodInfo<any>): void;
            }[]>>;
            /**
            * Gets the ContextManager associated to the given control. If no
            * ContextManager exists, one is created for that control.
            *
            * @static
            * @param control The control on which to locate the ContextManager
            */
            static getManager(control: IControl): IContextManager;
            /**
            * Removes all the listeners for a given control's uid.
            *
            * @static
            * @param control The control whose manager is being disposed.
            * @param persist Whether or not the control's context needs to
            * be persisted post-disposal or can be set to null.
            */
            static dispose(control: IControl, persist?: boolean): void;
            /**
            * Removes all listeners for an Array associated with a given uid.
            *
            * @static
            * @param absoluteIdentifier The identifier used to locate the array.
            * @param uid The uid used to search for listeners.
            */
            static removeArrayListeners(absoluteIdentifier: string, uid: string): void;
            /**
            * Safely retrieves the local context given a root context and an Array of
            * property strings.
            *
            * @static
            * @param rootContext The root object in which to find a local context.
            * @param split The string array containing properties used to index into
            * the rootContext.
            */
            static getContext(rootContext: any, split: string[]): any;
            /**
            * Defines an object property with the associated value. Useful for unobserving objects.
            *
            * @param obj The object on which to define the property.
            * @param key The property key.
            * @param value The value used to define the property.
            * @param enumerable Whether or not the property should be enumerable (able to be iterated
            * over in a loop)
            * @param configurable Whether or not the property is able to be reconfigured.
            */
            static defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
            /**
            * Defines an object property with only a getter function. Useful for creating constant values
            * or overwriting constant values.
            *
            * @param obj The object on which to define the property.
            * @param key The property key.
            * @param value The value used to define the property.
            * @param enumerable Whether or not the property should be enumerable (able to be iterated
            * over in a loop)
            * @param configurable Whether or not the property is able to be reconfigured.
            */
            static defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
            /**
            * Pushes the function for removing an observed property upon adding the property.
            *
            * @static
            * @param identifer The identifier for which the remove listener is being pushed.
            * @param uid The uid of the control observing the identifier.
            * @param listener The function for removing the observed property.
            */
            static pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
            /**
            * Removes a specified identifier from being observed for a given set of control uids.
            *
            * @static
            * @param uids The set of uids for which to remove the specified identifier.
            * @param identifier The identifier to stop observing.
            */
            static removeIdentifier(uids: string[], identifier: string): void;
            /**
            * Ensures that an identifier path will exist on a given control. Will create
            * objects/arrays if necessary.
            *
            * @param control The control on which to create the context.
            * @param identifier The period-delimited identifier string used to create
            * the context path.
            */
            static createContext(control: ui.ITemplateControl, identifier: string): any;
            private static __managers;
            private static __controls;
            public $Compat: ICompat;
            public context: any;
            private __identifiers;
            private __identifierHash;
            private __lengthListeners;
            private __contextObjects;
            private __isArrayFunction;
            private __observedIdentifier;
            public getContext(split: string[]): any;
            public observe(absoluteIdentifier: string, observableListener: IListener): IRemoveListener;
            public observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void, absoluteIdentifier: string, array: any[], oldArray: any[]): IRemoveListener;
            public dispose(): void;
            /**
            * Gets the immediate context of identifier by splitting on '.'
            * and observes the objects along the way.
            *
            * @param identifier The identifier being observed.
            */
            public _getImmediateContext(identifier: string): any;
            /**
            * Obtains the old value and new value of a given context
            * property on a property changed event.
            *
            * @param split The split identifier of the property that changed.
            * @param newRootContext The new context.
            * @param oldRootContext The old context.
            */
            public _getValues(split: string[], newRootContext: any, oldRootContext: any): {
                newValue: any;
                oldValue: any;
            };
            /**
            * Notifies all child properties being observed that a parent property
            * has changed.
            *
            * @param identifier The identifier for the property that changed.
            * @param newValue The new value of the property.
            * @param oldValue The old value of the property.
            */
            public _notifyChildProperties(identifier: string, newValue: any, oldValue: any): void;
            /**
            * Adds a listener to be fired for a particular identifier.
            *
            * @param absoluteIdentifier The identifier being observed.
            * @param observableListener The function and associated uid to be fired
            * for this identifier.
            */
            public _addObservableListener(absoluteIdentifier: string, observableListener: IListener): IRemoveListener;
            /**
            * Observes a property on a given context specified by an identifier.
            *
            * @param identifier The full identifier path for the property being observed.
            * @param immediateContext The object whose property will be observed.
            * @param key The property key for the value on the immediateContext that's
            * being observed.
            */
            public _define(identifier: string, immediateContext: any, key: string): void;
            /**
            * Intercepts an array function for observation.
            *
            * @param absoluteIdentifier The full identifier path for the observed array.
            * @param method The array method being called.
            */
            public _overwriteArrayFunction(absoluteIdentifier: string, method: string): (...args: any[]) => any;
            /**
            * Removes a single listener callback
            *
            * @param identifier The identifier attached to the callbacks.
            * @param listener The observable listener to remove.
            */
            public _removeCallback(identifier: string, listener: IListener): void;
            /**
            * Checks if the specified identifier is already being
            * observed in this context.
            *
            * @param identifier The identifier being observed.
            */
            public _hasIdentifier(identifier: string): boolean;
            /**
            * Executes the listeners for the specified identifier on
            * this context.
            *
            * @param identifier The identifier attached to the callbacks.
            * @param value The new value on this context specified by
            * the identifier.
            * @param oldValue The old value on this context specified by
            * the identifier.
            */
            public _execute(identifier: string, value: any, oldValue: any): void;
            private __defineObject(identifier, immediateContext, key);
            private __definePrimitive(identifier, immediateContext, key);
            private __add(identifier, observableListener);
            private __addHashValues(identifier);
        }
        /**
        * The Type for referencing the '$ContextManagerStatic' injectable as a dependency.
        */
        function IContextManagerStatic(): IContextManagerStatic;
        /**
        * The external interface for the '$ContextManagerStatic' injectable.
        */
        interface IContextManagerStatic {
            /**
            * A set of functions to be fired when a particular observed array is mutated.
            *
            * @static
            */
            observedArrayListeners: IObject<IObject<{
                (ev: IArrayMethodInfo<any>): void;
            }[]>>;
            /**
            * Gets the ContextManager associated to the given control. If no
            * ContextManager exists, one is created for that control.
            *
            * @static
            * @param control The control on which to locate the ContextManager
            */
            getManager(control: IControl): IContextManager;
            getManager(control: any): IContextManager;
            /**
            * Removes all the listeners for a given control's uid.
            *
            * @static
            * @param control The control whose manager is being disposed.
            * @param persist Whether or not the control's context needs to
            * be persisted post-disposal or can be set to null.
            */
            dispose(control: IControl, persist?: boolean): void;
            /**
            * Removes all listeners for an Array associated with a given uid.
            *
            * @static
            * @param absoluteIdentifier The identifier used to locate the array.
            * @param uid The uid used to search for listeners.
            */
            removeArrayListeners(absoluteIdentifier: string, uid: string): void;
            /**
            * Safely retrieves the local context given a root context and an Array of
            * property strings.
            *
            * @static
            * @param rootContext The root object in which to find a local context.
            * @param split The string array containing properties used to index into
            * the rootContext.
            */
            getContext(rootContext: any, split: string[]): void;
            /**
            * Defines an object property with the associated value. Useful for unobserving objects.
            *
            * @static
            * @param obj The object on which to define the property.
            * @param key The property key.
            * @param value The value used to define the property.
            * @param enumerable Whether or not the property should be enumerable (able to be iterated
            * over in a loop)
            * @param configurable Whether or not the property is able to be reconfigured.
            */
            defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
            /**
            * Defines an object property as a getter with the associated value. Useful for unobserving objects.
            *
            * @static
            * @param obj The object on which to define the property.
            * @param key The property key.
            * @param value The value used to define the property.
            * @param enumerable Whether or not the property should be enumerable (able to be iterated
            * over in a loop)
            * @param configurable Whether or not the property is able to be reconfigured.
            */
            defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
            /**
            * Pushes the function for removing an observed property upon adding the property.
            *
            * @static
            * @param identifer The identifier for which the remove listener is being pushed.
            * @param uid The uid of the control observing the identifier.
            * @param listener The function for removing the observed property.
            */
            pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
            /**
            * Removes a specified identifier from being observed for a given set of control uids.
            *
            * @static
            * @param uids The set of uids for which to remove the specified identifier.
            * @param identifier The identifier to stop observing.
            */
            removeIdentifier(uids: string[], identifier: string): void;
            /**
            * Ensures that an identifier path will exist on a given control. Will create
            * objects/arrays if necessary.
            *
            * @static
            * @param control The control on which to create the context.
            * @param identifier The period-delimited identifier string used to create
            * the context path.
            */
            createContext(control: ui.ITemplateControl, identifier: string): any;
        }
        /**
        * Describes an object that manages observing properties on any object.
        */
        interface IContextManager {
            /**
            * The context to be managed.
            */
            context: any;
            /**
            * Safely retrieves the local context for this ContextManager given an Array of
            * property strings.
            *
            * @param split The string array containing properties used to index into
            * the context.
            */
            getContext(split: string[]): any;
            /**
            * Given a period-delimited identifier, observes an object and calls the given listener when the
            * object changes.
            *
            * @param absoluteIdentifier The period-delimited identifier noting the property to be observed.
            * @param observableListener An object implmenting IObservableListener. The listener will be
            * notified of object changes.
            */
            observe(identifier: string, observableListener: IListener): IRemoveListener;
            /**
            * Observes an array and calls the listener when certain functions are called on
            * that array. The watched functions are push, pop, shift, splice, unshift, sort,
            * and reverse.
            *
            * @param uid The uid of the object observing the array.
            * @param listener The callback for when an observed Array function has been called.
            * @param absoluteIdentifier The identifier from the root context used to find the array.
            * @param array The array to be observed.
            * @param oldArray The old array to stop observing.
            */
            observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void, absoluteIdentifier: string, array: any[], oldArray: any[]): IRemoveListener;
            /**
            * Disposes the memory for an IContextManager.
            */
            dispose(): void;
        }
        /**
        * An object specifying a listener callback function and a unique id to use to manage the
        * listener.
        */
        interface IListener {
            /**
            * A listener method called when the object it is observing is changed.
            *
            * @param value The new value of the object.
            * @param oldValue The previous value of the object.
            */
            listener(value: any, oldValue: any): void;
            /**
            * A unique id used to manage the listener.
            */
            uid: string;
        }
        /**
        * An object for Array method info. Takes a
        * generic type to denote the type of array it uses.
        */
        interface IArrayMethodInfo<T> {
            /**
            * The method name that was called. Possible values are:
            * 'push', 'pop', 'reverse', 'shift', 'sort', 'splice',
            * and 'unshift'
            */
            method: string;
            /**
            * The value returned from the called function.
            */
            returnValue: any;
            /**
            * The previous value of the array.
            */
            oldArray: T[];
            /**
            * The new value of the array.
            */
            newArray: T[];
            /**
            * The arguments passed into the array function.
            */
            arguments: any[];
        }
        /**
        * @name IObservableProperty
        * @memberof plat.observable
        * @access public
        * @kind interface
        *
        * @description
        * Defines the object added to a template control when its element
        * has an attribute control that extends {@link plat.controls.ObservableAttributeControl|ObservableAttributeControl}.
        *
        * This will contain the value of the expression as well as a way to observe the
        * attribute value for changes.
        *
        * @remarks
        * {@link plat.controls.Option|plat-options} is a control that implements this interface, and puts an 'options'
        * property on its associated template control.
        *
        * The generic type corresponds to the type of object created when the attribute
        * expression is evaluated.
        *
        * @typeparam {any} T The type of the value obtained from the attribute's expression.
        */
        interface IObservableProperty<T> {
            /**
            * @name value
            * @memberof plat.observable.IObservableProperty
            * @access public
            * @kind property
            *
            * @type {T}
            *
            * @description
            * The value obtained from evaluating the attribute's expression.
            */
            value: T;
            /**
            * @name observe
            * @memberof plat.observable.IObservableProperty
            * @access public
            * @kind function
            *
            * @description
            * A method for observing the attribute for changes.
            *
            * @param {(newValue: T, oldValue: T) => void} listener The listener callback which will be pre-bound to the
            * template control.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            observe(listener: (newValue: T, oldValue: T) => void): IRemoveListener;
        }
    }
    /**
    * @name events
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds classes and interfaces related to event management components in platypus.
    */
    module events {
        /**
        * @name DispatchEvent
        * @memberof plat.events
        * @kind class
        * @access public
        *
        * @implements {plat.events.IDispatchEventInstance}
        *
        * @description
        * An event class that propagates through a control tree.
        * Propagation of the event always starts at the sender, allowing a control to both
        * initialize and consume an event. If a consumer of an event throws an error while
        * handling the event it will be logged to the app using exception.warn. Errors will
        * not stop propagation of the event.
        */
        class DispatchEvent implements IDispatchEventInstance {
            /**
            * @name $EventManagerStatic
            * @memberof plat.events.DispatchEvent
            * @kind property
            * @access public
            *
            * @type {plat.events.IEventManagerStatic}
            *
            * @description
            * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
            */
            public $EventManagerStatic: IEventManagerStatic;
            /**
            * @name sender
            * @memberof plat.events.DispatchEvent
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * The object that initiated the event.
            */
            public sender: any;
            /**
            * @name name
            * @memberof plat.events.DispatchEvent
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The name of the event.
            */
            public name: string;
            /**
            * @name direction
            * @memberof plat.events.DispatchEvent
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event direction this object is using for propagation.
            */
            public direction: string;
            /**
            * @name initialize
            * @memberof plat.events.DispatchEvent
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object that initiated the event.
            * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}.
            *
            * @returns {void}
            */
            public initialize(name: string, sender: any, direction?: 'up'): void;
            /**
            * @name initialize
            * @memberof plat.events.DispatchEvent
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object that initiated the event.
            * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}.
            *
            * @returns {void}
            */
            public initialize(name: string, sender: any, direction?: 'down'): void;
            /**
            * @name initialize
            * @memberof plat.events.DispatchEvent
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object that initiated the event.
            * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
            *
            * @returns {void}
            */
            public initialize(name: string, sender: any, direction?: 'direct'): void;
            /**
            * @name initialize
            * @memberof plat.events.DispatchEvent
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object that initiated the event.
            * @param {string} direction The direction of propagation
            *
            * @returns {void}
            */
            public initialize(name: string, sender: any, direction?: string): void;
            /**
            * @name stopPropagation
            * @memberof plat.events.DispatchEvent
            * @kind function
            * @access public
            *
            * @description
            * Call this method to halt the propagation of an upward-moving event.
            * Downward events cannot be stopped with this method.
            *
            * @returns {void}
            */
            public stopPropagation(): void;
        }
        /**
        * The Type for referencing the '$DispatchEventInstance' injectable as a dependency.
        */
        function IDispatchEventInstance(): IDispatchEventInstance;
        /**
        * @name IDispatchEventInstance
        * @memberof plat.events
        * @kind interface
        * @access public
        *
        * @description
        * Describes an event that propagates through a control tree.
        * Propagation of the event always starts at the sender, allowing a control to both
        * initialize and consume an event. If a consumer of an event throws an error while
        * handling the event it will be logged to the app using exception.warn. Errors will
        * not stop propagation of the event.
        */
        interface IDispatchEventInstance {
            /**
            * @name sender
            * @memberof plat.events.IDispatchEventInstance
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * The object that initiated the event.
            */
            sender: any;
            /**
            * @name name
            * @memberof plat.events.IDispatchEventInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The name of the event.
            */
            name: string;
            /**
            * @name direction
            * @memberof plat.events.IDispatchEventInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event direction this object is using for propagation.
            */
            direction: string;
            /**
            * @name initialize
            * @memberof plat.events.IDispatchEventInstance
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object that initiated the event.
            * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}.
            *
            * @returns {void}
            */
            initialize(name: string, sender: any, direction?: 'up'): void;
            /**
            * @name initialize
            * @memberof plat.events.IDispatchEventInstance
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object that initiated the event.
            * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}.
            *
            * @returns {void}
            */
            initialize(name: string, sender: any, direction?: 'down'): void;
            /**
            * @name initialize
            * @memberof plat.events.IDispatchEventInstance
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object that initiated the event.
            * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
            *
            * @returns {void}
            */
            initialize(name: string, sender: any, direction?: 'direct'): void;
            /**
            * @name initialize
            * @memberof plat.events.IDispatchEventInstance
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object that initiated the event.
            * @param {string} direction The direction of propagation
            *
            * @returns {void}
            */
            initialize(name: string, sender: any, direction?: string): void;
            /**
            * @name stopPropagation
            * @memberof plat.events.IDispatchEventInstance
            * @kind function
            * @access public
            *
            * @description
            * Call this method to halt the propagation of an upward-moving event.
            * Downward events cannot be stopped with this method.
            *
            * @returns {void}
            */
            stopPropagation(): void;
        }
        /**
        * @name LifecycleEvent
        * @memberof plat.events
        * @kind class
        *
        * @extends {plat.events.DispatchEvent}
        * @implements {plat.events.ILifecycleEvent}
        *
        * @description
        * Represents a Lifecycle Event. Lifecycle Events are always direct events.
        */
        class LifecycleEvent extends DispatchEvent implements ILifecycleEvent {
            /**
            * @name dispatch
            * @memberof plat.events.LifecycleEvent
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Creates a new LifecycleEvent and fires it.
            *
            * @typeparam {Error} E The type of Error this event represents.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            *
            * @returns {void}
            */
            static dispatch(name: string, sender: any): void;
            /**
            * @name initialize
            * @memberof plat.events.LifecycleEvent
            * @kind function
            * @access public
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            */
            public initialize(name: string, sender: any): void;
        }
        /**
        * The Type for referencing the '$LifecycleEventStatic' injectable as a dependency.
        */
        function ILifecycleEventStatic(): ILifecycleEventStatic;
        /**
        * @name ILifecycleEventStatic
        * @memberof plat.events
        * @kind interface
        *
        * @description
        * Dispatches {@link plat.events.LifecycleEvent|LifecycleEvent}
        */
        interface ILifecycleEventStatic {
            /**
            * @name dispatch
            * @memberof plat.events.ILifecycleEventStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Creates a new LifecycleEvent and fires it.
            *
            * @typeparam {Error} E The type of Error this event represents.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            *
            * @returns {void}
            */
            dispatch(name: string, sender: any): void;
        }
        /**
        * @name ILifecycleEvent
        * @memberof plat.events
        * @kind interface
        *
        * @extends {plat.events.IDispatchEventInstance}
        *
        * @description
        * Represents a Lifecycle Event. Lifecycle Events are always direct events.
        */
        interface ILifecycleEvent extends IDispatchEventInstance {
            /**
            * @name initialize
            * @memberof plat.events.ILifecycleEvent
            * @kind function
            * @access public
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            *
            * @returns {void}
            */
            initialize(name: string, sender: any): void;
        }
        /**
        * @name EventManager
        * @memberof plat.events
        * @kind class
        * @access public
        *
        * @description
        * Manages dispatching events, handling all propagating events as well as any error handling.
        */
        class EventManager {
            /**
            * @name $Compat
            * @memberof plat.events.EventManager
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.ICompat}
            *
            * @description
            * Reference to the {@link plat.ICompat|ICompat} injectable.
            */
            static $Compat: ICompat;
            /**
            * @name $Document
            * @memberof plat.events.EventManager
            * @kind property
            * @access public
            * @static
            *
            * @type {Document}
            *
            * @description
            * Reference to the {@link plat.Document|Document} injectable.
            */
            static $Document: Document;
            /**
            * @name $Window
            * @memberof plat.events.EventManager
            * @kind property
            * @access public
            * @static
            *
            * @type {Window}
            *
            * @description
            * Reference to the {@link plat.Window|Window} injectable.
            */
            static $Window: Window;
            /**
            * @name $Dom
            * @memberof plat.events.EventManager
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.ui.IDom}
            *
            * @description
            * Reference to the {@link plat.ui.IDom|IDom} injectable.
            */
            static $Dom: ui.IDom;
            /**
            * @name UP
            * @memberof plat.events.EventManager
            * @kind property
            * @access public
            * @static
            * @readonly
            *
            * @type {string}
            *
            * @description
            * An upward-moving event will start at the sender and move
            * up the parent chain.
            */
            static UP: string;
            /**
            * @name DOWN
            * @memberof plat.events.EventManager
            * @kind property
            * @access public
            * @static
            * @readonly
            *
            * @type {string}
            *
            * @description
            * A downward-moving event will start at the sender and move
            * to its children and beyond.
            */
            static DOWN: string;
            /**
            * @name DIRECT
            * @memberof plat.events.EventManager
            * @kind property
            * @access public
            * @static
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Goes through all listeners for an event name, ignoring order.
            */
            static DIRECT: string;
            /**
            * @name propagatingEvents
            * @memberof plat.events.EventManager
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.IObject<boolean>}
            *
            * @description
            * Keeps track of which events are currently propagating.
            */
            static propagatingEvents: IObject<boolean>;
            /**
            * @name __eventsListeners
            * @memberof plat.events.EventManager
            * @kind property
            * @access private
            * @static
            *
            * @type {plat.IObject<plat.events.IEventsListener>}
            *
            * @description
            * Holds all the {@link plat.events.IEventsListener|event listeners} keyed by uid.
            */
            private static __eventsListeners;
            /**
            * @name __lifecycleEventListeners
            * @memberof plat.events.EventManager
            * @kind property
            * @access private
            * @static
            *
            * @type {Array<{ name: string; value: () => void; }>}
            *
            * @description
            * Holds all the event listeners for the application lifefycle events.
            */
            private static __lifecycleEventListeners;
            /**
            * @name __initialized
            * @memberof plat.events.EventManager
            * @kind property
            * @access private
            * @static
            *
            * @type {boolean}
            *
            * @description
            * whether or not the event manager has been initialized.
            */
            private static __initialized;
            /**
            * @name initialize
            * @memberof plat.events.EventManager
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Initializes the {@link plat.events.EventManager|EventManager}, creating the initial ALM event listeners.
            *
            * @returns {void}
            */
            static initialize(): void;
            /**
            * @name dispose
            * @memberof plat.events.EventManager
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Removes all event listeners for a given uid. Useful for garbage collection when
            * certain objects that listen to events go out of scope.
            *
            * @param {string} uid The uid for which the event listeners will be removed.'
            *
            * @returns {void}
            */
            static dispose(uid: string): void;
            /**
            * @name on
            * @memberof plat.events.EventManager
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when a {@link plat.events.DispatchEvent|DispatchEvent} is
            * propagating over the given uid. Any number of listeners can exist for a single event name.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName The name of the event to listen to.
            * @param {(ev: IDispatchEventInstance, ...args: any[]) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            static on(uid: string, eventName: string, listener: (ev: IDispatchEventInstance, ...args: any[]) => void, context?: any): IRemoveListener;
            /**
            * @name dispatch
            * @memberof plat.events.EventManager
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Looks for listeners to a given event name, and fires the listeners using the specified
            * event direction.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object sending the event.
            * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}.
            * @param {Array<any>} args? The arguments to send to the listeners.
            *
            * @returns {void}
            */
            static dispatch(name: string, sender: any, direction: 'up', args?: any[]): void;
            /**
            * @name dispatch
            * @memberof plat.events.EventManager
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Looks for listeners to a given event name, and fires the listeners using the specified
            * event direction.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object sending the event.
            * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}.
            * @param {Array<any>} args? The arguments to send to the listeners.
            *
            * @returns {void}
            */
            static dispatch(name: string, sender: any, direction: 'down', args?: any[]): void;
            /**
            * @name dispatch
            * @memberof plat.events.EventManager
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Looks for listeners to a given event name, and fires the listeners using the specified
            * event direction.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object sending the event.
            * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
            * @param {Array<any>} args? The arguments to send to the listeners.
            *
            * @returns {void}
            */
            static dispatch(name: string, sender: any, direction: 'direct', args?: any[]): void;
            /**
            * @name dispatch
            * @memberof plat.events.EventManager
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Looks for listeners to a given event name, and fires the listeners using the specified
            * event direction.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object sending the event.
            * @param {string} direction The direction in which to send the event.
            * @param {Array<any>} args? The arguments to send to the listeners.
            *
            * @returns {void}
            */
            static dispatch(name: string, sender: any, direction: string, args?: any[]): void;
            /**
            * @name hasDirection
            * @memberof plat.events.EventManager
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns whether or not the given string is a registered direction.
            *
            * @param {string} direction The direction of the event
            *
            * @returns {boolean} Whether or not the direction is valid.
            */
            static hasDirection(direction: string): boolean;
            /**
            * @name sendEvent
            * @memberof plat.events.EventManager
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Determines the appropriate direction and dispatches the event accordingly.
            *
            * @param {plat.events.IDispatchEventInstance} event The {@link plat.events.DispatchEvent|DispatchEvent} to send
            * @param {Array<any>} args The arguments associated with the event
            *
            * @returns {void}
            */
            static sendEvent(event: IDispatchEventInstance, args?: any[]): void;
            /**
            * @name _dispatchUp
            * @memberof plat.events.EventManager
            * @kind function
            * @access protected
            * @static
            *
            * @description
            * Dispatches the event up the control chain.
            *
            * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
            * @param {Array<any>} args The arguments associated with the event.
            *
            * @returns {void}
            */
            static _dispatchUp(event: IDispatchEventInstance, args: any[]): void;
            /**
            * @name _dispatchDown
            * @memberof plat.events.EventManager
            * @kind function
            * @access protected
            * @static
            *
            * @description
            * Dispatches the event down the control chain.
            *
            * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
            * @param {Array<any>} args The arguments associated with the event.
            *
            * @returns {void}
            */
            static _dispatchDown(event: IDispatchEventInstance, args: any[]): void;
            /**
            * @name _dispatchDirect
            * @memberof plat.events.EventManager
            * @kind function
            * @access protected
            * @static
            *
            * @description
            * Dispatches the event directly to all listeners.
            *
            * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
            * @param {Array<any>} args The arguments associated with the event.
            *
            * @returns {void}
            */
            static _dispatchDirect(event: IDispatchEventInstance, args: any[]): void;
            /**
            * @name __executeEvent
            * @memberof plat.events.EventManager
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Dispatches the event to the listeners for the given uid.
            *
            * @param {string} uid The uid used to find the event listeners.
            * @param {plat.events.IDispatchEventInstance} The event.
            * @param {Array<any>} args The arguments to send to the listeners.
            *
            * @returns {void}
            */
            private static __executeEvent(uid, ev, args);
            /**
            * @name __callListeners
            * @memberof plat.events.EventManager
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Calls event listeners with the given context, event, and arguments.
            *
            * @param {any} context The context with which to call the listeners.
            * @param {plat.events.IDispatchEventInstance} The event.
            * @param {Array<(ev: IDispatchEventInstance, ...args: any[]) => void>} The event listeners.
            * @param {Array<any>} args The arguments to send to the listeners.
            *
            * @returns {void}
            */
            private static __callListeners(context, ev, listeners, args);
        }
        /**
        * The Type for referencing the '$EventManagerStatic' injectable as a dependency.
        */
        function IEventManagerStatic($Compat?: ICompat, $Document?: Document, $Window?: Window, $Dom?: ui.IDom): IEventManagerStatic;
        /**
        * @name IEventManagerStatic
        * @memberof plat.events
        * @kind interface
        * @access public
        *
        * @description
        * Manages dispatching events, handling all propagating events as well as any error handling.
        */
        interface IEventManagerStatic {
            /**
            * @name $Compat
            * @memberof plat.events.IEventManagerStatic
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.ICompat}
            *
            * @description
            * Reference to the {@link plat.ICompat|ICompat} injectable.
            */
            $Compat: ICompat;
            /**
            * @name $Document
            * @memberof plat.events.IEventManagerStatic
            * @kind property
            * @access public
            * @static
            *
            * @type {Document}
            *
            * @description
            * Reference to the {@link plat.Document|Document} injectable.
            */
            $Document: Document;
            /**
            * @name $Window
            * @memberof plat.events.IEventManagerStatic
            * @kind property
            * @access public
            * @static
            *
            * @type {Window}
            *
            * @description
            * Reference to the {@link plat.Window|Window} injectable.
            */
            $Window: Window;
            /**
            * @name $Dom
            * @memberof plat.events.IEventManagerStatic
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.ui.IDom}
            *
            * @description
            * Reference to the {@link plat.ui.IDom|IDom} injectable.
            */
            $Dom: ui.IDom;
            /**
            * @name UP
            * @memberof plat.events.IEventManagerStatic
            * @kind property
            * @access public
            * @static
            * @readonly
            *
            * @type {string}
            *
            * @description
            * An upward-moving event will start at the sender and move
            * up the parent chain.
            */
            UP: string;
            /**
            * @name DOWN
            * @memberof plat.events.IEventManagerStatic
            * @kind property
            * @access public
            * @static
            * @readonly
            *
            * @type {string}
            *
            * @description
            * A downward-moving event will start at the sender and move
            * to its children and beyond.
            */
            DOWN: string;
            /**
            * @name DIRECT
            * @memberof plat.events.IEventManagerStatic
            * @kind property
            * @access public
            * @static
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Goes through all listeners for an event name, ignoring order.
            */
            DIRECT: string;
            /**
            * @name propagatingEvents
            * @memberof plat.events.IEventManagerStatic
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.IObject<boolean>}
            *
            * @description
            * Keeps track of which events are currently propagating.
            */
            propagatingEvents: IObject<boolean>;
            /**
            * @name initialize
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Initializes the {@link plat.events.EventManager|EventManager}, creating the initial ALM event listeners.
            *
            * @returns {void}
            */
            initialize(): void;
            /**
            * @name dispose
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Removes all event listeners for a given uid. Useful for garbage collection when
            * certain objects that listen to events go out of scope.
            *
            * @param {string} uid The uid for which the event listeners will be removed.'
            *
            * @returns {void}
            */
            dispose(uid: string): void;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Registers a listener for the beforeNavigate Event. The listener will be called when the beforeNavigate
            * event is propagating over the given uid. Any number of listeners can exist for a single event name. The
            * listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further
            * calls to event listeners.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName='beforeNavigate' The name of the event to listen to.
            * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: 'beforeNavigate', listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Registers a listener for the navigating Event. The listener will be called when the navigating
            * event is propagating over the given uid. Any number of listeners can exist for a single event name.
            * The listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further
            * calls to event listeners.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName='navigating' Specifies that this is a listener for the navigating event.
            * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: 'navigating', listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 2
            *
            * @description
            * Registers a listener for the navigated Event. The listener will be called when the navigated
            * event is propagating over the given uid. Any number of listeners can exist for a single event name.
            * The listener cannot cancel the event.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName='navigated' Specifies that this is a listener for the navigated event.
            * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: 'navigated', listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 3
            *
            * @description
            * Registers a listener for a NavigationEvent. The listener will be called when a NavigationEvent is
            * propagating over the given uid. Any number of listeners can exist for a single event name.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName The name of the event to listen to.
            * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: string, listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 4
            *
            * @description
            * Registers a listener for the ready AlmEvent. The ready event will be called when the app
            * is ready to start.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName='ready' Specifies that the listener is for the ready event.
            * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: 'ready', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 5
            *
            * @description
            * Registers a listener for the suspend AlmEvent. The listener will be called when an app
            * is being suspended.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName='suspend' Specifies the listener is for the suspend event.
            * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: 'suspend', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 6
            *
            * @description
            * Registers a listener for the resume AlmEvent. The listener will be called when an app
            * is being resumeed.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName='suspend' Specifies the listener is for the resume event.
            * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: 'resume', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 7
            *
            * @description
            * Registers a listener for the online AlmEvent. This event fires when the app's network
            * connection changes to be online.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName='online' Specifies the listener is for the online event.
            * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: 'online', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 8
            *
            * @description
            * Registers a listener for the offline AlmEvent. This event fires when the app's network
            * connection changes to be offline.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName='offline' Specifies the listener is for the offline event.
            * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: 'offline', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 9
            *
            * @description
            * Registers a listener for an AlmEvent. The listener will be called when an AlmEvent is
            * propagating over the given uid. Any number of listeners can exist for a single event name.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName The name of the event to listen to.
            * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: string, listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 10
            *
            * @description
            * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
            * propagating over the given uid. Any number of listeners can exist for a single event name.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName The name of the event to listen to.
            * @param {(ev: plat.events.IErrorEvent<Error>) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: 'error', listener: (ev: IErrorEvent<Error>) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 11
            *
            * @description
            * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
            * propagating over the given uid. Any number of listeners can exist for a single event name.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName The name of the event to listen to.
            * @param {(ev: plat.events.IErrorEvent<any>) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: string, listener: (ev: IErrorEvent<any>) => void, context?: any): IRemoveListener;
            /**
            * @name on
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            * @variation 12
            *
            * @description
            * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is
            * propagating over the given uid. Any number of listeners can exist for a single event name.
            *
            * @param {string} uid A unique id to associate with the object registering the listener.
            * @param {string} eventName The name of the event to listen to.
            * @param {(ev: plat.events.IDispatchEventInstance, ...args: any[]) => void} listener The method called when the event is fired.
            * @param {any} context? The context with which to call the listener method.
            *
            * @returns {plat.IRemoveListener} A method for removing the listener.
            */
            on(uid: string, eventName: string, listener: (ev: IDispatchEventInstance, ...args: any[]) => void, context?: any): IRemoveListener;
            /**
            * @name dispatch
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Looks for listeners to a given event name, and fires the listeners using the specified
            * event direction.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object sending the event.
            * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}.
            * @param {Array<any>} args? The arguments to send to the listeners.
            *
            * @returns {void}
            */
            dispatch(name: string, sender: any, direction: 'up', args?: any[]): void;
            /**
            * @name dispatch
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Looks for listeners to a given event name, and fires the listeners using the specified
            * event direction.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object sending the event.
            * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}.
            * @param {Array<any>} args? The arguments to send to the listeners.
            *
            * @returns {void}
            */
            dispatch(name: string, sender: any, direction: 'down', args?: any[]): void;
            /**
            * @name dispatch
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Looks for listeners to a given event name, and fires the listeners using the specified
            * event direction.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object sending the event.
            * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
            * @param {Array<any>} args? The arguments to send to the listeners.
            *
            * @returns {void}
            */
            dispatch(name: string, sender: any, direction: 'direct', args?: any[]): void;
            /**
            * @name dispatch
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Looks for listeners to a given event name, and fires the listeners using the specified
            * event direction.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The object sending the event.
            * @param {string} direction The direction in which to send the event.
            * @param {Array<any>} args? The arguments to send to the listeners.
            *
            * @returns {void}
            */
            dispatch(name: string, sender: any, direction: string, args?: any[]): void;
            /**
            * @name hasDirection
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns whether or not the given string is a registered direction.
            *
            * @param {string} direction The direction of the event
            *
            * @returns {boolean} Whether or not the direction is valid.
            */
            hasDirection(direction: string): boolean;
            /**
            * @name sendEvent
            * @memberof plat.events.IEventManagerStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Determines the appropriate direction and dispatches the event accordingly.
            *
            * @param {plat.events.IDispatchEventInstance} event The {@link plat.events.DispatchEvent|DispatchEvent} to send
            * @param {Array<any>} args The arguments associated with the event
            *
            * @returns {void}
            */
            sendEvent(event: IDispatchEventInstance, args?: any[]): void;
        }
        /**
        * A class used by the Navigator to dispatch Navigation events. Allows anyone to listen
        * for navigation events and respond to them, even canceling them if necessary.
        *
        * @generic P Corresponds to the type of event parameter.
        */
        class NavigationEvent<P> extends DispatchEvent implements INavigationEvent<P> {
            static $EventManagerStatic: IEventManagerStatic;
            /**
            * Dispatches an event with the specified target type.
            *
            * @param name The name of the event (e.g. 'beforeNavigate')
            * @param sender The object sending the event.
            * @param eventOptions An object implementing INavigationEvent, specifying what all event listeners
            * will be passed.
            */
            static dispatch<P>(name: string, sender: any, eventOptions: INavigationEventOptions<P>): INavigationEvent<P>;
            public parameter: P;
            public options: navigation.IBaseNavigationOptions;
            public target: any;
            public type: string;
            public cancelable: boolean;
            public cancelled: boolean;
            public initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>): void;
            public cancel(): void;
        }
        /**
        * The Type for referencing the '$NavigationEventStatic' injectable as a dependency.
        */
        function INavigationEventStatic($EventManagerStatic?: IEventManagerStatic): INavigationEventStatic;
        /**
        * The intended external interface for the '$NavigationEventStatic' injectable.
        */
        interface INavigationEventStatic {
            /**
            * Dispatches an event with the specified target type.
            *
            * @generic P Corresponds to the type of the event parameter.
            *
            * @param name The name of the event (e.g. 'beforeNavigate')
            * @param sender The object sending the event.
            * @param eventOptions An object implementing INavigationEvent, specifying what all event listeners
            * will be passed.
            */
            dispatch<P>(name: string, sender: any, eventOptions: INavigationEventOptions<P>): INavigationEvent<P>;
        }
        /**
        * Describes an object used by the Navigator to dispatch Navigation events.
        */
        interface INavigationEvent<P> extends IDispatchEventInstance {
            /**
            * Navigation parameter, used to send objects from one view control to another.
            */
            parameter: P;
            /**
            * The INavigationOptions in use for the navigation.
            */
            options: navigation.IBaseNavigationOptions;
            /**
            * The navigation event target. Its type depends on the type of Navigation event.
            */
            target: any;
            /**
            * Specifies the type of IViewControl for the Route Event.
            */
            type: string;
            /**
            * The sender of the event.
            */
            sender: any;
            /**
            * States whether or not this event is able to be cancelled. Some navigation events can be
            * cancelled, preventing further navigation.
            */
            cancelable?: boolean;
            /**
            * States whether or not this event has been cancelled.
            */
            cancelled?: boolean;
            /**
            * If the event is cancelable (ev.cancelable), calling this method will cancel the event.
            */
            cancel(): void;
            /**
            * Initializes the event members.
            *
            * @param name The name of the event.
            * @param sender The object that initiated the event.
            * @param direction='direct' Equivalent to EventManager.direction.DIRECT.
            *
            * @see EventManager.direction
            */
            initialize(name: string, sender: any, direction?: 'direct', eventOptions?: INavigationEventOptions<P>): any;
            /**
            * Initializes the event members.
            *
            * @param name The name of the event.
            * @param sender The object that initiated the event.
            * @param direction This will always be a direct event no matter what is sent in.
            *
            * @see EventManager.direction
            */
            initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>): any;
        }
        /**
        * Describes options for an INavigationEvent. The generic parameter specifies the
        * target type for the event.
        */
        interface INavigationEventOptions<P> {
            /**
            * Navigation parameter, used to send objects from one view control to another.
            */
            parameter: P;
            /**
            * The INavigationOptions in use for the navigation.
            */
            options: navigation.IBaseNavigationOptions;
            /**
            * The navigation event target. Its type depends on the type of Navigation event.
            */
            target: any;
            /**
            * Specifies the type of IViewControl for the Route Event.
            */
            type: string;
            /**
            * States whether or not this event is able to be cancelled. Some navigation events can be
            * cancelled, preventing further navigation.
            */
            cancelable?: boolean;
        }
        /**
        * @name ErrorEvent
        * @memberof plat.events
        * @kind class
        *
        * @extends {plat.events.DispatchEvent}
        * @implements {plat.events.IErrorEvent}
        *
        * @description
        * Represents an internal Error Event. This is used for any
        * internal errors (both fatal and warnings). All error events are
        * direct events.
        *
        * @typeparam {Error} E The type of Error this event represents.
        */
        class ErrorEvent<E extends Error> extends DispatchEvent implements IErrorEvent<E> {
            /**
            * @name $EventManagerStatic
            * @memberof plat.events.ErrorEvent
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.events.IEventManagerStatic}
            *
            * @description
            * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
            */
            static $EventManagerStatic: IEventManagerStatic;
            /**
            * @name dispatch
            * @memberof plat.events.ErrorEvent
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Creates a new ErrorEvent and fires it.
            *
            * @typeparam {Error} E The type of Error this event represents.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            * @param {E} error The error that occurred, resulting in the event.
            *
            * @returns {void}
            */
            static dispatch<E extends Error>(name: string, sender: any, error: E): void;
            /**
            * @name error
            * @memberof plat.events.ErrorEvent
            * @kind property
            * @access public
            * @static
            *
            * @type {E}
            *
            * @description
            * The error being dispatched.
            */
            public error: E;
            /**
            * @name initialize
            * @memberof plat.events.ErrorEvent
            * @kind function
            * @access public
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
            * @param {E} error The error that occurred, resulting in the event.
            *
            * @returns {void}
            */
            public initialize(name: string, sender: any, direction?: 'direct', error?: E): void;
            /**
            * @name initialize
            * @memberof plat.events.ErrorEvent
            * @kind function
            * @access public
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            * @param {string} direction This is always a direct event.
            * @param {E} error The error that occurred, resulting in the event.
            *
            * @returns {void}
            */
            public initialize(name: string, sender: any, direction?: string, error?: E): void;
        }
        /**
        * The Type for referencing the '$ErrorEventStatic' injectable as a dependency.
        */
        function IErrorEventStatic($EventManagerStatic?: IEventManagerStatic): IErrorEventStatic;
        /**
        * @name IErrorEventStatic
        * @memberof plat.events
        * @kind interface
        *
        * @description
        * Dispatches {@link plat.events.ErrorEvent|ErrorEvents}
        */
        interface IErrorEventStatic {
            /**
            * @name dispatch
            * @memberof plat.events.IErrorEventStatic
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Creates a new ErrorEvent and fires it.
            *
            * @typeparam {Error} E The type of Error this event represents.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            * @param {E} error The error that occurred, resulting in the event.
            *
            * @returns {void}
            */
            dispatch<E extends Error>(name: string, sender: any, error: E): void;
        }
        /**
        * @name IErrorEvent
        * @memberof plat.events
        * @kind interface
        *
        * @extends {plat.events.IDispatchEventInstance}
        *
        * @description
        * Represents an internal Error Event. This is used for any
        * internal errors (both fatal and warnings). All error events are
        * direct events.
        *
        * @typeparam {Error} E The type of Error this event represents.
        */
        interface IErrorEvent<E extends Error> extends IDispatchEventInstance {
            /**
            * @name error
            * @memberof plat.events.IErrorEvent
            * @kind property
            * @access public
            * @static
            *
            * @type {E}
            *
            * @description
            * The error being dispatched.
            */
            error: E;
            /**
            * @name initialize
            * @memberof plat.events.IErrorEvent
            * @kind function
            * @access public
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
            * @param {E} error The error that occurred, resulting in the event.
            *
            * @returns {void}
            */
            initialize(name: string, sender: any, direction?: 'direct', error?: E): void;
            /**
            * @name initialize
            * @memberof plat.events.IErrorEvent
            * @kind function
            * @access public
            *
            * @description
            * Initializes the event, populating its public properties.
            *
            * @param {string} name The name of the event.
            * @param {any} sender The sender of the event.
            * @param {string} direction This is always a direct event.
            * @param {E} error The error that occurred, resulting in the event.
            *
            * @returns {void}
            */
            initialize(name: string, sender: any, direction?: string, error?: E): void;
        }
    }
    /**
    * @name Control
    * @memberof plat
    * @kind class
    *
    * @implements {plat.IControl}
    *
    * @description
    * Used for facilitating data and DOM manipulation. Contains lifecycle events
    * as well as properties for communicating with other controls. This is the base
    * class for all types of controls.
    */
    class Control implements IControl {
        /**
        * @name $Parser
        * @memberof plat.Control
        * @kind property
        * @access public
        * @static
        *
        * @type {plat.expressions.IParser}
        *
        * @description
        * Reference to the {@link plat.expressions.IParser|IParser} injectable.
        */
        static $Parser: expressions.IParser;
        /**
        * @name $ContextManagerStatic
        * @memberof plat.Control
        * @kind property
        * @access public
        * @static
        *
        * @type {plat.observable.IContextManagerStatic}
        *
        * @description
        * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
        */
        static $ContextManagerStatic: observable.IContextManagerStatic;
        /**
        * @name $EventManagerStatic
        * @memberof plat.Control
        * @kind property
        * @access public
        * @static
        *
        * @type {plat.events.IEventManagerStatic}
        *
        * @description
        * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
        */
        static $EventManagerStatic: events.IEventManagerStatic;
        /**
        * @name __eventListeners
        * @memberof plat.Control
        * @kind property
        * @access private
        * @static
        *
        * @type {plat.IObject<Array<plat.IRemoveListener>>}
        *
        * @description
        * An object containing all controls' registered event listeners.
        */
        private static __eventListeners;
        /**
        * @name getRootControl
        * @memberof plat.Control
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Finds the ancestor control for the given control that contains the root
        * context.
        *
        * @param {plat.IControl} control The control with which to find the root.
        *
        * @returns {plat.ui.ITemplateControl} The root control.
        */
        static getRootControl(control: IControl): ui.ITemplateControl;
        /**
        * @name load
        * @memberof plat.Control
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Given a control, calls the loaded method for the control if it exists.
        *
        * @param {plat.IControl} control The control to load.
        *
        * @returns {void}
        */
        static load(control: IControl): void;
        /**
        * @name dispose
        * @memberof plat.Control
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Disposes all the necessary memory for a control. Uses specific dispose
        * methods related to a control's constructor if necessary.
        *
        * @param {plat.IControl} control The {@link plat.Control|Control} to dispose.
        *
        * @returns {void}
        */
        static dispose(control: IControl): void;
        /**
        * @name removeParent
        * @memberof plat.Control
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Splices a control from its parent's controls list. Sets the control's parent
        * to null.
        *
        * @param {plat.IControl} control The control whose parent will be removed.
        *
        * @returns {void}
        */
        static removeParent(control: IControl): void;
        /**
        * @name removeEventListeners
        * @memberof plat.Control
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Removes all event listeners for a control with the given uid.
        *
        * @param {plat.IControl} control The control having its event listeners removed.
        *
        * @returns {void}
        */
        static removeEventListeners(control: IControl): void;
        /**
        * @name getInstance
        * @memberof plat.Control
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Returns a new instance of {@link plat.Control|Control}.
        *
        * @returns {plat.IControl} The newly instantiated control.
        */
        static getInstance(): IControl;
        /**
        * @name __addRemoveListener
        * @memberof plat.Control
        * @kind function
        * @access private
        * @static
        *
        * @description
        * Adds a function to remove an event listener for the control specified
        * by its uid.
        *
        * @param {string} uid The uid of the control associated with the remove function.
        * @param {plat.IRemoveListener} listener The remove function to add.
        *
        * @returns {void}
        */
        private static __addRemoveListener(uid, listener);
        /**
        * @name __spliceRemoveListener
        * @memberof plat.Control
        * @kind function
        * @access private
        * @static
        *
        * @description
        * Removes a {@link plat.IRemoveListener|IRemoveListener} from a control's listeners.
        *
        * @param {string} uid The uid of the control associated with the remove function.
        * @param {plat.IRemoveListener} listener The remove function to add.
        *
        * @returns {void}
        */
        private static __spliceRemoveListener(uid, listener);
        /**
        * @name __getControls
        * @memberof plat.Control
        * @kind function
        * @access private
        * @static
        *
        * @description
        * Gets controls that have a specific key/value string pair.
        *
        *
        * @param {plat.IControl} control The at which to start searching for key/value pairs.
        * @param {string} key The key to search for on all the controls in the tree.
        * @param {string} value The expected value used to find similar controls.
        *
        * @returns {Array<plat.IControl>} The controls matching the input key/value pair.
        */
        private static __getControls(control, key, value);
        /**
        * @name uid
        * @memberof plat.Control
        * @kind property
        * @access public
        * @readonly
        *
        * @type {string}
        *
        * @description
        * A unique id, created during instantiation and found on every {@link plat.Control|Control}.
        */
        public uid: string;
        /**
        * @name name
        * @memberof plat.Control
        * @kind property
        * @access public
        * @readonly
        *
        * @type {string}
        *
        * @description
        * The name of a {@link plat.Control|Control}.
        */
        public name: string;
        /**
        * @name type
        * @memberof plat.Control
        * @kind property
        * @access public
        * @readonly
        *
        * @type {string}
        *
        * @description
        * The type of a {@link plat.Control|Control}.
        */
        public type: string;
        /**
        * @name priority
        * @memberof plat.Control
        * @kind property
        * @access public
        *
        * @type {number}
        *
        * @description
        * Specifies the priority of the control. The purpose of
        * this is so that controls like plat-bind can have a higher
        * priority than plat-tap. The plat-bind will be initialized
        * and loaded before plat-tap, meaning it has the first chance
        * to respond to events.
        */
        public priority: number;
        /**
        * @name parent
        * @memberof plat.Control
        * @kind property
        * @access public
        * @readonly
        *
        * @type {plat.ui.ITemplateControl}
        *
        * @description
        * The parent control that created this control.
        */
        public parent: ui.ITemplateControl;
        /**
        * @name element
        * @memberof plat.Control
        * @kind property
        * @access public
        *
        * @type {HTMLElement}
        *
        * @description
        * The HTMLElement that represents this {@link plat.Control|Control}. Should only be modified by controls that implement
        * {plat.ui.ITemplateControl|ITemplateControl}. During initialize the control should populate this element with what it wishes
        * to render to the user.
        *
        * @remarks
        * When there is innerHTML in the element prior to instantiating the control:
        *     The element will include the innerHTML
        * When the control implements templateString or templateUrl:
        *     The serialized DOM will be auto-generated and included in the element. Any
        *     innerHTML will be stored in the innerTemplate property on the control.
        * After an {@link plat.IControl|IControl} is initialized its element will be compiled.
        */
        public element: HTMLElement;
        /**
        * @name attributes
        * @memberof plat.Control
        * @kind property
        * @access public
        *
        * @type {plat.ui.IAttributesInstance}
        *
        * @description
        * The attributes object representing all the attributes for a {@link plat.Control|Control's} element. All attributes are
        * converted from dash notation to camelCase.
        */
        public attributes: ui.IAttributesInstance;
        /**
        * @name dom
        * @memberof plat.Control
        * @kind property
        * @access public
        * @readonly
        *
        * @type {plat.ui.IDom}
        *
        * @description
        * Contains DOM helper methods for manipulating this control's element.
        */
        public dom: ui.IDom;
        /**
        * @name constructor
        * @memberof plat.Control
        * @kind function
        * @access public
        *
        * @description
        * The constructor for a control. Any injectables specified during control registration will be
        * passed into the constructor as arguments as long as the control is instantiated with its associated
        * injector.
        *
        * @returns {plat.Control}
        */
        constructor();
        /**
        * @name initialize
        * @memberof plat.Control
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * The initialize event method for a control. In this method a control should initialize all the necessary
        * variables. This method is typically only necessary for view controls. If a control does not implement
        * {@link plat.ui.IBaseViewControl|IBaseViewControl} then it is not safe to access, observe, or modify
        * the context property in this method. A view control should call services/set context in this method in
        * order to fire the loaded event. No control will be loaded until the view control has specified a context.
        *
        * @returns {void}
        */
        public initialize(): void;
        /**
        * @name loaded
        * @memberof plat.Control
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * The loaded event method for a control. This event is fired after a control has been loaded,
        * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now
        * safe for all controls to access, observe, and modify the context property.
        *
        * @returns {void}
        */
        public loaded(): void;
        /**
        * @name getControlsByName
        * @memberof plat.Control
        * @kind function
        * @access public
        *
        * @description
        * Retrieves all the controls with the specified name.
        *
        * @param {string} name The string name with which to populate the returned controls array.
        *
        * @returns {Array<plat.IControl>} The controls that match the input name.
        */
        public getControlsByName(name: string): IControl[];
        /**
        * @name getControlsByType
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Retrieves all the controls of the specified type.
        *
        * @typeparam {plat.Control} T The type of control to be returned in an Array.
        *
        * @param {string} type The type used to find controls (e.g. 'plat-foreach')
        *
        * @returns {Array<T>} The controls matching the input type.
        */
        public getControlsByType<T extends Control>(type: string): T[];
        /**
        * @name getControlsByType
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Retrieves all the controls of the specified type.
        *
        * @typeparam {plat.Control} T The type of control to be returned in an Array.
        *
        * @param {new () => T} Constructor The constructor used to find controls.
        *
        * @returns {Array<T>} The controls matching the input type.
        */
        public getControlsByType<T extends Control>(Constructor: new() => T): T[];
        /**
        * @name addEventListener
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Adds an event listener of the specified type to the specified element. Removal of the
        * event is handled automatically upon disposal.
        *
        * @param {EventTarget} element The element to add the event listener to.
        * @param {string} type The type of event to listen to.
        * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
        * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
        * of event propagation.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
        */
        public addEventListener(element: EventTarget, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
        * @name addEventListener
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Adds an event listener of the specified type to the specified element. Removal of the
        * event is handled automatically upon disposal.
        *
        * @param {EventTarget} element The element to add the event listener to.
        * @param {string}  type The type of event to listen to.
        * @param {EventListener} listener The listener to fire when the event occurs.
        * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
        * of event propagation.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
        */
        public addEventListener(element: EventTarget, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
        * @name observe
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Allows a {@link plat.Control|Control} to observe any property on its context and receive updates when
        * the property is changed.
        *
        * @typeparam {any} T The type of object to observe.
        *
        * @param {any} context The immediate parent object containing the property.
        * @param {string} property The property identifier to watch for changes.
        * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method will have its 'this'
        * context set to the control instance.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
        */
        public observe<T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
        * @name observe
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Allows a {@link plat.Control|Control} to observe any property on its context and receive updates when
        * the property is changed.
        *
        * @typeparam {any} T The type of object to observe.
        *
        * @param {any} context The immediate parent object containing the property.
        * @param {number} property The property identifier to watch for changes.
        * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method will have its 'this'
        * context set to the control instance.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
        */
        public observe<T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
        * @name observeArray
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Allows a {@link plat.Control|Control} to observe an array and receive updates when certain array-changing methods are called.
        * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
        * every item in the array.
        *
        * @typeparam {any} T The type of the Array to observe.
        *
        * @param {any} context The immediate parent object containing the array as a property.
        * @param {string} property The array property identifier to watch for changes.
        * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called. This method will have its 'this'
        * context set to the control instance.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
        */
        public observeArray<T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
        * @name observeArray
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Allows a {@link plat.Control|Control} to observe an array and receive updates when certain array-changing methods are called.
        * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
        * every item in the array.
        *
        * @typeparam {any} T The type of the Array to observe.
        *
        * @param {any} context The immediate parent object containing the array as a property.
        * @param {number} property The array property identifier to watch for changes.
        * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called. This method will have its 'this'
        * context set to the control instance.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
        */
        public observeArray<T>(context: any, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
        * @name observeExpression
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Parses an expression string and observes any associated identifiers. When an identifier
        * value changes, the listener will be called.
        *
        * @param {string} expression The expression string to watch for changes.
        * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
        */
        public observeExpression(expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
        * @name observeExpression
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Using a {@link plat.expressions.IParsedExpression|IParsedExpression} observes any associated identifiers. When an identifier
        * value changes, the listener will be called.
        *
        * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
        * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
        */
        public observeExpression(expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
        * @name evaluateExpression
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Evaluates an expression string, using the control.parent.context.
        *
        * @param {string} expression The expression string to evaluate.
        * @param {any} aliases Optional alias values to parse with the expression
        *
        * @returns {any} The evaluated expression
        */
        public evaluateExpression(expression: string, aliases?: any): any;
        /**
        * @name evaluateExpression
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Evaluates an {@link plat.expressions.IParsedExpression|IParsedExpression} using the control.parent.context.
        *
        * @param {string} expression The expression string to evaluate.
        * @param {any} aliases Optional alias values to parse with the expression
        *
        * @returns {any} The evaluated expression
        */
        public evaluateExpression(expression: expressions.IParsedExpression, aliases?: any): any;
        /**
        * @name dispatchEvent
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the
        * provided direction mechanism. Controls in the propagation chain that registered
        * the event using the control.on() method will receive the event. Propagation will
        * always start with the sender, so the sender can both produce and consume the same
        * event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * control.on() method.
        * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        public dispatchEvent(name: string, direction?: 'up', ...args: any[]): void;
        /**
        * @name dispatchEvent
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the
        * provided direction mechanism. Controls in the propagation chain that registered
        * the event using the control.on() method will receive the event. Propagation will
        * always start with the sender, so the sender can both produce and consume the same
        * event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * control.on() method.
        * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        public dispatchEvent(name: string, direction?: 'down', ...args: any[]): void;
        /**
        * @name dispatchEvent
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 2
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the
        * provided direction mechanism. Controls in the propagation chain that registered
        * the event using the control.on() method will receive the event. Propagation will
        * always start with the sender, so the sender can both produce and consume the same
        * event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * control.on() method.
        * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        public dispatchEvent(name: string, direction?: 'direct', ...args: any[]): void;
        /**
        * @name dispatchEvent
        * @memberof plat.Control
        * @kind function
        * @access public
        * @variation 3
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the
        * provided direction mechanism. Controls in the propagation chain that registered
        * the event using the control.on() method will receive the event. Propagation will
        * always start with the sender, so the sender can both produce and consume the same
        * event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * control.on() method.
        * @param {string} direction The direction in which to send the event.
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        public dispatchEvent(name: string, direction?: string, ...args: any[]): void;
        /**
        * @name on
        * @memberof plat.Control
        * @kind function
        * @access public
        *
        * @description
        * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when a {@link plat.events.DispatchEvent|DispatchEvent} is
        * propagating over the control. Any number of listeners can exist for a single event name.
        *
        * @param {string} name The name of the event, cooinciding with the {@link plat.events.DispatchEvent|DispatchEvent} name.
        * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when the {@link plat.events.DispatchEvent|DispatchEvent} is fired.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop listening for this event.
        */
        public on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;
        /**
        * @name dispose
        * @memberof plat.Control
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * The dispose event is called when a control is being removed from memory. A control should release
        * all of the memory it is using, including DOM event and property listeners.
        *
        * @returns {void}
        */
        public dispose(): void;
    }
    /**
    * The Type for referencing the '$ControlFactory' injectable as a dependency.
    */
    function IControlFactory($Parser?: expressions.IParser, $ContextManagerStatic?: observable.IContextManagerStatic, $EventManagerStatic?: events.IEventManagerStatic): IControlFactory;
    /**
    * @name IControlFactory
    * @memberof plat
    * @kind interface
    *
    * @description
    * Creates and manages instances of {@link plat.IControl|IControl}.
    */
    interface IControlFactory {
        /**
        * @name getRootControl
        * @memberof plat.IControlFactory
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Finds the ancestor control for the given control that contains the root
        * context.
        *
        * @param {plat.IControl} control The control with which to find the root.
        *
        * @returns {plat.ui.ITemplateControl} The root control.
        */
        getRootControl(control: IControl): ui.ITemplateControl;
        /**
        * @name load
        * @memberof plat.IControlFactory
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Given a control, calls the loaded method for the control if it exists.
        *
        * @param {plat.IControl} control The control to load.
        *
        * @returns {void}
        */
        load(control: IControl): void;
        /**
        * @name dispose
        * @memberof plat.IControlFactory
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Disposes all the necessary memory for a control. Uses specific dispose
        * methods related to a control's constructor if necessary.
        *
        * @param {plat.IControl} control The {@link plat.Control|Control} to dispose.
        *
        * @returns {void}
        */
        dispose(control: IControl): void;
        /**
        * @name removeParent
        * @memberof plat.IControlFactory
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Splices a control from its parent's controls list. Sets the control's parent
        * to null.
        *
        * @param {plat.IControl} control The control whose parent will be removed.
        *
        * @returns {void}
        */
        removeParent(control: IControl): void;
        /**
        * @name removeEventListeners
        * @memberof plat.IControlFactory
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Removes all event listeners for a control with the given uid.
        *
        * @param {plat.IControl} control The control having its event listeners removed.
        *
        * @returns {void}
        */
        removeEventListeners(control: IControl): void;
        /**
        * @name getInstance
        * @memberof plat.IControlFactory
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Returns a new instance of {@link plat.Control|Control}.
        *
        * @returns {plat.IControl} The newly instantiated control.
        */
        getInstance(): IControl;
    }
    /**
    * @name IControl
    * @memberof plat
    * @kind interface
    *
    * @description
    * Used for facilitating data and DOM manipulation. Contains lifecycle events
    * as well as properties for communicating with other controls. This is the base
    * class for all types of controls.
    */
    interface IControl {
        /**
        * @name uid
        * @memberof plat.IControl
        * @kind property
        * @access public
        * @readonly
        *
        * @type {string}
        *
        * @description
        * A unique id, created during instantiation and found on every {@link plat.Control|Control}.
        */
        uid: string;
        /**
        * @name name
        * @memberof plat.IControl
        * @kind property
        * @access public
        * @readonly
        *
        * @type {string}
        *
        * @description
        * The name of a {@link plat.Control|Control}.
        */
        name?: string;
        /**
        * @name type
        * @memberof plat.IControl
        * @kind property
        * @access public
        * @readonly
        *
        * @type {string}
        *
        * @description
        * The type of a {@link plat.Control|Control}.
        */
        type?: string;
        /**
        * @name priority
        * @memberof plat.IControl
        * @kind property
        * @access public
        *
        * @type {number}
        *
        * @description
        * Specifies the priority of the control. The purpose of
        * this is so that controls like plat-bind can have a higher
        * priority than plat-tap. The plat-bind will be initialized
        * and loaded before plat-tap, meaning it has the first chance
        * to respond to events.
        */
        priority?: number;
        /**
        * @name parent
        * @memberof plat.IControl
        * @kind property
        * @access public
        * @readonly
        *
        * @type {plat.ui.ITemplateControl}
        *
        * @description
        * The parent control that created this control.
        */
        parent?: ui.ITemplateControl;
        /**
        * @name element
        * @memberof plat.IControl
        * @kind property
        * @access public
        *
        * @type {HTMLElement}
        *
        * @description
        * The HTMLElement that represents this {@link plat.Control|Control}. Should only be modified by controls that implement
        * {plat.ui.ITemplateControl|ITemplateControl}. During initialize the control should populate this element with what it wishes
        * to render to the user.
        *
        * @remarks
        * When there is innerHTML in the element prior to instantiating the control:
        *     The element will include the innerHTML
        * When the control implements templateString or templateUrl:
        *     The serialized DOM will be auto-generated and included in the element. Any
        *     innerHTML will be stored in the innerTemplate property on the control.
        * After an {@link plat.IControl|IControl} is initialized its element will be compiled.
        */
        element?: HTMLElement;
        /**
        * @name attributes
        * @memberof plat.IControl
        * @kind property
        * @access public
        *
        * @type {plat.ui.IAttributesInstance}
        *
        * @description
        * The attributes object representing all the attributes for a {@link plat.Control|Control's} element. All attributes are
        * converted from dash notation to camelCase.
        */
        attributes?: ui.IAttributesInstance;
        /**
        * @name dom
        * @memberof plat.IControl
        * @kind property
        * @access public
        * @readonly
        *
        * @type {plat.ui.IDom}
        *
        * @description
        * Contains DOM helper methods for manipulating this control's element.
        */
        dom: ui.IDom;
        /**
        * @name initialize
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * The initialize event method for a control. In this method a control should initialize all the necessary
        * variables. This method is typically only necessary for view controls. If a control does not implement
        * {@link plat.ui.IBaseViewControl|IBaseViewControl} then it is not safe to access, observe, or modify
        * the context property in this method. A view control should call services/set context in this method in
        * order to fire the loaded event. No control will be loaded until the view control has specified a context.
        *
        * @returns {void}
        */
        initialize? (): void;
        /**
        * @name loaded
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * The loaded event method for a control. This event is fired after a control has been loaded,
        * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now
        * safe for all controls to access, observe, and modify the context property.
        *
        * @returns {void}
        */
        loaded? (): void;
        /**
        * @name getControlsByName
        * @memberof plat.Control
        * @kind function
        * @access public
        *
        * @description
        * Retrieves all the controls with the specified name.
        *
        * @param {string} name The string name with which to populate the returned controls array.
        *
        * @returns {Array<plat.IControl>} The controls that match the input name.
        */
        getControlsByName? (name: string): IControl[];
        /**
        * @name getControlsByType
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Retrieves all the controls of the specified type.
        *
        * @typeparam {plat.Control} T The type of control to be returned in an Array.
        *
        * @param {string} type The type used to find controls (e.g. 'plat-foreach')
        *
        * @returns {Array<T>} The controls matching the input type.
        */
        getControlsByType? <T extends IControl>(type: string): T[];
        /**
        * @name getControlsByType
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Retrieves all the controls of the specified type.
        *
        * @typeparam {plat.Control} T The type of control to be returned in an Array.
        *
        * @param {new () => T} Constructor The constructor used to find controls.
        *
        * @returns {Array<T>} The controls matching the input type.
        */
        getControlsByType? <T extends IControl>(Constructor: new() => T): T[];
        /**
        * @name addEventListener
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Adds an event listener of the specified type to the specified element. Removal of the
        * event is handled automatically upon disposal.
        *
        * @param {EventTarget} element The element to add the event listener to.
        * @param {string} type The type of event to listen to.
        * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
        * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
        * of event propagation.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
        */
        addEventListener? (element: EventTarget, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
        * @name addEventListener
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Adds an event listener of the specified type to the specified element. Removal of the
        * event is handled automatically upon disposal.
        *
        * @param {EventTarget} element The element to add the event listener to.
        * @param {string}  type The type of event to listen to.
        * @param {EventListener} listener The listener to fire when the event occurs.
        * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
        * of event propagation.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
        */
        addEventListener? (element: EventTarget, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
        * @name observe
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Allows a {@link plat.Control|Control} to observe any property on its context and receive updates when
        * the property is changed.
        *
        * @typeparam {any} T The type of object to observe.
        *
        * @param {any} context The immediate parent object containing the property.
        * @param {string} property The property identifier to watch for changes.
        * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method will have its 'this'
        * context set to the control instance.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
        */
        observe? <T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
        * @name observe
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Allows a {@link plat.Control|Control} to observe any property on its context and receive updates when
        * the property is changed.
        *
        * @typeparam {any} T The type of object to observe.
        *
        * @param {any} context The immediate parent object containing the property.
        * @param {number} property The property identifier to watch for changes.
        * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method will have its 'this'
        * context set to the control instance.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
        */
        observe? <T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
        * @name observeArray
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Allows a {@link plat.Control|Control} to observe an array and receive updates when certain array-changing methods are called.
        * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
        * every item in the array.
        *
        * @typeparam {any} T The type of the Array to observe.
        *
        * @param {any} context The immediate parent object containing the array as a property.
        * @param {string} property The array property identifier to watch for changes.
        * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called. This method will have its 'this'
        * context set to the control instance.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
        */
        observeArray? <T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
        * @name observeArray
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Allows a {@link plat.Control|Control} to observe an array and receive updates when certain array-changing methods are called.
        * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
        * every item in the array.
        *
        * @typeparam {any} T The type of the Array to observe.
        *
        * @param {any} context The immediate parent object containing the array as a property.
        * @param {number} property The array property identifier to watch for changes.
        * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called. This method will have its 'this'
        * context set to the control instance.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
        */
        observeArray? <T>(context: any, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
        * @name observeExpression
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Parses an expression string and observes any associated identifiers. When an identifier
        * value changes, the listener will be called.
        *
        * @param {string} expression The expression string to watch for changes.
        * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
        */
        observeExpression? (expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
        * @name observeExpression
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Using a {@link plat.expressions.IParsedExpression|IParsedExpression} observes any associated identifiers. When an identifier
        * value changes, the listener will be called.
        *
        * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
        * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
        */
        observeExpression? (expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
        * @name evaluateExpression
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Evaluates an expression string, using the control.parent.context.
        *
        * @param {string} expression The expression string to evaluate.
        * @param {any} aliases Optional alias values to parse with the expression
        *
        * @returns {any} The evaluated expression
        */
        evaluateExpression? (expression: string, aliases?: any): any;
        /**
        * @name evaluateExpression
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Evaluates an {@link plat.expressions.IParsedExpression|IParsedExpression} using the control.parent.context.
        *
        * @param {string} expression The expression string to evaluate.
        * @param {any} aliases Optional alias values to parse with the expression
        *
        * @returns {any} The evaluated expression
        */
        evaluateExpression? (expression: expressions.IParsedExpression, aliases?: any): any;
        /**
        * @name dispatchEvent
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the
        * provided direction mechanism. Controls in the propagation chain that registered
        * the event using the control.on() method will receive the event. Propagation will
        * always start with the sender, so the sender can both produce and consume the same
        * event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * control.on() method.
        * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        dispatchEvent? (name: string, direction?: 'up', ...args: any[]): void;
        /**
        * @name dispatchEvent
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the
        * provided direction mechanism. Controls in the propagation chain that registered
        * the event using the control.on() method will receive the event. Propagation will
        * always start with the sender, so the sender can both produce and consume the same
        * event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * control.on() method.
        * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        dispatchEvent? (name: string, direction?: 'down', ...args: any[]): void;
        /**
        * @name dispatchEvent
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 2
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the
        * provided direction mechanism. Controls in the propagation chain that registered
        * the event using the control.on() method will receive the event. Propagation will
        * always start with the sender, so the sender can both produce and consume the same
        * event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * control.on() method.
        * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        dispatchEvent? (name: string, direction?: 'direct', ...args: any[]): void;
        /**
        * @name dispatchEvent
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @variation 3
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the
        * provided direction mechanism. Controls in the propagation chain that registered
        * the event using the control.on() method will receive the event. Propagation will
        * always start with the sender, so the sender can both produce and consume the same
        * event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * control.on() method.
        * @param {string} direction The direction in which to send the event.
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        dispatchEvent? (name: string, direction?: string, ...args: any[]): void;
        /**
        * @name on
        * @memberof plat.IControl
        * @kind function
        * @access public
        *
        * @description
        * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when a {@link plat.events.DispatchEvent|DispatchEvent} is
        * propagating over the control. Any number of listeners can exist for a single event name.
        *
        * @param {string} name The name of the event, cooinciding with the {@link plat.events.DispatchEvent|DispatchEvent} name.
        * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when the {@link plat.events.DispatchEvent|DispatchEvent} is fired.
        *
        * @returns {plat.IRemoveListener} A function to call in order to stop listening for this event.
        */
        on? (name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;
        /**
        * @name dispose
        * @memberof plat.IControl
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * The dispose event is called when a control is being removed from memory. A control should release
        * all of the memory it is using, including DOM event and property listeners.
        *
        * @returns {void}
        */
        dispose? (): void;
    }
    /**
    * @name controls
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds all classes and interfaces related to attribute control components in platypus.
    */
    module controls {
        /**
        * @name AttributeControl
        * @memberof plat.controls
        * @kind class
        * @access public
        *
        * @extends {plat.Control}
        * @implements {plat.controls.IAttributeControl}
        *
        * @description
        * A type of control that can be used as an attribute but will
        * not be used to add, remove, or modify DOM.
        */
        class AttributeControl extends Control implements IAttributeControl {
            /**
            * @name dispose
            * @memberof plat.controls.AttributeControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Method for disposing an attribute control. Removes any
            * necessary objects from the control.
            *
            * @param {plat.IAttributeControl} control The {@link plat.controls.AttributeControl|AttributeControl} to dispose.
            *
            * @returns {void}
            */
            static dispose(control: IAttributeControl): void;
            /**
            * @name getInstance
            * @memberof plat.controls.AttributeControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a new instance of {@link plat.controls.AttributeControl|AttributeControl}.
            *
            * @returns {plat.IAttributeControl}
            */
            static getInstance(): IAttributeControl;
            /**
            * @name templateControl
            * @memberof plat.controls.AttributeControl
            * @kind property
            * @access public
            *
            * @type {plat.ui.ITemplateControl}
            *
            * @description
            * Specifies the {@link plat.ui.ITemplateControl|ITemplateControl} associated with this
            * control's element. Can be null if no {@link plat.ui.ITemplateControl|ITemplateControl}
            * exists.
            */
            public templateControl: ui.ITemplateControl;
        }
        /**
        * The Type for referencing the '$AttributeControlFactory' injectable as a dependency.
        */
        function IAttributeControlFactory(): IAttributeControlFactory;
        /**
        * @name IAttributeControlFactory
        * @memberof plat.controls
        * @kind interface
        *
        * @description
        * Creates and manages instances of {@link plat.controls.IAttributeControl|IAttributeControl}.
        */
        interface IAttributeControlFactory {
            /**
            * @name dispose
            * @memberof plat.controls.IAttributeControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Method for disposing an attribute control. Removes any
            * necessary objects from the control.
            *
            * @param {plat.IAttributeControl} control The {@link plat.controls.AttributeControl|AttributeControl} to dispose.
            *
            * @returns {void}
            */
            dispose(control: IAttributeControl): void;
            /**
            * @name getInstance
            * @memberof plat.controls.IAttributeControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a new instance of {@link plat.controls.AttributeControl|AttributeControl}.
            *
            * @returns {plat.IAttributeControl}
            */
            getInstance(): IAttributeControl;
        }
        /**
        * @name IAttributeControl
        * @memberof plat.controls
        * @kind interface
        * @access public
        *
        * @extends {plat.IControl}
        *
        * @description
        * An object describing a type of control that can be used as an attribute but will
        * not be used to add, remove, or modify DOM.
        */
        interface IAttributeControl extends IControl {
            /**
            * @name templateControl
            * @memberof plat.controls.IAttributeControl
            * @kind property
            * @access public
            *
            * @type {plat.ui.ITemplateControl}
            *
            * @description
            * Specifies the {@link plat.ui.ITemplateControl|ITemplateControl} associated with this
            * control's element. Can be null if no {@link plat.ui.ITemplateControl|ITemplateControl}
            * exists.
            */
            templateControl?: ui.ITemplateControl;
        }
        /**
        * @name Name
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.AttributeControl}
        *
        * @description
        * Allows for assigning a name to an Element or {@link plat.ui.TemplateControl|TemplateControl} and referencing it
        * from parent controls.
        *
        * @remarks
        * This control is useful for avoiding query selectors since it will store itself on all of its ancestor controls using
        * the associated name.
        */
        class Name extends AttributeControl {
            /**
            * @name _label
            * @memberof plat.controls.Name
            * @kind property
            * @access protected
            * @static
            *
            * @type {string}
            *
            * @description
            * The property name on the ancestor controls to set as the {@link plat.controls.INamedElement|INamedElement}.
            */
            public _label: string;
            /**
            * @name initialize
            * @memberof plat.controls.Name
            * @kind function
            * @access public
            *
            * @description
            * Defines the property specified by the attribute value as the {@link plat.controls.INamedElement|INamedElement}
            * on all the ancestor controls, ignoring those that already have the property defined.
            *
            * @returns {void}
            */
            public initialize(): void;
            /**
            * @name dispose
            * @memberof plat.controls.Name
            * @kind function
            * @access public
            *
            * @description
            * Removes the {@link plat.controls.INamedElement|INamedElement} from the ancestor controls.
            *
            * @returns {void}
            */
            public dispose(): void;
            /**
            * @name _define
            * @memberof plat.controls.Name
            * @kind function
            * @access protected
            *
            * @description
            * Defines the property specified by the attribute value as the {@link plat.controls.INamedElement|INamedElement}
            * on all the ancestor controls, ignoring those that already have the property defined.
            *
            * @param {string} name The name to define on all the ancestor controls.
            *
            * @returns {void}
            */
            public _define(name: string): void;
            /**
            * @name _isPrecompiled
            * @memberof plat.controls.Name
            * @kind function
            * @access protected
            *
            * @description
            * Determines whether or not this control is part of a pre-compiled control tree. In the event
            * that it is, it shouldn't set itself on the ancestor controls.
            *
            * @param {string} name The name to define on all the ancestor controls.
            *
            * @returns {void}
            */
            public _isPrecompiled(): boolean;
        }
        /**
        * @name INamedElement
        * @memberof plat.controls
        * @kind interface
        *
        * @description
        * Defines the object added to a root control when an HTML element has
        * a plat-name attribute. If the element corresponds to a registered
        * control, the control will be included in the object.
        *
        * @typeparam {Element} E The type of element that is named.
        * @typeparam {any} C The type of control that is named.
        */
        interface INamedElement<E extends Element, C> {
            /**
            * @name element
            * @memberof plat.controls.INamedElement
            * @kind property
            *
            * @type {E}
            *
            * @description
            * The element on which the plat-name is specified.
            */
            element: E;
            /**
            * @name control
            * @memberof plat.controls.INamedElement
            * @kind property
            *
            * @type {C}
            *
            * @description
            * The template control on the associated element, if one
            * exists.
            */
            control?: C;
        }
        /**
        * @name SimpleEventControl
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.AttributeControl}
        * @implements {plat.controls.ISimpleEventControl}
        *
        * @description
        * An {@link plat.controls.AttributeControl|AttributeControl} that binds to a specified DOM event handler.
        */
        class SimpleEventControl extends AttributeControl implements ISimpleEventControl {
            /**
            * @name $Parser
            * @memberof plat.controls.SimpleEventControl
            * @kind property
            * @access public
            *
            * @type {plat.expressions.IParser}
            *
            * @description
            * Reference to the {@link plat.expressions.IParser|IParser} injectable.
            */
            public $Parser: expressions.IParser;
            /**
            * @name $Regex
            * @memberof plat.controls.SimpleEventControl
            * @kind property
            * @access public
            *
            * @type {plat.expressions.IRegex}
            *
            * @description
            * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
            */
            public $Regex: expressions.IRegex;
            /**
            * @name event
            * @memberof plat.controls.SimpleEventControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
            /**
            * @name attribute
            * @memberof plat.controls.SimpleEventControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The camel-cased name of the control as it appears as an attribute.
            */
            public attribute: string;
            /**
            * @name _expression
            * @memberof plat.controls.SimpleEventControl
            * @kind property
            * @access protected
            *
            * @type {Array<string>}
            *
            * @description
            * A parsed form of the expression found in the attribute's value.
            */
            public _expression: string[];
            /**
            * @name _aliases
            * @memberof plat.controls.SimpleEventControl
            * @kind property
            * @access protected
            *
            * @type {Array<string>}
            *
            * @description
            * An array of the aliases used in the expression.
            */
            public _aliases: string[];
            /**
            * @name loaded
            * @memberof plat.controls.SimpleEventControl
            * @kind function
            * @access public
            *
            * @description
            * Kicks off finding and setting the listener.
            *
            * @returns {void}
            */
            public loaded(): void;
            /**
            * @name _setListener
            * @memberof plat.controls.SimpleEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Sets the event listener.
            *
            * @returns {void}
            */
            public _setListener(): void;
            /**
            * @name _findListener
            * @memberof plat.controls.SimpleEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Finds the first instance of the specified function
            * in the parent control chain.
            *
            * @param {string} identifier the function identifer
            *
            * @returns {{ control: ui.ITemplateControl; value: any; }} The instance of the specified function.
            */
            public _findListener(identifier: string): {
                control: ui.ITemplateControl;
                value: any;
            };
            /**
            * @name _buildExpression
            * @memberof plat.controls.SimpleEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Constructs the function to evaluate with
            * the evaluated arguments taking resources
            * into account.
            *
            * @returns {{ fn: () => void; control: ui.ITemplateControl; args: Array<expressions.IParsedExpression>; }}
            * The function to call and the associated arguments, as well as the control context with which to call the function.
            */
            public _buildExpression(): {
                fn: () => void;
                control: ui.ITemplateControl;
                args: expressions.IParsedExpression[];
            };
            /**
            * @name _onEvent
            * @memberof plat.controls.SimpleEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Calls the specified function when the DOM event is fired.
            *
            * @param {Event} ev The event object.
            *
            * @returns {void}
            */
            public _onEvent(ev: Event): void;
            /**
            * @name _findAliases
            * @memberof plat.controls.SimpleEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Finds all alias contained within the expression.
            *
            * @param {Array<string>} args The array of arguments as strings.
            *
            * @returns {Array<string>} The aliases.
            */
            public _findAliases(args: string[]): string[];
            /**
            * @name _parseArgs
            * @memberof plat.controls.SimpleEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Parses the expression and separates the function
            * from its arguments.
            *
            * @param {string} expression The expression to parse.
            *
            * @returns {void}
            */
            public _parseArgs(expression: string): void;
        }
        /**
        * @name ISimpleEventControl
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.IAttributeControl}
        *
        * @description
        * An {@link plat.controls.IAttributeControl|IAttributeControl} that binds to a specified DOM event handler.
        */
        interface ISimpleEventControl extends IAttributeControl {
            /**
            * @name event
            * @memberof plat.controls.ISimpleEventControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            event: string;
            /**
            * @name attribute
            * @memberof plat.controls.ISimpleEventControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The camel-cased name of the control as it appears as an attribute.
            */
            attribute: string;
        }
        /**
        * @name Tap
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$tap' event.
        */
        class Tap extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Tap
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Blur
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'blur' event.
        */
        class Blur extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Blur
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Change
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'change' event.
        */
        class Change extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Change
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Copy
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'copy' event.
        */
        class Copy extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Copy
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Cut
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'cut' event.
        */
        class Cut extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Cut
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Paste
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'paste' event.
        */
        class Paste extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Paste
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name DblTap
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$dbltap' event.
        */
        class DblTap extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.DblTap
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Focus
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'focus' event.
        */
        class Focus extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Focus
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name TouchStart
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$touchstart' event.
        */
        class TouchStart extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.TouchStart
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name TouchEnd
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$touchend' event.
        */
        class TouchEnd extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.TouchEnd
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name TouchMove
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$touchmove' event.
        */
        class TouchMove extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.TouchMove
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name TouchCancel
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$touchcancel' event.
        */
        class TouchCancel extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.TouchCancel
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Hold
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$hold' event.
        */
        class Hold extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Hold
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Release
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$release' event.
        */
        class Release extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Release
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Swipe
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swipe' event.
        */
        class Swipe extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Swipe
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name SwipeLeft
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swipeleft' event.
        */
        class SwipeLeft extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.SwipeLeft
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name SwipeRight
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swiperight' event.
        */
        class SwipeRight extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.SwipeRight
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name SwipeUp
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swipeup' event.
        */
        class SwipeUp extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.SwipeUp
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name SwipeDown
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$swipedown' event.
        */
        class SwipeDown extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.SwipeDown
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Track
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$track' event.
        */
        class Track extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Track
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name TrackLeft
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackleft' event.
        */
        class TrackLeft extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.TrackLeft
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name TrackRight
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackright' event.
        */
        class TrackRight extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.TrackRight
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name TrackUp
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackup' event.
        */
        class TrackUp extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.TrackUp
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name TrackDown
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackdown' event.
        */
        class TrackDown extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.TrackDown
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name TrackEnd
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the '$trackend' event.
        */
        class TrackEnd extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.TrackEnd
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name Submit
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        *
        * @description
        * A {@link plat.controls.SimpleEventControl|SimpleEventControl} for the 'submit' event.
        */
        class Submit extends SimpleEventControl {
            /**
            * @name event
            * @memberof plat.controls.Submit
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
            /**
            * @name _onEvent
            * @memberof plat.controls.SimpleEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Prevents the default submit action unless
            * the "action" attribute is present.
            *
            * @param {Event} ev The event object.
            */
            public _onEvent(ev: Event): void;
        }
        /**
        * @name KeyCodes
        * @memberof plat.controls
        * @kind property
        * @access public
        *
        * @type {any}
        *
        * @description
        * A mapping of all keys to their equivalent keyCode.
        */
        var KeyCodes: {
            'backspace': number;
            'tab': number;
            'enter': number;
            'shift': number;
            'ctrl': number;
            'alt': number;
            'pause': number;
            'break': number;
            'caps lock': number;
            'escape': number;
            'space': number;
            'page up': number;
            'page down': number;
            'end': number;
            'home': number;
            'left': number;
            'left arrow': number;
            'up': number;
            'up arrow': number;
            'right': number;
            'right arrow': number;
            'down': number;
            'down arrow': number;
            'insert': number;
            'delete': number;
            '0': number;
            'zero': number;
            ')': number;
            'right parenthesis': number;
            '1': number;
            'one': number;
            '!': number;
            'exclamation': number;
            'exclamation point': number;
            '2': number;
            'two': number;
            '@': number;
            'at': number;
            '3': number;
            'three': number;
            '#': number;
            'number sign': number;
            'hash': number;
            'pound': number;
            '4': number;
            'four': number;
            '$': number;
            'dollar': number;
            'dollar sign': number;
            '5': number;
            'five': number;
            '%': number;
            'percent': number;
            'percent sign': number;
            '6': number;
            'six': number;
            '^': number;
            'caret': number;
            '7': number;
            'seven': number;
            '&': number;
            'ampersand': number;
            '8': number;
            'eight': number;
            '*': number;
            'asterisk': number;
            '9': number;
            'nine': number;
            '(': number;
            'left parenthesis': number;
            'a': number;
            'b': number;
            'c': number;
            'd': number;
            'e': number;
            'f': number;
            'g': number;
            'h': number;
            'i': number;
            'j': number;
            'k': number;
            'l': number;
            'm': number;
            'n': number;
            'o': number;
            'p': number;
            'q': number;
            'r': number;
            's': number;
            't': number;
            'u': number;
            'v': number;
            'w': number;
            'x': number;
            'y': number;
            'z': number;
            'lwk': number;
            'left window key': number;
            'rwk': number;
            'right window key': number;
            'select': number;
            'select key': number;
            'numpad 0': number;
            'numpad 1': number;
            'numpad 2': number;
            'numpad 3': number;
            'numpad 4': number;
            'numpad 5': number;
            'numpad 6': number;
            'numpad 7': number;
            'numpad 8': number;
            'numpad 9': number;
            'multiply': number;
            'add': number;
            'subtract': number;
            'decimal point': number;
            'divide': number;
            'f1': number;
            'f2': number;
            'f3': number;
            'f4': number;
            'f5': number;
            'f6': number;
            'f7': number;
            'f8': number;
            'f9': number;
            'f10': number;
            'f11': number;
            'f12': number;
            'num lock': number;
            'scroll lock': number;
            ';': number;
            'semi-colon': number;
            ':': number;
            'colon': number;
            '=': number;
            'equal': number;
            'equal sign': number;
            '+': number;
            'plus': number;
            ',': number;
            'comma': number;
            '<': number;
            'lt': number;
            'less than': number;
            'left angle bracket': number;
            '-': number;
            'dash': number;
            '_': number;
            'underscore': number;
            '.': number;
            'period': number;
            '>': number;
            'gt': number;
            'greater than': number;
            'right angle bracket': number;
            '/': number;
            'forward slash': number;
            '?': number;
            'question mark': number;
            '`': number;
            'grave accent': number;
            '~': number;
            'tilde': number;
            '[': number;
            'open bracket': number;
            '{': number;
            'open brace': number;
            '\\': number;
            'back slash': number;
            '|': number;
            'pipe': number;
            ']': number;
            'close bracket': number;
            '}': number;
            'close brace': number;
            '\'': number;
            'single quote': number;
            '"': number;
            'double quote': number;
        };
        /**
        * @name KeyCodeEventControl
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SimpleEventControl}
        * @implements {plat.controls.IKeyCodeEventControl}
        *
        * @description
        * Base class used for filtering keys on KeyboardEvents.
        */
        class KeyCodeEventControl extends SimpleEventControl implements IKeyCodeEventControl {
            /**
            * @name $Regex
            * @memberof plat.controls.KeyCodeEventControl
            * @kind property
            * @access public
            *
            * @type {plat.expressions.IRegex}
            *
            * @description
            * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
            */
            public $Regex: expressions.IRegex;
            /**
            * @name keyCodes
            * @memberof plat.controls.KeyCodeEventControl
            * @kind property
            * @access public
            *
            * @type {plat.IObject<{ shifted: boolean; }>}
            *
            * @description
            * Holds the key mappings to filter for in a KeyboardEvent.
            */
            public keyCodes: IObject<{
                shifted: boolean;
            }>;
            /**
            * @name _setListener
            * @memberof plat.controls.KeyCodeEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Checks if the {@link plat.controls.IKeyboardEventInput|IKeyboardEventInput} is an expression object
            * and sets the necessary listener.
            *
            * @returns {void}
            */
            public _setListener(): void;
            /**
            * @name _onEvent
            * @memberof plat.controls.KeyCodeEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Matches the event's keyCode if necessary and then handles the event if
            * a match is found or if there are no filter keyCodes.
            *
            * @param {KeyboardEvent} ev The keyboard event object.
            *
            * @returns {void}
            */
            public _onEvent(ev: KeyboardEvent): void;
            /**
            * @name _setKeyCodes
            * @memberof plat.controls.KeyCodeEventControl
            * @kind function
            * @access protected
            *
            * @description
            * Sets the defined key codes as they correspond to
            * the {@link plat.controls.KeyCodes|KeyCodes} map.
            *
            * @param {Array<string>} keys? The array of defined keys to satisfy the
            * key press condition.
            *
            * @returns {void}
            */
            public _setKeyCodes(keys?: string[]): void;
        }
        /**
        * @name IKeyCodeEventControl
        * @memberof plat.controls
        * @kind interface
        *
        * @extends {plat.controls.ISimpleEventControl}
        *
        * @description
        * An attribute object that binds to specified key code scenarios.
        */
        interface IKeyCodeEventControl extends ISimpleEventControl {
            /**
            * @name keyCodes
            * @memberof plat.controls.IKeyCodeEventControl
            * @kind property
            * @access public
            *
            * @type {plat.IObject<{ shifted: boolean; }>}
            *
            * @description
            * Holds the key mappings to filter for in a KeyboardEvent.
            */
            keyCodes: IObject<{
                shifted: boolean;
            }>;
        }
        /**
        * @name IKeyboardEventInput
        * @memberof plat.controls
        * @kind interface
        *
        * @description
        * The available options for {@link plat.controls.KeyCodeEventControl|KeyCodeEventControl}.
        */
        interface IKeyboardEventInput {
            /**
            * @name method
            * @memberof plat.controls.IKeyboardEventInput
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The method to call when the condition is satisfied.
            */
            method: string;
            /**
            * @name key
            * @memberof plat.controls.IKeyboardEventInput
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The key to satisfy the press condition. Can be specified either as a numeric key code
            * or a string representation as seen by the KeyCodes mapping.
            */
            key?: string;
            /**
            * @name keys
            * @memberof plat.controls.IKeyboardEventInput
            * @kind property
            * @access public
            *
            * @type {Array<string>}
            *
            * @description
            * An optional array of keys if more than one key can satisfy the condition.
            */
            keys?: string[];
        }
        /**
        * @name KeyDown
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.KeyCodeEventControl}
        *
        * @description
        * Used for filtering keys on keydown events.
        */
        class KeyDown extends KeyCodeEventControl {
            /**
            * @name event
            * @memberof plat.controls.KeyDown
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name KeyPress
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.KeyCodeEventControl}
        *
        * @description
        * Used for filtering only printing keys (a-z, A-Z, 0-9, and special characters) on keydown events.
        */
        class KeyPress extends KeyCodeEventControl {
            /**
            * @name event
            * @memberof plat.controls.KeyPress
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
            /**
            * @name _onEvent
            * @memberof plat.controls.KeyPress
            * @kind function
            * @access protected
            *
            * @description
            * Filters only 'printing keys' (a-z, A-Z, 0-9, and special characters)
            *
            * @param {KeyboardEvent} ev The KeyboardEvent object.
            *
            * @returns {void}
            */
            public _onEvent(ev: KeyboardEvent): void;
        }
        /**
        * @name KeyUp
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.KeyCodeEventControl}
        *
        * @description
        * Used for filtering keys on keyup events.
        */
        class KeyUp extends KeyCodeEventControl {
            /**
            * @name event
            * @memberof plat.controls.KeyDown
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event name.
            */
            public event: string;
        }
        /**
        * @name SetAttributeControl
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.AttributeControl}
        * @implements {plat.controls.ISetAttributeControl}
        *
        * @description
        * An {@link plat.controls.AttributeControl|AttributeControl} that deals with binding to a specified property on its element.
        */
        class SetAttributeControl extends AttributeControl implements ISetAttributeControl {
            /**
            * @name property
            * @memberof plat.controls.SetAttributeControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            public property: string;
            /**
            * @name attribute
            * @memberof plat.controls.SetAttributeControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The camel-cased name of the control as it appears as an attribute.
            */
            public attribute: string;
            /**
            * @name __removeListener
            * @memberof plat.controls.SetAttributeControl
            * @kind property
            * @access private
            *
            * @type {IRemoveListener}
            *
            * @description
            * The function to stop listening for attribute changes.
            */
            private __removeListener;
            /**
            * @name loaded
            * @memberof plat.controls.SetAttributeControl
            * @kind function
            * @access public
            *
            * @description
            * Sets the corresponding attribute {property} value and
            * observes the attribute for changes.
            *
            * @returns {void}
            */
            public loaded(): void;
            /**
            * @name contextChanged
            * @memberof plat.controls.SetAttributeControl
            * @kind function
            * @access public
            *
            * @description
            * Resets the corresponding attribute property value upon
            * a change of context.
            *
            * @returns {void}
            */
            public contextChanged(): void;
            /**
            * @name dispose
            * @memberof plat.controls.SetAttributeControl
            * @kind function
            * @access public
            *
            * @description
            * Stops listening to attribute changes.
            *
            * @returns {void}
            */
            public dispose(): void;
            /**
            * @name setter
            * @memberof plat.controls.SetAttributeControl
            * @kind function
            * @access public
            * @virtual
            *
            * @description
            * The function for setting the corresponding
            * attribute property value.
            *
            * @returns {void}
            */
            public setter(): void;
        }
        /**
        * @name ISetAttributeControl
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.IAttributeControl}
        *
        * @description
        * An {@link plat.controls.IAttributeControl|IAttributeControl} that deals with binding to a specified property on its element.
        */
        interface ISetAttributeControl extends IAttributeControl {
            /**
            * @name property
            * @memberof plat.controls.ISetAttributeControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            property: string;
            /**
            * @name attribute
            * @memberof plat.controls.ISetAttributeControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The camel-cased name of the control as it appears as an attribute.
            */
            attribute: string;
            /**
            * @name setter
            * @memberof plat.controls.ISetAttributeControl
            * @kind function
            * @access public
            *
            * @description
            * The function for setting the corresponding
            * attribute property value.
            *
            * @returns {void}
            */
            setter(): void;
        }
        /**
        * @name Checked
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SetAttributeControl}
        *
        * @description
        * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'checked' attribute.
        */
        class Checked extends SetAttributeControl {
            /**
            * @name property
            * @memberof plat.controls.Checked
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            public property: string;
        }
        /**
        * @name Disabled
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SetAttributeControl}
        *
        * @description
        * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'disabled' attribute.
        */
        class Disabled extends SetAttributeControl {
            /**
            * @name property
            * @memberof plat.controls.Disabled
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            public property: string;
        }
        /**
        * @name Selected
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SetAttributeControl}
        *
        * @description
        * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'selected' attribute.
        */
        class Selected extends SetAttributeControl {
            /**
            * @name property
            * @memberof plat.controls.Selected
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            public property: string;
        }
        /**
        * @name ReadOnly
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SetAttributeControl}
        *
        * @description
        * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'readonly' attribute.
        */
        class ReadOnly extends SetAttributeControl {
            /**
            * @name property
            * @memberof plat.controls.ReadOnly
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            public property: string;
        }
        /**
        * @name Visible
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SetAttributeControl}
        *
        * @description
        * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'plat-hide' attribute.
        */
        class Visible extends SetAttributeControl {
            /**
            * @name property
            * @memberof plat.controls.Visible
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            public property: string;
            /**
            * @name initialize
            * @memberof plat.controls.Visible
            * @kind function
            * @access public
            *
            * @description
            * Hides the element.
            *
            * @returns {void}
            */
            public initialize(): void;
            /**
            * @name setter
            * @memberof plat.controls.Visible
            * @kind function
            * @access public
            *
            * @description
            * Hides or shows the element depending upon the attribute value
            *
            * @returns {void}
            */
            public setter(): void;
            /**
            * @name __hide
            * @memberof plat.controls.Visible
            * @kind function
            * @access private
            *
            * @description
            * Hides the element.
            *
            * @returns {void}
            */
            private __hide();
            /**
            * @name __show
            * @memberof plat.controls.Visible
            * @kind function
            * @access private
            *
            * @description
            * Shows the element.
            *
            * @returns {void}
            */
            private __show();
        }
        /**
        * @name Style
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SetAttributeControl}
        *
        * @description
        * A {@link plat.controls.SetAttributeControl|SetAttributeControl} for the 'style' attribute.
        */
        class Style extends SetAttributeControl {
            /**
            * @name setter
            * @memberof plat.controls.Style
            * @kind function
            * @access public
            *
            * @description
            * Sets the evaluated styles on the element.
            *
            * @returns {void}
            */
            public setter(): void;
        }
        /**
        * @name ElementPropertyControl
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.SetAttributeControl}
        *
        * @description
        * Base class used for setting the property of an element (e.g. href for anchor elements).
        */
        class ElementPropertyControl extends SetAttributeControl {
            /**
            * @name setter
            * @memberof plat.controls.ElementPropertyControl
            * @kind function
            * @access public
            *
            * @description
            * The function for setting the corresponding
            * attribute property value to the evaluated expression.
            *
            * @returns {void}
            */
            public setter(): void;
        }
        /**
        * @name Href
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.ElementPropertyControl}
        *
        * @description
        * A type of {@link plat.controls.ElementPropertyControl|ElementPropertyControl} used to set 'href' on an anchor tag.
        */
        class Href extends ElementPropertyControl {
            /**
            * @name property
            * @memberof plat.controls.Href
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Used to set the element's href property.
            */
            public property: string;
        }
        /**
        * @name Src
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.ElementPropertyControl}
        *
        * @description
        * A type of {@link plat.controls.ElementPropertyControl|ElementPropertyControl} used to set 'src' on an anchor tag.
        */
        class Src extends ElementPropertyControl {
            /**
            * @name property
            * @memberof plat.controls.Src
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * Used to set the element's src property.
            */
            public property: string;
        }
        /**
        * @name Bind
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.AttributeControl}
        *
        * @description
        * Facilitates two-way databinding for HTMLInputElements, HTMLSelectElements, and HTMLTextAreaElements.
        */
        class Bind extends AttributeControl {
            /**
            * @name $Parser
            * @memberof plat.controls.Bind
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.expressions.IParser}
            *
            * @description
            * Reference to the {@link plat.expressions.IParser|IParser} injectable.
            */
            public $Parser: expressions.IParser;
            /**
            * @name $ContextManagerStatic
            * @memberof plat.controls.Bind
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.observable.IContextManagerStatic}
            *
            * @description
            * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
            */
            public $ContextManagerStatic: observable.IContextManagerStatic;
            /**
            * @name $document
            * @memberof plat.controls.Bind
            * @kind property
            * @access public
            * @static
            *
            * @type {Document}
            *
            * @description
            * Reference to the Document injectable.
            */
            public $document: Document;
            /**
            * @name priority
            * @memberof plat.controls.Bind
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The priority of Bind is set high to take precede
            * other controls that may be listening to the same
            * event.
            */
            public priority: number;
            /**
            * @name _addEventType
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * The function used to add the proper event based on the input type.
            *
            * @returns {void}
            */
            public _addEventType: () => void;
            /**
            * @name _getter
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * The function used to get the bound value.
            *
            * @returns {any} The bound value.
            */
            public _getter: () => any;
            /**
            * @name _setter
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * The function used to set the bound value.
            *
            * @returns {void}
            */
            public _setter: (newValue: any, oldValue?: any, firstTime?: boolean) => void;
            /**
            * @name _expression
            * @memberof plat.controls.Bind
            * @kind property
            * @access protected
            *
            * @type {plat.expressions.IParsedExpression}
            *
            * @description
            * The expression to evaluate as the bound value.
            */
            public _expression: expressions.IParsedExpression;
            /**
            * @name _contextExpression
            * @memberof plat.controls.Bind
            * @kind property
            * @access protected
            *
            * @type {plat.expressions.IParsedExpression}
            *
            * @description
            * The IParsedExpression used to evaluate the context
            * of the bound property.
            */
            public _contextExpression: expressions.IParsedExpression;
            /**
            * @name _property
            * @memberof plat.controls.Bind
            * @kind property
            * @access protected
            *
            * @type {string}
            *
            * @description
            * The bound property name.
            */
            public _property: string;
            /**
            * @name __fileSupported
            * @memberof plat.controls.Bind
            * @kind property
            * @access private
            *
            * @type {boolean}
            *
            * @description
            * Whether or not the File API is supported.
            */
            private __fileSupported;
            /**
            * @name __fileNameRegex
            * @memberof plat.controls.Bind
            * @kind property
            * @access private
            *
            * @type {RegExp}
            *
            * @description
            * Used to grab a filename from input[type="file"].
            */
            private __fileNameRegex;
            /**
            * @name __isSelf
            * @memberof plat.controls.Bind
            * @kind property
            * @access private
            *
            * @type {boolean}
            *
            * @description
            * Used to denote that a property change happened from within this control.
            */
            private __isSelf;
            /**
            * @name initialize
            * @memberof plat.controls.Bind
            * @kind function
            * @access public
            *
            * @description
            * Determines the type of Element being bound to
            * and sets the necessary handlers.
            *
            * @returns {void}
            */
            public initialize(): void;
            /**
            * @name loaded
            * @memberof plat.controls.Bind
            * @kind function
            * @access public
            *
            * @description
            * Parses and watches the expression being bound to.
            *
            * @returns {void}
            */
            public loaded(): void;
            /**
            * @name contextChanged
            * @memberof plat.controls.Bind
            * @kind function
            * @access public
            *
            * @description
            * Re-observes the expression with the new context.
            *
            * @returns {void}
            */
            public contextChanged(): void;
            /**
            * @name dispose
            * @memberof plat.controls.Bind
            * @kind function
            * @access public
            *
            * @description
            * Removes all of the element's event listeners.
            *
            * @returns {void}
            */
            public dispose(): void;
            /**
            * @name _addTextEventListener
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Adds a text event as the event listener.
            * Used for textarea and input[type=text].
            *
            * @returns {void}
            */
            public _addTextEventListener(): void;
            /**
            * @name _addChangeEventListener
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Adds a change event as the event listener.
            * Used for select, input[type=radio], and input[type=range].
            *
            * @returns {void}
            */
            public _addChangeEventListener(): void;
            /**
            * @name _addButtonEventListener
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Adds a $tap event as the event listener.
            * Used for input[type=button] and button.
            *
            * @returns {void}
            */
            public _addButtonEventListener(): void;
            /**
            * @name _getChecked
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Getter for input[type=checkbox] and input[type=radio]
            *
            * @returns {boolean} Whether or not the input element is checked
            */
            public _getChecked(): boolean;
            /**
            * @name _getValue
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Getter for input[type=text], input[type=range],
            * textarea, and select.
            *
            * @returns {string} The input value
            */
            public _getValue(): string;
            /**
            * @name _getTextContent
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Getter for button.
            *
            * @returns {string} The button textContent
            */
            public _getTextContent(): string;
            /**
            * @name _getFile
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Getter for input[type="file"]. Creates a partial IFile
            * element if file is not supported.
            *
            * @returns {plat.controls.IFile} The input file
            */
            public _getFile(): IFile;
            /**
            * @name _getFiles
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Getter for input[type="file"]-multiple
            *
            * @returns {Array<plat.controls.IFile>} The input files
            */
            public _getFiles(): IFile[];
            /**
            * @name _getSelectedValues
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Getter for select-multiple
            *
            * @returns {Array<string>} The selected values
            */
            public _getSelectedValues(): string[];
            /**
            * @name _setText
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Setter for textarea, input[type=text],
            * and input[type=button], and select
            *
            * @param {any} newValue The new value to set
            * @param {any} oldValue? The previously bound value
            * @param {boolean} firstTime? The context is being evaluated for the first time and
            * should thus change the property if null
            *
            * @returns {void}
            */
            public _setText(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
            * @name _setRange
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Setter for input[type=range]
            *
            * @param {any} newValue The new value to set
            * @param {any} oldValue? The previously bound value
            * @param {boolean} firstTime? The context is being evaluated for the first time and
            * should thus change the property if null
            *
            * @returns {void}
            */
            public _setRange(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
            * @name _setChecked
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Setter for input[type=checkbox]
            *
            * @param {any} newValue The new value to set
            * @param {any} oldValue? The previously bound value
            * @param {boolean} firstTime? The context is being evaluated for the first time and
            * should thus change the property if null
            *
            * @returns {void}
            */
            public _setChecked(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
            * @name _setRadio
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Setter for input[type=radio]
            *
            * @param {any} newValue The new value to set
            *
            * @returns {void}
            */
            public _setRadio(newValue: any): void;
            /**
            * @name _setSelectedIndex
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Setter for select
            *
            * @param {any} newValue The new value to set
            * @param {any} oldValue? The previously bound value
            * @param {boolean} firstTime? The context is being evaluated for the first time and
            * should thus change the property if null
            *
            * @returns {void}
            */
            public _setSelectedIndex(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
            * @name _setSelectedIndices
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Setter for select-multiple
            *
            * @param {any} newValue The new value to set
            * @param {any} oldValue? The previously bound value
            * @param {boolean} firstTime? The context is being evaluated for the first time and
            * should thus change the property if null
            *
            * @returns {void}
            */
            public _setSelectedIndices(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
            * @name _determineType
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Determines the type of Element being bound to
            * and sets the necessary handlers.
            *
            * @returns {void}
            */
            public _determineType(): void;
            /**
            * @name _watchExpression
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Observes the expression to bind to.
            *
            * @returns {void}
            */
            public _watchExpression(): void;
            /**
            * @name _propertyChanged
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Sets the context property being bound to when the
            * element's property is changed.
            *
            * @returns {void}
            */
            public _propertyChanged(): void;
            /**
            * @name _observedBindableProperty
            * @memberof plat.controls.Bind
            * @kind function
            * @access protected
            *
            * @description
            * Checks if the associated {@link plat.ui.TemplateControl|TemplateControl} is a
            * {@link plat.ui.BindablePropertyControl|BindablePropertyControl} and
            * initializes all listeners accordingly.
            *
            * @returns {boolean} Whether or not the associated {@link plat.ui.TemplateControl|TemplateControl}
            * is a {@link plat.ui.BindablePropertyControl|BindablePropertyControl}
            */
            public _observedBindableProperty(): boolean;
            /**
            * @name __setBindableProperty
            * @memberof plat.controls.Bind
            * @kind function
            * @access private
            *
            * @description
            * Sets the value on a {@link plat.ui.BindablePropertyControl|BindablePropertyControl}.
            *
            * @param {any} newValue The new value to set
            * @param {any} oldValue? The previously bound value
            * @param {boolean} firstTime? The context is being evaluated for the first time and
            * should thus change the property if null
            *
            * @returns {void}
            */
            private __setBindableProperty(newValue, oldValue?, firstTime?);
            /**
            * @name __setValue
            * @memberof plat.controls.Bind
            * @kind function
            * @access private
            *
            * @description
            * Sets the value on an element.
            *
            * @param {any} newValue The new value to set
            *
            * @returns {void}
            */
            private __setValue(newValue);
            /**
            * @name __setValue
            * @memberof plat.controls.Bind
            * @kind function
            * @access private
            *
            * @description
            * Normalizes input[type="radio"] for cross-browser compatibility.
            *
            * @returns {void}
            */
            private __initializeRadio();
            /**
            * @name __initializeSelect
            * @memberof plat.controls.Bind
            * @kind function
            * @access private
            *
            * @description
            * Normalizes HTMLSelectElements for cross-browser compatibility.
            *
            * @returns {void}
            */
            private __initializeSelect();
            /**
            * @name __checkAsynchronousSelect
            * @memberof plat.controls.Bind
            * @kind function
            * @access private
            *
            * @description
            * Checks to see if a {@link plat.ui.control.Select|Select} is loading items.
            *
            * @returns {boolean} Whether or not the select is loading items.
            */
            private __checkAsynchronousSelect();
        }
        /**
        * @name IFile
        * @memberof plat.controls
        * @kind interface
        *
        * @extends {File}
        *
        * @description
        * A file interface for browsers that do not support the
        * File API.
        */
        interface IFile extends File {
            /**
            * @name string
            * @memberof plat.controls.IFile
            * @kind property
            * @access public
            * @readonly
            *
            * @type {string}
            *
            * @description
            * An absolute path to the file. The property is not added to
            * File types.
            */
            path?: string;
        }
        /**
        * @name ObservableAttributeControl
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.AttributeControl}
        * @implements {plat.controls.IObservableAttributeControl}
        *
        * @description
        * An {@link plat.controls.AttributeControl|AttributeControl} that deals with observing changes for a specified property.
        */
        class ObservableAttributeControl extends AttributeControl implements IObservableAttributeControl {
            /**
            * @name $ContextManagerStatic
            * @memberof plat.controls.ObservableAttributeControl
            * @kind property
            * @access public
            *
            * @type {plat.observable.IContextManagerStatic}
            *
            * @description
            * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
            */
            public $ContextManagerStatic: observable.IContextManagerStatic;
            /**
            * @name property
            * @memberof plat.controls.ObservableAttributeControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            public property: string;
            /**
            * @name attribute
            * @memberof plat.controls.ObservableAttributeControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The camel-cased name of the control as it appears as an attribute.
            */
            public attribute: string;
            /**
            * @name priority
            * @memberof plat.controls.ObservableAttributeControl
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * This control needs to load before its templateControl
            */
            public priority: number;
            /**
            * @name _listeners
            * @memberof plat.controls.ObservableAttributeControl
            * @kind property
            * @access protected
            *
            * @type {Array<plat.IPropertyChangedListener>}
            *
            * @description
            * The set of functions added by the Template Control that listens
            * for property changes.
            */
            public _listeners: {
                (newValue: any, oldValue?: any): void;
            }[];
            /**
            * @name _removeListener
            * @memberof plat.controls.ObservableAttributeControl
            * @kind property
            * @access protected
            *
            * @type {IRemoveListener}
            *
            * @description
            * The function to stop listening for property changes.
            */
            public _removeListener: IRemoveListener;
            /**
            * @name initialize
            * @memberof plat.controls.ObservableAttributeControl
            * @kind function
            * @access public
            *
            * @description
            * Sets the initial value of the property on
            * the Template Control.
            *
            * @returns {void}
            */
            public initialize(): void;
            /**
            * @name loaded
            * @memberof plat.controls.ObservableAttributeControl
            * @kind function
            * @access public
            *
            * @description
            * Observes the property and resets the value.
            *
            * @returns {void}
            */
            public loaded(): void;
            /**
            * @name dispose
            * @memberof plat.controls.ObservableAttributeControl
            * @kind function
            * @access public
            *
            * @description
            * Stops listening for changes to the evaluated
            * expression and removes references to the listeners
            * defined by the Template Control.
            *
            * @returns {void}
            */
            public dispose(): void;
            /**
            * @name _setProperty
            * @memberof plat.controls.ObservableAttributeControl
            * @kind function
            * @access protected
            *
            * @description
            * Sets the property on the Template Control.
            *
            * @param {any} value The new value of the evaluated expression.
            * @param {any} oldValue? The old value of the evaluated expression.
            *
            * @returns {void}
            */
            public _setProperty(value: any, oldValue?: any): void;
            /**
            * @name _callListeners
            * @memberof plat.controls.ObservableAttributeControl
            * @kind function
            * @access protected
            *
            * @description
            * Calls the listeners defined by the Template Control.
            *
            * @param {any} value The new value of the evaluated expression.
            * @param {any} oldValue The old value of the evaluated expression.
            *
            * @returns {void}
            */
            public _callListeners(newValue: any, oldValue: any): void;
            /**
            * @name _addListener
            * @memberof plat.controls.ObservableAttributeControl
            * @kind function
            * @access protected
            *
            * @description
            * Adds a listener as defined by the Template Control.
            *
            * @param {plat.IPropertyChangedListener} listener The listener added by the Template Control.
            */
            public _addListener(listener: (newValue: any, oldValue: any) => void): IRemoveListener;
            /**
            * @name _getValue
            * @memberof plat.controls.ObservableAttributeControl
            * @kind function
            * @access protected
            *
            * @description
            * Evaluates the attribute's value.
            *
            * @returns {any}
            */
            public _getValue(): any;
            /**
            * @name _observeProperty
            * @memberof plat.controls.ObservableAttributeControl
            * @kind function
            * @access protected
            *
            * @description
            * Observes the attribute's value.
            *
            * @returns {void}
            */
            public _observeProperty(): void;
        }
        /**
        * @name IObservableAttributeControl
        * @memberof plat.controls
        * @kind interface
        *
        * @extends {plat.controls.IAttributeControl}
        *
        * @description
        * An {@link plat.controls.IAttributeControl|IAttributeControl} that deals with observing changes for a specified property.
        */
        interface IObservableAttributeControl extends IAttributeControl {
            /**
            * @name property
            * @memberof plat.controls.IObservableAttributeControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            property: string;
            /**
            * @name attribute
            * @memberof plat.controls.IObservableAttributeControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The camel-cased name of the control as it appears as an attribute.
            */
            attribute: string;
        }
        /**
        * @name Options
        * @memberof plat.controls
        * @kind class
        *
        * @extends {plat.controls.ObservableAttributeControl}
        *
        * @description
        * An {@link plat.controls.ObservableAttributeControl|ObservableAttributeControl} that sets 'options' as the
        * associated property.
        */
        class Options extends ObservableAttributeControl {
            /**
            * @name property
            * @memberof plat.controls.Options
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The property to set on the associated template control.
            */
            public property: string;
        }
    }
    module ui {
        /**
        * @name TemplateControl
        * @memberof plat.ui
        * @kind class
        *
        * @extends {plat.Control}
        * @implements {plat.ui.ITemplateControl}
        *
        * @description
        * The base control for any control that affects the UI. They provide properties for the control to use
        * to manage its body HTML.
        */
        class TemplateControl extends Control implements ITemplateControl {
            /**
            * @name $ResourcesFactory
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.ui.IResourcesFactory}
            *
            * @description
            * Reference to the {@link plat.ui.IResourcesFactory|IResourcesFactory} injectable.
            */
            static $ResourcesFactory: IResourcesFactory;
            /**
            * @name $BindableTemplatesFactory
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.ui.IBindableTemplatesFactory}
            *
            * @description
            * Reference to the {@link plat.ui.IBindableTemplatesFactory|IBindableTemplatesFactory} injectable.
            */
            static $BindableTemplatesFactory: IBindableTemplatesFactory;
            /**
            * @name $ManagerCache
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.storage.ICache<processing.IElementManager>}
            *
            * @description
            * Reference to a cache injectable that stores {@link plat.processing.IElementManager|IElementManagers}.
            */
            static $ManagerCache: storage.ICache<processing.IElementManager>;
            /**
            * @name $TemplateCache
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.storage.ITemplateCache}
            *
            * @description
            * Reference to a cache injectable that stores and retrieves HTML templates.
            */
            static $TemplateCache: storage.ITemplateCache;
            /**
            * @name $Parser
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.expressions.IParser}
            *
            * @description
            * Reference to the {@link plat.expressions.IParser|IParser} injectable.
            */
            static $Parser: expressions.IParser;
            /**
            * @name $Http
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.async.IHttp}
            *
            * @description
            * Reference to the {@link plat.async.IHttp|IHttp} injectable.
            */
            static $Http: async.IHttp;
            /**
            * @name $Promise
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.async.IPromise}
            *
            * @description
            * Reference to the {@link plat.async.IPromise|IPromise} injectable.
            */
            static $Promise: async.IPromise;
            /**
            * @name evaluateExpression
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Evaluates an expression string with a given control and optional control's context and aliases.
            *
            * @param {string} expression The expression string (e.g. 'foo + foo').
            * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
            * @param {any} aliases? An optional alias object containing resource alias values
            *
            * @returns {any} The evaluated object.
            */
            static evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
            /**
            * @name evaluateExpression
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Evaluates an expression string with a given control and optional control's context and aliases.
            *
            * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
            * plat.expressions.IParser injectable.
            * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
            * @param {any} aliases? An optional alias object containing resource alias values
            *
            * @returns {any} The evaluated object.
            */
            static evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;
            /**
            * @name getResources
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Given a control and Array of aliases, finds the associated resources and builds a context object containing
            * the values. Returns the object.
            *
            * @param {plat.ui.ITemplateControl} control The control used as the starting point for finding resources.
            * @param {Array<string>} aliases An array of aliases to search for.
            * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
            *
            * @returns {IObject<any>} An object representing a set of resources.
            */
            static getResources(control: ITemplateControl, aliases: string[], resources?: any): IObject<any>;
            /**
            * @name findResource
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Starts at a control and searches up its parent chain for a particular resource alias.
            * If the resource is found, it will be returned along with the control instance on which
            * the resource was found.
            *
            * @param {plat.ui.ITemplateControl} control The control on which to start searching for the resource alias.
            * @param {string} alias The alias to search for.
            *
            * @returns {{ resource: plat.ui.IResource; control: plat.ui.ITemplateControl; }} An object consisting of the
            * found resource along with its corresponding control.
            */
            static findResource(control: ITemplateControl, alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
            * @name dispose
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Recursively disposes a control and its children.
            *
            * @param {plat.ui.ITemplateControl} control A control to dispose.
            *
            * @returns {void}
            */
            static dispose(control: ITemplateControl): void;
            /**
            * @name loadControl
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Loads the control tree depth first (visit children, then visit self).
            *
            * @param {plat.ui.ITemplateControl} control The control serving as the root control to load.
            *
            * @returns {void}
            */
            static loadControl(control: ITemplateControl): void;
            /**
            * @name contextChanged
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Notifies a control that its context has been changed by
            * calling the "control.contextChanged" method if it exists.
            *
            * @param {plat.IControl} control The control whose context changed.
            * @param {any} newValue The new value of the control's context.
            * @param {any} oldValue The old value of the control's context.
            *
            * @returns {void}
            */
            static contextChanged(control: IControl, newValue: any, oldValue: any): void;
            /**
            * @name setContextResources
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Sets the 'context' resource value on a {@link plat.ui.ITemplateControl|ITemplateControl}. If the control specifies
            * hasOwnContext as true, the 'rootContext' resource value will be set.
            *
            * @param {plat.ui.ITemplateControl} control The control whose context resources will be set.
            *
            * @returns {void}
            */
            static setContextResources(control: ITemplateControl): void;
            /**
            * @name removeElement
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Completely removes a control's element from its parentNode. If the
            * control implements replaceWith=null, All of its nodes between its
            * startNode and endNode (inclusive) will be removed.
            *
            * @param {plat.ui.ITemplateControl} control The control whose element should be removed.
            *
            * @returns {void}
            */
            static removeElement(control: ITemplateControl): void;
            /**
            * @name setAbsoluteContextPath
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Sets the absoluteContextPath read-only property on a control.
            *
            * @param {plat.ui.ITemplateControl} control The control on which to set the absoluteContextPath.
            * @param {string} path The path to set on the control.
            *
            * @returns {void}
            */
            static setAbsoluteContextPath(control: ITemplateControl, path: string): void;
            /**
            * @name determineTemplate
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Determines the template for a control by searching for a templateUrl,
            * using the provided templateUrl, or serializing the control's templateString.
            *
            * @param {plat.ui.ITemplateControl} control The control whose template is being determined.
            * @param {string} templateUrl? The potential template URL to use to grab the template.
            *
            * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves to the proper template.
            */
            static determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment>;
            /**
            * @name detach
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Detaches a {@link plat.ui.TemplateControl|TemplateControl}. Disposes its children,
            * but does not dispose the {@link plat.ui.TemplateControl|TemplateControl}.
            *
            * @param {plat.ui.ITemplateControl} control The control to be detached.
            *
            * @returns {void}
            */
            static detach(control: ITemplateControl): void;
            /**
            * @name getInstance
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a new instance of {@link plat.ui.TemplateControl|TemplateControl}.
            *
            * @returns {plat.ui.ITemplateControl} The new {@link plat.ui.TemplateControl|TemplateControl} instance.
            */
            static getInstance(): ITemplateControl;
            /**
            * @name __resourceCache
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access private
            * @static
            *
            * @type {any}
            *
            * @description
            * An object for quickly retrieving previously accessed resources.
            */
            private static __resourceCache;
            /**
            * @name priority
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * By default {@link plat.ui.TemplateControl|TemplateControls} have a priority of 100.
            */
            public priority: number;
            /**
            * @name context
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * The context of an {@link plat.ui.ITemplateControl|ITemplateControl}, used for inheritance and data-binding.
            */
            public context: any;
            /**
            * @name absoluteContextPath
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * Specifies the absolute path from where the context was created to this IControl's context.
            * Used by the {@link plat.observable.ContextManager|ContextManager} for maintaining context parity
            * (e.g. 'context.childContextProperty.grandChildContextProperty').
            */
            public absoluteContextPath: string;
            /**
            * @name resources
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {plat.ui.IResources}
            *
            * @description
            * Resources are used for providing aliases to use in markup expressions. They
            * are particularly useful when trying to access properties outside of the
            * current context, as well as reassigning context at any point in an app.
            *
            * @remarks
            * By default, every control has a resource for '@control' and '@context'.
            * {@link plat.ui.IViewControl|IViewControl} objects also have a resource for '@root' and '@rootContext',
            * which is a reference to their root control and root context.
            *
            * Resources can be created in HTML, or through the exposed control.resources
            * object. If specified in HTML, they must be the first element child of the
            * control upon which the resources will be placed. IViewControls that use a
            * templateUrl can have resources as their first element in the templateUrl.
            *
            * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
            * The type of resource is denoted by the element name.
            *
            * Only resources of type 'observable' will have data binding. The types of resources are:
            * function, injectable, observable, and object. Resources of type 'function' will have their
            * associated function context bound to the control that contains the resource.
            *
            * When an alias is found in a markup expression, the framework will search up the control chain
            * to find the alias on a control's resources. This first matching alias will be used.
            *
            * @example
            * <custom-control>
            *     <plat-resources>
            *         <injectable alias="Cache">$CacheFactory</injectable>
            *         <observable alias="testObj">
            *              {
            *                  foo: 'foo',
            *                  bar: 'bar',
            *                  baz: 2
            *              }
            *         </observable>
            *     </plat-resources>
            * </custom-control>
            */
            public resources: IResources;
            /**
            * @name hasOwnContext
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {boolean}
            *
            * @description
            * Flag indicating whether or not the {@link plat.ui.ITemplateControl|ITemplateControl} defines the context property.
            */
            public hasOwnContext: boolean;
            /**
            * @name templateString
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A string representing the DOM template for this control. If this property is
            * defined on a {@link plat.ui.ITemplateControl|ITemplateControl} then DOM will be created and put in the
            * control's element prior to calling the 'setTemplate' method.
            */
            public templateString: string;
            /**
            * @name templateUrl
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A url containing a string representing the DOM template for this control. If this property is
            * defined on a {@link plat.ui.ITemplateControl|ITemplateControl} then DOM will be created and put in the
            * control's element prior to calling the 'setTemplate' method. This property takes
            * precedence over templateString. In the event that both are defined, templateString
            * will be ignored.
            */
            public templateUrl: string;
            /**
            * @name innerTemplate
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {DocumentFragment}
            *
            * @description
            * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
            * This property will only contain the innerHTML when either a templateString or templateUrl is
            * defined. Its important to clone this property when injecting it somewhere, else its childNodes
            * will disappear.
            *
            * @example this.innerTemplate.cloneNode(true); //Useful if this is not a one-time injection.
            */
            public innerTemplate: DocumentFragment;
            /**
            * @name bindableTemplates
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {plat.ui.IBindableTemplates}
            *
            * @description
            * An {@link plat.ui.IBindableTemplates|IBindableTemplates} object used for binding a data context to a template.
            * This is an advanced function of a {@link plat.ui.ITemplateControl|ITemplateControl}.
            */
            public bindableTemplates: IBindableTemplates;
            /**
            * @name controls
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {Array<plat.IControl>}
            *
            * @description
            * An array of child controls. Any controls created by this control can be found in this array. The controls in
            * this array will have reference to this control in their parent property.
            */
            public controls: IControl[];
            /**
            * @name elementNodes
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {Array<Node>}
            *
            * @description
            * A Node array for managing the {@link plat.ui.ITemplateControl|ITemplateControl's} childNodes in the event that this control
            * replaces its element. This property will only exist/be of use for a {@link plat.ui.ITemplateControl|ITemplateControl} that
            * implements the replaceWith property.
            */
            public elementNodes: Node[];
            /**
            * @name startNode
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {Node}
            *
            * @description
            * The first node in the {@link plat.ui.ITemplateControl|ITemplateControl's} body. This property will be a Comment node when the
            * control implements replaceWith = null, otherwise it will be null. This property allows an
            * {@link plat.ui.ITemplateControl|ITemplateControl} to add nodes to its body in the event that it replaces its element.
            *
            * @example this.startNode.parentNode.insertBefore(node, this.startNode.nextSibling);
            */
            public startNode: Node;
            /**
            * @name endNode
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {Node}
            *
            * @description
            * The last node in the {@link plat.ui.ITemplateControl|ITemplateControl's} body. This property will be a Comment node when the
            * control implements the replaceWith property, otherwise it will be null. This property allows a
            * {@link plat.ui.ITemplateControl|ITemplateControl} to add nodes to its body in the event that it replaces its element.
            *
            * @example this.endNode.parentNode.insertBefore(node, this.endNode);
            */
            public endNode: Node;
            /**
            * @name replaceWith
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * Allows a {@link plat.ui.ITemplateControl|ITemplateControl} to either swap its element with another element (e.g. plat-select),
            * or replace its element altogether. If null or empty string, the element will be removed from the DOM, and the
            * childNodes of the element will be in its place. In addition, when the element is placed startNode and endNode Comments
            * are created, and the childNodes are added to the elementNodes property on the control. The replaceWith
            * property can be any property that works with document.createElement(). If the control's element had
            * attributes (as well as attribute IControls), those attributes will be carried to the swapped element. The default
            * replaceWith is 'any,' meaning it will default to a 'div' in the case that the control type is used as the
            * element's nodename (e.g. <plat-foreach plat-context="..."></plat-foreach>), but will maintain whatever element type
            * is used otherwise (e.g. <tr plat-control="plat-foreach" plat-context="..."></tr>).
            */
            public replaceWith: string;
            /**
            * @name root
            * @memberof plat.ui.TemplateControl
            * @kind property
            * @access public
            *
            * @type {plat.ui.ITemplateControl}
            *
            * @description
            * Set to the root ancestor control from which this control inherits its context. This value
            * can be equal to this control.
            */
            public root: ITemplateControl;
            /**
            * @name contextChanged
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            *
            * @description
            * This event is fired when an {@link plat.ui.ITemplateControl|ITemplateControl's} context property
            * is changed by an ancestor control.
            *
            * @param {any} newValue? The new value of the context.
            * @param {any} oldValue? The old value of the context.
            *
            * @returns {void}
            */
            public contextChanged(newValue?: any, oldValue?: any): void;
            /**
            * @name setTemplate
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            *
            * @description
            * A method called for {@link plat.ui.ITemplateControl|ITemplateControls} to set their template.
            * During this method a control should ready its template for compilation. Whatever is in the control's
            * element (or elementNodes if replaceWith is implemented) after this method's execution will be compiled
            * and appear on the DOM.
            *
            * @returns {void}
            */
            public setTemplate(): void;
            /**
            * @name getIdentifier
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            *
            * @description
            * Finds the identifier string associated with the given context object. The string returned
            * is the path from a control's context.
            *
            * @param {any} context The object/primitive to locate on the control's context.
            *
            * @returns {string} The input context's identifier string.
            *
            * @example
            *     // returns 'title.font'
            *     this.getIdentifier(this.context.title.font);
            */
            public getIdentifier(context: any): string;
            /**
            * @name getAbsoluteIdentifier
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            *
            * @description
            * Finds the absolute identifier string associated with the given context object. The string returned
            * is the path from a control's root ancestor's context.
            *
            * @param {any} context The object/primitive to locate on the root control's context.
            *
            * @returns {string} The input context's identifier string as seen from the root context object.
            */
            public getAbsoluteIdentifier(context: any): string;
            /**
            * @name getResources
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            *
            * @description
            * Finds the associated resources and builds a context object containing
            * the values.
            *
            * @param {Array<string>} aliases An array of aliases to search for.
            * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
            *
            * @returns {IObject<any>} The context object containing the values of the associated resources.
            */
            public getResources(aliases: string[], resources?: any): IObject<any>;
            /**
            * @name findResource
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            *
            * @description
            * Starts at a control and searches up its parent chain for a particular resource alias.
            * If the resource is found, it will be returned along with the control instance on which
            * the resource was found.
            *
            * @param {string} alias The alias to search for.
            *
            * @returns {{ resource: plat.ui.IResource; control: plat.ui.ITemplateControl; }} An object consisting of the
            * found resource along with its corresponding control.
            */
            public findResource(alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
            * @name evaluateExpression
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Evaluates an expression string, using the input context or control.context.
            *
            * @param {string} expression The expression string to evaluate.
            * @param {any} context? An optional context with which to parse. If
            * no context is specified, the control.context will be used.
            *
            * @returns {any} The evaluated object/primitive.
            */
            public evaluateExpression(expression: string, context?: any): any;
            /**
            * @name evaluateExpression
            * @memberof plat.ui.TemplateControl
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Evaluates an expression string, using the input context or control.context.
            *
            * @param {plat.expressions.IParsedExpression} expression The previously parsed expression to evaluate.
            * @param {any} context? An optional context with which to parse. If
            * no context is specified, the control.context will be used.
            *
            * @returns {any} The evaluated object/primitive.
            */
            public evaluateExpression(expression: expressions.IParsedExpression, context?: any): any;
        }
        /**
        * The Type for referencing the '$TemplateControlFactory' injectable as a dependency.
        */
        function ITemplateControlFactory($ResourcesFactory?: IResourcesFactory, $BindableTemplatesFactory?: IBindableTemplatesFactory, $ManagerCache?: storage.ICache<processing.IElementManager>, $TemplateCache?: storage.ITemplateCache, $Parser?: expressions.IParser, $Http?: async.IHttp, $Promise?: async.IPromise): ITemplateControlFactory;
        /**
        * @name ITemplateControlFactory
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Creates and manages {@link plat.ui.ITemplateControl|ITemplateControls}.
        */
        interface ITemplateControlFactory {
            /**
            * @name evaluateExpression
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Evaluates an expression string with a given control and optional control's context and aliases.
            *
            * @param {string} expression The expression string (e.g. 'foo + foo').
            * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
            * @param {any} aliases? An optional alias object containing resource alias values
            *
            * @returns {any} The evaluated object.
            */
            evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
            /**
            * @name evaluateExpression
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Evaluates an expression string with a given control and optional control's context and aliases.
            *
            * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
            * plat.expressions.IParser injectable.
            * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
            * @param {any} aliases? An optional alias object containing resource alias values
            *
            * @returns {any} The evaluated object.
            */
            evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;
            /**
            * @name getResources
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Given a control and Array of aliases, finds the associated resources and builds a context object containing
            * the values. Returns the object.
            *
            * @param {plat.ui.ITemplateControl} control The control used as the starting point for finding resources.
            * @param {Array<string>} aliases An array of aliases to search for.
            * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
            *
            * @returns {IObject<any>} An object representing a set of resources.
            */
            getResources(control: ITemplateControl, aliases: string[], resources?: any): IObject<any>;
            /**
            * @name findResource
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Starts at a control and searches up its parent chain for a particular resource alias.
            * If the resource is found, it will be returned along with the control instance on which
            * the resource was found.
            *
            * @param {plat.ui.ITemplateControl} control The control on which to start searching for the resource alias.
            * @param {string} alias The alias to search for.
            *
            * @returns {{ resource: plat.ui.IResource; control: plat.ui.ITemplateControl; }} An object consisting of the
            * found resource along with its corresponding control.
            */
            findResource(control: ITemplateControl, alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
            * @name dispose
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Recursively disposes a control and its children.
            *
            * @param {plat.ui.ITemplateControl} control A control to dispose.
            *
            * @returns {void}
            */
            dispose(control: ITemplateControl): void;
            /**
            * @name loadControl
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Loads the control tree depth first (visit children, then visit self).
            *
            * @param {plat.ui.ITemplateControl} control The control serving as the root control to load.
            *
            * @returns {void}
            */
            loadControl(control: ITemplateControl): void;
            /**
            * @name contextChanged
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Notifies a control that its context has been changed by
            * calling the "control.contextChanged" method if it exists.
            *
            * @param {plat.IControl} control The control whose context changed.
            * @param {any} newValue The new value of the control's context.
            * @param {any} oldValue The old value of the control's context.
            *
            * @returns {void}
            */
            contextChanged(control: IControl, newValue: any, oldValue: any): void;
            /**
            * @name contextChanged
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Notifies a control that its context has been changed by
            * calling the "control.contextChanged" method if it exists.
            *
            * @param {plat.ui.ITemplateControl} control The control whose context changed.
            * @param {any} newValue The new value of the control's context.
            * @param {any} oldValue The old value of the control's context.
            *
            * @returns {void}
            */
            contextChanged(control: ITemplateControl, newValue: any, oldValue: any): void;
            /**
            * @name setContextResources
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Sets the 'context' resource value on a {@link plat.ui.ITemplateControl|ITemplateControl}. If the control specifies
            * hasOwnContext as true, the 'rootContext' resource value will be set.
            *
            * @param {plat.ui.ITemplateControl} control The control whose context resources will be set.
            *
            * @returns {void}
            */
            setContextResources(control: ITemplateControl): void;
            /**
            * @name removeElement
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Completely removes a control's element from its parentNode. If the
            * control implements replaceWith=null, All of its nodes between its
            * startNode and endNode (inclusive) will be removed.
            *
            * @param {plat.ui.ITemplateControl} control The control whose element should be removed.
            *
            * @returns {void}
            */
            removeElement(control: ITemplateControl): void;
            /**
            * @name setAbsoluteContextPath
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Sets the absoluteContextPath read-only property on a control.
            *
            * @param {plat.ui.ITemplateControl} control The control on which to set the absoluteContextPath.
            * @param {string} path The path to set on the control.
            *
            * @returns {void}
            */
            setAbsoluteContextPath(control: ITemplateControl, path: string): void;
            /**
            * @name determineTemplate
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Determines the template for a control by searching for a templateUrl,
            * using the provided templateUrl, or serializing the control's templateString.
            *
            * @param {plat.ui.ITemplateControl} control The control whose template is being determined.
            * @param {string} templateUrl? The potential template URL to use to grab the template.
            *
            * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves to the proper template.
            */
            determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment>;
            /**
            * @name detach
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Detaches a {@link plat.ui.TemplateControl|TemplateControl}. Disposes its children,
            * but does not dispose the {@link plat.ui.TemplateControl|TemplateControl}.
            *
            * @param {plat.ui.ITemplateControl} control The control to be detached.
            *
            * @returns {void}
            */
            detach(control: ITemplateControl): void;
            /**
            * @name getInstance
            * @memberof plat.ui.ITemplateControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a new instance of {@link plat.ui.TemplateControl|TemplateControl}.
            *
            * @returns {plat.ui.ITemplateControl} The new {@link plat.ui.TemplateControl|TemplateControl} instance.
            */
            getInstance(): ITemplateControl;
        }
        /**
        * @name ITemplateControl
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {plat.IControl}
        *
        * @description
        * Describes a control which provides properties and methods for managing its body HTML.
        */
        interface ITemplateControl extends IControl {
            /**
            * @name context
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * The context of an {@link plat.ui.ITemplateControl|ITemplateControl}, used for inheritance and data-binding.
            */
            context?: any;
            /**
            * @name absoluteContextPath
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * Specifies the absolute path from where the context was created to this IControl's context.
            * Used by the {@link plat.observable.ContextManager|ContextManager} for maintaining context parity
            * (e.g. 'context.childContextProperty.grandChildContextProperty').
            */
            absoluteContextPath?: string;
            /**
            * @name resources
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {plat.ui.IResources}
            *
            * @description
            * Resources are used for providing aliases to use in markup expressions. They
            * are particularly useful when trying to access properties outside of the
            * current context, as well as reassigning context at any point in an app.
            *
            * @remarks
            * By default, every control has a resource for '@control' and '@context'.
            * {@link plat.ui.IViewControl|IViewControl} objects also have a resource for '@root' and '@rootContext',
            * which is a reference to their root control and root context.
            *
            * Resources can be created in HTML, or through the exposed control.resources
            * object. If specified in HTML, they must be the first element child of the
            * control upon which the resources will be placed. IViewControls that use a
            * templateUrl can have resources as their first element in the templateUrl.
            *
            * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
            * The type of resource is denoted by the element name.
            *
            * Only resources of type 'observable' will have data binding. The types of resources are:
            * function, injectable, observable, and object. Resources of type 'function' will have their
            * associated function context bound to the control that contains the resource.
            *
            * When an alias is found in a markup expression, the framework will search up the control chain
            * to find the alias on a control's resources. This first matching alias will be used.
            *
            * @example
            * <custom-control>
            *     <plat-resources>
            *         <injectable alias="Cache">$CacheFactory</injectable>
            *         <observable alias="testObj">
            *              {
            *                  foo: 'foo',
            *                  bar: 'bar',
            *                  baz: 2
            *              }
            *         </observable>
            *     </plat-resources>
            * </custom-control>
            */
            resources?: IResources;
            /**
            * @name hasOwnContext
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {boolean}
            *
            * @description
            * Flag indicating whether or not the {@link plat.ui.ITemplateControl|ITemplateControl} defines the context property.
            */
            hasOwnContext?: boolean;
            /**
            * @name templateString
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A string representing the DOM template for this control. If this property is
            * defined on a {@link plat.ui.ITemplateControl|ITemplateControl} then DOM will be created and put in the
            * control's element prior to calling the 'setTemplate' method.
            */
            templateString?: string;
            /**
            * @name templateUrl
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A url containing a string representing the DOM template for this control. If this property is
            * defined on a {@link plat.ui.ITemplateControl|ITemplateControl} then DOM will be created and put in the
            * control's element prior to calling the 'setTemplate' method. This property takes
            * precedence over templateString. In the event that both are defined, templateString
            * will be ignored.
            */
            templateUrl?: string;
            /**
            * @name innerTemplate
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {DocumentFragment}
            *
            * @description
            * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
            * This property will only contain the innerHTML when either a templateString or templateUrl is
            * defined. Its important to clone this property when injecting it somewhere, else its childNodes
            * will disappear.
            *
            * @example this.innerTemplate.cloneNode(true); //Useful if this is not a one-time injection.
            */
            innerTemplate?: DocumentFragment;
            /**
            * @name bindableTemplates
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {plat.ui.IBindableTemplates}
            *
            * @description
            * An {@link plat.ui.IBindableTemplates|IBindableTemplates} object used for binding a data context to a template.
            * This is an advanced function of a {@link plat.ui.ITemplateControl|ITemplateControl}.
            */
            bindableTemplates?: IBindableTemplates;
            /**
            * @name controls
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {Array<plat.IControl>}
            *
            * @description
            * An array of child controls. Any controls created by this control can be found in this array. The controls in
            * this array will have reference to this control in their parent property.
            */
            controls?: IControl[];
            /**
            * @name elementNodes
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {Array<Node>}
            *
            * @description
            * A Node array for managing the {@link plat.ui.ITemplateControl|ITemplateControl's} childNodes in the event that this control
            * replaces its element. This property will only exist/be of use for a {@link plat.ui.ITemplateControl|ITemplateControl} that
            * implements the replaceWith property.
            */
            elementNodes?: Node[];
            /**
            * @name startNode
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {Node}
            *
            * @description
            * The first node in the {@link plat.ui.ITemplateControl|ITemplateControl's} body. This property will be a Comment node when the
            * control implements replaceWith = null, otherwise it will be null. This property allows an
            * {@link plat.ui.ITemplateControl|ITemplateControl} to add nodes to its body in the event that it replaces its element.
            *
            * @example this.startNode.parentNode.insertBefore(node, this.startNode.nextSibling);
            */
            startNode?: Node;
            /**
            * @name endNode
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {Node}
            *
            * @description
            * The last node in the {@link plat.ui.ITemplateControl|ITemplateControl's} body. This property will be a Comment node when the
            * control implements the replaceWith property, otherwise it will be null. This property allows a
            * {@link plat.ui.ITemplateControl|ITemplateControl} to add nodes to its body in the event that it replaces its element.
            *
            * @example this.endNode.parentNode.insertBefore(node, this.endNode);
            */
            endNode?: Node;
            /**
            * @name replaceWith
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * Allows a {@link plat.ui.ITemplateControl|ITemplateControl} to either swap its element with another element (e.g. plat-select),
            * or replace its element altogether. If null or empty string, the element will be removed from the DOM, and the
            * childNodes of the element will be in its place. In addition, when the element is placed startNode and endNode Comments
            * are created, and the childNodes are added to the elementNodes property on the control. The replaceWith
            * property can be any property that works with document.createElement(). If the control's element had
            * attributes (as well as attribute IControls), those attributes will be carried to the swapped element. The default
            * replaceWith is 'any,' meaning it will default to a 'div' in the case that the control type is used as the
            * element's nodename (e.g. <plat-foreach plat-context="..."></plat-foreach>), but will maintain whatever element type
            * is used otherwise (e.g. <tr plat-control="plat-foreach" plat-context="..."></tr>).
            */
            replaceWith?: string;
            /**
            * @name root
            * @memberof plat.ui.ITemplateControl
            * @kind property
            * @access public
            *
            * @type {plat.ui.ITemplateControl}
            *
            * @description
            * Set to the root ancestor control from which this control inherits its context. This value
            * can be equal to this control.
            */
            root?: ITemplateControl;
            /**
            * @name setTemplate
            * @memberof plat.ui.ITemplateControl
            * @kind function
            * @access public
            *
            * @description
            * A method called for {@link plat.ui.ITemplateControl|ITemplateControls} to set their template.
            * During this method a control should ready its template for compilation. Whatever is in the control's
            * element (or elementNodes if replaceWith is implemented) after this method's execution will be compiled
            * and appear on the DOM.
            *
            * @returns {void}
            */
            setTemplate? (): void;
            /**
            * @name contextChanged
            * @memberof plat.ui.ITemplateControl
            * @kind function
            * @access public
            *
            * @description
            * This event is fired when an {@link plat.ui.ITemplateControl|ITemplateControl's} context property
            * is changed by an ancestor control.
            *
            * @param {any} newValue? The new value of the context.
            * @param {any} oldValue? The old value of the context.
            *
            * @returns {void}
            */
            contextChanged? (newValue: any, oldValue: any): void;
            /**
            * @name getIdentifier
            * @memberof plat.ui.ITemplateControl
            * @kind function
            * @access public
            *
            * @description
            * Finds the identifier string associated with the given context object. The string returned
            * is the path from a control's context.
            *
            * @param {any} context The object/primitive to locate on the control's context.
            *
            * @returns {string} The input context's identifier string.
            *
            * @example
            *     // returns 'title.font'
            *     this.getIdentifier(this.context.title.font);
            */
            getIdentifier? (context: any): string;
            /**
            * @name getAbsoluteIdentifier
            * @memberof plat.ui.ITemplateControl
            * @kind function
            * @access public
            *
            * @description
            * Finds the absolute identifier string associated with the given context object. The string returned
            * is the path from a control's root ancestor's context.
            *
            * @param {any} context The object/primitive to locate on the root control's context.
            *
            * @returns {string} The input context's identifier string as seen from the root context object.
            */
            getAbsoluteIdentifier? (context: any): string;
            /**
            * @name getResources
            * @memberof plat.ui.ITemplateControl
            * @kind function
            * @access public
            *
            * @description
            * Finds the associated resources and builds a context object containing
            * the values.
            *
            * @param {Array<string>} aliases An array of aliases to search for.
            * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
            *
            * @returns {IObject<any>} The context object containing the values of the associated resources.
            */
            getResources? (aliases: string[], resources?: any): IObject<any>;
            /**
            * @name findResource
            * @memberof plat.ui.ITemplateControl
            * @kind function
            * @access public
            *
            * @description
            * Starts at a control and searches up its parent chain for a particular resource alias.
            * If the resource is found, it will be returned along with the control instance on which
            * the resource was found.
            *
            * @param {string} alias The alias to search for.
            *
            * @returns {{ resource: plat.ui.IResource; control: plat.ui.ITemplateControl; }} An object consisting of the
            * found resource along with its corresponding control.
            */
            findResource? (alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
            * @name evaluateExpression
            * @memberof plat.ui.ITemplateControl
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Evaluates an expression string, using the input context or control.context.
            *
            * @param {string} expression The expression string to evaluate.
            * @param {any} context? An optional context with which to parse. If
            * no context is specified, the control.context will be used.
            *
            * @returns {any} The evaluated object/primitive.
            */
            evaluateExpression? (expression: string, context?: any): any;
            /**
            * @name evaluateExpression
            * @memberof plat.ui.ITemplateControl
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Evaluates an expression string, using the input context or control.context.
            *
            * @param {plat.expressions.IParsedExpression} expression The previously parsed expression to evaluate.
            * @param {any} context? An optional context with which to parse. If
            * no context is specified, the control.context will be used.
            *
            * @returns {any} The evaluated object/primitive.
            */
            evaluateExpression? (expression: expressions.IParsedExpression, context?: any): any;
        }
        /**
        * @name BindablePropertyControl
        * @memberof plat.ui
        * @kind class
        *
        * @extends {plat.ui.TemplateControl}
        * @implements {plat.ui.IBindablePropertyControl}
        *
        * @description
        * An extended {@link plat.ui.TemplateControl|TemplateControl} that allows for the binding of a value to
        * another listening control (e.g. {@link plat.controls.Bind|plat-bind} control).
        */
        class BindablePropertyControl extends TemplateControl implements IBindablePropertyControl {
            /**
            * @name _listeners
            * @memberof plat.ui.BindablePropertyControl
            * @kind property
            * @access protected
            *
            * @type {Array<plat.IPropertyChangedListener>}
            *
            * @description
            * The set of functions added externally that listens
            * for property changes.
            */
            public _listeners: {
                (newValue: any, oldValue?: any): void;
            }[];
            /**
            * @name observeProperty
            * @memberof plat.ui.BindablePropertyControl
            * @kind function
            * @access public
            *
            * @description
            * Adds a listener to be called when the bindable property changes.
            *
            * @param {plat.IPropertyChangedListener} listener The function that acts as a listener.
            *
            * @returns {plat.IRemoveListener} A function to stop listening for property changes.
            */
            public observeProperty(listener: (newValue: any, oldValue?: any) => void): IRemoveListener;
            /**
            * @name setProperty
            * @memberof plat.ui.BindablePropertyControl
            * @kind function
            * @access public
            *
            * @description
            * A function that lets this control know when the context's value of the bindable
            * property has changed.
            *
            * @param {any} newValue The new value of the bindable property.
            * @param {any} oldValue? The old value of the bindable property.
            * @param {boolean} firstTime? A boolean signifying whether this is the first set of the property.
            *
            * @returns {void}
            */
            public setProperty(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
            * @name propertyChanged
            * @memberof plat.ui.BindablePropertyControl
            * @kind function
            * @access public
            *
            * @description
            * A function that signifies when this control's bindable property has changed.
            *
            * @param {any} newValue The new value of the property after the change.
            * @param {any} oldValue? The old value of the property prior to the change.
            *
            * @returns {void}
            */
            public propertyChanged(newValue: any, oldValue?: any): void;
            /**
            * @name dispose
            * @memberof plat.ui.BindablePropertyControl
            * @kind function
            * @access public
            *
            * @description
            * Removes references to the listeners
            * defined externally.
            *
            * @returns {void}
            */
            public dispose(): void;
        }
        /**
        * @name IBindablePropertyControl
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {plat.ui.ITemplateControl}
        *
        * @description
        * Describes an object that allows for the binding of a value to
        * another listening control.
        */
        interface IBindablePropertyControl extends ITemplateControl {
            /**
            * @name observeProperty
            * @memberof plat.ui.IBindablePropertyControl
            * @kind function
            * @access public
            *
            * @description
            * Adds a listener to be called when the bindable property changes.
            *
            * @param {plat.IPropertyChangedListener} listener The function that acts as a listener.
            *
            * @returns {plat.IRemoveListener} A function to stop listening for property changes.
            */
            observeProperty(listener: (newValue: any, oldValue?: any) => void): IRemoveListener;
            /**
            * @name setProperty
            * @memberof plat.ui.IBindablePropertyControl
            * @kind function
            * @access public
            *
            * @description
            * A function that lets this control know when the context's value of the bindable
            * property has changed.
            *
            * @param {any} newValue The new value of the bindable property.
            * @param {any} oldValue? The old value of the bindable property.
            * @param {boolean} firstTime? A boolean signifying whether this is the first set of the property.
            *
            * @returns {void}
            */
            setProperty(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
            * @name propertyChanged
            * @memberof plat.ui.IBindablePropertyControl
            * @kind function
            * @access public
            *
            * @description
            * A function that signifies when this control's bindable property has changed.
            *
            * @param {any} newValue The new value of the property after the change.
            * @param {any} oldValue? The old value of the property prior to the change.
            *
            * @returns {void}
            */
            propertyChanged(newValue: any, oldValue?: any): void;
        }
        /**
        * @name BaseViewControl
        * @memberof plat.ui
        * @kind class
        *
        * @extends {plat.ui.TemplateControl}
        * @implements {plat.ui.IBaseViewControl}
        *
        * @description
        * A control used in a {@link plat.ui.controls.IBaseport|IBaseport} for simulated page navigation. The
        * control has navigation events that are called when navigating to and from the control.
        */
        class BaseViewControl extends TemplateControl implements IBaseViewControl {
            /**
            * @name detach
            * @memberof plat.ui.BaseViewControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Detaches a {@link plat.ui.BaseViewControl|BaseViewControl}. Disposes its children, but does not dispose the
            * {@link plat.ui.BaseViewControl|BaseViewControl}. Useful for the Navigator when storing the
            * {@link plat.ui.BaseViewControl|BaseViewControl} in history.
            *
            * @param {plat.ui.BaseViewControl} control The control to be detached.
            *
            * @returns {void}
            */
            static detach(control: IBaseViewControl): void;
            /**
            * @name dispose
            * @memberof plat.ui.BaseViewControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Recursively disposes a {@link plat.ui.BaseViewControl|BaseViewControl} and its children.
            *
            * @param {plat.ui.BaseViewControl} control A control to dispose.
            *
            * @returns {void}
            */
            static dispose(control: IBaseViewControl): void;
            /**
            * @name getInstance
            * @memberof plat.ui.BaseViewControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a new instance of a {@link plat.ui.BaseViewControl|BaseViewControl}.
            *
            * @returns {plat.ui.BaseViewControl} A new {@link plat.ui.BaseViewControl|BaseViewControl} instance.
            */
            static getInstance(): IBaseViewControl;
            /**
            * @name hasOwnContext
            * @memberof plat.ui.BaseViewControl
            * @kind property
            * @access public
            *
            * @type {boolean}
            *
            * @description
            * Specifies that this control will have its own context, and it should not inherit a context.
            */
            public hasOwnContext: boolean;
            /**
            * @name navigator
            * @memberof plat.ui.BaseViewControl
            * @kind property
            * @access public
            *
            * @type {plat.navigation.IBaseNavigator}
            *
            * @description
            * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IBaseViewControl|IBaseViewControls}
            * in a {plat.ui.controls.IBaseport|IBaseport}.
            */
            public navigator: navigation.IBaseNavigator;
            /**
            * @name navigatedTo
            * @memberof plat.ui.BaseViewControl
            * @kind function
            * @access public
            *
            * @description
            * This event is fired when this control has been navigated to.
            *
            * @param {any} parameter? A navigation parameter sent from the previous
            * {@link plat.ui.IBaseViewControl|IBaseViewControl}.
            *
            * @returns {void}
            */
            public navigatedTo(parameter?: any): void;
            /**
            * @name navigatingFrom
            * @memberof plat.ui.BaseViewControl
            * @kind function
            * @access public
            *
            * @description
            * This event is fired when this control is being navigated away from.
            *
            * @returns {void}
            */
            public navigatingFrom(): void;
        }
        /**
        * The Type for referencing the '$ViewControlFactory' injectable as a dependency.
        */
        function IBaseViewControlFactory(): IBaseViewControlFactory;
        /**
        * @name IBaseViewControlFactory
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Creates and manages {@link plat.ui.IBaseViewControl|IBaseViewControls}.
        */
        interface IBaseViewControlFactory {
            /**
            * @name detach
            * @memberof plat.ui.IBaseViewControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Detaches a {@link plat.ui.BaseViewControl|BaseViewControl}. Disposes its children, but does not dispose the
            * {@link plat.ui.BaseViewControl|BaseViewControl}. Useful for the Navigator when storing the
            * {@link plat.ui.BaseViewControl|BaseViewControl} in history.
            *
            * @param {plat.ui.BaseViewControl} control The control to be detached.
            *
            * @returns {void}
            */
            detach(control: IBaseViewControl): void;
            /**
            * @name dispose
            * @memberof plat.ui.IBaseViewControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Recursively disposes a {@link plat.ui.BaseViewControl|BaseViewControl} and its children.
            *
            * @param {plat.ui.BaseViewControl} control A control to dispose.
            *
            * @returns {void}
            */
            dispose(control: IBaseViewControl): void;
            /**
            * @name getInstance
            * @memberof plat.ui.IBaseViewControlFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a new instance of a {@link plat.ui.BaseViewControl|BaseViewControl}.
            *
            * @returns {plat.ui.BaseViewControl} A new {@link plat.ui.BaseViewControl|BaseViewControl} instance.
            */
            getInstance(): IBaseViewControl;
        }
        /**
        * @name IBaseViewControl
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {plat.ui.ITemplateControl}
        *
        * @description
        * Describes a control used in a {@link plat.ui.controls.IBaseport|IBaseport} for simulated page navigation. The
        * control has navigation events that are called when navigating to and from the control.
        */
        interface IBaseViewControl extends ITemplateControl {
            /**
            * @name hasOwnContext
            * @memberof plat.ui.IBaseViewControl
            * @kind property
            * @access public
            *
            * @type {boolean}
            *
            * @description
            * Specifies that this control will have its own context, and it should not inherit a context.
            */
            hasOwnContext?: boolean;
            /**
            * @name navigator
            * @memberof plat.ui.IBaseViewControl
            * @kind property
            * @access public
            *
            * @type {plat.navigation.IBaseNavigator}
            *
            * @description
            * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IBaseViewControl|IBaseViewControls}
            * in a {plat.ui.controls.IBaseport|IBaseport}.
            */
            navigator?: navigation.IBaseNavigator;
            /**
            * @name navigatedTo
            * @memberof plat.ui.IBaseViewControl
            * @kind function
            * @access public
            *
            * @description
            * This event is fired when this control has been navigated to.
            *
            * @param {any} parameter? A navigation parameter sent from the previous
            * {@link plat.ui.IBaseViewControl|IBaseViewControl}.
            *
            * @returns {void}
            */
            navigatedTo? (parameter?: any): void;
            /**
            * @name navigatingFrom
            * @memberof plat.ui.IBaseViewControl
            * @kind function
            * @access public
            *
            * @description
            * This event is fired when this control is being navigated away from.
            *
            * @returns {void}
            */
            navigatingFrom? (): void;
        }
        /**
        * @name ViewControl
        * @memberof plat.ui
        * @kind class
        *
        * @extends {plat.ui.BaseViewControl}
        * @implements {plat.ui.IViewControl}
        *
        * @description
        * A control used in a {@link plat.ui.controls.Viewport|Viewport} for simulated page navigation. The
        * control has navigation events that are called when navigating to and from the control.
        */
        class ViewControl extends BaseViewControl implements IViewControl {
            /**
            * @name navigator
            * @memberof plat.ui.ViewControl
            * @kind property
            * @access public
            *
            * @type {plat.navigation.INavigatorInstance}
            *
            * @description
            * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IViewControl|IViewControls}
            * in a {@link plat.ui.controls.Viewport|Viewport}.
            */
            public navigator: navigation.INavigatorInstance;
        }
        /**
        * @name IViewControl
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {plat.ui.IBaseViewControl}
        *
        * @description
        * Describes a control used in a {@link plat.ui.controls.Viewport|Viewport} for simulated page navigation. The
        * control has navigation events that are called when navigating to and from the control.
        */
        interface IViewControl extends IBaseViewControl {
            /**
            * @name navigator
            * @memberof plat.ui.IViewControl
            * @kind property
            * @access public
            *
            * @type {plat.navigation.INavigatorInstance}
            *
            * @description
            * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IViewControl|IViewControls}
            * in a {@link plat.ui.controls.Viewport|Viewport}.
            */
            navigator?: navigation.INavigatorInstance;
        }
        /**
        * @name WebViewControl
        * @memberof plat.ui
        * @kind class
        *
        * @extends {plat.ui.BaseViewControl}
        * @implements {plat.ui.IWebViewControl}
        *
        * @description
        * A control used in a {@link plat.ui.controls.Routeport|Routeport} for simulated page navigation. The
        * control has navigation events that are called when navigating to and from the control.
        * It also provides functionality for setting the title of a page.
        */
        class WebViewControl extends BaseViewControl implements IWebViewControl {
            /**
            * @name titleElement
            * @memberof plat.ui.WebViewControl
            * @kind property
            * @access public
            * @static
            *
            * @type {HTMLTitleElement}
            *
            * @description
            * The title of the HTML web page.
            */
            static titleElement: HTMLTitleElement;
            /**
            * @name descriptionElement
            * @memberof plat.ui.WebViewControl
            * @kind property
            * @access public
            * @static
            *
            * @type {HTMLMetaElement}
            *
            * @description
            * The description meta tag.
            */
            static descriptionElement: HTMLMetaElement;
            /**
            * @name setTitle
            * @memberof plat.ui.WebViewControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Sets the title programmatically and has it reflect in the browser title.
            *
            * @param {string} title The title to set.
            *
            * @returns {void}
            */
            static setTitle(title: string): void;
            /**
            * @name setDescription
            * @memberof plat.ui.WebViewControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Sets the meta description programmatically.
            *
            * @param {string} description The description to set.
            *
            * @returns {void}
            */
            static setDescription(description: string): void;
            /**
            * @name title
            * @memberof plat.ui.WebViewControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The title of the page, corresponds to the textContent of the title element in the HTML head.
            */
            public title: string;
            /**
            * @name description
            * @memberof plat.ui.WebViewControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The title of the page, corresponds to the content of the description meta element in the HTML head.
            */
            public description: string;
            /**
            * @name navigator
            * @memberof plat.ui.WebViewControl
            * @kind property
            * @access public
            *
            * @type {plat.navigation.IRoutingNavigator}
            *
            * @description
            * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IWebViewControl|IWebViewControls}
            * in a {@link plat.ui.controls.Routeport|Routeport}.
            */
            public navigator: navigation.IRoutingNavigator;
            /**
            * @name constructor
            * @memberof plat.ui.WebViewControl
            * @kind function
            * @access public
            *
            * @description
            * The constructor for a {@link plat.ui.WebViewControl|WebViewControl}. Sets the page title and description
            * upon the navigation event occurring.
            *
            * @returns {plat.ui.WebViewControl} A {@link plat.ui.WebViewControl|WebViewControl} instance.
            */
            constructor();
            /**
            * @name setTitle
            * @memberof plat.ui.WebViewControl
            * @kind function
            * @access public
            *
            * @description
            * Allows the {@link plat.ui.WebViewControl|WebViewControl} set its title programmatically and
            * have it reflect in the browser title.
            *
            * @param {string} title The title to set.
            *
            * @returns {void}
            */
            public setTitle(title: string): void;
            /**
            * @name setDescription
            * @memberof plat.ui.WebViewControl
            * @kind function
            * @access public
            *
            * @description
            * Allows the {@link plat.ui.WebViewControl|WebViewControl} set its description programmatically and
            * have it reflect in the browser meta description tag.
            *
            * @param {string} description The description to set.
            *
            * @returns {void}
            */
            public setDescription(description: string): void;
        }
        /**
        * @name IWebViewControl
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {plat.ui.IBaseViewControl}
        *
        * @description
        * Defines an object intended to be used inside of a {@link plat.ui.controls.Routeport|Routeport}
        * to simulate page navigation.
        */
        interface IWebViewControl extends IBaseViewControl {
            /**
            * @name title
            * @memberof plat.ui.IWebViewControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The title of the page, corresponds to the textContent of the title element in the HTML head.
            */
            title?: string;
            /**
            * @name description
            * @memberof plat.ui.IWebViewControl
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The title of the page, corresponds to the content of the description meta element in the HTML head.
            */
            description?: string;
            /**
            * @name navigator
            * @memberof plat.ui.IWebViewControl
            * @kind property
            * @access public
            *
            * @type {plat.navigation.IRoutingNavigator}
            *
            * @description
            * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IWebViewControl|IWebViewControls}
            * in a {@link plat.ui.controls.Routeport|Routeport}.
            */
            navigator?: navigation.IRoutingNavigator;
            /**
            * @name setTitle
            * @memberof plat.ui.IWebViewControl
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Allows the {@link plat.ui.WebViewControl|WebViewControl} set its title programmatically and
            * have it reflect in the browser title.
            *
            * @param {string} title The title to set.
            *
            * @returns {void}
            */
            setTitle? (title: string): void;
            /**
            * @name setDescription
            * @memberof plat.ui.IWebViewControl
            * @kind function
            * @access public
            *
            * @description
            * Allows the {@link plat.ui.WebViewControl|WebViewControl} set its description programmatically and
            * have it reflect in the browser meta description tag.
            *
            * @param {string} description The description to set.
            *
            * @returns {void}
            */
            setDescription(description: string): void;
        }
        /**
        * @name Dom
        * @memberof plat.ui
        * @kind class
        *
        * @implements {plat.ui.IDom}
        *
        * @description
        * An extensible class dealing with the creation, deletion, and modification
        * of DOM.
        */
        class Dom implements IDom {
            /**
            * @name $DomEvents
            * @memberof plat.ui.Dom
            * @kind property
            * @access public
            *
            * @type {plat.ui.IDomEvents}
            *
            * @description
            * Reference to the {@link plat.ui.IDomEvents|IDomEvents} injectable.
            */
            public $DomEvents: IDomEvents;
            /**
            * @name addEventListener
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Adds an event listener of the specified type to the specified element.
            *
            * @param {Node} element The element to add the event listener to.
            * @param {string} type The type of event to listen to.
            * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
            * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
            * of event propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the added event listener.
            */
            public addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Adds an event listener of the specified type to the specified element.
            *
            * @param {Window} element The window object.
            * @param {string} type The type of event to listen to.
            * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
            * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
            * of event propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the added event listener.
            */
            public addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Adds an event listener of the specified type to the specified element.
            *
            * @param {Node} element The element to add the event listener to.
            * @param {string} type The type of event to listen to.
            * @param {EventListener} listener The listener to fire when the event occurs.
            * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
            * of event propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the added event listener.
            */
            public addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Adds an event listener of the specified type to the specified element.
            *
            * @param {Window} element The window object.
            * @param {string} type The type of event to listen to.
            * @param {EventListener} listener The listener to fire when the event occurs.
            * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
            * of event propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the added event listener.
            */
            public addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name appendChildren
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Takes a Node Array and creates a DocumentFragment and adds the nodes to the Fragment.
            *
            * @param {Array<Node>} nodeList A Node Array to be appended to the DocumentFragment
            *
            * @returns {DocumentFragment} A DocumentFragment.
            */
            public appendChildren(nodeList: Node[]): DocumentFragment;
            /**
            * @name appendChildren
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Takes a NodeList and creates a DocumentFragment and adds the NodeList to the Fragment.
            *
            * @param {NodeList} nodeList A NodeList to be appended to the DocumentFragment
            *
            * @returns {DocumentFragment} A DocumentFragment.
            */
            public appendChildren(nodeList: NodeList): DocumentFragment;
            /**
            * @name appendChildren
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Takes a Node Array and either adds it to the passed in Node,
            * or creates a DocumentFragment and adds the nodes to the
            * Fragment.
            *
            * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
            * @param {Node} root? An optional Node to append the nodeList.
            *
            * @returns {Node} The root Node or a DocumentFragment.
            */
            public appendChildren(nodeList: Node[], root?: Node): Node;
            /**
            * @name appendChildren
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Takes a NodeList and either adds it to the passed in Node,
            * or creates a DocumentFragment and adds the NodeList to the
            * Fragment.
            *
            * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
            * @param {Node} root? An optional Node to append the nodeList.
            *
            * @returns {Node} The root Node or a DocumentFragment.
            */
            public appendChildren(nodeList: NodeList, root?: Node): Node;
            /**
            * @name clearNode
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Clears a DOM Node by removing all of its childNodes.
            *
            * @param {Node} node The DOM Node to clear.
            *
            * @returns {void}
            */
            public clearNode(node: Node): void;
            /**
            * @name clearNodeBlock
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Removes all the Nodes in the Array from the parent Node.
            *
            * @param {Array<Node>} nodeList The Node Array to remove from the parent Node.
            * @param {Node} parent? The parent Node used to remove the nodeList.
            *
            * @returns {void}
            */
            public clearNodeBlock(nodeList: Node[], parent?: Node): void;
            /**
            * @name clearNodeBlock
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Removes all the Nodes in the NodeList from the parent Node.
            *
            * @param {NodeList} nodeList The NodeList to remove from the parent Node.
            * @param {Node} parent? The parent Node used to remove the nodeList.
            *
            * @returns {void}
            */
            public clearNodeBlock(nodeList: NodeList, parent?: Node): void;
            /**
            * @name setInnerHtml
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Sets the innerHTML of a Node. Can take in a Node rather than an Element
            * because it does not use innerHTML on the passed-in Node (it appends its
            * childNodes).
            *
            * @param {Node} node The Node to set innerHTML.
            * @param {string} html HTML string to be put inside the node.
            *
            * @returns {Node} The same node passed in, with innerHTML set.
            */
            public setInnerHtml(node: Node, html: string): Node;
            /**
            * @name insertBefore
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Inserts a list of Nodes before the designated end Node.
            *
            * @param {Node} parent The parent node into which to insert nodes.
            * @param {Array<Node>} nodes The Node Array to insert into the parent.
            * @param {Node} endNode? An optional endNode to use to insert nodes.
            *
            * @returns {Array<Node>} An Array copy of the nodes.
            */
            public insertBefore(parent: Node, nodes: Node[], endNode?: Node): Node[];
            /**
            * @name insertBefore
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Inserts a list of Nodes before the designated end Node.
            *
            * @param {Node} parent The parent node into which to insert nodes.
            * @param {NodeList} nodes The NodeList to insert into the parent.
            * @param {Node} endNode? An optional endNode to use to insert nodes.
            *
            * @returns {Array<Node>} An Array copy of the nodes.
            */
            public insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Node[];
            /**
            * @name insertBefore
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Inserts a DocumentFragment before the designated end Node.
            *
            * @param {Node} parent The parent node into which to insert nodes.
            * @param {DocumentFragment} fragment The DocumentFragment to insert into the parent.
            * @param {Node} endNode? An optional endNode to use to insert nodes.
            *
            * @returns {Array<Node>} An Array copy of the fragment's childNodes.
            */
            public insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Node[];
            /**
            * @name replace
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Takes the child nodes of the given node and places them above the node
            * in the DOM. Then removes the given node.
            *
            * @param {Node} node The Node to replace.
            *
            * @returns {Array<Node>} A Node Array that represents the childNodes of the
            * given node.
            */
            public replace(node: Node): Node[];
            /**
            * @name replaceWith
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Takes the childNodes of the given element and appends them to the newElement.
            * Then replaces the element in its parent's tree with the newElement.
            *
            * @param {Node} node The Node to remove from its parent.
            * @param {HTMLElement} newElement The HTMLElement to populate with childNodes and add to the
            * element's parent.
            *
            * @returns {HTMLElement} The replaced element (newElement).
            */
            public replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
            /**
            * @name replaceWith
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Takes the childNodes of the given element and appends them to the newElement.
            * Then replaces the element in its parent's tree with the newElement.
            *
            * @param {Node} node The Node to remove from its parent.
            * @param {Element} newElement The Element to populate with childNodes and add to the
            * element's parent.
            *
            * @returns {Element} The replaced element (newElement).
            */
            public replaceWith(node: Node, newElement: Element): Element;
            /**
            * @name replaceWith
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Takes the childNodes of the given element and appends them to the newElement.
            * Then replaces the element in its parent's tree with the newElement.
            *
            * @param {Node} node The Node to remove from its parent.
            * @param {Node} newElement The Node to populate with childNodes and add to the
            * element's parent.
            *
            * @returns {Node} The replaced element (newElement).
            */
            public replaceWith(node: Node, newNode: Node): Node;
            /**
            * @name serializeHtml
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Takes in a string representing innerHTML and returns a DocumentFragment
            * containing the serialized DOM.
            *
            * @param {string} html The DOM string.
            *
            * @returns {DocumentFragment} The serialized DOM.
            */
            public serializeHtml(html: string): DocumentFragment;
            /**
            * @name removeBetween
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Takes in a startNode and endNode, each having the same parentNode.
            * Removes every node in between the startNode.  If endNode is not specified,
            * DOM will be removed until the end of the parentNode's children.
            *
            * @param {Node} startNode The starting node, which will not be removed.
            * @param {Node} endNode The ending node, which will not be removed.
            *
            * @returns {void}
            */
            public removeBetween(startNode: Node, endNode?: Node): void;
            /**
            * @name removeAll
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Takes in a startNode and endNode, each having the same parentNode.
            * Removes every node in between the startNode and endNode as well as
            * the startNode and the endNode.  If endNode is not specified, DOM
            * will be removed until the end of the parentNode's children.
            *
            * @param {Node} startNode The first node to remove.
            * @param {Node} endNode The last node to remove.
            *
            * @returns {void}
            */
            public removeAll(startNode: Node, endNode?: Node): void;
            /**
            * @name addClass
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Adds a class to the specified element.
            *
            * @param {Element} element The element to which the class name is being added.
            * @param {string} className The class name to add to the element.
            *
            * @returns {void}
            */
            public addClass(element: Element, className: string): void;
            /**
            * @name removeClass
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Removes a class from the specified element.
            *
            * @param {Element} element The element from which the class name is being removed.
            * @param {string} className The class name to remove from the element.
            *
            * @returns {void}
            */
            public removeClass(element: Element, className: string): void;
            /**
            * @name toggleClass
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Toggles a class from the specified element.
            *
            * @param {Element} element The element on which the class name is being toggled.
            * @param {string} className The class name to toggle on the element.
            *
            * @returns {void}
            */
            public toggleClass(element: Element, className: string): void;
            /**
            * @name hasClass
            * @memberof plat.ui.Dom
            * @kind function
            * @access public
            *
            * @description
            * Returns whether or not an element has a particular class assigned to it.
            *
            * @param {Element} element The element on which the class name is being checked.
            * @param {string} className The class name to check on the element.
            *
            * @returns {void}
            */
            public hasClass(element: Element, className: string): boolean;
        }
        /**
        * The Type for referencing the '$Dom' injectable as a dependency.
        */
        function IDom(): IDom;
        /**
        * @name IDom
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * An object that deals with the creation, deletion, and modification
        * of DOM.
        */
        interface IDom {
            /**
            * @name addEventListener
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Adds an event listener of the specified type to the specified element.
            *
            * @param {Node} element The element to add the event listener to.
            * @param {string} type The type of event to listen to.
            * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
            * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
            * of event propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the added event listener.
            */
            addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Adds an event listener of the specified type to the specified element.
            *
            * @param {Window} element The window object.
            * @param {string} type The type of event to listen to.
            * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
            * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
            * of event propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the added event listener.
            */
            addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Adds an event listener of the specified type to the specified element.
            *
            * @param {Node} element The element to add the event listener to.
            * @param {string} type The type of event to listen to.
            * @param {EventListener} listener The listener to fire when the event occurs.
            * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
            * of event propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the added event listener.
            */
            addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Adds an event listener of the specified type to the specified element.
            *
            * @param {Window} element The window object.
            * @param {string} type The type of event to listen to.
            * @param {EventListener} listener The listener to fire when the event occurs.
            * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
            * of event propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the added event listener.
            */
            addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name appendChildren
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Takes a Node Array and creates a DocumentFragment and adds the nodes to the Fragment.
            *
            * @param {Array<Node>} nodeList A Node Array to be appended to the DocumentFragment
            *
            * @returns {DocumentFragment} A DocumentFragment.
            */
            appendChildren(nodeList: Node[]): DocumentFragment;
            /**
            * @name appendChildren
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Takes a NodeList and creates a DocumentFragment and adds the NodeList to the Fragment.
            *
            * @param {NodeList} nodeList A NodeList to be appended to the DocumentFragment
            *
            * @returns {DocumentFragment} A DocumentFragment.
            */
            appendChildren(nodeList: NodeList): DocumentFragment;
            /**
            * @name appendChildren
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Takes a Node Array and either adds it to the passed in Node,
            * or creates a DocumentFragment and adds the nodes to the
            * Fragment.
            *
            * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
            * @param {Node} root? An optional Node to append the nodeList.
            *
            * @returns {Node} The root Node or a DocumentFragment.
            */
            appendChildren(nodeList: Node[], root?: Node): Node;
            /**
            * @name appendChildren
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Takes a NodeList and either adds it to the passed in Node,
            * or creates a DocumentFragment and adds the NodeList to the
            * Fragment.
            *
            * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
            * @param {Node} root? An optional Node to append the nodeList.
            *
            * @returns {Node} The root Node or a DocumentFragment.
            */
            appendChildren(nodeList: NodeList, root?: Node): Node;
            /**
            * @name clearNode
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Clears a DOM Node by removing all of its childNodes.
            *
            * @param {Node} node The DOM Node to clear.
            *
            * @returns {void}
            */
            clearNode(node: Node): void;
            /**
            * @name clearNodeBlock
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Removes all the Nodes in the Array from the parent Node.
            *
            * @param {Array<Node>} nodeList The Node Array to remove from the parent Node.
            * @param {Node} parent? The parent Node used to remove the nodeList.
            *
            * @returns {void}
            */
            clearNodeBlock(nodeList: Node[], parent?: Node): void;
            /**
            * @name clearNodeBlock
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Removes all the Nodes in the NodeList from the parent Node.
            *
            * @param {NodeList} nodeList The NodeList to remove from the parent Node.
            * @param {Node} parent? The parent Node used to remove the nodeList.
            *
            * @returns {void}
            */
            clearNodeBlock(nodeList: NodeList, parent?: Node): void;
            /**
            * @name setInnerHtml
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Sets the innerHTML of a Node. Can take in a Node rather than an Element
            * because it does not use innerHTML on the passed-in Node (it appends its
            * childNodes).
            *
            * @param {Node} node The Node to set innerHTML.
            * @param {string} html HTML string to be put inside the node.
            *
            * @returns {Node} The same node passed in, with innerHTML set.
            */
            setInnerHtml(node: Node, html: string): Node;
            /**
            * @name insertBefore
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Inserts a list of Nodes before the designated end Node.
            *
            * @param {Node} parent The parent node into which to insert nodes.
            * @param {Array<Node>} nodes The Node Array to insert into the parent.
            * @param {Node} endNode? An optional endNode to use to insert nodes.
            *
            * @returns {Array<Node>} An Array copy of the nodes.
            */
            insertBefore(parent: Node, nodes: Node[], endNode?: Node): Node[];
            /**
            * @name insertBefore
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Inserts a list of Nodes before the designated end Node.
            *
            * @param {Node} parent The parent node into which to insert nodes.
            * @param {NodeList} nodes The NodeList to insert into the parent.
            * @param {Node} endNode? An optional endNode to use to insert nodes.
            *
            * @returns {Array<Node>} An Array copy of the nodes.
            */
            insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Node[];
            /**
            * @name insertBefore
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Inserts a DocumentFragment before the designated end Node.
            *
            * @param {Node} parent The parent node into which to insert nodes.
            * @param {DocumentFragment} fragment The DocumentFragment to insert into the parent.
            * @param {Node} endNode? An optional endNode to use to insert nodes.
            *
            * @returns {Array<Node>} An Array copy of the fragment's childNodes.
            */
            insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Node[];
            /**
            * @name replace
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Takes the child nodes of the given node and places them above the node
            * in the DOM. Then removes the given node.
            *
            * @param {Node} node The Node to replace.
            *
            * @returns {Array<Node>} A Node Array that represents the childNodes of the
            * given node.
            */
            replace(node: Node): Node[];
            /**
            * @name replaceWith
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Takes the childNodes of the given element and appends them to the newElement.
            * Then replaces the element in its parent's tree with the newElement.
            *
            * @param {Node} node The Node to remove from its parent.
            * @param {HTMLElement} newElement The HTMLElement to populate with childNodes and add to the
            * element's parent.
            *
            * @returns {HTMLElement} The replaced element (newElement).
            */
            replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
            /**
            * @name replaceWith
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Takes the childNodes of the given element and appends them to the newElement.
            * Then replaces the element in its parent's tree with the newElement.
            *
            * @param {Node} node The Node to remove from its parent.
            * @param {Element} newElement The Element to populate with childNodes and add to the
            * element's parent.
            *
            * @returns {Element} The replaced element (newElement).
            */
            replaceWith(node: Node, newElement: Element): Element;
            /**
            * @name replaceWith
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Takes the childNodes of the given element and appends them to the newElement.
            * Then replaces the element in its parent's tree with the newElement.
            *
            * @param {Node} node The Node to remove from its parent.
            * @param {Node} newElement The Node to populate with childNodes and add to the
            * element's parent.
            *
            * @returns {Node} The replaced element (newElement).
            */
            replaceWith(node: Node, newNode: Node): Node;
            /**
            * @name serializeHtml
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Takes in a string representing innerHTML and returns a DocumentFragment
            * containing the serialized DOM.
            *
            * @param {string} html The DOM string.
            *
            * @returns {DocumentFragment} The serialized DOM.
            */
            serializeHtml(html?: string): DocumentFragment;
            /**
            * @name removeBetween
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Takes in a startNode and endNode, each having the same parentNode.
            * Removes every node in between the startNode.  If endNode is not specified,
            * DOM will be removed until the end of the parentNode's children.
            *
            * @param {Node} startNode The starting node, which will not be removed.
            * @param {Node} endNode The ending node, which will not be removed.
            *
            * @returns {void}
            */
            removeBetween(startNode: Node, endNode?: Node): void;
            /**
            * @name removeAll
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Takes in a startNode and endNode, each having the same parentNode.
            * Removes every node in between the startNode and endNode as well as
            * the startNode and the endNode.  If endNode is not specified, DOM
            * will be removed until the end of the parentNode's children.
            *
            * @param {Node} startNode The first node to remove.
            * @param {Node} endNode The last node to remove.
            *
            * @returns {void}
            */
            removeAll(startNode: Node, endNode?: Node): void;
            /**
            * @name addClass
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Adds a class to the specified element.
            *
            * @param {Element} element The element to which the class name is being added.
            * @param {string} className The class name to add to the element.
            *
            * @returns {void}
            */
            addClass(element: Element, className: string): void;
            /**
            * @name removeClass
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Removes a class from the specified element.
            *
            * @param {Element} element The element from which the class name is being removed.
            * @param {string} className The class name to remove from the element.
            *
            * @returns {void}
            */
            removeClass(element: Element, className: string): void;
            /**
            * @name toggleClass
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Toggles a class from the specified element.
            *
            * @param {Element} element The element on which the class name is being toggled.
            * @param {string} className The class name to toggle on the element.
            *
            * @returns {void}
            */
            toggleClass(element: Element, className: string): void;
            /**
            * @name hasClass
            * @memberof plat.ui.IDom
            * @kind function
            * @access public
            *
            * @description
            * Returns whether or not an element has a particular class assigned to it.
            *
            * @param {Element} element The element on which the class name is being checked.
            * @param {string} className The class name to check on the element.
            *
            * @returns {void}
            */
            hasClass(element: Element, className: string): void;
        }
        /**
        * @name ICustomElementProperty
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {plat.IObject<string>}
        *
        * @description
        * An object describing custom element properties added to elements for hashing purposes.
        */
        interface ICustomElementProperty extends IObject<string> {
            /**
            * @name domEvent
            * @memberof plat.ui.ICustomElementProperty
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A unique id given to the element if it's registered for a custom DOM event.
            */
            domEvent?: string;
            /**
            * @name animation
            * @memberof plat.ui.ICustomElementProperty
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * A unique id given to the element if it's registered for an animation.
            */
            animation?: string;
        }
        /**
        * @name ICustomElement
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {HTMLElement}
        *
        * @description
        * An interface for describing an Element with an ICustomElementProperty attached. Primarily
        * used for element interaction with {@link plat.ui.DomEvents|DomEvents} and the
        * {@link plat.ui.Animator|Animator}.
        */
        interface ICustomElement extends HTMLElement {
            /**
            * @name __plat
            * @memberof plat.ui.ICustomElementProperty
            * @kind property
            * @access public
            *
            * @type {plat.ui.ICustomElementProperty}
            *
            * @description
            * The PlatypusTS custom element property.
            */
            __plat: ICustomElementProperty;
        }
        /**
        * @name BindableTemplates
        * @memberof plat.ui
        * @kind class
        *
        * @implements {plat.ui.IBindableTemplates}
        *
        * @description
        * The class which provides a way for {@link plat.ui.ITemplateControl|ITemplateControls} to bind a template
        * to a context. Useful for narrowing context without needing another
        * {@link plat.ui.ITemplateControl|ITemplateControl}. In addition, this object provides a performance increase because
        * it will only compile the template once. This object is also useful when a
        * {@link plat.ui.ITemplateControl|ITemplateControls} expects multiple configuration templates in its innerHTML. It can
        * separate those templates and reuse them accordingly.
        */
        class BindableTemplates implements IBindableTemplates {
            /**
            * @name create
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
            * passed in, it will use the properties on the original BindableTemplates.
            *
            * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl}
            * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data
            * context inheritance for templates.
            * @param {plat.ui.IBindableTemplates} original? An optional {@link plat.ui.IBindableTemplates|IBindableTemplates}
            * object to copy.
            *
            * @returns {plat.ui.IBindableTemplates} The newly instantiated {@link plat.ui.IBindableTemplates|IBindableTemplates} object.
            */
            static create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;
            /**
            * @name dispose
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Clears the memory being held by control's bindableTemplates.
            *
            * @static
            * @param {plat.ui.ITemplateControl} control The control whose bindableTemplates will be disposed.
            *
            * @returns {void}
            */
            static dispose(control: ITemplateControl): void;
            /**
            * @name $ResourcesFactory
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access public
            *
            * @type {plat.ui.IResourcesFactory}
            *
            * @description
            * Reference to the {@link plat.ui.IResourcesFactory|IResourcesFactory} injectable.
            */
            public $ResourcesFactory: IResourcesFactory;
            /**
            * @name $TemplateControlFactory
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access public
            *
            * @type {plat.ui.ITemplateControlFactory}
            *
            * @description
            * Reference to the {@link plat.ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
            */
            public $TemplateControlFactory: ITemplateControlFactory;
            /**
            * @name $Promise
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access public
            *
            * @type {plat.async.IPromise}
            *
            * @description
            * Reference to the {@link plat.async.IPromise|IPromise} injectable.
            */
            public $Promise: async.IPromise;
            /**
            * @name $ManagerCache
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access public
            *
            * @type {plat.storage.ICache<processing.IElementManager>}
            *
            * @description
            * Reference to a cache injectable that stores {@link plat.processing.IElementManager|IElementManagers}.
            */
            public $ManagerCache: storage.ICache<processing.IElementManager>;
            /**
            * @name $Document
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access public
            *
            * @type {Document}
            *
            * @description
            * Reference to the Document injectable.
            */
            public $Document: Document;
            /**
            * @name $ElementManagerFactory
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access public
            *
            * @type {plat.processing.IElementManagerFactory}
            *
            * @description
            * Reference to the {@link plat.processing.IElementManagerFactory|IElementManagerFactory} injectable.
            */
            public $ElementManagerFactory: processing.IElementManagerFactory;
            /**
            * @name control
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access public
            *
            * @type {plat.ui.ITemplateControl}
            *
            * @description
            * The control containing this {@link plat.ui.BindableTemplates|BindableTemplates} object.
            */
            public control: ITemplateControl;
            /**
            * @name templates
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access public
            *
            * @type {plat.IObject<plat.async.IThenable<DocumentFragment>>}
            *
            * @description
            * Stores promises that resolve to all the compiled templates for this object, ready to be bound to a data context.
            * All created templates are DocumentFragments, allowing an {@link plat.ui.ITemplateControl|ITemplateControl} to
            * easily insert the template into the DOM (without iterating over childNodes).
            */
            public templates: IObject<async.IThenable<DocumentFragment>>;
            /**
            * @name _cache
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access protected
            *
            * @type {plat.IObject<plat.processing.IElementManager>}
            *
            * @description
            * A keyed cache of {@link plat.processing.IElementManager|IElementManagers} that represent the roots of compiled templates
            * created by this instance.
            */
            public _cache: IObject<processing.IElementManager>;
            /**
            * @name __compiledControls
            * @memberof plat.ui.BindableTemplates
            * @kind property
            * @access private
            *
            * @type {Array<plat.ui.ITemplateControl>}
            *
            * @description
            * A collection of all the controls created while compiling an added template. Useful during disposal.
            */
            private __compiledControls;
            /**
            * @name bind
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Method for linking a new template to a data context and returning a clone of the template,
            * with all new {@link plat.IControl|IControls} created if the template contains controls. It is not necessary
            * to specify a data context.
            *
            * @param {string} key The key used to retrieve the template.
            * @param {string} relativeIdentifier? The identifier string relative to this control's context
            * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
            * most efficient way of specifying context, else the framework has to search for the
            * object.
            * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
            * controls created in the template.
            *
            * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound and
            * ready to return.
            */
            public bind(key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
            * @name bind
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Method for linking a new template to a data context and returning a clone of the template,
            * with all new {@link plat.IControl|IControls} created if the template contains controls. It is not necessary
            * to specify a data context.
            *
            * @param {string} key The key used to retrieve the template.
            * @param {number} relativeIdentifier? The identifier number relative to this control's context
            * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
            * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
            * controls created in the template.
            *
            * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound and
            * ready to return.
            */
            public bind(key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
            * @name add
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {Element} template An Element representing the DOM template.
            *
            * @returns {void}
            */
            public add(key: string, template: Element): void;
            /**
            * @name add
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {Array<Node>} template A node Array representing the DOM template.
            *
            * @returns {void}
            */
            public add(key: string, template: Node[]): void;
            /**
            * @name add
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {NodeList} template A NodeList representing the DOM template.
            *
            * @returns {void}
            */
            public add(key: string, template: NodeList): void;
            /**
            * @name add
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
            *
            * @returns {void}
            */
            public add(key: string, template: DocumentFragment): void;
            /**
            * @name add
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            * @variation 4
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {Node} template A Node representing the DOM template.
            *
            * @returns {void}
            */
            public add(key: string, template: Node): void;
            /**
            * @name dispose
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access public
            *
            * @description
            * Clears the memory being held by this instance.
            *
            * @returns {void}
            */
            public dispose(): void;
            /**
            * @name _bindTemplate
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access protected
            *
            * @description
            * Creates the template's bound control and {@link plat.processing.INodeMap|INodeMap} and initiates
            * the binding of the {@link plat.processing.INodeMap|INodeMap} for a cloned template.
            *
            * @param {string} key The template key.
            * @param {DocumentFragment} template The cached HTML template.
            * @param {string} contextId The relative path from the context used to bind this template.
            * @param {plat.IObject<plat.ui.IResource>} A set of resources to add to the control used to bind this
            * template.
            *
            * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound.
            */
            public _bindTemplate(key: string, template: DocumentFragment, contextId: string, resources: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
            * @name _bindNodeMap
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access protected
            *
            * @description
            * Clones the compiled {@link plat.processing.IElementManager|IElementManager} using the newly created
            * {@link plat.processing.INodeMap|INodeMap} and binds and loads this control's
            * {@link plat.processing.IElementManager|IElementManager}.
            *
            * @param {plat.processing.INodeMap} nodeMap The node map to bind.
            * @param {string} key The template key used to grab the {@link plat.processing.IElementManager|IElementManager}.
            *
            * @returns {plat.async.IThenable<void>} A promise that resolves when the control's
            * {@link plat.processing.IElementManager|IElementManager} is bound and loaded.
            */
            public _bindNodeMap(nodeMap: processing.INodeMap, key: string): async.IThenable<void>;
            /**
            * @name _compile
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access protected
            *
            * @description
            * Creates the template's compiled, bound control and {@link plat.processing.INodeMap|INodeMap} and initiates
            * the compilation of the template.
            *
            * @param {string} key The template key.
            * @param {DocumentFragment} template The HTML template being bound.
            *
            * @returns {void}
            */
            public _compile(key: string, template: DocumentFragment): void;
            /**
            * @name _compileNodeMap
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access protected
            *
            * @description
            * Instantiates a new {@link plat.processing.IElementManager|IElementManager} for the root of this
            * template and resolves any asynchronous url templates within the template being compiled.
            *
            * @param {plat.ui.ITemplateControl} control The newly created control used to bind the template.
            * @param {plat.processing.INodeMap} nodeMap The newly created node map to bind.
            * @param {string} key The template key.
            *
            * @returns {void}
            */
            public _compileNodeMap(control: ITemplateControl, nodeMap: processing.INodeMap, key: string): void;
            /**
            * @name _createNodeMap
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access protected
            *
            * @description
            * Creates an {@link plat.processing.INodeMap|INodeMap} for either a template being compiled or a
            * template being bound.
            *
            * @param {plat.ui.ITemplateControl} uiControl The newly created control used to bind the template.
            * @param {Node} template The template being compiled.
            * @param {string} childContext? A potential child context string identifier.
            *
            * @returns {plat.processing.INodeMap} The newly created {@link plat.processing.INodeMap|INodeMap}.
            */
            public _createNodeMap(uiControl: ITemplateControl, template: Node, childContext?: string): processing.INodeMap;
            /**
            * @name _createBoundControl
            * @memberof plat.ui.BindableTemplates
            * @kind function
            * @access protected
            *
            * @description
            * Creates a {@link plat.ui.ITemplateControl|ITemplateControl} used for binding either a template being compiled
            * or a template being bound.
            *
            * @param {string} key The template key.
            * @param {DocumentFragment} template The template being compiled or being bound.
            * @param {string} relativeIdentifier? A potential context string identifier identifying the
            * object's position off the context.
            * @param {plat.IObject<plat.ui.IResource>} resources? A set of resources to add to the control used to
            * compile/bind this template.
            *
            * @returns {plat.ui.ITemplateControl} The newly created {@link plat.ui.ITemplateControl|ITemplateControl}.
            */
            public _createBoundControl(key: string, template: DocumentFragment, relativeIdentifier?: string, resources?: IObject<IResource>): ITemplateControl;
        }
        /**
        * The Type for referencing the '$BindableTemplatesFactory' injectable as a dependency.
        */
        function IBindableTemplatesFactory(): IBindableTemplatesFactory;
        /**
        * @name IBindableTemplatesFactory
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Creates and manages {@link plat.ui.IBindableTemplates|IBindableTemplates}.
        */
        interface IBindableTemplatesFactory {
            /**
            * @name create
            * @memberof plat.ui.IBindableTemplatesFactory
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
            * passed in, it will use the properties on the original BindableTemplates.
            *
            * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl}
            * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data
            * context inheritance for templates.
            * @param {plat.ui.IBindableTemplates} original? An optional {@link plat.ui.IBindableTemplates|IBindableTemplates}
            * object to copy.
            *
            * @returns {plat.ui.IBindableTemplates} The newly instantiated {@link plat.ui.IBindableTemplates|IBindableTemplates} object.
            */
            create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;
            /**
            * @name create
            * @memberof plat.ui.IBindableTemplatesFactory
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
            * passed in, it will use the properties on the original BindableTemplates.
            *
            * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl}
            * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data
            * context inheritance for templates.
            * @param {plat.ui.BindableTemplates} original? An optional {@link plat.ui.BindableTemplates|BindableTemplates}
            * object to copy.
            *
            * @returns {plat.ui.IBindableTemplates} The newly instantiated {@link plat.ui.IBindableTemplates|IBindableTemplates} object.
            */
            create(control: ITemplateControl, original?: BindableTemplates): IBindableTemplates;
            /**
            * @name dispose
            * @memberof plat.ui.IBindableTemplatesFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Clears the memory being held by control's bindableTemplates.
            *
            * @static
            * @param {plat.ui.ITemplateControl} control The control whose bindableTemplates will be disposed.
            *
            * @returns {void}
            */
            dispose(control: ITemplateControl): void;
        }
        /**
        * @name IBindableTemplates
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * An object that provides a way for {@link plat.ui.ITemplateControl|ITemplateControls} to bind a template
        * to a context. Useful for narrowing context without needing another
        * {@link plat.ui.ITemplateControl|ITemplateControl}. In addition, this object provides a performance increase because
        * it will only compile the template once. This object is also useful when a
        * {@link plat.ui.ITemplateControl|ITemplateControls} expects multiple configuration templates in its innerHTML. It can
        * separate those templates and reuse them accordingly.
        */
        interface IBindableTemplates {
            /**
            * @name control
            * @memberof plat.ui.IBindableTemplates
            * @kind property
            * @access public
            *
            * @type {plat.ui.ITemplateControl}
            *
            * @description
            * The control containing this {@link plat.ui.BindableTemplates|BindableTemplates} object.
            */
            control: ITemplateControl;
            /**
            * @name templates
            * @memberof plat.ui.IBindableTemplates
            * @kind property
            * @access public
            *
            * @type {plat.IObject<plat.async.IThenable<DocumentFragment>>}
            *
            * @description
            * Stores promises that resolve to all the compiled templates for this object, ready to be bound to a data context.
            * All created templates are DocumentFragments, allowing an {@link plat.ui.ITemplateControl|ITemplateControl} to
            * easily insert the template into the DOM (without iterating over childNodes).
            */
            templates: IObject<async.IThenable<DocumentFragment>>;
            /**
            * @name bind
            * @memberof plat.ui.IBindableTemplates
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Method for linking a new template to a data context and returning a clone of the template,
            * with all new {@link plat.IControl|IControls} created if the template contains controls. It is not necessary
            * to specify a data context.
            *
            * @param {string} key The key used to retrieve the template.
            * @param {string} relativeIdentifier? The identifier string relative to this control's context
            * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
            * most efficient way of specifying context, else the framework has to search for the
            * object.
            * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
            * controls created in the template.
            *
            * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound and
            * ready to return.
            */
            bind(key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
            * @name bind
            * @memberof plat.ui.IBindableTemplates
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Method for linking a new template to a data context and returning a clone of the template,
            * with all new {@link plat.IControl|IControls} created if the template contains controls. It is not necessary
            * to specify a data context.
            *
            * @param {string} key The key used to retrieve the template.
            * @param {number} relativeIdentifier? The identifier number relative to this control's context
            * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
            * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
            * controls created in the template.
            *
            * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound and
            * ready to return.
            */
            bind(key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
            * @name add
            * @memberof plat.ui.IBindableTemplates
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {Element} template An Element representing the DOM template.
            *
            * @returns {void}
            */
            add(key: string, template: Element): void;
            /**
            * @name add
            * @memberof plat.ui.IBindableTemplates
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {Array<Node>} template A node Array representing the DOM template.
            *
            * @returns {void}
            */
            add(key: string, template: Node[]): void;
            /**
            * @name add
            * @memberof plat.ui.IBindableTemplates
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {NodeList} template A NodeList representing the DOM template.
            *
            * @returns {void}
            */
            add(key: string, template: NodeList): void;
            /**
            * @name add
            * @memberof plat.ui.IBindableTemplates
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
            *
            * @returns {void}
            */
            add(key: string, template: DocumentFragment): void;
            /**
            * @name add
            * @memberof plat.ui.IBindableTemplates
            * @kind function
            * @access public
            * @variation 4
            *
            * @description
            * Adds a template to this object. The template will be stored with the key,
            * and it will be transformed into a DocumentFragment.
            *
            * @param {string} key The key used to store the template.
            * @param {Node} template A Node representing the DOM template.
            *
            * @returns {void}
            */
            add(key: string, template: Node): void;
            /**
            * @name dispose
            * @memberof plat.ui.IBindableTemplates
            * @kind function
            * @access public
            *
            * @description
            * Clears the memory being held by this instance.
            *
            * @returns {void}
            */
            dispose(): void;
        }
        /**
        * @name Attributes
        * @memberof plat.ui
        * @kind class
        *
        * @implements {plat.ui.IAttributesInstance}
        *
        * @description
        * The class that stores the information about an Element's attributes (NamedNodeMap).
        * Methods are implemented to allow you to observe for changes on an attribute.
        *
        * @remarks
        * Attributes for this object are converted from dash-notation to camelCase notation.
        */
        class Attributes implements IAttributesInstance {
            /**
            * @name __listeners
            * @memberof plat.ui.Attributes
            * @kind property
            * @access private
            *
            * @type {plat.IObject<Array<plat.IPropertyChangedListener>>}
            *
            * @description
            * The set of functions added externally that listens
            * for attribute changes.
            */
            private __listeners;
            /**
            * @name __control
            * @memberof plat.ui.Attributes
            * @kind property
            * @access private
            *
            * @type {plat.IControl}
            *
            * @description
            * The control tied to this instance.
            */
            private __control;
            /**
            * @name initialize
            * @memberof plat.ui.Attributes
            * @kind function
            * @access public
            *
            * @description
            * Initializes this instance with a {@link plat.IControl|IControl} and the camelCased
            * attribute properties and their values.
            *
            * @param {plat.IControl} control The function that acts as a listener.
            * @param {plat.IObject<string>} attributes The camelCased attribute properties and their values.
            *
            * @returns {void}
            */
            public initialize(control: IControl, attributes: IObject<string>): void;
            /**
            * @name observe
            * @memberof plat.ui.Attributes
            * @kind function
            * @access public
            *
            * @description
            * Provides a way to observe an attribute for changes.
            *
            * @param {string} key The attribute to observe for changes (e.g. 'src').
            * @param {plat.IPropertyChangedListener} listener The listener function to be called when the attribute changes.
            *
            * @returns {plat.IRemoveListener} A function to stop observing this attribute for changes.
            */
            public observe(key: string, listener: (newValue: any, oldValue?: any) => void): IRemoveListener;
            /**
            * @name _attributeChanged
            * @memberof plat.ui.Attributes
            * @kind function
            * @access protected
            *
            * @description
            * Used to show an attribute has been changed and forces listeners to be fired.
            *
            * @param {string} key The attribute being observed for changes (e.g. 'src').
            * @param {any} newValue The new value of the attribute.
            * @param {any} oldValue The previous value of the attribute.
            *
            * @returns {void}
            */
            public _attributeChanged(key: string, newValue: any, oldValue: any): void;
        }
        /**
        * The Type for referencing the '$Attributes' injectable as a dependency.
        */
        function IAttributesInstance(): IAttributesInstance;
        /**
        * @name IAttributesInstance
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object that stores the information about an Element's attribute NamedNodeMap.
        * Methods are implemented to allow you to observe for changes on an attribute.
        */
        interface IAttributesInstance {
            /**
            * @name initialize
            * @memberof plat.ui.IAttributesInstance
            * @kind function
            * @access public
            *
            * @description
            * Initializes this instance with a {@link plat.IControl|IControl} and the camelCased
            * attribute properties and their values.
            *
            * @param {plat.IControl} control The function that acts as a listener.
            * @param {plat.IObject<string>} attributes The camelCased attribute properties and their values.
            *
            * @returns {void}
            */
            initialize(control: IControl, attributes: IObject<string>): void;
            /**
            * @name observe
            * @memberof plat.ui.IAttributesInstance
            * @kind function
            * @access public
            *
            * @description
            * Provides a way to observe an attribute for changes.
            *
            * @param {string} key The attribute to observe for changes (e.g. 'src').
            * @param {plat.IPropertyChangedListener} listener The listener function to be called when the attribute changes.
            *
            * @returns {plat.IRemoveListener} A function to stop observing this attribute for changes.
            */
            observe(key: string, listener: (newValue: any, oldValue: any) => void): IRemoveListener;
        }
        /**
        * @name Resources
        * @memberof plat.ui
        * @kind class
        *
        * @implements {plat.ui.IResources}
        *
        * @description
        * Resources are used for providing aliases to use in markup expressions. They
        * are particularly useful when trying to access properties outside of the
        * current context, as well as reassigning context at any point in an app.
        *
        * @remarks
        * By default, every control has a resource for '@control' and '@context'.
        * {@link plat.ui.IViewControl|IViewControl} objects also have a resource for '@root' and '@rootContext',
        * which is a reference to the control and its context.
        *
        * Resources can be created in HTML, or through the exposed control.resources
        * object. If specified in HTML, they must be the first element child of the
        * control upon which the resources will be placed. IViewControls that use a
        * templateUrl can have resources as their first element in the templateUrl.
        *
        * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
        * The type of resource is denoted by the element name.
        *
        * Only resources of type 'observable' will have data binding. The types of resources are:
        * function, injectable, observable, and object. Resources of type 'function' will have their
        * associated function context bound to the control that contains the resource.
        *
        * When an alias is found in a markup expression, the framework will search up the control chain
        * to find the alias on a control's resources. This first matching alias will be used.
        *
        * @example
        * <custom-control>
        *     <plat-resources>
        *         <injectable alias="Cache">$CacheFactory</injectable>
        *         <observable alias="testObj">
        *              {
        *                  foo: 'foo',
        *                  bar: 'bar',
        *                  baz: 2
        *              }
        *         </observable>
        *     </plat-resources>
        * </custom-control>
        */
        class Resources implements IResources {
            /**
            * @name $ContextManagerStatic
            * @memberof plat.ui.Resources
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.observable.IContextManagerStatic}
            *
            * @description
            * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
            */
            static $ContextManagerStatic: observable.IContextManagerStatic;
            /**
            * @name $Regex
            * @memberof plat.ui.Resources
            * @kind property
            * @access public
            *
            * @type {plat.expressions.IRegex}
            *
            * @description
            * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
            */
            static $Regex: expressions.IRegex;
            /**
            * @name create
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Populates an {@link plat.ui.IResource|IResource} value if necessary, and adds it to the given
            * control's resources.
            *
            * @param {plat.ui.ITemplateControl} control The control for which to create a resource.
            * @param {plat.ui.IResource} resource The object used to set the resource values.
            *
            * @returns {plat.ui.IResource} The newly created {@link plat.ui.IResource|IResource}.
            */
            static create(control: ITemplateControl, resource: IResource): IResource;
            /**
            * @name addControlResources
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Adds resource aliases for '@control' and '@context'. The resources are
            * aliases for the control instance and the control.context.
            *
            * @param {plat.ui.ITemplateControl} control The control on which to add the resources.
            *
            * @returns {void}
            */
            static addControlResources(control: ITemplateControl): void;
            /**
            * @name bindResources
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Binds the resources in a resource instance. This involves injecting
            * the injectable resources, creating object/observable resources, and
            * binding functions to the associated control's instance.
            *
            * @param {plat.ui.IResources} resourcesInstance The instance of the IResources object.
            *
            * @returns {void}
            */
            static bindResources(resourcesInstance: IResources): void;
            /**
            * @name dispose
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Disposes a resource instance, removing its reference
            * from a control and breaking references to all resource
            * objects.
            *
            * @param {plat.ui.ITemplateControl} control The control whose resources will be disposed.
            * @param {boolean} persist? Whether or not to persist a resource object post
            * disposal or set it to null.
            *
            * @returns {void}
            */
            static dispose(control: ITemplateControl, persist?: boolean): void;
            /**
            * @name parseElement
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Parses a resources Element (<plat-resources>) and creates
            * an {@link plat.IObject<plat.ui.IResource>|IObject<IResource>} with its element children.
            *
            * @param {Element} element The resources element to parse.
            *
            * @returns {plat.IObject<plat.ui.IResource>} The resources created using the input element.
            */
            static parseElement(element: Element): IObject<IResource>;
            /**
            * @name getInstance
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a new instance with type {@link plat.ui.IResources|IResources}.
            *
            * @returns {plat.ui.IResources} A new {@link plat.ui.Resources|Resources} instance.
            */
            static getInstance(): IResources;
            /**
            * @name _observeResource
            * @memberof plat.ui.Resources
            * @kind function
            * @access protected
            * @static
            *
            * @description
            * Observes the resource if the type is 'observable'.
            *
            * @param {plat.ui.ITemplateControl} control The control in charge of the observable resource.
            * @param {plat.ui.IResource} resource The resource to observe.
            *
            * @returns {void}
            */
            static _observeResource(control: ITemplateControl, resource: IResource): void;
            /**
            * @name _removeListeners
            * @memberof plat.ui.Resources
            * @kind function
            * @access protected
            * @static
            *
            * @description
            * Removes observable resource listeners for a specified control.
            *
            * @param {plat.ui.ITemplateControl} control The control whose listeners are being removed.
            *
            * @returns {void}
            */
            static _removeListeners(control: ITemplateControl): void;
            /**
            * @name __controlResources
            * @memberof plat.ui.Resources
            * @kind property
            * @access private
            * @static
            *
            * @type {Array<string>}
            *
            * @description
            * A list of resources to place on a control.
            */
            private static __controlResources;
            /**
            * @name __resourceTypes
            * @memberof plat.ui.Resources
            * @kind property
            * @access private
            * @static
            *
            * @type {Array<string>}
            *
            * @description
            * A list of all resource types.
            */
            private static __resourceTypes;
            /**
            * @name __observableResourceRemoveListeners
            * @memberof plat.ui.Resources
            * @kind property
            * @access private
            * @static
            *
            * @type {plat.IObject<Array<plat.IRemoveListener>>}
            *
            * @description
            * An object consisting of keyed arrays containing functions for removing observation listeners.
            */
            private static __observableResourceRemoveListeners;
            /**
            * @name __addRoot
            * @memberof plat.ui.Resources
            * @kind function
            * @access private
            * @static
            *
            * @description
            * Adds a '@root' alias and '@rootContext' to a control, specifying that it contains the root
            * and root context. Root controls are generally the root {@link plat.ui.IViewControl|IViewControl}.
            *
            * @param {plat.ui.ITemplateControl} control The root control.
            *
            * @returns {void}
            */
            private static __addRoot(control);
            /**
            * @name __resources
            * @memberof plat.ui.Resources
            * @kind property
            * @access private
            *
            * @type {plat.IObject<plat.ui.IResource>}
            *
            * @description
            * An object representing all of the currently available resources.
            */
            private __resources;
            /**
            * @name __bound
            * @memberof plat.ui.Resources
            * @kind property
            * @access private
            *
            * @type {boolean}
            *
            * @description
            * Whether this {@link plat.ui.Resources|Resources} instance has been bound yet.
            */
            private __bound;
            /**
            * @name __controlInstance
            * @memberof plat.ui.Resources
            * @kind property
            * @access private
            *
            * @type {plat.ui.ITemplateControl}
            *
            * @description
            * The control that these resources are for.
            */
            private __controlInstance;
            /**
            * @name initialize
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Initializes this {@link plat.ui.Resources|Resources} instance.
            *
            * @param {plat.ui.ITemplateControl} control The control containing this {@link plat.ui.Resources|Resources} instance.
            * @param {Element} element? An optional element used to create initial {@link plat.ui.IResource|IResource} objects.
            *
            * @returns {void}
            */
            public initialize(control: ITemplateControl, element?: Element): void;
            /**
            * @name initialize
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Initializes this {@link plat.ui.Resources|Resources} instance.
            *
            * @param {plat.ui.ITemplateControl} control The control containing this {@link plat.ui.Resources|Resources} instance.
            * @param {IObject<IResource>} resources? An optional object used to populate initial
            * {@link plat.ui.IResource|IResource} objects.
            *
            * @returns {void}
            */
            public initialize(control: ITemplateControl, resources?: IObject<IResource>): void;
            /**
            * @name initialize
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Initializes this {@link plat.ui.Resources|Resources} instance.
            *
            * @param {plat.ui.ITemplateControl} control The control containing this {@link plat.ui.Resources|Resources} instance.
            * @param {plat.ui.IResources} resources? An optional {@link plat.ui.IResources|IResources} object used to populate initial
            * {@link plat.ui.IResource|IResource} objects.
            *
            * @returns {void}
            */
            public initialize(control: ITemplateControl, resources?: IResources): void;
            /**
            * @name add
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Used for programatically adding {@link plat.ui.IResource|IResource} objects.
            *
            * @param resources An {@link plat.IObject<plat.ui.IResource>|IObject<IResource>} used to add
            * resources, keyed by their alias.
            *
            * @returns {void}
            *
            * @example
            * control.resources.add({
            *     myAlias: {
            *         type: 'observable',
            *         value: {
            *             hello: 'Hello World!'
            *         }
            *     }
            * });
            */
            public add(resources: IObject<IResource>): void;
            /**
            * @name add
            * @memberof plat.ui.Resources
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Used for programatically adding {@link plat.ui.IResource|IResource} objects.
            *
            * @param {Element} element An Element containing resource element children.
            *
            * @returns {void}
            *
            * @remarks
            * The resource type is specified by the element name.
            *
            * @example
            *     <plat-resources>
            *         <injectable alias="Cache">$CacheFactory</injectable>
            *         <observable alias="testObj">{ foo: 'foo', bar: 'bar', baz: 2 }</observable>
            *     </plat-resources>
            */
            public add(element: Element): void;
        }
        /**
        * The Type for referencing the '$ResourcesFactory' injectable as a dependency.
        */
        function IResourcesFactory($ContextManagerStatic?: observable.IContextManagerStatic, $Regex?: expressions.IRegex): IResourcesFactory;
        /**
        * @name IResourcesFactory
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Creates and manages {@link plat.ui.IResources|IResources} for {@link plat.ui.ITemplateControl|ITemplateControls}.
        */
        interface IResourcesFactory {
            /**
            * @name create
            * @memberof plat.ui.IResourcesFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Populates an {@link plat.ui.IResource|IResource} value if necessary, and adds it to the given
            * control's resources.
            *
            * @param {plat.ui.ITemplateControl} control The control for which to create a resource.
            * @param {plat.ui.IResource} resource The object used to set the resource values.
            *
            * @returns {plat.ui.IResource} The newly created {@link plat.ui.IResource|IResource}.
            */
            create(control: ITemplateControl, resource: IResource): IResource;
            /**
            * @name addControlResources
            * @memberof plat.ui.IResourcesFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Adds resource aliases for '@control' and '@context'. The resources are
            * aliases for the control instance and the control.context.
            *
            * @param {plat.ui.ITemplateControl} control The control on which to add the resources.
            *
            * @returns {void}
            */
            addControlResources(control: ITemplateControl): void;
            /**
            * @name bindResources
            * @memberof plat.ui.IResourcesFactory
            * @kind function
            * @access public
            * @static
            * @variation 0
            *
            * @description
            * Binds the resources in a resource instance. This involves injecting
            * the injectable resources, creating object/observable resources, and
            * binding functions to the associated control's instance.
            *
            * @param {plat.ui.IResources} resourcesInstance The instance of the IResources object.
            *
            * @returns {void}
            */
            bindResources(resourcesInstance: IResources): void;
            /**
            * @name bindResources
            * @memberof plat.ui.IResourcesFactory
            * @kind function
            * @access public
            * @static
            * @variation 1
            *
            * @description
            * Binds the resources in a resource instance. This involves injecting
            * the injectable resources, creating object/observable resources, and
            * binding functions to the associated control's instance.
            *
            * @param {plat.ui.Resources} resourcesInstance The Resources  instance.
            *
            * @returns {void}
            */
            bindResources(resourcesInstance: Resources): void;
            /**
            * @name dispose
            * @memberof plat.ui.IResourcesFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Disposes a resource instance, removing its reference
            * from a control and breaking references to all resource
            * objects.
            *
            * @param {plat.ui.ITemplateControl} control The control whose resources will be disposed.
            * @param {boolean} persist? Whether or not to persist a resource object post
            * disposal or set it to null.
            *
            * @returns {void}
            */
            dispose(control: ITemplateControl, persist?: boolean): void;
            /**
            * @name parseElement
            * @memberof plat.ui.IResourcesFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Parses a resources Element (<plat-resources>) and creates
            * an {@link plat.IObject<plat.ui.IResource>|IObject<IResource>} with its element children.
            *
            * @param {Element} element The resources element to parse.
            *
            * @returns {plat.IObject<plat.ui.IResource>} The resources created using the input element.
            */
            parseElement(element: Element): IObject<IResource>;
            /**
            * @name getInstance
            * @memberof plat.ui.IResourcesFactory
            * @kind function
            * @access public
            * @static
            *
            * @description
            * Returns a new instance with type {@link plat.ui.IResources|IResources}.
            *
            * @returns {plat.ui.IResources} A new {@link plat.ui.Resources|Resources} instance.
            */
            getInstance(): IResources;
        }
        /**
        * @name IResources
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Resources are used for providing aliases to use in markup expressions. They
        * are particularly useful when trying to access properties outside of the
        * current context, as well as reassigning context at any point in an app.
        *
        * @remarks
        * By default, every control has a resource for '@control' and '@context'.
        * {@link plat.ui.IViewControl|IViewControl} objects also have a resource for '@root' and '@rootContext',
        * which is a reference to the control and its context.
        *
        * Resources can be created in HTML, or through the exposed control.resources
        * object. If specified in HTML, they must be the first element child of the
        * control upon which the resources will be placed. IViewControls that use a
        * templateUrl can have resources as their first element in the templateUrl.
        *
        * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
        * The type of resource is denoted by the element name.
        *
        * Only resources of type 'observable' will have data binding. The types of resources are:
        * function, injectable, observable, and object. Resources of type 'function' will have their
        * associated function context bound to the control that contains the resource.
        *
        * When an alias is found in a markup expression, the framework will search up the control chain
        * to find the alias on a control's resources. This first matching alias will be used.
        *
        * @example
        * <custom-control>
        *     <plat-resources>
        *         <injectable alias="Cache">$CacheFactory</injectable>
        *         <observable alias="testObj">
        *              {
        *                  foo: 'foo',
        *                  bar: 'bar',
        *                  baz: 2
        *              }
        *         </observable>
        *     </plat-resources>
        * </custom-control>
        */
        interface IResources {
            /**
            * @name add
            * @memberof plat.ui.IResources
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Used for programatically adding {@link plat.ui.IResource|IResource} objects.
            *
            * @param resources An {@link plat.IObject<plat.ui.IResource>|IObject<IResource>} used to add
            * resources, keyed by their alias.
            *
            * @returns {void}
            *
            * @example
            * control.resources.add({
            *     myAlias: {
            *         type: 'observable',
            *         value: {
            *             hello: 'Hello World!'
            *         }
            *     }
            * });
            */
            add(resources: IObject<IResource>): void;
            /**
            * @name add
            * @memberof plat.ui.IResources
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Used for programatically adding {@link plat.ui.IResource|IResource} objects.
            *
            * @param {Element} element An Element containing resource element children.
            *
            * @returns {void}
            *
            * @remarks
            * The resource type is specified by the element name.
            *
            * @example
            *     <plat-resources>
            *         <injectable alias="Cache">$CacheFactory</injectable>
            *         <observable alias="testObj">{ foo: 'foo', bar: 'bar', baz: 2 }</observable>
            *     </plat-resources>
            */
            add(element: Element): void;
            /**
            * @name initialize
            * @memberof plat.ui.IResources
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Initializes this {@link plat.ui.Resources|Resources} instance.
            *
            * @param {plat.ui.ITemplateControl} control The control containing this {@link plat.ui.Resources|Resources} instance.
            * @param {Element} element? An optional element used to create initial {@link plat.ui.IResource|IResource} objects.
            *
            * @returns {void}
            */
            initialize(control: ITemplateControl, element?: Element): void;
            /**
            * @name initialize
            * @memberof plat.ui.IResources
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Initializes this {@link plat.ui.Resources|Resources} instance.
            *
            * @param {plat.ui.ITemplateControl} control The control containing this {@link plat.ui.Resources|Resources} instance.
            * @param {IObject<IResource>} resources? An optional object used to populate initial
            * {@link plat.ui.IResource|IResource} objects.
            *
            * @returns {void}
            */
            initialize(control: ITemplateControl, resources?: IObject<IResource>): void;
            /**
            * @name initialize
            * @memberof plat.ui.IResources
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Initializes this {@link plat.ui.Resources|Resources} instance.
            *
            * @param {plat.ui.ITemplateControl} control The control containing this {@link plat.ui.Resources|Resources} instance.
            * @param {plat.ui.IResources} resources? An optional {@link plat.ui.IResources|IResources} object used to populate initial
            * {@link plat.ui.IResource|IResource} objects.
            *
            * @returns {void}
            */
            initialize(control: ITemplateControl, resources?: IResources): void;
        }
        /**
        * @name IResource
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Defines a single resource on the {@link plat.ui.IResources|IResources} object.
        */
        interface IResource {
            /**
            * @name type
            * @memberof plat.ui.IResource
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The type of resource.
            * - injectable
            * - observable
            * - object
            * - function
            */
            type: string;
            /**
            * @name alias
            * @memberof plat.ui.IResource
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The alias used to reference the resource.
            */
            alias?: string;
            /**
            * @name value
            * @memberof plat.ui.IResource
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * The value of the resource.
            */
            value?: any;
            /**
            * @name initialValue
            * @memberof plat.ui.IResource
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * The initial value of the resource prior to it being observed.
            */
            initialValue?: any;
        }
        /**
        * @name DomEvents
        * @memberof plat.ui
        * @kind class
        *
        * @implements {plat.ui.IDomEvents}
        *
        * @description
        * A class for managing DOM event registration and handling.
        */
        class DomEvents implements IDomEvents {
            /**
            * @name config
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.ui.IDomEventsConfig}
            *
            * @description
            * A configuration object for all DOM events.
            */
            static config: IDomEventsConfig;
            /**
            * @name $Document
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access public
            * @static
            *
            * @type {Document}
            *
            * @description
            * Reference to the Document injectable.
            */
            public $Document: Document;
            /**
            * @name $Compat
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access public
            * @static
            *
            * @type {plat.ICompat}
            *
            * @description
            * Reference to the {@link plat.ICompat|ICompat} injectable.
            */
            public $Compat: ICompat;
            /**
            * @name _isActive
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access protected
            *
            * @type {boolean}
            *
            * @description
            * Whether or not the {@link plat.ui.DomEvents|DomEvents} are currently active.
            * They become active at least one element on the current
            * page is listening for a custom event.
            */
            public _isActive: boolean;
            /**
            * @name _inTouch
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access protected
            *
            * @type {boolean}
            *
            * @description
            * Whether or not the user is currently touching the screen.
            */
            public _inTouch: boolean;
            /**
            * @name _subscribers
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access protected
            *
            * @type {plat.IObject<plat.ui.IEventSubscriber>}
            *
            * @description
            * An object with keyed subscribers that keep track of all of the
            * events registered on a particular element.
            */
            public _subscribers: IObject<IEventSubscriber>;
            /**
            * @name _startEvents
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access protected
            *
            * @type {Array<string>}
            *
            * @description
            * The touch start events defined by this browser.
            */
            public _startEvents: string[];
            /**
            * @name _moveEvents
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access protected
            *
            * @type {Array<string>}
            *
            * @description
            * The touch move events defined by this browser.
            */
            public _moveEvents: string[];
            /**
            * @name _endEvents
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access protected
            *
            * @type {Array<string>}
            *
            * @description
            * The touch end events defined by this browser.
            */
            public _endEvents: string[];
            /**
            * @name _gestures
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access protected
            *
            * @type {plat.ui.IGestures<string>}
            *
            * @description
            * An object containing the event types for all of the
            * supported gestures.
            */
            public _gestures: IGestures<string>;
            /**
            * @name _gestureCount
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access protected
            *
            * @type {plat.ui.IGestures<number>}
            *
            * @description
            * An object containing the number of currently active
            * events of each type.
            */
            public _gestureCount: IGestures<number>;
            /**
            * @name __START
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {string}
            *
            * @description
            * A constant for specifying the start condition.
            */
            private __START;
            /**
            * @name __MOVE
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {string}
            *
            * @description
            * A constant for specifying the move condition.
            */
            private __MOVE;
            /**
            * @name __END
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {string}
            *
            * @description
            * A constant for specifying the end condition.
            */
            private __END;
            /**
            * @name __hasMoved
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {boolean}
            *
            * @description
            * Whether or not the user moved while in touch.
            */
            private __hasMoved;
            /**
            * @name __hasSwiped
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {boolean}
            *
            * @description
            * Whether or not the user swiped while in touch.
            */
            private __hasSwiped;
            /**
            * @name __hasRelease
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {boolean}
            *
            * @description
            * Whether or not their is a registered "release" event.
            */
            private __hasRelease;
            /**
            * @name __detectingMove
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {boolean}
            *
            * @description
            * Whether or not we should be detecting move events.
            */
            private __detectingMove;
            /**
            * @name __tapCount
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {number}
            *
            * @description
            * The current tap count to help distinguish single from double taps.
            */
            private __tapCount;
            /**
            * @name __touchCount
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {number}
            *
            * @description
            * The total number of touches on the screen.
            */
            private __touchCount;
            /**
            * @name __tapTimeout
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {number}
            *
            * @description
            * A timeout ID given in the case that a tap delay was needed for
            * something such as a double tap to zoom feature.
            */
            private __tapTimeout;
            /**
            * @name __holdTimeout
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {number}
            *
            * @description
            * A timeout ID for removing a registered hold event.
            */
            private __holdTimeout;
            /**
            * @name __cancelRegex
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {RegExp}
            *
            * @description
            * A regular expressino for determining a "cancel" event.
            */
            private __cancelRegex;
            /**
            * @name __pointerEndRegex
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {RegExp}
            *
            * @description
            * A regular expressino for determining a pointer end event.
            */
            private __pointerEndRegex;
            /**
            * @name __lastTouchDown
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {plat.ui.IPointerEvent}
            *
            * @description
            * The user's last touch down.
            */
            private __lastTouchDown;
            /**
            * @name __lastTouchUp
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {plat.ui.IPointerEvent}
            *
            * @description
            * The user's last touch up.
            */
            private __lastTouchUp;
            /**
            * @name __swipeOrigin
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {plat.ui.IPointerEvent}
            *
            * @description
            * The starting place of an initiated swipe gesture.
            */
            private __swipeOrigin;
            /**
            * @name __lastMoveEvent
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {plat.ui.IPointerEvent}
            *
            * @description
            * The user's last move while in touch.
            */
            private __lastMoveEvent;
            /**
            * @name __capturedTarget
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {plat.ui.ICustomElement}
            *
            * @description
            * The captured target that the user first initiated a gesture on.
            */
            private __capturedTarget;
            /**
            * @name __focusedElement
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {HTMLInputElement}
            *
            * @description
            * The currently focused element on the screen. Used in the case of WebKit touch events.
            */
            private __focusedElement;
            /**
            * @name __mappedEventListener
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {EventListener}
            *
            * @description
            * An EventListener with a bound context for registering mapped events.
            */
            private __mappedEventListener;
            /**
            * @name __reverseMap
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {{}}
            *
            * @description
            * A hash map for mapping custom events to standard events.
            */
            private __reverseMap;
            /**
            * @name __swipeSubscribers
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {{ master: plat.ui.IDomEventInstance; directional: plat.ui.IDomEventInstance }}
            *
            * @description
            * A set of subscribers for the swipe gesture.
            */
            private __swipeSubscribers;
            /**
            * @name __pointerHash
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {plat.IObject<plat.ui.IPointerEvent>}
            *
            * @description
            * A hash of the current pointer touch points on the page.
            */
            private __pointerHash;
            /**
            * @name __pointerEvents
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {Array<plat.ui.IPointerEvent>}
            *
            * @description
            * An array containing all current pointer touch points on the page.
            */
            private __pointerEvents;
            /**
            * @name __listeners
            * @memberof plat.ui.DomEvents
            * @kind property
            * @access private
            *
            * @type {plat.ui.ICustomEventListener}
            *
            * @description
            * A set of touch start, move, and end listeners to be place on the document.
            */
            private __listeners;
            /**
            * @name constructor
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access public
            *
            * @description
            * Retrieve the type of touch events for this browser and create the default gesture style.
            *
            * @returns {plat.ui.DomEvents} The {@link plat.ui.DomEvents|DomEvents} instance.
            */
            constructor();
            /**
            * @name addEventListener
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Add an event listener for the specified event type on the specified element.
            *
            * @param {Node} element The node listening for the event.
            * @param {string} type The type of event being listened to.
            * @param {plat.ui.IGestureListener} listener The listener to be fired.
            * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
            */
            public addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Add an event listener for the specified event type on the specified element.
            *
            * @param {Window} element The window object.
            * @param {string} type The type of event being listened to.
            * @param {plat.ui.IGestureListener} listener The listener to be fired.
            * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
            */
            public addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Add an event listener for the specified event type on the specified element.
            *
            * @param {Node} element The node listening for the event.
            * @param {string} type The type of event being listened to.
            * @param {EventListener} listener The listener to be fired.
            * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
            */
            public addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Add an event listener for the specified event type on the specified element.
            *
            * @param {Window} element The window object.
            * @param {string} type The type of event being listened to.
            * @param {EventListener} listener The listener to be fired.
            * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
            */
            public addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name dispose
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access public
            *
            * @description
            * Stops listening for touch events and resets the DomEvents instance.
            *
            * @returns {void}
            */
            public dispose(): void;
            /**
            * @name _onTouchStart
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access protected
            *
            * @description
            * A listener for touch/mouse start events.
            *
            * @param {plat.ui.IPointerEvent} ev The touch start event object.
            *
            * @returns {boolean} Prevents default and stops propagation if false is returned.
            */
            public _onTouchStart(ev: IPointerEvent): boolean;
            /**
            * @name _onMove
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access protected
            *
            * @description
            * A listener for touch/mouse move events.
            *
            * @param {plat.ui.IPointerEvent} ev The touch move event object.
            *
            * @returns {boolean} Prevents default and stops propagation if false is returned.
            */
            public _onMove(ev: IPointerEvent): boolean;
            /**
            * @name _onTouchEnd
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access protected
            *
            * @description
            * A listener for touch/mouse end events.
            *
            * @param {plat.ui.IPointerEvent} ev The touch end event object.
            *
            * @returns {boolean} Prevents default and stops propagation if false is returned.
            */
            public _onTouchEnd(ev: IPointerEvent): boolean;
            /**
            * @name __handleTap
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * A function for handling and firing tap events.
            *
            * @param {plat.ui.IPointerEvent} ev The touch end event object.
            *
            * @returns {void}
            */
            private __handleTap(ev);
            /**
            * @name __handleDbltap
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * A function for handling and firing double tap events.
            *
            * @param {plat.ui.IPointerEvent} ev The touch end event object.
            *
            * @returns {void}
            */
            private __handleDbltap(ev);
            /**
            * @name __handleRelease
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * A function for handling and firing release events.
            *
            * @param {plat.ui.IPointerEvent} ev The touch end event object.
            *
            * @returns {void}
            */
            private __handleRelease(ev);
            /**
            * @name __handleSwipe
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * A function for handling and firing swipe events.
            *
            * @returns {void}
            */
            private __handleSwipe();
            /**
            * @name __handleTrack
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * A function for handling and firing track events.
            *
            * @param {plat.ui.IPointerEvent} ev The touch move event object.
            *
            * @returns {void}
            */
            private __handleTrack(ev);
            /**
            * @name __handleTrackEnd
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * A function for handling and firing track end events.
            *
            * @param {plat.ui.IPointerEvent} ev The touch end event object.
            *
            * @returns {void}
            */
            private __handleTrackEnd(ev);
            /**
            * @name __handleMappedEvent
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * A function for handling and firing custom events that are mapped to standard events.
            *
            * @param {plat.ui.IExtendedEvent} ev The touch event object.
            *
            * @returns {void}
            */
            private __handleMappedEvent(ev);
            /**
            * @name __getTypes
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * A function for determining the proper touch events.
            *
            * @returns {void}
            */
            private __getTypes();
            /**
            * @name __registerTypes
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Registers for and starts listening to start and end touch events on the document.
            *
            * @returns {void}
            */
            private __registerTypes();
            /**
            * @name __unregisterTypes
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Unregisters for and stops listening to all touch events on the document.
            *
            * @returns {void}
            */
            private __unregisterTypes();
            /**
            * @name __registerType
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Registers for and begins listening to a particular touch event type.
            *
            * @param {string} event The event type to begin listening for.
            *
            * @returns {void}
            */
            private __registerType(event);
            /**
            * @name __unregisterType
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Unregisters for and stops listening to a particular touch event type.
            *
            * @param {string} event The event type to stop listening for.
            *
            * @returns {void}
            */
            private __unregisterType(event);
            /**
            * @name __registerElement
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Registers and associates an element with an event.
            *
            * @param {plat.ui.ICustomElement} element The element being tied to a custom event.
            * @param {string} type The type of event.
            *
            * @returns {void}
            */
            private __registerElement(element, type);
            /**
            * @name __unregisterElement
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Unregisters and disassociates an element with an event.
            *
            * @param {plat.ui.ICustomElement} element The element being disassociated with the given custom event.
            * @param {string} type The type of event.
            *
            * @returns {void}
            */
            private __unregisterElement(element, type);
            /**
            * @name __setTouchPoint
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Sets the current touch point and helps standardize the given event object.
            *
            * @param {plat.ui.IPointerEvent} ev The current point being touched.
            *
            * @returns {void}
            */
            private __setTouchPoint(ev);
            /**
            * @name __setCapture
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Sets the captured target.
            *
            * @param {EventTarget} target The target to capture.
            *
            * @returns {void}
            */
            private __setCapture(target);
            /**
            * @name __updatePointers
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Sets the captured target.
            *
            * @param {plat.ui.IPointerEvent} ev The current touch point.
            * @param {boolean} remove Whether to remove the touch point or add it.
            *
            * @returns {void}
            */
            private __updatePointers(ev, remove);
            /**
            * @name __findFirstSubscriber
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Searches from the EventTarget up the DOM tree looking for an element with the
            * registered event type.
            *
            * @param {plat.ui.ICustomElement} eventTarget The current target of the touch event.
            * @param {string} type The type of event being searched for.
            *
            * @returns {plat.ui.IDomEventInstance} The found {@link plat.ui.IDomEventInstance} associated
            * with the first found element in the tree and the event type. Used to trigger the event at this
            * point in the DOM tree.
            */
            private __findFirstSubscriber(eventTarget, type);
            /**
            * @name __addMappedEvent
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Adds a listener for listening to a standard event and mapping it to a custom event.
            *
            * @param {string} mappedEvent The mapped event type.
            * @param {boolean} useCapture? Whether the mapped event listener is fired on the capture or bubble phase.
            *
            * @returns {plat.IRemoveListener} A function for removing the added mapped listener.
            */
            private __addMappedEvent(mappedEvent, useCapture?);
            /**
            * @name __removeEventListener
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Removes an event listener for a given event type.
            *
            * @param {plat.ui.ICustomElement} element The element to remove the listener from.
            * @param {string} type The type of event being removed.
            * @param {plat.ui.IGestureListener} listener The listener being removed.
            * @param {boolean} useCapture? Whether the listener is fired on the capture or bubble phase.
            *
            * @returns {void}
            */
            private __removeEventListener(element, type, listener, useCapture?);
            /**
            * @name __removeElement
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Removes an element from the subscriber object.
            *
            * @param {plat.ui.ICustomElement} element The element being removed.
            *
            * @returns {void}
            */
            private __removeElement(element);
            /**
            * @name __standardizeEventObject
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Standardizes certain properties on the event object for custom events.
            *
            * @param {plat.ui.IExtendedEvent} ev The event object to be standardized.
            *
            * @returns {void}
            */
            private __standardizeEventObject(ev);
            /**
            * @name __getOffset
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Grabs the x and y offsets of an event object's target.
            *
            * @param {plat.ui.IExtendedEvent} ev The current event object.
            *
            * @returns {plat.ui.IPoint} An object containing the x and y offsets.
            */
            private __getOffset(ev);
            /**
            * @name __clearHold
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Clears the hold events setTimeout.
            *
            * @returns {void}
            */
            private __clearHold();
            /**
            * @name __getDistance
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Calculates the distance between two (x, y) coordinate points.
            *
            * @param {number} x1 The x-coordinate of the first point.
            * @param {number} x2 The x-coordinate of the second point.
            * @param {number} y1 The y-coordinate of the first point.
            * @param {number} y2 The y-coordinate of the second point.
            *
            * @returns {number} The distance between the points.
            */
            private __getDistance(x1, x2, y1, y2);
            /**
            * @name __getVelocity
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Calculates the velocity between two (x, y) coordinate points over a given time.
            *
            * @param {number} dx The change in x position.
            * @param {number} dy The change in y position.
            * @param {number} dt The change in time.
            *
            * @returns {plat.ui.IVelocity} A velocity object containing horiztonal and vertical velocities.
            */
            private __getVelocity(dx, dy, dt);
            /**
            * @name __getDirection
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Calculates the direction of movement.
            *
            * @param {number} dx The change in x position.
            * @param {number} dy The change in y position.
            *
            * @returns {string} The direction of movement.
            */
            private __getDirection(dx, dy);
            /**
            * @name __checkForOriginChanged
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Checks to see if a swipe direction has changed to recalculate
            * an origin point.
            *
            * @param {string} direction The current direction of movement.
            *
            * @returns {boolean} Whether or not the origin point has changed.
            */
            private __checkForOriginChanged(direction);
            /**
            * @name __checkForRegisteredSwipe
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Checks to see if a swipe event has been registered.
            *
            * @param {string} direction The current direction of movement.
            *
            * @returns {boolean} Whether or not a registerd swipe event exists.
            */
            private __checkForRegisteredSwipe(direction);
            /**
            * @name __isHorizontal
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Checks to see if a swipe event has been registered.
            *
            * @param {string} direction The current direction of movement.
            *
            * @returns {boolean} Whether or not the current movement is horizontal.
            */
            private __isHorizontal(direction);
            /**
            * @name __appendGestureStyle
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Appends CSS to the head for gestures if needed.
            *
            * @returns {void}
            */
            private __appendGestureStyle();
            /**
            * @name __createStyle
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Creates a style text to append to the document head.
            *
            * @param {plat.ui.IDefaultStyle} styleClass The object containing the custom styles for
            * gestures.
            *
            * @returns {string} The style text.
            */
            private __createStyle(styleClass);
            /**
            * @name __isFocused
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Determines whether the target is the currently focused element.
            *
            * @param {EventTarget} target The event target.
            *
            * @returns {boolean} Whether or not the target is focused.
            */
            private __isFocused(target);
            /**
            * @name __handleInput
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Handles HTMLInputElements in WebKit based touch applications.
            *
            * @param {HTMLInputElement} target The event target.
            *
            * @returns {void}
            */
            private __handleInput(target);
            /**
            * @name __preventClickFromTouch
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Handles the phantom click in WebKit based touch applications.
            *
            * @returns {void}
            */
            private __preventClickFromTouch();
            /**
            * @name __removeSelections
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Removes selection capability from the element.
            *
            * @param {Node} element The element to remove selections on.
            *
            * @returns {void}
            */
            private __removeSelections(element);
            /**
            * @name __returnSelections
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Returns selection capability from the element.
            *
            * @param {Node} element The element to return selections on.
            *
            * @returns {void}
            */
            private __returnSelections(element);
            /**
            * @name __preventDefault
            * @memberof plat.ui.DomEvents
            * @kind function
            * @access private
            *
            * @description
            * Prevents default and stops propagation in all elements other than
            * inputs and textareas.
            *
            * @param {Event} ev The event object.
            *
            * @returns {boolean} Prevents default and stops propagation if false.
            */
            private __preventDefault(ev);
        }
        /**
        * The Type for referencing the '$DomEvents' injectable as a dependency.
        */
        function IDomEvents(): IDomEvents;
        /**
        * @name IDomEvents
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object for managing DOM event registration and handling.
        */
        interface IDomEvents {
            /**
            * @name addEventListener
            * @memberof plat.ui.IDomEvents
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Add an event listener for the specified event type on the specified element.
            *
            * @param {Node} element The node listening for the event.
            * @param {string} type The type of event being listened to.
            * @param {plat.ui.IGestureListener} listener The listener to be fired.
            * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
            */
            addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.IDomEvents
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Add an event listener for the specified event type on the specified element.
            *
            * @param {Window} element The window object.
            * @param {string} type The type of event being listened to.
            * @param {plat.ui.IGestureListener} listener The listener to be fired.
            * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
            */
            addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.IDomEvents
            * @kind function
            * @access public
            * @variation 2
            *
            * @description
            * Add an event listener for the specified event type on the specified element.
            *
            * @param {Node} element The node listening for the event.
            * @param {string} type The type of event being listened to.
            * @param {EventListener} listener The listener to be fired.
            * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
            */
            addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name addEventListener
            * @memberof plat.ui.IDomEvents
            * @kind function
            * @access public
            * @variation 3
            *
            * @description
            * Add an event listener for the specified event type on the specified element.
            *
            * @param {Window} element The window object.
            * @param {string} type The type of event being listened to.
            * @param {EventListener} listener The listener to be fired.
            * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
            *
            * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
            */
            addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
            * @name dispose
            * @memberof plat.ui.IDomEvents
            * @kind function
            * @access public
            *
            * @description
            * Stops listening for touch events and resets the DomEvents instance.
            *
            * @returns {void}
            */
            dispose(): void;
        }
        /**
        * The Type for referencing the '$DomEventsConfig' injectable as a dependency.
        */
        function IDomEventsConfig(): IDomEventsConfig;
        /**
        * @name DomEvent
        * @memberof plat.ui
        * @kind class
        *
        * @implements {plat.ui.IDomEventInstance}
        *
        * @description
        * A class for managing a single custom event.
        */
        class DomEvent implements IDomEventInstance {
            /**
            * @name $Document
            * @memberof plat.ui.DomEvent
            * @kind property
            * @access public
            *
            * @type {Document}
            *
            * @description
            * Reference to the Document injectable.
            */
            public $Document: Document;
            /**
            * @name element
            * @memberof plat.ui.DomEvent
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * The node or window object associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            */
            public element: any;
            /**
            * @name event
            * @memberof plat.ui.DomEvent
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event type associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            */
            public event: string;
            /**
            * @name initialize
            * @memberof plat.ui.DomEvent
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Initializes the element and event of this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            *
            * @param {Node} element The element associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            * @param {string} event The event associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            *
            * @returns {void}
            */
            public initialize(element: Node, event: string): void;
            /**
            * @name initialize
            * @memberof plat.ui.DomEvent
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Initializes the element and event of this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            *
            * @param {Window} element The window object.
            * @param {string} event The event associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            *
            * @returns {void}
            */
            public initialize(element: Window, event: string): void;
            /**
            * @name trigger
            * @memberof plat.ui.DomEvent
            * @kind function
            * @access public
            *
            * @description
            * Triggers its event on its element.
            *
            * @param {Object} eventExtension? An event extension to extend the dispatched CustomEvent.
            *
            * @returns {void}
            */
            public trigger(eventExtension?: Object): void;
        }
        /**
        * The Type for referencing the '$DomEventInstance' injectable as a dependency.
        */
        function IDomEventInstance(): IDomEventInstance;
        /**
        * @name IDomEventInstance
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object used for managing a single custom event.
        */
        interface IDomEventInstance {
            /**
            * @name element
            * @memberof plat.ui.IDomEventInstance
            * @kind property
            * @access public
            *
            * @type {any}
            *
            * @description
            * The node or window object associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            */
            element: any;
            /**
            * @name event
            * @memberof plat.ui.IDomEventInstance
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The event type associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            */
            event: string;
            /**
            * @name initialize
            * @memberof plat.ui.IDomEventInstance
            * @kind function
            * @access public
            * @variation 0
            *
            * @description
            * Initializes the element and event of this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            *
            * @param {Node} element The element associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            * @param {string} event The event associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            *
            * @returns {void}
            */
            initialize(element: Node, event: string): void;
            /**
            * @name initialize
            * @memberof plat.ui.IDomEventInstance
            * @kind function
            * @access public
            * @variation 1
            *
            * @description
            * Initializes the element and event of this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            *
            * @param {Window} element The window object.
            * @param {string} event The event associated with this {@link plat.ui.IDomEventInstance|IDomEventInstance} object.
            *
            * @returns {void}
            */
            initialize(element: Window, event: string): void;
            /**
            * @name trigger
            * @memberof plat.ui.IDomEventInstance
            * @kind function
            * @access public
            *
            * @description
            * Triggers its event on its element.
            *
            * @param {Object} eventExtension? An event extension to extend the dispatched CustomEvent.
            *
            * @returns {void}
            */
            trigger(eventExtension?: Object): void;
        }
        /**
        * @name IExtendedEvent
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {Event}
        *
        * @description
        * An extended event object potentially containing coordinate and movement information.
        */
        interface IExtendedEvent extends Event {
            /**
            * @name clientX
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The x-coordinate of the event on the screen relative to the upper left corner of the
            * browser window. This value cannot be affected by scrolling.
            */
            clientX?: number;
            /**
            * @name clientY
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The y-coordinate of the event on the screen relative to the upper left corner of the
            * browser window. This value cannot be affected by scrolling.
            */
            clientY?: number;
            /**
            * @name screenX
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The x-coordinate of the event on the screen relative to the upper left corner of the
            * physical screen or monitor.
            */
            screenX?: number;
            /**
            * @name screenY
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The y-coordinate of the event on the screen relative to the upper left corner of the
            * physical screen or monitor.
            */
            screenY?: number;
            /**
            * @name pageX
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The x-coordinate of the event on the screen relative to the upper left corner of the
            * fully rendered content area in the browser window. This value can be altered and/or affected by
            * embedded scrollable pages when the scroll bar is moved.
            */
            pageX?: number;
            /**
            * @name pageY
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The y-coordinate of the event on the screen relative to the upper left corner of the
            * fully rendered content area in the browser window. This value can be altered and/or affected by
            * embedded scrollable pages when the scroll bar is moved.
            */
            pageY?: number;
            /**
            * @name offsetX
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The x-coordinate of the event relative to the top-left corner of the
            * offsetParent element that fires the event.
            */
            offsetX?: number;
            /**
            * @name offsetY
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The y-coordinate of the event relative to the top-left corner of the
            * offsetParent element that fires the event.
            */
            offsetY?: number;
            /**
            * @name offset
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {plat.ui.IPoint}
            *
            * @description
            * The x and y-coordinates of the event as an object relative to the top-left corner of the
            * offsetParent element that fires the event.
            */
            offset: IPoint;
            /**
            * @name direction
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The potential direction associated with the event.
            */
            direction?: string;
            /**
            * @name velocity
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {plat.ui.IVelocity}
            *
            * @description
            * The potential velocity associated with the event.
            */
            velocity?: IVelocity;
            /**
            * @name touches
            * @memberof plat.ui.IExtendedEvent
            * @kind property
            * @access public
            *
            * @type {Array<plat.ui.IExtendedEvent>}
            *
            * @description
            * An array containing all current touch points. The IExtendedEvents
            * may slightly differ depending on the browser implementation.
            */
            touches?: IExtendedEvent[];
        }
        /**
        * @name IPointerEvent
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {plat.ui.IExtendedEvent}
        *
        * @description
        * An extended event object potentially containing coordinate and movement information as
        * well as pointer type for pointer events.
        */
        interface IPointerEvent extends IExtendedEvent {
            /**
            * @name pointerType
            * @memberof plat.ui.IPointerEvent
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The type of interaction associated with the touch event ('touch', 'pen', 'mouse', '').
            */
            pointerType?: string;
            /**
            * @name pointerId
            * @memberof plat.ui.IPointerEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * A unique touch identifier.
            */
            pointerId?: number;
            /**
            * @name identifier
            * @memberof plat.ui.IPointerEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * A unique touch identifier.
            */
            identifier?: number;
        }
        /**
        * @name IGestureEvent
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {CustomEvent}
        *
        * @description
        * The type of event object passed into the listeners for our custom events.
        */
        interface IGestureEvent extends CustomEvent {
            /**
            * @name clientX
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The x-coordinate of the event on the screen relative to the upper left corner of the
            * browser window. This value cannot be affected by scrolling.
            */
            clientX?: number;
            /**
            * @name clientY
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The y-coordinate of the event on the screen relative to the upper left corner of the
            * browser window. This value cannot be affected by scrolling.
            */
            clientY?: number;
            /**
            * @name screenX
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The x-coordinate of the event on the screen relative to the upper left corner of the
            * physical screen or monitor.
            */
            screenX?: number;
            /**
            * @name screenY
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The y-coordinate of the event on the screen relative to the upper left corner of the
            * physical screen or monitor.
            */
            screenY?: number;
            /**
            * @name pageX
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The x-coordinate of the event on the screen relative to the upper left corner of the
            * fully rendered content area in the browser window. This value can be altered and/or affected by
            * embedded scrollable pages when the scroll bar is moved.
            */
            pageX?: number;
            /**
            * @name pageY
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The y-coordinate of the event on the screen relative to the upper left corner of the
            * fully rendered content area in the browser window. This value can be altered and/or affected by
            * embedded scrollable pages when the scroll bar is moved.
            */
            pageY?: number;
            /**
            * @name offsetX
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The x-coordinate of the event relative to the top-left corner of the
            * offsetParent element that fires the event.
            */
            offsetX?: number;
            /**
            * @name offsetY
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The y-coordinate of the event relative to the top-left corner of the
            * offsetParent element that fires the event.
            */
            offsetY?: number;
            /**
            * @name direction
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The potential direction associated with the event.
            */
            direction?: string;
            /**
            * @name velocity
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {plat.ui.IVelocity}
            *
            * @description
            * The potential velocity associated with the event.
            */
            velocity?: IVelocity;
            /**
            * @name touches
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {Array<plat.ui.IExtendedEvent>}
            *
            * @description
            * An array containing all current touch points. The IExtendedEvents
            * may slightly differ depending on the browser implementation.
            */
            touches?: IExtendedEvent[];
            /**
            * @name pointerType
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The type of interaction associated with the touch event ('touch', 'pen', 'mouse', '').
            */
            pointerType?: string;
            /**
            * @name identifier
            * @memberof plat.ui.IGestureEvent
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * A unique touch identifier.
            */
            identifier?: number;
        }
        /**
        * @name IGestureListener
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * The listener interface for our custom DOM events.
        */
        interface IGestureListener {
            /**
            * @memberof plat.ui.IGestureListener
            * @kind function
            * @access public
            * @static
            *
            * @description
            * The method signature for a {@link plat.ui.IGestureListener|IGestureListener}.
            * An EventListener with the argument as an {@link plat.ui.IGestureEvent|IGestureEvent}.
            *
            * @param {plat.ui.IGestureEvent} ev The gesture event object.
            *
            * @returns {void}
            */
            (ev?: IGestureEvent): void;
        }
        /**
        * @name IEventSubscriber
        * @memberof plat.ui
        * @kind interface
        *
        * @extends {plat.ui.IGestures<plat.ui.IDomEventInstance>}
        *
        * @description
        * Describes an object to keep track of a single
        * element's registered custom event types.
        */
        interface IEventSubscriber extends IGestures<IDomEventInstance> {
            /**
            * @name gestureCount
            * @memberof plat.ui.IEventSubscriber
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The total registered gesture count for the associated element.
            */
            gestureCount: number;
        }
        /**
        * @name IGestures
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object containing information
        * regarding all our custom events.
        *
        * @typeparam {any} T The type of objects/primitives contained in this object.
        */
        interface IGestures<T> {
            /**
            * @name $tap
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the tap event.
            */
            $tap?: T;
            /**
            * @name $dbltap
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the dbltap event.
            */
            $dbltap?: T;
            /**
            * @name $hold
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the hold event.
            */
            $hold?: T;
            /**
            * @name $release
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the release event.
            */
            $release?: T;
            /**
            * @name $swipe
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the swipe event.
            */
            $swipe?: T;
            /**
            * @name $swipeleft
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the swipeleft event.
            */
            $swipeleft?: T;
            /**
            * @name $swiperight
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the swiperight event.
            */
            $swiperight?: T;
            /**
            * @name $swipeup
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the swipeup event.
            */
            $swipeup?: T;
            /**
            * @name $swipedown
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the swipedown event.
            */
            $swipedown?: T;
            /**
            * @name $track
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the track event.
            */
            $track?: T;
            /**
            * @name $trackleft
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the trackleft event.
            */
            $trackleft?: T;
            /**
            * @name $trackright
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the trackright event.
            */
            $trackright?: T;
            /**
            * @name $trackup
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the trackup event.
            */
            $trackup?: T;
            /**
            * @name $trackdown
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the trackdown event.
            */
            $trackdown?: T;
            /**
            * @name $trackend
            * @memberof plat.ui.IGestures
            * @kind property
            * @access public
            *
            * @type {T}
            *
            * @description
            * The string type|number of events associated with the trackend event.
            */
            $trackend?: T;
        }
        /**
        * @name IPoint
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object containing x and y coordinates.
        */
        interface IPoint {
            /**
            * @name x
            * @memberof plat.ui.IPoint
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The x-coordinate.
            */
            x: number;
            /**
            * @name y
            * @memberof plat.ui.IPoint
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The y-coordinate.
            */
            y: number;
        }
        /**
        * @name IVelocity
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object containing a speed in both the horizontal and vertical directions.
        */
        interface IVelocity {
            /**
            * @name x
            * @memberof plat.ui.IVelocity
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The horizontal, x velocity.
            */
            x: number;
            /**
            * @name y
            * @memberof plat.ui.IVelocity
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The vertical, y velocity.
            */
            y: number;
        }
        /**
        * @name IIntervals
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object containing time interval information that
        * governs the behavior of certain custom DOM events.
        */
        interface IIntervals {
            /**
            * @name tapInterval
            * @memberof plat.ui.IIntervals
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The max time in milliseconds a user can hold down on the screen
            * for a tap event to be fired. Defaults to 200 ms.
            */
            tapInterval: number;
            /**
            * @name dblTapInterval
            * @memberof plat.ui.IIntervals
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The max time in milliseconds a user can wait between consecutive
            * taps for a dbltap event to be fired. Defaults to 300 ms.
            */
            dblTapInterval: number;
            /**
            * @name holdInterval
            * @memberof plat.ui.IIntervals
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The time in milliseconds a user must hold down on the screen
            * before a hold event is fired or a release event can be fired.
            * Defaults to 400 ms.
            */
            holdInterval: number;
            /**
            * @name dblTapZoomDelay
            * @memberof plat.ui.IIntervals
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The delay in milliseconds between the time a user taps to the time
            * the tap event fires. Used in the case where a double-tap-to-zoom
            * feature is required. Defaults to 0 ms.
            */
            dblTapZoomDelay: number;
        }
        /**
        * @name IDistances
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object containing distance information that
        * governs the behavior of certain custom DOM events.
        */
        interface IDistances {
            /**
            * @name minScrollDistance
            * @memberof plat.ui.IDistances
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The minimum distance a user must move after touch down to register
            * it as a scroll instead of a tap. Defaults to 5.
            */
            minScrollDistance: number;
            /**
            * @name maxDblTapDistance
            * @memberof plat.ui.IDistances
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The maximum distance between consecutive taps a user is allowed to
            * register a dbltap event. Defaults to 20.
            */
            maxDblTapDistance: number;
        }
        /**
        * @name IVelocities
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object containing velocity information that
        * governs the behavior of certain custom DOM events.
        */
        interface IVelocities {
            /**
            * @name minSwipeVelocity
            * @memberof plat.ui.IVelocities
            * @kind property
            * @access public
            *
            * @type {number}
            *
            * @description
            * The minimum velocity a user must move after touch down to register
            * a swipe event. Defaults to 0.8.
            */
            minSwipeVelocity: number;
        }
        /**
        * @name IDefaultStyle
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes an object used for creating a custom class for styling an element
        * listening for a custom DOM event.
        */
        interface IDefaultStyle {
            /**
            * @name className
            * @memberof plat.ui.IDefaultStyle
            * @kind property
            * @access public
            *
            * @type {string}
            *
            * @description
            * The className that will be used to define the custom style.
            */
            className: string;
            /**
            * @name styles
            * @memberof plat.ui.IDefaultStyle
            * @kind property
            * @access public
            *
            * @type {Array<string>}
            *
            * @description
            * An array of string styles in the format:
            * CSS identifier : value
            * (e.g. 'width : 100px')
            */
            styles: string[];
        }
        /**
        * @name IDomEventsConfig
        * @memberof plat.ui
        * @kind interface
        *
        * @description
        * Describes a configuration object for all custom DOM events.
        */
        interface IDomEventsConfig {
            /**
            * @name intervals
            * @memberof plat.ui.IDomEventsConfig
            * @kind property
            * @access public
            *
            * @type {plat.ui.IIntervals}
            *
            * @description
            * An object containing the different time intervals that govern the behavior of certain
            * custom DOM events.
            */
            intervals: IIntervals;
            /**
            * @name distances
            * @memberof plat.ui.IDomEventsConfig
            * @kind property
            * @access public
            *
            * @type {plat.ui.IDistances}
            *
            * @description
            * An object containing the different minimum/maximum distances that govern the behavior of certain
            * custom DOM events.
            */
            distances: IDistances;
            /**
            * @name velocities
            * @memberof plat.ui.IDomEventsConfig
            * @kind property
            * @access public
            *
            * @type {plat.ui.IVelocities}
            *
            * @description
            * An object containing the different minimum/maximum velocities that govern the behavior of certain
            * custom DOM events.
            */
            velocities: IVelocities;
            /**
            * @name styleConfig
            * @memberof plat.ui.IDomEventsConfig
            * @kind property
            * @access public
            *
            * @type {Array<plat.ui.IDefaultStyle>}
            *
            * @description
            * The default CSS styles applied to elements listening for custom DOM events.
            */
            styleConfig: IDefaultStyle[];
        }
        module animations {
            /**
            * @name Animator
            * @memberof plat.ui.animations
            * @kind class
            *
            * @implements {plat.ui.animations.IAnimator}
            *
            * @description
            * A class used for animating elements.
            */
            class Animator implements IAnimator {
                /**
                * @name $Compat
                * @memberof plat.ui.animations.Animator
                * @kind property
                * @access public
                *
                * @type {plat.ICompat}
                *
                * @description
                * Reference to the {@link plat.ICompat|ICompat} injectable.
                */
                public $Compat: ICompat;
                /**
                * @name _elements
                * @memberof plat.ui.animations.Animator
                * @kind property
                * @access protected
                *
                * @type {plat.IObject<plat.ui.animations.IAnimatedElement>}
                *
                * @description
                * All elements currently being animated.
                */
                public _elements: IObject<IAnimatedElement>;
                /**
                * @name __cssWarning
                * @memberof plat.ui.animations.Animator
                * @kind property
                * @access private
                *
                * @type {boolean}
                *
                * @description
                * Indicates if a warning regarding our CSS was previously fired.
                */
                private __cssWarning;
                /**
                * @name animate
                * @memberof plat.ui.animations.Animator
                * @kind function
                * @access public
                *
                * @description
                * Animates the element with the defined animation denoted by the key.
                *
                * @param {Element} element The Element to be animated.
                * @param {string} key The identifier specifying the type of animation.
                * @param {any} options Specified options for the animation.
                *
                * @returns {plat.ui.animations.IAnimationPromise} A promise that resolves when the animation is finished.
                */
                public animate(element: Element, key: string, options?: any): IAnimationPromise;
                /**
                * @name __parentIsAnimating
                * @memberof plat.ui.animations.Animator
                * @kind function
                * @access private
                *
                * @description
                * Checks whether or not any parent elements are animating.
                *
                * @param {Node} element The element whose parents we need to check.
                *
                * @returns {boolean} Whether or not animating parents were found.
                */
                private __parentIsAnimating(element);
                /**
                * @name __setAnimationId
                * @memberof plat.ui.animations.Animator
                * @kind function
                * @access private
                *
                * @description
                * Sets an new, unique animation ID and denotes the element as currently being animated.
                *
                * @param {Node} element The element being animated.
                * @param {plat.ui.animations.IBaseAnimation} animationInstance The animation instance doing the animating.
                *
                * @returns {string} The new animation ID.
                */
                private __setAnimationId(element, animationInstance);
                /**
                * @name __stopChildAnimations
                * @memberof plat.ui.animations.Animator
                * @kind function
                * @access private
                *
                * @description
                * Forces child nodes of an animating element to stop animating.
                *
                * @param {Element} element The element being animated.
                * @param {string} id The animation ID.
                *
                * @returns {void}
                */
                private __stopChildAnimations(element, id);
                /**
                * @name __resolvePromise
                * @memberof plat.ui.animations.Animator
                * @kind function
                * @access private
                *
                * @description
                * Immediately resolves an empty {@link plat.ui.animations.AnimationPromise|AnimationPromise}.
                *
                * @returns {plat.ui.animations.IAnimationThenable<void>} The immediately resolved
                * {@link plat.ui.animations.AnimationPromise|AnimationPromise}.
                */
                private __resolvePromise();
            }
            /**
            * The Type for referencing the '$Animator' injectable as a dependency.
            */
            function IAnimator(): IAnimator;
            /**
            * @name IAnimator
            * @memberof plat.ui.animations
            * @kind interface
            *
            * @description
            * Describes an object used for animating elements.
            */
            interface IAnimator {
                /**
                * @name animate
                * @memberof plat.ui.animations.IAnimator
                * @kind function
                * @access public
                *
                * @description
                * Animates the element with the defined animation denoted by the key.
                *
                * @param {Element} element The Element to be animated.
                * @param {string} key The identifier specifying the type of animation.
                * @param {any} options Specified options for the animation.
                *
                * @returns {plat.ui.animations.IAnimationPromise} A promise that resolves when the animation is finished.
                */
                animate(element: Element, key: string, options?: any): IAnimationPromise;
            }
            /**
            * @name IAnimatedElement
            * @memberof plat.ui.animations
            * @kind interface
            *
            * @description
            * Describes an object representing a currenlty animated element.
            */
            interface IAnimatedElement {
                /**
                * @name animationEnd
                * @memberof plat.ui.animations.IAnimatedElement
                * @kind function
                * @access public
                *
                * @description
                * The function called at the conclusion of the animation.
                *
                * @param {boolean} reanimated? Specifies whether the element is being reanimated while
                * in a current animation.
                *
                * @returns {void}
                */
                animationEnd: (reanimated?: boolean) => void;
                /**
                * @name promise
                * @memberof plat.ui.animations.IAnimatedElement
                * @kind property
                * @access public
                *
                * @type {plat.ui.animations.IAnimationThenable<any>}
                *
                * @description
                * A promise representing an element's current state of animation.
                */
                promise?: IAnimationThenable<any>;
            }
            /**
            * @name AnimationPromise
            * @memberof plat.ui.animations
            * @kind class
            *
            * @extends {plat.async.Promise<void>}
            * @implements {plat.ui.animations.IAnimationPromise}
            *
            * @description
            * Describes a type of {@link plat.async.Promise|Promise} that can be optionally cancelled.
            */
            class AnimationPromise extends async.Promise<void> implements IAnimationPromise {
                /**
                * @name __animationInstance
                * @memberof plat.ui.animations.AnimationPromise
                * @kind property
                * @access private
                *
                * @type {plat.ui.animations.IBaseAnimation}
                *
                * @description
                * The animation instance to cancel if needed.
                */
                private __animationInstance;
                /**
                * @name constructor
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 0
                *
                * @description
                * The constructor method for the {@link plat.async.AjaxPromise}.
                *
                * @param {(resolve: (value?: void) => any) => void} resolveFunction A resolve function
                * that only allows for a resolve of void and no reject.
                *
                * @returns {plat.ui.animations.AnimationPromise}
                */
                constructor(resolveFunction: (resolve: (value?: void) => any) => void);
                /**
                * @name constructor
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 1
                *
                * @description
                * The constructor method for the {@link plat.async.AjaxPromise}.
                *
                * @param {(resolve: (value?: void) => any) => void} resolveFunction A resolve function
                * that only allows for a resolve of void and no reject.
                * @param {any} promise The promise object to allow for cancelling the {@link plat.ui.animations.AnimationPromise}.
                *
                * @returns {plat.ui.animations.AnimationPromise}
                */
                constructor(resolveFunction: (resolve: (value?: void) => any) => void, promise: any);
                /**
                * @name cancel
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                *
                * @description
                * A method to cancel the associated animation.
                *
                * @returns {plat.ui.animations.AnimationPromise} This promise instance.
                */
                public cancel(): IAnimationPromise;
                /**
                * @name then
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 0
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills.
                *
                * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the
                * next then method in the promise chain.
                *
                * @param {(success: void) => U} onFulfilled A method called when/if the promise fulfills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>}
                */
                public then<U>(onFulfilled: (success: void) => U): IAnimationThenable<U>;
                /**
                * @name then
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 1
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills.
                *
                * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the
                * next then method in the promise chain.
                *
                * @param {(success: void) => plat.ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulfills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>}
                */
                public then<U>(onFulfilled: (success: void) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                * @name then
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 2
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills.
                *
                * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the
                * next then method in the promise chain.
                *
                * @param {(success: void) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulfills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>}
                */
                public then<U>(onFulfilled: (success: void) => async.IThenable<U>): IAnimationThenable<U>;
                /**
                * @name catch
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 0
                *
                * @description
                * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
                *
                * @typeparam {any} U The return type of the returned promise.
                *
                * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected A method called when/if the promise rejects.
                * If undefined the next onRejected method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
                */
                public catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                * @name catch
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 1
                *
                * @description
                * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
                *
                * @typeparam {any} U The return type of the returned promise.
                *
                * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
                * onRejected method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
                */
                public catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
            }
            /**
            * @name IAnimationThenable
            * @memberof plat.ui.animations
            * @kind interface
            *
            * @extends {plat.async.IThenable<R>}
            *
            * @description
            * Describes a chaining function that fulfills when the previous link is complete and is
            * able to be caught in the case of an error.
            *
            * @typeparam {any} R The return type of the thenable.
            */
            interface IAnimationThenable<R> extends async.IThenable<R> {
                /**
                * @name cancel
                * @memberof plat.ui.animations.IAnimationThenable
                * @kind function
                * @access public
                *
                * @description
                * A method to cancel the associated animation.
                *
                * @returns {plat.ui.animations.AnimationPromise} This promise instance.
                */
                cancel(): IAnimationPromise;
                /**
                * @name then
                * @memberof plat.ui.animations.IAnimationThenable
                * @kind function
                * @access public
                * @variation 0
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills/rejects.
                *
                * @typeparam {any} U The return type of the returned promise.
                *
                * @param {(success: R) => plat.ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected? A method called when/if the promise rejects.
                * If undefined the next onRejected method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
                */
                then<U>(onFulfilled: (success: R) => IAnimationThenable<U>, onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                * @name then
                * @memberof plat.ui.animations.IAnimationThenable
                * @kind function
                * @access public
                * @variation 1
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills/rejects.
                *
                * @typeparam {any} U The return type of the returned promise.
                *
                * @param {(success: R) => plat.ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                * @param {(error: any) => U} onRejected? A method called when/if the promise rejects.
                * If undefined the next onRejected method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
                */
                then<U>(onFulfilled: (success: R) => IAnimationThenable<U>, onRejected?: (error: any) => U): IAnimationThenable<U>;
                /**
                * @name then
                * @memberof plat.ui.animations.IAnimationThenable
                * @kind function
                * @access public
                * @variation 2
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills/rejects.
                *
                * @typeparam {any} U The return type of the returned promise.
                *
                * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected? A method called when/if the promise rejects.
                * If undefined the next onRejected method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
                */
                then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                * @name then
                * @memberof plat.ui.animations.IAnimationThenable
                * @kind function
                * @access public
                * @variation 3
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills/rejects.
                *
                * @typeparam {any} U The return type of the returned promise.
                *
                * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                * @param {(error: any) => U} onRejected? A method called when/if the promise rejects.
                * If undefined the next onRejected method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
                */
                then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAnimationThenable<U>;
                /**
                * @name catch
                * @memberof plat.ui.animations.IAnimationThenable
                * @kind function
                * @access public
                * @variation 0
                *
                * @description
                * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
                *
                * @typeparam {any} U The return type of the returned promise.
                *
                * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected A method called when/if the promise rejects.
                * If undefined the next onRejected method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
                */
                catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                * @name catch
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 1
                *
                * @description
                * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
                *
                * @typeparam {any} U The return type of the returned promise.
                *
                * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
                * onRejected method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
                */
                catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
            }
            /**
            * @name IAnimationPromise
            * @memberof plat.ui.animations
            * @kind interface
            *
            * @extends {plat.ui.animations.IAnimationThenable<void>}
            *
            * @description
            * Describes a type of {@link plat.async.IPromise|IPromise} that fulfills when an animation is
            * finished and can be optionally cancelled.
            */
            interface IAnimationPromise extends IAnimationThenable<void> {
                /**
                * @name cancel
                * @memberof plat.ui.animations.IAnimationPromise
                * @kind function
                * @access public
                *
                * @description
                * A method to cancel the associated animation.
                *
                * @returns {plat.ui.animations.AnimationPromise} This promise instance.
                */
                cancel(): IAnimationPromise;
                /**
                * @name then
                * @memberof plat.ui.animations.IAnimationPromise
                * @kind function
                * @access public
                * @variation 0
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills.
                *
                * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the
                * next then method in the promise chain.
                *
                * @param {(success: void) => U} onFulfilled A method called when/if the promise fulfills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>}
                */
                then<U>(onFulfilled: (success: void) => U): IAnimationThenable<U>;
                /**
                * @name then
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 1
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills.
                *
                * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the
                * next then method in the promise chain.
                *
                * @param {(success: void) => plat.ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulfills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>}
                */
                then<U>(onFulfilled: (success: void) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                * @name then
                * @memberof plat.ui.animations.AnimationPromise
                * @kind function
                * @access public
                * @variation 2
                *
                * @description
                * Takes in two methods, called when/if the promise fulfills.
                *
                * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the
                * next then method in the promise chain.
                *
                * @param {(success: void) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulfills.
                * If undefined the next onFulfilled method in the promise chain will be called.
                *
                * @returns {plat.ui.animations.IAnimationThenable<U>}
                */
                then<U>(onFulfilled: (success: void) => async.IThenable<U>): IAnimationThenable<U>;
            }
            /**
            * @name BaseAnimation
            * @memberof plat.ui.animations
            * @kind class
            *
            * @implements {plat.ui.animations.IBaseAnimation}
            *
            * @description
            * A class representing a single animation for a single element.
            */
            class BaseAnimation implements IBaseAnimation {
                /**
                * @name $Compat
                * @memberof plat.ui.animations.BaseAnimation
                * @kind property
                * @access public
                *
                * @type {plat.ICompat}
                *
                * @description
                * Reference to the {@link plat.ICompat|ICompat} injectable.
                */
                public $Compat: ICompat;
                /**
                * @name element
                * @memberof plat.ui.animations.BaseAnimation
                * @kind property
                * @access public
                *
                * @type {HTMLElement}
                *
                * @description
                * The node having the animation performed on it.
                */
                public element: HTMLElement;
                /**
                * @name dom
                * @memberof plat.ui.animations.BaseAnimation
                * @kind property
                * @access public
                *
                * @type {plat.ui.IDom}
                *
                * @description
                * Contains DOM helper methods for manipulating this control's element.
                */
                public dom: IDom;
                /**
                * @name options
                * @memberof plat.ui.animations.BaseAnimation
                * @kind property
                * @access public
                *
                * @type {any}
                *
                * @description
                * Specified options for the animation.
                */
                public options: any;
                /**
                * @name __resolve
                * @memberof plat.ui.animations.BaseAnimation
                * @kind property
                * @access private
                *
                * @type {() => void}
                *
                * @description
                * The resolve function for the end of the animation.
                */
                private __resolve;
                /**
                * @name initialize
                * @memberof plat.ui.animations.BaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function for initializing the animation or any of its properties before start.
                *
                * @returns {void}
                */
                public initialize(): void;
                /**
                * @name start
                * @memberof plat.ui.animations.BaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function denoting the start of the animation.
                *
                * @returns {void}
                */
                public start(): void;
                /**
                * @name end
                * @memberof plat.ui.animations.BaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to be called when the animation is over.
                *
                * @returns {void}
                */
                public end(): void;
                /**
                * @name cancel
                * @memberof plat.ui.animations.BaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to be called to let it be known the animation is being cancelled.
                *
                * @returns {void}
                */
                public cancel(): void;
                /**
                * @name dispose
                * @memberof plat.ui.animations.BaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function for reverting any modifications or changes that may have been made as a
                * result of this animation.
                *
                * @returns {void}
                */
                public dispose(): void;
                /**
                * @name _init
                * @memberof plat.ui.animations.BaseAnimation
                * @kind function
                * @access protected
                *
                * @description
                * Initializes the element and key properties of this animation and passes in the function
                * to resolve when finished.
                *
                * @param {Element} element The element on which the animation will occur.
                * @param {any} options Specified options for the animation.
                *
                * @returns {plat.ui.animations.IAnimationPromise} The promise that will resolve when the
                * animation is complete and end() is called.
                */
                public _init(element: Element, options?: any): IAnimationPromise;
            }
            /**
            * @name IBaseAnimation
            * @memberof plat.ui.animations
            * @kind interface
            *
            * @description
            * Describes an object representing a single animation for a single element.
            */
            interface IBaseAnimation {
                /**
                * @name element
                * @memberof plat.ui.animations.IBaseAnimation
                * @kind property
                * @access public
                *
                * @type {HTMLElement}
                *
                * @description
                * The node having the animation performed on it.
                */
                element: HTMLElement;
                /**
                * @name dom
                * @memberof plat.ui.animations.IBaseAnimation
                * @kind property
                * @access public
                *
                * @type {plat.ui.IDom}
                *
                * @description
                * Contains DOM helper methods for manipulating this control's element.
                */
                dom: IDom;
                /**
                * @name options
                * @memberof plat.ui.animations.IBaseAnimation
                * @kind property
                * @access public
                *
                * @type {any}
                *
                * @description
                * Specified options for the animation.
                */
                options: any;
                /**
                * @name initialize
                * @memberof plat.ui.animations.IBaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function for initializing the animation or any of its properties before start.
                *
                * @returns {void}
                */
                initialize(): void;
                /**
                * @name start
                * @memberof plat.ui.animations.IBaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function denoting the start of the animation.
                *
                * @returns {void}
                */
                start(): void;
                /**
                * @name end
                * @memberof plat.ui.animations.IBaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to be called when the animation is over.
                *
                * @returns {void}
                */
                end(): void;
                /**
                * @name cancel
                * @memberof plat.ui.animations.IBaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to be called to let it be known the animation is being cancelled.
                *
                * @returns {void}
                */
                cancel(): void;
                /**
                * @name dispose
                * @memberof plat.ui.animations.IBaseAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function for reverting any modifications or changes that may have been made as a
                * result of this animation.
                *
                * @returns {void}
                */
                dispose(): void;
            }
            /**
            * @name CssAnimation
            * @memberof plat.ui.animations
            * @kind class
            *
            * @extends {plat.ui.animations.BaseAnimation}
            * @implements {plat.ui.animations.ICssAnimation}
            *
            * @description
            * A class representing a single CSS animation for a single element.
            */
            class CssAnimation extends BaseAnimation implements ICssAnimation {
                /**
                * @name __animationEvents
                * @memberof plat.ui.animations.CssAnimation
                * @kind property
                * @access public
                *
                * @type {plat.IAnimationEvents}
                *
                * @description
                * A set of browser compatible CSS animation events capable of being listened to.
                */
                private __animationEvents;
                /**
                * @name __subscribers
                * @memberof plat.ui.animations.CssAnimation
                * @kind property
                * @access public
                *
                * @type {Array<() => void>}
                *
                * @description
                * A collection of animation event subscriptions used for chaining.
                */
                private __subscribers;
                /**
                * @name __removeListener
                * @memberof plat.ui.animations.CssAnimation
                * @kind property
                * @access public
                *
                * @type {plat.IRemoveListener}
                *
                * @description
                * The function to stop listening to the current event/animation in occurrence.
                */
                private __removeListener;
                /**
                * @name dispose
                * @memberof plat.ui.animations.CssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function for reverting any modifications or changes that may have been made as a
                * result of this animation.
                *
                * @returns {void}
                */
                public dispose(): void;
                /**
                * @name animationStart
                * @memberof plat.ui.animations.CssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to listen to the start of an animation event.
                *
                * @param {() => void} listener The function to call when the animation begins.
                *
                * @returns {plat.ui.animations.ICssAnimation} This instance (for chaining).
                */
                public animationStart(listener: () => void): ICssAnimation;
                /**
                * @name transitionStart
                * @memberof plat.ui.animations.CssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to listen to the start of a transition event.
                *
                * @param {() => void} listener The function to call when the transition begins.
                *
                * @returns {plat.ui.animations.ICssAnimation} This instance (for chaining).
                */
                public transitionStart(listener: () => void): ICssAnimation;
                /**
                * @name animationEnd
                * @memberof plat.ui.animations.CssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to listen to the end of an animation event.
                *
                * @param {() => void} listener The function to call when the animation ends.
                *
                * @returns {plat.ui.animations.ICssAnimation} This instance (for chaining).
                */
                public animationEnd(listener: () => void): ICssAnimation;
                /**
                * @name animationEnd
                * @memberof plat.ui.animations.CssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to listen to the end of a transition event.
                *
                * @param {() => void} listener The function to call when the transition ends.
                *
                * @returns {plat.ui.animations.ICssAnimation} This instance (for chaining).
                */
                public transitionEnd(listener: () => void): ICssAnimation;
                /**
                * @name __addEventListener
                * @memberof plat.ui.animations.CssAnimation
                * @kind function
                * @access public
                *
                * @description
                * Adds the listener for the desired event and handles subscription management and
                * chaining.
                *
                * @param {string} event The event to subscribe to.
                * @param {() => void} listener The function to call when the event fires.
                *
                * @returns {plat.ui.animations.ICssAnimation} This instance (for chaining).
                */
                private __addEventListener(event, listener);
            }
            /**
            * @name ICssAnimation
            * @memberof plat.ui.animations
            * @kind interface
            *
            * @extends {plat.ui.animations.IBaseAnimation}
            *
            * @description
            * Describes an object representing a single CSS animation for a single element.
            */
            interface ICssAnimation extends IBaseAnimation {
                /**
                * @name animationStart
                * @memberof plat.ui.animations.ICssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to listen to the start of an animation event.
                *
                * @param {() => void} listener The function to call when the animation begins.
                *
                * @returns {plat.ui.animations.ICssAnimation} This instance (for chaining).
                */
                animationStart(listener: () => void): ICssAnimation;
                /**
                * @name transitionStart
                * @memberof plat.ui.animations.ICssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to listen to the start of a transition event.
                *
                * @param {() => void} listener The function to call when the transition begins.
                *
                * @returns {plat.ui.animations.ICssAnimation} This instance (for chaining).
                */
                transitionStart(listener: () => void): ICssAnimation;
                /**
                * @name animationEnd
                * @memberof plat.ui.animations.ICssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to listen to the end of an animation event.
                *
                * @param {() => void} listener The function to call when the animation ends.
                *
                * @returns {plat.ui.animations.ICssAnimation} This instance (for chaining).
                */
                animationEnd(listener: () => void): ICssAnimation;
                /**
                * @name animationEnd
                * @memberof plat.ui.animations.ICssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to listen to the end of a transition event.
                *
                * @param {() => void} listener The function to call when the transition ends.
                *
                * @returns {plat.ui.animations.ICssAnimation} This instance (for chaining).
                */
                transitionEnd(listener: () => void): ICssAnimation;
            }
            /**
            * @name JsAnimation
            * @memberof plat.ui.animations
            * @kind class
            *
            * @extends {plat.ui.animations.BaseAnimation}
            * @implements {plat.ui.animations.IJsAnimation}
            *
            * @description
            * A class for creating a single JavaScript animation for a single element.
            */
            class JsAnimation extends BaseAnimation implements IJsAnimation {
                /**
                * @name isJs
                * @memberof plat.ui.animations.JsAnimation
                * @kind property
                * @access public
                *
                * @type {boolean}
                *
                * @description
                * A flag specifying that this animation is a JavaScript implementation.
                */
                public isJs: boolean;
            }
            /**
            * @name IJsAnimation
            * @memberof plat.ui.animations
            * @kind interface
            *
            * @extends {plat.ui.animations.IBaseAnimation}
            *
            * @description
            * Describes an object representing a single JavaScript animation for a single element.
            */
            interface IJsAnimation extends IBaseAnimation {
                /**
                * @name isJs
                * @memberof plat.ui.animations.IJsAnimation
                * @kind property
                * @access public
                *
                * @type {boolean}
                *
                * @description
                * A flag specifying that this animation is a JavaScript implementation.
                */
                isJs: boolean;
            }
            /**
            * @name SimpleCssAnimation
            * @memberof plat.ui.animations
            * @kind class
            *
            * @extends {plat.ui.animations.CssAnimation}
            * @implements {plat.ui.animations.ISimpleCssAnimation}
            *
            * @description
            * A simple CSS Animation class that places the 'plat-animation' class on an
            * element, checks for animation properties, and waits for the animation to end.
            */
            class SimpleCssAnimation extends CssAnimation implements ISimpleCssAnimation {
                /**
                * @name $Window
                * @memberof plat.ui.animations.SimpleCssAnimation
                * @kind property
                * @access public
                *
                * @type {Window}
                *
                * @description
                * Reference to the Window injectable.
                */
                public $Window: Window;
                /**
                * @name className
                * @memberof plat.ui.animations.SimpleCssAnimation
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The class name added to the animated element.
                */
                public className: string;
                /**
                * @name initialize
                * @memberof plat.ui.animations.SimpleCssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function denoting the start of the animation.
                *
                * @returns {void}
                */
                public start(): void;
                /**
                * @name cancel
                * @memberof plat.ui.animations.SimpleCssAnimation
                * @kind function
                * @access public
                *
                * @description
                * A function to be called to let it be known the animation is being cancelled.
                *
                * @returns {void}
                */
                public cancel(): void;
            }
            /**
            * @name ISimpleCssAnimation
            * @memberof plat.ui.animations
            * @kind interface
            *
            * @extends {plat.ui.animations.ICssAnimation}
            *
            * @description
            * An interface for extending the {@link plat.ui.animations.SimpleCssAnimation|SimpleCssAnimation}
            * or {@link plat.ui.animations.SimpleCssTransition|SimpleCssTransition} and allowing for
            * custom class names to initiate animations or transitions.
            */
            interface ISimpleCssAnimation extends ICssAnimation {
                /**
                * @name className
                * @memberof plat.ui.animations.ISimpleCssAnimation
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The class name added to the animated element.
                */
                className: string;
            }
            /**
            * @name FadeIn
            * @memberof plat.ui.animations
            * @kind class
            *
            * @extends {plat.ui.animations.SimpleCssAnimation}
            *
            * @description
            * An animation control that fades in an element as defined by the included CSS.
            */
            class FadeIn extends SimpleCssAnimation {
                /**
                * @name className
                * @memberof plat.ui.animations.FadeIn
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The class name added to the element fading in.
                */
                public className: string;
            }
            /**
            * @name FadeOut
            * @memberof plat.ui.animations
            * @kind class
            *
            * @extends {plat.ui.animations.SimpleCssAnimation}
            *
            * @description
            * An animation control that fades out an element as defined by the included CSS.
            */
            class FadeOut extends SimpleCssAnimation {
                /**
                * @name className
                * @memberof plat.ui.animations.FadeOut
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The class name added to the element fading out.
                */
                public className: string;
            }
            /**
            * @name Enter
            * @memberof plat.ui.animations
            * @kind class
            *
            * @extends {plat.ui.animations.SimpleCssAnimation}
            *
            * @description
            * An animation control that causes an element to enter as defined by the included CSS.
            */
            class Enter extends SimpleCssAnimation {
                /**
                * @name className
                * @memberof plat.ui.animations.Enter
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The class name added to the entering element.
                */
                public className: string;
            }
            /**
            * @name Leave
            * @memberof plat.ui.animations
            * @kind class
            *
            * @extends {plat.ui.animations.SimpleCssAnimation}
            *
            * @description
            * An animation control that causes an element to leave as defined by the included CSS.
            */
            class Leave extends SimpleCssAnimation {
                /**
                * @name className
                * @memberof plat.ui.animations.Leave
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The class name added to the leaving element.
                */
                public className: string;
            }
            /**
            * @name SimpleCssAnimation
            * @memberof plat.ui.animations
            * @kind class
            *
            * @extends {plat.ui.animations.CssAnimation}
            * @implements {plat.ui.animations.ISimpleCssTransition}
            *
            * @description
            * A simple CSS Animation class that places the 'plat-transition' class on an
            * element, checks for transition properties, and waits for the transition to end.
            */
            class SimpleCssTransition extends CssAnimation implements ISimpleCssTransition {
                /**
                * @name $Window
                * @memberof plat.ui.animations.SimpleCssTransition
                * @kind property
                * @access public
                *
                * @type {Window}
                *
                * @description
                * Reference to the Window injectable.
                */
                public $Window: Window;
                /**
                * @name options
                * @memberof plat.ui.animations.SimpleCssTransition
                * @kind property
                * @access public
                *
                * @type {plat.IObject<string>}
                *
                * @description
                * A JavaScript object with key value pairs for adjusting transition values.
                * (e.g. { width: '800px' } would set the element's width to 800px.
                */
                public options: IObject<string>;
                /**
                * @name className
                * @memberof plat.ui.animations.SimpleCssTransition
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The class name added to the animated element.
                */
                public className: string;
                /**
                * @name initialize
                * @memberof plat.ui.animations.SimpleCssTransition
                * @kind function
                * @access public
                *
                * @description
                * A function denoting the start of the animation.
                *
                * @returns {void}
                */
                public start(): void;
                /**
                * @name cancel
                * @memberof plat.ui.animations.SimpleCssTransition
                * @kind function
                * @access public
                *
                * @description
                * A function to be called to let it be known the animation is being cancelled.
                *
                * @returns {void}
                */
                public cancel(): void;
                /**
                * @name _animate
                * @memberof plat.ui.animations.SimpleCssTransition
                * @kind function
                * @access protected
                *
                * @description
                * Animate the element based on the options passed in.
                *
                * @returns {boolean} Whether or not the element is going to animate with the options passed in.
                * If false, the control should begin cleaning up.
                */
                public _animate(): boolean;
            }
            /**
            * @name ISimpleCssTransition
            * @memberof plat.ui.animations
            * @kind interface
            *
            * @extends {plat.ui.animations.ISimpleCssAnimation}
            *
            * @description
            * An object that allows for transitioned changes to an Element's style based on
            * options passed in.
            */
            interface ISimpleCssTransition extends ISimpleCssAnimation {
                /**
                * @name options
                * @memberof plat.ui.animations.ISimpleCssTransition
                * @kind property
                * @access public
                *
                * @type {plat.IObject<string>}
                *
                * @description
                * A JavaScript object with key value pairs for adjusting transition values.
                * (e.g. { width: '800px' } would set the element's width to 800px.
                */
                options: IObject<string>;
            }
        }
        module controls {
            /**
            * @name Baseport
            * @memberof plat.ui.controls
            * @kind class
            *
            * @extends {plat.ui.TemplateControl}
            * @implements {plat.ui.controls.IBaseport}
            *
            * @description
            * A {@link plat.ui.TemplateControl|TemplateControl} that acts as a base for all
            * controls that can interchangeably swap out {@link plat.ui.IBaseViewControl|IBaseViewControls}.
            */
            class Baseport extends TemplateControl implements IBaseport {
                /**
                * @name $ManagerCache
                * @memberof plat.ui.controls.Baseport
                * @kind property
                * @access public
                *
                * @type {plat.storage.ICache<plat.processing.IElementManager>}
                *
                * @description
                * Reference to an injectable that caches {@link plat.processing.IElementManager|IElementManagers}.
                */
                public $ManagerCache: storage.ICache<processing.IElementManager>;
                /**
                * @name $Document
                * @memberof plat.ui.controls.Baseport
                * @kind property
                * @access public
                *
                * @type {Document}
                *
                * @description
                * Reference to the Document injectable.
                */
                public $Document: Document;
                /**
                * @name $ElementManagerFactory
                * @memberof plat.ui.controls.Baseport
                * @kind property
                * @access public
                *
                * @type {plat.processing.IElementManagerFactory}
                *
                * @description
                * Reference to the {@link plat.processing.IElementManagerFactory|IElementManagerFactory} injectable.
                */
                public $ElementManagerFactory: processing.IElementManagerFactory;
                /**
                * @name $Animator
                * @memberof plat.ui.controls.Baseport
                * @kind property
                * @access public
                *
                * @type {plat.ui.animations.IAnimator}
                *
                * @description
                * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
                */
                public $Animator: animations.IAnimator;
                /**
                * @name $Promise
                * @memberof plat.ui.controls.Baseport
                * @kind property
                * @access public
                *
                * @type {plat.async.IPromise}
                *
                * @description
                * Reference to the {@link plat.async.IPromise|IPromise} injectable.
                */
                public $Promise: async.IPromise;
                /**
                * @name navigator
                * @memberof plat.ui.controls.Baseport
                * @kind property
                * @access public
                *
                * @type {plat.navigation.IBaseNavigator}
                *
                * @description
                * The navigator used for navigating between {@link plat.ui.IBaseViewControl|IBaseViewControls}.
                */
                public navigator: navigation.IBaseNavigator;
                /**
                * @name constructor
                * @memberof plat.ui.controls.Baseport
                * @kind function
                * @access public
                *
                * @description
                * The constructor for a {@link plat.ui.controls.Baseport|Baseport}.
                *
                * @param {plat.navigation.IBaseNavigator} navigator The navigator used for navigating between
                * {@link plat.ui.IBaseViewControl|IBaseViewControls}.
                *
                * @returns {plat.ui.controls.Baseport} A {@link plat.ui.controls.Baseport|Baseport} instance.
                */
                constructor(navigator: navigation.IBaseNavigator);
                /**
                * @name setTemplate
                * @memberof plat.ui.controls.Baseport
                * @kind function
                * @access public
                *
                * @description
                * Clears the control element's innerHTML.
                *
                * @returns {void}
                */
                public setTemplate(): void;
                /**
                * @name dispose
                * @memberof plat.ui.controls.Baseport
                * @kind function
                * @access public
                *
                * @description
                * Clean up any memory being held.
                *
                * @returns {void}
                */
                public dispose(): void;
                /**
                * @name navigateTo
                * @memberof plat.ui.controls.Baseport
                * @kind function
                * @access public
                *
                * @description
                * Grabs the root of this control's manager
                * tree, clears it, and initializes the
                * creation of a new one by kicking off a
                * navigate.
                *
                * @param {plat.ui.controls.IBaseportNavigateToOptions} ev The navigation options.
                *
                * @returns {void}
                */
                public navigateTo(ev: IBaseportNavigateToOptions): void;
                /**
                * @name navigateFrom
                * @memberof plat.ui.controls.Baseport
                * @kind function
                * @access public
                *
                * @description
                * Manages the navigatingFrom lifecycle event for
                * {@link plat.ui.IBaseViewControl|IBaseViewControls}.
                *
                * @param {plat.ui.IBaseViewControl} fromControl The {@link plat.ui.IBaseViewControl|IBaseViewControl}
                * being navigated away from.
                *
                * @returns {plat.async.IThenable<void>} A promise that resolves when the current view is done animating
                * away.
                */
                public navigateFrom(fromControl: IBaseViewControl): async.IThenable<void>;
                /**
                * @name _load
                * @memberof plat.ui.controls.Baseport
                * @kind function
                * @access protected
                *
                * @description
                * Initializes the navigator.
                *
                * @param {any} navigationParameter? A parameter needed
                * to perform the specified type of navigation.
                * @param {plat.navigation.IBaseNavigationOptions} options? The options
                * needed on load for the inherited form of navigation.
                *
                * @returns {void}
                */
                public _load(navigationParameter?: any, options?: navigation.IBaseNavigationOptions): void;
            }
            /**
            * @name IBaseport
            * @memberof plat.ui.controls
            * @kind interface
            *
            * @extends {plat.ui.ITemplateControl}
            *
            * @description
            * Describes an object that acts as a base for all controls that can interchangeably
            * swap out {@link plat.ui.IBaseViewControl|IBaseViewControls}.
            */
            interface IBaseport extends ITemplateControl {
                /**
                * @name navigator
                * @memberof plat.ui.controls.IBaseport
                * @kind property
                * @access public
                *
                * @type {plat.navigation.IBaseNavigator}
                *
                * @description
                * The navigator used for navigating between {@link plat.ui.IBaseViewControl|IBaseViewControls}.
                */
                navigator: navigation.IBaseNavigator;
                /**
                * @name navigateTo
                * @memberof plat.ui.controls.IBaseport
                * @kind function
                * @access public
                *
                * @description
                * Grabs the root of this control's manager
                * tree, clears it, and initializes the
                * creation of a new one by kicking off a
                * navigate.
                *
                * @param {plat.ui.controls.IBaseportNavigateToOptions} ev The navigation options.
                *
                * @returns {void}
                */
                navigateTo(ev: IBaseportNavigateToOptions): void;
                /**
                * @name navigateFrom
                * @memberof plat.ui.controls.IBaseport
                * @kind function
                * @access public
                *
                * @description
                * Manages the navigatingFrom lifecycle event for
                * {@link plat.ui.IBaseViewControl|IBaseViewControls}.
                *
                * @param {plat.ui.IBaseViewControl} fromControl The {@link plat.ui.IBaseViewControl|IBaseViewControl}
                * being navigated away from.
                *
                * @returns {plat.async.IThenable<void>} A promise that resolves when the current view is done animating
                * away.
                */
                navigateFrom(fromControl: IBaseViewControl): async.IThenable<void>;
            }
            /**
            * @name IBaseportNavigateToOptions
            * @memberof plat.ui.controls
            * @kind interface
            *
            * @description
            * Navigation options for a {@link plat.ui.controls.Baseport|Baseport} and all
            * controls that inherit from {@link plat.ui.controls.Baseport|Baseport}.
            */
            interface IBaseportNavigateToOptions {
                /**
                * @name target
                * @memberof plat.ui.controls.IBaseportNavigateToOptions
                * @kind property
                * @access public
                *
                * @type {any}
                *
                * @description
                * Either an {@link plat.ui.IBaseViewControl|IBaseViewControls} or an injector for an
                * {@link plat.ui.IBaseViewControl|IBaseViewControls} to be used.
                */
                target: any;
                /**
                * @name parameter
                * @memberof plat.ui.controls.IBaseportNavigateToOptions
                * @kind property
                * @access public
                *
                * @type {any}
                *
                * @description
                * The navigation parameter.
                */
                parameter: any;
                /**
                * @name parameter
                * @memberof plat.ui.controls.IBaseportNavigateToOptions
                * @kind property
                * @access public
                *
                * @type {plat.navigation.IBaseNavigationOptions}
                *
                * @description
                * The options used for navigation.
                */
                options: navigation.IBaseNavigationOptions;
                /**
                * @name type
                * @memberof plat.ui.controls.IBaseportNavigateToOptions
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The type of {@link plat.ui.IBaseViewControl|IBaseViewControls} to navigate to.
                */
                type: string;
            }
            /**
            * @name Viewport
            * @memberof plat.ui.controls
            * @kind class
            *
            * @extends {plat.ui.controls.Baseport}
            *
            * @description
            * A {@link plat.ui.TemplateControl|TemplateControl} that can interchangeably swap out
            * {@link plat.ui.IViewControl|IViewControls}.
            */
            class Viewport extends Baseport {
                /**
                * @name options
                * @memberof plat.ui.controls.Viewport
                * @kind property
                * @access public
                *
                * @type {plat.observable.IObservableProperty<plat.ui.controls.IViewportOptions>}
                *
                * @description
                * The evaluated {@link plat.controls.Options|plat-options} object.
                */
                public options: observable.IObservableProperty<IViewportOptions>;
                /**
                * @name navigator
                * @memberof plat.ui.controls.Viewport
                * @kind property
                * @access public
                *
                * @type {plat.navigation.INavigatorInstance}
                *
                * @description
                * A type of navigator that uses either the {@link plat.ui.ViewControl|ViewControl's}
                * Constructors or their registered names for navigation
                * from one to another.
                */
                public navigator: navigation.INavigatorInstance;
                /**
                * @name _load
                * @memberof plat.ui.controls.Viewport
                * @kind function
                * @access protected
                *
                * @description
                * Checks for a default view, finds the {@link plat.ui.ViewControl|ViewControl's} injector,
                * and initializes the loading of the view.
                *
                * @returns {void}
                */
                public _load(): void;
            }
            /**
            * @name IViewportOptions
            * @memberof plat.ui.controls
            * @kind interface
            *
            * @description
            * The available options for a {@link plat.ui.controls.Viewport|Viewport}.
            */
            interface IViewportOptions {
                /**
                * @name defaultView
                * @memberof plat.ui.controls.IViewportOptions
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The registered name of the default
                * {@link plat.ui.IViewControl|IViewControl} to initially navigate to.
                */
                defaultView: string;
            }
            /**
            * @name Routeport
            * @memberof plat.ui.controls
            * @kind class
            *
            * @extends {plat.ui.controls.Baseport}
            *
            * @description
            * A {@link plat.ui.TemplateControl|TemplateControl} that can interchangeably swap out
            * {@link plat.ui.IWebViewControl|IWebViewControls} based on their defined routes.
            */
            class Routeport extends Baseport {
                /**
                * @name options
                * @memberof plat.ui.controls.Routeport
                * @kind property
                * @access public
                *
                * @type {plat.observable.IObservableProperty<plat.ui.controls.IRouteportOptions>}
                *
                * @description
                * The evaluated {@link plat.controls.Options|plat-options} object.
                */
                public options: observable.IObservableProperty<IRouteportOptions>;
                /**
                * @name navigator
                * @memberof plat.ui.controls.Routeport
                * @kind property
                * @access public
                *
                * @type {plat.navigation.IRoutingNavigator}
                *
                * @description
                * A type of navigator that uses the registered routes
                * for {@link plat.ui.IWebViewControl|IWebViewControls} to navigate to and from one another.
                */
                public navigator: navigation.IRoutingNavigator;
                /**
                * @name _load
                * @memberof plat.ui.controls.Routeport
                * @kind function
                * @access protected
                *
                * @description
                * Looks for a default route and initializes the loading
                * of the view.
                *
                * @returns {void}
                */
                public _load(): void;
            }
            /**
            * @name IRouteportOptions
            * @memberof plat.ui.controls
            * @kind interface
            *
            * @description
            * The available options for a {@link plat.ui.controls.Routeport|Routeport}.
            */
            interface IRouteportOptions {
                /**
                * @name defaultRoute
                * @memberof plat.ui.controls.IRouteportOptions
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The registered route of the default
                * {@link plat.ui.IWebViewControl|IWebViewControl} to initially navigate to.
                */
                defaultRoute: string;
            }
            /**
            * @name Template
            * @memberof plat.ui.controls
            * @kind class
            *
            * @extends {plat.ui.TemplateControl}
            *
            * @description
            * A {@link plat.ui.TemplateControl|TemplateControl} for easily reusing a
            * defined HTML template.
            */
            class Template extends TemplateControl {
                /**
                * @name $Promise
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access public
                *
                * @type {plat.async.IPromise}
                *
                * @description
                * Reference to the {@link plat.async.IPromise|IPromise} injectable.
                */
                public $Promise: async.IPromise;
                /**
                * @name $TemplateCache
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access public
                *
                * @type {plat.storage.ITemplateCache}
                *
                * @description
                * Reference to an injectable for storing HTML templates.
                */
                public $TemplateCache: storage.ITemplateCache;
                /**
                * @name $Document
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access public
                *
                * @type {Document}
                *
                * @description
                * Reference to the Document injectable.
                */
                public $Document: Document;
                /**
                * @name replaceWith
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * Removes the <plat-template> node from the DOM
                */
                public replaceWith: string;
                /**
                * @name options
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access public
                *
                * @type {plat.observable.IObservableProperty<plat.ui.controls.ITemplateOptions>}
                *
                * @description
                * The evaluated {@link plat.controls.Options|plat-options} object.
                */
                public options: observable.IObservableProperty<ITemplateOptions>;
                /**
                * @name _id
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access protected
                *
                * @type {string}
                *
                * @description
                * The unique ID used to reference a particular
                * template.
                */
                public _id: string;
                /**
                * @name _url
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access protected
                *
                * @type {string}
                *
                * @description
                * The optional URL associated with this
                * particular template.
                */
                public _url: string;
                /**
                * @name __isFirst
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access private
                *
                * @type {string}
                *
                * @description
                * Whether or not this is the first instance of the control,
                * specifying that it defines the template to copy.
                */
                private __isFirst;
                /**
                * @name __templatePromise
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access private
                *
                * @type {plat.async.IThenable<plat.ui.controls.Template>}
                *
                * @description
                * A promise that resolves when the template is retrieved and ready.
                */
                private __templatePromise;
                /**
                * @name __templateControlCache
                * @memberof plat.ui.controls.Template
                * @kind property
                * @access private
                *
                * @type {plat.storage.ICache<any>}
                *
                * @description
                * HTML template storage for all instances of this control.
                */
                private __templateControlCache;
                /**
                * @name constructor
                * @memberof plat.ui.controls.Template
                * @kind function
                * @access public
                *
                * @description
                * The constructor for a {@link plat.ui.controls.Template|Template}. Creates the control cache.
                *
                * @returns {plat.ui.controls.Template} A {@link plat.ui.controls.Template|Template} instance.
                */
                constructor();
                /**
                * @name initialize
                * @memberof plat.ui.controls.Template
                * @kind function
                * @access public
                *
                * @description
                * Initializes the creation of the template.
                *
                * @returns {void}
                */
                public initialize(): void;
                /**
                * @name loaded
                * @memberof plat.ui.controls.Template
                * @kind function
                * @access public
                *
                * @description
                * Decides if this is a template definition or
                * a template instance.
                *
                * @returns {void}
                */
                public loaded(): void;
                /**
                * @name dispose
                * @memberof plat.ui.controls.Template
                * @kind function
                * @access public
                *
                * @description
                * Removes the template from the template cache.
                *
                * @returns {void}
                */
                public dispose(): void;
                /**
                * @name _initializeTemplate
                * @memberof plat.ui.controls.Template
                * @kind function
                * @access protected
                *
                * @description
                * Determines whether a URL or innerHTML is being used,
                * creates the bindable template, and stores the template
                * in a template cache for later use.
                *
                * @returns {void}
                */
                public _initializeTemplate(): void;
                /**
                * @name _waitForTemplateControl
                * @memberof plat.ui.controls.Template
                * @kind function
                * @access protected
                *
                * @description
                * Waits for the template promise to resolve, then initializes
                * the binding of the bindable template and places it into the
                * DOM.
                *
                * @param {plat.async.IThenable<plat.ui.controls.Template>} templatePromise The promise
                * associated with the first instance of the control with this ID.
                *
                * @returns {void}
                */
                public _waitForTemplateControl(templatePromise: async.IThenable<Template>): void;
                /**
                * @name __mapBindableTemplates
                * @memberof plat.ui.controls.Template
                * @kind function
                * @access private
                *
                * @description
                * Maps the bindable templates cache and html templates of the first
                * control with the proper ID to this control's bindable templates.
                *
                * @param {plat.ui.controls.Template} control The first of the controls
                * with this corresponding ID that defined the HTML template to reuse.
                *
                * @returns {void}
                */
                private __mapBindableTemplates(control);
            }
            /**
            * @name ITemplateOptions
            * @memberof plat.ui.controls
            * @kind interface
            *
            * @description
            * The available {@link plat.controls.Options|options} for the {@link plat.ui.controls.Template|Template} control.
            */
            interface ITemplateOptions {
                /**
                * @name id
                * @memberof plat.ui.controls.ITemplateOptions
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The unique ID used to label a template
                * and use it as DOM.
                */
                id: string;
                /**
                * @name templateUrl
                * @memberof plat.ui.controls.ITemplateOptions
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * An optional URL to specify a template
                * instead of using the element's innerHTML.
                */
                templateUrl: string;
            }
            /**
            * @name Ignore
            * @memberof plat.ui.controls
            * @kind class
            *
            * @extends {plat.ui.TemplateControl}
            *
            * @description
            * A {@link plat.ui.TemplateControl|TemplateControl} for inner HTML that contains controls
            * and/or markup and not having it bind or evaluate.
            */
            class Ignore extends TemplateControl {
                /**
                * @name setTemplate
                * @memberof plat.ui.controls.Ignore
                * @kind function
                * @access public
                *
                * @description
                * Removes the innerHTML from the DOM and saves it.
                *
                * @returns {void}
                */
                public setTemplate(): void;
                /**
                * @name loaded
                * @memberof plat.ui.controls.Ignore
                * @kind function
                * @access public
                *
                * @description
                * Places the saved innerHTML back into the DOM.
                *
                * @returns {void}
                */
                public loaded(): void;
            }
            /**
            * @name ForEach
            * @memberof plat.ui.controls
            * @kind class
            *
            * @extends {plat.ui.TemplateControl}
            *
            * @description
            * A {@link plat.ui.TemplateControl|TemplateControl} for repeating a block of
            * DOM nodes bound to an array.
            */
            class ForEach extends TemplateControl {
                /**
                * @name $Animator
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access public
                *
                * @type {plat.ui.animations.IAnimator}
                *
                * @description
                * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
                */
                public $Animator: animations.IAnimator;
                /**
                * @name $Promise
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access public
                *
                * @type {plat.async.IPromise}
                *
                * @description
                * Reference to the {@link plat.async.IPromise|IPromise} injectable.
                */
                public $Promise: async.IPromise;
                /**
                * @name context
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access public
                *
                * @type {Array<any>}
                *
                * @description
                * The required context of the control (must be of type Array).
                */
                public context: any[];
                /**
                * @name priority
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access public
                *
                * @type {number}
                *
                * @description
                * The load priority of the control (needs to load before a {@link plat.controls.Bind|Bind} control).
                */
                public priority: number;
                /**
                * @name controls
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access public
                *
                * @type {Array<plat.ui.ITemplateControl>}
                *
                * @description
                * The child controls of the control. All will be of type {@link plat.ui.ITemplateControl|ITemplateControl}.
                */
                public controls: ITemplateControl[];
                /**
                * @name itemsLoaded
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access public
                *
                * @type {plat.async.IThenable<void>}
                *
                * @description
                * A Promise that fulfills when the items are loaded.
                */
                public itemsLoaded: async.IThenable<void>;
                /**
                * @name _blockLength
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access protected
                *
                * @type {number}
                *
                * @description
                * The node length of the element's childNodes (innerHTML).
                */
                public _blockLength: number;
                /**
                * @name __removeListener
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access private
                *
                * @type {plat.IRemoveListener}
                *
                * @description
                * A function to stop listening for array (context) mutations.
                */
                private __removeListener;
                /**
                * @name __currentAnimations
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access private
                *
                * @type {Array<plat.ui.animations.IAnimationThenable<void>>}
                *
                * @description
                * An array to aggregate all current animation promises.
                */
                private __currentAnimations;
                /**
                * @name __resolveFn
                * @memberof plat.ui.controls.ForEach
                * @kind property
                * @access private
                *
                * @type {() => void}
                *
                * @description
                * The resolve function for the itemsLoaded promise.
                */
                private __resolveFn;
                /**
                * @name constructor
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access public
                *
                * @description
                * The constructor for a {@link plat.ui.controls.ForEach|ForEach}. Creates the itemsLoaded promise.
                *
                * @returns {plat.ui.controls.ForEach} A {@link plat.ui.controls.ForEach|ForEach} instance.
                */
                constructor();
                /**
                * @name setTemplate
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access public
                *
                * @description
                * Creates a bindable template with the control element's childNodes (innerHTML).
                *
                * @returns {void}
                */
                public setTemplate(): void;
                /**
                * @name contextChanged
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access public
                *
                * @description
                * Re-syncs the ForEach children controls and DOM with the new
                * array.
                *
                * @param {Array<any>} newValue? The new Array
                * @param {Array<any>} oldValue? The old Array
                *
                * @returns {void}
                */
                public contextChanged(newValue?: any[], oldValue?: any[]): void;
                /**
                * @name loaded
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access public
                *
                * @description
                * Observes the Array context for changes and adds initial items to the DOM.
                *
                * @returns {void}
                */
                public loaded(): void;
                /**
                * @name dispose
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access public
                *
                * @description
                * Removes the Array context mutation listener
                *
                * @returns {void}
                */
                public dispose(): void;
                /**
                * @name _addItem
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Adds an item to the control's element.
                *
                * @param {DocumentFragment} item The HTML fragment representing a single item
                * @param {boolean} animate? Whether or not to animate the entering item
                *
                * @returns {void}
                */
                public _addItem(item: DocumentFragment, animate?: boolean): void;
                /**
                * @name _removeItem
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Removes an item from the control's element.
                *
                * @returns {void}
                */
                public _removeItem(): void;
                /**
                * @name _updateResources
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Updates the control's children resource objects when
                * the array changes.
                *
                * @returns {void}
                */
                public _updateResources(): void;
                /**
                * @name _setListener
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Sets a listener for the changes to the array.
                *
                * @returns {void}
                */
                public _setListener(): void;
                /**
                * @name _executeEvent
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Receives an event when a method has been called on an array and maps the array
                * method to its associated method handler.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                *
                * @returns {void}
                */
                public _executeEvent(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _addItems
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Adds new items to the control's element when items are added to
                * the array.
                *
                * @param {number} numberOfItems The number of items to add.
                * @param {number} index The point in the array to start adding items.
                * @param {boolean} animate? Whether or not to animate the new items
                *
                * @returns {plat.async.IThenable<void>} The itemsLoaded promise.
                */
                public _addItems(numberOfItems: number, index: number, animate?: boolean): async.IThenable<void>;
                /**
                * @name _removeItems
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Removes items from the control's element.
                *
                * @param {number} numberOfItems The number of items to remove.
                *
                * @returns {void}
                */
                public _removeItems(numberOfItems: number): void;
                /**
                * @name _getAliases
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Returns a resource alias object for an item in the array. The
                * resource object contains index:number, even:boolean, odd:boolean,
                * first:boolean, and last:boolean.
                *
                * @param {number} index The index used to create the resource aliases.
                *
                * @returns {plat.IObject<plat.ui.IResource>} An object consisting of {@link plat.ui.IResource|IResources}.
                */
                public _getAliases(index: number): IObject<IResource>;
                /**
                * @name _push
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Handles items being pushed into the array.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                *
                * @returns {void}
                */
                public _push(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _pop
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Handles items being popped off the array.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                *
                * @returns {void}
                */
                public _pop(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _shift
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Handles items being shifted off the array.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                *
                * @returns {void}
                */
                public _shift(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _splice
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Handles adding/removing items when an array is spliced.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                *
                * @returns {void}
                */
                public _splice(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _unshift
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Handles items being unshifted into the array.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                *
                * @returns {void}
                */
                public _unshift(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _sort
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Handles when the array is sorted.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                *
                * @returns {void}
                */
                public _sort(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _reverse
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Handles when the array is reversed.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                *
                * @returns {void}
                */
                public _reverse(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _animateItems
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access protected
                *
                * @description
                * Animates a block of elements.
                *
                * @param {number} startNode The starting childNode of the ForEach to animate
                * @param {number} endNode The ending childNode of the ForEach to animate
                * @param {string} key The animation key/type
                * @param {boolean} cancel? Whether or not the animation should cancel all current animations.
                * Defaults to true.
                *
                * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves when all animations are complete.
                */
                public _animateItems(startNode: number, endNode: number, key: string, cancel?: boolean): animations.IAnimationThenable<void>;
                /**
                * @name __handleAnimation
                * @memberof plat.ui.controls.ForEach
                * @kind function
                * @access private
                *
                * @description
                * Handles the animation of a block of elements.
                *
                * @param {number} startNode The starting childNode of the ForEach to animate
                * @param {number} endNode The ending childNode of the ForEach to animate
                * @param {string} key The animation key/type
                *
                * @returns {plat.ui.animations.IAnimationThenable<void>} The last element node's animation promise.
                */
                private __handleAnimation(startNode, endNode, key);
            }
            /**
            * @name Html
            * @memberof plat.ui.controls
            * @kind class
            *
            * @extends {plat.ui.TemplateControl}
            *
            * @description
            * A {@link plat.ui.TemplateControl|TemplateControl} for adding HTML to the
            * DOM through bound context strings.
            */
            class Html extends TemplateControl {
                /**
                * @name contextChanged
                * @memberof plat.ui.controls.Html
                * @kind function
                * @access public
                *
                * @description
                * Loads the DOM with the new HTML String.
                *
                * @returns {void}
                */
                public contextChanged(): void;
                /**
                * @name loaded
                * @memberof plat.ui.controls.Html
                * @kind function
                * @access public
                *
                * @description
                * Loads the context string as the innerHTML of the element.
                *
                * @returns {void}
                */
                public loaded(): void;
            }
            /**
            * @name Select
            * @memberof plat.ui.controls
            * @kind class
            *
            * @extends {plat.ui.TemplateControl}
            *
            * @description
            * A {@link plat.ui.TemplateControl|TemplateControl} for binding an HTML select element
            * to an Array context.
            */
            class Select extends TemplateControl {
                /**
                * @name $Promise
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access public
                *
                * @type {plat.async.IPromise}
                *
                * @description
                * Reference to the {@link plat.async.IPromise|IPromise} injectable.
                */
                public $Promise: async.IPromise;
                /**
                * @name $Document
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access public
                *
                * @type {Document}
                *
                * @description
                * Reference to the Document injectable.
                */
                public $Document: Document;
                /**
                * @name replaceWith
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * Replaces the <plat-select> node with
                * a <select> node.
                */
                public replaceWith: string;
                /**
                * @name priority
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access public
                *
                * @type {number}
                *
                * @description
                * The load priority of the control (needs to load before a {@link plat.controls.Bind|Bind} control).
                */
                public priority: number;
                /**
                * @name context
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access public
                *
                * @type {Array<any>}
                *
                * @description
                * The required context of the control (must be of type Array).
                */
                public context: any[];
                /**
                * @name groups
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access public
                *
                * @type {plat.IObject<Element>}
                *
                * @description
                * An object that keeps track of unique
                * optgroups.
                */
                public groups: IObject<Element>;
                /**
                * @name options
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access public
                *
                * @type {plat.observable.IObservableProperty<plat.ui.controls.ISelectOptions>}
                *
                * @description
                * The evaluated {@link plat.controls.Options|plat-options} object.
                */
                public options: observable.IObservableProperty<ISelectOptions>;
                /**
                * @name itemsLoaded
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access public
                *
                * @type {plat.async.IThenable<void>}
                *
                * @description
                * A Promise that will fulfill whenever all items are loaded.
                */
                public itemsLoaded: async.IThenable<void>;
                /**
                * @name __removeListener
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access private
                *
                * @type {plat.IRemoveListener}
                *
                * @description
                * A function to stop listening to Array context mutations.
                */
                private __removeListener;
                /**
                * @name __isGrouped
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access private
                *
                * @type {boolean}
                *
                * @description
                * Whether or not the select is grouped.
                */
                private __isGrouped;
                /**
                * @name __isNativeSelect
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access private
                *
                * @type {boolean}
                *
                * @description
                * Whether or not the select should be treated as a
                * native (unbound) select element.
                */
                private __isNativeSelect;
                /**
                * @name __group
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access private
                *
                * @type {string}
                *
                * @description
                * The property used to group the objects.
                */
                private __group;
                /**
                * @name __defaultOption
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access private
                *
                * @type {HTMLOptionElement}
                *
                * @description
                * An optional default option specified in the control element's
                * innerHTML.
                */
                private __defaultOption;
                /**
                * @name __resolveFn
                * @memberof plat.ui.controls.Select
                * @kind property
                * @access private
                *
                * @type {() => void}
                *
                * @description
                * The function to resolve the itemsLoaded promise.
                */
                private __resolveFn;
                /**
                * @name constructor
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access public
                *
                * @description
                * The constructor for a {@link plat.ui.controls.Select|Select}. Creates the itemsLoaded promise.
                *
                * @returns {plat.ui.controls.Select} A {@link plat.ui.controls.Select|Select} instance.
                */
                constructor();
                /**
                * @name setTemplate
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access public
                *
                * @description
                * Creates the bindable option template and grouping
                * template if necessary.
                *
                * @returns {void}
                */
                public setTemplate(): void;
                /**
                * @name contextChanged
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access public
                *
                * @description
                * Re-observes the new array context and modifies
                * the options accordingly.
                *
                * @param {Array<any>} newValue? The new array context.
                * @param {Array<any>} oldValue? The old array context.
                *
                * @returns {void}
                */
                public contextChanged(newValue?: any[], oldValue?: any[]): void;
                /**
                * @name loaded
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access public
                *
                * @description
                * Observes the new array context and adds
                * the options accordingly.
                *
                * @returns {void}
                */
                public loaded(): void;
                /**
                * @name dispose
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access public
                *
                * @description
                * Stops observing the array context.
                *
                * @returns {void}
                */
                public dispose(): void;
                /**
                * @name _addItems
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * Adds the options to the select element.
                *
                * @param {number} numberOfItems The number of items to add.
                * @param {number} length The current index of the next
                * set of items to add.
                *
                * @returns {plat.async.IThenable<void>} The itemsLoaded promise.
                */
                public _addItems(numberOfItems: number, length: number): async.IThenable<void>;
                /**
                * @name _insertOptions
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * The callback used to add an option after
                * its template has been bound.
                *
                * @param {number} index The current index of the item being added.
                * @param {any} item The item being added.
                * @param {DocumentFragment} optionClone The bound DocumentFragment to be
                * inserted into the DOM.
                *
                * @returns {plat.async.IThenable<void>} A promise that resolves when the option
                * or optgroup has successfully be inserted.
                */
                public _insertOptions(index: number, item: any, optionClone: DocumentFragment): async.IThenable<any>;
                /**
                * @name _removeItem
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * Removes the specified option item from the DOM.
                *
                * @param {number} index The control index to remove.
                *
                * @returns {void}
                */
                public _removeItem(index: number): void;
                /**
                * @name _removeItems
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * Removes a specified number of elements.
                *
                * @param {number} numberOfItems The number of items
                * to remove.
                *
                * @returns {void}
                */
                public _removeItems(numberOfItems: number): void;
                /**
                * @name _itemRemoved
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * The function called when an item has been removed
                * from the array context.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                *
                * @returns {void}
                */
                public _itemRemoved(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _resetSelect
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * Resets the select element by removing all its
                * items and adding them back.
                *
                * @returns {void}
                */
                public _resetSelect(): void;
                /**
                * @name _push
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * The function called when an element is pushed to
                * the array context.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                *
                * @returns {void}
                */
                public _push(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _pop
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * The function called when an item is popped
                * from the array context.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                *
                * @returns {void}
                */
                public _pop(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _shift
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * The function called when an item is shifted
                * from the array context.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                *
                * @returns {void}
                */
                public _shift(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _splice
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * The function called when items are spliced
                * from the array context.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                *
                * @returns {void}
                */
                public _splice(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _unshift
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * The function called when an item is unshifted
                * onto the array context.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                *
                * @returns {void}
                */
                public _unshift(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _sort
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * The function called when the array context
                * is sorted.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                *
                * @returns {void}
                */
                public _sort(ev: observable.IArrayMethodInfo<any>): void;
                /**
                * @name _reverse
                * @memberof plat.ui.controls.Select
                * @kind function
                * @access protected
                *
                * @description
                * The function called when the array context
                * is reversed.
                *
                * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                *
                * @returns {void}
                */
                public _reverse(ev: observable.IArrayMethodInfo<any>): void;
            }
            /**
            * @name ISelectOptions
            * @memberof plat.ui.controls
            * @kind interface
            *
            * @description
            * The available {@link plat.controls.Options|options} for the {@link plat.ui.controls.Select|Select} control.
            */
            interface ISelectOptions {
                /**
                * @name group
                * @memberof plat.ui.controls.ISelectOptions
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The property in your context array
                * of objects to use to group the objects
                * into optgroups.
                */
                group: string;
                /**
                * @name value
                * @memberof plat.ui.controls.ISelectOptions
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The property in your context array of
                * objects with which to use to bind to the
                * option's value.
                */
                value: string;
                /**
                * @name textContent
                * @memberof plat.ui.controls.ISelectOptions
                * @kind property
                * @access public
                *
                * @type {string}
                *
                * @description
                * The property in your context array of
                * objects with which to use to bind to the
                * option's textContent.
                */
                textContent: string;
            }
            /**
            * @name If
            * @memberof plat.ui.controls
            * @kind class
            *
            * @extends {plat.ui.TemplateControl}
            *
            * @description
            * A {@link plat.ui.TemplateControl|TemplateControl} conditionally adding or removing
            * a block of nodes to or from the DOM.
            */
            class If extends TemplateControl {
                /**
                * @name $Animator
                * @memberof plat.ui.controls.If
                * @kind property
                * @access public
                *
                * @type {plat.ui.animations.IAnimator}
                *
                * @description
                * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
                */
                public $Animator: animations.IAnimator;
                /**
                * @name options
                * @memberof plat.ui.controls.If
                * @kind property
                * @access public
                *
                * @type {plat.observable.IObservableProperty<plat.ui.controls.IIfOptions>}
                *
                * @description
                * The evaluated {@link plat.controls.Options|plat-options} object.
                */
                public options: observable.IObservableProperty<IIfOptions>;
                /**
                * @name commentNode
                * @memberof plat.ui.controls.If
                * @kind property
                * @access public
                *
                * @type {Comment}
                *
                * @description
                * The Comment used to hold the place of the plat-if element.
                */
                public commentNode: Comment;
                /**
                * @name fragmentStore
                * @memberof plat.ui.controls.If
                * @kind property
                * @access public
                *
                * @type {DocumentFragment}
                *
                * @description
                * The DocumentFragment that stores the plat-if element when hidden.
                */
                public fragmentStore: DocumentFragment;
                /**
                * @name __condition
                * @memberof plat.ui.controls.If
                * @kind property
                * @access private
                *
                * @type {boolean}
                *
                * @description
                * The current evaluated condition (whether or not the
                * control is visible) of the control.
                */
                private __condition;
                /**
                * @name __firstTime
                * @memberof plat.ui.controls.If
                * @kind property
                * @access private
                *
                * @type {boolean}
                *
                * @description
                * A boolean value stating whether or not the condition has already
                * been evaluated.
                */
                private __firstTime;
                /**
                * @name __removeListener
                * @memberof plat.ui.controls.If
                * @kind property
                * @access private
                *
                * @type {plat.IRemoveListener}
                *
                * @description
                * A function to stop listening to changes on the options object.
                */
                private __removeListener;
                /**
                * @name __leaveAnimation
                * @memberof plat.ui.controls.If
                * @kind property
                * @access private
                *
                * @type {plat.ui.animations.IAnimationThenable<void>}
                *
                * @description
                * A promise that resolves when the leave animation is finished.
                */
                private __leaveAnimation;
                /**
                * @name __enterAnimation
                * @memberof plat.ui.controls.If
                * @kind property
                * @access private
                *
                * @type {plat.ui.animations.IAnimationThenable<void>}
                *
                * @description
                * A promise that resolves when the entrance animation is finished.
                */
                private __enterAnimation;
                /**
                * @name constructor
                * @memberof plat.ui.controls.If
                * @kind function
                * @access public
                *
                * @description
                * The constructor for a {@link plat.ui.controls.If|If}. Creates the
                * DocumentFragment for holding the conditional nodes.
                *
                * @returns {plat.ui.controls.If} A {@link plat.ui.controls.If|If} instance.
                */
                constructor();
                /**
                * @name contextChanged
                * @memberof plat.ui.controls.If
                * @kind function
                * @access public
                *
                * @description
                * Checks the options and initializes the
                * evaluation.
                *
                * @returns {void}
                */
                public contextChanged(): void;
                /**
                * @name loaded
                * @memberof plat.ui.controls.If
                * @kind function
                * @access public
                *
                * @description
                * Sets the visibility to true if no options are
                * defined, kicks off the evaluation, and observes
                * the options for changes.
                *
                * @returns {void}
                */
                public loaded(): void;
                /**
                * @name dispose
                * @memberof plat.ui.controls.If
                * @kind function
                * @access public
                *
                * @description
                * Stops listening to the options for changes.
                *
                * @returns {void}
                */
                public dispose(): void;
                /**
                * @name _setter
                * @memberof plat.ui.controls.If
                * @kind function
                * @access protected
                *
                * @description
                * Checks the condition and decides
                * whether or not to add or remove
                * the node from the DOM.
                *
                * @returns {void}
                */
                public _setter(options: IIfOptions): void;
                /**
                * @name _addItem
                * @memberof plat.ui.controls.If
                * @kind function
                * @access protected
                *
                * @description
                * Adds the conditional nodes to the DOM.
                *
                * @returns {void}
                */
                public _addItem(): void;
                /**
                * @name _removeItem
                * @memberof plat.ui.controls.If
                * @kind function
                * @access protected
                *
                * @description
                * Removes the conditional nodes from the DOM.
                *
                * @returns {void}
                */
                public _removeItem(): void;
            }
            /**
            * @name IIfOptions
            * @memberof plat.ui.controls
            * @kind interface
            *
            * @description
            * The available {@link plat.controls.Options|options} for the {@link plat.ui.controls.If|If} control.
            */
            interface IIfOptions {
                /**
                * @name condition
                * @memberof plat.ui.controls.IIfOptions
                * @kind property
                * @access public
                *
                * @type {boolean}
                *
                * @description
                * A boolean expression to bind to whether or not the conditional
                * nodes are present on the DOM.
                */
                condition: boolean;
            }
        }
    }
    /**
    * @name ui
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds all the classes and interfaces related to UI components for platypus.
    */
    /**
    * @name processing
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds classes and interfaces related to Document processing in platypus.
    */
    module processing {
        /**
        * Responsible for iterating through the DOM and collecting controls.
        */
        class Compiler implements ICompiler {
            public $ElementManagerFactory: IElementManagerFactory;
            public $TextManagerFactory: ITextManagerFactory;
            public $CommentManagerFactory: ICommentManagerFactory;
            public $ManagerCache: storage.ICache<INodeManager>;
            public compile(node: Node, control?: ui.ITemplateControl): void;
            public compile(nodes: Node[], control?: ui.ITemplateControl): void;
            public compile(nodes: NodeList, control?: ui.ITemplateControl): void;
            /**
            * Iterates through the array of nodes creating Element Managers on Element
            * nodes, Text Managers on text nodes, and Comment Managers on comment nodes.
            *
            * @param nodes The NodeList to be compiled.
            * @param manager The parent Element Manager for the given array of nodes.
            */
            public _compileNodes(nodes: Node[], manager: IElementManager): void;
        }
        /**
        * The Type for referencing the '$Compiler' injectable as a dependency.
        */
        function ICompiler(): ICompiler;
        /**
        * Describes an object that iterates through the DOM and collects controls.
        */
        interface ICompiler {
            /**
            * Goes through the childNodes of the given Node, finding elements that contain controls as well as
            * text that contains markup.
            *
            * @param node The node whose childNodes are going to be compiled.
            * @param control The parent control for the given Node. The parent must implement ui.ITemplateControl
            * since only controls that implement ui.ITemplateControl can contain templates.
            */
            compile(node: Node, control?: ui.ITemplateControl): void;
            /**
            * Goes through the Node array, finding elements that contain controls as well as
            * text that contains markup.
            *
            * @param nodes The Node array to be compiled.
            * @param control The parent control for the given Node array. The parent must implement ui.ITemplateControl
            * since only controls that implement ui.ITemplateControl are responsible for creating DOM.
            */
            compile(nodes: Node[], control?: ui.ITemplateControl): void;
            /**
            * Goes through the NodeList, finding elements that contain controls as well as
            * text that contains markup.
            *
            * @param nodes The NodeList to be compiled.
            * @param control The parent control for the given NodeList. The parent must implement ui.ITemplateControl
            * since only controls that implement ui.ITemplateControl are responsible for creating DOM.
            */
            compile(nodes: NodeList, control?: ui.ITemplateControl): void;
        }
        /**
        * A NodeManager is responsible for data binding a data context to a Node.
        */
        class NodeManager implements INodeManager {
            static $ContextManagerStatic: observable.IContextManagerStatic;
            static $Parser: expressions.IParser;
            static $TemplateControlFactory: ui.ITemplateControlFactory;
            /**
            * Given an IParsedExpression array, creates an array of unique identifers
            * to use with binding. This allows us to avoid creating multiple listeners
            * for the identifier and node.
            *
            * @static
            * @param expressions An IParsedExpression array to search for identifiers.
            * @returns {Array<string>} An array of identifiers.
            */
            static findUniqueIdentifiers(expressions: expressions.IParsedExpression[]): string[];
            /**
            * Determines if a string has the markup notation.
            *
            * @param text The text string in which to search for markup.
            * @returns {Boolean} Indicates whether or not there is markup.
            */
            static hasMarkup(text: string): boolean;
            /**
            * Given a string, finds markup in the string and creates an IParsedExpression array.
            *
            * @static
            * @param text The text string to parse.
            */
            static findMarkup(text: string): expressions.IParsedExpression[];
            /**
            * Takes in data context and an IParsedExpression array and outputs a string of the evaluated
            * expressions.
            *
            * @static
            * @param expressions The IParsedExpression array to evaluate.
            * @param control The IControl used to parse the expressions.
            * @returns {string} The evaluated expressions.
            */
            static build(expressions: expressions.IParsedExpression[], control?: ui.ITemplateControl): string;
            /**
            * Registers a listener to be notified of a change in any associated identifier.
            *
            * @static
            * @param identifiers An Array of identifiers to observe.
            * @param control The control associated to the identifiers.
            * @param listener The listener to call when any identifier property changes.
            */
            static observeIdentifiers(identifiers: string[], control: ui.ITemplateControl, listener: (...args: any[]) => void): void;
            /**
            * A regular expression for finding markup
            */
            static _markupRegex: RegExp;
            /**
            * A regular expression for finding newline characters.
            */
            static _newLineRegex: RegExp;
            /**
            * Wraps constant text as an IParsedExpression.
            *
            * @param text The text to wrap.
            */
            static _wrapExpression(text: string): expressions.IParsedExpression;
            public type: string;
            public isClone: boolean;
            public nodeMap: INodeMap;
            public parent: IElementManager;
            public initialize(nodeMap: INodeMap, parent: IElementManager): void;
            public getParentControl(): ui.ITemplateControl;
            public clone(newNode: Node, parentManager: IElementManager): number;
            public bind(): void;
        }
        /**
        * The Type for referencing the '$NodeManagerStatic' injectable as a dependency.
        */
        function INodeManagerStatic($Regex?: expressions.IRegex, $ContextManagerStatic?: observable.IContextManagerStatic, $Parser?: expressions.IParser, $TemplateControlFactory?: ui.ITemplateControlFactory): INodeManagerStatic;
        /**
        * The external interface for the '$NodeManagerStatic' injectable.
        */
        interface INodeManagerStatic {
            /**
            * Given an IParsedExpression array, creates an array of unique identifers
            * to use with binding. This allows us to avoid creating multiple listeners
            * for the identifier and node.
            *
            * @static
            * @param expressions An IParsedExpression array to search for identifiers.
            * @returns {Array<string>} An array of identifiers.
            */
            findUniqueIdentifiers(expressions: expressions.IParsedExpression[]): string[];
            /**
            * Determines if a string has the markup notation.
            *
            * @param text The text string in which to search for markup.
            * @returns {Boolean} Indicates whether or not there is markup.
            */
            hasMarkup(text: string): boolean;
            /**
            * Given a string, finds markup in the string and creates an IParsedExpression array.
            *
            * @static
            * @param text The text string to parse.
            * @returns {Array<IParsedExpression>}
            */
            findMarkup(text: string): expressions.IParsedExpression[];
            /**
            * Takes in data context and an IParsedExpression array and outputs a string of the evaluated
            * expressions.
            *
            * @static
            * @param expressions The IParsedExpression array to evaluate.
            * @param control The IControl used to parse the expressions.
            * @returns {string} The evaluated expressions.
            */
            build(expressions: expressions.IParsedExpression[], control?: ui.ITemplateControl): string;
            /**
            * Registers a listener to be notified of a change in any associated identifier.
            *
            * @static
            * @param identifiers An Array of identifiers to observe.
            * @param control The control associated to the identifiers.
            * @param listener The listener to call when any identifier property changes.
            */
            observeIdentifiers(identifiers: string[], control: ui.ITemplateControl, listener: (...args: any[]) => void): void;
        }
        /**
        * Describes an object that takes a Node and provides a way to data-bind to that node.
        */
        interface INodeManager {
            /**
            * The type of INodeManager
            */
            type: string;
            /**
            * The INodeMap for this INodeManager. Contains the compiled Node.
            */
            nodeMap?: INodeMap;
            /**
            * The parent manager for this INodeManager.
            */
            parent?: IElementManager;
            /**
            * Retrieves the parent control associated with the parent manager.
            */
            getParentControl? (): ui.ITemplateControl;
            /**
            * Clones this NodeManager with the new node.
            *
            * @param newNode The node used to clone this NodeManager.
            * @param parentManager The parent IElementManager for the clone.
            */
            clone? (newNode: Node, parentManager: IElementManager): number;
            /**
            * Initializes the object's properties.
            *
            * @param nodeMap The INodeMap associated with this TextManager. We have to use an
            * INodeMap instead of an INode so we can treat all INodeManagers the same.
            * @param parent The parent IElementManager.
            */
            initialize? (nodeMap: INodeMap, parent: IElementManager): void;
            /**
            * The function used for data-binding a data context to the DOM.
            */
            bind(): void;
        }
        /**
        * Describes a compiled Node.
        */
        interface INode {
            /**
            * The control associated with the Node, if one exists.
            */
            control?: IControl;
            /**
            * The Node that is compiled.
            */
            node?: Node;
            /**
            * The name of the Node.
            */
            nodeName?: string;
            /**
            * Any IParsedExpressions contained in the Node.
            */
            expressions?: expressions.IParsedExpression[];
            /**
            * Unique identifiers contained in the Node.
            */
            identifiers?: string[];
            /**
            * The injector for a control associated with the Node, if one exists.
            */
            injector?: dependency.IInjector<IControl>;
        }
        /**
        * Defines the interface for a compiled Element.
        */
        interface IUiControlNode extends INode {
            /**
            * The control associated with the Element, if one exists.
            */
            control: ui.ITemplateControl;
            /**
            * The resources element defined as the control element's first
            * element child.
            */
            resourceElement?: HTMLElement;
        }
        /**
        * Describes a compiled Element with all
        * associated nodes contained within its tag.
        */
        interface INodeMap {
            /**
            * The Element that is compiled.
            */
            element?: HTMLElement;
            /**
            * The compiled attribute Nodes for the Element.
            */
            nodes: INode[];
            /**
            * An object of key/value attribute pairs.
            */
            attributes?: IObject<string>;
            /**
            * The plat-context path for the next UIControl, if specified.
            */
            childContext?: string;
            /**
            * Indicates whether or not a IControl was found on the Element.
            */
            hasControl?: boolean;
            /**
            * The INode for the UIControl, if one was found for the Element.
            */
            uiControlNode?: IUiControlNode;
        }
        /**
        * A class used to manage element nodes. Provides a way for compiling and binding the
        * element/template. Also provides methods for cloning an ElementManager.
        */
        class ElementManager extends NodeManager implements IElementManager {
            static $Document: Document;
            static $ManagerCache: storage.ICache<IElementManager>;
            static $ResourcesFactory: ui.IResourcesFactory;
            static $BindableTemplatesFactory: ui.IBindableTemplatesFactory;
            /**
            * Determines if the associated Element has controls that need to be instantiated or Attr nodes
            * containing text markup. If controls exist or markup is found a new ElementManager will be created,
            * else an empty INodeManager will be added to the Array of INodeManagers.
            *
            * @static
            * @param element The Element to use to identifier markup and controls.
            * @param parent The parent ui.ITemplateControl used for context inheritance.
            */
            static create(element: Element, parent?: IElementManager): IElementManager;
            /**
            * Looks through the Node's child nodes to try and find any
            * defined Resources in a <plat-resources> tags.
            *
            * @param node The node who may have Resources as a child node.
            */
            static locateResources(node: Node): HTMLElement;
            /**
            * Clones an ElementManager with a new element.
            *
            * @static
            * @param sourceManager The original IElementManager.
            * @param parent The parent IElementManager for the new clone.
            * @param element The new element to associate with the clone.
            * @param newControl An optional control to associate with the clone.
            * @param nodeMap The nodeMap used to clone this ElementManager.
            */
            static clone(sourceManager: IElementManager, parent: IElementManager, element: Element, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager;
            /**
            * Clones a UI Control with a new nodeMap.
            *
            * @static
            * @param sourceMap The source INodeMap used to clone the UI Control
            * @param parent The parent control of the clone.
            */
            static cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl;
            /**
            * Creates new nodes for an INodeMap corresponding to the element associated with the nodeMap or
            * the passed-in element.
            *
            * @static
            * @param nodeMap The nodeMap to populate with attribute nodes.
            * @param parent The parent control for the new attribute controls.
            * @param templateControl The TemplateControl linked to these AttributeControls if
            * one exists.
            * @param newElement An optional element to use for attributes (used in cloning).
            * @param isClone Whether or not these controls are clones.
            */
            static createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl, templateControl?: ui.ITemplateControl, newElement?: Element, isClone?: boolean): INode[];
            /**
            * Returns an instance of an ElementManager.
            */
            static getInstance(): IElementManager;
            /**
            * Iterates over the attributes NamedNodeMap, creating an INodeMap. The INodeMap
            * will contain injectors for all the IControls as well as parsed expressions
            * and identifiers found for each Attribute (useful for data binding).
            *
            * @static
            * @param attributes A NamedNodeMap to compile into an INodeMap
            * @returns {INodeMap} The compiled NamedNodeMap
            */
            static _collectAttributes(attributes: NamedNodeMap): INodeMap;
            /**
            * Used to copy the attribute nodes during the cloning process.
            *
            * @static
            * @param nodes The compiled INodes to be cloned.
            * @returns {INodeMap} The cloned array of INodes.
            */
            static _copyAttributeNodes(nodes: INode[]): INode[];
            /**
            * Clones an INode with a new node.
            *
            * @static
            * @param sourceNode The original INode.
            * @param node The new node used for cloning.
            * @param newControl An optional new control to associate with the cloned node.
            * @returns {INode} The clones INode.
            */
            static _cloneNode(sourceNode: INode, node: Node, newControl?: ui.ITemplateControl): INode;
            /**
            * Clones an INodeMap with a new element.
            *
            * @static
            * @param sourceMap The original INodeMap.
            * @param element The new Element used for cloning.
            * @param newControl An optional new control to associate with the element.
            * @returns {INodeMap} The cloned INodeMap.
            */
            static _cloneNodeMap(sourceMap: INodeMap, element: Element, parent: ui.ITemplateControl, newControl?: ui.ITemplateControl): INodeMap;
            public $Promise: async.IPromise;
            public $Compiler: ICompiler;
            public $ContextManagerStatic: observable.IContextManagerStatic;
            public $CommentManagerFactory: ICommentManagerFactory;
            public $ControlFactory: IControlFactory;
            public $TemplateControlFactory: ui.ITemplateControlFactory;
            public children: INodeManager[];
            public type: string;
            public replace: boolean;
            public replaceNodeLength: number;
            public hasOwnContext: boolean;
            public loadedPromise: async.IThenable<void>;
            public templatePromise: async.IThenable<void>;
            public clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number;
            public initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void;
            public bind(): IControl[];
            public setUiControlTemplate(templateUrl?: string): void;
            public getUiControl(): ui.ITemplateControl;
            public fulfillTemplate(): async.IThenable<void>;
            public bindAndLoad(): async.IThenable<void>;
            public observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void;
            /**
            * Observes the identifiers associated with this ElementManager's INodes.
            *
            * @param nodes The array of INodes to iterate through.
            * @param parent The parent ITemplateControl for context.
            * @param controls The array of controls whose attributes will need to be updated
            * upon the context changing.
            */
            public _observeControlIdentifiers(nodes: INode[], parent: ui.ITemplateControl, controls: IControl[]): void;
            /**
            * Loads the AttributeControls associated with this ElementManager and
            * attaches the corresponding ITemplateControl if available.
            *
            * @param controls The array of controls to load.
            * @param templateControl The ITemplateControl associated with this
            * ElementManager.
            */
            public _loadControls(controls: controls.IAttributeControl[], templateControl: ui.ITemplateControl): void;
            /**
            * Fulfills the template promise prior to binding and loading the control.
            */
            public _fulfillAndLoad(): async.IThenable<void>;
            /**
            * Populates the ITemplateControl properties associated with this ElementManager
            * if one exists.
            */
            public _populateUiControl(): void;
            /**
            * Removes the ITemplateControl's element. Called if its replaceWith property is
            * null or empty string.
            *
            * @param control The ITemplateControl whose element will be removed.
            * @param nodeMap The INodeMap associated with this ElementManager.
            */
            public _replaceElement(control: ui.ITemplateControl, nodeMap: INodeMap): void;
            /**
            * Initializes a control's template and compiles the control.
            *
            * @param uiControl The ITemplateControl associated with this ElementManager.
            * @param template The uiControl's template.
            */
            public _initializeControl(uiControl: ui.ITemplateControl, template: DocumentFragment): void;
            /**
            * A function to handle updating an attribute on all controls that have it
            * as a property upon a change in its value.
            *
            * @param node The INode where the change occurred.
            * @param parent The parent ITemplateControl used for context.
            * @param controls The controls that have the changed attribute as a property.
            */
            public _attributeChanged(node: INode, parent: ui.ITemplateControl, controls: IControl[]): void;
            /**
            * Runs through all the children of this manager and calls fulfillTemplate.
            */
            public _fulfillChildTemplates(): async.IThenable<void>;
        }
        /**
        * The Type for referencing the '$ElementManagerFactory' injectable as a dependency.
        */
        function IElementManagerFactory($Document?: Document, $ManagerCache?: storage.ICache<IElementManager>, $ResourcesFactory?: ui.IResourcesFactory, $BindableTemplatesFactory?: ui.IBindableTemplatesFactory): IElementManagerFactory;
        /**
        * Creates and manages a class for dealing with Element nodes.
        */
        interface IElementManagerFactory {
            /**
            * Determines if the associated Element has controls that need to be instantiated or Attr nodes
            * containing text markup. If controls exist or markup is found a new ElementManager will be created,
            * else an empty INodeManager will be added to the Array of INodeManagers.
            *
            * @static
            * @param element The Element to use to identifier markup and controls.
            * @param parent The parent ui.ITemplateControl used for context inheritance.
            */
            create(element: Element, parent?: IElementManager): IElementManager;
            /**
            * Creates new nodes for an INodeMap corresponding to the element associated with the nodeMap or
            * the passed-in element.
            *
            * @static
            * @param nodeMap The nodeMap to populate with attribute nodes.
            * @param parent The parent control for the new attribute controls.
            * @param templateControl The TemplateControl linked to these AttributeControls if
            * one exists.
            * @param newElement An optional element to use for attributes (used in cloning).
            * @param isClone Whether or not these controls are clones.
            */
            createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl, templateControl?: ui.ITemplateControl, newElement?: Element, isClone?: boolean): INode[];
            /**
            * Clones a UI Control with a new nodeMap.
            *
            * @static
            * @param sourceMap The source INodeMap used to clone the UI Control
            * @param parent The parent control of the clone.
            */
            cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl;
            /**
            * Clones an ElementManager with a new element.
            *
            * @static
            * @param sourceManager The original IElementManager.
            * @param parent The parent IElementManager for the new clone.
            * @param element The new element to associate with the clone.
            * @param newControl An optional control to associate with the clone.
            * @param nodeMap The nodeMap used to clone this ElementManager.
            */
            clone(sourceManager: IElementManager, parent: IElementManager, element: Element, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager;
            /**
            * Looks through the Node's child nodes to try and find any
            * defined Resources in a <plat-resources> tags.
            *
            * @static
            * @param node The node who may have Resources as a child node.
            */
            locateResources(node: Node): HTMLElement;
            /**
            * Returns a new instance of an IElementManager
            *
            * @static
            */
            getInstance(): IElementManager;
        }
        /**
        * An ElementManager is responsible for initializing and data-binding controls associated to an Element.
        *
        */
        interface IElementManager extends INodeManager {
            /**
            * The child managers for this manager.
            */
            children: INodeManager[];
            /**
            * Specifies whether or not this manager has a uiControl which has
            * replaceWith set to null or empty string.
            */
            replace: boolean;
            /**
            * The length of a replaced control, indiates the number of nodes to slice
            * out of the parent's childNodes.
            */
            replaceNodeLength: number;
            /**
            * Indicates whether the control for this manager hasOwnContext.
            */
            hasOwnContext: boolean;
            /**
            * Lets us know when an ElementManager is a cloned manager, or the compiled
            * manager from BindableTemplates. We do not want to bindAndLoad compiled
            * managers that are clones.
            */
            isClone: boolean;
            /**
            * In the event that a control hasOwnContext, we need a promise to fullfill
            * when the control is loaded to avoid loading its parent control first.
            */
            loadedPromise: async.IThenable<void>;
            /**
            * A templatePromise set when a uiControl specifies a templateUrl.
            */
            templatePromise: async.IThenable<void>;
            /**
            * Clones the IElementManager with a new node.
            *
            * @param newNode The new element used to clone the ElementManager.
            * @param parentManager The parent for the clone.
            * @param nodeMap An optional INodeMap to clone a ui control if needed.
            */
            clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number;
            /**
            * Initializes all the controls associated to the ElementManager's nodeMap.
            * The INodeManager array must be passed in because if this ElementManager is
            * used for transclusion, it can't rely on one INodeManager array.
            *
            * @param parent The parent IElementManager.
            * @param dontInitialize Specifies whether or not the initialize method should
            * be called for a control.
            * @param dontInitialize Specifies whether or not the initialize method should
            * be called for a control.
            */
            initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void;
            /**
            * Observes the root context for controls that specify their own context, and initiates
            * a load upon a successful set of the context.
            *
            * @param root The ITemplateControl specifying its own context.
            * @param loadMethod The function to initiate the loading of the root control and its
            * children.
            */
            observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void;
            /**
            * Links the data context to the DOM (data-binding).
            */
            bind(): void;
            /**
            * Sets the template for an ElementManager by calling its associated UI Control's
            * setTemplate method.
            *
            * @param templateUrl An optional templateUrl used to override the control's template.
            */
            setUiControlTemplate(templateUrl?: string): void;
            /**
            * Retrieves the UI control instance for this ElementManager.
            */
            getUiControl(): ui.ITemplateControl;
            /**
            * Fullfills any template template promises and finishes the compile phase
            * for the template associated to this ElementManager.
            */
            fulfillTemplate(): async.IThenable<void>;
            /**
            * Binds context to the DOM and loads controls.
            */
            bindAndLoad(): async.IThenable<void>;
        }
        /**
        * The class responsible for initializing and data-binding values to text nodes.
        */
        class TextManager extends NodeManager implements ITextManager {
            /**
            * Determines if a text node has markup, and creates a TextManager if it does.
            * A TextManager or empty TextManager will be added to the managers array.
            *
            * @static
            * @param node The Node used to find markup.
            * @param parent The parent ITemplateControl for the node.
            */
            static create(node: Node, parent: IElementManager): ITextManager;
            /**
            * Clones an INodeMap with a new text node.
            *
            * @static
            * @param sourceMap The original INodeMap.
            * @param newNode The new text node used for cloning.
            */
            static _cloneNodeMap(sourceMap: INodeMap, newNode: Node): INodeMap;
            /**
            * Clones a TextManager with a new text node.
            *
            * @static
            * @param sourceManager The original INodeManager.
            * @param node The new text node to associate with the clone.
            * @param parent The parent IElementManager for the new clone.
            */
            static _clone(sourceManager: INodeManager, node: Node, parent: IElementManager): ITextManager;
            /**
            * Specifies the type for this INodeManager.
            */
            public type: string;
            public clone(newNode: Node, parentManager: IElementManager): number;
            public bind(): void;
            /**
            * Builds the node expression and sets the value.
            *
            * @param Node The associated node whose value will be set.
            * @param control The control whose context will be used to bind
            * the data.
            * @param expressions An array of parsed expressions used to build
            * the node value.
            */
            public _setText(node: Node, control: ui.ITemplateControl, expressions: expressions.IParsedExpression[]): void;
        }
        /**
        * The Type for referencing the '$TextManagerFactory' injectable as a dependency.
        */
        function ITextManagerFactory(): ITextManagerFactory;
        /**
        * Creates and manages a class for dealing with Text nodes.
        */
        interface ITextManagerFactory {
            /**
            * Determines if a text node has markup, and creates a TextManager if it does.
            * A TextManager or empty TextManager will be added to the managers array.
            *
            * @static
            * @param node The Node used to find markup.
            * @param parent The parent ui.ITemplateControl for the node.
            */
            create(node: Node, parent?: IElementManager): ITextManager;
        }
        /**
        * An object responsible for initializing and data-binding values to text nodes.
        */
        interface ITextManager extends INodeManager {
            /**
            * Clones this ITextManager with a new node.
            *
            * @param newNode The new node attached to the cloned ITextManager.
            * @param parentManager The parent IElementManager for the clone.
            */
            clone(newNode: Node, parentManager: IElementManager): number;
            /**
            * The function used for data-binding a data context to the DOM.
            */
            bind(): void;
        }
        /**
        * A class used to manage Comment nodes. Provides a way to
        * clone a Comment node.
        */
        class CommentManager extends NodeManager implements ICommentManager {
            /**
            * Creates a new CommentManager for the given Comment node.
            *
            * @static
            * @param node The Comment to associate with the new manager.
            * @param parent The parent IElementManager.
            */
            static create(node: Node, parent: IElementManager): ICommentManager;
            /**
            * Specifies the type of INodeManager.
            */
            public type: string;
            public clone(newNode: Node, parentManager: IElementManager): number;
        }
        /**
        * The Type for referencing the '$CommentManagerFactory' injectable as a dependency.
        */
        function ICommentManagerFactory(): ICommentManagerFactory;
        /**
        * Creates and manages a class for dealing with Comment nodes.
        */
        interface ICommentManagerFactory {
            /**
            * Creates a new CommentManager for the given Comment node.
            *
            * @static
            * @param node The Comment to associate with the new manager.
            * @param parent The parent IElementManager.
            */
            create(node: Node, parent: IElementManager): ICommentManager;
        }
        /**
        * An object used to manage Comment nodes.
        */
        interface ICommentManager extends INodeManager {
            /**
            * A method for cloning this CommentManager.
            *
            * @param newNode The new Comment node to associate with the cloned
            * manager.
            * @param parentManager The parent IElementManager for the new clone.
            */
            clone(newNode: Node, parentManager: IElementManager): number;
        }
    }
    /**
    * @name navigation
    * @memberof plat
    * @kind namespace
    * @access public
    *
    * @description
    * Holds classes and interfaces related to navigation in platypus.
    */
    module navigation {
        /**
        * A class that defines the base Navigation properties and methods.
        */
        class BaseNavigator implements IBaseNavigator {
            public $EventManagerStatic: events.IEventManagerStatic;
            public $NavigationEventStatic: events.INavigationEventStatic;
            public $BaseViewControlFactory: ui.IBaseViewControlFactory;
            public $ContextManagerStatic: observable.IContextManagerStatic;
            public uid: string;
            public baseport: ui.controls.IBaseport;
            public currentState: IBaseNavigationState;
            public navigating: boolean;
            /**
            * Define unique id and subscribe to the 'goBack' event
            */
            constructor();
            public initialize(baseport: ui.controls.IBaseport): void;
            public navigate(navigationParameter: any, options: IBaseNavigationOptions): void;
            public navigated(control: ui.IBaseViewControl, parameter: any, options: IBaseNavigationOptions): void;
            public goBack(options?: IBaseBackNavigationOptions): void;
            public dispose(): void;
            /**
            * Sends a NavigationEvent with the given parameters.  The 'sender' property of the event will be the
            * navigator.
            *
            * @param name The name of the event to send.
            * @param target The target of the event, could be a view control or a route depending upon the navigator and
            * event name.
            * @param options The IBaseNavigationOptions used during navigation
            * @param cancelable Whether or not the event can be cancelled, preventing further navigation.
            */
            public _sendEvent(name: string, target: any, type: string, parameter: any, options: IBaseNavigationOptions, cancelable: boolean): events.INavigationEvent<any>;
        }
        /**
        * Defines the methods that a Navigator must implement.
        */
        interface IBaseNavigator {
            /**
            * A unique identifier used to identify this navigator.
            */
            uid: string;
            /**
            * Every navigator will have a viewport with which to communicate and
            * facilitate navigation.
            */
            baseport: ui.controls.IBaseport;
            /**
            * Set to true during navigate, set to false during navigated.
            */
            navigating: boolean;
            /**
            * Specifies the current state of navigation. This state should contain
            * enough information for it to be pushed onto the history stack when
            * necessary.
            */
            currentState: IBaseNavigationState;
            /**
            * Initializes a Navigator. The viewport will call this method and pass itself in so
            * the navigator can store it and use it to facilitate navigation. Also subscribes to
            * 'routeChanged' and 'beforeRouteChange' events in the case of a RoutingNavigator.
            *
            * @param baseport The baseport instance this navigator will be attached to.
            */
            initialize(baseport: ui.controls.IBaseport): void;
            /**
            * Allows a ui.IBaseViewControl to navigate to another ui.IBaseViewControl. Also allows for
            * navigation parameters to be sent to the new ui.IBaseViewControl.
            *
            * @param navigationParameter An optional navigation parameter to send to the next ui.IBaseViewControl.
            * @param options Optional IBaseNavigationOptions used for navigation.
            */
            navigate(navigationParameter: any, options?: IBaseNavigationOptions): void;
            /**
            * Called by the Viewport to make the Navigator aware of a successful navigation. The Navigator will
            * in-turn call the app.navigated event.
            *
            * @param control The ui.IBaseViewControl to which the navigation occurred.
            * @param parameter The navigation parameter sent to the control.
            * @param options The INavigationOptions used during navigation.
            */
            navigated(control: ui.IBaseViewControl, parameter: any, options: IBaseNavigationOptions): void;
            /**
            * Every navigator must implement this method, defining what happens when a view
            * control wants to go back.
            *
            * @param options Optional backwards navigation options of type IBaseBackNavigationOptions.
            */
            goBack(options?: IBaseBackNavigationOptions): void;
            /**
            * Clean up memory
            */
            dispose(): void;
        }
        /**
        * Options that you can submit to the navigator in order
        * to customize navigation.
        */
        interface IBaseNavigationOptions {
            /**
            * Allows a ui.IBaseViewControl to leave itself out of the
            * navigation history.
            */
            replace?: boolean;
        }
        /**
        * Options that you can submit to the navigator during a backward
        * navigation in order to customize the navigation.
        */
        interface IBaseBackNavigationOptions {
            /**
            * Lets the Navigator know to navigate back a specific length
            * in history.
            */
            length?: number;
        }
        /**
        * Defines the base interface needing to be implemented in the history.
        */
        interface IBaseNavigationState {
            /**
            * The view control associated with a history entry.
            */
            control: ui.IBaseViewControl;
        }
        /**
        * The Navigator class allows ui.IViewControls to navigate within a Viewport.
        * Every Viewport has its own Navigator instance, allowing multiple navigators to
        * coexist in one app.
        */
        class Navigator extends BaseNavigator implements INavigatorInstance {
            public history: IBaseNavigationState[];
            public navigate(Constructor?: new(...args: any[]) => ui.IViewControl, options?: INavigationOptions): void;
            public navigate(injector?: dependency.IInjector<ui.IViewControl>, options?: INavigationOptions): void;
            public goBack(options?: IBackNavigationOptions): void;
            public canGoBack(): boolean;
            public clearHistory(): void;
            /**
            * Finds the given constructor in the history stack. Returns the index in the history where
            * the constructor is found, or -1 if no constructor is found.
            *
            * @param Constructor The view control constructor to search for in the history stack.
            */
            public _findInHistory(Constructor: new(...args: any[]) => ui.IViewControl): number;
            /**
            * This method takes in a length and navigates back in the history, returning the view control
            * associated with length + 1 entries back in the history.  It disposes all the view controls
            * encapsulated in the length.
            */
            public _goBackLength(length?: number): IBaseNavigationState;
        }
        /**
        * The Type for referencing the '$Navigator' injectable as a dependency.
        */
        function INavigatorInstance(): INavigatorInstance;
        /**
        * An object implementing INavigator allows ui.IViewControls to implement methods
        * used to navigate within a Viewport.
        */
        interface INavigatorInstance extends IBaseNavigator {
            /**
            * Contains the navigation history stack for the associated Viewport.
            */
            history: IBaseNavigationState[];
            /**
            * Allows a ui.IViewControl to navigate to another ui.IViewControl. Also allows for
            * navigation parameters to be sent to the new ui.IViewControl.
            *
            * @param Constructor The Constructor for the new ui.IViewControl. The Navigator will find the injector
            * for the Constructor and create a new instance of the control.
            * @param options Optional IBaseNavigationOptions used for Navigation.
            */
            navigate(Constructor?: new(...args: any[]) => ui.IViewControl, options?: INavigationOptions): void;
            navigate(injector?: dependency.IInjector<ui.IViewControl>, options?: INavigationOptions): void;
            /**
            * Returns to the last visited ui.IViewControl.
            *
            * @param options Optional IBackNavigationOptions allowing the ui.IViewControl
            * to customize navigation. Enables navigating back to a specified point in history as well
            * as specifying a new templateUrl to use at the next ui.IViewControl.
            */
            goBack(options?: IBackNavigationOptions): void;
            /**
            * Lets the caller know if there are ui.IViewControls in the history, meaning the caller
            * is safe to perform a backward navigation.
            */
            canGoBack(): boolean;
            /**
            * Clears the navigation history, disposing all the controls.
            */
            clearHistory(): void;
        }
        /**
        * Options that you can submit to the Navigator in order
        * to customize navigation.
        */
        interface INavigationOptions extends IBaseNavigationOptions {
            /**
            * An optional parameter to send to the next ui.IViewControl.
            */
            parameter?: any;
        }
        /**
        * Options that you can submit to the Navigator during a backward
        * navigation in order to customize the navigation.
        */
        interface IBackNavigationOptions extends IBaseBackNavigationOptions {
            /**
            * An optional parameter to send to the next ui.IViewControl.
            */
            parameter?: any;
            /**
            * A ui.IViewControl Constructor that the Navigator will
            * use to navigate. The Navigator will search for an instance
            * of the ui.IViewControl in its history and navigate to it.
            */
            ViewControl?: new(...args: any[]) => ui.IViewControl;
        }
        /**
        * A Navigator class that utilizes routing capabilities. It is associated with a
        * Routeport, thus only allowing one RoutingNavigator per app.
        */
        class RoutingNavigator extends BaseNavigator implements IRoutingNavigator {
            public $Router: web.IRouter;
            public $Window: Window;
            /**
            * The routing information for the Routeport's current state.
            */
            public currentState: IRouteNavigationState;
            private __removeListeners;
            private __historyLength;
            public initialize(baseport: ui.controls.IBaseport): void;
            public navigate(path: string, options?: web.IRouteNavigationOptions): void;
            public navigated(control: ui.IBaseViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void;
            public goBack(options?: IBaseBackNavigationOptions): void;
            public dispose(): void;
            /**
            * The method called prior to a route change event.
            *
            * @param ev The INavigationEvent containing information regarding the ViewControl, the routing information,
            * and the Router.
            */
            public _beforeRouteChange(ev: events.INavigationEvent<web.IRoute<any>>): void;
            /**
            * The method called when a route change is successfully performed and ViewControl navigation can occur.
            *
            * @param ev The INavigationEvent containing information regarding the ViewControl, the routing infomration,
            * and the Router.
            */
            public _onRouteChanged(ev: events.INavigationEvent<web.IRoute<any>>): void;
        }
        /**
        * The Type for referencing the '$RoutingNavigator' injectable as a dependency.
        */
        function IRoutingNavigator(): IRoutingNavigator;
        /**
        * Defines the methods that a Navigator must implement if it chooses to utilize
        * routing capabilities.
        */
        interface IRoutingNavigator extends IBaseNavigator {
            /**
            * Allows a ui.IBaseViewControl to navigate to another ui.IBaseViewControl. Also allows for
            * navigation parameters to be sent to the new ui.IBaseViewControl.
            *
            * @param path The url path to navigate to.
            * @param options Optional INavigationOptions for ignoring the current ui.IBaseViewControl in the history as
            * well as specifying a new templateUrl for the next ui.IBaseViewControl to use.
            */
            navigate(path: string, options?: web.IRouteNavigationOptions): void;
            /**
            * Called by the Viewport to make the Navigator aware of a successful navigation. The Navigator will
            * in-turn call the app.navigated event.
            *
            * @param control The ui.IBaseViewControl to which the navigation occurred.
            * @param parameter The navigation parameter sent to the control.
            * @param options The INavigationOptions used during navigation.
            */
            navigated(control: ui.IBaseViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void;
            /**
            * Returns to the last visited ui.IBaseViewControl.
            *
            * @param options Optional IBackNavigationOptions allowing the ui.IBaseViewControl
            * to customize navigation. Enables navigating back to a specified point in history as well
            * as specifying a new templateUrl to use at the next ui.IBaseViewControl.
            */
            goBack(options?: IBaseBackNavigationOptions): void;
        }
        /**
        * Defines the route type interface implemented for current state and last state.
        */
        interface IRouteNavigationState extends IBaseNavigationState {
            /**
            * The associated route information.
            */
            route: web.IRoute<any>;
        }
    }
    /**
    * @name animations
    * @memberof plat.ui
    * @kind namespace
    * @access public
    *
    * @description
    * Holds all the classes and interfaces related to UI animation components for platypus.
    */
    /**
    * @name controls
    * @memberof plat.ui
    * @kind namespace
    * @access public
    *
    * @description
    * Holds classes and interfaces related to UI control components in platypus.
    */
    /**
    * @name App
    * @memberof plat
    * @kind class
    *
    * @implements {plat.IApp}
    *
    * @description
    * Class for every app. This class contains hooks for Application Lifecycle Events
    * as well as error handling.
    */
    class App implements IApp {
        /**
        * @name $Compat
        * @memberof plat.App
        * @kind property
        * @access public
        * @static
        *
        * @type {plat.ICompat}
        *
        * @description
        * Reference to the {@link plat.ICompat|ICompat} injectable.
        */
        static $Compat: ICompat;
        /**
        * @name $EventManagerStatic
        * @memberof plat.App
        * @kind property
        * @access public
        * @static
        *
        * @type {plat.events.IEventManagerStatic}
        *
        * @description
        * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
        */
        static $EventManagerStatic: events.IEventManagerStatic;
        /**
        * @name $Document
        * @memberof plat.App
        * @kind property
        * @access public
        * @static
        *
        * @type {Document}
        *
        * @description
        * Reference to the Document injectable.
        */
        static $Document: Document;
        /**
        * @name $Compiler
        * @memberof plat.App
        * @kind property
        * @access public
        * @static
        *
        * @type {plat.processing.ICompiler}
        *
        * @description
        * Reference to the {@link plat.processing.ICompiler|ICompiler} injectable.
        */
        static $Compiler: processing.ICompiler;
        /**
        * @name $LifecycleEventStatic
        * @memberof plat.App
        * @kind property
        * @access public
        * @static
        *
        * @type {plat.events.ILifecycleEventStatic}
        *
        * @description
        * Reference to the {@link plat.events.ILifecycleEventStatic|ILifecycleEventStatic} injectable.
        */
        static $LifecycleEventStatic: events.ILifecycleEventStatic;
        /**
        * @name start
        * @memberof plat.App
        * @kind function
        * @access public
        * @static
        *
        * @description
        * A static method for initiating the app startup.
        *
        * @returns {void}
        */
        static start(): void;
        /**
        * @name registerApp
        * @memberof plat.App
        * @kind function
        * @access public
        * @static
        *
        * @description
        * A static method called upon app registration. Primarily used
        * to initiate a ready state in the case that amd is being used.
        *
        * @param {any} app The app instance.
        *
        * @returns {void}
        */
        static registerApp(app: any): void;
        /**
        * @name load
        * @memberof plat.App
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Kicks off compilation of the DOM from the specified node. If no node is specified,
        * the default start node is document.body.
        *
        * @param {Node} node The node at which DOM compilation begins.
        *
        * @returns {void}
        */
        static load(node?: Node): void;
        /**
        * @name app
        * @memberof plat.App
        * @kind property
        * @access public
        * @static
        *
        * @type {plat.IApp}
        *
        * @description
        * The instance of the registered {@link plat.IApp|IApp}.
        */
        static app: IApp;
        /**
        * @name __ready
        * @memberof plat.App
        * @kind function
        * @access private
        * @static
        *
        * @description
        * A static method called when the application is ready. It calls the app instance's
        * ready function as well as checks for the presence of a module loader. If one exists,
        * loading the DOM falls back to the app developer. If it doesn't, the DOM is loaded from
        * document.body.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} for the app ready.
        *
        * @returns {void}
        */
        private static __ready(ev);
        /**
        * @name __shutdown
        * @memberof plat.App
        * @kind function
        * @access private
        * @static
        *
        * @description
        * A static method called when the application wants to programmatically shutdown.
        *
        * @returns {void}
        */
        private static __shutdown();
        /**
        * @name __registerAppEvents
        * @memberof plat.App
        * @kind function
        * @access private
        * @static
        *
        * @description
        * A static method called to register all the {@link plat.events.ILifecycleEvent|ILifecycleEvents} for an app instance.
        *
        * @returns {void}
        */
        private static __registerAppEvents(ev);
        /**
        * @name __addPlatCss
        * @memberof plat.App
        * @kind function
        * @access private
        * @static
        *
        * @description
        * We need to add [plat-hide] as a css property if platypus.css doesn't exist so we can use it to temporarily
        * hide elements.
        *
        * @returns {void}
        */
        private static __addPlatCss();
        /**
        * @name uid
        * @memberof plat.App
        * @kind property
        * @access public
        * @readonly
        *
        * @type {string}
        *
        * @description
        * A unique id, created during instantiation.
        */
        public uid: string;
        /**
        * @name constructor
        * @memberof plat.App
        * @kind function
        * @access public
        *
        * @description
        * Class for every app. This class contains hooks for Application Lifecycle Management (ALM)
        * as well as error handling and navigation events.
        *
        * @returns {plat.App}
        */
        constructor();
        /**
        * @name suspend
        * @memberof plat.App
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app is suspended.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        public suspend(ev: events.ILifecycleEvent): void;
        /**
        * @name resume
        * @memberof plat.App
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app resumes from the suspended state.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        public resume(ev: events.ILifecycleEvent): void;
        /**
        * @name error
        * @memberof plat.App
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when an internal error occures.
        *
        * @param {plat.events.IErrorEvent<Error>} ev The {@link plat.events.IErrorEvent|IErrorEvent} object.
        *
        * @returns {void}
        */
        public error(ev: events.IErrorEvent<Error>): void;
        /**
        * @name ready
        * @memberof plat.App
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app is ready.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        public ready(ev: events.ILifecycleEvent): void;
        /**
        * @name online
        * @memberof plat.App
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app regains connectivity and is now in an online state.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        public online(ev: events.ILifecycleEvent): void;
        /**
        * @name offline
        * @memberof plat.App
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app loses connectivity and is now in an offline state.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        public offline(ev: events.ILifecycleEvent): void;
        /**
        * @name dispatchEvent
        * @memberof plat.App
        * @kind function
        * @access public
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to all
        * listeners based on the {@link plat.events.EventManager.DIRECT|DIRECT} method. Propagation
        * will always start with the sender, so the sender can both produce and consume the same event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * {@link plat.App.on|app.on()} method.
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        public dispatchEvent(name: string, ...args: any[]): void;
        /**
        * @name on
        * @memberof plat.App
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Registers a listener for a beforeNavigate event. The listener will be called when a beforeNavigate
        * event is propagating over the app. Any number of listeners can exist for a single event name.
        * This event is cancelable using the {@link plat.events.INavigationEvent.cancel|ev.cancel()} method,
        * and thereby preventing the navigation.
        *
        * @param {string} name='beforeNavigate' The name of the event, cooinciding with the beforeNavigate event.
        * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the beforeNavigate event is fired.
        *
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        public on(name: 'beforeNavigate', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
        * @name on
        * @memberof plat.App
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Registers a listener for a navigating event. The listener will be called when a navigating
        * event is propagating over the app. Any number of listeners can exist for a single event name.
        * This event is cancelable using the {@link plat.events.INavigationEvent.cancel|ev.cancel()} method,
        * and thereby preventing the navigation.
        *
        * @param {string} name='navigating' The name of the event, cooinciding with the navigating event.
        * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigating
        * event is fired.
        *
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        public on(name: 'navigating', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
        * @name on
        * @memberof plat.App
        * @kind function
        * @access public
        * @variation 2
        *
        * @description
        * Registers a listener for a navigated event. The listener will be called when a navigated
        * event is propagating over the app. Any number of listeners can exist for a single event name.
        * This event is not cancelable.
        *
        * @param {string} name='navigated' The name of the event, cooinciding with the navigated event.
        * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigated
        * event is fired.
        *
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        public on(name: 'navigated', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
        * @name on
        * @memberof plat.App
        * @kind function
        * @access public
        * @variation 3
        *
        * @description
        * Registers a listener for a routeChanged event. The listener will be called when a routeChange event
        * is propagating over the app. Any number of listeners can exist for a single event name.
        *
        * @param {string} eventName='routeChange' This specifies that the listener is for a routeChange event.
        * @param {(ev: plat.events.INavigationEvent<plat.web.IRoute<any>>) => void} listener The method called
        * when the routeChange is fired. The route argument will contain a parsed route.
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        public on(name: 'routeChanged', listener: (ev: events.INavigationEvent<web.IRoute<any>>) => void): IRemoveListener;
        /**
        * @name on
        * @memberof plat.App
        * @kind function
        * @access public
        * @variation 4
        *
        * @description
        * Registers a listener for a {@link plat.events.NavigationEvent|NavigationEvent}. The listener will be called
        * when a NavigationEvent is propagating over the app. Any number of listeners can exist for a single event name.
        *
        * @param {string} name The name of the event, cooinciding with the {@link plat.events.NavigationEvent|NavigationEvent} name.
        * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the
        * {@link plat.events.NavigationEvent|NavigationEvent} is fired.
        *
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        public on(name: string, listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
        * @name load
        * @memberof plat.App
        * @kind function
        * @access public
        *
        * @description
        * Kicks off compilation of the DOM from the specified node. If no node is specified,
        * the default start node is document.body. This method should be called from the app when
        * using module loaders. If a module loader is in use, the app will delay loading until
        * this method is called.
        *
        * @param {Node} node The node where at which DOM compilation begins.
        *
        * @returns {void}
        */
        public load(node?: Node): void;
    }
    /**
    * The Type for referencing the '$AppStatic' injectable as a dependency.
    */
    function IAppStatic($Compat?: ICompat, $EventManagerStatic?: events.IEventManagerStatic, $Document?: Document, $Compiler?: processing.ICompiler, $LifecycleEventStatic?: events.ILifecycleEventStatic): IAppStatic;
    /**
    * The Type for referencing the '$App' injectable as a dependency.
    */
    function IApp($AppStatic?: IAppStatic): IApp;
    /**
    * @name IAppStatic
    * @memberof plat
    * @kind interface
    *
    * @description
    * The external interface for the '$AppStatic' injectable.
    */
    interface IAppStatic {
        /**
        * @name start
        * @memberof plat.IAppStatic
        * @kind function
        * @access public
        * @static
        *
        * @description
        * A static method for initiating the app startup.
        *
        * @returns {void}
        */
        start(): void;
        /**
        * @name registerApp
        * @memberof plat.IAppStatic
        * @kind function
        * @access public
        * @static
        *
        * @description
        * A static methods called upon app registration. Primarily used
        * to initiate a ready state in the case that amd is being used.
        *
        * @returns {void}
        */
        registerApp(app: dependency.IInjector<IApp>): void;
        /**
        * @name load
        * @memberof plat.IAppStatic
        * @kind function
        * @access public
        * @static
        *
        * @description
        * Kicks off compilation of the DOM from the specified node. If no node is specified,
        * the default start node is document.body.
        *
        * @param node The node at which DOM compilation begins.
        *
        * @returns {void}
        */
        load(node?: Node): void;
        /**
        * @name app
        * @memberof plat.IAppStatic
        * @kind property
        * @access public
        * @static
        *
        * @type {plat.IApp}
        *
        * @description
        * The instance of the registered {@link plat.IApp|IApp}.
        */
        app: IApp;
    }
    /**
    * @name IApp
    * @memberof plat
    * @kind interface
    *
    * @description
    * An object implementing IApp implements the methods called by the framework to support
    * Application Lifecycle Management (ALM) as well as error handling and navigation events.
    */
    interface IApp {
        /**
        * @name uid
        * @memberof plat.IApp
        * @kind property
        * @access public
        * @readonly
        *
        * @type {string}
        *
        * @description
        * A unique id, created during instantiation.
        */
        uid: string;
        /**
        * @name suspend
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app is suspended.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        suspend? (ev: events.ILifecycleEvent): void;
        /**
        * @name resume
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app resumes from the suspended state.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        resume? (ev: events.ILifecycleEvent): void;
        /**
        * @name error
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when an internal error occures.
        *
        * @param {plat.events.IErrorEvent} ev The {@link plat.events.IErrorEvent|IErrorEvent} object.
        *
        * @returns {void}
        */
        error? (ev: events.IErrorEvent<Error>): void;
        /**
        * @name ready
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app is ready.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        ready? (ev: events.ILifecycleEvent): void;
        /**
        * @name online
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app regains connectivity and is now in an online state.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        online? (ev: events.ILifecycleEvent): void;
        /**
        * @name offline
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @virtual
        *
        * @description
        * Event fired when the app loses connectivity and is now in an offline state.
        *
        * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
        *
        * @returns {void}
        */
        offline? (ev: events.ILifecycleEvent): void;
        /**
        * @name dispatchEvent
        * @memberof plat.IApp
        * @kind function
        * @access public
        *
        * @description
        * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to all
        * listeners based on the {@link plat.events.EventManager.DIRECT|DIRECT} method. Propagation
        * will always start with the sender, so the sender can both produce and consume the same event.
        *
        * @param {string} name The name of the event to send, cooincides with the name used in the
        * {@link plat.App.on|app.on()} method.
        * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
        *
        * @returns {void}
        */
        dispatchEvent(name: string, ...args: any[]): void;
        /**
        * @name on
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @variation 0
        *
        * @description
        * Registers a listener for a beforeNavigate event. The listener will be called when a beforeNavigate
        * event is propagating over the app. Any number of listeners can exist for a single event name.
        * This event is cancelable using the {@link plat.events.INavigationEvent.cancel|ev.cancel()} method,
        * and thereby preventing the navigation.
        *
        * @param {string} name='beforeNavigate' The name of the event, cooinciding with the beforeNavigate event.
        * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the beforeNavigate event is fired.
        *
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        on(name: 'beforeNavigate', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
        * @name on
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @variation 1
        *
        * @description
        * Registers a listener for a navigating event. The listener will be called when a navigating
        * event is propagating over the app. Any number of listeners can exist for a single event name.
        * This event is cancelable using the {@link plat.events.INavigationEvent.cancel|ev.cancel()} method,
        * and thereby preventing the navigation.
        *
        * @param {string} name='navigating' The name of the event, cooinciding with the navigating event.
        * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigating
        * event is fired.
        *
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        on(name: 'navigating', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
        * @name on
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @variation 2
        *
        * @description
        * Registers a listener for a navigated event. The listener will be called when a navigated
        * event is propagating over the app. Any number of listeners can exist for a single event name.
        * This event is not cancelable.
        *
        * @param {string} name='navigated' The name of the event, cooinciding with the navigated event.
        * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigated
        * event is fired.
        *
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        on(name: 'navigated', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
        * @name on
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @variation 3
        *
        * @description
        * Registers a listener for a routeChanged event. The listener will be called when a routeChange event
        * is propagating over the app. Any number of listeners can exist for a single event name.
        *
        * @param {string} eventName='routeChange' This specifies that the listener is for a routeChange event.
        * @param {(ev: plat.events.INavigationEvent<plat.web.IRoute<any>>) => void} listener The method called
        * when the routeChange is fired. The route argument will contain a parsed route.
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        on(name: 'routeChanged', listener: (ev: events.INavigationEvent<web.IRoute<any>>) => void): IRemoveListener;
        /**
        * @name on
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @variation 4
        *
        * @description
        * Registers a listener for a {@link plat.events.NavigationEvent|NavigationEvent}. The listener will be called
        * when a NavigationEvent is propagating over the app. Any number of listeners can exist for a single event name.
        *
        * @param {string} name The name of the event, cooinciding with the {@link plat.events.NavigationEvent|NavigationEvent} name.
        * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the
        * {@link plat.events.NavigationEvent|NavigationEvent} is fired.
        *
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        on(name: string, listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
        * @name on
        * @memberof plat.IApp
        * @kind function
        * @access public
        * @variation 5
        *
        * @description
        * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when
        * a DispatchEvent is propagating over the app. Any number of listeners can exist for a single event name.
        *
        * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
        * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when
        * the DispatchEvent is fired.
        *
        * @returns {plat.IRemoveListener} A method for removing the listener.
        */
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;
        /**
        * @name load
        * @memberof plat.IApp
        * @kind function
        * @access public
        *
        * @description
        * Kicks off compilation of the DOM from the specified node. If no node is specified,
        * the default start node is document.body. This method should be called from the app when
        * using module loaders. If a module loader is in use, the app will delay loading until
        * this method is called.
        *
        * @param {Node} node The node where at which DOM compilation begins.
        *
        * @returns {void}
        */
        load(node?: Node): void;
    }
    /**
    * @name IObject
    * @memberof plat
    * @kind interface
    *
    * @description
    * Interface for an object where every key has the same typed value.
    *
    * @typeparam {any} T The type of each value in the object.
    */
    interface IObject<T> {
        /**
        * @name [key: string]
        * @memberof plat.IObject
        * @kind property
        * @access public
        * @static
        *
        * @type {T}
        *
        * @description
        * Every key must be of type T
        */
        [key: string]: T;
    }
    /**
    * @name IRemoveListener
    * @memberof plat
    * @kind interface
    *
    * @description
    * Defines a function that will halt further callbacks to a listener.
    * Equivalent to `() => void`.
    */
    interface IRemoveListener {
        /**
        * @memberof plat.IRemoveListener
        * @kind function
        * @access public
        * @static
        *
        * @description
        * The method signature for {@link plat.IRemoveListener|IRemoveListener}.
        *
        * @returns {void}
        */
        (): void;
    }
    /**
    * @name IPropertyChangedListener
    * @memberof plat
    * @kind interface
    *
    * @description
    * Defines a function that will be called whenever a property has changed.
    */
    interface IPropertyChangedListener {
        /**
        * @memberof plat.IPropertyChangedListener
        * @kind function
        * @access public
        * @static
        *
        * @description
        * The method signature for {@link plat.IPropertyChangedListener|IPropertyChangedListener}.
        *
        * @param {any} newValue? The new value of the observed property.
        * @param {any} oldValue? The previous value of the observed property.
        *
        * @returns {void}
        */
        (newValue?: any, oldValue?: any): void;
    }
}
