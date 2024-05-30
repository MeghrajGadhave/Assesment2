const express = require('express');
const { addRole, getRoles, updateRole, deleteRole } = require('../controllers/roleController');

const router = express.Router();

router.post('/', addRole);
router.get('/', getRoles);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;
