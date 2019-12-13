var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width = 500;
ctx.canvas.height = 500;

var trueXVals = [];
var trueYVals = [];

var m = 0;
var b = 0;
var learningRate = 100;

function graph(noise, direction, amount) {
  var direction = direction;

  if (direction === "negative") {
    for (var i = 0; i < amount; i++) {
      trueXVals[i] = i + Math.random() * noise;
      trueYVals[i] = i + Math.random() * noise;
    }
  } else if (direction === "positive") {
    for (var i = amount; i >= 0; i--) {
      trueXVals[i] = i + Math.random() * noise;
      trueYVals[amount - i] = i + Math.random() * noise;
    }
  } else if (direction === "straightDown") {
    var x = Math.random() * amount;
    for (var i = amount; i >= 0; i--) {
      trueXVals[i] = x + Math.random() * noise;
      trueYVals[i] = i + Math.random() * noise;
    }
  } else if (direction === "straightRight") {
    var y = Math.random() * amount;
    for (var i = amount; i >= 0; i--) {
      trueXVals[i] = i + Math.random() * noise;
      trueYVals[i] = y + Math.random() * noise;
    }
  } else if (direction === "none") {
    for (var i = amount; i >= 0; i--) {
      trueXVals[i] = Math.random() * amount;
      trueYVals[i] = Math.random() * amount;
    }
  }
}

function plot(xVals, yVals, color, size) {
  //Plots training data
  ctx.fillStyle = color;
  if (size == undefined) {
    for (var i = 0; i < xVals.length; i++) {
      ctx.fillRect(
        (xVals[i] * ctx.canvas.width) / xVals.length,
        (yVals[i] * ctx.canvas.height) / yVals.length,
        ctx.canvas.width / xVals.length,
        ctx.canvas.height / xVals.length
      );
    }

    ctx.fillStyle = "blue";

    for (var i = 0; i < xVals.length; i++) {
      ctx.fillRect(
        (xVals[i] * ctx.canvas.width) / xVals.length,
        (predict(m, xVals[i], b) * ctx.canvas.height) / yVals.length,
        ctx.canvas.width / xVals.length,
        ctx.canvas.height / xVals.length
      );
    }
  } else {
    for (var i = 0; i < xVals.length; i++) {
      ctx.fillRect(
        (xVals[i] * ctx.canvas.width) / xVals.length,
        (yVals[i] * ctx.canvas.height) / yVals.length,
        size,
        size
      );
    }
  }
}

function predict(m, x, b) {
  return m * x + b;
}

function loss(m, b) {
  var sum = 0;
  for (var i = 0; i < trueXVals.length; i++) {
    sum += Math.pow(trueYVals[i] - predict(m, trueXVals[i], b), 2);
  }
  return sum / trueXVals.length;
}

function train() {

  var divide = true;
  
  //Gradient descent algorithm
	if (loss(m, b + learningRate) < loss(m, b)){
    divide = false;
		b += learningRate
	} if(loss(m, b - learningRate) < loss(m, b)){
    divide = false;
		b -= learningRate;
	}

	if (
		loss(m + learningRate, b) < loss(m, b)
	) {      
    divide = false;
		m += learningRate;
	} if (
		loss(m - learningRate,b) < loss(m, b)
	) {
    divide = false;
		m -= learningRate;
  } 
  
  if(divide == true){
    learningRate = learningRate/2;
  }

  var arrayM = [];
  var arrayB = [];
  
 
/** 
  //Stochastic gradient descent
  for (var i = 0; i < 100000; i++) {
    arrayM[i] = Math.floor(Math.random() * (10 + 10)) + -10;
    arrayB[i] = Math.random() * ctx.canvas.height;
  }

  for (var i = 0; i < arrayM.length; i++) {
    if (loss(arrayM[i], arrayB[i]) < loss(m, b)) {
      m = arrayM[i];
      b = arrayB[i];
    }
  }
**/
}
graph(5,"positive", 50);

setInterval(function() {
  ctx.fillStyle = "black";
  train();
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(loss(m, b), ctx.canvas.width - 250, 50);



  plot(trueXVals, trueYVals, "red");
}, 1);


//alert(trueXVals)

setInterval(function() {
  //alert(loss(m, b))
}, 10000);


setInterval(function(){
  //alert(learningRate);
}, 10000)