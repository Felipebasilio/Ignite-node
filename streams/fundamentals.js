// Streams ->

// process.stdin
//     .pipe(process.stdout)

// Como construir streams do zero

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(`${i}\n`);

        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const inverse = number * -1;

    const buf = Buffer.from(`${inverse}`);

    // O primeiro paramtro do call back é o erro, caso exista
    callback(null, buf);
  }
}
class MultiplyByTenStream extends Writable {
  // chunk => pedaço que lemos da stream de leitura
  // encoding => como essa informação está codificada
  // callback => função que chamamos quando terminamos de processar o chunk
  _write(chunk, encoding, callback) {
    // Não retornamos na stream de write, apenas o processamos. Para transformar é outra stream
    const number = Number(chunk.toString() * 10);
    console.log(number);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
