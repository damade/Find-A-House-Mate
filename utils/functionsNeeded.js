const User = require("../models/User");
function isNotEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return true;
    }
    return false;
}
function isEmpty(object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
}
function isObjectNotEmpty(obj){
    if(Array.isArray(obj) && !obj.length){
     return false;
    }
    return true;
}

module.exports.isNotEmpty = isNotEmpty;
module.exports.isEmpty = isEmpty;
module.exports.isObjectNotEmpty = isObjectNotEmpty;