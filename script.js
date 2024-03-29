
//get canvas
var canvas=document.querySelector('canvas');

//set canvas size
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//context variable
var c = canvas.getContext('2d');

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

var Key = {
  _pressed: {},
  UP: 38,
  DOWN: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

/*
// Handle keyboard controls
var keysDown = {};

// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);
*/

//initial variables
var p1_x=30;
var p1_y=30;
var p2_x=innerWidth-60;
var p2_y=30;
var ball_x=innerWidth/2;
var ball_y=innerHeight/2;
//macros
const paddle_width=innerWidth/64;
const paddle_height=innerHeight/3.6;
const paddle_speed=3


//make Paddle object
function Paddle(x,y){
	this.x=x;
	this.y=y;
}
//draw function
Paddle.prototype.draw = function(){
	c.fillRect(this.x,this.y,paddle_width,paddle_height);
}
//move up
Paddle.prototype.moveUp = function(){
	if (this.y>0){
		self.y-=paddle_speed;
	}
}
//move down
Paddle.prototype.moveDown = function(){
	if (this.y<innerHeight-paddle_height){
		self.y-=paddle_speed;
	}
}

//make objects
var Player1= new Paddle(p1_x,p1_y);
var Player2= new Paddle(p2_x,p2_y);

Player2.prototype.update = function() {
  if (Key.isDown(Key.UP)) this.moveUp();
  if (Key.isDown(Key.DOWN)) this.moveDown();
};


//animate
function animate(){
	//clear screen
	c.clearRect(0,0,innerWidth,innerHeight);

	//draw and update
	Player1.draw();
	Player2.draw();
	Player2.update();
	requestAnimationFrame(animate);
}

animate();