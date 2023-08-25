const { create , getLike} = require("./user_place_like.controller");

const router = require("express").Router();

const multer = require('multer');
var upload = multer().array();




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      var fileData = file.originalname.split('.');
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileData[fileData.length - 1])
    }
  });
  
  var fileupload = multer({storage:storage});
  router.post("/", upload,create);
  router.get("/",getLike);
 



module.exports=router;