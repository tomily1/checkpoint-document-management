'use strict';

module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function associate(models) {
        Role.hasMany(models.users);
      }
    }
  });
  return Role;
};