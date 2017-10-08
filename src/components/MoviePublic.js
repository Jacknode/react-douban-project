import React from 'react'
import {Link} from 'react-router-dom'

class MoivePublic extends React.Component {
  constructor(props) {
    super(props)
  }
  getIcon(num) {
    var arr = []
    for (var i = 0; i < num; i++) {
      arr.push(i)
    }
    return arr;
  }
  Actions() {
    window.location.reload();
  }
  render() {
    const BannerList = this.props.BannerList;
    return (
      <div className="wrapContent">
        <div className="head">
          <span>{this.props.title}</span>
          <a href='#'>更多</a>
        </div>
        <div className="clear"></div>
        <div className="picAll">
          <div className="pics" onClick={this.Actions}>
            {BannerList.length
              ? BannerList.map((item, index) => {
                return <Link key={index} to={{
                  pathname: `/movieDetail/${item.id}`,
                  state: {
                    modal: true
                  }
                }}>
                  <img src={item.cover.url}/>
                  <p className="title">
                    {item.title}
                  </p>
                  {item.isOff
                    ? <p>
                        {this.getIcon(item.index).map((item, index) => {
                          return <i className="fa fa-star active" key={index}></i>
                        })}
                        {this.getIcon(5 - item.index).map((item, index) => {
                          return <i className="fa fa-star" key={index}></i>
                        })}
                      </p>
                    : ''}
                  {item.isOff
                    ? <span>{item.rating.value.toFixed(1)}</span>
                    : <span style={{
                      paddingRight: '0.7rem'
                    }}>暂无评分</span>}
                </Link>
              })
              : <h2>加载中</h2>}
          </div>
        </div>
      </div>
    )
  }
}
export default MoivePublic
