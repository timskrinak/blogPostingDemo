import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogPostsArray=[];
let blogPostDescriptionsArray=[];
let blogTitleEdits=[];
let blogDescEdits=[];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {blogPosts: blogPostsArray, blogPostDescriptions: blogPostDescriptionsArray});
  });

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/submit", (req, res) => {
  res.render("index.ejs", {blogPosts: blogPostsArray, blogPostDescriptions: blogPostDescriptionsArray});
});

app.get("/modify", (req, res) => {
  res.render("modify.ejs", {blogPosts: blogPostsArray, blogPostDescriptions: blogPostDescriptionsArray});
});

app.post("/submit", (req, res) => {
  let blogTitle = req.body.blogTitle;
  let blogDesc = req.body.blogDesc;
  blogPostsArray.push(blogTitle);
  blogPostDescriptionsArray.push(blogDesc);
  console.log("Original Title ("+blogPostsArray.length+") : " +blogPostsArray);
  console.log("Original Desc ("+blogPostDescriptionsArray.length+") : "+blogPostDescriptionsArray);
  res.render("index.ejs", {blogPosts: blogPostsArray, blogPostDescriptions: blogPostDescriptionsArray});
  });

app.post("/modify", (req, res) => {
  blogTitleEdits = String(req.body.blogPostEdits);
  blogDescEdits = String(req.body.blogPostDescriptionEdits);
  blogPostsArray = Array.from(blogTitleEdits.split(","));
  blogPostDescriptionsArray = Array.from(blogDescEdits.split(","));
  console.log("Modifications: ("+blogPostsArray.length+")"+blogPostsArray);
  console.log("Modifications: ("+blogPostDescriptionsArray.length+")"+blogPostDescriptionsArray);
  res.render("index.ejs", {blogPosts: blogPostsArray, blogPostDescriptions: blogPostDescriptionsArray});
  });  

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });