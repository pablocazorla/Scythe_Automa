/* SETUP *******************************************/

var width = 10000,
	height = 10000,		
	stage = new Konva.Stage({
		container: 'scythe-container',
		width:width,
		height:height
	}),
	layer = new Konva.Layer(),
	resizeFunctions = [],
	render = function() {
		stage.draw();
	},
	onResize = function(f) {
		resizeFunctions.push(f);
	},
	onResizeWindowEvenListener = function() {
		width = window.innerWidth;
		height = window.innerHeight;

		stage.width(width);
		stage.height(height);

		resizeFunctions.forEach(function(f) {
			f.apply(null, [width, height]);
		});
		render();
	};

stage.add(layer);
onResizeWindowEvenListener();
window.addEventListener('resize', onResizeWindowEvenListener, false);
/********************************************/