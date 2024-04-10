const express = require("express");
const  urlRoutes = require("./routes/url")
const {connectToMongoDB} = require("./connect")
const {URL} = require("./models/url")

const app = express();
app.use(express.json())

const PORT = 8001;
connectToMongoDB(`mongodb://127.0.0.1:27017/urlShortner`).then(() =>{
    console.log("MongoDB Connected")
})
app.use("/url", urlRoutes)

app.get("/:shortId", async(req,res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push: {
            visitHistory : {
                timeStamp :Date.now()
            }
        }
    }
    )
    res.redirect(entry.redirectUrl)
})

app.listen(PORT,() =>{
    console.log(`Port started at ${PORT}`)
})