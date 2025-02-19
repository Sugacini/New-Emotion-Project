const express = require("express");
const app = express();
let path = require("path");
const mysql = require("mysql2");
const cors=require("cors");
const stream = require("./public/emotion.js")
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "suga@123",
    database: "Emotions",
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const pubDir = path.join(__dirname, "/public");
app.use(express.static(pubDir));


app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
}));


connection.connect((err) =>{
    if(err){
        console.log("Error",err);
    }
    else{
        console.log("connected Mysql");
    }
})

app.get("/video", (req, res) => {
    let videoAns = stream.getLocalStream();
    console.log(videoAns);
    res.send(videoAns);
})

app.get("/addUser",(req,res)=>{
    connection.query("select userUniqueId from users", (err,result) => {
        if(!err){
            res.status = 200;
            res.send(result);
        }
    })
})

app.post("/newUser", (req, res) => {
    console.log(req.body);
    let {userName, userPass, userEmail} = req.body;
    console.log("Data", userName)
    console.log(req.body.name, req.body.pass)
    try{
        connection.query("insert into users(userName, password, userUniqueId) values(?,?,?)", [userName, userPass, userEmail], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        })
    }
    catch(err){
        console.log("Error", err);
    }
})

app.listen(3000, () => {
    console.log("Server Connected port 3000");
})




























































// app.post("/user", async (req, res) => {
// //     try{
// //     const { userName, email, pass } = req.body;
// //     console.log(req.body);
// //     connection.query("insert into users(userName, password, email) values(?,?,?)", [userName, pass, email], (err, result) => {
// //         if(err){
// //             console.log("Error", err);
// //         }
// //         else{
// //             res.send(result);
// //         }
// //     })
// //     }
// //     catch(err){
// //         console.error(err);
// //     }
// // })


// app.post('/user', async (req, res) => {
//     try {
//     //   const { username, email, password } = req.body;
//       console.log(req.body);
  
//       // Check if user already exists
//     //   const [existingUsers] = await promisePool.query(
//     //     'SELECT * FROM users WHERE email = ? OR username = ?',
//     //     [email, username]
//     //   );
  
//     //   if (existingUsers.length > 0) {
//     //     return res.status(400).json({
//     //       message: 'User already exists'
//     //     });
//     //   }
  
//     //   // Hash password
//     //   const hashedPassword = await bcrypt.hash(password, 10);
  
//     //   // Insert new user
//     //   const [result] = await promisePool.query(
//     //     'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//     //     [username, email, hashedPassword]
//     //   );
  
//     //   // Return user data (excluding password)
//     //   const userData = {
//     //     id: result.insertId,
//     //     username,
//     //     email
//     //   };
  
//     //   res.status(201).json({
//     //     message: 'User created successfully',
//     //     user: userData
//     //   });
//     } catch (error) {
//       console.error('Signup error:', error);
//       res.status(500).json({
//         message: 'Error creating user'
//       });
//     }
//   });