const jwt= require("jsonwebtoken")
const protect = (req, res, next) => {
    let token;

    // Token format: Authorization: Bearer <token>
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];
           

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("VERIFY SECRET:", process.env.JWT_SECRET);
            console.log("llo")
            console.log("decoded:", decoded);
             req.user = decoded;
            next();

          
        } catch (error) {
            return res.status(401).json({ message: "Invalid tokensss" });
        }
    } else {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
};

module.exports = protect;