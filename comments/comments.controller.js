const {createCommnet,getcomment} = require("./comments.service");

module.exports={
    create:(req,res)=>{
        const body = req.body;
        createCommnet(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Comments is not Added"
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getComments: (req, res) => {
        var data = { ...req.params, ...req.query };
        console.log(data);
        getcomment(data,(err, results) => {
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