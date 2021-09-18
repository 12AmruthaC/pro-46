var canvas, backgroundImage;
var PLAY=1;
var END=0;
var gameState = 0;
var start;
var girlImg, corona;

var bg1_img, bg2_img, bg3_img, bg4_img;

var bg1, bg2, bg3, bg4, displaybg;

var player, zombieImg, zombie;

var zombieG, maskImg1, maskImg2, maskG;

var virusImg1, virusImg2, hlImg;

var scoreG = 0
var scoreM = 0
var scoreS = 0

var syringe;

function preload(){
  displaybg=loadImage("images/gamebg.jpg");
  begin_img=loadImage("images/startbutton.png");
  bg1_img = loadImage("images/gameimg1.jpg");
  /*bg2_img = loadImage("images/gameimg2.jpg");
  bg3_img = loadImage("images/gameimg3.jpg");
  bg4_img = loadImage("images/gameimg4.jpg");*/
  girlImg=loadAnimation("images/girl1.png", "images/girl2.png","images/girl3.png","images/girl5.png", "images/girl6.png", "images/girl7.png","images/girl8.png")
  zombieImg = loadImage("images/zombie1.png");
  maskImg1=loadImage("images/mask1.png");
  maskImg2=loadImage("images/mask2.png");
  virusImg1=loadImage("images/v1.png");
  virusImg2=loadImage("images/v2.png");
  syringe=loadImage("images/inj.png");
  hlImg=loadImage("images/s1.png");
}


function setup(){
  createCanvas(displayWidth - 20, displayHeight-120);

  bg0=createSprite(width/2, height/2, displayWidth-20, displayHeight-120)
  bg0.addImage(displaybg)
  bg0.scale=1;

  bg1=createSprite(width/2, height/2, displayWidth, displayHeight)
  bg1.addImage(bg1_img)
  bg1.scale=0.8;
  bg1.visible=false;

  /*bg2=createSprite(width/2, height/2, displayWidth, displayHeight)
  bg2.addImage(bg2_img)
 
  bg3=createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight)
  bg3.addImage(bg3_img)

  bg4=createSprite(width/2, height/2, displayWidth, displayHeight)
  bg4.addImage(bg4_img)*/

  player=createSprite(350, displayHeight-250)
  player.addAnimation("girlmg", girlImg);
  player.scale= 2.3;
  player.visible=false;

  //create start button
  start=createSprite(650, 530);
  start.addImage(begin_img);
  start.scale=0.1;

  injection=createSprite( round(random(200,600)) , round(random(120,350)))
  injection.addImage(syringe)
  injection.visible=false;
  injection.scale=0.5;

  zombieG=createGroup();
  maskG=createGroup();
  sanitiserG=createGroup();
  injectionG=createGroup();
  germG=createGroup();


}  

function draw(){

  player.x = mouseX
  player.y = mouseY


  drawSprites()


  if(mousePressedOver(start)){
    gameState=1;
    //backgroungImage.changeImage(bg1);
  }
  if(gameState==1){
    bg0.destroy()
    bg1.visible=true;
    start.visible=false;
    player.visible=true;
    spawnZombie();

    var rand = round(random(1,3))

    if(rand==1){
      spawnMask1();
    }
    else if(rand==2){
      sanitiser();
    }
    else{
      enemy();
    } 

    if(player.isTouching(germG)){
      germG.destroyEach();
      scoreG++;
    }
    
    if(player.isTouching(maskG)){
      maskG.destroyEach();
      scoreM++;
    }
    
    if(player.isTouching(sanitiserG)){
      sanitiserG.destroyEach();
      scoreS++;
    }

    if(scoreG == 5   ){
      textSize(45)
      text("Hello" , 200,200)
      injection.visible=true;
    }
    
  
    if(scoreM == 5 ){
      textSize(45)
      text("Hello" , 400,400)
      injection.visible=true;
    }

    
    if(scoreS == 5  ){
      textSize(45)
      text("Hello" , 600,200)
      injection.visible=true;
    }
    
    
  }

   
}

function spawnZombie(){
  
  if(frameCount%120===0){
    zombie= createSprite(displayWidth+50, displayHeight-250);
    zombie.addImage(zombieImg);
    zombie.scale=0.8;
    zombie.velocityX=-2;
    zombie.lifetime=width/2+100;
    zombieG.add(zombie)
    }
  }

  function spawnMask1(){

    if(frameCount%80===0){

      Mask=createSprite(round(random(100 , displayWidth-150)) , -50)
      Mask.addImage(maskImg1)
      Mask.scale=0.2;
      Mask.velocityY=3;
      maskG.add(Mask);
    }
  }

  function sanitiser(){

    if(frameCount%120===0){

      cleanser=createSprite(round(random(100 , displayWidth-150)) , -50)
      cleanser.addImage(hlImg)
      cleanser.velocityY = 4
      cleanser.scale=0.2;
      sanitiserG.add(cleanser)
    }
  }

  /*
  function medicine(){
    if(frameCount%30===0){
      
     
      injection.velocityY = 4
      injectionG.add(injection);
    }
  } */

  function enemy(){

    if(frameCount%20===0){

      germ=createSprite(round(random(100 , displayWidth-150)) , -50)
      germ.addImage(virusImg1)
      germ.scale=0.5;
      germ.velocityY = 4
      germG.add(germ)
  }
}