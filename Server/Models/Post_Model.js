const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const {ObjectId} = Schema.Types;


const postSchema = new Schema(
    {
        profileId:{
            type: ObjectId,
            trim: true,
            required: true,
        },
        description:{
            type: String,
            trim: true,
            maxlength:8000
        },
        image_video:[
            {
               public_id:{
                type: String,
                trim: true
               },
               imgUrl:{
                type: String,
                trim: true
               }
            }
        ],
        tag_friends:[
            {
                ID:{
                    type:ObjectId,
                    trim: true
                }
            }
        ],
        publics:{
            type: Boolean,
            trim: true,
            default: false
        },
        friends:{
            type: Boolean,
            trim: true,
            default: true
        },
        hide_profileId:[
            {
                ID:{
                    type:ObjectId,
                    trim: true
                }
            }
        ],
        onlyMe:{
            type: Boolean,
            trim: true,
            default: false
        },
        specificShow_profileId:[
            {
                ID:{
                    type:ObjectId,
                    trim: true
                }
            }
        ],
    },
    {
        timestamps: true, versionKey: false
    }
);

const postModel = model('posts',postSchema);

module.exports = postModel;