const users =[
{
    email : "johnDoe@gmail.com",
    password : "john.123nk"
},
{
    email : "chrishemsworth@gmail.com",
    password : "chrishemsworth"
},
{
    email : "peakyblinders@gmail.com",
    password : "peakyblinders123"
},
{
    email : "mafca@gmail.com",
    password : "mafca227"
},
{
    email : "jumera@gmail.com",
    password : "jumera.123"
}]

const publicUser = [
    {
              heading : "todays heading 19/10/2021",
              artcle : "this article is about AI and ML "

},
{

}
]
const privateUser = [{
    heading : "todays heading 19/10/2021",
              artcle : "this article is about blackhole and cosmos "
}]

const lockUser =[
    {
        heading : "secret documents 19/10/2021",
        artcle : "these docs contain secrets "
    }
]


module.exports = {                /*export isi liye karte hai kahi aur use kar sake*/
    users,
    publicUser,
    privateUser,
    lockUser
}