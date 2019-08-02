const {
  http,
  converToStarsArray,
  converTocastString,
  convertToCastInfos
} = require("../util");

class Movie{
  constructor(url){
    this.url = url
  }

  getMovieData(cb){
    this.cb = cb
    http(this.url, this.processDoubanData.bind(this))
  }

  processDoubanData(data){
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
    this.cb(movie)
  }
}

export {Movie}