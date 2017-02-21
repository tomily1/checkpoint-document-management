module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('documents', {
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
        isIn: [['private', 'public', 'role']],
        // msg: 'must be private, public or role'
      }
    },
    OwnerId: {
      type: DataTypes.INTEGER,
    }
  }, {
    classMethods: {
      associate: (models) => {
        documents.belongsTo(models.users, {
          onDelete: 'CASCADE',
          foreignKey: 'OwnerId'
        });
      }
    }
  });
  return documents;
};
