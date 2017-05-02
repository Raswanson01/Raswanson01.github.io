var Player = {
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
    
    movePlayer:function()
    {
        if (upKey)
        {
            if (this.y + this.dY <= 0) 
                player.y = 0;
            else 
                this.y = this.y - this.dY;
        }
        else if (downKey)
        {
            if (this.y - this.dY >= 600) 
                this.y = 600;
            else 
                this.y = this.y + this.dY;       
        }
    },
    
    createBullet:function()
    {
        image = preload.getResult("ShotBlue");
        var bullet = new createjs.Bitmap(image);
        bullet.x = this.x + 120; bullet.y = this.y + 37;
        stage.addChild(bullet);
        bullets.push(bullet);
    }
}
