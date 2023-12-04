const multer = require('multer')
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    const filetypes = /text|txt|cpp|c|py|java/;
    if( filetypes.test(file.mimetype) )
        return cb(null, true);

    return cb(new Error('Diňe programmamirleme dilleriniň faýly bolmaly'))
};

const desc = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const createProblem = desc.fields([
  { name: "solution", maxCount: 1},
  { name: 'input', maxCount: 100 },
  { name: 'output', maxCount: 100 },
  { name: 'pre_output', maxCount: 1 },
  { name: 'config', maxCount: 1},
  { name: 'inputExample', maxCount: 1},
  { name: 'outputExample', maxCount: 1}
   
]);
const submitProblem = desc.fields([
  { name: "solution", maxCount: 1},
]);



module.exports = {
  createProblem,
  submitProblem 
}