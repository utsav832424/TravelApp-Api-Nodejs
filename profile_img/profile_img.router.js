const {profile_img} = require("./profile_img.controller");

const router = require("express").Router();
const multer = require('multer');
var upload = multer().array();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profile_img/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      var fileData = file.originalname.split('.');
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileData[fileData.length - 1])
    }
  });
  
  var fileupload = multer({storage:storage});
  router.post("/", fileupload.single('image'), profile_img);

module.exports=router;
