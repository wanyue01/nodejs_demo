const express = require('express');
const router = express.Router();
const userinfoHandler = require('../router_handler/userinfo');
const expressJoi = require('@escook/express-joi');
const {update_userinfo_schema, update_password_schema, update_avatar_schema} = require('../schema/user')

router.get('/userinfo', userinfoHandler.getUserInfo);

// 更改用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfoHandler.updateUserInfo);

router.post('/update_pwd', expressJoi(update_password_schema) ,userinfoHandler.updatePassword);

router.post('/update/avatar', expressJoi(update_avatar_schema), userinfoHandler.updateAvatar)

module.exports = router;