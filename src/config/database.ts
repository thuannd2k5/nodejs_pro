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


    return connection;
}

export { getConnection }