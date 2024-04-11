const express = require("express");
const  urlRoutes = require("./routes/url")
const staticRouter = require('./routes/staticRouter');
const {connectToMongoDB} = require("./connect")
const {URL} = require("./models/url")
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))

const PORT = 8001;
connectToMongoDB(`mongodb://127.0.0.1:27017/urlShortner`).then(() =>{
    console.log("MongoDB Connected")
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use("/url", urlRoutes)
app.use('/', staticRouter)

// app.get("/test", async(req,res) =>{
//     const allUrls = await URL.find({});
//     return res.render("home", {
//         urls : allUrls,
//     });
// });

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
    if (entry && entry.redirectUrl) {
        res.redirect(entry.redirectUrl);
    } else {
        res.status(404).send("URL not found");
    }
    
})

app.listen(PORT,() =>{
    console.log(`Port started at ${PORT}`)
})