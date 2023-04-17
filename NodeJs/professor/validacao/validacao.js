const operacoes = require('../professor/operacoesDB');

async function matriculaValida (req, res, next){
  let pessoa;
  if(req.params.matricula[0] == '1'){
     pessoa = await operacoes.getSingleProfessor(req.params.matricula);
  }
  else {
     pessoa = await operacoes.getSingleProfessor(req.params.matricula);
  }

  if(pessoa){
      next();
  }
  else {
    return res.status(400).send({
      "StatusCode": 400,
      "msg": "Professor não existe",
  });
  }
}


async function validaPessoa(req, res, next){
  const pessoa = req.body;
  const matricula = req.params.matricula;
  let pessoaModificado;
  
  if( matricula[0] == '1'){
     pessoaModificado = await operacoes.getSingleProfessor(matricula);
  }
  else{
     pessoaModificado = await operacoes.getSingleProfessor(matricula);
  }
   
  if(pessoaModificado == null) {
    cpfAtual = "-1";
  }
  else {
    cpfAtual = pessoaModificado.cpf;
  }
  
  if(validaNome(pessoa.nome) && validaSexo(pessoa.sexo.toUpperCase()) && validaCPF(pessoa.cpf, cpfAtual) && validaNascimento(pessoa.nascimento)) {
      next();
  }
  else {
      return res.status(400).send({
          "StatusCode": 400,
          "msg": "Não foi possível cadastrar",
      });
  }
}

function validaNome(nome){
  
  if(nome.length < 3){
    console.log("Nome");
      return false;
  }
  return true;
}

function validaSexo(sexo){
    if(sexo.startsWith("M") || sexo.startsWith("F") || sexo.startsWith("I")){
       return true;
    }
    console.log("sexo");
    return false;
}

async function validaCPF(cpf, cpfModificado){

  const result = cpf.replace(/\D/g, ""); //Retira os caracteres diferentes de números
  
  if(result.length != 11) {
    return false;
  }

  var cpfNumeros= [];

  for(let i = 0; i < result.length; i++){
    cpfNumeros.push(parseInt(result[i]));
  }

  let j=1;
  let soma=0;
  for (let i=0; i<9; i++){
    soma = (soma + (cpfNumeros[i]*j));
    j++;
  }

  let digitoVerificador1 = soma % 11;

  if (digitoVerificador1 == 10){
    digitoVerificador1=0;
  }

  soma = 0;

  for (let i = 0; i < 10; i++){
    soma = soma + (cpfNumeros[i]*i);
  }

  let digitoVerificador2 = soma%11;

  if (digitoVerificador2 == 10){
    digitoVerificador2 = 0;
  }

  if(!(digitoVerificador1 == cpfNumeros[9]) || !(digitoVerificador2 == cpfNumeros[10])){
    return false;
  }

  if(cpf != cpfModificado){
    if(await jaExiste(cpf)){
      return false;
    }
  }
 

  return true;

}

function validaNascimento(nascimento){

  if(nascimento.isEmpty || nascimento == null){
      return false;
    }
  if(nascimento.length != 10 && nascimento.length != 8){
    return false;
  }
  if(nascimento.match(/[A-Z]/gi) || nascimento.match(/[a-z]/gi) || !nascimento.includes("/",2) || !nascimento.includes('/',5)){
    console.log("nas: terceiro false");
    return false;
  }

  return true;
}

async function jaExiste(cpf){

  const professores = await operacoes.getAll();
    
  for(let i = 0; i < professores.length; i++){
    console.log(professores[i].cpf);
    console.log("CPF do parametro: " + cpf);
      if(professores[i].cpf == cpf){
        console.log(professores[i].cpf + " " + cpf);
        console.log("cpf ja existe");
          return true;
      } 
  }
    
  return false;

}

module.exports = {validaPessoa, matriculaValida};