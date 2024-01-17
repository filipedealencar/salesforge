import { Pool } from "pg";
import dotenv from "dotenv";

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

export const connect = async () => {
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
