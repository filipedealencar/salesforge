import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const user = process.env.USER;
const host = process.env.HOST;
const database = process.env.DATABASE;
const password = String(process.env.PASSWORD);
const port = Number(process.env.PORT_DATABASE);

let pool: Pool;

declare global {
  var connection: Pool;
}

const connect = async () => {
  if (global.connection) return global.connection.connect();

  pool = new Pool({
    user,
    host,
    database,
    password,
    port,
  });

  try {
    const client = await pool.connect();
    console.log("Conexão bem-sucedida com o PostgreSQL!");

    const script = fs.readFileSync("schema-db.sql", "utf-8");
    await client.query(script);

    const result = await client.query(
      "SELECT to_regclass('public.vendas') AS table_exists"
    );
    if (result.rows[0].table_exists) {
      console.log("Tabela 'vendas' criada com sucesso!");
    } else {
      console.log("Erro ao criar a tabela 'vendas'.");
    }

    // Realize outras operações de teste, se necessário

    client.release();
    global.connection = pool;
    return pool.connect();
  } catch (error: any) {
    console.error("Erro ao conectar ao PostgreSQL:", error.message);
    throw error;
  }
};

export default connect;
