import { Hono } from 'hono'
import { Layout } from '../../components/Layout'
import { Panel } from '../../components/Panel'
import { mockDailyLogs, mockProject } from '../../data/mock'
import type { Env } from '../../types/bindings'

export const dailyLogRoutes = new Hono<Env>()

dailyLogRoutes.get('/', (c) => {
  c.set('title', `${mockProject.codeName} · Daily Log`)
  c.set('subtitle', '记录每日现场动态、天气与施工亮点，为 AI 与团队提供高质量素材。')

  const actions = (
    <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-100 transition hover:bg-sky-500/20">
      <i className="ri-add-circle-line text-base" aria-hidden="true"></i>
      新建日志
    </button>
  )

  return c.render(
    <Layout title={c.get('title')} subtitle={c.get('subtitle')} activePath={c.req.path} actions={actions}>
      <Panel
        title="日志时间线"
        description="按日期倒序排列，支持筛选天气、班组、AI 标注。"
        padded={false}
      >
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-slate-300">
              <tr>
                <th className="px-6 py-4">日期</th>
                <th className="px-6 py-4">天气与班组</th>
                <th className="px-6 py-4">摘要</th>
                <th className="px-6 py-4">AI 高亮</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockDailyLogs.map((log) => (
                <tr key={log.id} className="transition hover:bg-white/5">
                  <td className="whitespace-nowrap px-6 py-4 text-slate-200">
                    <div className="font-semibold">{log.date}</div>
                    <div className="text-xs text-slate-400">{log.weather}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-300">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {log.crew.map((crew) => (
                        <span key={crew} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          <i className="ri-user-settings-line text-sm text-sky-300" aria-hidden="true"></i>
                          {crew}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-200">{log.summary}</td>
                  <td className="px-6 py-4 text-xs text-sky-200">
                    <ul className="space-y-2">
                      {log.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <i className="ri-sparkling-2-line text-base" aria-hidden="true"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </Layout>
  )
})
