// database
const OrientDB = require("orientjs");
const server = OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 1213
});
var db = server.use('monolithic');

exports.onRequest = function(res, method, pathname, params, cb) {
  switch(method) {  // 메서드별 분기
    case 'POST' : // 메서드별 처리
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
      return process.nextTick(cb, res, null); // 정의되지 않은 메서드면 null 리턴
  }
}

/**
* 상품 등록 기능
* @param method   메서드
* @param pathname URI
* @param params   입력 파라미터
* @param cb       콜백
*/
function register(method, pathname, params, cb){
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: "success"
  };

  // 유효성 검사
  if(params.name == url || params.category == null || params.price == null || params.description == null){
    response.errorcode = 1;
    response.errormessage = "Invalid Parameters";
    cb(response);
  } else {
    db.class.get("GOODS").then(function(goods){
      goods.create(params).then(function(results){
        console.log(result);
        cb(response);
      });
    });
  }
}
