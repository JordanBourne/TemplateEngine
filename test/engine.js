const assert = require("chai").assert;
const expect = require("chai").expect;
const http = require("http");

const basicPagePath = require("./mocks/filePaths").basicPage;
const index = require("../index");
const HTMLResponseConstructor = require("./utility/htmlResponseConstructor");

const express = require("express");
const app = express();
const router = express.Router();

describe("Engine::", () => {
    let server;

    beforeEach(() => {
        index.init({app});
        router.get("/titleTest/:title", renderTitle);
        app.use("/", router);

        app.set("view engine", "jbt");

        server = app.listen(3000);
    });

    afterEach(() => {
        server.close();
    });

    it("Should load the basic page", (done) => {
        http.get({
            hostname: "localhost",
            port: 3000,
            path: "/titleTest/testing",
            agent: false
        }, (res) => {
            res.setEncoding("utf8");
            assert(res);
            expect(res.statusCode).to.equal(200);
            let rawData = "";
            res.on("data", (chunk) => {
                rawData += chunk;
            });
            res.on("end", () => {
                expect(rawData).to.equal(basicPageBody());
                return done();
            });
        });
    });
});

function renderTitle (req, res, next) {
    res.render(basicPagePath, { title: req.params.title });
}

function basicPageBody() {
    let htmlResponseConstructor = new HTMLResponseConstructor("test");
    htmlResponseConstructor.addLine(0, "<html>");
    htmlResponseConstructor.addLine(1, "<body>");
    htmlResponseConstructor.addLine(2, "testing");
    htmlResponseConstructor.addLine(1, "</body>");
    htmlResponseConstructor.addLine(0, "</html>");
    return htmlResponseConstructor.getResponse();
}
