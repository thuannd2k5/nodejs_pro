import { createUserApi, deleteUserByIdApi, getAllUserApi, getUserByIdAPI, loginAPI, updateUserByIdApi } from 'controllers/api.controller';
import express, { Express } from 'express';
import { checkValidJWT } from 'src/middleware/jwt.middleware';

const router = express.Router();

const apiRoutes = (app: Express) => {

    router.get("/users", checkValidJWT, getAllUserApi);
    router.get("/users/:id", getUserByIdAPI);
    router.post("/users", createUserApi);
    router.put("/users/:id", updateUserByIdApi);
    router.delete("/users/:id", deleteUserByIdApi);

    router.post("/login", loginAPI);

    app.use("/api", router)

}

export default apiRoutes