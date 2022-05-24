import { Game } from './Game.js';
import { DataStorage } from './DataStorage.js';
export class GameLogic {
    gameObject;
    hiddenBox;
    storageObject;
    constructor(game) {
        if (game)
            this.gameObject = game;
        else
            this.gameObject = new Game();
        this.storageObject = new DataStorage(localStorage);
    };
    playerWinCondition() {
        let flag = false;
        _.map(this.gameObject._win_combo, function (str) {
            if (this.gameObject.boxes[str[0]] === this.gameObject.current_player && this.gameObject.boxes[str[1]] === this.gameObject.current_player && this.gameObject.boxes[str[2]] === this.gameObject.current_player)
                flag = true;
        }.bind(this));
        return flag;
    };
    drawCondition() {
        let count = 0;
        _.map(this.gameObject.boxes, function (id) {
            if (id != null && id != undefined && id != "")
                count++;
        });
        if (count == 9)
            return true;
        return false;
    };
    divClickOff(e) {
        $(e).off('click');
    };
    divClicked(e) {
        const id = e.target.id;
        if (!this.gameObject.boxes[id]) {
            this.gameObject.boxes[id] = e.target.innerHTML = this.gameObject.current_player;
            if (this.playerWinCondition.bind(this)()) {
                $("#Status")[0].innerHTML = this.gameObject.status = this.gameObject.current_player + " won";
                _.map(this.hiddenBox, this.divClickOff);
                this.storageObject.setGameData(this.gameObject, "history");
                this.storageObject.removeCurrentGame();
                return;
            }
            else if (this.drawCondition.bind(this)()) {
                $("#Status")[0].innerHTML = this.gameObject.status = "Draw";
                this.storageObject.setGameData(this.gameObject, "history");
                this.storageObject.removeCurrentGame();
                return;
            }
            this.gameObject.current_player = this.gameObject.current_player == this.gameObject.tick_o ? this.gameObject.tick_x : this.gameObject.tick_o;
            this.storageObject.setGameData(this.gameObject, "current-game");
        }
    };
    divClick(e) {
        if (e.innerHTML == null || e.innerHTML == "")
            $(e).on('click', this.divClicked.bind(this));
    };
    load() {
        this.hiddenBox = $(".board-container .element");
        _.map(this.hiddenBox, this.divClick.bind(this));
    };
    restartGame() {
        this.gameObject = new Game();
        Object.values(this.hiddenBox).forEach((element, index) => {
            if (index < 9)
                element.innerHTML = null;
        });
        $("#Status")[0].innerHTML = null;
        this.storageObject.removeCurrentGame();
        window.location.href = 'main.html';
        this.load();
    };
    clearHistory() {
        this.storageObject.clearGameHistory();
        $(".history")[0].innerHTML = null;
    };
    create_board(index) {
        let board_div = $('<div class="board-history" id="history' + (index + 1) + '"></div>');
        board_div.append('<span><p id="Status' + (index + 1) + '"></p></span>');
        board_div.append('<span><a href="#Game' + (index + 1) + '"></span>');
        for (let i = 1; i < 10; i++) {
            board_div.append('<div class="element" id="' + i + '"></div>');
        }
        $(".history").append(board_div);
    };
    displayGame(game, hiddenBox, status) {
        if (!arguments.length) {
            game = this.gameObject;
            hiddenBox = $(".board-container .element");
            status = $("#Status")[0];
        }
        Object.values(hiddenBox).forEach((box, index) => {
            if (index < 9)
                if (game.boxes[index + 1] == undefined || game.boxes[index + 1] == "")
                    box.innerHTML = null;
                else
                    box.innerHTML = game.boxes[index + 1];
        });
        status.innerHTML = game.status;
    };
    displayAllGames() {
        this.storageObject.games.forEach((game, id) => {
            if($('#Status' + (id + 1)).length == 0)
                this.create_board(id);
            this.displayGame(game, $('#history' + (id + 1) + ' .element'), $("#Status" + (id + 1))[0]);
        });
    };
}
