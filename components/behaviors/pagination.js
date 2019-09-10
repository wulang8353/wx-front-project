const paginationBev = Behavior({
  properties: {},
  data: {
    dataArray: [],
    total: null,
    noneResult: false, // 有没有搜索到书籍
    loading: false // 锁
  },

  methods: {
    setMoreData: function(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray
      });
    },
    getCurrentStart: function() {
      return this.data.dataArray.length;
    },
    setTotal: function(total) {
      this.data.total = total;
      if (total === 0) {
        this.setData({
          noneResult: true
        });
      }
    },
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false;
      } else {
        return true;
      }
    },
    initialize() {
      // this.data.dataArray = [];
      // dataArray需要及时更新，不然每次切换时会有上次数据遗留
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      });

      this.data.total = null;
    },
    isLock() {
      return this.data.loading ? true : false;
    },
    locked() {
      //先判断加载完成，再加锁
      this.setData({
        loading: true
      });
    },
    unLocked() {
      this.setData({
        loading: true
      });
    },
  }
});

export { paginationBev };
