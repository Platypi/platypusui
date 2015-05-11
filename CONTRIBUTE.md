# platypusui

This library contains the [Platypi](https://platypi.io) UI framework, PlatypusUI. It is built on top of [PlatypusTS](https://platypi.io/products/platypusts).

## Dependencies

PlatypusUI depends on PlatypusTS

### Development Dependencies

While developing, ensure that [NodeJS](http://nodejs.org/) is installed.

## Platform support

PlatypusUI is designed for use in a browser only. It works in all *evergreen* browsers (IE >= 10)

## Documentation

Find all the documentation on PlatypusUI [here](https://platypi.io/docs/platui)

## Building the Code

To build the code take the following steps:

0. From the root project folder run:
```shell
npm install
```
0. Run the following task:
```
npm run build-all
```

### Building for Deployment

To build a deployment package of PlatypusUI take the following steps:

0. Ensure that [Grunt](http://gruntjs.com/) is installed. If you need to install it you can use the following command:
```shell
npm install grunt -g
```
0. Run the following command:
```shell
grunt
```
0. You will find the compiled package in the `dist` directory.

### Building for Documentation Output

PlatypusUI is heavily documented using JSDoc format. However, for distribution many of the comments are stripped out in order to make 
them easier to read in various IDEs. To get a build of PlatypusUI with full documentation take the following steps:

0. Ensure that [Grunt](http://gruntjs.com/) is installed. If you need to install it you can use the following command:
```shell
npm install grunt -g
```
0. Run the following command:
```shell
grunt docs
```
0. You will find the compiled file in the `dist` directory.

## Developing the Code

While developing the code, there are a few useful npm scripts:

0. `watch-examples`: Builds and watches the examples directory
0. `watch-src`: Builds and watches the src directory

Run any of these scripts with the following command:

```shell
npm run <script>
```

### Using the Examples

The examples directory is a playground for quickly testing functionality. You can run the examples using the following command:

```shell
npm run examples
```

This will open a server in the `examples` directory running on port 3000. You can then open you browser to http://localhost:3000/examples to 
use the examples.

## Cleaning the Build

To clean all the built-files execute the following command:

```shell
npm run clean-all
```

> **NOTE:** More tasks can be found in the `package.json`
