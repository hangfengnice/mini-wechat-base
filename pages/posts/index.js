// pages/posts/index.js
const {postList} = require('../../data/posts-data')

Page({
  data: {
    imgUrlData: [
      "../../images/wx.png",
      "../../images/vr.png",
      "../../images/iqiyi.png"
    ],
    post_content: null
  },

  onLoad: function(options) {
    console.log(postList)
    this.setData({
      post_content: postList
    });
  },

  onPostTap(e){
    let postId = e.detail.id
    wx.navigateTo({
      url: './post-detail/index?id=' + postId,
    })
  },

  onShareAppMessage: function() {}
});
