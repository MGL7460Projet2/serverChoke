describe('Chokes', function () {

var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:3000');

it('should return a 200 response', function(done) {
   api.get('/api/chokes')
   .set('Accept', 'application/json')
   .expect(200,done)
});

it('should create a new choke', function(done) {
   api.post('/api/chokes')
   .set('Accept', 'application/x-www-from-urlencoded')
   .send({
     fbSender: '22',
     fbReceiver: '11',
     event: [],
     answered : false,
     response : false
   })
   .expect('Content-Type', /json/)
   .expect(200)
   .end(function(err, res){
	  //res.should.have.status(400);
	  done();
   });
});


it('should be an object with keys and values', function(done) {
   api.get('/api/chokes/5646a8ebfa17227c161273d5')
   .set('Accept', 'application/json')
   .expect(200)
   .end(function(err, res) {
    expect(res.body).to.have.property("fbSender");
	  expect(res.body.fbSender).to.not.equal(null);
	  expect(res.body).to.have.property("fbReceiver");
	  expect(res.body.fbReceiver).to.not.equal(null);
	  expect(res.body).to.have.property("answered");
	  expect(res.body.answered).to.not.equal(null);
	  done();
	});
});


it('should be updated with a new answred value', function(done) {
   api.put('/api/chokes/5646a8ebfa17227c161273d5')
   .set('Accept', 'application/x-www-from-urlencoded')
   .send({
     fbSender: '22',
     fbReceiver: '11',
     event: [],
     answered : true,
     response : false
   })
   .expect(200)
   .end(function(err, res) {
    expect(res.body.answered).to.equal(true);
	  expect(res.body.response).to.equal(false);
    expect(res.body.fbSender).to.equal("22");
	  expect(res.body.fbReceiver).to.equal("11");
	  done();
	});
  });

it('should respond 200',function(done){
	api.del('/api/chokes/5646a8ebfa17227c161273d5')
	.set('Accept', 'application/json')
	.expect(200)
	.end(function(err, res) {
	  done();
	});
});



});
