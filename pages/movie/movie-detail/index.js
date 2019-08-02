// pages/movie/movie-detail/index.js
const app = getApp();
import {Movie} from '../../../utils/class/Movie'

Page({
  data: {
    movie: null
  },
  onLoad: function(options) {
    console.log(options.id);
    let url = app.globalData.DoubanBase + "/v2/movie/subject/" + options.id;
    const movie = new Movie(url)
    movie.getMovieData((movie) => {
      this.setData({
        movie
      })
    })
  },
  
  viewMoviePostImg(e){
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [src],
    })
  },

  onShareAppMessage: function() {}
});
