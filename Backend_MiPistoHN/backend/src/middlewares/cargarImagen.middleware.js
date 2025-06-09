const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const extImage = path.extname(file.originalname)
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${extImage}`
        cb(null, uniqueName)
    }
})

const upload = multer({storage})

module.exports = upload