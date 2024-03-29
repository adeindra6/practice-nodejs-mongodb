const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
    "origin": "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(err => {
        console.log(`Can't connect to database: ${err}`);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({
        "message": "Practice CRUD using NodeJs and MongoDB",
    });
});

require("./app/routes/tutorial.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});