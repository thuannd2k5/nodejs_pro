import { createUserApi, deleteUserByIdApi, getAllUserApi, getUserByIdAPI, updateUserByIdApi } from 'controllers/api.controller';
import express, { Express } from 'express';

const router = express.Router();

const apiRoutes = (app: Express) => {

    router.get("/users", getAllUserApi);
    router.get("/users/:id", getUserByIdAPI);
    router.post("/users", createUserApi);
    router.put("/users/:id", updateUserByIdApi);
    router.delete("/users/:id", deleteUserByIdApi);


    app.use("/api", router)

}

export default apiRoutes