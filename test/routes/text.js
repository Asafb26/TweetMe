var common = require("../common");
var should = common.should;
var server = common.server;
var chai = common.chai;

describe('/GET text', () => {
    it('it should GET all the text', (done) => {
        chai.request(server)
            .get('/api/text?q=test')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
/*
* Test the /POST route
*/
describe('/POST text', () => {
    it('it should post a message', (done) => {
        var date = Date.now();
        let message = {
            message: date
        }
        chai.request(server)
            .post('/api/text')
            .send(message)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

});