import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";

import { insertSale, selectSales } from "../models/salesModel";

export class SalesControllers {
  getSales = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const idBandeiraCartao =
        parseInt(req.query.idFlagCard as string) || undefined;
      const idAdquirente =
        parseInt(req.query.idAdquirente as string) || undefined;
      const dataVenda = (req.query.dataVenda as string) || undefined;

      const offset = (page - 1) * pageSize;

      const sales = await selectSales({
        offset,
        limit: pageSize,
        dataVenda,
        idAdquirente,
        idBandeiraCartao,
      });

      return res.json({
        data: sales?.result ?? [],
        pageInfo: {
          currentPage: page,
          pageSize: pageSize,
          totalPages: Math.ceil(Number(sales?.count ?? 0) / pageSize),
          totalItems: Number(sales?.count ?? 0),
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
