const express = require('express');
const operacoes = require('../professor/operacoesDB');
const valida = require('../validacao/validacao');

const app = express();

app.get('/professor', async (req, res) =>{
   const dadosProfessor = await operacoes.getAll();
    return res.send({
        "StatusCode": 200,
        "dados": dadosProfessor,
    })
})

app.get('/professor/:matricula', async (req, res) => {
    const dadosProfessor = await operacoes.getSingleProfessor(req.params.matricula);
    return res.send({
        "StatusCode": 200,
        "dado": dadosProfessor,
    })
})

app.post('/professor', valida.validaPessoa, async (req, res) => {
    const dadosProfessor = await operacoes.getAll();
    if(dadosProfessor) {
        dadosProfessor.push(await operacoes.inserirProfessor(req.body));
        return res.send({
            "StatusCode": 200,
            "Dado": dadosProfessor,
        });
    }
})

app.put('/professor/:matricula', valida.validaPessoa, valida.matriculaValida, async (req, res) => {
    const editado = await operacoes.editarProfessor(req.params.matricula, req.body);
    if(editado){
        res.status(200).send({
            "StatusCode": 200,
            "Dado": editado
        })
    }
    else {
        res.status(400).send({
            "StatusCode": 400
        })
    }
})

app.delete('/professor/:matricula', valida.matriculaValida, async (req, res) => {

    const apagou = await operacoes.deleteProfessor(req.params.matricula);

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