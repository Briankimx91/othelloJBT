$(document).ready(createObj);

function createObj(){
    generateSpots();
    var gameObj = new Game();
    gameObj.init();
}

var something;

function generateSpots(){
    var col = ["A","B", "C", "D", "E", "F", "G" ,"H"];
    for (var i = 1; i < 9; i++) {
        $("<div>").attr("id","row"+i).addClass("rows").appendTo("#back-board");
    }
    for(var k = 1; k < 9; k++){
        for(var j=0; j<8; j++){
            $("<div>").addClass(col[j]).appendTo("#row"+k);
        }
    }
}

function Game(){
    //player 1 is black
    //player 2 is white
    var self = this;
    this.num_black = null;
    this.num_white =null;
    this.player1 =[];
    this.player2 = [];
    // implement this later on
    // this.timer_value = 30000;
    // this.timer_mode = false;
    this.player_list = ["player 1","player 2"];
    this.turn = null;
    this.winner = null;

    //functions down here


    this.init = function(){
        //positions 4,5 give them black/white discs
        $(".rows > div").click(self.clickHandler);
        //positions 4,5 give them black/white discs
        $("#row4 div:nth-child(4)").addClass('white-disc').off("click");
        $("#row4 div:nth-child(5)").addClass('black-disc').off("click");
        $("#row5 div:nth-child(4)").addClass('black-disc').off("click");
        $("#row5 div:nth-child(5)").addClass('white-disc').off("click");
        this.turn = this.player_list[0];
    };
    this.legalmoves = function(){



        

        // return array; <-- if(array.length==0)
        //                     you suck func;
        //                     return;
    }

    this.clickHandler = function() {
        console.log("click is working");
        if (self.turn == self.player_list[0]) { // player 1's turn
            $(this).addClass("black-disc");
            self.turn = self.player_list[1];
        }
        else {
            $(this).addClass("white-disc");
            self.turn = self.player_list[0];
        }
        $(this).off("click");
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
    // if(white)
    //     remove white
    //     add black
    // else
    //     remove black
    //     add white
    // }


    // this.reset function(){
    //     this.turn = null;
    //     this.num_black =null;
    //     this.num_white = null;
    //     this.winner = null;
    //
    // }

}


