var preload;

function load() {
    //Load assets
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ["ogg"];
    preload.addEventListener("complete", init);

    preload.loadManifest([
 	{ id: "Background", src: "assets/Background.png" },
 	{ id: "Overlay", src: "assets/Overlay.png" },
 	{ id: "PlayerShip", src: "assets/PlayerShip.png" },
 	{ id: "EnemyRed", src: "assets/EnemyShip1.png" },
 	{ id: "EnemyPurple", src: "assets/EnemyShip2.png" },
 	{ id: "ShotBlue", src: "assets/ShotBlue.png" },
 	{ id: "ShotPurple", src: "assets/ShotPurple.png" },
 	{ id: "Explosion", src: "assets/Explosion.png" },
 	{ id: "EnemyEngine", src: "assets/EnemyEngine.png" },
 	{ id: "PlayerEngine", src: "assets/PlayerEngine.png" },
 	//{ id: "Music", src: "/assets/WindSprite.mp3" },
 	//{ id: "Blast", src: "/assets/Blast.mp3" },
 	//{ id: "Laser", src: "/assets/Laser.mp3" }
    ]);

    preload.load();
}

function init() {
	stage = new createjs.Stage("canvas");
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", tick);
	
	var playuh = player.Player(75, 300);
	stage.addChild(playuh);
	stage.update();
}

function tick() {}
