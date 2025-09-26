import { Request, Response } from "express";
import { ProductSchema, TProductSchema } from "src/validation/Product.schema";


const getAdminProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/show")
}


const getCreateAdminProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/create")
}

const postCreateAdminProduct = async (req: Request, res: Response) => {
    const { name } = req.body as TProductSchema;
    try {
        const result = ProductSchema.parse(req.body);
        console.log("run oke ", result)
    } catch (error) {
        console.log(error)
    }
    return res.redirect("/admin/product");
}

export { getAdminProductPage, getCreateAdminProductPage, postCreateAdminProduct }