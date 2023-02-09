// postgres - UI 

const express = require('express');
const db = require('./db')
const { json } = require('react-router-dom');
const app = express();
const cors = require('cors');
require("dotenv").config();

app.use(cors());
app.use(express.json());
 app.get("/", (req, res) => {
   try {
        const results_1 = db.query(`SELECT * FROM public."GetAGVData_db_agvdata"`)
         res.status(200).json ({
            status: "success",
            results: results_1.rows,
            data: {
               AGV_data_1: results_1.rows
            }
            })
         } catch(err) {
      console.log(err)
   }
 });

 app.get("/team", async (req, res) => {
    try {
        const results = await db.query(`SELECT * FROM public."GetAGVData_db_agvdata"`)
        console.log(results.rows)
        res.status(200).json ({
         status: "success",
         results: results.rows,
         data : {
            AGV_data : results.rows,
         }
        })
    } catch(err) {
        console.log(err)
    }
 });

 const port = process.env.PORT || 3008; 
 app.listen(port, () => { 
    console.log(`Server is listening on port ${port} `)
 });