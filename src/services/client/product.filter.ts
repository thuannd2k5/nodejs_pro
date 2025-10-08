import { prisma } from "config/client";



const getProductWithFilter = async (
    page: number,
    pageSize: number,
    factory: string,
    target: string,
    price: string,
    sort: string
) => {
    // Build where query
    let whereClause: any = {};

    // Filter by factory
    if (factory) {
        const factoryInput = factory.split(",");
        whereClause.factory = {
            in: factoryInput
        };
    }

    // Filter by target (mục đích sử dụng)
    if (target) {
        const targetInput = target.split(",");
        whereClause.target = {
            in: targetInput
        };
    }

    // Filter by price
    if (price) {
        const priceInput = price.split(",");

        const priceCondition = [];

        for (let i = 0; i < priceInput.length; i++) {
            if (priceInput[i] === "duoi-10-trieu") {
                priceCondition.push({ "price": { "lt": 10000000 } })
            }
            if (priceInput[i] === "10-15-trieu") {
                priceCondition.push({
                    "price": {
                        "gte": 10000000,
                        "lte": 15000000
                    }
                })
            }
            if (priceInput[i] === "15-20-trieu") {
                priceCondition.push({
                    "price": {
                        "gte": 15000000,
                        "lte": 20000000
                    }
                })
            }
            if (priceInput[i] === "tren-20-trieu") {
                priceCondition.push({ "price": { "gt": 20000000 } })
            }
        }

        whereClause.OR = priceCondition;
    }

    // Build order by
    let orderByClause: any = {};
    if (sort === "asc") {
        orderByClause = {
            price: "asc"
        }
    }

    if (sort === "desc") {
        orderByClause = {
            price: "desc"
        }
    }

    // Lấy dữ liệu từ DB, ví dụ với Prisma
    const [products, count] = await prisma.$transaction([
        prisma.product.findMany({
            where: whereClause,
            orderBy: orderByClause,
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.product.count({
            where: whereClause
        })
    ]);

    const totalPages = Math.ceil(count / pageSize);

    return { products, totalPages }

};


export { getProductWithFilter }