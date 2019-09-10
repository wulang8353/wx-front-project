import { HTTP } from "../util/http.js";

class ClassicModel extends HTTP {
  getLatest(sCallBack) {
    this.request({
      url: "classic/latest",
      success: res => {
        sCallBack(res);
        this._setLatestIndex(res.index); // 缓存最新的条数
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res);
      }
    });
  }

  // 上、下翻页   —— ***缓存 - 包含必要和非必要的数据***
  getClassic(index, nextOrPrevious, sCallBack) {
    // 缓存中寻找 or API写入到缓存中
    // key 确定key

    // 根据前还是后返回Index，例如当前是第7，返回到最新的8，点击next，读取8的数据
    // 若8不存在则从返回的res中拿到Index, 再存入进去
    let key =
      nextOrPrevious === "next"
        ? this._getKey(index + 1)
        : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res);
          sCallBack(res);
        }
      });
    } else {
      sCallBack(classic);
    }
  }

  // 判断首页
  isFirst(index) {
    return index === 1 ? true : false;
  }

  // 判断尾页
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex === index ? true : false;
  }

  getMyFavor(success){
    const params = {
      url: "classic/favor",
      success: success
    }
    this.request(params)
  }

  _setLatestIndex(index) {
    wx.setStorageSync("latest", index); // 同步写入缓存
  }

  _getLatestIndex() {
    return wx.getStorageSync("latest"); // 同步读取缓存值
  }

  // 用于确定存入缓存中的key
  _getKey(index) {
    let key = "classic-" + index;
    return key;
  }
}
export { ClassicModel };
