const express=require("express");
const { default: mongoose } = require("mongoose");
const app=express()



app.listen(8000,()=>{
    console.log(`Server going on port 8000`)
});




address="mongodb+srv://revanth2498:revanth2498@cluster0.dh16zas.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(address).then(()=>{
    console.log("connected db using mongoose")
}
).catch(err=>{
    console.log(err.description)
})

const Review=mongoose.Schema({
    username:{
        type:String,
    required:true
    },
    movie:{
        type:String,
    required:true
    },
    year:{
        type:Number,
    required:true
    },
    review:{
        type:String
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:10
    }
});

const review=mongoose.model("Reviews",Review)