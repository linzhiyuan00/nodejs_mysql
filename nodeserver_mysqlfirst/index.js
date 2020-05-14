const {app,pool,Result} = require('./connect');
const login = require('./login/login');
const add = require('./add/add');
const deletedata = require('./delete/delete');
const update = require('./update/update');
const select = require('./select/select');

app.all('*',(req,res,next) =>{
  // 这里处理全网拦截，一定要写在最上面，不然会被别的接口匹配到，没有执行next导致捕捉不到
  console.log("url:",req.url,"method:",req.method,"bodydata:",req.body);
  next();
})

app.use('/login',login);
app.use('/add',add);
app.use('/delete',deletedata);
app.use('/update',update);
app.use('/select',select);


app.listen(8090,() =>{
  console.log("服务启动滴滴滴：");
})

// json   返回json格式
// app.get('/',(req,res) =>{
//   res.json('hello word linzy');
// })

// send   返回页面格式
// app.get('/',(req,res) =>{
//   res.send('<div style="color:red;">hello world </div>')
// })

// let login = true;

// 路径后面的参数在data里，？ 后面的参数在query里， json参数在json里
// app.post('/test/:data',(req,res) =>{
//   res.json({
//     query:req.query,
//     data:req.params,
//     json:req.body
//   })
// })