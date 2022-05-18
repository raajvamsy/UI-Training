import { GameLogic } from "./GameLogic.js";

var gameLogic = new GameLogic();

function create_comment(index, _c) {
    let comment = $('<div class="comment' + index + '"></div>');
    comment.append('<span><b>' + _c.name + '</b' + _c.time + '</span>');
    comment.append('<span>' + _c.comment + '</span>');
    $(".show-comments").append(comment);
};
$(document).ready(function () {
    $("#clearHistory").on('click', ()=>{
        gameLogic.clearHistory();
    });
    $("#history").on('click', ()=>{
        gameLogic.displayAllGames();
    });
    $("#restartGame").on('click', ()=>{
        gameLogic.restartGame();
    });
    $(".comment-link").on('click', ()=>{
        $(".comment-link").hide();
        $(".comment .username").prop('required', true);
        $(".comment .desc").prop('required', true);
        $(".comment").show();    
    });
    $("form").on('submit', function (event) {
        comments.push({
            "name": event.target[0].value, "comment": event.target[1].value,
            "time": new Date().toLocaleString()
        });
        event.preventDefault();
        $("form")[0].reset();
        $(".comment-link").show();
        $(".comment").hide();
    });
    let index = parseInt(location.hash.replace("#Game", ""));
    if (index)
        gameLogic.gameObject = gameLogic.storageObject.getGamebyIndex(index);
    else
        gameLogic.gameObject = gameLogic.storageObject.getGamebyIndex(-1);
    gameLogic.displayGame();
    gameLogic.load();
});