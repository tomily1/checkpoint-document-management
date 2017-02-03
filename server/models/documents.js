'use strict';
module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('documents', {
    title: {
      allowNull: false,
      type:DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    access: {
      type: DataTypes.STRING
    },
    OwnerId: {
      type: DataTypes.INTEGER,
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return documents;
};