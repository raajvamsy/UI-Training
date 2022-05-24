export class Game{
    tick_o : string = 'O';
    tick_x : string = 'X';
    _win_combo : string[] = ['123','456','789','147','258','369','357','159'];
    boxes : string[] = [];
    status : string = "";
    comments : string[] = [];
    current_player : string = this.tick_o;
    addComment(comment){
        this.comments.push(comment);
    };
};