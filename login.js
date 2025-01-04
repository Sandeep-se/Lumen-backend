const jwt = require('jsonwebtoken');
const User = require('./model/userSchema');  // Import the User model
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Secret key for JWT

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        // Find the user in the database using Mongoose
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password matches (assuming plain text passwords are used here)
        if (user.userPassword !== password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token with user ID and username
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }  // Token expiration time
        );

        // Send response with JWT token
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = login;
