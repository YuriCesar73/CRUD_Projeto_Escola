const express = require('express');
const Professor = require('./professor');
let dadosProfessor = null;
const operacoes = require('./operacoesDB');

const app = express();

app.get('/professor', async (req, res) =>{
   dadosProfessor = await operacoes.getAll();
    return res.send({
        "StatusCode": 200,
        "dados": dadosProfessor,
    })
})

app.get('/professor/:id', async (req, res) => {
    dadosProfessor = await operacoes.getSingleProfessor(req.params.id);
    return res.send({
        "StatusCode": 200,
        "dado": dadosProfessor,
    })
})

app.post('/professor', async (req, res) => {
    dadosProfessor = await operacoes.getAll();
    if(dadosProfessor) {
        dadosProfessor.push(await operacoes.inserirProfessor(req.body));
        return res.send({
            "StatusCode": 200,
            "Dado": dadosProfessor,
        });
    }
})

app.put('/professor/:id', async (req, res) => {
    const editado = await operacoes.editarProfessor(req.params.id, req.body);
    if(editado){
        res.status(200).send({
            "StatusCode": 200,
            "Dado": dadosProfessor
        })
    }
    else {
        res.status(400).send({
            "StatusCode": 400
        })
    }
})

app.delete('/professor/:id', async (req, res) => {

    const apagou = await operacoes.deleteProfessor(req.params.id);

    if(apagou)
    {
        return res.status(201).send({
            "StatusCode": 201,
        })
    }
    
    else 
    {
        return res.status(400).send({
            "StatusCode": 400,
            "msg": "ERROR",
        })
    }
})


module.exports = app;