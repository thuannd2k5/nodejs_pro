import express from 'express';
import 'dotenv/config'
import webRoutes from 'src/routes/web';
import initDatabase from 'config/seed';
import passport from 'passport';
import configPassportLocal from 'src/middleware/passport.local';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 8080;

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
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))


//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));

configPassportLocal();




//config routes
webRoutes(app);

//seeding data
initDatabase();

//handle 404 not found
app.use((req, res) => {
    res.send("404 Not Found");
});

app.listen(8080, () => {
    console.log(`my app is running on port : ${PORT}`);
})