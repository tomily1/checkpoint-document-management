import chai from 'chai';
import Helper from '../test.helper';
import Role from '../../models';

const expect = chai.expect;
const rolesParams = Helper.role;

//set global variables
let role;

describe('<Roles Unit Tests>', () => {
  before(() => {
    //create an instance of the database and save
    role = Role.build(roleParams);
    return Role.bulkCreate([Helper.adminRole, Helper.regularRole]);

  });

  //clear database after test
  after(() => Role.sequelize.sync({ force: true }));

  describe('model Role', () => {
    
    it('creates a Role instance', () => {
      expect(role).to.exist
    });

    it('has multiple roles', () => {
      Role.findAll()
        .then((roleAdded) => {
          expect(roleAdded[0].title).to.equal('admin');
          expect(roleAdded[1].title).to.equal('regular');
        });
    });
  });

});