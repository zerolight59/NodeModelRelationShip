const express = require('express');
const categories = require("./Routes/categories");
const mongoose = require('mongoose');

const app=express();
const port = process.env.PORT || 3000;  
mongoose.connect("mongodb+srv://manusankaru10:DUFpAf65pkRUTcTh@cluster0.v5sqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("connection succesfull"))
.catch(err=>console.error("coundint connect to mongodb",err))

app.use(express.json());
app.use(categories);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});