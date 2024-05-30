const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, ref: 'Role', required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;
