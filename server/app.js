var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');
const { EXPIRETIME } = require('./assets/js/data');
const NewsRouter = require('./routes/admin/NewsRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const GestRouter = require('./routes/web/GestRouter');
const webProductRouter = require('./routes/web/ProductRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(webNewsRouter);
app.use(webProductRouter);

// 登录页面的路由控制
app.use((req, res, next) => {
  // 如果是登录路由则放行
  console.log(req.url);
  if (req.url === '/LYapi/admin/user/login') {
    next();
    return;
  } else if (req.url === '/LYapi/web/gest/add' || req.url === '/LYapi/web/gest/login') {
    next();
    return;
  } else {
    //这块是因为每次经过gestRouter中的网络请求才会执行以下代码，此处还未完成！
    // 每次进入其他路由都需检验是否token过期
    // 不是则继续生成新的token并更新
    // 是则向前端报错
    const token = req.headers['authorization'].split(' ')[1];
    // 载有效期内打开新页面都会去检验token是否过期，会一直生成新的token
    // 过一段时间未登录过期，则会向前端发送401错误，前端根据401错误将路由跳转至登陆页面s
    if (token) {
      var payload = JWT.verify(token);
      if (payload) {
        const newToken = JWT.generator(
          {
            _id: payload._id,
            username: payload.username ? payload.username : payload.gestname
          },
          EXPIRETIME
        );
        res.header('Authorization', newToken);
        next();
      } else {
        res.status(401).send({ errcode: '-1', errInfo: 'Token过期' });
      }
    }
  }
});
app.use(GestRouter);
app.use(UserRouter);
app.use(NewsRouter);
app.use(ProductRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// adminapi用于企业后台接口使用
// webapi用于网站接口使用

module.exports = app;
