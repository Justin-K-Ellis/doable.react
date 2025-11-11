#! /usr/bin/env node

import { Client } from "pg";
import "dotenv/config";

const createTasksTable = `
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(250) NOT NULL,
    done BOOLEAN DEFAULT false,
    description TEXT,
    clerk_id TEXT
);
`;

async function main() {
  console.log("Create tasks table");
  try {
    const client = new Client({
      connectionString: process.env.DB_CONNECTION_STR,
    });
    await client.connect();
    await client.query(createTasksTable);
    await client.end();
    console.log("Tasks table created");
  } catch (error) {
    console.error(error);
    console.log("Something when wrong when creating the tasks table.");
  }
}

main();
