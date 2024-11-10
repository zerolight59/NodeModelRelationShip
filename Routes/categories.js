const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');

const router = express.Router();
const app = express();
app.use(express.json());


const categorySchema = new mongoose.Schema({
    name:{type :String ,required :true , minlength : 3 ,maxlength : 7},
});

const Catagory = mongoose.model('Catagory',categorySchema);

router.get('/api/categories',async (req,res)=>{
    let catagory = await Catagory.find();
    res.send(catagory);
})

router.get('/', (req, res) => {
    res.send(categories);
});


router.post('/api/categories',async (req,res)=>{
    
    const {error} =validateData(req.body)
    if (error) {
        console.log('Validation error:', error.details[0].message);
        return res.status(400).send(error.details[0].message)
    }
    const category = new Catagory({
        name : req.body.name
    });
    await category.save();
    res.send(category);
})

router.put('/api/categories/:id',async (req,res)=>{

    const {error} =validateData(req.body)
    if (error) {
        console.log('Validation error:', error.details[0].message);
        return res.status(400).send(error.details[0].message)
    }

    const category = await Catagory.findByIdAndUpdate(req.params.id,{name : req.body.id},{new :true})
    if (!category) {
        return res.status(404).send("the given catagory id  was not found")
    }
    res.send(category)
});


router.delete('/api/categories/:id',async (req,res)=>{
    const category = await Catagory.findByIdAndDelete(req.params.id)
    if (!category) {
        return res.status(404).send("the given catagory id  was not found")
    }

    res.send(category)
});

// router.get('/api/categories/:id',(req,res)=>{
//     const category = categories.find(c=>c.id === parseInt(req.params.id));
//     if (!category) {
//         return res.status(404).send("the given catagory id  was not found")
//     }
//     res.send(category)
// });

function validateData(catagory) {
    const schema = joi.object({
        name : joi.string().min(3).required()
    });

    return schema.validate(catagory)
}

module.exports = router;