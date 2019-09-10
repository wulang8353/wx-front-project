// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer: function(newVal, oldVal, path){
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          // 由于type的类型是数字，对于'08'，会直接改成数字8
          // observer是在数据修改时会被触发
          // 直接在observer里触发更新，必然再一次触发observer - 无限递归调用
          // 解决办法就是在data中赋值一个新的变量

          // 千万不要在observer中改变属性的值
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   * 组件的初始数据, data 的值也会被页面绑定, 但data的值不可以从组件外部设置
   * 使用text组件会出现双文字的情况
   */
  data: {
    // year: Number 此时是 function，而不是0
    // properties中的index会覆盖data中的index，故不要重名
    months:[
      '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月',
      '十二月'
    ],
    year: 0,
    month: '',
    _index: ''
  },

  attached: function(){
    // properties和data，最后输出他们的合集
    // console.log(this.properties)
    // console.log(this.data)
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
