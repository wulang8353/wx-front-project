import {
  config
} from "../config.js";

const tips = {
  1: "抱歉出现了一个错误",
  1005: "appkey无效，请前往7yue申请",
  3000: "期刊不存在"
};

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET";
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: { 
        appkey: config.appKey,
        "content-type": "application/json"
      },
      success: res => {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == "2") {
          params.success && params.success(res.data);
        } else {
          // params.error && params.error(res);
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: err => {
        this._show_error(1);
      }
    });
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code];
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: "none",
      duration: 2000
    });
  }
}

export {
  HTTP
};