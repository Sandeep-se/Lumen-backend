const dotenv = require('dotenv');
dotenv.config();
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 
    if (!token) {
      return res.status(403).json({ message: 'Access denied' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      req.user = decoded; 
      next();
    });
  };
  
module.exports=authenticate