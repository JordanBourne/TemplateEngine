class HTMLResponseConstructor {
    constructor(params) {
        this.response = "";
    }

    addLine(tabs, content) {
        for (let i = 0; i < tabs; i++) {
            this.response += "    ";
        }

        this.response += content;
        this.response += "\r\n";
    }

    getResponse() {
        return this.response;
    }
}

module.exports = HTMLResponseConstructor;
