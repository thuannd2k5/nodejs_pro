import { prisma } from "config/client";

const getAllOrder = async () => {
    return await prisma.order.findMany({
        include: {
            user: true
        }
    });
}


const getOrderDetailAdmin = async (id: number) => {
    return await prisma.orderDetail.findMany({
        where: {
            orderId: id
        },
        include: {
            product: true,
        }
    })
}

const getOrderHistoryAdmin = async (id: number) => {
    return await prisma.order.findMany({
        where: {
            userId: id
        },
        include: {
            orderDetails: {
                include: {
                    product: true
                }
            }
        }
    })
}


export { getAllOrder, getOrderDetailAdmin, getOrderHistoryAdmin }
