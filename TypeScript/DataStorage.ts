import { Game } from "./Game.js";
export class DataStorage {
    historyObject : any;
    currentGameObject : any;
    games : Game[];
    storage: any;
    constructor(storage : any) {
        this.storage = storage;
        if (storage["history"])
            this.historyObject = JSON.parse(storage["history"]);
        if (storage["current-game"])
            this.currentGameObject = JSON.parse(storage["current-game"]);
        this.getGames();
    };
    removeCurrentGame() {
        if (this.storage['current-game'])
            delete this.storage["current-game"];
        this.currentGameObject = null;
    };
    clearGameHistory() {
        this.storage.clear(); 
        this.historyObject = this.currentGameObject = null;
        this.getGames();
    };
    setData(value : string, data : string) {
        this.storage[value] = data;
        if (value == "history"){
            this.historyObject = JSON.parse(data);
            this.getGames();
        }
        else
            this.currentGameObject = JSON.parse(data);
    };
    getGamebyIndex(index : number) {
        let game = new Game();
        if (this.historyObject != null && index >= 0 && this.historyObject.length > index-1) {
            let box = this.historyObject[index-1].boxes.split(',');
            box.slice(0, 1);
            game.boxes = box;
            game.status = this.historyObject[index-1].stat;
        }
        else {
            if (this.currentGameObject != null) {
                let box = this.currentGameObject.boxes.split(',');
                box.slice(0, 1);
                game.boxes = box;
                game.status = this.currentGameObject.stat;
            }
        }
        return game;
    };
    getGames() {
        let games = [];
        if (this.historyObject != null) {
            this.historyObject.forEach((element : any) => {
                let game = new Game();
                let box = element.boxes.split(',');
                box.slice(0, 1);
                game.boxes = box;
                game.status = element.stat;
                games.push(game);
            })
            this.games = games;
        }
        else {
            this.games = [];
        }
    };
    setGameData(game : Game, value : string) {
        let data = {
            "current_player": game.current_player, "boxes": game.boxes.toString(), "stat": game.status,
            "comments": game.comments
        };
        if (this.historyObject && value == "history") {
            this.historyObject.push(data);
            this.setData(value, JSON.stringify(this.historyObject));
        }
        else {
            if (value == "history"){
                this.historyObject = [data];
                this.setData(value, JSON.stringify([data]));
            }
            else{
                this.currentGameObject = data;
                this.setData(value, JSON.stringify(data));
            }
        }
    };
};