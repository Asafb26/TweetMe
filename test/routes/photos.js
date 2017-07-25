var common = require("../common");
var should = common.should;
var server = common.server;
var chai = common.chai;

describe('/POST photos', () => {
    it('it should post a test photos', (done) => {
        let subejct = {
            subject: "test"
        }
        chai.request(server)
            .post('/api/photos')
            .send(subejct)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});