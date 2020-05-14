const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require("mysql");

const app = express();
const router = express.Router();
const option = {
  host:"localhost",
  user:"root",          //账号密码
  password:"123456",
  port:"3306",
  database:"demo",    // 数据库名
  connentTimeout:"100000", //连接超时,
  multipleStatements:false   //是否允许一条query中包含多条sql语句
}
const conn = mysql.createConnection(option);

app.use(cors());  // 解决跨域
app.use(bodyParser.json());    //json请求
app.use(bodyParser.urlencoded({extended:false}))   //表单请求

let pool;
repool();


function Result({code = 1,msg="",data = {}}){
  this.code = code,
  this.msg = msg,
  this.data = data;
}

function repool(){    // 断线重连机制
  pool = mysql.createPool({
    ...option,
    waitForConnections:true,  // 当无连接池可用时，等待（true）还是报错（false），
    connectionLimit:100,      // 连接数限制
    queueLimit:0              // 最大连接等待数 （0为不限制）
  });  // 创建连接池
  pool.on('error',err =>{
    err.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(repool,2000)
  })
}


module.exports = {pool,Result,router,app};