let dependencies = {
    fs: require("fs"),
    Lexer: require("./lexer")
}

class CreateEngine {
    constructor(params) {
        this.app = params.app;
    }

    createEngine() {
        this.app.engine("jbt", (filePath, options, callback) => {
            this.parseFile(filePath, options, callback);
        });
    }

    parseFile(filePath, options, callback) {
        if (!callback) {
            callback = options;
        }

        dependencies.fs.readFile(filePath, (err, content) => {
            if (err) return callback(err);

            return this.runEngine(content, options, callback);
        });
    }

    runEngine(content, options, callback) {
        let lexer = dependencies.Lexer.create({content, options});
        return lexer.renderContent(callback);
    }
}

module.exports = {
    create: function (params) {
        return new CreateEngine(params);
    },
    dependencies
};
