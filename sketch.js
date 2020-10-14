var Play = 1,End = 0;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var gamestate = 1;
var survivalTime = 0;

function preload() {

  //to load images
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);
  // to create objects
  monkey = createSprite(50, 300, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200, 330, 600, 5);
  //to create groups
  FoodGroup = new Group();
  obstacleGroup = new Group();


}


function draw() {
  background(255);

  if (gamestate === Play) {
  //to spawn food and obstacles
    BANANA();
    ROCKS();
  //to make the ground move giving the effect that monkey is moving
    ground.velocityX = -5;
  //to create "infinite" ground
    if (ground.x < 200) {
       ground.x = ground.width / 2
    }
  //to stop monkey from falling
    monkey.collide(ground);

  //to make the monkey jump
    if (keyWentDown("space") && monkey.y > 290) {
       monkey.velocityY = -20;
    }

    if (monkey.isTouching(obstacleGroup)) {
       gamestate = End;
    }


    if (monkey.isTouching(FoodGroup)) {
       score = score + 1;
       FoodGroup.destroyEach();
   }
  //to let you know for how much time have you survived
    survivalTime = Math.ceil(frameCount / frameRate());

  }
  //to assign gravity
    monkey.velocityY = monkey.velocityY + 1;
  //to show text messages
    text("Survival=" + survivalTime, 150, 50);
    text("score=" + score, 50, 50);
  
    if (gamestate === End) {
       monkey.velocityY = 0;
       ground.velocityX = 0;
       FoodGroup.destroyEach();
       obstacleGroup.destroyEach();
       textSize(36);
       text("GAME OVER!", 100, 200);
  }

    drawSprites();

}

function BANANA(){
  //to create food
  if (frameCount % 80 === 0) {
      var rand = Math.round(random(120, 200));
      banana = createSprite(405, rand, 10, 10);
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.setCollider("circle", 0, 0, 40);
      banana.debug = true;
      banana.lifetime = 90;
      banana.velocityX = -5;
      FoodGroup.add(banana);
    }

}

function ROCKS(){
  //to create obstacles
  if (frameCount % 300 === 0) {
      obstacles = createSprite(405, 315, 10, 10);
      obstacles.addImage(obstacleImage);
      obstacles.scale = 0.1;
      obstacles.setCollider("circle", 0, 0, 100);
      obstacles.debug = true;
      obstacles.velocityX = -5;
      obstacles.lifetime = 90
      obstacleGroup.add(obstacles);
    }
}