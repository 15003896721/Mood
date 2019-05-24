const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isFolded:true
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo);
        var nickName = this.data.userInfo.nickName;
        var avatarUrl = this.data.userInfo.avatarUrl;
        console.log(nickName);
        console.log(avatarUrl);
        //储存用户信息
        var url='http://127.0.0.1:3008/user?nickName='+nickName+'&avatarUrl='+avatarUrl;
        wx.request({
          url: url,
          success:(res)=>{
            console.log("储存成功");
            console.log(res.data[0].id);
            app.globalData.userId = res.data[0].id;
          }
        })
        
      } 
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gotocollect(){
    wx.switchTab({
      url: '../collect/collect',
    })
  },
  gotoadd() {
    wx.switchTab({
      url: '../add/add',
    })
  },
  change: function (e) {
    this.setData({
      isFolded: !this.data.isFolded,
    })
  }
})
