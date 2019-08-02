// pages/movie/movie-detail/index.js
const app = getApp();
const {
  http,
  converToStarsArray,
  converTocastString,
  convertToCastInfos
} = require("../../../utils/util");
Page({
  data: {
    movie: null
  },
  onLoad: function(options) {
    console.log(options.id);
    let url = app.globalData.DoubanBase + "/v2/movie/subject/" + options.id;

    http(url, this.processDoubanData);
  },

  processDoubanData(data) {
    console.log(data);
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    };
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: converToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: converTocastString(data.casts),
      castsInfo: convertToCastInfos(data.casts),
      summary: data.summary
    };
    console.log(movie);
    this.setData({
      movie
    });
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
