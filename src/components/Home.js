/**
 * Created by leibo on 17/9/15.
 */
import React from 'react'
import JSONP from '../assets/js/JSONP'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';
import '../styles/css/Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HomeList: []
    }
  }
  componentDidMount(){
    this.getHomeList();
  }
  getHomeList(){
    var _this = this;
    JSONP.getJSON('https://m.douban.com/rexxar/api/v2/recommend_feed?callback=json1',null,function (data) {
      _this.setState({
        HomeList: data.recommend_feeds
      })
    })
  }
  render(){
    var arr = [];
    for(var i=0;i<100;i++){
      arr.push(i)
    }
    const listItems = arr.map((number,i) =>
      <li key={i}>{number}</li>
    );
    var HomeList = this.state.HomeList
    return (
      <div style={{height: '200vh'}}>
        <ReactIScroll iScroll={iScroll}
                      options={ {
                        mouseWheel: true,
                        scrollbars: false
                      }}
        >
          <div>
            {HomeList.map((item,i)=>{
              return <div className="card" key={i} >
                <div className={item.target.cover_url?'cardLeft':'addWidth'}>
                  <p>{item.title}</p>
                  <p>
                    {item.target.desc}
                  </p>
                </div>
                <div className="cardRight" style={{display:item.target.cover_url?'block':'none'}}>
                  <img  alt="" src={item.target.cover_url} className="imgs"/>
                </div>
                <div className="itemList">
                  <span>by {item.target.author.name}</span>
                  <span>{item.source_cn}</span>
                </div>
              </div>
            })}
          </div>
        </ReactIScroll>
      </div>
    )
  }
}
export default Home
