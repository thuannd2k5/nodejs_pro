import { Request, Response } from "express";
import { getAllUsers } from "services/user.service";


const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render("admin/user/show", {
        users: users
    })
}

export { getAdminUserPage }