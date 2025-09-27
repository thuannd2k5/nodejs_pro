import { Request, Response } from "express";
import { getProductById } from "services/client/item.service";

const getProductDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const products = await getProductById(+id);
    return res.render("client/product/detail", {
        products
    })
}

export { getProductDetail }