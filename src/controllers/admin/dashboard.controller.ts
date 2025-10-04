import { Request, Response } from "express";
import { getOrderDetailAdmin, getOrderHistoryAdmin } from "services/admin/order.service";


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

const getAminOrderHistory = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/login");
    }
    const orderHistory = await getOrderHistoryAdmin(user.id);

    return res.render("client/product/history", {
        orderHistory
    })
}

export { getDashboardPage, getAdminOrderDetailPage, getAminOrderHistory }

