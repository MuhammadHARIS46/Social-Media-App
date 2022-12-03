import PostMessage from "../models/postMessage.js"
import mongoose from "mongoose"

export const getPosts = async (req,res)=>{
    try {
        const postMessages= await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i"); //i means u write test or Test or TEST or tEsT all same
        // or mtlb chahay tag dhond ya title ya dono
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req,res)=>{
    const post = req.body;
    // console.log("post-data: ", post)
    const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
    try {
        await newPost.save();
        res.status(209).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}
export const updatePost = async (req,res) => {
    const {id : _id} = req.params;

    const post =req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send ("No post with this id")

    const updatedPost = await PostMessage.findByIdAndUpdate (_id , {...post, _id} ,{new:true});

    res.json (updatedPost)
} 
export const deletePost = async (req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send ("No post with this id");
    const response = await PostMessage.findByIdAndRemove(id);
    return response;
}
export const likePost  = async (req,res) => {
    const {id} = req.params;
    if (!req.userId) return res.json({message:"Unauthenticated"});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send ("No post with this id");
    const post =await PostMessage.findById(id);

    const index= post.likes.findIndex((id)=>id=== String(req.userId));

    if (index===-1) {
        // means his id is not in like array so if he clicks now he is going to like it
        post.likes.push(req.userId)
    } else {
        // means his id is there in like array so if he clicks it is going to be a dislike
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate (id , post ,{new:true})
    res.json(updatePost)
}