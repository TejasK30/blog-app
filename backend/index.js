const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require("dotenv")
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

//middlewares
app.use(cookieParser())
dotenv.config()
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())

//db
const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database is connected successfully");
  } catch (error) {
    console.log(error);
  }
}
connectDB()

const storage = multer.diskStorage({
  //storage folder to save the images folder is images
  destination:(req, file, fn) => {
    fn(null, "images")
  },

  //for filename
  filename: (req, file, fn) => {
    fn(null, req.body.img)
    // fn(null, "image1.jpg")
  }
})

const upload = multer({storage: storage})
app.post('/api/upload', upload.single("file"), (req, res) => {
  res.status(200).json("Images has been successfully uploaded.")
})

app.use("/images",express.static(path.join(__dirname,"/images")))
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)

app.listen(process.env.PORT, () => {
  console.log("Server is running at post: " + process.env.PORT);
})

//7OX3wwCW7tffW5MZ