// components/classic/music/music.js
import { classicBehavior } from "../classic-beh.js";

// 1、拿到背景音乐管理对象
let mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],

  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false, // 当前音乐不播放
    waittingUrl: "images/player@waitting.png",
    playingUrl: "images/player@playing.png"
  },

  attached: function() {
    this._recoverPlaying();
    this._monitorSwitch();
  },

  detached: function() {
    // hidden属性是不会触发detached，组件是隐藏而不是销毁
  },

  /**
   * 组件的方法列表
   */
  /* 
    组件间通信
    1、WXML，父组件往子组件传参，在子组件中的properties接收
    2、事件，子组件往父组件传参，在子组件中使用
        // 子组件
        this.triggerEvent('like', {
          behavior: behavior
        }, {})
        // 父组件
        bind:like="onlike" 
  */
  methods: {
    onPlay: function(event) {
      console.log(mMgr)
      console.log(wx.getBackgroundAudioManager())
      if (!this.data.playing) {
        this.setData({
          playing: true
        });
        // 2、mMgr.src 一旦赋值就自动播放
        if (mMgr.src == this.properties.src) {
          mMgr.play(); // 3、播放音乐
        } else {
          mMgr.src = this.properties.src;
        }
        mMgr.title = this.properties.title;
      } else {
        this.setData({
          playing: false
        });
        mMgr.pause(); // 4、暂停音乐
      }
    },

    // 根据音乐播放状态判断播放图片
    _recoverPlaying: function() {
      // 当前没有音乐播放
      if (mMgr.paused) { // 当前是否暂停或停止
        this.setData({
          playing: false
        });
        return;
      }
      // mMgr.src当前正在播放的音乐
      if (mMgr.src == this.properties.src) {
        if (!mMgr.paused) {
          this.setData({
            playing: true
          });
        }
      }
    },

    // 监听背景音频播放事件
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverPlaying();
      });
      mMgr.onPause(() => {
        this._recoverPlaying();
      });
      // 点击×按钮，关闭播放
      mMgr.onStop(() => {
        this._recoverPlaying();
      });
      // 一首歌放完
      mMgr.onEnded(() => {
        this._recoverPlaying();
      });
    }
  }
});
