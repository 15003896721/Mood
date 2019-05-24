// pages/add/add.js
const app=getApp();
Page({
/*页面的初始数据*/
  data: {
    imgs: '',
    texts: '',
    userId:'',
    timer:''
  },
  myPhoto: function () {
    //1. 选中一张图片
    wx.chooseImage({
      count: 1,
      sourceType: ["camera", "album"],
      success: function (res) {
        var src = res.tempFilePaths[0];
        //2. 上传到服务器
        wx.uploadFile({
          url: 'http://127.0.0.1:3008/uploadFile',
          filePath: src,
          name: 'mypic',
          header: {"Content-Type": "multipart/form-data"},
          success: (res) => {
            var img_url=res.data;//图片绝对路径
            console.log(img_url); 
            var i=img_url.lastIndexOf("/");//最后一个‘/’的位置：42
            // console.log(i);//按最后一个‘/’截取
            var imgs=img_url.substring(i+1);
            console.log(imgs); 
            // var imgs = imgs;
            var url = "http://127.0.0.1:3008";
            url += "/addMoods?imgs=" + imgs + "&texts=" +app.globalData.text+'&userId='+app.globalData.userId;
            console.log(url)
            if (!app.globalData.text && !app.globalData.imgsrc){
              app.globalData.imgsrc='';
              wx.showToast({
                title: '请先输入内容再选择添加图片',
                icon:"none"
              })
            }else{
              app.globalData.imgsrc = imgs;
            }
          }
        })
      },
    })
  },
  fb(){
    if(!app.globalData.text){
      wx.showToast({
        title: '请输入文字内容',
        icon: "none"
      })
    }else if(!app.globalData.imgsrc){
      wx.showToast({
        title: '请插入图片',
        icon:"none"
      })
    }else{
      var url = "http://127.0.0.1:3008";
      url += "/addMoods?imgs=" + app.globalData.imgsrc + "&texts=" + app.globalData.text+'&userId='+app.globalData.userId+'&timer='+app.globalData.timer;
      wx.request({
        url: url,
        success: (res) => {
          console.log(res)
          if (res.data.msg=="发表成功") {
            this.setData({
              texts:'',
              imgs:'',
            }); 
            wx.showToast({
              title: '发表成功',
            });
            setTimeout(function(){
              wx.switchTab({
                url: '../home/home',
              })
            },2000);
          }
          else{
            wx.showToast({
              title: '发表失败',
            })
          }
        }
      })
    }
    
  },
  myText(e){
    console.log(e.detail.value);
    app.globalData.text=e.detail.value
  },
/*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    // this.fb();
  },
/*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    
  },
/*生命周期函数--监听页面显示*/
  onShow: function () {
    
  },
/*生命周期函数--监听页面隐藏*/
  onHide: function () {},
/*生命周期函数--监听页面卸载*/
  onUnload: function () {},
/*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},
/*页面上拉触底事件的处理函数*/
  onReachBottom: function () {},
/*用户点击右上角分享*/
  onShareAppMessage: function () {}
})