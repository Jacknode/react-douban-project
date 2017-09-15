/**
 * Created by leibo on 17/8/15.
 */
import Obj from './m.touch'
export default function (itemThis,id) {
    var wrap = document.querySelector('#wrap');
    var scroll = wrap.querySelector('.scroll');
    var footer = document.querySelector('#footer');
    var footerSpan = footer.getElementsByTagName('span')[0];
    var wrapRect = wrap.getBoundingClientRect();
    var newCards = wrap.getElementsByClassName('newCard');
    var isCreate = false;
    var _this = itemThis;
    var num = 0;
    Obj.mScroll({
        wrap: wrap,
        dir: 'y',
        over: 'backOut',
        showBar: false,
        move(){
            if(_this.isLoadOver){
                return;
            }
        },
        start(){
            _this.$store.dispatch('hideLoading');
            if(_this.isLoadOver){
                return;
            }
            var min = wrap.clientHeight - scroll.offsetHeight;
            var now = Obj.css(scroll,"translateY");
            if(now <= min){//判断是否是从底部开始滑动的，如果是可能要执行加载更多
                isCreate = true;
            } else {
                isCreate = false;
            }
            if(isCreate) {
                footer.style.display = "block";
            } else {
                footer.style.display = "none";
            }
        },
        up(){
            if(_this.isLoadOver){
                return;
            }
            if(isCreate){
                var min = wrap.clientHeight - scroll.offsetHeight;
                var now = Obj.css(scroll,"translateY");
                _this.$http.get('/list/subject/'+id+'/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b').then(function (data) {
                    var data = data.data.reviews;
                    console.log(now,min - footer.offsetHeight)
                    if(now <= min - footer.offsetHeight ){
                        num+=2;
                        if(_this.reviews.length+num>=data.length){
                            footerSpan.innerHTML = '没有内容了';
                            _this.isLoadOver = true;
                            _this.$store.dispatch('hideLoading');
                            footer.style.display = "none";
                            return;
                        }
                        console.log('上拉加载')
                        // console.log(data)
                        for(var i=0;i<data.length;i++){
                            var val = Math.round(data[i].rating.value);
                            if(val==0){
                                data[i].isOff = false
                            }else{
                                data[i].isOff = true
                            }
                            data[i].index = val;
                        }
                        // var newArr = _this.reviews.concat(data.slice(_this.reviews.length+num,_this.reviews.length+num+2));
                        var newArr = data.slice(_this.reviews.length+num,_this.reviews.length+num+2);
                        _this.$store.dispatch('pushReviews',newArr)

                        footer.style.display = "none";
                    }
                })
            }
        }
    })
}
