const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../database/connection');

describe('NGO', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new NGO', async () => {
    const response = await request(app)
      .post('/ngos')
      // .set('Authorization', '12345678') // ~> HEADERS
      .send({
        name: 'APAD2',
        email: 'email@apad2.com',
        whatsapp: '88998987575',
        city: 'São Francisco',
        uf: 'CE',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
