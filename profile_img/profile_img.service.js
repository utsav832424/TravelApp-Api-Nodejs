const pool = require("../config/databsae");

var moment = require("moment");

module.exports={
    profile_img:(data,callBack)=>{
        pool.query(
            `insert into profile_img(userid,image) values(?,?)`,
            [
                data.userid,
                data.image,
                moment(new Date()).format(`YYYY-MM-DD hh:mm:ss`)
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    }
}