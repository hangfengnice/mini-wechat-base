// pages/movie/more-movie/index.j
const app = getApp()
const {http, converToStarsArray} = require('../../../utils/util')

Page({
  data: {
    movies: null,
    requestUrl: '',
    totalCount: 0,
    isEmpty: true
  },
  onLoad(options){
    let category = options.category
    console.log(category)
    wx.setNavigationBarTitle({
      title: category
    })
    let baseUrl = app.globalData.DoubanBase
    var dataUrl = ''
    switch(category){
      case "正在上映的电影-北京":
        dataUrl = baseUrl + "/v2/movie/in_theaters"
        break
      case "即将上映的电影":
        dataUrl =   baseUrl +  "/v2/movie/top250"
        break
      case "豆瓣电影Top250":
        dataUrl = baseUrl + "/v2/movie/coming_soon"
        break;
        default:
          break
    }
    this.setData({
      requestUrl: dataUrl
    })
    http(dataUrl, this.processDoubanData)

  },

  onReachBottom(){
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + '&count=20';
    http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  onPullDownRefresh(){
    console.log('doen')
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.setData({
      movies: null,
      isEmpty: true,
      totalCount: 0
    })
    http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },


  processDoubanData(data){
    console.log(data)
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
    var totalMovies = {}
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies)
    }else{
      totalMovies = movies
      this.data.isEmpty = false
    }
    this.setData({
      movies: totalMovies,
      totalCount: this.data.totalCount + 20
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  onReady(options){
    
  },

  onShareAppMessage: function () {
    
  }
})