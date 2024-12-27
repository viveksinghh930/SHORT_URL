const{v4:uuidv4} = require('uuid');
const User = require('../models/user');
const {setUser } = require('../service/auth');
async function handleUserSignup(req,res) {
  
    const { name , email, password } = req.body;
    await User.create({ name, email, password });
    return res.redirect("/");
}
 
async function handleUserLogin(req,res) {
    const {  email, password } = req.body;
  const user = await User.findOne({  email, password });
  if(!user) return res.render("Login",{
        error:"Invalid email or password"

  })

//   const sessionId = uuidv4();// ---statefull--
//   setUser(sessionId,user); // ---statefull--
const token = setUser(user); // ---stateless--

    // res.cookie("uid",sessionId);// ---statefull--
    res.cookie("uid",token);// ---stateless--
    return res.redirect("/");
    
}


module.exports = {
    handleUserSignup,
    handleUserLogin
}