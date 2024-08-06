const express = require("express")
const router = express.Router()

const { upload,  deleteFile } = require("../controllers/Upload.controller")

const { auth } = require("../middleware/auth")

router.post("/upload", auth, upload)

router.delete("/file/:id", auth, deleteFile)

module.exports = router