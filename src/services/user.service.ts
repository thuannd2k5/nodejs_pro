import { getConnection } from "config/database"

const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string) => {

    //insert into db
    const connection = await getConnection();
    try {

        const sql = 'INSERT INTO `users`(`name`, `email`,`address`) VALUES (?, ?,?)';
        const values = [fullName, email, address];

        const [result, fields] = await connection.execute(sql, values);
        return result;

    } catch (err) {
        console.log(err);
        return [];
    }

}
const handleDeleteUser = async (
    id: string) => {

    //delete user db
    const connection = await getConnection();
    try {

        const sql = 'DELETE FROM `users` WHERE `id` = ? LIMIT 1';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);
        return result;

    } catch (err) {
        console.log(err);
        return [];
    }

}

const getUserById = async (
    id: string
) => {
    const connection = await getConnection();
    try {
        const sql = 'SELECT * FROM `users` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);

        return result[0];
    } catch (err) {
        console.log(err);

    }
}
const handleUpdateUser = async (
    fullName: string,
    email: string,
    address: string,
    id: string
) => {
    const connection = await getConnection();
    try {
        const sql = 'UPDATE `users` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ? LIMIT 1';
        const values = [fullName, email, address, id];

        const [result] = await connection.execute(sql, values);
        return result;

    } catch (err) {
        console.log(err);
        return [];
    }
};


const getAllUsers = async () => {
    const connection = await getConnection();

    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users` '
        );
        return results;

    } catch (err) {
        console.log(err);
        return [];
    }


}

export {
    handleCreateUser, getAllUsers, handleDeleteUser, getUserById,
    handleUpdateUser
}