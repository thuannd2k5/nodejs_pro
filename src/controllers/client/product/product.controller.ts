import { Request, Response } from "express";

const getProductDetail = async (req: Request, res: Response) => {

    return res.render("client/product/detail")
}

export { getProductDetail }