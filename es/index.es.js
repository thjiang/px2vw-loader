const loaderUtils = require("loader-utils");

const getOptions = loaderUtils.getOptions;
const defaultOptions = {
  unitToConvert: "px",
  viewportWidth: 750,
  viewportUnit: "vw",
  minPixelValue: 1,
  unitPrecision: 2 // (Number) 单位转换后保留的精度

};

const getUnitRegexp = unit => {
  return new RegExp("\"[^\"]+\"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)" + unit, "g");
};

const toFixed = (number, precision) => {
  var multiplier = Math.pow(10, precision + 1),
      wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
};

const createPxReplace = opts => {
  return function (m, $1) {
    if (!$1) return m;
    var pixels = parseFloat($1);
    if (pixels <= opts.minPixelValue) return m;
    var parsedVal = toFixed(pixels / opts.viewportWidth * 100, opts.unitPrecision);
    return parsedVal === 0 ? "0" : parsedVal + opts.viewportUnit;
  };
};

const px2vw = (source, opts) => {
  return source.replace(getUnitRegexp(opts.unitToConvert), createPxReplace(opts));
};

const px2vwLoader = function (source) {
  this.cacheable();
  const options = getOptions(this) || {};
  const callback = this.async();
  const opts = Object.assign({}, defaultOptions, options);
  callback(null, px2vw(source, opts));
};

export { px2vwLoader as default };
