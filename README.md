# Express 연습
본 프로젝트는 `express-generator`로 생성한 코드를 기반으로 제작되었습니다.

## 폴더 구조
- `bin/www`: 서버 실행 스크립트.
- `public`: 외부(클라이언트)에서 접근 가능한 파일 모음.
- `routes`: 주소 별 라우터. 서버의 로직이 작성되는 곳.
- `views`: 템플릿 모음. 화면 부분.


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
|`path`    |미들웨어 함수 호출 경로, Router 객체 항목 참고 바람.|
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
- `"route"`: 다음 라우터로 이동, 라우터에서만 작동
- 이 외 (`error`): 에러 핸들러로 이동

## Router 객체
익스프레스로 요청 매서드와 주소별 분기 처리를 쉽게 수행함으로 라우팅을 깔끔하게 관리할 수 있습니다.

`app.use` 매서드의 첫번째 인자에 주소를 넣어, 특정 주소에 해당하는 요청이 왔을 때만 미들웨어를 작동시킬 수 있게 합니다.

`use` 대신 HTTP 메서드(`get`, `post`, `put`, `patch`, `delete` 등)를 사용할 수 있습니다. 이 경우, 주소와 HTTP 메서드 모두 일치하는 요청에만 실행됩니다.

라우터에서는 반드시 요청에 대한 응답을 보내거나, 에러 핸들러로 요청을 남겨야 합니다.

`next("route")`로 라우터에 연결된 나머지 미들웨어를 건너뛸 수 있습니다.

### 주소 패턴
패턴을 사용하여 요청한 주소에 대한 정보를 얻을 수 있습니다. 일종의 와일드카드 역할을 하므로 일반 라우터보다 뒤쪽에 위치해야 합니다.
- `req.params`: 주소에 `:<text>` 항목을 `req.params.<text>`에서 조회할 수 있습니다.
- `req.query`: 주소의 쿼리스트링 키-값 정보가 `req.query` 객체에서 확인할 수 있습니다.

```js
// EXAMPLE
router.get("/:id", (req, res) => {
    console.log(req.params.id, req.query);
});

// REQUEST URL: /10
// req.params.id == "10"
```

### 응답
응답으로 `send`, `sendFile`, `json`, `redirect`, `render` 등을 사용할 수 있습니다.

```js
res.send(/*버퍼, 문자열, HTML, 또는 JSON*/)
res.sendFile(/*파일 경로*/)
res.json(/*JSON 데이터*/)
res.redirect(/*주소*/)
res.render(/*템플릿 파일 경로*/, {/*변수*/})
```

기본적으로 200 상태 코드를 응답하지만(`redirect`는 302), `status` 메서드로 바꿀 수 있습니다.
`res.status(404).send("404 NOT FOUND")`

`render` 메서드는 템플릿 엔진을 렌더링할 때 사용합니다.

## Pug 템플릿 엔진
### HTML
### 변수
### 반복문, 조건문
### `include`, `extends`, `block`