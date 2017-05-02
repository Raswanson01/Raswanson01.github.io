function explodeEnemy(enemy) {
    var explosion = new createjs.Sprite(exSheet, "explode");
    explosion.set({ x: enemy.image.x, y: enemy.image.y - 30 });
    stage.addChild(explosion);
    if (blast != null) {
        blast.stop();
    }
    blast = createjs.Sound.play('Blast', createjs.Sound.INTERRUPT_NONE, 0, 0, 0, .5, 0);
    setTimeout(function () { stage.removeChild(explosion); }, 350);
}

function moveEnemy() {
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i].id == "red" && enemies[i].image.x > 75) {
            enemies[i].image.x -= redEnemySpeed;
        } else if (enemies[i].id == "purple" && enemies[i].image.x > 75) {
            enemies[i].image.x -= purpleEnemySpeed;
        } else {
            destroy(enemies[i], i, false);
            updateLives();
        }
    }
}

function destroy(enemy, index, killed) {
    //Death explosion at enemy location
    enemy.lives -= 1;
    if (enemy.id == "red") {
        enemy.image.getChildAt(3).graphics.clear();
        enemy.image.getChildAt(3).graphics.beginFill("green").drawRect(25, -10, 50 * enemy.lives, 10);
    }
    else {
        enemy.image.getChildAt(3).graphics.clear();
        enemy.image.getChildAt(3).graphics.beginFill("green").drawRect(25, -10, 33 * enemy.lives, 10);
    }

    if (enemy.lives > 0 && killed) {
        return;
    }
    else {
        stage.removeChild(enemy.image);
        explodeEnemy(enemy);
        enemies.splice(index, 1);
        if (enemy.id == "red" && killed)
            score += 100;
        if (enemy.id == "purple" && killed)
            score += 300;
        enemy = null;
    }
}

function spawnEnemy() {
    var enemy = new createjs.Container();

    var randY = Math.floor((525 * Math.random()));
    enemy.x = 1300;
    enemy.y = randY;

    var rando = Math.floor(5 * Math.random());
    if (rando == 4)
        image = preload.getResult("EnemyPurple");
    else
        image = preload.getResult("EnemyRed");
    enemyBitmap = new createjs.Bitmap(image);

    var eburn = new createjs.Sprite(eEngine, "burn");
    eburn.set({ x: 115, y: -5, scaleX: 1.1, scaleY: 1.1 });

    var outline = new createjs.Shape();
    outline.graphics.setStrokeStyle(1.5).beginStroke("#fff").drawRect(25, -10, 100, 10);

    var healthBar = new createjs.Shape();
    healthBar.graphics.beginFill("green").drawRect(25, -10, 100, 10);

    enemy.addChild(eburn, enemyBitmap, outline, healthBar);

    if (rando == 4) {
        enemies.push({ id: "purple", image: enemy, lives: 3 });
    }
    else {
        enemies.push({ id: "red", image: enemy, lives: 2 });
    }
    stage.addChild(enemy);
}

function spawnRate() {
    if (timer % 300 == 0) {
        redEnemySpeed++;
        purpleEnemySpeed++;
        if (spawnInterval > 30) {
            spawnInterval -= 6;
        }
    }

    if (timer % spawnInterval == 0) {
        spawnEnemy();
    }
}

function checkHit() {
    //TODO hit checks, destruction
    for (var i = 0; i < enemies.length; i++) {
        for (var j = 0; j < bullets.length; j++) {
            if ((bullets[j].x + 35) >= (enemies[i].image.x + 45)) {
                if ((enemies[i].image.x < 1150)
                    && ((bullets[j].y + 7) <= (enemies[i].image.y + 60))
                    && ((bullets[j].y + 14) >= (enemies[i].image.y + 10))) {
                    destroy(enemies[i], i, true);
                    stage.removeChild(bullets[j]);
                    bullets.splice(j, 1);
                    return;
                }
            }
        }
    }
}

function clearEnemies() {
    var j = enemies.length;
    for (var i = 0; i < j; i++) {
        enemies[0].lives = 0;
        destroy(enemies[0], 0, false);
    }
}