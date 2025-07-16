import * as readline from 'readline';

//npm install --save-dev @types/node
//tsc --init

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function Forca(callback: (palavra: string, qtd_letras: number) => void): void {
    rl.question('Digite a palavra desejada: ', (palavra_digitada) => {
        console.clear();
        const qtd_letras = palavra_digitada.length;
        callback(palavra_digitada.toLowerCase(), qtd_letras); 
    });
}

function mostrarPalavra(palavra: string, letrasDescobertas: Set<string>): string {
    let resultado = '';
    for (const letra of palavra) {
        if (letrasDescobertas.has(letra)) {
            resultado += letra + ' ';
        } else {
            resultado += '_ ';
        }
    }
    return resultado.trim();
}

function ganhou(palavra: string, letrasDescobertas: Set<string>): boolean {
    for (const letra of palavra) {
        if (!letrasDescobertas.has(letra)) return false;
    }
    return true;
}

function jogar(palavra: string, maxErros: number): void {
    let erros = 0;
    const letrasDescobertas = new Set<string>();
    const letrasErradas = new Set<string>();

    function perguntar() {
        console.log('\nPalavra:', mostrarPalavra(palavra, letrasDescobertas));
        console.log(`Erros: ${erros} / ${maxErros}`);
        console.log('Letras erradas:', Array.from(letrasErradas).join(', ') || '...');

        rl.question('Digite uma letra: ', (input) => {
            const letra = input.toLowerCase();

            if (!letra.match(/^[a-z]$/)) {
                console.log('Digite apenas uma letra válida.');
                return perguntar();
            }
            if (letrasDescobertas.has(letra) || letrasErradas.has(letra)) {
                console.log('Você já tentou essa letra.');
                return perguntar();
            }

            if (palavra.includes(letra)) {
                letrasDescobertas.add(letra);
                console.log('Acertou!');

                if (ganhou(palavra, letrasDescobertas)) {
                    console.log(`\nParabéns! Você ganhou! A palavra era: ${palavra}`);
                    rl.close();
                    return;
                }
            } else {
                erros++;
                letrasErradas.add(letra);
                console.log('Errou!');

                if (erros >= maxErros) {
                    console.log(`\nVocê perdeu! A palavra era: ${palavra}`);
                    rl.close();
                    return;
                }
            }
            perguntar();
        });
    }

    perguntar();
}

function play(): void {
    Forca((palavra, qtd_letras) => {
        const maxErros = 6; 
        jogar(palavra, maxErros);
    });
}

play();
