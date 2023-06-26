import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select("users", search ? {
        name: search,
        email: search,
      } : null);

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      // 201 => Request succeeded and new resource has been created
      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const id = req.params.id;

      database.delete("users", id);

      // 204 -> deu certo mas não retorna conteúdo
      return res.writeHead(204).end();
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const id = req.params.id;
      const { name, email } = req.body;

      database.update("users", id, { name, email });

      // 204 -> deu certo mas não retorna conteúdo
      return res.writeHead(204).end();
    }
  }
];
