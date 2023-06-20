const express = require('express')
const app = express()
const port = 3000

// support parsing of application/json type post data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// APIs file
const authRoutes = require('./APIs/Auth');
const adminRoutes = require('./APIs/Admin');
const searchRoutes = require('./APIs/Search');
const profileRoutes = require('./APIs/Profile');
const favoriteRoutes = require('./APIs/Favorite');



app.get("/", (req, res)=>{
    res.send("recieved")
})

app.use("/auth", authRoutes);
app.use('/admin', adminRoutes);
app.use('/search', searchRoutes);
app.use('/profile', profileRoutes);
app.use('/favorite', favoriteRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})