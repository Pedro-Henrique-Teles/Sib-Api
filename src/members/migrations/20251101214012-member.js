'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('M', 'F', 'Other'),
        allowNull: false,
        defaultValue: 'Other',
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      cpf: {
        type: Sequelize.CHAR(11),
        allowNull: true,
        unique: true,
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      origin: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      occupation: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      education: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('members');
  },
};