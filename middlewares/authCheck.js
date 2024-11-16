const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');


exports.authCheck = async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization;
         console.log('headerToken',headerToken);
        if (!headerToken) { return res.status(401).json({ message: 'No Token, Authorization' }) }
        const token = headerToken.split(" ")[1];

        const decode = jwt.verify(token, process.env.SECRET);
        req.user = decode // add porperty to req object

        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            }
        })
        if (!user.enabled) { return res.status(400).json({ message: 'This account cannot access' }); }

        // console.log(user);
        // console.log('Hello middleware');

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Token Invalid' });
    }
}

exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user
        const adminUser = await prisma.user.findFirst({
            where: { email: email }
        })

        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admin only' });
        }

        // console.log('admin check', adminUser);

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error Admin access denied' });
    }
}