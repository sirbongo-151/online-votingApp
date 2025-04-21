import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type: String,
        
    },
    position:{
        type: String,
        required: true
    },
    academicYear:{
        type: String,
    },
    votes:{
        type: Number,
        default: 0
    }
    
})

const Candidate =  mongoose.model("Candidate", candidateSchema)
export default Candidate;
