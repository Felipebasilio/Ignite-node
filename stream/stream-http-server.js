import http from 'node:http';
import { Transform } from 'node:stream';

// Lembrando: todas as portas de entrade e de saída do Node SÂO STREAMS, inclusive o req e o res:
// req -> Readable Stream
// res -> Writable Stream

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = Number(chunk.toString());
        const inverse = number * -1;

        console.log(inverse)

        const buf = Buffer.from(`${inverse}`)

        // O primeiro paramtro do call back é o erro, caso exista
        callback(null, buf);
    }
}

const server = http.createServer(async (req, res) => {
    // Como esperar todos os dados chegarem antes de processar?
    const buffers = [];

    for await ( const chunck of req ) {
        buffers.push(chunck);
    }

    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    return res.end(fullStreamContent);

    // return req
    // .pipe(new InverseNumberStream())
    // .pipe(res);
});

server.listen(3334);