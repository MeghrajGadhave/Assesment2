const People = require('../models/People');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/'); // Uploads directory
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
});

const addPeople = async (req, res) => {
    const { id, name, mobile, email, role, status } = req.body;
    const imagePath = req.file.path;

    try {
        const newPeople = new People({
            id,
            name,
            mobile,
            email,
            role,
            status,
            imagePath
        });

        const savedPeople = await newPeople.save();
        res.status(201).json(savedPeople);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const getPeople = async (req, res) => {
    try {
        const people = await People.find().populate('role');
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updatePeople = async (req, res) => {
    const { id } = req.params;
    const { name, mobile, email, role, status } = req.body;
    const imagePath = req.file ? req.file.path : null;
    try {
        const people = await People.findByIdAndUpdate(id, { name, mobile, email, role, status ,imagePath}, { new: true });
        if (!people) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deletePeople = async (req, res) => {
    const { id } = req.params;
    try {
        const people = await People.findByIdAndDelete(id);
        if (!people) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json({ message: 'Person deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addPeople, getPeople, updatePeople, deletePeople };
