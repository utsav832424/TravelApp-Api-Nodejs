const pool = require("../config/databsae");

var moment = require("moment");

module.exports={
    crateState:(data,callBack)=>{
        pool.query(
            `insert into state(image,statename) values(?,?)`,
            [
                data.image,
                data.statename,
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
    getState: (callBack) => {
        pool.query(`SELECT * FROM state`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    getCity: (data,callBack) => {
        pool.query(`SELECT * FROM city where state_id=${data.id}`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
}