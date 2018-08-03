'use strict';

const net = require('net');
const tcpClient = require('./client.js'); // tcpClient 클래스 참조
const logger = require('logat');

/**
  tcpServer 클래스
*/
class tcpServer {

  // 생성자
  constructor (name, port, urls) {
    this.log = logger;

    // 서버정보
    this.context = {
      port: port,
      name: name,
      urls: urls
    };
    this.merge = {};

    // 서버생성
    this.server = net.createServer((socket) => {
      this.onCreate(socket);

      // 에러 이벤트 처리
      socket.on('error', (exception) => {
        this.onClose(socket);
      });

      // 클라이언트 접속 정료 이벤트 처리
      socket.on('close', () => {
        this.onClose(socket);
      });

      // 데이터 수신 처리
      socket.on('data', (data) => {
        let key = socket.remoteAddress + ":" + socket.remotePort;
        let sz = this.merge[key] ? this.merge[key] + data.toString() : data.toString();
        let arr = sz.split('¶');
        for (let n in arr) {
          if (sz.charAt(sz.length - 1) != '¶' && n == arr.length - 1) {
            this.merge[key] = arr[n];
            break;
          } else if (arr[n] == "") {
            break;
          } else {
            this.onRead(socket, JSON.parse(arr[n]));
          }
        }
      });
    });

    // 서버 객체 에러 처리
    this.server.on('error', (err) => {
      console.log(err);
    });

    // listen
    this.server.listen(port, () => {
      console.log('listen', this.server.address());
    });
  }

  onCreate (socket) {
    console.log('onCreate', socket.remoteAddress, socket.remotePort);
  }

  onClose (socket) {
    console.log('onClose', socket.remoteAddress, socket.remotePort);
  }

  // Distributor 접속
  connectToDistributor (host, port, onNoti) {
    var packet = {
      uri: "/distributes",
      method: 'POST',
      key: 0,
      params: this.context
    };
    let isConnectedDistributor = false;

    this.clientDistributor = new tcpClient(
      host,
      port,
      (options) => {  // 접속 이벤트. onCreate
        isConnectedDistributor = true;
        this.clientDistributor.write(packet);
      },
       (options, data) => { onNoti(data); },  // 데이터 수신 이벤트. onRead
       (options) => { isConnectedDistributor = false; }, // 접속 종료 이벤트. onEnd
       (options) => { isConnectedDistributor = false; }  // 에러 처리 이벤트. onError
    );

    //  주기적인 Distributor 접속 시도
    setInterval(() => {
      if (!isConnectedDistributor) {
        this.clientDistributor.connect();
      }
    }, 3000);
  }
}

module.exports = tcpServer;  // export 선언
