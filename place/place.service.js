const pool = require("../config/databsae");
var moment = require("moment");

module.exports = {
    createPlace: (data, callback) => {
        pool.query(
            `insert into place(userid,state_id,city_id,description) values(?,?,?,?)`,
            [
                data.userid,
                data.state_id,
                data.city_id,
                data.description,
                moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                data.image.forEach(element => {
                    pool.query(`insert into place_image(placeid,image)values(?,?)`,
                        [
                            results.insertId,
                            element
                        ],
                    ),
                        (error, results, fields) => {

                        }
                });
                return callback(null, results);
            }
        )
    },
    // this is get from city id
    getplacebycity: (data, callBack) => {
        // pool.query(`SELECT * FROM place where city_id=${data.id} limit ${data.offset},${data.length}`,
        pool.query(`SELECT p.*,u.email,u.username,u.profile_img,concat(c.name,', ',s.statename)as location,(SELECT count(*)as total_like FROM user_place_like where placeid=p.id)as total_like,(select count(*) from user_place_like upk WHERE p.id = upk.placeid AND upk.userid = ${data.loginuserid})as user_like
         FROM place p LEFT JOIN users u on p.userid=u.id LEFT JOIN state s on s.id=p.state_id LEFT JOIN city c on c.id=p.city_id  where p.city_id=${data.id}  order by p.id desc limit ${data.offset},${data.length} `,
            async (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }

        )
    },
    // This is get from userid in account username 
    getAccont: (data, callBack) => {
        pool.query(`SELECT p.*,u.username,u.email,u.profile_img,concat(c.name,', ',s.statename)as location,(SELECT count(*)as total_like FROM user_place_like where placeid=p.id)as total_like,(select count(*) from user_place_like upk WHERE p.id = upk.placeid AND upk.userid = ${data.loginuserid})as user_like FROM place p LEFT JOIN users u on p.userid=u.id LEFT JOIN state s on s.id=p.state_id LEFT JOIN city c on c.id=p.city_id  where p.userid=${data.id}  and p.id <=${data.placeid} order by p.id desc`,
            async (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }

        )
    },
   //this is get all post in username in ahmedabad screen
   getallAccountpost: (data, callBack) => {
    pool.query(`SELECT p.*,u.username,u.profile_img,concat(c.name,', ',s.statename)as location,(SELECT count(*)as total_like FROM user_place_like where placeid=p.id)as total_like,(select count(*) from user_place_like upk WHERE p.id = upk.placeid AND upk.userid = ${data.loginuserid})as user_like FROM place p LEFT JOIN users u on p.userid=u.id LEFT JOIN state s on s.id=p.state_id LEFT JOIN city c on c.id=p.city_id  where p.userid=${data.id}  order by p.id desc`,
        async (error, results, fields) => {
            if (error) {
                return callBack(error);
            }

            return callBack(null, results);
        }

    )
},
    // This is get all place in user account
    getAllplace: (data, callBack) => {
        // pool.query(`SELECT * FROM place where city_id=${data.id} limit ${data.offset},${data.length}`,
        pool.query(`SELECT p.*,u.username,u.profile_img,(select image from place_image pi WHERE pi.placeid = p.id ORDER BY id asc limit 1)as image FROM place p LEFT JOIN users u on p.userid=u.id LEFT JOIN state s on s.id=p.state_id LEFT JOIN city c on c.id=p.city_id where u.id=${data.id} order by p.id desc`,
            async (error, results, fields) => {
                if (error) {
                    return callBack(error); 
                }

                return callBack(null, results);
            }

        )
    },
    // Thsi is Top Famous Place
    TopFamous_place: (data, callBack) => {
        // pool.query(`SELECT * FROM place where city_id=${data.id} limit ${data.offset},${data.length}`,
        pool.query(`SELECT p.*,u.username,u.email,u.profile_img,concat(c.name,', ',s.statename)as location,(SELECT count(*) FROM user_place_like where placeid=p.id)as total_like,(select count(*) from user_place_like upk WHERE p.id = upk.placeid AND upk.userid = ${data.loginuserid})as user_like FROM place p LEFT JOIN users u on p.userid=u.id LEFT JOIN state s on s.id=p.state_id LEFT JOIN city c on c.id=p.city_id ORDER BY total_like DESC`,
            async (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }

        )
    },

    // This is get Place image
    getplacebycityimage: (data, callBack) => {
        // console.log(`SELECT image FROM place_image where placeid=${data.id}`);
        pool.query(`SELECT image FROM place_image where placeid=${data.id}`,
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);

            }

        )
    },

   




}