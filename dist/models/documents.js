'use strict';

module.exports = function (sequelize, DataTypes) {
  var documents = sequelize.define('documents', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    access: {
      type: DataTypes.STRING
    },
    OwnerId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        documents.belongsTo(models.users, {
          as: 'Owner',
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return documents;
};