var request1=require('../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eday:[
      {src:'/images/best/tuijian.png',text:'每日推荐',url:'/pages/top5_1/top5_1'},
      {src:'/images/best/fm.png',text:'私人FM',url:'/pages/top5_1/top5_1'},
      {src:'/images/best/gedan.png',text:'歌单',url:'/pages/top5_1/top5_1'},
      {src:'/images/best/paihang.png',text:'排行榜',url:'/pages/top5_1/top5_1'},
      {src:'/images/best/lishi.png',text:'播放记录',url:'/pages/top5_1/top5_1'},
    ],
    swiperImg:[
      { src:'http://p1.music.126.net/8JS99dnzB94eq4i_FCx5HA==/109951166419166813.jpg?imageView&quality=89'},
      { src:'http://p1.music.126.net/MhwyEuwS1MOL5uisFvf4SA==/109951166419219515.jpg?imageView&quality=89'},
      { src:'http://p1.music.126.net/YoSzpTRAgAooQNHnzZ9szw==/109951166419097722.jpg?imageView&quality=89'},
      { src:'http://p1.music.126.net/JxZi2lyWwTMrQhsAnvIflQ==/109951166417918629.jpg?imageView&quality=89'},
      { src:'http://p1.music.126.net/UAtog81sZ5BPDdXLMxxB0A==/109951166421095970.jpg?imageView&quality=89'},
      { src:'http://p1.music.126.net/mf_zOhq8DhI2qODCY_wyjg==/109951166417915981.jpg?imageView&quality=89'},
      { src:'http://p1.music.126.net/Oo5posmTDNKEcD1JzDfwyg==/109951166419418213.jpg?imageView&quality=89'},
      { src:'http://p1.music.126.net/hya4mPiIxHoxB9zD10oPxw==/109951166419153553.jpg?imageView&quality=89'},
      { src:'http://p1.music.126.net/fHpChsFeXk_q_-Fnt5PIXA==/109951166417903643.jpg?imageView&quality=89'},
    ]
  },
  //跳转搜索页面
  goTosearch(e){
    let text=e.currentTarget.dataset.text
    wx.navigateTo({
      url: '/pages/search/search?text='+text,
    })
  },
   //跳转歌单详细页面
  goToopen(e){
    let text=e.currentTarget.dataset.text
    let ifmusic=e.currentTarget.dataset.ifmusic
    console.log(text)
    wx.navigateTo({
      url: '/pages/musicopen/musicopen?text='+text+'&ifmusic='+ifmusic
    })
  },
  goToopen2(e){
    let id=e.currentTarget.dataset.id
    let ifmusic=e.currentTarget.dataset.ifmusic
    wx.navigateTo({
      url: '/pages/musicopen/musicopen?id='+id+'&ifmusic='+ifmusic
    })
  },
  //跳转到播放，传递歌曲id
  musicplay(e){
    let id=e.currentTarget.dataset.songid
    wx.navigateTo({
      url: '/pages/musicpaly/musicpaly?id='+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取推荐歌单
    request1.requestAll({url:"/personalized?limit=6"})
    .then(res => {
      this.setData({
        tjgdList:res.data.result
      })
    }),
    //新碟推荐
    request1.requestAll({url:"/personalized/newsong"})
    .then(res => {
      this.setData({
        newsong:res.data.result
      })
    })
    //获取华语歌手榜
    request1.requestAll({url:"/toplist/artist/type=1"})
    .then(res => {
      this.setData({
        hygsbList:res.data.list.artists
      })
    })
    //获取最热主播榜
    request1.requestAll({url:"/toplist/artist/type=2"})
    .then(res => {
      this.setData({
        zrzbbList:res.data.list.artists
      })
    })
    //获取默认搜索关键词
    request1.requestAll({url:"/search/default"})
    .then(res => {
      this.setData({
        searchword:res.data.data.realkeyword
      })
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