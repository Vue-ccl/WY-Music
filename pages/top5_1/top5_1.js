// pages/top5_1/top5_1.js
var request1=require('../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  musicplay(e){//跳转到播放，传递歌曲id
    let id=e.currentTarget.dataset.songid
    wx.navigateTo({
      url: '/pages/musicpaly/musicpaly?id='+id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request1.requestAll({url:"/personalized/newsong"})
    .then(res => {
      this.setData({
        tracks:res.data.result
      })
      console.log(res.data.result)
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