// pages/mvpaly/mvpaly.js
var request1=require('../../request/request.js')

function getRandomColor(){
  let rgb = []
  for(let i=0;i<3;i++){
    let color = Math.floor(Math.random()*256).toString(16)
    // 三目运算法
    color = color.length==1?'0'+color:color
    rgb.push(color)
  }
  return '#'+rgb.join('')
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getDanmu:function(e){
    this.setData({
      danmuTxt:e.detail.value
    })
  },
  sendDanmu(e){
    let text =this.data.danmuTxt;
    this.videoCtx.sendDanmu({
      text:text,
      color:getRandomColor()
    })
    this.setData({
      danmuTxt:""
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request1.requestAll({url:"/mv/url?id="+options.mvid})
     .then(res => {
       this.setData({
       src:res.data.data.url
       })
     })
     request1.requestAll({url:"/simi/mv?mvid="+options.mvid})
     .then(res => {
       this.setData({
       list:res.data.mvs
       })
      // console.log(res.data.hotSongs)
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoCtx = wx.createVideoContext('myVideo')
  },



})