// pages/posts/post-detail/index.js
const { postList } = require("../../../data/posts-data");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailData: null,
    collection: false,
    noCollection: '/images/icon/collection-anti.png',
    yesCollection: '/images/icon/collection.png',
    postId: Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.setData({
      detailData: postList[postId],
      postId
    });

    let postsCollected = wx.getStorageSync('post_collected')
    if(postsCollected){
        let collection = postsCollected[postId]
        this.setData({
          collection
        })
        // postsCollected[postId] = false
        // wx.setStorageSync('post_collected', postsCollected)
    }else{
      let postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('post_collected', postsCollected)
    }
  },
  onCollectionTap(){
    this.setData({
      collection: !this.data.collection
    })
    let postsCollected = wx.getStorageSync('post_collected')
    postsCollected[this.data.postId] = this.data.collection
    wx.setStorageSync('post_collected', postsCollected)
  },
  onShareTap(){
    console.log('share')
  },

  onShareAppMessage: function() {}
});
