class DataStorage{    
    getGamebyIndex(index)
    {
        history_object = JSON.parse(localStorage.getItem("history"))
        if(history_object != null && history_object.length > index){
            var game = new Game()
            var box = history_object[index].boxes.split(',')
            _.slice(box, 0, 1)
            game.gameState = box
            game.status = history_object[index].stat
            return game
        }
        else{
            var current_game_object = JSON.parse(localStorage.getItem("current-game"))
            if(current_game_object != null){
                var game = new Game()
                var box = current_game_object.boxes.split(',')
                _.slice(box, 0, 1)
                game.gameState = box
                game.status = current_game_object.stat
                return game
            }
            else
                return new Game()
        }
            
    }
    get games(){
        var games = []
        history_object = JSON.parse(localStorage.getItem("history"))
        if(history_object != null){
            history_object.forEach((element)=>{
                var game = new Game()
                var box = element.boxes.split(',')
                _.slice(box, 0, 1)
                game.gameState = box
                game.status = element.stat
                games.push(game)
            })
            return games
        }
        else{
            return null
        }

    }
    set gameData(game){
        var data = {"current_player": game.currentPlayer, "boxes": game.gameState.toString(), "stat": game.status,
            "comments":game.comments}
        if(localStorage.getItem("history")){
            history_object = JSON.parse(localStorage.getItem("history")) 
            history_object.push(data)
            localStorage.setItem("history", JSON.stringify(history_object))
        }
        else
            localStorage.setItem("history",JSON.stringify([data]))
    }
    set currentGameData(game){
        var data = {"current_player": game.currentPlayer, "boxes": game.gameState.toString(), "stat": game.status,
            "comments":game.comments}
        localStorage.setItem("current-game",JSON.stringify(data))
    }
}
