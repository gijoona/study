// database
const OrientDB = require("orientjs");
const server = OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 1213
});
var db = server.use('monolithic');

exports.onRequest = function(res, method, pathname, params, cb){
  switch(method){
    case 'POST' :
      return register(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    case 'GET' :
      return inquiry(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    case 'DELETE' :
      return unregister(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    default :
      return process.nextTick(cb, res, null);
  }
};

function register(method, pathname, params, cb){
  var response = {
    errorcode: 0,
    errormessage: "success"
  };

  if(params.username == null || params.password == null){
    response.errorcode = 1;
    response.errormessage = "Invalid Parameters";
    cb(response);
  } else {
    db.class.get("MEMBERS").then(function(Members){
      Members.create(params).then(function(results){
        console.log(results);
        cb(response);
      });
    });
  }
}

function inquiry(method, pathname, params, cb){
  var response = {
    errorcode: 0,
    errormessage: "success"
  };

  db.class.get("MEMBERS").then(function(Members){
    Members.list().then(function(results){
      if(results.length == 0){
        response.errorcode = 1;
        response.errormessage = "No data";
        cb(response);
      } else {
        response.results = results;
        cb(response);
      }
    });
  });
}

function unregister(method, pathname, params, cb){
  var response = {
    errorcode: 0,
    errormessage: "success"
  };

  if(params["@rid"] == undefined){
    response.errorcode = 1;
    response.errormessage = "Invalid Parameters";
    cb(response);
  } else {
    db.class.get("MEMBERS").then(function(Members){
      Members.delete(params["@rid"]).then(function(results){
        console.log(results);
        cb(response);
      });
    });
  }
}
