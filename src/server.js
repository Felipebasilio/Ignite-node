// Não temos acesso ao document, ja uqe sao apis do browser. Aqui vamos usar Rest APIs
// Para importar pacotes com o ESModules (import tanana from tanana), precisamos colocar um type: module no package.json.
// Caso contrário temos q importar usando CommonJS, exemplo abaixo
// const http = require('http');

// node: na frente do modulo interno do node
import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

// UUID -> Universally Unique Identifier

// GET => Buscar infos
// POST => Criar um recurso
// PUT => Atualizar um recurso no back-end (varios campos ao mesmo tempo)
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deleta um recurso no back-end

// A Aplicação é StateFull, até que alguem pare o processo. Por isso os dados ficam salvos na memória.

// Headers => Informações adicionais para a requisição (metadados)

const database = new Database();

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    if(method === 'GET' && url === '/users') {
        const users = database.select('users');

        return res
        .end(JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        const user = {
            id: randomUUID(),
            name,
            email
        };

        database.insert('users', user);

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