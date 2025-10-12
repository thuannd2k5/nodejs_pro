import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"

const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {

    const path = req.path;
    const whiteList = [
        "/login"
    ]

    const isWhiteList = whiteList.some(route => route == path);

    if (isWhiteList) {
        next();
        return;
    }
    const token = req.headers['authorization']?.split(' ')[1];

    try {
        const dataDecoded: any = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id: dataDecoded.id,
            username: dataDecoded.email,
            password: "",
            address: "",
            fullname: "",
            phone: "",
            accountType: dataDecoded.accountType,
            avatar: dataDecoded.avatar,
            roleId: dataDecoded.roleId,
            role: dataDecoded.role
        }
        next();

    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            data: null,
            message: "Token ko hop le (Không truyền lên token hoặc token hết hạn)"
        })
    }



}

export {
    checkValidJWT
}