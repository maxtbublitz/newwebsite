// Code by Max Bublitz
// Huge thank you to the coding train for his amazing p5js tutorials


let theta = 0;
let spouts = []; 
let maxDistance = screen.width+100;
let randNumber = 5;

var canvas;

function setup() {
  let scroll = document.getElementById("particleContainer");
  let scrollH = scroll.scrollHeight;
  canvas = createCanvas(windowWidth, scrollH);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  let fr = 30;
  addSpouts();
}

function draw() {
  background(255,255,255);

  for(let i =  0; i < spouts.length; i++){
    spouts[i].show();
    spouts[i].move();
    if(spouts[i].x >=abs(maxDistance)){
      spouts.splice(i,1);
      // console.log('spliced');
    }
  }
}

// Delay resize function so the browswer doesn't flip out
function calcResize(){
  let temp = document.getElementById("particleContainer");
  let tempH = temp.scrollHeight;
  resizeCanvas(windowWidth,tempH+100);
  console.log('resized');
  maxDistance = screen.width+300;
}

var doit;
function windowResized(){
  clearTimeout(doit);
  doit = setTimeout(calcResize, 500);
}



function addSpouts() { // Randomly adds spouts
  var rand = random(1,4);
  for(let k = 0; k < rand; k++){
    if(spouts.length <= 14){ // Limits the amount of spouts on screen so it doesn't overwhelm the browswer
      spouts.push(new spout(-200,random(400,screen.height-400)));
    }
  }
  setTimeout(addSpouts,random(12000,20000)); // Call self after random amount of time
}

// function mouseClicked() { // Add spouts with mouse click
//   spouts.push(new spout(-200,mouseY));
// }

class spout{
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = random(5,30); // Radius of diamond
    this.speed = random(0.5,2);
    this.amplitude = random(2,6); // Amplitude of sine wave
    this.t = random(0.05,0.3); // Period of wave
    this.tailLength = random(50,70); // Length of the trail
    this.history  = []; // Array that stores history of leading trail
    this.addMove = random(-0.5,0.5);
    let colorz = [1,2,3,4]; 
    let colorc = random(colorz);
    if(colorc == 1){
      this.color = [219,70,45];
    }
    else{
      this.color = [0,154,215];
    }
  }

  move () {
    this.x += this.speed;

    this.y += this.amplitude*sin(TWO_PI*(this.x/20)*this.t)+this.addMove; // Sine wave
    
    var v = createVector(this.x, this.y); // Store x and y 
    this.history.push(v);
    
    if(this.history.length > this.tailLength){
      this.history.splice(0,1);
    }
  }

  show () {
    stroke(this.color[0],this.color[1],this.color[2]);
    fill(255,255,255);
    
    for(var i= 0; i < this.history.length; i++){
      var pos = this.history[i];
      var tempR = this.r*(Math.pow(0.95,this.history.length-1-i));
      //var tempR = this.r/i;
      //var tempR = (this.r-(this.r/i));
      //square(pos.x,pos.y,(this.r-(this.r/i)));
      beginShape();
      vertex(pos.x+tempR,pos.y);
      vertex(pos.x, pos.y+tempR);
      vertex(pos.x-tempR,pos.y);
      vertex(pos.x,pos.y-tempR);
      vertex(pos.x+tempR,pos.y);
      endShape();
    }
    beginShape();
    vertex(this.x+this.r,this.y);
    vertex(this.x, this.y+this.r);
    vertex(this.x-this.r,this.y);
    vertex(this.x,this.y-this.r);
    vertex(this.x+this.r,this.y);
    endShape();
    //square(this.x, this.y, this.r); 
  }
}

// window.onload = function() { //reload so 10000000 particles don't enter screen at once
//     window.onfocus = function() {window.location.reload();};
// };