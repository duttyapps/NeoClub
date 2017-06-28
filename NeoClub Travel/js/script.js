//
// Author: Carlos Arce Sherader
// Contact: carlosarcesh@gmail.com
//

$(window).load(function () {
    //log("Inicializado");
    //my credits for sure :3
    $("#loading").fadeOut(2000);

    //setting up global variables
    $total_imgs = 8;

    //pre-loading images
    $(['images/wallpaper-1.jpg',
        'images/wallpaper-2.jpg',
        'images/wallpaper-3.jpg',
        'images/wallpaper-4.jpg',
        'images/wallpaper-5.jpg',
        'images/wallpaper-6.jpg',
        'images/wallpaper-7.jpg',
        'images/wallpaper-8.jpg',
        'images/wallpaper-9.jpg',
        'images/wallpaper-10.jpg',
        'images/wallpaper-11.jpg',
        'images/wallpaper-12.jpg',
        'images/wallpaper-13.jpg',
        'images/wallpaper-14.jpg',
        'images/wallpaper-15.jpg',
        'images/wallpaper-16.jpg',
        'images/screensaver-1.jpg',
        'images/screensaver-2.jpg',
        'images/screensaver-3.jpg',
        'images/screensaver-4.jpg',
        'images/screensaver-5.jpg',
        'images/screensaver-6.jpg',
        'images/screensaver-7.jpg',
        'images/screensaver-8.jpg',
        'images/screensaver-9.jpg',
        'images/screensaver-10.jpg',
        'images/screensaver-11.jpg',
        'images/screensaver-12.jpg',
        'images/screensaver-13.jpg',
        'images/screensaver-14.jpg',
        'images/screensaver-15.jpg',
        'images/screensaver-16.jpg',
        'images/screensaver-17.jpg',
        'images/screensaver-18.jpg',
        'images/screensaver-19.jpg'
    ]).preload();

    //coins
    $coins = Number($("#numtries").html());

    //background body
    setRndWallpaper();
    setInterval(setRndWallpaper, 10000);

    //screensaver
    setRndScreensaver();
    setInterval(setRndScreensaver, 10000);

    //reward
    $reward = 0;

    //init sound
    $("#m-sound").trigger('play');

    $LogFile = null;
});

$("#splitted-screen #left-option").click(function () {
    $winner = 0;
    startRoulette($winner);
    $("#splitted-screen").hide();
    $("#container").css({ height: "auto" });
    $("#m-sound").trigger('pause');
});

$("#splitted-screen #right-option").click(function () {
    $winner = 1;
    startRoulette($winner);
    $("#splitted-screen").hide();
    $("#container").css({ height: "auto" });
    $("#m-sound").trigger('pause');
});

//starting the roulette... good luck lol
$("#btnStart").click(function () {
    //have you coins?
    if ($coins > 0) {
        startRoulette($winner);

        $('div.roulette-1').roulette("start");
        setTimeout(function () { $('div.roulette-2').roulette("start") }, 250);
        setTimeout(function () { $('div.roulette-3').roulette("start") }, 500);
    }
    //look at the zero pls!!!
    updateTries();
});

$("#dw1").click(function () {
    if ($reward == 0) {
        $reward = 1;
        showWinnerMsg(1);
    } else {
        reloadGame();
    }
});

$("#dw2").click(function () {
    if ($reward == 0) {
        $reward = 2;
        showWinnerMsg(1);
    } else {
        reloadGame();
    }
});

$("#dw3").click(function () {
    if ($reward == 0) {
        $reward = 3;
        showWinnerMsg(1);
    } else {
        reloadGame();
    }
});

$("#dw4").click(function () {
    if ($reward == 0) {
        $reward = 4;
        showWinnerMsg(1);
    } else {
        reloadGame();
    }
});

$("#dw5").click(function () {
    if ($reward == 0) {
        $reward = 5;
        showWinnerMsg(1);
    } else {
        reloadGame();
    }
});

$("#dw6").click(function () {
    if ($reward == 0) {
        $reward = 6;
        showWinnerMsg(1);
    } else {
        reloadGame();
    }
});

