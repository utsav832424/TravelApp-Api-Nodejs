const { createLike, fetchLike, deleteLike, getlike,totalLike} = require("./user_place_like.service");


module.exports = {
    create: (req, res) => {
        const body = req.body;
        fetchLike(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Like is not Added"
                })
            }
       
            if (results[0].total == 0) {
                createLike(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Like is not Added"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    })
                })
            }
            else {
                deleteLike(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Like is not Added"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    })
                })
            }
        })

    },

    getLike: (req, res) => {
        getlike((err, results) => {
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