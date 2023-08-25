require("dotenv").config();

const express = require("express");
app = module.exports = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const userRouter = require("./user/user.router");
const userPlaceRouter = require("./place/place.router");
const userLikeRouter = require("./user_place_like/user_place_like.router");
const userCommentRouter = require("./comments/comments.router");

const state = require("./state/state.router");
const profile_img = require("./profile_img/profile_img.router");

app.use(express.json());

app.use("/travel/users", userRouter);
app.use("/travel/place", userPlaceRouter);
app.use("/travel/user_place_like", userLikeRouter);
app.use("/travel/comment", userCommentRouter);
app.use("/travel/state", state);
app.use("/travel/profile_img", profile_img);


app.listen(process.env.APP_PORT, () => {
   console.log("api is Running...", process.env.APP_PORT);
});