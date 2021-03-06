const connection = require('../../database/connection');

async function create(req, res) {
  const { id } = req.body;

  const ngo = await connection('ngos')
    .where('id', id)
    .select('name')
    .first();

  if (!ngo) {
    return res.status(400).json({ error: 'No NGO found with this ID' });
  }

  return res.json(ngo);
}

module.exports = {
  create,
};
