const pool = require("../config/databsae");
const nodemailer = require("nodemailer");
var moment = require('moment');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into users(firstname,lastname,username,email,phonenumber,password,profile_img)values (?,?,?,?,?,?,?)',
            [
                data.firstname,
                data.lastname,
                data.username,
                data.email,
                data.phonenumber,
                data.password,
                data.profile_img,
                data.isactive,
                data.isdelete,
                moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getUsers: (callBack) => {
        pool.query('select id,firstname,lastname,username,email,phonenumber,password,profile_img from users',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },

    getUserbyUserid: (id, callBack) => {
        pool.query(`select id,firstname,lastname,username,email,password,phonenumber,profile_img,forgot_code from users where id=${id}`,

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    updateUser: (data, callBack) => {
        pool.query(
            'update users set firstname=?,lastname=?,username=?,email=?,phonenumber=?,password=?,profile_img=? where id=?',
            [
                data.firstname,
                data.lastname,
                data.username,
                data.email,
                data.phonenumber,
                data.password,
                data.profile_img,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        )
    },
    profile_update: (data, callBack) => {
        pool.query(
            'update users set profile_img = ? where id = ?',
            [
                data.profile_img,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    update_password: (data, callBack) => {
        console.log(`update users set password = ${data.password} where id = ${data.id}`),
            pool.query(
                `update users set password = ? where id = ?`,
                [
                    data.password,
                    data.id
                ],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
            )
    },

    deleteUser: (data, callBack) => {
        pool.query(
            'delete from users where id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getUserEmail: (email, callBack) => {
        pool.query(
            `select id,	firstname,lastname,username,email,phonenumber,password,ifnull(profile_img,'')as profile_img from users where email='${email}'`,

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getUserbyUseremail: (email, callBack) => {
        pool.query(`select id,firstname,lastname,username,email,password,phonenumber,ifnull(profile_img,'')as profile_img from users where email='${email}'`,

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    fecthOtp: (forgot_code, callBack) => {
        console.log(`select id,firstname,lastname,username,email,password,phonenumber,profile_img,forgot_code from users where forgot_code='${forgot_code}'`);
        pool.query(`select id,firstname,lastname,username,email,password,phonenumber,profile_img,forgot_code from users where forgot_code='${forgot_code}'`,

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log("FetchOtp : ", results);
                return callBack(null, results);
            }
        )
    },
    sendEmail: (email, otp, callBack) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'bestplaces105@gmail.com',
                pass: "taifaupfjeoewkjw"
            }
        });

        var mailOptions = {
            from: 'bestplaces105@gmail.com',
            to: email,
            subject: "Otp for forgot password ",
            text: `Otp for forgot password : ${otp}`
        }


        transporter.sendMail(mailOptions, function (error, results) {
            if (error) {
                return callBack(error);
            }
            pool.query(
                'update users set forgot_code=? where email=?',
                [
                    otp,
                    email
                ],
                (error, result, fields) => {
                    if (error) {
                        return callBack(error);
                    }

                    return callBack(null, results);
                }
            )
            // return callBack(null, results);
        })
    },

    fecthotpemail: (data, callBack) => {
        pool.query(`select id,firstname,lastname,username,email,password,phonenumber,profile_img,forgot_code from users where forgot_code='${data.forgot_code}'`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                if (results.length > 0) {
                    pool.query(`update users set password = '${data.password}',forgot_code='' where forgot_code = '${data.forgot_code}'`,
                        (error, result, fields) => {
                            if (error) {
                                return callBack(error);
                            }
                            return callBack(null, result);
                        },
                    )
                } else {
                    return callBack(null, "Otp is incorrect");
                }

            }
        )
    }




}