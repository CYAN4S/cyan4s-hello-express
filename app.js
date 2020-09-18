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
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret code"));


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
app.use(flash());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
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
