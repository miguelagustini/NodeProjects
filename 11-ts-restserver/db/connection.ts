import {Sequelize} from 'sequelize';

const db = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2')
    //logging: false,
});


export default db;





