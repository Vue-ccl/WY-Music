//InnerAudioContext实例
var request1=require('../../request/request.js')
var audioCxt;
//动画
var audioAnimation;
audioCxt = wx.createInnerAudioContext();
 
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    ifpaly:true,
    audioAnimation : null,
    //音乐是不是开始
    music_on : true,
    //音乐是不是在播放
    music_playing :true,
    //显示的时间
    musicTime : '00:00',
    sliderValue : 0,
  },
  nowpaly(){
    audioCxt.src=this.data.songurl;
    audioCxt.autoplay=true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id)
    request1.requestAll({url:"/song/url?id="+options.id})//获取歌曲地址
    .then(res => {
      this.setData({
       songurl:res.data.data[0].url
      })
      this.nowpaly();   
    })
    request1.requestAll({url:"/song/detail?ids="+options.id})//获取歌曲内容
    .then(res => {
      this.setData({
       imageurl:res.data.songs[0].al.picUrl,
       songname:res.data.songs[0].name,
       songar:res.data.songs[0].ar,
      })
      // console.log(res.data.songs[0].ar)
    })

  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //音乐播放结束触发
    audioCxt.onEnded((res) =>{
      //修改属性。去除css状态
      this.data.music_on = false;
      this.setData({
        music_on: this.data.music_on
      })
      //重新播放
      audioCxt.seek(0);
      this.setData({
        musicTime: '00:00',
        sliderValue: 0
      })
    }),
    //在播放状态，绑定播放进度更新事件。然后控制进度条和时间显示
    audioCxt.onPlay((res) =>{ 
      audioCxt.onTimeUpdate(this.timeUpdate)
    })
  },
 
  //播放按钮事件
  playMusic : function(){
    this.data.music_on = true; 
    this.data.music_playing = true;
    audioCxt.play();
    //图片添加css样式，旋转样式
    this.setData({
      music_on: this.data.music_on,
      music_playing: this.data.music_playing,
      ifpaly:true
    })
  },
 
  //暂停按钮事件
  pauseMusic : function(){
    this.data.music_on = true;
    this.data.music_playing = false;
    audioCxt.pause();
    this.setData({
      music_on: this.data.music_on,
      music_playing: this.data.music_playing,
      ifpaly:false
    })
  },

 
  //进度条改变后触发事件
  audioChange : function(e){
    var length = audioCxt.duration;
    var percent = e.detail.value;
    //用进度条百分比 *　整个音乐长度
    var musicTime = Math.round(length/100*percent);
    audioCxt.seek(musicTime);
 
    //因为在拖动进度条时，去除了时间绑定，所以进度改变后重新绑定
    audioCxt.onTimeUpdate(this.timeUpdate);
 
    this.setData({
      musicTime: this.musicTimeFormat(musicTime)
    })
  },
  //进度条拖动过程中触发事件
  audioChanging : function(e){
    //因为在进度条拖动的时候，还会在timeUpdate里面修改进度条的value，倒置拖动受影响，所以当拖动的时候需要取消绑定
    audioCxt.offTimeUpdate();
 
    //拖动时修改时间显示
    var length = audioCxt.duration;
    var percent = e.detail.value;
    var musicTime = Math.round(length / 100 * percent);
    this.setData({
      musicTime: this.musicTimeFormat(musicTime)
    })
  },
 
  //将秒钟转化为mm：ss的时间格式
  musicTimeFormat : function(time){
    var second = Math.floor(time % 60);
    if(second<10){
      second = '0' + second;
    }
    var minute = Math.floor(time / 60);
    if (minute < 10) {
      minute = '0' + minute;
    }
    return minute + ':' + second;
  },
 
  //播放的时候，更新进度条和时间显示
  timeUpdate : function(){
    var time = audioCxt.currentTime;
    var percent = Math.round(time / audioCxt.duration * 100);
    this.setData({
      musicTime: this.musicTimeFormat(time),
      sliderValue: percent
    })
  }
})