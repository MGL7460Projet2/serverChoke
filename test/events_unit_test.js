var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000/api");

// UNIT test begin

describe("Events unit test",function(){

  // #1 should return all eventss

    it("should returns all events",function(done){

    //calling Events api
    server
    .get('/events')
  //  .send({name : "fdf", face : "mkd", lastText : ""})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      res.body.data.should.equal(30);
      done();
    });
  });
});
