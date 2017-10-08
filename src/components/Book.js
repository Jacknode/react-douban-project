/**
 * Created by leibo on 17/9/15.
 */
import React from 'react'
import JSONP from '../assets/js/JSONP'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';
import PublicBanner from './MoviePublic'
import banner from '../assets/js/fn'
import FooterList from './FooterList'

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookFiction: [],
      bookNonfiction: [],
      marketProduct: [],
      footerList: [
        {
          name: [
            {
              val: '小说',
              link: 'bookBnovel'
            }, {
              val: '爱情',
              link: 'bookBlove'
            }
          ]
        }, {
          name: [
            {
              val: '历史',
              link: 'bookBhistory'
            }, {
              val: '外国文学',
              link: 'bookBforeign'
            }
          ]
        }, {
          name: [
            {
              val: '青春',
              link: 'bookByouth'
            }, {
              val: '励志',
              link: 'bookBmotivation'
            }
          ]
        }, {
          name: [
            {
              val: '随笔',
              link: 'bookBessay'
            }, {
              val: '传记',
              link: 'bookBbio'
            }
          ]
        }, {
          name: [
            {
              val: '推理',
              link: 'bookBdetective'
            }, {
              val: '旅行',
              link: 'bookBtravel'
            }
          ]
        }, {
          name: [
            {
              val: '奇幻',
              link: 'bookBfantasy'
            }, {
              val: '经营',
              link: 'bookBbusiness'
            }
          ]
        }
      ]
    }
  }
  componentDidMount() {
    var str1 = 'https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=0&_=0';
    this.getInfoList(str1).then((data) => {
      var result = this.publicMovie(data)
      this.setState({bookFiction: result})
    })
    var str2 = 'https://m.douban.com/rexxar/api/v2/subject_collection/book_nonfiction/items?os=ios&callback=jsonp2&start=0&count=8&loc_id=0&_=0';
    this.getInfoList(str2).then((data) => {
      var result = this.publicMovie(data)
      this.setState({bookNonfiction: result})
    })
  }
  componentDidUpdate() {
    banner()
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
  getInfoList(url) {
    return new Promise(function(resolve) {
      var _this = this;
      JSONP.getJSON(url, null, function(data) {
        resolve(data)
      })
    })
  }
  render() {
    return (
      <ReactIScroll iScroll={iScroll} options={{
        mouseWheel: true,
        scrollbars: false
      }}>
        <div>
          <PublicBanner BannerList={this.state.bookFiction} title="最受关注图书｜虚构类"/>
          <PublicBanner BannerList={this.state.bookNonfiction} title="最受关注图书｜非虚构类"/>
          <FooterList FooterList={this.state.footerList}/>
          <div style={{
            height: '8rem'
          }}></div>
        </div>
      </ReactIScroll>
    )
  }
}
export default Book
