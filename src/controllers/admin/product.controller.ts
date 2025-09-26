import { Request, Response } from "express";
import { getAllProduct, handleCreateProduct } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/Product.schema";


const getAdminProductPage = async (req: Request, res: Response) => {
    const productList = await getAllProduct();
    return res.render("admin/product/show", { productList })
}


const getCreateAdminProductPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",

    }
    return res.render("admin/product/create", {
        errors, oldData
    })
}

const postCreateAdminProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    const oldData = { name, price, detailDesc, shortDesc, quantity }
    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`)
        return res.render("admin/product/create", {
            errors, oldData
        })
    }

    const image = req?.file?.filename ?? null;
    await handleCreateProduct(name, +price, detailDesc, shortDesc, +quantity, factory, target, image);

    return res.redirect("/admin/product");
}

export { getAdminProductPage, getCreateAdminProductPage, postCreateAdminProduct }