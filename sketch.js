var ghostStanding, ghost;
var tower, towerImg;

var door, doorImg, doorGrp;

var climber, climberImg, climberGrp;

var invisibleSprites, invisibleGrp;

var spookySound;

var PLAY = 0;
var gameState = PLAY;
var END = 1;

function preload() {
  ghostStanding = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav")
  doorGrp = new Group();
  climberGrp = new Group();
  invisibleGrp = new Group();
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop(); 
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 3;

  ghost = createSprite(300, 300);
  ghost.addImage("ghost", ghostStanding);
  ghost.scale = 0.3;


}

function draw() {
  background("black");

  if (gameState === PLAY) {
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 2
    }

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 2;
    }

    if (keyDown("space")) {
      ghost.velocityY = -2;
    }

    ghost.velocityY = ghost.velocityY + 0.3;

    if (tower.y > 595) {
      tower.y = 300;
    }
    if (climberGrp.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    spawnDoors();
    drawSprites();
    if (invisibleGrp.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = END;
    }
  }
  if(gameState === END){
   textSize(50);    
    fill ("red")
    text("💀GameOver!!!💀", 90, 400)
  }
 
}

function spawnDoors() {
  if (frameCount % 300 === 0) {

    door = createSprite(200, 0);
    invisibleSprites = createSprite(200, 70, 100, 5);
    invisibleSprites.velocityY = 3;
    invisibleSprites.visible = false;
    climber = createSprite(200, 50);
    climber.addImage("climber", climberImg);
    climber.velocityY = 3
    door.x = Math.round(random(100, 500));
    climber.x = door.x;
    invisibleSprites.x = door.x;

    door.addImage("door", doorImg);
    console.log(door.y)
    door.velocityY = 3;

    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleSprites.lifetime = 800;

    doorGrp.add(door);
    climberGrp.add(climber);
    invisibleGrp.add(invisibleSprites);
  }
}