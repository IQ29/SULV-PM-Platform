import type { StatCardProps } from '../components/StatCard'

export const mockProject = {
  name: '15 Talus Street, Mountain Creek',
  codeName: '15 Talus',
  client: 'SULV Group',
  manager: 'Ian (Director)',
  stage: '结构施工 · 3F 框架',
  nextMilestone: '混凝土浇筑 - 2025-11-05',
  weather: '多云 · 24℃',
  updatedAt: '2025-11-02 07:20 AEST'
}

export const mockStats: StatCardProps[] = [
  {
    label: '24 小时同步邮件',
    value: '24',
    trend: {
      value: '+5 封 vs. 上一日',
      direction: 'up'
    },
    helper: '关键字：15 Talus',
    icon: 'ri-mail-open-line'
  },
  {
    label: '活动任务',
    value: '17',
    trend: {
      value: '5 个高优先级',
      direction: 'flat'
    },
    helper: '7 个即将到期',
    icon: 'ri-task-line'
  },
  {
    label: '今日现场工人',
    value: '32',
    trend: {
      value: '+6 人 · 混凝土班组到场',
      direction: 'up'
    },
    helper: '班组：结构、机电、幕墙',
    icon: 'ri-team-line'
  },
  {
    label: '关键风险监控',
    value: '2',
    trend: {
      value: '材料延迟，天气预警',
      direction: 'down'
    },
    helper: 'AI 建议关注混凝土供应链',
    icon: 'ri-alert-line'
  }
]

export const mockDailyLogs = [
  {
    id: 'log-2025-11-02',
    date: '2025-11-02',
    weather: '多云 24℃ · 降雨 20%',
    summary: '完成三层梁钢筋绑扎，塔吊维护完成，混凝土坍落度检测通过。',
    crew: ['结构班 18', '钢筋班 6', '机电预埋 8'],
    highlights: ['高强度钢筋编号核对完毕', '完成 3F 北侧模板复检', '调整电梯井防水节点']
  },
  {
    id: 'log-2025-11-01',
    date: '2025-11-01',
    weather: '晴 27℃ · 东南风 12km/h',
    summary: '混凝土供应晚到 35 分钟，现场临时协调。完成 2F 剪力墙验收。',
    crew: ['模板班 12', '安全巡检 3'],
    highlights: ['浇筑延迟已补回进度', '供应商已发送赔偿说明', 'AI 建议关注天气变动']
  },
  {
    id: 'log-2025-10-31',
    date: '2025-10-31',
    weather: '阵雨 21℃',
    summary: '雨天施工调整：室内预制加工与安全培训，确认钢结构件下周进场。',
    crew: ['培训人员 22', '仓储 4'],
    highlights: ['完成安全等级复训', '仓库材料盘点 98% 完成']
  }
]

export const mockTasks = [
  {
    id: 'tsk-001',
    title: '确认三层混凝土到场时间',
    owner: '供应链 · Olivia',
    status: 'In Progress',
    priority: '高',
    due: '2025-11-03',
    tags: ['供应链', '混凝土'],
    notes: 'AI 提醒：与 Hanson 协调备选方案'
  },
  {
    id: 'tsk-002',
    title: '更新结构施工图签字版',
    owner: '设计团队 · Leo',
    status: 'Review',
    priority: '中',
    due: '2025-11-04',
    tags: ['设计', '文件'],
    notes: '等待机电顾问会签'
  },
  {
    id: 'tsk-003',
    title: '准备周五业主例会简报',
    owner: '项目经理 · Sarah',
    status: 'Not Started',
    priority: '高',
    due: '2025-11-06',
    tags: ['会议'],
    notes: '纳入 AI 周报建议'
  },
  {
    id: 'tsk-004',
    title: '巡检幕墙样板安装',
    owner: '现场主管 · Jack',
    status: 'Complete',
    priority: '中',
    due: '2025-10-31',
    tags: ['质量'],
    notes: '完成并记录在 Daily Log'
  }
]

export const mockAiSummary = {
  generatedAt: '2025-11-02T07:30:00+10:00',
  overview:
    '15 Talus 项目保持在计划进度内。结构三层施工顺利推进，混凝土供应略有波动但已协调解决。AI 建议本周重点关注混凝土供应链备选方案与天气变化对浇筑节点的影响。',
  actionItems: [
    '与 Hanson 确认 11 月 3 日浇筑时间表，准备备选供应商方案。',
    '提前评估 11 月 4-5 日降雨影响，准备临时遮挡与抽水设备。',
    '组织 11 月 6 日业主例会资料，纳入最新 Daily Log 与财务概览占位数据。'
  ],
  risks: [
    '混凝土供应链波动，需保持双供应商策略。',
    '天气不稳定可能影响浇筑强度与质量，需要实时监控。'
  ]
}

export const mockIntegrations = [
  {
    name: 'Gmail 工作邮箱（Gsuite）',
    status: 'connected',
    description: '根据项目关键字自动抓取相关邮件，生成摘要并同步至仪表盘。',
    actionLabel: '管理授权',
    icon: 'ri-gmail-line'
  },
  {
    name: 'Xero 财务系统',
    status: 'coming-soon',
    description: '即将上线：同步现金流、发票与成本中心，构建项目级财务视图。',
    actionLabel: '即将开放',
    icon: 'ri-bank-card-line'
  },
  {
    name: 'AI 汇总引擎（OpenAI）',
    status: 'connected',
    description: '利用 OpenAI 自动生成项目进度报告、风险提示与待办建议。',
    actionLabel: '管理 API Key',
    icon: 'ri-magic-line'
  }
]
