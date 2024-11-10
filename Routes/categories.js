const express = require('express');
const joi = require('joi');

const router = express.Router();
const app = express();
app.use(express.json());


const categories = [
    {id:1,name:"web"},
    {id:2,name:"mobile"},
    {id:3,name:"photography"},
]

router.get('/api/categories',(req,res)=>{
    res.send(categories);
})

router.get('/', (req, res) => {
    res.send(categories);
});


router.post('/api/categories',(req,res)=>{
    
    const {error} =validateData(req.body)
    if (error) {
        console.log('Validation error:', error.details[0].message);
        return res.status(400).send(error.details[0].message)
    }
    const category ={
        id:categories.length+1,
        name: req.body.name
    };
    categories.push(category);
    res.send(category);
})

router.put('/api/categories/:id',(req,res)=>{
    const category = categories.find(c=>c.id === parseInt(req.params.id));
    if (!category) {
        return res.status(404).send("the given catagory id  was not found")
    }

    category.name=req.body.name;
    res.send(category)
});


router.delete('/api/categories/:id',(req,res)=>{
    const category = categories.find(c=>c.id === parseInt(req.params.id));
    if (!category) {
        return res.status(404).send("the given catagory id  was not found")
    }

    const index = categories.indexOf(category);
    categories.splice(index,1);
    res.send(category)
});

router.get('/api/categories/:id',(req,res)=>{
    const category = categories.find(c=>c.id === parseInt(req.params.id));
    if (!category) {
        return res.status(404).send("the given catagory id  was not found")
    }
    res.send(category)
});

function validateData(catagory) {
    const schema = joi.object({
        name : joi.string().min(3).required()
    });

    return schema.validate(catagory)
}

module.exports = router;