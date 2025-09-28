import { Request, Response } from "express";
import { registerNewUser } from "services/auth/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/Register.schema";

const getRegisterPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    return res.render("auth/register", {
        errors, oldData
    })
}

const getLoginPage = async (req: Request, res: Response) => {

    return res.render("auth/login")
}
const postRegister = async (req: Request, res: Response) => {

    const { fullname, email, password, confirmPassword } = req.body as TRegisterSchema;

    const validate = await RegisterSchema.safeParseAsync(req.body);

    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`)

        const oldData = {
            fullname, email, password, confirmPassword
        }
        return res.render("auth/register", {
            errors, oldData
        })

    }

    //success
    await registerNewUser(fullname, email, password);
    return res.redirect("/login")
}

export { getRegisterPage, getLoginPage, postRegister }