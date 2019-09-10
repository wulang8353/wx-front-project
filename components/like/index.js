// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  // 可以被外部获取
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 不可以被外部获取
    // 封装性: 在内部固定
    // 开放性: 可以从外部获得
    // 颗粒度
    // 非常简单功能 非常复杂的功能
    yesSrc: "images/like.png",
    noSrc: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onlike: function(event) {
      if (this.properties.readOnly) {
        return;
      }
      let like = this.properties.like;
      let count = this.properties.count;
      count = like ? count - 1 : count + 1;
      this.setData({
        count: count,
        like: !like
      });

      // 自定义事件，用于通知用户点击并且传递状态
      // 激活事件
      let behavior = this.properties.like ? "like" : "cancle";
      this.triggerEvent(
        "like",
        {
          behavior: behavior
        },
        {}
      );
    }
  }
});
