const user = require('../models/user');
const sendResponse = require('../shared/sendResponse');

async function postnewuser(req, res) {
    if (req.body.name && req.body.mobile) {
        try {
            let User = await new user(req.body).save();

            if (User) {
                sendResponse(res, 200,'User added successfully');
            }
            else {
                sendResponse(res, 402 , "User not added" );
            }
        } catch (e) {
            sendResponse(res, 500, "Internal Server Error", e);
        }
    }
    else {
        sendResponse(res, 400, 'Bad request');
    }
}

async function getuserById(req,res){
    try{
     
        let result = await user.find({_id : req.body.id})
        if(result)
        sendResponse(res, 200, 'User Found Successfully.',  result);
        else
        sendResponse(res, 402, 'No data found'); 
    } catch(e){
        sendResponse(res, 500, e.message);
    }
 }
 
 async function updateuser(req,res){
    console.log("BODy==",req.body)
    try{
     
        let result = await user.findOneAndUpdate({_id : req.body._id},{$set : req.body},{$new:true})
        if(result)
        sendResponse(res, 200, 'User Found Successfully.');
        else
        sendResponse(res, 402, 'No data found'); 
    } catch(e){
        sendResponse(res, 500, e.message);
    }
 }
 
 async function deleteUser(req,res){
    console.log("BODY++",req.body)
    try{
      let result=await user.findOneAndDelete({_id: req.body._id})
      if(result)
      sendResponse(res,200,'user Delete Successfully');
      else
      sendResponse(res,402, 'No User Deleted')
    } catch(e){
 
       sendResponse(res,500,e.message);
    }
 
 }



module.exports={
    postnewuser,
    getuserById,
    updateuser,
    deleteUser

}