const User = require("./User");
const Blog = require("./Blog");
const Book = require("./Book");
const Genre = require("./Genre");
const Comment = require("./Comment");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasOne(Book);
Book.belongsToMany(Blog)

// need to add associations

module.exports = {
    User,
    Blog,
    Book,
    Genre,
    Comment
}