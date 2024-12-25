const express = require("express");
const path = require("path")
const { connectToDB } = require('./connect')
const urlRoute = require("./routes/url")
const URL = require('./models/url')
const staticRouter= require("./routes/staticRouter");
const exp = require("constants");
const app = express();
const PORT = 8002;
connectToDB('mongodb://localhost:27017/short-url').then(() => console.log("mongodb connected")
)
app.set("view engine","ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get("/test",async (req, res) => {
    const allUrls = await URL.find({})
    return res.render("home",{
        urls: allUrls,
    })
})

app.use("/url", urlRoute)
app.use("/",staticRouter)
app.get('/url:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL);
   

})
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))