const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init({
    title: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    },
    author: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book'
});

module.exports=Book