const JWT  = require("jsonwebtoken") //ye isi liye import kiye ki hume token ko check karna hai 

 
module.exports = async (req,res, next)=>{
    const token =req.header('x-auth-token')       //ye hum postman ke header me key as sec-code and value private token use karenge tab access milega

    if(!token)                               //agar token valid na ho to error 400
    {return res.status(400).json({
        "messege" :[
       { "msg" : "token is not found"}
        ]
    })
}
    try {
        let user = await JWT.verify(token, "QWE234NSDI34FEOE33xi24IHnb345SDw23dsS34d") //check karo verify karo user hai ya nahi

        req.user = user.email;                                                //agar hai to authentication request hai 

        next()                                                                //next 
    }catch(error){
        return res.status(400).json({
            "messege" :[
           { "msg" : "token is not valid "}
            ]
        })
    }
    //"QWE234NSDI34FEOE33xi24IHnb345SDw23dsS34d" ye apna private token hai jisko humne auth me use kiya tha 
   }