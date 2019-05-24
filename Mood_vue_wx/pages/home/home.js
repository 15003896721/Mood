const app = getApp()
Page({
/*页面的初始数据*/
  data: {
    publishList:[],
    // pno:0,
    // pageSize:5,
    isClick: false,
    counts:'',
    id: '',
    imgs:'',
    texts:'',
    timer:''
  },
/*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.loadMoods();
    // this.timer();
  },
  // timer(){
  //   var timer=new Date();
  //   var Y=timer.getFullYear();
  //   var M=timer.getMonth();
  //   var D=timer.getDay();
  //   var H=timer.getHours();
  //   var Ms=timer.getMinutes();
  //   var S=timer.getSeconds();
  //   var timeNow=`${Y}/${M}/${D} ${H}:${Ms}:${S}`;
  //   console.log(timeNow);
  // },
  /*==============收藏功能=========== */
  mycollect(e) {
    var cid = e.currentTarget.dataset.id;
    console.log(cid);
    // var imgs=this.data.publishList[cid-1].imgs;
    // var texts=this.data.publishList[cid-1].texts;
    for(var i=0;i<this.data.publishList.length;i++){
      if(this.data.publishList[i].id==cid){
        var imgs = this.data.publishList[i].imgs
        var texts=this.data.publishList[i].texts;
      }
    }
    console.log(imgs);
    console.log(texts);
    // console.log(this.data.publishList);
    var url="http://127.0.0.1:3008/collect";
        url+='?imgs='+imgs+'&texts='+texts+'&id='+cid+'&userId='+app.globalData.userId;
    wx.request({
      url: url,
      success:(res)=>{
        var cid = e.currentTarget.dataset.id;
        console.log(cid);
        console.log(this.data.publishList);
        for (var i = 0; i < this.data.publishList.length; i++) {
          if (this.data.publishList[i].id == cid) {
            var counts = this.data.publishList[i].counts;
          }
        }
        console.log(counts);
        if (!this.data.isClick == true) {
          wx.showToast({
            title: '已收藏',
          });

        } 
        this.setData({
          isClick: !this.data.isClick
        });
          /*==============已收藏过的数量=========== */
        var url = 'http://127.0.0.1:3008/count?counts=' + counts + '&id=' + cid;
        wx.request({
          url: url,
          success: (res) => {
            console.log(res.data);
            setTimeout(()=>{
              this.onLoad();
            },1500)
            
          }
          
        })
       
    // console.log(this.data)
      }
      
    })
  },

  
  /*==============页面显示心情物语列表内容=========== */
  loadMoods(){
    //发送ajax请求
    var url='http://127.0.0.1:3008/moods';
    //显示加载动画
    wx.showLoading({
      title: '心情物语加载中',
    });
    wx.request({
      url: url,
      success: (res) => {
        var result=res.data;
        this.setData({
          publishList: result,  //设置当前页内容为返回数据
        })
        console.log(result);
        //隐藏加载动画
        wx.hideLoading();
      },
    })
   /*
    //1. 获取页码+1
    var pno = this.data.pno + 1;
    //2. 获取页大小
    var pageSize = this.data.pageSize;
    //3. 发送ajax请求
    var url='http://127.0.0.1:3008/moods';
    url += "?pno=" + pno;
    //显示加载动画
    wx.showLoading({
      title: '心情物语加载中',
    });
    wx.request({
      url: url,
      success: (res) => {
        var result = res.data;
        console.log(result);//获取返回数据
        var moods = this.data.publishList.concat(result);//将分页内容拼接
        this.setData({
          publishList: result,  //设置当前页内容为返回数据
          pno: pno, //设置当前页
        })
        console.log(this.data.publishList); //当前页内容
        //隐藏加载动画
        wx.hideLoading();
      },
    })*/
  },
/*生命周期函数--监听页面初次渲染完成*/
  onReady: function () { },
/*生命周期函数--监听页面显示*/
  onShow: function () {
    this.onLoad();
  
   },
/*生命周期函数--监听页面隐藏*/
  onHide: function () { },
/*生命周期函数--监听页面卸载*/
  onUnload: function () { },
/*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () { 
    // this.loadMoods();
  },
/*页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    // this.loadMoods();
  },
/*用户点击右上角分享*/
  onShareAppMessage: function () {},
})