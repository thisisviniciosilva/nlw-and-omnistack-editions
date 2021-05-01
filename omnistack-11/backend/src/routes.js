const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const IncidentsController = require('./controllers/IncidentsController');
const NGOsController = require('./controllers/NGOsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = Router();

/* NGOs ROUTES */
routes.get('/ngos', NGOsController.index);

routes.post(
  '/ngos',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2),
    }),
  }),
  NGOsController.create
);

/* INCIDENTS ROUTES */
routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({ page: Joi.number() }),
  }),
  IncidentsController.index
);

routes.post(
  '/incidents',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
  }),
  IncidentsController.create
);

routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({ id: Joi.number().required() }),
  }),
  IncidentsController.destroy
);

/* PROFILE ROUTES */
routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
);

/* SESSION ROUTES */
routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string()
        .required()
        .length(8),
    }),
  }),
  SessionController.create
);

module.exports = routes;
