// components/movie/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMovieTap(){
      wx.navigateTo({
        url: '/pages/movie/movie-detail/index?id=' + this.data.movie.movieid,
        success: function(res){
          // success
        }
      })
    }
  }
})
