// pages/search/search.js
var request1=require('../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //输入关键词后，跳转并传参到搜索结果页面
  startsearch(e){
    wx.navigateTo({
      url: '/pages/searchresult/searchresult?keyword='+e.detail.value,
    })
  },
  //点击热搜关键词，跳转并传参到搜索结果页面
  startsearch2(e){
    wx.navigateTo({
      url: '/pages/searchresult/searchresult?keyword='+e.currentTarget.dataset.value,
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      textword:options.text
    })
    request1.requestAll({url:"/search/hot/detail"})
    .then(res => {
      this.setData({
        searchList:res.data.data
      })
      console.log(res.data.data)
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