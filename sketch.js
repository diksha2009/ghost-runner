var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockgroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.play()
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  ghost = createSprite(250, 200);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlocksgroup = createGroup();
}
function draw() {
  background(200);

  if (gameState === "play") {
    
    createObstacles();
    if (tower.y > 400) {
      tower.y = 300;
    }
    if (keyDown("space")) {
      ghost.velocityY = -9;
    }
    ghost.velocityY = ghost.velocityY + 0.5;
    if (keyDown("LEFT_ARROW")) {
      ghost.x -= 3;
    }
    if (keyDown("RIGHT_ARROW")) {
      ghost.x += 3;
    }
    // ghost.collide(climbersGroup)
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlocksgroup.isTouching(ghost)||ghost.y>600){
      gameState="end"
      spookySound.stop()
    }
    drawSprites();
  }

  if (gameState === "end") {
    textSize(35)
    fill ("yellow")
text ("Game Over",width/2-100,height/2)
  }
}
function createObstacles() {
  if (frameCount % 40 === 0) {
    door = createSprite(200, 60);
    door.addImage("door", doorImg);
    door.velocityY = 7;
    door.x = Math.round(random(120, 200));

    climber = createSprite(door.x, door.y + 50);
    climber.addImage("climber", climberImg);
    climber.velocityY = 7;

    invisibleBlock = createSprite(door.x, door.y + 50, climber.width, 2);
    invisibleBlock.debug = true;
    invisibleBlock.velocityY = 7;

    // distance/velocity
    door.lifetime = 80;
    climber.lifetime = 80;
    invisibleBlock.lifetime = 80;
    // adding sprite to a group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlocksgroup.add(invisibleBlock);
    ghost.depth=door.depth
    ghost.depth+=1
    console.log(door.depth)
    console.log(ghost.depth)
  }
}
