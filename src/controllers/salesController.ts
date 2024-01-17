import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";

import { insertSale, selectSales } from "../models/salesModel";

export class SalesControllers {
  getSales = async (req: Request, res: Response) => {
    selectSales()
      .then((sales: any) => {
        return res.json(sales);
      })
      .catch((erro: BadRequestError) => {
        return res.status(400).json({
          error: true,
          message: `Error ${res.statusCode}: (${erro}) Nenhum dado foi retornado`,
        });
      });
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
