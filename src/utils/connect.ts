import { Sequelize, Dialect } from 'sequelize';
import config from 'config';
import log from './logger';

const mysql_database_name = config.get<string>('mysql_database_name');
const mysql_username = config.get<string>('mysql_username');
const mysql_password = config.get<string>('mysql_password');
const mysql_dialect = config.get<Dialect>('mysql_dialect');

export const sequelize = new Sequelize(mysql_database_name, mysql_username, mysql_password, {
    dialect: mysql_dialect,
    logging: false
});

sequelize.authenticate().then(() => {
    log.info('connection established!');
}).catch((error) => {
    log.error(error, 'could not establish connection 😔');
});

sequelize.sync({ force: true }).then(() => {
    log.info('Table created successfully');
}).catch((error) => {
    log.error(error, 'unable to create table 😣');
});