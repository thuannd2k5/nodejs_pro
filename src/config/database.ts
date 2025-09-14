// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database

const getConnection = async () => {
    const connection = await mysql.createConnection({
        port: 3306, //đây là port mặc định nếu ko khai báo thì vẫn sẽ chạy port này
        host: 'localhost',
        user: 'root',
        password: 'Thuan2005@',
        database: 'nodejspro',
    });

    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users` '
        );

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }
}



export { getConnection }