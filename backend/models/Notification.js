// notification.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({});

module.exports = mongoose.model('Notification', notificationSchema);