let rad = 60; // Width of the shape
let xpos, ypos; // Starting position of shape
let spouts = []; 

let xspeed = 2.8; // Speed of the shape
let yspeed = 2.2; // Speed of the shape

let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom

function setup() {
  let container = document.getElementById("squareContainer");
  canvas = createCanvas(container.width, container.height);
  canvas.position(container.x,container.y);
  canvas.style('z-index','-1');

  frameRate(30);
  // Set the starting position of the shape
  xpos = width / 2;
  ypos = height / 2;
  
  addSpouts();
}

function draw() {
  background(102);

  
  
  for(let i =  0; i < spouts.length; i++){
    spouts[i].show();
    spouts[i].move();
    if(spouts[i].currentamplitude < spouts[i].maxamplitude){
       spouts[i].xspeed *= -1;
    }
    if(spouts[i].x>width || spouts[i].x < 0){
       spouts[i].xspeed *= -1;
    }
    if(spouts[i].y>height || spouts[i].y < 0){
       spouts[i].yspeed *= -1;
    }
  }
}

function addSpouts() {
  console.log('pushed');
  spouts.push(new spout(xpos, ypos));
}


class spout{

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = random(20,35); // Radius of diamond
    this.xspeed = 1.2;
    this.yspeed = 2;
    this.maxamplitude = random(4,6); // Amplitude of sine wave
    this.currentamplitude = this.maxamplitude;
    this.t = random(0.05,0.3); // Period of wave
    this.tailLength = random(36,52); // Length of the trail
    this.history  = []; // Array that stores history of leading trail
    this.addMove = random(-1,1);
    
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
    this.x += this.xspeed;
    this.y += this.yspeed;

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
      if(i%4 == 0){
        var pos = this.history[i];
        var tempR = this.r*(Math.pow(0.95,this.history.length-1-i));
        beginShape();
        vertex(pos.x+tempR,pos.y);
        vertex(pos.x, pos.y+tempR);
        vertex(pos.x-tempR,pos.y);
        vertex(pos.x,pos.y-tempR);
        vertex(pos.x+tempR,pos.y);
        endShape();
      }
      
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

