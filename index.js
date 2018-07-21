const Engine = require("./engine/createEngine");

class TemplateEngine {
    constructor(params) {
        this.app = params.app;
        this.createEngine();
    }

    createEngine() {
        let engine = Engine.create({app: this.app});
        return engine.createEngine();
    }
}

module.exports = {
    init: function (params) {
        return new TemplateEngine(params);
    }
};
