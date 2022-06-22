const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
    {
        resource: path.resolve(__dirname, "./demo.css"),
        loaders: [
            {
                loader: path.resolve(__dirname, "../lib/index.js"),
                options: {
                    name: "demo.[ext]",
                },
            },
        ],
        context: {
            emitFile: () => {},
        },
        readResource: fs.readFile.bind(fs),
    },
    (err, result) =>
        err ? console.error("err:", err) : console.log("result:", result)
);
