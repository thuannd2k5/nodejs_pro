import { prisma } from "config/client";
import { TOTAL_ITEMS_PER_PAGE } from "config/constant";

const getAllOrder = async (page: number) => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const skip = (page - 1) * pageSize
    const order = prisma.order.findMany({
        skip: skip,
        take: pageSize,
        include: {
            user: true
        }
    });

    return order;
}

const countTotalOrderPages = async () => {

    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.order.count();
    const totalPages = Math.ceil(totalItems / pageSize);

    return totalPages;
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


export { getAllOrder, getOrderDetailAdmin, getOrderHistoryAdmin, countTotalOrderPages }
