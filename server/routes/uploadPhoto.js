const catchAsync = require('../middleware/errorHandler');
const upload = require('../middleware/uploadphoto');

const router = require('express').Router()

router.post('/', upload.single('file') ,catchAsync(
    async (req, res, next)=>{
        const file = req.file.path;
        return res.json(file)
    } )
)

module.exports = router