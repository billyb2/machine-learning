var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = 500;
ctx.canvas.height = 500;

var trueXVals = [];
var trueYVals = [];


var m = Math.random() * (10 + 10) -10;
var b = Math.random() * (ctx.canvas.height * 2);
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
      ctx.fillStyle = color
      ctx.fillRect(
        (xVals[i] * ctx.canvas.width) / xVals.length,
        (yVals[i] * ctx.canvas.height) / yVals.length,
        ctx.canvas.width / xVals.length,
        ctx.canvas.height / xVals.length
      );

      ctx.fillStyle = "blue";
      ctx.fillRect(
        (xVals[i] * ctx.canvas.width) / xVals.length,
        (predict(m, xVals[i], b) * ctx.canvas.height) / yVals.length,
        ctx.canvas.width / xVals.length,
        ctx.canvas.height / xVals.length
      );
    }

    

  } else {
    for (var i = 0; i < xVals.length; i++) {
      ctx.fillStyle = color
      ctx.fillRect(
        (xVals[i] * ctx.canvas.width) / xVals.length,
        (yVals[i] * ctx.canvas.height) / yVals.length,
        size,
        size
      );

      ctx.fillStyle = "blue"
      ctx.fillRect(
        (xVals[i] * ctx.canvas.width) / xVals.length,
        (predict(m, xVals[i], b) * ctx.canvas.height) / yVals.length,
        ctx.canvas.width / xVals.length,
        ctx.canvas.height / xVals.length
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

function train(method) { 
  if(method == "batch"){
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
    //Divide the learning rate by two if the algorithm isn't learning anymore
    learningRate = learningRate/2;
  }
  
} else if(method == "stochastic"){

  var arrayM = [];
  var arrayB = [];


  //Stochastic gradient descent
    var guessM = Math.random() * (10 + 10) -10;
    var guessB = Math.random() * (ctx.canvas.height * 2);


    if (loss(guessM, guessB) < loss(m, b)) {
      m = guessM;
      b = guessB;
  }

}

}
graph(50,"positive", 500);

setInterval(function() {
  ctx.fillStyle = "black";
  //Training method, whether stochastic or batch. Adding mini-batch should be easy but I don't want to right now
  train("batch");
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
