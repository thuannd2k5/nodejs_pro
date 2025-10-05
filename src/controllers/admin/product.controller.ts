import { Request, Response } from "express";
import { countTotalProductPages, getAllProduct, getProductById, handleCreateProduct, handleUpdateProduct, postDeleteProductById } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/Product.schema";


const getAdminProductPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) {
        currentPage = 1;
    }
    const totalPages = await countTotalProductPages();
    const productList = await getAllProduct(currentPage);
    return res.render("admin/product/show", {
        productList,
        totalPages: +totalPages,
        page: +currentPage
    })
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

const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);

    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];
    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render("admin/product/view", {
        product, factoryOptions, targetOptions
    })
}
const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await postDeleteProductById(id);
    return res.redirect("/admin/product")
}


const postUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;

    const image = req?.file?.filename ?? undefined;

    await handleUpdateProduct(+id, name, +price, detailDesc, shortDesc, +quantity, factory, target, image);

    return res.redirect("/admin/product")
}

export {
    getAdminProductPage, getCreateAdminProductPage,

    postCreateAdminProduct, getViewProduct, postDeleteProduct, postUpdateProduct
}