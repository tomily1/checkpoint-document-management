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
      defaultValue: 'public',
      type: DataTypes.STRING,
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
    OwnerId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        documents.belongsTo(models.users, {
          onDelete: 'CASCADE',
          foreignKey: 'OwnerId'
        });
      }
    }
  });
  return documents;
};