/**
 * Created by leibo on 17/9/15.
 */
import React from 'react'
import JSONP from '../assets/js/JSONP'
import Scroll from '../assets/js/HomeScroll'
import '../styles/css/Home.less'
import '../styles/css/HomeLoad.css'

const wrap = {
  position: 'absolute',
  top: '3rem',
  left: 0,
  right: 0,
  bottom: '3.3rem',
  width: '100%',
  overflow: 'hidden',
  background: '#282828'
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HomeList: []
    }
  }
  componentDidMount() {
    Scroll(this);
  }
  componentWillMount() {
    this.getHomeList();
  }
  getHomeList() {
    var _this = this;
    JSONP.getJSON('https://m.douban.com/rexxar/api/v2/recommend_feed?callback=json1', null, function(data) {
      _this.setState({HomeList: data.recommend_feeds})
    })
  }
  render() {
    var HomeList = this.state.HomeList
    return (
      <div id="wrap" style={wrap}>
        <div id="Home">
          <div id="load">
            <span className="loadImg"></span>
            <span className="loadImg2"></span>
            <span className="loadText">下拉刷新</span>
          </div>
          {HomeList.map((item, i) => {
            return <div className="card" key={i}>
              <div className={item.target.cover_url
                ? 'cardLeft'
                : 'addWidth'}>
                <p>{item.title}</p>
                <p>
                  {item.target.desc}
                </p>
              </div>
              <div className="cardRight" style={{
                display: item.target.cover_url
                  ? 'block'
                  : 'none'
              }}>
                <img alt="" src={item.target.cover_url} className="imgs"/>
              </div>
              <div className="itemList">
                <span>by {item.target.author.name}</span>
                <span>{item.source_cn}</span>
              </div>
            </div>
          })}
          <div id="footerLoad">
            <span className="footLoadImg"></span>
            <span className="footLoadImg2"></span>
            <span className="footLoadText">加载更多</span>
          </div>
        </div>
      </div>

    )
  }
}
export default Home
