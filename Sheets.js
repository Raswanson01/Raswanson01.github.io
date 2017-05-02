var sheets = {  
    
    exSheet:function() {
        var exSheet = new createjs.SpriteSheet({
            framerate: 30,
            images: [preload.getResult("Explosion")],
            frames: { width: 150, height: 150, count: 6 },
            animations: {
                "explode": [0, 5, "explode", 0.5]
            }
        });
        return exSheet;
    },

    makeE_Engine:function() {
        var eEngine = new createjs.SpriteSheet({
            framerate: 30,
            images: [preload.getResult("EnemyEngine")],
            frames: { width: 40, height: 75, count: 3 },
            animations: {
                "burn": [0, 2, "burn", 0.5]
            }
        });
        return eEngine;
    },

    makePEngine:function ()
    {
        var pEngine = new createjs.SpriteSheet({
            framerate: 30,
            images: [preload.getResult("PlayerEngine")],
            frames: { width: 40, height: 75, count: 3 },
            animations: {
                "burn": [0, 2, "burn", 0.5]
            }
        });
        return pEngine;
    }
}
