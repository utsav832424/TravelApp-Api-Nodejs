const { create, getUsers, getUserbyUserid, updateUser, deleteUser, getUserEmail, profile_update, fecthOtp, getUserbyUseremail, update_password, sendEmail, fecthotpemail } = require("./user.service");

const { genSaltSync, hashSync, compareSync, compare, hash } = require("bcrypt");
const { sign, decode } = require("jsonwebtoken");
const { json } = require("body-parser");

function otp() {
    let otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    // console.log(otp);
    return otp;
}
let op;
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        getUserbyUseremail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Email is invalid"
                });
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Email is Already Use"
                });
            }
            if (body.password != body.confirm_password) {
                return res.status(200).json({
                    success: false,
                    message: "confirm password must be same like to password"
                })
            } else {
                body.password = hashSync(body.password, salt);
                create(body, (err, result) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            data: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "User Created",
                        data: result
                    });

                });
            }
        });
    },
    getUser: (req, res) => {
        getUsers((err, results) => {
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

    getUserby: (req, res) => {
        const id = req.params.id;
        getUserbyUserid(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Record not found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    update: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        if (body.password != body.confirm_password) {
            return res.status(200).json({
                success: false,
                message: "Confirm password must be same like to password"
            })
        } else {
            body.password = hashSync(body.password, salt);

            updateUser(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Failed to update user"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Update successfully"
                })
            })
        }
    },
    update_pass: (req, res) => {

        const body = req.body;
        const salt = genSaltSync(10);
        const id = req.params.id;
        console.log(body, id);

        getUserbyUserid(id, async (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Record not found"
                })
            }
            console.log(results);
            console.log(results[0]['password']);

            //body.current_password = hashSync(body.current_password, salt);
            console.log(body.current_password);
            const validpassword = await compare(body.current_password, results[0]['password']);
            console.log(validpassword);
            if (validpassword) {

                if (body.password != body.confirm_password) {
                    return res.status(200).json({
                        success: false,
                        message: "Confirm password must be same like to password"
                    })
                } else {
                    body.password = hashSync(body.password, salt);
                    console.log({ ...body, id });

                    update_password({ ...body, id }, (err, results) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (!results) {
                            return res.json({
                                success: 0,
                                message: "Failed to update user"
                            })
                        }
                        return res.json({
                            success: 1,
                            data: results,
                            message: "Update successfully"
                        })
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Current Password is Wrong"
                })
            }

        })


    },

    update_profile_img: (req, res) => {
        console.log(req);
        const body = req.body;
        body.profile_img = req.file.path.replace(/\\/g, "/");
        const data = req.params;
        console.log(body, data);
        profile_update({ ...body, ...data }, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                })
            }
            getUserbyUserid(data.id, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: "Record not found"
                    })
                }
                return res.json({
                    success: 1,
                    data: results
                })
            })
            // return res.json({
            //     success: 1,
            //     data: results,
            //     message: "Update successfully"
            // })
        })
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not deleted"
                })
            }
            return res.json({
                success: 1,
                message: "user deletes successfully"
            })
        })
    },

    login: (req, res) => {
        const body = req.body;
        getUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Email is invalid"
                })
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "urus2688", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login SucessFully",
                    data: results,
                    token: jsontoken
                })
            }
            else {
                return res.json({
                    success: 0,
                    message: "Invalid Email or password"
                })
            }
        })
    },

    sendfemil: (req, res) => {
        const email = req.body.email;
        console.log(email);

        getUserbyUseremail(email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(results);
            console.log("Body : ", email);

            if (results.length > 0) {
                op = otp();
                var status = false;

                do {
                    fecthOtp(op, (err, otpresults) => {

                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("otpresults : ", otpresults);
                        if (otpresults.length > 0) {
                            op = otp();
                        }
                        else if (otpresults.length == 0) {
                            status = true;
                        }
                        else if (otpresults != []) {

                        }
                    })
                } while (status);

                console.log(op, status);
                sendEmail(email, op, (err, eresults) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (!eresults) {
                        return res.json({
                            success: 0,
                            message: "Email is not sent"
                        })
                    }
                    return res.json({
                        success: 1,
                        message: eresults,
                    })
                })
            } else {
                return res.json({
                    success: 0,
                    message: "First of all create account"
                })
            }
        })


    },
    // sendfemil: (req, res) => {
    //     const email = req.body.email;
    //     console.log(email);

    //     sendEmail(email,op=otp(), (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         if (!results) {
    //             return res.json({
    //                 success: 0,
    //                 message: "Email is not sent"
    //             })
    //         }
    //         return res.json({
    //             success: 1,
    //             message: results,
    //         })
    //     })
    // },

    otpinemail: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        console.log(body);
        if (body.password != body.confirm_password) {
            return res.status(200).json({
                success: false,
                message: "confirm password must be same like to password"
            })
        } else {
            body.password = hashSync(body.password, salt);
            fecthotpemail(body, (err, results) => {

                if (err) {
                    console.log(err);
                    return;
                }
                console.log(results);
                if (results == "Otp is incorrect") {
                    return res.json({
                        success: 0,
                        data: "Otp is incorrect"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                })

            })
        }

    },


}; 