var player = {
    Player:function(initX, initY, dy)
    {
        var pShip = new createjs.Container();

        var burn = new createjs.Sprite(sheets.makePEngine(), "burn");
        burn.set({ x: -20 });
        pShip.addChild(burn);

        var playerImage = new createjs.Bitmap(preload.getResult("PlayerShip"));
        pShip.addChild(playerImage);
        
        this.x = initX;
        this.y = initY;
        this.dY = dy;
        return pShip;
    },    
    rFire:false,
    move:function () { this.y += this.dY; },
    switchRapidFire:function() { this.rFire = !this.rFire; }
}
