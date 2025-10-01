import { Request, Response } from "express";
import { addProductToCart, getProductById } from "services/client/item.service";

const getProductDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const products = await getProductById(+id);
    return res.render("client/product/detail", {
        products
    })
}

const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (user) {
        await addProductToCart(1, +id, user)
    } else {
        return res.redirect("/login")
    }


    return res.redirect("/")
}

export { getProductDetail, postAddProductToCart }