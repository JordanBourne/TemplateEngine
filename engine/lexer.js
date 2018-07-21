const fs = require("fs");

class Lexer {
    constructor(params) {
        this.content = params.content;
        this.options = params.options;
    }

    renderContent(callback) {
        return callback(null, this.content.toString().replace("<|title|>", this.options.title));
    }
}

module.exports = {
    create: function(params) {
        return new Lexer(params);
    }
};
