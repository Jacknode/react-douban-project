/**
 * Created by leibo on 17/9/15.
 */
import JSONP from '../assets/js/JSONP'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';
import React from 'react'
// import MovieBanner from './MovieBanner'
import banner from '../assets/js/fn'
import '../styles/css/index.css'
import MoviePublic from './MoviePublic'
import FooterList from './FooterList'
import obj from '../assets/js/public'
class Movie extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      BannerList: [],
      movieFree: [],
      movieLatest: [],
      footerList: [
        {
          name: [
            {
              val: '经典',
              link: 'movieVclassic'
            }, {
              val: '冷门佳片',
              link: 'movieVunderrated'
            }
          ]
        }, {
          name: [
            {
              val: '豆瓣高分',
              link: 'movieVdoubantop'
            }, {
              val: '动作',
              link: 'movieVaction'
            }
          ]
        }, {
          name: [
            {
              val: '喜剧',
              link: 'movieVcomedy'
            }, {
              val: '爱情',
              link: 'movieVlove'
            }
          ]
        }, {
          name: [
            {
              val: '悬疑',
              link: 'movieVmystery'
            }, {
              val: '恐怖',
              link: 'movieVhorror'
            }
          ]
        }, {
          name: [
            {
              val: '科幻',
              link: 'movieVscifi'
            }, {
              val: '治愈',
              link: 'movieVsweet'
            }
          ]
        }, {
          name: [
            {
              val: '文艺',
              link: 'movieVartfilm'
            }, {
              val: '成长',
              link: 'movieVyouth'
            }
          ]
        }, {
          name: [
            {
              val: '动画',
              link: 'movieVanimation'
            }, {
              val: '华语',
              link: 'movieVchinese'
            }
          ]
        }, {
          name: [
            {
              val: '欧美',
              link: 'movieVwestern'
            }, {
              val: '韩国',
              link: 'movieVkorean'
            }
          ]
        }, {
          name: [
            {
              val: '日本',
              link: 'movieVjapanese'
            }
          ]
        }
      ]
    }
  }
  componentDidMount() {
    obj.getData('https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=108288&_=1506153520294', this, 'BannerList')
    obj.getData('https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items?os=ios&callback=jsonp2&start=0&count=8&loc_id=108288&_=1506337187881', this, 'movieFree')
    obj.getData('https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items?os=ios&callback=jsonp3&start=0&count=8&loc_id=108288&_=1506337187882', this, 'movieLatest')
  }
  componentDidUpdate() {
    banner()
  }
  render() {
    const BannerList = this.state.BannerList;
    const movieFree = this.state.movieFree;
    const movieLatest = this.state.movieLatest
    return (
      <ReactIScroll iScroll={iScroll} options={{
        mouseWheel: true,
        scrollbars: false
      }}>
        <div>
          <MoviePublic BannerList={BannerList} title="影院热映"/>
          <MoviePublic BannerList={movieFree} title="免费在线观影"/>
          <MoviePublic BannerList={movieLatest} title="新片速递"/>
          <FooterList FooterList={this.state.footerList}/>
          <div style={{
            height: '8rem'
          }}></div>
        </div>
      </ReactIScroll>
    )
  }
}
export default Movie
