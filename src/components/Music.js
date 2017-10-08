import React from 'react'
import JSONP from '../assets/js/JSONP'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';
import MusicBanner from './MoviePublic'
import banner from '../assets/js/fn'
import FooterList from './FooterList'
import obj from '../assets/js/public'

class Music extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      musicChinese: [],
      musicOccident: [],
      musicJapan: []
    }
  }
  componentDidMount() {
    obj.getData('https://m.douban.com/rexxar/api/v2/subject_collection/music_chinese/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=0&_=1506424218687', this, 'musicChinese')
    obj.getData('https://m.douban.com/rexxar/api/v2/subject_collection/music_occident/items?os=ios&callback=jsonp2&start=0&count=8&loc_id=0&_=1506424218688', this, 'musicOccident')
    obj.getData('https://m.douban.com/rexxar/api/v2/subject_collection/music_japan_korea/items?os=ios&callback=jsonp3&start=0&count=8&loc_id=0&_=1506424218689', this, 'musicJapan')
  }
  componentDidUpdate() {
    banner()
  }
  render() {
    return (
      <ReactIScroll iScroll={iScroll} options={{
        mouseWheel: true,
        scrollbars: false
      }}>
        <div>
          <MusicBanner BannerList={this.state.musicChinese} title="华语新碟榜"/>
          <MusicBanner BannerList={this.state.musicOccident} title="欧美新碟榜"/>
          <MusicBanner BannerList={this.state.musicJapan} title="日韩新碟榜"/>
          <div style={{
            height: '8rem'
          }}></div>
        </div>
      </ReactIScroll>
    )
  }
}
export default Music
