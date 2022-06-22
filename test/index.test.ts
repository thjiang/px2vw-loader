"use strict";

const px2vw = require("../lib/index");

test("convert normally", () => {
    expect(px2vw("line-height: 20px;")).toBe("line-height: 6.25vw;");
});

test("Do not convert less than 1px", () => {
    expect(px2vw("margin-bottom: 1px;")).toBe("margin-bottom: 1px;");
});
