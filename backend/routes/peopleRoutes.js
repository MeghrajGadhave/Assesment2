const express = require('express');
const router = express.Router();
const { addPeople, getPeople, updatePeople, deletePeople } = require('../controllers/peopleController');

module.exports = (upload) => {
    
    router.post('/', upload.single('image'), addPeople);
    router.get('/', getPeople);
    router.put('/:id', upload.single('image'), updatePeople);
    router.delete('/:id', deletePeople);

    return router;
};
