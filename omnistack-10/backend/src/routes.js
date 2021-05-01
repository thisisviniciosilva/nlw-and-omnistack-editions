const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

/*
  MÉTODOS HTTP:
    GET....: routes.get()    (obter um registro, uma listagem de registros, etc.).
    POST...: routes.post()   (criação de um registro).
    PUT....: routes.put()    (alterar um registro).
    DELETE.: routes.delete() (deletar, apagar um registro).

  TIPOS DE PARÂMETROS:
    BODY.........: req.body   (dados para criação ou alteração de um registro).
    QUERY PARAMS.: req.query  (filtros, ordenações, paginações, e etc.).
    ROUTE PARAMS.: req.params (identificar um recurso na alteração ou remoção).
 */

const routes = Router();

// DEV
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

// SEACH
routes.get('/search', SearchController.index);

module.exports = routes;
