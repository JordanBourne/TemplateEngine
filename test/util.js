const assert = require("chai").assert;
const expect = require("chai").expect;

const util = require("../util");

describe("Util::", () => {
    let testObject;
    describe("getSafeObject::", () => {
        beforeEach(() => {
            testObject = {
                a: {
                    b: [{
                        c: "Hello"
                    }]
                },
                z: [{
                    y: {
                        x: "World"
                    }
                }]
            }
        });
        it("should get Hello", () => {
            let result = util.getSafeObject(testObject, "a.b[0].c");

            expect(result).to.equal("Hello");
        });
        it("should get World", () => {
            let result = util.getSafeObject(testObject, "z[0].y.x");

            expect(result).to.equal("World");
        });
        it("should not crash and return empty string", () => {
            let result = util.getSafeObject(testObject, "p.g.o[4]");

            expect(result).to.equal("");
        });
    });
    describe("getKeys::", () => {
        it("should handle string", () => {
            let keys = util.getKeys("hello");

            expect(keys).to.deep.equal(["hello"]);
        });
        it("should handle string with periods", () => {
            let keys = util.getKeys("hello.world.test.string");

            expect(keys).to.deep.equal(["hello", "world", "test", "string"]);
        });
        it("should handle string with brackets", () => {
            let keys = util.getKeys("hello[2]");

            expect(keys).to.deep.equal(["hello", "2"]);
        });
        it("should handle string with periods and brackets", () => {
            let keys = util.getKeys("hello[1].world[3].test.string[3]");

            expect(keys).to.deep.equal(["hello", "1", "world", "3", "test", "string", "3"]);
        });
    });
});
