// components/book/book.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    showLike: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      const bid = this.properties.book.id;
      // 组件内部跳转，降低组件的通用性
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`
      });
    }
  }
});
