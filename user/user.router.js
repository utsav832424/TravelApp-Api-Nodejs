const { createUser,getUser,getUserby,update,deleteUser,login,update_profile_img,update_pass,sendfemil,otpinemail} = require("./user.controller");

const multer = require('multer');
var upload = multer().array();

const router = require("express").Router();
const {checkToken}=require("../auth/token_validation");


//router.post("/", createUser);
router.get("/",checkToken,getUser);
router.get("/:id",getUserby);
//router.patch("/",update);
//router.patch("/",deleteUser);
// router.post("/login",login)

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
  router.post("/", fileupload.single('profile_img'), createUser);
  router.post("/sendmail", upload, sendfemil);
  router.patch("/",fileupload.single('profile_img'),update);
  router.patch("/profile_pic/:id",fileupload.single('profile_img'),update_profile_img);
  router.patch("/update_pass/:id",upload,update_pass);
  router.post("/login", upload, login);
  router.post("/verifyotp", upload, otpinemail);

module.exports=router;