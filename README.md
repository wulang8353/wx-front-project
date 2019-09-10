# wx-front-project
微信小程序开发实战

### 通过换行符进行换行
后端返回的原始数据：'\nXXX'
浏览器转移后的数据：'\\nXX'

原始数据 \n  text组件内换行
原始数据 \\n text组件内\n
正则表达式

WXML: 通过WXS实现WXML直接使用函数{{func(book.summary)}}
```js
// WXS可以支持过滤器功能
var format = function(text){
  //  \\n -> \n
  // console.log(text) // format会调用两次

  // 每次数据绑定都会执行双花括号的内容
  // 调用接口获取数据，进行数据初始化，format调用一次
  // this.setData数据更新，format又调用一次
  // 由于数据初始化时book是null(还没有获得数据)，所以是undefined
  if(!text) return 
  var reg = getRegExp('\\\\n', 'g')
  return text.replace(reg, '\n&nbsp;&nbsp;&nbsp;&nbsp;')
  // 通过替换增加空格
}

// 输出模块
module.exports = {
  format: format
}
```

```js
// WXML
// decode="{{true}}" 支持转义字符的解析
<text class="content" decode="{{true}}">{{util.format(book.summary)}}</text>
```

### 并行与串行请求

串行2s+2s+2s = 2s
并行2s+2s+2s = 6s

```js
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
```
### 获取用户信息 
```js
  // —— open-data只是显示用户信息，而没有获取
  // <open-data class="avatar avatar-position" type="userAvatarUrl"></open-data>

  // 建议不使用
  // 但用户授权后，还是可以拿到信息
  wx.getUserInfo({
    success: data => {
      console.log(data);
    }
  });
  // 通过使用button，询问用户授权
  // 弊端是点击后才能拿到用户信息
  <button open-type="getUserInfo" bindgetuserinfo="getUserInfo">授权</button>
```