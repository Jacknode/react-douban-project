import React from 'react'
import Home from './Home'
import Movie from './Movie'
import Book from './Book'
import '../styles/css/App.css'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
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
          </Switch>
          <footer>
            <ul className="footList">
              <li className="item_nav active">
                <Link to="/">
                  <span className="fa fa-home all"></span>
                  <p>首页</p>
                </Link>
              </li>
              <li className="item_nav">
                <Link to="/book">
                  <span className="fa fa-book all"></span>
                  <p>图书</p>
                </Link>
              </li>
              <li className="item_nav">
                <Link to="/movie">
                  <span className="fa fa-video-camera all"></span>
                  <p>电影</p>
                </Link>
              </li>
              <li className="item_nav">
                <Link to="/music">
                  <span className="fa fa-music all"></span>
                  <p>音乐</p>
                </Link>
              </li>
              <li className="item_nav">
                <Link to="/admin">
                  <span className="fa fa-user-o all"></span>
                  <p>我的</p>
                </Link>
              </li>
            </ul>
          </footer>
        </div>
      </Router>
    )
  }
}
export default App
