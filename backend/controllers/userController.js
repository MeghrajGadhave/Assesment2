const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const registerUser = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!passwordPattern.test(password)) {
    //     alert("Pass Wrong wrong")
    //     return res.status(400).json({ message: 'Password must contain at least one lowercase letter, one uppercase letter, one special character, one digit, and be at least 8 characters long' });
    // }

    // // Validate mobile number: 10 digits
    // const mobilePattern = /^\d{10}$/;
    // if (!mobilePattern.test(mobile)) {
    //     alert("mobile wrong")
    //     return res.status(400).json({ message: 'Mobile number must be 10 digits long' });
    // }
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, mobile, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: process.env.SMTP_PORT || 465,
            auth: {
                user: process.env.SMTP_USER || "meghrajgadhave3@gmail.com",
                pass: process.env.SMTP_PASS ,
            },
        });

        const mailOptions = {
            to: user.email,
            from: 'meghrajgadhave3@gmail.com',
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested to reset your password. Please click on the following link, or paste this into your browser to complete the process: \n\n ${resetUrl} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`,
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                return res.status(500).json({ message: 'Email could not be sent' });
            } else {
                res.status(200).json({ message: 'Email sent' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
