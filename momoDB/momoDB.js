const mysql = require('mysql2/promise');  
const momo = require("../core/client");

module.exports = async function () {
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
        return connection;
    } catch (error) {
        console.log(error);
    }
} 
