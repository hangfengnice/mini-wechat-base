// pages/movie/index.js
const {converToStarsArray, douban_limit} = require('../../utils/util')
const app = getApp()

Page({
  data: {
    inTheaters: null,
    commingSoon: null,
    top250: null,
    searchResult: null,
    containerShow: true
  },

  onLoad: function (options) {
    let baseUrl = app.globalData.DoubanBase
    let in_theaters = baseUrl + "/v2/movie/in_theaters" + "?start=0&count=3"
    let top250 = baseUrl +  "/v2/movie/top250" + "?start=0&count=3"
    let comming_soon = baseUrl + "/v2/movie/coming_soon" + "?start=0&count=3"
    this.getMovieListData(in_theaters, 'inTheaters')
    this.getMovieListData(top250, 'top250')
    this.getMovieListData(comming_soon, "commingSoon")
    douban_limit()
  },
  getMovieListData(url, setKey){
    wx.request({
      url,
      method: 'GET',
      header: {
        "Content-Type" : "json"
      },
      success: res => {
        this.processDoubanData(res.data, setKey)
      },
    })
  },
  processDoubanData(data, setKey){
    let movies = []
    for(var idx in data.subjects){
      var subject = data.subjects[idx]
      var title = subject.title
      if(title.length >= 6){
        title = title.substring(0, 6) + '...'
      }
      var temp = {
        star: converToStarsArray(subject.rating.stars),
        title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieid: subject.id
      }
      movies.push(temp)
    }
    var readyData = {}
    readyData[setKey] = {
      movies,
      title: data.title
    }
      
    this.setData(readyData)
  },

  bindfocus(){
    this.setData({
      containerShow: false
    })
  },

  onImgCancel(){
    this.setData({
      containerShow: true
    })
  },

  bindconfirm(e){
    this.setData({
      containerShow: true
    })
    let val = e.detail.value
    let searchUrl = app.globalData.DoubanBase + "/v2/movie/search?q=" + val

    this.getMovieListData(searchUrl, 'searchResult')
  }


 
})