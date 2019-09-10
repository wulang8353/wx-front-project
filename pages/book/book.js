import { BookModel } from "../../models/book.js";
import { random } from "../../util/common";
let bookModel = new BookModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ""
    /* 异步数据处理
      callback
      promise
      async await 小程序不直接支持
    */
    // promise 对象 函数 (用对象的方式保存异步调用的结果)
    // 对象能够保存状态，函数不行（闭包除外）
    // const promise = new Promise((resolve, reject)=>{
    //   wx.getSystemInfo({
    //     success: (res)=>{
    //       resolve(res)
    //     },
    //     fail: (error)=>{
    //       reject(error)
    //     }
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    bookModel.getHotList().then(res => {
      this.setData({
        books: res
      });
    });
  },

  onSearching(event) {
    this.setData({
      searching: true
    });
  },

  onCancle() {
    this.setData({
      searching: false
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  /* 只能在页面中监听到 */
  onReachBottom() {
    let n = random(16)
    this.setData({
      more: n
    });
    console.log(this.data.more)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
