# Express 연습
본 프로젝트는 `express-generator`로 생성한 코드를 기반으로 제작되었습니다.

## 폴더 구조
- `bin/www` 서버 실행 스크립트.
- `public` 외부(클라이언트)에서 접근 가능한 파일 모음.
- `routes` 주소 별 라우터. 서버의 로직이 작성되는 곳.
- `views` 템플릿 모음. 화면 부분.


## `bin\www`
http 모듈에 express 모듈을 연결하고, 포트를 지정합니다. 파일 첫 줄의 주석을 통해 해당 파일을 콘솔 명령어로 만들 수 있습니다.


## `app.js` app 모듈
`bin/www`에 사용될 app 모듈입니다. `app.set` 메서드로 익스프레스 앱을 설정하고, `app.use` 메서드로 미들웨어를 연결할 수 있습니다.

### 구조
- 클라이언트가 포트를 통해 노드 서버에 요청합니다.
- 노드 서버로 들어온 요청은 익스프레스 프레임워크 내 미들웨어들을 거쳐 클라이언트에게 응답합니다.


## 미들웨어
요청과 응답의 중간에 위치한, 익스프레스의 핵심 부분입니다.

### `app.use` 메서드
메서드의 인자로 함수 형태의 미들웨어를 넣습니다.

|인자|`[path,] callback [, callback...]`|
|---|---|
|`path`    |미들웨어 함수 호출 경로|
|`callback`|콜백 함수 형태의 미들웨어|

[참고 문서](https://expressjs.com/ko/4x/api.html#app.use)

### 미들웨어 만들기
```js
app.use(function(req, res, next) {
    // CONTENT
    next();
});
```

[참고 문서](https://expressjs.com/ko/4x/api.html#middleware-callback-function-examples)

#### `next` 함수의 인자
- 인자 없음: 다음 미들웨어로 넘김
- `route`: 
- 이 외 (`error`): 에러 핸들러로 이동
