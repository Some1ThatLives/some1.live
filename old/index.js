const zenbttn = document.getElementById('Zenith');
const somebttn = document.getElementById('Some1');
somebttn.style.height = innerHeight / 11.69 +"px";
zenbttn.style.top = (innerHeight / 11.69) * 1.3  +"px";
zenbttn.style.height = innerHeight / 11.69 +"px";

somebttn.info = somebttn.getBoundingClientRect();
zenbttn.info = zenbttn.getBoundingClientRect();
let particles = [];

let mouse = {
  x: undefined,
  y: undefined,
  width: 0.001,
  height: 0.001
}

let particlesAreOn = false;
addEventListener("click", () => {
  particlesAreOn = !particlesAreOn;

  particles = [];
})

addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  if (particlesAreOn) {

    if(mouse.x < somebttn.info.x + somebttn.info.width&&
      mouse.x + mouse.width > somebttn.info.x&&
      mouse.y < somebttn.info.y + somebttn.info.height&&
      mouse.y + mouse.height > somebttn.info.y) {

      } else if(
        mouse.x < zenbttn.info.x + zenbttn.info.width&&
        mouse.x + mouse.width > zenbttn.info.x&&
        mouse.y < zenbttn.info.y + zenbttn.info.height&&
        mouse.y + mouse.height > zenbttn.info.y
      ) {

      } else {

        init();
      }
  }

});


//Canvas Code

const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
   init();
})


class Particle {
  constructor(x, y, width, height, colour) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.velocity = {
      x: (Math.random() - 0.5) * 14,
      y: (Math.random() - 0.5) * 14
    }
    this.lifespan = 5;
  }
  draw() {
    c.fillStyle = this.colour;
    c.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    //Button collision detection.
    if(this.x < somebttn.info.x + somebttn.info.width&&
    this.x + this.width > somebttn.info.x&&
    this.y < somebttn.info.y + somebttn.info.height&&
    this.y + this.height > somebttn.info.y) {

      if(this.y < somebttn.info.y + somebttn.info.height&&
        this.y + this.height > somebttn.info.y) {
        this.velocity.y = -this.velocity.y
      }

      if (this.x < somebttn.info.x + somebttn.info.width&&
      this.x + this.width > somebttn.info.x) {
        this.velocity.x = -this.velocity.x;
      }
    } else

    //Zenith Bttn
    if(this.x < zenbttn.info.x + zenbttn.info.width&&
    this.x + this.width > zenbttn.info.x&&
    this.y < zenbttn.info.y + zenbttn.info.height&&
    this.y + this.height > somebttn.info.y) {

      if(this.y < zenbttn.info.y + zenbttn.info.height&&
        this.y + this.height > zenbttn.info.y) {
        this.velocity.y = -this.velocity.y
      }

      if (this.x < zenbttn.info.x + zenbttn.info.width&&
      this.x + this.width > zenbttn.info.x) {
        this.velocity.x = -this.velocity.x;
      }

  }

    // if(this.x < zenbttn.info.x + zenbttn.info.width&&
    // this.x + this.width > zenbttn.info.x&&
    // this.y < zenbttn.info.y + zenbttn.info.height&&
    // this.y + this.height > zenbttn.info.y) {
    //   this.velocity.x = -this.velocity.x*1.1;
    //   this.velocity.y = -this.velocity.y*1.1;
    // }
  }
}


function init() {
  for (var i = 0; i < 50; i++) {
    let x = mouse.x;
    let y = mouse.y;
    let width = 5;
    let height = 5;
    let colour = `hsla(${Math.floor(Math.random()*60)}, 100%, 50%, 0.75)`;
    particles.push(new Particle(x, y, width, height, colour));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach((particle, i) => {
    particle.update();

    if(
      particle.x >= innerWidth
    ||particle.x < 0
    ||particle.y >= innerHeight
    ||particle.y < 0
  ) {
      particles.splice(i, 1);
    }
  });

}

init();
animate();

setInterval(() => {

  particles.forEach((particle, i) => {
    particle.lifespan -= 1;
    if (particle.lifespan <= 0) {
      particles.splice(i, 1);
    }
  })
}, 1000);
