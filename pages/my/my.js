import { ClassicModel } from "../../models/classic.js";
import { BookModel } from "../../models/book.js";

let classicModel = new ClassicModel();
let bookModel = new BookModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor()
  },

  /**
   * @author wulang5
   * @date 2019/09/10
   * @desc 判断用户是否授权
   */
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting["scope.userInfo"]) {
          // 用户必须已经授权了才能拿到用户信息
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              });
            }
          });
        }
      }
    });
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      });
    }
  },

  onJumpToAbout: function(event) {
    wx.navigateTo({
      url: "/pages/about/about"
    });
  },

  onStudy: function(event) {
    wx.navigateTo({
      url: "/pages/course/course"
    });
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(data => {
      this.setData({
        bookCount: data.count
      });
    });
  },

  getMyFavor(){
    classicModel.getMyFavor(res=>{
      this.setData({
        classics: res
      })
    })
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
