'use strict'; // Strict 모드 사용

const net = require('net');

/**
  tcpClient 클래스
*/
class tcpClient {

  /**
    생성자
  */
  constructor (host, port, onCreate, onRead, onEnd, onError) {
    this.options = {
      host: host,
      port: port
    };

    this.onCreate = onCreate;
    this.onRead = onRead;
    this.onEnd = onEnd;
    this.onError = onError;
  }

  /**
    접속 함수
  */
  connect () {
    this.client = net.connect(this.options, () => {
      if (this.onCreate) {

        // 접속완료 이벤트 콜백
        this.onCreate(this.options);
      }
    });

    // 데이터수신 처리
    this.client.on('data', (data) => {
      let sz = this.merge ? this.merge + data.toString() : data.toString();
      let arr = sz.split('¶');
      for (let n in arr) {
        if (sz.charAt(sz.length - 1) != '¶' && n == arr.length - 1) {
          this.merge = arr[n];
          break;
        } else if (arr[n] == "") {
          break;
        } else {
          this.onRead(this.options, JSON.parse(arr[n]));
        }
      }
    });

    // 접속종료 처리
    this.client.on('close', () => {
      if (this.onEnd) {
        this.onEnd(this.options);
      }
    });

    // 에러발생 처리
    this.client.on('error', (err) => {
      if (this.onError) {
        this.onError(this.options, err);
      }
    });
  }

  /**
    데이터 발송
  */
  write (packet) {
    this.client.write(JSON.stringify(packet) + '¶');
  }
}

module.exports = tcpClient;
