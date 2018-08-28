const serverIp = '35.200.103.250';
const mysql = require('mysql');
const conn = {
  host: serverIp,
  user: 'root',
  password: 'ngl1213',
  database: 'monolithic'
}

const redis = require('redis').createClient(6379, serverIp);  // redis 모듈 로드

redis.on('error', function (err) {  // Redis 에러 처리
  console.log('Redis Error ' + err);
});

/**
  구매관리 REST API
  구매: {
    method: POST,
    url: /purchases,
    parameter: {
      userid: '사용자고유번호',
      goodsid: '상품고유번호'
    },
    result: {
      errorcode: '에러코드',
      errormessage: '에러메시지'
    }
  },
  구매내역조회: {
    method: GET,
    url: /purchases,
    parameter: {
      userid: '사용자고유번호'
    },
    result: {
      errorcode: '에러코드',
      errormessage: '에러메시지',
      results: [{ //구매내역
        id: '구매고유번호',
        goodsid: '상품고유번호',
        date: '구매일자'
      }, ...]
    }
  }
*/
exports.onRequest = function (res, method, pathname, params, cb) {
  switch (method) {
    case 'POST':
      return register(res, method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    case 'GET':
      return inquiry(res, method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    default:
      return process.nextTick(cb, res, null);
  }
}

function register (res, method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (params.userid == null || params.goodsid == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);
  } else {
    redis.get(params.goodsid, (err, result) => {  // Redis에 상품 정보 조회
      if (err || result == null) {
        response.errorcode = 1;
        response.errormessage = "Redis failure";
        cb(response);
        return;
      }

      var connection = mysql.createConnection(conn);
      connection.connect();
      connection.query('insert into purchases (userid, goodsid) values (?, ?)',
      [params.userid, params.goodsid],
      (error, results, fields) => {
        if (error) {
          response.errorcode = 1;
          response.errormessage = error;
        }
        cb(response);
      }
    );
    connection.end();
    });
  }
}

function inquiry (res, method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (params.userid == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('select * from purchases where userid = ?',
      [params.userid],
      (error, results, fields) => {
        if (error || results.length == 0) {
          response.errorcode = 1;
          response.errormessage = error ? error : 'no data';
        } else {
          response.results = results;
        }
        cb(response);
      }
    );
    connection.end();
  }
}
