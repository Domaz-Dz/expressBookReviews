const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });
 




// Get the book (list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const get_books = new Promise((resolve, reject) => { 
    resolve(res.send(JSON.stringify(books,null,4)));
  });
  get_books.then(() => console.log("Get Book list"));
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
        const get_isbn = new Promise((resolve, reject) => { 
        const isbn = req.params.isbn;
        res.send(books[isbn])
    });
    get_isbn.then(() => console.log("Get ISBN"));
    
  });


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const get_author = new Promise((resolve, reject) => { 
        let booksbyauthor = [];
        let isbns = Object.keys(books);
        isbns.forEach((isbn) => {
          if(books[isbn]["author"] === req.params.author) {
            booksbyauthor.push({"isbn":isbn,
                                "title":books[isbn]["title"],
                                "reviews":books[isbn]["reviews"]});
          }
        });
        res.send(JSON.stringify({booksbyauthor}, null, 4));
});
get_author.then(() => console.log("Get Author"));

});
  
// Get book details based on title
public_users.get('/title/:title',function (req, res) {
    const get_title = new Promise((resolve, reject) => { 
        let booksbytitle = [];
        let isbns = Object.keys(books);
        isbns.forEach((isbn) => {
          if(books[isbn]["title"] === req.params.title) {
            booksbytitle.push({"isbn":isbn,
                                "author":books[isbn]["author"],
                                "reviews":books[isbn]["reviews"]});
          }
        });
        res.send(JSON.stringify({booksbytitle}, null, 4));
      });
get_title.then(() => console.log("Get Title"));

});



//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"])
  return res.status(300).json({message: "Yet to be implemented"});
});


module.exports.general = public_users;