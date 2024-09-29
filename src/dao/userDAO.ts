import mysql from 'mysql2/promise';
import { configs } from '../configs';
import { User } from '../interfaces';

export class UserDAO {
    private connection: Promise<mysql.Connection>;

    constructor() {
        this.connection = this.createConnection(this.getConnectionOptions());
    }

    private getConnectionOptions(): mysql.ConnectionOptions {
        return {
            host: configs.db.host,
            user: configs.db.user,
            password: configs.db.password,
            database: configs.db.name
        }
    }

    private async createConnection(connectionOptions: mysql.ConnectionOptions) {
        return mysql.createConnection(connectionOptions);
    }

    public async createUser(user: User): Promise<User> {
        try {
            const query = `
      INSERT INTO users (name, email, mobile_number, role_id, email_verified_at, password, remember_token, status, created_at, updated_at, avatar)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
    `;

            const values = [
                user.name,
                user.email,
                user.mobile_number || null,
                user.role_id || null,
                user.email_verified_at,
                user.password,
                user.remember_token,
                user.status || 1,
                user.avatar
            ];

            console.log("values: ", values);

            const [result] = await (await this.connection).execute(query, values);

            user.id = (result as mysql.ResultSetHeader).insertId;
            return user;
        } catch (error) {
            console.log("Error in userDAO.createUser: ", error);
            throw error;
        }
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await (await this.connection).execute<User[] & mysql.RowDataPacket[]>(query, [email]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    public async getUserById(id: number): Promise<User | null> {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await (await this.connection).execute<User[] & mysql.RowDataPacket[]>(query, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    public async updateUser(id: number, user: Partial<User>): Promise<User | null> {
        const fields = Object.keys(user)
            .map((key) => `${key} = ?`)
            .join(', ');

        const values = Object.values(user);
        const query = `UPDATE users SET ${fields}, updated_at = NOW() WHERE id = ?`;

        try {
            const [result] = await (await this.connection).execute<mysql.ResultSetHeader>(query, [...values, id]);

            return result.affectedRows > 0 ? this.getUserById(id) : null;
        } catch (error) {
            throw error;
        }
    }

    public async deleteUser(userId: number): Promise<boolean> {
        try {
            const query = 'DELETE FROM users WHERE id = ?';
            const [result] = await (await this.connection).execute<mysql.ResultSetHeader>(query, [userId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    public async closeConnection() {
        await (await this.connection).end();
    }
}