const pool = require("../config/databsae");

var moment = require("moment");

module.exports={
    createCommnet:(data,callBack)=>{
        pool.query(
            `insert into comments(userid,placeid,comment) values(?,?,?)`,
            [
                data.userid,
                data.placeid,
                data.comment,
                moment(new Date()).format(`YYYY-MM-DD hh:mm:ss`)
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getcomment: (data,callBack) => {
        pool.query(`SELECT cm.*,u.username,u.profile_img FROM comments cm LEFT JOIN users u on u.id=cm.userid WHERE cm.placeid=${data.placeid} `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
}