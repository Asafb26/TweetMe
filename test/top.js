function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe("Route Unit Testing", function () {
    importTest("text", './modules/text');
    importTest("news", './modules/news');
    importTest("photos", './modules/photos');
    importTest("weather", './modules/weather');
    importTest("yoda", './modules/yoda');
    importTest("famous", './modules/famous');
    after(function () {
        console.log("Done!");
    });
});