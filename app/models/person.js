const Sequelize = require('sequelize')
module.exports.Person = db => {
   let Person = db.define('person', {
        name:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        surname:{
            type:Sequelize.STRING,
            allowNull: true,
        },
        age:{
            type:Sequelize.NUMBER,
            allowNull: true,
        }
    });
    return Person
}
