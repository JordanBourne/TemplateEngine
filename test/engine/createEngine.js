const sinon = require("sinon");
const assert = require("chai").assert;
const expect = require("chai").expect;

const basicPagePath = require("../mocks/filePaths").basicPage;
const Engine = require("../../engine/createEngine");
const HTMLResponseConstructor = require("../utility/htmlResponseConstructor");

describe("Engine::", () => {
    let sandbox;
    let app;
    let engine;
    let createEngine;
    let parseFile;
    let runEngine;
    let engineStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        app = {
            engine: new Function()
        };

        engine = Engine.create({app});
        engineStub = sandbox.stub(engine.app, "engine")
            .callsArgWith(1, "a", "b", new Function());
        createEngineStub = sandbox.stub(engine, "createEngine");
        parseFileStub = sandbox.stub(engine, "parseFile")
            .callsArgWith(2, null);
        runEngineStub = sandbox.stub(engine, "runEngine")
            .callsArgWith(2, null);

        readFileStub = sandbox.stub(Engine.dependencies.fs, "readFile")
            .callsArgWith(1, null, "test");
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("createEngine::", () => {
        it("should call app.engine", (done) => {
            createEngineStub.restore();
            engine.createEngine();

            assert(engineStub.called);
            expect(parseFileStub.getCall(0).args[0]).to.equal("a");
            expect(parseFileStub.getCall(0).args[1]).to.equal("b");
            return done();
        });
    });

    describe("parseFileStub::", () => {
        beforeEach(() => {
            parseFileStub.restore();
        });

        it("should call fs.readFile with filePath", (done) => {
            engine.parseFile("fakePath", "test", new Function());

            assert(readFileStub.called);
            expect(runEngineStub.getCall(0).args[1]).to.equal("test");
            return done();
        });

        it("should work without second argument", (done) => {
            engine.parseFile("fakePath", new Function());

            assert(readFileStub.called);
            assert(runEngineStub.called);
            return done();
        });
    });
});
