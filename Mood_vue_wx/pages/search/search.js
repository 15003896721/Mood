const app = getApp()
var searchArray = []
Page({
/*页面的初始数据*/
  data: {
    history: [],//创建历史记录数组  
    SearchText: '取消',//按钮变动值 
    inputContent: 0,//检测input框内是否有内容 
    hiddenName: false
  },
//搜索按钮
  searchbtn: function (e) {
    console.log(e);
    if (e.detail.cursor != 0) {
      this.setData({
        SearchText: "搜索",
        inputContent: 1
      })
    } else {
      this.setData({
        SearchText: "取消",
        inputContent: 0
      })
    }
  },
//搜索方法
  searchKey: function (e) {
    var that=this;
    that.setData({
      hiddenName: true
    });
    //获得input输入框的搜索内容
    var key = e.detail.value.key;
    if (that.data.inputContent == 1) {
      //把获取的input值插入数组里面
      let arr = that.data.history;
      //判断取值是手动输入还是点击赋值
      if (that.data.key == "") {
        // 判断数组中是否已存在
        let arrnum = arr.indexOf(key);
        if (arrnum != -1) {
          // 删除已存在后重新插入至数组
          arr.splice(arrnum, 1)
          arr.unshift(key);
        } else {
          arr.unshift(key);
        }
      } else {
        let arr_num = arr.indexOf(key);
        if (arr_num != -1) {
          arr.splice(arr_num, 1)
          arr.unshift(key);
        } else {
          arr.unshift(key);
        }
      }
      console.log(arr)
      //存储搜索记录
      wx.setStorage({
        key: "words",
        data: arr
      })
      //取出搜索记录
      wx.getStorage({
        key: 'words',
        success: function (res) {
          that.setData({
            history: res.data
          })
        }
      })
      that.setData({
        key: '',
      })
    } else {
      console.log("取消")
    }
    var url = "http://127.0.0.1:3008/search?key=" + key;
    console.log(url)
    wx.request({
      url: url,
      data: { key: key },
      // method: 'GET',
      success: (res) => {
        if (key == "") {
          wx.showToast({
            title: '搜索内容不能为空',
            icon: 'none',
            // duration: 3000
          })
        } else {
          console.log(res.data.data)
          that.setData({
            searchResults: res.data.data
          });
        }
      },
    })
  },
  //清除搜索记录
  deleteHistory: function () {
    //清除当前数据
    this.setData({
      history: []
    });
    //清除缓存数据
    wx.removeStorage({
      key: 'words'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // showView: (options.showView == "true" ? true : false)
    let This = this;
    //设置当前页标题
    wx.setNavigationBarTitle({
      title: '搜索'
    });
    //读取缓存历史搜索记录
    wx.getStorage({
      key: 'words',
      success: function (res) {
        This.setData({
          history: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
