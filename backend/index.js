const express = require("express");
const app = express();
const{connectDB ,User} = require('./db');
const userRouter = require('./routes/userRoutes')
const accountRouter = require('./routes/accountRouter');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/user',userRouter);
app.use('/account',accountRouter);
connectDB();


app.listen(5000,(req,res)=>{
    console.log("Server is listenig to port 5000");
})



// //fetch vs axios
// const axios  = require('axios');

// //fetch
// function main(){
//     fetch("http://localhost:3000/todos")
//     .then((response)=>{
//         return response.json();
//     })
//    .then(json => {
//         console.log(json); 
//     })
// }

// //we have to convert the response that fecth got into json which is an async call
// //we get access directly to response data by awaiting on a function response.json()
// // we have to define the type of request in the second argunent
// async function main(){
//     const response = await fetch("https://localhost/3000/todos",{
//         method: "POST",
//         body:{
//             username: "aryanandoria",
//             password: "12345"
//         },
//         headers: {
//             "Authorization": "Bearer 123"
//         }
//     });
//     const json = await response.json();
//     console.log(json.todo.length);
// }

// //axios
// //axios automatically understands that data coming back is json so we dont have to await response to convert it into json
// //we get access directly to response data
// //we can directly define type of reequest like axios.post or axios.put
// async function main(){
//     const response = await axios("https://localhost/3000/todos",
//     {
//         username: "aryanandoria",
//         password:"12345"
//     },
//     {
//         headers: {
//             "Authorization": "Bearer 123"
//         }
//     });
//     console.log(response.data.todo.length);
// }