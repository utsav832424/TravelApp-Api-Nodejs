const { profile_img } = require("./profile_img.service");

module.exports={
    
    profile_img:(req,res)=>{
        const body = req.body;
        body.image = req.file.path.replace(/\\/g,"/");
        profile_img(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"State is not uploaded"
                })
            }
            return res.status(200).json({
                success:1,
                data:results,
            })
        })
    }
        
}

