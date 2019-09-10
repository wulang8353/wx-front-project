// components/search/search.js
import { KeywordModel } from "../../models/keyword";
import { BookModel } from "../../models/book.js";
import { paginationBev } from "../behaviors/pagination.js";
const bookModel = new BookModel();
const keywordModel = new KeywordModel();
Component({
  // 包含dataArray
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: "",
    loading: false, // 加载更多时的loading
    loadingCenter: false // 搜索数据时的loading
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    });

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      });
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 
      对于有在XML中使用的变量，使用setData及时更新
      其他的直接使用this.data
    */
    loadMore() {
      // 若无搜索关键词，返回
      if (!this.data.q) {
        return;
      }
      // 用户操作过快，同时调用两个请求，锁loading
      if (this.isLock()) {
        return;
      }

      if (this.hasMore()) {
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then(
          res => {
            this.setMoreData(res.books); // 显示查询结果 ,放入到行为中
            this.unLocked();
          },
          () => {
            this.unLocked();
          }
        );
      }
    },
    onCancel: function(event) {
      this.triggerEvent("cancle", {}, {});
      this.initialize(); // 取消，每次点击输入框时，是全新的搜索，清空原的数据
    },
    onDelete() {
      this._closeResult();
      this.initialize(); // 删除关键词，每次点击输入框时，是全新的搜索，清空原的数据
    },
    onConfirm(event) {
      this._showResult();
      this._showLoadingCenter();

      // input输入 和 tap自定义事件返回
      const q = event.detail.value || event.detail.text;
      this.setData({
        q // 将搜索的关键词赋值到输入框
      });
      
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books); // 显示搜索结果 ,放入到行为中
        this.setTotal(res.total); // 放入到行为中
        keywordModel.addToHistory(q);
        this._hideLoadingCenter();
      });
    },
    /**
     * @author wulang5
     * @date 2019/09/09
     * @desc 开启搜索
     */
    _showResult() {
      this.setData({
        searching: true
      });
    },
    /**
     * @author wulang5
     * @date 2019/09/09
     * @desc 关闭搜索
     */
    _closeResult() {
      this.setData({
        searching: false,
        q: ""
      });
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      });
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      });
    }
  }
});
