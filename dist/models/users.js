'use strict';

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define('users', {
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
    RoleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function associate(models) {
        users.belongsTo(models.Role, {
          onDelete: 'CASCADE',
          foreignKey: 'RoleId'
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
      validPassword: function validPassword(password) {
        return _bcryptNodejs2.default.compareSync(password, this.password);
      },

      /**
       * Hash user's password
       * @method
       * @returns {void} no return
       */
      hashPassword: function hashPassword() {
        this.password = _bcryptNodejs2.default.hashSync(this.password, _bcryptNodejs2.default.genSaltSync(8));
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(user) {
        user.hashPassword();
      },
      beforeUpdate: function beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return users;
};