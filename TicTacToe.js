"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
function Table(position_table) {
    console.log("\n    ".concat(position_table[0], " | ").concat(position_table[1], " | ").concat(position_table[2], "\n    ---------\n    ").concat(position_table[3], " | ").concat(position_table[4], " | ").concat(position_table[5], "\n    ---------\n    ").concat(position_table[6], " | ").concat(position_table[7], " | ").concat(position_table[8], "\n    "));
}
function Victory(position_table, player) {
    var victory = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6] //8 formas de vencer
    ];
    return victory.some(function (condition) {
        return condition.every(function (index) { return position_table[index] === player; });
    });
}
function Draw(position_table) {
    return position_table.every(function (host) { return host !== ' '; });
}
function play() {
    var position_table = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    var turnplayer = true;
    var winner = null;
    //Pegar dados no prompt
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    function playTurn() {
        if (winner || Draw(position_table)) {
            rl.close();
            Table(position_table);
            if (winner) {
                console.log("Jogador ".concat(winner, " venceu!"));
            }
            else {
                console.log('O jogo empatou!');
            }
            return;
        }
        Table(position_table);
        var player = turnplayer ? 'X' : 'O';
        console.log("Jogador ".concat(player, ", \u00E9 a sua vez!"));
        rl.question('Escolha uma posição (1-9): ', function (chooseStr) {
            var choose = parseInt(chooseStr) - 1;
            if (isNaN(choose) || choose < 0 || choose > 8 || position_table[choose] !== ' ') {
                console.log('Posição inválida ou já ocupada! Tente novamente.');
                playTurn();
                return;
            }
            position_table[choose] = player;
            if (Victory(position_table, player)) {
                winner = player;
            }
            turnplayer = !turnplayer;
            playTurn();
        });
    }
    playTurn();
}
play();
