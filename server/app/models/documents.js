'use strict';
module.exports = function(sequelize, DataTypes) {
  var documents = sequelize.define('documents', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    access: DataTypes.STRING,
    OwnerId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return documents;
};