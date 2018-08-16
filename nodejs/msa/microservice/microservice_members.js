'use strict';

const business = require('../monolithic/modules/monolithic_members.js');
const cluster = require('cluster'); // cluster 모듈

class members extends require('../server.js') {
  constructor () {

    // 초기화
    super('members',
      process.argv[2] ? Number(process.argv[2]) : 9020,
      ['POST/members', 'GET/members', 'DELETE/members']
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

if (cluster.isMaster) { // 부모 프로세스이면 자식 프로세스 실행
  cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  new members();  // 인스턴스 생성
}
