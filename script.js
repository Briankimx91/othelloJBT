$(document).ready(createObj);
var gameObj;
var row_list = ["row1","row2","row3","row4","row5","row6","row7","row8"]
var col_list = ["A","B", "C", "D", "E", "F", "G" ,"H"];
var array_list = [[],[],[],[],[],[],[],[]];

function createObj(){
    generateSpots();
    gameObj = new Game();
    gameObj.init();
};

function generateSpots(){
    for (var i = 1; i < 9; i++) {
        $("<div>").attr("id","row"+i).addClass("rows").appendTo("#back-board");
    }
    for(var k = 1; k < 9; k++){
        for(var j=0; j<8; j++){
            // var tempDiv = $("<div>").appendTo("#row"+k);
            var tempDiv = $("<div>").attr("col",col_list[j]).attr("row",k).appendTo("#row"+k);
            array_list[k-1].push(tempDiv);
        }
    }
}
function Game() {
    //player 1 is black
    //player 2 is white
    var self = this;
    this.num_black = null;
    this.num_white = null;
    this.player1 = [];
    this.player2 = [];
    // implement this later on
    // this.timer_value = 30000;
    // this.timer_mode = false;
    this.player_list = ["player 1", "player 2"];
    this.turn = null;
    this.winner = null;
    this.temp_arr = [];

    //functions down here

    this.init = function () {
        //positions 4,5 give them black/white discs

        //mark the four starting positions
        this.player2.push(array_list[3][3].addClass('white-disc'));
        this.player1.push(array_list[3][4].addClass('black-disc'));
        this.player1.push(array_list[4][3].addClass('black-disc'));
        this.player2.push(array_list[4][4].addClass('white-disc'));
        this.turn = this.player_list[0];
        this.legalMoves(0);
        $(".rows > div").click(self.clickHandler);
    };

    this.legalMoves = function (index) {
        //for player 1 - black moves
        if (index == 0) {
            for (var i = 0; i < this.player2.length; i++) {
                var colNum = col_list.indexOf(this.player2[i].attr("col"));
                var rowNum = row_list.indexOf(this.player2[i].parent().attr("id"));
                // console.log("colNum: " + colNum);
                // console.log("rowNum: " + rowNum);
                for (var j = -1; j < 2; j++) {    // for rows
                    for (var k = -1; k < 2; k++) {    //for columns
                        var selectDiv = array_list[rowNum + j][colNum + k];
                        if (selectDiv.hasClass("white-disc") || selectDiv.hasClass("black-disc")) {
                            // console.log("selectDiv: ", selectDiv);
                        }
                        else {
                            for (var b = 0; b < this.player1.length; b++) {
                                this.horizontal(b, selectDiv, this.player1);
                                this.vertical(b, selectDiv, this.player1);
                                // this.diagonal();
                            }
                        }
                    }
                }
            }
        }
        else { //for player 2 - white moves
            for (var i = 0; i < this.player1.length; i++) {
                var colNum = col_list.indexOf(this.player1[i].attr("col"));
                var rowNum = row_list.indexOf(this.player1[i].parent().attr("id"));
                for (var j = -1; j < 2; j++) {    // for rows
                    for (var k = -1; k < 2; k++) {    //for columns
                        var selectDiv = array_list[rowNum + j][colNum + k];
                        if (selectDiv.hasClass("white-disc") || selectDiv.hasClass("black-disc")) {
                        }
                        else {
                            for (var w = 0; w < this.player2.length; w++) {
                                this.horizontal(w, selectDiv, this.player2);
                                this.vertical(w, selectDiv, this.player2);
                            }
                        }
                    }
                }
            }
        }
    };


    this.horizontal = function (playerIndex, selectDiv, playerArray) {
        if (playerArray[playerIndex].attr("row") == selectDiv.attr("row")) {
            var r = selectDiv.attr("row");
            var c = col_list.indexOf(playerArray[playerIndex].attr("col"));
            if (col_list.indexOf(selectDiv.attr("col")) < c) {
                c = col_list.indexOf(selectDiv.attr("col"));
            }
            // console.log("if statement: ", this.player1[b]);
            var col_diff = Math.abs(col_list.indexOf(playerArray[playerIndex].attr("col")) - col_list.indexOf(selectDiv.attr("col")));
            // console.log("col_diff: " + col_diff);
            if (col_diff > 1) {
                for (var t = 1; t < col_diff; t++) {
                    if (!array_list[selectDiv.attr("row") - 1][c + t].hasClass("white-disc")) {
                        break;
                    }
                    else if (array_list[selectDiv.attr("row") - 1][c + t].hasClass("white-disc") && t == col_diff - 1) {
                        this.temp_arr.push(selectDiv);
                        console.log(selectDiv);
                    }
                }
            }
        }
    };

    this.vertical = function (playerIndex, selectDiv, playerArray) {
        if (playerArray[playerIndex].attr("col") == selectDiv.attr("col")) {
            var r = selectDiv.attr("row") - 1;
            var c = col_list.indexOf(selectDiv.attr("col"));
            if (r > playerArray[playerIndex].attr("row") - 1) {
                r = playerArray[playerIndex].attr("row") - 1;
            }
            var row_diff = Math.abs(playerArray[playerIndex].attr("row") - selectDiv.attr("row"));
            // console.log("col_diff: " + col_diff);
            if (row_diff > 1) {
                for (var t = 1; t < row_diff; t++) {
                    if (!array_list[r + t][c].hasClass("white-disc")) {
                        break;
                    }
                    else if (array_list[r + t][c].hasClass("white-disc") && t == row_diff - 1) {
                        this.temp_arr.push(selectDiv);
                        console.log(selectDiv);
                    }
                }
            }
        }
    };

    this.diagonal = function () {

    };

    this.clickHandler = function () {
        //if(this) isn't in the array: dont do this function
        var bool = false;
        var x = $(this).attr("col");
        var y = $(this).attr("row");
        for (var i = 0; i < self.temp_arr.length; i++) {
            if (self.temp_arr[i].attr("row") == y && self.temp_arr[i].attr("col") == x) {
                bool = true;
            }
        }
        if (bool) {
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
    this.reset = function(){
        $('.reset').on('click',function(){

        })
    }
    this.score = fucntion(){
        $('.player1-value').text()
    }

}