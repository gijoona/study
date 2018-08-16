const cluster = require('cluster');           // cluster 모듈
const http = require('http');                 // http 모듈
const numCPUs = require('os').cpus().length;  // CPU 코어 수를 알아 옴

if (cluster.isMaster) { // 부모 프로세스일 경우
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) { // 코어 수만큼 자식 프로세스 실행
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {  // 자식 프로세스 종료 이벤트 감지
    console.log(`worker ${worker.process.pid} died`);
  });
} else {  // 자식 프로세스일 때 HTTP 서버 실행
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
