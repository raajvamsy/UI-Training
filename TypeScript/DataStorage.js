"use strict";
exports.__esModule = true;
exports.DataStorage = void 0;
var Game_js_1 = require("./Game.js");
var DataStorage = /** @class */ (function () {
    function DataStorage(storage) {
        this.storage = storage;
        if (storage["history"])
            this.historyObject = JSON.parse(storage["history"]);
        if (storage["current-game"])
            this.currentGameObject = JSON.parse(storage["current-game"]);
        this.getGames();
    }
    ;
    DataStorage.prototype.removeCurrentGame = function () {
        if (this.storage['current-game'])
            delete this.storage["current-game"];
        this.currentGameObject = null;
    };
    ;
    DataStorage.prototype.clearGameHistory = function () {
        this.storage.clear();
        this.historyObject = this.currentGameObject = null;
        this.getGames();
    };
    ;
    DataStorage.prototype.setData = function (value, data) {
        this.storage[value] = data;
        if (value == "history") {
            this.historyObject = JSON.parse(data);
            this.getGames();
        }
        else
            this.currentGameObject = JSON.parse(data);
    };
    ;
    DataStorage.prototype.getGamebyIndex = function (index) {
        var game = new Game_js_1.Game();
        if (this.historyObject != null && index >= 0 && this.historyObject.length > index - 1) {
            var box = this.historyObject[index - 1].boxes.split(',');
            box.slice(0, 1);
            game.boxes = box;
            game.status = this.historyObject[index - 1].stat;
        }
        else {
            if (this.currentGameObject != null) {
                var box = this.currentGameObject.boxes.split(',');
                box.slice(0, 1);
                game.boxes = box;
                game.status = this.currentGameObject.stat;
            }
        }
        return game;
    };
    ;
    DataStorage.prototype.getGames = function () {
        var games = [];
        if (this.historyObject != null) {
            this.historyObject.forEach(function (element) {
                var game = new Game_js_1.Game();
                var box = element.boxes.split(',');
                box.slice(0, 1);
                game.boxes = box;
                game.status = element.stat;
                games.push(game);
            });
            this.games = games;
        }
        else {
            this.games = [];
        }
    };
    ;
    DataStorage.prototype.setGameData = function (game, value) {
        var data = {
            "current_player": game.current_player, "boxes": game.boxes.toString(), "stat": game.status,
            "comments": game.comments
        };
        if (this.historyObject && value == "history") {
            this.historyObject.push(data);
            this.setData(value, JSON.stringify(this.historyObject));
        }
        else {
            if (value == "history") {
                this.historyObject = [data];
                this.setData(value, JSON.stringify([data]));
            }
            else {
                this.currentGameObject = data;
                this.setData(value, JSON.stringify(data));
            }
        }
    };
    ;
    return DataStorage;
}());
exports.DataStorage = DataStorage;
;
