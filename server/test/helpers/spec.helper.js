 /* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';

const testData = {
  testedAdminUser: {
    username: 'JohnGOT',
    firstname: 'John',
    lastname: 'Snow',
    email: 'GOT@andela.com',
    password: 'code',
    RoleId: 1
  },
  adminUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },
  adminUser1: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },
  adminUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },
  adminUser3: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },
  adminUser4: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },
  adminUser5: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },
  adminUserRole: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },
  adminUserSearch: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },
  adminUserForDocumentTest: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },
  testUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  regularUserForDocumentTest: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },
  regularUserForDocumentTest2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },
  regularUser1: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },
  regularUserRole: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },
  regularUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },
  regularUser3: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },
  regularUser4: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },
  regularUser5: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },
  // Note before using thise documents, a OwnerId property should be added
  documentRole1: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph()
  },
  documentPrivate1: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph()
  },
  documentPublic1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public'
  },
  documentRole2: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph()
  },
  documentPrivate2: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph()
  },
  documentPublic2: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph()
  },
  documentRole3: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph()
  },
  documentPrivate3: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph()
  },
  documentPublic3: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph()
  },
  documentRole4: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph()
  },
  documentPrivate4: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph()
  },
  documentInvalid: {},
  documentNotValid: {
    title: faker.company.catchPhrase(),
    access: 1,
    content: faker.lorem.paragraph()
  },
  documentNoAccess: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },
  documentPublic4: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph()
  },
  newRole1: {
    title: 'rookie'
  },
  updateRole1: {
    title: 'rookie update'
  },
  duplicateRole1: {
    title: 'rookie'
  },
  newRole2: {
    title: 'amateur'
  },
  newRole3: {
    title: 'professional'
  }
};

export default testData;
