import { Request, Response } from "express";
import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, handleUpdateUser } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    //get Users 
    const users = await getAllUsers();
    return res.render("home", {
        users: users,
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
    await handleCreateUser(fullName, username, address, phone, avatar);

    return res.redirect("/admin")
}

const postDeleteUserPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.render("view-user", {
        user: user
    })
}


const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, email, address } = req.body;

    //handle update user
    await handleUpdateUser(fullName, email, address, id);

    return res.redirect("/")
}

export {
    getHomePage, getCreateUserPage,
    postCreateUserPage, postDeleteUserPage, getViewUser, postUpdateUser
};