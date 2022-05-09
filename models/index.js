const User = require("./User");
const Blog = require("./Blog");
const Book = require("./Book");
const Genre = require("./Genre");
const Comment = require("./Comment");

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Blog.hasOne(Book);
Book.belongsToMany(Blog)

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

Book.hasMany(Genre);
Genre.belongsTo(Book);



// need to add associations

module.exports = {
    User,
    Blog,
    Book,
    Genre,
    Comment
}