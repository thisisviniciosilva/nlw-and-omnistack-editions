/**
 * req.query  => Acessar QUERY params
 * req.params => Acessar ROUTE params
 * req.body   => Acessar BODY da requisição
 */

const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');

const BookingController = require('./controllers/BookingContoller');
const DashboardController = require('./controllers/DashboardController');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

// SESSIONS
routes.post('/sessions', SessionController.store);

// SPOTS
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

// DASHBOARD
routes.get('/dashboard', DashboardController.show);

// BOOKINGS
routes.post('/spots/:spot_id/bookings', BookingController.store);

// APPROVALS and REJECTIONS
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;
