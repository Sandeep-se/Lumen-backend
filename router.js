const express=require('express')
const login = require('./login')
const register = require('./register')
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('Hello World');
})
router.post('/login',login)
router.post('/rgister',register)

module.exports=router