import { Request, Response } from "express";
import { countTotalOrderPages, getAllOrder } from "services/admin/order.service";


const getAdminOrderPage = async (req: Request, res: Response) => {

    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) {
        currentPage = 1;
    }
    const totalPages = await countTotalOrderPages();
    const orderList = await getAllOrder(currentPage);
    return res.render("admin/order/show", {
        orderList,
        totalPages: + totalPages,
        page: +currentPage
    })

}

export { getAdminOrderPage }