function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

var common = require("./common");
var server

describe("Route Unit Testing", function () {
    importTest("text", './routes/text');
    importTest("news", './routes/news');
    importTest("photos", './routes/photos');
    importTest("weather", './routes/weather');
    importTest("yoda", './routes/yoda');
    importTest("famous", './routes/famous');
    after(function () {
        console.log("Done!");
    });
});