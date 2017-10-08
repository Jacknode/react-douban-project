import React from 'react'
import Home from './Home'
import Movie from './Movie'
import Book from './Book'
import Music from './Music'
import MovieDetail from './MovieDetail'
import '../styles/css/App.css'
import {BrowserRouter as Router, Route, Link, Switch, withRouter} from 'react-router-dom'
import * as actionsCreators from '../stores/actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: false
    }
  }
  componentDidMount() {
    // console.log(this.props);
  }
  isActive(newStr) {
    var str = window.location.href;
    if (str.endsWith(newStr)) {
      return true
    } else if (str.includes(newStr) && str.endsWith('/')) {
      return true
    }
    return false
  }
  activeFun() {
    if (e.target.nodeName.toUpperCase() == 'SPAN' || e.target.nodeName.toUpperCase() == 'P') {
      var str = e.target.parentNode.getAttribute('href');
      _this.isActive(e.target.parentNode.href)
    }
  }
  Actions() {
    window.location.reload();
  }
  render() {
    // const {location} = this.props
    // const isModal = !!(location.state && location.state.modal && this.state.location !== location // not initial render
    // )
    return (
      <div style={{
        height: '100vh'
      }}>
        <header>
          <div className="header">
            <Link to="/" className="active">豌豆</Link>
            <Link to="/movie" className="blue">电影</Link>
            <Link to="/book" className="Earth">图书</Link>
            <Link to="/" className="yellow">游戏</Link>
            <Link to="/" className="danblue">音乐</Link>
            <Link to="/">
              <i className="fa fa-search"></i>
            </Link>
          </div>
        </header>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/movie" component={Movie}/>
          <Route path="/book" component={Book}/>
          <Route path="/music" component={Music}/>
          <Route path="/movieDetail/:id" component={MovieDetail}/>
        </Switch>

        <footer>
          <ul className="footList" onClick={this.Actions}>
            {this.isActive('/')
              ? <li className="item_nav active">
                  <Link to="/">
                    <span className="fa fa-home all"></span>
                    <p>首页</p>
                  </Link>
                </li>
              : <li className="item_nav">
                <Link to="/">
                  <span className="fa fa-home all"></span>
                  <p>首页</p>
                </Link>
              </li>}
            {this.isActive('/book')
              ? <li className="item_nav active">
                  <Link to="/book">
                    <span className="fa fa-book all"></span>
                    <p>图书</p>
                  </Link>
                </li>
              : <li className="item_nav">
                <Link to="/book">
                  <span className="fa fa-book all"></span>
                  <p>图书</p>
                </Link>
              </li>
}
            {this.isActive('/movie')
              ? <li className="item_nav active">
                  <Link to="/movie">
                    <span className="fa fa-video-camera all"></span>
                    <p>电影</p>
                  </Link>
                </li>
              : <li className="item_nav">
                <Link to="/movie">
                  <span className="fa fa-video-camera all"></span>
                  <p>电影</p>
                </Link>
              </li>
}
            {this.isActive('/music')
              ? <li className="item_nav active">
                  <Link to="/music">
                    <span className="fa fa-music all"></span>
                    <p>音乐</p>
                  </Link>
                </li>
              : <li className="item_nav">
                <Link to="/music">
                  <span className="fa fa-music all"></span>
                  <p>音乐</p>
                </Link>
              </li>}
            {this.isActive('/admin')
              ? <li className="item_nav active">
                  <Link to="/admin">
                    <span className="fa fa-user-o all"></span>
                    <p>我的</p>
                  </Link>
                </li>
              : <li className="item_nav">
                <Link to="/admin">
                  <span className="fa fa-user-o all"></span>
                  <p>我的</p>
                </Link>
              </li>}
          </ul>
        </footer>
      </div>
    )
  }
}

export default App;
