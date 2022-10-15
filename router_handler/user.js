const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config')

exports.register = (req, res) => {
  let {username, password} = req.body;
  if (!username || !password) return res.send({status: 1, message: '用户名或密码不合法'});

  // 查询用户名是否被占用
  let sqlStr = 'select * from ev_users where username=?';
  db.query(sqlStr, username, (err, result) => {
    // if (err) return res.send({status: 1, message: err.message});
    if (err) return res.cc(err);
    // if (result.length > 0) return res.send({status: 1, message: '用户名被占用，请更换其他用户名'});
    if (result.length > 0) return res.cc('用户名被占用，请更换其他用户名');

    // 对密码进行加密  bcrypt.hashSync(明文, 随机盐值长度)
    password = bcrypt.hashSync(password, 10);

  sqlStr = 'insert into ev_users set ?';
  db.query(sqlStr, {username, password}, (err, result) => {
    // if (err) return res.send({status: 1, message: err.message});
    if (err) return res.cc(err);

    // if (result.affectedRows !== 1) return res.send({status: 1, message: '注册用户失败，请稍后再试'});
    if (result.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试');

    // res.send({status: 0, message: '注册成功'});
    res.cc('注册成功', 0);
  })
  })
};

exports.login = (req, res) => {
  const userinfo = req.body;
  const sql = 'select * from ev_users where username=?';
  db.query(sql, userinfo.username, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc('登录失败');
    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, result[0].password);
    if (!compareResult) return res.cc('登陆失败');

    // 生成token字符串
    const user = { ...result[0], password: '', user_pic: '' };
    const token = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn});
    res.send({
      status: 0,
      message: '登录成功',
      token: `Bearer ${token}`
    })
  })
};