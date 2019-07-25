var level01 = function(window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1,
            speed: -3,
            gameItems: [
                { type: 'sawblade', x: 400, y: groundY - 35 },
                { type: 'sawblade', x: 600, y: groundY - 45 },
                { type: 'sawblade', x: 900, y: groundY - 50 },
                { type: 'sawblade', x: 200, y: groundY - 20 },
                { type: 'sawblade', x: 1500, y: groundY - 30 },
                { type: 'sawblade', x: 1100, y: groundY - 10 },
                { type: 'box', x: 450, y: groundY - 145 },
                { type: 'box', x: 650, y: groundY - 130 },
                { type: 'box', x: 950, y: groundY - 100 }
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y) {
            // your code goes here
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;

        };

        function createBox(x, y) {
            var hitZoneSize = 50;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.rect(hitZoneSize * 2, hitZoneSize * 2, 'red', 'Black', 1);
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -50;
            obstacleImage.y = -50;

        };


        function createEnemy() {
            var enemy = game.createGameItem('enemy', 25);
            var greenSquare = draw.circle(50, 50, 'green');
            greenSquare.x = -25;
            greenSquare.y = -25;
            enemy.addChild(greenSquare);
            enemy.x = 800;
            enemy.y = groundY - 50;
            game.addGameItem(enemy);
            // modify enemy object here
            enemy.velocityX = -2;
            enemy.rotationalVelocity = -3
            enemy.onPlayerCollision = game.changeIntegrity(+50);
        }

        for (var i = 0; i < levelData.gameItems.length; i++) {
            // Create a sawblade using the .x and .y property of each game item object
            if (levelData.gameItems[i].type === "sawblade") {
                createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }
            else if (levelData.gameItems[i].type === "box") {
                createBox(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }



        }
        createEnemy(400, groundY - 10);
        createEnemy(800, groundY - 100);
        createEnemy(1200, groundY - 50);
    }

};





// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
};
