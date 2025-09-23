import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();


    if (countUser === 0) {
        const defaultPassword = await hashPassword("123456");
        await prisma.user.createMany({
            data: [
                {
                    fullname: "ducthuan",
                    username: "ndthuan@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                },
                {
                    fullname: "ADMIN",
                    username: "thuan@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                },
                {
                    username: "thuannd@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                }
            ]
        })
    } else if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền"
                },
                {
                    name: "USER",
                    description: "User thông thường"
                }
            ]
        })
    }

    else {
        console.log("already init data")
    }

}

export default initDatabase;