import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === "production",
});

const dbConnect = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

// Export pool as the default export
export default pool;
export { dbConnect };
