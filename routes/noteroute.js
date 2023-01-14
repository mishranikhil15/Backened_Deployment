const express=require("express")

const{Notemodel}=require("../model/notemodel")
const jwt=require("jsonwebtoken")
const noterouter=express.Router()

noterouter.get("/", async(req,res)=>{
////verify token
const data= await Notemodel.find()
    res.send(data)
})

noterouter.post("/create",async(req,res)=>{


    ////verify token
   const payload=req.body;
   try {
    const new_note= new Notemodel(payload)
    await new_note.save()
    res.send("Created the note") 
   } catch (error) {
    console.log(err)
    res.send({"msg":"something went wrong"})
   }
  
})

noterouter.patch("/update/:id", async(req,res)=>{
    /////verify token
    const payload=req.body;
    const id=req.params.id;
    const note= await Notemodel.findOne({_id:id})
    const userID_in_note=note.userID
    const userID_request=req.body.userID
  try {
    if(userID_request==userID_in_note){
      await Notemodel.findByIdAndUpdate({"_id":id},payload)
      res.send("Updated the note") 
    }else{
      res.json({"msg":"you are not authorized"})
    }
   
  } catch (error) {
    console.log(err)
    res.send({"msg":"something went wrong"})
  }

 })


 noterouter.delete("/delete/:id",async(req,res)=>{
    ///verify token
    
    const id=req.params.id;
    const note= await Notemodel.findOne({_id:id})
    const userID_in_note=note.userID
    const userID_request=req.body.userID
  try {
    if(userID_in_note==userID_request){
      await Notemodel.findByIdAndDelete({"_id":id})
      res.json("Dleted the note") 
    }else{
      res.json({"msg":"you are not authorized"})
    }
   
  } catch (error) {
    console.log(err)
    res.send({"msg":"something went wrong"})
  }
 })

module.exports={
    noterouter
}



// {
//     "title":"Frontend",
//     "note":"Full stack crud FE psc",
//     "category":"livesession",
//     
     
//    }