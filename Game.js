var currentGameState;
var GameStates = {
    START_MENU: 0,
    RUNNING: 1,
    PAUSED: 2,
    ENDED: 3
};

var GameStateEvents = {
    START_MENU: 'start-menu-event',
    RUNNING: 'running-event',
    PAUSED: 'paused-event',
    ENDED: 'ended-event'
};

function changeState(state)
{
    currentGameState = state;
    switch (currentGameState)
    {
        case GameStates.START_MENU:
            currentGameStateFunction = gameStateMenu;
            break;
        case GameStates.RUNNING:
            currentGameStateFunction = gameStateRunning;
            break;
        case GameStates.PAUSED:
            currentGameStateFunction = gameStatePaused;
            break;
        case GameStates.ENDED:
            currentGameStateFunction = gameStateEnded;
            break;
    }
}

var KeyInputs = {
    ARROW_KEY_up: 87,
    ARROW_KEY_down: 83,
    SPACE_KEY:32,
    RAPID_FIRE_KEY:81
}
function handleKeyDown(e) {
    switch (e.keyCode) {
        case ARROW_KEY_Up: upKey = true;
            break;
        case ARROW_KEY_Down: downKey = true;
            break;
        case RAPID_FIRE_KEY: rapidFire = true;
            break;
    }
}
function handleKeyUp(e) {
    switch (e.keyCode) {
        case KeyInputs.SPACE_KEY:
            pauseGame();
            break;
        case KeyInputs.RAPID_FIRE_KEY: rapidFire = false;
            break;
        case KeyInputs.ARROW_KEY_Up: upKey = false;
            break;
        case KeyInputs.ARROW_KEY_Down: downKey = false;
            break;
    }
}
function setControls() {
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;
}

function gameStateMenu() {
    var greyBack = new createjs.Shape().set({ x: 0, y: 0 });
    greyBack.graphics.beginFill("rgba(50, 50, 50, 0.8)").drawRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

    //Controls
    var controlBox = new createjs.Shape().set({ x: 60, y: 40 });
    controlBox.graphics.setStrokeStyle(8).beginStroke("#610c70").beginFill("purple").drawRect(0, 0, 520, 380);

    var upText = new createjs.Text("W key to move up.", "50px Arial", "#ffffff").set({ x: 110, y: 50 });
    var downText = new createjs.Text("S key to move down.", "50px Arial", "#ffffff").set({ x: 90, y: 125 });
    var rapidText = new createjs.Text("Q key to rapid fire.", "50px Arial", "#ffffff").set({ x: 110, y: 200 });
    var fireText = new createjs.Text("Left Click to fire shots.", "50px Arial", "#ffffff").set({ x: 70, y: 275 });
    var spaceText = new createjs.Text("Space Bar to pause.", "50px Arial", "#ffffff").set({ x: 92, y: 350 });

    var controls = new createjs.Container();
    controls.addChild(controlBox, upText, downText, rapidText, fireText, spaceText);

    //Start button
    var startBox = new createjs.Shape().set({ x: 400, y: 500 });
    startBox.graphics.setStrokeStyle(8).beginStroke("#610c70").beginFill("purple").drawRect(0, 0, 400, 150);
    var startText = new createjs.Text("START", "100px Arial", "#ffffff").set({ x: 432, y: 520 });
    startBox.addEventListener("click", removeStartScreen);
    startText.addEventListener("click", removeStartScreen);

    var startButton = new createjs.Container();
    startButton.addChild(startBox, startText);

    //Start Screen
    startScreen = new createjs.Container();
    startScreen.addChild(greyBack, controls, topScores, startButton);
}
function gameStateRunning()
{

}
function gameStatePaused()
{
    var pauseText = new createjs.Text("PAUSED", "120px Arial", "#ffffff");
    function pauseGame(state) {
        if (GameStates.PAUSED == currentGameState) {
            stage.removeChild(pauseText);
        }
        else if (!gameOver) {
            paused = true;
            pauseText.x = 360; pauseText.y = 250;
            stage.addChild(pauseText);
            stage.update();
        }
    }
} 
function gameStateEnded()
{
    var view = new createjs.Text("RESTART", "40px Arial", "#ffffff");
    view.set({ x: -82, y: -22 });

    con = new createjs.Container();
    con.set({ x: 600, y: 500 });
    var circle = new createjs.Shape();
    circle.graphics.setStrokeStyle(8).beginStroke("#610c70").beginFill("purple").drawCircle(10, 0, 100);
    con.addChild(circle);
    con.addChild(view);
    con.addEventListener("click", restart);
} 
