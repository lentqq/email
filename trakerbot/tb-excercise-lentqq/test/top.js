function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}
process.env.NODE_ENV = 'test';

describe("UNIT TESTS", function () {
  importTest("Kmart", './unit/kmart');
});
