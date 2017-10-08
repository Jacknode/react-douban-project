import JSONP from './JSONP'
function Public() {}
Public.prototype.publicMovie = function(data) {
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
Public.prototype.getInfoList = function(url) {
  return new Promise(function(resolve) {
    var _this = this;
    JSONP.getJSON(url, null, function(data) {
      resolve(data)
    })
  })
}
Public.prototype.getData = function(url, _this, arr) {
  var str = url;
  this.getInfoList(str).then((data) => {
    var result = this.publicMovie(data)
    _this.setState({[arr]: result})
  })
}
var o = new Public();
export default o;
