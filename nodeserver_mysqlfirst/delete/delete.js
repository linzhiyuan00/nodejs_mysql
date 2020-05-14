const { pool, Result, router } = require('../connect');

router.post('/delete', (req, res) => {
  let name = req.body.name;
  console.log(name);
  pool.getConnection((err, conn) => {
    if (err) {
      console.log('获取连接池失败')
    } else {
      //  从连接池中拿一个连接
      let sql = 'delete from student where name=?';
      let value = [name];
      conn.query( sql,value, (e, r) => {
        if (e) {
          console.log('sql语句执行失败')
          res.json(new Result({
            code: 101,
            msg: 'delete fail',
            data: r
          }))
        } else {
          console.log('sql语句执行成功')
          res.json(new Result({
            code: 200,
            msg: "delete success",
            data: r
          }))
        }
        conn.release();   //  释放连接池
      });
      
    }

  })
})


module.exports = router;