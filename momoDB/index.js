const mysql = require('mysql2/promise');  
module.exports = async function () {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        })
        connection.connect();
        console.log(("MySQL CONECTION STATUS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓".cyan))
        console.log("┃ ".cyan + `💭  ${momo .user.username}: [INFO]  Connected to MySQLDB`.bgCyan + " ┃".cyan);
        console.log(("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".cyan))
        return connection;
    } catch (error) {
        console.log(error);
    }
} 
