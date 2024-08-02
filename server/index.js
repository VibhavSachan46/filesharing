const express = require("express")
const db = require("./config/db")
const userRoutes = require("./routes/User.route")
const { cloudinaryConnect } = require("./config/cloudinary.config")
const cors = require('cors');

const app = express()
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000

db.connect()
cloudinaryConnect()


// routes
app.use("/api/v1/auth", userRoutes)

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running hurra....'
    })
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})