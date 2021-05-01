const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../../database/connection');

async function create(req, res) {
  const { name, email, whatsapp, city, uf } = req.body;

  const id = generateUniqueId();

  await connection('ngos').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  });

  return res.json({ id });
}

async function index(req, res) {
  const ngos = await connection('ngos').select('*');

  return res.json(ngos);
}

module.exports = {
  create,
  index,
};
