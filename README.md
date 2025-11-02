# SULV Project Platform

SULV Group 的轻量化项目管理中枢，部署于 Cloudflare Pages + Workers，聚合 Gmail、施工日志、任务信息，并通过 OpenAI 生成项目洞察。当前聚焦首个项目 **“15 Talus”**，后续可扩展至更多项目与外部系统（如 Xero 财务）。

## ✅ 已完成功能

- **全站 UI 架构**：采用 Hono SSR + Tailwind CDN，提供 Dashboard / Daily Logs / Tasks / Integrations 四大页面。
- **AI 摘要占位**：仪表盘展示 AI 汇总、行动建议与风险提示的示例数据结构。
- **数据模型设计**：提供 D1 初始迁移脚本，涵盖项目、邮件、日志、任务、AI 摘要、同步记录等核心表。
- **Gmail / API 占位**：仪表盘行为、集成页文案、`/api` 路由均已预留 Gmail 同步与周报接口。
- **集成指引页面**：集中说明 Google OAuth、OpenAI Secret、Xero 集成等事项。
- **GitHub / Cloudflare 配置准备**：脚本、配置文件对齐 Cloudflare Pages、本地 D1 与 Secrets 管理流程。

## 🔄 近期待办 / 下一阶段

1. **完成 Gmail OAuth 授权流程**，获取并保存 refresh token。
2. **实现 Gmail 邮件抓取与入库逻辑**（基于项目关键字匹配）。
3. **接入 OpenAI API**，根据 D1 数据生成真实 AI 摘要。
4. **开发 Daily Log / Tasks 的写入与编辑接口**。
5. **接入 Xero API**（已在 UI 预留入口）。
6. **引入 Cloudflare R2** 存储 Daily Log 附件（现场照片、PDF 等）。

## 🌐 访问路径 / API 概览

| 类型 | 路径 | 描述 |
|------|------|------|
| 页面 | `/` | Dashboard 仪表盘 |
| 页面 | `/daily-logs` | 现场日志时间线 |
| 页面 | `/tasks` | 任务中心 |
| 页面 | `/integrations` | 集成状态与密钥指引 |
| API  | `/api/health` | 健康检查（JSON） |
| API  | `/api/gmail/sync` | Gmail 同步占位（返回 202 状态） |
| API  | `/api/reports/weekly` | AI 周报占位（返回 202 状态） |

## 🧱 技术与目录结构

```
webapp/
├── public/
│   └── static/
│       ├── app.js               # 前端交互脚本（占位）
│       └── style.css            # 渐变背景等全局样式
├── src/
│   ├── app.tsx                  # Hono 应用主入口，挂载中间件与路由
│   ├── index.tsx                # Cloudflare Pages entry（导出 app）
│   ├── renderer.tsx             # SSR renderer，注入 Tailwind / RemixIcon
│   ├── components/              # Layout、Panel、StatCard 等 UI 组件
│   ├── data/mock.ts             # 示例数据（后续替换为 D1 查询）
│   ├── routes/
│   │   ├── api/                 # API 路由占位
│   │   └── ui/                  # 前端页面路由：dashboard、logs、tasks、integrations
│   ├── types/bindings.ts        # Cloudflare Bindings 类型定义
│   └── utils/navigation.ts      # 导航项配置
├── migrations/
│   └── 0001_init.sql            # D1 初始表结构
├── seed.sql                     # 本地开发示例数据脚本
├── package.json                 # 脚本与依赖
├── wrangler.jsonc               # Cloudflare 配置（含 D1 绑定占位）
└── README.md
```

**主要依赖**：
- Runtime：Hono + Cloudflare Pages/Workers
- UI：Tailwind CSS（CDN 模式）、Remix Icon
- 数据：Cloudflare D1（SQLite）、后续可加 R2、KV

## 🗃️ 数据模型（D1）

迁移脚本 `migrations/0001_init.sql` 包含以下核心表：

- `projects`：项目主表，含关键字（用于 Gmail 搜索）
- `gmail_messages`：项目相关邮件元数据、摘要、标签
- `daily_logs`：现场日志（天气、摘要、班组、AI 高亮）
- `tasks`：任务记录（状态、优先级、负责人、标签）
- `ai_summaries`：AI 生成的报告、风险、行动建议
- `sync_jobs`：外部系统同步作业记录（Gmail/Xero 等）

> `seed.sql` 提供本地演示数据，可在本地执行 `npm run db:migrate:local`、`wrangler d1 execute ... --file seed.sql` 加载。

## 🔐 Secrets & 环境变量

请通过 Cloudflare Pages Secret 管理以下敏感信息：

| Secret 名称 | 用途 |
|-------------|------|
| `OPENAI_API_KEY` | 调用 OpenAI API 进行 AI 总结 |
| `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` | Gmail OAuth 客户端凭据 |
| `GOOGLE_REFRESH_TOKEN` | 授权后获取，用于长期访问 Gmail |
| `XERO_CLIENT_ID` / `XERO_CLIENT_SECRET` / `XERO_TENANT_ID` | （预留）Xero 集成 |

开发阶段可在 `.dev.vars` 中配置以上变量，但 **切勿提交**。

## 🔑 OAuth 回调 URI（需在 Google & Xero 后台配置）

- `https://sulv-construction.pages.dev/api/gmail/callback`
- `https://main.sulv-construction.pages.dev/api/gmail/callback`
- `https://3000-i92dnt0feomwv06peai2m-18e660f9.sandbox.novita.ai/api/gmail/callback` *(开发沙盒参考)*

> 后续如有新的 sandbox / 预览域名，请记得同步添加。

## 🚀 本地开发与部署流程

```bash
# 安装依赖
npm install

# 构建产物（dist/_worker.js 等）
npm run build

# 本地开发（Vite）
npm run dev

# Cloudflare Pages 沙盒
npm run dev:sandbox

# （创建 D1 后）应用迁移
yarn? -> npm run db:migrate:local

# Cloudflare Pages 正式部署
npm run deploy:prod
```

**首发部署步骤建议**：
1. `wrangler d1 create sulv-pm-platform-production` → 将返回的 `database_id` 写入 `wrangler.jsonc`
2. `npm run db:migrate:prod` → 线上执行迁移
3. `npm run deploy:prod` → 构建并部署
4. `wrangler pages secret put ...` → 设置所有 Secrets

## 🧭 GitHub & 版本控制

目标仓库：[`IQ29/SULV-PM-Platform`](https://github.com/IQ29/SULV-PM-Platform)

```bash
# 初始化与首次提交
git init
git add .
git commit -m "chore: bootstrap sulv project platform"

# 关联远端
git remote add origin https://github.com/IQ29/SULV-PM-Platform.git

git push -u origin main
```

> 推送前请确认敏感信息（`.dev.vars`、Secret）未纳入版本库。

## 📌 后续扩展建议

- **Gmail**：实现批量拉取、增量同步、标签映射、邮件全文搜索。
- **OpenAI**：引入多 Prompt 模式（日报、周报、风险专报），支持手动/定时生成。
- **任务协作**：增加状态切换、指派、评论、通知（邮件 / Slack）。
- **Xero 集成**：引入财务 KPI（现金流、发票、预算偏差），与 AI 摘要联动。
- **数据可视化**：使用 Chart.js 或 ECharts（CDN）绘制甘特图、现金流曲线。
- **审计与日志**：记录操作日志，便于合规追踪。

---

如需下一阶段开发（Gmail 集成、AI 自动化、Xero 财务等），随时告知，我将继续推进。Pioneering Project Excellence!
