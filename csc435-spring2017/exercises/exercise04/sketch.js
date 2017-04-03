var particles = [];
// P5 calls this function once when the page is refreshed
function setup() {
  resizeCanvas(600, 400);
  // Create 200 particles and store them in a list
  for (var i = 0; i < 0; i++) {
    var p = new Particle(random(0, width), random(0, height));
    particles.push(p);
  }
}

// P5 calls this function at 'frameRate' frames per second
function draw() {
  background(0);
  for (var i = 0; i < particles.length; i++) {
      particles[i].drawTheParticle();
    }
  if(mouseIsPressed){
    var p = new Particle(mouseX, mouseY);
      particles.push(p);
  }
}
function mousePressed() {
    var p = new Particle(mouseX, mouseY);
      particles.push(p);
}
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Class definition for a Particle that can update its position based on a
// random velocity, and draw itself with a random color.
function Particle(x, y) {
  this.x = random(x-500, x+500);
  this.y = y-800;

  this.velX = (x-this.x)/75;
  this.velY = 0;

  this.gravity = .3;

  // The function updates the position, and draws the ellipse using p5
  this.drawTheParticle = function() {
    //Apply gravity (which is the rate of change of the Y velocity)
    this.velY += this.gravity;

    // Apply velocity to the position
    this.x += this.velX;
    this.y += this.velY;


    // Set the inside color of the circle
    fill(255, 255, 0);
    // Set the border color of the circle
    stroke(0, 40, 63);
    // Set the width of the border
    strokeWeight(5);
    // Finally, draw the circle on the canvas
    star(this.x, this.y, 15, 30, 5) 
  }
}
