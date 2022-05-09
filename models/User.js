const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {}

User.init({
    first_name: {
         type: DataTypes.STRING,
         allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }
},{
    hooks:{
        beforeCreate:async userdata=>{
            userdata.password = await bcrypt.hash(userdata.password,5)
            return userdata
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports=User