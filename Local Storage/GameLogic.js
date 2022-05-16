class gameLogic{
    gameObject
    current_player
    boxes 
    hiddenBox 

    constructor(game){
        if(game)
            this.gameObject = game;
        else
            this.gameObject = new Game();
        this.boxes = this.gameObject.gameState
        this.current_player = this.gameObject.currentPlayer
    }
    playerWinCondition(){
        // checks if player won or not
        var flag = false
        _.map(this.gameObject._win_combo, function(str){
            if(this.boxes[str[0]] === this.current_player && this.boxes[str[1]] === this.current_player && this.boxes[str[2]] === this.current_player)
                flag = true
        }.bind(this))
        return flag
    }
    drawCondition(){
        // checks if its draw or not
        var count = 0
        _.map(this.boxes, function(id){
            if (id != null && id != undefined && id != "")
                count++;
        })
        console.log(count)
        if (count == 9)
            return true
        return false 
    }
    divClickOff(e){
        $(e).off('click')
    }
    divClicked(e){
        const id = e.target.id
        if(!this.boxes[id]){
            this.boxes[id] = this.current_player
            e.target.innerHTML = this.current_player
            var store = new DataStorage()
            if (this.playerWinCondition.bind(this)())
            {
                $("#Status")[0].innerHTML =  this.current_player + " won"
                this.gameObject.currentPlayer = this.current_player
                this.gameObject.gameState = this.boxes
                this.gameObject.status = this.current_player + " won"
                _.map(this.hiddenBox, this.divClickOff)	
                store.gameData = this.gameObject
                localStorage.removeItem("current-game")
                // this.save()
                return
            }
            else if (this.drawCondition.bind(this)())
            {
                $("#Status")[0].innerHTML = "Draw"
                this.gameObject.currentPlayer = this.current_player
                this.gameObject.gameState = this.boxes
                this.gameObject.status = "Draw"
                store.gameData = this.gameObject
                localStorage.removeItem("current-game")
                // this.save()
                return
            }
            store.currentGameData = this.gameObject
            this.current_player = this.current_player  == this.gameObject.tick_o ? this.gameObject.tick_x : this.gameObject.tick_o
        }
    }
    divClick(e){
        if(e.innerHTML == null || e.innerHTML == "") 
           $(e).on('click', this.divClicked.bind(this))
    }
    load(){
        this.hiddenBox = $(".board-container .element");
        console.log(Object.values(this.hiddenBox))
        _.map(this.hiddenBox, this.divClick.bind(this))	

    }    
    restartGame(){
        this.gameObject.gameState = []
        this.gameObject.currentPlayer = this.gameObject.tick_o
        Object.values(this.hiddenBox).forEach((element)=>{
            element.innerHTML = null
        })
        this.gameObject.status = null
        localStorage.removeItem("current-game")
        this.load.bind(this)
    }
    clearHistory(){
        localStorage.clear()
        $(".history")[0].innerHTML = null
    }
}
