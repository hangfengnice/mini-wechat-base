// pages/posts/post-detail/index.js
const { postList } = require("../../../data/posts-data");
const bgmusic = wx.getBackgroundAudioManager();
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailData: null,
    collection: false,
    noCollection: "/images/icon/collection-anti.png",
    yesCollection: "/images/icon/collection.png",
    yesMusic: "/images/music/music-start.png",
    noMusic: "/images/music/music-stop.png",
    postId: Number,
    isMusicPlaying: false
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

    let postsCollected = wx.getStorageSync("post_collected");
    if (postsCollected) {
      let collection = postsCollected[postId];
      this.setData({
        collection
      });
      // postsCollected[postId] = false
      // wx.setStorageSync('post_collected', postsCollected)
    } else {
      let postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("post_collected", postsCollected);
    }
    if(app.globalData.g_music && app.globalData.g_currnetId === postId){
      this.setData({
        isMusicPlaying: true
      })
    }
    bgmusic.onPlay(res => {
      this.setData({
        isMusicPlaying : true
      })
      app.globalData.g_music = true
      app.globalData.g_currnetId = postId
    })
    bgmusic.onPause(res => {
      this.setData({
        isMusicPlaying : false
      })
      app.globalData.g_music = false
      app.globalData.g_currnetId = null
    })
  },
  onCollectionTap() {
    let collection = !this.data.collection;
    this.setData({
      collection
    });
    let postsCollected = wx.getStorageSync("post_collected");
    postsCollected[this.data.postId] = collection;
    wx.setStorageSync("post_collected", postsCollected);

    wx.showToast({
      title: collection ? "收藏成功" : "取消收藏"
    });
  },
  onShareTap() {
    let itemList = ["分享给微信好友", "分享到朋友圈", "分享到QQ", "分享到微博"];
    wx.showActionSheet({
      itemList,
      itemColor: "rgb(121, 238, 121)",
      success(res) {
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "分享是可以完成的"
        });
      },
      fail(res) {
        console.log(res);
      }
    });
  },

  onMusicTap(e) {
    let id = this.data.postId
    
    let music = this.data.isMusicPlaying;
    if (music) {
      bgmusic.pause();
      this.setData({
        isMusicPlaying: false
      });
    } else {
      // 设置了 src 之后会自动播放
      bgmusic.title = postList[id].music.title;
      bgmusic.coverImgUrl = postList[id].music.coverImg
      bgmusic.src = postList[id].music.url;
        this.setData({
          isMusicPlaying: true
        });
    }
    
  },

  onShareAppMessage: function() {}
});
