// const data = require("./MOCK_DATA.json");
const express = require("express")
const app = express();
const userRouter = require('./routes/user')
const {connectMongoDB} = require('./connection');
const {logReqRes} = require('./middleware');

app.use(express.urlencoded({ extended: false }));

//connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1").then(() =>{
  console.log("MongoDB Connected")
})

//Middleware
logReqRes("log.txt");

// Routes
app.use('/api/users', userRouter);

app.listen(8000, () => {
  console.log("Server is started");
});
