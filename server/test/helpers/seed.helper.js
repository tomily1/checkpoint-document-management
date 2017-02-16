import faker from 'faker';
import logger from 'fm-log';
import bcrypt from 'bcrypt-nodejs';
import db from '../../models';

/**
 * @class {Seeder populates the database with fake data}
 */
class Seeder {
  /**
   *@function Initialize the seeder
   * @returns void
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
     * 
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
     * 
     */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
  }
}
export default Seeder.initialize();