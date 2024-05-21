const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://genealogy-delta.vercel.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

//use session to enable passing cookies between different domains
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "session",
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: "none", //set to true if F.E. is on production
      secure: false,
    },
  })
);
app.use(express.json({ limit: "10kb" }));

// const authRouter = require("./routes/authRoutes");
const authRouter = require("./routes/authRoutes");
const familyRouter = require("./routes/familyRoutes");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", familyRouter);

module.exports = app;