//this start the roulette... obviously
function startRoulette(winner) {

    if (winner == 1) {
        var rndwin = Math.floor((Math.random() * 3) + 0);
        if (rndwin == 2 || $coins == 1) { //if rndwin is 2 or haven't coins it's time to win (:
            WinnerTurn();
        } else { //else get some lose
            LoserTurn();
        }
    } else {
        LoserTurn();
    }

}

function WinnerTurn() {

    var wnrop = Math.floor((Math.random() * 7) + 0);
    var wtimes = 0;

    $reward = wnrop;

    var option_1 = {};
    var option_2 = {};
    var option_3 = {};

    var updateParamaterW = function () {

        option_1['speed'] = 30;
        option_1['duration'] = 1;
        option_1['stopImageNumber'] = wnrop;
        option_1['startCallback'] = function () {
            disableEvents();
            $("#sound").prop("currentTime", 0);
            $("#sound").trigger('play');
        };
        option_1['stopCallback'] = function ($stopElm) {
            wtimes++;
            if (wtimes == 3) {
                $("#sound").trigger('pause');
                setTimeout(showWinnerMsg, 1000);
            }
        };

        option_2['speed'] = 30;
        option_2['duration'] = 2;
        option_2['stopImageNumber'] = wnrop;
        option_2['stopCallback'] = function ($stopElm) {
            wtimes++;
            if (wtimes == 3) {
                $("#sound").trigger('pause');
                setTimeout(showWinnerMsg, 1000);
            }
        };

        option_3['speed'] = 30;
        option_3['duration'] = 3;
        option_3['stopImageNumber'] = wnrop;
        option_3['stopCallback'] = function ($stopElm) {
            wtimes++;
            if (wtimes == 3) {
                $("#sound").trigger('pause');
                setTimeout(showWinnerMsg, 1000);
            }
        };

        $('div.roulette-1').roulette('option', option_1);
        $('div.roulette-2').roulette('option', option_2);
        $('div.roulette-3').roulette('option', option_3);

    };

    updateParamaterW();

}

function LoserTurn() {

    //random options
    var vrand1 = Math.floor(Math.random() * ($total_imgs - 6)) + 6;
    var vrand2 = Math.floor(Math.random() * ($total_imgs - 6)) + 6;
    var vrand3 = Math.floor(Math.random() * ($total_imgs - 6)) + 6;
    do {
        vrand3 = Math.floor(Math.random() * ($total_imgs - 6)) + 6;
    } while (vrand3 == vrand1 && vrand3 == vrand2);


    var ltimes = 0;

    var option_1 = {};
    var option_2 = {};
    var option_3 = {};

    var updateParamaterL = function () {

        option_1['speed'] = 30;
        option_1['duration'] = 1;
        option_1['stopImageNumber'] = vrand1;
        option_1['startCallback'] = function () {
            disableEvents();
            $("#sound").prop("currentTime", 0);
            $("#sound").trigger('play');
        };
        option_1['stopCallback'] = function ($stopElm) {
            ltimes++;
            if (ltimes == 3) {
                $("#sound").trigger('pause');
                $("#btnStart").removeAttr('disabled');
                showLoserMsg();
            }
        };

        option_2['speed'] = 30;
        option_2['duration'] = 2;
        option_2['stopImageNumber'] = vrand2;
        option_2['stopCallback'] = function ($stopElm) {
            ltimes++;
            if (ltimes == 3) {
                $("#sound").trigger('pause');
                $("#btnStart").removeAttr('disabled');
                showLoserMsg();
            }
        };

        option_3['speed'] = 30;
        option_3['duration'] = 3;
        option_3['stopImageNumber'] = vrand3;
        option_3['stopCallback'] = function ($stopElm) {
            ltimes++;
            if (ltimes == 3) {
                $("#sound").trigger('pause');
                $("#btnStart").removeAttr('disabled');
                showLoserMsg();
            }
        };

        $('div.roulette-1').roulette('option', option_1);
        $('div.roulette-2').roulette('option', option_2);
        $('div.roulette-3').roulette('option', option_3);

    };

    updateParamaterL();
}

function updateTries() {
    $("#numtries").toggle("pulsate");
    if ($coins > 0) {
        $coins = $coins - 1;
    }
    $("#numtries").html($coins);
    //that disappears at the first effect :c well, let's do it again to make it appear
    $("#numtries").toggle("pulsate");
}

