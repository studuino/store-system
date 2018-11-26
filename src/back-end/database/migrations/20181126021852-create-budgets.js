const onMigrate = (queryInterface, DataTypes) => {
  const {
    INTEGER,
    STRING,
    FLOAT,
    DATE,
    TEXT,
    JSON,
  } = DataTypes;

  queryInterface.createTable('Budgets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },

    customer: {
      type: JSON,
    },

    discount: {
      type: JSON,
    },

    products: {
      allowNull: false,
      type: TEXT,
    },

    subtotal: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },

    total: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: FLOAT,
    },

    dateToShow: {
      type: STRING,
    },

    observation: {
      type: STRING,
    },

    validity: {
      type: STRING,
    },

    status: {
      type: STRING,
    },

    salesman: {
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      type: STRING,
    },

    createdAt: {
      allowNull: false,
      type: DATE,
    },

    updatedAt: {
      allowNull: false,
      type: DATE,
    },
  });
};

const onRollback = queryInterface => queryInterface.dropTable('Budgets');

module.exports = {
  up: onMigrate,

  down: onRollback,
};
