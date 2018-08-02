let map = {};

/**
  distributor 클래스
*/
class distributor extends require('./server.js') {  // tcpServer 클래스 상속
  constructor () {
    super('distributor', 9000, ["POST/distributes", "GET/distributes"]);
  }

  // 노드 접속 이벤트 처리
  onCreate (socket) {
    console.log('onCreate', socket.remoteAddress, socket.remotePort);
    this.sendInfo(socket);
  }

  //접속 해제 이벤트 처리
  onClose (socket) {
    let key = socket.remoteAddress + ":" + socket.remotePort;
    console.log('onClose', socket.remoteAddress, socket.remotePort);
    delete map[key];
    this.sendInfo();
  }

  // 데이터 수신
  onRead (socket, json) {
    var key = socket.remoteAddress + ":" + socket.remotePort;
    console.log('onRead', socket.remoteAddress, socket.remotePort, json);

    // 노드정보 등록
    if (json.uri == '/distributes' && json.method == 'POST') {
      map[key] = {
        socket: socket
      };
      map[key].info = json.params;
      map[key].info.host = socket.remoteAddress;
      this.sendInfo();
    }
  }

  write (socket, packet) {
    socket.write(JSON.stringify(packet) + '¶');
  }

  // 노드 접속 또는 특정 소켓에 노드 접속 정보 전파
  sendInfo (socket) {
    var packet = {
      uri: '/distributes',
      method: 'GET',
      key: 0,
      params: []
    };

    for (let key in map) {
      packet.params.push(map[key].info);
    }

    if (socket) {
      this.write(socket, packet);
    } else {
      for (let key in map) {
        this.write(map[key].socket, packet);
      }
    }
  }
}

// distributor 객체 생성
new distributor();
