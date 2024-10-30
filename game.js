document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const gameArea = document.getElementById("gameArea");
    let playerX = gameArea.offsetWidth / 2 - player.offsetWidth / 2;
    let playerY = 20;
    let speed = 25;
    let objectSize = 100;
    
    // Move player left and right with arrow keys
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" && playerX > 0) {
            playerX -= speed;
        } else if (e.key === "ArrowRight" && playerX < gameArea.offsetWidth - player.offsetWidth) {
            playerX += speed;
        }
        player.style.left = `${playerX}px`;
    });

    // Move player up/down with arrow keys
    document.addEventListener("keydown", (e) =>{
        if (e.key === "ArrowUp" && playerY > 0) {
            playerY -= speed
        } else if (e.key === "ArrowDown" && playerY < gameArea.offsetHeight - player.offsetHeight) {
            playerY += speed;
        }
        player.style.top = `${playerY}px`;
    });

    document.getElementById('upBtn').addEventListener('touchstart', () => {
        if (playerY > 0) playerY -= speed;
        player.style.top = `${playerY}px`
    });

    document.getElementById('downBtn').addEventListener('touchstart', () => {
        if (playerY < gameArea.offsetHeight - playerY) playerY += speed;
        player.style.top = `${playerY}px`
    })

    document.getElementById('leftBtn').addEventListener('touchstart', () => {
        if (playerX > 0) playerX -= speed;
        player.style.left = `${playerX}px`
    })

    document.getElementById('rightBtn').addEventListener('touchstart', () => {
        if (playerX < gameArea.offsetWidth - player.offsetWidth) playerX += speed;
        player.style.left = `${playerX}px`
    })

    // Checks if the user is on mobile
    function isMobile() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
        
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });    
    }

    // Game timer
    function timer(){
        var sec = 30;
        var timer = setInterval(function(){
            document.getElementById('time').innerHTML='00:' + (sec < 10 ? '0' + sec : sec);
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                if(!alert("Yay! You finished the game!")) {window.location.href = "present.html";}
            }
        }, 1000);
    }
    

    // Generate obstacles starting at the bottom
    function createObstacle() {
        const obstacle = document.createElement("img");
        obstacle.src = "pngtree-monochrome-rock-clip-art-png-image_2689540-removebg-preview.png";
        obstacle.classList.add("obstacle");
        obstacle.style.width = `${objectSize}px`;
        obstacle.style.height = `${objectSize}px`;
        obstacle.style.position = "absolute";
        obstacle.style.bottom = "0";  // Start at the bottom
        obstacle.style.left = `${Math.random() * (gameArea.offsetWidth - objectSize)}px`;
        gameArea.appendChild(obstacle);
        moveObstacle(obstacle);
    }

    function moveObstacle(obstacle) {
        let obstacleY = 0;
        const interval = setInterval(() => {
            if (obstacleY > gameArea.offsetHeight) {
                clearInterval(interval);
                gameArea.removeChild(obstacle);
            } else {
                obstacleY += 10;
                obstacle.style.bottom = `${obstacleY}px`;

                // Collision detection (adjusted for upward movement)
                if (
                    // Checks for player hitting obstacle vertically
                    (playerY < (gameArea.offsetHeight - obstacleY) + objectSize && playerY + player.offsetHeight > (gameArea.offsetHeight - obstacleY)) &&
                    // Checks for player hitting obstacle horizontally
                    (playerX < parseInt(obstacle.style.left) + objectSize && playerX + player.offsetWidth > parseInt(obstacle.style.left))
                ) {
                    // reloads game if hits object
                    if(!alert("Game Over!")) {window.location.reload();}
                }
            }
        }, 20);
    }

    alert("Use the arrow keys to avoid obstacles for 30s!")
    
    if (isMobile()) {
        document.getElementById('mobileControls').style.display = 'block';
    }

    // Spawn obstacles every 0.9 seconds
    setInterval(createObstacle, 800);
    timer()
});
