const express = require('express');
const router = express.Router();
const articleHandler = require('../router_handler/article');

const multer = require('multer');
const path = require('path');

const expressJoi = require('@escook/express-joi');
const { add_article_schema } = require('../schema/article');

// 创建上传的实例对象
const upload = multer({dest: path.join(__dirname, '../uploads')});

// upload.single上传单个文件到指定路径，并解析FormData格式的表单数据
// 将文件类型的数据挂载到req.file上
// 将文本类型的数据挂载到req.body上
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), articleHandler.addArticle);

module.exports = router;