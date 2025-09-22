import { Request, Response } from "express";


const getAdminOrderPage = async (req: Request, res: Response) => {
    return res.render("admin/order/show")
}

export { getAdminOrderPage }