const { pool, Result, router } = require('../connect');
let qs = require('qs')
const querystring = require('querystring');

router.post('/update', (req, res) => {
  let name = req.body.name;
  let sex = req.body.sex;
  let age = req.body.age;
  let address = req.body.address;
  let list = JSON.stringify(req.body.list);
  let object = JSON.stringify(req.body.object);
  let updatestate = false;
  console.log(list, object, "------", req.body.list, req.body.object);
  //  从连接池中拿一个连接
  pool.getConnection((err, conn) => {
    if (err) {
      console.log("获取连接池错误")
    } else {
      let sql = 'update student set sex=? , age=?, address=?,list=?,object=? where name=?';
      let value = [sex, age, address, list, object, name]
      conn.query(sql, value, (e, r) => {
        if (e) {
          console.log('sql语句执行失败')
          res.json(new Result({
            code: 101,
            msg: 'update fail',
            data: r
          }))
        } else {
          console.log('sql语句执行成功11111')
          updatestate = true;
          let sql = 'select * from student';
          conn.query(sql, (err, rrr) => {
            if (err) {
              console.log('sql语句执行失败')
              res.json(new Result({
                code: 101,
                msg: 'update fail',
                data: rrr
              }))
            }else{
              console.log('update后返回新数据sql语句执行成功')
              for(let item of rrr){
                console.log(item.name);
                if(item.list !== null){
                  item.list = JSON.parse(item.list);
                }
                if(item.object !== null){
                  item.object = JSON.parse(item.object)
                }
              }
              console.log(rrr)
              res.json(new Result({
                code: 101,
                msg: 'updateselect success',
                data: rrr
              }))
            }
          })
        }
        conn.release();   //  释放连接池
      });
    }


  })
})


module.exports = router;