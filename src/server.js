// Não temos acesso ao document, ja que são apis do browser. Aqui vamos usar Rest APIs
// Para importar pacotes com o ESModules (import tanana from tanana), precisamos colocar um type: module no package.json.
// Caso contrário temos q importar usando CommonJS, exemplo abaixo
// const http = require('http');

// node: na frente do modulo interno do node

// UUID => Universally Unique Identifier

// GET => Buscar infos
// POST => Criar um recurso
// PUT => Atualizar um recurso no back-end (varios campos ao mesmo tempo)
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deleta um recurso no back-end

// A Aplicação é StateFull, até que alguem pare o processo. Por isso os dados ficam salvos na memória.

// Headers => Informações adicionais para a requisição (metadados)

// Query Parameters => Paginação, filtros, ordenação : URL Statefull
// |-> http://localhost:3333/users?search=Diego&page=2&sort=name
// Route Parameters => Identificar um recurso na hora de atualizar ou deletar
// |-> http://localhost:3333/users/1
// Request Body => Envio de informações de um formulário (passam pelo HTTPS)
// |-> Não fica na URL, fica no corpo da requisição enviado a parte junto do body

import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    // Não quero mais executar um true ou false, quero executar a regex na minha url pra retornar quais os dados q a regex encontrou na rota
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
