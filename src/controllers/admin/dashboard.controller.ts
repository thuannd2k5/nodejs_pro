import { Request, Response } from "express";
import { getOrderDetailAdmin } from "services/admin/order.service";


const getDashboardPage = async (req: Request, res: Response) => {
    return res.render("admin/dashboard/show")
}

const getAdminOrderDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const orderDetails = await getOrderDetailAdmin(+id);

    return res.render("admin/order/detail", {
        orderDetails, id
    })
}

export { getDashboardPage, getAdminOrderDetailPage }