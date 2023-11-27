const cloudinary = require("../Helpers/Cloundinay");
const { validationLength } = require("../Helpers/Validation");
const postModel = require("../Models/Post_Model");
const userProfileModel = require("../Models/user_profile_Model");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



exports.create_post = async(req)=>{
    try {
        const {description,tag_friends,hide_profileId,specificShow_profileId,publics,friends,onlyMe} = req.body;
        const data = await userProfileModel.findOne({userId:req.userId}).select({"_id":1,"profile_lock":1});
        const {img_video} = req.files;

        const  validateField = (value,fields)=>{
            if (value && value !== 'true' && value !== 'false') {
                return { status: 'Fail', message: `Invalid ${fields} value.They must be booleans.`};
            }
            return null;
        };

        const validationResults = [
            validateField(publics,"publics"),
            validateField(friends,"friends"),
            validateField(onlyMe,"onlyMe"),
        ];
        const failedValidation = validationResults.find(result => result !== null);
        
        if (failedValidation) {
            return failedValidation;
        };

        if(data.profile_lock && publics == "true"){
            return {status:"Fail",message:"Your profile is lock.unlock your profile first."};  
        };


        if(description){
            if(!validationLength(description,1,8000)){
                return {status:"Fail",message:"description must be 1 and 8000 characters."};
            };
        };

        const processIds = (data) => {
            if (data) {
                const dataArray = Array.isArray(data) ? data : [data];
                return dataArray.flatMap(ids => ids.split(',').map(ID => ({ ID })));
            }
            return [];
        };

       let dataTF = processIds(tag_friends);
       let dataHF = processIds(hide_profileId);
       let dataSF = processIds(specificShow_profileId);

        if(friends == "true" && onlyMe == "true"){
            return {status:"Fail",message:"something went wrong."};  
        };

        if(friends == "false" && onlyMe == "false" && publics == "false"){
            return {status:"Fail",message:"something went wrong."};  
        };

        if(publics == "true"){
            req.body.friends = true;
            req.body.onlyMe = false;
            dataSF = [];
            dataHF = [];
        };

        if(friends == "true" && publics == "false" && onlyMe == "false" ){
            req.body.publics = false;
            req.body.onlyMe = false;
            if(dataHF.length > 0){
                dataSF = []
            }else if(dataSF.length >0){
                dataHF = []
            }
        };
        
        if(onlyMe == "true" && publics == "false" && friends == "false"){
            req.body.publics = false;
            req.body.friends = false;
            dataSF = [];
            dataHF = [];
        };

        const uploadC = async (path)=> await cloudinary.uploader.upload(path,{ resource_type: 'auto' });

        let imgURL =[];

        if(img_video){
            const fifty = img_video.slice(0,50);
            for(const file of fifty){
                const {path} = file;
                const newPath = await uploadC(path);
                const faw = {
                    public_id:newPath.public_id,
                    imgUrl:newPath.secure_url
                };
                imgURL.push(faw);
            };
        };

       await new postModel({
            profileId: data._id,
            description,
            publics:req.body.publics,
            friends:req.body.friends,
            onlyMe:req.body.onlyMe,
            image_video: imgURL,
            tag_friends: dataTF,
            hide_profileId:dataHF,
            specificShow_profileId:dataSF
          }).save();

        return {status:"success",message:"post create successfully."};

    } catch (err) {
        return {status:"Fail",message:"something went wrong.",error:err.message};      
    }
};





exports.update_post = async(req)=>{
    try {
        
        const {description,tag_friends,hide_profileId,specificShow_profileId,publics,friends,onlyMe} = req.body;
        const data = await userProfileModel.findOne({userId:req.userId}).select({"_id":1,"profile_lock":1});

        const  validateField = (value,fields)=>{
            if (value && value !== 'true' && value !== 'false') {
                return { status: 'Fail', message: `Invalid ${fields} value.They must be booleans.`};
            }
            return null;
        };

        const validationResults = [
            validateField(publics,"publics"),
            validateField(friends,"friends"),
            validateField(onlyMe,"onlyMe"),
        ];
        const failedValidation = validationResults.find(result => result !== null);
        
        if (failedValidation) {
            return failedValidation;
        };

        if(data.profile_lock && publics == "true"){
            return {status:"Fail",message:"Your profile is lock.unlock your profile first."};  
        };


        if(description){
            if(!validationLength(description,1,8000)){
                return {status:"Fail",message:"description must be 1 and 8000 characters."};
            };
        };

        const processIds = (data) => {
            if (data) {
                const dataArray = Array.isArray(data) ? data : [data];
                return dataArray.flatMap(ids => ids.split(',').map(ID => ({ ID })));
            }
            return [];
        };

       let dataTF = processIds(tag_friends);
       let dataHF = processIds(hide_profileId);
       let dataSF = processIds(specificShow_profileId);

        if(friends == "true" && onlyMe == "true"){
            return {status:"Fail",message:"something went wrong."};  
        };

        if(friends == "false" && onlyMe == "false" && publics == "false"){
            return {status:"Fail",message:"something went wrong."};  
        };

        if(publics == "true"){
            req.body.friends = true;
            req.body.onlyMe = false;
            dataSF = [];
            dataHF = [];
        };

        if(friends == "true" && publics == "false" && onlyMe == "false" ){
            req.body.publics = false;
            req.body.onlyMe = false;
            if(dataHF.length > 0){
                dataSF = []
            }else if(dataSF.length >0){
                dataHF = []
            }











            
        };
        
        if(onlyMe == "true" && publics == "false" && friends == "false"){
            req.body.publics = false;
            req.body.friends = false;
            dataSF = [];
            dataHF = [];
        };

  
                 await postModel.findByIdAndUpdate({profileId:data._id,_id:req.params.id},{$set:{description,
                    publics:req.body.publics,
                    friends:req.body.friends,
                    onlyMe:req.body.onlyMe,
                    tag_friends: dataTF,
                    hide_profileId:dataHF,
                    specificShow_profileId:dataSF}});
            



return {status:"success",message:"post update successfully."};








    } catch (err) {
        return {status:"Fail",message:"something went wrong.",error:err.message};      
    }
};
