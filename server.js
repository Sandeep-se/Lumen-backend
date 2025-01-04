const express = require('express');
const app = express();
const router = require('./router');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB=require('./db')
dotenv.config();


connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

const PORT=process.env.PORT||8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

app.use("/",router)
