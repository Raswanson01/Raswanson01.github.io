function Player(initX, initY, rFire, dy)
{
    var player = new createjs.Container();

    var burn = new createjs.Sprite(sheets.makePEngine(), "burn");
    burn.set({ x: -20 });
    player.addChild(burn);

    playerImage = new createjs.Bitmap(preload.getResult("PlayerShip"));
    player.addChild(playerImage);

    player.x = initX;
    player.y = initY;
    player.rapidFire = rFire;
    player.dY = dy;
}

var player = Player(75, 300, false, 15);
player.move = function (num) { player.x += num; }
