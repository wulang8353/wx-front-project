// components/image-button/index.html.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  // externalClasses: ['ex-btn-class'],
  properties: {
    // open-type="getUserInfo" open-type ~ openType
    openType: {
      type: String
    },
    imageSrc: {
      type: String
    },
    bindgetuserinfo: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event) {
      // 自定义事件用于传递用户数据
      this.triggerEvent('getuserinfo', event.detail, {})
    },
  }
})