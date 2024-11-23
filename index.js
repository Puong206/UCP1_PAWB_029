const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("req-flash");
const app = express();

const loginRoutes = require("./src/routes/router-login");
const registerRoutes = require("./src/routes/router-register");
const homeRoutes = require("./src/routes/router-home");
const pupukRoutes = require('./src/routes/router-pupuk');
const bibitRoutes = require("./src/routes/router-bibit");

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "pu0ng206",
        name: "secretName",
        cookie: {
            sameSite: true,
            maxAge: 60000,
        },
    })
);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(flash());

app.use(function (req, res, next) {
    res.setHeader(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.setHeader("Pragma", "no-cache");
    next();
});

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", homeRoutes);
app.use("/pupuk", pupukRoutes);
app.use("/bibit", bibitRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

console.log(app._router.stack);

app.listen(8000, () => {
    console.log("Server Berjalan di Port : " + 8000);
  });