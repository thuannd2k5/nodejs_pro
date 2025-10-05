import { Request, Response } from "express";
import { countTotalProductClientPages, getProduct } from "services/client/item.service";
import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, handleUpdateUser } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;

    if (currentPage <= 0) {
        currentPage = 1;
    }
    const totalPages = await countTotalProductClientPages(8);

    const products = await getProduct(currentPage, 8);

    return res.render("client/home/show", {
        products,
        totalPages: +totalPages,
        page: +currentPage
    })
}

const getProductFilterPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;

    if (currentPage <= 0) currentPage = 1;

    const totalPages = await countTotalProductClientPages(6);

    const products = await getProduct(currentPage, 6);

    return res.render("client/product/filter", {
        products,
        totalPages: +totalPages,
        page: +currentPage
    })
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create", {
        roles: roles
    })
}

const postCreateUserPage = async (req: Request, res: Response) => {

    const { fullName, username, phone, role, address } = req.body;

    const file = req.file;
    const avatar = file?.filename ?? null;
    //handle create user
    await handleCreateUser(fullName, username, address, phone, avatar, role);

    return res.redirect("/admin")
}

const postDeleteUserPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/admin/user")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    const roles = await getAllRoles();
    return res.render("admin/user/detail", {
        user: user,
        roles
    })
}


const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, username, phone, role, address } = req.body;

    const file = req.file;
    const avatar = file?.filename ?? undefined;

    await handleUpdateUser(id, fullName, phone, role, avatar, address);

    return res.redirect("/admin/user")
}

export {
    getHomePage, getCreateUserPage, getProductFilterPage,
    postCreateUserPage, postDeleteUserPage, getViewUser, postUpdateUser
};