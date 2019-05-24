const app = getApp()
Page({
/*页面的初始数据*/
  data: {
    collects:[],
    id:'',
    counts:''
  },
/*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.collects();
  },
/*去收藏*/
  gotocollect(){
    wx.switchTab({
      url: '../home/home',
    })
  },
  /**================收藏列表================ */
  collects(){
    var that=this;
    var url ="http://127.0.0.1:3008/collectList?userId="+app.globalData.userId;
    wx.request({
      url: url,
      success:(res)=>{
        var lists=res.data;
        console.log(lists);
        this.setData({
          collects:lists,
        })
      }
    })
  },
  del(e){
    var delId=e.currentTarget.dataset.id;
    console.log(delId);
    var url='http://127.0.0.1:3008/del?id='+delId;
    wx.request({
      url: url,
      success:(res)=>{
        
            wx.showToast({
              title: '已取消收藏',
              icon: 'none'

            })
        
      
       
       setTimeout(()=>{
         this.onLoad();
       },800)
      
      }
    })

  },
/*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
  },
/*生命周期函数--监听页面显示*/
  onShow: function () {
    this.onLoad();
  },
/*生命周期函数--监听页面隐藏*/
  onHide: function () {

  },
/*生命周期函数--监听页面卸载*/
  onUnload: function () {

  },
/*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {

  },
/*页面上拉触底事件的处理函数*/
  onReachBottom: function () {

  },
/*用户点击右上角分享*/
  onShareAppMessage: function () {

  }
})












// Page({
// /*页面的初始数据*/
//   data: {

//   },
//   /*生命周期函数--监听页面加载*/
//   onLoad: function (options) { },
//   /*生命周期函数--监听页面初次渲染完成*/
//   onReady: function () { },
//   /*生命周期函数--监听页面显示*/
//   onShow: function () { },
//   /*生命周期函数--监听页面隐藏*/
//   onHide: function () { },
//   /*生命周期函数--监听页面卸载*/
//   onUnload: function () { },
//   /*页面相关事件处理函数--监听用户下拉动作*/
//   onPullDownRefresh: function () { },
//   /*页面上拉触底事件的处理函数*/
//   onReachBottom: function () { },
//   /*用户点击右上角分享*/
//   onShareAppMessage: function () { }
// })