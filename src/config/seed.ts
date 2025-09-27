import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    const countProduct = await prisma.product.count();
    if (countRole === 0) {
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


    if (countUser === 0) {
        const defaultPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst();
        if (adminRole)
            await prisma.user.createMany({
                data: [
                    {
                        fullname: "ducthuan",
                        username: "ndthuan@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                    {
                        fullname: "ADMIN",
                        username: "thuan@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                    {
                        username: "thuannd@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    }
                ]
            })
    }

    if (countProduct === 0) {
        const product = [
            {
                name: "LapTop Asus Tuf gaming",
                price: 12343000,
                detailDesc: "Asus TUF Gaming A15 được trang bị CPU AMD Ryzen™ 9 8945H và RAM DDR5 có dung lượng lên đến 32GB với tốc độ 5600MHz, cực kỳ nhanh.",
                shortDesc: "CPU AMD Ryzen™ 9 8945H và RAM DDR5",
                quantity: 100,
                sold: 0,
                factory: " ASUS",
                target: "Gaming",
                image: "asus-01.jpg"
            },
            {
                name: "LapTop Asus Tuf gaming",
                price: 12343000,
                detailDesc: "Asus TUF Gaming A15 được trang bị CPU AMD Ryzen™ 9 8945H và RAM DDR5 có dung lượng lên đến 32GB với tốc độ 5600MHz, cực kỳ nhanh.",
                shortDesc: "CPU AMD Ryzen™ 9 8945H và RAM DDR5",
                quantity: 100,
                sold: 0,
                factory: " ASUS",
                target: "Gaming",
                image: "asus-02.jpg"
            },
            {
                name: "LapTop Asus Tuf gaming",
                price: 12343000,
                detailDesc: "Asus TUF Gaming A15 được trang bị CPU AMD Ryzen™ 9 8945H và RAM DDR5 có dung lượng lên đến 32GB với tốc độ 5600MHz, cực kỳ nhanh.",
                shortDesc: "CPU AMD Ryzen™ 9 8945H và RAM DDR5",
                quantity: 100,
                sold: 0,
                factory: " ASUS",
                target: "Gaming",
                image: "asus-03.jpg"
            },
            {
                name: "LapTop Asus Tuf gaming",
                price: 12343000,
                detailDesc: "Asus TUF Gaming A15 được trang bị CPU AMD Ryzen™ 9 8945H và RAM DDR5 có dung lượng lên đến 32GB với tốc độ 5600MHz, cực kỳ nhanh.",
                shortDesc: "CPU AMD Ryzen™ 9 8945H và RAM DDR5",
                quantity: 100,
                sold: 0,
                factory: " ASUS",
                target: "Gaming",
                image: "asus-04.jpg"
            },
            {
                name: "LapTop Asus Tuf gaming",
                price: 12343000,
                detailDesc: "Asus TUF Gaming A15 được trang bị CPU AMD Ryzen™ 9 8945H và RAM DDR5 có dung lượng lên đến 32GB với tốc độ 5600MHz, cực kỳ nhanh.",
                shortDesc: "CPU AMD Ryzen™ 9 8945H và RAM DDR5",
                quantity: 100,
                sold: 0,
                factory: " ASUS",
                target: "Gaming",
                image: "asus-05.jpg"
            },
            {
                name: "LapTop Asus Tuf gaming",
                price: 12343000,
                detailDesc: "Asus TUF Gaming A15 được trang bị CPU AMD Ryzen™ 9 8945H và RAM DDR5 có dung lượng lên đến 32GB với tốc độ 5600MHz, cực kỳ nhanh.",
                shortDesc: "CPU AMD Ryzen™ 9 8945H và RAM DDR5",
                quantity: 100,
                sold: 0,
                factory: " ASUS",
                target: "Gaming",
                image: "asus-06.jpg"
            },
            {
                name: "LapTop Asus Tuf gaming",
                price: 12343000,
                detailDesc: "Asus TUF Gaming A15 được trang bị CPU AMD Ryzen™ 9 8945H và RAM DDR5 có dung lượng lên đến 32GB với tốc độ 5600MHz, cực kỳ nhanh.",
                shortDesc: "CPU AMD Ryzen™ 9 8945H và RAM DDR5",
                quantity: 100,
                sold: 0,
                factory: " ASUS",
                target: "Gaming",
                image: "asus-07.jpg"
            },
            {
                name: "LapTop Asus Tuf gaming",
                price: 12343000,
                detailDesc: "Asus TUF Gaming A15 được trang bị CPU AMD Ryzen™ 9 8945H và RAM DDR5 có dung lượng lên đến 32GB với tốc độ 5600MHz, cực kỳ nhanh.",
                shortDesc: "CPU AMD Ryzen™ 9 8945H và RAM DDR5",
                quantity: 100,
                sold: 0,
                factory: " ASUS",
                target: "Gaming",
                image: "asus-08.png"
            },

        ]
        await prisma.product.createMany({
            data: product
        })
    }

    if (countRole !== 0 && countUser !== 0 && countProduct !== 0) {
        console.log(">>>> Already init data")
    }

}

export default initDatabase;