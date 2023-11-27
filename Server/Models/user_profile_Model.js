const mongoose = require('mongoose');
const {Schema,model} = mongoose;


const userSchema = new Schema(
    {
        userName:{
            type: String,
            trim: true,
            required: true,
            minlength:3,
            maxlength:35
        },
        userImage:{
            type: String,
            trim: true,
            default:"https://res.cloudinary.com/dupdkfhyh/image/upload/v1700153070/7074311_3554557_cbyw1w.svg"
        },
        userBannerImg:{
            type: String,
            trim: true
        },
        birthYear:{
            type: String,
            trim: true,
            minlength:4,
            maxlength:4
        },
        job:{
            type: String,
            trim: true
        },
        bio:{
            type: String,
            trim: true,
            maxlength:500
        },
        workplace:{
            type: String,
            trim: true
        },
        high_School:{
            type: String,
            trim: true
        },
        college:{
            type: String,
            trim: true
        },
        current_city:{
            type: String,
            trim: true
        },
        home_town:{
            type: String,
            trim: true
        },
        gender:{
            type: String,
            trim: true
        },
        relationship:{
            type: String,
            trim: true,
            enum:['Single','In A Relationship','Married','Divorced']
        },
        instagram:{
            type: String,
            trim: true
        },
        twitter:{
            type: String,
            trim: true
        },
        telegram:{
            type: String,
            trim: true
        },
        discord:{
            type: String,
            trim: true
        },
        profile_lock:{
            type:Boolean,
            default: false
        },
        block_user: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ],
        save_post:[
            {
                type:Schema.Types.ObjectId,
                ref:'posts'
            }
        ],
        pin_post:[
            {
                type:Schema.Types.ObjectId,
                ref:'posts'
            }
        ],
        userId:{
            type:Schema.Types.ObjectId,
            ref:'users',
            required: true
        }
    },
    {
        timestamps: true, versionKey: false
    }
);

const userProfileModel = model('user-profiles',userSchema);

module.exports = userProfileModel;