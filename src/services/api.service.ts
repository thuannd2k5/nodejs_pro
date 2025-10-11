import { prisma } from "config/client";

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

export { handleGetAllUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById }