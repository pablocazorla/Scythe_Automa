var cloneObject = function(orig){
	var destiny = {};
  for (var prop in orig) {
    if (orig.hasOwnProperty(prop)) {
      destiny[prop] = orig[prop];
    }
  }
  return destiny;
};

var capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

var extendObject = function () {
	var extended = {};

	// Merge the object into the extended object
	var merge = function (obj) {
    for ( var prop in obj ) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          // If we're doing a deep merge and the property is an object
          extended[prop] = extendObject(extended[prop], obj[prop]);
        } else {
          // Otherwise, do a regular merge
          extended[prop] = obj[prop];
        }
      }
    }
	};

	// Loop through each object and conduct a merge
	for (var i = 0; i < arguments.length; i++) {
		merge(arguments[i]);
	}

	return extended;
};