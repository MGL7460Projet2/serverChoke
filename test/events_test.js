describe('Events', function () {

var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:3000');

it('should return a 200 response', function(done) {
   api.get('/api/events')
   .set('Accept', 'application/json')
   .expect(200,done)
});


it('should be an object with keys and values', function(done) {
   api.get('/api/events/5646a8ebfa17227c161273d5')
   .set('Accept', 'application/json')
   .expect(200)
   .end(function(err, res) {
      expect(res.body).to.have.property("name");
	  expect(res.body.name).to.not.equal(null);
	  expect(res.body).to.have.property("face");
	  expect(res.body.face).to.not.equal(null);
	  expect(res.body).to.have.property("lastText");
	  expect(res.body.lastText).to.not.equal(null);
	  done();
	});
});

it('should create a new event', function(done) {
   api.post('/api/events')
   .set('Accept', 'application/x-www-from-urlencoded')
   .send({name: "bbba", face: "face", lastText: "aaa bbb ccc ddd eee"})
   .expect('Content-Type', /json/)
   .expect(200)
   .end(function(err, res){
	  //res.should.have.status(400);
	  done();
   });
});



it('should be updated with a new name', function(done) {
   api.put('/api/events/5646a8ebfa17227c161273d5')
   .set('Accept', 'application/x-www-from-urlencoded')
   .send({name: "Kevin a", face: "face", lastText: "aaa bbb ccc"})
   .expect(200)
   .end(function(err, res) {
      expect(res.body.name).to.equal("Kevin a");
	  expect(res.body.face).to.equal("face");
	  expect(res.body.lastText).to.equal("aaa bbb ccc");
	  done();
	});
  });

it('should respond 200',function(done){
	api.del('/api/events/564695e7910aa2041772649e')
	.set('Accept', 'application/json')
	.expect(200)
	.end(function(err, res) {
	  done();
	});
});



});
