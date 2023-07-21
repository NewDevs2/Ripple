export { };

const express = require('express');
const app = express();

// 루트 경로에 대한 요청 처리
app.get('/', (req: any, res: any) => {
  res.send('Hello, Express!');
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버 정상 실행');
});
