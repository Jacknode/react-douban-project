/**
 * Created by leibo on 17/8/21.
 */

import Obj from './m.touch'
export default function (type) {
    var type = type||'backOut'
    // 头部导航的动画

    var wrap = document.querySelector('#wrap');
    Obj.mScroll({
        wrap: wrap,
        dir: 'y',
        over: type,
        showBar: false
    })
}
