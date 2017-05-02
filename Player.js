var player = {
    Player:function(initX, initY)
    {
        var pShip = new createjs.Container();

        var burn = new createjs.Sprite(sheets.makePEngine(), "burn");
        burn.set({ x: -20 });
        pShip.addChild(burn);

        var playerImage = new createjs.Bitmap(preload.getResult("PlayerShip"));
        pShip.addChild(playerImage);
        this.x = initX;
        this.y = initY;
        
        return pShip;
    },   
    x:0, 
    y:0,
    rFire:false,
    dY:15,
    move:function () { this.y += this.dY; },
    switchRapidFire:function() { player.rFire = !player.rFire; }
}
