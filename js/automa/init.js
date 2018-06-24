/* INIT *****************************/

var rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: width,
      height: width,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });






var myPanel = Panel();

myPanel.addNode(rect);

setTimeout(function() {
  myPanel.show();
}, 6000);

setTimeout(function() {
  myPanel.hide();
}, 10000);