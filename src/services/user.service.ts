import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";

import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds)
}


const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string,
    phone: string,
    avatar: string
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
            phone: phone
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
    fullName: string,
    email: string,
    address: string,
    id: string
) => {
    const updateUser = await prisma.user.update({
        where: {
            id: Number(id),
        },
        data: {
            fullname: fullName,
            username: email,
            address: address,
            accountType: "USER",
            password: "123456",

        },
    })

    return updateUser;
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();

    return users;
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();

    return roles;
}

export {
    handleCreateUser, getAllUsers, handleDeleteUser, getUserById,
    handleUpdateUser, getAllRoles, hashPassword
}