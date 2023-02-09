const jwt=require('jsonwebtoken');
const JWT_SECRET='Anusha_is_so_sweet'

const fetchuser=(req,res,next)=>{
    /*
    here next corresponds to next middleware which is the async funtion before which it is called
    here we get the user from jwt token and add id to req object
    */
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Access denied! Authenticate using a valid token"})
        
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(error){
        res.status(401).send({error:"Access denied! Authenticate using a valid token"})
    }
}
module.exports=fetchuser;