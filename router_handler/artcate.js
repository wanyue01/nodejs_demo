const db = require('../db/index');

exports.getArtCates = (req, res) => {
  const sql = 'select * from ev_article_cate where is_delete=0 order by id asc';
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '获取文章分类数据成功',
      data: result
    })
  })
}

exports.addArticleCate = (req, res) => {
  const sql = 'select * from ev_article_cate where name=? or alias=?';
  db.query(sql, [req.body.name, req.body.alias], (err ,result) => {
    if (err) return res.cc(err);
    if (result.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试');
    if (result.length === 1) {
      if (result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试');
      if (result[0].name === req.body.name) return res.cc('分类名称被占用');
      if (result[0].alias === req.body.alias) return res.cc('分类别名被占用');
    }
    const sql = 'insert into ev_article_cate set ?';
    db.query(sql, req.body, (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc('新增文章分类失败');
      res.cc('新增文章分类成功' ,0);
    })
  })
}

exports.deleteCateById = (req, res) => {
  const sql = 'update ev_article_cate set is_delete=1 where id=?';
  db.query(sql, res.params.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc('删除文章分类失败');
    res.cc('删除文章分类成功', 0);
  })
}

exports.getCateById = (req, res) => {
  const sql = 'select * from ev_article_cate where id=?';
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc('获取文章分类数据失败');
    res.send({
      status: 0,
      message: '获取文章分类数据成功',
      data: result[0]
    })
  })
}

exports.updateCateById = (req, res) => {
  const sql = 'select * from ev_article_cate where id!=? and (name=? or alias=?)';
  db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, result) => {
    if (err) return res.cc(err);
    if (result.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试');
    if (result.length === 1) {
      if (result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试');
      if (result[0].name === req.body.name) return res.cc('分类名称被占用');
      if (result[0].alias === req.body.alias) return res.cc('分类别名被占用');
    }
    const sql = 'update ev_article_cate set ? where id=?';
    db.query(sql, [req.body, req.body.id], (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc('更新文章分类失败');
      res.cc('更新文章分类成功', 0);
    })
  })

}