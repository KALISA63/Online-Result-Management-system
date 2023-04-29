const express= require('express');
const router=express.Router();
const Subject=require("../models/Subjects")
const Mark=require("../models/mark-lect.js")
const User=require('../models/User')
const Department = require('../models/Department.js');
const { verifyLecture } = require('../middlewares/verify');



// register mark

router.post('/register',verifyLecture, async (req, res)=>{

// router.post('/register', async (req, res)=>{

    const newMark = new Mark(req.body);
    try {
        const savedMark  = await newMark.save();
        return res.status(200).json(savedMark);
        
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }        
})

//update Mark


        router.patch("/editById/:id",verifyLecture, async (req,res)=>{
            try{
                const mark=await Subject.findById(req.params.id);
                if (req.body.studId === req.params.id) {
                try{
                    const updatedMark=await Mark.findByIdAndUpdate(req.params.id,{
                        $set:req.body
                    },{new:true});
                    return res.status(200).json(updatedMark)
                }catch(err){
                    return res.status(500).json(err);        
                }
                } else{
                    return res.status(404).json("you are not lecture!!!")
                }
            }catch(err){
                return res.status(500).json(err);
            }
        });


//get Mark

router.get('/findById/:id',async(req,res)=>{
    try{
        const mark= await Mark.findById(req.params.id)
        if(!mark){
            return res.status(401).json("mark not found");
        }else{
            return res.status(200).json(mark)
        }
    }catch(err){
        return res.status(500).json(err);
    }
});

//get all Marks


router.get("/getAll",async(req, res)=>
{
    const username=req.query.user;
    const studName=req.query.studName;
    try{
        let marks;
        if(username){
            marks=await Mark.find({username})
        }else if(studName){
            marks=await Mark.find({mark:{
                $in:[studName]
            }})
        }else{marks=await Mark.find()
        }
        res.status(200).json(marks);
    }catch(err){
        res.status(500).json("you are not lecture")
    }
})

module.exports=router