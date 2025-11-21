'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('user', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  await queryInterface.addIndex('user', ['email'], {
    name: 'user_email_idx',
    unique: true,
  });

  await queryInterface.addIndex('user', ['cpf'], {
    name: 'user_cpf_idx',
    unique: true,
  });
}
export async function down(queryInterface) {
  // Remove indexes then drop table
  await queryInterface.removeIndex('user', 'user_email_idx').catch(() => {});
  await queryInterface.removeIndex('user', 'user_cpf_idx').catch(() => {});
  await queryInterface.dropTable('user');
}
