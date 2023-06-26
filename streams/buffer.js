// Buffer é uma representação do estado da memória do computador. É um pedaço de memória alocado para que possamos manipular dados binários.
// o Buffer é bem performático, pois ele é manipulado diretamente na memória do computador.

const buf = Buffer.from('Olá mundo ');

console.log(buf.toJSON());