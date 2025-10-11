import { Request, Response } from "express";
import { handleDeleteUserById, handleGetAllUser, handleGetUserById, handleUpdateUserById } from "services/api.service";
import { registerNewUser } from "services/auth/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/Register.schema";

const getAllUserApi = async (req: Request, res: Response) => {
    const user = await handleGetAllUser();
    res.status(200).json({
        data: user
    })
}

const getUserByIdAPI = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await handleGetUserById(+id);
    res.status(200).json({
        data: user
    })
}

const createUserApi = async (req: Request, res: Response) => {
    const { fullname, email, password } = req.body as TRegisterSchema;

    const validate = await RegisterSchema.safeParseAsync(req.body);

    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`)

        res.status(400).json({
            errors: errors
        })
        return;
    }

    //success
    await registerNewUser(fullname, email, password);
    res.status(201).json({
        data: "create user success"
    })
}


const updateUserByIdApi = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fullname, address, phone } = req.body;

    await handleUpdateUserById(+id, fullname, address, phone);

    res.status(200).json({
        data: "update a user success"
    })
}

const deleteUserByIdApi = async (req: Request, res: Response) => {
    const { id } = req.params;

    await handleDeleteUserById(+id);

    res.status(200).json({
        data: "delete a user success"
    })

}


export { getAllUserApi, getUserByIdAPI, createUserApi, updateUserByIdApi, deleteUserByIdApi }