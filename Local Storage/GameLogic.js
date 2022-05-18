import { Game } from './Game';
import { DataStorage } from './DataStorage';
export class gameLogic{
    gameObject;
    hiddenBox; 
    storageObject;
    constructor(game){
        if(game)
            this.gameObject = game;
        else
            this.gameObject = new Game();
        this.storageObject = new DataStorage(localStorage);
    }
    playerWinCondition(){
        // checks if player won or not
        let flag = false;
        _.map(this.gameObject._win_combo, function(str){
            if(this.gameObject.boxes[str[0]] === this.gameObject.current_player && this.gameObject.boxes[str[1]] === this.gameObject.current_player && this.gameObject.boxes[str[2]] === this.gameObject.current_player)
                flag = true;
        }.call(this));
        return flag;
    }
    drawCondition(){
        // checks if its draw or not
        let count = 0;
        _.map(this.gameObject.boxes, function(id){
            if (id != null && id != undefined && id != "")
                count++;
        })
        if (count == 9)
            return true;
        return false;
    }
    divClickOff(e){
        $(e).off('click');
    }
    divClicked(e){
        const id = e.target.id;
        if(!this.gameObject.boxes[id]){
            this.gameObject.boxes[id] = this.gameObject.current_player;
            e.target.innerHTML = this.gameObject.current_player;
            let store = new DataStorage(localStorage);
            if (this.playerWinCondition.call(this)())
            {
                $("#Status")[0].innerHTML =  this.gameObject.current_player + " won";
                this.gameObject.status = this.gameObject.current_player + " won";
                _.map(this.hiddenBox, this.divClickOff);
                store.gameData = this.gameObject;
                localStorage.removeItem("current-game");
                return;
            }
            else if (this.drawCondition.call(this)())
            {
                $("#Status")[0].innerHTML = "Draw";
                this.gameObject.status = "Draw";
                store.gameData = this.gameObject;
                localStorage.removeItem("current-game");
                return;
            }
            store.currentGameData = this.gameObject;
            this.gameObject.current_player = this.gameObject.current_player  == this.gameObject.tick_o ? this.gameObject.tick_x : this.gameObject.tick_o;
        }
    }
    divClick(e){
        if(e.innerHTML == null || e.innerHTML == "") 
           $(e).on('click', this.divClicked.call(this));
    }
    load(){
        this.hiddenBox = $(".board-container .element");
        _.map(this.hiddenBox, this.divClick.call(this));

    }    
    restartGame(){
        this.gameObject.boxes = [];
        this.gameObject.currentPlayer = this.gameObject.tick_o;
        Object.values(this.hiddenBox).forEach((element)=>{
            element.innerHTML = null;
        })
        this.gameObject.status = null;
        localStorage.removeItem("current-game");
        this.load.call(this);
    }
    clearHistory(){
        localStorage.clear();
        $(".history")[0].innerHTML = null;
    }
}
