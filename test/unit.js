process.env.NODE_ENV = 'test';

var nconf = require('nconf');
// Set up configs
nconf.use('memory');
// First load command line arguments
nconf.argv();
// Load environment variables
nconf.env();

// Load env from file
nconf.file({ file: './config/environments/' + nconf.get('NODE_ENV') + '.json' });

var logger = require('winston');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../config/initializers/server')();

let should = chai.should();

chai.use(chaiHttp);
//Text tests
describe('texts', () => {
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
});

//news tests
describe('news', () => {
    describe('/POST news', () => {
        it('it should post a test news', (done) => {
            let subejct = {
                subject: "test"
            }
            chai.request(server)
                .post('/api/news')
                .send(subejct)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});

//photos tests
describe('photos', () => {
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
});

//weather tests
describe('weather', () => {
    //news test
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
});
