// const express = require('express');
import express from 'express';

import 'dotenv/config'
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 8080;

//config viewengine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render("home.ejs")
})

app.get('/thuan', (req, res) => {
    res.send('nguyenducthuan')
})

app.listen(8080, () => {
    console.log(`my app is running on port : ${PORT}`);
})