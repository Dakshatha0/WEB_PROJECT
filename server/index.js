const express = require("express");
const dotenv = require("dotenv");
dotenv.config("./.env");

const app = express();

app.get('/',(req,res) => {
    res.status(200).send();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})