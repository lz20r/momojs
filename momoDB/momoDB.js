const mysql = require('mysql2');  
const momo = require("../core/client");
// const RAM_SET = require('../core/RAM/RAMSetter');

module.exports = async function() {
    try {
        const connection = await mysql.createConnection({
            host: (process.env.DB_HOST),
            port: process.env.DB_PORT, 
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        })
        connection.connect(); 
        console.log(`💭  [INFO]: ${momo.user.username} Connected to MySQLDB`); 
        setTimeout(() => {
            // RAM_SET.setDBConnection(connection);
            return connection;
        }, 500);
    } catch (error) {
        console.log(error);
    } 
} 
