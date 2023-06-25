// middleware são interceptadores
// sempre recebem o req e o res

export async function json(req, res) {
    const buffers = [];

    for await ( const chunck of req ) {
        buffers.push(chunck);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (e) {
        req.body = null;
    }
    
    // res.setHeader('Content-Type', 'application/json') -> estamos falando qual o tipo de conteudo que estamos retornando
    res.setHeader('Content-Type', 'application/json')
}