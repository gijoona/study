'use strict';

const serverIp = '35.200.103.250';
const business = require('./modules/monolithic_purchases.js');
const cluster = require('cluster'); // cluster 모듈

class purchases extends require('./server.js') {
  constructor () {

    // 초기화
    super('purchases',
      process.argv[2] ? Number(process.argv[2]) : 9030,
      ['POST/purchases', 'GET/purchases']
    );

    // Distributor 접속
    this.connectToDistributor(serverIp, 9000, (data) => {
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

if (cluster.isMaster) { // 부모 프로세스이면 자식 프로세스 실행
  cluster.fork();

  cluster.on('exit', (worker, code, signal) => {  // 자식 프로세스가 죽을 경우 새로운 자식 프로세스 실행
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  new purchases();  // 인스턴스 생성
}
