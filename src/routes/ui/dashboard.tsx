import { Hono } from 'hono'
import { Layout } from '../../components/Layout'
import { Panel } from '../../components/Panel'
import { StatCard } from '../../components/StatCard'
import { mockAiSummary, mockDailyLogs, mockProject, mockStats } from '../../data/mock'
import type { Env } from '../../types/bindings'

export const dashboardRoutes = new Hono<Env>()

dashboardRoutes.get('/', (c) => {
  c.set('title', `${mockProject.codeName} · 项目仪表盘`)
  c.set(
    'subtitle',
    '整合 Gmail、Daily Log 与 AI 洞察，实时掌握现场进度、风险与下一步动作。'
  )

  const actions = (
    <>
      <a
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-100 transition hover:border-sky-400/60 hover:bg-sky-500/10"
        href="/api/gmail/sync"
        data-sync="gmail"
        role="button"
      >
        <i className="ri-refresh-line text-base" aria-hidden="true"></i>
        同步 Gmail
      </a>
      <a
        className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950 transition hover:bg-sky-400"
        href="/reports/weekly"
      >
        <i className="ri-file-chart-line text-base" aria-hidden="true"></i>
        生成周报
      </a>
    </>
  )

  return c.render(
    <Layout subtitle={c.get('subtitle')} activePath={c.req.path} actions={actions} title={c.get('title')}>
      <section className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-sky-950/60 p-8 shadow-[0_70px_120px_-60px_rgba(14,23,42,0.8)] md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">当前项目</p>
          <h2 className="text-2xl font-semibold text-white">{mockProject.name}</h2>
          <div className="space-y-2 text-sm text-slate-300">
            <p>阶段：{mockProject.stage}</p>
            <p>下一里程碑：{mockProject.nextMilestone}</p>
            <p>今日天气：{mockProject.weather}</p>
          </div>
        </div>
        <div className="grid gap-4 text-sm text-slate-300">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <span className="flex items-center gap-2 text-slate-200">
              <i className="ri-user-star-line text-lg text-sky-400" aria-hidden="true"></i>
              项目经理
            </span>
            <span>{mockProject.manager}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <span className="flex items-center gap-2 text-slate-200">
              <i className="ri-timer-flash-line text-lg text-orange-300" aria-hidden="true"></i>
              最新更新时间
            </span>
            <span>{mockProject.updatedAt}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mockStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <Panel
          title="今日 AI 项目摘要"
          description="融合最新邮件、Daily Log 与任务状态，AI 自动生成洞察。"
          padded
          action={
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-200 transition hover:border-sky-400/60 hover:text-sky-300">
              <i className="ri-sparkling-line text-base" aria-hidden="true"></i>
              重新生成
            </button>
          }
        >
          <div className="space-y-5 text-sm leading-relaxed text-slate-200">
            <p className="text-slate-100">{mockAiSummary.overview}</p>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                建议动作
              </p>
              <ul className="space-y-2 text-slate-200">
                {mockAiSummary.actionItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <i className="ri-focus-3-line mt-1 text-base text-sky-400" aria-hidden="true"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-amber-400/30 bg-amber-500/5 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                风险提示
              </p>
              <ul className="space-y-2 text-amber-100">
                {mockAiSummary.risks.map((risk) => (
                  <li key={risk} className="flex items-start gap-3">
                    <i className="ri-error-warning-line mt-1 text-base" aria-hidden="true"></i>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-slate-400">生成时间：{mockAiSummary.generatedAt}</p>
          </div>
        </Panel>

        <Panel
          title="最新 Daily Log"
          description="最近 3 天的现场要点与施工班组"
          padded={false}
        >
          <ul className="divide-y divide-white/5">
            {mockDailyLogs.map((log) => (
              <li key={log.id} className="px-6 py-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{log.date}</span>
                  <span>{log.weather}</span>
                </div>
                <p className="mt-3 text-sm text-slate-100">{log.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-400">
                  {log.crew.map((crew) => (
                    <span key={crew} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      <i className="ri-team-line mr-1" aria-hidden="true"></i>
                      {crew}
                    </span>
                  ))}
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  {log.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-base text-sky-400" aria-hidden="true"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/5 px-6 py-3 text-right">
            <a className="text-xs font-semibold text-sky-300 hover:text-sky-200" href="/daily-logs">
              查看全部 Daily Log →
            </a>
          </div>
        </Panel>
      </div>
    </Layout>
  )
})
