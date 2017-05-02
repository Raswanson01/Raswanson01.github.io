//Bullet variables
var bullets = []; // The shot that will be fired

//Player Variables
var player;
var lives = [];

//Enemy Variables
var enemies = [];
//var redEnemySpeed = 5;
//var purpleEnemySpeed = 3;
//var spawnInterval = 90;

//Game variables
var stage;
const STAGE_WIDTH = 1200;
const STAGE_HEIGHT = 700;
var gameOverText = new createjs.Text("GAME OVER", "120px Arial", "#ffffff");
var startDisplayed = false;
var startScreen;
var preload = false;
var timer = 0;
var score = 0;
var scoreText = new createjs.Text("Score: ", "60px Arial", "#ffffff");
var con;
var charge, chargeBar;
var topScores = new createjs.Container();
var firstStart = true;

//Effects
var exSheet; //Explosion sprite
var blast;
var laser;
var eEngine; //Enemy thruster sprite sheet
var scores = [5];

//Scene Functions
function load() {
    //Load assets
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ["ogg"];
    preload.addEventListener("complete", init);

    preload.loadManifest([
 	{ id: "Background", src: "/assets/Background.png" },
 	{ id: "Overlay", src: "/assets/Overlay.png" },
 	{ id: "PlayerShip", src: "/assets/PlayerShip.png" },
 	{ id: "EnemyRed", src: "/assets/EnemyShip1.png" },
 	{ id: "EnemyPurple", src: "/assets/EnemyShip2.png" },
 	{ id: "ShotBlue", src: "/assets/ShotBlue.png" },
 	{ id: "ShotPurple", src: "/assets/ShotPurple.png" },
 	{ id: "Explosion", src: "/assets/Explosion.png" },
 	{ id: "EnemyEngine", src: "/assets/EnemyEngine.png" },
 	{ id: "PlayerEngine", src: "/assets/PlayerEngine.png" },
 	{ id: "Music", src: "/assets/WindSprite.mp3" },
 	{ id: "Blast", src: "/assets/Blast.mp3" },
 	{ id: "Laser", src: "/assets/Laser.mp3" }
    ]);

    preload.load();
}

function init() {
    //Create stage and ticker
    stage = new createjs.Stage("canvas");
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick);

    //Create background image
    var bg = new createjs.Bitmap(preload.getResult("Background"));
    bg.setTransform(0, 0, 1, 1);
    stage.addChild(bg);

    //sprite sheet creation
    makeExSheet();
    makeE_Engine();
    makePEngine();

    // Restart creation
    gameStateEnded();

    //Play background music
    createjs.Sound.play('Music', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, .5, 0);

    //UI overlay
    var ol = new createjs.Bitmap(preload.getResult("Overlay"));
    ol.setTransform(0, 600, 1, 1);
    stage.addChild(ol);

    //Setup score counter
    scoreText.set({ x: 780, y: 625 });
    stage.addChild(scoreText);

    //Setup lives display
    createLives();

    createChargeBar();
    //Create start screen
    createStartScreen();
}

function restart() {

    charge = 150;
    timer = 0;
    redEnemySpeed = 5;
    purpleEnemySpeed = 3;
    spawnInterval = 90;
    score = 0;
    clearEnemies();
    createLives();
    createjs.Ticker.setPaused(false);
    stage.removeChild(con);
    stage.removeChild(gameOverText);
    stage.update();
}

function tick() {
    if (currentGameState == running) {
        timer++;
        spawnRate();
        movePlayer();
        moveEnemy();
        moveShot();
        purpleFire();
        checkHit();
        updateScore();
        updateCharge();
        stage.update();
    } else if (!started) {
        if (!startDisplayed) {
            createScores();
            displayStartScreen();
        }
        stage.update();
    } else if (gameOver) {
        gameOverText.x = 220; gameOverText.y = 250;
        stage.addChild(con);
        stage.addChild(gameOverText);
        stage.update();
    }
}

function updateScore() {
    if (timer % 30 == 0) {
        score += 10;
    }
    scoreText.text = "Score: " + score;
}

