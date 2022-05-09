const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
    title: {
         type: DataTypes.STRING,
         allowNull:false
    },
    review: {
        type:DataTypes.TEXT,
        allowNull:false
    }
},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog'
});

module.exports=Blog