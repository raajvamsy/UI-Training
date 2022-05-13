class Game{
    tick_o = 'O'
    tick_x = 'X'
    _win_combo = ['123','456','789','147','258','369','357','159']
    boxes = []
    status = ""
    comments = []
    current_player = this.tick_o

    
    set currentPlayer(current_player){
        this.current_player = current_player
    }
    get currentPlayer(){
        return this.current_player
    }
    addComment(comment){
        this.comments.push(comment)
    }
    get comments(){
        return this.comments
    }
    set comments(comments){
        this.comments = comments
    }
    set status(status){
        this.status = status
    }
    get status(){
        return this.status
    }
    set gameState(_boxes){
        // sets the game_state boxes value
        this.boxes =  _boxes
    }
    get gameState(){
        // gets the game_state boxes value
        return this.boxes;
    }
}