function showWinnerMsg(rew) {

    disableEvents();
    $("#win-sound").trigger('play');
    $("#winner-content").css('background', 'transparent');
    $("#winner-content").css({ "display": "block" });
    $("#winner-content img").show();

    var imgrew;

    switch ($reward) {
        case 0:
            imgrew = "3r.jpg";
            break;
        case 1:
            imgrew = "cuzco.jpg";
            break;
        case 2:
            imgrew = "iguazu.jpg";
            break;
        case 3:
            imgrew = "sanandres.jpg";
            break;
        case 4:
            imgrew = "panama.jpg";
            break;
        case 5:
            imgrew = "cartagena.jpg";
            break;
        case 6:
            imgrew = "iquitos.jpg";
            break;
        default:
            alert("Oops! Something wrong... Contact with the administrator.");
    }

    if (rew === 1) {
        $("#winner-content img").hide();
        $("#winner-content").css("background-image", "url(images/reward/" + imgrew + ")");
        $("#winner-content").css("background-size", "100% 100%");
    } else {
        setTimeout(function () {
            $("#winner-content img").hide();
            $("#winner-content").css("background-image", "url(images/reward/" + imgrew + ")");
            $("#winner-content").css("background-size", "100% 100%");
        }, 5000);
    }

}

function showLoserMsg() {
    if ($coins == 0) {
        $("#loser-content").css({ "display": "block" });
        $("#los-sound").trigger('play');
    }
}

//pre-loading images
$.fn.preload = function () {
    this.each(function () {
        $('<img/>')[0].src = this;
    });
}

function disableEvents() {
    $("#btnStart").attr('disabled', 'true');
}

//thank you google lol
function alert(message) {
    var msgBox = new Windows.UI.Popups.MessageDialog(message);
    msgBox.showAsync();
}

function setRndScreensaver() {
    var rndwllp = Math.floor((Math.random() * 19) + 1);
    var ssbg;

    if (rndwllp < 20) {
        ssbg = "screensaver-" + rndwllp + ".jpg";
    } else {
        ssbg = "screensaver-1.jpg";
    }

    $('#splitted-screen').css({"background-image": "url(images/screensaver/" + ssbg + ")", "background-size": "100% 100%"});
}

function setRndWallpaper() {
    var rndbg = Math.floor((Math.random() * 16) + 1);
    var bgbg;

    if (rndbg < 17) {
        bgbg = "wallpaper-" + rndbg + ".jpg";
    } else {
        bgbg = "wallpaper-1.jpg";
    }
    
    $('body').css({"background-image": "url(images/wallpaper/" + bgbg + ")", "background-size": "100% 100%"});
}

function reloadGame() {
    $coins = 3;
    $("#numtries").html($coins);
    $("#splitted-screen").show();
    $("#sound").trigger('pause');
    $("#win-sound").trigger('pause');
    $("#win-sound").prop("currentTime", 0);
    $("#winner-content").hide();
    $("#loser-content").hide();
    $("#btnStart").removeAttr('disabled');
    $("#m-sound").prop("currentTime", 0);
    $("#m-sound").trigger('play');
    $("#los-sound").trigger('pause');
}

function log(text) {
    var d = new Date();
    fileName = "NeomundoRoulette_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate() + ".log"; //ex: NeomundoRoulette_2016_08_31.log
    var DataLog = "";

    //createLogFile(fileName);

    Windows.Storage.KnownFolders.documentsLibrary.getFileAsync(fileName).done(function (file) {
        $LogFile = file;
    });

    DataLog = readLogFile();

    if ($LogFile !== null) {

        Windows.Storage.FileIO.writeTextAsync($LogFile, DataLog + "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "] " + text).done(function () {
        },
        // Handle errors with an error function
        function (error) {
            alert(error);
        });

    }
}

function readLogFile() {
    var DataLog = null;
    if ($LogFile !== null) {
        Windows.Storage.FileIO.readTextAsync($LogFile).done(function (data) {
            DataLog = data;
        },
        function (err) {
            alert(err);
        });
    }
    return DataLog;
}

function createLogFile(fileName) {
    Windows.Storage.KnownFolders.documentsLibrary.createFileAsync(fileName, Windows.Storage.CreationCollisionOption.openIfExists);
}
