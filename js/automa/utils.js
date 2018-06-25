var cloneObject = function(orig){
	var destiny = {};
  for (var prop in orig) {
    if (orig.hasOwnProperty(prop)) {
      destiny[prop] = orig[prop];
    }
  }
  return destiny;
};