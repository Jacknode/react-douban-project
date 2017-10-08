import Obj from './m.touch'
import JSONP from './JSONP'
export default function(_this) {
  var main = document.querySelector('#wrap');
  var swiper = document.querySelector('#Home');
  var load = document.querySelector('#load');
  var loadImg = load.querySelector('.loadImg');
  var loadImg2 = load.querySelector('.loadImg2');
  var loadText = load.querySelector('.loadText');
  var footLoadImg = swiper.querySelector('.footLoadImg');
  var footLoadImg2 = swiper.querySelector('.footLoadImg2');
  var footLoadText = swiper.querySelector('.footLoadText');
  var loadH = load.offsetHeight;
  var footerLoad = swiper.querySelector('#footerLoad');
  var footerLoadH = footerLoad.offsetHeight;

  var newLoadDay = new Date().getDate();
  // console.log(css(main,"translateY"));
  loadImg.style.transition = ".3s";
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
      var mainH = swiper.offsetHeight - main.offsetHeight
      if (now > loadH) {
        Obj.css(loadImg, "rotate", -180);
        loadText.innerHTML = "释放立即刷新";
      } else {
        Obj.css(loadImg, "rotate", 0);
        loadText.innerHTML = "下拉刷新";
        // console.log(now, mainH)
        if (Math.abs(now) - 80 > mainH) {
          // console.log('加载更多1')
          Obj.css(footLoadImg, "rotate", -180);
          footLoadText.innerHTML = "释放加载更多";
        } else {
          Obj.css(footLoadImg, "rotate", 0);
          footLoadText.innerHTML = "上拉加载";
        }
      }
    },
    up: function() {
      var now = Obj.css(swiper, "translateY");
      var mainH = swiper.offsetHeight - main.offsetHeight
      if (now > loadH) {
        cancelAnimationFrame(swiper.timer);
        swiper.style.transition = ".3s";
        Obj.css(swiper, "translateY", loadH);
        loadImg.style.display = "none";
        loadImg2.style.display = "block";
        loadText.innerHTML = "正在刷新";
        swiper.addEventListener('WebkitTransitionEnd', end);
        swiper.addEventListener('transitionend', end);

        function end() {
          swiper.removeEventListener('WebkitTransitionEnd', end);
          swiper.removeEventListener('transitionend', end);
          // creatLi(true);
          loadImg2.style.display = "none";
          loadText.innerHTML = "刷新完成";
          setTimeout(function() {
            Obj.css(swiper, "translateY", 0);
            swiper.addEventListener('WebkitTransitionEnd', end);
            swiper.addEventListener('transitionend', end);

            function end() {
              swiper.removeEventListener('WebkitTransitionEnd', end);
              swiper.removeEventListener('transitionend', end);
              loadImg.style.display = "block";
              loadText.innerHTML = "下拉刷新";
            }
          }, 500);
          var date = new Date()
          // console.log(date.getDate());
          var newDay = getRandom(date.getDate())
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          // console.log(newDay);
          var time = y + '-' + toZear(m) + '-' + toZear(newDay);
          JSONP.getJSON(`https://m.douban.com/rexxar/api/v2/recommend_feed?alt=json&next_date=${time}&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=1&callback=json`, null, function(data) {
            // console.log(data);
            var resulte = data.recommend_feeds;
            _this.setState({HomeList: resulte})
          })
        }
      } else {
        if (Math.abs(now) - 80 > mainH) {

          loadAll()
        }

      }
    }
  });
  //获取随机n日期
  function getRandom(n) {
    return Math.ceil(Math.random() * n)
  }
  //补0函数
  function toZear(num) {
    return num < 10
      ? '0' + num
      : num + ''
  }
  //获取月数对应的天数
  function getDay(m) {
    var m_31 = {
      arr: [
        1,
        3,
        5,
        7,
        8,
        10,
        12
      ],
      val: 31
    }
    var m_30 = {
      arr: [
        4, 6, 9, 11
      ],
      val: 30
    };
    var m_29 = {
      arr: [2],
      val: 29
    }
    var newArr = [m_31, m_30, m_29]
    for (var i = 0; i < newArr.length; i++) {
      for (var j = 0; j < newArr[i].arr.length; j++) {
        if (newArr[i].arr[j] == m) {
          return newArr[i].val;
        }
      }
    }
  }
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
      var date = new Date()
      // console.log(date.getDate());
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      newLoadDay--;
      if (newLoadDay < 0) {
        newLoadDay = getDay(m - 1);
        m = m - 1
      }
      // console.log(newDay);
      var time = y + '-' + toZear(m) + '-' + toZear(newLoadDay);
      JSONP.getJSON(`https://m.douban.com/rexxar/api/v2/recommend_feed?alt=json&next_date=${time}&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=1&callback=json1`, null, function(data) {
        // console.log(data);
        var resulte = data.recommend_feeds;
        resulte = [
          ..._this.state.HomeList,
          ...resulte
        ]
        _this.setState({HomeList: resulte})
        footLoadImg.style.display = 'block';
        footLoadText.innerHTML = '正在加载';
      })
    }
  }
}
