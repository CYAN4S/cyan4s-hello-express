var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/**
 * morgan 미들웨어가 로그 기록을 해줍니다.
 * 함수의 인자로 dev, short, common, combined 등을 사용할 수 있습니다.
 * 파일이나 데이터베이스에 저장할 때는 winston 모듈을 권장합니다.
 */
app.use(logger("dev"));

/**
 * static 미들웨어는 정적인 파일들을 제공합니다.
 * 함수의 인자로 정적 파일들이 있는 폴더를 지정합니다.
 * 익스프레스 내장 미들웨어입니다.
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * body-parser 미들웨어는 요청의 본문을 해석합니다.
 * 일부 기능이 익스프레스에 내장되어 있습니다.
 * 별도의 설치로 Raw, Text 형식 해석 기능을 넣을 수 있습니다.
 * extended == true인 경우, 내장 모듈이 아닌 qs 패키지를 사용합니다.
 * 해석된 본문은 req.body에 추가됩니다.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * cookie-parser 미들웨어로 요청에 동봉된 쿠키를 해석합니다.
 * 해석된 쿠키는 req.cookies에 들어갑니다.
 * 문자열을 인자로 넣어 서명된 쿠키를 만듭니다.
 */
app.use(cookieParser("secret code"));

/**
 * express-session 미들웨어로 세션을 구현합니다.
 * 별도 설치 항목입니다.
 *
 * resave: 요청 시, 세션 수정 사항이 없어도 재저장
 * saveUninitalized: 세션에 저장할 내역이 없어도 저장
 * secret: 필수 항목, cookie-parser의 비밀 키 역할
 * cookie: 세션 쿠키 설정, 일반적인 쿠키 옵션을 제공
 */
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret code",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

/**
 * flash 미들웨어는 일회성 메세지들을 표시할 때 좋습니다.
 * 별도 설치 항목입니다.
 * req 객체에 req.flash 메서드를 추가합니다.
 */
app.use(flash());

// 라우터 파트입니다.
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
/**
 * 라우터가 요청을 처리하지 못할 시,
 * 아래에 제작된 다음 미들웨어인 404 처리 미들웨어로 넘어갑니다.
 */
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
