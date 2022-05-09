const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init({
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    title: {
         type: DataTypes.STRING,
         allowNull:false
    },
    author: {
        type: DataTypes.STRING,
        allowNull:false
    },
    genre_id: {
        type:DataTypes.INTEGER,
        references: {
            model: 'genre',
            key: 'genre_id',
          },
    }, 
},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book'
});

module.exports=Book