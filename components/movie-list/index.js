// components/movie-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movies: Object
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
    onMoretap(e){
      let category = e.currentTarget.dataset.category
      console.log(category)
      wx.navigateTo({
        url: "/pages/movie/more-movie/index?category=" + category
      })
    }
  }
})
