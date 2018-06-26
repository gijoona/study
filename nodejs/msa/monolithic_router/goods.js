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
