const fs = require("fs");

class Lexer {
    constructor(params) {
        this.content = params.content.toString();
        this.options = params.options;
        this.parsedContent = [];
    }

    renderContent(callback) {
        this.tokenizePage();
        this.parsePageTokens();
        return callback(null, this.parsedContent);
    }

    tokenizePage() {
        this.pos = 0;
        this.bufferEnd = 0;
        this.nextToken = "<|";
        this.tokenizedContent = [];

        while (this.pos <= this.content.length) {
            this.bufferEnd = this.content.indexOf(this.nextToken, this.pos);
            if (this.bufferEnd === -1) this.bufferEnd = this.content.length;

            this.tokenizedContent.push({
                token: this.nextToken === "<|" ? "HTML" : "JavaScript",
                value: this.content.slice(this.pos, this.bufferEnd)
            });

            this.pos = this.bufferEnd + 2;
            this.nextToken = this.nextToken === "<|" ? "|>" : "<|";
        }
    }

    parsePageTokens() {
        for (let i = 0; i < this.tokenizedContent.length; i++) {
            let tokenValue = this.tokenizedContent[i].value;
            if (this.tokenizedContent[i].token === "JavaScript") {
                tokenValue = this.parseJavaScript(tokenValue);
            }
            this.parsedContent.push(tokenValue);
        }

        this.parsedContent = this.parsedContent.join("");
    }

    parseJavaScript(phrase) {
        this.tokenizeJavaScript(phrase);
        this.parseTokenedJavascript();
        return eval(this.parseTokenedJavascript());
    }

    tokenizeJavaScript(phrase) {
        this.pos = 0;
        this.bufferEnd = 0;
        this.tokenizedJavaScript = [];

        while(this.pos < phrase.length) {
            this.bufferEnd = phrase.indexOf(" ", this.pos);
            if (this.bufferEnd === -1) this.bufferEnd = phrase.length;

            let tokenValue = phrase.slice(this.pos, this.bufferEnd);
            let tokenType;

            if (this._isAlpha(tokenValue.charAt(0))) {
                tokenType = "variable";
            } else if (tokenValue.charAt(0) === "\"" || tokenValue.charAt(0) === "'") {
                tokenType = "string";
                this.bufferEnd = phrase.indexOf(tokenValue.charAt(0), this.pos + 1);
                if (this.bufferEnd === -1) throw "No close quote found";
                tokenValue = phrase.slice(this.pos + 1, this.bufferEnd);
            } else if (this._isSymbol(tokenValue.charAt(0))) {
                tokenType = "operation";
            } else if (this._isNumeric(tokenValue.charAt(0))) {
                tokenType = "number";
            }

            if (tokenType) {
                this.tokenizedJavaScript.push({
                    token: tokenType,
                    value: tokenValue
                });
            }

            this.pos = this.bufferEnd + 1;
        }
    }

    parseTokenedJavascript(code) {
        code = this.tokenizedJavaScript || code;
        let result = [];

        for (let i = 0; i < code.length; i++) {
            switch (code[i].token) {
                case "variable":
                    result.push("\"" + this.options[code[i].value] + "\"");
                    break;
                case "operation":
                    result.push(code[i].value);
                    break;
                case "string":
                    result.push("\"" + code[i].value + "\"");
                    break;
                case "number":
                    result.push(code[i].value);
                    break;
                default:
                    break;
            }
        }

        this.reconstructedJavaScript = result.join("");
        return this.reconstructedJavaScript;
    }

    _isAlpha(char) {
        return ("a" <= char &&
            "z" >= char) ||
            ("A" <= char &&
            "Z" >= char) ||
            char === "_";
    }

    _isNumeric(char) {
        return "0" <= char && "9" >= char;
    }

    _isAlphaNumeric(char) {
        return this._isAlpha(char) || this._isNumeric(char);
    }

    _isSymbol(char) {
        let symbols = ["+","-","*","/","="];
        return symbols.includes(char);
    }
}

function toggleJavaScript(currentChar, prevChar, isJavaScript) {
    if (this.splitContent[i] === "|" && prevChar === "<") {
        return true;
    }
    if (this.splitContent[i] === ">" && prevChar === "|") {
        return false;
    }
    return isJavaScript;
}

module.exports = {
    create: function(params) {
        return new Lexer(params);
    }
};
