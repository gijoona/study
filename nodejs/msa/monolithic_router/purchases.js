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
      return register(res, method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    case 'GET' :
      return inquiry(res, method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    default :
      return process.nextTick(cb, res, null);
  }
}

function register(res, method, pathname, params, cb){
  var response = {
    errorcode: 0,
    errormessage: "success"
  };

  if(params.userid == nulll || params.goodsid == null){
    response.errorcode = 1;
    response.errormessage = "Invalid Parameters";
    cb(response);
  } else {
    db.class.get("PURCHASES").then(function(Purchases){
      Purchases.create(params).then(function(results){
        console.log(results);
        cb(response);
      });
    });
  }
}

function inquiry(res, method, pathname, params, cb){
  var response = {
    errorcode: 0,
    errormessage: "success"
  };

  db.class.get("PURCHASES").then(function(Purchases){
    Purchases.list().then(function(results){
      if(results.length == 0){
        response.errorcode = 1;
        response.errormessage = "No data";
        cb(response);
      } else {
        console.log(results);
        response.results = results;
        cb(response);
      }
    });
  });
}
