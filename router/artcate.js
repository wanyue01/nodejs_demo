const express = require('express');
const router = express.Router();

const artCateHandler = require('../router_handler/artcate');
const expressJoi = require('@escook/express-joi');
const {add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema} = require('../schema/artcate');

// 获取文章分类数据列表的路由
router.get('/cates', artCateHandler.getArtCates);

// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artCateHandler.addArticleCate);

// 删除文章分类的路由
router.get('/deletecate:id', expressJoi(delete_cate_schema), artCateHandler.deleteCateById);

// 根据id获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artCateHandler.getCateById);

// 根据id更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artCateHandler.updateCateById)

module.exports = router;