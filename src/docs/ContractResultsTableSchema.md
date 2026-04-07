
# Contract Results Table Schema

This document provides instructions for creating the `contract_results` table in your Supabase database.

## Table Schema

Create a new table in Supabase called `contract_results` with the following columns:

| Column Name | Type | Description |
|-------------|------|-------------|
| id | uuid | Primary key (default to `uuid_generate_v4()`) |
| response_id | uuid | Foreign key to user_responses_v1.id |
| timestamp | timestamptz | When the record was created |
| recommended_type | text | The recommended contract type (variabel, vast1, vast3, dynamisch) |
| scores | jsonb | JSON object containing scores for each contract type |
| percentages | jsonb | JSON object containing percentage matches for each contract type |
| strengths | jsonb | JSON object containing strengths for each contract type |
| answers | jsonb | JSON array of answer data with question info |

## Example JSON Structures

### scores
```json
{
  "variabel": 15,
  "vast1": 12,
  "vast3": 8,
  "dynamisch": 18
}
```

### percentages
```json
{
  "variabel": 75.5,
  "vast1": 60.2,
  "vast3": 40.1,
  "dynamisch": 90.3
}
```

### strengths
```json
{
  "variabel": [
    {"text": "Je wilt flexibel zijn", "status": "optimal"},
    {"text": "Je bent niet veel thuis", "status": "negative"}
  ],
  "vast1": [
    {"text": "Je wilt enige zekerheid", "status": "acceptable"}
  ],
  "vast3": [
    {"text": "Je wilt maximale zekerheid", "status": "optimal"}
  ],
  "dynamisch": [
    {"text": "Je bent bereid je verbruik aan te passen", "status": "optimal"}
  ]
}
```

### answers
```json
[
  {
    "question_id": 1,
    "question_text": "Hoe belangrijk vind je zekerheid over je energieprijs?",
    "scores": {
      "variabel": 1,
      "vast1": 3,
      "vast3": 5,
      "dynamisch": 1
    }
  }
]
```

## SQL for Table Creation

```sql
CREATE TABLE contract_results (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  response_id uuid REFERENCES user_responses_v1(id),
  timestamp timestamptz DEFAULT now(),
  recommended_type text NOT NULL,
  scores jsonb NOT NULL,
  percentages jsonb NOT NULL,
  strengths jsonb NOT NULL,
  answers jsonb NOT NULL
);

-- Optionally add indexes for better query performance
CREATE INDEX contract_results_response_id_idx ON contract_results(response_id);
CREATE INDEX contract_results_recommended_type_idx ON contract_results(recommended_type);
CREATE INDEX contract_results_timestamp_idx ON contract_results(timestamp);
```

## Row Level Security Policies

If you're using Row Level Security, you should add an appropriate policy for this table:

```sql
-- Enable RLS
ALTER TABLE contract_results ENABLE ROW LEVEL SECURITY;

-- Add a policy for read-only access (adjust according to your security needs)
CREATE POLICY "Allow anonymous read access" ON contract_results
FOR SELECT USING (true);
```

After creating this table, your application will be able to store and retrieve detailed contract recommendation data for analysis.
