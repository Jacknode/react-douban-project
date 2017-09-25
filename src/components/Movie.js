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
class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BannerList: [],
      movieFree: [],
      movieLatest: []
    }
  }
  componentDidMount() {
    var str1 = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=108288&_=1506153520294'
    this.getInfoList(str1).then((data) => {
      var result = this.publicMovie(data)
      this.setState({BannerList: result})
    })
    var str2 = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items?os=ios&callback=jsonp2&start=0&count=8&loc_id=108288&_=1506337187881'
    this.getInfoList(str2).then((data) => {
      var result = this.publicMovie(data)
      this.setState({movieFree: result})
    })
    var str3 = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items?os=ios&callback=jsonp3&start=0&count=8&loc_id=108288&_=1506337187882'
    this.getInfoList(str3).then((data) => {
      var result = this.publicMovie(data)
      this.setState({movieLatest: result})
    })
  }
  componentDidUpdate() {
    banner()
  }

  getInfoList(url) {
    return new Promise(function(resolve) {
      var _this = this;
      JSONP.getJSON(url, null, function(data) {
        resolve(data)
      })
    })
  }
  publicMovie(data) {
    var result = data.subject_collection_items;
    for (var i = 0; i < result.length; i++) {
      if (!result[i].rating) {
        result[i].rating = {
          value: 0
        }
      }
      var start = Math.round(result[i].rating.value / 2);
      if (start == 0) {
        result[i].isOff = false
      } else {
        result[i].isOff = true
      }
      result[i].index = start;
    }
    return result
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
          <div style={{
            height: '7rem'
          }}></div>
        </div>
      </ReactIScroll>
    )
  }
}
export default Movie
