-- SULV Project Platform · 初始化示例数据
-- 将会在本地开发环境中加载，生产部署前请移除或替换

INSERT INTO projects (code, name, client, stage, status, keyword)
VALUES (
  '15TALUS',
  '15 Talus Street · Mountain Creek',
  'SULV Group',
  '结构施工 · 3F 框架',
  'active',
  '15 Talus'
)
ON CONFLICT(code) DO UPDATE SET
  name = excluded.name,
  stage = excluded.stage,
  status = excluded.status,
  keyword = excluded.keyword,
  updated_at = CURRENT_TIMESTAMP;

-- Daily Log 示例
INSERT INTO daily_logs (project_id, log_date, author, weather, summary, details, crew, highlights)
SELECT
  id,
  '2025-11-02',
  '现场主管 · Jack',
  '多云 24℃',
  '完成三层梁钢筋绑扎，混凝土准备明日浇筑。',
  '完成塔吊维护与安全例检，确认混凝土坍落度检测。',
  json('["结构班 18","钢筋班 6","机电预埋 8"]'),
  json('["高强度钢筋编号核对完毕","完成 3F 北侧模板复检","调整电梯井防水节点"]')
FROM projects WHERE code = '15TALUS'
ON CONFLICT DO NOTHING;

-- 任务示例
INSERT INTO tasks (project_id, title, description, status, priority, assignee, due_date, tags, notes)
SELECT
  id,
  '确认三层混凝土到场时间',
  '与主供应商及备选供应商确认 11 月 3 日浇筑计划。',
  'In Progress',
  '高',
  '供应链 · Olivia',
  '2025-11-03',
  json('["供应链","混凝土"]'),
  'AI 提醒：关注天气预警，准备备用计划。'
FROM projects WHERE code = '15TALUS'
ON CONFLICT DO NOTHING;
