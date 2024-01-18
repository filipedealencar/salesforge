import { connect } from "../_database";
import { BadRequestError } from "../helpers/api-erros";
import { Sale } from "../types/Sale";

export const insertSale = async (sale: Sale) => {
  const client = await connect();

  try {
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
  } catch (error) {
    console.error("Erro ao inserir venda:", error);
    throw error; // Lançar novamente o erro para quem chama a função
  } finally {
    client.release();
  }
};

export const selectSales = async (params: {
  offset: number;
  limit: number;
  idBandeiraCartao?: number;
  idAdquirente?: number;
  dataVenda?: string;
}) => {
  const client = await connect();

  try {
    let sql = `
      SELECT * FROM Vendas
      WHERE 1=1
    `;
    let countSql = `
      SELECT COUNT(*) FROM Vendas WHERE 1=1
    `;

    const values: any[] = [];
    const countValues: any[] = [];

    if (params?.idBandeiraCartao !== undefined) {
      sql += ` AND id_bandeira_cartao = $${values.length + 1}`;
      countSql += ` AND id_bandeira_cartao = $${countValues.length + 1}`;
      values.push(params.idBandeiraCartao);
      countValues.push(params.idBandeiraCartao);
    }

    if (params?.idAdquirente !== undefined) {
      sql += ` AND id_adquirente = $${values.length + 1}`;
      countSql += ` AND id_adquirente = $${countValues.length + 1}`;
      values.push(params.idAdquirente);
      countValues.push(params.idAdquirente);
    }

    if (params?.dataVenda !== undefined) {
      sql += ` AND data_venda = $${values.length + 1}`;
      countSql += ` AND data_venda = $${countValues.length + 1}`;
      values.push(params.dataVenda);
      countValues.push(params.dataVenda);
    }

    sql += `
      ORDER BY id_venda
      OFFSET $${values.length + 1}
      LIMIT $${values.length + 2};
    `;

    values.push(params.offset, params.limit);

    const result = await client.query(sql, values);
    const count = await client.query(countSql, countValues);

    return { result: result.rows, count: count.rows[0].count };
  } catch (error) {
    throw new BadRequestError(`Erro na consulta de vendas: ${error}`);
  } finally {
    client.release();
  }
};
