import express from 'express';
import cors from 'cors';
import db from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));const app = express();
app.use(cors());
app.use(express.json());

// NOTE: API routes have been moved to the top to ensure they are intercepted
// BEFORE any static file handling takes place.

// user_responses_v1 (Upsert)
app.post('/api/responses', (req, res) => {
  const payload = req.body;
  const { id, created_at, survey_version, is_completed, recommended_contract_type, 
          percentage_variabel, percentage_vast1, percentage_vast3, percentage_dynamisch,
          score_variabel, score_vast1, score_vast3, score_dynamisch, ...rest } = payload;
          
  const dataJson = JSON.stringify(rest);

  try {
    const stmt = db.prepare(`
      INSERT INTO user_responses_v1 
      (id, created_at, survey_version, is_completed, recommended_contract_type, percentage_variabel, percentage_vast1, percentage_vast3, percentage_dynamisch, score_variabel, score_vast1, score_vast3, score_dynamisch, data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        is_completed=excluded.is_completed,
        recommended_contract_type=excluded.recommended_contract_type,
        percentage_variabel=excluded.percentage_variabel,
        percentage_vast1=excluded.percentage_vast1,
        percentage_vast3=excluded.percentage_vast3,
        percentage_dynamisch=excluded.percentage_dynamisch,
        score_variabel=excluded.score_variabel,
        score_vast1=excluded.score_vast1,
        score_vast3=excluded.score_vast3,
        score_dynamisch=excluded.score_dynamisch,
        data=excluded.data
    `);
    
    stmt.run(
      id, created_at || new Date().toISOString(), survey_version, is_completed ? 1 : 0, recommended_contract_type,
      percentage_variabel, percentage_vast1, percentage_vast3, percentage_dynamisch,
      score_variabel, score_vast1, score_vast3, score_dynamisch, dataJson
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET existing record by ID
app.get('/api/responses/:id', (req, res) => {
  try {
    const row = db.prepare("SELECT id FROM user_responses_v1 WHERE id = ?").get(req.params.id);
    res.json({ existingRecord: row || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update for feedback submission
app.put('/api/responses/:id/feedback', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const row = db.prepare("SELECT data FROM user_responses_v1 WHERE id = ?").get(id);
    if (!row) {
      return res.status(404).json({ error: 'Not found' });
    }
    const currentData = JSON.parse(row.data || '{}');
    const newData = { ...currentData, ...updateData };
    db.prepare("UPDATE user_responses_v1 SET data = ? WHERE id = ?").run(JSON.stringify(newData), id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Contract results
app.post('/api/contract-results', (req, res) => {
  const { response_id, timestamp, recommended_type, ...rest } = req.body;
  try {
    db.prepare(`
      INSERT INTO contract_results (response_id, timestamp, recommended_type, data)
      VALUES (?, ?, ?, ?)
    `).run(response_id, timestamp, recommended_type, JSON.stringify(rest));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/contract-results', (req, res) => {
  try {
    const rows = db.prepare("SELECT recommended_type, data FROM contract_results ORDER BY timestamp DESC").all();
    const parsedRows = rows.map(r => {
      const data = JSON.parse(r.data || '{}');
      return { 
        recommended_type: r.recommended_type, 
        percentages: data.percentages 
      };
    });
    res.json({ data: parsedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Completed responses for analysis
app.get('/api/analysis/responses', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM user_responses_v1 WHERE is_completed = 1 ORDER BY created_at DESC").all();
    const flatRows = rows.map(r => ({ ...r, ...JSON.parse(r.data || '{}') }));
    res.json({ data: flatRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contract Survey Responses
app.post('/api/survey-responses', (req, res) => {
  const { question_text, answer_text, rating, answer_type } = req.body;
  try {
    db.prepare(`
      INSERT INTO contract_survey_responses (question_text, answer_text, rating, answer_type)
      VALUES (?, ?, ?, ?)
    `).run(question_text, answer_text, rating, answer_type);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Get all
app.get('/api/admin/data', (req, res) => {
  try {
    const responses = db.prepare("SELECT * FROM user_responses_v1 ORDER BY created_at DESC").all().map(r => ({ ...r, ...JSON.parse(r.data || '{}') }));
    const contractResults = db.prepare("SELECT * FROM contract_results ORDER BY timestamp DESC").all().map(r => ({ ...r, ...JSON.parse(r.data || '{}') }));
    const surveys = db.prepare("SELECT * FROM contract_survey_responses ORDER BY created_at DESC").all();
    
    res.json({
      responses,
      contractResults,
      surveys
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin deletes
app.delete('/api/admin/responses/:id', (req, res) => {
  try {
    db.prepare("DELETE FROM user_responses_v1 WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/admin/contract-results/:id', (req, res) => {
  try {
    db.prepare("DELETE FROM contract_results WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/admin/survey/:id', (req, res) => {
  try {
    db.prepare("DELETE FROM contract_survey_responses WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve statically built React frontend out of /dist directly!
app.use(express.static(path.resolve(__dirname, '../dist')));

// For any unknown route, let React Router handle it
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express SQLite server running on port ${PORT}`);
});
