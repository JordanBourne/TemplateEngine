const assert = require("chai").assert;
const expect = require("chai").expect;

const basicPagePath = require("../mocks/filePaths").basicPage;
const Lexer = require("../../engine/lexer");
const HTMLResponseConstructor = require("../utility/htmlResponseConstructor");

describe("Lexer::", () => {
    describe("integration::", () => {
        it("Should load the basic page", (done) => {
            let lexer = Lexer.create({
                content: "<div><| 2 + 2 |></div>",
                options: {}
            });

            lexer.renderContent((err, result) => {
                assert(!err, JSON.stringify(err));
                expect(result).to.equal("<div>4</div>");
                return done();
            });
        });
        it("Should use a variable from options", (done) => {
            let lexer = Lexer.create({
                content: "<div><| hello + ' World' |></div>",
                options: {
                    hello: "Hello"
                }
            });

            lexer.renderContent((err, result) => {
                assert(!err, JSON.stringify(err));
                expect(result).to.equal("<div>Hello World</div>");
                return done();
            });
        });
    });
    describe("unit tests::", () => {
        describe("parseJavaScript", () => {
            it("should parse strings and variables", () => {
                let lexer = Lexer.create({
                    content: "<div><| hello + ' World' |></div>",
                    options: {
                        hello: "Hello",
                        world: "World"
                    }
                });

                expect(lexer.parseJavaScript("hello + ' ' + world")).to.equal("Hello World");
            });
            it("should parse addition", () => {
                let lexer = Lexer.create({
                    content: "<div><| 2 + 2 |></div>",
                    options: {}
                });

                expect(lexer.parseJavaScript("2 + 2")).to.equal(4);
            });
            it("should parse an object", () => {
                let lexer = Lexer.create({
                    content: "<div><| test.object |></div>",
                    options: {
                        test: {
                            object: "Hello World"
                        }
                    }
                });

                expect(lexer.parseJavaScript("<div><| test.object |></div>")).to.equal("Hello World");
            });
            it("should parse an array", () => {
                let lexer = Lexer.create({
                    content: "<div><| test[0] |></div>",
                    options: {
                        test: ["Hello World"]
                    }
                });

                expect(lexer.parseJavaScript("<div><| test[0] |></div>")).to.equal("Hello World");
            });
        });
        describe("tokenizeJavaScript", () => {
            it("should tokenize simple JavaScript", () => {
                let lexer = Lexer.create({
                    content: "<div><| hello + ' World' |></div>",
                    options: {
                        hello: "Hello",
                        world: "World"
                    }
                });
                lexer.tokenizeJavaScript("hello + ' ' + world");

                expect(lexer.tokenizedJavaScript).to.deep.equal(getHelloWorldTokenString());
            });
            it("should tokenize an object", () => {
                let lexer = Lexer.create({
                    content: "",
                    options: {
                        hello: {
                            hello: "Hello",
                            world: "World",
                        }
                    }
                });
                lexer.tokenizeJavaScript("hello.hello + ' ' + hello.world");

                expect(lexer.tokenizedJavaScript).to.deep.equal(getHelloWorldTokenObject());
            });
            it("should tokenize an array", () => {
                let lexer = Lexer.create({
                    content: "",
                    options: {
                        hello: ["Hello World"]
                    }
                });
                lexer.tokenizeJavaScript("hello[0]");

                expect(lexer.tokenizedJavaScript).to.deep.equal(getHelloWorldTokenArray());
            });
        });
        describe("parseTokenedJavascript", () => {
            it("should parse tokenized simple JavaScript", () => {
                let lexer = Lexer.create({
                    content: "",
                    options: {
                        hello: "Hello",
                        world: "World"
                    }
                });
                let tokenizedJavaScript = getHelloWorldTokenString();

                expect(lexer.parseTokenedJavascript(tokenizedJavaScript)).to.equal('"Hello"+" "+"World"');
            });
            it("should parse tokenized objects", () => {
                let lexer = Lexer.create({
                    content: "",
                    options: {
                        hello: {
                            hello: "Hello",
                            world: "World"
                        }
                    }
                });
                let tokenizedJavaScript = getHelloWorldTokenObject();

                expect(lexer.parseTokenedJavascript(tokenizedJavaScript)).to.equal('"Hello"+" "+"World"');
            });
            it("should parse tokenized arrays", () => {
                let lexer = Lexer.create({
                    content: "",
                    options: {
                        hello: ["Hello World"]
                    }
                });
                let tokenizedJavaScript = getHelloWorldTokenArray();

                expect(lexer.parseTokenedJavascript(tokenizedJavaScript)).to.equal('"Hello World"');
            });
        });
        it("_isAlpha", () => {
            let lexer = Lexer.create({
                content: "<div><| 2 + 2 |></div>",
                options: {}
            });

            assert(lexer._isAlpha("a"), "a is being returned wrong");
            assert(lexer._isAlpha("z"), "z is being returned wrong");
            assert(lexer._isAlpha("A"), "A is being returned wrong");
            assert(lexer._isAlpha("Z"), "Z is being returned wrong");
            assert(lexer._isAlpha("_"), "_ is being returned wrong");
            assert(lexer._isAlpha("f"), "f is being returned wrong");
            assert(lexer._isAlpha("F"), "F is being returned wrong");
            assert(!lexer._isAlpha("-"), "- is being returned wrong");
            assert(!lexer._isAlpha("1"), "1 is being returned wrong");
            assert(!lexer._isAlpha("0"), "0 is being returned wrong");
            assert(!lexer._isAlpha("'"), "' is being returned wrong");
        });
        it("_isNumeric", () => {
            let lexer = Lexer.create({
                content: "<div><| 2 + 2 |></div>",
                options: {}
            });

            assert(!lexer._isNumeric("a"), "a is being returned wrong");
            assert(!lexer._isNumeric("A"), "A is being returned wrong");
            assert(!lexer._isNumeric("Z"), "Z is being returned wrong");
            assert(!lexer._isNumeric("_"), "_ is being returned wrong");
            assert(!lexer._isNumeric("-"), "- is being returned wrong");
            assert(lexer._isNumeric(9), "1 is being returned wrong");
            assert(lexer._isNumeric(0), "0 is being returned wrong");
            assert(lexer._isNumeric("5"), "5 is being returned wrong");
        });
        it("_isAlphaNumeric", () => {
            let lexer = Lexer.create({
                content: "<div><| 2 + 2 |></div>",
                options: {}
            });

            assert(lexer._isAlphaNumeric("a"), "a is being returned wrong");
            assert(lexer._isAlphaNumeric("A"), "A is being returned wrong");
            assert(lexer._isAlphaNumeric("Z"), "Z is being returned wrong");
            assert(lexer._isAlphaNumeric("_"), "_ is being returned wrong");
            assert(!lexer._isAlphaNumeric("-"), "- is being returned wrong");
            assert(lexer._isAlphaNumeric(9), "1 is being returned wrong");
            assert(lexer._isAlphaNumeric(0), "0 is being returned wrong");
            assert(lexer._isAlphaNumeric("5"), "5 is being returned wrong");
            assert(!lexer._isAlphaNumeric("'"), "' is being returned wrong");
        });
    });
});

function getHelloWorldTokenString() {
    return [
        {
            token: "variable",
            value: "hello"
        },
        {
            token: "operation",
            value: "+"
        },
        {
            token: "string",
            value: " "
        },
        {
            token: "operation",
            value: "+"
        },
        {
            token: "variable",
            value: "world"
        }
    ];
}

function getHelloWorldTokenObject() {
    return [
        {
            token: "variable",
            value: "hello.hello"
        },
        {
            token: "operation",
            value: "+"
        },
        {
            token: "string",
            value: " "
        },
        {
            token: "operation",
            value: "+"
        },
        {
            token: "variable",
            value: "hello.world"
        }
    ];
}

function getHelloWorldTokenArray() {
    return [
        {
            token: "variable",
            value: "hello[0]"
        }
    ];
}
