import { prisma } from "config/client";
import { comparePassword } from "./user.service";
import jwt from "jsonwebtoken"
import "dotenv/config";



const handleGetAllUser = async () => {
    const user = await prisma.user.findMany();

    return user;
}

const handleGetUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return user;
}

const handleUpdateUserById = async (id: number, fullname: string, address: string, phone: string) => {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            fullname: fullname,
            address: address,
            phone: phone
        }
    });

}

const handleDeleteUserById = async (id: number) => {
    const user = await prisma.user.delete({
        where: {
            id: id
        }
    })

    return user;
}

const handleUserLogin = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { username: username }
    })

    if (!user) {
        //throw error
        throw new Error(`Username : ${username} not found`)
    }

    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error(`Invalid password`)
    }

    //có user login => định nghĩa access_token 
    const payload = {
        id: user.id,
        email: user.username,
        roleId: user.roleId,
        accountType: user.accountType,
        avatar: user.avatar,
    }
    const secret = process.env.JWT_SECRET
    const expiresIn: any = process.env.JWT_EXPIRES_IN;
    const access_token = jwt.sign(payload, secret, {
        expiresIn: expiresIn
    });

    return access_token;
}

export { handleGetAllUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleUserLogin }