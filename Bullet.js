 var Bullet = {
     moveShot:function()
     {
        for(i = 0; i < bullets.length; i++)
        {
            if (bullets[i].x > 1200)
                stage.removeChild(bullets[i]);
            bullets[i].x += 15;
        }
     }
};
