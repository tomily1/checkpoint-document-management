/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt-nodejs';

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
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        users.belongsTo(models.role, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId'
        });
        users.hasMany(models.documents, {
          foreignKey: 'OwnerId',
          onDelete: 'CASCADE',
          hooks: true,
          allowNull: false
        });
      }
    },
    instanceMethods: {
      /**
        * Compare plain password to user's hashed password
        * @method
        * @param {String} password
        * @returns {Boolean} password match
        */
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
        /**
         * Hash user's password
         * @method
         * @returns {void} no return
         */
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      }
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },
      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return users;
};
