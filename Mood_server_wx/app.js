//1. 引入第三模块
const mysql=require("mysql");
const express=require("express");
const cors=require("cors");//引入跨域模块
const session=require("express-session");//引入express-session组件
const multer=require("multer");//微信小程序上传头像
const fs=require("fs");
//2. 创建连接池
const pool=mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'Mood',
  connectionLimit:20
});
//3. 创建express对象
var server=express();
//3.1 配置session
server.use(session({
  secret:"128位字符串", //字符串,配置密钥
  resave:true, //是否每次请求更新session数据
  saveUninitialized:true  //初始化保存session的数据
}));
server.use(cors({
  origin:["http://127.0.0.1:8080","http://localhost:8080"],//允许访问的列表
  credentials:true //提高安全性(每次访问都验证)
}));
//4. 绑定监听端口:3008
server.listen(3008);
  //4.1 指定静态目录,保存图片资源。项目中所有图片都需要发在服务器端
server.use(express.static("public"));
server.use(express.static("upload"));

//储存用户信息
server.get("/user",(req,res)=>{
  var nickName=req.query.nickName;
  var avatarUrl=req.query.avatarUrl;
  var id=req.query.id;
  var sql='select id from mood_user where nickName=? AND avatarUrl=?';
  pool.query(sql,[nickName,avatarUrl],(err,result)=>{
    if(err) throw err;
    res.send(result);
    console.log(result);
    console.log(result.length);
    if(result.length<1){
      var sql1='insert into mood_user set nickName=?,avatarUrl=?';
      pool.query(sql1,[nickName,avatarUrl],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){ 
          pool.query(sql,[nickName,avatarUrl],(err,result)=>{
            if(err) throw err;
            res.send(result);
          })
        }else{
          res.send({code:-1,msg:"添加失败"});
        }
        
      })
    }
  
})



//功能一：分页查询所有心情
//接收客户端发送请求 /moods
server.get("/moods",(req,res)=>{
  //1. 获取参数
  // var pno=req.query.pno;
  // var pageSize=req.query.pageSize;
  //2. sql语句
  // if(!pno){
  //   pno=1;
  // }
  // if(!pageSize){
  //   pageSize=5;
  // }
  var sql='select id,counts,imgs,texts,timer from mood_publish';
      sql+=' order by id desc';
      // sql+=' limit ?,?';
  // var offset=(pno-1)*pageSize;
  // pageSize=parseInt(pageSize);
  // pool.query(sql,[offset,pageSize],(err,result)=>{
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
    })
});
//功能二：上传图片
var upload=multer({dest:"upload/"});
// 接收post请求/uploadFile
server.post("/uploadFile",upload.single("mypic"),(req,res)=>{
  //判断文件大小不能超过2MB
  var size=req.file.size/1000/1000;
  console.log(size)
  if(size>2){
    res.send({code:-1,msg:"上传文件过大,请重新选择"});
    return;
  }
  //判断文件必须为图片
  var type=req.file.mimetype;
  var idx=type.indexOf("image");
  if(idx==-1){
    res.send({code:-2,msg:"上传文件类型不正确"});
    return;
  }
  //获取原文件
  var src=req.file.originalname;
  //创建新文件名[?]
  //时间戳+随机数+.后缀
  var ft=new Date().getTime();
  var fr=parseInt(Math.random()*9999);
  var i3=src.lastIndexOf(".");
  var suff=src.substring(i3);
  var des=__dirname+"/upload/"+ft+fr+suff;
  //将临时文件移动 upload目录下
  fs.renameSync(req.file.path,des);
  res.send(des);
  // console.log(des);
})
//功能三：添加心情
//接收客户端发送请求 /addMoods
server.use("/addMoods",(req,res)=>{
  var imgs="http://127.0.0.1:3008/"+req.query.imgs;
  var texts=req.query.texts;
  var userId=req.query.userId;
  var timeNow=new Date();
    var Y=timeNow.getFullYear();
    var M=timeNow.getMonth()+1;
    var D=timeNow.getDate();
    var H=timeNow.getHours();
    var Ms=timeNow.getMinutes();
    var S=timeNow.getSeconds();
    var timer=`${Y}/${M}/${D} ${H}:${Ms}:${S}`;
    console.log(timer); 
  var sql="insert into mood_publish set imgs=?,texts=?,userId=?,timer=?";
  pool.query(sql,[imgs,texts,userId,timer],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){ 
      res.send({code:1,msg:'发表成功'})
    }else{
      res.send({code:-1,msg:"发表失败"});
    }
  })
  })
  
})

//功能四：搜索功能
server.get("/search",(req,res)=>{
  var key=req.query.key;
  console.log(key);
  /*var pno=req.query.pno;
  var ps=req.query.pageSize;
  if(!pno){pno=1}
  if(!ps){ps=5}
  //2.sql
  var sql="SELECT id,imgs,texts FROM mood_publish WHERE texts LIKE concat('%',?,'%') LIMIT ?,?"
  //3.发送sql
  var offset=(pno-1)*ps;
  pool.query(sql,[key,offset,ps],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
    // console.log(result);
  })*/
  var sql="SELECT id,imgs,texts FROM mood_publish WHERE texts LIKE concat('%',?,'%')";
  pool.query(sql,[key],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
    // console.log(result);
  })
})

/*
//功能四：搜索功能
server.use("/search",(req,res)=>{
  var texts=req.query.texts;
  var sql=`SELECT id,imgs,texts FROM mood_publish WHERE texts like '%${texts}%'`;
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    if(!result.data){
      res.send({code:1,data:result});
    }else{
      res.send({code:-1,msg:"查无结果"});
    }
  })
})
*/
//功能五：收藏功能
server.use("/collect",(req,res)=>{
  var id=req.query.id;
  var imgs=req.query.imgs;
  var texts=req.query.texts;
  var textId=req.query.textId;
  var userId=req.query.userId;
  var sql='insert into mood_collect set imgs=?,texts=?,textId=?,userId=?';
    pool.query(sql,[imgs,texts,textId,userId],(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result})
    })
});

//功能六： 收藏页面显示数据
server.use("/collectList",(req,res)=>{
  var userId=req.query.userId;
  var sql='select id,imgs,texts from mood_collect where userId=? order by id desc';
  pool.query(sql,[userId],(err,result)=>{
    if(err) throw err;
    res.send(result);
    // console.log(result);
  })
});
//功能七: 收藏数量
server.use("/count",(req,res)=>{
  var counts=req.query.counts;
  var id=req.query.id;
  var sql='select counts from mood_publish where id=?';
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err;
    var count=eval(result[0].counts)+1;
    // console.log(count);
    var sql1='UPDATE mood_publish SET counts=? WHERE id=?';
    pool.query(sql1,[counts,id],(err,result)=>{
      if(err) throw err;
      // console.log(result);
      if(result.affectedRows>0){
        res.send({code:1,msg:"修改成功"});
      }else{
        res.send({code:-1,msg:"修改失败"});
      }
    })
  })
});
//功能八：删除收藏
server.use("/del",(req,res)=>{
  var id=req.query.id;
  console.log(id);
  var sql='delete from mood_collect where id=?';
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:"删除失败"});
    }
  }) 
})