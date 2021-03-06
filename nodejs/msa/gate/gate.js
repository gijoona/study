const http = require('http');
const url = require('url');
const querystring = require('querystring');

const tcpClient = require('./client.js');

let mapClients = {};
let mapUrls = {};
let mapResponse = {};
let mapRR = {};
let index = 0;

let server = http.createServer((req, res) => {

  let method = req.method;
  let uri = url.parse(req.url, true);
  let pathname = uri.pathname;

  if (method == 'OPTIONS') {  // 사전요청 처리
    console.log('!OPTIONS');
    var headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Access-Control-Allow-Origin";
    res.writeHead(200, headers);
    res.end();
  } else if (method == 'POST' || method == 'PUT') {  // POST, PUT 처리
    let body = '';

    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      let params;
      if(req.headers['content-type'] == 'application/json') {
        params = JSON.parse(body);
      } else {
        params = querystring.parse(body);
      }

      onRequest(res, method, pathname, params);
    });
  } else {  // GET, DELETE 처리
    onRequest(res, method, pathname, uri.query);
  }
}).listen(8000, () => {

  // Distributor 전달 패킷
  let packet = {
    uri: '/distributes',
    method: 'POST',
    key: 0,
    params: {
      port: 8000,
      name: 'gate',
      urls: []
    }
  };
  let isConnectedDistributor = false;

  // Distributor 접속
  this.clientDistributor = new tcpClient(
    '127.0.0.1',
    9000,
    (options) => {  // onCreated
      isConnectedDistributor = true;
      this.clientDistributor.write(packet);
    },
    (options, data) => {  // onRead
      onDistribute(data);
    },
    (options) => {  // onEnd
      isConnectedDistributor = false;
    },
    (options) => {  // onError
      isConnectedDistributor = false;
    }
  );

  setInterval(() => {
    if (!isConnectedDistributor) {
      this.clientDistributor.connect();
    }
  }, 3000);
});

// 요청정보처리
function onRequest (res, method, pathname, params) {

  let key = method + pathname;
  let client = mapUrls[key];

  // 처리가능한 API만 처리
  if (client == null) {
    res.writeHead(404, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end();
    return;
  } else {

    // 고유키 발급
    params.key = index;
    let packet = {
      uri: pathname,
      method: method,
      params: params
    };

    // 요청에 대한 응답 객체 저장
    mapResponse[index] = res;
    index++;  // 고유값 증가

    // 라운드 로빈 처리
    if (mapRR[key] == null) {
      mapRR[key] = 0;
    }
    mapRR[key]++;

    // 마이크로서비스에 요청
    client[mapRR[key] % client.length].write(packet);
  }
}

// Distributor 데이터 수신 처리
function onDistribute (data) {

  for (let param of data.params) {
    let node = param;
    let key = node.host + ":" + node.port;
    if (mapClients[key] == null && node.name != 'gate') {
      let client = new tcpClient(node.host, node.port, onCreateClient, onReadClient, onEndClient, onErrorClient);

      // 마이크로서비스 연결정보 저장
      mapClients[key] = {
        client: client,
        info: node
      };

      // 마이크로서비스 URL정보 저장
      for (let url of node.urls) {
        let key = url;
        if (mapUrls[key] == null) {
          mapUrls[key] = [];
        }
        mapUrls[key].push(client);
      }
      client.connect();
    }
  }
}

function onCreateClient (options) {
}

// 마이크로서비스 응답
function onReadClient (options, packet) {
  mapResponse[packet.key].writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  mapResponse[packet.key].end(JSON.stringify(packet));

  // 응답 객체 삭제
  delete mapResponse[packet.key];
}

function onEndClient (options) {
  let key = options.host + ":" + options.port;
  for (let url of mapClients[key].info.urls) {
    let node = url;
    delete mapUrls[node];
  }
  delete mapClients[key];
}

function onErrorClient (options) {
}
