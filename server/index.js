const express = require("express");
const cors = require("cors");
const pool = require("./connection");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes

app.post('/todo',async(req,res)=>{
    const  {decription} = req.body;
    try {
        const newTodo = await pool.query("INSERT INTO todo (decription) VALUES($1) RETURNING *",[decription]);
        res.json("Created");

    } catch (error) {
        console.log(error)
    }
})

app.get('/todo',async(req,res)=>{
    try {
        const getAll = await pool.query("SELECT * FROM todo");
        res.json(getAll.rows);
    } catch (error) {
        console.log(error)
    }
})

app.get('/todo/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const getById = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(getById.rows[0]);
    } catch (error) {
        console.log(error)
    }
})

app.put('/todo/:id',async(req,res)=>{
    try {

        const {id} = req.params;
        const {decription} = req.body
        const updateTodo = await pool.query("UPDATE todo SET decription = $1 WHERE todo_id = $2",[decription,id]);
        res.json("UPDATED")
        
    } catch (error) {
        console.log(error)
    }
})

app.delete('/todo/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("Deleted")
    } catch (error) {
        console.log(error)
    }
})



app.listen(5000,()=>{
    console.log("server has started on port 5000");
})