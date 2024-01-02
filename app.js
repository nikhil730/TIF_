const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.enable("trust proxy");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.options("*", cors);

const authRouter = require("./Routers/authRoutes");
const roleRoutes = require("./Routers/roleRoutes");
const communityRoutes = require("./Routers/communityRoutes");
const memberRoutes = require("./Routers/memberRoutes");

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

/// for post the json file
// data senitize from nosql query
app.use(mongoSanitize());

// API End points

app.use("/v1/role", roleRoutes);
app.use("/v1/auth", authRouter);
app.use("/v1/community", communityRoutes);
app.use("/v1/member", memberRoutes);

app.use(errorMiddleware);
module.exports = app;
