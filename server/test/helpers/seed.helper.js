/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved*/
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
    return db.Role.bulkCreate(roles);
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
