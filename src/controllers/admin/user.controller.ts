import { Request, Response } from "express";
import { countTotalUserPages, getAllUsers } from "services/user.service";


const getAdminUserPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) {
        currentPage = 1;
    }

    const users = await getAllUsers(currentPage);

    const totalPages = await countTotalUserPages();
    return res.render("admin/user/show", {
        users: users,
        totalPages: +totalPages,
        page: +page
    })
}

export { getAdminUserPage }