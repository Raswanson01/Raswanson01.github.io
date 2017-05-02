 var Bullet = {
    newBullet:function(spd)
    {
        if (Game.RUNNING == currentGameState) {
            image = preload.getResult("ShotBlue");
            var bullet = new createjs.Bitmap(image);
            bullet.x = player.x + 100; bullet.y = player.y + 35;
            stage.addChild(bullet);
            bullets.push(bullet);
            if (laser != null) {
                laser.stop();
            }
            var laser = createjs.Sound.play('Laser', createjs.Sound.INTERRUPT_NONE, 0, 0, 0, .5, 0);
         this.speed = spd;
     }
},
    setSpeed:function(num) { this.speed = num; }
};
