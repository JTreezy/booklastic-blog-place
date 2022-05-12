const User = require("./User");
const Blog = require("./Blog");
const Book = require("./Book");
const Genre = require("./Genre");
const Comment = require("./Comment");

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Book.hasMany(Blog);
Blog.belongsTo(Book);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

Book.belongsToMany(Genre, {through: 'bookgenre'});
Genre.belongsToMany(Book, {through: 'bookgenre'});

module.exports = {
    User,
    Blog,
    Book,
    Genre,
    Comment
}