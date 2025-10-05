import { prisma } from "config/client";
import { TOTAL_ITEMS_PER_PAGE } from "config/constant";


const handleCreateProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image: string
) => {
    const newProduct = await prisma.product.create({
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...(image && { image: image })
        }
    })
    return newProduct;
}

const getAllProduct = async (page: number) => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const skip = (page - 1) * pageSize

    const product = await prisma.product.findMany({
        skip: skip,
        take: pageSize,
    });

    return product;
}

const countTotalProductPages = async () => {

    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.product.count();

    const totalPages = Math.ceil(totalItems / pageSize);

    return totalPages;
}

const getProductById = async (
    id: number
) => {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
}

const postDeleteProductById = async (
    id: string
) => {
    const product = await prisma.product.delete({ where: { id: +id } });
    return product;
}

const handleUpdateProduct = async (
    id: number,
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image: string,

) => {
    const updateProduct = await prisma.product.update({
        where: {
            id
        },
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...(image !== undefined && { image: image })

        },
    })

    return updateProduct;
}

export {
    handleCreateProduct, getAllProduct, countTotalProductPages,
    getProductById, postDeleteProductById, handleUpdateProduct
}