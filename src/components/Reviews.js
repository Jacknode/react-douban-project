import React from 'react'

const active = {
  color: '#aaa'
}

class Reviews extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var reviews = this.props.reviewAll;
    console.log(reviews);
    return (
      <div>
        {reviews.map((item, index) => {
          return <div className="Essay" key={index}>
            <div className="EssayLeft">
              <img src={item.author.avatar} alt=""/>

            </div>
            <div className="EssayRight">
              <div className="EssayHeader">
                <span>
                  {item.author.name}
                </span>
                <span>
                  {item.index.map((item, index) => {
                    return <i className="fa fa-star active" key={index}></i>
                  })}
                  {item.newIndex.map((item, index) => {
                    return <i className="fa fa-star" style={active} key={index}></i>
                  })}
                </span>
              </div>
              <p className="time">
                {item.updated_at}
              </p>
              <p className="content">
                {item.summary}
              </p>
              <p className="icon">
                <i className="fa fa-thumbs-o-up"></i>
                <span>
                  {item.useful_count}
                </span>
              </p>
            </div>
          </div>
        })}
      </div>
    )
  }
}
export default Reviews;
