import { Request, Response } from "express";


const getAdminProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/show")
}

export { getAdminProductPage }