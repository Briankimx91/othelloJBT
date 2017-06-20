$(document).ready(createObj);

function createObj(){
    var gameObj = new Game();
    gameObj.init();
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


    this.init(){
        this.turn = this.player_list[0];
    }

    this.legalmoves(){


        return array; <-- if(array.length==0)
                            you suck func;
                            return;
    }

    this.clickhandler(){
        if this.turn = black
            then go white
        else
            go black
        flip();
    }



    this.hover//for legal moves
                //show which discs would flip




    this.flip(){ //some parameters

    }

    this.reset function(){
        this.turn = null;
        this.num_black =null;
        this.num_white = null;
        this.winner = null;

    }

}

