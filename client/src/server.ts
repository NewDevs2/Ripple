export { };
const path = require('path');
const express = require('express');
const app = express();
// 루트 경로에 대한 요청 처리
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
console.log(__dirname)
// 서버 시작
app.listen(3000, () => {
  console.log('서버 정상 실행');
});
