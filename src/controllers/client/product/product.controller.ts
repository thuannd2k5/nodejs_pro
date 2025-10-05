import { Request, Response } from "express";
import { addProductToCart, getProductById, getProductInCart, handlerPlaceOrder, postDeleteProductInCartById, updateCartDetailBeforeCheckout } from "services/client/item.service";

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

    const cartId = cartDetails.length ? cartDetails[0].cartId : 0;
    res.render("client/product/cart", {
        cartDetails, totalPrice, cartId
    })
}

const postDeleteProductInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (user) {
        await postDeleteProductInCartById(+id, user.id, user.sumCart);
    } else {
        return res.redirect("/login")
    }
    return res.redirect("/cart")
}

const getCheckoutPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/login")
    }

    const cartDetails = await getProductInCart(user.id);

    const totalPrice = cartDetails?.map(item => +item.price * +item.quantity)
        ?.reduce((a, b) => a + b, 0)
    res.render("client/product/checkout", {
        cartDetails, totalPrice
    })
}

const postHandleCartToCheckout = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) return res.redirect("/login")

    const { cartId } = req.body;
    const currentCartDetail: { id: string; quantity: string }[]
        = req.body?.cartDetails ?? [];

    await updateCartDetailBeforeCheckout(currentCartDetail, cartId);


    return res.redirect("/checkout")
}

const postPlaceOrder = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) return res.redirect("/login")
    const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;
    await handlerPlaceOrder(user.id, receiverName, receiverAddress, receiverPhone, +totalPrice);
    return res.redirect('/thanks')
}

const getThanksPage = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) return res.redirect("/login")

    return res.render('client/product/thanks')
}


const postAddToCartFromDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    if (!user) return res.redirect("/login")

    await addProductToCart(+quantity, +id, user);
    return res.redirect(`/product/${id}`)
}

export {
    getProductDetail, postAddProductToCart, getCartPage, postDeleteProductInCart,
    getCheckoutPage, postHandleCartToCheckout, postPlaceOrder, getThanksPage, postAddToCartFromDetailPage
}