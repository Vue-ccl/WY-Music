// pages/musicopen/musicopen.js
var request1=require('../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  //空方法，阻止冒泡事件向上冒泡
  funNull(){

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
     //获取歌单详细
     //console.log(options.id)
     if(options.ifmusic==="2"){
      request1.requestAll({url:"/artists?id="+options.id})//从歌手传入
     .then(res => {
       this.setData({
         titlename:res.data.artist.name,
         titleimage:res.data.artist.img1v1Url,
         tracks:res.data.hotSongs,
         nickall:res.data.artist.briefDesc
       })
      // console.log(res.data.hotSongs)
     })
     }else{
           request1.requestAll({url:"/playlist/detail?id="+options.text})//从歌单传入
     .then(res => {
       this.setData({
         titlename:res.data.playlist.name,
         titleimage:res.data.playlist.coverImgUrl,
         nickname:res.data.playlist.creator.nickname,
         nickimage:res.data.playlist.creator.avatarUrl,
         tracks:res.data.playlist.tracks,
       })
     })
     }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})