const Role = require('../models/Role');

const addRole = async (req, res) => {
    const { roleName, status } = req.body;
    try {
        const role = await Role.create({ roleName, status });
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateRole = async (req, res) => {
    const { id } = req.params;
    const { roleName, status } = req.body;
    try {
        const role = await Role.findByIdAndUpdate(id, { roleName, status }, { new: true });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findByIdAndDelete(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addRole, getRoles, updateRole, deleteRole };
