const express = require('express');
const routes = require('./routes.js')
const app = express();

app.use(express.json());

app.use(routes);


const port = "4000";
app.listen(port, ()=>{
    console.log("Estou escutando");
})