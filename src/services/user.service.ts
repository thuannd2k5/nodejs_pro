import { prisma } from "config/client";
import { ACCOUNT_TYPE, TOTAL_ITEMS_PER_PAGE } from "config/constant";

import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds)
}


const comparePassword = async (plainText: string, password: string) => {
    return await bcrypt.compare(plainText, password);
}


const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string,
    phone: string,
    avatar: string,
    role: string
) => {

    const defaultPassword = await hashPassword("123456");
    const newUser = await prisma.user.create({
        data: {
            fullname: fullName,
            username: email,
            address: address,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
            roleId: +role
        }
    })
    return newUser;

}
const handleDeleteUser = async (
    id: string) => {

    //delete user db
    const deleteUser = await prisma.user.delete({
        where: {
            id: +id,
        },
    })
    return deleteUser;

}

const getUserById = async (
    id: string
) => {
    const user = await prisma.user.findUnique({ where: { id: +id } });
    return user;
}
const handleUpdateUser = async (
    id: string,
    fullName: string,
    phone: string,
    role: string,
    avatar: string,
    address: string,

) => {
    const updateUser = await prisma.user.update({
        where: {
            id: Number(id),
        },
        data: {
            fullname: fullName,
            address: address,
            roleId: +role,
            phone: phone,
            ...(avatar !== undefined && { avatar: avatar })

        },
    })

    return updateUser;
}

const getAllUsers = async (page: number) => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const skip = (page - 1) * pageSize
    const users = await prisma.user.findMany({
        skip: skip,
        take: pageSize,
    });

    return users;
}

const countTotalUserPages = async () => {

    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.user.count();

    const totalPages = Math.ceil(totalItems / pageSize);

    return totalPages;
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();

    return roles;
}

export {
    handleCreateUser, getAllUsers, handleDeleteUser, getUserById,
    handleUpdateUser, getAllRoles, hashPassword, comparePassword, countTotalUserPages
}