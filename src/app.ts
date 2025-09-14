// const express = require('express');
import express from 'express';

import 'dotenv/config'
import { dirname } from 'path';
import webRoutes from './routes/web';
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


//config routes
webRoutes(app);

app.listen(8080, () => {
    console.log(`my app is running on port : ${PORT}`);
})