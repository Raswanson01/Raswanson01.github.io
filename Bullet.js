 var Bullet = {
     moveShot:function()
     {
       for(i = 0; i < bullets.length; i++)
       {
           if (bullets[i].x > 1200)
               stage.removeChild(bullets[i]);
           bullets[i].x += 15;
       }
    },
    createBullet:function()
    {
        image = preload.getResult("ShotBlue");
        var bullet = new createjs.Bitmap(image);
        bullet.x = player.x + 120; bullet.y = player.y + 37;
        stage.addChild(bullet);
        bullets.push(bullet);
    }
};
