const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require( '../verifyToken')

//CREATE
router.post('/write', verifyToken, async(req, res) => {
  try {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (error) {
    res.status(500).json(error)
  }
})

//UPDATE
router.put('/:id', verifyToken, async(req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(500).json(error)
  }
})


//DELETE
router.delete("/:id", verifyToken, async (req,res)=>{
  const postId = req.params.id
  try{
      await Post.findByIdAndDelete(postId)
      await Comment.deleteMany({postId: postId})
      res.status(200).json("Post has been deleted!")
  }
  catch(err){
      res.status(500).json(err)
  }
})



//GET POST DETAILS
router.get('/:id', async(req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET ALL POSTS
router.get('/', async(req, res) => {
  try {
    const query = req.query
    const searchFilter = {
      title: {$regex: query.search, $options: "i"}
    }
    const posts = await Post.find(query.search ? searchFilter : null)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET USER POSTS
router.get('/user/:userId', async(req, res) => {
  try {
    const posts = await Post.find({userId: req.params.userId})
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router