var something;



$(document).ready(function(){
    generateSpots();
});
function generateSpots(){
    for (var i = 1; i < 9; i++) {
        $('#back-board').append('<div id="row' + i + '"></div>');
    }
    for(var k = 1; k < 9; k++){
        $("#row1").append("<div></div>");
        $("#row2").append("<div></div>");
        $("#row3").append("<div></div>");
        $("#row4").append("<div></div>");
        $("#row5").append("<div></div>");
        $("#row6").append("<div></div>");
        $("#row7").append("<div></div>");
        $("#row8").append("<div></div>");
    }
}
function Game(){
    

}
var gameObj = new Game();