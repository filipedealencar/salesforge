import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";

import { insertSale, selectSales } from "../models/salesModel";

export class SalesControllers {
  getSales = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1; // Página atual (padrão: 1)
      const pageSize = parseInt(req.query.pageSize as string) || 10; // Tamanho da página (padrão: 10)

      // Calcular o offset com base na página e tamanho da página
      const offset = (page - 1) * pageSize;

      const sales = await selectSales(offset, pageSize);

      return res.json({
        data: sales.result,
        pageInfo: {
          currentPage: page,
          pageSize: pageSize,
          totalItems: Number(sales.count), // Atualize isso para o número total real de itens na tabela
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: `Error 500: (${error}) Falha na consulta de vendas.`,
      });
    }
  };

  postSales = async (req: Request, res: Response) => {
    insertSale(req.body)
      .then(() => {
        return res.status(200).json({
          error: false,
          message: `Satus ${res.statusCode}: Dados cadastrados com sucesso`,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          message: `Error ${res.statusCode}: (${err}): Dados não cadastrados com sucesso`,
        });
      });
  };
}

export default SalesControllers;
