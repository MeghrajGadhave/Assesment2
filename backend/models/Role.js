const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
    