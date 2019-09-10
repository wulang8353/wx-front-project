// components/tag/tag.js
Component({
  options: {
    multipleSlots: true // 开启插槽功能
  },

  /* 引入外部样式 */
  externalClasses: ["tag-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    text: String
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
    onTap:function(event){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
