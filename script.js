$(document).ready(createObj);

function createObj(){
    generateSpots();
    var gameObj = new Game();
    gameObj.init();
}

var something;

function generateSpots(){
    for (var i = 1; i < 9; i++) {
        $("<div>").attr("id","row"+i).addClass("rows").appendTo("#back-board");
    }
    for(var k = 1; k < 9; k++){
        for(var j=1; j<9; j++){
            $("<div>").appendTo("#row"+k);
        }
    }
}

function Game(){
    this.self = this;
    this.num_black = null;
    this.num_white =null;
    // implement this later on
    // this.timer_value = 30000;
    // this.timer_mode = false;
    this.player_list = ["player 1","player 2"];
    this.turn = null;
    this.winner = null;
    //functions down here


    this.init = function(){
        this.turn = this.player_list[0];
        //positions 4,5 give them black/white discs
        $(".rows > div").click(self.clickHandler);
    }

    // this.legalmoves(){
    //
    //
    //     return array; <-- if(array.length==0)
    //                         you suck func;
    //                         return;
    // }
    //
    this.clickHandler(){
        if(self.turn == self.player_list[0]){ // player 1's turn
            $(this).addClass("black-disc");
        }
        else{
            $(this).addClass("white-disc");
        }
    //
    //
    // this.hover//for legal moves
    //             //show which discs would flip
    //
    //
    //
    //
    // this.flip(){ //some parameters
    //
    // }
    //
    // this.reset function(){
    //     this.turn = null;
    //     this.num_black =null;
    //     this.num_white = null;
    //     this.winner = null;
    //
    // }

}

