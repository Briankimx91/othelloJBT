$(document).ready(createObj);
var gameObj;
var row_list = ["row1","row2","row3","row4","row5","row6","row7","row8"];
var col_list = ["A","B", "C", "D", "E", "F", "G" ,"H"];
var array_list = [[],[],[],[],[],[],[],[]];

function createObj(){
    generateSpots();
    gameObj = new Game();
    gameObj.init();
}

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
    this.player1 = [];
    this.player2 = [];
    // implement this later on
    // this.timer_value = 30000;
    // this.timer_mode = false;
    this.player_list = ["player 1", "player 2"];
    this.turn = null;
    this.winner = null;
    this.legal_moves_array = [];     //this is for legal moves


    //functions down here

    var goodImg = $("#jedi-on");
    var badImg = $("#sith-on");

    this.init = function () {
        //positions 4,5 give them black/white discs
        //mark the four starting positions
        $(badImg).removeClass("hiddenClass");
        console.log("jedi hide");
        $(goodImg).addClass("hiddenClass");
        console.log("sith's turn");

        this.player2.push(array_list[3][3].addClass('white-disc'));
        this.player1.push(array_list[3][4].addClass('black-disc'));
        this.player1.push(array_list[4][3].addClass('black-disc'));
        this.player2.push(array_list[4][4].addClass('white-disc'));
        this.turn = this.player_list[0];
        this.legalMoves(0);
        $(".rows > div").click(self.clickHandler);
    };

    this.legalMoves = function (index) { //brian's fault
        var colNum;
        var rowNum;
        for(var i=0; i<this.legal_moves_array.length; i++){
            this.legal_moves_array[i].removeClass("blue");
        }
        this.legal_moves_array=[];
        //for player 1 - black moves
        if (index === 0) {
            for (i = 0; i < this.player2.length; i++) {
                colNum = col_list.indexOf(this.player2[i].attr("col"));
                rowNum = this.player2[i].attr("row")-1;
                // console.log("colNum: " + colNum);
                // console.log("rowNum: " + rowNum);
                for (var j = -1; j < 2; j++) {    // for rows
                    for (var k = -1; k < 2; k++) {    //for columns
                        var selectDiv = array_list[rowNum + j][colNum + k];
                        // console.log("selectDiv", selectDiv)
                        if (selectDiv.hasClass("white-disc") || selectDiv.hasClass("black-disc")) {
                            continue;
                        }
                        else {
                            for (var b = 0; b < this.player1.length; b++) {
                                this.horizontal(b, selectDiv, this.player1, "white-disc");
                                this.vertical(b, selectDiv, this.player1, "white-disc");
                                this.diagonal(b, selectDiv, this.player1, "white-disc", "black-disc");
                            }
                        }
                    }
                }
            }
        }
        else { //for player 2 - white moves
            for (var i = 0; i < this.player1.length; i++) {
                colNum = col_list.indexOf(this.player1[i].attr("col"));
                rowNum = this.player1[i].attr("row")-1;
                for (var j = -1; j < 2; j++) {    // for rows
                    for (var k = -1; k < 2; k++) {    //for columns
                        var selectDiv = array_list[rowNum + j][colNum + k];
                        if (selectDiv.hasClass("white-disc") || selectDiv.hasClass("black-disc")) {
                            continue;
                        }
                        else {
                            for (var w = 0; w < this.player2.length; w++) {
                                this.horizontal(w, selectDiv, this.player2, "black-disc");
                                this.vertical(w, selectDiv, this.player2, "black-disc");
                                this.diagonal(w, selectDiv, this.player2, "black-disc","white-disc");
                            }
                        }
                    }
                }
            }
        }
        for(var i=0; i<self.legal_moves_array.length; i++){
         console.log("i: ",self.legal_moves_array[i]);
            self.legal_moves_array[i].addClass("blue");
        }
    };

    this.horizontal = function (playerIndex, selectDiv, playerArray, disc_color) {
        if (playerArray[playerIndex].attr("row") === selectDiv.attr("row")) {
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
                    if (!array_list[selectDiv.attr("row") - 1][c + t].hasClass(disc_color)) {
                        break;
                    }
                    else if (array_list[selectDiv.attr("row") - 1][c + t].hasClass(disc_color) && t === (col_diff-1)) {
                        this.legal_moves_array.push(selectDiv);
                        console.log("horizontal:" ,selectDiv);
                    }
                }
            }
        }
    };

    this.vertical = function (playerIndex, selectDiv, playerArray, disc_color) {
        if (playerArray[playerIndex].attr("col") === selectDiv.attr("col")) {
            var r = selectDiv.attr("row") - 1;
            var c = col_list.indexOf(selectDiv.attr("col"));
            if (r > playerArray[playerIndex].attr("row") - 1) {
                r = playerArray[playerIndex].attr("row") - 1;
            }
            var row_diff = Math.abs(playerArray[playerIndex].attr("row") - selectDiv.attr("row"));
            // console.log("col_diff: " + col_diff);
            if (row_diff > 1) {
                for (var t = 1; t < row_diff; t++) {
                    if (!array_list[r + t][c].hasClass(disc_color)) {
                        break;
                    }
                    else if (array_list[r + t][c].hasClass(disc_color) && (t === row_diff - 1)) {
                        this.legal_moves_array.push(selectDiv);
                        console.log("vertical:" ,selectDiv);
                    }
                }
            }
        }
    };

    this.diagonal = function (playerIndex, selectDiv, playerArray, disc_color, this_color) {
        var r = selectDiv.attr("row") - 1;
        var c = col_list.indexOf(selectDiv.attr("col"));
        var check_class = selectDiv.attr("class");
        console.log("check class: ", check_class);
        console.log("check class: ", selectDiv);
        // var diag_directions = [[-1,-1],[1,-1],[-1,1],[1,1]];
        var diag = [[-1,-1],[1,-1],[-1,1],[1,1]];
        var temp_diag_directions = [[-1,-1],[1,-1],[-1,1],[1,1]];
        console.log("diag_directions: " , diag)
        for(var i=0; i<diag.length; i++){
            var var1 = diag[i][0];
            var var2 = diag[i][1];
            var check = array_list[diag[i][1] + r] [diag[i][0] + c];
            if(check.hasClass(disc_color)){
                temp_diag_directions = [[-1,-1],[1,-1],[-1,1],[1,1]];

                //found adjacent opposite color
                // temp_diag_directions = diag.slice();
                while(check.hasClass(disc_color)){
                    temp_diag_directions[i][0] += var1;
                    temp_diag_directions[i][1] += var2;
                    check = array_list[r + temp_diag_directions[i][1]] [c + temp_diag_directions[i][0]];
                    // check = array_list[r+diag[i][1]][c+diag[i][0]];
                    if(check.hasClass(this_color)){
                        // debugger;
                        this.legal_moves_array.push(selectDiv);
                        // console.log("diagonal:" ,selectDiv);
                        break;
                    }
                }
            }
        }


        //
        //
        // for (var i = 2; i < 8; i++) {
        //     if ((selectDiv.attr("row") + i) === playerArray[playerIndex].attr("row") && (col_list.indexOf(selectDiv.attr("col")) + i) === col_list.indexOf(playerArray[playerIndex].attr("col"))) {
        //         for (var j = 1; j < i; j++) {
        //             if (!array_list[r + j][c + j].hasClass(disc_color)) {
        //                 break;
        //             }
        //             else if (array_list[r + j][c + j].hasClass(disc_color) && (j=== i - 1)){
        //                 this.legal_moves_array.push(selectDiv);
        //                 console.log(selectDiv);
        //                 break;
        //             }
        //         }
        //     }
        //     if ((selectDiv.attr("row") - i) === playerArray[playerIndex].attr("row") && (col_list.indexOf(selectDiv.attr("col")) + i) === col_list.indexOf(playerArray[playerIndex].attr("col"))) {
        //         for (var j = 1; j < i; j++) {
        //             if (!array_list[r - j][c + j].hasClass(disc_color)) {
        //                 break;
        //             }
        //             else if (array_list[r - j][c + j].hasClass(disc_color) && (j=== i - 1)) {
        //                 this.legal_moves_array.push(selectDiv);
        //                 console.log(selectDiv);
        //                 break;
        //             }
        //         }
        //     }
        //     if (selectDiv.attr("row") + i === playerArray[playerIndex].attr("row") && col_list.indexOf(selectDiv.attr("col")) - i === col_list.indexOf(playerArray[playerIndex].attr("col"))) {
        //         for (var j = 1; j < i; j++) {
        //             if (!array_list[r + j][c - j].hasClass(disc_color)) {
        //                 break;
        //             }
        //             else if (array_list[r + j][c - j].hasClass(disc_color) && (j=== i - 1)) {
        //                 this.legal_moves_array.push(selectDiv);
        //                 console.log(selectDiv);
        //                 break;
        //             }
        //         }
        //     }
        //     if (selectDiv.attr("row") - i === playerArray[playerIndex].attr("row") && col_list.indexOf(selectDiv.attr("col")) - i === col_list.indexOf(playerArray[playerIndex].attr("col"))) {
        //         for (var j = 1; j < i; j++) {
        //             if (!array_list[r - j][c - j].hasClass(disc_color)) {
        //                 break;
        //             }
        //             else if (array_list[r - j][c - j].hasClass(disc_color) && (j=== i - 1)) {
        //                 this.legal_moves_array.push(selectDiv);
        //                 console.log(selectDiv);
        //                 break;
        //             }
        //         }
        //     }
        // }
    };

    this.clickHandler = function () {
        //if(this) isn't in the array: dont do this function
        var bool = false;
        var x = $(this).attr("col");
        var y = $(this).attr("row");
        var indexofcol = col_list.indexOf(x);
        for (var i = 0; i < self.legal_moves_array.length; i++) {
            if (self.legal_moves_array[i].attr("row") == y && self.legal_moves_array[i].attr("col") == x) {
                bool = true;
            }
        }
        if (bool) {
            console.log("click is working");
            if (self.turn == self.player_list[0]) { // player 1's turn
                $(this).addClass("black-disc");
                self.player1.push($(this));
                self.flip($(this), "black-disc", "white-disc",indexofcol, y-1);
                self.turn = self.player_list[1];
                self.legalMoves(1);
            }
            else {
                $(this).addClass("white-disc");
                self.flip($(this), "white-disc", "black-disc",indexofcol, y-1);
                self.player2.push($(this));
                self.turn = self.player_list[0];
                self.legalMoves(0);
            }
            $(this).off("click");

        }
        self.symbolAppear();
        self.displayDiscs();
    };

    //
    // this.hover//for legal moves
    //             //show which discs would flip
    //
    //
    //
    //
    this.flip = function (inputDiv, color, color_to_replace,x, y) {
        // var i=1;
        console.log("inputDiv: ",inputDiv);
        console.log("x: ",x);
        console.log("y: ",y);
        var directions = [[-1,-1], [0,-1],[1,-1], [-1,0],[1,0], [-1,1],[0,1], [1,1]];
        var temp_directions = [[-1,-1], [0,-1],[1,-1], [-1,0],[1,0], [-1,1],[0,1], [1,1]];
        var arrayOfFlips = [];
        for(var j=0; j<directions.length; j++){
            var path = [];
            var brian = array_list[y + directions[j][1]] [x + directions[j][0]] ;
            console.log("brian: ", brian);
            if(brian.hasClass(color_to_replace)){
                temp_directions = directions.slice();
                while(brian.hasClass(color_to_replace)){
                    path.push(brian);
                    temp_directions[j][0] += directions[j][0];
                    temp_directions[j][1] += directions[j][1];
                    brian = array_list[y + temp_directions[j][1]] [x + temp_directions[j][0]];
                    if(brian.hasClass(color)){
                        arrayOfFlips = arrayOfFlips.concat(path);
                    }
                }
            }
        }
        for (var i = 0; i < arrayOfFlips.length; i++) {
            // array_list.indexOf(arrayOfFlips[i]);
            if(color === "black-disc"){
                var indexToRemove = this.player2.indexOf(arrayOfFlips[i]);
                this.player2.splice(indexToRemove,1);
                this.player1.push(arrayOfFlips[i]);
            }
            else{
                var indexToRemove = this.player1.indexOf(arrayOfFlips[i]);
                this.player1.splice(indexToRemove,1);
                this.player2.push(arrayOfFlips[i]);
            }
            // array_list.splice(indexToRemove, 1);
            arrayOfFlips[i].removeClass("white-disc black-disc");
            arrayOfFlips[i].addClass(color);
        }
    };

    this.symbolAppear = function(){
        var goodImg = $("#jedi-on");
        var badImg = $("#sith-on");

        if (self.turn == self.player_list[1]){
            $(goodImg).removeClass("hiddenClass");
            console.log("sith step down");
            $(badImg).addClass("hiddenClass");
            console.log("jedi's turn");
        } else if (self.turn == self.player_list[0]){
            $(badImg).removeClass("hiddenClass");
            console.log("jedi step down");
            $(goodImg).addClass("hiddenClass");
            console.log("sith's turn");
        }
    };

    this.gameOVer = function(){
        this.resetAll();
    };

    this.displayDiscs = function(){
        $(".player1-value").html(this.player1.length);
        $(".player2-value").html(this.player2.length);
    };

    this.resetAll = function(){
        console.log("reset is being clicked");
        this.turn = null;
        this.num_black = null;
        this.num_white = null;
        this.winner = null;
    }
    //some parameters
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
}