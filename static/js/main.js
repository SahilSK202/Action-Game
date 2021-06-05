$(document).ready(function () {
    let cityouter = document.querySelector('.city-outer');
    let cityinner = document.querySelector('.city-inner');
    let birds = document.querySelector('.birds');
    let player = document.querySelector('.player');
    let obstacle = document.querySelector('.obstacle');
    let cloud = document.querySelector('.cloud');
    let songs = ["../static/dhoom.mp3", "../static/despacito.mp3" , "../static/missionimpossible.mp3"];
    let songind = 0;
    let myaudio = new Audio(songs[songind]);
    let song1 = true;
    let previousbtn = document.querySelector('.previousbtn');
    let nextbtn = document.querySelector('.nextbtn');
    let playbtn = document.querySelector('.playbtn');
    let controls = document.getElementById('controls');
    let howtoplay = document.getElementById('howtoplay');
    let chooseplayer = document.getElementById('chooseplayer');
    let mainplayer = document.getElementById('player');
    let playercaption = document.getElementById('playercaption');
    let players = ["../static/images/boy.gif", "../static/images/couple.gif", "../static/images/girl.gif","../static/images/family.gif", "../static/images/dad.gif", "../static/images/van.gif", "../static/images/zombie.gif"];
    let captions = ["Brave Boy", "Love Birds", "Gusty Girl", "Family Man", "Super Dad", "Kitty Van", "Zombie Uncle"];
    let playerind = 0;
    let obstacles = ["../static/images/dragon2.gif", "../static/images/tiger.gif", "../static/images/snake.gif" ,"../static/images/stone.gif"];
    let obs = document.getElementById('obstacle');
    let score = document.querySelector('#score');
    let targetscore = document.querySelector('#targetscore');
    let gamestartmsg = true;
    let cross = true;
    let gameon = true;
    let music = false;
    myaudio.loop = true;
    myaudio.autoplay = true;


    playbtn.onclick = function () {
        if (gamestartmsg) {
            $('.gamestart').fadeOut(500);
            // controls.style.visibility = "hidden";
            controls.style.display = "none";
            howtoplay.style.display = "none";
            gamestartmsg = false;
            setTimeout(() => {
                document.getElementById('obstacle').style.visibility = "visible";
                obstacle.classList.toggle('obstacleanimation');
            }, 5000);
        }
        play();

    }
    
    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && gameon && !gamestartmsg) {

            obstacle.classList.toggle('obstacleanimation');

            play();
        }

        if (e.key === 'm' || e.key === 'M') {
            
            myaudio.pause();
            songind = (songind + 1) % songs.length;
            myaudio = new Audio(songs[songind]);
            myaudio.play();
            myaudio.loop = true;
            myaudio.autoplay = true;
        }
    });


    function play() {
        cityinner.classList.toggle('cityanimation');
        birds.classList.toggle('birdsanimation');
        cloud.classList.toggle('cloudanimation');

        if (music) {
            myaudio.pause();
            music = false;
        }
        else {
            myaudio.play();
            music = true;
            setInterval(function () {
                document.body.classList.toggle('daytonight');
            }, 25000);
        }
    }

    window.onload = function () {
        myaudio.pause();
        score.innerHTML = "0";
    }


    document.addEventListener('keydown', function (e) {
        if (e.key === ' ') {
            player.classList.add('jump');
            setTimeout(() => {
                player.classList.remove('jump');
            }, 700);
        }

        if (e.key === 'ArrowLeft') {
            // player.classList.add('flipped');
            Mx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
            if (Mx > 100) {
                player.style.left = Mx - 180 + "px";
            }

        }

        if (e.key === 'ArrowRight') {
            // player.classList.remove('flipped');
            Mx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
            if (Mx < window.innerWidth - 500) {
                player.style.left = Mx + 180 + "px";
            }
        }
    });


    previousbtn.onclick = function () {

        playerind = (playerind + players.length - 1) % players.length;
        chooseplayer.src = players[playerind];
        if (playerind < 4) {
            chooseplayer.classList.add('flipy');
            mainplayer.classList.add('flipy');
        }
        else {
            chooseplayer.classList.remove('flipy');
            mainplayer.classList.remove('flipy');
        }
        mainplayer.src = players[playerind];
        playercaption.innerHTML = captions[playerind];
        console.log(playerind);

    }

    nextbtn.onclick = function () {

        playerind = (playerind + 1) % players.length;
        chooseplayer.src = players[playerind];
        if (playerind < 4) {
            chooseplayer.classList.add('flipy');
            mainplayer.classList.add('flipy');
        }
        else {
            chooseplayer.classList.remove('flipy');
            mainplayer.classList.remove('flipy');
        }
        mainplayer.src = players[playerind];
        playercaption.innerHTML = captions[playerind];
        console.log(playerind);

    }


    const crossingcheck = setInterval(() => {

        Mx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        My = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));

        Ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        Oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

        offsetX = Math.abs(Mx - Ox);
        offsetY = Math.abs(My - Oy);

        if (offsetX < 150 && offsetY < 100) {
            cityinner.classList.toggle('cityanimation');
            cloud.classList.toggle('cloudanimation');
            birds.classList.toggle('birdsanimation');
            obstacle.classList.toggle('obstacleanimation');
            obstacle.style.visibility = "hidden";
            $('.gamestart').html(`<img class="winner" src="../static/images/gameover.gif" alt=""><br><br><div class="playbtn" id="restartbtn" onclick="restart()">Play Again !</div>`);
            $('.gamestart').fadeIn(500);
            myaudio.pause();
            myaudio = new Audio("../static/gameover.mp3");
            myaudio.play();
            // myaudio.loop = true;
            myaudio.autoplay = true;
            gameon = false;

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    window.location.reload();
                }

            });

            document.getElementById("restartbtn").onclick = function() {
                window.location.reload();
                
            }

        }
        else {
            if (music && cross && offsetX < 100) {
                let points = parseInt(score.innerHTML.toString());
                points = points + 10;
                score.innerHTML = points;
                cross = false;
                setTimeout(() => {
                    cross = true;
                }, 2000);
                setTimeout(() => {
                    // cityaniDur = parseFloat(window.getComputedStyle(cityinner, null).getPropertyValue('animation-duration'));
                    obstacleaniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                    if (obstacleaniDur => 3.5) {
                        
                        // cityinner.style.animationDuration = cityaniDur - 0.50 + 's';
                        obstacle.style.animationDuration = obstacleaniDur - 0.05+'s';
                    }
                    else{
                        // cityinner.style.animationDuration = 6 + 's';
                        obstacle.style.animationDuration = 3.5 +'s';
                    }
                }, 600);
            }
        }
    }, 50);




    let nextlevel = function nextlevel() {
        if (gamestartmsg) {
            $('.gamestart').fadeOut(500);
            // myaudio.play();
            gameon = true;
            gamestartmsg = false;
            targetscore.innerHTML = (parseInt(targetscore.innerHTML)*2).toString()
            // cityinner.classList.add('cityanimation');
            obstacle.classList.add("obstacle");
            setTimeout(() => {
                document.getElementById('obstacle').style.visibility = "visible";
                ind = Math.floor(Math.random() * obstacles.length);
                obs.src = obstacles[ind];
                obstacle.classList.add('obstacleanimation');
    
            }, 5000);
        }
    }

    const scorecheck =setInterval(() => {

        if (parseInt(score.innerHTML.toString()) >= parseInt(targetscore.innerHTML.toString())) {

            gameon = false;
            // cityinner.classList.remove('cityanimation');
            obstacle.classList.remove('obstacleanimation');
            obstacle.classList.remove("obstacle");
            obs.style.visibility = "hidden";

            // setTimeout(() => {
                
            //     myaudio.pause();
            //     let nenxtlevelaud = new Audio("./static/nextlevel.mp3");
            //     nenxtlevelaud.play();
            // }, 3000);

            $('.gamestart').html(`<img class="winner" src="../static/images/winner.gif" alt=""><br><div class="playbtn" id="nextlevelbtn">Next Level !</div>`);
            $('.gamestart').fadeIn(500);


            gamestartmsg = true;

            document.getElementById("nextlevelbtn").onclick = nextlevel;
            document.addEventListener('keydown', function (e) {
                if (e.key === ' ') {
                    nextlevel();
                }

            });
        }
        else if (parseInt(window.getComputedStyle(obs, null).getPropertyValue('left')) <= 0.5) {
            ind = Math.floor(Math.random() * obstacles.length);
            obs.src = obstacles[ind];
        }

    }, 500);

});