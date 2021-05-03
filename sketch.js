var tower,towerImg
var door,doorImg,doorGroup
var climber,climberImg,climberGroup
var ghost,ghostImg
var invBlock,invBlockGroup
var gameState="PLAY"

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  
  spooky=loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  
  spooky.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  
  doorGroup= new Group();  
  climberGroup= new Group();
  invBlockGroup= new Group();
}

function draw(){
  background(0);
  
  if(gameState==="PLAY"){  
    if(keyDown("space")){
      ghost.velocityY=-10;
    }

    ghost.velocityY=ghost.velocityY+0.8;

    if(keyDown("left_arrow")){
      ghost.x=ghost.x-2;
    }

    if(keyDown("right_arrow")){
      ghost.x=ghost.x+2;
    }


    if(tower.y>400){
      tower.y=300;
    }

    if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
    spawnDoor();
    
    if(invBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="END";
    }



  drawSprites();
  } 
  if(gameState==="END"){
    text("GAME OVER",230,250);
    stroke("yellow");
    fill("yellow");
    textSize(30);
  }
}

function spawnDoor(){
  if(frameCount%300===0){
    door=createSprite(200,-50);
    door.x= Math.round(random(120,400));
    door.addImage("door",doorImg);
    door.velocityY=1;
    door.lifetime=800;
    doorGroup.add(door);
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    
    climber=createSprite(200,10);
    climber.x=door.x;
    climber.addImage("climber",climberImg);
    climber.velocityY=1;
    climber.lifetime=800;
    climberGroup.add (climber);
    
    invBlock=createSprite(200,15,climber.width,2);
    invBlock.x=door.x;
    invBlock.velocityY=1;
    invBlock.lifetime=800;    
    invBlockGroup.add(invBlock);  
    invBlock.visible=false;
  }
}

