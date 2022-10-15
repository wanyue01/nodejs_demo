const joi = require('joi');

/*
  * string() 值必须是字符串
  * alphanum() 值必须是字母或数字
  * min(length) 最小长度
  * max(length) 最大长度
  * required() 值是必须项，不能是undefined
  * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

const id = joi.number().required();
const nickname = joi.string().required();
const email = joi.string().email().required();

const avatar = joi.string().dataUri().required();

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  body: {
    username,
    password
  }
}

exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}

exports.update_password_schema = {
  body: {
    oldPwd: password,
    /*
    joi.ref('oldPwd')表示newPwd的值要和oldPwd的值一致
    joi.not(joi.ref('oldPwd'))表示newPwd的值不能和oldPwd的值一致
    .concat()用于合并规则
     */
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}

exports.update_avatar_schema = {
  body: {
    avatar
  }
}