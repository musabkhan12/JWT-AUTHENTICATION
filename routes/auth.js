const  router = require("express").Router()
const  {check, validationResult} = require ("express-validator") /*yaha pe hum check ko import karre express-valid se */
const bcrypt = require ("bcrypt")
const JWT = require("jsonwebtoken")
const {users} = require ("../datalake") /*data lake me users naam ka variable hai jisme array of object hai wo apna users ka data hai*/
router.get( '/' , (req,res)=>{
    res.send("ok ok its working")
})




router.post ('/singup' , 
[
 check("email", "please enter a correct email") //ye jo "email"hoga wo to humara variable hai but ,"please enter jo hai wo print hoga agar error huva to"
 .isEmail(),
 check("password" , "please enter a correct and valid password")
 .isLength({min:6  })
]
,async (req,res)=>{  /* jo udar index.js pe humne kiya app.use('/auth' , auth wo ye auth.js ko fetch karega
                                        aur yaha jo adress hoga jaise line no 3 me "/" single slash hai agar koi request 
                                          karega only localhost3000/auth to "ok ok its working" fetch karega 
                                          aur jab koi localhost3000/auth/test ko req karega usko "ok this is test" fetch
                                          karega */

    const{email, password} = req.body
   
    const errors= validationResult(req)    /*ye validation result humne express validator se hiliya hai ye humare conditions
                                             check karega jo humne diye check isEmail isLength unko kab jab request hogi*/
    if(!errors.isEmpty())                        //aur agar sab sahi huva user ne sahi kiya to aage badhna hai //aur ye jo hai ! iska matlab hai agar errors is not empty to aage
                                                    //fir return karna hai jo bhi hai niche  error 400
    {return res.status(400).json({erros:errors.array()}) }   //agar sahi nahi huva to 400 error hoga 

    /*yaha check karenge user apne data me exist hai ya nahi agar hai to batayenge already exist*/
    let user = users.find((user)=>{           /*find karo jab bhi user new register kar raha pehle dekh lo data base me wo emAIL
                                               already hai kya agar nahi hai to use register karne do */
         return user.email === email          /* use.email email apna key hai aur user ek object aur users wo number of object hai
                                                  */
    } );
    if (user){ 
             return res.status(400).json({
                  "errors": [
                      {
                          "msg" : "this email is already present try with another one",
                       }
                  ]
              })
         }      
    const hashedPassword = await bcrypt.hash(password, 10)    /* bcrypt.hash(apnapassword jo key value hai , 10 )  10 jo hai salt value hai ye encrypt and dcrypt
                                                                ke liye aur ye security ko batata hai */
     
     users.push({                                           /* push kar rahe yaha , ki jo b hum details dalinge ab ye add hogi push hogi*/
         email,                                               /*email directly liye kyuki email key value hai aur yaha bhi 
                                                               password humara magar hashedPassword hoga */
         password: hashedPassword
     } )
     const token = await JWT.sign(  
         {
             email
         }, "QWE234NSDI34FEOE33xi24IHnb345SDw23dsS34d" ,{ expiresIn :365 } /* ye jo hai "QWE234NSDI34FEOE33xi24IHnb345SDw23dsS34d" 
                                                                   secret code  hai ye dotenv me rakhte isko git ya direct yaha nahi rakhte */
                                      /* ye expires in hai jo expire karta data ko jo humne 365 diye wo time hai utne time me */
          )                                                        
     
    //  console.log(hashedPassword)                                 /*jo password ab dikhega wohash value me dikhega*  is line ki jagah const token liye/
    // res.send("congratulations you have succcessfully login")         //ye responce dena hai agar sab sahi huva to 
                                                                         //res.send ki jagah ab res.json({token }) ab kiye
     
    res.json({token})                                              

 })                          
   
    router.get("/all" , (req, res) =>{    /* ye hum get all users kiye jab hum req karenge /all tab*/
        res.json(users)                   /* res.send ki jagaha hum res.json is liye liye kyuki hume 
                                                json ke format me chaihiye */
    })

    //login credentials 
router.post(  "/login" , async (req,res)=>{
   const {password, email } = req.body;

   let user = users.find((user)=>{   //dekho ki jo use ne email dala hai login k liye wo sahi hai ya hai
       return user.email === email   //agar hai to aage badne do use
                        }        );
   if(!user){                                 /*  !user  iska matlab hai agar user undefine hai matlab data me 
                                                   nahi hai towologin nahi kar sakta error do usko*/
     return res.status(400).json({
         "errors":[
            { "msg" : " invalid user "}
         ]
     })    }
        //compare karienge hash password from our database with login password 

    let isMatch = await bcrypt.compare(password, user.password) 

    if(!isMatch){                              
           return res.status(400).json({
            "errors":[
                 { "msg" : " invalid user "}
                    ]
                  })    }
                 const token = await JWT.sign(
                    {email}, "QWE234NSDI34FEOE33xi24IHnb345SDw23dsS34d" ,{ expiresIn :365 }
                )
                res.json({token})
    } )
    
   


module.exports = router


//if theres 404 error on postman then its urlor that /address may be incorrect check and then try