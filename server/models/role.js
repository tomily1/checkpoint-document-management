'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Role.hasMany(models.users);
      }
    }
  });
  return Role;
};