import { Game } from "./Game";
export class DataStorage{    
    historyObject;
    currentGameObject;
    games;
    storage;
    constructor(storage){
        this.storage = storage;
        if(storage["history"])
            this.historyObject = JSON.parse(storage["history"]);
        if(storage["current-game"])
            this.currentGameObject =JSON.parse(storage["current-game"]);
        this.getGames();
    }
    setData(value, data){
        this.storage[value] = data;
        if(value == "history")
            this.historyObject = JSON.parse(data);
        else
            this.currentGameObject = JSON.parse(data);
        this.getGames();
    }
    getGamebyIndex(index)
    {
        let game = new Game();
        if(this.historyObject != null && this.historyObject.length > index){
            let box = this.historyObject[index].boxes.split(',');
            box.slice(0, 1);
            game.boxes = box;
            game.status = this.historyObject[index].stat;
        }
        else{
            if(this.currentGameObject != null){
                let box = this.currentGameObject.boxes.split(',');
                box.slice(0, 1);
                game.boxes = box;
                game.status = this.currentGameObject.stat;
            }
        }            
        return game;
    }
    getGames(){
        let games = [];
        if(this.historyObject != null){
            this.historyObject.forEach((element)=>{
                let game = new Game();
                let box = element.boxes.split(',');
                box.slice(0, 1);
                game.boxes = box;
                game.status = element.stat;
                games.push(game);
            })
            this.games = games;
        }
        else{
            this.games = [];
        }

    }
    setGameData(game, value){
        let data = {"current_player": game.currentPlayer, "boxes": game.boxes.toString(), "stat": game.status,
            "comments":game.comments};
        if(this.historyObject && value == "history"){
            this.historyObject.push(data);
            this.setData(value, JSON.stringify(this.historyObject));
        }
        else{
            this.setData(value,JSON.stringify([data]));
            if(value == "history")
                this.historyObject = [data];
            else
                this.currentGameObject = data;
        }
    }
};