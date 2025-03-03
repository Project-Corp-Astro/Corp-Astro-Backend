import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the type for the environment variable
type Environment = 'development' | 'production';

const environment: Environment = (process.env.NODE_ENV as Environment) || 'development';

function getConnection() {
  const dbName = process.env.DB_NAME as string;
  const dbUser = process.env.DB_USER as string;
  const dbPass = process.env.DB_PASS as string;
  const dbHost = process.env.DB_HOST as string;
  const dbPort = parseInt(process.env.DB_PORT as string, 10);

  return new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    // pool: {
    //   max: 100,  // Increase max connections in the pool
    //   min: 0,
    //   acquire: 30000, // Maximum time (ms) to acquire a connection before throwing error
    //   idle: 10000, // Time (ms) before an idle connection is released
    // },
    // logging: false, // Disable logging if not needed
  });
}

console.log('Connecting to the database...');

// Create the Sequelize connection
const sequelizeConnection = getConnection();

export default sequelizeConnection;
