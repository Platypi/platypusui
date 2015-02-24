PlatypusUI
==========

A suite of controls built using PlatypusTS

## Install

You can use either `npm` or `bower` to install the packaged version of PlatypusUI.

### npm

```shell
npm install platypusui --save
```

The packaged version of this library works in CommonJS and on window, so if you are using 
[Browserify](https://github.com/substack/node-browserify) or other CommonJS 
module loaders you can use `require('platypusui')`. If you want to use `platui` on 
`window`, you can include it in your `index.html`:

```html
<link href="/node_modules/platypusui/platypus.min.css" rel="stylesheet" />

<script src="/node_modules/platypusui/platypusui.min.js"></script>
```

### bower

```
bower install platypusui --save
```

The packaged version of this library works with CommonJS and on window, so if you are using a CommonJS 
loader, you can use `require('/bower_components/platypusui/platypusui')`. If you want 
to use `platui` on `window`, you can include it in your `index.html`:

```html
<link href="/bower_components/platypusui/platypus.min.css" rel="stylesheet" />

<script src="/bower_components/platypusui/platypusui.min.js"></script>
```

## Use with TypeScript

The packaged version of this library includes two declaration files, as well as the source `.ts` file. You 
can use the `.ts` file if you want to modify it (e.g. compile it for AMD). If you are 
using `platui` on the window, you will want to reference the `platypusui-node.d.ts` 
declaration file:

```ts
/// <reference path="/node_modules/platypusui/platypusui.d.ts" />
```

or

```ts
/// <reference path="/bower_components/platypusui/platypusui.d.ts" />
```

## Use with LESS
The packaged version of this library includes a single platypus.less file. We recommend using a single 
LESS file to import all of your other LESS files, including platypus.less.

```less
@import "/node_modules/platypusui/platypus.less";
```

or

```less
@import "/bower_components/platypusui/platypus.less";
```

All of the `platui` variables and mixins are namespaced. The primary namespace is `#platui`. To overwrite 
a variable such as `@primary-color` simply re-declare the variable in the proper namespace.

```less
#platui {
    #variables {
        @primary-color: #0000ff;
    }
}
```

## Recommendations

It is recommended that you use a CommonJS module loader with PlatypusUI in favor of 
using `window.platui`.

## Documentation

Documentation is available on the [Platypi website](http://getplatypi.com/docs).
