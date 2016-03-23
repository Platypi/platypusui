[![npm version](https://badge.fury.io/js/platypusui.svg)](http://badge.fury.io/js/platypusui)
[![Downloads](http://img.shields.io/npm/dm/platypusui.svg)](https://npmjs.org/package/platypusui)
[![Dependency Status](https://david-dm.org/Platypi/platypusui.svg)](https://david-dm.org/Platypi/platypusui)
[![devDependency Status](https://david-dm.org/Platypi/platypusui/dev-status.svg)](https://david-dm.org/Platypi/platypusui#info=devDependencies)

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

This package includes a declaration file, as well as the source `.js` and `.min.js` file. If you are
using TypeScript >= 1.6.0 everything will be handled for you. Otherwise you can use one of the following
methods.

### with Typings

```shell
typings install --save npm:platypusui
```

### without Typings

Reference `/node_modules/platypusui/dist/platypusui.d.ts` from your `tsconfig.json`

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

Documentation is available on the [Platypi Developers Website](https://developers.platypi.io).
