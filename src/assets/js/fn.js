/**
 * Created by mac on 17/7/29.
 */
import Obj from './m.touch'

export default function () {
  // 头部导航的动画
  // document.addEventListener('touchstart', function(e) {
  //   e.preventDefault();
  // });
  var navWrap = document.querySelectorAll('.picAll');
  for(var i=0;i<navWrap.length;i++){
    tab(navWrap[i]);
  }
  function tab(obj) {

    var navs = obj.querySelector('.pics');
    var lis = navs.children;
    if(lis.length){
        var liW = Obj.css(lis[0], 'width');
        Obj.css(navs, 'width', lis.length * liW);
        Obj.mScroll({
            wrap: obj,
            dir: 'x',
            over: 'none',
            showBar: false
        });
    }
  }

  // var wrap = document.querySelector('#wrap');
  // Obj.mScroll({
  //   wrap: wrap,
  //   dir: 'y',
  //   over: 'backOut',
  //   showBar: false
  // })
}


