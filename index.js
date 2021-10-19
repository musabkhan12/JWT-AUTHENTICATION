const express = require ("express");  //express ko require kiye 
const newsFeed = require("./routes/newsFeed"); //newsFeed ko le rahe hai ./routes/newFeed adress se

const app = express ()               
const auth = require ('./routes/auth') /*yaha pe humne auth ke folder ko require kiya*/
                          

app.use(express.json()); /*ye ek middleware hai jo incoming request ko json ke object me lata hai */
/*aur ye na lo to undefine error ayega */


app.use("/auth" , auth) /*app use this routes like /auth is the adress so when after localhost3000 type /auth so app will 
                             fetch the files of auth  */
app.use("/post" , newsFeed) /* /post request par newsFeed ko fetch karega */

app.listen(3000 ,()=>{                        /*app listen port ye humne server ka setup kiya 
                                              port 3000 pe through express */
    console.log("connected successfully")

})
 
app.get('/' , (req, res) =>{                   /*routing  simple when we hit localhost:3000 we get
                                                what ever in re.send*/
    res.send("ok its working")
}  )

