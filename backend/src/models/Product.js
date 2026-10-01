import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountprice:{
        type:String                        
    },
    category:{
        type:String,
        required:true,
        enum:['men','women','child']
    },
    subcategory:{
        type:String,
        required:true
    },
    description: {
         type:String,
        required: true
    },
    sizes:
        [{
            type:String
        }],
    colors:[
        {name:String,hexcode:String}
    ],
    images:[
        {type:String}
    ],
    tags:[
        {type:String}
    ],
   stock: { type: Number, default: 10 }
}, { timestamps: true});

const Product = mongoose.model('Product',productSchema)

export default Product;