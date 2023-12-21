const { Sequelize } = require('sequelize');

//   const sequelize = new Sequelize(
//       'cocodb',
//       'admin',
//       'c0c0db#1',
//       {
//           host: 'coco-webapp-db.cxwbznbmltet.us-east-1.rds.amazonaws.com',
//           dialect: 'mysql'
//       });

const sequelize = new Sequelize(
    'cocodb',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging : false
    });


module.exports = sequelize;