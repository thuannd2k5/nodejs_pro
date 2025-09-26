import { Request, Response } from "express";


const getAdminProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/show")
}


const getCreateAdminProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/create")
}

const postCreateAdminProduct = async (req: Request, res: Response) => {
    const { name } = req.body;
    return res.redirect("/admin/product");
}

export { getAdminProductPage, getCreateAdminProductPage, postCreateAdminProduct }