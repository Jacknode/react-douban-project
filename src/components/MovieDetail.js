import React from 'react'
import JSONP from '../assets/js/JSONP'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';
import obj from '../assets/js/public'
import Scroll from '../assets/js/detailAllDownScroll'
import '../styles/css/reviews.css'
import Reviews from './Reviews'

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
const styles = {
  footerLoad: {
    position: 'absolute',
    left: 0,
    bottom: '-2.4rem',
    width: '100%',
    height: '2.4rem'
  },
  footerText: {
    display: 'block',
    color: '#fff',
    textAlign: 'center'
  }
}

class MovieDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
      reviews: [],
      newReviews: []
    }
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    var _this = this;
    JSONP.getJSON(`https://api.douban.com/v2/movie/subject/${id}?apikey=0b2bdeda43b5688921839c8ecb20399b&callback=json`, null, function(data) {
      var details = data;
      _this.setState({details: details})
    })
    JSONP.getJSON(`https://api.douban.com/v2/movie/subject/${id}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=8&callback=json2`, null, function(data) {
      console.log(data);
      var reviews = data.reviews;
      if (reviews.length) {
        for (var i = 0; i < reviews.length; i++) {
          reviews[i].index = [];
          reviews[i].newIndex = []
          if (!reviews[i].rating) {
            reviews[i].rating = {
              value: 0
            }
          }
          var start = Math.round(reviews[i].rating.value);
          if (start == 0) {
            reviews[i].isOff = false
          } else {
            reviews[i].isOff = true
          }
          for (var j = 0; j < start; j++) {
            reviews[i].index.push(j)
          }
          for (var s = 0; s < 5 - start; s++) {
            reviews[i].newIndex.push(s)
          }
        }
      }
      _this.setState({reviews: reviews})
    })
  }
  componentDidMount() {
    let newId = this.props.match.params.id;
    Scroll(this, newId)
  }
  render() {
    let details = this.state.details;
    let reviews = this.state.reviews;
    let newReviews = this.state.newReviews
    return (
      <div id="MovieDetails" style={wrap}>
        <div className="detailContent">
          <h2>{details.title}</h2>
          <div className="left">
            <span className="icons">
              <i className="fa fa-star active"></i>
              <i className="fa fa-star active"></i>
              <i className="fa fa-star active"></i>
              <i className="fa fa-star active"></i>
              <i className="fa fa-star"></i>
            </span>
            <span>{details.ratings_count}人评价</span>
            <p>
              {details.durations
                ? details.durations[0]
                : ''}
              / {details.genres
                ? details.genres[0]
                : ''}
              / {details.casts
                ? details.casts.map((item, index) => {
                  return <span key={index}>{item.name}</span>
                })
                : ''}
              / {details.year}年({details.countries
                ? details.countries[0]
                : ''}) 上映</p>
          </div>
          <div className="right">
            <img src={details.images
              ? details.images.small
              : ''} alt=""/>
          </div>
          <div className="clear"></div>
          <p className="title">{details.title}的剧情简介</p>
          <p>{details.summary}</p>
          <p className="title">影人</p>
          <div className="picAll">
            <div className="pics">
              {details.casts
                ? details.casts.map((item, index) => {
                  return <a href="javascript:;" key={index}>
                    <img src={item.avatars
                      ? item.avatars.small
                      : ''} alt=""/>
                    <p className="title">{item.name}</p>
                  </a>
                })
                : ''}
            </div>
          </div>
          <p className="title">{details.title}的短评</p>
          <Reviews reviewAll={reviews}/>
          <Reviews reviewAll={newReviews}/>
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
export default MovieDetail;
