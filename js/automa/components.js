/* COMPONENTS *******************************************/

// Panel
var Panel = function() {
	var obj = {},
		visible = false,
		panel = new Konva.Group({
			x: width + 2,
			y: 0
		});

	layer.add(panel);

	var	tweenDuration = 0.6;
		
  obj.node = panel;

	obj.addNode = function(elementNode){
		panel.add(elementNode);
	};
	obj.add = function(element){
		panel.add(element.node);
	};

	obj.show = function(){
		panel.x(width + 2);
		var tweenShow = new Konva.Tween({
      node: panel,
      duration: tweenDuration,
      x: 0,
      easing: Konva.Easings.EaseOut,
      onFinish: function() {
        visible = true;
        panel.x(0);
      }
    });
		tweenShow.play();
	};
	obj.hide = function(){
		panel.x(0);
		var tweenHide = new Konva.Tween({
      node: panel,
      duration: tweenDuration,
      x: -1 * (width + 2),
      easing: Konva.Easings.EaseIn,
      onFinish: function() {
        visible = false;
      }
    });
		tweenHide.play();
	};

	onResize(function(width){
		if(!visible){
			panel.x(width + 2);
		}
	});


	


	return obj;
};



/********************************************/