function createScores() {
    for (var i = 0; i < topScores.numChildren; i++) {
        topScores.removeChildAt(i);
    }
    var scoreBox = new createjs.Shape().set({ x: 620, y: 40 });
    scoreBox.graphics.setStrokeStyle(8).beginStroke("#610c70").beginFill("purple").drawRect(0, 0, 520, 380);
    var ts = new createjs.Text("Top Scores", "50px Arial", "#ffffff").set({ x: 760, y: 50 });
    topScores.addChild(scoreBox, ts);

    if (!firstStart) {
        var person = prompt("Please enter your name: ");
        person = person.toUpperCase();
        scores.sort(function (a, b) { return b - a });
        for (i = 0; i < 5; i++) {
            var nextScore;
            if (scores[i] == null || scores[i] <= 50)
                nextScore = new createjs.Text("---", "40px Arial", "#ffffff");
            else
                nextScore = new createjs.Text(person + " : " + scores[i], "40px Arial", "#ffffff");

            nextScore.set({ x: 650, y: 120 + 60 * i });
            topScores.addChild(nextScore);
        }
    }
    firstStart = false;
}

function displayStartScreen() {
    stage.addChild(startScreen);
    startDisplayed = true;
    started = false;
}

function removeStartScreen() {
    stage.removeChild(startScreen);
    startDisplayed = false;
    started = true;
}

function createChargeBar() {
    charge = 150;
    var chargeText = new createjs.Text("RAPID FIRE CHARGE", "20px Arial", "#ffffff");
    chargeText.set({ x: 498, y: 675 });

    var outline = new createjs.Shape();
    outline.graphics.setStrokeStyle(3).beginStroke("#fff").drawRect(525, 620, 150, 50);

    chargeBar = new createjs.Shape();
    chargeBar.graphics.beginFill("green").drawRect(525, 620, charge, 50);

    stage.addChild(chargeText, chargeBar, outline);
}

function updateCharge() {
    if (rapidFire && charge >= 0) {
        charge -= 2;
    }
    else {
        if (timer % 30 == 0 && charge <= 150) {
            charge += 2;
        }
    }
    chargeBar.graphics.clear();
    chargeBar.graphics.beginFill("green").drawRect(525, 620, charge, 50);
}



//Player Functions

function createLives() {
    image = preload.getResult("PlayerShip");
    for (i = 0; i < 5; i++) {
        tinyPlayer = new createjs.Bitmap(image);
        tinyPlayer.setTransform(0, 0, .35, .35);
        tinyPlayer.x = (70 * i) + 85; tinyPlayer.y = 650;
        stage.addChild(tinyPlayer);
        lives.push(tinyPlayer);
    }
}

function updateLives() {
    if (lives.length > 1)
        stage.removeChild(lives.pop());
    else {
        stage.removeChild(lives.pop());
        gameOver = true;
        scores.push(score);

    }
}

function moveShot() {
    for (i = 0; i < bullets.length; i++) {
        bullets[i].x += bulletSpeed;
        if (bullets[i].x > 1200) {
            stage.removeChild(bullets[i]);
            bullets.splice(i, 1);
        }
    }
}

function movePlayer() {
    if (upKey) {
        if (player.y + playerDY <= 0) {
            player.y = 0;
        } else {
            player.y = player.y - playerDY;
        }

    } else if (downKey) {

        if (player.y - playerDY >= 525) {
            player.y = 525;
        } else {
            player.y = player.y + playerDY;
        }
    }
}

function purpleFire() {

    if (rapidFire && charge > 0) {
        image = preload.getResult("ShotPurple");
        var bullet2 = new createjs.Bitmap(image);
        bullet2.x = player.x + 120; bullet2.y = player.y + 35;
        stage.addChild(bullet2);
        bullets.push(bullet2);
        if (laser != null) {
            laser.stop();
        }
        laser = createjs.Sound.play('Laser', createjs.Sound.INTERRUPT_NONE, 0, 0, 0, .5, 0);
    }

}

