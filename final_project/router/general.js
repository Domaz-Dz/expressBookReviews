const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
public_users.post("/register", (req,res) => {
  const username = req.body.username
  const password = req.body.password
  if(username && password){
    if(!isValid(username)){
      users.push({"username":username,"password":password})
      res.status(200).json({message:`Customer successfully registred Now you can login`})
    }else{
      res.status(404).json({message:`Customer with the same username already exists!`})
    }
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return new Promise((resolve,reject)=>{
    resolve(res.send(JSON.stringify(books)))
  })
  
  //return res.status(300).json({message: "Yet to be implemented"});
});
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return new Promise((resolve,reject)=>{
    resolve(res.send(books[req.params.isbn]))
  }) 
  //return res.status(300).json({message: "Yet to be implemented"});
 });
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  return new Promise((resolve,reject)=>{
    let bookAuthor = []
    let isbn = Object.keys(books)
    isbn.forEach(isbn=>{
      if(books[isbn]["author"] === req.params.author){
        bookAuthor.push({
          "isbn":isbn,
          "title":books[isbn]["title"],
          "reviews":books[isbn]["reviews"]
        })
      }
    })
    resolve(res.send(JSON.stringify({bookAuthor}, null, 4)));
  })
  //return res.status(300).json({message: "Yet to be implemented"});
});
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  return new Promise((resolve,reject)=>{

    let booksTitle = []
    const isbn = Object.keys(books)
    isbn.forEach(isbn=>{
      if(books[isbn]["title"] === req.params.title){
        booksTitle.push({
          "isbn":isbn,
          "author":books[isbn]["author"],
          "reviews":books[isbn]["reviews"]
        })
      }
    }
    )
    resolve(res.send(JSON.stringify({booksTitle},null,4)))
  })
  //return res.status(300).json({message: "Yet to be implemented"});
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  const review = books[isbn]["reviews"]
  res.send(review)
  //return res.status(300).json({message: "Yet to be implemented"});
});
module.exports.general = public_users;