const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
     next();
    } catch(error) {
        res.status(401).json({ error });
    }
};