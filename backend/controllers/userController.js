import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import User from "../models/userModels.js"
import createToken from "../utils/generateToken.js";



export const createUser = async (req, res) =>{
    const {name , email, password} = req.body;
    if(!name ||!email ||!password){
        return res.status(400).json({msg: "Please provide all fields."});
    }
    const userExist = await User.findOne({email})
    if(userExist){
        return res.status(400).json({msg: "User already exists."});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({name, email, password: hashedPassword})

    try {
       await newUser.save();
       createToken(res, newUser._id);
       res.status(201).json({success:true, data:newUser})
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}

export const login = async(req, res)=>{
    const { email, password } = req.body;

  // console.log(email);
  // console.log(password);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      });
      return;
    }
  }
}

export const logout = async (req, res)=>{
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0) });
    res.json({ success: true, message: 'Logged out' });
} 


export const getUser = async (req, res)=>{
    const user = await User.find({});
    res.json({success: true, data: user});
}
export const updateUser = async (req, res)=>{
    const {id} = req.params;
    const user = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Invalid user id"})
    }
    try {
       const updatedUser = await User.findByIdAndUpdate(id, user, {new:true}) 
       res.status(200).json({success: true, data:updatedUser})
    } catch (error) {
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const deleteUser = async (req, res)=>{
    try {
        const {id} = req.params
       const user =  await User.findById(id)
       if(!user){
           return res.status(404).json({success:false, msg:"User not found"})
       }
       await User.findByIdAndDelete(id)
        res.status(200).json({success: true, msg:"User deleted"})
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


export const userRole = async (req,res)=>{
    try {
        const { role } = req.body;
        // Validate that the role is either 'user' or 'admin'
        if (!['user', 'admin'].includes(role)) {
          return res.status(400).json({ message: 'Invalid role specified' });
        }
        const user = await User.findByIdAndUpdate(
          req.params.id,
          { role },
          { new: true }
        );
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

