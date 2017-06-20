$(document).ready(createObj);

function createObj(){
    generateSpots();
    var gameObj = new Game();
    gameObj.init();
}

var something;

function generateSpots(){
    for (var i = 1; i < 9; i++) {
        $("<div>").attr("id","row"+i).appendTo("#back-board");
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
        $("#row4 div:nth-child(4)").addClass('.white-disk');
        $("#row4 div:nth-child(5)").addClass('.black-disk');
        $("#row5 div:nth-child(4)").addClass('.black-disk');
        $("#row5 div:nth-child(5)").addClass('.white-disk');
        this.turn = this.player_list[0];

    }

    // this.legalmoves(){
    //
    //
    //     return array; <-- if(array.length==0)
    //                         you suck func;
    //                         return;
    // }
    //
    // this.clickhandler(){
    //     if this.turn = black
    //         then go white
    //     else
    //         go black
    //     flip();
    // }
    //
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


