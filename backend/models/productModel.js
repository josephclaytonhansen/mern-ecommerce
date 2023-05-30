import mongoose from 'mongoose'
const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name:{type: String, required: true, unique: false},
    rating:{type: Number, required: true, unique: false},
    comment:{type: String, required: true, unique: false},
}, {timestamps: true})

const productSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name:{type: String, required: true, unique: false},
    image:{type: String, required: true, unique: false},
    brand:{type: String, required: true, unique: false},
    category:{type: String, required: true, unique: false},
    description:{type: String, required: true, unique: false},
    reviews: [reviewSchema],
    rating:{type: Number, required: true, unique: false, default:0},
    numReviews:{type: Number, required: true, unique: false, default:0},
    price:{type: Number, required: true, unique: false, default:0},
    countInStock:{type: Number, required: true, unique: false, default:0},
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)
export default Product