import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'database.sqlite');

const db = new Database(dbPath, { verbose: console.log });

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS user_responses_v1 (
    id TEXT PRIMARY KEY,
    created_at TEXT,
    survey_version TEXT,
    is_completed BOOLEAN,
    recommended_contract_type TEXT,
    percentage_variabel REAL,
    percentage_vast1 REAL,
    percentage_vast3 REAL,
    percentage_dynamisch REAL,
    score_variabel REAL,
    score_vast1 REAL,
    score_vast3 REAL,
    score_dynamisch REAL,
    data TEXT -- JSON string to hold everything else dynamically
  );

  CREATE TABLE IF NOT EXISTS contract_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    response_id TEXT,
    timestamp TEXT,
    recommended_type TEXT,
    data TEXT -- Store scores, percentages, strengths, answers as JSON
  );

  CREATE TABLE IF NOT EXISTS contract_survey_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_text TEXT,
    answer_text TEXT,
    rating INTEGER,
    answer_type TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
