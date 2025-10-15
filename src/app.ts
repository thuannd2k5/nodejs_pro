/// <reference path="./types/index.d.ts" />

import express from 'express';
import 'dotenv/config'
import webRoutes from 'src/routes/web';
import initDatabase from 'config/seed';
import passport from 'passport';
import configPassportLocal from 'src/middleware/passport.local';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import apiRoutes from 'routes/api';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './socket';

const app = express();
const PORT = process.env.PORT || 8080;

//config cors
app.use(cors({
    origin: ["http://localhost:3000"]
}))


//config viewengine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config request body 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//config static file
app.use(express.static('public'))


app.use(session({
    cookie: {
        //7 day
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            //clear session every 1 day
            checkPeriod: 1 * 24 * 60 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))


//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));

configPassportLocal();

app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});

//config routes
webRoutes(app);

//api routes
apiRoutes(app);

//seeding data
initDatabase();

//handle 404 not found
app.use((req, res) => {
    res.render('status/404.ejs');
});


const server = http.createServer(app);
// Khởi tạo socket
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"], // Cho phép FE kết nối
        methods: ["GET", "POST"]
    }
});
setupSocket(io); // ✅ khởi tạo socket

server.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});