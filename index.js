import { getOptions } from "loader-utils";

const defaultOptions = {
    unitToConvert: "px", // (String) 需要转换的单位，默认为"px"
    viewportWidth: 750, // (Number) 设计稿的视口宽度
    viewportUnit: "vw", // (String) 希望使用的视口单位
    minPixelValue: 1, // (Number) 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
    unitPrecision: 2 // (Number) 单位转换后保留的精度
};

const pxRegex = getUnitRegexp(opts.unitToConvert);

const getUnitRegexp = (unit) => {
    return new RegExp(
        "\"[^\"]+\"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)" + unit,
        "g"
    );
};

const px2vw = (source, opts) => {
    return source.replace(pxRegex, createPxReplace(opts));
};

function createPxReplace(opts) {
    return function (m, $1) {
        if (!$1) return m;
        var pixels = parseFloat($1);
        if (pixels <= opts.minPixelValue) return m;
        var parsedVal = toFixed(
            (pixels / opts.viewportWidth) * 100,
            opts.unitPrecision
        );
        return parsedVal === 0 ? "0" : parsedVal + opts.viewportUnit;
    };
}

const toFixed = (number, precision) => {
    var multiplier = Math.pow(10, precision + 1),
        wholeNumber = Math.floor(number * multiplier);
    return (Math.round(wholeNumber / 10) * 10) / multiplier;
};

const px2vwLoader = (source) => {
    this.cacheable();
    const options = getOptions(this) || {};
    const callback = this.async();
    const opts = Object.assign({}, defaultOptions, options);

    callback(null, px2vw(source, opts));
};

export default px2vwLoader;
