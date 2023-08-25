const pool = require("../config/databsae");

var moment = require("moment");

module.exports = {
    createLike: (data, callBack) => {
        pool.query(
            `insert into user_place_like(userid,placeid) values(?,?)`,
            [
                data.userid,
                data.placeid,
                moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                pool.query(`SELECT count(*)as total_like FROM user_place_like where placeid=${data.placeid}`,
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error);
                        }
                        return callBack(null, results);
                    }

                )
            }
        )
    },
    fetchLike: (data, callBack) => {
        pool.query(
            `select count(*) as total from user_place_like where userid=${data.userid} and placeid=${data.placeid}`
            ,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteLike: (data, callBack) => {
        pool.query(
            `delete from user_place_like where userid=${data.userid} and placeid=${data.placeid}`
            ,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                pool.query(`SELECT count(*)as total_like FROM user_place_like where placeid=${data.placeid}`,
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error);
                        }
                        return callBack(null, results);
                    }

                )
            }
        )
    },
    getlike: (callBack) => {
        pool.query('select id,userid,placeid,added_datetime from user_place_like',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },

    totalLike: (data, callBack) => {
        pool.query(`SELECT count(*)as total_like FROM user_place_like where placeid=${data.placeid}`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },



}