const db = require('./db'); 
const tabela = require('./professor'); 

async function criarTabela(){
    db.sync();
}

async function getAll(){
    criarTabela();
    const dadosProfessor = await tabela.findAll();
    return dadosProfessor;
}

async function getSingleProfessor(id){
    criarTabela();
    const professor = await tabela.findByPk(id);

    if(professor != null){
        return professor;
    }

    else return null;
}

async function inserirProfessor(professor){
    criarTabela();
    const novoProfessor = await tabela.create({
        nome: professor.nome,
        cpf: professor.cpf,
        nascimento: professor.nascimento,
        sexo: professor.sexo,
    })
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
        return true;
    }
    else {
        console.log("Professor não encontrado");
        return false;
    }
}


module.exports = {criarTabela, getAll, inserirProfessor, deleteProfessor, editarProfessor, getSingleProfessor};