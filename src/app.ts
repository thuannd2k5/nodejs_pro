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

//config routes
webRoutes(app);

//config static file
app.use(express.static('public'))

app.listen(8080, () => {
    console.log(`my app is running on port : ${PORT}`);
})