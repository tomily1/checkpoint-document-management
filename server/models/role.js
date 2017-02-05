'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Role.hasMany(models.users);
      }
    }
  });
  return Role;
};