// Streams -> 

// process.stdin
//     .pipe(process.stdout)

// Como construir streams do zero

import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {

            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(`${i}\n`)

                this.push(buf)
            }
        }, 1000)
    }
}

new OneToHundredStream()
    .pipe(process.stdout)