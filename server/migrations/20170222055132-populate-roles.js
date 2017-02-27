module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles',[{
      title: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'regular',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
