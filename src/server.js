// Não temos acesso ao document, ja uqe sao apis do browser. Aqui vamos usar Rest APIs
// Para importar pacotes com o ESModules (import tanana from tanana), precisamos colocar um type: module no package.json.
// Caso contrário temos q importar usando CommonJS, exemplo abaixo
// const http = require('http');

// node: na frente do modulo interno do node
import http from 'node:http';

// GET => Buscar infos
// POST => Criar um recurso
// PUT => Atualizar um recurso no back-end (varios campos ao mesmo tempo)
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deleta um recurso no back-end

// A Aplicação é StateFull, até que alguem pare o processo. Por isso os dados ficam salvos na memória.

// Headers => Informações adicionais para a requisição (metadados)

const users = [];

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    const buffers = [];

    for await ( const chunck of req ) {
        buffers.push(chunck);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (e) {
        req.body = null;
    }

    if(method === 'GET' && url === '/users') {
        // res.setHeader('Content-Type', 'application/json') -> estamos falando qual o tipo de conteudo que estamos retornando
        return res
        .setHeader('Content-Type', 'application/json') 
        .end(JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        users.push({
            id: 1,
            name,
            email
        });

        // 201 => Request succeeded and new resource has been created
        return res
        .writeHead(201)
        .end();
    }
    
    return res
    .writeHead(404)
    .end();
});

server.listen(3333);