var common = require("../common");
var should = common.should;
var server = common.server;
var chai = common.chai;

describe('/POST yoda', () => {
    it('it should post a test yoda message', (done) => {
        let message = {
            message: "test" + Date.now()
        }
        chai.request(server)
            .post('/api/yoda')
            .send(message)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});