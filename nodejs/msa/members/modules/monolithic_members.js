const serverIp = '35.200.103.250';
const mysql = require('mysql');
const conn = {
  host: serverIp,
  user: 'root',
  password: 'ngl1213',
  database: 'monolithic'
}

/**
  회원관리 REST API
  회원등록: {
    method: POST,
    url: /members,
    parameter: {
      username: '사용자명',
      password: '패스워드'
    },
    result: {
      errorcode: '에러코드',
      errormessage: '에러메시지'
    }
  },
  회원인증: {
    method: GET,
    url: /members,
    parameter: {
      username: '사용자명',
      password: '패스워드'
    },
    result: {
      errorcode: '에러코드',
      errormessage: '에러메시지',
      userid: '사용자고유번호'
    }
  }
  회원탈퇴: {
    method: DELETE,
    url: /members,
    parameter: {
      username: '사용자명'
    },
    result: {
      errorcode: '에러코드',
      errormessage: '에러메시지'
    }
  }
*/
exports.onRequest = function (res, method, pathname, params, cb) {
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
      return process.nextTick(cb, res, null);
  }
}

function register (method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (params.username == null || params.password == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('insert into members (username, password) values (?, ?)',
      [params.username, params.password],
      (error, results, fields) => {
        if (error) {
          response.errorcode = 1;
          response.errormessage = error;
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

  if (params.username == null || params.password == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('select * from members where username = ? and password = ?',
      [params.username, params.password],
      (error, results, fields) => {
        if (error || results.length == 0) {
          response.errorcode = 1;
          response.errormessage = error ? error : 'no data';
        } else {
          response.userid = results[0].id;
        }
        cb(response)
      }
    );
    connection.end();
  }
}

function unregister (method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (params.username == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('delete from members where username = ?',
      [params.username],
      (error, results, fields) => {
        if (error) {
          response.errorcode = 1;
          response.errormessage = error;
        }
        cb(response);
      }
    );
    connection.end();
  }
}
