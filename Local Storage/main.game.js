const tick_x = 'X'
const tick_o = 'O'
var boxes = []
var current_player = tick_o
win_combo = ['123','456','789','147','258','369','357','159']
var hiddenBox 
var comments = []

// Restart Game
function restartGame(){
    boxes = []
    current_player = 'O'
    for(i=0;i<9;i++)
        hiddenBox[i].innerHTML = null
    $("#Status")[0].innerHTML = null
    load()
}

// Display History
function displayHistory()
{
    history_object = JSON.parse(localStorage.getItem("history"))
    if(history_object != null)
        history_object.forEach((element)=>{
            box = element.boxes.split(',')
            _.slice(box, 0, 1)
            ind = history_object.indexOf(element)
            if(!$('#history'+(ind+1)).length)
                create_board(ind)
            var hidden_box = $('#history'+(ind+1)+' .element');
            for(i=0; i<9; i++){
                if (box[i+1] == undefined)
                    hidden_box[i].innerHTML = null
                else
                    hidden_box[i].innerHTML = box[i+1]
            }
            player = element.current_player			
            $("#Status"+(ind+1))[0].innerHTML = element.stat
        })
}

// Create Game Board
function create_board(index){
    var board_div = $('<div class="board-history" id="history'+(index+1)+'"></div>')
    board_div.append('<span><p id="Status'+(index+1)+'"></p></span>')
    board_div.append('<span><a href="#Game'+(index+1)+'"></span>')
    for(i=1;i<10;i++){
        board_div.append('<div class="element" id="'+i+'"></div>')
    }
    $(".history").append(board_div)
}

// Create comment section
function create_comment(index, _c){
    var comment = $('<div class="comment'+index+'"></div>')
    comment.append('<span><b>'+_c.name+'</b'+_c.time+'</span>')
    comment.append('<span>'+_c.comment+'</span>')
    $(".show-comments").append(comment)
}

// Clear History
function clearHistory(){
    localStorage.clear()
    $(".history")[0].innerHTML = null
}


// Save History
function save(){
    data = {"current_player": current_player, "boxes": boxes.toString(), "stat": $("#Status")[0].innerHTML,
        "comments":comments}
    if(localStorage.getItem("history")){
        history_object = JSON.parse(localStorage.getItem("history")) 
        history_object.push(data)
        localStorage.setItem("history", JSON.stringify(history_object))
    }
    else
        localStorage.setItem("history",JSON.stringify([data]))
}

function divClick(e){
    $(e).on('click', divClicked)
}

// On click event handler
function divClicked(e){
    const id = e.target.id
    if(!boxes[id]){
        boxes[id] = current_player
        e.target.innerHTML = current_player
        if (playerWon())
        {
            $("#Status")[0].innerHTML =  current_player + " won"
            _.map(hiddenBox, divClickOff)		
            save()
            return
        }
        if (draw())
        {
            $("#Status")[0].innerHTML = "Draw"
            save()
            return
        }
        current_player = current_player == tick_o ? tick_x : tick_o
    }
}
// Win condition
function playerWon(){
    var flag = false
    _.map(win_combo, function(str){
        if(boxes[str[0]] === current_player && boxes[str[1]] === current_player && boxes[str[2]] === current_player)
            flag = true
    })
    return flag
}
// Draw condition
function draw(){
    var count = 0
    _.map(boxes, function(id){
        if (id != null && id != undefined && id != "")
            count++;
    })
    if (count == 9)
        return true 
}

// Removing event Listener
function divClickOff(e){
    $(e).off('click')
}


// Game init 
function load(){
    _.map(hiddenBox, divClick)	
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
    if(location.hash){
        history_object = JSON.parse(localStorage.getItem("history"))
        if(history_object != null)
        {
            $(".links").hide()
            var ind = parseInt(location.hash.replace("#Game",""))
            element = history_object[ind-1]
            if(element != undefined && element != null)
            {
                boxes = element.boxes.split(',')
                _.slice(boxes, 0, 1)
                comments = element.comments
                comments.forEach((comment)=>{
                    create_comment(comments.indexOf(comment), comment)
                })
                hiddenBox = $(".board-container .element");
                for(i=0; i<9; i++){
                    if (boxes[i+1] == undefined)
                        hiddenBox[i].innerHTML = null
                    else
                        hiddenBox[i].innerHTML = boxes[i+1]
                }
                current_player = element.current_player			
                $("#Status")[0].innerHTML = element.stat
            }
            else
                location.href = location.href.replace(location.hash,"")
        }
    }
    else{
        history_object = JSON.parse(localStorage.getItem("history"))
        if(history_object != null)
            $(".current .game-info").append('<a href="#Game'+(history_object.length+1)+'"></a>')
        else
            $(".current .game-info").append('<a href="#Game1"></a>')
        load()			
    }
})