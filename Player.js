var player = {
    Player:function(initX, initY)
    {
        var pShip = new createjs.Container();

        var burn = new createjs.Sprite(sheets.makePEngine(), "burn");
        burn.set({ x: -20 });
        pShip.addChild(burn);

        var playerImage = new createjs.Bitmap(preload.getResult("PlayerShip"));
        pShip.addChild(playerImage);
        
        return pShip;
    },   
    x:75, 
    y:300,
    rFire:false,
    dY:15,
    move:function () { this.y += this.dY; },
    switchRapidFire:function() { this.rFire = !this.rFire; }
}
