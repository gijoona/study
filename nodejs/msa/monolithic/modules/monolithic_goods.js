const mysql = require('mysql');
const conn = {
  host: 'localhost',
  user: 'root',
  password: 'ngl1213',
  database: 'monolithic',
  multipleStatements: true  // 상품 등록 후 아이디를 알아오려고 설정
}

const redis = require('redis').createClient();  // redis 모듈 로드
redis.on('error', function (err) {  // Redis 에러 처리
  console.log('Redis Error ' + err);
});

/**
  상품관리 REST API
  상품등록: {
    method: POST,
    url: /goods
    parameter: {
      name: '상품명',
      category: '상품 카테고리',
      price: '가격',
      description: '상품설명'
    },
    result: {
      errorcode: '에러코드',
      errormessage: '에러메시지'
    }
  }
  상품조회: {
    method: GET,
    url: /goods,
    result: {
      errorcode: '에러코드',
      errormessage: '에러메시지',
      results: [{  //'상품목록'
        id: '고유번호',
        name: '상품명',
        category: '상품카테고리',
        price: '가격',
        description: '상품설명'
      }, ...]
    }
  }
  상품삭제: {
    method: DELETE,
    url: /goods,
    parameter: {
      id: '상품고유번호'
    },
    result: {
      errorcode: '에러코드',
      errormessage: '에러메시지'
    }
  }
*/
exports.onRequest = function (res, method, pathname, params, cb) {
  // 메서드별로 기능 분기
  switch (method) {
    case 'POST':
      return register(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    case 'GET':
      return inquiry(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    case 'DELETE':
      return unregister(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    default:
      // 정의되지 않은 메서드면 null 리턴
      return process.nextTick(cb, res, null);
  }
}

function register (method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (params.name == null || params.category == null || params.price == null || params.description == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('insert into goods(name, category, price, description) values (?, ?, ?, ?); select LAST_INSERT_ID() as id;',
      [params.name, params.category, params. price, params.description],
      (error, results, fields) => {
        if (error) {
          response.errorcode = 1;
          response.errormessage = error;
        } else {  // Redis에 상품 정보 저장
          const id = results[1][0].id;
          redis.set(id, JSON.stringify(params));
        }
        cb(response);
      }
    );
    connection.end();
  }
}

function inquiry (method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  var connection = mysql.createConnection(conn);
  connection.connect();
  connection.query('select * from goods', (error, results, fields) => {
    if (error || results.length == 0) {
      response.errorcode = 1;
      response.errormessage = error ? error : 'no data';
    } else {
      response.results = results;
    }
    cb(response);
  });
  connection.end();
}

function unregister (method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (params.id == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('delete from goods where id = ?',
      [params.id],
      (error, results, fields) => {
        if (error) {
          response.errorcode = 1;
          response.errormessage = error;
        } else {
          redis.del(params.id); // Redis에 상품 정보 삭제
        }
        cb(response);
      }
    );
    connection.end();
  }
}
