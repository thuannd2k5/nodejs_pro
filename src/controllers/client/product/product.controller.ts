import { Request, Response } from "express";
import { addProductToCart, getProductById, getProductInCart } from "services/client/item.service";

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


const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/login")
    }

    const cartDetails = await getProductInCart(user.id);

    const totalPrice = cartDetails?.map(item => +item.price * +item.quantity)
        ?.reduce((a, b) => a + b, 0)

    res.render("client/product/cart", {
        cartDetails, totalPrice
    })
}

export { getProductDetail, postAddProductToCart, getCartPage }