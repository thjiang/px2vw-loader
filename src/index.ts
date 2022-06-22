const loaderUtils = require("loader-utils");

interface IOptions {
    unitToConvert: string;
    viewportWidth: number;
    viewportUnit: string;
    minPixelValue: number;
    unitPrecision: number;
}

const getOptions = loaderUtils.getOptions;

const defaultOptions: IOptions = {
    unitToConvert: "px", // (String) 需要转换的单位，默认为"px"
    viewportWidth: 750, // (Number) 设计稿的视口宽度
    viewportUnit: "vw", // (String) 希望使用的视口单位
    minPixelValue: 1, // (Number) 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
    unitPrecision: 2, // (Number) 单位转换后保留的精度
};

const getUnitRegexp = (unit: string) => {
    return new RegExp(
        "\"[^\"]+\"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)" + unit,
        "g"
    );
};

const toFixed = (number: number, precision: number) => {
    var multiplier = Math.pow(10, precision + 1),
        wholeNumber = Math.floor(number * multiplier);
    return (Math.round(wholeNumber / 10) * 10) / multiplier;
};

const createPxReplace = (opts: IOptions) => {
    return function (m: any, $1: any) {
        if (!$1) return m;
        var pixels = parseFloat($1);
        if (pixels <= opts.minPixelValue) return m;
        var parsedVal = toFixed(
            (pixels / opts.viewportWidth) * 100,
            opts.unitPrecision
        );
        return parsedVal === 0 ? "0" : parsedVal + opts.viewportUnit;
    };
};

const px2vw = (source: string, opts: IOptions) => {
    return source.replace(
        getUnitRegexp(opts.unitToConvert),
        createPxReplace(opts)
    );
};

const px2vwLoader = function (this: any, source: string) {
    this.cacheable();

    const options = getOptions(this) || {};
    const callback = this.async();
    const opts = Object.assign({}, defaultOptions, options);

    callback(null, px2vw(source, opts));
};

export default px2vwLoader;
