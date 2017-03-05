/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import logger from 'fm-log';
import bcrypt from 'bcrypt-nodejs';
import db from '../../models';

/**
 * SeedData class to populate database with default data
 */
class Seeder {
  /**
   * Perform the sequential population of the database
   * in order of associations
   * @return {Void} - Returns Void
   */
  static initialize() {
    db.sequelize.sync({ force: true })
      .then(() => {
        Seeder.seedRoleTable();
        Seeder.seedUserTable();
      })
      .catch((err) => {
        logger.error(err);
      });
  }
  /**
   * Populates database with default roles
   * @returns {object} - A Promise object
   */
  static seedRoleTable() {
    const roles = [{
      title: 'admin'
    },
    {
      title: 'regular'
    }
    ];
    return db.role.bulkCreate(roles);
  }
  /**
   * Populates database with default admin user
   * @returns{Object} - A promise Object
   */
  static seedUserTable() {
    const user = [{
      username: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: Seeder.hashPassword('test'),
      roleId: 1
    }, {
      username: 'tests',
      firstName: 'test',
      lastName: 'test',
      email: 'tests@test.com',
      password: Seeder.hashPassword('tests'),
      roleId: 2
    }];
    return db.users.bulkCreate(user);
  }
  /**
  * Generate a hash from plain password string
  * @param {String} password
  * @return {String} hashed password
  */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
  }
}
export default Seeder.initialize();
