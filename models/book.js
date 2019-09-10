import { HTTP } from "../util/http-p.js";
class BookModel extends HTTP {
  constructor() {
    super();
  }

  getHotList() {
    return this.request({
      url: "book/hot_list"
    });
  }

  search(start, q) {
    return this.request({
      url: "book/search?summary=1",
      data: {
        q: q,
        start: start
      }
    });
  }

  getDetail(bid) {
    return this.request({
      url: "book/" + bid + "/detail"
    });
  }

  getLikeStatus(bid) {
    return this.request({
      url: "book/" + bid + "/favor"
    });
  }

  getMyBookCount() {
    return this.request({
      url: "/book/favor/count"
    });
  }

  getComment(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    });
  }

  postComment(bid, comment) {
    return this.request({
      url: `book/add/short_comment`,
      method: "POST",
      data: {
        book_id: bid,
        content: comment
      }
    });
  }
}

export { BookModel };
