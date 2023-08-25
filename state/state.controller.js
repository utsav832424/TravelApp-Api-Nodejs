const { crateState,getState,getCity } = require("./state.service");

module.exports={
    
    state:(req,res)=>{
        const body = req.body;
        body.image = req.file.path.replace('\\','/');
        crateState(body,(err,results)=>{
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
    },
    getstate: (req, res) => {
        getState((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getcity: (req, res) => {
        var data = req.params;
        console.log("data",req);
        getCity(data,(err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
        
}