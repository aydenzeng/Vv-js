module.exports.Person = (sequelize, DataTypes) => {
   let Person = sequelize.define('person', {
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        surname:{
            type:DataTypes.STRING,
            allowNull: true,
        },
        age:{
            type:DataTypes.NUMBER,
            allowNull: true,
        }
    });
    return Person
}
