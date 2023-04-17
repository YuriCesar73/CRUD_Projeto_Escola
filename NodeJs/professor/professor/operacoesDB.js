const db = require('../BD/db'); 
const tabela = require('./professor'); 
//const maiorMatricula = require('./maiorMatricula.json');
//const fs = require('fs');
const matriculaProfessor = "1";

async function criarTabela(){
   await db.sync();
}

async function getAll(){
    await criarTabela();
    const dadosProfessor = await tabela.findAll();
    return dadosProfessor;
}

async function getSingleProfessor(id){
    await criarTabela();
    const professor = await tabela.findOne({where: {matricula: id}});

    if(professor != null){
        return professor;
    }

    else return null;
}

/*async function gerarMatricula(){
    let arquivo = await fs.readFileSync('maiorMatricula.json');
    let matriculaAdd = JSON.parse(arquivo);
    const matriculaFinal = matriculaAdd.maiorMatricula;
    matriculaAdd.maiorMatricula += 1;
    matriculaAdd = JSON.stringify(matriculaAdd);
    await fs.writeFileSync('maiorMatricula.json', matriculaAdd);

    return matriculaFinal;
}*/

async function inserirProfessor(professor){
    await criarTabela();
    const novoProfessor = await tabela.create({
        nome: professor.nome,
        cpf: professor.cpf,
        nascimento: professor.nascimento,
        sexo: professor.sexo,
    })
    novoProfessor.matricula = matriculaProfessor + novoProfessor.id.toString();
    await novoProfessor.save(); 
    return novoProfessor;
}

async function deleteProfessor(id){
    
    const elementoDeletado = await getSingleProfessor(id);
    if(elementoDeletado != null){
        elementoDeletado.destroy();
        return true;
    }
    else{
        console.log("Professor não encontrado");
        return false;
    }
}

async function editarProfessor(id, dadosNovos){
    const professor = await getSingleProfessor(id);
    if(professor != null){
        professor.nome = dadosNovos.nome,
        professor.cpf = dadosNovos.cpf,
        professor.nascimento = dadosNovos.nascimento,
        professor.sexo = dadosNovos.sexo
        await professor.save();
        return professor;
    }
    else {
        console.log("Professor não encontrado");
        return null;
    }
}


module.exports = {criarTabela, getAll, inserirProfessor, deleteProfessor, editarProfessor, getSingleProfessor};