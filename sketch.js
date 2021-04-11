//Create variables here
var dog,happyDog;
var database, foodstock, foodS;

function preload(){
//load images here
	dogImg = loadImage(images/dog.png);
  happydogImg = loadImage(images/dog1.png);
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,320,25,35);
  dog.addImage(dogImg);

  happyDog = createSprite(250,320,25,35);
  happyDog.addImage(happydogImg);
}

function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  textSize(4);
  fill(black);
  text("Note: Press UP arrow key to feed the dog some milk",250,275);

  drawSprites();
  //add styles here

  readStock();
  writeStock();
}

//Function to read values from database
function readStock(data){
  foodS = data.val();
}

//Function to write values in database
function writeStock(x){
  
  if(x <= 0){
    x = 0;
  }else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}



