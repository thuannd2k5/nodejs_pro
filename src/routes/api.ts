import { createUserApi, deleteUserByIdApi, fetchAccountAPI, getAllUserApi, getUserByIdAPI, loginAPI, updateUserByIdApi } from 'controllers/api.controller';
import express, { Express } from 'express';
import { checkValidJWT } from 'src/middleware/jwt.middleware';

const router = express.Router();

const apiRoutes = (app: Express) => {

    router.get("/users", getAllUserApi);
    router.get("/users/:id", getUserByIdAPI);
    router.post("/users", createUserApi);
    router.put("/users/:id", updateUserByIdApi);
    router.delete("/users/:id", deleteUserByIdApi);

    router.post("/login", loginAPI);
    router.get("/account", fetchAccountAPI)

    app.use("/api", checkValidJWT, router)

}

export default apiRoutes