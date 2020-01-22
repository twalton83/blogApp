const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
app = express();
//app config
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser : true})
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

//Mongoose Modle Confige
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema)

//RESTFUL ROUTES

app.get("/", function (req,res){
   
    res.redirect("/blogs")
});

app.get("/blogs", function (req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR");
        }else {
            res.render("index",{blogs:blogs})
        }
    });
})

app.listen(5500, process.env.IP, function(){
    console.log("Blog App Server")
});