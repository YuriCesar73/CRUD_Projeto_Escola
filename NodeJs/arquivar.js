(async() => {

    const database = require('./db');
    const Produto = require('./produto');
    await database.sync();


    //Create
    const novoProduto = await Produto.create({
        nome: 'Processador Intel',
        preco: 2500,
        descricao: 'Processador Rapido'
    })
    console.log(novoProduto);

    //Read
    const produto = await Produto.findByPk(1);
    console.log(produto);

    //Update
    produto.descricao = 'Fiz uma alteraçao';
    await produto.save();

    //Delete
    await produto.destroy();


    //Outra opção para fazer o Delete
    /*await Produto.destroy({where: {
        preco: 30
    }})*/
})();

