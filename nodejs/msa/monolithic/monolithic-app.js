const PORT = 8000;

const http = require('http');
const url = require('url'); // url 모듈 로드
const querystring = require('querystring'); // querystring 모듈 로드

// 모듈 로드
const members = require('./modules/monolithic_members.js');
const goods = require('./modules/monolithic_goods.js');
const purchases = require('./modules/monolithic_purchases.js');

/**
  HTTP 서버를 만들고 요청 처리
*/
var server = http.createServer((req, res) => {
  var method = req.method;  // 메서드 얻어옴
  var uri = url.parse(req.url, true);
  var pathname = uri.pathname;  // URI를 얻어 옴

  // POST나 PUT이면 파라미터 읽음
  if (method === 'POST' || method === 'PUT') {
    var body = "";

    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      var params;

      // 헤더 정보가 json이면 처리
      if (req.headers['content-type'] == "application/json") {
        params = JSON.parse(body);
      } else {
        params = querystring.parse(body);
      }

      onRequest(res, method, pathname, params);
    });
  } else {  // GET과 DELETE이면 query 정보를 읽음
    onRequest(res, method, pathname, uri.query);
  }
}).listen(PORT, () => {
  console.log(`monolithic server listen PORT : ${PORT}`);
});

/**
  요청에 대해 회원관리, 상품관리, 구매관리 모듈별로 분기
  @param res        response 객체
  @param method     메서드
  @param pathname   URI
  @param params     입력 파라미터
*/
function onRequest(res, method, pathname, params) {
  switch(pathname) {
    case '/members' :
      members.onRequest(res, method, pathname, params, response);
      break;
    case '/goods' :
      goods.onRequest(res, method, pathname, params, response);
      break;
    case '/purchases' :
      purchases.onRequest(res, method, pathname, params, response);
      break;
    default:
      res.writeHead(404);
      return res.end();
  }
  // console.log(method, pathname, params);
  // res.end("response!")
}

/**
  HTTP 헤더에 JSON 형식으로 응답
  @param res    response 객체
  @param packet 결과 파라미터
*/
function response (res, packet) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(packet));
}
