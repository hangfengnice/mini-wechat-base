function http(url, callback) {
  wx.request({
    url,
    method: "GET",
    header: {
      "Content-Type": "json"
    },
    success: res => {
      callback(res.data)
    }
  });
}

function douban_limit() {
    var timestamp = Date.parse(new Date());
    var requestDoubanTime = wx.getStorageSync('requestDoubanTime')
    console.log(timestamp, requestDoubanTime)
    var requestDoubanNum = wx.getStorageSync('requestDoubanNum');
    if (requestDoubanTime && timestamp - requestDoubanTime < 30000) {
        wx.setStorageSync('requestDoubanNum', requestDoubanNum += 1);
        if (requestDoubanNum < 10) {
            //Lower than 35/m,pass            
            return;
        }
        else {
            wx.showToast({
                title: '豆瓣api请求频率超10，小心',
                icon: 'loading',
                duration: 5000
            })
            //提示或者去别的地方
            // wx.redirectTo({
            //      url:"pages/welcome/welcome"
            // });
        }
    }
    else {
        wx.setStorageSync('requestDoubanTime', timestamp);
        wx.setStorageSync('requestDoubanNum', 1);
    }
}

function converToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i < num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function converTocastString(casts){
  var castsjoin = ''
  for(var idx in casts){
    castsjoin = castsjoin + casts[idx].name  + '/'
  }
  return castsjoin.substring(0, castsjoin.length-2)
}

function convertToCastInfos(casts){
  var castsArray = []
  for(var idx in casts){
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast)
  }
  return castsArray
}

module.exports = {
  converToStarsArray,
  http,
  douban_limit,
  converTocastString,
  convertToCastInfos
};
