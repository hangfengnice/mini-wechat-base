// pages/posts/index.js
const { postList } = require("../../data/posts-data");

Page({
  data: {
    imgUrlData: [
      { url: "../../images/wx.png", id: 3 },
      { url: "../../images/vr.png", id: 4 },
      { url: "../../images/iqiyi.png", id: 5 }
    ],
    post_content: null
  },

  onLoad: function(options) {
    this.setData({
      post_content: postList
    });
  },

  onPostTap(e) {
    let postId = e.detail.id;
    wx.navigateTo({
      url: "./post-detail/index?id=" + postId
    });
  },

  onSwiper(e){
    let id = e.target.dataset.id
    wx.navigateTo({
      url: "./post-detail/index?id=" + id
    });
  },

  onShareAppMessage: function() {}
});
