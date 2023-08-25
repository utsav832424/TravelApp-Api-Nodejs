const {create,getplacebycity,getAllplace_account,getAccountpost,Famous_place,getAccountpostinAhemedabad }=require("./place.controller");

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
  router.post("/", fileupload.array('image',10),create);
  router.get("/city/:id",upload,getplacebycity);
 
  router.get("/accountpost/:id",upload,getAllplace_account);
  router.get("/getAccountpost/:id",upload,getAccountpost);
  router.get("/getAccountpostinAhemedabad/:id",upload,getAccountpostinAhemedabad);
  router.get("/Famous_place",Famous_place);





//router.post("/",create);

module.exports=router;