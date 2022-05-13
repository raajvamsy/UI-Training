var logic
var store = new DataStorage()

function create_board(index){
    var board_div = $('<div class="board-history" id="history'+(index+1)+'"></div>')
    board_div.append('<span><p id="Status'+(index+1)+'"></p></span>')
    board_div.append('<span><a href="#Game'+(index+1)+'"></span>')
    for(i=1;i<10;i++){
        board_div.append('<div class="element" id="'+i+'"></div>')
    }
    $(".history").append(board_div)
}

function clearHistory(){
    logic.clearHistory()
}
function restartGame(){
    logic.restartGame()
}
function displayAllGames(){
    var games = store.games
    games.forEach((game,id)=>{
        box = game.gameState
        create_board(id)
        var hidden_box = $('#history'+(id+1)+' .element');
        for(i=0; i<9; i++){
            if (box[i+1] == undefined)
                hidden_box[i].innerHTML = null
            else
                hidden_box[i].innerHTML = box[i+1]
        }
        player = game.currentPlayer			
        $("#Status"+(id+1))[0].innerHTML = game.status    
    })
}

function displayGame(index, _game){
    var game 
    if(_game)
        game = _game
    if(index)
        game = store.getGamebyIndex(index-1)
    boxes = game.gameState
    comments = game.comments
    comments.forEach((comment)=>{
        create_comment(comments.indexOf(comment), comment)
    })
    hiddenBox = $(".board-container .element");
    for(i=0; i<9; i++){
        if (boxes[i+1] == undefined || boxes[i+1] == "")
            hiddenBox[i].innerHTML = null
        else
            hiddenBox[i].innerHTML = boxes[i+1]
    }
    current_player = game.currentPlayer			
    $("#Status")[0].innerHTML = game.status
    if(!_game && !index)
        location.href = location.href.replace(location.hash,"")    
}


function create_comment(index, _c){
    var comment = $('<div class="comment'+index+'"></div>')
    comment.append('<span><b>'+_c.name+'</b'+_c.time+'</span>')
    comment.append('<span>'+_c.comment+'</span>')
    $(".show-comments").append(comment)
}


function displayCurrentGame(){
    current_game_object = JSON.parse(localStorage.getItem("current-game"))
    if(current_game_object != null){
        var game = new Game()
        game.currentPlayer = current_game_object.current_player
        game.status = current_game_object.stat
        game.gameState = current_game_object.boxes.split(',')
        game.comments = current_game_object.comments
        logic = new gameLogic(game)
        displayGame(game)
        logic.load()
    }
    else{
        logic = new gameLogic()
        displayGame(new Game())
        logic.load()
    }
}
// Add comment
function addComment()
{
    $(".comment-link").hide()
    $(".comment .username").prop('required',true);
    $(".comment .desc").prop('required',true);
    $(".comment").show()
}
$(document).ready(function() {

    hiddenBox = $(".board-container .element");
    $("form").on('submit', function(event){
        comments.push({"name":event.target[0].value, "comment":event.target[1].value,
                        "time":new Date().toLocaleString()})
        event.preventDefault()
        $("form")[0].reset()
        $(".comment-link").show()
        $(".comment").hide()
    });


    // Load Hash Game state
    history_object = JSON.parse(localStorage.getItem("history"))
    var ind = parseInt(location.hash.replace("#Game",""))
    current_game_object = JSON.parse(localStorage.getItem("current-game"))
    if(location.hash){
        if(history_object != null)
        {
            if(ind <= history_object.length)
            {
                $(".links").hide()  
                displayGame(ind)    
            }
            else
                displayCurrentGame()
        }
        else
            displayCurrentGame()
    }
    else{
        displayCurrentGame()
    }
})