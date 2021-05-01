/**
 * METODOS DE UM CONTROLLER
 * 
 * 1. index   => RETORNA UMA LISTAGEM DE SESSÕES
 * 2. show    => LISTA UMA ÚNICA SESSÃO
 * 3. store   => CRIAR UMA SESSÃO
 * 4. update  => ATUALIZAR UMA SESSÃO
 * 5. destroy => DESTRUIR UMA SESSÃO
 */
const User = require('../models/User');

module.exports = {
  /* Método para criar uma sessão */
  async store(req, res) { // async => FUNCÇÃO ASSÍNCRONA
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }
    //const user = await User.create({ email }); // await => ESPERAR ATÉ QUE ESSE EVENTO TERMINE
    return res.json(user);
  }

}
