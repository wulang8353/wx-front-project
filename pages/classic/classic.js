import { ClassicModel } from "../../models/classic.js";
import { LikeModel } from "../../models/like.js";
let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // promise方法，无法直接将异步结果赋予一个变量，只能回调
    // let latest = classic.getLatest(res => {});
    classicModel.getLatest(res => {
      // ** setData用于数据（添加到data）更新 **
      this.setData({
        classic: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      });
    });

    // http.request({ // 封装成函数
    //   url: "classic/latest",
    //   success: res => {
    //     console.log(res)
    //   }
    // });
  },

  // 自定义事件的监听
  onlike: function(event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },

  // 上一页
  onNext: function(event) {
    this._updateClassic("next");
  },

  // 下一页
  onPrevious: function(event) {
    this._updateClassic("previous");
  },

  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index;
    classicModel.getClassic(index, nextOrPrevious, res => {
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      });
    });
  },

  // 获取点赞的数据
  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, res => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
