import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

const connection = await mysql.createPool({
	host: process.env.MYSQL_HOST || 'your_database_host',
	user: process.env.MYSQL_USER || 'your_database_user',
	port: 25060,
	password: process.env.MYSQL_PASSWORD || 'your_database_password',
	database: process.env.MYSQL_DATABASE || 'your_database_name',
});

const db = drizzle(connection);
export default db;
