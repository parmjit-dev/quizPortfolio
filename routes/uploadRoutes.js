const express = require('express');
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' })
const path = require('path');
const Question = require('../models/questionModel');
const router = express.Router();

// const config = { storage: multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null,'../public/uploads');
//   },
//   filename: function(req, file, cb){
//     cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
//   }),
// fileFilter: function(file, cb){
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     cb('Error: Images Only!');
//   }
// },
// };

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: '../quiz/public/uploads',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Init Upload
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('photo');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!');
}

// router.get('/:id', (req, res))

router.post('/', (req, res) => {
 upload(req, res, (err) => {
    // try {
    //   // const quiz = await Question.findByIdAndUpdate(req.params.id, {image: req.file.path}, {
    //   //   new: true
    //   // });
    //   res.status(200).json({ status: 'success', path: { req.file.path } });
    // } catch () {
    //   res.status(404).json({
    //     status: 'fail',
    //     message: `${err}`
    //   });
    // }
    // console.log(req.file);
  // req.file is the `avatar` file
    if (err) {
      console.log(err);
      res.status(500).json({
        status: 'fail',
      });
    } else if (!req.file) {
      console.log('no file');
    } else {
      res.status(200).json({
        status: 'success',
        message: 'file uploaded',
        file: `uploads/${req.file.filename}`,
      });
    }
  });
});

module.exports = router;
