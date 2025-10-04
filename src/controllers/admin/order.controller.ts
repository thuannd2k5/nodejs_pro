import { Request, Response } from "express";
import { getAllOrder } from "services/admin/order.service";


const getAdminOrderPage = async (req: Request, res: Response) => {

    const orderList = await getAllOrder();
    return res.render("admin/order/show", {
        orderList,
    })
}

export { getAdminOrderPage }