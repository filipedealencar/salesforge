import { connect } from "../_database";
import { BadRequestError } from "../helpers/api-erros";
import { Sale } from "../types/Sale";

export const insertSale = async (sale: Sale) => {
  const client = await connect();

  if (!sale.value || sale.value <= 0) {
    throw new BadRequestError("O valor da venda deve ser maior que zero.");
  }

  const sql = `
    INSERT INTO sales(value, card_number, adquirer_id, installments, card_brand_id, sale_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    sale.value,
    sale.cardNumber,
    sale.adquirerId,
    sale.installments,
    sale.cardBrandId,
    sale.saleDate,
  ];

  const result = await client.query(sql, values);
  return result.rows[0];
};

export const selectSales = async () => {
  const client = await connect();
  const result = await client.query("SELECT * FROM sales");
  return result.rows;
};
