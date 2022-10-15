const express = require('express');

const app = express();

// 导入并配置cors中间件
const cors = require('cors');
app.use(cors());

// 配置解析表单数据的中间件，注意：这个中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.cc = function (err, status=1) {
    res.send({
      status,
      message: err instanceof Error ? err.message: err
    });
  }
  next();
})

const expressJwt = require('express-jwt');
const config = require('./config');
app.use(expressJwt({secret: config.jwtSecretKey})).unless({path: [/^\/api\//]});

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'));

// 导入并使用用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);

// 导入并使用文章分类的路由模块
const artCateRouter = require('./router/artcate');
app.use('/my/article', artCateRouter);

// 导入并使用文章模块
const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);

const joi = require('joi');
// 定义错误级别的中间件
app.use((err,req,res,next) => {
  if (err instanceof joi.ValidationError) return res.cc(err);
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');
  // 未知的错误
  res.cc(err);
})

app.listen(9090, () => {
  console.log('server running at http://127.0.0.1:9090');
})