const {pool,Result,router} = require('../connect');

router.post('/add',(req,res,next) =>{
  let name = req.body.name;
  let sex = req.body.sex;
  let age = req.body.age;
  let address = req.body.address;
  pool.getConnection((err,conn) =>{
    if(err){
      console.log("获取连接池错误")
    }else{
       //  从连接池中拿一个连接
       let sql = 'insert into student set name=?,sex=?,age=?,address=?'
       let value = [name,sex,age,address];
    conn.query(sql,value,(e,r) =>{
      // res.json(new Result({
      //   data:r
      // }))
      if(e){
        console.log('add sql语句执行失败')
        res.json(new Result({
          code:101,
          msg:'add fail',
          data:r
        }))
      }else{
        console.log('add sql语句执行成功')
        res.json(new Result({
          code:200,
          msg:"add success",
          data:r
        }))
      }
      conn.release();   //  释放连接池
    });
    }
  })
  // next();
})


module.exports = router;