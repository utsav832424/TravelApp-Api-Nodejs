const { createPlace, getplacebycity, getplacebycityimage,getAllplace,getAccont,TopFamous_place,getallAccountpost} = require("./place.service");


const multer = require('multer');


module.exports = {
    create: (req, res) => {
        const body = req.body;
        console.log(req.files);
        var image = [];
        req.files.forEach(element => {
            image.push(element.path.replace('\\', '/'));
        });
        body.image = image;

        createPlace(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "place is not upload"
                })
            }
            else {
                console.log("");
                return res.status(200).json({
                    success: 1,
                    data: results,
                    message: "Place is successfully upload"
                })
            }
        })
    },
    //  this is a Place and city is to display post
    getplacebycity: (req, res) => {
        var data = { ...req.params, ...req.query };
        console.log(data);
        getplacebycity(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length > 0) {
              
                results.forEach((element, index) => {
                   
                    getplacebycityimage({ id: element.id }, (error, result) => {
                        console.log("getplacebycityimage")
                        if (error) {
                            console.log(error);
                            return;
                        }
                        element.images = result;

                        if (results.length == (index + 1)) {
                            return res.status(200).json({
                                success: 1,
                                data: results
                            })
                        }

                    })
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            }


        })
    },
    // This is a account post
    getAllplace_account: (req, res) => {
        var data = { ...req.params, ...req.query };
        console.log(data);
        getAllplace(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
            // if (results.length > 0) {
              
            //     results.forEach((element, index) => {
                   
            //         getplacebycityimage({ id: element.id }, (error, result) => {
            //             console.log("getplacebycityimage")
            //             if (error) {
            //                 console.log(error);
            //                 return;
            //             }
            //             element.images = result;

            //             if (results.length == (index + 1)) {
            //                 return res.status(200).json({
            //                     success: 1,
            //                     data: results
            //                 })
            //             }

            //         })
            //     });
            // } else {
            //     return res.status(200).json({
            //         success: 1,
            //         data: results
            //     })
            // }


        })
    },
//   this is display to user post at place screen
    getAccountpost: (req, res) => {
        var data = { ...req.params, ...req.query };
        console.log(data);
        getAccont(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

           
            if (results.length > 0) {
              
                results.forEach((element, index) => {
                   
                    getplacebycityimage({ id: element.id }, (error, result) => {
                        console.log("getplacebycityimage")
                        if (error) {
                            console.log(error);
                            return;
                        }
                        element.images = result;

                        if (results.length == (index + 1)) {
                            return res.status(200).json({
                                success: 1,
                                data: results
                            })
                        }

                    })
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            }


        })
    },
    getAccountpostinAhemedabad: (req, res) => {
        var data = { ...req.params, ...req.query };
        console.log(data);
        getallAccountpost(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

           
            if (results.length > 0) {
              
                results.forEach((element, index) => {
                   
                    getplacebycityimage({ id: element.id }, (error, result) => {
                        console.log("getplacebycityimage")
                        if (error) {
                            console.log(error);
                            return;
                        }
                        element.images = result;

                        if (results.length == (index + 1)) {
                            return res.status(200).json({
                                success: 1,
                                data: results
                            })
                        }

                    })
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            }


        })
    },

    //Top Famous Place
    Famous_place: (req, res) => {
        var data = { ...req.params, ...req.query };
        console.log(data);
        TopFamous_place(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.length > 0) {
              
                results.forEach((element, index) => {
                   
                    getplacebycityimage({ id: element.id }, (error, result) => {
                        console.log("getplacebycityimage")
                        if (error) {
                            console.log(error);
                            return;
                        }
                        element.images = result;

                        if (results.length == (index + 1)) {
                            return res.status(200).json({
                                success: 1,
                                data: results
                            })
                        }

                    })
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            }


        })
    },
   
  
    
}