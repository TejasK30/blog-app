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
    const newComment = new Comment(req.body)
    const savedComment = await newComment.save()
    res.status(200).json(savedComment)
  } catch (error) {
    res.status(500).json(error)
  }
})

//UPDATE
router.put('/:id', verifyToken, async(req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
    res.status(200).json(updatedComment)
  } catch (error) {
    res.status(500).json(error)
  }
})


//DELETE
router.delete("/:id", verifyToken, async (req,res)=>{
  const commentId = req.params.id
  try{
      await Comment.findByIdAndDelete(commentId)
      res.status(200).json("Comment has been deleted!")
  }
  catch(err){
      res.status(500).json(err)
  }
})

// GET POST COMMENTS
router.get('/post/:postId', async(req, res) => {
  try {
    const comments = await Comment.find({postId: req.params.postId})
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router