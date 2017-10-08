import React from 'react'
import '../styles/css/index.css'

class FooterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <div className="wrapNav">
          <nav className="nav">
            {this.props.FooterList.map((item, index) => {
              return < div className = "card" key = {
                index
              } > <a href="javascript:;">
                <span>{item.name[0].val}</span>
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
              {
                item.name[1]
                  ? < a href = "javascript:;" > <span>{item.name[1].val}</span> < span > <i className="fa fa-angle-right"></i> < /span>
            </a >: ''
              } < /div>
            })}
          </nav>
        </div>
      </div>
    )
  }
}
export default FooterList
