const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/taskModel');

const app = express();
const URI = "mongodb+srv://jigyasuprakash3:WaMFXdoinuQkzGrU@todo-application.t2wcgfi.mongodb.net/todo-db?retryWrites=true&w=majority&appName=Todo-application";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hii, the application is running!")
})

// Create API
app.post("/tasks", async (req, res) => {
    try{
        let item = req.body.item;
        let isCompleted = false;
        let result = await Task.create({item: item, isCompleted: isCompleted})
        res.status(200);
        res.send(result);
    }catch (error){
        console.log(error);
        res.status(500);
        res.send("Something went wrong!")
    }
})

// Read API
app.get("/tasks", async (req, res) => {
    try{
        let result = await Task.find({})
        res.status(200);
        res.send(result);

    }catch (error){
        console.log(error);
        res.status(500);
        res.send("Something went wrong!")
    }
})

// Update API
app.get("/tasks/revertCompletion/:id", async (req, res) => {
    try{
        let id = req.params.id;
        console.log(id);
        let record = await Task.findOne({_id: id})
        console.log(record)
        let update = {isCompleted: !record.isCompleted}
        let result = await Task.updateOne({_id: id}, update);
        res.status(200);
        res.send(result);
    }catch (error) {
        console.log(error);
        res.status(500);
        res.send("Something firse went wrong!")
    }
})

// Delete API
app.delete("/tasks", (req, res) => {

})

mongoose.connect(URI).then(() => {
    console.log("Mongo DB connected")
    app.listen("3030", function () {
        console.log(`App is listening`);
    })
}).catch((err) => {
    console.log(err);
});
