const express = require("express")
const db = require("./config/db")
const userRoutes = require("./routes/User.route")
const fileUploadRoutes = require("./routes/File.route")
const { cloudinaryConnect } = require("./config/cloudinary.config")
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const cors = require('cors');

const app = express()

db.connect()
cloudinaryConnect()

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

const PORT = process.env.PORT || 4000




// routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1", fileUploadRoutes)



app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running hurra....'
    })
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})