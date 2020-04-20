<p align="center">
    <a href="https://www.npmjs.org/package/@cru/px2vw-loader">
        <img src="https://img.shields.io/npm/v/@cru/px2vw-loader.svg">
    </a>
    <a href="https://npmcharts.com/compare/@cru/px2vw-loader?minimal=true&periodLength=1">
        <img src="https://img.shields.io/npm/dm/@cru/px2vw-loader.svg">
    </a>
    <a href="LICENSE">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
    </a>
</p>

# @cru/px2vw-loader

> A Webpack Loader for Convert Px to Vw

## Demo

If your project involves a fixed width, this script will help to convert pixels into viewport units.

### Input

```css
.class {
    margin: -10px 0.5vh;
    padding: 5vmin 9.5px 1px;
    border: 3px solid black;
    border-bottom-width: 1px;
    font-size: 14px;
    line-height: 20px;
}

.class2 {
    border: 1px solid black;
    margin-bottom: 1px;
    font-size: 20px;
    line-height: 30px;
}

@media (min-width: 750px) {
    .class3 {
        font-size: 16px;
        line-height: 22px;
    }
}
```

### Output

```css
.class {
    margin: -3.125vw 0.5vh;
    padding: 5vmin 2.96875vw 1px;
    border: 0.9375vw solid black;
    border-bottom-width: 1px;
    font-size: 4.375vw;
    line-height: 6.25vw;
}

.class2 {
    border: 1px solid black;
    margin-bottom: 1px;
    font-size: 6.25vw;
    line-height: 9.375vw;
}

@media (min-width: 750px) {
    .class3 {
        font-size: 16px;
        line-height: 22px;
    }
}
```

## Getting Started

### Installation

Add via npm

```bash
$ npm install postcss-px-to-viewport --save-dev
or yarn

$ yarn add -D postcss-px-to-viewport
```

Usage

Default Options:

```js
{
    unitToConvert: "px", // (String) unit to convert, by default, it is px.
    viewportWidth: 750, // (Number) The width of the viewport.
    viewportUnit: "vw", // (String) Expected units.
    minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
    unitPrecision: 2 // (Number) The decimal numbers to allow the vw units to grow to.
}
```

#### Use with Webpack

```js
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "px2vw-loader",
                        options: {
                            viewportWidth: 1440,
                            unitPrecision: 4
                        }
                    }
                ]
            }
        ]
    }
};
```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

-   Hat tip to https://github.com/evrone/postcss-px-to-viewport/ for inspiring us for this project.
