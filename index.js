const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
app = express();
//app config
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser : true})
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

app.get("/blogs/new", function(req,res){
    res.render("new")
})

app.post("/blogs", function(req,res){
     // create blog
     Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs")
        }
//then redirect
        });
}); 

app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog:foundBlog})
        }
    })
})

app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        } else {
            res.render("edit",{blog : foundBlog})
        }
    })
 
});

app.put("/blogs/:id", function(req, res){
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
          console.log(err)
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + updatedBlog._id);
      }
   });
});

app.listen(5500, process.env.IP, function(){
    console.log("Blog App Server")
});