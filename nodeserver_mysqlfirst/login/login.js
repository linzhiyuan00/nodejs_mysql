const { pool, Result, router } = require('../connect');
const querystring = require('querystring');

router.get('/all', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log("获取连接池错误")
    } else {
      //  从连接池中拿一个连接
      let sql = 'SELECT * FROM student'
      conn.query(sql, (e, r) => {
        if (e) {
          console.log('login sql语句执行失败')
        } else {
          console.log('login sql语句执行成功')
          console.log(r);
          for(let i of r){
            if(i.list !== null){
              i.list = JSON.parse(i.list)
            }
            if(i.object !== null){
              i.object = querystring.parse(i.object)
            }
            
          }
          
          res.json(new Result({
            code:200,
            data: r,
            msg:""
          }))
        }
        conn.release();   //  释放连接池
      });
    }
  })
})

router.get('/student', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log("获取连接池错误")
    } else {
      //  从连接池中拿一个连接
      let sql = 'SELECT * FROM student where age = 1'
      conn.query(sql, (e, r) => {
        if (e) {
          console.log('loginstudent sql语句执行失败')
        } else {
          console.log('loginstudent sql语句执行成功')
          res.json(new Result({
            data: r
          }))
        }
        conn.release();   //  释放连接池
      });
    }

  })
})


module.exports = router;