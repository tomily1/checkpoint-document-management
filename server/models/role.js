module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        role.hasMany(models.users);
      }
    }
  });
  return role;
};
