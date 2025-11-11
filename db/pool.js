import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STR,
});

export default pool;
