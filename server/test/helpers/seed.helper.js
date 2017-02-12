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
      Seeder.seedRoleTable()
      .then(() => {
        Seeder.seedUserTable()
          .then(() => {
            Seeder.seedDocumentTable();
          })
          .catch((err) => {
            logger.error(err);
          });
      })
      .catch((err) => {
        logger.error(err);
      });
    })
    .catch((err) => {
      logger.error(err);
    });
  }
  /**
   * 
   */
  static seedUserTable() {
    const user = [{
      username: faker.internet.userName(),
      firstname: faker.name.firstname(),
      lastname: faker.name.lastname(),
      email: 'israel.tomilayo@andela.com',
      password: Seeder.hashPassword('code'),
      RoleId: 1
    },
    {
      username: faker.internet.userName(),
      firstname: faker.name.firstname(),
      lastname: faker.name.lastname(),
      email: 'itomilayo@gmail.com',
      password: Seeder.hashPassword('tomilayo'),
      RoleId: 1
    },
    {
      username: faker.internet.userName(),
      firstname: faker.name.firstname(),
      lastname: faker.name.lastname(),
      email: 'tomilayo@yahoo.com',
      password: Seeder.hashPassword('hash'),
      RoleId: 2
    }];
    return db.users.bulkCreate(user);
  }
  /**
   * 
   */
  static seedDocumentTable() {
    const document = [
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        OwnerId: 1
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        OwnerId: 2
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        OwnerId: 3
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        OwnerId: 2

      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        OwnerId: 1
      },
      {
        id: 8,
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        OwnerId: 2
      }];
    return db.documents.bulkCreate(document);
  }
  /**
   * 
   */
  static seedRoleTable() {
    const roles = [
      {
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
// export default Seeder.initialize();
