$(document).ready(createObj);

var gameObj;
var row = ["row1","row2","row3","row4","row5","row6","row7","row8"]
var col = ["A","B", "C", "D", "E", "F", "G" ,"H"];

function createObj(){
    generateSpots();
    gameObj = new Game();
    gameObj.init();
}

var something;

function generateSpots(){

    for (var i = 1; i < 9; i++) {
        $("<div>").attr("id","row"+i).addClass("rows").appendTo("#back-board");
    }
    for(var k = 1; k < 9; k++){
        for(var j=0; j<8; j++){
            $("<div>").addClass(col[j]).appendTo("#row"+k);
            $("<div>").attr("col",col[j]).appendTo("#row"+k);
            // $("<div>").addClass(col[j]).appendTo("#row"+k);

        }
    }
}

function Game(){
    //player 1 is black
    //player 2 is white
    var self = this;
    this.num_black = null;
    this.num_white =null;
    this.player1 = [];
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
        this.player2.push($("#row4 div:nth-child(4)").addClass('white-disc').off("click"));
        this.player1.push($("#row4 div:nth-child(5)").addClass('black-disc').off("click"));
        this.player1.push($("#row5 div:nth-child(4)").addClass('black-disc').off("click"));
        this.player2.push($("#row5 div:nth-child(5)").addClass('white-disc').off("click"));

        console.log("player1: ", this.player1);
        console.log("player2: ", this.player2);

        this.turn = this.player_list[0];
        this.legalMoves(); //mark the four starting positions for black
    };
    this.legalmoves = function(){


        

        // return array; <-- if(array.length==0)
        //                     you suck func;
        //                     return;
    };

    this.legalMoves = function(){
        //if turn is equal to player1(black){
        // loop through player1 array and look for legal moves around there
        // }
        //else{
        // loop through player1 array and look for legal moves around there
        // }

        for(var i=0; i< this.player1.length-1; i++){
            var colNum = col.indexOf(this.player1[i].attr("col"));
            var rowNum = row.indexOf(this.player1[i].parent().attr("id"));
            console.log("colNum: "+ colNum);
            console.log("rowNum: "+ rowNum);
            for(var j=-1; j<2; j++){    // for rows
                for(var k=-1; k<2; k++){    //for columns
                    // var selectDiv = $("#" + row[rowNum+j] + "div:nth-child(" + (colNum+k) + ")");
                     var selectDiv = $("#"+row[rowNum+j]).children("div")[colNum+k];
                    //'div:nth-child(colNum+k)');
                    console.log("selectDiv: ",selectDiv);
                    // col.indexOf(colNum) + j
                }
            }

            // console.log(abc);
            // console.log("index: " +col.indexOf(abc));
            //



            //
            // if(abc){
            //     var bcd = this.player1[i+1].attr("col")
            //     console.log();
            // }
        }

        //white one later

    };
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

    //     remove blacck

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


