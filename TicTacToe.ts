import * as readline from 'readline';

//npm install --save-dev @types/node
//tsc --init

function Table(position_table: string[]): void {
    console.log(`
    ${position_table[0]} | ${position_table[1]} | ${position_table[2]}
    ---------
    ${position_table[3]} | ${position_table[4]} | ${position_table[5]}
    ---------
    ${position_table[6]} | ${position_table[7]} | ${position_table[8]}
    `);
}

function Victory(position_table: string[], player: string): boolean {
    const victory: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6] //8 formas de vencer
    ];

    return victory.some(condition => {
        return condition.every(index => position_table[index] === player);
    });
}

function Draw(position_table: string[]): boolean {
    return position_table.every(host => host !== ' ');
}

function play(): void {
    let position_table: string[] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let turnplayer: boolean = true;
    let winner: string | null = null;

    //Pegar dados no prompt
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function playTurn(): void {
        if (winner || Draw(position_table)) {
            rl.close();
            Table(position_table);
            if (winner) {
                console.log(`Jogador ${winner} venceu!`);
            } else {
                console.log('O jogo empatou!');
            }
            return;
        }

        Table(position_table);
        let player = turnplayer ? 'X' : 'O';
        console.log(`Jogador ${player}, é a sua vez!`);

        rl.question('Escolha uma posição (1-9): ', (chooseStr) => {
            let choose = parseInt(chooseStr) - 1;

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
