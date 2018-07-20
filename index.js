// const engine = require("./engine");

// module.exports = engine;

const fs = require("fs");

function createEngine(app) {
    app.engine("jbt", function (filepath, options, callback) {
        fs.readFile(filepath, (err, content) => {
            if (err) {
                return callback(err);
            }
            const renderedContent = content.toString().replace("#title#", options.title);
            return callback(null, renderedContent)
        });
    });
}


module.exports = {
    create: createEngine
};
