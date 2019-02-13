//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
const chai = require("chai");
const chaiHTTP = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHTTP);

// Parent block for external APIs
describe("External APIs", () => {

    // Test the GET route for random recipes
    describe("/GET Edamam Random", () => {
        it("it should GET 27 random recipes", (done) => {
            chai.request(server)
                .get("/api/external/edamam/random")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("hits");
                    res.body.hits.should.be.a("array");
                    res.body.hits.length.should.be.eql(27);
                    done();
                });
        })
    });

    // Test the GET route for searching recipes
    describe("/GET Edamam Recipes", () => {
        it("it should not GET recipes without a proper search query", (done) => {
            const query = "asdlfkj";
            chai.request(server)
                .get("/api/external/edamam/" + query)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.a("string").eql("No recipes found!");
                    done();
                });
        });

        it("it should GET recipes by search term", (done) => {
            const query = "chicken";
            chai.request(server)
                .get("/api/external/edamam/" + query)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("q").eql("keto " + query);
                    res.body.should.have.property("hits");
                    res.body.hits.should.be.a("array");
                    res.body.hits.length.should.be.gt(0);
                    done();
                });
        });
    });

    // Test GET route for nutrition info
    describe("/GET Nutritionix Nutrition Info", () => {
        it("it should not GET nutrition info without proper search query", (done) => {
            const query = "asdfjkl";
            chai.request(server)
                .get("/api/external/nutritionix/" + query)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.a("string").eql("No food item found!");
                    done();
                });
        });

        it("it should GET nutrition info for searched food", (done) => {
            const query = "apple";
            chai.request(server)
                .get("/api/external/nutritionix/" + query)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("common");
                    res.body.common.should.be.a("array");
                    res.body.common.length.should.be.gt(0);
                    done();
                });
        });
    });
});