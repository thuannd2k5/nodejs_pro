import { prisma } from "config/client";
import { getConnection } from "config/database"


const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string) => {



    const newUser = await prisma.user.create({
        data: {
            name: fullName,
            email: email,
            address: address
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
            name: fullName,
            email: email,
            address: address
        },
    })

    return updateUser;
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();

    return users;
}

export {
    handleCreateUser, getAllUsers, handleDeleteUser, getUserById,
    handleUpdateUser
}