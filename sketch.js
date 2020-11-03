//Declaring Variables
var monkey , monkey_running, banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstaclesGroup, score, ground;
var survivalTime = 0;
var Play = 1;
var End = 0;
var gameState = Play;

function preload(){

//Loading Animations & Images
monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
monkey_collided = loadAnimation("sprite_1.png")
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");

}

function setup() {
createCanvas(600,600);

//Creating Sprites for Monkey & Ground
monkey = createSprite(80,350,20,20);
monkey.addAnimation("moving", monkey_running);
monkey.addAnimation("collided", monkey_collided);
monkey.scale = 0.15;
  
ground = createSprite(400,400,900,10);
ground.velocityX = -6;
ground.x = ground.width/2;

//Creating Groups
foodGroup = createGroup()
obstaclesGroup = createGroup();
  
}

function draw() {
  
background("white");

if(gameState === Play){
  //Making the Ground Move
  if (ground.x < 200){
      ground.x = ground.width/2;
  }
  
  monkey.collide(ground);
  if(keyDown("space")) {
     monkey.velocityY = -20;
  }
    
  //Adding Gravity
  monkey.velocityY = monkey.velocityY + 0.8
   
  //Displaying Survival Time
  survivalTime = Math.round(frameCount/frameRate());
  
  spawnFood();
  spawnRocks();
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstaclesGroup)){
    gameState = End;
  }
}
  
if(gameState === End){
   foodGroup.setVelocityXEach(0);
   obstaclesGroup.setVelocityXEach(0);
   foodGroup.setLifetimeEach(-1);
   obstaclesGroup.setLifetimeEach(-1);
   monkey.velocityY = 0;
   ground.velocityX = 0;
   monkey.changeAnimation("collided",monkey_collided);
}
  

text("Survival Time: " + survivalTime,100,50);
  
drawSprites();
}

function spawnFood(){
  if(frameCount%120 === 0){
    banana = createSprite(550,300,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 260;
    foodGroup.add(banana);
    console.log(frameCount);
  }
}

function spawnRocks(){
  if(frameCount%350 === 0){
    obstacle = createSprite(550,362,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -7;
    obstacle.lifetime = 260;
    obstaclesGroup.add(obstacle);
  }
}
