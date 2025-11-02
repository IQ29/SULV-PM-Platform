-- SULV Project Platform · 初始数据结构
-- 包含项目、邮件、日志、任务、AI 汇总与同步记录

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  client TEXT,
  stage TEXT,
  status TEXT DEFAULT 'active',
  keyword TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gmail_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  gmail_id TEXT NOT NULL UNIQUE,
  thread_id TEXT,
  subject TEXT,
  snippet TEXT,
  from_address TEXT,
  to_address TEXT,
  cc_list TEXT,
  summary TEXT,
  received_at DATETIME,
  synced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  label_ids TEXT,
  importance_score REAL DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_gmail_messages_project_id ON gmail_messages(project_id);
CREATE INDEX IF NOT EXISTS idx_gmail_messages_received_at ON gmail_messages(received_at);

CREATE TABLE IF NOT EXISTS daily_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  log_date DATE NOT NULL,
  author TEXT,
  weather TEXT,
  summary TEXT,
  details TEXT,
  crew JSON,
  highlights JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_daily_logs_project_date ON daily_logs(project_id, log_date DESC);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Not Started',
  priority TEXT DEFAULT 'Medium',
  assignee TEXT,
  due_date DATE,
  tags JSON,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tasks_project_status ON tasks(project_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_project_due_date ON tasks(project_id, due_date);

CREATE TABLE IF NOT EXISTS ai_summaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  summary_type TEXT DEFAULT 'daily',
  generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  overview TEXT,
  action_items JSON,
  risks JSON,
  model TEXT,
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sync_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  status TEXT DEFAULT 'queued',
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  finished_at DATETIME,
  detail TEXT,
  project_id INTEGER,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);
