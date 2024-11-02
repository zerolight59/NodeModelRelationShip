const express = require('express');

const app=express();
const port = process.env.PORT || 3000;

app.use(express.json());

const categories = [
    {id:1,name:"web"},
    {id:2,name:"mobile"},
    {id:3,name:"photography"},
]

app.get('/api/categories',(req,res)=>{
    res.send(categories);
})

app.get('/', (req, res) => {
    res.send(categories);
});


app.post('/api/categories',(req,res)=>{
    const category ={
        id:categories.length+1,
        name: req.body.name
    };
    categories.push(category);
    res.send(category);
})

app.put('/api/categories/:id',(req,res)=>{
    const category = categories.find(c=>c.id === parseInt(req.params.id));
    if (!category) {
        return res.status(404).send("the given catagory id  was not found")
    }

    category.name=req.body.name;
    res.send(category)
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});