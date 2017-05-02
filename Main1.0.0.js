//TODO variables
var bullets = []; // The shot that will be fired
var speed;   // The speed of the shot fired
var wasKils = true;

var player;
var tinyPlayer;
var playerX = 75;
var playerY = 300;
var lives = [];

var enemies = [];
var redEnemySpeed = 5;
var purpleEnemySpeed = 3;

var stage; //The stage
var paused;
var preload;
var timer = 0;
var score = 0;
var scoreText = new createjs.Text("Score: ", "60px Arial", "#ffffff");

const ARROW_KEY_Up = 38;
const ARROW_KEY_Down = 40;
var upKey = false;
var downKey = false;
var playerDY = 15;

var stillUpdating = true;

//Scene Functions
function load() {
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ["ogg"];
    preload.addEventListener("complete", init);

    preload.loadManifest([
        { id: "Background", src: "/assets/Background.png" },
        { id: "Overlay", src: "/assets/Overlay.png"},
        {id: "PlayerShip", src: "/assets/PlayerShip.png"},
        {id: "EnemyRed", src: "/assets/EnemyShip1.png"},
        {id: "EnemyPurple", src: "/assets/EnemyShip2.png"},
        {id: "ShotBlue", src: "/assets/ShotBlue.png"},
        { id: "ShotPurple", src: "/assets/ShotPurple.png" },
        { id: "Music", src:"/assets/WindSprite.mp3"}
        ]);
  
    preload.load();
}

function init() {
    //Create stage and ticker
    stage = new createjs.Stage("canvas");
    stage.addEventListener("mousedown", createBullet);
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick);

    //Create background image
    var bg = new createjs.Bitmap(preload.getResult("Background"));
    stage.addChild(bg);

    //Create player
    player = new createjs.Bitmap(preload.getResult("PlayerShip"));
    player.set({ x: playerX, y: playerY });
    stage.addChild(player);

    //Play background music
    createjs.Sound.play('Music', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, .5, 0);
    
    //UI overlay
    var ol = new createjs.Bitmap(preload.getResult("Overlay"));
    ol.y = 600;
    stage.addChild(ol);

    //Setup score counter
    scoreText.set({ x: 780, y: 625 });
    stage.addChild(scoreText);   

    setControls();
    //Setup lives display
    createLives();

}

function tick() {
    timer++;
    moveShot();
    movePlayer();
    checkHit();
    if (timer % 90 == 0) {
        spawnEnemy();
    }
    moveEnemy();
    updateScore();
    stage.update();
}

function updateScore()
{
    if (stillUpdating)
    {
        if (timer % 30 == 0)
            score += 10;

        scoreText.text = "Score: " + score;
    }
}

function setControls() {
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;
}


//Player Functions

function movePlayer() {
    //TODO animate player movement

    if (upKey)
    {
        if (player.y + playerDY <= 0) 
            player.y = 0;
         else 
            player.y = player.y - playerDY;
    }
    else if (downKey)
    {
        if (player.y - playerDY >= 600) 
            player.y = 600;
        else 
            player.y = player.y + playerDY;       
    }
}

function createBullet()
{
    image = preload.getResult("ShotBlue");
    var bullet = new createjs.Bitmap(image);
    bullet.x = player.x + 120; bullet.y = player.y + 37;
    stage.addChild(bullet);
    bullets.push(bullet);
}

function moveShot()
{
    
    for(i = 0; i < bullets.length; i++)
    {
        if (bullets[i] > 1200)
            stage.removeChild(bullets[i]);
        
        bullets[i].x += 15;
    }
}

function handleKeyDown(e) {
    switch (e.keyCode) {
        case ARROW_KEY_Up: upKey = true;
            break;
        case ARROW_KEY_Down: downKey = true;
            break;
    }
}

function handleKeyUp(e) {
    switch (e.keyCode) {
        case ARROW_KEY_Up: upKey = false;
            break;
        case ARROW_KEY_Down: downKey = false;
            break;
    }
}

function createLives() {
    image = preload.getResult("PlayerShip");
    for (i = 0; i < 5; i++)
    {
        tinyPlayer = new createjs.Bitmap(image);
        tinyPlayer.setTransform(0, 0, .35, .35);
        tinyPlayer.x = (70 * i) + 85; tinyPlayer.y = 650;
        stage.addChild(tinyPlayer);
        lives.push(tinyPlayer);
    }
    stage.update();
}

function updateLives()
{
    if (lives.length > 0)
        stage.removeChild(lives.pop());
    else
    {
        stillUpdating = false;
        var text = new createjs.Text("GAME OVER :(", "120px Arial", "#ffffff");
        text.x = 200; text.y = 250;
        stage.addChild(text);
        stage.update();
    }
}

//Enemy Functions

function spawnEnemy() {
    var rando = Math.floor(5 * Math.random());
    if (rando == 4)
        image = preload.getResult("EnemyPurple");
    else
        image = preload.getResult("EnemyRed");
    enemyBitmap = new createjs.Bitmap(image);

    var randY = Math.floor((525 * Math.random()));
    enemyBitmap.x = 1300;
    enemyBitmap.y = randY;

    if (rando == 4) {
        enemies.push({ id: "purple", image: enemyBitmap });
    }
    else {
        enemies.push({ id: "red", image: enemyBitmap });
    }
    stage.addChild(enemyBitmap);
}

function checkHit() {
    //TODO hit checks, destruction
    for (var i = 0; i < enemies.length; i++) {
        for (var j = 0; j < bullets.length; j++) {
            if ((bullets[j].x + 35) >= (enemies[i].x + 14)) {
                if (((bullets[j].y - 7) >= (enemies[i].y - 40)) && ((bullets[j].y - 14) <= (enemies[i].y - 10))) {
                    destroy(enemies[i], i);
                }
            }
        }
    }
}

function destroy(enemy, index, wasKilt){
    //Death explosion at enemy location
    stage.removeChild(enemy.image);
    enemies.splice(index, 1);
    if(enemy.id == "red")
        if (wasKilt)
            score += 100;
    if (enemy.id == "purple")
        if (wasKilt)
            score += 300;
    enemy = null;
}

function moveEnemy() {
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i].id == "red" && enemies[i].image.x > 75) {
            enemies[i].image.x -= redEnemySpeed;
        } else if (enemies[i].image.x <= 75) {
            destroy(enemies[i], i, false);
            updateLives();
        }

        if (enemies[i].id == "purple" && enemies[i].image.x > 75) {
            enemies[i].image.x -= purpleEnemySpeed;
        } else if (enemies[i].image.x <= 75) {
            destroy(enemies[i], i, false);
            updateLives();
        }
    }
}
