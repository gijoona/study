'use strict';

const business = require('../monolithic/modules/monolithic_goods.js');
class goods extends require('../server.js') {
  constructor () {

    // 초기화
    super('goods',
      process.argv[2] ? Number(process.argv[2]) : 9010,
      ['POST/goods', 'GET/goods', 'DELETE/goods']
    );

    // Distributor 접속
    this.connectToDistributor('127.0.0.1', 9000, (data) => {
      console.log("Distributor Notification", data);
    });
  }

  onRead (socket, data) { // onRead 구현
    console.log('onRead', socket.remoteAddress, socket.remotePort, data);
    business.onRequest(socket, data.method, data.uri, data.params, (s, packet) => {
      socket.write(JSON.stringify(packet) + '¶');  // 응답 패킷 전송
    });
  }
}

new goods();  // 인스턴스 생성
