// postgres - UI 
//Socket

const db = require('./db')
const express = require('express');
const { json } = require('react-router-dom');
const app = express();
const cors = require('cors');
require("dotenv").config();

const {createServer} = require("http");
const httpServer = createServer(app);
const {Server} = require("socket.io")
io = new Server (httpServer, {
   cors: {
      origin: "http://localhost:3000",
      methods: ["GET, POST"]
   }
});



io.on("connection", (socket) => {
   console.log( `User Connected ${socket.id}`)
})




app.use(cors());
app.use(express.json());
app.post("/", async (req, res) => {
    res.status(200).json({
      status: "success"
      
    })
    console.log(req.body)
})

 app.get("/", async (req, res) => {
   try {
        const results = await db.query(`SELECT * FROM public."ManageAGV_db_agvdata" ORDER BY data_id DESC LIMIT 1;`);
        console.log(results)
         res.status(200).json ({
            status: "success",
            results: results.rows.length,
            data: {
               AGV_data: results.rows
            }
            })
         } catch(err) {
      console.log(err)
   }
 });

 app.get("/team", async (req, res) => {
    try {
        const results_1 = await db.query(`SELECT * FROM public."GetAGVData_db_agvdata" ORDER BY data_id DESC LIMIT 1;`)
        console.log(results_1)
        res.status(200).json ({
         status: "success",
         results: results_1.rows,
         data : {
            AGV_data_1 : results_1.rows,
         }
        })
    } catch(err) {
        console.log(err)
    }
 });

 const port = process.env.PORT || 3008; 
   httpServer.listen(port, () => { 
    console.log(`Server is listening on port ${port} `)
 });

