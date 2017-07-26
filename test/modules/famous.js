var common = require("../common");
var should = common.should;
var server = common.server;
var chai = common.chai;

describe('/POST famous', () => {
    it('it should post a test famous message', (done) => {
        let subject = {
            subject: "movies"
        }
        chai.request(server)
            .post('/api/famous')
            .send(subject)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});