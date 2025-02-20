const express = require("express");
const app = express();
let path = require("path");
const mysql = require("mysql2");
const cors=require("cors");
// const stream = require("/emotion.js")
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "suga@123",
    database: "Emotions",
});

var allEmotion={
    happy: [109815423, 889114311, 109817676, 811267800, 76182059, 1219741136, 1139646951, 3573131, 37977149],
    sad: [804092154, 841396707, 901722501, 154637590, 1080860547, 61387835, 1219740946, 811267576, 782470134],
    surprised: [1026391929, 1219737282, 889114311, 1133105280, 901723301, 742996492, 232420590, 898714584, 76293059],
    angry: [901722501, 789168950, 2721785, 516290971, 31211088, 81077086, 790274287, 80577755, 792884617],
    neutral: [810778, 1215078716, 897292996, 80802063, 83735561, 67691546, 799958976, 80203835, 838067360],
    disgust: [154338787, 109118539, 1098155077, 83409616, 215424181, 792556286, 221835210, 837803163, 767974807],
    fear: [4770633, 858957013, 79752572, 85233911, 793219647, 47119659, 696047329, 84621025, 79785694 ],
}

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
    // let videoAns = stream.getLocalStream();
    console.log(videoAns);
    res.send(videoAns);
})

app.get("/addUser",(req,res)=>{
    connection.query("select userUniqueId,password from users", (err,result) => {
        if(!err){
            res.status = 200;
            console.log(result);
            res.send(result);
        }
        else{
            console.log("Throw error");
        }
    })
})

app.post("/newUser", (req, res) => {
    console.log(req.body);
    let {userName, userPass, userEmail} = req.body;
    console.log("Data", userName)
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

app.post('/emotions',async (req,res)=>{
    // console.log(req.body);
    
    var emotion=req.body.emotion;
    var albumIds=allEmotion[emotion];
    var response;
    var responseData;

    try {
        var responses=await Promise.all(
            albumIds.map(async (albumId) => {
                try {
                    response = await fetch('https://saavn.dev/api/playlists?id='+albumId);
                    responseData= await response.json();
                    return responseData;
                } catch (error) {
                    console.log(error);
                    return null
                }
            })
        )

        responses=responses.filter((res)=>res!=null)
        console.log(responses);
        
        res.send(responses);    

    } catch (error) {
        console.log(error);   
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