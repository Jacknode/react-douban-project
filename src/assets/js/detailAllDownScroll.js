import Obj from './m.touch'
import JSONP from './JSONP'
export default function(_this, id) {
  var main = document.querySelector('#MovieDetails');
  var swiper = document.querySelector('.detailContent');
  var footLoadImg = swiper.querySelector('.footLoadImg');
  var footLoadImg2 = swiper.querySelector('.footLoadImg2');
  var footLoadText = swiper.querySelector('.footLoadText');
  var footerLoad = swiper.querySelector('#footerLoad');
  var footerLoadH = footerLoad.offsetHeight;
  let count = 8;
  let page = 0;

  footLoadImg.style.transition = ".3s";
  Obj.mScroll({
    wrap: main,
    dir: "y",
    over: 'backOut',
    showBar: false,
    start: function() {
      swiper.style.transition = "none";
    },
    move: function() {

      var now = Obj.css(swiper, "translateY");
      var mainH = swiper.offsetHeight - main.offsetHeight;
      // console.log(now, mainH);
      // console.log(now, mainH)
      if (Math.abs(now) - 80 > mainH) {
        // console.log('加载更多1')
        Obj.css(footLoadImg, "rotate", -180);
        footLoadText.innerHTML = "释放加载更多";
      } else {
        Obj.css(footLoadImg, "rotate", 0);
        footLoadText.innerHTML = "上拉加载";
      }
    },
    up: function() {
      var now = Obj.css(swiper, "translateY");
      var mainH = swiper.offsetHeight - main.offsetHeight
      if (Math.abs(now) - 80 > mainH) {
        loadAll()
        console.log('加载更多');
      }
    }
  });
  //加载更多
  function loadAll() {
    var swiperH = Obj.css(swiper, 'translateY')
    cancelAnimationFrame(swiper.timer);
    swiper.style.transition = ".3s";
    // console.log(swiperH, footerLoadH);
    Obj.css(swiper, "translateY", swiperH + footerLoadH);
    footLoadImg.style.display = 'none';
    footLoadImg2.style.display = "block";
    footLoadText.innerHTML = '正在加载';
    swiper.addEventListener('WebkitTransitionEnd', end);
    swiper.addEventListener('transitionend', end);
    function end() {
      swiper.removeEventListener('WebkitTransitionEnd', end);
      swiper.removeEventListener('transitionend', end);
      // creatLi(true);
      footLoadImg2.style.display = "none";
      footLoadText.innerHTML = "加载完成";
      setTimeout(function() {
        // Obj.css(swiper, "translateY", 0);
        swiper.addEventListener('WebkitTransitionEnd', end);
        swiper.addEventListener('transitionend', end);

        function end() {
          swiper.removeEventListener('WebkitTransitionEnd', end);
          swiper.removeEventListener('transitionend', end);
          footLoadImg.style.display = "block";
          footLoadText.innerHTML = "上拉加载";
        }
      }, 500);
      console.log(count);
      if (count == 20) {
        console.log(1);
        page++;
        count = 0;
      }
      count += 8;
      JSONP.getJSON(`https://api.douban.com/v2/movie/subject/${id}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${page}&count=${count}&callback=json2`, null, function(data) {
        // console.log(data);
        var reviews = data.reviews;
        if (reviews.length) {
          for (var i = 0; i < reviews.length; i++) {
            reviews[i].index = [];
            reviews[i].newIndex = []
            if (!reviews[i].rating) {
              reviews[i].rating = {
                value: 0
              }
            }
            var start = Math.round(reviews[i].rating.value);
            if (start == 0) {
              reviews[i].isOff = false
            } else {
              reviews[i].isOff = true
            }
            for (var j = 0; j < start; j++) {
              reviews[i].index.push(j)
            }
            for (var s = 0; s < 5 - start; s++) {
              reviews[i].newIndex.push(s)
            }
          }
          reviews = reviews.slice(count - 8)
        }
        reviews = [
          ..._this.state.newReviews,
          ...reviews
        ]
        _this.setState({newReviews: reviews})
        footLoadImg.style.display = 'block';
        footLoadText.innerHTML = '正在加载';
      })
    }
  }
}
