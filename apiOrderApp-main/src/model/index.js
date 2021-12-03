import Sequelize from "sequelize";
// import cls from 'continuation-local-storage'
// ``
// const namespace = cls.createNamespace('transaction-namespace')
// Sequelize.useCLS(namespace)

const sequelizeInstance = new Sequelize(null, null, null, {
  dialect: "mysql",
  replication: {
    read: [
      {
        host: "remotemysql.com",
        port: "3306",
        username: "C2byd4W8Ef",
        password: "l2ORilhUfz",
        database: "C2byd4W8Ef",
        pool: {
          max: 100,
          idle: 3000,
          acquire: 6000,
        },
      },
    ],
    write: {
      host: "remotemysql.com",
      port: "3306",
      username: "C2byd4W8Ef",
      password: "l2ORilhUfz",
      database: "C2byd4W8Ef",
      pool: {
        max: 100,
        idle: 3000,
        acquire: 6000,
      },
    },
  },
  define: {
    underscored: false,
    freezeTableName: true,
    charset: "utf8mb4",
    dialectOptions: {
      collate: "utf8mb4_general_ci",
    },
    timestamps: false,
  },
  logging: true, // console.log
  timezone: "+07:00",
  dialectOptions: {},
});

export default sequelizeInstance;
