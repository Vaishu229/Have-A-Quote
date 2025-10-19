import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

const USER_ID = ""; // enter your USER ID here.
const Token = ""; // enter your Token here.

app.get("/", async (req,res) => { 
    const response = await axios.get(`https://www.stands4.com/services/v2/quotes.php?uid=${USER_ID}&tokenid=${Token}&format=json`);
    const result = response.data.result;
    try{
        res.render("index.ejs", {
            content_quote: result.quote,
            content_author: result.author,
            year: new Date().getFullYear(),
        });
    }catch (error) {
        console.log("Failed to make request: ", error.message);
        res.sendStatus(500);
    };
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}.`);
});