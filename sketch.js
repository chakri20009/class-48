let ground;
let lander;
var lander_img;
var bg_img;
var fuel =100;
var lander_crash;
var lander_land;
var thrust,crash,land;
var lander_right_thrust,lander_left_thrust;
var timer;
var lz_img;
var obs,obstacle_img
var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  lander_right_thrust=loadAnimation("right_thruster_1.png","right_thruster_2.png");
  lander_left_thrust=loadAnimation("left_thruster_1.png","left_thruster_2.png");
  thrust=loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  bg_img = loadImage("bg.png");
  lander_crash=loadAnimation("crash1.png","crash2.png","crash3.png");
  lander_land=loadAnimation("landing1.png","landing2.png","landing_3.png");
  lz_img=loadImage("lz.png");
  obstacle_img=loadImage("obstacle.png")
  thrust.playing=true;
  lander_land.looping=false;
  lander_crash.looping=false;
  thrust.looping=false;
  lander_left_thrust.looping=false;
  lander_right_thrust.looping=false;
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer=1500;
  thrust.frameDelay=5;
  lander_land.frameDelay=5;
  lander_crash.frameDelay=5;

  lander_left_thrust.frameDelay=5;
  lander_right_thrust.frameDelay=5;

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle",0,0,200,200)

  ground=createSprite(500,690,1000,20)
  obs=createSprite(320,530,50,100)
  obs.addImage(obstacle_img)
  obs.scale=0.5;
  obs.setCollider("rectangle",0,100,300,300)

  lz=createSprite(880,610,50,30)
  lz.addImage(lz_img)
  lz.scale=0.3
  lz.setCollider("rectangle",0,180,400,100)

 
  lander.addAnimation("thrusting",thrust)
  lander.addAnimation("left",lander_right_thrust)
  lander.addAnimation("right",lander_left_thrust)
  lander.addAnimation("normal",lander_img)
  lander.addAnimation("crashing",lander_crash);
  lander.addAnimation("landing",lander_land);
  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  text("Fuel:"+fuel,800,25);
  text("Horizontal Velocity:"+round(vx),800,50);
  pop();

    if(lander.collide(obs)===true){
      lander.changeAnimation("crashing");
      stop();
    }
var d=dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y)
console.log(d)

if(d<=35 && (vy<2 && vy>-2) && (vx<2 && vx>-2)){
  vx=0;
  vy=0;
  g=0;
  lander.changeAnimation("landing")
}

if(lander.collide(ground)===true){
  lander.changeAnimation("crashing")
  vx=0;
  vy=0;
  g=0;
}
  //fall down
  vy +=g;
  lander.position.y+=vy;
  lander.position.x+=vx;
  drawSprites();
}

function keyPressed(){

  if(keyCode===UP_ARROW && fuel>0){
  upward_thrust();
  lander.changeAnimation("thrusting")
  thrust.nextFrame();
  }

  if(keyCode===RIGHT_ARROW && fuel>0){
    right_thrust();
    lander.changeAnimation("right")
    thrut.nextFrame();
  }
  if(keyCode===LEFT_ARROW && fuel>0){
    left_thrust();
    lander.changeAnimation("left")
    thrust.nextFrame();
  }
}

function upward_thrust(){
vy=-1
fuel-=1
}

function right_thrust(){
  vx=+1
  fuel-=1
}

function left_thrust(){
  vx=-1
  fuel-=1
}

function stop(){
  vx=0;
  vy=0;
  fuel=0;
  g=0;
}
