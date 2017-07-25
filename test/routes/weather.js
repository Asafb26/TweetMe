var common = require("../common");
var should = common.should;
var server = common.server;
var chai = common.chai;

describe('/POST weather', () => {
    it('it should faied to post the weather during private ip address -> bad location', (done) => {
        chai.request(server)
            .post('/api/news')
            .send()
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

});