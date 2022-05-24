"use strict";
exports.__esModule = true;
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game() {
        this.tick_o = 'O';
        this.tick_x = 'X';
        this._win_combo = ['123', '456', '789', '147', '258', '369', '357', '159'];
        this.boxes = [];
        this.status = "";
        this.comments = [];
        this.current_player = this.tick_o;
    }
    Game.prototype.addComment = function (comment) {
        this.comments.push(comment);
    };
    ;
    return Game;
}());
exports.Game = Game;
;
