'use strict';

const business = require('../monolithic/modules/monolithic_purchases.js');
class purchases extends require('../server.js') {
  constructor () {

    // 초기화
    super('purchases',
      process.argv[2] ? Number(process.argv[2]) : 9030,
      ['POST/purchases', 'GET/purchases']
    );

    // Distributor 접속
    this.connectToDistributor('localhost', 9000, (data) => {
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

new purchases();  // 인스턴스 생성
