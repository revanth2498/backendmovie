
const express=require("express");
const { default: mongoose } = require("mongoose");
const app=express()



app.listen(8000,()=>{
    console.log(`Server going on port 8000`)
});




address="mongodb+srv://revanth2498:<password>@cluster0.dh16zas.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(address).then(()=>{
    console.log("connected db using mongoose")
}
).catch(err=>{
    console.log(err.description)
})



const Review=mongoose.Schema({
    username:{
        type:String,
    required:true},
    movie:{
        type:String,
    required:true},
    year:{
        type:Number,
    required:true
    },
    review:{
        type:String
    }
});

const review=mongoose.model("Review",Review)



const movie=mongoose.Schema({
    imdbRating:{
        type: Number,
    },
    Year:{
        type:Number,
    },
    Title:{
        type:String,
        required:true,
    },
    Rated:{
        type: String,
    },
    Released:{
        type:String,
        required:true,
    },
    Runtime:{
        type:String,
        required:true
    },
    Genre:{
        type:String,
        required:true
    },
    Director:{
        type:String,
        required:true
    },
    Writer:{
        type:String,
        required:true
    },
    actors:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    Country:{
        type:String,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],

})

const movies=mongoose.model("movies",movie)


// Create instances of the Review model
const review1 = new review({
    username: 'user1',
    movie: 'Inception',
    year: 2010,
    review: 'Great movie!'
});

const review2 = new review({
    username: 'user245',
    movie: 'Inception',
    year: 1994,
    review: 'Great film! very very good nice nice'
});


async function reviewAttachMovie(review) {
    try {
      const moviesToUpdate = await movies.findOne({Title: review.movie});
      console.log("in the block")
      const movieUpdated=await movies.findOneAndUpdate({Title: review.movie}, 
        {$push: {reviews: review._id}},{returnOriginal: false})
       console.log(movieUpdated)      
    } catch (error) {
      console.error('Error associating reviews with movies:', error);
    } finally {
      mongoose.connection.close();
      console.log('Connection closed');
    }
  }


//   let savedReview1; // Declare the variable outside the promise chain

//   review2.save()
//     .then(review => {
//       savedReview1 = review; // Assign the saved review to the variable
//       console.log('Review 1 saved:', savedReview1);
//       reviewAttachMovie(savedReview1)

//     }).catch(err => {
//       console.error('Error saving reviews:', err);
//     });
  




const getMovieReviews = async () => {
    try{
            const mo=await movies.find({Title:"Inception"}).populate('reviews')
            console.log("hi hello")
            return;
      }
      catch (err){
        console.log(err);
        return res.json(Response.Error("Error getting reviews"));
      }
  }


getMovieReviews();

// app.get("/allcourses",async(req,res)=>{
//     try{
//         const courses=await subject.find()
//         res.json(courses)
//     }catch(e){
//         res.json(e)
//     }
//  });
    
// app.post("/create",async(req,res)=>{
//     try{
//         const course= await subject.create(req.body)
//         res.json(course)
//     }catch(e){
//         res.json(e)
//     }
// });














