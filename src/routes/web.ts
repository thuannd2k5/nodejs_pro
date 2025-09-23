import express, { Express } from 'express';
import {
    getCreateUserPage, getHomePage,
    postCreateUserPage, postDeleteUserPage, getViewUser, postUpdateUser,
} from 'controllers/user.controller';
import { getDashboardPage } from 'controllers/admin/dashboard.controller';
import { getAdminUserPage } from 'controllers/admin/user.controller';
import { getAdminProductPage } from 'controllers/admin/product.controller';
import { getAdminOrderPage } from 'controllers/admin/order.controller';
import fileUploadMiddleware from 'src/middleware/multer';

const router = express.Router();

const webRoutes = (app: Express) => {

    router.get('/', getHomePage);



    router.post('/handle-delete-user/:id', postDeleteUserPage);
    router.get('/handle-view-user/:id', getViewUser);
    router.post('/handle-update-user', postUpdateUser)

    //admin
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateUserPage);
    router.post('/admin/handle-create-user', fileUploadMiddleware("avatar"), postCreateUserPage);



    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/order', getAdminOrderPage);


    app.use('/', router)
}

export default webRoutes;
