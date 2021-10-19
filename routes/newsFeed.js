const router = require("express").Router();
const {publicUser, privateUser, lockUser} =require ("../datalake");
const checkAuth = require("../middleware/checkAuth");


router.get("/public" , (req,res) =>{
res.json(publicUser)
} )


router.get("/private" ,  (req,res , next) =>{
     let userValid = false;        
 
     if(userValid){                    /*agar user valid hai , signup kiya hai ya login hai 
                                                tab wo acess kar sakta*/
         next()                            
        }else{ return res.status(400).json({               // //aur agar valid nahi hai if not valid
            "errors": [
               { "msg" : "access denied"}        //usko error do aur access denied ka messege show karo
            ]
        }) }
},(req,res) =>res.json(privateUser)            
)
/*joupar ka private user hai usko yaha diect checkkiye and result aa gaya
niche ka /lock bhi upar wale /private ki tarah hai magar hum usko middelware se 
checkauth.js se karenge */

router.get("/lock", checkAuth, (req,res)=>{
    res.json(lockUser)
} )


module.exports= router


/* to humara adress banega http://localhost:3000/post/public *   yaha auth nahi ayega
http://localhost:3000/post/public is adress me kyu ki humne index.js me app.use("/post" , newsFeed) ye kiya
matlab humne alag routing create kiye */


/*for creating protected routes for privateUser we will use middelware 
to middleware is nothing but a function 
 (req,res , next) =>{},(req,res) =>{ to yaha jo next hai variable hai ye middelware hai jisko hum next se denot karte */