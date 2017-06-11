var mongoose = require("mongoose");
var User = require('../app/models/user');
var Student = require('../app/models/student');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();


chai.use(chaiHttp);

describe('Users & Students', function(){

  this.token = '';

  beforeEach(function(done){
    User.remove({}, function(err){
      Student.remove({}, function(err){
        done();
      });
    });
  });

  describe('/POST addUser', () => {
    it('it should add a new User and Student', (done) => {
      chai.request(server)
          .post('/api/addUser')
          .send({
              "enrollment": '00000000000',
              "password": '00000',
              "admin": false,
              "name": "Test",
              "dob": "01/01/2001",
              "course": "Test Course",
              "semester": 0
            })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            done();
          });
    });
    it('it should fail to add a new User and Student', (done) => {
      chai.request(server)
          .post('/api/addUser')
          .send({
              "password": '00000',
              "admin": false,
              "name": "Test",
              "dob": "01/01/2001",
              "course": "Test Course",
              "semester": 0
            })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            done();
          });
    });
  });

  describe('/POST authenticate', () => {
    it('it should pass to get a authenticate token', (done) => {
      let user = new User({"enrollment":"00000000000","password":"00000","admin":false});
      user.save((err, user) => {
        let student = new Student({"enrollment":"00000000000", "name": "Test", "dob": "01/01/2001", "course": "Test Course", "semester": 0});
        student.save((err, student) => {
          chai.request(server)
            .post('/api/authenticate')
            .send({
                "enrollment": "00000000000",
                "password": '00000'
              })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true)
              res.body.should.have.property('msg')
              this.token = res.body['token'];
              done();
            });
        });
      });
    });
    it('it should fail to get a authenticate token', (done) => {
      let user = new User({"enrollment":"00000000000","password":"00000","admin":false});
      user.save((err, user) => {
        let student = new Student({"enrollment":"00000000000", "name": "Test", "dob": "01/01/2001", "course": "Test Course", "semester": 0});
        student.save((err, student) => {
          chai.request(server)
            .post('/api/authenticate')
            .send({
                "enrollment": "00000000000",
                "password": '0'
              })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
              done();
            });
        });
      });
    });
  });

  describe('/GET getUsers', () => {
    it('it should pass to get a list of all Students', (done) => {
      let user = new User({"enrollment":"00000000000","password":"00000","admin":false});
      user.save((err, user) => {
        let student = new Student({"enrollment":"00000000000", "name": "Test", "dob": "01/01/2001", "course": "Test Course", "semester": 0});
        student.save((err, student) => {
          chai.request(server)
            .get('/api/getUsers')
            .set({'x-access-token': this.token})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              done();
            });
        });
      });
    });
    it('it should pass to get an empty list of Students', (done) => {
      let user = new User({"enrollment":"00000000000","password":"00000","admin":false});
      user.save((err, user) => {
        chai.request(server)
          .get('/api/getUsers')
          .set({'x-access-token': this.token})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            done();
          });
      });
    });
    it('it should fail to get a list of Students', (done) => {
      chai.request(server)
        .get('/api/getUsers')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          done();
        });
    });
  });

});
