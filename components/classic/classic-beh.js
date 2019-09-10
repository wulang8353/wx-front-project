// 类似componments的结构，包含data,properties,methods,attach等

// 构造器, 用于提取公用属性、功能。通过behaviors: [classicBehavior]继承
let classicBehavior = Behavior({
  properties: {
    type:String,
    img:String,
    content:String,
    hidden: Boolean
  },
  data: {
  }
})

export { classicBehavior }

/* 
1、子component与Behavior有数据冲突，子类会覆盖Behavior
2、behaviors: [classicBehavior, bh1. bh2], bh2的Data会覆盖之前所有重名Data
3、对于生命周期函数，每一个Behavior循序调用，最后调用子component
*/