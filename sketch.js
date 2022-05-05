var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obs1, obs2, obs3, obs4;
var gameo, gameoImg, restart, restartImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
obs1 = loadImage("assets/obsBottom1.png");
obs2 = loadImage("assets/obsBottom2.png");
obs3 = loadImage("assets/obsBottom3.png");
bgImg = loadImage("assets/bg.png")
gameoImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

bottomObstaclesGroup = new Group();

gameo = createSprite(220, 200);
restart = createSprite(220,240);
gameo.addImage(gameoImg);
restart.addImage(restartImg);
gameo.visible = false;
restart.visible = false;

}

function draw() {
  
  background("black");
        if(gameState === PLAY){
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
   
           spawnObstacles();

           if(bottomObstaclesGroup.isTouching(balloon)){
             gameState = END;
           }
        }

        if(gameState === END){
          balloon.velocityX = 0;
          balloon.velocityY = 0;
          bottomObstaclesGroup.setVelocityXEach(0);
          balloon.y = 200;
          gameo.visible = true;
          restart.visible = false;
          restart.depth = restart.depth + 1;
          bottomObstaclesGroup.depth = restart.depth;
        }
        drawSprites();
        
}

function spawnObstacles(){
  if(World.frameCount % 60 === 0){
    obs4 = createSprite(400, 350, 40, 50);
    obs4.addImage(obs1);
    obs4.scale = 0.2;
    obs4.velocityX = -4;
    var r = Math.round(random(1,3));
    switch(r){
      case 1: obs4.addImage(obs1);
      break;
      case 2: obs4.addImage(obs2);
      break;
      case 3: obs4.addImage(obs3);
      break;
      default:break
    }
    balloon.depth = balloon.depth + 1;
    obs4.depth = balloon.depth;

    bottomObstaclesGroup.add(obs4);
  }
}