import express, { Express } from 'express';
import {
    getCreateUserPage, getHomePage,
    postCreateUserPage, postDeleteUserPage, getViewUser, postUpdateUser,
} from 'controllers/user.controller';
import { getDashboardPage } from 'controllers/admin/dashboard.controller';
import { getAdminUserPage } from 'controllers/admin/user.controller';
import { getAdminProductPage, getCreateAdminProductPage, getViewProduct, postCreateAdminProduct, postDeleteProduct, postUpdateProduct, } from 'controllers/admin/product.controller';
import { getAdminOrderPage } from 'controllers/admin/order.controller';
import fileUploadMiddleware from 'src/middleware/multer';
import { getProductDetail, postAddProductToCart } from 'controllers/client/product/product.controller';
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegister } from 'controllers/auth/auth.controller';
import passport from 'passport';
import { isAdmin } from 'src/middleware/auth';


const router = express.Router();

const webRoutes = (app: Express) => {

    router.get('/', getHomePage);
    router.get('/product/:id', getProductDetail);
    //auth
    router.get('/success-redirect', getSuccessRedirectPage)
    router.get('/login', getLoginPage)

    router.get('/register', getRegisterPage)
    router.post('/register', postRegister)
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true
    }));
    router.post('/logout', postLogout)

    router.post('/add-product-to-cart/:id', postAddProductToCart)

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
    router.get('/admin/view-product/:id', getViewProduct);
    router.post('/admin/delete-user/:id', postDeleteProduct);
    router.post('/admin/update-product', fileUploadMiddleware("image", "images/product"), postUpdateProduct)




    router.get('/admin/order', getAdminOrderPage);




    app.use('/', isAdmin, router)
}

export default webRoutes;
