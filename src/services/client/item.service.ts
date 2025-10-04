import { prisma } from "config/client";

const getProduct = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductById = async (
    id: number
) => {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
}

const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })

    if (cart) {
        //cart update
        //cập nhật sum giỏ hàng
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity,
                }
            }
        })



        //cập nhật cart-detail
        //nếu chưa có tạo mới , nếu có rồi thì cập nhật quantity
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        })

        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity,
                },
            },
            create: {
                price: product.price,
                quantity: quantity,
                productId: productId,
                cartId: cart.id
            },
        })
    } else {
        //create
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetails: {
                    create: [
                        {
                            price: product.price,
                            quantity: quantity,
                            productId: productId
                        }
                    ]
                }
            }
        })
    }
}

const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: userId
        }
    })

    if (cart) {
        const currentCartDetail = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true
            }
        })

        return currentCartDetail;
    }
    return [];
}

const postDeleteProductInCartById = async (cartDetailId: number, userId: number, sumCart: number) => {
    //xóa cart-detail
    await prisma.cartDetail.delete({
        where: { id: cartDetailId }
    })

    if (sumCart === 1) {
        //delete cart
        await prisma.cart.delete({
            where: {
                userId
            }
        })
    } else {
        //update cart
        await prisma.cart.update({
            where: { userId },
            data: {
                sum: {
                    decrement: 1,
                }
            }
        })
    }
}

const updateCartDetailBeforeCheckout = async (data: { id: string; quantity: string }[]) => {
    for (let i = 0; i < data.length; i++) {
        await prisma.cartDetail.update({
            where: {
                id: (+data[i].id)
            },
            data: {
                quantity: +data[i].quantity
            }
        })
    }

}

const handlerPlaceOrder = async (
    userId: number,
    receiverName: string,
    receiverAddress: string,
    receiverPhone: string,
    totalPrice: number
) => {

    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            cartDetails: true
        }
    })
    if (cart) {
        //create order
        const dataOrderDetail = cart?.cartDetails?.map(
            item => ({
                price: item.price,
                quantity: item.quantity,
                productId: item.productId
            })
        ) ?? [];
        await prisma.order.create({
            data: {
                receiverName,
                receiverAddress,
                receiverPhone,
                paymentMethod: "Cod",
                paymentStatus: "payment_unpaid",
                status: "PENDING",
                totalPrice: totalPrice,
                userId,
                orderDetails: {
                    create: dataOrderDetail
                }
            }
        })
    }

    //remove cart detail + cart
    await prisma.cartDetail.deleteMany({
        where: { cartId: cart.id }
    })

    await prisma.cart.delete({
        where: { id: cart.id }
    })

}

export {
    getProduct, getProductById, addProductToCart, getProductInCart,
    postDeleteProductInCartById, updateCartDetailBeforeCheckout, handlerPlaceOrder
};