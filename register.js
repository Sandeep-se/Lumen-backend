const jwt = require('jsonwebtoken');
const User = require('./model/userSchema');  // Import the User model
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Secret key for JWT

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if the username already exists in the database
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Create a new user document in the database
        const newUser = new User({
            username,
            userPassword: password,  // Store the password as userPassword (from schema)
            role
        });

        // Save the new user to the database
        await newUser.save();

        // Generate JWT token with user ID and username
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '1h' }  // Token expiration time
        );

        // Set the token in the Authorization header
        res.setHeader('Authorization', `Bearer ${token}`);
        
        // Send response with success message and token
        return res.json({ message: 'User registered successfully', token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = register;
