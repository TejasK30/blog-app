const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

//UPDATE
router.put('/:id', verifyToken, async(req, res) => {
  try {
    if(req.body.password){
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hashSync(req.body.password, salt)
    }
    const upDatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
    res.status(200).json(upDatedUser)
  } catch (error) {
    res.status(500).json(error)
  }
})



//DELETE
router.delete("/:id", verifyToken, async(req,res)=>{
  const user = req.params.id
  try{
    await Comment.deleteMany({ userId: req.params.id })
    await Post.deleteMany({ userId: req.params.id })
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted!")
  }
  catch(err){
      res.status(500).json(err)
  }
})



//GET USER
router.get("/:id",async (req,res)=>{
  try{
      const user=await User.findById(req.params.id)
      const {password,...info}=user._doc
      res.status(200).json(info)
  }
  catch(err){
      res.status(500).json(err)
  }
})



module.exports = router