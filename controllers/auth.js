const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body
        // Step 1 validate body
        if (!email) return res.status(400), json({ message: "Email is require!" });
        if (!password) return res.status(400), json({ message: "Password is require!" });

        // Step 2 check email already exists?
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ message: "Email already exits" });
        }

        //Step 3 hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //Step 4 Register
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })
        res.send('Register success');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        // Step 1 check email
        const user = await prisma.user.findFirst({
            where: { email: email }
        })
        if (!user || !user.enabled) {
            return res.status(400).json({ message: "user not found or Not enabled" });
        }
        console.log(email);
        // Step 2 Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password invalid" });
        }
        // Step 3 Create payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        // Step 4 genarate Token
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500), json({ message: "Server error" });
            }
            res.json({ payload, token })
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

}

exports.currentUser = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        })
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

}


