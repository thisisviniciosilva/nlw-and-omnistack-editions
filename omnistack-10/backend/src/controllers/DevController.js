const axios = require('axios');

const Dev = require('../models/Dev');

const parseArray = require('../utils/parseArray');
const { findConnections, sendMessage } = require('../websocket');

const apiGithub = 'http://api.github.com/users/';

/*
  MÉTODOS DE UM CONTROLLER:
    INDEX..: listagem de registros
    SHOW...: trazer apenas um registro
    STORE..: criar um registro
    UPDATE.: atualizar, alterar um registro
    DESTROY: destruir, deletar, apagar um registro
 */

module.exports = {
  async index(req, res) {
    return res.json(await Dev.find());
  },

  async store(req, res) {
    const { github_username } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const { techs, latitude, longitude } = req.body;

      const githubResponse = await axios.get(`${apiGithub}${github_username}`);
      const { name = login, avatar_url, bio } = githubResponse.data;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      const arrayTechs = parseArray(techs);

      dev = await Dev.create({
        name,
        bio,
        github_username,
        avatar_url,
        techs: arrayTechs,
        location,
      });

      const sendSockeMessageTo = findConnections(
        { latitude, longitude },
        arrayTechs
      );

      sendMessage(sendSockeMessageTo, 'newdev', dev);
    }

    return res.json(dev);
  },
};
