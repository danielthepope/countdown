function twoInit() {
  var elem = document.getElementById('animationContainer');
  var params = { width: 300, height: 300 };
  var two = new Two(params).appendTo(elem);
  return two;
}

function drawClock(two) {
  var circle = two.makeCircle(0,0,145);
  circle.fill='#EBDDC3';
  
  var lines = new Two.Group();
  var length = 145;
  var theta, x, y, line, ox, oy;
  for (var i = 0; i < 12; i++) {
    theta = (Math.PI * 2) / 12 * i;
    if (i % 3 == 0) {
      ox = 0;
      oy = 0;
      x = Math.sin(theta) * length;
      y = Math.cos(theta) * length;
    } else {
      ox = Math.sin(theta) * length * 0.7;
      oy = Math.cos(theta) * length * 0.7;
      x = Math.sin(theta) * length * 0.9;
      y = Math.cos(theta) * length * 0.9;
    }
    
    line = two.makeLine(ox,oy,x,y);
    line.stroke = '#827A61';
    line.linewidth = 3;
    line.addTo(lines);
  }
  
  var hand = two.makeGroup();
  var middlebit = two.makeCircle(0,0,15);
  var pointyfill = two.makePolygon(-10,-5,0,-128,10,-5,true);
  var pointyline = two.makePolygon(-14,-10,0,-132,14,-10,true);
  
  middlebit.fill = '#204484';
  middlebit.stroke = '#8B8272';
  middlebit.linewidth = 5;
  pointyline.noStroke();
  pointyline.fill = '#8B8272';
  pointyline.linewidth = 5;
  pointyfill.fill = '#204484';
  pointyfill.noStroke();
  middlebit.addTo(hand);
  pointyline.addTo(hand);
  pointyfill.addTo(hand);
  
  var border = two.makeCircle(0,0,145);
  border.linewidth=8;
  border.stroke = '#2F5368';
  border.noFill();
  
  var clock = two.makeGroup(circle, lines, border, hand);
  clock.translation.set(two.width / 2, two.height / 2);
  
  var time = 0;
  var going = false;
  
  two.on('resetClock', function() {
    time = 0;
  });
  
  two.on('startClock', function() {
    going = true;
  });
  
  two.on('stopClock', function() {
    going = false;
  });
  
  two.bind('update', function(frameCount) {
    if (going) time += 1/60;
    
    if (time >= 30) {
      two.trigger('stopClock');
      time = 30;
    }
    var rotation = Math.PI * 2 / 60 * time;
    hand.rotation = rotation;
    
    document.getElementById("timer").innerHTML = time;
  }).play();
}

var two = twoInit();
drawClock(two);
two.update();

document.getElementById('startButton').onclick = function() {
  two.trigger('startClock');
}

document.getElementById('stopButton').onclick = function() {
  two.trigger('stopClock');
}

document.getElementById('resetButton').onclick = function() {
  two.trigger('resetClock');
}
