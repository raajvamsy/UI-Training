export class Game{
    tick_o = 'O';
    tick_x = 'X';
    _win_combo = ['123','456','789','147','258','369','357','159'];
    boxes = [];
    status = "";
    comments = [];
    current_player = this.tick_o;
    addComment(comment){
        this.comments.push(comment);
    };
};