'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    RoleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        users.belongsTo(models.Role,{
          foreignKey: 'RoleId'
        })
        users.hasMany(models.documents, {
          foreignKey: 'OwnerId'
        })
      }
    }
  });
  return users;
};