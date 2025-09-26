import express, { Express } from 'express';
import {
    getCreateUserPage, getHomePage,
    postCreateUserPage, postDeleteUserPage, getViewUser, postUpdateUser,
} from 'controllers/user.controller';
import { getDashboardPage } from 'controllers/admin/dashboard.controller';
import { getAdminUserPage } from 'controllers/admin/user.controller';
import { getAdminProductPage, getCreateAdminProductPage, postCreateAdminProduct, } from 'controllers/admin/product.controller';
import { getAdminOrderPage } from 'controllers/admin/order.controller';
import fileUploadMiddleware from 'src/middleware/multer';
import { getProductDetail } from 'controllers/client/product/product.controller';

const router = express.Router();

const webRoutes = (app: Express) => {

    router.get('/', getHomePage);
    router.get('/product/:id', getProductDetail);





    //admin
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateUserPage);
    router.post('/admin/handle-create-user', fileUploadMiddleware("avatar"), postCreateUserPage);
    router.post('/admin/handle-delete-user/:id', postDeleteUserPage);
    router.get('/admin/view-user/:id', getViewUser);
    router.post('/admin/update-user', fileUploadMiddleware("avatar"), postUpdateUser)



    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/create-product', getCreateAdminProductPage);
    router.post('/admin/create-product', fileUploadMiddleware("image", "images/product"), postCreateAdminProduct);




    router.get('/admin/order', getAdminOrderPage);


    app.use('/', router)
}

export default webRoutes;
