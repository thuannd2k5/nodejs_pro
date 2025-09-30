import { NextFunction, Request, Response } from "express";
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
    const { session } = req as any;
    const messages = session?.messages ?? [];
    return res.render("auth/login", {
        messages
    })
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

const getSuccessRedirectPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (user?.role?.name === 'ADMIN') {
        res.redirect('/admin')
    } else res.redirect('/')

}


const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}
export { getRegisterPage, getLoginPage, postLogout, postRegister, getSuccessRedirectPage }