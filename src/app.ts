// const express = require('express');
import express from 'express';

import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World nodemon')
})

app.get('/thuan', (req, res) => {
    res.send('nguyenducthuan')
})

app.listen(8080, () => {
    console.log(`my app is running on port : ${PORT}`);
    console.log("port .env : ", process.env.PORT)
})