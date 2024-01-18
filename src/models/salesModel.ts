import { connect } from "../_database";
import { BadRequestError } from "../helpers/api-erros";
import { Sale } from "../types/Sale";

export const insertSale = async (sale: Sale) => {
  const client = await connect();

  if (!sale.valor || sale.valor <= 0) {
    throw new BadRequestError("O valor da venda deve ser maior que zero.");
  }

  const sql = `
    INSERT INTO vendas(valor, numero_cartao, id_adquirente, numero_parcelas, id_bandeira_cartao, data_venda)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    sale.valor,
    sale.numero_cartao,
    sale.id_adquirente,
    sale.numero_parcelas,
    sale.id_bandeira_cartao,
    sale.data_venda,
  ];

  const result = await client.query(sql, values);
  return result.rows[0];
};

export const selectSales = async (offset: number, limit: number) => {
  const client = await connect();
  const sql = `
  SELECT * FROM Vendas
  ORDER BY id_venda
  OFFSET $1
  LIMIT $2;
`;

  const result = await client.query(sql, [offset, limit]);
  const count = await client.query("SELECT COUNT(*) FROM Vendas;");
  return { result: result.rows, count: count.rows[0].count };
};
