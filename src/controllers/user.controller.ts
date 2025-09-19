import { Request, Response } from "express";
import { getAllUsers, getUserById, handleCreateUser, handleDeleteUser } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    //get Users 
    const users = await getAllUsers();
    return res.render("home", {
        users: users,
    })
}
const getCreateUserPage = (req: Request, res: Response) => {

    return res.render("create-user")
}

const postCreateUserPage = async (req: Request, res: Response) => {

    const { fullName, email, address } = req.body;

    //handle create user
    await handleCreateUser(fullName, email, address);

    return res.redirect("/")
}

const postDeleteUserPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(">>> check id: ", id);
    const user = await getUserById(id);
    console.log(">>> check user: ", user);
    return res.render("view-user", {
        user: user
    })
}


export {
    getHomePage, getCreateUserPage,
    postCreateUserPage, postDeleteUserPage, getViewUser
};