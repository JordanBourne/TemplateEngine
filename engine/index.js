const fs = require("fs");
const express = require("express");
const app = express();

app.engine("jbt", function (filepath, options, callback) {
    fs.readFile(filepath, (err, content) => {
        if (err) {
            return callback(err);
        }
        const renderedContent = content.replace("#title#", options.title);
        return callback(null, renderedContent)
    });
});

module.exports = app;
