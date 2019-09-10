import { BookModel } from "../../models/book.js";
import { LikeModel } from "../../models/like.js";
let likeModel = new LikeModel();
let bookModel = new BookModel();
Page({
  /* 
  普通编译模式：从app.json读取打开
  添加编译模式：指定程序打开的路径
  */

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: {},
    likeStatus: false,
    likeCount: 0,
    posting: false // 弹出框显隐
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading();

    // 一个页面如何接受外部传的参数
    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComment(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    Promise.all([detail, comments, likeStatus]).then(res => {
      // res 是一个数组，包含子Promise中对应返回结果
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      });
      wx.hideLoading();
    });

/*     detail.then(res => {
      this.setData({
        book: res
      });
    });

    comments.then(res => {
      this.setData({
        comments: res.comments
      });
    });

    likeStatus.then(res => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      });
    }); */
  },

  onLike(event) {
    let like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel, this.data.book.id, 400);
  },

  onFakePost: function() {
    this.setData({
      posting: true
    });
  },

  onCancel: function(event) {
    this.setData({
      posting: false
    });
  },

  onPost(event) {
    // 自定义组件 event.detail.text
    // input输入框 event.detail.value
    let comment = event.detail.value || event.detail.text;
    if (!comment) {
      return;
    }
    if (comment.length > 12) {
      wx.showToast({
        title: "短评最多12个字",
        icon: "none"
      });
      return;
    }
    bookModel.postComment(this.data.book.id, comment).then(() => {
      wx.showToast({
        title: "+ 1",
        icon: "none"
      });
      this.data.comments.unshift({
        content: comment,
        nums: 1
      });
      this.setData({
        comments: this.data.comments,
        noComment: false
      });

      this.setData({
        posting: false
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
