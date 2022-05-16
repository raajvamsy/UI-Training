class DataStorage{    
    historyObject;
    currentGameObject;
    constructor(){
        this.historyObject = JSON.parse(localStorage.getItem("history"));
        this.currentGameObject =JSON.parse(localStorage.getItem("current-game"));
    }
    setData(value, data){
        localStorage.setItem(value, data);
    }
    getGamebyIndex(index)
    {
        let game = new Game();
        if(this.historyObject != null && this.historyObject.length > index){
            let box = this.historyObject[index].boxes.split(',');
            _.slice(box, 0, 1);
            game.gameState = box;
            game.status = this.historyObject[index].stat;
            return game;
        }
        else{
            if(this.currentGameObject != null){
                let box = this.currentGameObject.boxes.split(',');
                _.slice(box, 0, 1);
                game.gameState = box;
                game.status = this.currentGameObject.stat;
                return game;
            }
            else
                return game;
        }            
    }
    getGames(){
        let games = [];
        if(this.historyObject != null){
            this.historyObject.forEach((element)=>{
                let game = new Game();
                let box = element.boxes.split(',');
                _.slice(box, 0, 1);
                game.gameState = box;
                game.status = element.stat;
                games.push(game);
            })
            return games;
        }
        else{
            return null;
        }

    }
    setGameData(game){
        let data = {"current_player": game.currentPlayer, "boxes": game.gameState.toString(), "stat": game.status,
            "comments":game.comments};
        if(this.historyObject){
            this.historyObject.push(data);
            this.setData("history", JSON.stringify(history_object));
        }
        else
            this.setData("history",JSON.stringify([data]));
    }
    setCurrentGameData(game){
        var data = {"current_player": game.currentPlayer, "boxes": game.gameState.toString(), "stat": game.status,
            "comments":game.comments};
        this.setData("current-game",JSON.stringify(data));
    }
}